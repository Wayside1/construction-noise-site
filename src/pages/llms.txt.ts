import type { APIRoute } from 'astro';
import { publishedArticles, learningArticles, optionPages } from '../data/content';
import { SITE } from '../data/site';
export const GET: APIRoute = async () => {
  const arts = await publishedArticles();
  const lib = await learningArticles();
  const opts = await optionPages();
  const u = SITE.url;
  const txt = `# Construction Noise Guide (construction-noise.co.uk)

> ${SITE.tagline} in the UK. Residents learn what construction sites are allowed to do and how to complain to the council effectively; contractors learn what actually reduces noise (barriers, shrouds, enclosures, with measured dB results) and the limits they work within (Control of Pollution Act 1974 sections 60 and 61, Environmental Protection Act 1990, BS 5228). Written by Caleb Shaw. ${SITE.supportLine}

## Key guides

- [How to complain about construction noise (UK)](${u}/ComplaintGuide): Step-by-step: evidence, permitted hours, talking to the site, Environmental Health, escalation.
- [Contractor guide](${u}/ContractorGuide): Section 60, Section 61, BS 5228, best practicable means, and measured results for barriers, shrouds and enclosures.
- [How loud is construction machinery?](${u}/MachineNoise): Typical dB levels for breakers, piling rigs, generators and other plant, and how each is quietened.
- [Construction noise FAQ](${u}/FAQ): Legal working hours, notices, consents and taking action yourself.
- [Construction noise calculator](${u}/NoiseCalculator): Distance and barrier estimates from a phone reading.
- [Get help](${u}/GetAssistance): Residents and contractors can describe a noise problem and get pointed to the right people or measures.

## Noise-control options

${opts.map((o) => `- [${o.data.title}](${u}/options/${o.id}): ${o.data.meta_description}`).join('\n')}

## Articles

${arts.map((a) => `- [${a.data.title}](${u}/articles/${a.id}): ${a.data.meta_description || a.data.summary}`).join('\n')}

## Learning Centre

${lib.map((a) => `- [${a.data.title}](${u}/learning-centre/${a.id}): ${a.data.summary}`).join('\n')}

## About

- [About this site](${u}/about): Who writes it, how articles are researched, and the Hushtec funding disclosure.
- [Contact](${u}/contact)
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
