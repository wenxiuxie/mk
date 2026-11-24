// Leap G4 · 大数与估算：万以内读写、位值、四舍五入

const placeOf = (n, place) => Math.floor(n / place) % 10;
const roundTo = (n, place) => Math.round(n / place) * place;

const LESSON_BIG1 = [
  {
    title: ['Thousands, hundreds, tens, ones', '千、百、十、个'],
    text: ['In 3527, the 3 means 3 thousands, the 5 means 5 hundreds, the 2 means 2 tens, and the 7 means 7 ones.',
      '在 3527 里，3 表示 3 个千，5 表示 5 个百，2 表示 2 个十，7 表示 7 个一。'],
    art(el) {
      el.innerHTML = lessonEq('3527', .2)
        + lessonEq('3×1000 + 5×100 + 2×10 + 7', 1.3);
    }
  },
  {
    title: ['Ten thousands', '万位'],
    text: ['The number 20,000 is two ten-thousands. In Chinese we often say 两万.',
      '20,000 是 2 个一万。中文常说“两万”。'],
    art(el) {
      el.innerHTML = lessonEq('2 × 10,000 = 20,000', 1);
    }
  },
  {
    title: ['Round to the nearest 10', '四舍五入到十位'],
    text: ['Look at the ones digit. 0–4 stay down; 5–9 go up. 47 → 50. 43 → 40.',
      '看个位。0–4 舍去，5–9 进一。47 → 50。43 → 40。'],
    art(el) {
      el.innerHTML = lessonEq('47 → 50', .3) + lessonEq('43 → 40', 1.3);
    }
  },
  {
    title: ['Round to 100 or 1000', '到百位或千位'],
    text: ['To the nearest 100, look at the tens digit. To the nearest 1000, look at the hundreds digit. 2460 → 2500 (nearest 100) or 2000 (nearest 1000).',
      '到百位看十位，到千位看百位。2460 → 2500（到百位）或 2000（到千位）。'],
    art(el) {
      el.innerHTML = lessonEq('2460 → 2500', .3) + lessonEq('2460 → 2000', 1.3);
    }
  },
  {
    title: ['Estimate first', '先估一估'],
    text: ['398 + 205 is about 400 + 200 = 600. Estimating helps you check if an answer makes sense.',
      '398 + 205 大约是 400 + 200 = 600。估算能帮你检查答案是否合理。'],
    art(el) {
      el.innerHTML = lessonEq('≈ 400 + 200 = 600', 1);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: place value within 10,000, and rounding. A mini game every 10 questions.',
      '20 道四年级题：万以内的位值，以及四舍五入。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_BIG1 = [
  () => {
    const n = ri(1234, 9876);
    const ans = placeOf(n, 1000);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`In ${n}, what digit is in the thousands place?`, `${n} 的千位数字是几？`],
      hints: [[`Thousands is the leftmost of these four digits.`, '四位数最左边是千位。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(1023, 9876);
    const ans = placeOf(n, 100);
    const { choices, answer } = numChoices(ans, [placeOf(n, 10), placeOf(n, 1), placeOf(n, 1000), (ans + 1) % 10]);
    return cq({ pts: 3, choices, answer,
      q: [`In ${n}, what digit is in the hundreds place?`, `${n} 的百位数字是几？`],
      hints: [[`Hundreds is the second digit from the left in a 4-digit number.`, '四位数从左数第二位是百位。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const th = ri(1, 9), h = ri(0, 9), t = ri(0, 9), o = ri(0, 9);
    const n = th * 1000 + h * 100 + t * 10 + o;
    return cq({ pts: 3, input: true, answer: n,
      q: [`What number is ${th} thousands, ${h} hundreds, ${t} tens and ${o} ones?`,
        `${th} 个千、${h} 个百、${t} 个十、${o} 个一，组成的数是多少？`],
      hints: [[`${th}×1000 + ${h}×100 + ${t}×10 + ${o}.`, `${th}×1000 + ${h}×100 + ${t}×10 + ${o}。`]],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const n = ri(23, 96);
    const ans = roundTo(n, 10);
    const { choices, answer } = numChoices(ans, [n, Math.floor(n / 10) * 10, ans + 10, Math.max(0, ans - 10)]);
    return cq({ pts: 3, choices, answer,
      q: [`Round ${n} to the nearest 10.`, `把 ${n} 四舍五入到最近的十。`],
      hints: [[`Look at the ones digit: ${n % 10}.`, `看个位：${n % 10}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(150, 980);
    const ans = roundTo(n, 100);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`Round ${n} to the nearest 100.`, `把 ${n} 四舍五入到最近的百。`],
      hints: [[`Look at the tens digit: ${placeOf(n, 10)}.`, `看十位：${placeOf(n, 10)}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(1500, 9600);
    const ans = roundTo(n, 1000);
    const { choices, answer } = numChoices(ans, [n, roundTo(n, 100), ans + 1000, Math.max(0, ans - 1000)]);
    return cq({ pts: 4, choices, answer,
      q: [`Round ${n} to the nearest 1000.`, `把 ${n} 四舍五入到最近的千。`],
      hints: [[`Look at the hundreds digit: ${placeOf(n, 100)}.`, `看百位：${placeOf(n, 100)}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = 2460;
    const choices = shuffle(['2500', '2000', '2460', '2400', '3000']);
    return cq({ pts: 4, choices, answer: choices.indexOf('2500'),
      q: [`Round ${n} to the nearest 100.`, `把 ${n} 四舍五入到最近的百。`],
      hints: [['The tens digit is 6, so round up.', '十位是 6，要进一。']],
      explain: ['2500.', '2500。'] });
  },
  () => {
    const a = ri(380, 420), b = ri(180, 220);
    const ans = roundTo(a, 100) + roundTo(b, 100);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Estimate ${a} + ${b} by rounding each number to the nearest 100.`,
        `把 ${a} 和 ${b} 都四舍五入到百位，再估算它们的和。`],
      hints: [[`${roundTo(a, 100)} + ${roundTo(b, 100)}.`, `${roundTo(a, 100)} + ${roundTo(b, 100)}。`]],
      explain: [`About ${ans}.`, `大约 ${ans}。`] });
  },
  () => {
    const n = ri(5000, 9999);
    const ans = Math.floor(n / 1000) * 1000;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`How many thousands are in ${n}? Write that many thousands as a number (like 7000).`,
        `${n} 里有几个千？写成整千的数（例如 7000）。`],
      hints: [[`Use the thousands digit.`, '看千位上的数字。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(1024, 8765);
    const ans = placeOf(n, 100) * 100;
    const { choices, answer } = numChoices(ans, [placeOf(n, 1000) * 1000, placeOf(n, 10) * 10, n, ans + 100]);
    return cq({ pts: 3, choices, answer,
      q: [`In ${n}, what is the value of the hundreds digit?`, `${n} 里百位数字表示的数值是多少？`],
      hints: [[`The hundreds digit is ${placeOf(n, 100)}.`, `百位数字是 ${placeOf(n, 100)}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const choices = shuffle(['40', '50', '47', '45', '60']);
    return cq({ pts: 3, choices, answer: choices.indexOf('50'),
      q: ['Round 47 to the nearest 10.', '把 47 四舍五入到最近的十。'],
      hints: [['Ones digit 7 ≥ 5, so round up.', '个位 7 ≥ 5，进一。']],
      explain: ['50.', '50。'] });
  },
  () => {
    let m = ri(31, 89);
    while (m % 10 === 0) m = ri(31, 89);
    const ans = roundTo(m, 10);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`Round ${m} to the nearest 10.`, `把 ${m} 四舍五入到最近的十。`],
      hints: [[`Ones digit: ${m % 10}.`, `个位是 ${m % 10}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const w = ri(2, 9), n = w * 10000;
    return cq({ pts: 4, input: true, answer: n,
      q: [`What is ${w} ten-thousands written as a number?`, `${w} 个一万写成数字是多少？`],
      hints: [[`${w} × 10,000 = ${n}.`, `${w} × 10000 = ${n}。`]],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const choices = shuffle(['600', '603', '500', '700', '400']);
    return cq({ pts: 4, choices, answer: choices.indexOf('600'),
      q: ['Which is the best estimate for 398 + 205?', '398 + 205 的最佳估算是哪个？'],
      hints: [['Round to hundreds: 400 + 200.', '四舍五入到百位：400 + 200。']],
      explain: ['About 600.', '大约 600。'] });
  },
  () => {
    const n = ri(2100, 8900);
    const ans = roundTo(n, 100);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Round ${n} to the nearest 100.`, `把 ${n} 四舍五入到最近的百。`],
      hints: [[`Look at the tens digit: ${placeOf(n, 10)}.`, `看十位：${placeOf(n, 10)}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(1234, 8765);
    const good = placeOf(n, 10);
    const { choices, answer } = numChoices(good, [placeOf(n, 1), placeOf(n, 100), placeOf(n, 1000), (good + 2) % 10, (good + 3) % 10]);
    return cq({ pts: 3, choices, answer,
      q: [`In ${n}, what digit is in the tens place?`, `${n} 的十位数字是几？`],
      hints: [['Tens is second from the right.', '从右边数第二位是十位。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const n = ri(1234, 9876);
    return cq({ pts: 3, input: true, answer: n,
      q: [`Write the number: ${placeOf(n, 1000)} thousands ${placeOf(n, 100)} hundreds ${placeOf(n, 10)} tens ${placeOf(n, 1)}.`,
        `写出这个数：${placeOf(n, 1000)} 个千 ${placeOf(n, 100)} 个百 ${placeOf(n, 10)} 个十 ${placeOf(n, 1)} 个一。`],
      hints: [['Put the digits in order from thousands to ones.', '从千位到个位依次写数字。']],
      explain: [`${n}.`, `${n}。`] });
  },
  () => {
    const choices = shuffle(['4000', '4400', '4350', '5000', '4300']);
    return cq({ pts: 4, choices, answer: choices.indexOf('4000'),
      q: ['Round 4350 to the nearest 1000.', '把 4350 四舍五入到最近的千。'],
      hints: [['Hundreds digit is 3, so round down.', '百位是 3，舍去。']],
      explain: ['4000.', '4000。'] });
  },
  () => {
    const x = ri(280, 320), y = ri(180, 220);
    const ans = roundTo(x, 100) + roundTo(y, 100);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Estimate ${x} + ${y} by rounding each to the nearest 100.`,
        `把 ${x} 和 ${y} 都四舍五入到百位，估算它们的和。`],
      hints: [[`${roundTo(x, 100)} + ${roundTo(y, 100)} = ${ans}.`, `${roundTo(x, 100)} + ${roundTo(y, 100)} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const n = ri(4567, 8765);
    return cq({ pts: 5, boss: true, input: true, answer: n,
      q: [`Boss: A number has thousands digit ${placeOf(n, 1000)}, hundreds ${placeOf(n, 100)}, tens ${placeOf(n, 10)}, ones ${placeOf(n, 1)}. What is the number?`,
        `Boss 题：一个数的千位是 ${placeOf(n, 1000)}，百位是 ${placeOf(n, 100)}，十位是 ${placeOf(n, 10)}，个位是 ${placeOf(n, 1)}。这个数是多少？`],
      hints: [[`Build it: ${placeOf(n, 1000)}${placeOf(n, 100)}${placeOf(n, 10)}${placeOf(n, 1)}.`,
        `组成：${placeOf(n, 1000)}${placeOf(n, 100)}${placeOf(n, 10)}${placeOf(n, 1)}。`]],
      explain: [`${n}.`, `${n}。`] });
  }
];

registerSeries({
  id: 'big1', camp: true, breakEvery: 10, perRound: 20, games: ['rounddash', 'blankdial', 'opmachine'],
  tag: ['Big Numbers · G4', '大数与估算 · 四年级'],
  name: ['Ten-thousands & Rounding', '万以内与四舍五入'],
  desc: ['Place value within 10,000; round to 10, 100, 1000', '万以内位值；四舍五入到十、百、千'],
  lesson: LESSON_BIG1,
  questions: Q_BIG1,
  next: 'dec1'
});
