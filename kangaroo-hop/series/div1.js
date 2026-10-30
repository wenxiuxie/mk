// 除法营 1：平均分与分组 — Division Camp 1. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Two meanings of ÷: sharing fairly (how many in each?) and making groups (how many groups?); arrays; hopping back on a number line.
// Every slot is a list of two question kinds, and one is picked each round, so the pool is 40 kinds with new numbers every time.

// ---------- pictures ----------
// g circled groups with s items in each (d = pop-in delay, null draws it still)
const d1Groups = (g, s, icon = 'cookie', d = null) => `<div class="gbags" style="max-width:520px">${Array.from({ length: g }, (_, k) =>
  `<span class="gbag${d === null ? '' : ' appear'}" style="${d === null ? '' : `animation-delay:${d + k * .45}s`}"><span class="pc">${item(icon, 'sm').repeat(s)}</span></span>`).join('')}</div>`;
// k plates; items arrive one round at a time, like dealing cards
const d1Deal = (k, each, icon, d) => `<div class="plates" style="width:100%;max-width:440px">${Array.from({ length: k }, (_, p) =>
  `<span class="plate"><span class="pc">${Array.from({ length: each }, (_, r) => `<span class="appear" style="animation-delay:${d + r * .7 + p * .15}s">${item(icon, 'sm')}</span>`).join('')}</span></span>`).join('')}</div>`;
const d1Pile = (n, icon, d = 0) => `<div class="pile appear" style="animation-delay:${d}s;max-width:440px">${item(icon, 'sm').repeat(n)}</div>`;
const d1Val = w => Function('return ' + w.replace(/×/g, '*').replace(/−/g, '-').replace(/÷/g, '/'))();
const d1Share = (items, plates, icon = 'cookie') => ({ tool: 'share', cfg: { items, plates, icon } });
const d1Grp = (items, size, icon = 'cookie') => ({ tool: 'groups', cfg: { items, size, icon } });

const LESSON_DIV1 = [
  {
    title: ['Share it fairly', '平均分：每份一样多'],
    text: ['12 cookies for 3 joeys. Give one to each joey, again and again, until the cookies are gone. Each joey gets 4. We write 12 ÷ 3 = 4, "12 divided by 3 is 4".',
      '12 块饼干分给 3 只小袋鼠。每只发一块，一轮一轮地发，直到发完。每只分到 4 块。写成 12 ÷ 3 = 4，读作“12 除以 3 等于 4”。'],
    art(el) {
      el.innerHTML = d1Deal(3, 4, 'cookie', .3) + lessonEq('12 ÷ 3 = <span class="hl">4</span>', 3.4);
    }
  },
  {
    title: ['Make groups', '包含分：能分几组'],
    text: ['12 cookies again, but now 4 go in each bag. Circle 4, then 4 more, then 4 more: 3 bags. This is also division: 12 ÷ 4 = 3.',
      '还是 12 块饼干，这次每袋装 4 块。圈 4 块，再圈 4 块，再圈 4 块：能装 3 袋。这也是除法：12 ÷ 4 = 3。'],
    art(el) {
      el.innerHTML = d1Groups(3, 4, 'cookie', .3) + lessonEq('12 ÷ 4 = <span class="hl">3</span>', 2);
    }
  },
  {
    title: ['Two questions, one sign', '两种问法，都用 ÷'],
    text: ['"How many in each?" (we know how many groups) and "How many groups?" (we know how many in each) are both division. 12 ÷ 3 = 4 and 12 ÷ 4 = 3.',
      '“每份几个？”（知道分成几份）和“能分几份？”（知道每份几个）都用除法。12 ÷ 3 = 4，12 ÷ 4 = 3。'],
    art(el) {
      el.innerHTML = `<div class="chips" style="gap:18px;align-items:stretch">
        <div class="appear" style="animation-delay:.3s;width:270px">${d1Groups(3, 4, 'cookie')}<p class="big" style="text-align:center;margin:6px 0 0">${T('Know 3 groups → 4 in each', '知道分 3 份 → 每份 4 个')}</p></div>
        <div class="appear" style="animation-delay:1.3s;width:270px">${d1Groups(3, 4, 'berry')}<p class="big" style="text-align:center;margin:6px 0 0">${T('Know 4 in each → 3 groups', '知道每份 4 个 → 分 3 份')}</p></div></div>`
        + lessonEq('12 ÷ 3 = 4　12 ÷ 4 = 3', 2.4);
    }
  },
  {
    title: ['Arrays show division', '方阵里的除法'],
    text: ['15 stars in 3 equal rows: each row has 5, so 15 ÷ 3 = 5. Look at the columns: 5 columns of 3, so 15 ÷ 5 = 3.',
      '15 颗星排成一样长的 3 行：每行 5 颗，15 ÷ 3 = 5。竖着看：5 列，每列 3 颗，15 ÷ 5 = 3。'],
    art(el) {
      el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(5,26px);gap:5px">${Array.from({ length: 15 }, (_, i) =>
        `<span class="appear" style="animation-delay:${.3 + Math.floor(i / 5) * .5}s">${item('star')}</span>`).join('')}</div>`
        + lessonEq('15 ÷ 3 = <span class="hl">5</span>', 2) + lessonEq('15 ÷ 5 = <span class="hl">3</span>', 3);
    }
  },
  {
    title: ['Hop back to zero', '往回跳到 0'],
    text: ['20 ÷ 5: start at 20 and hop back 5 each time. 20, 15, 10, 5, 0. That is 4 hops, so 20 ÷ 5 = 4.',
      '20 ÷ 5：从 20 出发，每次往回跳 5。20、15、10、5、0，一共跳了 4 下，所以 20 ÷ 5 = 4。'],
    art(el) {
      el.innerHTML = lessonLine(0, 20, [[20, 15, .4], [15, 10, 1.1], [10, 5, 1.8], [5, 0, 2.5]], 5)
        + lessonEq('20 − 5 − 5 − 5 − 5 = 0', 3.4) + lessonEq('20 ÷ 5 = <span class="hl">4</span>', 4.2);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions about sharing and grouping. Ask yourself: do I know how many groups, or how many in each? After 10 you play a 60-second game. Ready?',
      '20 道平均分和分组的题。先问自己：我知道分几份，还是知道每份几个？做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const Q_DIV1 = [
  // 1 · type-in
  [
    () => {   // share cookies on plates
      const k = ri(2, 4), e = ri(2, 5), n = k * e;
      return cq({ pts: 3, input: true, answer: e,
        q: [`Roo shares ${n} cookies fairly on ${k} plates. How many cookies go on each plate?`, `袋鼠把 ${n} 块饼干平均放到 ${k} 个盘子里。每个盘子放几块？`],
        hints: [['Give one cookie to each plate, again and again.', '每个盘子放一块，一轮一轮地放。'], [`How many rounds until all ${n} are used?`, `放几轮能把 ${n} 块放完？`]],
        explain: [`${n} ÷ ${k} = ${e}. Each plate gets ${e} cookies.`, `${n} ÷ ${k} = ${e}，每个盘子 ${e} 块。`], ...d1Share(n, k) });
    },
    () => {   // share stickers among friends
      const k = ri(2, 5), e = ri(2, 4), n = k * e;
      return cq({ pts: 3, input: true, answer: e,
        q: [`${n} stickers are shared equally by ${k} friends. How many stickers does each friend get?`, `${n} 张贴纸平均分给 ${k} 个好朋友。每人分到几张？`],
        hints: [['Deal them out: one for each friend, then again.', '像发牌一样：每人一张，再每人一张……'], [`${k} × ? = ${n}`, `${k} × ? = ${n}`]],
        explain: [`${n} ÷ ${k} = ${e}, because ${k} × ${e} = ${n}.`, `${n} ÷ ${k} = ${e}，因为 ${k} × ${e} = ${n}。`], ...d1Share(n, k, 'sticker') });
    }
  ],
  // 2 · choice
  [
    () => {   // egg boxes
      const k = ri(2, 5), b = ri(2, 5), n = k * b;
      return cq({ pts: 3, ...numChoices(b, [k, n - k, b + 1, b - 1]),
        q: [`The farmer has ${n} eggs. Each box holds ${k} eggs. How many boxes can she fill?`, `农场主有 ${n} 个鸡蛋，每盒装 ${k} 个。能装满几盒？`],
        hints: [[`Circle ${k} eggs for one box.`, `圈出 ${k} 个，就是一盒。`], ['Keep circling until no eggs are left. Count the circles.', '一直圈到没有剩下，数一数圈了几个。']],
        explain: [`${n} ÷ ${k} = ${b}. She fills ${b} boxes.`, `${n} ÷ ${k} = ${b}，能装满 ${b} 盒。`], ...d1Grp(n, k, 'egg') });
    },
    () => {   // which sentence matches the picture
      const g = ri(2, 4), s = ri(2, 5), n = g * s, good = `${n} ÷ ${g} = ${s}`;
      const wrong = shuffle([...new Set([`${n} ÷ ${g} = ${s + 1}`, `${n} ÷ ${g} = ${s - 1}`, `${n} − ${g} = ${s}`, `${n} + ${g} = ${s}`, `${g} × ${s} = ${n + 1}`, `${n} ÷ ${s} = ${g + 1}`])])
        .filter(w => { const [l, r] = w.split(' = '); return d1Val(l) !== +r; }).slice(0, 4);
      const choices = shuffle([good, ...wrong]);
      return cq({ pts: 3, choices, answer: choices.indexOf(good),
        q: [`Roo shared ${n} cookies into ${g} bags (see the picture). Which number sentence is true?`, `袋鼠把 ${n} 块饼干平均装进 ${g} 个袋子（看图）。哪个算式是对的？`],
        fig: d1Groups(g, s),
        hints: [['Count the cookies in one bag.', '数一数一个袋子里有几块。'], ['Check each sentence: is it really true?', '每个算式都算一算，是不是真的相等？']],
        explain: [`${n} cookies in ${g} bags, ${s} in each: ${good}.`, `${n} 块装 ${g} 袋，每袋 ${s} 块：${good}。`] });
    }
  ],
  // 3 · type-in
  [
    () => {   // marbles in bags
      const k = ri(2, 5), b = ri(3, 6), n = k * b;
      return cq({ pts: 3, input: true, answer: b,
        q: [`Roo has ${n} marbles and puts ${k} marbles in each bag. How many bags does Roo need?`, `袋鼠有 ${n} 颗弹珠，每袋装 ${k} 颗。需要几个袋子？`],
        hints: [[`Make groups of ${k}.`, `${k} 颗 ${k} 颗地圈。`], [`Or count by ${k}s up to ${n}: how many counts?`, `或者 ${k} 个 ${k} 个地数到 ${n}，数了几次？`]],
        explain: [`${n} ÷ ${k} = ${b} bags.`, `${n} ÷ ${k} = ${b}，需要 ${b} 个袋子。`], ...d1Grp(n, k, 'marble') });
    },
    () => {   // teams
      const k = ri(3, 6), t = ri(2, 5), n = k * t;
      return cq({ pts: 3, input: true, answer: t,
        q: [`${n} kids play a game in teams of ${k}. How many teams are there?`, `${n} 个小朋友做游戏，每队 ${k} 人。一共有几队？`],
        hints: [[`Each team takes ${k} kids.`, `每一队要 ${k} 个人。`], [`? × ${k} = ${n}`, `? × ${k} = ${n}`]],
        explain: [`${n} ÷ ${k} = ${t} teams.`, `${n} ÷ ${k} = ${t}，一共 ${t} 队。`], ...d1Grp(n, k, 'blue') });
    }
  ],
  // 4 · choice
  [
    () => {   // equal rows
      const r = ri(2, 5), c = ri(3, 6), n = r * c;
      return cq({ pts: 3, ...numChoices(c, [r, n - r, c + 1, c - 1]),
        q: [`Roo puts ${n} stars in ${r} equal rows. How many stars are in each row?`, `袋鼠把 ${n} 颗星星排成一样长的 ${r} 行。每行几颗？`],
        hints: [['Each row has the same number of stars.', '每一行一样多。'], [`${r} × ? = ${n}`, `${r} × ? = ${n}`]],
        explain: [`${n} ÷ ${r} = ${c} stars in each row.`, `${n} ÷ ${r} = ${c}，每行 ${c} 颗。`], tool: 'array', cfg: { rows: r, cols: c, icon: 'star' } });
    },
    () => {   // hop back to zero
      const k = ri(2, 5), h = ri(3, 8), n = k * h;
      return cq({ pts: 3, ...numChoices(h, [k, n - k, h + 1, h - 1]),
        q: [`Roo starts at ${n} and hops back ${k} each time. How many hops to land on 0?`, `袋鼠从 ${n} 出发，每次往回跳 ${k}。跳几下正好到 0？`],
        hints: [[`${n}, ${n - k}, ${n - 2 * k}, … keep going.`, `${n}、${n - k}、${n - 2 * k}……接着跳。`], [`That is ${n} ÷ ${k}.`, `这就是 ${n} ÷ ${k}。`]],
        explain: [`${n} ÷ ${k} = ${h} hops.`, `${n} ÷ ${k} = ${h}，跳 ${h} 下。`], tool: 'hop', cfg: { max: n, lanes: [{ start: n, step: -k }] } });
    }
  ],
  // 5 · type-in
  [
    () => {   // repeated subtraction
      const k = pick([2, 3, 4, 5, 10]), h = ri(2, 5), n = k * h;
      return cq({ pts: 3, input: true, answer: h,
        q: [`${n} ${` − ${k}`.repeat(h)} = 0. So ${n} ÷ ${k} = ?`, `${n} ${` − ${k}`.repeat(h)} = 0。那么 ${n} ÷ ${k} = ?`],
        hints: [[`Count how many times ${k} was taken away.`, `数一数减了几个 ${k}。`], ['Each take-away is one group.', '每减一次就是一组。']],
        explain: [`${k} was taken away ${h} times, so ${n} ÷ ${k} = ${h}.`, `减了 ${h} 次 ${k}，所以 ${n} ÷ ${k} = ${h}。`] });
    },
    () => {   // plain fact ÷2 ÷5 ÷10
      const k = pick([2, 5, 10]), h = ri(2, 10), n = k * h;
      return cq({ pts: 3, input: true, answer: h,
        q: [`${n} ÷ ${k} = ?`, `${n} ÷ ${k} = ?`],
        hints: [[`How many ${k}s make ${n}?`, `几个 ${k} 是 ${n}？`], [`Count by ${k}s to ${n}.`, `${k} 个 ${k} 个地数到 ${n}。`]],
        explain: [`${h} × ${k} = ${n}, so ${n} ÷ ${k} = ${h}.`, `${h} × ${k} = ${n}，所以 ${n} ÷ ${k} = ${h}。`], ...(n <= 40 ? d1Grp(n, k, 'star') : {}) });
    }
  ],
  // 6 · choice
  [
    () => {   // money
      const k = ri(2, 5), e = ri(2, 9), n = k * e;
      return cq({ pts: 4, ...numChoices(e, [n - k, k, e + 1, e - 1]), unit: ['dollars', '美元'],
        q: [`Grandma gives ${n} dollars to her ${k} grandkids. Each gets the same amount. How much does each grandkid get?`, `奶奶把 ${n} 美元平均分给 ${k} 个孙子孙女。每人分到多少？`],
        hints: [['This is sharing fairly.', '这是平均分。'], [`${k} × ? = ${n}`, `${k} × ? = ${n}`]],
        explain: [`${n} ÷ ${k} = ${e} dollars each.`, `${n} ÷ ${k} = ${e}，每人 ${e} 美元。`] });
    },
    () => {   // bikes
      const b = ri(3, 9), n = 2 * b;
      return cq({ pts: 4, ...numChoices(b, [n, n - 2, b + 2, b - 1]),
        q: [`Roo counts ${n} wheels on the bikes at school. Each bike has 2 wheels. How many bikes are there?`, `袋鼠数到学校的自行车一共有 ${n} 个轮子，每辆有 2 个轮子。一共有几辆自行车？`],
        hints: [['Each bike uses 2 wheels: make groups of 2.', '一辆车用 2 个轮子：2 个 2 个地分。'], [`Half of ${n}.`, `就是 ${n} 的一半。`]],
        explain: [`${n} ÷ 2 = ${b} bikes.`, `${n} ÷ 2 = ${b}，有 ${b} 辆。`] });
    }
  ],
  // 7 · type-in
  [
    () => {   // dog legs
      const d = ri(2, 9), n = 4 * d;
      return cq({ pts: 4, input: true, answer: d,
        q: [`At the dog park Roo counts ${n} dog legs. How many dogs are there?`, `在狗狗公园里，袋鼠数到 ${n} 条狗腿。一共有几只狗？`],
        hints: [['A dog has 4 legs.', '一只狗有 4 条腿。'], [`Count by 4s to ${n}: 4, 8, 12, …`, `4 个 4 个地数到 ${n}：4、8、12……`]],
        explain: [`${n} ÷ 4 = ${d} dogs.`, `${n} ÷ 4 = ${d}，有 ${d} 只狗。`], tool: 'hop', cfg: { max: Math.max(20, n), lanes: [{ start: 0, step: 4 }] } });
    },
    () => {   // tricycles
      const t = ri(2, 9), n = 3 * t;
      return cq({ pts: 4, input: true, answer: t,
        q: [`A tricycle has 3 wheels. There are ${n} wheels in the tricycle shop. How many tricycles?`, `一辆三轮车有 3 个轮子。三轮车店里一共有 ${n} 个轮子。有几辆三轮车？`],
        hints: [['Make groups of 3 wheels.', '3 个轮子一组。'], [`? × 3 = ${n}`, `? × 3 = ${n}`]],
        explain: [`${n} ÷ 3 = ${t} tricycles.`, `${n} ÷ 3 = ${t}，有 ${t} 辆。`], ...d1Grp(n, 3, 'taken') });
    }
  ],
  // 8 · choice
  [
    () => {   // which can NOT be the number of rows
      const n = pick([12, 18, 20, 24, 30, 36]), divs = [], nots = [];   // each has at least 4 ways to make rows of 2–10
      for (let r = 2; r <= 10; r++) (n % r ? nots : divs).push(r);
      const odd = pick(nots), { choices, answer } = numChoices(odd, shuffle(divs).slice(0, 4));
      return cq({ pts: 4, choices, answer,
        q: [`Roo lines up ${n} chairs in equal rows with none left over. Which can NOT be the number of rows?`, `袋鼠把 ${n} 把椅子排成一样长的几行，一把也不剩。行数不可能是几？`],
        hints: [[`Try each choice: can ${n} be shared into that many equal rows?`, `一个一个试：${n} 能平均分成这么多行吗？`], ['Use the times tables: is there a fact that makes ' + n + '?', `想口诀：有没有哪句口诀得 ${n}？`]],
        explain: [`${n} ÷ ${odd} leaves some over, so ${odd} rows will not work. ${choices.filter(c => c !== odd).map(c => `${n} ÷ ${c} = ${n / c}`).join(', ')}.`,
          `${n} 平均分成 ${odd} 行会有剩余，所以不可能是 ${odd} 行。${choices.filter(c => c !== odd).map(c => `${n} ÷ ${c} = ${n / c}`).join('，')}。`],
        tool: 'share', cfg: { items: n, plates: 2, adjustable: true, icon: 'seat' }, lab: ['Change the number of rows with − and +, then deal the chairs out.', '用 − 和 + 改变行数，再把椅子发下去试试。'] });
    },
    () => {   // weeks
      const w = ri(2, 8), n = 7 * w;
      return cq({ pts: 4, ...numChoices(w, [w + 1, w - 1, n - 7, 7]),
        q: [`Roo's summer camp lasts ${n} days. How many weeks is that?`, `袋鼠的夏令营一共 ${n} 天。是几个星期？`],
        hints: [['A week has 7 days.', '一个星期有 7 天。'], [`Count by 7s to ${n}.`, `7 个 7 个地数到 ${n}。`]],
        explain: [`${n} ÷ 7 = ${w} weeks.`, `${n} ÷ 7 = ${w}，是 ${w} 个星期。`], tool: 'hop', cfg: { max: Math.max(28, n), lanes: [{ start: 0, step: 7 }] } });
    }
  ],
  // 9 · type-in
  [
    () => {   // half
      const h = ri(5, 20), n = 2 * h;
      return cq({ pts: 4, input: true, answer: h,
        q: [`Roo and Joey share ${n} grapes so they both get the same. How many grapes does each get?`, `袋鼠和小乔平分 ${n} 颗葡萄，两人一样多。每人分到几颗？`],
        hints: [['Two people: find half.', '两个人平分，就是求一半。'], [`? + ? = ${n}, with both numbers the same.`, `? + ? = ${n}，两个数一样。`]],
        explain: [`${n} ÷ 2 = ${h}. Each gets ${h} grapes.`, `${n} ÷ 2 = ${h}，每人 ${h} 颗。`], ...(n <= 30 ? d1Share(n, 2, 'berry') : {}) });
    },
    () => {   // dimes
      const d = ri(2, 9), n = 10 * d;
      return cq({ pts: 4, input: true, answer: d, unit: ['dimes', '个 dime'],
        q: [`A dime is worth 10 cents. Roo wants to swap ${n} cents for dimes. How many dimes does Roo get?`, `一个 dime（一角硬币）值 10 美分。袋鼠想把 ${n} 美分全换成 dime，能换几个？`],
        hints: [['Each dime is a group of 10 cents.', '一个 dime 就是 10 美分一组。'], [`Count by 10s to ${n}.`, `10 个 10 个地数到 ${n}。`]],
        explain: [`${n} ÷ 10 = ${d} dimes.`, `${n} ÷ 10 = ${d}，能换 ${d} 个。`] });
    }
  ],
  // 10 · choice
  [
    () => {   // which way gives each friend the most
      const n = pick([24, 36, 48, 60]), ks = [];
      for (let k = 2; k <= 12; k++) if (n % k === 0) ks.push(k);
      const pickK = shuffle(ks).slice(0, 5).sort((a, b) => a - b), best = pickK[0];
      const order = shuffle(pickK);
      return cq({ pts: 4, choices: order.map(k => TI(`${k} friends`, `${k} 个朋友`)), answer: order.indexOf(best), data: { n, ks: order },
        q: [`Roo shares ${n} stickers fairly with some friends. With how many friends does EACH friend get the most stickers?`, `袋鼠把 ${n} 张贴纸平均分给一些朋友。分给几个朋友时，每人分到的最多？`],
        hints: [['Fewer friends means bigger shares!', '人越少，每人分得越多！'], [`Or work out each one: ${n} ÷ ${pickK[0]}, ${n} ÷ ${pickK[1]}, …`, `也可以算一算：${n} ÷ ${pickK[0]}、${n} ÷ ${pickK[1]}……`]],
        explain: [`${pickK.map(k => `${n} ÷ ${k} = ${n / k}`).join(', ')}. With ${best} friends each gets the most.`, `${pickK.map(k => `${n} ÷ ${k} = ${n / k}`).join('，')}。分给 ${best} 个朋友时每人最多。`] });
    },
    () => {   // which division equals q
      const q = ri(2, 9), b = ri(2, 9), good = `${q * b} ÷ ${b}`, wrong = [];
      while (wrong.length < 4) {
        const y = ri(2, 9), z = ri(2, 9), w = `${y * z} ÷ ${y}`;
        if (z !== q && !wrong.includes(w) && w !== good) wrong.push(w);
      }
      const choices = shuffle([good, ...wrong]);
      return cq({ pts: 4, choices, answer: choices.indexOf(good),
        q: [`Which division has the answer ${q}?`, `哪个除法算式的得数是 ${q}？`],
        hints: [['Turn each one into a times question: ? × divisor = the big number.', '把每个除法变成乘法：? × 除数 = 被除数。'], [`Look for ${q} × something.`, `找一找哪个是 ${q} × 几。`]],
        explain: [`${good} = ${q}, because ${q} × ${b} = ${q * b}.`, `${good} = ${q}，因为 ${q} × ${b} = ${q * b}。`] });
    }
  ],
  // 11 · type-in
  [
    () => {   // pages a day
      const k = pick([3, 4, 5, 10]), d = ri(2, 9), n = k * d;
      return cq({ pts: 4, input: true, answer: d, unit: ['days', '天'],
        q: [`A book has ${n} pages. Mia reads ${k} pages every day. How many days does it take her to finish the book?`, `一本书有 ${n} 页。Mia 每天读 ${k} 页。几天能读完？`],
        hints: [[`Each day is a group of ${k} pages.`, `每天读的 ${k} 页是一组。`], [`${n} ÷ ${k} = ?`, `${n} ÷ ${k} = ?`]],
        explain: [`${n} ÷ ${k} = ${d} days.`, `${n} ÷ ${k} = ${d}，${d} 天读完。`] });
    },
    () => {   // tables
      const k = ri(4, 6), t = ri(3, 8), n = k * t;
      return cq({ pts: 4, input: true, answer: t,
        q: [`At the party ${n} kids sit at tables. Each table seats ${k} kids, and every table is full. How many tables?`, `聚会上 ${n} 个小朋友坐在桌子旁，每张桌子坐 ${k} 人，每张都坐满了。有几张桌子？`],
        hints: [[`One table = a group of ${k}.`, `一张桌子就是 ${k} 人一组。`], [`? × ${k} = ${n}`, `? × ${k} = ${n}`]],
        explain: [`${n} ÷ ${k} = ${t} tables.`, `${n} ÷ ${k} = ${t}，有 ${t} 张桌子。`], ...(n <= 40 ? d1Grp(n, k, 'seat') : {}) });
    }
  ],
  // 12 · choice
  [
    () => {   // equal hops to n: how long is each hop
      const h = ri(2, 5), k = ri(2, 9), n = h * k;
      return cq({ pts: 4, ...numChoices(k, [h, k + 1, k - 1, n - h]),
        q: [`Roo hops from 0 to ${n} in ${h} equal hops. How long is each hop?`, `袋鼠从 0 跳到 ${n}，一共跳了 ${h} 下，每下一样远。每下跳多远？`],
        hints: [[`Share ${n} into ${h} equal parts.`, `把 ${n} 平均分成 ${h} 份。`], [`${h} × ? = ${n}`, `${h} × ? = ${n}`]],
        explain: [`${n} ÷ ${h} = ${k}. Each hop is ${k}.`, `${n} ÷ ${h} = ${k}，每下跳 ${k}。`] });
    },
    () => {   // one more friend comes
      const k = ri(2, 5), m = k < 4 ? ri(1, 2) : 1, n = k * (k + 1) * m, a = n / (k + 1);
      return cq({ pts: 4, ...numChoices(a, [n / k, a - 1, a + 1, k + 1]),
        q: [`Roo shares ${n} grapes fairly with ${k} friends: each friend gets ${n / k}. Then one more friend comes, and they share all ${n} grapes fairly again. How many does each friend get now?`,
          `袋鼠把 ${n} 颗葡萄平均分给 ${k} 个朋友：每人 ${n / k} 颗。又来了 1 个朋友，大家把 ${n} 颗重新平均分。现在每人几颗？`],
        hints: [[`Now there are ${k + 1} friends.`, `现在有 ${k + 1} 个朋友。`], [`${n} ÷ ${k + 1} = ?`, `${n} ÷ ${k + 1} = ?`]],
        explain: [`${n} ÷ ${k + 1} = ${a}. More friends, smaller shares.`, `${n} ÷ ${k + 1} = ${a}。人多了，每人分得少了。`], ...d1Share(n, k + 1, 'berry') });
    }
  ],
  // 13 · type-in
  [
    () => {   // desks in rows
      const r = ri(3, 7), c = ri(4, 8), n = r * c;
      return cq({ pts: 4, input: true, answer: c,
        q: [`A classroom has ${n} desks in ${r} equal rows. How many desks are in each row?`, `教室里有 ${n} 张课桌，排成一样长的 ${r} 行。每行几张？`],
        hints: [[`${r} rows share the ${n} desks fairly.`, `${r} 行平均分 ${n} 张桌子。`], [`${r} × ? = ${n}`, `${r} × ? = ${n}`]],
        explain: [`${n} ÷ ${r} = ${c} desks in each row.`, `${n} ÷ ${r} = ${c}，每行 ${c} 张。`], tool: 'array', cfg: { rows: r, cols: c, icon: 'tile' } });
    },
    () => {   // vases
      const k = ri(6, 9), v = ri(2, 6), n = k * v;
      return cq({ pts: 4, input: true, answer: v,
        q: [`Roo has ${n} flowers and puts ${k} flowers in each vase. How many vases does Roo fill?`, `袋鼠有 ${n} 朵花，每个花瓶插 ${k} 朵。能插满几个花瓶？`],
        hints: [[`Count by ${k}s: ${k}, ${2 * k}, ${3 * k}, …`, `${k} 个 ${k} 个地数：${k}、${2 * k}、${3 * k}……`], [`Stop at ${n}. How many counts?`, `数到 ${n} 停下，数了几次？`]],
        explain: [`${n} ÷ ${k} = ${v} vases.`, `${n} ÷ ${k} = ${v}，插满 ${v} 个花瓶。`], ...d1Grp(n, k, 'flower') });
    }
  ],
  // 14 · choice
  [
    () => {   // which story matches n ÷ k
      const k = ri(3, 6), q = ri(3, 6), n = k * q;
      const story = rnd(2) ? [`${n} apples, ${k} in each bag. How many bags?`, `${n} 个苹果，每袋 ${k} 个，能装几袋？`]
        : [`${n} apples shared by ${k} kids. How many each?`, `${n} 个苹果平均分给 ${k} 个小朋友，每人几个？`], good = TI(...story);
      const wrong = [TI(`${n} apples and ${k} more. How many in all?`, `${n} 个苹果，又来了 ${k} 个，一共几个？`),
        TI(`${k} bags with ${n} apples in each. How many apples?`, `${k} 袋苹果，每袋 ${n} 个，一共几个？`),
        TI(`${n} apples, Roo eats ${k}. How many are left?`, `${n} 个苹果，袋鼠吃了 ${k} 个，还剩几个？`),
        TI(`${n} apples, ${k} are red. How many are green?`, `${n} 个苹果，${k} 个是红的，几个是绿的？`)];
      const choices = shuffle([good, ...wrong]);
      return cq({ pts: 4, choices, answer: choices.indexOf(good), data: { n, k },
        q: [`Which story can you solve with ${n} ÷ ${k}?`, `哪个问题可以用 ${n} ÷ ${k} 来解决？`],
        hints: [['Division means sharing fairly or making equal groups.', '除法就是平均分，或者分成一样多的组。'], ['Adding more, taking away and "in each bag … in all" are not division.', '“又来了”“吃掉了”“一共”都不是除法。']],
        explain: [`Only "${story[0]}" makes equal groups: ${n} ÷ ${k} = ${q}.`, `只有“${story[1]}”是平均分：${n} ÷ ${k} = ${q}。`] });
    },
    () => {   // the other meaning
      const k = ri(2, 6), q = ri(3, 8), n = k * q;
      return cq({ pts: 4, ...numChoices(k, [q, n, k + 1, k - 1]),
        q: [`${n} cookies shared fairly by ${k} kids gives ${q} cookies each. Now Roo puts the ${n} cookies into bags of ${q}. How many bags?`, `${n} 块饼干平均分给 ${k} 个小朋友，每人 ${q} 块。现在袋鼠把这 ${n} 块饼干每 ${q} 块装一袋，能装几袋？`],
        hints: [['It is the same picture looked at the other way.', '还是同一幅图，只是换个方向看。'], [`${n} ÷ ${q} = ?`, `${n} ÷ ${q} = ?`]],
        explain: [`${n} ÷ ${k} = ${q}, so ${n} ÷ ${q} = ${k} bags.`, `${n} ÷ ${k} = ${q}，所以 ${n} ÷ ${q} = ${k} 袋。`], ...d1Grp(n, q) });
    }
  ],
  // 15 · type-in
  [
    () => {   // bags of candy shared out
      let b, c, k;
      do { b = ri(2, 4); c = ri(3, 8); k = ri(2, 6); } while ((b * c) % k || k === b || b * c / k < 2);
      const t = b * c, e = t / k;
      return cq({ pts: 5, input: true, answer: e,
        q: [`Roo has ${b} bags with ${c} candies in each. Roo shares all the candies fairly among ${k} friends. How many candies does each friend get?`, `袋鼠有 ${b} 袋糖，每袋 ${c} 颗。袋鼠把所有糖平均分给 ${k} 个朋友。每人几颗？`],
        hints: [[`First find all the candies: ${b} × ${c} = ${t}.`, `先算一共多少颗：${b} × ${c} = ${t}。`], [`Then share: ${t} ÷ ${k}.`, `再平均分：${t} ÷ ${k}。`]],
        explain: [`${b} × ${c} = ${t}, and ${t} ÷ ${k} = ${e}.`, `${b} × ${c} = ${t}，${t} ÷ ${k} = ${e}。`] });
    },
    () => {   // spider legs
      const s = ri(2, 6), n = 8 * s;
      return cq({ pts: 5, input: true, answer: s,
        q: [`A spider has 8 legs. Roo counts ${n} spider legs in the garden. How many spiders?`, `一只蜘蛛有 8 条腿。袋鼠在花园里数到 ${n} 条蜘蛛腿。有几只蜘蛛？`],
        hints: [['Count by 8s: 8, 16, 24, 32, …', '8 个 8 个地数：8、16、24、32……'], [`? × 8 = ${n}`, `? × 8 = ${n}`]],
        explain: [`${n} ÷ 8 = ${s} spiders.`, `${n} ÷ 8 = ${s}，有 ${s} 只蜘蛛。`], tool: 'hop', cfg: { max: Math.max(24, n), lanes: [{ start: 0, step: 8 }] } });
    }
  ],
  // 16 · choice
  [
    () => {   // shared by both a and b friends
      const [a, b, l] = pick([[2, 3, 6], [2, 5, 10], [3, 4, 12], [4, 5, 20], [3, 5, 15]]);
      const ans = l * ri(1, Math.floor(50 / l)), wrong = new Set();
      while (wrong.size < 4) { const v = pick([a, b]) * ri(2, 12); if (v % l && v <= 60) wrong.add(v); }
      const { choices, answer } = numChoices(ans, [...wrong]);
      return cq({ pts: 5, choices, answer,
        q: [`Roo has some cookies. They can be shared fairly by ${a} kids with none left, and also by ${b} kids with none left. How many cookies could Roo have?`, `袋鼠有一些饼干。平均分给 ${a} 个小朋友正好分完，平均分给 ${b} 个小朋友也正好分完。袋鼠可能有几块饼干？`],
        hints: [[`The number must be in the ${a}s list AND in the ${b}s list.`, `这个数既要在 ${a} 的口诀里，也要在 ${b} 的口诀里。`], [`Check each choice: ÷ ${a} and ÷ ${b}, any left over?`, `每个选项都试试 ÷ ${a} 和 ÷ ${b}，有没有剩余？`]],
        explain: [`${ans} ÷ ${a} = ${ans / a} and ${ans} ÷ ${b} = ${ans / b}, none left. The other numbers do not work for both.`, `${ans} ÷ ${a} = ${ans / a}，${ans} ÷ ${b} = ${ans / b}，都正好分完。其他的数做不到两种都分完。`] });
    },
    () => {   // n ÷ n + n ÷ 1
      const n = ri(3, 9);
      return cq({ pts: 5, ...numChoices(n + 1, [n, 2 * n, 1, 2, n - 1]),
        q: [`What is ${n} ÷ ${n} + ${n} ÷ 1?`, `${n} ÷ ${n} + ${n} ÷ 1 等于多少？`],
        hints: [[`${n} cookies for ${n} kids: each gets 1. So ${n} ÷ ${n} = 1.`, `${n} 块饼干分给 ${n} 个人，每人 1 块：${n} ÷ ${n} = 1。`], [`${n} cookies for 1 kid: that kid gets all ${n}.`, `${n} 块饼干给 1 个人，他全拿走：${n} ÷ 1 = ${n}。`]],
        explain: [`${n} ÷ ${n} = 1 and ${n} ÷ 1 = ${n}, so 1 + ${n} = ${n + 1}.`, `${n} ÷ ${n} = 1，${n} ÷ 1 = ${n}，1 + ${n} = ${n + 1}。`] });
    }
  ],
  // 17 · type-in
  [
    () => {   // ribbon pieces
      const a = ri(2, 5), p = ri(3, 9), L = a * p;
      return cq({ pts: 5, input: true, answer: p,
        q: [`Roo has a ribbon ${L} cm long and cuts it into pieces that are each ${a} cm long. How many pieces does Roo get?`, `袋鼠有一根 ${L} 厘米长的丝带，剪成每段 ${a} 厘米。能剪成几段？`],
        hints: [[`Each piece uses ${a} cm.`, `每段用掉 ${a} 厘米。`], [`How many ${a}s are in ${L}?`, `${L} 里面有几个 ${a}？`]],
        explain: [`${L} ÷ ${a} = ${p} pieces.`, `${L} ÷ ${a} = ${p}，能剪 ${p} 段。`], tool: 'hop', cfg: { max: L, lanes: [{ start: 0, step: a }] } });
    },
    () => {   // lines then teams
      const k = ri(2, 4), m = ri(2, 5), n = k * 2 * m;
      return cq({ pts: 5, input: true, answer: m,
        q: [`${n} kids stand in ${k} equal lines. Then each line splits into 2 equal teams. How many kids are in each team?`, `${n} 个小朋友站成一样长的 ${k} 队。然后每一队再平均分成 2 个小组。每个小组有几人？`],
        hints: [[`First: ${n} ÷ ${k} = ${n / k} kids in each line.`, `先算：${n} ÷ ${k} = ${n / k}，每队 ${n / k} 人。`], [`Then: ${n / k} ÷ 2.`, `再算：${n / k} ÷ 2。`]],
        explain: [`${n} ÷ ${k} = ${n / k}, and ${n / k} ÷ 2 = ${m}.`, `${n} ÷ ${k} = ${n / k}，${n / k} ÷ 2 = ${m}。`] });
    }
  ],
  // 18 · choice
  [
    () => {   // Roo shares with friends AND keeps a share
      const k = ri(2, 4), a = ri(2, 6), n = (k + 1) * a;
      const wrongs = [n % k ? a + 2 : n / k, a + 1, a - 1, k + 1];
      return cq({ pts: 5, ...numChoices(a, wrongs),
        q: [`Roo shares ${n} cupcakes fairly between Roo and ${k} friends. How many cupcakes does each one get?`, `袋鼠把 ${n} 个纸杯蛋糕平均分给自己和 ${k} 个朋友。每人几个？`],
        hints: [["Careful: don't forget Roo!", '小心：别忘了袋鼠自己！'], [`That is ${k + 1} people.`, `一共 ${k + 1} 个人。`]],
        explain: [`Roo + ${k} friends = ${k + 1} people. ${n} ÷ ${k + 1} = ${a}.`, `袋鼠加 ${k} 个朋友 = ${k + 1} 人。${n} ÷ ${k + 1} = ${a}。`], ...d1Share(n, k + 1, 'cupcake') });
    },
    () => {   // missing divisor
      const k = ri(2, 9), q = ri(2, 9), n = k * q;
      return cq({ pts: 5, ...digitChoices(k, [q, k + 1, k - 1]),
        q: [`${n} ÷ ? = ${q}`, `${n} ÷ ? = ${q}`],
        hints: [[`${n} shared into how many groups gives ${q} in each?`, `${n} 平均分成几份，每份是 ${q}？`], [`${q} × ? = ${n}`, `${q} × ? = ${n}`]],
        explain: [`${q} × ${k} = ${n}, so ${n} ÷ ${k} = ${q}.`, `${q} × ${k} = ${n}，所以 ${n} ÷ ${k} = ${q}。`] });
    }
  ],
  // 19 · type-in
  [
    () => {   // eggs → cartons → boxes
      const m = ri(2, 5), n = 12 * m;
      return cq({ pts: 5, input: true, answer: m,
        q: [`The farmer packs ${n} eggs into cartons of 6. Then she puts every 2 cartons into one big box. How many big boxes?`, `农场主把 ${n} 个鸡蛋装进盒子，每盒 6 个。然后每 2 盒装进一个大箱子。要几个大箱子？`],
        hints: [[`Cartons: ${n} ÷ 6 = ${n / 6}.`, `盒子：${n} ÷ 6 = ${n / 6}。`], [`Boxes: ${n / 6} ÷ 2.`, `大箱子：${n / 6} ÷ 2。`]],
        explain: [`${n} ÷ 6 = ${n / 6} cartons, ${n / 6} ÷ 2 = ${m} big boxes.`, `${n} ÷ 6 = ${n / 6} 盒，${n / 6} ÷ 2 = ${m} 个大箱子。`] });
    },
    () => {   // ribbon cut twice
      let p, s, a;
      do { p = ri(2, 4); s = ri(2, 3); a = ri(2, 5); } while (p * s * a > 60);
      const L = p * s * a;
      return cq({ pts: 5, input: true, answer: a, unit: ['cm', '厘米'],
        q: [`Roo cuts a ${L} cm rope into ${p} equal pieces. Then Roo cuts each piece into ${s} equal smaller pieces. How long is each small piece?`, `袋鼠把一根 ${L} 厘米的绳子平均剪成 ${p} 段，再把每段平均剪成 ${s} 小段。每小段多长？`],
        hints: [[`First: ${L} ÷ ${p} = ${L / p} cm.`, `先算：${L} ÷ ${p} = ${L / p} 厘米。`], [`Then: ${L / p} ÷ ${s}.`, `再算：${L / p} ÷ ${s}。`]],
        explain: [`${L} ÷ ${p} = ${L / p}, ${L / p} ÷ ${s} = ${a} cm.`, `${L} ÷ ${p} = ${L / p}，${L / p} ÷ ${s} = ${a} 厘米。`] });
    }
  ],
  // 20 · choice · boss
  [
    () => {   // how many ways to share
      const n = pick([12, 18, 20, 24, 30]), ks = [];
      for (let k = 2; k <= n; k++) if (n % k === 0 && n / k >= 2) ks.push(k);
      const c = ks.length;
      return cq({ pts: 5, boss: true, ...numChoices(c, [c + 1, c - 1, c + 2, c - 2]),
        q: [`Boss question! Roo shares ${n} cookies fairly among some joeys (more than one joey), with none left over. Every joey gets at least 2 cookies. How many different numbers of joeys could there be?`,
          `Boss 题！袋鼠把 ${n} 块饼干平均分给几只小袋鼠（不止一只），正好分完，每只至少 2 块。小袋鼠的只数有几种可能？`],
        hints: [[`Try 2 joeys, 3 joeys, 4 joeys, … Does ${n} share fairly?`, `试试 2 只、3 只、4 只……${n} 能平均分吗？`], ['Stop when each joey would get fewer than 2.', '每只分不到 2 块时就停。']],
        explain: [`${ks.map(k => `${k} joeys get ${n / k}`).join(', ')}. That is ${c} ways.`, `${ks.map(k => `${k} 只每只 ${n / k} 块`).join('，')}。一共 ${c} 种。`],
        tool: 'share', cfg: { items: n, plates: 2, adjustable: true, icon: 'cookie' } });
    },
    () => {   // bags of a vs bags of b
      const [a, b, d, n] = pick([[2, 3, 2, 12], [2, 3, 3, 18], [2, 4, 3, 12], [3, 4, 2, 24], [2, 5, 3, 10], [3, 5, 2, 15], [2, 3, 4, 24]]);
      return cq({ pts: 5, boss: true, ...numChoices(n, [n / 2, n + a * b, d * a * b, n - a]),
        q: [`Boss question! Roo has some marbles. In bags of ${a} they fill ${d} more bags than in bags of ${b}, with none left over either way. How many marbles does Roo have?`,
          `Boss 题！袋鼠有一些弹珠。每 ${a} 颗装一袋，比每 ${b} 颗装一袋多装 ${d} 袋，两种装法都正好装完。袋鼠有几颗弹珠？`],
        hints: [[`Guess and check: try a number in both the ${a}s and the ${b}s lists.`, `猜一猜再验证：找一个既在 ${a} 的口诀里、又在 ${b} 的口诀里的数。`], [`For each guess, work out (guess ÷ ${a}) − (guess ÷ ${b}).`, `每猜一个数，算 (这个数 ÷ ${a}) − (这个数 ÷ ${b})。`]],
        explain: [`${n} ÷ ${a} = ${n / a} bags and ${n} ÷ ${b} = ${n / b} bags. ${n / a} − ${n / b} = ${d}. Roo has ${n} marbles.`, `${n} ÷ ${a} = ${n / a} 袋，${n} ÷ ${b} = ${n / b} 袋，${n / a} − ${n / b} = ${d}。袋鼠有 ${n} 颗。`] });
    }
  ]
];

registerSeries({
  id: 'div1', camp: true, breakEvery: 10, perRound: 20, games: ['share', 'memory'], facts: [2, 5, 10],
  tag: ['Division Camp 1', '除法营 1'], name: ['Sharing & Grouping', '平均分与分组'],
  desc: ['Share fairly, make equal groups, arrays, hop back to zero', '平均分、包含分、方阵、往回跳到 0'],
  lesson: LESSON_DIV1,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_DIV1
});
