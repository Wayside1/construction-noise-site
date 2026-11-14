// construction-noise-forms: receives Get Help and Contact form submissions,
// stores each in KV (SUBMISSIONS) and emails it to Caleb via Email Routing (SEND_EMAIL binding,
// destination calebshaw@live.com). Deployed as Worker "construction-noise-forms".
import { EmailMessage } from 'cloudflare:email';
const ALLOWED = [/^https:\/\/([a-z0-9-]+\.)?construction-noise(-site)?\.pages\.dev$/, /^https:\/\/(www\.)?construction-noise\.co\.uk$/, /^http:\/\/localhost(:\d+)?$/];
const cors = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED.some((r) => r.test(origin || '')) ? origin : 'https://construction-noise.co.uk',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Vary': 'Origin',
});
const clip = (v, n) => String(v ?? '').replace(/[\r\n]+/g, n > 400 ? '\n' : ' ').slice(0, n).trim();
const json = (obj, origin, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors(origin), 'Content-Type': 'application/json' } });
const TO = 'calebshaw@live.com';
const FROM = 'forms@construction-noise.co.uk';
const b64 = (s) => btoa(unescape(encodeURIComponent(s)));
const encHeader = (s) => '=?UTF-8?B?' + b64(s) + '?=';

function buildMime(rec) {
  const subj = rec.form === 'contact'
    ? 'Website contact: ' + (rec.subject || 'message') + ' from ' + rec.name
    : 'Get Help request (' + (rec.who || 'unknown') + '): ' + (rec.location || rec.name);
  const labels = { form: 'Form', who: 'I am a', name: 'Name', email: 'Email', company: 'Company', subject: 'Subject', location: 'Site / location', page: 'Sent from page', received: 'Received', country: 'Country' };
  let body = Object.entries(labels).filter(([k]) => rec[k]).map(([k, l]) => l + ': ' + rec[k]).join('\r\n');
  body += '\r\n\r\nMessage:\r\n' + rec.details.replace(/\r?\n/g, '\r\n') + '\r\n\r\n(Reply to this email to answer ' + rec.name + ' directly.)\r\n';
  return [
    'From: ' + encHeader('Construction Noise Guide') + ' <' + FROM + '>',
    'To: <' + TO + '>',
    'Reply-To: <' + rec.email + '>',
    'Subject: ' + encHeader(subj),
    'Message-ID: <' + crypto.randomUUID() + '@construction-noise.co.uk>',
    'Date: ' + new Date().toUTCString(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(body).replace(/(.{76})/g, '$1\r\n'),
  ].join('\r\n');
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin');
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(origin) });
    if (req.method !== 'POST') return new Response('Not found', { status: 404 });
    let d;
    try { d = await req.json(); } catch { return json({ ok: false, error: 'bad request' }, origin, 400); }
    if (d.website) return json({ ok: true }, origin); // honeypot
    const rec = {
      form: clip(d.form, 40), who: clip(d.who, 20), name: clip(d.name, 120), email: clip(d.email, 200),
      company: clip(d.company, 200), subject: clip(d.subject, 120), location: clip(d.location, 300),
      details: clip(d.details || d.message, 5000), page: clip(d.page, 300),
      received: new Date().toISOString(), country: req.cf?.country || '',
    };
    if (!rec.name || !/^[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+$/.test(rec.email) || !rec.details) {
      return json({ ok: false, error: 'missing fields' }, origin, 422);
    }
    const key = rec.received + '_' + crypto.randomUUID().slice(0, 8);
    rec.emailed = false;
    if (env.SEND_EMAIL) {
      try { await env.SEND_EMAIL.send(new EmailMessage(FROM, TO, buildMime(rec))); rec.emailed = true; }
      catch (e) { rec.email_error = String(e && e.message || e).slice(0, 300); }
    }
    await env.SUBMISSIONS.put(key, JSON.stringify(rec));
    return json({ ok: true }, origin);
  },
};
