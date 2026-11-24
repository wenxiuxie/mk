// Leap G4 · 因数倍数入门

const factFactors = n => {
  const f = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i);
  return f;
};

const LESSON_FACT1 = [
  {
    title: ['Factors', '因数'],
    text: ['If 3 × 4 = 12, then 3 and 4 are factors of 12. 1 and 12 are factors too.',
      '因为 3 × 4 = 12，所以 3 和 4 都是 12 的因数。1 和 12 也是。'],
    art(el) {
      el.innerHTML = lessonEq('3 × 4 = 12', .3) + lessonEq('factors: 1, 2, 3, 4, 6, 12', 1.4);
    }
  },
  {
    title: ['Multiples', '倍数'],
    text: ['The multiples of 5 are 5, 10, 15, 20… You get them by 5 × 1, 5 × 2, 5 × 3…',
      '5 的倍数是 5、10、15、20……也就是 5 × 1、5 × 2、5 × 3……'],
    art(el) {
      el.innerHTML = lessonEq('5, 10, 15, 20, …', 1);
    }
  },
  {
    title: ['Factor ↔ multiple', '因数和倍数成对'],
    text: ['If 3 is a factor of 12, then 12 is a multiple of 3. They come in pairs.',
      '如果 3 是 12 的因数，那么 12 就是 3 的倍数。它们是成对出现的。'],
    art(el) {
      el.innerHTML = lessonEq('3 | 12', .4) + lessonEq('12 is a multiple of 3', 1.4);
    }
  },
  {
    title: ['All the factors', '把因数找全'],
    text: ['List from 1 up to the number. Check which ones divide evenly. Do not forget 1 and the number itself.',
      '从 1 数到这个数，看谁能整除它。不要忘记 1 和它自己。'],
    art(el) {
      el.innerHTML = lessonEq('18 → 1, 2, 3, 6, 9, 18', 1);
    }
  },
  {
    title: ['Not a factor', '不是因数'],
    text: ['5 is not a factor of 12, because 12 ÷ 5 leaves a remainder.',
      '5 不是 12 的因数，因为 12 ÷ 5 除不尽。'],
    art(el) {
      el.innerHTML = lessonEq('12 ÷ 5 = 2 R 2', 1);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: factors and multiples. A mini game every 10 questions.',
      '20 道四年级题：因数和倍数。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_FACT1 = [
  () => {
    const n = pick([12, 16, 18, 20, 24]);
    const good = factFactors(n)[1]; // second factor, often 2
    const wrongs = [];
    let k = 2;
    while (wrongs.length < 4) {
      if (n % k !== 0) wrongs.push(k);
      k++;
    }
    const { choices, answer } = numChoices(good, wrongs);
    return cq({ pts: 3, choices, answer,
      q: [`Which of these is a factor of ${n}?`, `下面哪个是 ${n} 的因数？`],
      hints: [[`${n} ÷ ${good} = ${n / good}.`, `${n} ÷ ${good} = ${n / good}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const a = pick([3, 4, 5, 6, 7]), k = ri(2, 9), n = a * k;
    return cq({ pts: 3, input: true, answer: n,
      q: [`What is the ${k === 2 ? '2nd' : k === 3 ? '3rd' : `${k}th`} multiple of ${a}? (That is ${a} × ${k}.)`,
        `${a} 的 ${k} 倍是多少？（也就是 ${a} × ${k}。）`],
      hints: [[`${a} × ${k} = ${n}.`, `${a} × ${k} = ${n}。`]],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const n = pick([12, 18, 20, 24, 30]);
    const f = factFactors(n);
    return cq({ pts: 3, input: true, answer: f.length,
      q: [`How many factors does ${n} have?`, `${n} 一共有几个因数？`],
      hints: [[`The factors are ${f.join(', ')}.`, `因数是 ${f.join('、')}。`]],
      explain: [`${f.length}.`, `${f.length} 个。`] });
  },
  () => {
    const a = pick([4, 5, 6, 8]), n = a * ri(3, 8);
    const choices = [
      T(`Yes, ${a} is a factor of ${n}`, `是，${a} 是 ${n} 的因数`),
      T(`No, ${a} is not a factor of ${n}`, `不是，${a} 不是 ${n} 的因数`),
      T(`${n} is a factor of ${a}`, `${n} 是 ${a} 的因数`),
      T('Cannot tell', '无法判断'),
      T(`Only 1 is a factor`, '只有 1 是因数')
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: [`Is ${a} a factor of ${n}?`, `${a} 是 ${n} 的因数吗？`],
      hints: [[`${n} ÷ ${a} = ${n / a}.`, `${n} ÷ ${a} = ${n / a}。`]],
      explain: [`Yes.`, '是。'] });
  },
  () => {
    const a = pick([3, 4, 5, 6]);
    let n = a * ri(2, 6) + ri(1, a - 1);
    while (n % a === 0) n = a * ri(2, 6) + ri(1, a - 1);
    const choices = [
      T(`Yes`, '是'),
      T(`No`, '不是'),
      T(`${n} is a factor of ${a}`, `${n} 是 ${a} 的因数`),
      T('Equal', '相等'),
      T('Cannot tell', '无法判断')
    ];
    return cq({ pts: 3, choices, answer: 1,
      q: [`Is ${n} a multiple of ${a}?`, `${n} 是 ${a} 的倍数吗？`],
      hints: [[`${n} ÷ ${a} leaves a remainder.`, `${n} ÷ ${a} 除不尽。`]],
      explain: ['No.', '不是。'] });
  },
  () => {
    const n = 12;
    const good = '1, 2, 3, 4, 6, 12';
    const choices = shuffle([good, '1, 2, 3, 4, 12', '2, 3, 4, 6', '1, 12', '3, 4, 6, 12']);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which list shows all factors of ${n}?`, `哪一组是 ${n} 的全部因数？`],
      hints: [['Include 1 and 12.', '别忘了 1 和 12。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const a = pick([5, 6, 7, 8, 9]), ans = a * 3;
    const { choices, answer } = numChoices(ans, [a * 2, a * 4, a + 3, ans + 1]);
    return cq({ pts: 3, choices, answer,
      q: [`Which number is a multiple of ${a}?`, `下面哪个是 ${a} 的倍数？`],
      hints: [[`${a} × 3 = ${ans}.`, `${a} × 3 = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = pick([16, 18, 20, 24, 28, 30]);
    return cq({ pts: 3, input: true, answer: 1,
      q: [`What is the smallest factor of ${n}?`, `${n} 最小的因数是几？`],
      hints: [['Every whole number has 1 as a factor.', '每个整数都有因数 1。']],
      explain: ['1.', '1。'] });
  },
  () => {
    const n = pick([16, 18, 20, 24, 28, 30]);
    return cq({ pts: 3, input: true, answer: n,
      q: [`What is the greatest factor of ${n}?`, `${n} 最大的因数是几？`],
      hints: [['A number is always a factor of itself.', '一个数最大的因数是它自己。']],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const a = pick([2, 3, 4, 5]), b = pick([6, 8, 9, 10, 12]);
    const yes = b % a === 0;
    const choices = [
      T(`${a} is a factor of ${b}`, `${a} 是 ${b} 的因数`),
      T(`${b} is a factor of ${a}`, `${b} 是 ${a} 的因数`),
      T('Neither', '都不是'),
      T('Cannot tell', '无法判断'),
      T('They are equal', '一样大')
    ];
    return cq({ pts: 4, choices, answer: yes ? 0 : 2,
      q: [`How are ${a} and ${b} related?`, `${a} 和 ${b} 是什么关系？`],
      hints: [[`${b} ÷ ${a} ${yes ? 'is exact' : 'has a remainder'}.`, `${b} ÷ ${a} ${yes ? '除得尽' : '除不尽'}。`]],
      explain: [yes ? `${a} is a factor of ${b}.` : 'Neither statement fits.', yes ? `${a} 是 ${b} 的因数。` : '两个说法都不对。'] });
  },
  () => {
    const n = 18;
    return cq({ pts: 4, input: true, answer: 6,
      q: [`How many factors does ${n} have?`, `${n} 有几个因数？`],
      hints: [['1, 2, 3, 6, 9, 18.', '1、2、3、6、9、18。']],
      explain: ['6.', '6 个。'] });
  },
  () => {
    const a = pick([3, 4, 5]), list = [a, a * 2, a * 3, a * 4];
    const good = String(a * 5);
    const choices = shuffle([good, String(a * 5 + 1), String(a * 4 + 1), String(a * 6), String(list[3] + a - 1)]);
    const uniq = [];
    choices.forEach(v => { if (!uniq.includes(v)) uniq.push(v); });
    if (!uniq.includes(good)) uniq.unshift(good);
    const five = uniq.slice(0, 5);
    return cq({ pts: 4, choices: five, answer: five.indexOf(good),
      q: [`${list.join(', ')}, … What is the next multiple of ${a}?`, `${list.join('、')}…… ${a} 的下一个倍数是多少？`],
      hints: [[`Add ${a} each time.`, `每次加 ${a}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = pick([12, 16, 18, 20]);
    const bad = factFactors(n).length + ri(1, 2);
    // ask which is NOT a factor
    let x = ri(2, n - 1);
    while (n % x === 0) x = ri(2, n - 1);
    const { choices, answer } = numChoices(x, factFactors(n).slice(0, 4));
    return cq({ pts: 4, choices, answer,
      q: [`Which number is NOT a factor of ${n}?`, `下面哪个不是 ${n} 的因数？`],
      hints: [[`${n} ÷ ${x} leaves a remainder.`, `${n} ÷ ${x} 除不尽。`]],
      explain: [`${x}.`, `${x}。`] });
  },
  () => {
    const a = 7, k = ri(2, 8), n = a * k;
    return cq({ pts: 3, input: true, answer: n,
      q: [`Fill in: ${a} × ${k} = □, so □ is a multiple of ${a}.`, `填空：${a} × ${k} = □，所以 □ 是 ${a} 的倍数。`],
      hints: [[`${a} × ${k} = ${n}.`, `${a} × ${k} = ${n}。`]],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const choices = [
      T('1 and 15', '1 和 15'),
      T('Only 15', '只有 15'),
      T('3 and 5 only', '只有 3 和 5'),
      T('2 and 15', '2 和 15'),
      T('1, 3, 5 only', '只有 1、3、5')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which pair are both factors of 15?', '哪一对都是 15 的因数？'],
      hints: [['1 × 15 = 15.', '1 × 15 = 15。']],
      explain: ['1 and 15.', '1 和 15。'] });
  },
  () => {
    const a = pick([4, 5, 6]), b = a * ri(2, 5);
    return cq({ pts: 4, input: true, answer: b / a,
      q: [`${b} ÷ ${a} = □, so ${a} is a factor of ${b}. What is □?`,
        `${b} ÷ ${a} = □，所以 ${a} 是 ${b} 的因数。□ 是多少？`],
      hints: [[`${b} ÷ ${a} = ${b / a}.`, `${b} ÷ ${a} = ${b / a}。`]],
      explain: [`${b / a}.`, `${b / a}。`] });
  },
  () => {
    const n = 24;
    const good = '8';
    const choices = shuffle(['8', '7', '9', '10', '14']);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which of these is a factor of ${n}?`, `下面哪个是 ${n} 的因数？`],
      hints: [[`24 ÷ 8 = 3.`, '24 ÷ 8 = 3。']],
      explain: ['8.', '8。'] });
  },
  () => {
    const a = pick([3, 4, 5]);
    return cq({ pts: 4, input: true, answer: a * 10,
      q: [`What is the 10th multiple of ${a}?`, `${a} 的第 10 个倍数是多少？`],
      hints: [[`${a} × 10 = ${a * 10}.`, `${a} × 10 = ${a * 10}。`]],
      explain: [`${a * 10}.`, `${a * 10}。`] });
  },
  () => {
    const choices = [
      T('Every number is a multiple of 1', '每个数都是 1 的倍数'),
      T('1 is a multiple of every number', '1 是每个数的倍数'),
      T('No number has 1 as a factor', '没有数以 1 为因数'),
      T('Only even numbers have factors', '只有偶数有因数'),
      T('Factors are always even', '因数一定是偶数')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which statement is true?', '哪一句是对的？'],
      hints: [['n × 1 = n, so n is a multiple of 1.', 'n × 1 = n，所以 n 是 1 的倍数。']],
      explain: ['Every number is a multiple of 1.', '每个数都是 1 的倍数。'] });
  },
  () => {
    const n = pick([36, 48, 60]);
    const f = factFactors(n);
    return cq({ pts: 5, boss: true, input: true, answer: f.length,
      q: [`Boss: How many factors does ${n} have?`, `Boss 题：${n} 一共有几个因数？`],
      hints: [[`List them carefully: ${f.join(', ')}.`, `仔细列出：${f.join('、')}。`]],
      explain: [`${f.length}.`, `${f.length} 个。`] });
  }
];

registerSeries({
  id: 'fact1', camp: true, breakEvery: 10, perRound: 20, games: ['factorpop', 'patternpick', 'opsprint'],
  tag: ['Factors & Multiples · G4', '因数倍数 · 四年级'],
  name: ['Factors & Multiples', '因数与倍数'],
  desc: ['Find factors; recognize multiples', '找因数、认倍数'],
  lesson: LESSON_FACT1,
  questions: Q_FACT1,
  next: 'geom1'
});
