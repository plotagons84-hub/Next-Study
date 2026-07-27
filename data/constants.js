export const TELEGRAM_URL = 'https://t.me/+NHwNCgpANBc4Y2E1'
export const URGENT_ALERT_URL = 'https://t.me/+Rojo9L3iKTpkMjhl'

export const BRAND = {
  name: 'Next Study',
  tagline: 'Next Study',
  credit: 'Made by \u2764\ufe0f Ahmad',
  copyright: '\u00a92026 Next Study by Ahmad',
}

export const ADMIN_BRAND = {
  name: 'NEXT STUDY ADMIN PANEL',
  credit: 'Made with \u2764\ufe0f by ZISHAN AHMAD',
}

// Top-level cards on the home page.
// kind: 'dashboard' -> internal link to a sub-platform list (real URLs never show)
// kind: 'link'      -> direct external link, opens in a new tab
// kind: 'locked'    -> "Coming Soon" badge, not clickable
export const platforms = [
  {
    id: 'pw-ultimate',
    name: 'PW ULTIMATE',
    description: "India's most loved learning platform for NEET & JEE preparation",
    logo: '/logos/pw.png',
    kind: 'dashboard',
    to: '/pw',
    colorRgb: '249 115 22',
  },
  {
    id: 'next-topper-ultimate',
    name: 'NEXT TOPPER ULTIMATE',
    description: 'Accelerate your NEET & JEE exam preparation with expert guidance',
    logo: '/logos/next-topper.png',
    kind: 'dashboard',
    to: '/next-topper',
    colorRgb: '249 115 22',
  },
  {
    id: 'vibrant-academy',
    name: 'Vibrant Academy',
    description: 'Believe in Excellence \u2014 focused coaching for competitive exam success',
    logo: '/logos/vibrant.png',
    kind: 'link',
    href: 'https://next-studyvibrant.faizan92048.workers.dev/',
    colorRgb: '249 115 22',
  },
  {
    id: 'mission-jeet',
    name: 'Mission Jeet',
    description: 'Focused preparation to achieve your academic goals in competitive exams',
    logo: '/logos/mission-jeet.png',
    kind: 'locked',
    colorRgb: '249 115 22',
  },
]

// Sub-platforms inside the "PW ULTIMATE" dashboard (/pw). Each opens through an
// internal viewer route (/pw/$id) that embeds the real site in an iframe, so
// the actual proxy URL never shows in the browser's address bar.
export const pwPlatforms = [
  {
    id: 'pw-1',
    name: 'PW 1',
    description: "India's most loved learning platform for NEET & JEE preparation",
    logo: '/logos/pw.png',
    url: 'https://nextstudy-pw.faizan92048.workers.dev/',
  },
  {
    id: 'pw-next-study',
    name: 'PW NEXT STUDY',
    description: "India's most loved learning platform for NEET & JEE preparation",
    logo: '/logos/pw.png',
    url: 'https://next-study-pw.faizan92048.workers.dev/study/batches',
  },
  {
    id: 'pw-without-login',
    name: 'PW Without Login',
    description: "India's most loved learning platform for NEET & JEE preparation",
    logo: '/logos/pw.png',
    url: 'https://nextstudy-live.faizan92048.workers.dev/',
  },
]

// Sub-platforms inside the "NEXT TOPPER ULTIMATE" dashboard (/next-topper).
export const nextTopperPlatforms = [
  {
    id: 'next-topper',
    name: 'Next Topper',
    description: 'Accelerate your NEET & JEE exam preparation with expert guidance',
    logo: '/logos/next-topper.png',
    url: 'https://next-topperbyvidya.faizan92048.workers.dev/',
  },
  {
    id: 'next-topper-2',
    name: 'Next Topper 2',
    description: 'Accelerate your NEET & JEE exam preparation with expert guidance',
    logo: '/logos/next-topper.png',
    url: 'https://next-topper.faizan92048.workers.dev/',
  },
]
