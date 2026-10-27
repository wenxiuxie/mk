// 规律营 — Pattern Camp (competition thinking). 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// A question written as  () => cq({...})  gets new numbers every round; a plain cq({...}) stays the same.
// To add more questions, put them in Q_PATTERNS. With perRound: 20 each round then draws 20 of them, kept in list order.

// ---------- words and pictures ----------
const PT_SHAPE = { R: ['circle', '圆形'], B: ['square', '正方形'], G: ['triangle', '三角形'], Y: ['star', '星形'], P: ['diamond', '菱形'] };
const PT_DAYS = [['Monday', '星期一'], ['Tuesday', '星期二'], ['Wednesday', '星期三'], ['Thursday', '星期四'], ['Friday', '星期五'], ['Saturday', '星期六'], ['Sunday', '星期日']];
const PT_MONTHS = [['March', 3], ['May', 5], ['July', 7], ['October', 10], ['December', 12]];
const ptOrd = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
// repeating shape pattern: a template like 'ABB' filled with different random shapes
function ptCore() {
  const tpl = pick(['AB', 'ABC', 'AAB', 'ABB', 'ABCC', 'ABAC']), map = {}, s = shuffle(['R', 'B', 'G', 'Y', 'P']);
  return tpl.split('').map(ch => map[ch] || (map[ch] = s[Object.keys(map).length]));
}
const ptRepeat = (core, n) => Array.from({ length: n }, (_, i) => core[i % core.length]);
const shapeName = c => PT_SHAPE[c];
// one sequence cell for the lessons: face html, position number, extra class, delay, optional jump badge
const ptCell = (face, i, cls = '', d = 0, badge = '', bd = 0) => `<div class="pcell appear ${cls}" style="animation-delay:${d}s">${badge
  ? `<span class="df fadein" style="animation-delay:${bd}s">${badge}</span>` : ''}${face}<small>${i}</small></div>`;
const ptNum = v => `<span class="nv">${v}</span>`;
// n squares in a row made of matchsticks
function ptSticks(n, d = 0) {
  const s = 30, w = n * s + 8;
  let h = '';
  for (let k = 0; k < n; k++) h += `<line x1="${4 + k * s}" y1="4" x2="${4 + (k + 1) * s}" y2="4"/><line x1="${4 + k * s}" y1="${4 + s}" x2="${4 + (k + 1) * s}" y2="${4 + s}"/>`;
  for (let k = 0; k <= n; k++) h += `<line x1="${4 + k * s}" y1="4" x2="${4 + k * s}" y2="${4 + s}"/>`;
  return `<svg class="appear" style="animation-delay:${d}s" width="${w}" height="${s + 8}" viewBox="0 0 ${w} ${s + 8}"><g stroke="#c8742c" stroke-width="4" stroke-linecap="round">${h}</g></svg>`;
}
// picture n of the triangle dot pattern (rows 1, 2, …, n)
function ptDots(n) {
  const r = 5, g = 14, w = n * g + 6;
  let h = '';
  for (let row = 1; row <= n; row++) for (let k = 0; k < row; k++) h += `<circle cx="${w / 2 + (k - (row - 1) / 2) * g}" cy="${row * g - 4}" r="${r}" fill="#3a76b8"/>`;
  return `<svg width="${w}" height="${n * g + 4}" viewBox="0 0 ${w} ${n * g + 4}">${h}</svg>`;
}
const ptPics = items => `<div class="pics">${items.map(([pic, label]) => `<div>${pic}<small>${label}</small></div>`).join('')}</div>`;
// numbers written in rows of w under lettered columns
const ptGrid = (w, rows) => `<table class="ngrid"><tr>${'ABCDEF'.slice(0, w).split('').map(c => `<th>${c}</th>`).join('')}</tr>${Array.from({ length: rows }, (_, r) =>
  `<tr>${Array.from({ length: w }, (_, c) => `<td>${r * w + c + 1}</td>`).join('')}</tr>`).join('')}<tr>${'<td>…</td>'.repeat(w)}</tr></table>`;
const ptBeads = (r, b, n) => `<div class="beads">${Array.from({ length: n }, (_, i) => `<i style="background:${i % (r + b) < r ? '#d6413f' : '#3a76b8'}"></i>`).join('')}<span>…</span></div>`;

// ---------- mini-lesson ----------
const LESSON_PATTERNS = [
  {
    title: ['Patterns repeat', '规律会重复'],
    text: ['Look: circle, star, square, circle, star, square… The same group of 3 comes again and again. That group is the core of the pattern. Find the core, and you can tell what comes next!',
      '看：圆、星、方、圆、星、方……同样的 3 个一组，一遍一遍地重复。这一组叫“循环节”。找到循环节，就知道下一个是什么！'],
    art(el) {
      const core = ['R', 'Y', 'B'];
      el.innerHTML = `<div class="pseq">${ptRepeat(core, 9).map((c, i) => ptCell(shp(c, 30), i + 1, Math.floor(i / 3) % 2 ? 'b1' : 'b0', .2 + i * .25)).join('')}
        ${ptCell('<span class="q">?</span>', 10, 'slot', 2.6)}</div>` + lessonEq(`${shp('R', 34)} ${TI('comes next!', '是下一个！')}`, 3.4);
    }
  },
  {
    title: ['Number patterns grow', '数字规律'],
    text: ['2, 5, 8, 11, 14… Each number is 3 more than the one before. Write the jumps above the numbers: +3, +3, +3. The next number is 14 + 3 = 17.',
      '2、5、8、11、14……每个数都比前一个多 3。把每次的变化写在上面：+3、+3、+3。下一个数是 14 + 3 = 17。'],
    art(el) {
      el.innerHTML = `<div class="pseq">${[2, 5, 8, 11, 14].map((v, i) => ptCell(ptNum(v), i + 1, '', .2 + i * .2, i ? '+3' : '', 1.3 + i * .3)).join('')}
        ${ptCell(ptNum(17), 6, 'slot b0', 2.8, '+3', 2.8)}</div>` + lessonEq('14 + 3 = <span class="hl">17</span>', 3.2);
    }
  },
  {
    title: ['Jumps can change too', '变化也可以有规律'],
    text: ['Sometimes the jumps grow: 1, 2, 4, 7, 11 jumps +1, +2, +3, +4. Sometimes each number doubles: 1, 2, 4, 8, 16. Always check the jumps!',
      '有时候变化越来越大：1、2、4、7、11，变化是 +1、+2、+3、+4。有时候每个数翻一倍：1、2、4、8、16。一定要看清每次的变化！'],
    art(el) {
      el.innerHTML = `<div class="pseq">${[1, 2, 4, 7, 11].map((v, i) => ptCell(ptNum(v), i + 1, '', .2 + i * .15, i ? '+' + i : '', 1 + i * .3)).join('')}</div>
        <div class="pseq">${[1, 2, 4, 8, 16].map((v, i) => ptCell(ptNum(v), i + 1, 'b1', 2.4 + i * .15, i ? '×2' : '', 3 + i * .3)).join('')}</div>`;
    }
  },
  {
    title: ['Jump ahead: the 20th shape', '跳着找：第 20 个是什么？'],
    text: ['Circle, star, square repeats every 3. Groups end at 3, 6, 9, 12, 15, 18. So the 18th is a square. Then the 19th is a circle and the 20th is a star!',
      '圆、星、方每 3 个一组。每组结束在第 3、6、9、12、15、18 个，所以第 18 个是方形。第 19 个是圆，第 20 个是星！'],
    art(el) {
      el.innerHTML = `<div class="pseq">${ptRepeat(['R', 'Y', 'B'], 6).map((c, i) => ptCell(shp(c, 30), i + 1, Math.floor(i / 3) % 2 ? 'b1' : 'b0', .1 + i * .1)).join('')}<div class="pcell appear" style="animation-delay:.8s;border:0;background:none"><span class="nv">…</span></div></div>`
        + lessonEq('3, 6, 9, 12, 15, <span class="hl">18</span> → ' + shp('B', 30), 1.4)
        + lessonEq(`19 → ${shp('R', 30)}　20 → ${shp('Y', 30)}`, 2.8);
    }
  },
  {
    title: ['Days of the week repeat', '星期也在循环'],
    text: ['A week has 7 days, so the days repeat every 7. Today is Monday. In 7 days it is Monday again. In 10 days it is 3 more days after that: Thursday!',
      '一星期有 7 天，所以每 7 天重复一次。今天是星期一，7 天后又是星期一。10 天后就是再往后数 3 天：星期四！'],
    art(el) {
      el.innerHTML = `<div class="chips">${PT_DAYS.map((d, i) => `<span class="chip appear${i === 0 ? ' a' : ''}" style="width:auto;padding:0 10px;font-size:18px;animation-delay:${.1 + i * .15}s">${TI(d[0].slice(0, 3), d[1])}</span>`).join('')}</div>`
        + lessonEq(TI('Monday + 7 days = Monday', '星期一 + 7 天 = 星期一'), 1.5)
        + lessonEq(TI('Monday + 10 days = Monday + 3 days = <span class="hl">Thursday</span>', '星期一 + 10 天 = 星期一 + 3 天 = <span class="hl">星期四</span>'), 2.8);
    }
  },
  {
    title: ['Growing shapes', '会长大的图形'],
    text: ['1 square needs 4 matchsticks. 2 squares need 7. 3 squares need 10. Each new square adds only 3 sticks, because it shares one side!',
      '1 个正方形要 4 根火柴，2 个要 7 根，3 个要 10 根。每多一个正方形只多 3 根，因为它和前一个共用一条边！'],
    art(el) {
      el.innerHTML = ptPics([[ptSticks(1, .2), '4'], [ptSticks(2, .9), '7'], [ptSticks(3, 1.6), '10']])
        + lessonEq('4, 7, 10, 13… <span class="hl">+3</span> each time', 2.5);
    }
  },
  {
    title: ['Your mission, pattern detective!', '规律小侦探，任务来啦！'],
    text: ['20 puzzles are waiting: shapes, numbers, days and matchsticks. After 10 you play a 60-second game. The Boss question is a real Kangaroo puzzle. Ready?',
      '20 道谜题等着你：图形、数字、星期、火柴棍。做完 10 题玩一次 60 秒小游戏。Boss 题是真正的袋鼠竞赛题。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const Q_PATTERNS = [
  // 1 · type-in · add the same each time
  () => {
    const a = ri(1, 20), d = ri(2, 9), s = [0, 1, 2, 3].map(k => a + d * k);
    return cq({ pts: 3, input: true, answer: a + 4 * d,
      q: [`What number comes next? ${s.join(', ')}, __`, `下一个数是几？${s.join('、')}、__`],
      hints: [['How much bigger is each number than the one before?', '每个数比前一个大多少？'], [`They go up by ${d}. ${s[3]} + ${d} = ?`, `每次加 ${d}。${s[3]} + ${d} = ?`]],
      explain: [`The rule is +${d}: ${s[3]} + ${d} = ${a + 4 * d}.`, `规律是每次加 ${d}：${s[3]} + ${d} = ${a + 4 * d}。`],
      tool: 'pattern', cfg: { nums: s } });
  },
  // 2 · choice · next shape
  () => {
    const core = ptCore(), k = core.length, n = 2 * k + ri(0, k - 1), next = core[n % k], ch = ['R', 'B', 'G', 'Y', 'P'];
    return cq({ pts: 3, shape: true, choices: ch, answer: ch.indexOf(next),
      q: ['Which shape comes next?', '下一个是什么图形？'],
      hints: [[`Find the core: the group that repeats. It has ${k} shapes.`, `找循环节：重复的那一组有 ${k} 个图形。`], ['Use “Group by” in the hands-on box to color the groups.', '在动手区按“几个一组”给每组涂色。']],
      explain: [`The core is ${core.map(c => shapeName(c)[0]).join(', ')}. The next one is a ${shapeName(next)[0]}.`, `循环节是${core.map(c => shapeName(c)[1]).join('、')}，下一个是${shapeName(next)[1]}。`],
      tool: 'pattern', cfg: { seq: ptRepeat(core, n), slots: 1 } });
  },
  // 3 · type-in · take away the same each time
  () => {
    const a = ri(60, 99), d = ri(3, 9), s = [0, 1, 2, 3].map(k => a - d * k);
    return cq({ pts: 3, input: true, answer: a - 4 * d,
      q: [`What number comes next? ${s.join(', ')}, __`, `下一个数是几？${s.join('、')}、__`],
      hints: [['Are the numbers getting bigger or smaller? By how much?', '数在变大还是变小？每次变多少？'], [`They go down by ${d}. ${s[3]} − ${d} = ?`, `每次减 ${d}。${s[3]} − ${d} = ?`]],
      explain: [`The rule is −${d}: ${s[3]} − ${d} = ${a - 4 * d}.`, `规律是每次减 ${d}：${s[3]} − ${d} = ${a - 4 * d}。`],
      tool: 'pattern', cfg: { nums: s } });
  },
  // 4 · choice · missing middle number
  () => {
    const a = ri(2, 30), d = ri(3, 12), s = [0, 1, 2, 3, 4].map(k => a + d * k), ans = s[2];
    return cq({ pts: 3, ...numChoices(ans, [ans + 1, ans - 1, s[1] + 1, ans + d]),
      q: [`Which number is missing? ${s[0]}, ${s[1]}, __, ${s[3]}, ${s[4]}`, `缺了哪个数？${s[0]}、${s[1]}、__、${s[3]}、${s[4]}`],
      hints: [[`Compare ${s[3]} and ${s[4]}: how far apart are they?`, `比一比 ${s[3]} 和 ${s[4]}，相差多少？`], [`The rule is +${d}. ${s[1]} + ${d} = ?`, `规律是每次加 ${d}。${s[1]} + ${d} = ?`]],
      explain: [`${s[1]} + ${d} = ${ans}, and ${ans} + ${d} = ${s[3]}. It fits!`, `${s[1]} + ${d} = ${ans}，${ans} + ${d} = ${s[3]}，对上了！`] });
  },
  // 5 · type-in · the Nth number of 1, 2, 3, 1, 2, 3, …
  () => {
    const k = ri(3, 5), n = ri(15, 40), core = Array.from({ length: k }, (_, i) => i + 1), ans = (n - 1) % k + 1, end = Math.floor((n - 1) / k) * k;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`Roo writes ${core.join(', ')}, ${core.join(', ')}, … over and over. What is the ${ptOrd(n)} number?`, `袋鼠一遍一遍地写 ${core.join('、')}、${core.join('、')}……第 ${n} 个数是几？`],
      hints: [[`The core has ${k} numbers. Groups end at ${k}, ${2 * k}, ${3 * k}, …`, `循环节有 ${k} 个数，每组结束在第 ${k}、${2 * k}、${3 * k}……个。`], [`The ${ptOrd(end)} number ends a group. Count on from there to ${n}.`, `第 ${end} 个正好是一组的最后一个，从那里往后数到第 ${n} 个。`]],
      explain: [`Groups of ${k} end at the ${ptOrd(end)} number. ${n} is ${n - end} more, so the answer is ${ans}.`, `${k} 个一组，第 ${end} 个是一组的结尾。第 ${n} 个再往后数 ${n - end} 个，是 ${ans}。`],
      tool: 'pattern', cfg: { nums: ptRepeat(core, 2 * k) } });
  },
  // 6 · choice · the Nth shape
  () => {
    const core = ptCore(), k = core.length, n = ri(13, 30), ans = core[(n - 1) % k], end = Math.floor((n - 1) / k) * k, ch = ['R', 'B', 'G', 'Y', 'P'];
    return cq({ pts: 3, shape: true, choices: ch, answer: ch.indexOf(ans),
      q: [`The pattern keeps going. What is the ${ptOrd(n)} shape?`, `这个规律一直重复下去。第 ${n} 个是什么图形？`],
      hints: [[`The core has ${k} shapes. Groups end at ${k}, ${2 * k}, ${3 * k}, …`, `循环节有 ${k} 个，每组结束在第 ${k}、${2 * k}、${3 * k}……个。`], [`The ${ptOrd(end)} shape ends a group. Count on to ${n}.`, `第 ${end} 个是一组的结尾，再往后数到第 ${n} 个。`]],
      explain: [`The ${ptOrd(end)} shape ends a group, and ${n} is ${n - end} more: a ${shapeName(ans)[0]}.`, `第 ${end} 个是一组的结尾，再数 ${n - end} 个是${shapeName(ans)[1]}。`],
      tool: 'pattern', cfg: { seq: ptRepeat(core, 2 * k) } });
  },
  // 7 · type-in · jumps grow by one
  () => {
    const a = ri(1, 10), s = [a, a + 1, a + 3, a + 6, a + 10];
    return cq({ pts: 3, input: true, answer: a + 15,
      q: [`What number comes next? ${s.join(', ')}, __`, `下一个数是几？${s.join('、')}、__`],
      hints: [['Write the jumps: +1, +2, …', '写出每次的变化：+1、+2……'], ['The jumps grow by 1 each time. The next jump is +5.', '变化每次多 1，下一次是 +5。']],
      explain: [`The jumps are +1, +2, +3, +4, so next is +5: ${s[4]} + 5 = ${a + 15}.`, `变化是 +1、+2、+3、+4，下一次 +5：${s[4]} + 5 = ${a + 15}。`],
      tool: 'pattern', cfg: { nums: s } });
  },
  // 8 · choice · doubling
  () => {
    const a = pick([1, 2, 3, 5]), s = [0, 1, 2, 3, 4].map(k => a * 2 ** k), ans = s[4] * 2;
    return cq({ pts: 3, ...numChoices(ans, [s[4] + (s[4] - s[3]), s[4] + 2, ans + 2, ans - 2]),
      q: [`What number comes next? ${s.join(', ')}, __`, `下一个数是几？${s.join('、')}、__`],
      hints: [['Are the jumps the same? Look again!', '每次变化一样吗？再看看！'], ['Each number is double the one before.', '每个数都是前一个的 2 倍。']],
      explain: [`Each number doubles: ${s[4]} + ${s[4]} = ${ans}.`, `每个数翻一倍：${s[4]} + ${s[4]} = ${ans}。`] });
  },
  // 9 · type-in · same weekday each week
  () => {
    let d = ri(1, 7), k = ri(3, 5);
    while (d + 7 * (k - 1) > 31) k--;
    const [mEn, mNo] = pick(PT_MONTHS), day = pick(PT_DAYS.slice(0, 6)), ans = d + 7 * (k - 1);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`In ${mEn}, the first ${day[0]} is ${mEn} ${d}. What is the date of the ${ptOrd(k)} ${day[0]}?`, `${mNo} 月的第一个${day[1]}是 ${mNo} 月 ${d} 日。第 ${k} 个${day[1]}是几号？`],
      hints: [['The same day comes back every 7 days.', '每过 7 天又是同一个星期几。'], [`${d}, ${d + 7}, ${d + 14}, …`, `${d}、${d + 7}、${d + 14}……`]],
      explain: [`Add 7 each week: ${Array.from({ length: k }, (_, i) => d + 7 * i).join(', ')}. The ${ptOrd(k)} ${day[0]} is ${mEn} ${ans}.`, `每周加 7：${Array.from({ length: k }, (_, i) => d + 7 * i).join('、')}。第 ${k} 个${day[1]}是 ${mNo} 月 ${ans} 日。`] });
  },
  // 10 · choice · day of the week after N days
  () => {
    const t = ri(0, 6), n = ri(9, 40), r = n % 7, ans = (t + n) % 7;
    const pickDays = shuffle([0, 1, 2, 3, 4, 5, 6].filter(x => x !== ans)).slice(0, 4).concat(ans).sort((x, y) => x - y);
    return cq({ pts: 3, choices: pickDays.map(x => TI(...PT_DAYS[x])), answer: pickDays.indexOf(ans),
      q: [`Today is ${PT_DAYS[t][0]}. What day of the week will it be in ${n} days?`, `今天是${PT_DAYS[t][1]}。${n} 天以后是星期几？`],
      hints: [['Every 7 days it is the same day again.', '每过 7 天又是同一天。'], [`${n} = ${n - r} + ${r}. After ${n - r} days it is ${PT_DAYS[t][0]} again.`, `${n} = ${n - r} + ${r}，${n - r} 天后又是${PT_DAYS[t][1]}。`]],
      explain: [`${n - r} days later it is ${PT_DAYS[t][0]} again. ${r} more days: ${PT_DAYS[ans][0]}.`, `${n - r} 天后又是${PT_DAYS[t][1]}，再过 ${r} 天是${PT_DAYS[ans][1]}。`] });
  },
  // 11 · type-in · matchstick squares
  () => {
    const n = ri(5, 12);
    return cq({ pts: 4, input: true, answer: 3 * n + 1,
      q: [`Roo makes a row of squares with matchsticks. 1 square uses 4 sticks, 2 squares use 7, 3 squares use 10. How many sticks for ${n} squares?`, `袋鼠用火柴棍摆一排正方形。1 个用 4 根，2 个用 7 根，3 个用 10 根。${n} 个正方形要几根？`],
      fig: ptPics([[ptSticks(1), '4'], [ptSticks(2), '7'], [ptSticks(3), '10']]),
      hints: [['Each new square adds 3 sticks.', '每多一个正方形，多 3 根。'], [`Keep adding 3: 4, 7, 10, 13, … until ${n} squares.`, `一直加 3：4、7、10、13……数到 ${n} 个正方形。`]],
      explain: [`The first square takes 4 sticks, and each of the other ${n - 1} squares adds 3: 4 + ${3 * (n - 1)} = ${3 * n + 1}.`, `第一个正方形 4 根，后面 ${n - 1} 个每个加 3 根：4 + ${3 * (n - 1)} = ${3 * n + 1}。`] });
  },
  // 12 · choice · the 100th shape
  () => {
    let core;
    do { core = ptCore(); } while (core.length < 3);
    const k = core.length, end = Math.floor(99 / k) * k, ans = core[99 % k], ch = ['R', 'B', 'G', 'Y', 'P'];
    return cq({ pts: 4, shape: true, choices: ch, answer: ch.indexOf(ans),
      q: ['The pattern keeps going. What is the 100th shape?', '这个规律一直重复下去。第 100 个是什么图形？'],
      hints: [[`The core has ${k} shapes. Which number close to 100 ends a group? Try ${k} × 10 = ${k * 10} first.`, `循环节有 ${k} 个。哪个接近 100 的数是一组的结尾？先试 ${k} × 10 = ${k * 10}。`], [`The ${ptOrd(end)} shape ends a group. Count on to 100.`, `第 ${end} 个是一组的结尾，再往后数到第 100 个。`]],
      explain: [`Groups of ${k} end at the ${ptOrd(end)} shape. 100 is ${100 - end} more: a ${shapeName(ans)[0]}.`, `${k} 个一组，第 ${end} 个是一组的结尾，第 100 个再数 ${100 - end} 个，是${shapeName(ans)[1]}。`],
      tool: 'pattern', cfg: { seq: ptRepeat(core, 2 * k) } });
  },
  // 13 · type-in · up, down, up, down
  () => {
    const a = ri(10, 30), u = ri(4, 9), dn = ri(1, u - 1), s = [a, a + u, a + u - dn, a + 2 * u - dn, a + 2 * u - 2 * dn], ans = a + 3 * u - 2 * dn;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`What number comes next? ${s.join(', ')}, __`, `下一个数是几？${s.join('、')}、__`],
      hints: [['Write the jumps between the numbers.', '把每两个数之间的变化写出来。'], [`The jumps go +${u}, −${dn}, +${u}, −${dn}, …`, `变化是 +${u}、−${dn}、+${u}、−${dn}……`]],
      explain: [`The next jump is +${u}: ${s[4]} + ${u} = ${ans}.`, `下一次是 +${u}：${s[4]} + ${u} = ${ans}。`],
      tool: 'pattern', cfg: { nums: s } });
  },
  // 14 · choice · which number will the kangaroo land on
  () => {
    const st = ri(1, 4), step = pick([3, 4, 5]), lands = v => v >= st && (v - st) % step === 0;
    let good; do { good = ri(40, 99); } while (!lands(good));
    const wrong = new Set(); while (wrong.size < 4) { const v = ri(40, 99); if (!lands(v)) wrong.add(v); }
    const { choices, answer } = numChoices(good, [...wrong]);
    return cq({ pts: 4, choices, answer,
      q: [`Roo starts at ${st} and hops ${step} each time: ${st}, ${st + step}, ${st + 2 * step}, ${st + 3 * step}, … Which number will Roo land on?`, `袋鼠从 ${st} 出发，每次跳 ${step}：${st}、${st + step}、${st + 2 * step}、${st + 3 * step}……袋鼠会落在下面哪个数上？`],
      hints: [[`Roo always lands ${st} more than a number in the ${step} times table.`, `落点总是比 ${step} 的倍数多 ${st}。`], [`Take ${st} away from each choice. Which one can you reach by counting by ${step}s?`, `每个选项先减 ${st}，哪个数能 ${step} 个 ${step} 个地数到？`]],
      explain: [`${good} − ${st} = ${good - st}, and ${good - st} is in the count-by-${step}s list. So Roo lands on ${good}.`, `${good} − ${st} = ${good - st}，${good - st} 能 ${step} 个 ${step} 个数到，所以袋鼠会落在 ${good}。`] });
  },
  // 15 · type-in · triangle of dots
  () => {
    const n = ri(5, 8), ans = n * (n + 1) / 2;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Picture 1 has 1 dot. Picture 2 has 3 dots. Picture 3 has 6 dots. Each picture adds a new, longer row at the bottom. How many dots are in picture ${n}?`, `第 1 幅图有 1 个点，第 2 幅有 3 个，第 3 幅有 6 个。每幅图都在下面多加一行，而且一行比一行长。第 ${n} 幅图有几个点？`],
      fig: ptPics([[ptDots(1), '1'], [ptDots(2), '2'], [ptDots(3), '3']]),
      hints: [['Picture 4 adds a row of 4 dots: 6 + 4 = 10.', '第 4 幅加一行 4 个点：6 + 4 = 10。'], [`Picture ${n} has rows of 1, 2, 3, … ${n}. Add them up (use friends of 10!).`, `第 ${n} 幅有 1、2、3……${n} 个点的行，加起来（用凑十！）。`]],
      explain: [`${Array.from({ length: n }, (_, i) => i + 1).join(' + ')} = ${ans}.`, `${Array.from({ length: n }, (_, i) => i + 1).join(' + ')} = ${ans}。`] });
  },
  // 16 · choice · which column
  () => {
    const n = ri(26, 99), col = (n - 1) % 5, rowEnd = n - 1 - col;
    return cq({ pts: 4, choices: ['A', 'B', 'C', 'D', 'E'], answer: col,
      q: [`Roo writes the numbers in rows of 5, like this. In which column will ${n} be?`, `袋鼠把数按每行 5 个写下去，像下面这样。${n} 会在哪一列？`], fig: ptGrid(5, 3),
      hints: [['Column E has 5, 10, 15, … the count-by-5s numbers.', 'E 列是 5、10、15……都是 5 的倍数。'], [`${rowEnd} is in column E. Count on from there.`, `${rowEnd} 在 E 列，从它往后数。`]],
      explain: [`${rowEnd} ends a row in column E, so ${rowEnd + 1} starts the next row in column A. ${n} is in column ${'ABCDE'[col]}.`, `${rowEnd} 在 E 列（一行的最后），${rowEnd + 1} 在下一行的 A 列，所以 ${n} 在 ${'ABCDE'[col]} 列。`] });
  },
  // 17 · type-in · add the two before
  () => {
    const a = ri(1, 4), b = ri(a, a + 4), s = [a, b];
    while (s.length < 6) s.push(s[s.length - 1] + s[s.length - 2]);
    return cq({ pts: 5, input: true, answer: s[5],
      q: [`Each number is the sum of the two numbers before it. What comes next? ${s.slice(0, 5).join(', ')}, __`, `每个数都等于它前面两个数的和。下一个数是几？${s.slice(0, 5).join('、')}、__`],
      hints: [[`Check: ${s[0]} + ${s[1]} = ${s[2]}.`, `检查一下：${s[0]} + ${s[1]} = ${s[2]}。`], [`Next: ${s[3]} + ${s[4]} = ?`, `下一个：${s[3]} + ${s[4]} = ?`]],
      explain: [`${s[3]} + ${s[4]} = ${s[5]}.`, `${s[3]} + ${s[4]} = ${s[5]}。`] });
  },
  // 18 · choice · count beads of one color
  () => {
    const r = ri(1, 3), b = ri(2, 4), p = r + b, n = ri(2 * p + 3, 36), full = Math.floor(n / p), left = n % p, ans = full * b + Math.max(0, left - r);
    return cq({ pts: 5, ...numChoices(ans, [ans + 1, ans - 1, n - ans, ans + b]),
      q: [`A necklace has ${r} red bead${r > 1 ? 's' : ''}, then ${b} blue beads, again and again. How many blue beads are among the first ${n} beads?`, `一串项链按 ${r} 个红珠子、${b} 个蓝珠子重复。前 ${n} 个珠子里有几个蓝珠子？`],
      fig: ptBeads(r, b, 2 * p),
      hints: [[`One group has ${p} beads: ${r} red and ${b} blue.`, `一组有 ${p} 个珠子：${r} 红 ${b} 蓝。`], [`${full} full groups make ${full * p} beads. Then look at the ${left} bead${left === 1 ? '' : 's'} left over.`, `${full} 个整组是 ${full * p} 个珠子，再看剩下的 ${left} 个。`]],
      explain: [`${full} groups give ${full} × ${b} = ${full * b} blue. The last ${left} bead${left === 1 ? '' : 's'} add${left === 1 ? 's' : ''} ${Math.max(0, left - r)} more blue. Total ${ans}.`, `${full} 组有 ${full} × ${b} = ${full * b} 个蓝珠子，剩下的 ${left} 个里还有 ${Math.max(0, left - r)} 个蓝的。一共 ${ans} 个。`] });
  },
  // 19 · type-in · how many digits
  () => {
    const n = ri(15, 60), ans = 9 + 2 * (n - 9);
    return cq({ pts: 5, input: true, answer: ans,
      q: [`Roo writes all the numbers from 1 to ${n}. How many digits does Roo write in all?`, `袋鼠把 1 到 ${n} 的数全写出来。一共写了多少个数字？`],
      hints: [['1 to 9 are one-digit numbers: 9 digits.', '1 到 9 是一位数：9 个数字。'], [`10 to ${n} are two-digit numbers. How many numbers is that? Each one has 2 digits.`, `10 到 ${n} 是两位数，有几个数？每个数有 2 个数字。`]],
      explain: [`1–9: 9 digits. 10–${n}: ${n - 9} numbers × 2 = ${2 * (n - 9)} digits. 9 + ${2 * (n - 9)} = ${ans}.`, `1–9：9 个数字。10–${n}：${n - 9} 个数，每个 2 个数字，共 ${2 * (n - 9)} 个。9 + ${2 * (n - 9)} = ${ans}。`] });
  },
  // 20 · choice · boss
  cq({ pts: 5, boss: true, choices: ['K', 'A', 'N', 'G', 'O'], answer: 4,
    q: ['Boss question! Roo writes KANGAROO again and again: KANGAROOKANGAROOKANGAROO… What is the 2024th letter?', 'Boss 题！袋鼠一遍一遍地写 KANGAROO：KANGAROOKANGAROOKANGAROO……第 2024 个字母是什么？'],
    hints: [['KANGAROO has 8 letters, so the word ends at letter 8, 16, 24, …', 'KANGAROO 有 8 个字母，每个单词结束在第 8、16、24……个字母。'], ['8 × 250 = 2000 ends a word. Then 24 more letters is 3 more whole words.', '8 × 250 = 2000 是一个单词的结尾，再往后 24 个字母正好是 3 个完整的单词。']],
    explain: ['2000 = 8 × 250 and 24 = 8 × 3, so 2024 = 8 × 253. Letter 2024 is the end of a word: the last O.', '2000 = 8 × 250，24 = 8 × 3，所以 2024 = 8 × 253。第 2024 个字母正好是一个单词的结尾：最后的 O。'] })
];

registerSeries({
  id: 'patterns', camp: true, breakEvery: 10, perRound: 20, games: ['jump', 'bubbles'],
  tag: ['Thinking Camp · Patterns', '竞赛思维 · 规律营'], name: ['Pattern Detective', '规律小侦探'],
  desc: ['Repeating shapes, number rules, the 100th item, days of the week', '重复的图形、数字规律、第 100 个、星期循环'],
  lesson: LESSON_PATTERNS,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_PATTERNS
});
