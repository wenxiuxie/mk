// Leap G4 · 混合运算营 B2：多步与缺数加练（薄弱巩固）

const LESSON_MIX2B = [
  {
    title: ['Two products, then combine', '两处乘法，再合起来'],
    text: ['3 × 4 + 2 × 5 = 12 + 10 = 22. Do both × before +.',
      '3 × 4 + 2 × 5 = 12 + 10 = 22。两处乘法都在加法前面。'],
    art(el) {
      el.innerHTML = lessonEq('<span class="hl">12</span> + <span class="hl">10</span> = 22', 1);
    }
  },
  {
    title: ['Find □ after the known part', '先算已知，再找 □'],
    text: ['□ + 2 × 6 = 19 → first 2 × 6 = 12 → □ + 12 = 19 → □ = 7.',
      '□ + 2 × 6 = 19 → 先 2 × 6 = 12 → □ + 12 = 19 → □ = 7。'],
    art(el) {
      el.innerHTML = lessonEq('□ + 12 = 19', .3) + lessonEq('□ = 7', 1.3);
    }
  },
  {
    title: ['Undo the last step', '倒着拆最后一步'],
    text: ['If 4 × □ + 3 = 23, then 4 × □ = 20, so □ = 5.',
      '若 4 × □ + 3 = 23，则 4 × □ = 20，所以 □ = 5。'],
    art(el) {
      el.innerHTML = lessonEq('4 × □ = 20', 1);
    }
  },
  {
    title: ['Practice round!', '加练开始！'],
    text: ['20 more multi-step and missing-number questions.',
      '再练 20 道多步运算和求缺数。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX2B = [
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8), d = ri(2, 8);
    return cq({ pts: 4, input: true, answer: a * b + c * d,
      q: [`${a} × ${b} + ${c} × ${d} = ?`, `${a} × ${b} + ${c} × ${d} = ?`],
      hints: [[`${a * b} + ${c * d}.`, `${a * b} + ${c * d}。`]],
      explain: [`${a * b + c * d}.`, `${a * b + c * d}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 7), c = ri(2, 5);
    const prod = (a + b) * c, d = ri(1, Math.min(8, prod - 1));
    const ans = prod - d;
    const { choices, answer } = numChoices(ans, [a + b * c - d, prod, a + b + c - d]);
    return cq({ pts: 4, choices, answer,
      q: [`(${a} + ${b}) × ${c} − ${d} = ?`, `(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`${a + b} × ${c} = ${prod}.`, `${a + b} × ${c} = ${prod}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(2, 12), b = ri(2, 8), c = ri(2, 6), right = q + b * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`□ + ${b} × ${c} = ${right}. □ = ?`, `□ + ${b} × ${c} = ${right}。□ = ?`],
      hints: [[`${b} × ${c} = ${b * c}.`, `${b} × ${c} = ${b * c}。`], [`□ = ${right} − ${b * c}.`, `□ = ${right} − ${b * c}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 9), q = ri(2, 9), right = a * q;
    const { choices, answer } = numChoices(q, [right, a, q + a, right - a]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} × □ = ${right}. □ = ?`, `${a} × □ = ${right}。□ = ?`],
      hints: [[`${right} ÷ ${a}.`, `${right} ÷ ${a}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 10), c = ri(2, 6), q = ri(2, 8), right = a + q * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`${a} + □ × ${c} = ${right}. □ = ?`, `${a} + □ × ${c} = ${right}。□ = ?`],
      hints: [[`□ × ${c} = ${right} − ${a} = ${q * c}.`, `□ × ${c} = ${q * c}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 12), b = ri(2, 8), c = ri(2, 6);
    const d = ri(1, Math.min(9, a + b * c - 1));
    return cq({ pts: 4, input: true, answer: a + b * c - d,
      q: [`${a} + ${b} × ${c} − ${d} = ?`, `${a} + ${b} × ${c} − ${d} = ?`],
      hints: [[`${b} × ${c} = ${b * c}.`, `${b} × ${c} = ${b * c}。`]],
      explain: [`${a + b * c - d}.`, `${a + b * c - d}。`] });
  },
  () => {
    const q = ri(2, 8), b = ri(2, 7), c = ri(2, 5), right = (q + b) * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`(□ + ${b}) × ${c} = ${right}. □ = ?`, `(□ + ${b}) × ${c} = ${right}。□ = ?`],
      hints: [[`□ + ${b} = ${q + b}.`, `□ + ${b} = ${q + b}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    const prod = a * (b + c), d = ri(1, Math.min(8, prod - 1));
    return cq({ pts: 4, input: true, answer: prod - d,
      q: [`${a} × (${b} + ${c}) − ${d} = ?`, `${a} × (${b} + ${c}) − ${d} = ?`],
      hints: [[`${b + c} → × ${a} = ${prod}.`, `${b + c} → × ${a} = ${prod}。`]],
      explain: [`${prod - d}.`, `${prod - d}。`] });
  },
  () => {
    const a = ri(3, 9), b = ri(3, 8), gap = ri(1, a * b - 1), box = a * b - gap;
    return cq({ pts: 4, input: true, answer: box,
      q: [`${a} × ${b} − □ = ${gap}. □ = ?`, `${a} × ${b} − □ = ${gap}。□ = ?`],
      hints: [[`${a * b} − □ = ${gap}.`, `${a * b} − □ = ${gap}。`]],
      explain: [`${box}.`, `${box}。`] });
  },
  () => {
    const bags = ri(2, 6), each = ri(3, 8), extra = ri(2, 9), ans = bags * each + extra;
    const { choices, answer } = numChoices(ans, [bags + each + extra, bags * each, bags * (each + extra)]);
    return cq({ pts: 4, choices, answer,
      q: [`${bags} bags × ${each} each, plus ${extra}. Total?`,
        `${bags} 袋，每袋 ${each}，再加 ${extra}。一共？`],
      hints: [[`${bags} × ${each} + ${extra}.`, `${bags} × ${each} + ${extra}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8), d = ri(2, 8);
    const first = `${a} × ${b}`;
    const distractors = [`${c} × ${d}`, `${a} + ${c}`, `${b} + ${d}`, `${a} × ${c}`, `${a} + ${b}`, `${b} × ${d}`]
      .filter(v => v !== first);
    const five = [first, ...shuffle([...new Set(distractors)])].slice(0, 5);
    const choices = shuffle(five);
    return cq({ pts: 3, choices, answer: choices.indexOf(first),
      q: [`In ${a} × ${b} + ${c} × ${d}, a first product?`,
        `${a} × ${b} + ${c} × ${d} 里，可先算的一处乘法？`],
      hints: [['Either product.', '两处乘法都行。']],
      explain: [`${a} × ${b}.`, `${a} × ${b}。`] });
  },
  () => {
    const a = ri(2, 12), b = ri(2, 12), c = ri(2, 8), d = ri(2, 8);
    return cq({ pts: 4, input: true, answer: a + b + c * d,
      q: [`${a} + ${b} + ${c} × ${d} = ?`, `${a} + ${b} + ${c} × ${d} = ?`],
      hints: [[`${c} × ${d} first.`, `先算 ${c} × ${d}。`]],
      explain: [`${a + b + c * d}.`, `${a + b + c * d}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 12), ans = c + a * b;
    const { choices, answer } = numChoices(ans, [c, a * b, ans + a, c * a]);
    return cq({ pts: 4, choices, answer,
      q: [`□ − ${a} × ${b} = ${c}. □ = ?`, `□ − ${a} × ${b} = ${c}。□ = ?`],
      hints: [[`□ = ${c} + ${a * b}.`, `□ = ${c} + ${a * b}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b + c) * d;
    const { choices, answer } = numChoices(ans, [a + b + c * d, a * d + b + c, a + b + c + d]);
    return cq({ pts: 4, choices, answer,
      q: [`(${a} + ${b} + ${c}) × ${d} = ?`, `(${a} + ${b} + ${c}) × ${d} = ?`],
      hints: [[`${a + b + c} × ${d}.`, `${a + b + c} × ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(4, 9), b = ri(4, 9), c = ri(2, 3), d = ri(2, 3);
    return cq({ pts: 4, input: true, answer: a * b - c * d,
      q: [`${a} × ${b} − ${c} × ${d} = ?`, `${a} × ${b} − ${c} × ${d} = ?`],
      hints: [[`${a * b} − ${c * d}.`, `${a * b} − ${c * d}。`]],
      explain: [`${a * b - c * d}.`, `${a * b - c * d}。`] });
  },
  () => {
    const hops = ri(3, 7), size = ri(2, 6), extra = ri(2, 9);
    return cq({ pts: 3, input: true, answer: hops * size + extra,
      q: [`${hops} hops × ${size} m, then + ${extra} m. Total?`,
        `跳 ${hops} 下、每下 ${size} 米，再走 ${extra} 米。一共？`],
      hints: [[`${hops} × ${size} + ${extra}.`, `${hops} × ${size} + ${extra}。`]],
      explain: [`${hops * size + extra}.`, `${hops * size + extra}。`] });
  },
  () => {
    const a = ri(2, 6), q = ri(2, 8), extra = ri(2, 9), product = q * a, right = product + extra;
    const { choices, answer } = numChoices(product, [right, extra, q, product + 1, a]);
    return cq({ pts: 4, choices, answer,
      q: [`To solve □ × ${a} + ${extra} = ${right}, what is □ × ${a}?`,
        `解 □ × ${a} + ${extra} = ${right} 时，□ × ${a} 是多少？`],
      hints: [[`${right} − ${extra} = ${product}.`, `${right} − ${extra} = ${product}。`]],
      explain: [`${product}.`, `${product}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(3, 12);
    const d = ri(1, Math.min(8, a * b + c - 1));
    return cq({ pts: 4, input: true, answer: a * b + c - d,
      q: [`${a} × ${b} + ${c} − ${d} = ?`, `${a} × ${b} + ${c} − ${d} = ?`],
      hints: [[`${a * b} first.`, `先算 ${a * b}。`]],
      explain: [`${a * b + c - d}.`, `${a * b + c - d}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6);
    const left = a * (b + c), right = a * b + c;
    return cq({ pts: 4, choices: [
      T(`${a} × (${b} + ${c}) larger`, `${a} × (${b} + ${c}) 更大`),
      T(`${a} × ${b} + ${c} larger`, `${a} × ${b} + ${c} 更大`),
      T('Equal', '相等'), T('Cannot tell', '无法判断'), T('Same always', '永远一样')
    ], answer: left > right ? 0 : (left < right ? 1 : 2),
      q: [`${a} × (${b} + ${c}) vs ${a} × ${b} + ${c}?`,
        `${a} × (${b} + ${c}) 和 ${a} × ${b} + ${c}？`],
      hints: [[`${left} vs ${right}.`, `${left} 对 ${right}。`]],
      explain: [`${left} vs ${right}.`, `${left} 对 ${right}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5), d = ri(2, 6), e = ri(2, 6);
    const ans = (a + b) * c + d * e;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: (${a} + ${b}) × ${c} + ${d} × ${e} = ?`,
        `Boss 题：(${a} + ${b}) × ${c} + ${d} × ${e} = ?`],
      hints: [[`${(a + b) * c} + ${d * e}.`, `${(a + b) * c} + ${d * e}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  }
];

registerSeries({
  id: 'mix2b', camp: true, breakEvery: 10, perRound: 20, games: ['blankdial', 'opmachine', 'opcombo'],
  tag: ['Mixed Ops B2 · G4', '混合运算营 B2 · 四年级'],
  name: ['Several Steps · Extra 1', '多步与缺数 · 加练 1'],
  desc: ['More multi-step chains and □ practice', '多练多步运算和方框缺数'],
  lesson: LESSON_MIX2B,
  questions: Q_MIX2B,
  next: 'mix2c'
});
