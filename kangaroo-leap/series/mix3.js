// Leap G4 · 混合运算营 C：同分母分数的简单混合

const fracPick = (good, wrongs) => {
  const set = [good];
  wrongs.forEach(w => { if (w !== good && !set.includes(w)) set.push(w); });
  const choices = shuffle(set.slice(0, 5));
  return { choices, answer: choices.indexOf(good) };
};

const LESSON_MIX3 = [
  {
    title: ['Add the tops only', '只加分子'],
    text: ['2/7 + 3/7 − 1/7. The denominator stays 7. The top becomes 2 + 3 − 1 = 4, so 4/7.',
      '2/7 + 3/7 − 1/7。分母还是 7。分子是 2 + 3 − 1 = 4，所以是 4/7。'],
    art(el) {
      el.innerHTML = fBar(7, 4) + lessonEq('2/7 + 3/7 − 1/7 = 4/7', 1.2);
    }
  },
  {
    title: ['Do not add the bottoms', '分母不要相加'],
    text: ['3/8 + 2/8 is 5/8, not 5/16. The pieces were already the same size.',
      '3/8 + 2/8 是 5/8，不是 5/16。每一份本来就一样大。'],
    art(el) {
      el.innerHTML = lessonEq('3/8 + 2/8 = 5/8', .4)
        + `<p class="big appear" style="animation-delay:1.2s;color:#c8435a">${T('Not 5/16', '不是 5/16')}</p>`;
    }
  },
  {
    title: ['A fraction, then a whole number', '先算分数，再算整数'],
    text: ['1/4 of 20 is 5. If you then add 3, the result is 8.',
      '20 的 1/4 是 5。再加 3，就是 8。'],
    art(el) {
      el.innerHTML = lessonEq('20 ÷ 4 = 5', .2) + lessonEq('5 + 3 = 8', 1.3);
    }
  },
  {
    title: ['Two shares of the same kind', '两处同分母'],
    text: ['2/5 of 15 is 6, and 1/5 of 10 is 2. Together that is 8.',
      '15 的 2/5 是 6，10 的 1/5 是 2。合起来是 8。'],
    art(el) {
      el.innerHTML = lessonEq('6 + 2 = 8', 1);
    }
  },
  {
    title: ['Find one numerator', '反推分子'],
    text: ['If □/8 + 3/8 = 7/8, the missing numerator is 7 − 3 = 4.',
      '如果 □/8 + 3/8 = 7/8，缺的分子是 7 − 3 = 4。'],
    art(el) {
      el.innerHTML = lessonEq('□ + 3 = 7', .3) + lessonEq('□ = 4', 1.3);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: same-denominator fractions mixed with a whole-number step. A mini game every 10 questions.',
      '20 道四年级题：同分母分数的加减，以及和整数接在一起的一步。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX3 = [
  () => {
    const d = pick([6, 7, 8, 9]), a = ri(1, 3), b = ri(1, d - a - 1);
    const good = `${a + b}/${d}`;
    const { choices, answer } = fracPick(good, [`${a + b}/${d * 2}`, `${a}/${d}`, `${b}/${d}`, `${a + b + 1}/${d}`]);
    return cq({ pts: 3, choices, answer,
      q: [`What is ${a}/${d} + ${b}/${d}?`, `${a}/${d} + ${b}/${d} = ?`],
      hints: [[`Add the numerators: ${a} + ${b} = ${a + b}.`, `分子相加：${a} + ${b} = ${a + b}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const d = pick([6, 7, 8, 9]), a = ri(3, d - 1), b = ri(1, a - 1);
    const good = `${a - b}/${d}`;
    const { choices, answer } = fracPick(good, [`${a - b}/${d * 2}`, `${a}/${d}`, `${b}/${d}`, `${a + b}/${d}`]);
    return cq({ pts: 3, choices, answer,
      q: [`What is ${a}/${d} − ${b}/${d}?`, `${a}/${d} − ${b}/${d} = ?`],
      hints: [[`${a} − ${b} = ${a - b}, denominator stays ${d}.`, `分子 ${a} − ${b} = ${a - b}，分母仍是 ${d}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const d = pick([8, 9, 10]), a = ri(2, 4), b = ri(2, 4), c = ri(1, Math.min(2, a + b - 1));
    const n = a + b - c;
    const good = `${n}/${d}`;
    const { choices, answer } = fracPick(good, [`${a + b + c}/${d}`, `${n}/${d * 2}`, `${a}/${d}`, `${n + 1}/${d}`]);
    return cq({ pts: 4, choices, answer,
      q: [`What is ${a}/${d} + ${b}/${d} − ${c}/${d}?`, `${a}/${d} + ${b}/${d} − ${c}/${d} = ?`],
      hints: [[`Numerators: ${a} + ${b} − ${c} = ${n}.`, `分子：${a} + ${b} − ${c} = ${n}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const k = pick([2, 3, 4, 5]), q = ri(2, 6), N = k * q, extra = ri(2, 8), ans = q + extra;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`What is 1/${k} of ${N}, plus ${extra}?`, `${N} 的 1/${k}，再加上 ${extra}，是多少？`],
      hints: [[`1/${k} of ${N} is ${q}.`, `${N} 的 1/${k} 是 ${q}。`], [`${q} + ${extra} = ${ans}.`, `${q} + ${extra} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const s = ri(2, 5), t = ri(2, 5), A = 5 * s, B = 5 * t, ans = 2 * s + t;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is 2/5 of ${A}, plus 1/5 of ${B}?`, `${A} 的 2/5，加上 ${B} 的 1/5，是多少？`],
      hints: [[`2/5 of ${A} = ${2 * s}. 1/5 of ${B} = ${t}.`, `${A} 的 2/5 = ${2 * s}，${B} 的 1/5 = ${t}。`],
        [`${2 * s} + ${t} = ${ans}.`, `${2 * s} + ${t} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const d = pick([6, 8, 9]), a = ri(1, 3), b = ri(1, d - a - 1);
    const good = `${a + b}/${d}`;
    const { choices, answer } = fracPick(good, [`${a + b}/${d * 2}`, `${a + b}/${a + b}`, `1/${d}`, `${a}/${b}`]);
    return cq({ pts: 3, choices, answer,
      q: [`Which fraction equals ${a}/${d} + ${b}/${d}?`, `${a}/${d} + ${b}/${d} 等于哪一个？`],
      hints: [['The denominator does not get added.', '分母不要相加。']],
      explain: [`${good}, not ${a + b}/${d * 2}.`, `是 ${good}，不是 ${a + b}/${d * 2}。`] });
  },
  () => {
    const d = pick([6, 7, 8, 9, 10]), b = ri(1, d - 3), sum = ri(b + 1, d - 1), q = sum - b;
    return cq({ pts: 4, input: true, answer: q,
      q: [`□/${d} + ${b}/${d} = ${sum}/${d}. What is □?`, `□/${d} + ${b}/${d} = ${sum}/${d}。□ 是多少？`],
      hints: [[`□ + ${b} = ${sum}.`, `□ + ${b} = ${sum}。`], [`□ = ${q}.`, `□ = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const d = pick([4, 5, 6, 8]), parts = ri(2, d - 1), q = ri(2, 5), N = d * q, ans = parts * q;
    const a = ri(1, parts - 1), b = parts - a;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is (${a}/${d} + ${b}/${d}) of ${N}?`, `(${a}/${d} + ${b}/${d}) × ${N}，也就是 ${N} 的 ${a}/${d} 加 ${b}/${d}，结果是多少？`],
      hints: [[`${a}/${d} + ${b}/${d} = ${parts}/${d}.`, `${a}/${d} + ${b}/${d} = ${parts}/${d}。`],
        [`${parts}/${d} of ${N} = ${ans}.`, `${N} 的 ${parts}/${d} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const d = pick([8, 9, 10]), a = 1, b = 1, c = 1;
    const good = `3/${d}`;
    const { choices, answer } = fracPick(good, [`3/${d * 3}`, `1/${d}`, `4/${d}`, `3/${d + 1}`]);
    return cq({ pts: 3, choices, answer,
      q: [`What is ${a}/${d} + ${b}/${d} + ${c}/${d}?`, `${a}/${d} + ${b}/${d} + ${c}/${d} = ?`],
      hints: [[`Three numerators of 1 make 3.`, '三个分子 1 加起来是 3。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const q = ri(2, 4), N = 8 * q, more = ri(1, 3), ans = N - q - more;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${N} cookies. Eat 1/8 of them, then eat ${more} more. How many are left?`,
        `${N} 块饼干，先吃掉 1/8，再吃 ${more} 块。还剩几块？`],
      hints: [[`1/8 of ${N} is ${q}.`, `${N} 的 1/8 是 ${q}。`], [`${N} − ${q} − ${more} = ${ans}.`, `${N} − ${q} − ${more} = ${ans}。`]],
      explain: [`${ans}.`, `${ans} 块。`] });
  },
  () => {
    const a = ri(2, 4), b = ri(1, 3), d = pick([7, 8, 9]);
    const good = `${a + b}/${d}`;
    const { choices, answer } = fracPick(good, [`${a + b}/${d * 2}`, `${a + b}/${a + b}`, `${a}/${d}`, `${b}/${d}`]);
    return cq({ pts: 3, choices, answer,
      q: [`${a}/${d} + ${b}/${d} equals which fraction?`, `${a}/${d} + ${b}/${d} 等于下面哪一个？`],
      hints: [[`It is not ${a + b}/${d * 2}.`, `不是 ${a + b}/${d * 2}。`]],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const d = pick([4, 5, 8]), q = ri(2, 4), N = d * q, a = ri(1, d - 2), b = ri(1, d - a - 1), ans = (a + b) * q;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is ${a}/${d} of ${N}, plus ${b}/${d} of ${N}?`, `${N} 的 ${a}/${d}，加上 ${N} 的 ${b}/${d}，是多少？`],
      hints: [[`${a}/${d} of ${N} = ${a * q}. ${b}/${d} of ${N} = ${b * q}.`, `${N} 的 ${a}/${d} = ${a * q}，${b}/${d} = ${b * q}。`],
        [`${a * q} + ${b * q} = ${ans}.`, `${a * q} + ${b * q} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const d = pick([7, 8, 9]);
    const good = `4/${d}`;
    const { choices, answer } = fracPick(good, [`8/${d}`, `4/${d * 3}`, `3/${d}`, `5/${d}`]);
    return cq({ pts: 4, choices, answer,
      q: [`What is 5/${d} − 2/${d} + 1/${d}?`, `5/${d} − 2/${d} + 1/${d} = ?`],
      hints: [[`5 − 2 + 1 = 4.`, '分子 5 − 2 + 1 = 4。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const q = ri(3, 6), N = 5 * q, more = ri(2, 6), ans = 2 * q + more;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`A ribbon is ${N} cm. You use 2/5 of it, then ${more} cm more. How many centimeters do you use?`,
        `一条丝带长 ${N} 厘米。先用掉 2/5，再用 ${more} 厘米。一共用了多少厘米？`],
      hints: [[`2/5 of ${N} = ${2 * q}.`, `${N} 的 2/5 = ${2 * q}。`], [`${2 * q} + ${more} = ${ans}.`, `${2 * q} + ${more} = ${ans}。`]],
      explain: [`${ans} cm.`, `${ans} 厘米。`] });
  },
  () => {
    const d = pick([6, 7, 8, 9]);
    const choices = [
      T(`4/${d} is greater`, `4/${d} 更大`),
      T(`1/${d} + 2/${d} is greater`, `1/${d} + 2/${d} 更大`),
      T('They are equal', '一样大'),
      T('Cannot tell', '无法比较'),
      T(`1/${d} is greater`, `1/${d} 更大`)
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: [`Which is greater: 1/${d} + 2/${d}, or 4/${d}?`, `1/${d} + 2/${d} 和 4/${d}，哪个大？`],
      hints: [[`1/${d} + 2/${d} = 3/${d}.`, `1/${d} + 2/${d} = 3/${d}。`]],
      explain: [`4/${d} is greater than 3/${d}.`, `4/${d} 比 3/${d} 大。`] });
  },
  () => {
    const k = pick([3, 4, 5]), q1 = ri(2, 5), q2 = ri(2, 5), ans = q1 + q2;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is 1/${k} of ${k * q1}, plus 1/${k} of ${k * q2}?`, `${k * q1} 的 1/${k}，加上 ${k * q2} 的 1/${k}，是多少？`],
      hints: [[`${q1} + ${q2} = ${ans}.`, `${q1} + ${q2} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const d = pick([6, 8, 10]), known = ri(1, d - 2), sum = ri(known + 1, d - 1), q = sum - known;
    const good = String(q);
    const { choices, answer } = fracPick(good, [String(sum), String(known), String(d), String(q + d)]);
    return cq({ pts: 4, choices, answer,
      q: [`□/${d} + ${known}/${d} = ${sum}/${d}. What is the missing numerator?`,
        `□/${d} + ${known}/${d} = ${sum}/${d}。缺的分子是多少？`],
      hints: [[`${sum} − ${known} = ${q}.`, `${sum} − ${known} = ${q}。`]],
      explain: [`${q}.`, `${q}。`] });
  },
  () => {
    const d = pick([5, 8, 10]), a = ri(1, Math.floor(d / 2) - 1 || 1), b = ri(1, Math.floor(d / 2)), q = ri(2, 5);
    const parts = a + b, N = d * q, ans = parts * q;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What is (${a}/${d} + ${b}/${d}) of ${N}?`, `${N} 的 (${a}/${d} + ${b}/${d}) 是多少？`],
      hints: [[`That is ${parts}/${d} of ${N}.`, `就是 ${N} 的 ${parts}/${d}。`], [`${N} ÷ ${d} × ${parts} = ${ans}.`, `${N} ÷ ${d} × ${parts} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const d = pick([8, 9, 10]);
    const good = `3/${d}`;
    const { choices, answer } = fracPick(good, [`9/${d}`, `3/${d * 3}`, `4/${d}`, `1/${d}`]);
    return cq({ pts: 4, choices, answer,
      q: [`What is 6/${d} − 2/${d} − 1/${d}?`, `6/${d} − 2/${d} − 1/${d} = ?`],
      hints: [[`6 − 2 − 1 = 3.`, '分子 6 − 2 − 1 = 3。']],
      explain: [`${good}.`, `${good}。`] });
  },
  () => {
    const q = ri(3, 6), N = 9 * q, red = 2 * q, green = 3 * q, ans = N - red - green;
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: ${N} marbles. 2/9 are red and 3/9 are green. How many are neither red nor green?`,
        `Boss 题：${N} 颗弹珠，2/9 是红色，3/9 是绿色。既不是红也不是绿的有几颗？`],
      hints: [[`Red ${red}, green ${green}.`, `红色 ${red} 颗，绿色 ${green} 颗。`],
        [`${N} − ${red} − ${green} = ${ans}.`, `${N} − ${red} − ${green} = ${ans}。`]],
      explain: [`${ans}.`, `${ans} 颗。`] });
  }
];

registerSeries({
  id: 'mix3', camp: true, breakEvery: 10, perRound: 20, games: ['fracchain', 'extraout', 'piepop'],
  tag: ['Mixed Ops Camp C · G4', '混合运算营 C · 四年级'],
  name: ['Fractions in the Mix', '分数混合运算'],
  desc: ['Same-denominator +/− mixed with a whole-number step', '同分母加减，再接一步整数'],
  lesson: LESSON_MIX3,
  questions: Q_MIX3,
  next: 'mix4'
});
