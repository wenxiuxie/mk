// 间隔营 — Gaps Camp (competition thinking): trees on a road, sawing logs, climbing stairs, clock chimes.
// 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Key idea: count the GAPS first. Both ends: things = gaps + 1. One end (or a circle): things = gaps. No ends: things = gaps − 1.
// Pieces = cuts + 1. From floor 1 to floor k is k − 1 flights. 5 chimes have only 4 gaps.

// ---------- pictures (d = pop-in delay for the lesson, null draws it still) ----------
const ivA = (d, k = 0, step = .3) => d === null ? '' : ` class="appear" style="animation-delay:${d + k * step}s"`;
const ivTree = (cx, base, s = 1) => `<rect x="${cx - 3 * s}" y="${base - 14 * s}" width="${6 * s}" height="${14 * s}" fill="#8a5a2b"/><circle cx="${cx}" cy="${base - 24 * s}" r="${13 * s}" fill="#2f8f6b"/>`;
const ivHouse = cx => `<rect x="${cx - 14}" y="40" width="28" height="22" fill="#c8435a"/><path d="M${cx - 18} 42 L${cx} 24 L${cx + 18} 42 Z" fill="#8a3040"/>`;
// a road with n gaps; ends: true = a house at both ends, 'end' = only at the far end; trees go on every other mark
function ivRoad(n, ends = false, d = null, step = 0, unit = 'm') {
  const W = 520, x = k => 30 + k * (W - 60) / n, house = k => ends === true ? k === 0 || k === n : ends === 'end' && k === n;
  let s = `<line x1="${x(0)}" y1="64" x2="${x(n)}" y2="64" stroke="#8b98a8" stroke-width="6" stroke-linecap="round"/>`;
  for (let k = 0; k < n; k++) if (step) s += `<text x="${(x(k) + x(k + 1)) / 2}" y="84" text-anchor="middle" font-size="12" font-weight="700" fill="#3a76b8">${step}${unit}</text>`;
  for (let k = 0; k <= n; k++) s += `<g${ivA(d, k)}>${house(k) ? ivHouse(x(k)) : ivTree(x(k), 62)}</g>`;
  return `<svg viewBox="0 0 ${W} 92" style="width:100%;max-width:${W}px;display:block;margin:0 auto" role="img" aria-label="road with ${n} gaps">${s}</svg>`;
}
// a log in n pieces with a saw at each cut, cuts numbered
function ivLog(n, d = null) {
  const W = 520, x = k => 30 + k * (W - 60) / n;
  let s = '';
  for (let k = 0; k < n; k++) s += `<rect x="${x(k) + (k ? 4 : 0)}" y="34" width="${x(k + 1) - x(k) - (k ? 4 : 0) - (k < n - 1 ? 4 : 0)}" height="34" rx="8" fill="#c8742c" stroke="#8a5a2b" stroke-width="2"/>`;
  for (let k = 1; k < n; k++) s += `<text${ivA(d, k, .6)} x="${x(k)}" y="26" text-anchor="middle" font-size="20">🪚</text><text${ivA(d, k, .6)} x="${x(k)}" y="88" text-anchor="middle" font-size="15" font-weight="800" fill="#c8435a">${k}</text>`;
  return `<svg viewBox="0 0 ${W} 96" style="width:100%;max-width:${W}px;display:block;margin:0 auto" role="img" aria-label="log in ${n} pieces">${s}</svg>`;
}
// stairs from floor 1 (1F) up to floor f; the flights are numbered in red
function ivStairs(f, d = null) {
  const W = 360, H = 40 + 42 * (f - 1), sx = (W - 80) / (f - 1);
  let s = '';
  for (let k = 1; k <= f; k++) {
    const y = H - 10 - (k - 1) * 42, x0 = 20 + (k - 1) * sx;
    s += `<g${ivA(d, k, .5)}><rect x="${x0}" y="${y - 6}" width="${k < f ? sx : 60}" height="6" fill="#5d6b7c"/><text x="${x0 + 4}" y="${y - 12}" font-size="14" font-weight="800" fill="#3a76b8">${k}F</text>
      ${k < f ? `<path d="M${x0 + sx * .45} ${y - 8} L${x0 + sx} ${y - 44}" stroke="#c8435a" stroke-width="3" stroke-dasharray="5 4"/><text x="${x0 + sx * .78}" y="${y - 20}" font-size="13" font-weight="800" fill="#c8435a">${k}</text>` : ''}</g>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:0 auto" role="img" aria-label="${f} floors">${s}</svg>`;
}
// a clock chiming n times; the seconds sit in the gaps
function ivChimes(n, gap, d = null) {
  const W = 520, x = k => 40 + k * (W - 80) / (n - 1);
  let s = `<line x1="${x(0)}" y1="60" x2="${x(n - 1)}" y2="60" stroke="#8b98a8" stroke-width="2"/>`;
  for (let k = 0; k < n; k++) s += `<g${ivA(d, k, .6)}><text x="${x(k)}" y="44" text-anchor="middle" font-size="22">🔔</text><text x="${x(k)}" y="80" text-anchor="middle" font-size="12" font-weight="800" fill="#5d6b7c">DONG</text></g>`
    + (k < n - 1 ? `<text${ivA(d, k + .5, .6)} x="${(x(k) + x(k + 1)) / 2}" y="54" text-anchor="middle" font-size="13" font-weight="800" fill="#c8435a">${gap}s</text>` : '');
  return `<svg viewBox="0 0 ${W} 90" style="width:100%;max-width:${W}px;display:block;margin:0 auto" role="img" aria-label="${n} chimes">${s}</svg>`;
}
// trees around a round pond
function ivPond(n, d = null) {
  let s = '<circle cx="130" cy="130" r="80" fill="#cfe8f7" stroke="#8b98a8" stroke-width="4"/>';
  for (let k = 0; k < n; k++) { const a = 2 * Math.PI * k / n; s += `<g${ivA(d, k, .25)}>${ivTree(130 + 96 * Math.sin(a), 130 - 96 * Math.cos(a) + 12, .65)}</g>`; }
  return `<svg viewBox="0 0 260 260" width="230" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="${n} trees around a pond">${s}</svg>`;
}
// a square garden: only the top side's k trees are drawn (corners included), the other corners get a tree, the rest is left to work out
function ivSquare(k) {
  const L = 180, o = 30, pts = [[o, o + L], [o + L, o + L]];
  for (let i = 0; i < k; i++) pts.push([o + i / (k - 1) * L, o]);
  return `<svg viewBox="0 0 240 240" width="210" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="square garden, ${k} trees on the top side">
    <rect x="${o}" y="${o}" width="${L}" height="${L}" fill="#e3f1d8" stroke="#8b98a8" stroke-width="3"/>${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#2f8f6b"/>`).join('')}
    <text x="${o + L / 2}" y="${o + L / 2 + 10}" text-anchor="middle" font-size="34" font-weight="800" fill="#8b98a8">?</text></svg>`;
}
const ivTool = (n, step, mode = 'line', more = {}) => ({ tool: 'gaps', cfg: { n, step, unit: step ? ' m' : '', mode, ...more } });

const LESSON_INTERVALS = [
  {
    title: ['Count the gaps first', '先数间隔'],
    text: ['A road is 20 m long. Roo plants a tree every 5 m, at both ends too. 20 ÷ 5 = 4 gaps, but there are 5 trees! Both ends: trees = gaps + 1.',
      '一条路长 20 米，每 5 米种一棵树，两头都种。20 ÷ 5 = 4 个间隔，可是有 5 棵树！两头都种：棵数 = 间隔数 + 1。'],
    art(el) {
      el.innerHTML = ivRoad(4, false, .3, 5) + lessonEq('20 ÷ 5 = 4', 2) + lessonEq('4 + 1 = <span class="hl">5</span>', 2.8);
    }
  },
  {
    title: ['One end, no ends', '一头种、两头不种'],
    text: ['If there is a house at the far end, there is no tree there: trees = gaps. Houses at both ends: trees = gaps − 1.',
      '如果路的一头是房子，那里不种树：棵数 = 间隔数。两头都是房子：棵数 = 间隔数 − 1。'],
    art(el) {
      el.innerHTML = ivRoad(4, 'end', .3) + lessonEq(TI('4 gaps → <span class="hl">4</span> trees', '4 个间隔 → <span class="hl">4</span> 棵'), 1.8)
        + `<div class="appear" style="width:100%;animation-delay:2.4s">${ivRoad(4, true)}</div>` + lessonEq('4 − 1 = <span class="hl">3</span>', 3);
    }
  },
  {
    title: ['Sawing a log', '锯木头'],
    text: ['To cut a log into 4 pieces, Roo saws only 3 times! Pieces = cuts + 1. If each cut takes 2 minutes, that is 3 × 2 = 6 minutes, not 8.',
      '把木头锯成 4 段，只要锯 3 次！段数 = 次数 + 1。每锯一次要 2 分钟，就是 3 × 2 = 6 分钟，不是 8 分钟。'],
    art(el) {
      el.innerHTML = ivLog(4, .3) + lessonEq('4 − 1 = 3', 2.4) + lessonEq('3 × 2 = <span class="hl">6</span>', 3.2);
    }
  },
  {
    title: ['Climbing stairs', '爬楼梯'],
    text: ['From floor 1 to floor 4, how many floors do you climb? Not 4! You climb 1→2, 2→3, 3→4: only 3 flights of stairs.',
      '从 1 楼走到 4 楼，爬了几层？不是 4 层！1→2、2→3、3→4，只爬了 3 层楼梯。'],
    art(el) {
      el.innerHTML = ivStairs(4, .3) + lessonEq('4 − 1 = <span class="hl">3</span>', 2.6);
    }
  },
  {
    title: ['Clock chimes', '敲钟'],
    text: ['A clock chimes 3 times in 4 seconds. 3 chimes have only 2 gaps, so each gap is 4 ÷ 2 = 2 seconds. 5 chimes have 4 gaps: 4 × 2 = 8 seconds.',
      '钟敲 3 下用 4 秒。3 下之间只有 2 个间隔，每个间隔 4 ÷ 2 = 2 秒。敲 5 下有 4 个间隔：4 × 2 = 8 秒。'],
    art(el) {
      el.innerHTML = ivChimes(3, 2, .3) + lessonEq('4 ÷ 2 = 2', 2) + `<div class="appear" style="width:100%;animation-delay:2.6s">${ivChimes(5, 2)}</div>` + lessonEq('4 × 2 = <span class="hl">8</span>', 3.4);
    }
  },
  {
    title: ['Around a circle', '围成一圈'],
    text: ['Around a round pond there are no ends: the last gap leads back to the first tree. 8 gaps → 8 trees. In a circle, trees = gaps.',
      '圆形的池塘没有头也没有尾：最后一个间隔又回到第一棵树。8 个间隔 → 8 棵树。围成一圈：棵数 = 间隔数。'],
    art(el) {
      el.innerHTML = ivPond(8, .3) + lessonEq('8 = <span class="hl">8</span>', 2.6);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions about trees, logs, stairs and clocks. Always count the gaps first! After 10 you play a 60-second game. Ready?',
      '20 道种树、锯木头、爬楼梯、敲钟的题。永远先数间隔！做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const Q_INTERVALS = [
  // 1 · type-in · trees, both ends
  () => {
    const d = ri(2, 5), g = ri(3, 8), L = d * g;
    return cq({ pts: 3, input: true, answer: g + 1, unit: ['trees', '棵'],
      q: [`A road is ${L} m long. Roo plants a tree every ${d} m, at both ends too. How many trees?`, `一条路长 ${L} 米。袋鼠每隔 ${d} 米种一棵树，两头都种。一共种几棵树？`],
      hints: [[`Gaps: ${L} ÷ ${d} = ${g}.`, `间隔：${L} ÷ ${d} = ${g} 个。`], ['Both ends: trees = gaps + 1.', '两头都种：棵数 = 间隔数 + 1。']],
      explain: [`${L} ÷ ${d} = ${g} gaps, ${g} + 1 = ${g + 1} trees.`, `${L} ÷ ${d} = ${g} 个间隔，${g} + 1 = ${g + 1} 棵。`], ...ivTool(g, d) });
  },
  // 2 · choice · posts → gaps
  () => {
    const k = ri(4, 10);
    return cq({ pts: 3, ...numChoices(k - 1, [k, k + 1, k - 2]),
      q: [`There are ${k} fence posts in a straight row. How many gaps are there between the posts?`, `一排有 ${k} 根篱笆桩，排成一条直线。桩和桩之间有几个空隙？`],
      hints: [['Draw 3 posts: | | | — how many gaps? Only 2!', '画 3 根桩：| | |，有几个空隙？只有 2 个！'], ['Gaps = posts − 1.', '空隙数 = 桩数 − 1。']],
      explain: [`${k} − 1 = ${k - 1} gaps.`, `${k} − 1 = ${k - 1} 个空隙。`], ...ivTool(k - 1, 0) });
  },
  // 3 · type-in · pieces → cuts  (or a loop: cuts → pieces)
  [
    () => {
      const p = ri(3, 8);
      return cq({ pts: 3, input: true, answer: p - 1,
        q: [`Roo wants to saw a log into ${p} pieces. How many cuts does Roo need?`, `袋鼠要把一根木头锯成 ${p} 段。要锯几次？`],
        hints: [['1 cut makes 2 pieces.', '锯 1 次变成 2 段。'], ['Cuts = pieces − 1.', '次数 = 段数 − 1。']],
        explain: [`${p} − 1 = ${p - 1} cuts.`, `${p} − 1 = ${p - 1} 次。`], ...ivTool(p, 0, 'log') });
    },
    () => {
      const c = ri(3, 8);
      return cq({ pts: 3, input: true, answer: c,
        q: [`A rubber band is a closed loop. Roo cuts it in ${c} places. How many pieces does Roo get?`, `橡皮筋是一个圈。袋鼠在 ${c} 个地方各剪一刀。剪成了几段？`],
        hints: [['1 cut on a loop just opens it: still 1 piece!', '圈上剪 1 刀只是把它打开：还是 1 段！'], ['On a loop, pieces = cuts.', '圈上：段数 = 刀数。']],
        explain: [`A loop has no ends, so ${c} cuts make ${c} pieces.`, `圈没有头尾，剪 ${c} 刀就是 ${c} 段。`], ...ivTool(c + 2, 0, 'ring', { cut: true }) });
    }
  ],
  // 4 · choice · one end
  () => {
    const d = ri(2, 5), g = ri(4, 9), L = d * g;
    return cq({ pts: 3, ...numChoices(g, [g + 1, g - 1, L, d]),
      q: [`From the school gate to the wall is ${L} m. Roo puts a flag every ${d} m, starting at the gate. There is no flag at the wall. How many flags?`, `从校门到围墙长 ${L} 米。袋鼠从校门开始每隔 ${d} 米插一面旗，围墙那里不插。一共插几面旗？`],
      hints: [[`Gaps: ${L} ÷ ${d} = ${g}.`, `间隔：${L} ÷ ${d} = ${g} 个。`], ['Only one end has a flag: flags = gaps.', '只有一头插：面数 = 间隔数。']],
      explain: [`${L} ÷ ${d} = ${g} gaps, and with one end only there are ${g} flags.`, `${L} ÷ ${d} = ${g} 个间隔，只插一头，就是 ${g} 面旗。`], ...ivTool(g, d, 'line', { ends: 'end' }) });
  },
  // 5 · type-in · stairs
  () => {
    const f = ri(3, 6), s = pick([10, 12, 15, 20]);
    return cq({ pts: 3, input: true, answer: (f - 1) * s, unit: ['steps', '级'],
      q: [`Each floor of Roo's building has ${s} steps up to the next floor. Roo walks from floor 1 up to floor ${f}. How many steps does Roo climb?`, `袋鼠家的楼每层有 ${s} 级台阶。袋鼠从 1 楼走到 ${f} 楼，一共走了几级台阶？`],
      fig: ivStairs(f),
      hints: [[`From floor 1 to floor ${f} is ${f} − 1 = ${f - 1} flights, not ${f}.`, `从 1 楼到 ${f} 楼只爬 ${f} − 1 = ${f - 1} 层，不是 ${f} 层。`], [`${f - 1} × ${s} = ?`, `${f - 1} × ${s} = ?`]],
      explain: [`${f - 1} flights × ${s} steps = ${(f - 1) * s} steps.`, `${f - 1} 层 × ${s} 级 = ${(f - 1) * s} 级。`] });
  },
  // 6 · choice · chimes
  () => {
    const g = ri(1, 3), a = ri(2, 4), b = ri(a + 2, 8), t = (a - 1) * g, ans = (b - 1) * g;
    return cq({ pts: 3, ...numChoices(ans, [b * g, ans + g, (b * t) % a ? ans - g : b * t / a, b]), unit: ['seconds', '秒'],
      q: [`A clock chimes ${a} times in ${t} ${t === 1 ? 'second' : 'seconds'}. How many seconds does it take to chime ${b} times?`, `一个钟敲 ${a} 下用 ${t} 秒。敲 ${b} 下要几秒？`],
      hints: [[`${a} chimes have ${a - 1} ${a - 1 === 1 ? 'gap' : 'gaps'}, so each gap is ${t} ÷ ${a - 1} = ${g} s.`, `敲 ${a} 下有 ${a - 1} 个间隔，每个间隔 ${t} ÷ ${a - 1} = ${g} 秒。`], [`${b} chimes have ${b - 1} gaps.`, `敲 ${b} 下有 ${b - 1} 个间隔。`]],
      explain: [`Each gap is ${g} s. ${b} chimes: ${b - 1} × ${g} = ${ans} seconds.`, `每个间隔 ${g} 秒。敲 ${b} 下：${b - 1} × ${g} = ${ans} 秒。`] });
  },
  // 7 · type-in · no ends
  () => {
    const d = ri(2, 5), g = ri(4, 9), L = d * g;
    return cq({ pts: 4, input: true, answer: g - 1, unit: ['trees', '棵'],
      q: [`Two houses are ${L} m apart. Roo plants trees between them, one every ${d} m, but none right at the houses. How many trees?`, `两座房子相距 ${L} 米。袋鼠在两座房子之间每隔 ${d} 米种一棵树，房子那里不种。一共种几棵？`],
      hints: [[`Gaps: ${L} ÷ ${d} = ${g}.`, `间隔：${L} ÷ ${d} = ${g} 个。`], ['No trees at either end: trees = gaps − 1.', '两头都不种：棵数 = 间隔数 − 1。']],
      explain: [`${L} ÷ ${d} = ${g} gaps, ${g} − 1 = ${g - 1} trees.`, `${L} ÷ ${d} = ${g} 个间隔，${g} − 1 = ${g - 1} 棵。`], ...ivTool(g, d, 'line', { ends: true }) });
  },
  // 8 · choice · circle
  () => {
    const d = ri(2, 5), g = ri(5, 12), L = d * g;
    return cq({ pts: 4, ...numChoices(g, [g + 1, g - 1, L, L - d]), unit: ['trees', '棵'],
      q: [`The path around a round pond is ${L} m long. Roo plants a tree every ${d} m along it. How many trees?`, `一个圆形池塘一周长 ${L} 米。袋鼠沿着池塘每隔 ${d} 米种一棵树。一共种几棵？`],
      hints: [[`Gaps: ${L} ÷ ${d} = ${g}.`, `间隔：${L} ÷ ${d} = ${g} 个。`], ['A circle has no ends: trees = gaps.', '围成一圈没有头尾：棵数 = 间隔数。']],
      explain: [`${L} ÷ ${d} = ${g} gaps, so ${g} trees.`, `${L} ÷ ${d} = ${g} 个间隔，就是 ${g} 棵树。`], ...ivTool(g, 0, 'ring') });
  },
  // 9 · type-in · sawing time
  () => {
    const p = ri(3, 6), t = ri(2, 5);
    return cq({ pts: 4, input: true, answer: (p - 1) * t, unit: ['minutes', '分钟'],
      q: [`Each cut through a log takes Roo ${t} minutes. How long does it take Roo to saw the log into ${p} pieces?`, `袋鼠锯木头，每锯一次要 ${t} 分钟。把一根木头锯成 ${p} 段要几分钟？`],
      hints: [[`${p} pieces need ${p - 1} cuts.`, `锯成 ${p} 段要锯 ${p - 1} 次。`], [`${p - 1} × ${t} = ?`, `${p - 1} × ${t} = ?`]],
      explain: [`${p - 1} cuts × ${t} minutes = ${(p - 1) * t} minutes.`, `${p - 1} 次 × ${t} 分钟 = ${(p - 1) * t} 分钟。`], ...ivTool(p, 0, 'log') });
  },
  // 10 · choice · length of a line of kids
  () => {
    const k = ri(5, 10), d = ri(2, 3), ans = (k - 1) * d;
    return cq({ pts: 4, ...numChoices(ans, [k * d, (k + 1) * d, ans - d, ans + 1]), unit: ['m', '米'],
      q: [`${k} kids stand in a line. Each kid is ${d} m from the next one. How far is it from the first kid to the last kid?`, `${k} 个小朋友站成一排，相邻两人相距 ${d} 米。从第一个人到最后一个人有多远？`],
      hints: [[`${k} kids have ${k - 1} gaps between them.`, `${k} 个人之间有 ${k - 1} 个间隔。`], [`${k - 1} × ${d} = ?`, `${k - 1} × ${d} = ?`]],
      explain: [`${k - 1} gaps × ${d} m = ${ans} m.`, `${k - 1} 个间隔 × ${d} 米 = ${ans} 米。`] });
  },
  // 11 · type-in · climbing time
  () => {
    const a = ri(2, 4), f = ri(1, 4), b = ri(a + 2, 9), t = (a - 1) * f;
    return cq({ pts: 4, input: true, answer: (b - 1) * f, unit: ['minutes', '分钟'],
      q: [`Roo walks from floor 1 to floor ${a} in ${t} ${t === 1 ? 'minute' : 'minutes'}. At the same speed, how long does it take to walk from floor 1 to floor ${b}?`, `袋鼠从 1 楼走到 ${a} 楼用了 ${t} 分钟。照这样的速度，从 1 楼走到 ${b} 楼要几分钟？`],
      hints: [[`Floor 1 to ${a} is ${a - 1} ${a - 1 === 1 ? 'flight' : 'flights'}: each flight takes ${t} ÷ ${a - 1} = ${f} min.`, `1 楼到 ${a} 楼爬了 ${a - 1} 层：每层 ${t} ÷ ${a - 1} = ${f} 分钟。`], [`Floor 1 to ${b} is ${b - 1} flights.`, `1 楼到 ${b} 楼要爬 ${b - 1} 层。`]],
      explain: [`${b - 1} flights × ${f} = ${(b - 1) * f} minutes.`, `${b - 1} 层 × ${f} 分钟 = ${(b - 1) * f} 分钟。`] });
  },
  // 12 · choice · both sides of a road
  () => {
    const d = ri(2, 5), g = ri(3, 7), L = d * g, ans = 2 * (g + 1);
    return cq({ pts: 4, ...numChoices(ans, [g + 1, 2 * g, 2 * g + 1, ans + 2]), unit: ['trees', '棵'],
      q: [`A road is ${L} m long. Trees are planted on BOTH sides of the road, one every ${d} m, at both ends too. How many trees in all?`, `一条路长 ${L} 米。路的两边都种树，每隔 ${d} 米种一棵，两头都种。一共种几棵？`],
      hints: [[`One side: ${L} ÷ ${d} + 1 = ${g + 1} trees.`, `一边：${L} ÷ ${d} + 1 = ${g + 1} 棵。`], ['There are two sides!', '路有两边！']],
      explain: [`One side has ${g + 1} trees, two sides: ${g + 1} × 2 = ${ans}.`, `一边 ${g + 1} 棵，两边 ${g + 1} × 2 = ${ans} 棵。`], ...ivTool(g, d) });
  },
  // 13 · type-in · trees → road length
  () => {
    const n = ri(4, 10), d = ri(2, 6), ans = (n - 1) * d;
    return cq({ pts: 4, input: true, answer: ans, unit: ['m', '米'],
      q: [`There are ${n} trees in a row along a road, one at each end, ${d} m apart. How long is the road?`, `路边一排有 ${n} 棵树，两头都有，相邻两棵相距 ${d} 米。这条路有多长？`],
      hints: [[`${n} trees have ${n - 1} gaps.`, `${n} 棵树之间有 ${n - 1} 个间隔。`], [`${n - 1} × ${d} = ?`, `${n - 1} × ${d} = ?`]],
      explain: [`${n - 1} gaps × ${d} m = ${ans} m.`, `${n - 1} 个间隔 × ${d} 米 = ${ans} 米。`], ...ivTool(n - 1, d) });
  },
  // 14 · choice · chimes, the other way round
  () => {
    const g = ri(1, 3), a = ri(3, 6), m = ri(a + 1, 12), t1 = (a - 1) * g, t2 = m * g;
    return cq({ pts: 4, ...numChoices(m + 1, [m, m + 2, t2, a * 2]),
      q: [`A clock chimes ${a} times in ${t1} seconds. How many times does it chime in ${t2} seconds?`, `一个钟敲 ${a} 下用 ${t1} 秒。${t2} 秒能敲几下？`],
      hints: [[`Each gap: ${t1} ÷ ${a - 1} = ${g} s.`, `每个间隔：${t1} ÷ ${a - 1} = ${g} 秒。`], [`${t2} s holds ${t2} ÷ ${g} = ${m} gaps. Chimes = gaps + 1.`, `${t2} 秒里有 ${t2} ÷ ${g} = ${m} 个间隔。下数 = 间隔数 + 1。`]],
      explain: [`${m} gaps → ${m} + 1 = ${m + 1} chimes.`, `${m} 个间隔 → ${m} + 1 = ${m + 1} 下。`] });
  },
  // 15 · type-in · how many cuts for pieces of a given length
  () => {
    const a = ri(2, 5), p = ri(3, 8), L = a * p;
    return cq({ pts: 5, input: true, answer: p - 1,
      q: [`A log is ${L} m long. Roo saws it into pieces that are each ${a} m long. How many cuts does Roo make?`, `一根木头长 ${L} 米。袋鼠把它锯成每段 ${a} 米。要锯几次？`],
      hints: [[`Pieces: ${L} ÷ ${a} = ${p}.`, `段数：${L} ÷ ${a} = ${p} 段。`], ['Cuts = pieces − 1.', '次数 = 段数 − 1。']],
      explain: [`${L} ÷ ${a} = ${p} pieces, ${p} − 1 = ${p - 1} cuts.`, `${L} ÷ ${a} = ${p} 段，${p} − 1 = ${p - 1} 次。`], ...ivTool(p, a, 'log') });
  },
  // 16 · choice · trees around a square
  () => {
    const k = ri(3, 6), ans = 4 * (k - 1);
    return cq({ pts: 5, ...numChoices(ans, [4 * k, 4 * k - 2, ans - 1, ans + 2]), unit: ['trees', '棵'],
      q: [`Roo plants trees around a square garden. There is a tree at each corner, and each side has ${k} trees (counting the corners). How many trees in all?`, `袋鼠在正方形花园的四周种树。四个角都有树，每条边上有 ${k} 棵（包括两头的角）。一共有几棵树？`],
      fig: ivSquare(k),
      hints: [[`4 × ${k} counts each corner tree twice!`, `4 × ${k} 把每个角上的树数了两次！`], [`4 × ${k} − 4, or 4 × ${k - 1}.`, `4 × ${k} − 4，或者 4 × ${k - 1}。`]],
      explain: [`4 × ${k} = ${4 * k}, take away the 4 corners counted twice: ${ans}.`, `4 × ${k} = ${4 * k}，减去重复数的 4 个角：${ans} 棵。`] });
  },
  // 17 · type-in · pages from a to b
  () => {
    const a = ri(10, 40), b = a + ri(5, 30), ans = b - a + 1;
    return cq({ pts: 5, input: true, answer: ans, unit: ['pages', '页'],
      q: [`Roo reads a book from page ${a} to page ${b}, reading both of those pages too. How many pages does Roo read?`, `袋鼠从第 ${a} 页读到第 ${b} 页（这两页也读了）。袋鼠一共读了几页？`],
      hints: [[`${b} − ${a} = ${b - a} counts the gaps between the page numbers.`, `${b} − ${a} = ${b - a} 数的是页码之间的间隔。`], ['Both ends count, so add 1.', '两头都算，所以再加 1。']],
      explain: [`${b} − ${a} + 1 = ${ans} pages.`, `${b} − ${a} + 1 = ${ans} 页。`] });
  },
  // 18 · choice · floors trap
  () => {
    const a = ri(3, 5), s = pick([10, 12, 15]), b = ri(a + 1, 8), X = (a - 1) * s, ans = (b - 1) * s;
    return cq({ pts: 5, ...numChoices(ans, [(b * X) % a ? ans + s : b * X / a, b * s, ans - s, X + s]), unit: ['steps', '级'],
      q: [`Mia lives on floor ${a}. From floor 1 she climbs ${X} steps to get home. Roo lives on floor ${b} of the same building. How many steps does Roo climb from floor 1?`, `Mia 住在 ${a} 楼，从 1 楼走到家要爬 ${X} 级台阶。袋鼠住在同一栋楼的 ${b} 楼。袋鼠从 1 楼走到家要爬几级？`],
      hints: [[`Mia climbs ${a - 1} flights, so each flight has ${X} ÷ ${a - 1} = ${s} steps.`, `Mia 爬了 ${a - 1} 层，每层 ${X} ÷ ${a - 1} = ${s} 级。`], [`Roo climbs ${b - 1} flights.`, `袋鼠要爬 ${b - 1} 层。`]],
      explain: [`${b - 1} × ${s} = ${ans} steps.`, `${b - 1} × ${s} = ${ans} 级。`] });
  },
  // 19 · type-in · flowers between trees
  () => {
    const d = ri(2, 5), g = ri(3, 8), f = ri(2, 3), L = d * g;
    return cq({ pts: 5, input: true, answer: g * f, unit: ['flowers', '朵'],
      q: [`Along a ${L} m path there is a tree every ${d} m, at both ends too. Between every two trees that are next to each other, Roo plants ${f} flowers. How many flowers?`, `一条 ${L} 米长的小路上，每隔 ${d} 米有一棵树，两头都有。每相邻两棵树之间，袋鼠种 ${f} 朵花。一共种几朵花？`],
      hints: [[`How many gaps between trees? ${L} ÷ ${d} = ${g}.`, `树之间有几个间隔？${L} ÷ ${d} = ${g} 个。`], [`Each gap gets ${f} flowers.`, `每个间隔种 ${f} 朵。`]],
      explain: [`${g} gaps × ${f} = ${g * f} flowers.`, `${g} 个间隔 × ${f} = ${g * f} 朵。`], ...ivTool(g, d) });
  },
  // 20 · choice · boss: from tree a to tree b
  () => {
    const n = ri(6, 12), d = ri(2, 6), a = ri(1, 3), b = ri(a + 2, n - 1), total = (n - 1) * d, ans = (b - a) * d;
    return cq({ pts: 5, boss: true, ...numChoices(ans, [(b - a + 1) * d, b * d, ans - d, ans + d]), unit: ['m', '米'],
      q: [`Boss question! ${n} trees stand in a row, equally spaced. From the 1st tree to the ${n}th tree is ${total} m. Roo hops from tree number ${a} to tree number ${b}. How far does Roo hop?`,
        `Boss 题！一排有 ${n} 棵树，间隔一样。从第 1 棵到第 ${n} 棵是 ${total} 米。袋鼠从第 ${a} 棵树跳到第 ${b} 棵树，跳了多远？`],
      hints: [[`${n} trees have ${n - 1} gaps: each gap is ${total} ÷ ${n - 1} = ${d} m.`, `${n} 棵树有 ${n - 1} 个间隔：每个间隔 ${total} ÷ ${n - 1} = ${d} 米。`], [`From tree ${a} to tree ${b} there are ${b} − ${a} gaps.`, `第 ${a} 棵到第 ${b} 棵有 ${b} − ${a} 个间隔。`]],
      explain: [`Each gap is ${d} m. ${b - a} gaps × ${d} = ${ans} m.`, `每个间隔 ${d} 米。${b - a} 个间隔 × ${d} = ${ans} 米。`] });
  }
];

registerSeries({
  id: 'intervals', camp: true, breakEvery: 10, perRound: 20, games: ['saw', 'jump'],
  tag: ['Gaps Camp', '间隔营'], name: ['Trees, Logs & Stairs', '植树与间隔'],
  desc: ['Trees on a road, sawing logs, climbing stairs, clock chimes', '植树问题、锯木头、爬楼梯、敲钟'],
  lesson: LESSON_INTERVALS,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_INTERVALS
});
