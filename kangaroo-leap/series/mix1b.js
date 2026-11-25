// Leap G4 · 混合运算营 A2：顺序与括号加练（薄弱巩固）

const LESSON_MIX1B = [
  {
    title: ['Still: ×÷ first', '还是：先乘除'],
    text: ['5 + 3 × 4 = 5 + 12 = 17. Never add 5 + 3 first.',
      '5 + 3 × 4 = 5 + 12 = 17。千万不要先算 5 + 3。'],
    art(el) {
      el.innerHTML = lessonEq('5 + <span class="hl">3 × 4</span>', .3)
        + lessonEq('5 + 12 = 17', 1.4);
    }
  },
  {
    title: ['Subtract after product', '乘完再减'],
    text: ['18 − 2 × 5 = 18 − 10 = 8. The trap (18 − 2) × 5 = 80 is wrong.',
      '18 − 2 × 5 = 18 − 10 = 8。错成 (18 − 2) × 5 = 80 很常见。'],
    art(el) {
      el.innerHTML = lessonEq('18 − <span class="hl">10</span> = 8', 1);
    }
  },
  {
    title: ['Parentheses change order', '括号改顺序'],
    text: ['(5 + 3) × 4 = 8 × 4 = 32. Different from 5 + 3 × 4 = 17.',
      '(5 + 3) × 4 = 8 × 4 = 32。和 5 + 3 × 4 = 17 不一样。'],
    art(el) {
      el.innerHTML = lessonEq('(<span class="hl">5 + 3</span>) × 4 = 32', 1);
    }
  },
  {
    title: ['Say the first step out loud', '大声说出第一步'],
    text: ['Before you write the answer, say: “First I do ___.” That habit catches traps.',
      '写答案前先说：「我先算 ___。」这个习惯能躲开陷阱。'],
    art(el) {
      el.innerHTML = lessonEq('First → then', 1);
    }
  },
  {
    title: ['Practice round!', '加练开始！'],
    text: ['20 more order-and-parentheses questions. Focus on the first step every time.',
      '再练 20 道顺序与括号。每一题都先想清楚第一步。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX1B = [
  () => {
    const a = ri(2, 9), b = ri(2, 9), c = ri(2, 8);
    const ans = a + b * c, trap = (a + b) * c;
    const { choices, answer } = numChoices(ans, [trap, a * b + c, a + b + c]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} + ${b} × ${c} = ?`, `${a} + ${b} × ${c} = ?`],
      hints: [[`First ${b} × ${c} = ${b * c}.`, `先算 ${b} × ${c} = ${b * c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(15, 36), b = ri(2, 8), c = ri(2, 5);
    const ans = a - b * c, trap = (a - b) * c;
    const { choices, answer } = numChoices(ans, [trap, a - b - c, a + b * c]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} − ${b} × ${c} = ?`, `${a} − ${b} × ${c} = ?`],
      hints: [[`First ${b} × ${c} = ${b * c}.`, `先算 ${b} × ${c} = ${b * c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 7);
    const step = `${b} × ${c}`;
    const distractors = [`${a} + ${b}`, `${a} × ${b}`, `${a} + ${b} × ${c}`, `${b} + ${c}`, `${a} − ${c}`, `${a} × ${c}`]
      .filter(v => v !== step);
    const five = [step, ...shuffle([...new Set(distractors)])].slice(0, 5);
    const choices = shuffle(five);
    return cq({ pts: 3, choices, answer: choices.indexOf(step),
      q: [`In ${a} + ${b} × ${c}, what is the first step?`, `${a} + ${b} × ${c} 的第一步是？`],
      hints: [['Multiply before add.', '先乘后加。']],
      explain: [`${b} × ${c}.`, `${b} × ${c}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 6);
    const ans = (a + b) * c, trap = a + b * c;
    const { choices, answer } = numChoices(ans, [trap, a * b * c, a + b + c]);
    return cq({ pts: 3, choices, answer,
      q: [`(${a} + ${b}) × ${c} = ?`, `(${a} + ${b}) × ${c} = ?`],
      hints: [[`Parentheses: ${a} + ${b} = ${a + b}.`, `括号：${a} + ${b} = ${a + b}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(3, 9), b = ri(2, 8), c = ri(1, 6);
    return cq({ pts: 3, input: true, answer: a * b - c,
      q: [`${a} × ${b} − ${c} = ?`, `${a} × ${b} − ${c} = ?`],
      hints: [[`${a} × ${b} = ${a * b}.`, `${a} × ${b} = ${a * b}。`]],
      explain: [`${a * b - c}.`, `${a * b - c}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6);
    const ans = a * (b + c), trap = a * b + c;
    const { choices, answer } = numChoices(ans, [trap, a + b + c, (a + b) * c]);
    return cq({ pts: 3, choices, answer,
      q: [`${a} × (${b} + ${c}) = ?`, `${a} × (${b} + ${c}) = ?`],
      hints: [[`Inside ${b} + ${c} = ${b + c}.`, `括号内 ${b} + ${c} = ${b + c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => cq({ pts: 3, choices: [
      T('Add first', '先加'), T('Multiply first', '先乘'), T('Either', '随便'),
      T('Subtract first', '先减'), T('Divide first', '先除')
    ], answer: 1,
    q: ['No parentheses: 7 + 2 × 6. What first?', '没有括号：7 + 2 × 6。先做什么？'],
    hints: [['× before +.', '先乘后加。']],
    explain: ['Multiply first.', '先乘。'] }),
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    return cq({ pts: 3, input: true, answer: a * b + c,
      q: [`${a} × ${b} + ${c} = ?`, `${a} × ${b} + ${c} = ?`],
      hints: [[`${a} × ${b} = ${a * b}.`, `${a} × ${b} = ${a * b}。`]],
      explain: [`${a * b + c}.`, `${a * b + c}。`] });
  },
  () => {
    const b = ri(2, 5), a = b + ri(2, 6), c = ri(2, 5);
    const ans = (a - b) * c, trap = a - b * c;
    const { choices, answer } = numChoices(ans, [trap, a * c - b, a - b + c]);
    return cq({ pts: 4, choices, answer,
      q: [`(${a} − ${b}) × ${c} = ?`, `(${a} − ${b}) × ${c} = ?`],
      hints: [[`${a} − ${b} = ${a - b}.`, `${a} − ${b} = ${a - b}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(12, 28), b = ri(2, 6), c = ri(2, 5);
    return cq({ pts: 3, input: true, answer: a - (b + c),
      q: [`${a} − (${b} + ${c}) = ?`, `${a} − (${b} + ${c}) = ?`],
      hints: [[`${b} + ${c} = ${b + c}.`, `${b} + ${c} = ${b + c}。`]],
      explain: [`${a - (b + c)}.`, `${a - (b + c)}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6), d = ri(1, 5);
    return cq({ pts: 4, input: true, answer: a + b * c - d,
      q: [`${a} + ${b} × ${c} − ${d} = ?`, `${a} + ${b} × ${c} − ${d} = ?`],
      hints: [[`First ${b} × ${c} = ${b * c}.`, `先算 ${b} × ${c} = ${b * c}。`]],
      explain: [`${a + b * c - d}.`, `${a + b * c - d}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const withP = (a + b) * c, noP = a + b * c;
    const same = withP === noP;
    return cq({ pts: 4, choices: [
      T(`Same (${withP})`, `一样（${withP}）`),
      T(`Different: ( ) ${withP}, no ( ) ${noP}`, `不同：有括号 ${withP}，无 ${noP}`),
      T('Always same', '永远一样'), T('Always different', '永远不同'), T('Cannot tell', '无法判断')
    ], answer: same ? 0 : 1,
      q: [`(${a} + ${b}) × ${c} vs ${a} + ${b} × ${c}?`, `(${a} + ${b}) × ${c} 和 ${a} + ${b} × ${c}？`],
      hints: [['Compute both.', '两边都算一遍。']],
      explain: [same ? `Same ${withP}.` : `With ${withP}, without ${noP}.`,
        same ? `一样是 ${withP}。` : `有括号 ${withP}，无括号 ${noP}。`] });
  },
  () => {
    const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
    const wrong = (a + b) * c, right = a + b * c;
    const { choices, answer } = numChoices(right, [wrong, a * b + c, a + b + c]);
    return cq({ pts: 4, choices, answer,
      q: [`Correct value of ${a} + ${b} × ${c}?`, `${a} + ${b} × ${c} 正确得数？`],
      hints: [[`No ( ): multiply first → ${right}.`, '没括号：先乘。']],
      explain: [`${right}.`, `${right}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    return cq({ pts: 4, input: true, answer: a * b + a * c,
      q: [`${a} × ${b} + ${a} × ${c} = ?`, `${a} × ${b} + ${a} × ${c} = ?`],
      hints: [[`${a * b} + ${a * c}.`, `${a * b} + ${a * c}。`]],
      explain: [`${a * b + a * c}.`, `${a * b + a * c}。`] });
  },
  () => {
    const step = '6 × 3';
    const five = shuffle([step, '5 + 6', '5 × 3', '5 + 6 × 3', '6 + 3']);
    return cq({ pts: 3, choices: five, answer: five.indexOf(step),
      q: ['In 5 + 6 × 3, tap the first product.', '5 + 6 × 3，点出第一步乘法。'],
      hints: [['The × part.', '带 × 的那一段。']],
      explain: ['6 × 3.', '6 × 3。'] });
  },
  () => {
    const a = ri(2, 6), b = ri(3, 8), c = ri(2, 5);
    return cq({ pts: 4, input: true, answer: (a + b) * c - a,
      q: [`(${a} + ${b}) × ${c} − ${a} = ?`, `(${a} + ${b}) × ${c} − ${a} = ?`],
      hints: [[`${a + b} × ${c} = ${(a + b) * c}.`, `${a + b} × ${c} = ${(a + b) * c}。`]],
      explain: [`${(a + b) * c - a}.`, `${(a + b) * c - a}。`] });
  },
  () => {
    const choices = [
      T('3 + 4 × 2 = 14', '3 + 4 × 2 = 14'),
      T('3 + 4 × 2 = 11', '3 + 4 × 2 = 11'),
      T('(3 + 4) × 2 = 11', '(3 + 4) × 2 = 11'),
      T('3 × 4 + 2 = 9', '3 × 4 + 2 = 9'),
      T('4 × 2 + 3 = 14', '4 × 2 + 3 = 14')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Which is true?', '哪个正确？'],
      hints: [['3 + 8 = 11.', '3 + 8 = 11。']],
      explain: ['3 + 4 × 2 = 11.', '3 + 4 × 2 = 11。'] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 5), c = ri(2, 5);
    // exact division
    const prod = b * c, left = a * prod;
    return cq({ pts: 4, input: true, answer: left / b + c,
      q: [`${left} ÷ ${b} + ${c} = ?`, `${left} ÷ ${b} + ${c} = ?`],
      hints: [[`Divide first: ${left} ÷ ${b} = ${left / b}.`, `先除：${left} ÷ ${b} = ${left / b}。`]],
      explain: [`${left / b + c}.`, `${left / b + c}。`] });
  },
  () => {
    const a = ri(3, 8), b = ri(2, 6), c = ri(2, 5), d = ri(1, 4);
    return cq({ pts: 4, input: true, answer: (a + b) * c - d,
      q: [`(${a} + ${b}) × ${c} − ${d} = ?`, `(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`Parentheses → ${a + b}.`, `括号 → ${a + b}。`]],
      explain: [`${(a + b) * c - d}.`, `${(a + b) * c - d}。`] });
  },
  () => {
    const a = ri(3, 9), b = ri(2, 7), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b) * c - d;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: (${a} + ${b}) × ${c} − ${d} = ?`, `Boss 题：(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`${a} + ${b} = ${a + b}.`, `${a} + ${b} = ${a + b}。`],
        [`${a + b} × ${c} = ${(a + b) * c}; − ${d}.`, `${a + b} × ${c} = ${(a + b) * c}；再减 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  }
];

registerSeries({
  id: 'mix1b', camp: true, breakEvery: 10, perRound: 20, games: ['opsprint', 'parenfix', 'opmachine'],
  tag: ['Mixed Ops A2 · G4', '混合运算营 A2 · 四年级'],
  name: ['Order & Parentheses · Extra 1', '顺序与括号 · 加练 1'],
  desc: ['More first-step drills and common traps', '多练第一步，躲开常见陷阱'],
  lesson: LESSON_MIX1B,
  questions: Q_MIX1B,
  next: 'mix1c'
});
