// 加减营 1：凑十与心算 — Add & Subtract Camp 1. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.
// To add more questions, put them in Q_MAKE10. With perRound: 20 each round then draws 20 of them, kept in list order.

// ---------- mini-lesson drawings ----------
const RED = '#d6413f', BLUE = '#3a76b8', GOLD = '#f2b630';
// one ten-frame for the lesson; each cell is null or { c: color, cls, d: delay in seconds, x: delay for a ✕ }
const lessonFrame = cells => `<div class="tf">${cells.map(c => `<span class="tcell" style="position:relative">${c
  ? `<i class="ctr ${c.cls || ''}" style="--c:${c.c};${c.d != null ? `animation-delay:${c.d}s` : ''}"></i>${c.x != null
    ? `<b class="xmark fadein" style="animation-delay:${c.x}s">✕</b>` : ''}` : ''}</span>`).join('')}</div>`;
const fill = (n, c, extra = () => ({})) => Array.from({ length: 10 }, (_, i) => i < n ? { c, ...extra(i) } : null);

const LESSON_10 = [
  {
    title: ['10 is a magic number!', '10 是个魔法数！'],
    text: ['A ten-frame has 10 boxes. When every box is full, we have 10. Making 10 is the best trick for adding and taking away!',
      '十格框有 10 个格子，全部放满就是 10。凑成 10，是做加减法最厉害的小窍门！'],
    art(el) {
      el.innerHTML = lessonFrame(fill(10, GOLD, i => ({ cls: 'appear', d: .2 + i * .25 }))) + lessonEq('<span class="hl">10!</span>', 2.8);
      setTimeout(() => { if (el.isConnected) yay(2); }, 2800);
    }
  },
  {
    title: ['Best friends of 10', '10 的好朋友'],
    text: ['These pairs always make 10: 1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5. Hand trick: hold up 3 fingers. The fingers that are down are its friend, 7!',
      '这几对数加起来总是 10：1 和 9，2 和 8，3 和 7，4 和 6，5 和 5。手指小魔术：伸出 3 根手指，弯下去的手指就是它的好朋友 7！'],
    art(el) {
      el.innerHTML = `<div class="pairs">${[1, 2, 3, 4, 5].map((a, i) => `<div class="appear" style="animation-delay:${.3 + i * .5}s">
        <b>${a} + ${10 - a}</b><span class="dotbar">${'<i style="background:' + RED + '"></i>'.repeat(a)}${'<i style="background:' + BLUE + '"></i>'.repeat(10 - a)}</span></div>`).join('')}</div>`;
    }
  },
  {
    title: ['Make 10 to add: 8 + 5', '凑十法做加法：8 + 5'],
    text: ['8 needs 2 more to make 10. Take 2 from the 5. Now we have 10 and 3 left: 10 + 3 = 13.',
      '8 再要 2 个就是 10。从 5 里拿 2 个给 8，就变成 10 和 3：10 + 3 = 13。'],
    art(el) {
      const f1 = fill(8, RED).map((c, i) => c || { c: BLUE, cls: 'fly' });
      const f2 = fill(5, BLUE).map((c, i) => c && i < 2 ? { ...c, cls: 'src' } : c);
      el.innerHTML = `<div class="tfs">${lessonFrame(f1)}${lessonFrame(f2)}</div>
        ${lessonEq('8 + 5', 0)}${lessonEq('8 + <span class="hl">2</span> + 3', 1.3)}${lessonEq('= 10 + 3 = <span class="hl">13</span>', 3)}`;
      const fl = el.querySelectorAll('.fly'), sr = el.querySelectorAll('.src');
      fl.forEach((f, i) => {
        if (reduce) { sr[i].style.opacity = 0; return; }
        const a = sr[i].getBoundingClientRect(), b = f.getBoundingClientRect(), at = 1500 + i * 300;
        f.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)` }, { transform: 'none' }], { duration: 800, delay: at, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'backwards' });
        sr[i].animate([{ opacity: 1 }, { opacity: 0 }], { duration: 10, delay: at, fill: 'forwards' });
      });
    }
  },
  {
    title: ['Jump to the next ten: 28 + 7', '先跳到整十：28 + 7'],
    text: ['From 28, jump 2 to land on 30. 7 is 2 and 5, so jump 5 more: 30 + 5 = 35.',
      '从 28 跳 2 步到 30。7 可以分成 2 和 5，再跳 5 步：30 + 5 = 35。'],
    art(el) {
      const lo = 25, hi = 40, W = 600, x = n => 20 + (n - lo) * (W - 40) / (hi - lo);
      let s = `<line x1="${x(lo)}" y1="80" x2="${x(hi)}" y2="80" stroke="#5d6b7c" stroke-width="2"/>`;
      for (let n = lo; n <= hi; n++) {
        const big = n === 28 || n === 30 || n === 35;
        s += `<line x1="${x(n)}" y1="${n % 10 ? 74 : 68}" x2="${x(n)}" y2="86" stroke="${n % 10 ? '#8b98a8' : '#c8742c'}" stroke-width="${n % 10 ? 1 : 3}"/>
          <text x="${x(n)}" y="104" text-anchor="middle" font-size="${big ? 18 : 12}" font-weight="${big ? 800 : 500}" fill="${big ? '#c8742c' : '#5d6b7c'}">${n}</text>`;
      }
      const arc = (a, b, d, lab) => `<path class="drawpath" pathLength="1" style="animation-delay:${d}s" d="M${x(a)} 78 Q${(x(a) + x(b)) / 2} 20 ${x(b)} 78" fill="none" stroke="#2f8f6b" stroke-width="3"/>
        <text class="fadein" style="animation-delay:${d + .5}s" x="${(x(a) + x(b)) / 2}" y="40" text-anchor="middle" font-size="20" font-weight="800" fill="#2f8f6b">${lab}</text>`;
      const roo = (n, cls, d) => `<svg class="${cls}" style="animation-delay:${d}s" x="${x(n) - 20}" y="34" width="40" height="40" viewBox="0 0 64 64"><use href="#roo"/></svg>`;
      el.innerHTML = `<svg viewBox="0 0 ${W} 112" style="width:100%;max-width:600px;display:block">${s}${arc(28, 30, .6, '+2')}${arc(30, 35, 1.9, '+5')}${roo(28, 'fadeout', 2.9)}${roo(35, 'fadein', 2.9)}</svg>
        ${lessonEq('28 + 7 = 28 + <span class="hl">2</span> + 5 = 30 + 5 = <span class="hl">35</span>', 3.1)}`;
    }
  },
  {
    title: ['Take away through 10: 15 − 7', '退到 10 再减：15 − 7'],
    text: ['Take away 5 first to get to 10. 7 is 5 and 2, so take away 2 more: 10 − 2 = 8.',
      '先减 5，正好剩 10。7 可以分成 5 和 2，再减 2：10 − 2 = 8。'],
    art(el) {
      const f1 = fill(10, RED, i => i >= 8 ? { cls: 'dim', d: 2.9 + (9 - i) * .4, x: 2.9 + (9 - i) * .4 } : {});
      const f2 = fill(5, RED, i => ({ cls: 'dim', d: .6 + (4 - i) * .3, x: .6 + (4 - i) * .3 }));
      el.innerHTML = `<div class="tfs">${lessonFrame(f1)}${lessonFrame(f2)}</div>
        ${lessonEq('15 − <span class="hl">5</span> = 10', 2.2)}${lessonEq('10 − <span class="hl">2</span> = 8', 3.9)}`;
    }
  },
  {
    title: ['Find the friends first: 6 + 7 + 4 + 3', '先找好朋友：6 + 7 + 4 + 3'],
    text: ['Look for numbers that make 10. 6 and 4 make 10. 7 and 3 make 10. 10 + 10 = 20. So easy!',
      '先找能凑成 10 的数：6 和 4 是 10，7 和 3 也是 10。10 + 10 = 20，太简单啦！'],
    art(el) {
      el.innerHTML = `<div class="chips">${[[6, 'a'], [7, 'b'], [4, 'a'], [3, 'b']].map(([n, c], i) => `<span class="chip appear ${c}" style="animation-delay:${.2 + i * .3}s">${n}</span>`).join('')}</div>
        ${lessonEq('<span style="color:#c8742c">6 + 4 = 10</span>', 1.6)}${lessonEq('<span style="color:#3a76b8">7 + 3 = 10</span>', 2.4)}${lessonEq('10 + 10 = <span class="hl">20</span>', 3.2)}`;
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions are waiting. Some you pick, some you type. After 10 questions you play a 60-second game. The last one is a Boss question. Ready?',
      '一共 20 道题，有选择题，也有输入题。做完 10 题玩一次 60 秒小游戏，最后一题是 Boss 题。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const take = t => ({ tool: 'tenframe', cfg: { frames: 2, mode: 'take', groups: [{ n: 10, c: 'balloon' }, { n: t - 10, c: 'balloon', frame: 1 }] } });
const make = (a, b) => ({ tool: 'tenframe', cfg: { frames: 2, make10: true, groups: [{ n: a, c: 'berry' }, { n: b, c: 'blue', frame: 1 }] },
  lab: ['Press “Make 10” to slide counters into the first frame.', '按“凑成 10”，把圆片挪进第一个框。'] });

const Q_MAKE10 = [
  // 1 · type-in · friends of 10
  () => {
    const a = ri(1, 9);
    return cq({ pts: 3, input: true, answer: 10 - a,
      q: [`Captain Roo has ${a} gold coins. The treasure box holds 10. How many more coins fill it up?  ${a} + ? = 10`, `罗船长有 ${a} 枚金币，宝箱正好装 10 枚。还要几枚才能装满？${a} + ? = 10`],
      hints: [['Tap the empty boxes in the ten-frame and count them.', '在十格框里点空格子，数一数。'], [`Which number is the best friend of ${a}?`, `${a} 和几是 10 的好朋友？`]],
      explain: [`${a} + ${10 - a} = 10. ${a} and ${10 - a} are friends of 10.`, `${a} + ${10 - a} = 10，${a} 和 ${10 - a} 是 10 的好朋友。`],
      tool: 'tenframe', cfg: { groups: [{ n: a, c: 'star' }] } });
  },
  // 2 · choice · which pair makes 10
  () => {
    const a = ri(1, 9), good = `${a} + ${10 - a}`, bad = new Map();
    while (bad.size < 4) { const x = ri(1, 9), y = ri(1, 9); if (x + y !== 10 && Math.abs(x + y - 10) <= 2) bad.set(`${x} + ${y}`, x + y); }
    const choices = shuffle([good, ...bad.keys()]);
    const others = [...bad].map(([s, v]) => `${s} = ${v}`).join(', ');
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: ['Pop the right bubble! Which two numbers make 10?', '戳对泡泡！哪两个数加起来是 10？'],
      hints: [['Work out each pair. Only one is exactly 10.', '每一对都算一算，只有一对正好是 10。'], ['Friends of 10: 1+9, 2+8, 3+7, 4+6, 5+5.', '10 的好朋友：1+9、2+8、3+7、4+6、5+5。']],
      explain: [`${good} = 10. The others: ${others}.`, `${good} = 10。其他的：${others}。`] });
  },
  // 3 · type-in · make 10 to add
  () => {
    const a = ri(7, 9), b = ri(Math.max(3, 11 - a), 9), m = 10 - a;
    return cq({ pts: 3, input: true, answer: a + b,
      q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`],
      hints: [[`${a} needs ${m} more to make 10. Take ${m} from the ${b}.`, `${a} 再要 ${m} 个就是 10，从 ${b} 里拿 ${m} 个。`], [`10 + ${b - m} = ?`, `10 + ${b - m} = ?`]],
      explain: [`${a} + ${m} = 10, and ${b} − ${m} = ${b - m} is left. 10 + ${b - m} = ${a + b}.`, `${a} + ${m} = 10，${b} 还剩 ${b - m}。10 + ${b - m} = ${a + b}。`],
      ...make(a, b) });
  },
  // 4 · choice · take away through 10 (story)
  () => {
    const t = ri(11, 17), b = ri(t - 9, 9), ans = t - b, first = t - 10;
    return cq({ pts: 3, ...numChoices(ans, [t + b, ans + 1, 10 - b, ans - 1]),
      q: [`There are ${t} parrots on the pirate ship. ${b} parrots fly away. How many parrots are still on the ship?`, `海盗船上有 ${t} 只鹦鹉，飞走了 ${b} 只。船上还剩几只？`],
      hints: [[`First let ${first} fly away. That leaves exactly 10.`, `先飞走 ${first} 只，正好剩 10 只。`], [`Then ${b - first} more fly away: 10 − ${b - first} = ?`, `再飞走 ${b - first} 只：10 − ${b - first} = ?`]],
      explain: [`${t} − ${first} = 10, then 10 − ${b - first} = ${ans}.`, `${t} − ${first} = 10，10 − ${b - first} = ${ans}。`],
      ...take(t), lab: ['Tap a counter to make that parrot fly away.', '点圆片，让那只鹦鹉飞走。'] });
  },
  // 5 · type-in · adding and taking whole tens
  () => {
    const add = Math.random() < .5, a = add ? ri(1, 8) : ri(3, 9), b = add ? ri(1, 9 - a) : ri(1, a - 1);
    const op = add ? '+' : '−', ans = add ? (a + b) * 10 : (a - b) * 10, word = add ? ['finds', '又找到'] : ['spends', '花掉'];
    return cq({ pts: 3, input: true, answer: ans,
      q: [`Roo has ${a * 10} coins and ${word[0]} ${b * 10}. ${a * 10} ${op} ${b * 10} = ?`, `袋鼠有 ${a * 10} 枚金币，${word[1]} ${b * 10} 枚。${a * 10} ${op} ${b * 10} = ?`],
      hints: [[`Think in tens: ${a} tens ${op} ${b} tens.`, `按“几个十”来想：${a} 个十 ${op} ${b} 个十。`], [`${a} ${op} ${b} = ${add ? a + b : a - b}, so how many tens?`, `${a} ${op} ${b} = ${add ? a + b : a - b}，那是几个十？`]],
      explain: [`${a} tens ${op} ${b} tens = ${ans / 10} tens = ${ans}.`, `${a} 个十 ${op} ${b} 个十 = ${ans / 10} 个十 = ${ans}。`],
      tool: 'jumper', cfg: { lo: 0, hi: 100, start: a * 10, keys: [-10, 10] } });
  },
  // 6 · choice · 9 + 7 = 10 + ?
  () => {
    const a = pick([8, 9]), b = ri(11 - a, 9), ans = a + b - 10;
    return cq({ pts: 3, ...numChoices(ans, [b, 10 - a, ans + 1, b - 1]),
      q: [`${a} + ${b} is the same as 10 + ?`, `${a} + ${b} 和 10 + 几一样大？`],
      hints: [[`Give ${10 - a} from the ${b} to the ${a}.`, `从 ${b} 里拿 ${10 - a} 给 ${a}。`], [`What is left of the ${b}? ${b} − ${10 - a} = ?`, `${b} 还剩几？${b} − ${10 - a} = ?`]],
      explain: [`${a} + ${10 - a} = 10 and ${b} − ${10 - a} = ${ans}, so ${a} + ${b} = 10 + ${ans} = ${a + b}.`, `${a} + ${10 - a} = 10，${b} − ${10 - a} = ${ans}，所以 ${a} + ${b} = 10 + ${ans} = ${a + b}。`],
      ...make(a, b) });
  },
  // 7 · type-in · take away through 10
  () => {
    const t = ri(11, 18), b = ri(t - 9, 9), first = t - 10;
    return cq({ pts: 3, input: true, answer: t - b,
      q: [`${t} − ${b} = ?`, `${t} − ${b} = ?`],
      hints: [[`Take away ${first} first to get to 10.`, `先减 ${first}，得到 10。`], [`${b} is ${first} and ${b - first}. Now 10 − ${b - first} = ?`, `${b} 分成 ${first} 和 ${b - first}，再算 10 − ${b - first} = ?`]],
      explain: [`${t} − ${first} = 10, then 10 − ${b - first} = ${t - b}.`, `${t} − ${first} = 10，10 − ${b - first} = ${t - b}。`],
      ...take(t), lab: ['Tap counters to take them away.', '点圆片把它拿走。'] });
  },
  // 8 · choice · which one is NOT 10
  () => {
    const a = pick([1, 2, 3, 4, 6, 7, 8, 9]), b = ri(1, 9), c = ri(1, 4), d = ri(1, 4);   // a ≠ 5: '5 + 5' is already a choice
    const tens = shuffle([`${a} + ${10 - a}`, `${10 + b} − ${b}`, `${c} + ${d} + ${10 - c - d}`, '20 − 10', '5 + 5']).slice(0, 4);
    const x = ri(2, 8), y = ri(1, 6);
    const [odd, val] = pick([[`${x} + ${11 - x}`, 11], [`${x} + ${9 - x}`, 9], [`${12 + y} − ${y + 1}`, 11], [`${c} + ${d} + ${11 - c - d}`, 11]]);
    const choices = shuffle([...tens, odd]);
    return cq({ pts: 3, choices, answer: choices.indexOf(odd),
      q: ['Four of these make 10. Which one does NOT make 10?', '下面有四个等于 10。哪一个不等于 10？'],
      hints: [['Work out every one. Cross out the ones that are 10.', '每个都算一算，把等于 10 的划掉。'], ['Use the friends of 10 to check fast.', '用 10 的好朋友来快速检查。']],
      explain: [`${odd} = ${val}, not 10. All the others make 10.`, `${odd} = ${val}，不是 10，其他的都等于 10。`] });
  },
  // 9 · type-in · up to the next ten
  () => {
    const n = ri(2, 8) * 10 + ri(1, 9), o = n % 10, up = n - o + 10;
    return cq({ pts: 3, input: true, answer: 10 - o,
      q: [`Roo is on step ${n}. How many hops to the next ten?  ${n} + ? = ${up}`, `袋鼠在第 ${n} 格，还要跳几格到下一个整十？${n} + ? = ${up}`],
      hints: [[`Look at the ones digit: ${o}.`, `看个位：${o}。`], [`${o} + ? = 10`, `${o} + ? = 10`]],
      explain: [`${o} + ${10 - o} = 10, so ${n} + ${10 - o} = ${up}.`, `${o} + ${10 - o} = 10，所以 ${n} + ${10 - o} = ${up}。`],
      tool: 'jumper', cfg: { lo: n - o, hi: up + 5, start: n, keys: [-1, 1] } });
  },
  // 10 · choice · how many at first (missing start)
  () => {
    const b = ri(5, 9), c = ri(Math.max(4, 11 - b), 9), ans = b + c;
    return cq({ pts: 3, ...numChoices(ans, [Math.abs(c - b) || ans - 2, ans + 1, ans - 1, ans + 10]),
      q: [`Joey had some shells. He gave ${b} shells to his sister. Now he has ${c} left. How many shells did Joey have at first?`, `小袋鼠有一些贝壳，送给妹妹 ${b} 个，自己还剩 ${c} 个。他原来有几个贝壳？`],
      hints: [['Put the shells back together: the ones he gave + the ones left.', '把送出去的和剩下的合起来。'], [`${c} + ${b} = ?  Make 10 first!`, `${c} + ${b} = ?  先凑十！`]],
      explain: [`At first = given away + left = ${b} + ${c} = ${ans}. Check: ${ans} − ${b} = ${c}.`, `原来 = 送出 + 剩下 = ${b} + ${c} = ${ans}。验算：${ans} − ${b} = ${c}。`] });
  },
  // 11 · type-in · two-digit + one-digit across a ten
  () => {
    const t = ri(1, 7) * 10, o = ri(4, 9), n = t + o, k = ri(11 - o, 9), m = 10 - o;
    return cq({ pts: 4, input: true, answer: n + k,
      q: [`${n} + ${k} = ?`, `${n} + ${k} = ?`],
      hints: [[`Jump ${m} to reach ${t + 10}.`, `先跳 ${m} 到 ${t + 10}。`], [`Then jump ${k - m} more: ${t + 10} + ${k - m} = ?`, `再跳 ${k - m}：${t + 10} + ${k - m} = ?`]],
      explain: [`${n} + ${m} = ${t + 10}, then ${t + 10} + ${k - m} = ${n + k}.`, `${n} + ${m} = ${t + 10}，${t + 10} + ${k - m} = ${n + k}。`],
      tool: 'jumper', cfg: { lo: t, hi: t + 20, start: n, keys: [-1, 1, 10] } });
  },
  // 12 · choice · 1 + 2 + … + 9
  cq({ pts: 4, ...numChoices(45, [40, 44, 46, 50]),
    q: ['Roo writes 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9. What is the total?', '袋鼠写出 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9，一共是多少？'],
    hints: [['Pair them up: 1 with 9, 2 with 8, …', '配对：1 和 9，2 和 8……'], ['Four pairs of 10, and one number has no partner.', '有四对 10，还有一个数没有搭档。']],
    explain: ['(1+9) + (2+8) + (3+7) + (4+6) = 40, and 5 is left: 40 + 5 = 45.', '(1+9) + (2+8) + (3+7) + (4+6) = 40，还剩 5：40 + 5 = 45。'] }),
  // 13 · type-in · two-digit − one-digit across a ten
  () => {
    const t = ri(2, 9) * 10, o = ri(1, 5), n = t + o, k = ri(o + 1, 9);
    return cq({ pts: 4, input: true, answer: n - k,
      q: [`${n} − ${k} = ?`, `${n} − ${k} = ?`],
      hints: [[`Jump back ${o} to reach ${t}.`, `先往回跳 ${o} 到 ${t}。`], [`Then jump back ${k - o} more: ${t} − ${k - o} = ?`, `再往回跳 ${k - o}：${t} − ${k - o} = ?`]],
      explain: [`${n} − ${o} = ${t}, then ${t} − ${k - o} = ${n - k}.`, `${n} − ${o} = ${t}，${t} − ${k - o} = ${n - k}。`],
      tool: 'jumper', cfg: { lo: t - 10, hi: t + 10, start: n, keys: [-10, -1, 1] } });
  },
  // 14 · choice · add five bags, friends first
  () => {
    let x = ri(1, 9), y;
    do { y = ri(1, 9); } while (y === x || y === 10 - x);
    const z = ri(1, 9), bags = [x, y, 10 - x, 10 - y, z], ans = 20 + z;
    return cq({ pts: 4, ...numChoices(ans, [ans - 1, ans + 1, ans + 10, ans - 10]),
      q: [`Five treasure bags have ${bags.join(', ')} coins. How many coins in all?`, `五个宝袋里分别有 ${bags.join('、')} 枚金币，一共有多少枚？`],
      hints: [['Find two bags that make 10. Then find two more.', '先找两个凑成 10 的袋子，再找另外两个。'], [`${x} + ${10 - x} = 10 and ${y} + ${10 - y} = 10.`, `${x} + ${10 - x} = 10，${y} + ${10 - y} = 10。`]],
      explain: [`(${x} + ${10 - x}) + (${y} + ${10 - y}) + ${z} = 10 + 10 + ${z} = ${ans}.`, `(${x} + ${10 - x}) + (${y} + ${10 - y}) + ${z} = 10 + 10 + ${z} = ${ans}。`] });
  },
  // 15 · type-in · up to 100
  () => {
    const n = ri(2, 8) * 10 + ri(1, 9), up = n - n % 10 + 10;
    return cq({ pts: 4, input: true, answer: 100 - n,
      q: [`The treasure map says: the gold is at step 100. Roo is at step ${n}. How many more steps?  ${n} + ? = 100`, `藏宝图上写着：金子在第 100 步。袋鼠在第 ${n} 步，还要走几步？${n} + ? = 100`],
      hints: [[`First jump to the next ten: ${n} + ${up - n} = ${up}.`, `先跳到下一个整十：${n} + ${up - n} = ${up}。`], [`From ${up} to 100 is ${100 - up}. Add the two jumps.`, `从 ${up} 到 100 是 ${100 - up}，把两次跳的加起来。`]],
      explain: [`${up - n} + ${100 - up} = ${100 - n}. Check: ${n} + ${100 - n} = 100.`, `${up - n} + ${100 - up} = ${100 - n}。验算：${n} + ${100 - n} = 100。`],
      tool: 'jumper', cfg: { lo: n - n % 10, hi: 100, start: n, keys: [-1, 1, 10] } });
  },
  // 16 · choice · together and more than
  () => {
    const ben = ri(4, 9), d = pick([2, 4, 6]), ann = ben + d, total = ben + ann;
    return cq({ pts: 4, ...numChoices(ben, [ann, total - d, total / 2, ben + 1]),
      q: [`Ann and Ben have ${total} stickers together. Ann has ${d} more than Ben. How many stickers does Ben have?`, `Ann 和 Ben 一共有 ${total} 张贴纸，Ann 比 Ben 多 ${d} 张。Ben 有几张？`],
      hints: [[`Ann has ${d} extra. Take them away first: ${total} − ${d} = ${total - d}.`, `Ann 多出 ${d} 张，先拿掉：${total} − ${d} = ${total - d}。`], [`Now they have the same. Which number + itself = ${total - d}?`, `现在两人一样多。几加几（同一个数）等于 ${total - d}？`]],
      explain: [`${total} − ${d} = ${total - d}, and ${ben} + ${ben} = ${total - d}. Ben has ${ben}, Ann has ${ann}. Check: ${ben} + ${ann} = ${total}.`, `${total} − ${d} = ${total - d}，${ben} + ${ben} = ${total - d}。Ben 有 ${ben} 张，Ann 有 ${ann} 张。验算：${ben} + ${ann} = ${total}。`] });
  },
  // 17 · type-in · add a nearly-round number
  () => {
    const a = pick([19, 29, 39, 49, 59, 98, 99]), r = a >= 98 ? 100 : a + 1, d = r - a, b = ri(12, 45);
    return cq({ pts: 5, input: true, answer: a + b,
      q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`],
      hints: [[`${a} is close to ${r}. It is ${d} less.`, `${a} 接近 ${r}，比 ${r} 少 ${d}。`], [`${r} + ${b} = ${r + b}. Now take away ${d}.`, `${r} + ${b} = ${r + b}，再减去 ${d}。`]],
      explain: [`${r} + ${b} = ${r + b}, and ${r + b} − ${d} = ${a + b}.`, `${r} + ${b} = ${r + b}，${r + b} − ${d} = ${a + b}。`] });
  },
  // 18 · choice · biggest sum
  cq({ pts: 5, choices: ['19 + 21', '18 + 23', '25 + 14', '30 + 9', '17 + 20'], answer: 1,
    q: ['Which sum is the biggest?', '哪一个和最大？'],
    hints: [['Use make-10 tricks: 19 + 21 = 20 + 20.', '用凑十：19 + 21 = 20 + 20。'], ['Work out every sum, then compare.', '把每个和都算出来再比较。']],
    explain: ['19 + 21 = 40, 18 + 23 = 41, 25 + 14 = 39, 30 + 9 = 39, 17 + 20 = 37. The biggest is 41.', '19 + 21 = 40，18 + 23 = 41，25 + 14 = 39，30 + 9 = 39，17 + 20 = 37。最大的是 41。'] }),
  // 19 · type-in · friends of 20
  () => {
    const a = ri(11, 18), b = ri(4, 9), c = 20 - a;
    return cq({ pts: 5, input: true, answer: 20 + b,
      q: [`Roo collects ${a} shells on Monday, ${b} on Tuesday and ${c} on Wednesday. How many shells in all?`, `袋鼠星期一捡了 ${a} 个贝壳，星期二 ${b} 个，星期三 ${c} 个。一共多少个？`],
      hints: [['Which two numbers make 20?', '哪两个数凑成 20？'], [`${a} + ${c} = 20. Then add ${b}.`, `${a} + ${c} = 20，再加 ${b}。`]],
      explain: [`${a} + ${c} = 20, and 20 + ${b} = ${20 + b}.`, `${a} + ${c} = 20，20 + ${b} = ${20 + b}。`] });
  },
  // 20 · choice · boss
  cq({ pts: 5, boss: true, ...numChoices(9, [8, 10, 18, 19]),
    q: ['Boss question! Cards numbered 1 to 19 are on the table. Roo picks up pairs of cards that add up to 20. How many pairs can Roo make?', 'Boss 题！桌上有写着 1 到 19 的卡片。袋鼠每次拿走两张加起来是 20 的卡片。最多能拿走几对？'],
    hints: [['1 goes with 19, 2 goes with 18, …', '1 配 19，2 配 18……'], ['Which card has no partner? (What + itself = 20?)', '哪张卡片找不到搭档？（几加自己等于 20？）']],
    explain: ['1+19, 2+18, 3+17, 4+16, 5+15, 6+14, 7+13, 8+12, 9+11: that is 9 pairs. Card 10 has no partner, because there is only one 10.', '1+19、2+18、3+17、4+16、5+15、6+14、7+13、8+12、9+11，一共 9 对。10 找不到搭档，因为只有一张 10。'] })
];

registerSeries({
  id: 'make10', camp: true, breakEvery: 10, perRound: 20, games: ['bubbles', 'sprint'],
  tag: ['Add & Subtract Camp 1', '加减营 1'], name: ['Make 10 & Mental Math', '凑十与心算'],
  desc: ['Friends of 10, making tens, jumping to the next ten', '10 的好朋友、凑十法、跳到整十'],
  lesson: LESSON_10,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_MAKE10
});
