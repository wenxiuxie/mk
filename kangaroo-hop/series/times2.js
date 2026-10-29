// 乘法营 2：口诀 ×3 ×4 ×6 — Times Camp 2. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// The big idea: use a fact you know to find one you don't. ×3 = ×2 + one more group, ×4 = double and double again, ×6 = ×5 + one more group.
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.

// ---------- mini-lesson drawings ----------
// array whose last `extra` rows are a second color, so "5 rows + 1 row" can be seen
const t2Array = (r, c, d, extra = 0, icon = 'star', icon2 = 'berry') => `<div style="display:grid;grid-template-columns:repeat(${c},24px);gap:4px">${Array.from({ length: r * c }, (_, i) =>
  `<span class="appear" style="animation-delay:${d + Math.floor(i / c) * .3}s">${item(Math.floor(i / c) >= r - extra ? icon2 : icon)}</span>`).join('')}</div>`;
const t2Count = (step, d) => `<div class="pseq">${Array.from({ length: 10 }, (_, i) => `<div class="pcell appear" style="animation-delay:${d + i * .12}s;width:44px;min-height:46px"><span class="nv" style="font-size:18px">${(i + 1) * step}</span></div>`).join('')}</div>`;

const LESSON_TIMES2 = [
  {
    title: ['Times 3: two groups and one more', '乘 3：2 组再加 1 组'],
    text: ['You know 2 × 7 = 14. 3 × 7 is just one more group of 7: 14 + 7 = 21. Use a fact you know to find a new one!',
      '你会 2 × 7 = 14。3 × 7 就是再多 1 组 7：14 + 7 = 21。用会的口诀推出新的口诀！'],
    art(el) {
      el.innerHTML = t2Array(3, 7, .2, 1) + lessonEq('2 × 7 = 14', 1.6) + lessonEq('14 + 7 = <span class="hl">21</span> = 3 × 7', 2.6);
    }
  },
  {
    title: ['Times 4: double, then double again', '乘 4：翻一倍，再翻一倍'],
    text: ['4 × 6: double 6 to get 12, then double 12 to get 24. Two doubles make times 4!',
      '4 × 6：先把 6 翻一倍得 12，再把 12 翻一倍得 24。翻两次倍就是乘 4！'],
    art(el) {
      el.innerHTML = t2Array(4, 6, .2, 2) + lessonEq('6 + 6 = 12', 1.6) + lessonEq('12 + 12 = <span class="hl">24</span> = 4 × 6', 2.6);
    }
  },
  {
    title: ['Times 6: five groups and one more', '乘 6：5 组再加 1 组'],
    text: ['Times 5 is easy: 5 × 7 = 35. 6 × 7 is one more group of 7: 35 + 7 = 42.',
      '乘 5 很简单：5 × 7 = 35。6 × 7 就是再多 1 组 7：35 + 7 = 42。'],
    art(el) {
      el.innerHTML = t2Array(6, 7, .2, 1) + lessonEq('5 × 7 = 35', 2.2) + lessonEq('35 + 7 = <span class="hl">42</span> = 6 × 7', 3.2);
    }
  },
  {
    title: ['Times 6 is double times 3', '乘 6 是乘 3 的 2 倍'],
    text: ['3 × 4 = 12. 6 groups is twice as many as 3 groups, so 6 × 4 = 12 + 12 = 24.',
      '3 × 4 = 12。6 组是 3 组的 2 倍，所以 6 × 4 = 12 + 12 = 24。'],
    art(el) {
      el.innerHTML = t2Array(6, 4, .2, 3, 'marble', 'pencil') + lessonEq('3 × 4 = 12', 2.2) + lessonEq('12 + 12 = <span class="hl">24</span> = 6 × 4', 3.2);
    }
  },
  {
    title: ['Skip count by 3s, 4s and 6s', '3 个 3 个、4 个 4 个、6 个 6 个地数'],
    text: ['Say them out loud: 3, 6, 9, 12 … then 4, 8, 12, 16 … then 6, 12, 18, 24 … Every number in the 6s list is also in the 3s list!',
      '大声数一数：3、6、9、12……再数 4、8、12、16……再数 6、12、18、24……6 的口诀里的数，3 的口诀里都有！'],
    art(el) {
      el.innerHTML = t2Count(3, .2) + t2Count(4, 1.6) + t2Count(6, 3);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions with times 3, 4 and 6. Use the facts you know! After 10 you play a 60-second game. Ready?',
      '20 道题：乘 3、乘 4、乘 6。用你会的口诀去推！做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const t2Hop = (step, max) => ({ tool: 'hop', cfg: { max, lanes: [{ start: 0, step }] } });
const t2Val = w => Function('return ' + w.replace(/×/g, '*'))();
// boss picture: two square tables pushed together, with a dot for each seat
const t2Tables = () => {
  let s = '<svg viewBox="0 0 200 110" width="220" height="121" role="img" aria-label="2 tables pushed together seat 6 kids">';
  [[50, 30], [100, 30]].forEach(([x, y]) => s += `<rect x="${x}" y="${y}" width="50" height="50" fill="#e9d6b4" stroke="#c8742c" stroke-width="3"/>`);
  [[75, 15], [125, 15], [75, 95], [125, 95], [35, 55], [165, 55]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="9" fill="#3a76b8"/>`);
  return s + '</svg>';
};

const Q_TIMES2 = [
  // 1 · type-in · ×3 equal groups
  () => {
    const n = ri(3, 9);
    return cq({ pts: 3, input: true, answer: 3 * n,
      q: [`A tricycle has 3 wheels. How many wheels do ${n} tricycles have?`, `一辆三轮车有 3 个轮子。${n} 辆三轮车一共有多少个轮子？`],
      hints: [[`Count by 3s, one row at a time.`, '一行一行地数，3 个 3 个地数。'], [`${n} × 3 = ?`, `${n} × 3 = ?`]],
      explain: [`${n} × 3 = ${3 * n}.`, `${n} × 3 = ${3 * n}。`],
      tool: 'array', cfg: { rows: n, cols: 3, icon: 'marble' } });
  },
  // 2 · choice · ×3 from ×2
  () => {
    const n = ri(4, 9), ans = 3 * n;
    return cq({ pts: 3, ...numChoices(ans, [2 * n + 3, 2 * n + 1, 4 * n, 2 * n]),
      q: [`Roo knows that 2 × ${n} = ${2 * n}. What is 3 × ${n}?`, `袋鼠知道 2 × ${n} = ${2 * n}。那么 3 × ${n} 是多少？`],
      hints: [[`3 groups of ${n} is 2 groups of ${n} and one more group.`, `3 个 ${n} 就是 2 个 ${n} 再加 1 个 ${n}。`], [`${2 * n} + ${n} = ?`, `${2 * n} + ${n} = ?`]],
      explain: [`3 × ${n} = 2 × ${n} + ${n} = ${2 * n} + ${n} = ${ans}.`, `3 × ${n} = 2 × ${n} + ${n} = ${2 * n} + ${n} = ${ans}。`],
      tool: 'array', cfg: { rows: 3, cols: n, paint: r => r < 2 ? 'star' : 'berry' } });
  },
  // 3 · type-in · ×4 legs
  () => {
    const n = ri(3, 9);
    return cq({ pts: 3, input: true, answer: 4 * n,
      q: [`${n} puppies are playing. Each puppy has 4 legs. How many legs in all?`, `${n} 只小狗在玩，每只有 4 条腿。一共有多少条腿？`],
      hints: [[`Count by 4s ${n} times: 4, 8, 12, …`, `4 个 4 个地数 ${n} 次：4、8、12……`], [`Or double ${n} and double again.`, `或者把 ${n} 翻一倍，再翻一倍。`]],
      explain: [`${n} × 4 = ${4 * n}. (${n} + ${n} = ${2 * n}, ${2 * n} + ${2 * n} = ${4 * n}.)`, `${n} × 4 = ${4 * n}。（${n} + ${n} = ${2 * n}，${2 * n} + ${2 * n} = ${4 * n}。）`], ...t2Hop(4, 40) });
  },
  // 4 · choice · ×4 from ×2
  () => {
    const n = ri(4, 9), ans = 4 * n;
    return cq({ pts: 3, ...numChoices(ans, [2 * n + 2, 3 * n, 2 * n + 4, 5 * n]),
      q: [`Roo knows that 2 × ${n} = ${2 * n}. What is 4 × ${n}?`, `袋鼠知道 2 × ${n} = ${2 * n}。那么 4 × ${n} 是多少？`],
      hints: [['4 groups is 2 groups and 2 more groups.', '4 组就是 2 组再加 2 组。'], [`Double ${2 * n}: ${2 * n} + ${2 * n}.`, `把 ${2 * n} 翻一倍：${2 * n} + ${2 * n}。`]],
      explain: [`4 × ${n} is double 2 × ${n}: ${2 * n} + ${2 * n} = ${ans}.`, `4 × ${n} 是 2 × ${n} 的 2 倍：${2 * n} + ${2 * n} = ${ans}。`],
      tool: 'array', cfg: { rows: 4, cols: n, paint: r => r < 2 ? 'star' : 'berry' } });
  },
  // 5 · type-in · ×6 legs
  () => {
    const n = ri(3, 9);
    return cq({ pts: 3, input: true, answer: 6 * n,
      q: [`A ladybug has 6 legs. How many legs do ${n} ladybugs have?`, `一只瓢虫有 6 条腿。${n} 只瓢虫一共有多少条腿？`],
      hints: [[`Count by 6s: 6, 12, 18, …`, '6 个 6 个地数：6、12、18……'], [`Or ${n} × 5 = ${5 * n}, then add one more ${n}.`, `或者先算 ${n} × 5 = ${5 * n}，再加一个 ${n}。`]],
      explain: [`${n} × 6 = ${5 * n} + ${n} = ${6 * n}.`, `${n} × 6 = ${5 * n} + ${n} = ${6 * n}。`], ...t2Hop(6, 60) });
  },
  // 6 · choice · ×6 from ×5
  () => {
    const n = ri(4, 9), ans = 6 * n;
    return cq({ pts: 3, ...numChoices(ans, [5 * n + 1, 5 * n + 5, 7 * n, 5 * n]),
      q: [`Roo knows that 5 × ${n} = ${5 * n}. What is 6 × ${n}?`, `袋鼠知道 5 × ${n} = ${5 * n}。那么 6 × ${n} 是多少？`],
      hints: [[`6 groups of ${n} is 5 groups and one more group of ${n}.`, `6 个 ${n} 就是 5 个 ${n} 再加 1 个 ${n}。`], [`${5 * n} + ${n} = ?`, `${5 * n} + ${n} = ?`]],
      explain: [`6 × ${n} = 5 × ${n} + ${n} = ${5 * n} + ${n} = ${ans}.`, `6 × ${n} = 5 × ${n} + ${n} = ${5 * n} + ${n} = ${ans}。`],
      tool: 'array', cfg: { rows: 6, cols: n, paint: r => r < 5 ? 'star' : 'berry' } });
  },
  // 7 · type-in · gap in a skip-count list
  () => {
    const k = pick([3, 4, 6]), s = ri(1, 5), gap = ri(1, 3), list = [0, 1, 2, 3, 4].map(i => (s + i) * k);
    return cq({ pts: 3, input: true, answer: list[gap],
      q: [`Roo counts by ${k}s. Which number is missing? ${list.map((v, i) => i === gap ? '?' : v).join(', ')}`, `袋鼠 ${k} 个 ${k} 个地数。缺了哪个数？${list.map((v, i) => i === gap ? '?' : v).join('、')}`],
      hints: [[`Each number is ${k} more than the one before.`, `每个数都比前一个多 ${k}。`], [`${list[gap - 1]} + ${k} = ?`, `${list[gap - 1]} + ${k} = ?`]],
      explain: [`${list[gap - 1]} + ${k} = ${list[gap]}.`, `${list[gap - 1]} + ${k} = ${list[gap]}。`], ...t2Hop(k, Math.max(20, list[4])) });
  },
  // 8 · choice · missing factor
  () => {
    const f = pick([3, 4, 6]), n = ri(3, 9);
    return cq({ pts: 3, ...numChoices(n, [n + 1, n - 1, n * f - f, f]),
      q: [`? × ${f} = ${n * f}`, `? × ${f} = ${n * f}`],
      hints: [[`How many ${f}s make ${n * f}?`, `几个 ${f} 是 ${n * f}？`], [`Hop by ${f}s until you land on ${n * f}. Count the hops.`, `${f} 个 ${f} 个地跳到 ${n * f}，数一数跳了几下。`]],
      explain: [`${n} × ${f} = ${n * f}, so the missing number is ${n}.`, `${n} × ${f} = ${n * f}，所以缺的数是 ${n}。`], ...t2Hop(f, Math.max(20, n * f)) });
  },
  // 9 · type-in · break an array into 5 rows + 1 row
  () => {
    const c = ri(4, 9);
    return cq({ pts: 4, input: true, answer: 6 * c,
      q: [`A box has 6 rows of ${c} cookies. The top 5 rows have ${5 * c} cookies. How many cookies are in the whole box?`, `一盒饼干有 6 行，每行 ${c} 块。上面 5 行共有 ${5 * c} 块。整盒有多少块？`],
      hints: [['How many rows are not counted yet?', '还有几行没算？'], [`One more row of ${c}: ${5 * c} + ${c}.`, `再加一行 ${c} 块：${5 * c} + ${c}。`]],
      explain: [`6 × ${c} = ${5 * c} + ${c} = ${6 * c}.`, `6 × ${c} = ${5 * c} + ${c} = ${6 * c}。`],
      tool: 'array', cfg: { rows: 6, cols: c, paint: r => r < 5 ? 'cookie' : 'berry' } });
  },
  // 10 · choice · not in the count-by-4s list
  () => {
    const ok = shuffle([12, 16, 20, 24, 28, 32, 36, 40]).slice(0, 4);
    let odd; do { odd = 2 * ri(6, 20); } while (odd % 4 === 0);   // even, so it looks like it could be there
    const { choices, answer } = numChoices(odd, ok);
    return cq({ pts: 4, choices, answer,
      q: ['Roo counts by 4s: 4, 8, 12, 16, … Which number will Roo NOT say?', '袋鼠 4 个 4 个地数：4、8、12、16……下面哪个数袋鼠不会数到？'],
      hints: [['Keep counting by 4s and see which numbers you land on.', '接着 4 个 4 个地数，看看会落在哪些数上。'], ['Use the number line: hop by 4s.', '用数轴 4 个 4 个地跳。']],
      explain: [`${odd - odd % 4} + 4 = ${odd - odd % 4 + 4}, so Roo jumps right over ${odd}.`, `${odd - odd % 4} + 4 = ${odd - odd % 4 + 4}，袋鼠跳过了 ${odd}。`], ...t2Hop(4, 40) });
  },
  // 11 · type-in · missing factor
  () => {
    const f = pick([3, 4, 6]), n = ri(3, 9);
    return cq({ pts: 4, input: true, answer: n,
      q: [`${f} × ? = ${f * n}`, `${f} × ? = ${f * n}`],
      hints: [[`Count by ${f}s until you reach ${f * n}.`, `${f} 个 ${f} 个地数，数到 ${f * n}。`], [`How many hops of ${f} land on ${f * n}?`, `跳几下 ${f} 能落到 ${f * n}？`]],
      explain: [`${f} × ${n} = ${f * n}, so the missing number is ${n}.`, `${f} × ${n} = ${f * n}，所以缺的数是 ${n}。`], ...t2Hop(f, Math.max(20, n * f)) });
  },
  // 12 · choice · biggest product
  () => {
    let list;
    do { list = Array.from({ length: 5 }, () => { const f = pick([3, 4, 6]), n = ri(3, 9); return [`${n} × ${f}`, n * f]; }); }
    while (new Set(list.map(x => x[1])).size < 5);
    const best = list.reduce((m, x) => x[1] > m[1] ? x : m);
    return cq({ pts: 4, choices: list.map(x => x[0]), answer: list.indexOf(best),
      q: ['Which one is the biggest?', '哪一个最大？'],
      hints: [['Work out each one. Use facts you know!', '把每个都算出来，用你会的口诀去推！'], ['Then compare the answers.', '再比较答案。']],
      explain: [`${list.map(x => `${x[0]} = ${x[1]}`).join(', ')}. The biggest is ${best[0]}.`, `${list.map(x => `${x[0]} = ${x[1]}`).join('，')}。最大的是 ${best[0]}。`] });
  },
  // 13 · type-in · tricycles and cars
  () => {
    const a = ri(2, 6), b = ri(2, 6), ans = 3 * a + 4 * b;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`In the toy box there are ${a} tricycles (3 wheels each) and ${b} cars (4 wheels each). How many wheels in all?`, `玩具箱里有 ${a} 辆三轮车（每辆 3 个轮子）和 ${b} 辆小汽车（每辆 4 个轮子）。一共有多少个轮子？`],
      hints: [[`Tricycles: ${a} × 3 = ${3 * a}.`, `三轮车：${a} × 3 = ${3 * a}。`], [`Cars: ${b} × 4 = ${4 * b}. Add them.`, `小汽车：${b} × 4 = ${4 * b}，再加起来。`]],
      explain: [`${3 * a} + ${4 * b} = ${ans}.`, `${3 * a} + ${4 * b} = ${ans}。`] });
  },
  // 14 · choice · same answer, different fact
  () => {
    const [shown, good, val] = pick([['3 × 4', '2 × 6', 12], ['2 × 6', '3 × 4', 12], ['3 × 6', '2 × 9', 18], ['4 × 6', '3 × 8', 24], ['3 × 8', '4 × 6', 24], ['6 × 6', '4 × 9', 36], ['4 × 9', '6 × 6', 36], ['6 × 5', '3 × 10', 30], ['4 × 4', '2 × 8', 16], ['6 × 4', '8 × 3', 24]]);
    const wrong = shuffle(['3 × 5', '4 × 5', '3 × 7', '4 × 7', '6 × 3', '4 × 8', '6 × 7', '3 × 9', '5 × 5', '4 × 3', '6 × 2', '2 × 8', '3 × 3']
      .filter(w => t2Val(w) !== val)).slice(0, 4);
    const choices = shuffle([good, ...wrong]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which one has the same answer as ${shown}?`, `哪一个和 ${shown} 的得数一样？`],
      hints: [[`First work out ${shown}.`, `先算出 ${shown}。`], ['Then work out each choice.', '再把每个选项算出来。']],
      explain: [`${shown} = ${val} and ${good} = ${val}.`, `${shown} = ${val}，${good} = ${val}。`] });
  },
  // 15 · type-in · boxes of eggs, some break
  () => {
    const n = ri(3, 8), k = ri(1, 5), ans = 6 * n - k;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Each box holds 6 eggs. Roo carries ${n} full boxes, but ${k} eggs break. How many eggs are not broken?`, `每盒装 6 个鸡蛋。袋鼠搬了 ${n} 满盒，可是打破了 ${k} 个。没破的鸡蛋有多少个？`],
      hints: [[`First: ${n} × 6 = ${6 * n} eggs.`, `先算：${n} × 6 = ${6 * n} 个。`], [`Then take away the broken ones: ${6 * n} − ${k}.`, `再减去打破的：${6 * n} − ${k}。`]],
      explain: [`${n} × 6 = ${6 * n}, and ${6 * n} − ${k} = ${ans}.`, `${n} × 6 = ${6 * n}，${6 * n} − ${k} = ${ans}。`],
      tool: 'array', cfg: { rows: n, cols: 6, icon: 'egg' } });
  },
  // 16 · choice · double and double again
  () => {
    const n = ri(5, 12), ans = 4 * n;
    return cq({ pts: 4, ...numChoices(ans, [2 * n, 3 * n, n + 4, 4 * n + 2]),
      q: [`Roo thinks of ${n}. Roo doubles it, and then doubles the answer again. What number does Roo get?`, `袋鼠想了一个数 ${n}。先把它翻一倍，再把得数翻一倍。袋鼠得到多少？`],
      hints: [[`Double ${n}: ${n} + ${n} = ${2 * n}.`, `${n} 翻一倍：${n} + ${n} = ${2 * n}。`], [`Double ${2 * n} again. That is the same as 4 × ${n}!`, `${2 * n} 再翻一倍。这就是 4 × ${n}！`]],
      explain: [`${n} → ${2 * n} → ${ans}. Doubling twice is times 4: 4 × ${n} = ${ans}.`, `${n} → ${2 * n} → ${ans}。翻两次倍就是乘 4：4 × ${n} = ${ans}。`] });
  },
  // 17 · type-in · empty chairs: 4 chairs, 3 kids at each table
  () => {
    const n = ri(3, 9);
    return cq({ pts: 5, input: true, answer: n,
      q: [`A classroom has ${n} tables with 4 chairs at each table. 3 kids sit at every table. How many chairs are empty?`, `教室里有 ${n} 张桌子，每张桌子有 4 把椅子。每张桌子坐了 3 个小朋友。有几把空椅子？`],
      hints: [[`Chairs: ${n} × 4 = ${4 * n}. Kids: ${n} × 3 = ${3 * n}.`, `椅子：${n} × 4 = ${4 * n}。小朋友：${n} × 3 = ${3 * n}。`], ['Or think about one table: how many empty chairs does it have?', '或者只看一张桌子：它有几把空椅子？']],
      explain: [`Each table has 1 empty chair, and there are ${n} tables: ${4 * n} − ${3 * n} = ${n}.`, `每张桌子空 1 把椅子，有 ${n} 张桌子：${4 * n} − ${3 * n} = ${n}。`],
      tool: 'array', cfg: { rows: n, cols: 4, paint: (r, c) => c < 3 ? 'seat' : 'taken' } });
  },
  // 18 · choice · which one does NOT equal the number
  () => {
    const [val, facts, near] = pick([[12, ['2 × 6', '6 × 2', '3 × 4', '4 × 3'], ['3 × 5', '2 × 5', '4 × 4', '3 × 3']],
      [18, ['2 × 9', '9 × 2', '3 × 6', '6 × 3'], ['4 × 4', '4 × 5', '3 × 5', '3 × 7']],
      [24, ['3 × 8', '8 × 3', '4 × 6', '6 × 4'], ['4 × 5', '5 × 5', '3 × 7', '4 × 7']]]);
    const odd = pick(near), choices = shuffle([...facts, odd]);
    return cq({ pts: 5, choices, answer: choices.indexOf(odd),
      q: [`Which one is NOT equal to ${val}?`, `哪一个不等于 ${val}？`],
      hints: [['Work out every choice.', '把每个选项都算出来。'], ['Four of them are the same number. Find the one that is different.', '有四个得数一样，找出不一样的那个。']],
      explain: [`${odd} = ${t2Val(odd)}, not ${val}. The others all make ${val}.`, `${odd} = ${t2Val(odd)}，不是 ${val}。其他的都等于 ${val}。`] });
  },
  // 19 · type-in · 3 friends each get 4 more
  () => {
    const n = ri(2, 6), ans = 3 * (n + 4);
    return cq({ pts: 5, input: true, answer: ans,
      q: [`Each of 3 friends has ${n} stickers. Then Roo gives each friend 4 more stickers. How many stickers do the 3 friends have now?`, `3 个好朋友每人有 ${n} 张贴纸。然后袋鼠又给每人 4 张。现在 3 个人一共有多少张？`],
      hints: [[`Now each friend has ${n} + 4 = ${n + 4}.`, `现在每人有 ${n} + 4 = ${n + 4} 张。`], [`3 friends: 3 × ${n + 4}.`, `3 个人：3 × ${n + 4}。`]],
      explain: [`3 × ${n + 4} = ${ans}. (Or 3 × ${n} + 3 × 4 = ${3 * n} + 12 = ${ans}.)`, `3 × ${n + 4} = ${ans}。（也可以 3 × ${n} + 3 × 4 = ${3 * n} + 12 = ${ans}。）`] });
  },
  // 20 · choice · boss: tables pushed together
  cq({ pts: 5, boss: true, ...numChoices(14, [12, 16, 20, 24]),
    q: ['Boss question! One square table seats 4 kids, one on each side. When 2 tables are pushed together, 6 kids can sit (see the picture). Roo pushes 6 tables together in one long row. How many kids can sit?',
      'Boss 题！一张正方形桌子每边坐 1 人，能坐 4 人。2 张桌子拼在一起能坐 6 人（看图）。袋鼠把 6 张桌子拼成长长的一排，能坐多少人？'],
    fig: t2Tables(),
    hints: [['Is it 6 × 4? Look: where the tables touch, nobody can sit.', '是 6 × 4 吗？看图：桌子挨着的地方没法坐人。'], ['Count the long sides: top and bottom each have 6 seats. Then the two ends.', '数长边：上面 6 人，下面 6 人，再加两头。']],
    explain: ['Top 6 + bottom 6 + one at each end 2 = 14 kids.', '上面 6 人 + 下面 6 人 + 两头各 1 人 = 14 人。'] })
];

registerSeries({
  id: 'times2', camp: true, breakEvery: 10, perRound: 20, games: ['jump', 'bubbles'],
  tag: ['Times Camp 2', '乘法营 2'], name: ['Times 3, 4 and 6', '口诀 ×3 ×4 ×6'],
  desc: ['Use facts you know: ×4 is double double, ×6 is ×5 and one more', '用已知推未知：×4 翻两次倍，×6 是 ×5 再加 1 组'],
  lesson: LESSON_TIMES2,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_TIMES2
});
