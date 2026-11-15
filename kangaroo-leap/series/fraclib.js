// Leap-only fraction drawing helpers (not shared with kangaroo-hop).
const fBar = (d, shaded, w = 280, h = 36) => {
  const cell = w / d;
  const rects = Array.from({ length: d }, (_, i) =>
    `<rect x="${i * cell}" y="0" width="${cell}" height="${h}" fill="${i < shaded ? '#f2b630' : '#fff8e8'}" stroke="#1f2b3a" stroke-width="2"/>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${rects}</svg>`;
};
const fPie = (d, shaded, r = 54) => {
  if (d <= 0) return '';
  const cx = r + 4, cy = r + 4, R = r;
  const slice = (i, on) => {
    const a0 = -Math.PI / 2 + (i / d) * Math.PI * 2;
    const a1 = -Math.PI / 2 + ((i + 1) / d) * Math.PI * 2;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    return `<path d="M${cx},${cy} L${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} Z" fill="${on ? '#c8742c' : '#fff8e8'}" stroke="#1f2b3a" stroke-width="2"/>`;
  };
  const parts = Array.from({ length: d }, (_, i) => slice(i, i < shaded)).join('');
  return `<svg viewBox="0 0 ${2 * r + 8} ${2 * r + 8}" width="${2 * r + 8}" height="${2 * r + 8}" aria-hidden="true">${parts}</svg>`;
};
const fLabel = (n, d) => `<span class="chip" style="width:auto;padding:4px 12px;font-size:22px">${n}/${d}</span>`;
const fDots = (total, marked, icon = 'star') =>
  `<div class="pile" style="max-width:420px">${Array.from({ length: total }, (_, i) =>
    `<span style="opacity:${i < marked ? 1 : .28}">${item(icon, 'sm')}</span>`).join('')}</div>`;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const simplify = (n, d) => { const g = gcd(n, d); return [n / g, d / g]; };
