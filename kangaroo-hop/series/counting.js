// 数数营 — Counting Camp (competition thinking): listing in order, handshakes, outfits (choose one of each), counting routes.
// 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Every answer is found by listing all the possibilities in code, never by a formula alone.

const CT_NAMES = ['Ann', 'Ben', 'Cora', 'Dan', 'Eve', 'Finn', 'Gus', 'Ivy', 'Jack', 'Lily', 'Max', 'Nora'];
const CT_COLORS = [['red', '红', '#d6413f'], ['blue', '蓝', '#3a76b8'], ['green', '绿', '#2f8f6b'], ['yellow', '黄', '#f2b630'], ['purple', '紫', '#8a5cc2']];
const ctPerms = a => a.length <= 1 ? [a] : a.flatMap((x, i) => ctPerms(a.filter((_, j) => j !== i)).map(p => [x, ...p]));
const ctPairs = n => { const out = []; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) out.push([i, j]); return out; };
const ctList = (a, zh) => a.join(zh ? '、' : ', ');
// a colored clothing picture for a table header (emoji cannot be recolored, so these are drawn)
const CT_WEAR = {
  shirt: 'M12 6 L20 4 Q24 9 28 4 L36 6 L44 16 L37 21 L35 18 L35 44 L13 44 L13 18 L11 21 L4 16 Z',
  shorts: 'M10 8 L38 8 L42 40 L28 40 L24 22 L20 40 L6 40 Z'
};
const ctTag = (c, kind) => `<svg width="34" height="34" viewBox="0 0 48 48" role="img" aria-label="${c[0]} ${kind}"><path d="${CT_WEAR[kind]}" fill="${c[2]}" stroke="#1f2a37" stroke-width="2" stroke-linejoin="round"/></svg>`;

// ---------- pictures ----------
// towns in a row with `ways[k]` roads between town k and town k+1; `direct` roads go straight from the first town to the last, over the top
function ctRoads(ways, direct = 0) {
  const W = 120 + ways.length * 160, xs = Array.from({ length: ways.length + 1 }, (_, i) => 50 + i * 160), y = 120;
  let s = `<svg viewBox="0 0 ${W} 200" width="${Math.min(W, 520)}" style="max-width:100%;height:auto" role="img" aria-label="map of roads">`;
  ways.forEach((w, k) => {
    for (let r = 0; r < w; r++) {
      const bend = (r - (w - 1) / 2) * 34;
      s += `<path d="M${xs[k]} ${y} Q${(xs[k] + xs[k + 1]) / 2} ${y + bend * 1.6} ${xs[k + 1]} ${y}" fill="none" stroke="#c8742c" stroke-width="4"/>`;
    }
  });
  for (let r = 0; r < direct; r++) s += `<path d="M${xs[0]} ${y} Q${(xs[0] + xs[xs.length - 1]) / 2} ${-20 - r * 32} ${xs[xs.length - 1]} ${y}" fill="none" stroke="#3a76b8" stroke-width="4"/>`;
  xs.forEach((x, i) => s += `<circle cx="${x}" cy="${y}" r="22" fill="#fff" stroke="#1f2a37" stroke-width="3"/><text x="${x}" y="${y + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="#1f2a37">${'ABCD'[i]}</text>`);
  return s + '</svg>';
}
// street grid w blocks wide and h blocks tall; start bottom-left, school top-right
function ctStreets(w, h, d = 0, nums = null) {
  const S = 60, W = w * S + 80, H = h * S + 80, X = i => 40 + i * S, Y = j => H - 40 - j * S;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto" role="img" aria-label="street grid">`;
  for (let i = 0; i <= w; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(h)}" stroke="#8b98a8" stroke-width="4"/>`;
  for (let j = 0; j <= h; j++) s += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(w)}" y2="${Y(j)}" stroke="#8b98a8" stroke-width="4"/>`;
  if (nums) for (let i = 0; i <= w; i++) for (let j = 0; j <= h; j++) if (i + j)
    s += `<g class="appear" style="animation-delay:${d + (i + j) * .5}s"><circle cx="${X(i)}" cy="${Y(j)}" r="13" fill="#f2b630"/><text x="${X(i)}" y="${Y(j) + 6}" text-anchor="middle" font-size="16" font-weight="800" fill="#1f2a37">${nums(i, j)}</text></g>`;
  s += `<svg x="${X(0) - 22}" y="${Y(0) - 22}" width="44" height="44" viewBox="0 0 64 64"><use href="#roo"/></svg>`;
  s += `<text x="${X(w)}" y="${Y(h) - 14}" text-anchor="middle" font-size="26">🏫</text>`;
  return s + '</svg>';
}
const ctChoose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };

// ---------- mini-lesson ----------
const ctDot = (txt, d, c = '#3a76b8') => `<span class="chip appear" style="width:auto;padding:0 12px;font-size:18px;color:${c};animation-delay:${d}s">${txt}</span>`;

const LESSON_COUNTING = [
  {
    title: ['Make a list in order', '有顺序地列举'],
    text: ['Cards 1, 2 and 3: how many two-digit numbers can we make? Start with the 1s: 12, 13. Then the 2s: 21, 23. Then the 3s: 31, 32. In order, we never miss one: 6 numbers!',
      '数字卡 1、2、3 能组成几个两位数？先写十位是 1 的：12、13；再写十位是 2 的：21、23；再写十位是 3 的：31、32。按顺序写，一个也不漏：6 个！'],
    art(el) {
      el.innerHTML = [['12', '13'], ['21', '23'], ['31', '32']].map((row, r) =>
        `<div class="chips">${row.map((t, k) => ctDot(t, .3 + r * .9 + k * .4, ['#d6413f', '#3a76b8', '#2f8f6b'][r])).join('')}</div>`).join('')
        + lessonEq('3 × 2 = <span class="hl">6</span>', 3.2);
    }
  },
  {
    title: ['Outfits: one of each', '搭配：每样选一件'],
    text: ['3 shirts and 2 pairs of shorts. Each shirt goes with each pair of shorts: a table shows every outfit. 3 rows × 2 columns = 6 outfits.',
      '3 件上衣、2 条短裤。每件上衣都能配每条短裤，画个表格就能看到所有搭配：3 行 × 2 列 = 6 套。'],
    art(el) {
      const tops = CT_COLORS.slice(0, 3), pants = CT_COLORS.slice(3, 5);
      el.innerHTML = `<table class="lgrid"><tr><th></th>${pants.map(p => `<th>${ctTag(p, 'shorts')}</th>`).join('')}</tr>${tops.map((t, i) =>
        `<tr><th>${ctTag(t, 'shirt')}</th>${pants.map((_, j) => `<td><button class="yes appear" style="animation-delay:${.4 + (i * 2 + j) * .4}s">✓</button></td>`).join('')}</tr>`).join('')}</table>`
        + lessonEq('3 × 2 = <span class="hl">6</span>', 3.2);
    }
  },
  {
    title: ['Handshakes', '握手问题'],
    text: ['4 friends, every two shake hands once. Ann shakes 3 hands, Ben has 2 new ones left, Cora 1 new one, Dan none: 3 + 2 + 1 = 6 handshakes.',
      '4 个好朋友，每两人握一次手。Ann 握 3 次，Ben 还剩 2 次新的，Cora 还剩 1 次，Dan 都握过了：3 + 2 + 1 = 6 次。'],
    art(el) {
      const P = [[60, 40], [200, 40], [200, 160], [60, 160]], nm = ['Ann', 'Ben', 'Cora', 'Dan'], order = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
      el.innerHTML = `<svg viewBox="0 0 260 200" width="280">${order.map(([a, b], k) => `<line class="drawpath" pathLength="1" style="animation-delay:${.4 + k * .6 + (a > 0 ? .5 : 0) + (a > 1 ? .5 : 0)}s" x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="${['#d6413f', '#3a76b8', '#2f8f6b'][a]}" stroke-width="4"/>`).join('')}
        ${P.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="24" fill="#fff" stroke="#c8742c" stroke-width="3"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="800">${nm[i]}</text>`).join('')}</svg>`
        + lessonEq('3 + 2 + 1 = <span class="hl">6</span>', 5);
    }
  },
  {
    title: ['Counting roads', '数路线'],
    text: ['2 roads go from A to B, and 3 roads go from B to C. Each road to B can be followed by each road to C: 2 × 3 = 6 ways from A to C.',
      '从 A 到 B 有 2 条路，从 B 到 C 有 3 条路。每条去 B 的路，后面都能接每条去 C 的路：2 × 3 = 6 种走法。'],
    art(el) {
      el.innerHTML = `<div class="appear" style="animation-delay:.2s">${ctRoads([2, 3])}</div>` + lessonEq('2 × 3 = <span class="hl">6</span>', 1.6);
    }
  },
  {
    title: ['Walking on a street grid', '在街道上走'],
    text: ['Roo only walks right or up. Write at each corner how many ways reach it: along the edges it is 1. Every other corner adds the corner below and the corner to its left.',
      '袋鼠只能往右或往上走。在每个路口写上走到这里有几种走法：最下边和最左边都是 1，其他路口 = 下面的数 + 左边的数。'],
    art(el) {
      el.innerHTML = ctStreets(2, 2, .4, (i, j) => ctChoose(i + j, i)) + lessonEq('3 + 3 = <span class="hl">6</span>', 3);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 counting puzzles. Make a list in order, draw a table, or draw lines. After 10 you play a 60-second game. Ready?',
      '20 道数数题。按顺序列举、画表格、或者画连线。做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- question makers ----------
// outfit table: tops × bottoms, tap ✓ for each outfit
const ctOutfitTool = (tops, bottoms) => ({ tool: 'grid', lab: ['Tap a box to mark each outfit with a ✓. Then count the ✓s.', '点格子，给每一套搭配打 ✓，再数一数。'],
  cfg: { tick: true, rows: tops.map(c => ctTag(c, 'shirt')), cols: bottoms.map(c => ctTag(c, 'shorts')) } });
const ctHandTool = n => ({ tool: 'connect', cfg: { names: shuffle(CT_NAMES).slice(0, n) } });
// two-digit numbers made from the cards, each card used at most once, no leading 0
const ctTwoDigit = cards => { const out = new Set(); cards.forEach((a, i) => cards.forEach((b, j) => { if (i !== j && a) out.add(a * 10 + b); })); return [...out].sort((x, y) => x - y); };
// ways to pay `c` cents with dimes, nickels and pennies, most dimes first
const ctCoins = c => { const out = []; for (let d = Math.floor(c / 10); d >= 0; d--) for (let n = Math.floor((c - 10 * d) / 5); n >= 0; n--) out.push([d, n, c - 10 * d - 5 * n]); return out; };
const ctCoinText = ([d, n, p], zh) => [[d, 'dime', '个 dime'], [n, 'nickel', '个 nickel'], [p, 'penny', '个 penny']].filter(x => x[0])
  .map(([k, en, z]) => zh ? `${k} ${z}` : `${k} ${k > 1 ? (en === 'penny' ? 'pennies' : en + 's') : en}`).join(zh ? ' + ' : ' + ');

const Q_COUNTING = [
  // 1 · type-in · outfits
  () => {
    const s = ri(2, 4), p = ri(2, 3), cols = shuffle(CT_COLORS), tops = cols.slice(0, s), bottoms = shuffle(CT_COLORS).slice(0, p);
    return cq({ pts: 3, input: true, answer: s * p,
      q: [`Roo has ${s} T-shirts (${ctList(tops.map(c => c[0]))}) and ${p} pairs of shorts. An outfit is one T-shirt with one pair of shorts. How many different outfits can Roo make?`,
        `袋鼠有 ${s} 件 T 恤（${ctList(tops.map(c => c[1]), 1)}）和 ${p} 条短裤。一件 T 恤配一条短裤算一套。一共能搭配出几套？`],
      hints: [['Make a table: T-shirts down the side, shorts across the top.', '画个表格：左边写 T 恤，上面写短裤。'], [`Each T-shirt goes with ${p} pairs of shorts.`, `每件 T 恤都能配 ${p} 条短裤。`]],
      explain: [`${s} T-shirts × ${p} shorts = ${s * p} outfits.`, `${s} 件 T 恤 × ${p} 条短裤 = ${s * p} 套。`], ...ctOutfitTool(tops, bottoms) });
  },
  // 2 · choice · handshakes
  () => {
    const n = ri(3, 5), ans = n * (n - 1) / 2;
    return cq({ pts: 3, ...numChoices(ans, [n * (n - 1), n * n, n, ans + 1]),
      q: [`${n} friends meet at the park. Every two of them shake hands once. How many handshakes are there?`, `${n} 个好朋友在公园见面，每两人握一次手。一共握了几次手？`],
      hints: [['Draw a line for each handshake.', '每握一次手就连一条线。'], [`The first friend shakes ${n - 1} hands. The next one has ${n - 2} new handshakes left…`, `第一个人握 ${n - 1} 次，下一个人还剩 ${n - 2} 次新的……`]],
      explain: [`${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ${ans} handshakes.`, `${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ${ans} 次。`], ...ctHandTool(n) });
  },
  // 3 · type-in · two-digit numbers from cards
  () => {
    const cards = pick([0, 1]) ? shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3).sort() : [0, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2)].sort(), all = ctTwoDigit(cards);
    return cq({ pts: 3, input: true, answer: all.length,
      q: [`Roo has 3 number cards: ${ctList(cards)}. Roo puts 2 cards side by side to make a two-digit number. How many different two-digit numbers can Roo make?`,
        `袋鼠有 3 张数字卡：${ctList(cards, 1)}。用其中 2 张并排摆成一个两位数，能摆出几个不同的两位数？`],
      hints: [['Go in order: first all the numbers with the smallest tens digit, then the next…', '按顺序来：先写十位最小的，再写下一个……'], cards[0] === 0 ? ['A two-digit number cannot start with 0!', '两位数的十位不能是 0！'] : ['Each card can be the tens digit, and then 2 cards are left for the ones.', '每张卡都能当十位，剩下 2 张都能当个位。']],
      explain: [`${ctList(all)}: ${all.length} numbers.`, `${ctList(all, 1)}：共 ${all.length} 个。`] });
  },
  // 4 · choice · roads A → B → C
  () => {
    const a = ri(2, 4), b = ri(2, 4), ans = a * b;
    return cq({ pts: 3, ...numChoices(ans, [a + b, ans + 1, ans - 1, a + b + 1]),
      q: [`There are ${a} roads from A to B and ${b} roads from B to C. Roo walks from A to C through B. How many different ways can Roo go?`, `从 A 到 B 有 ${a} 条路，从 B 到 C 有 ${b} 条路。袋鼠经过 B 从 A 走到 C，有几种不同的走法？`],
      fig: ctRoads([a, b]),
      hints: [['Pick one road to B. How many roads can follow it to C?', '先选一条去 B 的路，后面能接几条去 C 的路？'], [`Each of the ${a} roads goes with each of the ${b} roads.`, `${a} 条路的每一条都能接 ${b} 条路中的任意一条。`]],
      explain: [`${a} × ${b} = ${ans} ways.`, `${a} × ${b} = ${ans} 种。`] });
  },
  // 5 · type-in · lunch: three things to choose
  () => {
    const a = ri(2, 3), b = 2, c = ri(2, 3), ans = a * b * c;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`The lunch menu has ${a} kinds of sandwich, ${b} kinds of fruit and ${c} kinds of drink. A lunch is one sandwich, one fruit and one drink. How many different lunches are there?`,
        `午餐菜单上有 ${a} 种三明治、${b} 种水果、${c} 种饮料。一份午餐是一个三明治、一份水果和一杯饮料。一共有几种不同的午餐？`],
      hints: [[`Sandwich with fruit first: ${a} × ${b} = ${a * b}.`, `先配三明治和水果：${a} × ${b} = ${a * b} 种。`], [`Each of those goes with ${c} drinks.`, `每一种再配 ${c} 种饮料。`]],
      explain: [`${a} × ${b} × ${c} = ${ans} lunches.`, `${a} × ${b} × ${c} = ${ans} 种。`] });
  },
  // 6 · choice · lining up 3 kids for a photo
  () => {
    const kids = shuffle(CT_NAMES).slice(0, 3), x = kids[0], rule = pick(['any', 'middle', 'end', 'notFirst']);
    const ok = ctPerms(kids).filter(p => rule === 'any' || (rule === 'middle' ? p[1] === x : rule === 'end' ? p[0] === x || p[2] === x : p[0] !== x)), ans = ok.length;
    const say = { any: ['', ''], middle: [` ${x} must stand in the middle.`, `${x} 必须站在中间。`], end: [` ${x} must stand at one of the ends.`, `${x} 必须站在两头中的一头。`], notFirst: [` ${x} does not want to be first.`, `${x} 不想站第一个。`] }[rule];
    return cq({ pts: 3, ...numChoices(ans, [3, 6, 9, 2, 4]),
      q: [`${ctList(kids)} stand in a row for a photo.${say[0]} In how many different orders can they stand?`, `${ctList(kids, 1)} 站成一排照相。${say[1]}有几种不同的站法？`],
      hints: [['List them in order: who can be first? Then who can be second?', '按顺序列：谁能站第一个？然后谁能站第二个？'], ['Try it: swap the names in the hands-on box and write down each order.', '在动手区交换名字，把每种站法都记下来。']],
      explain: [`${ok.map(p => p.join('-')).join(', ')}: ${ans} orders.`, `${ok.map(p => p.join('-')).join('，')}：共 ${ans} 种。`],
      tool: 'order', cfg: { items: [...kids], places: [['1st', '第 1'], ['2nd', '第 2'], ['3rd', '第 3']] }, lab: ['Tap two names to swap them. Find every order that works.', '点两个名字交换位置，找出所有符合要求的站法。'] });
  },
  // 7 · type-in · games in a league
  () => {
    const n = ri(4, 6), ans = n * (n - 1) / 2;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${n} teams play in a soccer league. Every two teams play each other once. How many games are played?`, `${n} 支球队踢联赛，每两支球队之间比赛一场。一共比赛几场？`],
      hints: [['This is just like handshakes: one line for each game.', '这和握手问题一样：每场比赛连一条线。'], [`${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ?`, `${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ?`]],
      explain: [`${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ${ans} games.`, `${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ${ans} 场。`],
      tool: 'connect', cfg: { names: Array.from({ length: n }, (_, i) => 'T' + (i + 1)) } });
  },
  // 8 · choice · two-digit numbers whose digits add up to s
  () => {
    const s = ri(3, 9), list = []; for (let v = 10; v <= 99; v++) if (Math.floor(v / 10) + v % 10 === s) list.push(v);
    return cq({ pts: 4, ...numChoices(list.length, [s + 1, s - 1, 2 * s, 10]),
      q: [`How many two-digit numbers have digits that add up to ${s}? (For example, ${list[1]}: ${Math.floor(list[1] / 10)} + ${list[1] % 10} = ${s}.)`, `有几个两位数，两个数字加起来等于 ${s}？（例如 ${list[1]}：${Math.floor(list[1] / 10)} + ${list[1] % 10} = ${s}。）`],
      hints: [['Start with tens digit 1, then 2, then 3…', '十位从 1 开始，再试 2、3……'], [`The tens digit can be 1 up to ${s}. Don't forget ${s}0!`, `十位可以是 1 到 ${s}。别忘了 ${s}0！`]],
      explain: [`${ctList(list)}: ${list.length} numbers.`, `${ctList(list, 1)}：共 ${list.length} 个。`] });
  },
  // 9 · type-in · ways to pay with coins
  () => {
    const c = pick([10, 15, 20]), ways = ctCoins(c);
    return cq({ pts: 4, input: true, answer: ways.length,
      q: [`Roo pays exactly ${c} cents using dimes (10¢), nickels (5¢) and pennies (1¢). Roo does not have to use every kind. How many different ways can Roo pay?`,
        `袋鼠要正好付 ${c} 美分，可以用 dime（10 分）、nickel（5 分）和 penny（1 分），不一定每种都用。有几种不同的付法？`],
      hints: [['Start with as many dimes as you can. Then use one fewer dime…', '先用最多的 dime，再少用一个 dime……'], ['For each number of dimes, try every number of nickels. Pennies fill up the rest.', '每种 dime 的个数，再试每种 nickel 的个数，剩下的用 penny 补。']],
      explain: [`${ways.map(w => ctCoinText(w)).join('; ')}. That is ${ways.length} ways.`, `${ways.map(w => ctCoinText(w, 1)).join('；')}。共 ${ways.length} 种。`] });
  },
  // 10 · choice · outfits backwards
  () => {
    const p = ri(2, 4), s = ri(2, 5), tot = s * p;
    return cq({ pts: 4, ...numChoices(s, [tot - p, tot + p, p, s + 1]),
      q: [`Mia has ${p} skirts and some T-shirts. She can make exactly ${tot} different outfits (one T-shirt with one skirt). How many T-shirts does Mia have?`, `Mia 有 ${p} 条裙子和一些 T 恤。一件 T 恤配一条裙子，正好能搭配出 ${tot} 套。Mia 有几件 T 恤？`],
      hints: [[`Each T-shirt makes ${p} outfits.`, `每件 T 恤能搭出 ${p} 套。`], [`? × ${p} = ${tot}`, `? × ${p} = ${tot}`]],
      explain: [`${s} × ${p} = ${tot}, so Mia has ${s} T-shirts.`, `${s} × ${p} = ${tot}，所以有 ${s} 件 T 恤。`] });
  },
  // 11 · type-in · every kid gives every other kid a card
  () => {
    const n = ri(3, 6), ans = n * (n - 1);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${n} friends give Valentine cards. Each friend gives one card to every other friend. How many cards are given in all?`, `${n} 个好朋友互送贺卡，每人给其他每个人各送一张。一共送了多少张贺卡？`],
      hints: [[`Each friend gives ${n - 1} cards.`, `每人送 ${n - 1} 张。`], ['Careful: this is not like handshakes. Ann → Ben and Ben → Ann are 2 different cards!', '小心：这和握手不一样。Ann 送 Ben 和 Ben 送 Ann 是 2 张卡！']],
      explain: [`${n} friends × ${n - 1} cards each = ${ans} cards.`, `${n} 人 × 每人 ${n - 1} 张 = ${ans} 张。`] });
  },
  // 12 · choice · striped flags
  () => {
    const [k, rule] = pick([[3, 'diff'], [3, 'next'], [2, 'next'], [4, 'diff']]), cols = CT_COLORS.slice(0, k), F = [];
    for (let a = 0; a < k; a++) for (let b = 0; b < k; b++) for (let c = 0; c < k; c++)
      if (rule === 'diff' ? a !== b && b !== c && a !== c : a !== b && b !== c) F.push([a, b, c]);
    const ans = F.length;
    return cq({ pts: 4, ...numChoices(ans, [k * k * k, k * 3, k, ans === 6 ? 12 : 6]),
      q: [`Roo colors a flag with 3 stripes, using ${ctList(cols.map(c => c[0]))}. ${rule === 'diff' ? 'All 3 stripes must be different colors.' : 'Stripes that touch must be different colors (the top and bottom stripe may match).'} How many different flags can Roo make?`,
        `袋鼠给一面有 3 条横纹的旗子涂色，可用 ${ctList(cols.map(c => c[1]), 1)}。${rule === 'diff' ? '3 条横纹颜色都不一样。' : '挨着的两条颜色不能一样（最上和最下可以一样）。'}能涂出几种不同的旗子？`],
      hints: [[`How many colors can the top stripe be? Then the middle one?`, '最上面一条有几种选法？中间那条呢？'], [rule === 'diff' ? `Top: ${k}, middle: ${k - 1}, bottom: ${k - 2}.` : `Top: ${k}, middle: ${k - 1}, bottom: ${k - 1} (anything but the middle color).`,
        rule === 'diff' ? `上：${k} 种，中：${k - 1} 种，下：${k - 2} 种。` : `上：${k} 种，中：${k - 1} 种，下：${k - 1} 种（只要和中间不一样）。`]],
      explain: [rule === 'diff' ? `${k} × ${k - 1} × ${k - 2} = ${ans} flags.` : `${k} × ${k - 1} × ${k - 1} = ${ans} flags.`, rule === 'diff' ? `${k} × ${k - 1} × ${k - 2} = ${ans} 种。` : `${k} × ${k - 1} × ${k - 1} = ${ans} 种。`] });
  },
  // 13 · type-in · routes on a street grid
  () => {
    const [w, h] = pick([[2, 1], [3, 1], [2, 2], [3, 2], [1, 3]]), ans = ctChoose(w + h, w);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Roo walks to school along the streets. Roo only walks right (→) or up (↑). How many different shortest ways are there?`, `袋鼠沿着街道走去学校，只能往右（→）或往上（↑）走。一共有几种不同的走法？`],
      fig: ctStreets(w, h),
      data: { w, h },
      hints: [['Write a number at each corner: how many ways reach it?', '在每个路口写上：走到这里有几种走法？'], ['Corners on the bottom edge and the left edge get 1. Every other corner = the number below + the number on the left.', '最下边和最左边的路口都是 1，其他路口 = 下面的数 + 左边的数。']],
      explain: [`Filling in the corners, the school gets ${ans}.`, `把每个路口的数填好，学校那里是 ${ans}。`] });
  },
  // 14 · choice · two dice
  () => {
    const s = ri(4, 10), ways = []; for (let r = 1; r <= 6; r++) { const b = s - r; if (b >= 1 && b <= 6) ways.push([r, b]); }
    return cq({ pts: 4, ...numChoices(ways.length, [ways.length + 1, ways.length - 1, Math.floor(s / 2), 6]),
      q: [`Roo rolls a red die and a blue die. In how many different ways can the two dice add up to ${s}? (Red 1 and blue 3 is different from red 3 and blue 1.)`, `袋鼠掷一个红骰子和一个蓝骰子。两个点数加起来等于 ${s}，有几种不同的情况？（红 1 蓝 3 和红 3 蓝 1 算两种。）`],
      hints: [['List the red die from 1 to 6. What must the blue die be?', '红骰子从 1 列到 6，蓝骰子必须是几？'], ['A die only goes from 1 to 6. Cross out the ones that do not work.', '骰子只有 1 到 6 点，不行的划掉。']],
      explain: [`${ways.map(([r, b]) => `${r}+${b}`).join(', ')}: ${ways.length} ways.`, `${ways.map(([r, b]) => `${r}+${b}`).join('、')}：共 ${ways.length} 种。`] });
  },
  // 15 · type-in · counting pages from a to b
  () => {
    const a = ri(5, 30), b = a + ri(8, 25), ans = b - a + 1;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Roo reads a book from page ${a} to page ${b}, including both of those pages. How many pages does Roo read?`, `袋鼠读一本书，从第 ${a} 页读到第 ${b} 页（这两页都读了）。一共读了几页？`],
      hints: [[`Is it ${b} − ${a} = ${b - a}? Try a small one: pages 3 to 5 are 3, 4, 5. That is 3 pages, not 2!`, `是 ${b} − ${a} = ${b - a} 吗？试试小的：第 3 页到第 5 页是 3、4、5，是 3 页，不是 2 页！`], ['Subtract, then add 1 for the first page.', '先相减，再加上第一页那 1 页。']],
      explain: [`${b} − ${a} + 1 = ${ans} pages.`, `${b} − ${a} + 1 = ${ans} 页。`] });
  },
  // 16 · choice · handshakes backwards
  () => {
    const n = ri(4, 6), hs = n * (n - 1) / 2;
    return cq({ pts: 4, ...numChoices(n, [n + 1, n - 1, hs / 2 | 0, n + 2]),
      q: [`At a party, every two kids shake hands once. There are ${hs} handshakes in all. How many kids are at the party?`, `聚会上每两个小朋友握一次手，一共握了 ${hs} 次。聚会上有几个小朋友？`],
      hints: [['Try a number of kids and count the handshakes: 3 kids make 3 handshakes, 4 kids make 6…', '试一试：3 个人握 3 次，4 个人握 6 次……'], ['Each new kid shakes hands with everyone already there.', '每来一个新人，就和已经在的每个人各握一次。']],
      explain: [`${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ${hs}, so there are ${n} kids.`, `${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(' + ')} = ${hs}，所以有 ${n} 个小朋友。`] });
  },
  // 17 · type-in · ice cream: cone and two different scoops
  () => {
    const cones = ri(2, 3), fl = ri(3, 5), pairs = fl * (fl - 1) / 2, ans = cones * pairs;
    return cq({ pts: 5, input: true, answer: ans,
      q: [`An ice cream shop has ${cones} kinds of cone and ${fl} flavors. Roo picks one cone and 2 different flavors (the order of the scoops does not matter). How many different ice creams can Roo get?`,
        `冰淇淋店有 ${cones} 种蛋筒、${fl} 种口味。袋鼠选一种蛋筒和 2 种不同的口味（两个球不分先后）。能买到几种不同的冰淇淋？`],
      hints: [[`First count the pairs of flavors. It is like handshakes between ${fl} flavors: ${pairs}.`, `先数口味的两两搭配，就像 ${fl} 种口味互相握手：${pairs} 种。`], [`Each pair goes with ${cones} cones.`, `每种搭配再配 ${cones} 种蛋筒。`]],
      explain: [`${pairs} flavor pairs × ${cones} cones = ${ans}.`, `${pairs} 种口味搭配 × ${cones} 种蛋筒 = ${ans} 种。`] });
  },
  // 18 · choice · three-digit numbers with a digit sum
  () => {
    const s = ri(2, 4), list = []; for (let v = 100; v <= 999; v++) if (String(v).split('').reduce((t, d) => t + +d, 0) === s) list.push(v);
    return cq({ pts: 5, ...numChoices(list.length, [s, s + 1, list.length - 1, list.length + 2]),
      q: [`How many three-digit numbers have digits that add up to ${s}? (For example, ${list[list.length - 1]}.)`, `有几个三位数，三个数字加起来等于 ${s}？（例如 ${list[list.length - 1]}。）`],
      hints: [['Sort them by the hundreds digit: 1, then 2, …', '按百位分类：百位是 1 的，百位是 2 的……'], ['Remember that 0 can be in the tens or ones place.', '别忘了十位和个位可以是 0。']],
      explain: [`${ctList(list)}: ${list.length} numbers.`, `${ctList(list, 1)}：共 ${list.length} 个。`] });
  },
  // 19 · type-in · roads through B plus straight roads
  () => {
    const a = ri(2, 3), b = ri(2, 4), d = ri(1, 2), ans = a * b + d;
    return cq({ pts: 5, input: true, answer: ans,
      q: [`There are ${a} roads from A to B, ${b} roads from B to C, and ${d} road${d > 1 ? 's' : ''} straight from A to C (blue). How many different ways can Roo go from A to C?`,
        `从 A 到 B 有 ${a} 条路，从 B 到 C 有 ${b} 条路，还有 ${d} 条（蓝色）从 A 直接到 C。袋鼠从 A 到 C 有几种不同的走法？`],
      fig: ctRoads([a, b], d),
      hints: [[`Through B: ${a} × ${b} = ${a * b} ways.`, `经过 B：${a} × ${b} = ${a * b} 种。`], [`Don't forget the ${d} straight road${d > 1 ? 's' : ''}!`, `别忘了直达的 ${d} 条路！`]],
      explain: [`${a} × ${b} + ${d} = ${ans} ways.`, `${a} × ${b} + ${d} = ${ans} 种。`] });
  },
  // 20 · choice · boss: top and shorts never the same color
  () => {
    const k = ri(3, 4), cols = CT_COLORS.slice(0, k), ans = k * k - k;
    return cq({ pts: 5, boss: true, ...numChoices(ans, [k * k, k, 2 * k, k * k - 1]),
      q: [`Boss question! Roo has ${k} T-shirts and ${k} pairs of shorts, in the same ${k} colors (${ctList(cols.map(c => c[0]))}). Roo never wears a T-shirt and shorts of the same color. How many different outfits can Roo wear?`,
        `Boss 题！袋鼠有 ${k} 件 T 恤和 ${k} 条短裤，颜色都是这 ${k} 种（${ctList(cols.map(c => c[1]), 1)}）。袋鼠从不穿同色的 T 恤和短裤。能穿出几套不同的搭配？`],
      hints: [[`Without the rule: ${k} × ${k} = ${k * k}. Which outfits break the rule?`, `没有要求时：${k} × ${k} = ${k * k} 套。哪些搭配不行？`], ['Make the table and leave the same-color boxes empty.', '画表格，同色的格子空着不打 ✓。']],
      explain: [`${k} × ${k} = ${k * k}, minus the ${k} same-color outfits: ${k * k} − ${k} = ${ans}.`, `${k} × ${k} = ${k * k}，去掉 ${k} 套同色的：${k * k} − ${k} = ${ans} 套。`], ...ctOutfitTool(cols, cols) });
  }
];

registerSeries({
  id: 'counting', camp: true, breakEvery: 10, perRound: 20, games: ['coins', 'jump'],
  tag: ['Thinking Camp · Counting', '竞赛思维 · 数数营'], name: ['Count Them All', '数数小能手'],
  desc: ['Listing in order, handshakes, outfits, routes', '有序列举、握手问题、搭配、路线条数'],
  lesson: LESSON_COUNTING,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_COUNTING
});
