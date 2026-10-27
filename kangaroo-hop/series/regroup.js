// 加减营 2：两位数进位退位 — Add & Subtract Camp 2. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.
// To add more questions, put them in Q_REGROUP. With perRound: 20 each round then draws 20 of them, kept in list order.

// ---------- mini-lesson drawings ----------
const RG_A = '#c8742c', RG_B = '#3a76b8', RG_NEW = '#f2b630';
// a lesson stick (ten) or cube (one); cls 'appear' / 'gone' / 'dim' run after d seconds
const rgRod = (c, cls = '', d = 0) => `<span class="rod ${cls}" style="--c:${c};animation-delay:${d}s">${'<i></i>'.repeat(10)}</span>`;
const rgCube = (c, cls = '', d = 0) => `<span class="cube ${cls}" style="--c:${c};animation-delay:${d}s"></span>`;
const rgBlocks = (rods, cubes) => `<div class="b10"><div class="bcol"><small>${TI('Tens', '十')}</small><div class="rods">${rods.join('')}</div></div>
  <div class="bcol"><small>${TI('Ones', '一')}</small><div class="cubes">${cubes.join('')}</div></div></div>`;
const rgMany = (n, f) => Array.from({ length: n }, (_, i) => f(i));

const LESSON_REGROUP = [
  {
    title: ['Tens and ones: 47', '十和一：47'],
    text: ['47 is 4 tens and 7 ones. Each stick is a ten. Each little cube is a one. 40 + 7 = 47.',
      '47 是 4 个十和 7 个一。一根小棒是一个十，一个小方块是一个一。40 + 7 = 47。'],
    art(el) {
      el.innerHTML = rgBlocks(rgMany(4, i => rgRod(RG_A, 'appear', .2 + i * .3)), rgMany(7, i => rgCube(RG_A, 'appear', 1.5 + i * .15)))
        + lessonEq('47 = <span class="hl">4</span> tens + <span class="hl">7</span> ones', 2.7);
    }
  },
  {
    title: ['Add tens, add ones: 34 + 25', '十加十，一加一：34 + 25'],
    text: ['Put the tens together: 30 + 20 = 50. Put the ones together: 4 + 5 = 9. 50 + 9 = 59.',
      '十和十放一起：30 + 20 = 50。一和一放一起：4 + 5 = 9。50 + 9 = 59。'],
    art(el) {
      el.innerHTML = rgBlocks([...rgMany(3, () => rgRod(RG_A)), ...rgMany(2, i => rgRod(RG_B, 'appear', .4 + i * .3))],
        [...rgMany(4, () => rgCube(RG_A)), ...rgMany(5, i => rgCube(RG_B, 'appear', 1.2 + i * .15))])
        + lessonEq('30 + 20 = 50', 2.1) + lessonEq('4 + 5 = 9', 2.8) + lessonEq('50 + 9 = <span class="hl">59</span>', 3.5);
    }
  },
  {
    title: ['10 ones make a ten: 47 + 38', '满十进一：47 + 38'],
    text: ['7 ones + 8 ones = 15 ones. That is too many ones! Trade 10 ones for 1 new ten. Now we have 8 tens and 5 ones: 85.',
      '7 个一加 8 个一是 15 个一，太多啦！把 10 个一换成 1 个十。现在是 8 个十和 5 个一：85。'],
    art(el) {
      const cubes = [...rgMany(7, () => RG_A), ...rgMany(8, () => RG_B)].map((c, i) => rgCube(c, i < 10 ? 'gone' : '', 1.6 + i * .08));
      el.innerHTML = rgBlocks([...rgMany(4, () => rgRod(RG_A)), ...rgMany(3, () => rgRod(RG_B)), rgRod(RG_NEW, 'appear', 2.6)], cubes)
        + lessonEq('7 + 8 = 15 = <span class="hl">1</span> ten + 5 ones', .5) + lessonEq('70 + 15 = <span class="hl">85</span>', 3.2);
    }
  },
  {
    title: ['Column addition: 47 + 38', '竖式加法：47 + 38'],
    text: ['Start with the ones: 7 + 8 = 15. Write 5, and carry the 1 to the tens. Tens: 4 + 3 + 1 = 8. The answer is 85.',
      '先算个位：7 + 8 = 15，写 5，向十位进 1。再算十位：4 + 3 + 1 = 8。答案是 85。'],
    art(el) {
      el.innerHTML = `<div class="colsum">
          <div class="carry"><span class="op"></span><span class="d fadein" style="animation-delay:1.4s">1</span><span class="d"></span></div>
          <div><span class="op"></span><span class="d">4</span><span class="d">7</span></div>
          <div><span class="op">+</span><span class="d">3</span><span class="d">8</span></div><div class="bar"></div>
          <div><span class="op"></span><span class="d fadein" style="animation-delay:2.8s">8</span><span class="d fadein" style="animation-delay:1s">5</span></div></div>
        ${lessonEq('Ones: 7 + 8 = 1<span class="hl">5</span>', .5)}${lessonEq('Tens: 4 + 3 + <span class="hl">1</span> = 8', 2.3)}`;
    }
  },
  {
    title: ['Break a ten to subtract: 62 − 29', '退位减法：62 − 29'],
    text: ['We need to take 9 ones, but there are only 2. Break a ten into 10 ones: now 12 ones. 12 − 9 = 3. Then 5 tens − 2 tens = 3 tens. 62 − 29 = 33.',
      '个位要拿走 9 个，可只有 2 个。拆开一个十，变成 12 个一。12 − 9 = 3。再算 5 个十 − 2 个十 = 3 个十。62 − 29 = 33。'],
    art(el) {
      // the ten breaks into 10 new ones, then 9 ones (2 old + 7 new) and 2 tens are taken away
      const anim = (list, dimmed) => reduce ? (dimmed ? 'opacity:.3' : '') : `animation:${list}`;
      const rods = [...rgMany(5, i => rgRod(RG_A, i < 2 ? 'dim' : '', 3.6 + i * .3)), rgRod(RG_A, 'gone', 1)];
      const old = rgMany(2, i => rgCube(RG_A, 'dim', 2.2 + i * .12));
      const fresh = rgMany(10, i => `<span class="cube" style="--c:${RG_NEW};${anim(`appear .45s ease-out ${1.3 + i * .05}s both${i < 7 ? `, dim .3s ${2.5 + i * .12}s forwards` : ''}`, i < 7)}"></span>`);
      el.innerHTML = rgBlocks(rods, [...old, ...fresh])
        + lessonEq('12 − 9 = <span class="hl">3</span>', 3.3) + lessonEq('5 tens − 2 tens = 3 tens → <span class="hl">33</span>', 4.4);
    }
  },
  {
    title: ['A smart trick: 62 − 29', '巧算：62 − 29'],
    text: ['29 is almost 30. Take away 30: 62 − 30 = 32. We took away 1 too many, so add 1 back: 33.',
      '29 差 1 就是 30。先减 30：62 − 30 = 32。多减了 1，再加回 1：33。'],
    art(el) {
      // the big jump back, then a zoomed-in line for the small jump forward
      el.innerHTML = lessonLine(30, 65, [[62, 32, .5]], 5) + `<div class="appear" style="width:100%;animation-delay:2s">${lessonLine(30, 36, [[32, 33, 2.4]])}</div>`
        + lessonEq('62 − 30 = 32, 32 + 1 = <span class="hl">33</span>', 3.6);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions are waiting, with tricky mistakes to catch and missing digits to find. After 10 questions you play a 60-second game. Ready?',
      '20 道题等着你：有要抓出来的错误，有要找的缺失数字。做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- number makers ----------
// two two-digit numbers to add, with (true) or without (false) a carry, sum below 100
function rgAdd(carry) {
  let a, b;
  do { a = ri(12, 78); b = ri(12, 78); } while (a + b > 99 || (a % 10 + b % 10 >= 10) !== carry || a % 10 === 0 || b % 10 === 0);
  return [a, b];
}
// a − b with two-digit b, answer at least 10, with (true) or without (false) breaking a ten
function rgSub(borrow) {
  let a, b;
  do { a = ri(30, 98); b = ri(11, a - 10); } while ((a % 10 < b % 10) !== borrow || b % 10 === 0);
  return [a, b];
}
const tens = n => Math.floor(n / 10), ones = n => n % 10;
const ORD = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

// ---------- questions ----------
const Q_REGROUP = [
  // 1 · type-in · add, no carry
  () => {
    const [a, b] = rgAdd(false);
    return cq({ pts: 3, input: true, answer: a + b,
      q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`], fig: colHTML(a, b, '+', '?'),
      hints: [[`Tens first: ${tens(a) * 10} + ${tens(b) * 10} = ${(tens(a) + tens(b)) * 10}.`, `先算十：${tens(a) * 10} + ${tens(b) * 10} = ${(tens(a) + tens(b)) * 10}。`], [`Then ones: ${ones(a)} + ${ones(b)} = ${ones(a) + ones(b)}. Put them together.`, `再算一：${ones(a)} + ${ones(b)} = ${ones(a) + ones(b)}，合起来。`]],
      explain: [`${(tens(a) + tens(b)) * 10} + ${ones(a) + ones(b)} = ${a + b}.`, `${(tens(a) + tens(b)) * 10} + ${ones(a) + ones(b)} = ${a + b}。`],
      tool: 'blocks', cfg: { nums: [a, b] } });
  },
  // 2 · choice · tens and too many ones
  () => {
    const t = ri(3, 7), o = ri(11, 16), ans = t * 10 + o;
    return cq({ pts: 3, ...numChoices(ans, [t * 100 + o, t * 10 + o % 10, t + o, ans + 10]),
      q: [`Which number is ${t} tens and ${o} ones?`, `${t} 个十和 ${o} 个一是多少？`],
      hints: [[`${o} ones = 1 ten and ${o - 10} ones.`, `${o} 个一 = 1 个十和 ${o - 10} 个一。`], [`So it is ${t + 1} tens and ${o - 10} ones.`, `所以一共是 ${t + 1} 个十和 ${o - 10} 个一。`]],
      explain: [`${t * 10} + ${o} = ${ans}. It is ${t + 1} tens and ${o - 10} ones.`, `${t * 10} + ${o} = ${ans}，就是 ${t + 1} 个十和 ${o - 10} 个一。`],
      tool: 'blocks', cfg: { parts: [[t, o]] }, lab: ['Count the tens and ones, then trade.', '数一数十和一，满 10 个一就换。'] });
  },
  // 3 · type-in · add with a carry
  () => {
    const [a, b] = rgAdd(true), s = ones(a) + ones(b);
    return cq({ pts: 3, input: true, answer: a + b,
      q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`], fig: colHTML(a, b, '+', '?'),
      hints: [[`Ones: ${ones(a)} + ${ones(b)} = ${s}. That is 1 ten and ${s - 10} ones.`, `个位：${ones(a)} + ${ones(b)} = ${s}，就是 1 个十和 ${s - 10} 个一。`], [`Tens: ${tens(a)} + ${tens(b)} + 1 = ${tens(a) + tens(b) + 1}.`, `十位：${tens(a)} + ${tens(b)} + 1 = ${tens(a) + tens(b) + 1}。`]],
      explain: [`Ones: ${s}, write ${s - 10}, carry 1. Tens: ${tens(a)} + ${tens(b)} + 1 = ${tens(a) + tens(b) + 1}. Answer ${a + b}.`, `个位 ${s}，写 ${s - 10} 进 1；十位 ${tens(a)} + ${tens(b)} + 1 = ${tens(a) + tens(b) + 1}。答案 ${a + b}。`],
      tool: 'blocks', cfg: { nums: [a, b] } });
  },
  // 4 · choice · carry story, wrong answers are the usual slips
  () => {
    const [a, b] = rgAdd(true), ans = a + b;
    return cq({ pts: 3, ...numChoices(ans, [ans - 10, (tens(a) + tens(b)) * 100 + ones(a) + ones(b), ans + 10, ans - 1]),
      q: [`In a hopping contest, Roo hops ${a} times and Joey hops ${b} times. How many hops in all?`, `跳跳比赛中，袋鼠跳了 ${a} 下，小袋鼠跳了 ${b} 下。一共跳了多少下？`],
      hints: [[`${ones(a)} + ${ones(b)} is more than 10. Don't forget the new ten!`, `${ones(a)} + ${ones(b)} 超过 10 了，别忘了进位！`], [`${tens(a) * 10} + ${tens(b) * 10} + ${ones(a) + ones(b)} = ?`, `${tens(a) * 10} + ${tens(b) * 10} + ${ones(a) + ones(b)} = ?`]],
      explain: [`${a} + ${b} = ${ans}. If you forgot to carry the 1, you got ${ans - 10}.`, `${a} + ${b} = ${ans}。如果忘了进位，就会算成 ${ans - 10}。`] });
  },
  // 5 · type-in · subtract, no breaking
  () => {
    const [a, b] = rgSub(false);
    return cq({ pts: 3, input: true, answer: a - b,
      q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`], fig: colHTML(a, b, '−', '?'),
      hints: [[`Ones: ${ones(a)} − ${ones(b)} = ${ones(a) - ones(b)}.`, `个位：${ones(a)} − ${ones(b)} = ${ones(a) - ones(b)}。`], [`Tens: ${tens(a)} − ${tens(b)} = ${tens(a) - tens(b)}.`, `十位：${tens(a)} − ${tens(b)} = ${tens(a) - tens(b)}。`]],
      explain: [`${tens(a) - tens(b)} tens and ${ones(a) - ones(b)} ones: ${a - b}.`, `${tens(a) - tens(b)} 个十和 ${ones(a) - ones(b)} 个一：${a - b}。`],
      tool: 'blocks', cfg: { take: a }, lab: ['Tap blocks to take them away. Break a ten if you need more ones.', '点积木把它拿走。一不够就拆一个十。'] });
  },
  // 6 · choice · catch the mistake
  () => {
    const [a, b] = rgSub(true), ans = a - b, slip = (tens(a) - tens(b)) * 10 + (ones(b) - ones(a));
    return cq({ pts: 3, ...numChoices(ans, [slip, ans + 10, ans - 10, ans + 1]),
      q: [`Max says ${a} − ${b} = ${slip}. Oops! What is the right answer?`, `Max 说 ${a} − ${b} = ${slip}。算错啦！正确答案是多少？`], fig: colHTML(a, b, '−', '?'),
      hints: [[`Max did ${ones(b)} − ${ones(a)} in the ones. But the top number is ${ones(a)}! Break a ten.`, `Max 在个位算了 ${ones(b)} − ${ones(a)}，可上面是 ${ones(a)}！要拆一个十。`], [`${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}, and ${tens(a) - 1} tens − ${tens(b)} tens.`, `${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}，再算 ${tens(a) - 1} 个十 − ${tens(b)} 个十。`]],
      explain: [`Break a ten: ${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}. Tens: ${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}. Answer ${ans}.`, `拆一个十：${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}；十位 ${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}。答案 ${ans}。`] });
  },
  // 7 · type-in · subtract, break a ten
  () => {
    const [a, b] = rgSub(true);
    return cq({ pts: 3, input: true, answer: a - b,
      q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`], fig: colHTML(a, b, '−', '?'),
      hints: [[`${ones(a)} is less than ${ones(b)}. Break a ten: ${ones(a) + 10} − ${ones(b)} = ?`, `${ones(a)} 比 ${ones(b)} 小，拆一个十：${ones(a) + 10} − ${ones(b)} = ?`], [`Tens: ${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}.`, `十位：${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}。`]],
      explain: [`${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}, ${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}. Answer ${a - b}.`, `${ones(a) + 10} − ${ones(b)} = ${ones(a) + 10 - ones(b)}，${tens(a) - 1} − ${tens(b)} = ${tens(a) - 1 - tens(b)}。答案 ${a - b}。`],
      tool: 'blocks', cfg: { take: a }, lab: ['Press “Break a ten”, then tap blocks to take them away.', '先按“拆一个十”，再点积木拿走。'] });
  },
  // 8 · choice · one missing digit
  () => {
    const [a, b] = rgAdd(true), s = a + b, oa = ones(a);
    const d = digitChoices(oa, [ones(b), ones(s), (oa + 1) % 10, (oa + 9) % 10]);
    return cq({ pts: 3, ...d,
      q: ['What digit goes in the box?', '方框里是几？'], fig: colHTML(`${tens(a)}?`, b, '+', s),
      hints: [[`Look at the ones: ? + ${ones(b)} ends in ${ones(s)}.`, `看个位：? + ${ones(b)} 的个位是 ${ones(s)}。`], [`? + ${ones(b)} = ${ones(s) + 10}`, `? + ${ones(b)} = ${ones(s) + 10}`]],
      explain: [`${oa} + ${ones(b)} = ${oa + ones(b)}, so the ones digit is ${ones(s)}. Check: ${a} + ${b} = ${s}.`, `${oa} + ${ones(b)} = ${oa + ones(b)}，个位是 ${ones(s)}。验算：${a} + ${b} = ${s}。`] });
  },
  // 9 · type-in · three numbers, friends first
  () => {
    const x = ri(1, 9), a = ri(1, 3) * 10 + x, c = ri(1, 3) * 10 + 10 - x, b = ri(11, 29);
    return cq({ pts: 3, input: true, answer: a + b + c,
      q: [`${a} + ${b} + ${c} = ?`, `${a} + ${b} + ${c} = ?`],
      hints: [['Which two numbers have ones that make 10?', '哪两个数的个位能凑成 10？'], [`${a} + ${c} = ${a + c}. Then add ${b}.`, `${a} + ${c} = ${a + c}，再加 ${b}。`]],
      explain: [`${a} + ${c} = ${a + c}, and ${a + c} + ${b} = ${a + b + c}.`, `${a} + ${c} = ${a + c}，${a + c} + ${b} = ${a + b + c}。`] });
  },
  // 10 · choice · closest to 60
  cq({ pts: 3, choices: ['28 + 29', '34 + 27', '19 + 36', '45 + 19', '27 + 39'], answer: 1,
    q: ['Which sum is closest to 60?', '哪个和最接近 60？'],
    hints: [['Work out each sum.', '把每个和都算出来。'], ['How far is each sum from 60?', '每个和离 60 差多少？']],
    explain: ['57 (3 away), 61 (1 away), 55 (5 away), 64 (4 away), 66 (6 away). 34 + 27 = 61 is closest.', '57（差 3）、61（差 1）、55（差 5）、64（差 4）、66（差 6）。34 + 27 = 61 最接近。'] }),
  // 11 · type-in · missing addend
  () => {
    const [a, b] = rgAdd(true), s = a + b, up = tens(a) * 10 + 10;
    return cq({ pts: 4, input: true, answer: b,
      q: [`${a} + ? = ${s}`, `${a} + ? = ${s}`],
      hints: [[`Jump from ${a} to the next ten: ${up}. That is ${up - a}.`, `从 ${a} 跳到整十 ${up}，跳了 ${up - a}。`], [`From ${up} to ${s} is ${s - up}. Add the jumps: ${up - a} + ${s - up}.`, `从 ${up} 到 ${s} 是 ${s - up}。把跳的加起来：${up - a} + ${s - up}。`]],
      explain: [`${up - a} + ${s - up} = ${b}. Check: ${a} + ${b} = ${s}.`, `${up - a} + ${s - up} = ${b}。验算：${a} + ${b} = ${s}。`],
      tool: 'jumper', cfg: { lo: tens(a) * 10, hi: tens(s) * 10 + 10, start: a, keys: [-1, 1, 10] } });
  },
  // 12 · choice · pages read
  () => {
    const [p, l] = rgSub(true), r = p - l;
    return cq({ pts: 4, ...numChoices(r, [p + l, r + 10, r - 10, l]),
      q: [`A book has ${p} pages. Roo has read some pages, and ${l} pages are left. How many pages has Roo read?`, `一本书有 ${p} 页。袋鼠读了一些，还剩 ${l} 页。袋鼠读了多少页？`],
      hints: [['Pages read + pages left = the whole book.', '读了的 + 剩下的 = 整本书。'], [`${p} − ${l} = ?`, `${p} − ${l} = ?`]],
      explain: [`${p} − ${l} = ${r}. Check: ${r} + ${l} = ${p}.`, `${p} − ${l} = ${r}。验算：${r} + ${l} = ${p}。`] });
  },
  // 13 · type-in · subtract a nearly-round number
  () => {
    const b = pick([19, 29, 39, 18, 28]), a = ri(b + 15, 95), r = tens(b) * 10 + 10, d = r - b;
    return cq({ pts: 4, input: true, answer: a - b,
      q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`],
      hints: [[`${b} is close to ${r}. Take away ${r} first: ${a} − ${r} = ${a - r}.`, `${b} 接近 ${r}，先减 ${r}：${a} − ${r} = ${a - r}。`], [`You took away ${d} too many. Add ${d} back.`, `多减了 ${d}，再加回 ${d}。`]],
      explain: [`${a} − ${r} = ${a - r}, ${a - r} + ${d} = ${a - b}.`, `${a} − ${r} = ${a - r}，${a - r} + ${d} = ${a - b}。`],
      tool: 'jumper', cfg: { lo: Math.max(0, tens(a - r) * 10), hi: tens(a) * 10 + 10, start: a, keys: [-10, -1, 1] } });
  },
  // 14 · choice · two missing digits
  () => {
    let A, oa, tb, B;
    do { A = ri(1, 6); oa = ri(2, 9); tb = ri(1, 7 - A); B = ri(1, 9); } while (oa + B < 10);
    const s = A * 10 + oa + tb * 10 + B, good = `A = ${A}, B = ${B}`, opts = new Set([good]);
    [[A + 1, B], [A - 1, B], [A, (B + 5) % 10], [A + 1, (B + 1) % 10], [A, (B + 1) % 10], [A - 1, (B + 9) % 10]].forEach(([x, y]) => { if (x >= 1 && opts.size < 5) opts.add(`A = ${x}, B = ${y}`); });
    const choices = shuffle([...opts]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: ['Each letter is a missing digit. What are A and B?', '每个字母代表一个缺失的数字。A 和 B 各是几？'], fig: colHTML(`A${oa}`, `${tb}B`, '+', s),
      hints: [[`Ones: ${oa} + B ends in ${ones(s)}. So ${oa} + B = ${ones(s) + 10}.`, `个位：${oa} + B 的个位是 ${ones(s)}，所以 ${oa} + B = ${ones(s) + 10}。`], [`There is a carry! Tens: A + ${tb} + 1 = ${tens(s)}.`, `有进位！十位：A + ${tb} + 1 = ${tens(s)}。`]],
      explain: [`B = ${B} because ${oa} + ${B} = ${oa + B}. A = ${A} because ${A} + ${tb} + 1 = ${tens(s)}. Check: ${A}${oa} + ${tb}${B} = ${s}.`, `B = ${B}，因为 ${oa} + ${B} = ${oa + B}；A = ${A}，因为 ${A} + ${tb} + 1 = ${tens(s)}。验算：${A}${oa} + ${tb}${B} = ${s}。`] });
  },
  // 15 · type-in · two steps
  () => {
    const h = ri(35, 69), g = ri(12, 29), give = ri(15, h + g - 12), ans = h + g - give;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Roo had ${h} stickers. Grandma gave him ${g} more. Then he gave ${give} to his friends. How many stickers does Roo have now?`, `袋鼠有 ${h} 张贴纸，奶奶又给了他 ${g} 张，然后他送给朋友 ${give} 张。现在袋鼠有多少张？`],
      hints: [[`Step 1: ${h} + ${g} = ?`, `第一步：${h} + ${g} = ?`], [`Step 2: ${h + g} − ${give} = ?`, `第二步：${h + g} − ${give} = ?`]],
      explain: [`${h} + ${g} = ${h + g}, then ${h + g} − ${give} = ${ans}.`, `${h} + ${g} = ${h + g}，${h + g} − ${give} = ${ans}。`] });
  },
  // 16 · choice · digit cards, biggest sum
  () => {
    const d = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4).sort((x, y) => y - x), ans = 10 * (d[0] + d[1]) + d[2] + d[3];
    return cq({ pts: 4, ...numChoices(ans, [d[0] * 10 + d[1] + d[2] * 10 + d[3], ans - 9, ans - 18, ans + 1]),
      q: [`Use the digit cards ${shuffle([...d]).join(', ')} once each to make two 2-digit numbers. What is the biggest sum you can get?`, `用数字卡片 ${shuffle([...d]).join('、')}（每张用一次）组成两个两位数。它们的和最大是多少？`],
      hints: [['Tens are worth more. Put the biggest digits in the tens places.', '十位更值钱，把最大的数字放在十位。'], [`Tens: ${d[0]} and ${d[1]}. Ones: ${d[2]} and ${d[3]}.`, `十位放 ${d[0]} 和 ${d[1]}，个位放 ${d[2]} 和 ${d[3]}。`]],
      explain: [`${d[0]}${d[2]} + ${d[1]}${d[3]} = ${ans}. (${d[0]}${d[3]} + ${d[1]}${d[2]} is the same.)`, `${d[0]}${d[2]} + ${d[1]}${d[3]} = ${ans}。（${d[0]}${d[3]} + ${d[1]}${d[2]} 也一样。）`] });
  },
  // 17 · type-in · count up for a small difference
  () => {
    let a, b;
    do { b = ri(31, 89); a = b + ri(3, 9); } while (ones(a) >= ones(b) || a > 99);
    return cq({ pts: 5, input: true, answer: a - b,
      q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`],
      hints: [['The two numbers are close. Count up from the smaller one!', '两个数很接近，从小的往上数！'], [`${b} → ${tens(a) * 10} is ${tens(a) * 10 - b}. ${tens(a) * 10} → ${a} is ${ones(a)}.`, `${b} → ${tens(a) * 10} 是 ${tens(a) * 10 - b}，${tens(a) * 10} → ${a} 是 ${ones(a)}。`]],
      explain: [`${tens(a) * 10 - b} + ${ones(a)} = ${a - b}.`, `${tens(a) * 10 - b} + ${ones(a)} = ${a - b}。`],
      tool: 'jumper', cfg: { lo: tens(b) * 10, hi: tens(a) * 10 + 10, start: b, keys: [-1, 1] } });
  },
  // 18 · choice · balance
  () => {
    let a, c, d;
    do { a = ri(31, 59); c = ri(2, 5) * 10; d = ri(21, 49); } while (c + d - a < 10);
    const ans = c + d - a;
    return cq({ pts: 5, ...numChoices(ans, [c + d, ans + 10, ans - 10, ans + 2]),
      q: [`The scale balances: ${a} + ? = ${c} + ${d}. What number is missing?`, `天平两边一样重：${a} + ? = ${c} + ${d}。缺的数是几？`],
      hints: [[`Work out the right side: ${c} + ${d} = ${c + d}.`, `先算右边：${c} + ${d} = ${c + d}。`], [`${a} + ? = ${c + d}. How far from ${a} to ${c + d}?`, `${a} + ? = ${c + d}，从 ${a} 到 ${c + d} 差多少？`]],
      explain: [`${c} + ${d} = ${c + d}, and ${c + d} − ${a} = ${ans}. Check: ${a} + ${ans} = ${c + d}.`, `${c} + ${d} = ${c + d}，${c + d} − ${a} = ${ans}。验算：${a} + ${ans} = ${c + d}。`] });
  },
  // 19 · type-in · counting back by 9s, 11s or 19s
  () => {
    const step = pick([9, 11, 19]), k = step === 19 ? pick([4, 5]) : pick([5, 6, 7]), list = rgMany(k, i => 100 - step * i);
    const how = step === 9 ? ['take away 10, then add 1', '先减 10，再加 1'] : step === 11 ? ['take away 10, then take away 1 more', '先减 10，再减 1'] : ['take away 20, then add 1', '先减 20，再加 1'];
    return cq({ pts: 5, input: true, answer: list[k - 1],
      q: [`Roo counts back by ${step}s from 100: 100, ${100 - step}, ${100 - 2 * step}, … What is the ${ORD[k]} number?`, `袋鼠从 100 开始，每次减 ${step}：100、${100 - step}、${100 - 2 * step}……第 ${k} 个数是几？`],
      hints: [[`To take away ${step}: ${how[0]}.`, `减 ${step}：${how[1]}。`], [`Write the list until you have ${k} numbers.`, `一直写，写够 ${k} 个数。`]],
      explain: [`${list.join(', ')}. The ${ORD[k]} number is ${list[k - 1]}.`, `${list.join('、')}，第 ${k} 个数是 ${list[k - 1]}。`] });
  },
  // 20 · choice · boss
  cq({ pts: 5, boss: true, ...numChoices(9, [8, 10, 18, 81]),
    q: ['Boss question! How many two-digit numbers have digits that add up to 9? (Like 27, because 2 + 7 = 9.)', 'Boss 题！有多少个两位数，它的两个数字加起来是 9？（比如 27，因为 2 + 7 = 9。）'],
    hints: [['Start with tens digit 1: 18. Then tens digit 2: 27. Keep going!', '十位是 1：18；十位是 2：27。继续往下写！'], ['Don\'t forget the tens digit 9. What ones digit makes 9 + ? = 9?', '别忘了十位是 9 的时候：9 + ? = 9。']],
    explain: ['18, 27, 36, 45, 54, 63, 72, 81, 90: there are 9 of them.', '18、27、36、45、54、63、72、81、90，一共 9 个。'] })
];

registerSeries({
  id: 'regroup', camp: true, breakEvery: 10, perRound: 20, games: ['jump', 'sprint'],
  tag: ['Add & Subtract Camp 2', '加减营 2'], name: ['Regrouping', '两位数进位退位'],
  desc: ['Tens and ones, carrying, breaking a ten, missing digits', '十和一、进位、退位、竖式填数'],
  lesson: LESSON_REGROUP,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_REGROUP
});
