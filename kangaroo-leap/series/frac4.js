// Leap G4 · 分数营 D：一个数的几分之几 / 分数×整数

const LESSON_FRAC4 = [
  {
    title: ['One equal share', '先分成同样多的几份'],
    text: ['1/4 of 12 means split 12 into 4 equal groups and take 1 group: 12 ÷ 4 = 3.',
      '12 的 1/4，就是把 12 平均分成 4 份，取 1 份：12 ÷ 4 = 3。'],
    art(el) {
      el.innerHTML = fDots(12, 3) + lessonEq('1/4 of 12 = 3', 1.2);
    }
  },
  {
    title: ['Take more than one share', '取不止一份'],
    text: ['2/3 of 12: first find 1/3, which is 4, then take 2 of those shares: 4 × 2 = 8.',
      '12 的 2/3：先求 1/3 是 4，再取 2 份：4 × 2 = 8。'],
    art(el) {
      el.innerHTML = fDots(12, 8, 'cookie') + lessonEq('12 ÷ 3 × 2 = 8', 1.2);
    }
  },
  {
    title: ['Fraction times a whole number', '分数乘整数'],
    text: ['2/3 × 12 means the same thing as 2/3 of 12. Divide by the bottom, then multiply by the top.',
      '2/3 × 12 就是 12 的 2/3。先除以分母，再乘分子。'],
    art(el) {
      el.innerHTML = lessonEq('2/3 × 12', .2) + lessonEq('= 12 ÷ 3 × 2', 1.1) + lessonEq('= 8', 2);
    }
  },
  {
    title: ['What is left?', '拿走一部分，还剩多少'],
    text: ['If you use 1/4 of 20 pencils, you use 5. Left is 20 − 5 = 15.',
      '20 支铅笔用掉 1/4，用掉 5 支。剩下 20 − 5 = 15 支。'],
    art(el) {
      el.innerHTML = lessonEq('20 − 20 ÷ 4 = 15', 1);
    }
  },
  {
    title: ['The whole fraction is everything', '几分之几等于全部'],
    text: ['4/4 of a number is the number itself. 3/3 × 18 = 18.',
      '一个数的 4/4 就是它自己。3/3 × 18 = 18。'],
    art(el) {
      el.innerHTML = fBar(4, 4) + lessonEq('4/4 × 18 = 18', 1.2);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: a fraction of a number, and fraction times a whole number. A new mini game every 10 questions.',
      '20 道四年级题：求一个数的几分之几，以及分数乘整数。每 10 题玩一次新小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_FRAC4 = [
  () => {
    const N = pick([8, 10, 12, 14, 16, 18, 20, 24]);
    const ans = N / 2;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`What is 1/2 of ${N}?`, `${N} 的 1/2 是多少？`],
      hints: [[`Split ${N} into 2 equal parts.`, `把 ${N} 平均分成 2 份。`], [`${N} ÷ 2 = ${ans}.`, `${N} ÷ 2 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const N = pick([12, 16, 20, 24, 28, 32]);
    const ans = N / 4;
    const { choices, answer } = numChoices(ans, [N / 2, N / 4 + 1, 4, N]);
    return cq({ pts: 3, choices, answer,
      q: [`What is 1/4 of ${N}?`, `${N} 的 1/4 是多少？`],
      hints: [[`${N} ÷ 4 = ${ans}.`, `${N} ÷ 4 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const N = pick([9, 12, 15, 18, 21, 24, 27, 30]);
    const ans = N / 3;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`What is 1/3 of ${N}?`, `${N} 的 1/3 是多少？`],
      hints: [[`${N} ÷ 3 = ${ans}.`, `${N} ÷ 3 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const N = pick([15, 20, 25, 30, 35, 40]);
    const ans = N / 5;
    const { choices, answer } = numChoices(ans, [N / 5 * 2, 5, N - 5, ans + 2]);
    return cq({ pts: 3, choices, answer,
      q: [`What is 1/5 of ${N}?`, `${N} 的 1/5 是多少？`],
      hints: [[`${N} ÷ 5 = ${ans}.`, `${N} ÷ 5 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(3, 8), N = q * 3, ans = q * 2;
    const { choices, answer } = numChoices(ans, [q, N / 2, q * 3, ans + q]);
    return cq({ pts: 4, choices, answer,
      q: [`What is 2/3 of ${N}?`, `${N} 的 2/3 是多少？`],
      hints: [[`First 1/3 is ${N} ÷ 3 = ${q}.`, `先算 1/3：${N} ÷ 3 = ${q}。`], [`Then 2 shares: ${q} × 2 = ${ans}.`, `再取 2 份：${q} × 2 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(2, 8), N = q * 4, ans = q * 3;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is 3/4 of ${N}?`, `${N} 的 3/4 是多少？`],
      hints: [[`${N} ÷ 4 = ${q}.`, `${N} ÷ 4 = ${q}。`], [`${q} × 3 = ${ans}.`, `${q} × 3 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(2, 7), N = q * 5, ans = q * 2;
    const { choices, answer } = numChoices(ans, [q, q * 3, q * 5, ans + 1]);
    return cq({ pts: 4, choices, answer,
      q: [`What is 2/5 of ${N}?`, `${N} 的 2/5 是多少？`],
      hints: [[`${N} ÷ 5 × 2 = ${ans}.`, `${N} ÷ 5 × 2 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const N = pick([16, 24, 32, 40]);
    const first = `${N} ÷ 8`;
    const choices = shuffle([first, `${N} ÷ 3`, `${N} × 8`, `3 + 8`, `8 ÷ 3`]);
    return cq({ pts: 4, choices, answer: choices.indexOf(first),
      q: [`To find 3/8 of ${N}, what should you compute first?`, `求 ${N} 的 3/8，应先算哪一步？`],
      hints: [['Divide by the denominator first.', '先除以分母。']],
      explain: [`First ${first} = ${N / 8}, then × 3.`, `先 ${first} = ${N / 8}，再乘 3。`] });
  },
  () => {
    const q = ri(2, 5), N = q * 6, ans = q * 5;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is 5/6 of ${N}?`, `${N} 的 5/6 是多少？`],
      hints: [[`${N} ÷ 6 = ${q}, then × 5.`, `${N} ÷ 6 = ${q}，再乘 5。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const N = pick([12, 16, 20, 24, 28]);
    const ans = N / 4;
    const { choices, answer } = numChoices(ans, [N - ans, N / 2, ans + 1, 4]);
    return cq({ pts: 3, choices, answer,
      q: [`There are ${N} birds. 1/4 of them fly away. How many fly away?`, `${N} 只鸟，飞走了 1/4。飞走了几只？`],
      hints: [[`${N} ÷ 4 = ${ans}.`, `${N} ÷ 4 = ${ans}。`]],
      explain: [`${ans} fly away.`, `飞走 ${ans} 只。`] });
  },
  () => {
    const q = ri(2, 4), N = q * 8, ans = q * 3;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${N} cookies. You eat 3/8 of them. How many do you eat?`, `${N} 块饼干，吃掉 3/8。吃了几块？`],
      hints: [[`${N} ÷ 8 × 3 = ${ans}.`, `${N} ÷ 8 × 3 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(3, 8), N = q * 5, ans = q * 2;
    const { choices, answer } = numChoices(ans, [q, q * 3, N / 2, ans + q]);
    return cq({ pts: 4, choices, answer,
      q: [`A class has ${N} students. 2/5 of them are girls. How many girls?`, `班上有 ${N} 人，其中 2/5 是女生。女生有几人？`],
      hints: [[`${N} ÷ 5 × 2 = ${ans}.`, `${N} ÷ 5 × 2 = ${ans}。`]],
      explain: [`${ans} girls.`, `${ans} 名女生。`] });
  },
  () => {
    const N = pick([12, 18, 21, 24, 30]);
    const used = N / 3, left = N - used;
    const { choices, answer } = numChoices(left, [used, N / 2, left - 1, N]);
    return cq({ pts: 4, choices, answer,
      q: [`${N} pencils. 1/3 are used. How many are left?`, `${N} 支铅笔，用掉 1/3。还剩几支？`],
      hints: [[`Used ${used}. Left ${N} − ${used}.`, `用掉 ${used}。剩下 ${N} − ${used}。`]],
      explain: [`${left} left.`, `还剩 ${left} 支。`] });
  },
  () => {
    const q = ri(2, 6), N = q * 4, read = q * 3, left = q;
    return cq({ pts: 4, input: true, answer: left,
      q: [`A book has ${N} pages. You read 3/4 of it. How many pages are unread?`, `一本书 ${N} 页，读了 3/4。还没读几页？`],
      hints: [[`Read ${read}. Unread ${N} − ${read} = ${left}.`, `读了 ${read}。未读 ${N} − ${read} = ${left}。`]],
      explain: [`${left} pages.`, `${left} 页。`] });
  },
  () => {
    const N = pick([12, 18, 24, 30]);
    const half = N / 2, third = N / 3;
    const choices = [
      T(`1/2 of ${N} is greater`, `${N} 的 1/2 更大`),
      T(`1/3 of ${N} is greater`, `${N} 的 1/3 更大`),
      T('They are equal', '一样大'),
      T('Cannot tell', '无法比较'),
      T(`1/3 of ${N} is double`, `${N} 的 1/3 是两倍`)
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: [`Which is greater: 1/2 of ${N}, or 1/3 of ${N}?`, `${N} 的 1/2 和 ${N} 的 1/3，哪个大？`],
      hints: [[`1/2 of ${N} = ${half}. 1/3 of ${N} = ${third}.`, `${N} 的 1/2 = ${half}，1/3 = ${third}。`]],
      explain: [`${half} > ${third}.`, `${half} > ${third}。`] });
  },
  () => {
    const N = pick([12, 15, 18, 20, 24]);
    const { choices, answer } = numChoices(N, [N / 4, N / 2, 4, N + 4]);
    return cq({ pts: 3, choices, answer,
      q: [`What is 4/4 of ${N}?`, `${N} 的 4/4 是多少？`],
      hints: [['4/4 means the whole amount.', '4/4 就是全部。']],
      explain: [`${N}.`, `${N}。`] });
  },
  () => {
    const q = ri(3, 9), N = q * 3, ans = q * 2;
    const { choices, answer } = numChoices(ans, [q, N, q * 3, ans + 2]);
    return cq({ pts: 4, choices, answer,
      q: [`What is 2/3 × ${N}?`, `2/3 × ${N} = ?`],
      hints: [[`Same as 2/3 of ${N}: ${N} ÷ 3 × 2.`, `就是 ${N} 的 2/3：${N} ÷ 3 × 2。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(2, 8), N = q * 5, ans = q * 3;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is 3/5 × ${N}?`, `3/5 × ${N} = ?`],
      hints: [[`${N} ÷ 5 × 3 = ${ans}.`, `${N} ÷ 5 × 3 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const q = ri(2, 6), N = q * 8, ans = q * 5;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is 5/8 of ${N}?`, `${N} 的 5/8 是多少？`],
      hints: [[`${N} ÷ 8 × 5 = ${ans}.`, `${N} ÷ 8 × 5 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const packs = [
      [24, 1, 2, 1, 4],
      [24, 1, 3, 1, 4],
      [36, 1, 3, 1, 4],
      [36, 1, 2, 1, 6],
      [40, 1, 2, 1, 4],
      [48, 3, 8, 1, 4],
      [48, 1, 3, 1, 4]
    ];
    const [N, a, b, c, d] = pick(packs);
    const red = N * a / b, blue = N * c / d, left = N - red - blue;
    return cq({ pts: 5, boss: true, input: true, answer: left,
      q: [`Boss: ${N} marbles. ${a}/${b} are red and ${c}/${d} are blue. How many are neither?`,
        `Boss 题：${N} 颗弹珠，${a}/${b} 是红色，${c}/${d} 是蓝色。既不是红也不是蓝的有几颗？`],
      hints: [[`Red ${red}, blue ${blue}.`, `红色 ${red} 颗，蓝色 ${blue} 颗。`],
        [`${N} − ${red} − ${blue} = ${left}.`, `${N} − ${red} − ${blue} = ${left}。`]],
      explain: [`${left}.`, `${left} 颗。`] });
  }
];

registerSeries({
  id: 'frac4', camp: true, breakEvery: 10, perRound: 20, games: ['pizzarush', 'bowlshare', 'frachop'],
  tag: ['Fraction Camp D · G4', '分数营 D · 四年级'],
  name: ['Fraction of a Number', '一个数的几分之几'],
  desc: ['Find a fraction of a whole number; fraction × integer', '求一个数的几分之几；分数乘整数'],
  lesson: LESSON_FRAC4,
  questions: Q_FRAC4,
  next: 'mix1'
});
