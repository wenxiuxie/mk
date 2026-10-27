// 加减营 3：三位数加减与估算 — Add & Subtract Camp 3. 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.
// To add more questions, put them in Q_THREEDIGIT. With perRound: 20 each round then draws 20 of them, kept in list order.

// ---------- digits and number makers ----------
const tdH = n => Math.floor(n / 100), tdT = n => Math.floor(n / 10) % 10, tdO = n => n % 10;
const round10 = n => Math.round(n / 10) * 10, round100 = n => Math.round(n / 100) * 100;
// a + b below 1000, with or without a carry out of the ones (c1) and out of the tens (c2)
function tdAdd(c1, c2) {
  let a, b;
  do { a = ri(101, 799); b = ri(101, 799); }
  while (a + b > 999 || (tdO(a) + tdO(b) >= 10) !== c1 || (tdT(a) + tdT(b) + (c1 ? 1 : 0) >= 10) !== c2 || !tdO(a) || !tdO(b));
  return [a, b];
}
// a − b with a three-digit b, breaking a ten (b1) and/or a hundred (b2), answer at least 100
function tdSub(b1, b2) {
  let a, b;
  do { a = ri(300, 999); b = ri(101, a - 100); }
  while ((tdO(a) < tdO(b)) !== b1 || (tdT(a) - (b1 ? 1 : 0) < tdT(b)) !== b2 || !tdO(b));
  return [a, b];
}

// ---------- mini-lesson drawings ----------
const tdFlat = (cls = '', d = 0) => `<span class="flat ${cls}" style="animation-delay:${d}s">${'<i></i>'.repeat(100)}</span>`;
const tdRod = (cls = '', d = 0) => `<span class="rod ${cls}" style="--c:#3a76b8;animation-delay:${d}s">${'<i></i>'.repeat(10)}</span>`;
const tdCube = (cls = '', d = 0) => `<span class="cube ${cls}" style="--c:#2f8f6b;animation-delay:${d}s"></span>`;
const tdMany = (n, f) => Array.from({ length: n }, (_, i) => f(i));
// a column sum with carries over the top: rows of digit strings, carry = { column index: [digit, delay] }, result digits with delays
const tdCol = (a, b, op, res, carry = {}) => `<div class="colsum">
  <div class="carry"><span class="op"></span>${[0, 1, 2].map(i => `<span class="d">${carry[i] ? `<b class="fadein" style="animation-delay:${carry[i][1]}s">${carry[i][0]}</b>` : ''}</span>`).join('')}</div>
  <div><span class="op"></span>${String(a).split('').map(d => `<span class="d">${d}</span>`).join('')}</div>
  <div><span class="op">${op}</span>${String(b).split('').map(d => `<span class="d">${d}</span>`).join('')}</div><div class="bar"></div>
  <div><span class="op"></span>${res.map(([d, t]) => `<span class="d fadein" style="animation-delay:${t}s">${d}</span>`).join('')}</div></div>`;

const LESSON_THREEDIGIT = [
  {
    title: ['Hundreds, tens and ones: 345', '百、十、一：345'],
    text: ['A big square is 100. A stick is 10. A little cube is 1. 345 is 3 hundreds, 4 tens and 5 ones: 300 + 40 + 5.',
      '一个大方块是 100，一根小棒是 10，一个小方块是 1。345 是 3 个百、4 个十和 5 个一：300 + 40 + 5。'],
    art(el) {
      el.innerHTML = `<div class="b10">${tdMany(3, i => tdFlat('appear', .2 + i * .3)).join('')}<div class="rods" style="min-height:0">${tdMany(4, i => tdRod('appear', 1.3 + i * .2)).join('')}</div>
        <div class="cubes" style="min-height:0">${tdMany(5, i => tdCube('appear', 2.2 + i * .12)).join('')}</div></div>`
        + lessonEq('345 = <span class="hl">300</span> + <span class="hl">40</span> + <span class="hl">5</span>', 3);
    }
  },
  {
    title: ['Column addition with two carries: 345 + 278', '两次进位：345 + 278'],
    text: ['Ones: 5 + 8 = 13, write 3, carry 1. Tens: 4 + 7 + 1 = 12, write 2, carry 1. Hundreds: 3 + 2 + 1 = 6. The answer is 623.',
      '个位：5 + 8 = 13，写 3 进 1。十位：4 + 7 + 1 = 12，写 2 进 1。百位：3 + 2 + 1 = 6。答案是 623。'],
    art(el) {
      el.innerHTML = tdCol(345, 278, '+', [[6, 3.4], [2, 2.2], [3, 1]], { 1: [1, 1.3], 0: [1, 2.5] })
        + lessonEq('5 + 8 = 1<span class="hl">3</span>', .5) + lessonEq('4 + 7 + 1 = 1<span class="hl">2</span>', 1.8) + lessonEq('3 + 2 + 1 = <span class="hl">6</span>', 3);
    }
  },
  {
    title: ['Subtract across zeros: 400 − 167', '连续退位：400 − 167'],
    text: ['400 has no tens and no ones to take from. Trick: 400 is 399 + 1. Work out 399 − 167 = 232 with no breaking at all. Then add the 1 back: 233.',
      '400 的十位和个位都是 0，没法直接减。小窍门：400 = 399 + 1。先算 399 − 167 = 232，一次退位都不用！再把 1 加回来：233。'],
    art(el) {
      el.innerHTML = lessonEq('400 = <span class="hl">399</span> + 1', .3) + tdCol(399, 167, '−', [[2, 2.2], [3, 1.8], [2, 1.4]])
        + lessonEq('232 + 1 = <span class="hl">233</span>', 2.8);
    }
  },
  {
    title: ['Round to the nearest ten: 347', '四舍五入到十：347'],
    text: ['347 is between 340 and 350. It is closer to 350, so 347 rounds to 350. If the ones digit is 5 or more, round up. If it is 4 or less, round down.',
      '347 在 340 和 350 之间，离 350 更近，所以约等于 350。个位是 5 或更大就往上，4 或更小就往下（四舍五入）。'],
    art(el) {
      el.innerHTML = lessonLine(340, 350, [[347, 350, .6]]) + lessonEq('347 ≈ <span class="hl">350</span>', 1.9)
        + lessonEq(TI('0 1 2 3 4 → down　5 6 7 8 9 → up', '0 1 2 3 4 → 舍　5 6 7 8 9 → 入'), 2.6);
    }
  },
  {
    title: ['Round to the nearest hundred: 347', '四舍五入到百：347'],
    text: ['347 is between 300 and 400. Look at the tens digit: 4 is less than 5, so 347 is closer to 300. 347 rounds to 300.',
      '347 在 300 和 400 之间。看十位：4 比 5 小，所以离 300 更近。347 约等于 300。'],
    art(el) {
      el.innerHTML = lessonLine(300, 400, [[347, 300, .6]], 10) + lessonEq('347 ≈ <span class="hl">300</span>', 1.9);
    }
  },
  {
    title: ['Estimate to check: 498 + 307', '估一估，检查答案：498 + 307'],
    text: ['498 is about 500 and 307 is about 300, so the answer is about 800. If you get 705 or 905, something went wrong. 805 makes sense!',
      '498 约等于 500，307 约等于 300，所以答案大约是 800。如果算出 705 或 905，肯定哪里错了。805 就很合理！'],
    art(el) {
      el.innerHTML = lessonEq('498 + 307 ≈ 500 + 300 = <span class="hl">800</span>', .3)
        + `<div class="chips">${[['705', 'b'], ['805', 'a'], ['905', 'b']].map(([t, c], i) => `<span class="chip appear ${c}" style="width:auto;padding:0 14px;animation-delay:${1.4 + i * .4}s">${t} ${c === 'a' ? '✓' : '✗'}</span>`).join('')}</div>`;
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 questions with bigger numbers: carrying, breaking hundreds, rounding and estimating. After 10 you play a 60-second game. Ready?',
      '20 道大数题：进位、退位、四舍五入和估算。做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const tdColQ = (a, b, op) => colHTML(a, b, op, '?');
const Q_THREEDIGIT = [
  // 1 · type-in · add, no carry
  () => {
    const [a, b] = tdAdd(false, false);
    return cq({ pts: 3, input: true, answer: a + b, q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`], fig: tdColQ(a, b, '+'),
      hints: [['Add each place: hundreds, tens, ones.', '每一位分别相加：百位、十位、个位。'], [`${tdH(a)} + ${tdH(b)} hundreds, ${tdT(a)} + ${tdT(b)} tens, ${tdO(a)} + ${tdO(b)} ones.`, `${tdH(a)} + ${tdH(b)} 个百，${tdT(a)} + ${tdT(b)} 个十，${tdO(a)} + ${tdO(b)} 个一。`]],
      explain: [`${tdH(a) + tdH(b)} hundreds, ${tdT(a) + tdT(b)} tens, ${tdO(a) + tdO(b)} ones: ${a + b}.`, `${tdH(a) + tdH(b)} 个百、${tdT(a) + tdT(b)} 个十、${tdO(a) + tdO(b)} 个一：${a + b}。`] });
  },
  // 2 · choice · value of a digit
  () => {
    const ds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3), n = ds[0] * 100 + ds[1] * 10 + ds[2], pos = ri(0, 2), d = ds[pos], ans = d * [100, 10, 1][pos];
    return cq({ pts: 3, ...numChoices(ans, [d, d * 10, d * 100, n].filter(v => v !== ans)),
      q: [`What is the value of the digit ${d} in ${n}?`, `${n} 里的数字 ${d} 表示多少？`],
      hints: [['Which place is it in: hundreds, tens or ones?', '它在哪一位：百位、十位还是个位？'], [`${n} = ${ds[0] * 100} + ${ds[1] * 10} + ${ds[2]}.`, `${n} = ${ds[0] * 100} + ${ds[1] * 10} + ${ds[2]}。`]],
      explain: [`The ${d} is in the ${['hundreds', 'tens', 'ones'][pos]} place, so it means ${ans}.`, `${d} 在${['百', '十', '个'][pos]}位，表示 ${ans}。`] });
  },
  // 3 · type-in · add, carry once
  () => {
    const [a, b] = tdAdd(true, false), s = tdO(a) + tdO(b);
    return cq({ pts: 3, input: true, answer: a + b, q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`], fig: tdColQ(a, b, '+'),
      hints: [[`Ones: ${tdO(a)} + ${tdO(b)} = ${s}. Write ${s - 10}, carry 1.`, `个位：${tdO(a)} + ${tdO(b)} = ${s}，写 ${s - 10} 进 1。`], [`Tens: ${tdT(a)} + ${tdT(b)} + 1. Hundreds: ${tdH(a)} + ${tdH(b)}.`, `十位：${tdT(a)} + ${tdT(b)} + 1。百位：${tdH(a)} + ${tdH(b)}。`]],
      explain: [`Ones ${s - 10} (carry 1), tens ${tdT(a) + tdT(b) + 1}, hundreds ${tdH(a) + tdH(b)}: ${a + b}.`, `个位 ${s - 10}（进 1），十位 ${tdT(a) + tdT(b) + 1}，百位 ${tdH(a) + tdH(b)}：${a + b}。`] });
  },
  // 4 · choice · round to the nearest ten
  () => {
    let n; do { n = ri(101, 989); } while (!tdO(n));
    const ans = round10(n);
    return cq({ pts: 3, ...numChoices(ans, [ans === Math.floor(n / 10) * 10 ? ans + 10 : ans - 10, round100(n), ans + 100, n]),
      q: [`Round ${n} to the nearest ten.`, `把 ${n} 四舍五入到十位。`],
      hints: [[`${n} is between ${Math.floor(n / 10) * 10} and ${Math.floor(n / 10) * 10 + 10}.`, `${n} 在 ${Math.floor(n / 10) * 10} 和 ${Math.floor(n / 10) * 10 + 10} 之间。`], [`The ones digit is ${tdO(n)}. 5 or more rounds up.`, `个位是 ${tdO(n)}，5 或更大就往上。`]],
      explain: [`The ones digit ${tdO(n)} is ${tdO(n) >= 5 ? '5 or more, so round up' : 'less than 5, so round down'}: ${n} ≈ ${ans}.`, `个位是 ${tdO(n)}，${tdO(n) >= 5 ? '五入' : '四舍'}：${n} ≈ ${ans}。`],
      tool: 'jumper', cfg: { lo: Math.floor(n / 10) * 10, hi: Math.floor(n / 10) * 10 + 10, start: n, keys: [-1, 1] }, lab: ['Jump to the nearest ten. Which one is fewer jumps away?', '跳到整十。哪边跳的次数少？'] });
  },
  // 5 · type-in · subtract, no breaking
  () => {
    const [a, b] = tdSub(false, false);
    return cq({ pts: 3, input: true, answer: a - b, q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`], fig: tdColQ(a, b, '−'),
      hints: [['Subtract each place: ones, tens, hundreds.', '每一位分别相减：个位、十位、百位。'], [`${tdO(a)} − ${tdO(b)}, ${tdT(a)} − ${tdT(b)}, ${tdH(a)} − ${tdH(b)}.`, `${tdO(a)} − ${tdO(b)}，${tdT(a)} − ${tdT(b)}，${tdH(a)} − ${tdH(b)}。`]],
      explain: [`${tdH(a) - tdH(b)} hundreds, ${tdT(a) - tdT(b)} tens, ${tdO(a) - tdO(b)} ones: ${a - b}.`, `${tdH(a) - tdH(b)} 个百、${tdT(a) - tdT(b)} 个十、${tdO(a) - tdO(b)} 个一：${a - b}。`] });
  },
  // 6 · choice · round to the nearest hundred
  () => {
    let n; do { n = ri(110, 949); } while (n % 100 === 0);
    const ans = round100(n), lo = tdH(n) * 100;
    return cq({ pts: 3, ...numChoices(ans, [ans === lo ? lo + 100 : lo, round10(n), ans + 200, ans - 200].filter(v => v > 0)),
      q: [`Round ${n} to the nearest hundred.`, `把 ${n} 四舍五入到百位。`],
      hints: [[`${n} is between ${lo} and ${lo + 100}.`, `${n} 在 ${lo} 和 ${lo + 100} 之间。`], [`Look at the tens digit: ${tdT(n)}. 5 or more rounds up.`, `看十位：${tdT(n)}，5 或更大就往上。`]],
      explain: [`The tens digit ${tdT(n)} is ${tdT(n) >= 5 ? '5 or more, so round up' : 'less than 5, so round down'}: ${n} ≈ ${ans}.`, `十位是 ${tdT(n)}，${tdT(n) >= 5 ? '五入' : '四舍'}：${n} ≈ ${ans}。`],
      tool: 'jumper', cfg: { lo, hi: lo + 100, start: n, keys: [-10, -1, 1, 10] }, lab: ['Jump to the nearest hundred. Which way is shorter?', '跳到整百。哪边更近？'] });
  },
  // 7 · type-in · add, carry twice
  () => {
    const [a, b] = tdAdd(true, true), s1 = tdO(a) + tdO(b), s2 = tdT(a) + tdT(b) + 1;
    return cq({ pts: 3, input: true, answer: a + b, q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`], fig: tdColQ(a, b, '+'),
      hints: [[`Ones: ${s1}, write ${s1 - 10}, carry 1. Tens: ${tdT(a)} + ${tdT(b)} + 1 = ${s2}.`, `个位 ${s1}，写 ${s1 - 10} 进 1。十位：${tdT(a)} + ${tdT(b)} + 1 = ${s2}。`], [`Write ${s2 - 10}, carry 1. Hundreds: ${tdH(a)} + ${tdH(b)} + 1.`, `写 ${s2 - 10} 进 1。百位：${tdH(a)} + ${tdH(b)} + 1。`]],
      explain: [`Ones ${s1 - 10}, tens ${s2 - 10}, hundreds ${tdH(a) + tdH(b) + 1}: ${a + b}.`, `个位 ${s1 - 10}，十位 ${s2 - 10}，百位 ${tdH(a) + tdH(b) + 1}：${a + b}。`] });
  },
  // 8 · choice · estimate a sum
  () => {
    const x = ri(2, 5), y = ri(1, 4), a = x * 100 + pick([-4, -3, -2, -1, 1, 2, 3, 4]), b = y * 100 + pick([-3, -2, -1, 1, 2, 3, 4, 5]), ans = (x + y) * 100;
    return cq({ pts: 3, ...numChoices(ans, [ans - 100, ans + 100, ans - 200, ans + 200]),
      q: [`About how much is ${a} + ${b}? Round each number to the nearest hundred first.`, `${a} + ${b} 大约是多少？先把每个数四舍五入到百位。`],
      hints: [[`${a} is about ${x * 100}.`, `${a} 约等于 ${x * 100}。`], [`${b} is about ${y * 100}. Add the round numbers.`, `${b} 约等于 ${y * 100}，把整百数加起来。`]],
      explain: [`${x * 100} + ${y * 100} = ${ans}. (The exact answer ${a + b} is close to it.)`, `${x * 100} + ${y * 100} = ${ans}。（准确答案 ${a + b} 和它很接近。）`] });
  },
  // 9 · type-in · subtract, break a ten
  () => {
    const [a, b] = tdSub(true, false);
    return cq({ pts: 3, input: true, answer: a - b, q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`], fig: tdColQ(a, b, '−'),
      hints: [[`${tdO(a)} is less than ${tdO(b)}. Break a ten: ${tdO(a) + 10} − ${tdO(b)} = ${tdO(a) + 10 - tdO(b)}.`, `${tdO(a)} 比 ${tdO(b)} 小，拆一个十：${tdO(a) + 10} − ${tdO(b)} = ${tdO(a) + 10 - tdO(b)}。`], [`Tens: ${tdT(a) - 1} − ${tdT(b)}. Hundreds: ${tdH(a)} − ${tdH(b)}.`, `十位：${tdT(a) - 1} − ${tdT(b)}。百位：${tdH(a)} − ${tdH(b)}。`]],
      explain: [`Ones ${tdO(a) + 10 - tdO(b)}, tens ${tdT(a) - 1 - tdT(b)}, hundreds ${tdH(a) - tdH(b)}: ${a - b}.`, `个位 ${tdO(a) + 10 - tdO(b)}，十位 ${tdT(a) - 1 - tdT(b)}，百位 ${tdH(a) - tdH(b)}：${a - b}。`] });
  },
  // 10 · choice · catch the mistake
  () => {
    const [a, b] = tdAdd(true, true), ans = a + b, slip = pick([ans - 100, ans - 10]), which = slip === ans - 100 ? ['hundreds', '百位'] : ['tens', '十位'];
    return cq({ pts: 3, ...numChoices(ans, [slip, ans + 100, ans + 10, ans - 110]),
      q: [`Mia says ${a} + ${b} = ${slip}. She forgot something! What is the right answer?`, `Mia 说 ${a} + ${b} = ${slip}。她忘了一件事！正确答案是多少？`], fig: tdColQ(a, b, '+'),
      hints: [['There are two carries in this sum.', '这道题要进位两次。'], [`Mia forgot to carry 1 into the ${which[0]} place.`, `Mia 忘了向${which[1]}进 1。`]],
      explain: [`${a} + ${b} = ${ans}. Mia forgot to carry into the ${which[0]}, so she was ${ans - slip} short.`, `${a} + ${b} = ${ans}。Mia 忘了向${which[1]}进位，所以少了 ${ans - slip}。`] });
  },
  // 11 · type-in · subtract from hundreds
  () => {
    const a = ri(3, 9) * 100;
    let b; do { b = ri(101, a - 50); } while (!tdO(b) || !tdT(b));
    return cq({ pts: 4, input: true, answer: a - b, q: [`${a} − ${b} = ?`, `${a} − ${b} = ?`], fig: tdColQ(a, b, '−'),
      hints: [[`Trick: ${a} = ${a - 1} + 1. Work out ${a - 1} − ${b} first.`, `窍门：${a} = ${a - 1} + 1，先算 ${a - 1} − ${b}。`], [`${a - 1} − ${b} = ${a - 1 - b}. Now add the 1 back.`, `${a - 1} − ${b} = ${a - 1 - b}，再加回 1。`]],
      explain: [`${a - 1} − ${b} = ${a - 1 - b}, and ${a - 1 - b} + 1 = ${a - b}.`, `${a - 1} − ${b} = ${a - 1 - b}，${a - 1 - b} + 1 = ${a - b}。`] });
  },
  // 12 · choice · missing tens digit
  () => {
    const [a, b] = tdAdd(true, true), s = a + b, t = tdT(a);
    return cq({ pts: 4, ...digitChoices(t, [tdT(b), tdT(s), (t + 1) % 10, (t + 9) % 10]),
      q: ['What digit goes in the box?', '方框里是几？'], fig: colHTML(`${tdH(a)}?${tdO(a)}`, b, '+', s),
      hints: [[`Ones: ${tdO(a)} + ${tdO(b)} = ${tdO(a) + tdO(b)}, so 1 is carried to the tens.`, `个位：${tdO(a)} + ${tdO(b)} = ${tdO(a) + tdO(b)}，向十位进 1。`], [`Tens: ? + ${tdT(b)} + 1 must end in ${tdT(s)}.`, `十位：? + ${tdT(b)} + 1 的个位要是 ${tdT(s)}。`]],
      explain: [`${t} + ${tdT(b)} + 1 = ${t + tdT(b) + 1}, which ends in ${tdT(s)}. Check: ${a} + ${b} = ${s}.`, `${t} + ${tdT(b)} + 1 = ${t + tdT(b) + 1}，个位是 ${tdT(s)}。验算：${a} + ${b} = ${s}。`] });
  },
  // 13 · type-in · two steps
  () => {
    const g3 = ri(210, 390), g4 = ri(180, 350), trip = ri(120, 300), ans = g3 + g4 - trip;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`A school has ${g3} third graders and ${g4} fourth graders. ${trip} of them go on a trip. How many stay at school?`, `学校有 ${g3} 个三年级学生和 ${g4} 个四年级学生，其中 ${trip} 人去春游了。还有多少人留在学校？`],
      hints: [[`Step 1: ${g3} + ${g4} = ?`, `第一步：${g3} + ${g4} = ?`], [`Step 2: ${g3 + g4} − ${trip} = ?`, `第二步：${g3 + g4} − ${trip} = ?`]],
      explain: [`${g3} + ${g4} = ${g3 + g4}, then ${g3 + g4} − ${trip} = ${ans}.`, `${g3} + ${g4} = ${g3 + g4}，${g3 + g4} − ${trip} = ${ans}。`] });
  },
  // 14 · choice · which sum is in the 600s
  () => {
    const split = s => { const a = ri(150, s - 150); return [`${a} + ${s - a}`, s]; };
    let good, all;
    do {   // wrong sums are never exactly 600 or 700; all five choices must look different
      good = split(ri(610, 690));
      all = shuffle([good, split(ri(520, 590)), split(ri(710, 790)), split(ri(580, 597)), split(ri(703, 720))]);
    } while (new Set(all.map(x => x[0])).size < 5);
    return cq({ pts: 4, choices: all.map(x => x[0]), answer: all.indexOf(good),
      q: ['Which sum is between 600 and 700?', '哪个和在 600 和 700 之间？'],
      hints: [['Estimate first: round each number to the nearest hundred.', '先估算：每个数四舍五入到百位。'], ['If an estimate is close to 600 or 700, work out the exact sum.', '如果估算结果靠近 600 或 700，就算出准确答案。']],
      explain: [`${all.map(x => `${x[0]} = ${x[1]}`).join(', ')}. Only ${good[0]} is between 600 and 700.`, `${all.map(x => `${x[0]} = ${x[1]}`).join('，')}。只有 ${good[0]} 在 600 和 700 之间。`] });
  },
  // 15 · type-in · add a nearly-round hundred
  () => {
    const b = pick([199, 299, 399, 198, 298]), a = ri(120, 999 - b), r = Math.ceil(b / 100) * 100, d = r - b;
    return cq({ pts: 4, input: true, answer: a + b, q: [`${a} + ${b} = ?`, `${a} + ${b} = ?`],
      hints: [[`${b} is ${d} less than ${r}. Add ${r} first.`, `${b} 比 ${r} 少 ${d}，先加 ${r}。`], [`${a} + ${r} = ${a + r}. Now take away ${d}.`, `${a} + ${r} = ${a + r}，再减 ${d}。`]],
      explain: [`${a} + ${r} = ${a + r}, and ${a + r} − ${d} = ${a + b}.`, `${a} + ${r} = ${a + r}，${a + r} − ${d} = ${a + b}。`] });
  },
  // 16 · choice · which number rounds to this ten
  () => {
    const t = ri(12, 98) * 10, good = t + pick([-5, -4, -3, -2, -1, 1, 2, 3, 4]);
    const bad = shuffle([t - 6, t - 7, t - 9, t + 5, t + 6, t + 8, t + 11, t - 12]).slice(0, 4);
    const { choices, answer } = numChoices(good, bad);
    return cq({ pts: 4, choices, answer,
      q: [`Rounded to the nearest ten, a number is ${t}. Which could be the number?`, `一个数四舍五入到十位是 ${t}。它可能是下面哪个数？`],
      hints: [[`Numbers from ${t - 5} to ${t + 4} round to ${t}.`, `从 ${t - 5} 到 ${t + 4} 的数，四舍五入后都是 ${t}。`], [`${t + 5} already rounds up to ${t + 10}.`, `${t + 5} 已经入到 ${t + 10} 了。`]],
      explain: [`${good} is between ${t - 5} and ${t + 4}, so it rounds to ${t}. The others round to a different ten.`, `${good} 在 ${t - 5} 到 ${t + 4} 之间，所以约等于 ${t}。其他数会约成别的整十数。`] });
  },
  // 17 · type-in · missing addend
  () => {
    const a = ri(150, 500), b = ri(120, 999 - a), s = a + b;
    return cq({ pts: 5, input: true, answer: b, q: [`${a} + ? = ${s}`, `${a} + ? = ${s}`],
      hints: [[`Count up from ${a}: first to the next ten, then by tens and hundreds.`, `从 ${a} 往上数：先到整十，再按十和百跳。`], [`Or work out ${s} − ${a}.`, `也可以算 ${s} − ${a}。`]],
      explain: [`${s} − ${a} = ${b}. Check: ${a} + ${b} = ${s}.`, `${s} − ${a} = ${b}。验算：${a} + ${b} = ${s}。`],
      tool: 'jumper', cfg: { lo: Math.floor(a / 10) * 10, hi: Math.ceil(s / 10) * 10, start: a, keys: [-1, 1, 10, 100] } });
  },
  // 18 · choice · digit cards, biggest minus smallest
  () => {
    const d = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3).sort((x, y) => y - x), big = d[0] * 100 + d[1] * 10 + d[2], small = d[2] * 100 + d[1] * 10 + d[0], ans = big - small;
    return cq({ pts: 5, ...numChoices(ans, [big + small > 999 ? ans + 99 : big + small, ans + 10, ans - 99, ans + 100]),
      q: [`Use the digit cards ${shuffle([...d]).join(', ')} to make the biggest and the smallest 3-digit number. What is the difference?`, `用数字卡片 ${shuffle([...d]).join('、')} 组成最大的三位数和最小的三位数。它们相差多少？`],
      hints: [['Biggest: put the digits from big to small. Smallest: from small to big.', '最大：数字从大到小排；最小：从小到大排。'], [`${big} − ${small} = ?`, `${big} − ${small} = ?`]],
      explain: [`${big} − ${small} = ${ans}.`, `${big} − ${small} = ${ans}。`] });
  },
  // 19 · type-in · special biggest minus smallest
  () => {
    const [en, zh, big, small] = pick([['all different digits', '各位数字都不同', 987, 102], ['all odd digits, all different', '各位都是不同的奇数', 975, 135], ['all even digits, all different', '各位都是不同的偶数', 864, 204]]);
    return cq({ pts: 5, input: true, answer: big - small,
      q: [`Find the biggest and the smallest 3-digit numbers with ${en}. What is their difference?`, `找出${zh}的最大三位数和最小三位数，它们相差多少？`],
      hints: [['Biggest: use the biggest allowed digits, biggest first.', '最大的数：用最大的数字，大的放前面。'], ['Smallest: the hundreds digit cannot be 0!', '最小的数：百位不能是 0！']],
      explain: [`Biggest ${big}, smallest ${small}: ${big} − ${small} = ${big - small}.`, `最大 ${big}，最小 ${small}：${big} − ${small} = ${big - small}。`] });
  },
  // 20 · choice · boss
  cq({ pts: 5, boss: true, ...numChoices(69, [71, 78, 82, 96]),
    q: ['Boss question! Roo uses each of the digits 1, 2, 3, 4, 5 exactly once to make a 3-digit number and a 2-digit number. Then she takes the 2-digit number away from the 3-digit number. What is the smallest answer she can get?', 'Boss 题！袋鼠用 1、2、3、4、5 每个数字各一次，组成一个三位数和一个两位数，再用三位数减去两位数。得数最小是多少？'],
    hints: [['Make the 3-digit number as small as you can, and the 2-digit number as big as you can.', '三位数尽量小，两位数尽量大。'], ['The 3-digit number starts with 1. Which two digits should it keep, and which go to the 2-digit number?', '三位数的百位是 1。它留哪两个数字，哪两个给两位数？']],
    explain: ['123 − 54 = 69. The 3-digit number must start with 1. Keeping 2 and 3 makes it 123, and the big digits 5 and 4 make 54.', '123 − 54 = 69。三位数百位是 1，留下 2 和 3 组成 123，大数字 5 和 4 组成 54。'] })
];

registerSeries({
  id: 'threedigit', camp: true, breakEvery: 10, perRound: 20, games: ['sprint', 'jump'],
  tag: ['Add & Subtract Camp 3', '加减营 3'], name: ['3-Digit Numbers & Estimating', '三位数加减与估算'],
  desc: ['Carrying twice, subtracting across zeros, rounding, estimating', '两次进位、连续退位、四舍五入、估算'],
  lesson: LESSON_THREEDIGIT,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_THREEDIGIT
});
