// Leap G4 · 分数营 B3：等价分数加练 2（约分 + 化同后再比）

const LESSON_FRAC2C = [
  {
    title: ['Make them look the same', '先化成一样再比'],
    text: ['To compare 2/6 and 1/2, rewrite 2/6 as 1/3, or rewrite 1/2 as 3/6. Then compare.',
      '比 2/6 和 1/2：可把 2/6 约成 1/3，或把 1/2 写成 3/6，再比。'],
    art(el) {
      el.innerHTML = lessonEq('2/6 = 1/3', .3) + lessonEq('1/2 = 3/6', 1.3);
    }
  },
  {
    title: ['Lowest terms', '最简分数'],
    text: ['Keep dividing until top and bottom share no common factor bigger than 1. 4/8 → 1/2.',
      '一直同除，直到分子分母只有公约数 1。4/8 → 1/2。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(8, 4)} ${fBar(2, 1)}</div>` + lessonEq('4/8 = 1/2', 1.2);
    }
  },
  {
    title: ['Trap: same digits ≠ equal', '陷阱：数字像≠相等'],
    text: ['2/4 and 2/6 both have 2 on top, but they are not equal. 2/4 = 1/2, 2/6 = 1/3.',
      '2/4 和 2/6 分子都是 2，但不相等。2/4 = 1/2，2/6 = 1/3。'],
    art(el) {
      el.innerHTML = lessonEq('2/4 ≠ 2/6', 1);
    }
  },
  {
    title: ['Practice round!', '加练开始！'],
    text: ['20 tougher equivalent / simplify / compare questions.',
      '20 道稍难：等价、约分、化同后再比。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_FRAC2C = [
  () => {
    const choices = shuffle(['1/2', '1/3', '2/3', '1/4', '3/4']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/2'),
      q: ['Simplify 5/10. What do you get?', '把 5/10 约分，得到？'],
      fig: fBar(10, 5),
      hints: [['Divide by 5.', '上下除以 5。']],
      explain: ['5/10 = 1/2.', '5/10 = 1/2。'] });
  },
  () => {
    const choices = shuffle(['1/2', '2/3', '1/3', '3/4', '1/4']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/2'),
      q: ['Which equals 6/12?', '哪个等于 6/12？'],
      hints: [['Half of 12 is 6.', '12 的一半是 6。']],
      explain: ['6/12 = 1/2.', '6/12 = 1/2。'] });
  },
  () => cq({ pts: 3, input: true, answer: 4,
    q: ['1/3 = □/12. What is □?', '1/3 = □/12，□ 是多少？'],
    hints: [['×4 on top and bottom.', '上下同乘 4。']],
    explain: ['□ = 4.', '□ = 4。'] }),
  () => cq({ pts: 3, input: true, answer: 2,
    q: ['□/8 = 1/4. What is □?', '□/8 = 1/4，□ 是多少？'],
    hints: [['1/4 of 8 is 2.', '8 的 1/4 是 2。']],
    explain: ['□ = 2.', '□ = 2。'] }),
  () => {
    const choices = [
      T('Equal', '相等'), T('2/4 larger', '2/4 更大'), T('2/6 larger', '2/6 更大'),
      T('Cannot tell', '无法比较'), T('Both = 1', '都等于 1')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Compare 2/4 and 2/6.', '比较 2/4 和 2/6。'],
      fig: `<div class="pics">${fBar(4, 2)}${fBar(6, 2)}</div>`,
      hints: [['2/4 = 1/2; 2/6 = 1/3; 1/2 > 1/3.', '2/4 = 1/2，2/6 = 1/3。']],
      explain: ['2/4 is larger.', '2/4 更大。'] });
  },
  () => {
    const choices = [
      T('Equal', '相等'), T('3/6 larger', '3/6 更大'), T('2/4 larger', '2/4 更大'),
      T('Cannot tell', '无法比较'), T('Both = 0', '都等于 0')
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: ['Is 3/6 equal to 2/4?', '3/6 等于 2/4 吗？'],
      hints: [['Both equal 1/2.', '都等于 1/2。']],
      explain: ['Equal (both 1/2).', '相等（都是 1/2）。'] });
  },
  () => {
    const choices = shuffle(['1/4', '1/2', '1/3', '2/4', '3/4']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/4'),
      q: ['Simplify 3/12.', '把 3/12 约分。'],
      hints: [['Divide by 3.', '上下除以 3。']],
      explain: ['3/12 = 1/4.', '3/12 = 1/4。'] });
  },
  () => cq({ pts: 4, input: true, answer: 1,
    q: ['4/8 = □/2. What is □?', '4/8 = □/2，□ 是多少？'],
    hints: [['4/8 = 1/2.', '4/8 = 1/2。']],
    explain: ['□ = 1.', '□ = 1。'] }),
  () => cq({ pts: 4, input: true, answer: 9,
    q: ['3/4 = □/12. What is □?', '3/4 = □/12，□ 是多少？'],
    hints: [['×3 on top and bottom.', '上下同乘 3。']],
    explain: ['□ = 9.', '□ = 9。'] }),
  () => {
    const choices = [
      T('1/3 larger', '1/3 更大'), T('2/8 larger', '2/8 更大'), T('Equal', '一样大'),
      T('Cannot tell', '无法比较'), T('Both = 1', '都等于 1')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which is larger: 2/8 or 1/3?', '2/8 和 1/3，哪个更大？'],
      hints: [['2/8 = 1/4; 1/3 > 1/4.', '2/8 = 1/4，1/3 > 1/4。']],
      explain: ['1/3 is larger.', '1/3 更大。'] });
  },
  () => {
    const choices = [
      T('Same', '一样多'), T('Ann more', 'Ann 更多'), T('Ben more', 'Ben 更多'),
      T('Cannot tell', '无法比较'), T('Both finished', '都吃完了')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Ann 2/6, Ben 1/3 of the same cake. Who more?',
        'Ann 有 2/6，Ben 有 1/3。谁更多？'],
      hints: [['2/6 = 1/3.', '2/6 = 1/3。']],
      explain: ['Same.', '一样多。'] });
  },
  () => {
    const choices = [
      T('1/2 and 4/8', '1/2 和 4/8'), T('1/2 and 1/4', '1/2 和 1/4'),
      T('2/3 and 1/3', '2/3 和 1/3'), T('3/6 and 1/4', '3/6 和 1/4'), T('2/5 and 1/2', '2/5 和 1/2')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which pair is equivalent?', '哪一组等价？'],
      hints: [['4/8 = 1/2.', '4/8 = 1/2。']],
      explain: ['1/2 = 4/8.', '1/2 = 4/8。'] });
  },
  () => cq({ pts: 4, input: true, answer: 1,
    q: ['Simplify 4/8 to a/b in lowest terms. What is a?',
      '把 4/8 约成最简 a/b。分子 a 是几？'],
    hints: [['4/8 = 1/2.', '4/8 = 1/2。']],
    explain: ['a = 1.', 'a = 1。'] }),
  () => cq({ pts: 4, input: true, answer: 2,
    q: ['Simplify 4/8 to a/b. What is b?', '把 4/8 约成最简 a/b。分母 b 是几？'],
    hints: [['1/2.', '1/2。']],
    explain: ['b = 2.', 'b = 2。'] }),
  () => {
    const choices = shuffle(['2/3', '1/2', '1/3', '3/4', '1/4']);
    return cq({ pts: 4, choices, answer: choices.indexOf('2/3'),
      q: ['Which equals 8/12?', '哪个等于 8/12？'],
      hints: [['Divide by 4.', '上下除以 4。']],
      explain: ['8/12 = 2/3.', '8/12 = 2/3。'] });
  },
  () => {
    const choices = [
      T('3/6 larger', '3/6 更大'), T('2/5 larger', '2/5 更大'), T('Equal', '一样大'),
      T('Cannot tell', '无法比较'), T('Both = 1', '都等于 1')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Compare 3/6 and 2/5.', '比较 3/6 和 2/5。'],
      hints: [['3/6 = 1/2; 1/2 > 2/5.', '3/6 = 1/2，一半大于 2/5。']],
      explain: ['3/6 is larger.', '3/6 更大。'] });
  },
  () => cq({ pts: 4, input: true, answer: 6,
    q: ['1/2 = 3/□. What is □?', '1/2 = 3/□，□ 是多少？'],
    hints: [['3 is half of □ → □ = 6.', '3 是 □ 的一半 → □ = 6。']],
    explain: ['□ = 6.', '□ = 6。'] }),
  () => {
    const choices = [
      T('Equal', '相等'), T('4/6 larger', '4/6 更大'), T('2/3 larger', '2/3 更大'),
      T('Cannot tell', '无法比较'), T('Both = 0', '都等于 0')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Is 4/6 equal to 2/3?', '4/6 等于 2/3 吗？'],
      fig: `<div class="pics">${fBar(6, 4)}${fBar(3, 2)}</div>`,
      hints: [['Divide 4/6 by 2.', '4/6 上下除以 2。']],
      explain: ['Equal.', '相等。'] });
  },
  () => {
    const choices = shuffle(['1/2', '1/3', '2/3', '3/4', '1/4']);
    return cq({ pts: 4, choices, answer: choices.indexOf('1/2'),
      q: ['5/10 equals which fraction below?', '5/10 等于下面哪一个？'],
      fig: fBar(10, 5),
      hints: [['Divide by 5.', '上下除以 5。']],
      explain: ['5/10 = 1/2.', '5/10 = 1/2。'] });
  },
  () => cq({ pts: 5, boss: true, input: true, answer: 1,
    q: ['Boss: 2/6 = □/3. What is □?', 'Boss 题：2/6 = □/3，□ 是多少？'],
    fig: `<div class="pics">${fBar(6, 2)}${fBar(3, 1)}</div>`,
    hints: [['Divide top and bottom by 2.', '上下同除以 2。'], ['2/6 = 1/3.', '2/6 = 1/3。']],
    explain: ['□ = 1.', '□ = 1。'] })
];

registerSeries({
  id: 'frac2c', camp: true, breakEvery: 10, perRound: 20, games: ['fracmem', 'fracmatch', 'piepop'],
  tag: ['Fraction Camp B3 · G4', '分数营 B3 · 四年级'],
  name: ['Equivalent · Extra 2', '等价分数 · 加练 2'],
  desc: ['Simplify, rewrite, then compare', '约分、改写后再比较'],
  lesson: LESSON_FRAC2C,
  questions: Q_FRAC2C,
  next: 'frac3'
});
