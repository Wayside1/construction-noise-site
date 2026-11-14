export const SITE = {
  name: 'Construction Noise Guide',
  tagline: 'The honest, independent guide to construction noise',
  url: 'https://construction-noise.co.uk',
  ga4: 'G-LBB13FLK68',
  // Where the Get Assistance and Contact forms send submissions (Cloudflare Worker).
  formEndpoint: 'https://construction-noise-forms.construction-noise.workers.dev',
  hushtecUrl: 'https://www.hushtecsolutions.com/uk/',
  supportLine:
    'Supported by Hushtec, a New Zealand manufacturer of temporary acoustic barriers with a UK manufacturing site in Wakefield, West Yorkshire, where its Performance and Premium panels are made.',
};

export const CATEGORIES: Record<string, string> = {
  'news-and-solutions': 'News & Solutions',
  guides: 'Guides',
  'product-focus': 'Product Focus',
};

export const NAV = [
  { label: 'Residents', href: '/ComplaintGuide' },
  { label: 'Contractors', href: '/ContractorGuide' },
  { label: 'Library', href: '/LearningCentre' },
  { label: 'News & Guides', href: '/news' },
  { label: 'Machine Noise', href: '/MachineNoise' },
  { label: 'FAQ', href: '/FAQ' },
  { label: 'Get Help', href: '/GetAssistance', cta: true },
];

// Real-world mitigation photos supplied by Caleb Shaw (Hushtec Ltd).
// Stored in /public/images (moved off Base44, Nov 2026).
export const IMAGES = {
  pilingSiteEnclosure: {
    src: '/images/piling-site-enclosure.webp',
    alt: 'Illustration of three piling rigs fitted with acoustic shrouds, working inside a perimeter acoustic wall on a city site',
    caption: 'Piling rigs with hammer shrouds working inside a perimeter acoustic wall.',
  },
  barrierRoadside: {
    src: `/images/barrier-roadside.webp`,
    alt: 'Long run of temporary acoustic barrier panels installed along a roadside works site, with an operative checking a panel joint',
    caption: 'A continuous run of temporary acoustic barrier along a roadside scheme. Joints are checked so there are no gaps for noise to leak through.',
  },
  pileShroudLive: {
    src: `/images/pile-shroud-live.webp`,
    alt: 'Piling rig fitted with an acoustic shroud around the hammer, working on a live site among driven concrete piles',
    caption: 'An acoustic shroud wrapped around a piling hammer on a live site, cutting noise at the source.',
  },
  pileShroudYard: {
    src: `/images/pile-shroud-yard.webp`,
    alt: 'Acoustic shroud fitted around the hammer of a piling rig, viewed in a plant yard',
    caption: 'Pile rig shroud fitted and ready for site.',
  },
  rigInEnclosure: {
    src: `/images/rig-in-enclosure.webp`,
    alt: 'Piling rig working inside a stacked acoustic barrier enclosure',
    caption: 'Screening the work zone with a free-standing acoustic enclosure around the piling point.',
  },
  enclosureRender: {
    src: `/images/enclosure-freestanding.webp`,
    alt: 'Free-standing three-sided acoustic barrier enclosure, three panels high, on weighted base frames',
    caption: 'A free-standing acoustic enclosure: three panels high, braced on weighted feet, with absorptive faces turned towards the noise.',
  },
  rockBreakerShroud: {
    src: `/images/rock-breaker-shroud.webp`,
    alt: 'Hydraulic rock breaker fitted with an acoustic shroud',
    caption: 'A hydraulic breaker fitted with an acoustic shroud. Breaker noise is one of the most common causes of complaints.',
  },
};
