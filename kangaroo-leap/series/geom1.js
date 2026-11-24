// Leap G4 · 周长面积：长方形 / 正方形

function geomFactors(n) {
  const f = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i);
  return f;
}

const LESSON_GEOM1 = [
  {
    title: ['Perimeter', '周长'],
    text: ['Perimeter is the fence around a shape. For a rectangle: 2 × (length + width).',
      '周长就是围一圈的篱笆。长方形周长：2 ×（长 + 宽）。'],
    art(el) {
      el.innerHTML = lessonEq('P = 2 × (L + W)', 1);
    }
  },
  {
    title: ['Area', '面积'],
    text: ['Area is how many unit squares cover the floor. For a rectangle: length × width.',
      '面积是铺满地面需要多少个方格。长方形面积：长 × 宽。'],
    art(el) {
      el.innerHTML = lessonEq('A = L × W', 1);
    }
  },
  {
    title: ['Square', '正方形'],
    text: ['A square has four equal sides. Perimeter = 4 × side. Area = side × side.',
      '正方形四条边一样长。周长 = 4 × 边长。面积 = 边长 × 边长。'],
    art(el) {
      el.innerHTML = lessonEq('P = 4s', .3) + lessonEq('A = s × s', 1.3);
    }
  },
  {
    title: ['Do not mix them up', '不要搞混'],
    text: ['Perimeter uses addition (then ×2). Area uses multiplication. Units: perimeter in cm, area in cm².',
      '周长先加再乘 2，面积是相乘。单位：周长用厘米，面积用平方厘米。'],
    art(el) {
      el.innerHTML = lessonEq('cm vs cm²', 1);
    }
  },
  {
    title: ['Find a missing side', '求一边'],
    text: ['If a rectangle has area 24 and width 4, length = 24 ÷ 4 = 6.',
      '长方形面积 24、宽 4，那么长 = 24 ÷ 4 = 6。'],
    art(el) {
      el.innerHTML = lessonEq('24 ÷ 4 = 6', 1);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: perimeter and area of rectangles and squares. A mini game every 10 questions.',
      '20 道四年级题：长方形和正方形的周长、面积。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_GEOM1 = [
  () => {
    const L = ri(5, 12), W = ri(2, L - 1), ans = 2 * (L + W);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A rectangle is ${L} cm by ${W} cm. What is its perimeter?`, `长方形长 ${L} 厘米、宽 ${W} 厘米。周长是多少厘米？`],
      hints: [[`2 × (${L} + ${W}) = ${ans}.`, `2 ×（${L} + ${W}）= ${ans}。`]],
      explain: [`${ans} cm.`, `${ans} 厘米。`] });
  },
  () => {
    const L = ri(4, 10), W = ri(2, L - 1), ans = L * W;
    const { choices, answer } = numChoices(ans, [2 * (L + W), L + W, L * 2, ans + W]);
    return cq({ pts: 3, choices, answer,
      q: [`A rectangle is ${L} cm by ${W} cm. What is its area?`, `长方形长 ${L} 厘米、宽 ${W} 厘米。面积是多少？`],
      hints: [[`${L} × ${W} = ${ans}.`, `${L} × ${W} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const s = ri(3, 12), ans = 4 * s;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A square has side ${s} cm. What is its perimeter?`, `正方形边长 ${s} 厘米。周长是多少厘米？`],
      hints: [[`4 × ${s} = ${ans}.`, `4 × ${s} = ${ans}。`]],
      explain: [`${ans} cm.`, `${ans} 厘米。`] });
  },
  () => {
    const s = ri(3, 10), ans = s * s;
    const { choices, answer } = numChoices(ans, [4 * s, 2 * s, s + s, ans + s]);
    return cq({ pts: 3, choices, answer,
      q: [`A square has side ${s} cm. What is its area?`, `正方形边长 ${s} 厘米。面积是多少？`],
      hints: [[`${s} × ${s} = ${ans}.`, `${s} × ${s} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const L = 8, W = 3;
    const choices = shuffle(['22', '24', '11', '16', '5']);
    return cq({ pts: 3, choices, answer: choices.indexOf('22'),
      q: [`Perimeter of an 8×3 rectangle?`, `长 8、宽 3 的长方形，周长是多少？`],
      hints: [['2 × (8 + 3) = 22.', '2 ×（8 + 3）= 22。']],
      explain: ['22.', '22。'] });
  },
  () => {
    const area = pick([12, 18, 20, 24, 30, 36]), W = pick(geomFactors(area).filter(f => f > 1 && f < area));
    const L = area / W;
    return cq({ pts: 4, input: true, answer: L,
      q: [`A rectangle has area ${area} and width ${W}. What is the length?`, `长方形面积 ${area}，宽 ${W}。长是多少？`],
      hints: [[`${area} ÷ ${W} = ${L}.`, `${area} ÷ ${W} = ${L}。`]],
      explain: [`${L}.`, `${L}。`] });
  },
  () => {
    const peri = pick([20, 24, 28, 32]), s = peri / 4;
    return cq({ pts: 4, input: true, answer: s,
      q: [`A square has perimeter ${peri}. What is the side length?`, `正方形周长 ${peri}。边长是多少？`],
      hints: [[`${peri} ÷ 4 = ${s}.`, `${peri} ÷ 4 = ${s}。`]],
      explain: [`${s}.`, `${s}。`] });
  },
  () => {
    let L = ri(6, 12), W = ri(2, 5), peri = 2 * (L + W), area = L * W;
    while (peri === area || peri === L + W) {
      L = ri(6, 12); W = ri(2, 5); peri = 2 * (L + W); area = L * W;
    }
    const choices = [
      T(`Perimeter ${peri}`, `周长 ${peri}`),
      T(`Area ${peri}`, `面积 ${peri}`),
      T(`Perimeter ${area}`, `周长 ${area}`),
      T(`Area ${L + W}`, `面积 ${L + W}`),
      T('Cannot tell', '无法判断')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: [`A ${L}×${W} rectangle. Which is correct?`, `长 ${L}、宽 ${W} 的长方形。哪一句对？`],
      hints: [[`Perimeter 2×(${L}+${W})=${peri}; area ${area}.`, `周长 ${peri}，面积 ${area}。`]],
      explain: [`Perimeter ${peri}.`, `周长是 ${peri}。`] });
  },
  () => {
    const s = ri(4, 9), ans = s * s;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`How many 1×1 squares cover a ${s}×${s} square?`, `边长 ${s} 的大正方形，能铺多少个 1×1 小正方形？`],
      hints: [[`That is the area: ${s}×${s}.`, '就是面积：${s}×${s}。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const L = ri(5, 10), W = ri(2, 4), ans = L * W;
    const { choices, answer } = numChoices(ans, [2 * (L + W), L + W, L + 2 * W, (L - 1) * W]);
    return cq({ pts: 3, choices, answer,
      q: [`Area of a ${L} by ${W} rectangle?`, `长 ${L}、宽 ${W} 的长方形，面积是？`],
      hints: [[`${L} × ${W}.`, `${L} × ${W}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const peri = 2 * (ri(5, 9) + ri(2, 4));
    // recover: pick L,W with that peri
    const W = ri(2, 5), L = peri / 2 - W;
    if (L <= W || !Number.isInteger(L)) {
      const Ww = 3, Ll = 7, p = 2 * (Ll + Ww);
      return cq({ pts: 4, input: true, answer: p,
        q: [`Rectangle ${Ll} by ${Ww}. Perimeter?`, `长方形 ${Ll}×${Ww}，周长？`],
        hints: [[`2×(${Ll}+${Ww})=${p}.`, `2×（${Ll}+${Ww}）=${p}。`]],
        explain: [`${p}.`, `${p}。`] });
    }
    return cq({ pts: 4, input: true, answer: peri,
      q: [`Rectangle ${L} by ${W}. Perimeter?`, `长方形 ${L}×${W}，周长？`],
      hints: [[`2×(${L}+${W})=${peri}.`, `2×（${L}+${W}）=${peri}。`]],
      explain: [`${peri}.`, `${peri}。`] });
  },
  () => {
    const s = 6;
    const choices = shuffle(['36', '24', '12', '18', '30']);
    return cq({ pts: 3, choices, answer: choices.indexOf('36'),
      q: ['Area of a square with side 6?', '边长 6 的正方形，面积是多少？'],
      hints: [['6 × 6 = 36.', '6 × 6 = 36。']],
      explain: ['36.', '36。'] });
  },
  () => {
    const area = 36, s = 6;
    return cq({ pts: 4, input: true, answer: s,
      q: [`A square has area ${area}. What is the side length?`, `正方形面积 ${area}。边长是多少？`],
      hints: [[`□ × □ = ${area}, so □ = ${s}.`, `□ × □ = ${area}，所以 □ = ${s}。`]],
      explain: [`${s}.`, `${s}。`] });
  },
  () => {
    const L = 10, W = 4, ans = 2 * (L + W);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A garden is ${L} m by ${W} m. How many meters of fence are needed to go all around?`,
        `花园长 ${L} 米、宽 ${W} 米。四周围一圈篱笆要多少米？`],
      hints: [['That is the perimeter.', '求的是周长。']],
      explain: [`${ans} m.`, `${ans} 米。`] });
  },
  () => {
    const L = 9, W = 5, ans = L * W;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A floor is ${L} m by ${W} m. How many square meters of carpet are needed?`,
        `地板长 ${L} 米、宽 ${W} 米。铺满地毯需要多少平方米？`],
      hints: [['That is the area.', '求的是面积。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const choices = [
      T('Perimeter', '周长'),
      T('Area', '面积'),
      T('Both the same', '一样'),
      T('Neither', '都不是'),
      T('Volume', '体积')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['You buy ribbon to wrap around a gift box once. Do you need perimeter or area?',
        '买丝带绕礼盒一圈，要求的是周长还是面积？'],
      hints: [['Around the outside → perimeter.', '绕一圈 → 周长。']],
      explain: ['Perimeter.', '周长。'] });
  },
  () => {
    const L = ri(8, 14), W = ri(3, 6), ans = L * W;
    const { choices, answer } = numChoices(ans, [2 * (L + W), L + W, (L - 1) * W, L * (W + 1)]);
    return cq({ pts: 4, choices, answer,
      q: [`Area of ${L}×${W}?`, `${L}×${W} 的面积？`],
      hints: [[`${L}×${W}=${ans}.`, `${L}×${W}=${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const peri = 28, W = 5, L = peri / 2 - W;
    return cq({ pts: 4, input: true, answer: L,
      q: [`A rectangle has perimeter ${peri} and width ${W}. What is the length?`,
        `长方形周长 ${peri}，宽 ${W}。长是多少？`],
      hints: [[`L + W = ${peri}/2 = ${peri / 2}.`, `长+宽 = ${peri / 2}。`], [`L = ${peri / 2} − ${W} = ${L}.`, `长 = ${L}。`]],
      explain: [`${L}.`, `${L}。`] });
  },
  () => {
    const s = ri(5, 9);
    const choices = shuffle([String(4 * s), String(s * s), String(2 * s), String(s + 4), String(s * 3)]);
    return cq({ pts: 4, choices, answer: choices.indexOf(String(4 * s)),
      q: [`Perimeter of a square with side ${s}?`, `边长 ${s} 的正方形，周长？`],
      hints: [[`4×${s}.`, `4×${s}。`]],
      explain: [`${4 * s}.`, `${4 * s}。`] });
  },
  () => {
    const L = 12, W = 5, peri = 2 * (L + W), area = L * W;
    return cq({ pts: 5, boss: true, input: true, answer: peri + area,
      q: [`Boss: A ${L}×${W} rectangle. What is perimeter plus area?`,
        `Boss 题：长 ${L}、宽 ${W} 的长方形。周长加面积等于多少？`],
      hints: [[`Perimeter ${peri}, area ${area}.`, `周长 ${peri}，面积 ${area}。`],
        [`${peri} + ${area} = ${peri + area}.`, `${peri} + ${area} = ${peri + area}。`]],
      explain: [`${peri + area}.`, `${peri + area}。`] });
  }
];

registerSeries({
  id: 'geom1', camp: true, breakEvery: 10, perRound: 20, games: ['fencefill', 'rounddash', 'opsprint'],
  tag: ['Perimeter & Area · G4', '周长面积 · 四年级'],
  name: ['Rectangles & Squares', '长方形与正方形'],
  desc: ['Perimeter and area of rectangles and squares', '长方形、正方形的周长与面积'],
  lesson: LESSON_GEOM1,
  questions: Q_GEOM1,
  next: 'time1'
});
