// Leap G4 · 分数营 B：等价与比较 — independent Leap data.

const LESSON_FRAC2 = [
  {
    title: ['Same amount, different name', '一样大，名字不同'],
    text: ['2/4 of a bar is the same amount as 1/2. We say 2/4 = 1/2. These are equivalent fractions.',
      '色带的 2/4 和 1/2 一样多，写成 2/4 = 1/2。这叫等价分数。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(2, 1)} ${fBar(4, 2)}</div>` + lessonEq('1/2 = 2/4', 1.2);
    }
  },
  {
    title: ['Multiply top and bottom by the same number', '上下同乘一个数'],
    text: ['Start with 1/3. Multiply numerator and denominator by 2: 2/6. Still the same amount!',
      '从 1/3 开始，分子分母同乘 2 得到 2/6，大小不变！'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(3, 1)} ${fBar(6, 2)}</div>` + lessonEq('1/3 = 2/6', 1.2);
    }
  },
  {
    title: ['Same denominator: compare numerators', '同分母：比分子'],
    text: ['3/8 and 5/8 have the same bottom number. The larger numerator is the larger fraction: 5/8 > 3/8.',
      '3/8 和 5/8 分母相同，分子大的分数更大：5/8 > 3/8。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(8, 3)} ${fBar(8, 5)}</div>` + lessonEq('5/8 > 3/8', 1);
    }
  },
  {
    title: ['Same numerator: compare denominators', '同分子：比分母'],
    text: ['1/3 and 1/5 both take one piece, but fifths are smaller pieces. So 1/3 > 1/5.',
      '1/3 和 1/5 都取 1 份，但分母越大，每份越小。所以 1/3 > 1/5。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fPie(3, 1, 44)} ${fPie(5, 1, 44)}</div>` + lessonEq('1/3 > 1/5', 1.2);
    }
  },
  {
    title: ['Simplify (reduce)', '约分'],
    text: ['4/8 can be simplified: divide top and bottom by 4 → 1/2. G4 students practice finding equivalent simpler fractions.',
      '4/8 可以约分：上下同除以 4 → 1/2。四年级要会找更简单的等价分数。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(8, 4)} ${fBar(2, 1)}</div>` + lessonEq('4/8 = 1/2', 1);
    }
  },
  {
    title: ['Ready to compare!', '准备比大小！'],
    text: ['20 questions on equivalent fractions and comparing. Mini game every 10.',
      '20 道等价分数与比大小题。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_FRAC2 = [
  () => {
    const choices = ['1/4', '1/2', '2/2', '3/4', '1/8'];
    return cq({ pts: 3, choices, answer: 1,
      q: ['Which fraction equals 2/4?', '哪个分数等于 2/4？'],
      fig: `<div class="pics">${fBar(4, 2)}${fBar(2, 1)}</div>`,
      hints: [['Half of the bar is shaded either way.', '两种涂法都是一半。'], ['2/4 = 1/2.', '2/4 = 1/2。']],
      explain: ['2/4 = 1/2.', '2/4 = 1/2。'] });
  },
  () => {
    const choices = ['1/6', '1/3', '1/2', '2/3', '3/3'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['Which equals 3/6?', '哪个等于 3/6？'],
      fig: fBar(6, 3),
      hints: [['3 of 6 is half.', '6 份中的 3 份是一半。']],
      explain: ['3/6 = 1/2.', '3/6 = 1/2。'] });
  },
  () => {
    const choices = [
      T('1/5 is larger', '1/5 更大'), T('3/5 is larger', '3/5 更大'), T('Equal', '一样大'),
      T('Cannot tell', '无法比较'), T('Both equal 1', '都等于 1')
    ];
    return cq({ pts: 3, choices, answer: 1,
      q: ['Which is larger: 1/5 or 3/5?', '1/5 和 3/5，哪个更大？'],
      fig: `<div class="pics">${fBar(5, 1)}${fBar(5, 3)}</div>`,
      hints: [['Same denominator → compare numerators.', '分母相同 → 比分子。']],
      explain: ['3/5 > 1/5.', '3/5 > 1/5。'] });
  },
  () => {
    const choices = [
      T('1/3 is larger', '1/3 更大'), T('1/5 is larger', '1/5 更大'), T('Equal', '一样大'),
      T('Cannot tell', '无法比较'), T('Both equal 0', '都等于 0')
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: ['Which is larger: 1/3 or 1/5?', '1/3 和 1/5，哪个更大？'],
      fig: `<div class="pics">${fPie(3, 1, 42)}${fPie(5, 1, 42)}</div>`,
      hints: [['Same numerator → smaller denominator is larger.', '分子相同 → 分母越小越大。']],
      explain: ['1/3 > 1/5.', '1/3 > 1/5。'] });
  },
  () => {
    const choices = ['1/8', '1/4', '1/2', '2/4', '3/8'];
    return cq({ pts: 3, choices, answer: 1,
      q: ['Which equals 2/8?', '哪个等于 2/8？'],
      fig: fBar(8, 2),
      hints: [['Divide top and bottom by 2.', '上下同除以 2。'], ['2/8 = 1/4.', '2/8 = 1/4。']],
      explain: ['2/8 = 1/4.', '2/8 = 1/4。'] });
  },
  () => {
    const choices = [
      T('2/6 larger', '2/6 更大'), T('5/6 larger', '5/6 更大'), T('Equal', '一样大'),
      T('Cannot tell', '无法比较'), T('Both > 1', '都大于 1')
    ];
    return cq({ pts: 3, choices, answer: 1,
      q: ['Compare 2/6 and 5/6.', '比较 2/6 和 5/6。'],
      hints: [['Same denominator.', '分母相同。']],
      explain: ['5/6 > 2/6.', '5/6 > 2/6。'] });
  },
  () => {
    const choices = ['1/8', '1/4', '1/2', '1/3', '2/3'];
    return cq({ pts: 3, choices, answer: 0,
      q: ['Which is smaller: 1/8 or 1/4?', '1/8 和 1/4，哪个更小？'],
      fig: `<div class="pics">${fPie(8, 1, 40)}${fPie(4, 1, 40)}</div>`,
      hints: [['Same numerator; larger denominator → smaller piece.', '分子相同，分母越大份越小。']],
      explain: ['1/8 is smaller.', '1/8 更小。'] });
  },
  () => {
    return cq({ pts: 3, choices: [
      T('Equal', '相等'), T('3/9 larger', '3/9 更大'), T('1/3 larger', '1/3 更大'),
      T('Cannot tell', '无法比较'), T('Both = 0', '都等于 0')
    ], answer: 0,
      q: ['Is 3/9 equal to 1/3?', '3/9 等于 1/3 吗？'],
      fig: `<div class="pics">${fBar(9, 3)}${fBar(3, 1)}</div>`,
      hints: [['Divide 3/9 by 3.', '3/9 上下除以 3。']],
      explain: ['3/9 = 1/3.', '3/9 = 1/3。'] });
  },
  () => {
    const choices = ['1/6', '1/3', '1/2', '2/3', '5/6'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['4/8 equals…', '4/8 等于…'],
      hints: [['Simplify by 4.', '上下除以 4。']],
      explain: ['4/8 = 1/2.', '4/8 = 1/2。'] });
  },
  () => {
    return cq({ pts: 3, input: true, answer: 2,
      q: ['1/3 = □/6. What is □?', '1/3 = □/6，□ 是多少？'],
      hints: [['Denominator ×2, so numerator ×2.', '分母×2，分子也×2。'], ['□ = 2.', '□ = 2。']],
      explain: ['1/3 = 2/6, so □ = 2.', '1/3 = 2/6，□ = 2。'] });
  },
  // 11–20
  () => {
    return cq({ pts: 4, input: true, answer: 3,
      q: ['□/6 = 1/2. What is □?', '□/6 = 1/2，□ 是多少？'],
      hints: [['Half of 6 is 3.', '6 的一半是 3。']],
      explain: ['3/6 = 1/2, □ = 3.', '3/6 = 1/2，□ = 3。'] });
  },
  () => {
    return cq({ pts: 4, input: true, answer: 6,
      q: ['2/□ = 1/3. What is □?', '2/□ = 1/3，□ 是多少？'],
      hints: [['2/6 = 1/3.', '2/6 = 1/3。']],
      explain: ['□ = 6.', '□ = 6。'] });
  },
  () => {
    const choices = [
      T('Ann more', 'Ann 更多'), T('Ben more', 'Ben 更多'), T('Same', '一样多'),
      T('Cannot tell', '无法比较'), T('Both finished the cake', '都吃完了')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Ann has 3/8 of a cake; Ben has 5/8 of the same cake. Who has more?', 'Ann 有蛋糕的 3/8，Ben 有 5/8。谁更多？'],
      hints: [['Same denominator.', '分母相同。']],
      explain: ['5/8 > 3/8 → Ben.', '5/8 > 3/8 → Ben。'] });
  },
  () => {
    const choices = [
      T('1/2 and 1/3', '1/2 和 1/3'), T('1/2 and 2/4', '1/2 和 2/4'),
      T('1/3 and 1/4', '1/3 和 1/4'), T('2/3 and 1/2', '2/3 和 1/2'), T('3/4 and 1/4', '3/4 和 1/4')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Which pair is equivalent?', '哪一组是等价分数？'],
      hints: [['Look for the same amount.', '找一样大的。']],
      explain: ['1/2 = 2/4.', '1/2 = 2/4。'] });
  },
  () => {
    const choices = ['1/2', '1/3', '1/4', '1/5', '1/6'];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which is the largest: 1/2, 1/3, 1/4, 1/5, 1/6?', '1/2、1/3、1/4、1/5、1/6，哪个最大？'],
      hints: [['Unit fractions: smaller denominator → larger value.', '单位分数：分母越小越大。']],
      explain: ['1/2 is largest.', '1/2 最大。'] });
  },
  () => {
    const choices = ['1/2', '1/3', '1/4', '1/5', '1/8'];
    return cq({ pts: 4, choices, answer: 4,
      q: ['Which is the smallest among 1/2, 1/3, 1/4, 1/5, 1/8?', '这些单位分数里哪个最小？'],
      hints: [['Largest denominator → smallest unit fraction.', '分母最大 → 单位分数最小。']],
      explain: ['1/8 is smallest.', '1/8 最小。'] });
  },
  () => {
    const choices = [
      T('Tom more', 'Tom 更多'), T('Mia more', 'Mia 更多'), T('Same', '一样多'),
      T('Cannot tell', '无法比较'), T('Neither ate', '都没吃')
    ];
    return cq({ pts: 4, choices, answer: 2,
      q: ['Tom ate 2/6 of a cake; Mia ate 1/3 of the same cake. Who ate more?', 'Tom 吃了 2/6，Mia 吃了 1/3。谁更多？'],
      hints: [['2/6 = 1/3.', '2/6 = 1/3。']],
      explain: ['Same amount.', '一样多。'] });
  },
  () => cq({ pts: 4, input: true, answer: 1,
      q: ['Simplify 4/8 to lowest terms a/b. What is the numerator a?', '把 4/8 约成最简分数 a/b。分子 a 是几？'],
      hints: [['Divide top and bottom by 4.', '上下同除以 4。'], ['4/8 = 1/2.', '4/8 = 1/2。']],
      explain: ['4/8 = 1/2; numerator a = 1.', '4/8 = 1/2；分子 a = 1。'] }),

  () => {
    const choices = [
      T('2/8 larger', '2/8 更大'), T('1/3 larger', '1/3 更大'), T('Equal', '一样大'),
      T('Cannot tell', '无法比较'), T('Both = 1', '都等于 1')
    ];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Which is larger: 2/8 or 1/3?', '2/8 和 1/3，哪个更大？'],
      hints: [['2/8 = 1/4; compare 1/4 and 1/3.', '2/8 = 1/4，再比 1/4 与 1/3。'], ['1/3 > 1/4.', '1/3 > 1/4。']],
      explain: ['1/3 is larger.', '1/3 更大。'] });
  },
  () => {
    return cq({ pts: 5, boss: true, input: true, answer: 1,
      q: ['2/6 = □/3. What is □?', '2/6 = □/3，□ 是多少？'],
      hints: [['Simplify 2/6 by dividing by 2.', '2/6 上下除以 2。'], ['2/6 = 1/3.', '2/6 = 1/3。']],
      explain: ['□ = 1.', '□ = 1。'] });
  }
];

registerSeries({
  id: 'frac2', camp: true, breakEvery: 10, perRound: 20, games: ['fracmatch', 'piepop', 'fracmem'],
  tag: ['Fraction Camp B · G4', '分数营 B · 四年级'],
  name: ['Equivalent & Compare', '等价与比较'],
  desc: ['Equivalent fractions, same/different denominators', '等价分数、同分母/同分子比较'],
  lesson: LESSON_FRAC2,
  questions: Q_FRAC2,
  next: 'frac2b'
});
