// Leap G4 · 混合运算营 B：多步与缺数

const LESSON_MIX2 = [
  {
    title: ['Two products, then add', '先算两处乘法，再加'],
    text: ['In 2 × 3 + 4 × 5, both products come before the plus: 6 + 20 = 26.',
      '算 2 × 3 + 4 × 5 时，两处乘法都在加法前面：6 + 20 = 26。'],
    art(el) {
      el.innerHTML = lessonEq('2 × 3 + 4 × 5', .2)
        + lessonEq('<span class="hl">6</span> + <span class="hl">20</span>', 1.2)
        + lessonEq('= 26', 2.2);
    }
  },
  {
    title: ['Parentheses, then the rest', '括号算完，再往下算'],
    text: ['(3 + 4) × 2 − 5. Parentheses first: 7 × 2 = 14, then 14 − 5 = 9.',
      '(3 + 4) × 2 − 5。先算括号：7 × 2 = 14，再算 14 − 5 = 9。'],
    art(el) {
      el.innerHTML = lessonEq('(<span class="hl">3 + 4</span>) × 2 − 5', .2)
        + lessonEq('14 − 5 = 9', 1.4);
    }
  },
  {
    title: ['A missing number', '方框里的数'],
    text: ['□ + 3 × 4 = 20. First find 3 × 4 = 12. Then □ + 12 = 20, so □ = 8.',
      '□ + 3 × 4 = 20。先算 3 × 4 = 12。于是 □ + 12 = 20，□ = 8。'],
    art(el) {
      el.innerHTML = lessonEq('□ + 12 = 20', .3) + lessonEq('□ = 8', 1.4);
    }
  },
  {
    title: ['Work backwards', '倒着找缺数'],
    text: ['If 5 × □ + 2 = 22, the product 5 × □ must be 20. So □ = 4.',
      '如果 5 × □ + 2 = 22，那么 5 × □ 必须是 20。所以 □ = 4。'],
    art(el) {
      el.innerHTML = lessonEq('5 × □ = 20', .3) + lessonEq('□ = 4', 1.4);
    }
  },
  {
    title: ['Keep the steps in order', '步骤不要跳'],
    text: ['Write the first result, then the next. A missing number is just another step: find what is already known, then undo it.',
      '先写下第一步的结果，再写下下一步。缺数也一样：先算出已经能算的，再倒回去。'],
    art(el) {
      el.innerHTML = lessonEq('known part → undo', 1);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: several steps, and missing numbers. A mini game every 10 questions.',
      '20 道四年级题：多步混合运算，以及求缺数。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX2 = [
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8), d = ri(2, 8);
    const ans = a * b + c * d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} × ${b} + ${c} × ${d}?`, `${a} × ${b} + ${c} × ${d} = ?`],
      hints: [[`${a} × ${b} = ${a * b} and ${c} × ${d} = ${c * d}.`, `${a} × ${b} = ${a * b}，${c} × ${d} = ${c * d}。`],
        [`${a * b} + ${c * d} = ${ans}.`, `${a * b} + ${c * d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 7), c = ri(2, 5);
    const prod = (a + b) * c, d = ri(1, Math.min(8, prod - 1)), ans = prod - d;
    const { choices, answer } = numChoices(ans, [a + b * c - d, prod, a + b + c - d, ans + d]);
    return cq({ pts: 4, choices, answer,
      q: [`What is (${a} + ${b}) × ${c} − ${d}?`, `(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`Parentheses → ${a + b}.`, `括号里是 ${a + b}。`],
        [`${a + b} × ${c} = ${prod}, then − ${d}.`, `${a + b} × ${c} = ${prod}，再减 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 12), b = ri(2, 8), c = ri(2, 6);
    const prod = b * c, d = ri(1, Math.min(9, a + prod - 1)), ans = a + prod - d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} + ${b} × ${c} − ${d}?`, `${a} + ${b} × ${c} − ${d} = ?`],
      hints: [[`${b} × ${c} = ${prod} first.`, `先算 ${b} × ${c} = ${prod}。`],
        [`${a} + ${prod} − ${d} = ${ans}.`, `${a} + ${prod} − ${d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(2, 12), b = ri(2, 8), c = ri(2, 6), right = q + b * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`□ + ${b} × ${c} = ${right}. What is □?`, `□ + ${b} × ${c} = ${right}。□ 是多少？`],
      hints: [[`${b} × ${c} = ${b * c}.`, `${b} × ${c} = ${b * c}。`],
        [`□ + ${b * c} = ${right}, so □ = ${q}.`, `□ + ${b * c} = ${right}，所以 □ = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 9), q = ri(2, 9), right = a * q;
    const { choices, answer } = numChoices(q, [right, a, q + a, right - a]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} × □ = ${right}. What is □?`, `${a} × □ = ${right}。□ 是多少？`],
      hints: [[`${right} ÷ ${a} = ${q}.`, `${right} ÷ ${a} = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const q = ri(2, 8), b = ri(2, 7), c = ri(2, 5), right = (q + b) * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`(□ + ${b}) × ${c} = ${right}. What is □?`, `(□ + ${b}) × ${c} = ${right}。□ 是多少？`],
      hints: [[`□ + ${b} = ${right} ÷ ${c} = ${q + b}.`, `□ + ${b} = ${right} ÷ ${c} = ${q + b}。`],
        [`□ = ${q + b} − ${b} = ${q}.`, `□ = ${q + b} − ${b} = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8), d = ri(2, 8);
    const first = `${a} × ${b}`;
    const choices = shuffle([first, `${a} + ${c}`, `${b} + ${d}`, `${a} × ${b} + ${c}`, `${b} × ${d}`].filter((v, i, arr) => arr.indexOf(v) === i)).slice(0, 5);
    const fixed = choices.includes(first) ? choices : [first, ...choices].slice(0, 5);
    return cq({ pts: 3, choices: fixed, answer: fixed.indexOf(first),
      q: [`In ${a} × ${b} + ${c} × ${d}, which part can you compute first?`, `${a} × ${b} + ${c} × ${d} 里，哪一部分可以先算？`],
      hints: [['Either product can come first. One of them is shown.', '两处乘法都可以先算。选项里有其中一处。']],
      explain: [`${a} × ${b} = ${a * b} is a first step.`, `${a} × ${b} = ${a * b} 可以先算。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    const prod = a * (b + c), d = ri(1, Math.min(8, prod - 1)), ans = prod - d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} × (${b} + ${c}) − ${d}?`, `${a} × (${b} + ${c}) − ${d} = ?`],
      hints: [[`${b} + ${c} = ${b + c}, then × ${a} = ${prod}.`, `${b} + ${c} = ${b + c}，再乘 ${a} 得 ${prod}。`],
        [`${prod} − ${d} = ${ans}.`, `${prod} − ${d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(3, 9), b = ri(3, 8), gap = ri(1, a * b - 1), ans = a * b - gap;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${a} × ${b} − □ = ${gap}. What is □?`, `${a} × ${b} − □ = ${gap}。□ 是多少？`],
      hints: [[`${a} × ${b} = ${a * b}.`, `${a} × ${b} = ${a * b}。`],
        [`${a * b} − □ = ${gap}, so □ = ${ans}.`, `${a * b} − □ = ${gap}，所以 □ = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const bags = ri(2, 6), each = ri(3, 8), extra = ri(2, 9), ans = bags * each + extra;
    const { choices, answer } = numChoices(ans, [bags + each + extra, bags * each, bags * (each + extra), ans - extra]);
    return cq({ pts: 4, choices, answer,
      q: [`${bags} bags with ${each} stickers in each, plus ${extra} loose stickers. How many stickers?`,
        `${bags} 袋贴纸，每袋 ${each} 张，另外还有 ${extra} 张。一共多少张？`],
      hints: [[`${bags} × ${each} = ${bags * each}, then + ${extra}.`, `${bags} × ${each} = ${bags * each}，再加 ${extra}。`]],
      explain: [`${ans}.`, `${ans} 张。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    const choices = [
      T(`${a} × (${b} + ${c}) is greater`, `${a} × (${b} + ${c}) 更大`),
      T(`${a} × ${b} + ${c} is greater`, `${a} × ${b} + ${c} 更大`),
      T('They are equal', '一样大'),
      T('Cannot tell', '无法比较'),
      T(`${a} + ${b} × ${c} is greater`, `${a} + ${b} × ${c} 更大`)
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: [`Which is greater: ${a} × (${b} + ${c}), or ${a} × ${b} + ${c}?`,
        `${a} × (${b} + ${c}) 和 ${a} × ${b} + ${c}，哪个大？`],
      hints: [[`${a} × (${b} + ${c}) = ${a * (b + c)}. ${a} × ${b} + ${c} = ${a * b + c}.`,
        `${a} × (${b} + ${c}) = ${a * (b + c)}，${a} × ${b} + ${c} = ${a * b + c}。`]],
      explain: [`${a * (b + c)} is greater.`, `${a * (b + c)} 更大。`] });
  },
  () => {
    const a = ri(2, 12), b = ri(2, 12), c = ri(2, 8), d = ri(2, 8);
    const ans = a + b + c * d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} + ${b} + ${c} × ${d}?`, `${a} + ${b} + ${c} × ${d} = ?`],
      hints: [[`${c} × ${d} = ${c * d} first.`, `先算 ${c} × ${d} = ${c * d}。`],
        [`${a} + ${b} + ${c * d} = ${ans}.`, `${a} + ${b} + ${c * d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 10), c = ri(2, 6), q = ri(2, 8), right = a + q * c;
    return cq({ pts: 4, input: true, answer: q,
      q: [`${a} + □ × ${c} = ${right}. What is □?`, `${a} + □ × ${c} = ${right}。□ 是多少？`],
      hints: [[`□ × ${c} = ${right} − ${a} = ${q * c}.`, `□ × ${c} = ${right} − ${a} = ${q * c}。`],
        [`□ = ${q}.`, `□ = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b + c) * d;
    const { choices, answer } = numChoices(ans, [a + b + c * d, a * d + b + c, a + b + c + d, ans + d]);
    return cq({ pts: 4, choices, answer,
      q: [`What is (${a} + ${b} + ${c}) × ${d}?`, `(${a} + ${b} + ${c}) × ${d} = ?`],
      hints: [[`${a} + ${b} + ${c} = ${a + b + c}, then × ${d}.`, `${a} + ${b} + ${c} = ${a + b + c}，再乘 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(4, 9), b = ri(4, 9), c = ri(2, 3), d = ri(2, 3);
    const ans = a * b - c * d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} × ${b} − ${c} × ${d}?`, `${a} × ${b} − ${c} × ${d} = ?`],
      hints: [[`${a} × ${b} = ${a * b}, ${c} × ${d} = ${c * d}.`, `${a} × ${b} = ${a * b}，${c} × ${d} = ${c * d}。`],
        [`${a * b} − ${c * d} = ${ans}.`, `${a * b} − ${c * d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const hops = ri(3, 7), size = ri(2, 6), extra = ri(2, 9), ans = hops * size + extra;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A kangaroo hops ${hops} times, ${size} meters each hop, then walks ${extra} meters. How far in all?`,
        `袋鼠跳了 ${hops} 下，每下 ${size} 米，又走了 ${extra} 米。一共多少米？`],
      hints: [[`${hops} × ${size} = ${hops * size}, then + ${extra}.`, `${hops} × ${size} = ${hops * size}，再加 ${extra}。`]],
      explain: [`${ans} m.`, `${ans} 米。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 12), ans = c + a * b;
    const { choices, answer } = numChoices(ans, [c, a * b, c * a - b, ans + a]);
    return cq({ pts: 4, choices, answer,
      q: [`□ − ${a} × ${b} = ${c}. What is □?`, `□ − ${a} × ${b} = ${c}。□ 是多少？`],
      hints: [[`${a} × ${b} = ${a * b}.`, `${a} × ${b} = ${a * b}。`],
        [`□ = ${c} + ${a * b} = ${ans}.`, `□ = ${c} + ${a * b} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), q = ri(2, 8), extra = ri(2, 9), product = q * a, right = product + extra;
    const good = String(product);
    const pool = [good, String(right), String(extra), String(a), String(q + extra), String(product + 1), String(product + 2)];
    const choices = [];
    pool.forEach(v => { if (!choices.includes(v)) choices.push(v); });
    const five = shuffle(choices.slice(0, 5));
    return cq({ pts: 4, choices: five, answer: five.indexOf(good),
      q: [`To solve □ × ${a} + ${extra} = ${right}, what is □ × ${a}?`,
        `要解 □ × ${a} + ${extra} = ${right}，□ × ${a} 等于多少？`],
      hints: [[`Take away ${extra} first: ${right} − ${extra} = ${product}.`, `先去掉 ${extra}：${right} − ${extra} = ${product}。`]],
      explain: [`${product}.`, `${product}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(3, 12), d = ri(1, Math.min(8, a * b + c - 1));
    const ans = a * b + c - d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} × ${b} + ${c} − ${d}?`, `${a} × ${b} + ${c} − ${d} = ?`],
      hints: [[`${a} × ${b} = ${a * b} first.`, `先算 ${a} × ${b} = ${a * b}。`],
        [`${a * b} + ${c} − ${d} = ${ans}.`, `${a * b} + ${c} − ${d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5), d = ri(2, 6), e = ri(2, 6);
    const ans = (a + b) * c + d * e;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: (${a} + ${b}) × ${c} + ${d} × ${e} = ?`, `Boss 题：(${a} + ${b}) × ${c} + ${d} × ${e} = ?`],
      hints: [[`(${a} + ${b}) × ${c} = ${(a + b) * c}.`, `(${a} + ${b}) × ${c} = ${(a + b) * c}。`],
        [`${d} × ${e} = ${d * e}. Then add them: ${ans}.`, `${d} × ${e} = ${d * e}。再相加得 ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  }
];

registerSeries({
  id: 'mix2', camp: true, breakEvery: 10, perRound: 20, games: ['blankdial', 'opmachine', 'opcombo'],
  tag: ['Mixed Ops Camp B · G4', '混合运算营 B · 四年级'],
  name: ['Several Steps', '多步与缺数'],
  desc: ['Longer + − × chains, and missing numbers', '多步加减乘，以及求方框里的数'],
  lesson: LESSON_MIX2,
  questions: Q_MIX2,
  next: null
});
