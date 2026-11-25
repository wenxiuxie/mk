// Leap G4 · 混合运算营 A：顺序与括号 — independent Leap data (not Hop).

const LESSON_MIX1 = [
  {
    title: ['Multiply and divide first', '先乘除，后加减'],
    text: ['In 3 + 4 × 2, do not add first. Multiply 4 × 2 = 8, then 3 + 8 = 11.',
      '算 3 + 4 × 2 时，不能先加。先算 4 × 2 = 8，再算 3 + 8 = 11。'],
    art(el) {
      el.innerHTML = lessonEq('3 + 4 × 2', .2)
        + lessonEq('3 + <span class="hl">8</span>', 1.2)
        + lessonEq('= <span class="hl">11</span>', 2.2);
    }
  },
  {
    title: ['The left-to-right trap', '从左往右的陷阱'],
    text: ['If you wrongly do 3 + 4 first, you get 7 × 2 = 14. That is a common mistake!',
      '如果错误地先算 3 + 4，会得到 7 × 2 = 14。这是常见错法！'],
    art(el) {
      el.innerHTML = `<p class="big appear" style="color:#c8435a">${T('Wrong: (3+4)×2 = 14', '错：(3+4)×2 = 14')}</p>`
        + `<p class="big appear" style="animation-delay:1s;color:#2f8f6b">${T('Right: 3+(4×2) = 11', '对：3+(4×2) = 11')}</p>`;
    }
  },
  {
    title: ['Parentheses first', '有括号先算括号'],
    text: ['(3 + 4) × 2 means add first because of the parentheses: 7 × 2 = 14.',
      '(3 + 4) × 2 有括号，要先算括号里：7 × 2 = 14。'],
    art(el) {
      el.innerHTML = lessonEq('(<span class="hl">3 + 4</span>) × 2', .3)
        + lessonEq('7 × 2 = <span class="hl">14</span>', 1.4);
    }
  },
  {
    title: ['Which step first?', '哪一步先算？'],
    text: ['For 5 + 6 × 3, the first computation is 6 × 3. Circle the product in your mind before adding.',
      '对 5 + 6 × 3，第一步是 6 × 3。先在心里圈出乘法，再加。'],
    art(el) {
      el.innerHTML = lessonEq('5 + <span class="hl">6 × 3</span>', .3)
        + lessonEq('5 + 18 = 23', 1.5);
    }
  },
  {
    title: ['Subtract after multiply', '乘完再减'],
    text: ['20 − 3 × 4 = 20 − 12 = 8. Not (20 − 3) × 4!',
      '20 − 3 × 4 = 20 − 12 = 8。不是 (20 − 3) × 4！'],
    art(el) {
      el.innerHTML = lessonEq('20 − <span class="hl">3 × 4</span>', .2)
        + lessonEq('20 − 12 = <span class="hl">8</span>', 1.3);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 mixed-operation questions. A fun Leap mini game every 10 questions.',
      '20 道四年级混合运算题。每 10 题玩一次 Leap 新小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX1 = [
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const ans = a + b * c;
    const trap = (a + b) * c;
    const { choices, answer } = numChoices(ans, [trap, a + b + c, a * b + c]);
    return cq({ pts: 3, choices, answer,
      q: [`What is ${a} + ${b} × ${c}?`, `${a} + ${b} × ${c} = ?`],
      hints: [[`Do ${b} × ${c} first.`, `先算 ${b} × ${c}。`], [`${b} × ${c} = ${b * c}, then + ${a}.`, `${b} × ${c} = ${b * c}，再加 ${a}。`]],
      explain: [`${a} + ${b * c} = ${ans}.`, `${a} + ${b * c} = ${ans}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 6);
    const first = `${b} × ${c}`;
    const wrong = [`${a} + ${b}`, `${a} × ${c}`, `${a} + ${b} × ${c}`, `${a} × ${b}`];
    const choices = shuffle([first, ...shuffle(wrong).slice(0, 4)]);
    return cq({ pts: 3, choices, answer: choices.indexOf(first),
      q: [`In ${a} + ${b} × ${c}, which part should you compute first?`, `${a} + ${b} × ${c} 应先算哪一部分？`],
      hints: [['Multiply before add.', '先乘后加。']],
      explain: [`First ${b} × ${c}.`, `先算 ${b} × ${c}。`] });
  },
  () => {
    const a = ri(3, 9), b = ri(2, 8), c = ri(2, 5);
    const ans = a * b - c;
    const { choices, answer } = numChoices(ans, [(a - b) * c, a * (b - c), a + b - c]);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`What is ${a} × ${b} − ${c}?`, `${a} × ${b} − ${c} = ?`],
      hints: [[`Multiply first: ${a} × ${b} = ${a * b}.`, `先乘：${a} × ${b} = ${a * b}。`]],
      explain: [`${a * b} − ${c} = ${ans}.`, `${a * b} − ${c} = ${ans}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 6);
    const ans = (a + b) * c;
    const trap = a + b * c;
    const { choices, answer } = numChoices(ans, [trap, a * b * c, a + b + c]);
    return cq({ pts: 3, choices, answer,
      q: [`What is (${a} + ${b}) × ${c}?`, `(${a} + ${b}) × ${c} = ?`],
      hints: [[`Parentheses first: ${a} + ${b} = ${a + b}.`, `先算括号：${a} + ${b} = ${a + b}。`]],
      explain: [`${a + b} × ${c} = ${ans}.`, `${a + b} × ${c} = ${ans}。`] });
  },
  () => {
    const a = ri(12, 30), b = ri(2, 8), c = ri(2, 5);
    const ans = a - b * c;
    const trap = (a - b) * c;
    const { choices, answer } = numChoices(ans, [trap, a - b - c, a + b * c]);
    return cq({ pts: 3, choices, answer,
      q: [`What is ${a} − ${b} × ${c}?`, `${a} − ${b} × ${c} = ?`],
      hints: [[`Multiply first: ${b} × ${c} = ${b * c}.`, `先乘：${b} × ${c} = ${b * c}。`]],
      explain: [`${a} − ${b * c} = ${ans}.`, `${a} − ${b * c} = ${ans}。`] });
  },
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 7);
    const ans = a * b + c;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`What is ${a} × ${b} + ${c}?`, `${a} × ${b} + ${c} = ?`],
      hints: [[`${a} × ${b} = ${a * b}.`, `${a} × ${b} = ${a * b}。`]],
      explain: [`${a * b} + ${c} = ${ans}.`, `${a * b} + ${c} = ${ans}。`] });
  },
  () => {
    const choices = [
      T('Add first', '先加'), T('Multiply first', '先乘'), T('Either order', '随便哪边先'),
      T('Subtract first', '先减'), T('Only left to right', '只能从左往右')
    ];
    return cq({ pts: 3, choices, answer: 1,
      q: ['For 6 + 5 × 3 with no parentheses, what do you do first?', '没有括号的 6 + 5 × 3，应先做什么？'],
      hints: [['Order: × and ÷ before + and −.', '顺序：先乘除后加减。']],
      explain: ['Multiply first.', '先乘。'] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 5);
    const ans = a * (b + c);
    const trap = a * b + c;
    const { choices, answer } = numChoices(ans, [trap, a + b + c, (a + b) * c]);
    return cq({ pts: 3, choices, answer,
      q: [`What is ${a} × (${b} + ${c})?`, `${a} × (${b} + ${c}) = ?`],
      hints: [[`Inside: ${b} + ${c} = ${b + c}.`, `括号内：${b} + ${c} = ${b + c}。`]],
      explain: [`${a} × ${b + c} = ${ans}.`, `${a} × ${b + c} = ${ans}。`] });
  },
  () => {
    const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
    const wrong = a + b * c;
    const right = (a + b) * c;
    return cq({ pts: 3, choices: [String(wrong), String(right), String(a * b * c), String(a + b + c), String(a * b + c)],
      answer: 0,
      q: [`A student computed (${a} + ${b}) × ${c} but forgot the parentheses and did left-to-right with × first on a different problem… Wait: What is the CORRECT value of ${a} + ${b} × ${c}?`,
          `${a} + ${b} × ${c} 的正确得数是？`],
      hints: [[`No parentheses: multiply first.`, '没括号：先乘。'], [`${a} + ${b * c} = ${wrong}.`, `${a} + ${b * c} = ${wrong}。`]],
      explain: [`${wrong}.`, `${wrong}。`] });
  },
  () => {
    // Fix Q9 - make cleaner
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const ans = a + b * c;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`Compute ${a} + ${b} × ${c}.`, `计算 ${a} + ${b} × ${c}。`],
      hints: [[`First ${b} × ${c} = ${b * c}.`, `先算 ${b} × ${c} = ${b * c}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  // 11–20
  () => {
    const a = ri(2, 7), b = ri(2, 7), c = ri(2, 6), d = ri(1, 5);
    const ans = a + b * c - d;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} + ${b} × ${c} − ${d}?`, `${a} + ${b} × ${c} − ${d} = ?`],
      hints: [[`Multiply first, then add and subtract left to right.`, '先乘，再从左到右加减。'],
        [`${b} × ${c} = ${b * c}; then ${a} + ${b * c} − ${d}.`, `${b} × ${c} = ${b * c}；再算 ${a} + ${b * c} − ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(3, 9), b = ri(2, 8), c = ri(2, 5);
    const first = `(${a} − ${b})`;
    // actually expression (a-b)*c — ask first step
    const step = `${a} − ${b}`;
    const choices = shuffle([step, `${b} × ${c}`, `${a} × ${c}`, `${a} − ${b} × ${c}`, `${a} + ${b}`]);
    return cq({ pts: 4, choices, answer: choices.indexOf(step),
      q: [`In (${a} − ${b}) × ${c}, what do you compute first?`, `(${a} − ${b}) × ${c} 应先算什么？`],
      hints: [['Parentheses first.', '先算括号。']],
      explain: [`First ${a} − ${b}.`, `先算 ${a} − ${b}。`] });
  },
  () => {
    const a = ri(4, 9), b = ri(2, 5), c = ri(2, 5);
    const ans = (a - b) * c;
    const { choices, answer } = numChoices(ans, [a - b * c, a * c - b, a - b + c]);
    return cq({ pts: 4, choices, answer,
      q: [`What is (${a} − ${b}) × ${c}?`, `(${a} − ${b}) × ${c} = ?`],
      hints: [[`${a} − ${b} = ${a - b}.`, `${a} − ${b} = ${a - b}。`]],
      explain: [`${a - b} × ${c} = ${ans}.`, `${a - b} × ${c} = ${ans}。`] });
  },
  () => {
    const a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
    const withParen = (a + b) * c;
    const noParen = a + b * c;
    return cq({ pts: 4, choices: [
      T(`Same (${withParen})`, `一样（都是 ${withParen}）`),
      T(`Different: with ( ) = ${withParen}, without = ${noParen}`, `不同：有括号 ${withParen}，无括号 ${noParen}`),
      T('Always the same', '永远一样'),
      T('Cannot tell', '无法判断'),
      T('Only parentheses matter for +', '括号只对加法有用')
    ], answer: withParen === noParen ? 0 : 1,
      q: [`Compare (${a} + ${b}) × ${c} and ${a} + ${b} × ${c}. Same or different?`,
          `比较 (${a} + ${b}) × ${c} 和 ${a} + ${b} × ${c}。一样还是不一样？`],
      hints: [['Parentheses change the order.', '括号会改变运算顺序。']],
      explain: [withParen === noParen
        ? `By chance same: ${withParen}.`
        : `With parentheses ${withParen}; without ${noParen}.`,
        withParen === noParen
          ? `碰巧一样：${withParen}。`
          : `有括号得 ${withParen}；无括号得 ${noParen}。`] });
  },
  () => {
    const a = ri(2, 8), b = ri(2, 8), c = ri(2, 8);
    const ans = a * b + a * c; // distributive feel but compute as a*b + a*c via ops
    // actually teach: a × b + a × c
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a} × ${b} + ${a} × ${c}?`, `${a} × ${b} + ${a} × ${c} = ?`],
      hints: [[`Two products: ${a * b} and ${a * c}.`, `两个积：${a * b} 和 ${a * c}。`]],
      explain: [`${a * b} + ${a * c} = ${ans}.`, `${a * b} + ${a * c} = ${ans}。`] });
  },
  () => {
    const a = ri(10, 24), b = ri(2, 6), c = ri(2, 5);
    const ans = a - (b + c); // need parentheses in expression
    return cq({ pts: 4, choices: numChoices(ans, [a - b + c, a - b - c + 1, (a - b) * c]).choices,
      answer: numChoices(ans, [a - b + c, a - b - c + 1, (a - b) * c]).answer,
      q: [`What is ${a} − (${b} + ${c})?`, `${a} − (${b} + ${c}) = ?`],
      hints: [[`Inside first: ${b} + ${c} = ${b + c}.`, `先算括号：${b} + ${c} = ${b + c}。`]],
      explain: [`${a} − ${b + c} = ${ans}.`, `${a} − ${b + c} = ${ans}。`] });
  },
  () => {
    const choices = [
      T('3 + 4 × 2 = 14', '3 + 4 × 2 = 14'),
      T('3 + 4 × 2 = 11', '3 + 4 × 2 = 11'),
      T('(3 + 4) × 2 = 11', '(3 + 4) × 2 = 11'),
      T('3 × 4 + 2 = 9', '3 × 4 + 2 = 9'),
      T('3 + 4 + 2 = 11', '3 + 4 + 2 = 11')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Which equation is true?', '哪个算式正确？'],
      hints: [['3 + 4 × 2 = 3 + 8 = 11.', '3 + 4 × 2 = 3 + 8 = 11。']],
      explain: ['3 + 4 × 2 = 11 is true.', '3 + 4 × 2 = 11 正确。'] });
  },
  () => {
    const a = ri(2, 6), b = ri(3, 8), c = ri(2, 5);
    const ans = (a + b) * c - a;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is (${a} + ${b}) × ${c} − ${a}?`, `(${a} + ${b}) × ${c} − ${a} = ?`],
      hints: [[`Parentheses: ${a} + ${b} = ${a + b}.`, `括号：${a} + ${b} = ${a + b}。`],
        [`Then × ${c} = ${(a + b) * c}; minus ${a}.`, `再 × ${c} = ${(a + b) * c}；减去 ${a}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
    const step = `${b} × ${c}`;
    const choices = shuffle([step, `${a} + ${b}`, `${a} × ${b}`, `${a} − ${c}`, `${b} + ${c}`]);
    return cq({ pts: 4, choices, answer: choices.indexOf(step),
      q: [`To evaluate ${a} + ${b} × ${c}, tap the first product.`, `计算 ${a} + ${b} × ${c} 时，先点出第一步乘法。`],
      hints: [['The product is the × part.', '乘法就是带 × 的那一段。']],
      explain: [`First ${b} × ${c}.`, `先算 ${b} × ${c}。`] });
  },
  () => {
    const a = ri(3, 8), b = ri(2, 7), c = ri(2, 6), d = ri(2, 5);
    const ans = (a + b) * c - d;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: (${a} + ${b}) × ${c} − ${d} = ?`, `Boss 题：(${a} + ${b}) × ${c} − ${d} = ?`],
      hints: [[`Parentheses → ${a + b}.`, `括号 → ${a + b}。`],
        [`${a + b} × ${c} = ${(a + b) * c}; then − ${d}.`, `${a + b} × ${c} = ${(a + b) * c}；再减 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  }
];

registerSeries({
  id: 'mix1', camp: true, breakEvery: 10, perRound: 20, games: ['opmachine', 'opsprint', 'parenfix', 'opcombo'],
  tag: ['Mixed Ops Camp A · G4', '混合运算营 A · 四年级'],
  name: ['Order & Parentheses', '顺序与括号'],
  desc: ['×÷ before +− , parentheses first, common traps', '先乘除后加减、先算括号、常见陷阱'],
  lesson: LESSON_MIX1,
  questions: Q_MIX1,
  next: 'mix1b'
});
