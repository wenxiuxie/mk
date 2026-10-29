// 和差年龄营 — Sum & Difference Camp (competition thinking): even it out (移多补少), sum and difference (和差), ages.
// 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Key ideas: giving k away changes the difference by 2k; take the extra off first, then halve; an age difference never changes.

const SD_NAMES = ['Ann', 'Ben', 'Cora', 'Dan', 'Eve', 'Finn', 'Ivy', 'Jack', 'Lily', 'Max', 'Nora', 'Gus'];
const sdTwo = () => shuffle(SD_NAMES).slice(0, 2);
// a bigger/smaller pair with an even gap: [small, big]
const sdPair = (lo, hi) => { let a, b; do { a = ri(lo, hi); b = ri(lo, hi); } while (a >= b || (b - a) % 2); return [a, b]; };
// sum and difference with the same parity: [sum, diff]
const sdSD = (sLo, sHi, dLo, dHi) => { let s, d; do { s = ri(sLo, sHi); d = ri(dLo, dHi); } while ((s + d) % 2 || d >= s); return [s, d]; };
const sdBarsTool = (rows, names, icon = 'marble') => ({ tool: 'bars', cfg: { rows, names, icon } });

// ---------- mini-lesson pictures ----------
const sdRow = (n, d, mark = -1, icon = 'marble') => `<div class="chips" style="gap:3px;justify-content:flex-start;min-height:30px">${Array.from({ length: n }, (_, i) =>
  `<span class="appear" style="animation-delay:${d + i * .08}s">${item(i >= mark && mark > -1 ? 'berry' : icon, 'sm')}</span>`).join('')}</div>`;
const sdLine = (name, n, d, mark, icon) => `<div style="display:grid;grid-template-columns:52px 1fr;align-items:center;gap:8px;width:100%;max-width:420px"><b style="text-align:right">${name}</b>${sdRow(n, d, mark, icon)}</div>`;
// bar model: a short bar and a long bar = short + extra
function sdModel(small, extra, d = 0, total = '') {
  const u = 260 / (2 * small + extra), w1 = small * u, w2 = extra * u;
  return `<svg viewBox="0 0 360 120" width="340" style="max-width:100%;height:auto" role="img" aria-label="bar model">
    <g class="appear" style="animation-delay:${d}s"><text x="40" y="38" text-anchor="end" font-size="15" font-weight="800">Ann</text>
      <rect x="50" y="20" width="${w1}" height="26" rx="5" fill="#3a76b8"/><rect x="${50 + w1}" y="20" width="${w2}" height="26" rx="5" fill="#d6413f"/>
      <text x="${50 + w1 + w2 / 2}" y="16" text-anchor="middle" font-size="13" font-weight="800" fill="#d6413f">${extra} more</text></g>
    <g class="appear" style="animation-delay:${d + .6}s"><text x="40" y="82" text-anchor="end" font-size="15" font-weight="800">Ben</text>
      <rect x="50" y="64" width="${w1}" height="26" rx="5" fill="#3a76b8"/></g>
    ${total ? `<g class="appear" style="animation-delay:${d + 1.2}s"><path d="M${60 + w1 + w2} 20 q12 0 12 12 v40 q0 12 -12 12" fill="none" stroke="#1f2b3a" stroke-width="2"/><text x="${80 + w1 + w2}" y="60" font-size="15" font-weight="800">${total}</text></g>` : ''}
  </svg>`;
}

const LESSON_SUMDIFF = [
  {
    title: ['Even it out', '移多补少'],
    text: ['Ann has 9 marbles and Ben has 5. Ann has 4 more. To make them the same, Ann gives Ben half of the extra: 4 ÷ 2 = 2. Now both have 7!',
      'Ann 有 9 颗弹珠，Ben 有 5 颗，Ann 多 4 颗。要一样多，Ann 把多出来的一半给 Ben：4 ÷ 2 = 2 颗。现在两人都是 7 颗！'],
    art(el) {
      el.innerHTML = sdLine('Ann', 9, .2, 5) + sdLine('Ben', 5, .9) + lessonEq('9 − 5 = 4　4 ÷ 2 = <span class="hl">2</span>', 2) + sdLine('Ann', 7, 3) + sdLine('Ben', 7, 3.4);
    }
  },
  {
    title: ['Giving changes the gap twice', '给出 1 个，差距变化 2 个'],
    text: ['When Ann gives Ben 1 marble, Ann has 1 less AND Ben has 1 more. The gap shrinks by 2! If giving 3 makes them equal, Ann had 6 more.',
      'Ann 给 Ben 1 颗，Ann 少了 1 颗，Ben 又多了 1 颗，差距一下缩小 2！如果给 3 颗正好一样多，说明 Ann 原来多 6 颗。'],
    art(el) {
      el.innerHTML = sdLine('Ann', 10, .2, 7) + sdLine('Ben', 4, .9) + lessonEq('3 + 3 = <span class="hl">6</span>', 2);
    }
  },
  {
    title: ['Sum and difference', '和差问题'],
    text: ['Together they have 14. Ann has 4 more than Ben. Cut off Ann\'s extra 4: 14 − 4 = 10. Now the two bars are equal, so Ben has 10 ÷ 2 = 5, and Ann has 5 + 4 = 9.',
      '两人一共 14 个，Ann 比 Ben 多 4 个。先把 Ann 多的 4 个去掉：14 − 4 = 10。现在两段一样长，Ben 有 10 ÷ 2 = 5 个，Ann 有 5 + 4 = 9 个。'],
    art(el) {
      el.innerHTML = sdModel(5, 4, .2, 14) + lessonEq('14 − 4 = 10', 2) + lessonEq('10 ÷ 2 = <span class="hl">5</span>　5 + 4 = <span class="hl">9</span>', 3);
    }
  },
  {
    title: ['The age gap never changes', '年龄差永远不变'],
    text: ['Roo is 8 and Mom is 35. Mom is 27 years older. Every year BOTH get 1 year older, so in 10 years Mom is still 27 years older: 18 and 45.',
      '袋鼠 8 岁，妈妈 35 岁，妈妈大 27 岁。每过一年两人都长 1 岁，所以 10 年后妈妈还是大 27 岁：18 岁和 45 岁。'],
    art(el) {
      el.innerHTML = lessonEq('35 − 8 = 27', .3) + lessonEq('18 → 45:　45 − 18 = <span class="hl">27</span>', 1.4);
    }
  },
  {
    title: ['Ages together grow faster', '年龄和每年长得更快'],
    text: ['Roo and his cousin are 6 and 9: together 15. Next year each is 1 older, so together they are 2 years older: 17. With 3 people, the total grows by 3 each year.',
      '袋鼠和表哥 6 岁和 9 岁，合起来 15 岁。过一年每人长 1 岁，合起来长 2 岁：17 岁。3 个人的话，年龄和每年长 3 岁。'],
    art(el) {
      el.innerHTML = lessonEq('6 + 9 = 15', .3) + lessonEq('7 + 10 = <span class="hl">17</span> = 15 + 2', 1.4);
    }
  },
  {
    title: ['Your mission, Captain!', '船长，你的任务来啦！'],
    text: ['20 puzzles about evening out, sum and difference, and ages. Draw bars or move counters! After 10 you play a 60-second game. Ready?',
      '20 道题：移多补少、和差问题、年龄问题。画线段图或者挪一挪圆片！做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const Q_SUMDIFF = [
  // 1 · type-in · how many to give so they are equal
  () => {
    const [b, a] = sdPair(3, 16), [x, y] = sdTwo(), ans = (a - b) / 2;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`${x} has ${a} marbles and ${y} has ${b} marbles. How many marbles must ${x} give ${y} so they have the same number?`, `${x} 有 ${a} 颗弹珠，${y} 有 ${b} 颗。${x} 要给 ${y} 几颗，两人才一样多？`],
      hints: [[`${x} has ${a} − ${b} = ${a - b} more.`, `${x} 多 ${a} − ${b} = ${a - b} 颗。`], ['Give away half of the extra, not all of it!', '只给多出来的一半，不是全部！']],
      explain: [`${a - b} ÷ 2 = ${ans}. Then both have ${(a + b) / 2}.`, `${a - b} ÷ 2 = ${ans}，然后两人都有 ${(a + b) / 2} 颗。`], ...sdBarsTool([a, b], [x, y]) });
  },
  // 2 · choice · how many each after evening out
  () => {
    const [b, a] = sdPair(3, 16), [x, y] = sdTwo(), ans = (a + b) / 2;
    return cq({ pts: 3, ...numChoices(ans, [a - b, (a - b) / 2, a + b, ans + 1]),
      q: [`${x} has ${a} stickers and ${y} has ${b}. ${x} gives some to ${y} until they have the same number. How many stickers does each one have then?`, `${x} 有 ${a} 张贴纸，${y} 有 ${b} 张。${x} 给 ${y} 一些，直到两人一样多。这时每人有几张？`],
      hints: [['Giving does not change how many there are together.', '送来送去，两人合起来的总数不变。'], [`Together: ${a} + ${b} = ${a + b}. Share it into 2 equal parts.`, `一共 ${a} + ${b} = ${a + b} 张，平均分成 2 份。`]],
      explain: [`(${a} + ${b}) ÷ 2 = ${a + b} ÷ 2 = ${ans}.`, `(${a} + ${b}) ÷ 2 = ${a + b} ÷ 2 = ${ans} 张。`], ...sdBarsTool([a, b], [x, y], 'sticker') });
  },
  // 3 · type-in · the gap stays the same
  () => {
    const [x] = sdTwo(), a = ri(6, 10), d = ri(2, 5), k = ri(3, 12), ans = a + k - d;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`${x} is ${a} years old and ${x}'s little brother is ${a - d}. When ${x} is ${a + k}, how old will the brother be?`, `${x} ${a} 岁，弟弟 ${a - d} 岁。等 ${x} ${a + k} 岁的时候，弟弟几岁？`],
      hints: [[`${x} is ${d} years older than the brother. Does that ever change?`, `${x} 比弟弟大 ${d} 岁。这个会变吗？`], [`${a + k} − ${d} = ?`, `${a + k} − ${d} = ?`]],
      explain: [`The gap is always ${d} years: ${a + k} − ${d} = ${ans}.`, `年龄差永远是 ${d} 岁：${a + k} − ${d} = ${ans} 岁。`] });
  },
  // 4 · choice · sum and difference: the smaller one
  () => {
    const [s, d] = sdSD(10, 24, 2, 8), [x, y] = sdTwo(), ans = (s - d) / 2;
    return cq({ pts: 3, ...numChoices(ans, [s / 2 | 0, (s + d) / 2, s - d, d]),
      q: [`${x} and ${y} have ${s} cookies together. ${x} has ${d} more cookies than ${y}. How many cookies does ${y} have?`, `${x} 和 ${y} 一共有 ${s} 块饼干，${x} 比 ${y} 多 ${d} 块。${y} 有几块？`],
      hints: [[`Take away ${x}'s extra ${d}: ${s} − ${d} = ${s - d}.`, `先去掉 ${x} 多的 ${d} 块：${s} − ${d} = ${s - d}。`], ['Now the two are equal. Split it in half.', '现在两人一样多，再平分。']],
      explain: [`(${s} − ${d}) ÷ 2 = ${s - d} ÷ 2 = ${ans}.`, `(${s} − ${d}) ÷ 2 = ${s - d} ÷ 2 = ${ans} 块。`], ...sdBarsTool([s, 0], [x, y], 'cookie') });
  },
  // 5 · type-in · sum and difference: the bigger one
  () => {
    const [s, d] = sdSD(12, 30, 2, 10), [x, y] = sdTwo(), ans = (s + d) / 2;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`${x} and ${y} picked ${s} apples in all. ${x} picked ${d} more than ${y}. How many apples did ${x} pick?`, `${x} 和 ${y} 一共摘了 ${s} 个苹果，${x} 比 ${y} 多摘 ${d} 个。${x} 摘了几个？`],
      hints: [[`First find ${y}: (${s} − ${d}) ÷ 2 = ${(s - d) / 2}.`, `先求 ${y}：(${s} − ${d}) ÷ 2 = ${(s - d) / 2}。`], [`${x} has ${d} more than that.`, `${x} 再多 ${d} 个。`]],
      explain: [`${y}: ${(s - d) / 2}. ${x}: ${(s - d) / 2} + ${d} = ${ans}.`, `${y}：${(s - d) / 2} 个，${x}：${(s - d) / 2} + ${d} = ${ans} 个。`], ...sdBarsTool([s, 0], [x, y], 'apple') });
  },
  // 6 · choice · how much older later (it never changes)
  () => {
    const g = ri(24, 35), k = ri(5, 20);
    return cq({ pts: 3, ...numChoices(g, [g + k, g - k, g + 2 * k, k]),
      q: [`Dad is ${g} years older than Roo. In ${k} years, how many years older than Roo will Dad be?`, `爸爸比袋鼠大 ${g} 岁。${k} 年以后，爸爸比袋鼠大几岁？`],
      hints: [['Every year, Dad gets 1 year older. What about Roo?', '每过一年爸爸长 1 岁，袋鼠呢？'], ['Both grow the same, so the gap…', '两人长得一样多，所以差……']],
      explain: [`Both get ${k} years older, so the gap is still ${g} years.`, `两人都长了 ${k} 岁，所以还是大 ${g} 岁。`] });
  },
  // 7 · type-in · sum of two ages later
  () => {
    const [x] = sdTwo(), a = ri(4, 9), b = ri(4, 12), k = ri(2, 6), ans = a + b + 2 * k;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Roo is ${a} and ${x} is ${b}. Together they are ${a + b} years old. In ${k} years, how old will they be together?`, `袋鼠 ${a} 岁，${x} ${b} 岁，合起来 ${a + b} 岁。${k} 年以后，他们合起来几岁？`],
      hints: [[`Each one gets ${k} years older.`, `每人都长 ${k} 岁。`], [`Together that is ${k} + ${k} = ${2 * k} more years.`, `合起来多了 ${k} + ${k} = ${2 * k} 岁。`]],
      explain: [`${a + b} + ${2 * k} = ${ans}. (${a + k} + ${b + k} = ${ans}.)`, `${a + b} + ${2 * k} = ${ans} 岁。（${a + k} + ${b + k} = ${ans}。）`] });
  },
  // 8 · choice · giving k makes them equal: how many more at first?
  () => {
    const k = ri(2, 7), b = ri(3, 8), [x, y] = sdTwo(), ans = 2 * k;
    return cq({ pts: 4, ...numChoices(ans, [k, k + 1, 3 * k, ans + 2]),
      q: [`If ${x} gives ${y} ${k} crayons, they will have the same number. How many more crayons does ${x} have than ${y} now?`, `如果 ${x} 给 ${y} ${k} 支蜡笔，两人就一样多。现在 ${x} 比 ${y} 多几支？`],
      hints: [[`When ${x} gives ${k}, ${x} has ${k} less and ${y} has ${k} more.`, `${x} 给出 ${k} 支，自己少 ${k} 支，${y} 又多 ${k} 支。`], ['Try it with the counters below.', '用下面的圆片试一试。']],
      explain: [`The gap closes from both sides: ${k} + ${k} = ${ans}.`, `差距两头缩小：${k} + ${k} = ${ans} 支。`], ...sdBarsTool([b + 2 * k, b], [x, y], 'pencil') });
  },
  // 9 · type-in · two numbers from sum and difference
  () => {
    const [s, d] = sdSD(20, 60, 4, 20), ans = (s + d) / 2;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Two numbers add up to ${s}. One number is ${d} more than the other. What is the bigger number?`, `两个数的和是 ${s}，一个数比另一个大 ${d}。较大的数是多少？`],
      hints: [[`Small number: (${s} − ${d}) ÷ 2.`, `小数：(${s} − ${d}) ÷ 2。`], [`Or big number: (${s} + ${d}) ÷ 2.`, `或者大数：(${s} + ${d}) ÷ 2。`]],
      explain: [`(${s} + ${d}) ÷ 2 = ${ans}. Check: ${ans} + ${(s - d) / 2} = ${s}.`, `(${s} + ${d}) ÷ 2 = ${ans}。验算：${ans} + ${(s - d) / 2} = ${s}。`] });
  },
  // 10 · choice · counting years back and forth
  () => {
    const k = ri(2, 6), x = ri(9, 15), j = ri(1, Math.min(4, x - k - 2)), ans = x - k - j;   // Roo was at least 2 then
    return cq({ pts: 4, ...numChoices(ans, [x - k, x - j, x + k - j, ans + 1]),
      q: [`In ${k} years, Roo will be ${x} years old. How old was Roo ${j} year${j > 1 ? 's' : ''} ago?`, `再过 ${k} 年，袋鼠就 ${x} 岁了。${j} 年前袋鼠几岁？`],
      hints: [[`Roo now: ${x} − ${k} = ${x - k}.`, `袋鼠现在：${x} − ${k} = ${x - k} 岁。`], [`${j} year${j > 1 ? 's' : ''} ago: ${x - k} − ${j}.`, `${j} 年前：${x - k} − ${j}。`]],
      explain: [`Now ${x - k}, so ${j} year${j > 1 ? 's' : ''} ago Roo was ${ans}.`, `现在 ${x - k} 岁，${j} 年前是 ${ans} 岁。`] });
  },
  // 11 · type-in · even out three jars
  () => {
    const e = ri(5, 9), a = e + ri(1, 4), b = e - ri(0, 3), c = 3 * e - a - b, ans = e;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Three jars have ${a}, ${b} and ${c} candies. Roo moves candies until all three jars have the same number. How many candies are in each jar then?`, `三个罐子里分别有 ${a}、${b}、${c} 颗糖。袋鼠挪一挪，让三个罐子一样多。这时每罐有几颗？`],
      hints: [[`All together: ${a} + ${b} + ${c} = ${3 * e}.`, `一共：${a} + ${b} + ${c} = ${3 * e} 颗。`], ['Share them equally into 3 jars.', '平均分到 3 个罐子里。']],
      explain: [`${3 * e} ÷ 3 = ${ans}.`, `${3 * e} ÷ 3 = ${ans} 颗。`], ...sdBarsTool([a, b, c], ['🫙1', '🫙2', '🫙3'], 'candy') });
  },
  // 12 · choice · gap known: how many to give
  () => {
    const d = 2 * ri(2, 9), [x, y] = sdTwo(), ans = d / 2;
    return cq({ pts: 4, ...numChoices(ans, [d, d - 1, d + 2, ans + 1]),
      q: [`${x} has ${d} more stickers than ${y}. How many stickers must ${x} give ${y} so they have the same number?`, `${x} 比 ${y} 多 ${d} 张贴纸。${x} 要给 ${y} 几张，两人才一样多？`],
      hints: [['Is it all of the extra? Remember: giving 1 closes the gap by 2.', '是把多的全给吗？记住：给 1 张，差距缩小 2 张。'], [`${d} ÷ 2 = ?`, `${d} ÷ 2 = ?`]],
      explain: [`Give half the gap: ${d} ÷ 2 = ${ans}.`, `给差的一半：${d} ÷ 2 = ${ans} 张。`] });
  },
  // 13 · type-in · ages from sum and difference
  () => {
    const [s, d] = sdSD(10, 24, 2, 6), [x] = sdTwo(), ans = (s + d) / 2;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Roo and ${x} are ${s} years old together. Roo is ${d} years older than ${x}. How old is Roo?`, `袋鼠和 ${x} 合起来 ${s} 岁，袋鼠比 ${x} 大 ${d} 岁。袋鼠几岁？`],
      hints: [[`${x}: (${s} − ${d}) ÷ 2 = ${(s - d) / 2}.`, `${x}：(${s} − ${d}) ÷ 2 = ${(s - d) / 2} 岁。`], [`Roo is ${d} years older.`, `袋鼠再大 ${d} 岁。`]],
      explain: [`${(s - d) / 2} + ${d} = ${ans}. Check: ${ans} + ${(s - d) / 2} = ${s}.`, `${(s - d) / 2} + ${d} = ${ans} 岁。验算：${ans} + ${(s - d) / 2} = ${s}。`] });
  },
  // 14 · choice · cat and dog weights
  () => {
    const [s, d] = sdSD(16, 40, 4, 14), ans = (s - d) / 2;
    return cq({ pts: 4, ...numChoices(ans, [(s + d) / 2, s - d, s / 2 | 0, d]),
      q: [`A cat and a dog weigh ${s} pounds together. The dog is ${d} pounds heavier than the cat. How much does the cat weigh?`, `一只猫和一只狗一共重 ${s} 磅，狗比猫重 ${d} 磅。猫重几磅？`],
      hints: [[`If the dog lost its extra ${d} pounds, they would weigh ${s - d} together.`, `如果狗减掉多出的 ${d} 磅，两只一共 ${s - d} 磅。`], ['Then they weigh the same. Halve it.', '那时两只一样重，再除以 2。']],
      explain: [`(${s} − ${d}) ÷ 2 = ${ans} pounds.`, `(${s} − ${d}) ÷ 2 = ${ans} 磅。`] });
  },
  // 15 · type-in · together, and giving k makes them equal
  () => {
    const h = ri(8, 20), k = ri(2, Math.min(7, h - 2)), [x, y] = sdTwo(), s = 2 * h, ans = h + k;
    return cq({ pts: 4, input: true, answer: ans, unit: ['dollars', '美元'],
      q: [`${x} and ${y} have ${s} dollars together. If ${x} gives ${y} ${k} dollars, they will have the same amount. How much money does ${x} have now?`, `${x} 和 ${y} 一共有 ${s} 美元。如果 ${x} 给 ${y} ${k} 美元，两人的钱就一样多。${x} 现在有多少钱？`],
      hints: [[`After giving, each has ${s} ÷ 2 = ${h}.`, `给完以后，每人都有 ${s} ÷ 2 = ${h} 美元。`], [`Before giving, ${x} had ${k} more than that.`, `给之前，${x} 比这多 ${k} 美元。`]],
      explain: [`${h} + ${k} = ${ans} dollars.`, `${h} + ${k} = ${ans} 美元。`] });
  },
  // 16 · choice · three ages later
  () => {
    const s = ri(15, 30), k = ri(2, 5), ans = s + 3 * k;
    return cq({ pts: 4, ...numChoices(ans, [s + k, s + 2 * k, s + 3, ans + 1]),
      q: [`The ages of three cousins add up to ${s}. What will their ages add up to in ${k} years?`, `三个表兄妹的年龄加起来是 ${s} 岁。${k} 年以后，三人年龄加起来是多少？`],
      hints: [[`Each cousin gets ${k} years older.`, `每人都长 ${k} 岁。`], [`3 cousins: 3 × ${k} = ${3 * k} more years in all.`, `3 个人：一共多 3 × ${k} = ${3 * k} 岁。`]],
      explain: [`${s} + 3 × ${k} = ${s} + ${3 * k} = ${ans}.`, `${s} + 3 × ${k} = ${s} + ${3 * k} = ${ans} 岁。`] });
  },
  // 17 · type-in · two ribbons
  () => {
    const [s, d] = sdSD(20, 60, 4, 16), ans = (s + d) / 2;
    return cq({ pts: 5, input: true, answer: ans, unit: ['inches', '英寸'],
      q: [`Roo cuts a ribbon ${s} inches long into two pieces. One piece is ${d} inches longer than the other. How long is the longer piece?`, `袋鼠把一根 ${s} 英寸长的丝带剪成两段，一段比另一段长 ${d} 英寸。长的那段有多长？`],
      hints: [[`Short piece: (${s} − ${d}) ÷ 2 = ${(s - d) / 2}.`, `短的：(${s} − ${d}) ÷ 2 = ${(s - d) / 2}。`], [`Long piece: ${(s - d) / 2} + ${d}.`, `长的：${(s - d) / 2} + ${d}。`]],
      explain: [`${(s - d) / 2} + ${d} = ${ans} inches.`, `${(s - d) / 2} + ${d} = ${ans} 英寸。`] });
  },
  // 18 · choice · Mom and Roo: sum of ages and age gap
  () => {
    const r = ri(5, 10), g = ri(24, 32), s = 2 * r + g;
    return cq({ pts: 5, ...numChoices(r, [r + g, s - g, s / 2 | 0, r + 1].filter(v => v !== r)),
      q: [`Mom is ${g} years older than Roo. Their ages add up to ${s}. How old is Roo?`, `妈妈比袋鼠大 ${g} 岁，两人年龄加起来是 ${s} 岁。袋鼠几岁？`],
      hints: [[`Take Mom's extra ${g} years away: ${s} − ${g} = ${s - g}.`, `去掉妈妈多出来的 ${g} 岁：${s} − ${g} = ${s - g}。`], ['That is two Roos. Halve it.', '这是两个袋鼠的年龄，再除以 2。']],
      explain: [`(${s} − ${g}) ÷ 2 = ${r}. Mom is ${r + g}.`, `(${s} − ${g}) ÷ 2 = ${r} 岁，妈妈 ${r + g} 岁。`] });
  },
  // 19 · type-in · when will Mom be 3 times as old
  () => {
    const r0 = ri(10, 14), x = ri(2, 7), roo = r0 - x, mom = 3 * r0 - x;
    return cq({ pts: 5, input: true, answer: x,
      q: [`Roo is ${roo} and Mom is ${mom}. In how many years will Mom be exactly 3 times as old as Roo?`, `袋鼠 ${roo} 岁，妈妈 ${mom} 岁。再过几年，妈妈的年龄正好是袋鼠的 3 倍？`],
      hints: [['Make a table: in 1 year, in 2 years, … Write both ages each time.', '列个表：1 年后、2 年后……每次写下两人的年龄。'], [`The gap is always ${mom - roo}. When Mom is 3 times Roo, the gap is 2 Roos.`, `年龄差永远是 ${mom - roo} 岁。妈妈是 3 倍时，差正好是袋鼠年龄的 2 倍。`]],
      explain: [`In ${x} years Roo is ${r0} and Mom is ${3 * r0} = 3 × ${r0}.`, `${x} 年后袋鼠 ${r0} 岁，妈妈 ${3 * r0} 岁 = 3 × ${r0}。`] });
  },
  // 20 · choice · boss: three kids, each 2 more
  cq({ pts: 5, boss: true, ...numChoices(12, [10, 8, 14, 15]),
    q: ['Boss question! Ann, Ben and Cora have 30 candies together. Ann has 2 more than Ben, and Ben has 2 more than Cora. How many candies does Ann have?',
      'Boss 题！Ann、Ben 和 Cora 一共有 30 颗糖。Ann 比 Ben 多 2 颗，Ben 比 Cora 多 2 颗。Ann 有几颗？'],
    hints: [['Ben is in the middle. Ann has 2 more than Ben, Cora has 2 fewer.', 'Ben 在中间：Ann 比他多 2 颗，Cora 比他少 2 颗。'], ['Move 2 candies from Ann to Cora: now all three are equal.', '从 Ann 那里挪 2 颗给 Cora，三人就一样多了。']],
    explain: ['30 ÷ 3 = 10, so Ben has 10, Cora has 8 and Ann has 12. Check: 12 + 10 + 8 = 30.', '30 ÷ 3 = 10，所以 Ben 有 10 颗，Cora 8 颗，Ann 12 颗。验算：12 + 10 + 8 = 30。'],
    tool: 'bars', cfg: { rows: [30, 0, 0], names: ['Ann', 'Ben', 'Cora'], icon: 'candy' } })
];

registerSeries({
  id: 'sumdiff', camp: true, breakEvery: 10, perRound: 20, games: ['balance', 'coins'],
  tag: ['Thinking Camp · Sums & Ages', '竞赛思维 · 和差年龄营'], name: ['Even It Out', '移多补少小能手'],
  desc: ['Even it out, sum and difference, age puzzles', '移多补少、和差问题、年龄问题'],
  lesson: LESSON_SUMDIFF,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_SUMDIFF
});
