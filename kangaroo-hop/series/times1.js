// 乘法营 1：乘法是什么 — Times Camp 1. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Only ×2, ×5 and ×10 facts here (and ×1, ×0); the other tables come in Times Camp 2 and 3.
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.

// ---------- mini-lesson drawings ----------
const tmPlate = (n, d, icon = 'cookie') => `<div class="plate appear" style="animation-delay:${d}s;min-height:84px"><span class="pc">${item(icon, 'sm').repeat(n)}</span><b>${n}</b></div>`;
const tmArray = (r, c, d, icon = 'star') => `<div style="display:grid;grid-template-columns:repeat(${c},26px);gap:4px">${Array.from({ length: r * c }, (_, i) =>
  `<span class="appear" style="animation-delay:${d + Math.floor(i / c) * .35}s">${item(icon)}</span>`).join('')}</div>`;
const tmCount = (step, d) => `<div class="pseq">${Array.from({ length: 10 }, (_, i) => `<div class="pcell appear${(i + 1) * step % 10 === 0 ? ' b0' : ''}" style="animation-delay:${d + i * .12}s;width:44px;min-height:46px"><span class="nv" style="font-size:18px">${(i + 1) * step}</span></div>`).join('')}</div>`;
const tmPics = (items, gap = 18) => `<div class="pics" style="gap:${gap}px">${items.join('')}</div>`;

const LESSON_TIMES1 = [
  {
    title: ['Equal groups', '相同的几组'],
    text: ['3 plates, 4 cookies on each plate. 4 + 4 + 4 = 12. We say "3 groups of 4" and write 3 × 4 = 12. Times means "groups of"!',
      '3 个盘子，每盘 4 块饼干。4 + 4 + 4 = 12。这叫“3 个 4”，写成 3 × 4 = 12。乘号 × 就是“几个几”！'],
    art(el) {
      el.innerHTML = `<div class="plates" style="max-width:420px;width:100%">${[0, 1, 2].map(i => tmPlate(4, .2 + i * .5)).join('')}</div>`
        + lessonEq('4 + 4 + 4 = 12', 1.9) + lessonEq('3 × 4 = <span class="hl">12</span>', 2.8);
    }
  },
  {
    title: ['Arrays: rows and columns', '方阵：行和列'],
    text: ['Stars in 3 rows of 5: 5, 10, 15. So 3 × 5 = 15. Now turn it on its side: 5 rows of 3. Still 15 stars! 3 × 5 = 5 × 3.',
      '星星排成 3 行，每行 5 个：5、10、15。所以 3 × 5 = 15。把它转过来，变成 5 行每行 3 个，还是 15 个！3 × 5 = 5 × 3。'],
    art(el) {
      el.innerHTML = tmPics([tmArray(3, 5, .2), `<div class="appear" style="animation-delay:2.2s">${tmArray(5, 3, 2.2)}</div>`], 40)
        + lessonEq('3 × 5 = <span class="hl">15</span> = 5 × 3', 4.2);
    }
  },
  {
    title: ['Skip count by 2s, 5s and 10s', '2 个 2 个、5 个 5 个、10 个 10 个地数'],
    text: ['Times 2: count by 2s. Times 5: count by 5s, and every answer ends in 0 or 5. Times 10: count by 10s, just put a 0 on the end: 7 × 10 = 70.',
      '乘 2 就是 2 个 2 个地数。乘 5 就是 5 个 5 个地数，答案的个位总是 0 或 5。乘 10 就是 10 个 10 个地数，在后面添个 0：7 × 10 = 70。'],
    art(el) {
      el.innerHTML = tmCount(2, .2) + tmCount(5, 1.6) + tmCount(10, 3);
    }
  },
  {
    title: ['Times 2 is doubling', '乘 2 就是翻一倍'],
    text: ['7 × 2 means 2 groups of 7, or 7 groups of 2. That is 7 + 7 = 14. Doubles you already know make times 2 easy!',
      '7 × 2 就是 2 个 7（也是 7 个 2），也就是 7 + 7 = 14。你会的“双数加法”就是乘 2！'],
    art(el) {
      el.innerHTML = `<div class="plates" style="max-width:300px;width:100%">${[0, 1].map(i => tmPlate(7, .2 + i * .6, 'berry')).join('')}</div>`
        + lessonEq('7 + 7 = 14', 1.6) + lessonEq('7 × 2 = <span class="hl">14</span>', 2.4);
    }
  },
  {
    title: ['Times 1 and times 0', '乘 1 和乘 0'],
    text: ['1 plate with 6 cookies is 6: 1 × 6 = 6. 4 empty plates have no cookies at all: 4 × 0 = 0. Anything times 0 is 0!',
      '1 个盘子放 6 块饼干就是 6：1 × 6 = 6。4 个空盘子一块饼干也没有：4 × 0 = 0。任何数乘 0 都等于 0！'],
    art(el) {
      el.innerHTML = `<div class="plates" style="max-width:180px;width:100%">${tmPlate(6, .2)}</div>` + lessonEq('1 × 6 = <span class="hl">6</span>', 1)
        + `<div class="plates" style="max-width:420px;width:100%">${[0, 1, 2, 3].map(i => tmPlate(0, 1.6 + i * .25)).join('')}</div>` + lessonEq('4 × 0 = <span class="hl">0</span>', 2.8);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions about groups, arrays, coins and skip counting. After 10 you play a 60-second game. Ready?',
      '20 道题：相同的几组、方阵、硬币和跳着数。做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const tmHop = (step, max) => ({ tool: 'hop', cfg: { max, lanes: [{ start: 0, step }] } });
const tmRep = (n, k) => Array(k).fill(n).join('+');   // "3+3+3+3": short enough for a choice button

const Q_TIMES1 = [
  // 1 · type-in · equal groups on plates
  () => {
    const g = ri(2, 5), k = ri(2, 5);
    return cq({ pts: 3, input: true, answer: g * k,
      q: [`There are ${g} plates with ${k} cookies on each plate. How many cookies in all?`, `有 ${g} 个盘子，每盘 ${k} 块饼干。一共有多少块？`],
      hints: [[`That is ${g} groups of ${k}: ${tmRep(k, g).replace(/\+/g, ' + ')}.`, `就是 ${g} 个 ${k}：${tmRep(k, g).replace(/\+/g, ' + ')}。`], [`Tap + on each row to count it.`, '点每行的 + 一行一行地数。']],
      explain: [`${g} × ${k} = ${g * k}.`, `${g} × ${k} = ${g * k}。`],
      tool: 'array', cfg: { rows: g, cols: k, icon: 'cookie' } });
  },
  // 2 · choice · which addition is the same
  () => {
    const g = ri(3, 5), k = pick([2, 3, 4, 5, 6].filter(x => x !== g)), good = tmRep(k, g);
    const wrong = [`${g}+${k}`, tmRep(k, g - 1), tmRep(k, g + 1), tmRep(g, k - 1), tmRep(k + 1, g)].filter(w => Function('return ' + w)() !== g * k);
    const choices = shuffle([good, ...shuffle(wrong).slice(0, 4)]);
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: [`Which addition is the same as ${g} × ${k}?`, `哪个加法算式和 ${g} × ${k} 一样？`],
      hints: [[`${g} × ${k} means ${g} groups of ${k}.`, `${g} × ${k} 表示 ${g} 个 ${k}。`], [`Find the one that adds ${k} exactly ${g} times.`, `找把 ${k} 正好加 ${g} 次的算式。`]],
      explain: [`${g} groups of ${k}: ${good} = ${g * k}.`, `${g} 个 ${k}：${good} = ${g * k}。`] });
  },
  // 3 · type-in · times 2
  () => {
    const n = ri(3, 10);
    return cq({ pts: 3, input: true, answer: 2 * n,
      q: [`${n} kangaroos stand in a line. Each kangaroo has 2 ears. How many ears in all?`, `${n} 只袋鼠站成一排，每只有 2 只耳朵。一共有多少只耳朵？`],
      hints: [[`${n} × 2: count by 2s ${n} times.`, `${n} × 2：2 个 2 个地数 ${n} 次。`], [`Or double it: ${n} + ${n}.`, `或者翻一倍：${n} + ${n}。`]],
      explain: [`${n} × 2 = ${n} + ${n} = ${2 * n}.`, `${n} × 2 = ${n} + ${n} = ${2 * n}。`], ...tmHop(2, 20) });
  },
  // 4 · choice · count an array
  () => {
    const r = ri(2, 5), c = pick([2, 5, 10].filter(x => x * r <= 50)), ans = r * c;
    return cq({ pts: 3, ...numChoices(ans, [r + c, ans + c, ans - c, ans + 1]),
      q: [`Roo puts stickers in ${r} rows with ${c} stickers in each row. How many stickers?`, `袋鼠把贴纸贴成 ${r} 行，每行 ${c} 张。一共多少张？`],
      hints: [[`Count by ${c}s, one row at a time.`, `一行一行地数，${c} 个 ${c} 个地数。`], [`${r} × ${c} = ?`, `${r} × ${c} = ?`]],
      explain: [`${Array.from({ length: r }, (_, i) => (i + 1) * c).join(', ')}. ${r} × ${c} = ${ans}.`, `${Array.from({ length: r }, (_, i) => (i + 1) * c).join('、')}。${r} × ${c} = ${ans}。`],
      tool: 'array', cfg: { rows: r, cols: c, icon: 'sticker' } });
  },
  // 5 · type-in · times 5
  () => {
    const n = ri(3, 10);
    return cq({ pts: 3, input: true, answer: 5 * n,
      q: [`${n} kids each hold up one hand. How many fingers are up?`, `${n} 个小朋友每人举起一只手。一共举起多少根手指？`],
      hints: [['One hand has 5 fingers.', '一只手有 5 根手指。'], [`Count by 5s ${n} times: 5, 10, 15, …`, `5 个 5 个地数 ${n} 次：5、10、15……`]],
      explain: [`${n} × 5 = ${5 * n}.`, `${n} × 5 = ${5 * n}。`], ...tmHop(5, 50) });
  },
  // 6 · choice · turn-around fact
  () => {
    const a = pick([2, 5, 10]), b = ri(3, 9), ans = a * b;
    return cq({ pts: 3, ...numChoices(ans, [a + b, b * 10 + a, ans + b, ans - a]),
      q: [`${a} × ${b} = ${ans}. What is ${b} × ${a}?`, `${a} × ${b} = ${ans}。那么 ${b} × ${a} 是多少？`],
      hints: [['Turn an array on its side. Does the number of things change?', '把方阵转过来，个数变了吗？'], [`${b} groups of ${a} is the same as ${a} groups of ${b}.`, `${b} 个 ${a} 和 ${a} 个 ${b} 一样多。`]],
      explain: [`Order does not matter in times: ${b} × ${a} = ${a} × ${b} = ${ans}.`, `乘法交换两个数，结果不变：${b} × ${a} = ${a} × ${b} = ${ans}。`],
      tool: 'array', cfg: { rows: b, cols: a, icon: 'marble' } });
  },
  // 7 · type-in · times 10
  () => {
    const n = ri(2, 10);
    return cq({ pts: 3, input: true, answer: 10 * n,
      q: [`Roo has ${n} bags with 10 marbles in each bag. How many marbles?`, `袋鼠有 ${n} 袋弹珠，每袋 10 颗。一共多少颗？`],
      hints: [['Count by 10s: 10, 20, 30, …', '10 个 10 个地数：10、20、30……'], [`${n} tens is ${n} with a 0 on the end.`, `${n} 个十，就是 ${n} 后面添一个 0。`]],
      explain: [`${n} × 10 = ${10 * n}.`, `${n} × 10 = ${10 * n}。`], ...tmHop(10, 100) });
  },
  // 8 · choice · not in the count-by-5s list
  () => {
    const ok = shuffle([15, 20, 25, 30, 35, 40, 45, 50, 55, 60]).slice(0, 4);
    let odd; do { odd = ri(11, 59); } while (odd % 5 === 0);
    const { choices, answer } = numChoices(odd, ok);
    return cq({ pts: 3, choices, answer,
      q: ['Roo counts by 5s: 5, 10, 15, 20, … Which number will Roo NOT say?', '袋鼠 5 个 5 个地数：5、10、15、20……下面哪个数袋鼠不会数到？'],
      hints: [['Look at the ones digit of each number.', '看每个数的个位。'], ['Counting by 5s, the ones digit is always 0 or 5.', '5 个 5 个地数，个位总是 0 或 5。']],
      explain: [`${odd} ends in ${odd % 10}, not 0 or 5, so it is not a times-5 answer.`, `${odd} 的个位是 ${odd % 10}，不是 0 或 5，所以数不到。`] });
  },
  // 9 · type-in · missing factor
  () => {
    const f = pick([2, 5, 10]), n = ri(3, 10);
    return cq({ pts: 3, input: true, answer: n,
      q: [`? × ${f} = ${n * f}`, `? × ${f} = ${n * f}`],
      hints: [[`How many ${f}s make ${n * f}? Count by ${f}s.`, `几个 ${f} 是 ${n * f}？${f} 个 ${f} 个地数。`], [`Hop by ${f}s until you land on ${n * f}. Count the hops.`, `${f} 个 ${f} 个地跳到 ${n * f}，数一数跳了几下。`]],
      explain: [`${n} × ${f} = ${n * f}, so the missing number is ${n}.`, `${n} × ${f} = ${n * f}，所以缺的数是 ${n}。`], ...tmHop(f, Math.max(20, n * f)) });
  },
  // 10 · choice · which times sentence matches the addition
  () => {
    const g = ri(3, 5), k = pick([2, 5, 6, 7].filter(x => x !== g)), good = `${g} × ${k}`;
    const wrong = shuffle([...new Set([`${k} × ${k}`, `${g} + ${k}`, `${g - 1} × ${k}`, `${g + 1} × ${k}`, `${g + 2} × ${k}`, `${g} × ${g}`])]   // no repeats, and none equal to the answer
      .filter(w => w !== good && Function('return ' + w.replace('×', '*'))() !== g * k)).slice(0, 4);
    const choices = shuffle([good, ...wrong]);
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: [`Which is the same as ${tmRep(k, g).replace(/\+/g, ' + ')}?`, `哪个和 ${tmRep(k, g).replace(/\+/g, ' + ')} 一样？`],
      hints: [[`How many ${k}s are added?`, `一共加了几个 ${k}？`], [`${g} groups of ${k}.`, `${g} 个 ${k}。`]],
      explain: [`${k} is added ${g} times: ${good} = ${g * k}.`, `${k} 加了 ${g} 次：${good} = ${g * k}。`] });
  },
  // 11 · type-in · covered array
  () => {
    const r = ri(3, 5), c = pick([5, 10].filter(x => x * r <= 50)), cover = [];
    for (let i = 0; i < r * c; i++) if (Math.floor(i / c) >= 1 && i % c >= 2) cover.push(i);
    return cq({ pts: 4, input: true, answer: r * c,
      q: [`A box of chocolates has ${r} full rows. Roo's paw covers part of it. How many chocolates are in the whole box?`, `一盒巧克力有 ${r} 整行。袋鼠的爪子挡住了一部分。整盒有多少块？`],
      hints: [['Look at the top row: how many in each row?', '看最上面一行：每行有几块？'], [`Every row has ${c}. ${r} rows: ${r} × ${c}.`, `每行都是 ${c} 块，${r} 行：${r} × ${c}。`]],
      explain: [`Each row has ${c}, and there are ${r} rows: ${r} × ${c} = ${r * c}.`, `每行 ${c} 块，有 ${r} 行：${r} × ${c} = ${r * c}。`],
      tool: 'array', cfg: { rows: r, cols: c, icon: 'cookie', cover } });
  },
  // 12 · choice · biggest product
  () => {
    let list;
    do { list = Array.from({ length: 5 }, () => { const f = pick([2, 5, 10]), n = ri(2, 9); return [`${n} × ${f}`, n * f]; }); }
    while (new Set(list.map(x => x[1])).size < 5);
    const best = list.reduce((m, x) => x[1] > m[1] ? x : m);
    return cq({ pts: 4, choices: list.map(x => x[0]), answer: list.indexOf(best),
      q: ['Which one is the biggest?', '哪一个最大？'],
      hints: [['Work out each one by skip counting.', '用跳着数把每个都算出来。'], ['Then compare the answers.', '再比较答案。']],
      explain: [`${list.map(x => `${x[0]} = ${x[1]}`).join(', ')}. The biggest is ${best[0]}.`, `${list.map(x => `${x[0]} = ${x[1]}`).join('，')}。最大的是 ${best[0]}。`] });
  },
  // 13 · type-in · two kinds of packs
  () => {
    const a = ri(2, 6), b = ri(2, 6), ans = 5 * a + 2 * b;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Roo buys ${a} packs with 5 stickers each and ${b} packs with 2 stickers each. How many stickers does Roo get?`, `袋鼠买了 ${a} 包每包 5 张的贴纸，又买了 ${b} 包每包 2 张的贴纸。一共多少张？`],
      hints: [[`Big packs: ${a} × 5 = ${5 * a}.`, `大包：${a} × 5 = ${5 * a}。`], [`Small packs: ${b} × 2 = ${2 * b}. Add them.`, `小包：${b} × 2 = ${2 * b}，再加起来。`]],
      explain: [`${5 * a} + ${2 * b} = ${ans}.`, `${5 * a} + ${2 * b} = ${ans}。`] });
  },
  // 14 · choice · how many groups (missing factor story)
  () => {
    const n = ri(3, 9), ans = n;
    return cq({ pts: 4, ...numChoices(ans, [5 * n, n + 5, ans + 1, ans - 1]),
      q: [`A starfish has 5 arms. Roo counts ${5 * n} arms in a rock pool. How many starfish are there?`, `一只海星有 5 条腿。袋鼠在水洼里数到 ${5 * n} 条腿。有几只海星？`],
      hints: [[`Count by 5s until you reach ${5 * n}.`, `5 个 5 个地数，数到 ${5 * n}。`], [`? × 5 = ${5 * n}`, `? × 5 = ${5 * n}`]],
      explain: [`${n} × 5 = ${5 * n}, so there are ${n} starfish.`, `${n} × 5 = ${5 * n}，所以有 ${n} 只海星。`], ...tmHop(5, 50) });
  },
  // 15 · type-in · nickels
  () => {
    const n = ri(3, 10);
    return cq({ pts: 4, input: true, answer: 5 * n, unit: ['cents', '美分'],
      q: [`A nickel is worth 5 cents. Roo has ${n} nickels. How many cents is that?`, `一个 nickel 值 5 美分。袋鼠有 ${n} 个 nickel，一共多少美分？`],
      hints: [['Count by 5s, one nickel at a time.', '一个一个地数，5 个 5 个地加。'], [`${n} × 5 = ?`, `${n} × 5 = ?`]],
      explain: [`${n} × 5 = ${5 * n} cents.`, `${n} × 5 = ${5 * n} 美分。`] });
  },
  // 16 · choice · same total
  () => {
    const [shown, good, val] = pick([['4 × 5', '2 × 10', 20], ['2 × 10', '4 × 5', 20], ['6 × 5', '3 × 10', 30], ['3 × 10', '6 × 5', 30], ['8 × 5', '4 × 10', 40], ['4 × 10', '8 × 5', 40], ['10 × 5', '5 × 10', 50]]);
    const wrong = shuffle(['5 × 5', '3 × 5', '2 × 5', '6 × 2', '7 × 5', '9 × 2', '10 × 2', '5 × 2', '3 × 2', '9 × 5'].filter(w => Function('return ' + w.replace('×', '*'))() !== val)).slice(0, 4);
    const choices = shuffle([good, ...wrong]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which one has the same answer as ${shown}?`, `哪一个和 ${shown} 的得数一样？`],
      hints: [[`First work out ${shown}.`, `先算出 ${shown}。`], ['Then work out each choice.', '再把每个选项算出来。']],
      explain: [`${shown} = ${val} and ${good} = ${val}.`, `${shown} = ${val}，${good} = ${val}。`] });
  },
  // 17 · type-in · double the rows
  () => {
    const r = ri(2, 4), c = pick([2, 5, 10]);
    return cq({ pts: 5, input: true, answer: 2 * r * c,
      q: [`A garden has ${r} rows of ${c} carrots. Roo plants ${r} more rows just like them. How many carrots now?`, `菜园里有 ${r} 行胡萝卜，每行 ${c} 根。袋鼠又种了同样的 ${r} 行。现在一共多少根？`],
      hints: [[`Now there are ${r} + ${r} = ${2 * r} rows.`, `现在有 ${r} + ${r} = ${2 * r} 行。`], [`${2 * r} × ${c} = ?`, `${2 * r} × ${c} = ?`]],
      explain: [`${2 * r} rows of ${c}: ${2 * r} × ${c} = ${2 * r * c}. (Double of ${r * c}.)`, `${2 * r} 行，每行 ${c} 根：${2 * r} × ${c} = ${2 * r * c}。（是 ${r * c} 的 2 倍。）`] });
  },
  // 18 · choice · times as many, then together
  () => {
    const ben = ri(2, 9), k = pick([2, 5, 10]), mia = k * ben, tot = ben + mia;
    return cq({ pts: 5, ...numChoices(tot, [mia, ben + k, tot + ben, mia - ben]),
      q: [`Ben has ${ben} shells. Mia has ${k} times as many shells as Ben. How many shells do they have together?`, `Ben 有 ${ben} 个贝壳，Mia 的贝壳是 Ben 的 ${k} 倍。他们一共有多少个？`],
      hints: [[`Mia has ${k} groups of ${ben}: ${k} × ${ben} = ${mia}.`, `Mia 有 ${k} 个 ${ben}：${k} × ${ben} = ${mia}。`], [`Together: ${ben} + ${mia}.`, `一共：${ben} + ${mia}。`]],
      explain: [`Mia has ${k} × ${ben} = ${mia}. Together ${ben} + ${mia} = ${tot}.`, `Mia 有 ${k} × ${ben} = ${mia} 个，一共 ${ben} + ${mia} = ${tot} 个。`] });
  },
  // 19 · type-in · dimes and nickels
  () => {
    const d = ri(2, 6), n = ri(2, 7), ans = 10 * d + 5 * n;
    return cq({ pts: 5, input: true, answer: ans, unit: ['cents', '美分'],
      q: [`A dime is worth 10 cents and a nickel is worth 5 cents. Roo has ${d} dimes and ${n} nickels. How many cents in all?`, `一个 dime 值 10 美分，一个 nickel 值 5 美分。袋鼠有 ${d} 个 dime 和 ${n} 个 nickel，一共多少美分？`],
      hints: [[`Dimes: ${d} × 10 = ${10 * d}.`, `dime：${d} × 10 = ${10 * d}。`], [`Nickels: ${n} × 5 = ${5 * n}. Add them.`, `nickel：${n} × 5 = ${5 * n}，再加起来。`]],
      explain: [`${10 * d} + ${5 * n} = ${ans} cents.`, `${10 * d} + ${5 * n} = ${ans} 美分。`] });
  },
  // 20 · choice · boss
  cq({ pts: 5, boss: true, ...numChoices(20, [15, 16, 19, 25]),
    q: ['Boss question! A box of chocolates has 4 equal rows. Roo eats one whole row, and 15 chocolates are left. How many chocolates were in the box at first?', 'Boss 题！一盒巧克力排成一样多的 4 行。袋鼠吃掉了整整一行，还剩 15 块。盒子里原来有多少块？'],
    hints: [['After Roo eats one row, how many rows are left?', '吃掉一行后，还剩几行？'], ['3 rows have 15 chocolates. How many in one row?', '3 行一共 15 块，一行有几块？']],
    explain: ['3 rows are left with 15 chocolates, so each row has 5 (5 + 5 + 5 = 15). The box had 4 × 5 = 20.', '剩下 3 行共 15 块，所以每行 5 块（5 + 5 + 5 = 15）。原来有 4 × 5 = 20 块。'] })
];

registerSeries({
  id: 'times1', camp: true, breakEvery: 10, perRound: 20, games: ['jump', 'bubbles'],
  tag: ['Times Camp 1', '乘法营 1'], name: ['What Is Multiplication?', '乘法是什么'],
  desc: ['Equal groups, arrays, ×2 ×5 ×10, coins', '相同的几组、方阵、乘 2 乘 5 乘 10、硬币'],
  lesson: LESSON_TIMES1,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_TIMES1
});
