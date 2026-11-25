// Leap G4 · 混合运算营 B3：多步与缺数加练 2（倒推加深）

const LESSON_MIX2C = [
  {
    title: ['Work backwards carefully', '倒推要小心'],
    text: ['For 5 × □ − 4 = 26: add 4 first → 5 × □ = 30 → □ = 6.',
      '对 5 × □ − 4 = 26：先加回 4 → 5 × □ = 30 → □ = 6。'],
    art(el) {
      el.innerHTML = lessonEq('5 × □ = 30', .3) + lessonEq('□ = 6', 1.3);
    }
  },
  {
    title: ['Parentheses hide a sum', '括号里藏着和'],
    text: ['(□ + 3) × 4 = 28 → □ + 3 = 7 → □ = 4.',
      '(□ + 3) × 4 = 28 → □ + 3 = 7 → □ = 4。'],
    art(el) {
      el.innerHTML = lessonEq('□ + 3 = 7', 1);
    }
  },
  {
    title: ['Story → expression', '故事变成算式'],
    text: ['3 boxes of 6 pencils, give away 4: 3 × 6 − 4. Multiply first.',
      '3 盒铅笔每盒 6 支，送出 4 支：3 × 6 − 4。先乘再减。'],
    art(el) {
      el.innerHTML = lessonEq('3 × 6 − 4 = 14', 1);
    }
  },
  {
    title: ['Practice round!', '加练开始！'],
    text: ['20 tougher missing-number and multi-step questions.',
      '20 道更难一点的缺数与多步题。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX2C = [
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8), d = ri(2, 8);
    return cq({ pts: 4, input: true, answer: a * b + c * d,
      q: [`${a} × ${b} + ${c} × ${d} = ?`, `${a} × ${b} + ${c} × ${d} = ?`],
      hints: [[`${a * b} + ${c * d}.`, `${a * b} + ${c * d}。`]],
      explain: [`${a * b + c * d}.`, `${a * b + c * d}。`] });
  },
  () => {
    const a = ri(3, 8), q = ri(2, 9), sub = ri(1, a * q - 1), right = a * q - sub;
    return cq({ pts: 4, input: true, answer: q,
      q: [`${a} × □ − ${sub} = ${right}. □ = ?`, `${a} × □ − ${sub} = ${right}。□ = ?`],
      hints: [[`${a} × □ = ${right} + ${sub} = ${a * q}.`, `${a} × □ = ${a * q}。`], [`□ = ${q}.`, `□ = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const q = ri(2, 9), b = ri(2, 8), c = ri(2, 5), right = (q + b) * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`(□ + ${b}) × ${c} = ${right}. □ = ?`, `(□ + ${b}) × ${c} = ${right}。□ = ?`],
      hints: [[`□ + ${b} = ${q + b}.`, `□ + ${b} = ${q + b}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b) * c - d;
    const { choices, answer } = numChoices(ans, [a + b * c - d, (a + b) * c, a + b + c - d]);
    return cq({ pts: 4, choices, answer,
      q: [`(${a} + ${b}) × ${c} − ${d} = ?`, `(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`${a + b} × ${c} = ${(a + b) * c}.`, `${a + b} × ${c} = ${(a + b) * c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 10), c = ri(2, 6), q = ri(2, 9), right = a + q * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`${a} + □ × ${c} = ${right}. □ = ?`, `${a} + □ × ${c} = ${right}。□ = ?`],
      hints: [[`□ × ${c} = ${q * c}.`, `□ × ${c} = ${q * c}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const boxes = ri(2, 6), each = ri(4, 9), give = ri(2, Math.min(8, boxes * each - 1));
    const ans = boxes * each - give;
    const { choices, answer } = numChoices(ans, [boxes * each, boxes + each - give, boxes * (each - give)]);
    return cq({ pts: 4, choices, answer,
      q: [`${boxes} boxes × ${each} pencils, give away ${give}. Left?`,
        `${boxes} 盒、每盒 ${each} 支，送出 ${give} 支。还剩？`],
      hints: [[`${boxes} × ${each} − ${give}.`, `${boxes} × ${each} − ${give}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 12), ans = c + a * b;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`□ − ${a} × ${b} = ${c}. □ = ?`, `□ − ${a} × ${b} = ${c}。□ = ?`],
      hints: [[`□ = ${c} + ${a * b}.`, `□ = ${c} + ${a * b}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    const prod = a * (b + c), d = ri(1, Math.min(9, prod - 1));
    return cq({ pts: 4, input: true, answer: prod - d,
      q: [`${a} × (${b} + ${c}) − ${d} = ?`, `${a} × (${b} + ${c}) − ${d} = ?`],
      hints: [[`${prod} − ${d}.`, `${prod} − ${d}。`]],
      explain: [`${prod - d}.`, `${prod - d}。`] });
  },
  () => {
    const a = ri(2, 6), q = ri(3, 9), extra = ri(2, 8), right = q * a + extra;
    return cq({ pts: 4, input: true, answer: q,
      q: [`□ × ${a} + ${extra} = ${right}. □ = ?`, `□ × ${a} + ${extra} = ${right}。□ = ?`],
      hints: [[`□ × ${a} = ${right} − ${extra} = ${q * a}.`, `□ × ${a} = ${q * a}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(4, 9), b = ri(3, 8), c = ri(2, 3), d = ri(2, 3);
    return cq({ pts: 4, input: true, answer: a * b - c * d,
      q: [`${a} × ${b} − ${c} × ${d} = ?`, `${a} × ${b} − ${c} × ${d} = ?`],
      hints: [[`${a * b} − ${c * d}.`, `${a * b} − ${c * d}。`]],
      explain: [`${a * b - c * d}.`, `${a * b - c * d}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const d = ri(1, Math.min(8, a + b * c - 1));
    return cq({ pts: 4, input: true, answer: a + b * c - d,
      q: [`${a} + ${b} × ${c} − ${d} = ?`, `${a} + ${b} × ${c} − ${d} = ?`],
      hints: [[`${b * c} first.`, `先算 ${b * c}。`]],
      explain: [`${a + b * c - d}.`, `${a + b * c - d}。`] });
  },
  () => {
    const q = ri(3, 10), b = ri(2, 6), right = q * b;
    const { choices, answer } = numChoices(q, [right, b, q + b, right - b]);
    return cq({ pts: 3, choices, answer,
      q: [`□ × ${b} = ${right}. □ = ?`, `□ × ${b} = ${right}。□ = ?`],
      hints: [[`${right} ÷ ${b}.`, `${right} ÷ ${b}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b + c) * d;
    const { choices, answer } = numChoices(ans, [a + b + c * d, a * d + b * c, ans + 1]);
    return cq({ pts: 4, choices, answer,
      q: [`(${a} + ${b} + ${c}) × ${d} = ?`, `(${a} + ${b} + ${c}) × ${d} = ?`],
      hints: [[`${a + b + c} × ${d}.`, `${a + b + c} × ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(3, 8), b = ri(2, 6), gap = ri(2, a * b - 2);
    return cq({ pts: 4, input: true, answer: a * b - gap,
      q: [`${a} × ${b} − □ = ${gap}. □ = ?`, `${a} × ${b} − □ = ${gap}。□ = ?`],
      hints: [[`□ = ${a * b} − ${gap}.`, `□ = ${a * b} − ${gap}。`]],
      explain: [`${a * b - gap}.`, `${a * b - gap}。`] });
  },
  () => {
    const rows = ri(3, 6), each = ri(4, 9), extra = ri(2, 10);
    return cq({ pts: 3, input: true, answer: rows * each + extra,
      q: [`${rows} rows × ${each} seats, plus ${extra} chairs. Total seats?`,
        `${rows} 排、每排 ${each} 座，另加 ${extra} 把椅子。一共？`],
      hints: [[`${rows} × ${each} + ${extra}.`, `${rows} × ${each} + ${extra}。`]],
      explain: [`${rows * each + extra}.`, `${rows * each + extra}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6);
    const left = a * (b + c), right = a * b + c;
    return cq({ pts: 4, choices: [
      T(`Left larger (${left})`, `左边更大（${left}）`),
      T(`Right larger (${right})`, `右边更大（${right}）`),
      T('Equal', '相等'), T('Cannot tell', '无法判断'), T('Always left', '永远左边大')
    ], answer: left > right ? 0 : (left < right ? 1 : 2),
      q: [`${a} × (${b} + ${c})  ?  ${a} × ${b} + ${c}`,
        `${a} × (${b} + ${c})  和  ${a} × ${b} + ${c}`],
      hints: [[`${left} vs ${right}.`, `${left} 对 ${right}。`]],
      explain: [`${left} vs ${right}.`, `${left} 对 ${right}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(3, 12);
    const d = ri(1, Math.min(8, a * b + c - 1));
    return cq({ pts: 4, input: true, answer: a * b + c - d,
      q: [`${a} × ${b} + ${c} − ${d} = ?`, `${a} × ${b} + ${c} − ${d} = ?`],
      hints: [[`${a * b} + ${c} − ${d}.`, `${a * b} + ${c} − ${d}。`]],
      explain: [`${a * b + c - d}.`, `${a * b + c - d}。`] });
  },
  () => {
    const q = ri(2, 10), b = ri(2, 7), c = ri(2, 6), right = q + b * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`□ + ${b} × ${c} = ${right}. □ = ?`, `□ + ${b} × ${c} = ${right}。□ = ?`],
      hints: [[`□ = ${right} − ${b * c}.`, `□ = ${right} − ${b * c}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5), d = ri(2, 6), e = ri(2, 5);
    return cq({ pts: 4, input: true, answer: (a + b) * c + d * e,
      q: [`(${a} + ${b}) × ${c} + ${d} × ${e} = ?`, `(${a} + ${b}) × ${c} + ${d} × ${e} = ?`],
      hints: [[`${(a + b) * c} + ${d * e}.`, `${(a + b) * c} + ${d * e}。`]],
      explain: [`${(a + b) * c + d * e}.`, `${(a + b) * c + d * e}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5), d = ri(2, 6), e = ri(2, 6);
    const ans = (a + b) * c + d * e;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: (${a} + ${b}) × ${c} + ${d} × ${e} = ?`,
        `Boss 题：(${a} + ${b}) × ${c} + ${d} × ${e} = ?`],
      hints: [[`Parentheses ×, then other ×, then +.`, '先括号乘，再另一处乘，最后加。']],
      explain: [`${ans}.`, `${ans}。`] });
  }
];

registerSeries({
  id: 'mix2c', camp: true, breakEvery: 10, perRound: 20, games: ['blankdial', 'opcombo', 'twostep'],
  tag: ['Mixed Ops B3 · G4', '混合运算营 B3 · 四年级'],
  name: ['Several Steps · Extra 2', '多步与缺数 · 加练 2'],
  desc: ['Harder backwards □ and story multi-steps', '更难倒推缺数与故事多步'],
  lesson: LESSON_MIX2C,
  questions: Q_MIX2C,
  next: 'mix3'
});
