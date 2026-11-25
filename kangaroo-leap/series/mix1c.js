// Leap G4 · 混合运算营 A3：顺序与括号加练 2（陷阱加深）

const LESSON_MIX1C = [
  {
    title: ['Name the trap', '给陷阱起名字'],
    text: ['Trap “left-to-right only”: doing 8 − 3 × 2 as (8 − 3) × 2. Real answer: 8 − 6 = 2.',
      '陷阱「只会从左往右」：把 8 − 3 × 2 算成 (8 − 3) × 2。正确答案：8 − 6 = 2。'],
    art(el) {
      el.innerHTML = lessonEq('8 − <span class="hl">6</span> = 2', 1);
    }
  },
  {
    title: ['Parentheses vs no parentheses', '有括号 / 无括号'],
    text: ['Write both results. If they differ, the parentheses mattered.',
      '两边都算出来。不一样，就说明括号起作用了。'],
    art(el) {
      el.innerHTML = lessonEq('( ) changes order', 1);
    }
  },
  {
    title: ['Division follows the same rule', '除法同样规则'],
    text: ['24 ÷ 4 + 5 = 6 + 5 = 11. Divide before you add.',
      '24 ÷ 4 + 5 = 6 + 5 = 11。先除后加。'],
    art(el) {
      el.innerHTML = lessonEq('<span class="hl">24 ÷ 4</span> + 5 = 11', 1);
    }
  },
  {
    title: ['Longer chain, same rule', '更长也一样'],
    text: ['In 2 + 3 × 4 − 1, multiply first, then add and subtract left to right.',
      '2 + 3 × 4 − 1：先乘，再从左到右加减。'],
    art(el) {
      el.innerHTML = lessonEq('2 + 12 − 1 = 13', 1);
    }
  },
  {
    title: ['Practice round!', '加练开始！'],
    text: ['20 tougher trap questions. Say the first step every time.',
      '20 道更爱挖坑的题。每题先说出第一步。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX1C = [
  () => {
    const a = ri(2, 9), b = ri(2, 9), c = ri(2, 8);
    const ans = a + b * c, trap = (a + b) * c;
    const { choices, answer } = numChoices(ans, [trap, a * b * c, a + b + c, ans + 1]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} + ${b} × ${c} = ?`, `${a} + ${b} × ${c} = ?`],
      hints: [[`× first → ${b * c}.`, `先乘 → ${b * c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(16, 40), b = ri(2, 8), c = ri(2, 5);
    const ans = a - b * c, trap = (a - b) * c;
    const { choices, answer } = numChoices(ans, [trap, a - b - c, a * b - c]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} − ${b} × ${c} = ?`, `${a} − ${b} × ${c} = ?`],
      hints: [[`${b} × ${c} = ${b * c}.`, `${b} × ${c} = ${b * c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const b = ri(2, 6), c = ri(2, 6), a = b * c * ri(2, 4);
    const ans = a / b + c, trap = a / (b + c);
    const { choices, answer } = numChoices(ans, [trap, a / b - c, a - b + c].filter(v => Number.isFinite(v) && v >= 0));
    return cq({ pts: 4, choices, answer,
      q: [`${a} ÷ ${b} + ${c} = ?`, `${a} ÷ ${b} + ${c} = ?`],
      hints: [[`÷ first: ${a} ÷ ${b} = ${a / b}.`, `先除：${a} ÷ ${b} = ${a / b}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 6);
    const ans = (a + b) * c;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`(${a} + ${b}) × ${c} = ?`, `(${a} + ${b}) × ${c} = ?`],
      hints: [[`${a + b} × ${c}.`, `${a + b} × ${c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6);
    const ans = a * (b + c), trap = a * b + c;
    const { choices, answer } = numChoices(ans, [trap, a * b + a, (a + b) * c]);
    return cq({ pts: 4, choices, answer,
      q: [`${a} × (${b} + ${c}) = ?`, `${a} × (${b} + ${c}) = ?`],
      hints: [[`Inside ${b + c}.`, `括号内 ${b + c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6), d = ri(1, 5);
    return cq({ pts: 4, input: true, answer: a + b * c - d,
      q: [`${a} + ${b} × ${c} − ${d} = ?`, `${a} + ${b} × ${c} − ${d} = ?`],
      hints: [[`${b} × ${c} first.`, `先算 ${b} × ${c}。`]],
      explain: [`${a + b * c - d}.`, `${a + b * c - d}。`] });
  },
  () => {
    const b = ri(2, 4), a = b + ri(3, 8), c = ri(2, 5);
    const step = `${a} − ${b}`;
    const distractors = [`${b} × ${c}`, `${a} × ${c}`, `${a} − ${b} × ${c}`, `${a} + ${b}`, `${a} × ${b}`, `${b} + ${c}`]
      .filter(v => v !== step);
    const five = [step, ...shuffle([...new Set(distractors)])].slice(0, 5);
    const choices = shuffle(five);
    return cq({ pts: 3, choices, answer: choices.indexOf(step),
      q: [`In (${a} − ${b}) × ${c}, first step?`, `(${a} − ${b}) × ${c} 第一步？`],
      hints: [['Parentheses.', '先括号。']],
      explain: [`${a} − ${b}.`, `${a} − ${b}。`] });
  },
  () => {
    const a = ri(4, 10), b = ri(2, 5), c = ri(2, 6);
    const ans = (a - b) * c, trap = a - b * c;
    const { choices, answer } = numChoices(ans, [trap, a * c - b, a - b + c]);
    return cq({ pts: 4, choices, answer,
      q: [`(${a} − ${b}) × ${c} = ?`, `(${a} − ${b}) × ${c} = ?`],
      hints: [[`${a - b} × ${c}.`, `${a - b} × ${c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(15, 30), b = ri(2, 7), c = ri(2, 6);
    return cq({ pts: 4, input: true, answer: a - (b + c),
      q: [`${a} − (${b} + ${c}) = ?`, `${a} − (${b} + ${c}) = ?`],
      hints: [[`${b + c} inside.`, `括号内 ${b + c}。`]],
      explain: [`${a - (b + c)}.`, `${a - (b + c)}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const withP = (a + b) * c, noP = a + b * c;
    return cq({ pts: 4, choices: [
      T(`( ) = ${withP}, no ( ) = ${noP}`, `有括号 ${withP}，无 ${noP}`),
      T(`Both ${withP}`, `都是 ${withP}`),
      T(`Both ${noP}`, `都是 ${noP}`),
      T('Cannot tell', '无法判断'),
      T('Same as left-to-right', '等于从左往右')
    ], answer: withP === noP ? 1 : 0,
      q: [`Compare (${a} + ${b}) × ${c} and ${a} + ${b} × ${c}.`,
        `比较 (${a} + ${b}) × ${c} 与 ${a} + ${b} × ${c}。`],
      hints: [['Compute both.', '两边都算。']],
      explain: [`With ${withP}, without ${noP}.`, `有括号 ${withP}，无 ${noP}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    return cq({ pts: 4, input: true, answer: a * b + a * c,
      q: [`${a} × ${b} + ${a} × ${c} = ?`, `${a} × ${b} + ${a} × ${c} = ?`],
      hints: [[`${a * b} + ${a * c}.`, `${a * b} + ${a * c}。`]],
      explain: [`${a * b + a * c}.`, `${a * b + a * c}。`] });
  },
  () => {
    const choices = [
      T('20 − 3 × 4 = 68', '20 − 3 × 4 = 68'),
      T('20 − 3 × 4 = 8', '20 − 3 × 4 = 8'),
      T('(20 − 3) × 4 = 8', '(20 − 3) × 4 = 8'),
      T('20 − 3 × 4 = 17', '20 − 3 × 4 = 17'),
      T('20 × 3 − 4 = 8', '20 × 3 − 4 = 8')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Which equation is true?', '哪个算式正确？'],
      hints: [['20 − 12 = 8.', '20 − 12 = 8。']],
      explain: ['20 − 3 × 4 = 8.', '20 − 3 × 4 = 8。'] });
  },
  () => {
    const b = ri(2, 5), quot = ri(4, 9), c = ri(1, Math.min(3, quot - 1)), a = b * quot;
    const ans = quot - c;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${a} ÷ ${b} − ${c} = ?`, `${a} ÷ ${b} − ${c} = ?`],
      hints: [[`${a} ÷ ${b} = ${quot}.`, `${a} ÷ ${b} = ${quot}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(3, 8), c = ri(2, 5), d = ri(1, 5);
    return cq({ pts: 4, input: true, answer: (a + b) * c - d,
      q: [`(${a} + ${b}) × ${c} − ${d} = ?`, `(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`${a + b} × ${c} = ${(a + b) * c}.`, `${a + b} × ${c} = ${(a + b) * c}。`]],
      explain: [`${(a + b) * c - d}.`, `${(a + b) * c - d}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6);
    const left = a * (b + c), right = a * b + c;
    return cq({ pts: 4, choices: [
      T(`${a} × (${b} + ${c}) larger (${left})`, `${a} × (${b} + ${c}) 更大（${left}）`),
      T(`${a} × ${b} + ${c} larger (${right})`, `${a} × ${b} + ${c} 更大（${right}）`),
      T('Equal', '相等'), T('Cannot tell', '无法判断'), T('Same as + first', '等于先加')
    ], answer: left > right ? 0 : (left < right ? 1 : 2),
      q: [`Which is larger: ${a} × (${b} + ${c}) or ${a} × ${b} + ${c}?`,
        `${a} × (${b} + ${c}) 和 ${a} × ${b} + ${c}，谁大？`],
      hints: [[`${left} vs ${right}.`, `${left} 对 ${right}。`]],
      explain: [`${left} vs ${right}.`, `${left} 对 ${right}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const step = `${b} × ${c}`;
    const distractors = [`${a} + ${b}`, `${a} × ${b}`, `${b} + ${c}`, `${a} − ${c}`, `${a} × ${c}`, `${a} + ${b} × ${c}`]
      .filter(v => v !== step);
    const five = [step, ...shuffle([...new Set(distractors)])].slice(0, 5);
    const choices = shuffle(five);
    return cq({ pts: 3, choices, answer: choices.indexOf(step),
      q: [`First product in ${a} + ${b} × ${c}?`, `${a} + ${b} × ${c} 的第一步乘法？`],
      hints: [['The × segment.', '带 × 的一段。']],
      explain: [`${b} × ${c}.`, `${b} × ${c}。`] });
  },
  () => {
    const a = ri(3, 8), b = ri(2, 6), c = ri(2, 5);
    return cq({ pts: 4, input: true, answer: a * b + c,
      q: [`${a} × ${b} + ${c} = ?`, `${a} × ${b} + ${c} = ?`],
      hints: [[`${a * b} + ${c}.`, `${a * b} + ${c}。`]],
      explain: [`${a * b + c}.`, `${a * b + c}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5), d = ri(2, 5);
    return cq({ pts: 4, input: true, answer: a * b + c * d,
      q: [`${a} × ${b} + ${c} × ${d} = ?`, `${a} × ${b} + ${c} × ${d} = ?`],
      hints: [[`${a * b} + ${c * d}.`, `${a * b} + ${c * d}。`]],
      explain: [`${a * b + c * d}.`, `${a * b + c * d}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5);
    return cq({ pts: 4, input: true, answer: (a + b) * c - a,
      q: [`(${a} + ${b}) × ${c} − ${a} = ?`, `(${a} + ${b}) × ${c} − ${a} = ?`],
      hints: [[`${(a + b) * c} − ${a}.`, `${(a + b) * c} − ${a}。`]],
      explain: [`${(a + b) * c - a}.`, `${(a + b) * c - a}。`] });
  },
  () => {
    const a = ri(3, 8), b = ri(2, 7), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b) * c - d;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: (${a} + ${b}) × ${c} − ${d} = ?`, `Boss 题：(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`${a + b} → × ${c} = ${(a + b) * c}.`, `${a + b} → × ${c} = ${(a + b) * c}。`],
        [`Then − ${d}.`, `再减 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  }
];

registerSeries({
  id: 'mix1c', camp: true, breakEvery: 10, perRound: 20, games: ['parenfix', 'opcombo', 'opsprint'],
  tag: ['Mixed Ops A3 · G4', '混合运算营 A3 · 四年级'],
  name: ['Order & Parentheses · Extra 2', '顺序与括号 · 加练 2'],
  desc: ['Harder traps, ÷ mixed in, compare with/without ( )', '更难陷阱；带除法；有无括号对比'],
  lesson: LESSON_MIX1C,
  questions: Q_MIX1C,
  next: 'mix2'
});
