// Leap G4 · 分数营 B2：等价分数加练 1（1/2=2/4=3/6 等薄弱巩固）

const LESSON_FRAC2B = [
  {
    title: ['Half has many names', '一半有很多名字'],
    text: ['1/2 = 2/4 = 3/6 = 4/8. Same half of the whole, different cutting.',
      '1/2 = 2/4 = 3/6 = 4/8。都是整体的一半，只是切法不同。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(2, 1)} ${fBar(4, 2)} ${fBar(6, 3)}</div>`
        + lessonEq('1/2 = 2/4 = 3/6', 1.2);
    }
  },
  {
    title: ['Multiply top and bottom together', '上下一起乘'],
    text: ['1/2 ×(×3) → 3/6. Whatever you do to the bottom, do to the top.',
      '1/2 上下同乘 3 → 3/6。分母乘几，分子也乘几。'],
    art(el) {
      el.innerHTML = lessonEq('1/2 → 3/6', 1);
    }
  },
  {
    title: ['Divide to simplify', '同除来约分'],
    text: ['6/8 ÷2 → 3/4. Dividing top and bottom by the same number keeps the value.',
      '6/8 上下同除以 2 → 3/4。同除，大小不变。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(8, 6)} ${fBar(4, 3)}</div>`
        + lessonEq('6/8 = 3/4', 1.2);
    }
  },
  {
    title: ['Practice round!', '加练开始！'],
    text: ['20 questions focused on “same amount, different name.” Mini game every 10.',
      '20 道专练「一样大、名字不同」。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_FRAC2B = [
  () => {
    const choices = shuffle(['1/2', '1/3', '1/4', '2/3', '3/4']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/2'),
      q: ['Which equals 3/6?', '哪个等于 3/6？'],
      fig: fBar(6, 3),
      hints: [['3 of 6 is half.', '6 份里取 3 份是一半。']],
      explain: ['3/6 = 1/2.', '3/6 = 1/2。'] });
  },
  () => {
    const choices = shuffle(['1/2', '1/4', '2/2', '3/4', '1/8']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/2'),
      q: ['Which equals 2/4?', '哪个等于 2/4？'],
      fig: `<div class="pics">${fBar(4, 2)}${fBar(2, 1)}</div>`,
      hints: [['2/4 is half.', '2/4 是一半。']],
      explain: ['2/4 = 1/2.', '2/4 = 1/2。'] });
  },
  () => {
    const choices = shuffle(['1/2', '1/3', '1/4', '2/3', '3/8']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/2'),
      q: ['Which equals 4/8?', '哪个等于 4/8？'],
      fig: fBar(8, 4),
      hints: [['Divide by 4.', '上下除以 4。']],
      explain: ['4/8 = 1/2.', '4/8 = 1/2。'] });
  },
  () => cq({ pts: 3, input: true, answer: 3,
    q: ['1/2 = □/6. What is □?', '1/2 = □/6，□ 是多少？'],
    fig: `<div class="pics">${fBar(2, 1)}${fBar(6, 3)}</div>`,
    hints: [['Denominator ×3, numerator ×3.', '分母×3，分子也×3。']],
    explain: ['□ = 3.', '□ = 3。'] }),
  () => cq({ pts: 3, input: true, answer: 2,
    q: ['1/2 = □/4. What is □?', '1/2 = □/4，□ 是多少？'],
    hints: [['Half of 4 is 2.', '4 的一半是 2。']],
    explain: ['□ = 2.', '□ = 2。'] }),
  () => cq({ pts: 3, input: true, answer: 4,
    q: ['1/2 = □/8. What is □?', '1/2 = □/8，□ 是多少？'],
    hints: [['Half of 8 is 4.', '8 的一半是 4。']],
    explain: ['□ = 4.', '□ = 4。'] }),
  () => {
    const choices = [
      T('Equal', '相等'), T('1/2 larger', '1/2 更大'), T('3/6 larger', '3/6 更大'),
      T('Cannot tell', '无法比较'), T('Both = 0', '都等于 0')
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: ['Is 1/2 equal to 3/6?', '1/2 等于 3/6 吗？'],
      fig: `<div class="pics">${fBar(2, 1)}${fBar(6, 3)}</div>`,
      hints: [['Same half.', '都是一半。']],
      explain: ['Equal: 1/2 = 3/6.', '相等：1/2 = 3/6。'] });
  },
  () => {
    const choices = [
      T('Equal', '相等'), T('2/4 larger', '2/4 更大'), T('1/2 larger', '1/2 更大'),
      T('Cannot tell', '无法比较'), T('Both = 1', '都等于 1')
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: ['Is 2/4 equal to 1/2?', '2/4 等于 1/2 吗？'],
      hints: [['Simplify 2/4.', '约分 2/4。']],
      explain: ['Equal.', '相等。'] });
  },
  () => {
    const choices = shuffle(['1/3', '1/2', '2/3', '1/6', '3/3']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/3'),
      q: ['Which equals 2/6?', '哪个等于 2/6？'],
      fig: fBar(6, 2),
      hints: [['Divide by 2.', '上下除以 2。']],
      explain: ['2/6 = 1/3.', '2/6 = 1/3。'] });
  },
  () => {
    const choices = shuffle(['1/3', '1/4', '1/2', '2/3', '3/9']);
    return cq({ pts: 3, choices, answer: choices.indexOf('1/3'),
      q: ['Which equals 3/9?', '哪个等于 3/9？'],
      fig: fBar(9, 3),
      hints: [['Divide by 3.', '上下除以 3。']],
      explain: ['3/9 = 1/3.', '3/9 = 1/3。'] });
  },
  () => cq({ pts: 4, input: true, answer: 2,
    q: ['1/3 = □/6. What is □?', '1/3 = □/6，□ 是多少？'],
    hints: [['×2 on top and bottom.', '上下同乘 2。']],
    explain: ['□ = 2.', '□ = 2。'] }),
  () => cq({ pts: 4, input: true, answer: 3,
    q: ['□/6 = 1/2. What is □?', '□/6 = 1/2，□ 是多少？'],
    hints: [['Half of 6.', '6 的一半。']],
    explain: ['□ = 3.', '□ = 3。'] }),
  () => cq({ pts: 4, input: true, answer: 6,
    q: ['2/□ = 1/3. What is □?', '2/□ = 1/3，□ 是多少？'],
    hints: [['2/6 = 1/3.', '2/6 = 1/3。']],
    explain: ['□ = 6.', '□ = 6。'] }),
  () => {
    const choices = [
      T('1/2 and 3/6', '1/2 和 3/6'), T('1/2 and 1/3', '1/2 和 1/3'),
      T('1/3 and 1/4', '1/3 和 1/4'), T('2/3 and 1/2', '2/3 和 1/2'), T('3/4 and 1/4', '3/4 和 1/4')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which pair is equivalent?', '哪一组是等价分数？'],
      hints: [['Find the same amount.', '找一样大的。']],
      explain: ['1/2 = 3/6.', '1/2 = 3/6。'] });
  },
  () => {
    const choices = [
      T('1/2 and 2/4', '1/2 和 2/4'), T('1/4 and 1/2', '1/4 和 1/2'),
      T('2/3 and 1/3', '2/3 和 1/3'), T('1/5 and 2/5', '1/5 和 2/5'), T('3/8 and 1/2', '3/8 和 1/2')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which pair shows the same amount?', '哪一组表示一样多？'],
      fig: `<div class="pics">${fBar(2, 1)}${fBar(4, 2)}</div>`,
      hints: [['Half = half.', '一半 = 一半。']],
      explain: ['1/2 = 2/4.', '1/2 = 2/4。'] });
  },
  () => {
    const choices = shuffle(['1/4', '1/2', '1/8', '2/4', '3/4']);
    return cq({ pts: 4, choices, answer: choices.indexOf('1/4'),
      q: ['Which equals 2/8?', '哪个等于 2/8？'],
      fig: fBar(8, 2),
      hints: [['Divide by 2.', '上下除以 2。']],
      explain: ['2/8 = 1/4.', '2/8 = 1/4。'] });
  },
  () => {
    const choices = [
      T('Same', '一样多'), T('Tom more', 'Tom 更多'), T('Mia more', 'Mia 更多'),
      T('Cannot tell', '无法比较'), T('Neither', '都没有')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Tom ate 3/6 of a cake; Mia ate 1/2. Who ate more?',
        'Tom 吃了 3/6，Mia 吃了 1/2。谁更多？'],
      hints: [['3/6 = 1/2.', '3/6 = 1/2。']],
      explain: ['Same.', '一样多。'] });
  },
  () => cq({ pts: 4, input: true, answer: 4,
    q: ['2/4 = □/8. What is □?', '2/4 = □/8，□ 是多少？'],
    hints: [['×2 on top and bottom (2/4 = 1/2 = 4/8).', '上下同乘 2（或先约成 1/2）。']],
    explain: ['□ = 4.', '□ = 4。'] }),
  () => {
    const choices = shuffle(['3/4', '1/2', '2/3', '1/4', '6/6']);
    return cq({ pts: 4, choices, answer: choices.indexOf('3/4'),
      q: ['Which equals 6/8?', '哪个等于 6/8？'],
      fig: fBar(8, 6),
      hints: [['Divide by 2.', '上下除以 2。']],
      explain: ['6/8 = 3/4.', '6/8 = 3/4。'] });
  },
  () => cq({ pts: 5, boss: true, input: true, answer: 3,
    q: ['Boss: 1/2 = □/6. What is □?', 'Boss 题：1/2 = □/6，□ 是多少？'],
    fig: `<div class="pics">${fBar(2, 1)}${fBar(6, 3)}</div>`,
    hints: [['Denominator ×3 → numerator ×3.', '分母×3，分子×3。'], ['□ = 3.', '□ = 3。']],
    explain: ['□ = 3 (1/2 = 3/6).', '□ = 3（1/2 = 3/6）。'] })
];

registerSeries({
  id: 'frac2b', camp: true, breakEvery: 10, perRound: 20, games: ['fracmatch', 'piepop', 'barshade'],
  tag: ['Fraction Camp B2 · G4', '分数营 B2 · 四年级'],
  name: ['Equivalent · Extra 1', '等价分数 · 加练 1'],
  desc: ['Drill 1/2=2/4=3/6 and fill-the-blank equivalents', '专练 1/2=2/4=3/6 与填空等价'],
  lesson: LESSON_FRAC2B,
  questions: Q_FRAC2B,
  next: 'frac2c'
});
