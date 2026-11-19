// Leap G4 · 分数营 C：同分母加减 — independent Leap data.

const LESSON_FRAC3 = [
  {
    title: ['Add with the same denominator', '同分母相加'],
    text: ['1/5 + 2/5: keep the denominator 5, add the numerators: 3/5.',
      '1/5 + 2/5：分母不变仍是 5，分子相加得 3/5。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(5, 1)}${fBar(5, 2)}${fBar(5, 3)}</div>` + lessonEq('1/5 + 2/5 = 3/5', 1.2);
    }
  },
  {
    title: ['Subtract with the same denominator', '同分母相减'],
    text: ['4/5 − 1/5: keep 5, subtract numerators: 3/5.',
      '4/5 − 1/5：分母仍是 5，分子相减得 3/5。'],
    art(el) {
      el.innerHTML = `<div class="pics">${fBar(5, 4)}${fBar(5, 3)}</div>` + lessonEq('4/5 − 1/5 = 3/5', 1);
    }
  },
  {
    title: ['Adding to one whole', '加到变成 1'],
    text: ['1/4 + 3/4 = 4/4 = 1. When numerators add up to the denominator, you get one whole.',
      '1/4 + 3/4 = 4/4 = 1。分子加起来等于分母，就是 1 个整体。'],
    art(el) {
      el.innerHTML = fBar(4, 4) + lessonEq('1/4 + 3/4 = 1', 1);
    }
  },
  {
    title: ['How much is left?', '还剩几分之几'],
    text: ['A whole cake is 1 = 5/5. Eat 2/5: left 3/5. Think “from the whole, subtract what was taken”.',
      '整块蛋糕是 1 = 5/5。吃掉 2/5，还剩 3/5。从整体里减去吃掉的。'],
    art(el) {
      el.innerHTML = fPie(5, 3) + lessonEq('1 − 2/5 = 3/5', 1);
    }
  },
  {
    title: ['Word problems with fraction add/sub', '分数加减应用'],
    text: ['Morning walk 2/9 of a path, afternoon 3/9 more: together 5/9. Same denominator makes it easy!',
      '上午走了小路的 2/9，下午又走 3/9，一共 5/9。同分母很好算！'],
    art(el) {
      el.innerHTML = lessonEq('2/9 + 3/9 = 5/9', .3);
    }
  },
  {
    title: ['Let\'s practice!', '开始练习！'],
    text: ['20 G4 questions: same-denominator add and subtract, including leftovers and short stories.',
      '20 道四年级题：同分母加减、求剩余、小故事题。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const fracStr = (n, d) => `${n}/${d}`;

const Q_FRAC3 = [
  () => {
    const d = 5;
    const choices = ['1/5', '2/5', '3/5', '3/10', '1'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 1/5 + 2/5?', '1/5 + 2/5 = ?'],
      fig: `<div class="pics">${fBar(d, 1)}${fBar(d, 2)}</div>`,
      hints: [['Keep denominator; add numerators.', '分母不变，分子相加。']],
      explain: ['1/5 + 2/5 = 3/5.', '1/5 + 2/5 = 3/5。'] });
  },
  () => {
    const choices = ['5/14', '5/7', '6/7', '1', '3/7'];
    return cq({ pts: 3, choices, answer: 1,
      q: ['What is 2/7 + 3/7?', '2/7 + 3/7 = ?'],
      hints: [['2 + 3 = 5; denominator 7.', '分子 2+3=5，分母 7。']],
      explain: ['5/7.', '5/7。'] });
  },
  () => {
    const choices = ['1/5', '2/5', '3/5', '5/5', '3/10'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 4/5 − 1/5?', '4/5 − 1/5 = ?'],
      fig: fBar(5, 4),
      hints: [['Subtract numerators.', '分子相减。']],
      explain: ['3/5.', '3/5。'] });
  },
  () => {
    const choices = ['1/6', '2/6', '3/6', '7/6', '3/12'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 5/6 − 2/6?', '5/6 − 2/6 = ?'],
      hints: [['5 − 2 = 3.', '5 − 2 = 3。']],
      explain: ['3/6.', '3/6。'] });
  },
  () => {
    const choices = ['2/8', '3/8', '4/8', '4/16', '1'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 1/8 + 3/8?', '1/8 + 3/8 = ?'],
      hints: [['1 + 3 = 4.', '1+3=4。']],
      explain: ['4/8.', '4/8。'] });
  },
  () => {
    const choices = ['1/9', '2/9', '3/9', '11/9', '3/18'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 7/9 − 4/9?', '7/9 − 4/9 = ?'],
      hints: [['7 − 4 = 3.', '7−4=3。']],
      explain: ['3/9.', '3/9。'] });
  },
  () => {
    const choices = ['1/4', '2/4', '3/4', '4/4', '1/2'];
    return cq({ pts: 3, choices, answer: 3,
      q: ['What is 1/4 + 3/4?', '1/4 + 3/4 = ?'],
      fig: fBar(4, 4),
      hints: [['Numerators make 4; 4/4 = 1.', '分子和为 4；4/4=1。']],
      explain: ['4/4 = 1.', '4/4 = 1。'] });
  },
  () => {
    const choices = ['0/8', '1/8', '2/8', '5/8', '1'];
    return cq({ pts: 3, choices, answer: 1,
      q: ['What is 3/8 − 2/8?', '3/8 − 2/8 = ?'],
      hints: [['3 − 2 = 1.', '3−2=1。']],
      explain: ['1/8.', '1/8。'] });
  },
  () => {
    const choices = ['3/10', '5/10', '7/10', '7/20', '1'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 2/10 + 5/10?', '2/10 + 5/10 = ?'],
      hints: [['2 + 5 = 7.', '2+5=7。']],
      explain: ['7/10.', '7/10。'] });
  },
  () => {
    const choices = ['3/10', '5/10', '6/10', '12/10', '6/20'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What is 9/10 − 3/10?', '9/10 − 3/10 = ?'],
      hints: [['9 − 3 = 6.', '9−3=6。']],
      explain: ['6/10.', '6/10。'] });
  },
  // 11–20 word / leftover / multi
  () => {
    const choices = ['1/5', '2/5', '3/5', '4/5', '5/5'];
    return cq({ pts: 4, choices, answer: 2,
      q: ['A whole cake; eat 2/5. What fraction is left?', '整块蛋糕吃掉 2/5，还剩几分之几？'],
      hints: [['1 = 5/5; 5/5 − 2/5 = 3/5.', '1=5/5；5/5−2/5=3/5。']],
      explain: ['3/5 left.', '还剩 3/5。'] });
  },
  () => {
    const choices = ['1/6', '2/6', '3/6', '4/6', '5/6'];
    return cq({ pts: 4, choices, answer: 2,
      q: ['Eat 1/6 then another 2/6 of a cake. How much eaten in total?', '先吃 1/6，再吃 2/6。一共吃了几分之几？'],
      hints: [['Add: 1/6 + 2/6.', '相加：1/6+2/6。']],
      explain: ['3/6 eaten.', '一共吃了 3/6。'] });
  },
  () => {
    const choices = ['1/5', '2/5', '3/5', '4/5', '5/5'];
    return cq({ pts: 4, choices, answer: 1,
      q: ['Eat 1/5 then 2/5. What fraction is left?', '先吃 1/5，再吃 2/5，还剩几分之几？'],
      hints: [['Ate 3/5; left 2/5.', '吃了 3/5，剩 2/5。']],
      explain: ['2/5 left.', '还剩 2/5。'] });
  },
  () => {
    const choices = ['1/9', '3/9', '5/9', '6/9', '9/9'];
    return cq({ pts: 4, choices, answer: 2,
      q: ['Kangaroo finished 2/9 of a path in the morning and 3/9 in the afternoon. How much finished today?',
          '袋鼠上午走完 2/9，下午又走完 3/9。今天一共走完几分之几？'],
      hints: [['2/9 + 3/9 = 5/9.', '2/9+3/9=5/9。']],
      explain: ['5/9.', '5/9。'] });
  },
  () => {
    const choices = ['2/9', '3/9', '4/9', '5/9', '9/5'];
    return cq({ pts: 4, choices, answer: 2,
      q: ['Finished 5/9 of a path. What fraction is left?', '已走完 5/9，还剩几分之几？'],
      hints: [['1 − 5/9 = 4/9.', '1−5/9=4/9。']],
      explain: ['4/9 left.', '还剩 4/9。'] });
  },
  () => {
    const choices = ['1/6', '2/6', '3/6', '4/6', '5/6'];
    return cq({ pts: 4, choices, answer: 3,
      q: ['1/6 + □ = 5/6. What is □?', '1/6 + □ = 5/6，□ 是多少？'],
      hints: [['□ = 5/6 − 1/6.', '□ = 5/6 − 1/6。']],
      explain: ['□ = 4/6.', '□ = 4/6。'] });
  },
  () => {
    const choices = ['5/9', '6/9', '7/9', '6/27', '1'];
    return cq({ pts: 4, choices, answer: 1,
      q: ['What is 1/9 + 2/9 + 3/9?', '1/9 + 2/9 + 3/9 = ?'],
      hints: [['1+2+3 = 6.', '1+2+3=6。']],
      explain: ['6/9.', '6/9。'] });
  },
  () => {
    const choices = [
      T('greater than 1/2', '比 1/2 大'), T('less than 1/2', '比 1/2 小'),
      T('equal to 1/2', '等于 1/2'), T('equal to 1', '等于 1'), T('cannot tell', '无法判断')
    ];
    return cq({ pts: 4, choices, answer: 2,
      q: ['Compute 7/8 − 3/8. Compared with 1/2, the result is…', '计算 7/8 − 3/8。和 1/2 相比？'],
      hints: [['7/8 − 3/8 = 4/8 = 1/2.', '结果是 4/8 = 1/2。']],
      explain: ['Equal to 1/2.', '等于 1/2。'] });
  },
  () => {
    const choices = ['4/10', '5/10', '6/10', '7/10', '10/4'];
    return cq({ pts: 4, choices, answer: 2,
      q: ['A gift box is split into 10 equal packs; 4 packs are given away. What fraction is left?',
          '礼盒平均分成 10 包，送出 4 包。还剩几分之几？'],
      hints: [['Left 6 packs → 6/10.', '剩 6 包 → 6/10。']],
      explain: ['6/10 left.', '还剩 6/10。'] });
  },
  () => {
    const choices = ['2/8', '3/8', '4/8', '5/8', '6/8'];
    return cq({ pts: 5, boss: true, choices, answer: 2,
      q: ['What is 3/8 + 2/8 − 1/8?', '3/8 + 2/8 − 1/8 = ?'],
      hints: [['First 3/8 + 2/8 = 5/8.', '先算 3/8+2/8=5/8。'], ['Then 5/8 − 1/8 = 4/8.', '再 5/8−1/8=4/8。']],
      explain: ['4/8.', '4/8。'] });
  }
];

registerSeries({
  id: 'frac3', camp: true, breakEvery: 10, perRound: 20, games: ['barshade', 'fracmatch', 'fracraft'],
  tag: ['Fraction Camp C · G4', '分数营 C · 四年级'],
  name: ['Add & Subtract Fractions', '同分母加减'],
  desc: ['Same-denominator +/− , leftovers, short stories', '同分母加减、求剩余、小故事'],
  lesson: LESSON_FRAC3,
  questions: Q_FRAC3,
  next: 'frac4'
});
