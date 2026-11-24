// Leap G4 · 小数营 1：读写小数；与 10/100 作分母的分数互化

const LESSON_DEC1 = [
  {
    title: ['Tenths', '十分位'],
    text: ['0.3 means 3 tenths, the same as 3/10. The first digit after the decimal point is tenths.',
      '0.3 表示 3 个十分之一，也就是 3/10。小数点后第一位是十分位。'],
    art(el) {
      el.innerHTML = fBar(10, 3) + lessonEq('0.3 = 3/10', 1.2);
    }
  },
  {
    title: ['Hundredths', '百分位'],
    text: ['0.25 means 25 hundredths, the same as 25/100. The second digit after the point is hundredths.',
      '0.25 表示 25 个百分之一，也就是 25/100。小数点后第二位是百分位。'],
    art(el) {
      el.innerHTML = lessonEq('0.25 = 25/100', 1);
    }
  },
  {
    title: ['Read the decimal', '读小数'],
    text: ['0.7 is “zero point seven” or “seven tenths”. 1.4 is “one point four”.',
      '0.7 读作“零点七”，也可以说十分之七。1.4 读作“一点四”。'],
    art(el) {
      el.innerHTML = lessonEq('0.7 · 1.4', 1);
    }
  },
  {
    title: ['Fraction → decimal', '分数变成小数'],
    text: ['7/10 = 0.7. 9/100 = 0.09. Put the numerator in the tenths or hundredths place.',
      '7/10 = 0.7。9/100 = 0.09。把分子写在十分位或百分位上。'],
    art(el) {
      el.innerHTML = lessonEq('7/10 = 0.7', .3) + lessonEq('9/100 = 0.09', 1.3);
    }
  },
  {
    title: ['Same amount, two looks', '同样多，两种写法'],
    text: ['0.40 and 0.4 are equal. 40/100 = 4/10 = 0.4.',
      '0.40 和 0.4 一样大。40/100 = 4/10 = 0.4。'],
    art(el) {
      el.innerHTML = lessonEq('0.40 = 0.4 = 4/10', 1);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: read decimals, and swap with tenths and hundredths fractions. A mini game every 10 questions.',
      '20 道四年级题：读小数，以及和十分之几、百分之几互相改写。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_DEC1 = [
  () => {
    const n = ri(1, 9);
    const good = `0.${n}`;
    const choices = shuffle([good, `0.0${n}`, `${n}.0`, `0.${n}${n}`, `${n}/10`].filter((v, i, a) => a.indexOf(v) === i)).slice(0, 5);
    const five = choices.includes(good) ? choices : [good, ...choices].slice(0, 5);
    return cq({ pts: 3, choices: five, answer: five.indexOf(good),
      q: [`Which decimal equals ${n}/10?`, `${n}/10 等于哪个小数？`],
      hints: [[`Put ${n} in the tenths place.`, `把 ${n} 写在十分位。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(1, 9);
    return cq({ pts: 3, input: true, answer: n,
      q: [`0.${n} = □/10. What is □?`, `0.${n} = □/10。□ 是多少？`],
      hints: [['The tenths digit becomes the numerator.', '十分位上的数字就是分子。']],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const n = ri(1, 99);
    const dec = n < 10 ? `0.0${n}` : `0.${String(n).padStart(2, '0')}`;
    const good = `${n}/100`;
    const wrong = [`${n}/10`, `0.${n}`, `${n}/1000`, `${n + 1}/100`, `${Math.max(1, n - 1)}/100`];
    const set = [good];
    wrong.forEach(w => { if (!set.includes(w)) set.push(w); });
    const choices = shuffle(set.slice(0, 5));
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: [`Which fraction equals ${dec}?`, `${dec} 等于哪个分数？`],
      hints: [[`${dec} means ${n} hundredths.`, `${dec} 表示 ${n} 个百分之一。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(2, 9);
    const good = `${n}/10`;
    const pool = [good, `${n}/100`, `${n}/20`, `1/${n}`, `${n + 1}/10`];
    const choices = [];
    pool.forEach(v => { if (!choices.includes(v)) choices.push(v); });
    const five = shuffle(choices.slice(0, 5));
    return cq({ pts: 3, choices: five, answer: five.indexOf(good),
      q: [`0.${n} equals which fraction?`, `0.${n} 等于哪个分数？`],
      hints: [['Tenths → denominator 10.', '十分位 → 分母是 10。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(10, 99);
    const dec = `0.${n}`;
    return cq({ pts: 3, input: true, answer: n,
      q: [`${dec} = □/100. What is □?`, `${dec} = □/100。□ 是多少？`],
      hints: [[`Read the two digits after the point.`, '看小数点后两位。']],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const n = ri(1, 9);
    const good = `0.0${n}`;
    const choices = shuffle([good, `0.${n}`, `0.${n}0`, `${n}.00`, `0.00${n}`].filter((v, i, a) => a.indexOf(v) === i));
    const five = choices.includes(good) ? choices.slice(0, 5) : [good, ...choices].slice(0, 5);
    while (five.length < 5) five.push(`0.${five.length}${n}`);
    return cq({ pts: 4, choices: five, answer: five.indexOf(good),
      q: [`Which decimal equals ${n}/100?`, `${n}/100 等于哪个小数？`],
      hints: [[`Hundredths need two places: 0.0${n}.`, '百分位要写两位：0.0' + n + '。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const choices = shuffle(['3/10', '3/100', '30/10', '1/3', '3/1']);
    return cq({ pts: 3, choices, answer: choices.indexOf('3/10'),
      q: ['0.3 equals which fraction?', '0.3 等于哪个分数？'],
      hints: [['One digit after the point → tenths.', '小数点后一位 → 十分之几。']],
      explain: ['3/10.', '3/10。'] });
  },
  () => {
    const whole = ri(1, 5), tenths = ri(1, 9);
    const ans = whole * 10 + tenths;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${whole}.${tenths} = □/10. What is □?`, `${whole}.${tenths} = □/10。□ 是多少？`],
      hints: [[`${whole} ones = ${whole * 10} tenths, plus ${tenths}.`, `${whole} 个一是 ${whole * 10} 个十分之一，再加 ${tenths}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(1, 9);
    const good = `0.${n}`;
    const choices = shuffle([good, `${n}`, `0.0${n}`, `${n}.0`, `1.${n}`]);
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: [`Which shows ${n} tenths?`, `哪个表示 ${n} 个十分之一？`],
      hints: [[`Write 0.${n}.`, `写成 0.${n}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(11, 99);
    const good = `0.${n}`;
    const choices = shuffle([good, `0.0${n % 10}`, `${n / 100}`, `0.${Math.floor(n / 10)}`, `${n}.00`].map(String));
    const uniq = [];
    choices.forEach(v => { if (!uniq.includes(v)) uniq.push(v); });
    if (!uniq.includes(good)) uniq.unshift(good);
    const five = uniq.slice(0, 5);
    return cq({ pts: 3, choices: five, answer: five.indexOf(good),
      q: [`Which decimal equals ${n}/100?`, `${n}/100 等于哪个小数？`],
      hints: [[`Two digits after the point: 0.${n}.`, `小数点后写两位：0.${n}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const choices = shuffle(['0.09', '0.9', '0.90', '9.0', '0.009']);
    return cq({ pts: 4, choices, answer: choices.indexOf('0.09'),
      q: ['Which decimal equals 9/100?', '9/100 等于哪个小数？'],
      hints: [['9 hundredths is 0.09, not 0.9.', '9 个百分之一是 0.09，不是 0.9。']],
      explain: ['0.09.', '0.09。'] });
  },
  () => {
    const a = ri(1, 8), b = a + 1;
    const choices = [
      T(`0.${b} is greater`, `0.${b} 更大`),
      T(`0.${a} is greater`, `0.${a} 更大`),
      T('They are equal', '一样大'),
      T('Cannot tell', '无法比较'),
      T(`0.${a}0 is greater`, `0.${a}0 更大`)
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: [`Which is greater: 0.${a} or 0.${b}?`, `0.${a} 和 0.${b}，哪个大？`],
      hints: [[`Compare tenths: ${a} and ${b}.`, `比十分位：${a} 和 ${b}。`]],
      explain: [`0.${b} is greater.`, `0.${b} 更大。`] });
  },
  () => {
    const choices = shuffle(['0.4', '0.04', '0.40', '4.0', '0.004']);
    // 0.4 and 0.40 are equal - ask which equals 4/10
    const good = '0.4';
    // ensure 0.4 is in list; if both 0.4 and 0.40 present, answer is 0.4 specifically as canonical
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: ['Which decimal equals 4/10?', '4/10 等于哪个小数？'],
      hints: [['4 tenths → 0.4.', '4 个十分之一 → 0.4。']],
      explain: ['0.4.', '0.4。'] });
  },
  () => {
    const n = ri(1, 9);
    return cq({ pts: 4, input: true, answer: n,
      q: [`How many tenths are in 0.${n}?`, `0.${n} 里有几个十分之一？`],
      hints: [['The tenths digit tells you.', '看十分位上的数字。']],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const n = ri(1, 9);
    const good = `0.${n}0`;
    // ask equal to 0.n - pick which equals 0.n among options that include 0.n0
    const choices = shuffle([`0.${n}`, good, `0.0${n}`, `${n}.0`, `0.${n}${n}`]);
    // question: which equals n/10 - prefer 0.n
    return cq({ pts: 3, choices, answer: choices.indexOf(`0.${n}`),
      q: [`Which equals ${n}/10?`, `哪个等于 ${n}/10？`],
      hints: [[`0.${n} or 0.${n}0.`, `0.${n} 或 0.${n}0 都行；选项里点 0.${n}。`]],
      explain: [`0.${n}.`, `0.${n}。`] });
  },
  () => {
    const whole = ri(2, 6), tenths = ri(1, 9);
    const good = `${whole}.${tenths}`;
    const choices = shuffle([good, `0.${whole}${tenths}`, `${whole}${tenths}`, `${whole}.0${tenths}`, `0.${tenths}`]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which decimal is ${whole} and ${tenths} tenths?`, `哪个小数表示 ${whole} 又 ${tenths} 个十分之一？`],
      hints: [[`Ones place ${whole}, tenths place ${tenths}.`, `个位写 ${whole}，十分位写 ${tenths}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(1, 99);
    const dec = n < 10 ? `0.0${n}` : `0.${String(n).padStart(2, '0')}`;
    return cq({ pts: 4, input: true, answer: n,
      q: [`How many hundredths are in ${dec}?`, `${dec} 里有几个百分之一？`],
      hints: [[`Read it as ${n}/100.`, `把它读成 ${n}/100。`]],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const choices = [
      T('0.50 is greater', '0.50 更大'),
      T('0.5 is greater', '0.5 更大'),
      T('They are equal', '一样大'),
      T('Cannot tell', '无法比较'),
      T('0.05 is greater', '0.05 更大')
    ];
    return cq({ pts: 4, choices, answer: 2,
      q: ['Compare 0.5 and 0.50.', '比较 0.5 和 0.50。'],
      hints: [['0.50 = 50/100 = 5/10 = 0.5.', '0.50 = 50/100 = 5/10 = 0.5。']],
      explain: ['They are equal.', '一样大。'] });
  },
  () => {
    const n = ri(1, 9);
    const good = `0.${n}`;
    const choices = shuffle([good, `${n}/100`, `0.0${n}`, `${n}.10`, `1.${n}`]);
    // wait - choices mix decimals and fractions as strings OK for display
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`A bar is cut into 10 equal parts; ${n} parts are shaded. Which decimal is shaded?`,
        `一条带子平均分成 10 份，涂色 ${n} 份。涂色部分写成小数是？`],
      fig: typeof fBar === 'function' ? fBar(10, n) : undefined,
      hints: [[`${n}/10 = 0.${n}.`, `${n}/10 = 0.${n}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(15, 85);
    const dec = `0.${String(n).padStart(2, '0')}`;
    return cq({ pts: 5, boss: true, input: true, answer: n,
      q: [`Boss: ${dec} = □/100. What is □? Then you know the decimal means that many hundredths.`,
        `Boss 题：${dec} = □/100。□ 是多少？`],
      hints: [[`The digits after the point are ${n}.`, `小数点后面就是 ${n}。`]],
      explain: [`${n}.`, `${n}。`] });
  }
];

registerSeries({
  id: 'dec1', camp: true, breakEvery: 10, perRound: 20, games: ['tenthmatch', 'fracmatch', 'piepop'],
  tag: ['Decimals Camp 1 · G4', '小数营 1 · 四年级'],
  name: ['Tenths & Hundredths', '十分位与百分位'],
  desc: ['Read decimals; swap with /10 and /100 fractions', '读写小数；与分母 10、100 的分数互化'],
  lesson: LESSON_DEC1,
  questions: Q_DEC1,
  next: null
});
