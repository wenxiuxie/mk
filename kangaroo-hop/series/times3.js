// 乘法营 3：口诀 ×7 ×8 ×9 — Times Camp 3. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Tricks for the hard tables: ×9 = ×10 − one group, the ×9 finger trick, breaking a fact apart (7 × 8 = 7 × 5 + 7 × 3),
// ×8 = double ×4, and times tens (4 × 30 = 12 tens).
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.

// ---------- pictures ----------
// array whose columns from `split` on are a second color, so "5 columns + 3 columns" can be seen
const t3Array = (r, c, d, split, icon = 'star', icon2 = 'berry') => `<div style="display:grid;grid-template-columns:repeat(${c},22px);gap:3px">${Array.from({ length: r * c }, (_, i) =>
  `<span class="appear" style="animation-delay:${d + Math.floor(i / c) * .25}s">${item(i % c >= split ? icon2 : icon)}</span>`).join('')}</div>`;
// two hands, ten fingers; finger k (1–10) is folded down: fingers on its left are tens, on its right are ones.
// d is the start delay of the pop-in animation (lesson only); null draws it still
function t3Hands(k, d = null) {
  let s = `<svg viewBox="0 0 330 150" width="300" style="max-width:100%;height:auto" role="img" aria-label="ten fingers, finger ${k} folded">`;
  for (let i = 1; i <= 10; i++) {
    const x = 12 + (i - 1) * 30 + (i > 5 ? 12 : 0), down = i === k, h = down ? 30 : 76;
    const col = down ? '#c8435a' : i < k ? '#3a76b8' : '#2f8f6b';
    s += `<g${d === null ? '' : ` class="appear" style="animation-delay:${d + i * .12}s"`}><rect x="${x}" y="${100 - h}" width="22" height="${h}" rx="11" fill="${col}"/>
      <text x="${x + 11}" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="#5d6b7c">${i}</text></g>`;
  }
  const mid = i => 23 + (i - 1) * 30 + (i > 5 ? 12 : 0);   // center of finger i
  if (k > 1) s += `<text x="${(mid(1) + mid(k - 1)) / 2}" y="144" text-anchor="middle" font-size="14" font-weight="800" fill="#3a76b8">${k - 1} ${k - 1 === 1 ? 'ten' : 'tens'}</text>`;
  if (k < 10) s += `<text x="${(mid(k + 1) + mid(10)) / 2}" y="144" text-anchor="middle" font-size="14" font-weight="800" fill="#2f8f6b">${10 - k} ${10 - k === 1 ? 'one' : 'ones'}</text>`;
  return s + '</svg>';
}

const LESSON_TIMES3 = [
  {
    title: ['Times 9: ten groups, take one away', '乘 9：先算 10 组，再拿走 1 组'],
    text: ['9 × 6: ten groups of 6 is 60. We only want 9 groups, so take one 6 away: 60 − 6 = 54.',
      '9 × 6：10 个 6 是 60。我们只要 9 个 6，所以拿走 1 个 6：60 − 6 = 54。'],
    art(el) {
      el.innerHTML = t3Array(6, 10, .2, 9) + lessonEq('10 × 6 = 60', 1.9) + lessonEq('60 − 6 = <span class="hl">54</span> = 9 × 6', 2.9);
    }
  },
  {
    title: ['The 9s finger trick', '乘 9 的手指魔术'],
    text: ['For 9 × 4, fold down finger number 4. Fingers on the left: 3, that is 3 tens. Fingers on the right: 6 ones. 9 × 4 = 36!',
      '算 9 × 4，把第 4 根手指弯下去。左边还有 3 根，是 3 个十；右边有 6 根，是 6 个一。9 × 4 = 36！'],
    art(el) {
      el.innerHTML = t3Hands(4, .2) + lessonEq('9 × 4 = <span class="hl">36</span>', 2);
    }
  },
  {
    title: ['Break it apart', '拆开来算'],
    text: ['7 × 8 is hard? Break the 8 into 5 and 3. 7 × 5 = 35 and 7 × 3 = 21. Put them back together: 35 + 21 = 56.',
      '7 × 8 难？把 8 拆成 5 和 3。7 × 5 = 35，7 × 3 = 21，合起来：35 + 21 = 56。'],
    art(el) {
      el.innerHTML = t3Array(7, 8, .2, 5) + lessonEq('7 × 5 = 35　7 × 3 = 21', 2.2) + lessonEq('35 + 21 = <span class="hl">56</span>', 3.2);
    }
  },
  {
    title: ['Times 8: double times 4', '乘 8：乘 4 再翻一倍'],
    text: ['8 groups is twice 4 groups. 4 × 6 = 24, so 8 × 6 = 24 + 24 = 48.',
      '8 组是 4 组的 2 倍。4 × 6 = 24，所以 8 × 6 = 24 + 24 = 48。'],
    art(el) {
      el.innerHTML = t3Array(8, 6, .2, 6) + lessonEq('4 × 6 = 24', 2.2) + lessonEq('24 + 24 = <span class="hl">48</span> = 8 × 6', 3.2);
    }
  },
  {
    title: ['Times tens', '乘整十'],
    text: ['4 × 30 means 4 groups of 3 tens. That is 12 tens, and 12 tens is 120. Just do 4 × 3, then put a 0 on the end!',
      '4 × 30 就是 4 个 3 个十，一共 12 个十，也就是 120。先算 4 × 3，再在后面添个 0！'],
    art(el) {
      const rod = d => `<span class="appear" style="animation-delay:${d}s;display:inline-block;width:12px;height:60px;margin:0 2px;border-radius:3px;background:repeating-linear-gradient(#c8742c 0 5px,#e9a868 5px 6px)"></span>`;
      el.innerHTML = `<div class="chips" style="gap:22px">${[0, 1, 2, 3].map(g => `<span>${[0, 1, 2].map(k => rod(.3 + g * .5 + k * .12)).join('')}</span>`).join('')}</div>`
        + lessonEq('4 × 3 = 12', 2.4) + lessonEq('4 × 30 = <span class="hl">120</span>', 3.2);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions with times 7, 8 and 9 and times tens. Use your tricks! After 10 you play a 60-second game. Ready?',
      '20 道题：乘 7、乘 8、乘 9 和乘整十。用上你的小窍门！做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const t3Hop = (step, max) => ({ tool: 'hop', cfg: { max, lanes: [{ start: 0, step }] } });
const t3Val = w => Function('return ' + w.replace(/×/g, '*').replace(/−/g, '-'))();

const Q_TIMES3 = [
  // 1 · type-in · ×7 days in weeks
  () => {
    const n = ri(2, 9);
    return cq({ pts: 3, input: true, answer: 7 * n,
      q: [`A week has 7 days. How many days are in ${n} weeks?`, `一个星期有 7 天。${n} 个星期一共有多少天？`],
      hints: [['Count by 7s: 7, 14, 21, 28, …', '7 个 7 个地数：7、14、21、28……'], [`Or break it apart: ${n} × 5 = ${5 * n} and ${n} × 2 = ${2 * n}.`, `或者拆开算：${n} × 5 = ${5 * n}，${n} × 2 = ${2 * n}。`]],
      explain: [`${n} × 7 = ${5 * n} + ${2 * n} = ${7 * n}.`, `${n} × 7 = ${5 * n} + ${2 * n} = ${7 * n}。`], ...t3Hop(7, 70) });
  },
  // 2 · choice · ×9 from ×10
  () => {
    const n = ri(3, 9), ans = 9 * n;
    return cq({ pts: 3, ...numChoices(ans, [10 * n - 1, 10 * n - 9, 8 * n, 9 * n + 9]),
      q: [`Roo knows that 10 × ${n} = ${10 * n}. What is 9 × ${n}?`, `袋鼠知道 10 × ${n} = ${10 * n}。那么 9 × ${n} 是多少？`],
      hints: [[`9 groups of ${n} is one group of ${n} less than 10 groups.`, `9 个 ${n} 比 10 个 ${n} 少 1 个 ${n}。`], [`${10 * n} − ${n} = ?`, `${10 * n} − ${n} = ?`]],
      explain: [`9 × ${n} = ${10 * n} − ${n} = ${ans}.`, `9 × ${n} = ${10 * n} − ${n} = ${ans}。`],
      tool: 'array', cfg: { rows: n, cols: 10, paint: (r, c) => c < 9 ? 'star' : 'taken' } });
  },
  // 3 · type-in · ×8 spider legs
  () => {
    const n = ri(3, 9);
    return cq({ pts: 3, input: true, answer: 8 * n,
      q: [`A spider has 8 legs. How many legs do ${n} spiders have?`, `一只蜘蛛有 8 条腿。${n} 只蜘蛛一共有多少条腿？`],
      hints: [[`Find 4 × ${n} = ${4 * n} first.`, `先算 4 × ${n} = ${4 * n}。`], [`Then double it: ${4 * n} + ${4 * n}.`, `再翻一倍：${4 * n} + ${4 * n}。`]],
      explain: [`${n} × 8 = ${4 * n} + ${4 * n} = ${8 * n}.`, `${n} × 8 = ${4 * n} + ${4 * n} = ${8 * n}。`], ...t3Hop(8, 80) });
  },
  // 4 · choice · break apart: a × b = a × 5 + a × ?
  () => {
    const a = ri(6, 9), b = ri(6, 9), ans = b - 5;
    return cq({ pts: 3, ...digitChoices(ans, [b, 5, ans + 1, a - 5]),
      q: [`Roo breaks ${a} × ${b} apart: ${a} × ${b} = ${a} × 5 + ${a} × ? What is the missing number?`, `袋鼠把 ${a} × ${b} 拆开：${a} × ${b} = ${a} × 5 + ${a} × ?。缺的数是几？`],
      hints: [[`${b} is split into 5 and something.`, `${b} 拆成了 5 和另一个数。`], [`5 + ? = ${b}`, `5 + ? = ${b}`]],
      explain: [`${b} = 5 + ${ans}, so ${a} × ${b} = ${a * 5} + ${a * ans} = ${a * b}. The missing number is ${ans}.`, `${b} = 5 + ${ans}，所以 ${a} × ${b} = ${a * 5} + ${a * ans} = ${a * b}。缺的数是 ${ans}。`],
      tool: 'array', cfg: { rows: a, cols: b, paint: (r, c) => c < 5 ? 'star' : 'berry' } });
  },
  // 5 · type-in · finger trick
  () => {
    const k = ri(2, 9);
    return cq({ pts: 3, input: true, answer: 9 * k,
      q: [`Roo uses the finger trick for 9 × ${k} and folds down finger number ${k} (see the picture). What is 9 × ${k}?`, `袋鼠用手指魔术算 9 × ${k}，把第 ${k} 根手指弯下去（看图）。9 × ${k} 是多少？`],
      fig: t3Hands(k),
      hints: [['Fingers on the left of the folded one are tens.', '弯下的手指左边有几根，就是几个十。'], ['Fingers on the right are ones.', '右边有几根，就是几个一。']],
      explain: [`${k - 1} tens and ${10 - k} ones: 9 × ${k} = ${9 * k}.`, `${k - 1} 个十和 ${10 - k} 个一：9 × ${k} = ${9 * k}。`] });
  },
  // 6 · choice · times tens
  () => {
    const a = ri(2, 9), t = ri(2, 9), ans = a * t * 10;
    return cq({ pts: 3, ...numChoices(ans, [a * t, a * t * 100, (a + t) * 10, ans + 10]),
      q: [`What is ${a} × ${t}0?`, `${a} × ${t}0 等于多少？`],
      hints: [[`${t}0 is ${t} tens. ${a} groups of ${t} tens is how many tens?`, `${t}0 是 ${t} 个十。${a} 个 ${t} 个十是几个十？`], [`${a} × ${t} = ${a * t}, so it is ${a * t} tens.`, `${a} × ${t} = ${a * t}，所以是 ${a * t} 个十。`]],
      explain: [`${a} × ${t} = ${a * t}, so ${a} × ${t}0 = ${ans}.`, `${a} × ${t} = ${a * t}，所以 ${a} × ${t}0 = ${ans}。`] });
  },
  // 7 · type-in · ×8 from ×4
  () => {
    const n = ri(3, 9);
    return cq({ pts: 3, input: true, answer: 8 * n,
      q: [`Roo knows that 4 × ${n} = ${4 * n}. What is 8 × ${n}?`, `袋鼠知道 4 × ${n} = ${4 * n}。那么 8 × ${n} 是多少？`],
      hints: [['8 groups is twice as many as 4 groups.', '8 组是 4 组的 2 倍。'], [`Double ${4 * n}: ${4 * n} + ${4 * n}.`, `把 ${4 * n} 翻一倍：${4 * n} + ${4 * n}。`]],
      explain: [`8 × ${n} = ${4 * n} + ${4 * n} = ${8 * n}.`, `8 × ${n} = ${4 * n} + ${4 * n} = ${8 * n}。`],
      tool: 'array', cfg: { rows: 8, cols: n, paint: r => r < 4 ? 'star' : 'berry' } });
  },
  // 8 · choice · not in the count-by-9s list
  () => {
    const ok = shuffle([18, 27, 36, 45, 54, 63, 72, 81, 90]).slice(0, 4);
    let odd; do { odd = 9 * ri(2, 10) + pick([-2, -1, 1, 2]); } while (ok.includes(odd));
    const { choices, answer } = numChoices(odd, ok);
    return cq({ pts: 3, choices, answer,
      q: ['Roo counts by 9s: 9, 18, 27, 36, … Which number will Roo NOT say?', '袋鼠 9 个 9 个地数：9、18、27、36……下面哪个数袋鼠不会数到？'],
      hints: [['A secret: in the 9s list (up to 90), the two digits always add up to 9.', '小秘密：90 以内 9 的口诀里，每个数的两个数字加起来都是 9。'], ['Add the digits of each choice.', '把每个选项的两个数字加一加。']],
      explain: [`${Math.floor(odd / 10)} + ${odd % 10} = ${Math.floor(odd / 10) + odd % 10}, not 9, so ${odd} is not in the 9s list.`, `${Math.floor(odd / 10)} + ${odd % 10} = ${Math.floor(odd / 10) + odd % 10}，不是 9，所以 ${odd} 数不到。`], ...t3Hop(9, 90) });
  },
  // 9 · type-in · missing factor
  () => {
    const f = pick([7, 8, 9]), n = ri(3, 9);
    return cq({ pts: 4, input: true, answer: n,
      q: [`? × ${f} = ${n * f}`, `? × ${f} = ${n * f}`],
      hints: [[`How many ${f}s make ${n * f}?`, `几个 ${f} 是 ${n * f}？`], [`Hop by ${f}s until you land on ${n * f}. Count the hops.`, `${f} 个 ${f} 个地跳到 ${n * f}，数一数跳了几下。`]],
      explain: [`${n} × ${f} = ${n * f}, so the missing number is ${n}.`, `${n} × ${f} = ${n * f}，所以缺的数是 ${n}。`], ...t3Hop(f, Math.max(20, n * f)) });
  },
  // 10 · choice · biggest product
  () => {
    let list;
    do { list = Array.from({ length: 5 }, () => { const f = pick([7, 8, 9]), n = ri(3, 9); return [`${n} × ${f}`, n * f]; }); }
    while (new Set(list.map(x => x[1])).size < 5);
    const best = list.reduce((m, x) => x[1] > m[1] ? x : m);
    return cq({ pts: 4, choices: list.map(x => x[0]), answer: list.indexOf(best),
      q: ['Which one is the biggest?', '哪一个最大？'],
      hints: [['Work out each one. Use your tricks!', '把每个都算出来，用上你的小窍门！'], ['Then compare the answers.', '再比较答案。']],
      explain: [`${list.map(x => `${x[0]} = ${x[1]}`).join(', ')}. The biggest is ${best[0]}.`, `${list.map(x => `${x[0]} = ${x[1]}`).join('，')}。最大的是 ${best[0]}。`] });
  },
  // 11 · type-in · break an array into 5 columns + the rest
  () => {
    const r = ri(6, 9), c = ri(6, 9), k = c - 5;
    return cq({ pts: 4, input: true, answer: r * c,
      q: [`A garden has ${r} rows of ${c} tulips. Roo splits each row into 5 tulips and ${k} tulips: ${r} × 5 = ${r * 5} and ${r} × ${k} = ${r * k}. How many tulips in all?`,
        `花园里有 ${r} 行郁金香，每行 ${c} 朵。袋鼠把每行拆成 5 朵和 ${k} 朵：${r} × 5 = ${r * 5}，${r} × ${k} = ${r * k}。一共有多少朵？`],
      hints: [['The two parts together make the whole garden.', '两部分合起来就是整个花园。'], [`${r * 5} + ${r * k} = ?`, `${r * 5} + ${r * k} = ?`]],
      explain: [`${r} × ${c} = ${r * 5} + ${r * k} = ${r * c}.`, `${r} × ${c} = ${r * 5} + ${r * k} = ${r * c}。`],
      tool: 'array', cfg: { rows: r, cols: c, paint: (i, j) => j < 5 ? 'flower' : 'star' } });
  },
  // 12 · choice · which is the same as 9 × n
  () => {
    const n = ri(3, 9), v = 9 * n, good = `10 × ${n} − ${n}`;
    const wrong = shuffle([`10 × ${n} − 1`, `10 × ${n} − 9`, `9 × ${n - 1} + 1`, `10 × ${n} + ${n}`, `9 + ${n}`, `10 × ${n - 1} − ${n}`]).filter(w => t3Val(w) !== v).slice(0, 4);
    const choices = shuffle([good, ...wrong]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which one is the same as 9 × ${n}?`, `哪一个和 9 × ${n} 一样大？`],
      hints: [[`9 groups of ${n} is 10 groups of ${n}, take away one group.`, `9 个 ${n} 就是 10 个 ${n} 拿走 1 个 ${n}。`], [`9 × ${n} = ${v}. Work out each choice.`, `9 × ${n} = ${v}，把每个选项算一算。`]],
      explain: [`${good} = ${10 * n} − ${n} = ${v} = 9 × ${n}.`, `${good} = ${10 * n} − ${n} = ${v} = 9 × ${n}。`] });
  },
  // 13 · type-in · times tens story
  () => {
    const a = ri(3, 9), t = ri(2, 5), ans = a * t * 10;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${a} school buses go to the zoo. Each bus carries ${t}0 kids. How many kids go to the zoo?`, `${a} 辆校车去动物园，每辆车坐 ${t}0 个小朋友。一共有多少个小朋友去动物园？`],
      hints: [[`${a} × ${t}0: first do ${a} × ${t}.`, `${a} × ${t}0：先算 ${a} × ${t}。`], [`${a} × ${t} = ${a * t}, so it is ${a * t} tens.`, `${a} × ${t} = ${a * t}，就是 ${a * t} 个十。`]],
      explain: [`${a} × ${t}0 = ${ans}.`, `${a} × ${t}0 = ${ans}。`] });
  },
  // 14 · choice · times as old
  () => {
    const n = ri(6, 9), k = pick([7, 8, 9]), ans = n * k;
    return cq({ pts: 4, ...numChoices(ans, [n + k, ans - n, ans + n, ans + 10]),
      q: [`Mia is ${n} years old. Her great-grandpa is ${k} times as old as Mia. How old is he?`, `Mia ${n} 岁。她的太爷爷的年龄是她的 ${k} 倍。太爷爷几岁？`],
      hints: [[`${k} times as old: ${n} × ${k}.`, `${k} 倍就是 ${n} × ${k}。`], ['Use a trick: break it apart, or ×10 then take one away.', '用小窍门：拆开算，或者先乘 10 再减。']],
      explain: [`${n} × ${k} = ${ans}. He is ${ans} years old.`, `${n} × ${k} = ${ans}，太爷爷 ${ans} 岁。`] });
  },
  // 15 · type-in · ladybugs and spiders
  () => {
    const a = ri(2, 6), b = ri(2, 6), ans = 6 * a + 8 * b;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`In the garden there are ${a} ladybugs (6 legs each) and ${b} spiders (8 legs each). How many legs in all?`, `花园里有 ${a} 只瓢虫（每只 6 条腿）和 ${b} 只蜘蛛（每只 8 条腿）。一共有多少条腿？`],
      hints: [[`Ladybugs: ${a} × 6 = ${6 * a}.`, `瓢虫：${a} × 6 = ${6 * a}。`], [`Spiders: ${b} × 8 = ${8 * b}. Add them.`, `蜘蛛：${b} × 8 = ${8 * b}，再加起来。`]],
      explain: [`${6 * a} + ${8 * b} = ${ans}.`, `${6 * a} + ${8 * b} = ${ans}。`] });
  },
  // 16 · choice · same answer, different fact
  () => {
    const [shown, good, val] = pick([['9 × 4', '6 × 6', 36], ['8 × 3', '6 × 4', 24], ['9 × 2', '3 × 6', 18], ['8 × 9', '9 × 8', 72], ['7 × 8', '8 × 7', 56],
      ['8 × 5', '4 × 10', 40], ['8 × 2', '4 × 4', 16], ['9 × 6', '6 × 9', 54], ['7 × 6', '6 × 7', 42], ['8 × 6', '6 × 8', 48]]);
    const wrong = shuffle(['7 × 7', '8 × 8', '9 × 9', '7 × 9', '6 × 7', '7 × 5', '9 × 5', '8 × 4', '9 × 3', '7 × 3', '6 × 5', '8 × 7', '9 × 7']
      .filter(w => t3Val(w) !== val)).slice(0, 4);
    const choices = shuffle([good, ...wrong]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`Which one has the same answer as ${shown}?`, `哪一个和 ${shown} 的得数一样？`],
      hints: [[`First work out ${shown}.`, `先算出 ${shown}。`], ['Then work out each choice.', '再把每个选项算出来。']],
      explain: [`${shown} = ${val} and ${good} = ${val}.`, `${shown} = ${val}，${good} = ${val}。`] });
  },
  // 17 · type-in · change from 100 dollars
  () => {
    const n = ri(3, 9), p = pick([7, 8, 9]), ans = 100 - n * p;
    return cq({ pts: 5, input: true, answer: ans, unit: ['dollars', '美元'],
      q: [`Roo buys ${n} books. Each book costs ${p} dollars. Roo pays with a 100-dollar bill. How much change does Roo get?`, `袋鼠买了 ${n} 本书，每本 ${p} 美元。袋鼠付了一张 100 美元。应该找回多少钱？`],
      hints: [[`The books cost ${n} × ${p} = ${n * p} dollars.`, `书一共 ${n} × ${p} = ${n * p} 美元。`], [`100 − ${n * p} = ?`, `100 − ${n * p} = ?`]],
      explain: [`${n} × ${p} = ${n * p}, and 100 − ${n * p} = ${ans} dollars.`, `${n} × ${p} = ${n * p}，100 − ${n * p} = ${ans} 美元。`] });
  },
  // 18 · choice · fact times tens
  () => {
    const a = pick([7, 8, 9]), b = ri(3, 9), p = a * b, ans = p * 10, tensFirst = rnd(2);
    return cq({ pts: 5, ...numChoices(ans, [p, p * 100, p + 10, ans + 10]),
      q: [`${a} × ${b} = ${p}. What is ${tensFirst ? `${a}0 × ${b}` : `${a} × ${b}0`}?`, `${a} × ${b} = ${p}。那么 ${tensFirst ? `${a}0 × ${b}` : `${a} × ${b}0`} 是多少？`],
      hints: [['One of the numbers is now 10 times bigger.', '其中一个数变大了 10 倍。'], [`So the answer is ${p} tens.`, `所以答案是 ${p} 个十。`]],
      explain: [`${p} tens = ${ans}.`, `${p} 个十 = ${ans}。`] });
  },
  // 19 · type-in · break apart a teen number
  () => {
    const a = ri(3, 9), k = ri(1, 5), ans = a * (10 + k);
    return cq({ pts: 5, input: true, answer: ans,
      q: [`Roo breaks the ${10 + k} apart: ${a} × ${10 + k} = ${a} × 10 + ${a} × ${k}. What is ${a} × ${10 + k}?`, `袋鼠把 ${10 + k} 拆开：${a} × ${10 + k} = ${a} × 10 + ${a} × ${k}。${a} × ${10 + k} 是多少？`],
      hints: [[`${a} × 10 = ${10 * a}.`, `${a} × 10 = ${10 * a}。`], [`${a} × ${k} = ${a * k}. Add them.`, `${a} × ${k} = ${a * k}，再加起来。`]],
      explain: [`${10 * a} + ${a * k} = ${ans}.`, `${10 * a} + ${a * k} = ${ans}。`],
      tool: 'array', cfg: { rows: a, cols: 10 + k, paint: (r, c) => c < 10 ? 'star' : 'berry' } });
  },
  // 20 · choice · boss: in both the 8s and the 9s list
  cq({ pts: 5, boss: true, ...numChoices(72, [36, 63, 64, 81]),
    q: ['Boss question! Roo thinks of a number less than 100. It is in the 8s list (8, 16, 24, …) and also in the 9s list (9, 18, 27, …). What is Roo\'s number?',
      'Boss 题！袋鼠想了一个小于 100 的数。它在 8 的口诀里（8、16、24……），也在 9 的口诀里（9、18、27……）。袋鼠想的是几？'],
    hints: [['Write the 9s list up to 99: 9, 18, 27, …', '把 9 的口诀写到 99：9、18、27……'], ['Which of them can you also reach by counting by 8s?', '其中哪个数 8 个 8 个地数也能数到？']],
    explain: ['9s: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99. Only 72 is also in the 8s list: 8 × 9 = 72.', '9 的口诀：9、18、27、36、45、54、63、72、81、90、99。只有 72 也在 8 的口诀里：8 × 9 = 72。'] })
];

registerSeries({
  id: 'times3', camp: true, breakEvery: 10, perRound: 20, games: ['river', 'catch'], facts: [7, 8, 9],
  tag: ['Times Camp 3', '乘法营 3'], name: ['Times 7, 8 and 9', '口诀 ×7 ×8 ×9'],
  desc: ['×9 finger trick, break it apart, ×8 = double ×4, times tens', '×9 手指魔术、拆开来算、×8 是 ×4 翻倍、乘整十'],
  lesson: LESSON_TIMES3,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_TIMES3
});
