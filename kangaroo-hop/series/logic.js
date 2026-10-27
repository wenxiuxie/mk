// 逻辑营 — Logic Camp (competition thinking): lines and places, order clues, logic tables, truth and lies, "to be sure" puzzles.
// 20 questions a round: 10 pick-a-choice, 10 type-in (they alternate).
// Puzzles are made at random and then solved by trying every possibility, so each one has exactly one answer.

const LG_NAMES = ['Ann', 'Ben', 'Cora', 'Dan', 'Eve', 'Finn', 'Gus', 'Ivy', 'Jack', 'Lily', 'Max', 'Nora'];
const LG_CANT = TI("Can't tell", '无法确定');
const lgPerms = a => a.length <= 1 ? [a] : a.flatMap((x, i) => lgPerms(a.filter((_, j) => j !== i)).map(p => [x, ...p]));
const lgOrd = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
const lgKid = (c, cls = '', d = 0) => `<svg class="${cls}" style="animation-delay:${d}s" viewBox="0 0 30 44"><circle cx="15" cy="9" r="7" fill="#f3c99a"/><path d="M5 44 L7 22 Q15 16 23 22 L25 44 Z" fill="${c}"/></svg>`;

// ---------- order puzzles ----------
// words for "comes before" in each story; index 0 of an order is first / tallest / oldest / most
const LG_WORDS = {
  line: { before: ['is somewhere in front of', '站在 {Y} 前面的某个位置'], right: ['is right in front of', '紧挨着站在 {Y} 前面'], first: ['is first in line', '排第一'], last: ['is last in line', '排最后'], notFirst: ['is not first', '不是第一个'], notLast: ['is not last', '不是最后一个'] },
  race: { before: ['finished before', '比 {Y} 先到终点'], right: ['finished right before', '紧挨着在 {Y} 前面到终点'], first: ['won the race', '得了第一'], last: ['finished last', '最后一个到'], notFirst: ['did not win', '没有得第一'], notLast: ['was not last', '不是最后一个到'] },
  tall: { before: ['is taller than', '比 {Y} 高'] },
  old: { before: ['is older than', '比 {Y} 大'], after: ['is younger than', '比 {Y} 小'] },
  cookies: { before: ['ate more cookies than', '比 {Y} 吃的饼干多'], after: ['ate fewer cookies than', '比 {Y} 吃的饼干少'] }
};
// every true clue about the order, as { ok(perm), en, zh }
function lgClues(order, words) {
  const out = [], at = (p, x) => p.indexOf(x), n = order.length;
  const say = (k, x, y) => ({ en: `${x} ${words[k][0]}${y ? ' ' + y : ''}.`, zh: `${x} ${words[k][1].replace('{Y}', y || '')}。` });
  order.forEach((x, i) => order.forEach((y, j) => {
    if (i < j && words.before) out.push({ ok: p => at(p, x) < at(p, y), ...say('before', x, y) });
    if (i < j && words.after) out.push({ ok: p => at(p, y) > at(p, x), ...say('after', y, x) });
    if (j === i + 1 && words.right) out.push({ ok: p => at(p, y) === at(p, x) + 1, ...say('right', x, y) });
  }));
  if (words.first) {
    out.push({ ok: p => p[0] === order[0], ...say('first', order[0]) }, { ok: p => p[n - 1] === order[n - 1], ...say('last', order[n - 1]) });
    order.slice(1).forEach(x => out.push({ ok: p => p[0] !== x, ...say('notFirst', x) }));
    order.slice(0, -1).forEach(x => out.push({ ok: p => p[n - 1] !== x, ...say('notLast', x) }));
  }
  return out;
}
// clues are added until the asked-for person is certain, then any clue that is not needed is dropped
function lgOrderPuzzle(n, words, askAt) {
  const order = shuffle(LG_NAMES).slice(0, n), all = lgPerms(order), pool = shuffle(lgClues(order, words));
  const sure = cl => new Set(all.filter(p => cl.every(c => c.ok(p))).map(p => p[askAt(n)])).size === 1;
  const clues = [];
  for (const c of pool) { if (sure(clues)) break; clues.push(c); }
  for (let i = clues.length - 1; i >= 0; i--) { const rest = clues.filter((_, j) => j !== i); if (sure(rest)) clues.splice(i, 1); }
  return { order, clues, answer: order[askAt(n)] };
}
const lgList = clues => `<ul class="clues">${clues.map(c => `<li>${T(c.en, c.zh)}</li>`).join('')}</ul>`;
const lgPuzzleData = (order, clues) => ({ names: [...order].sort(), clues: clues.map(c => c.en) });

// ---------- who did it: truth and lies ----------
// statement kinds about the culprit c, said by kid s about kid t
const LG_SAYS = {
  did: (s, t) => [c => c === t, s === t ? ['I did it.', '是我干的。'] : [`${t} did it.`, `是 ${t} 干的。`]],
  didnt: (s, t) => [c => c !== t, s === t ? ["I didn't do it.", '不是我干的。'] : [`${t} didn't do it.`, `不是 ${t} 干的。`]]
};
function lgLiars(n) {
  for (;;) {
    const kids = shuffle(LG_NAMES).slice(0, n), lieMode = Math.random() < .5;
    const says = kids.map(s => { const kind = pick(['did', 'didnt', 'didnt']), t = pick(kids); return { s, kind, t, f: LG_SAYS[kind](s, t)[0], text: LG_SAYS[kind](s, t)[1] }; });
    const fits = kids.filter(c => { const tr = says.filter(x => x.f(c)).length; return lieMode ? n - tr === 1 : tr === 1; });
    if (fits.length === 1) return { kids, says, lieMode, culprit: fits[0] };
  }
}

// ---------- logic table: each kid has exactly one of the things ----------
function lgTable(things) {
  const kids = shuffle(LG_NAMES).slice(0, 3), has = shuffle(things.map((_, i) => i)), all = lgPerms([0, 1, 2]);
  const facts = [];
  kids.forEach((k, i) => things.forEach((t, j) => facts.push({ i, j, yes: has[i] === j })));
  const pool = [...shuffle(facts.filter(f => !f.yes)), ...shuffle(facts.filter(f => f.yes))];   // "does not have" clues first: they are more fun
  const fits = cl => all.filter(p => cl.every(f => (p[f.i] === f.j) === f.yes));
  const clues = [];
  for (const f of pool) { if (fits(clues).length === 1) break; if (fits([...clues, f]).length < fits(clues).length) clues.push(f); }
  return { kids, has, clues };
}

// ---------- mini-lesson ----------
const LESSON_LOGIC = [
  {
    title: ['Counting a line', '数队伍'],
    text: ['Roo is 4th from the front and 3rd from the back. Count the kids: 4 + 3 = 7? No! Roo was counted twice. 4 + 3 − 1 = 6 kids.',
      '袋鼠从前往后数是第 4 个，从后往前数是第 3 个。4 + 3 = 7 吗？不对！袋鼠被数了两次。4 + 3 − 1 = 6 个人。'],
    art(el) {
      el.innerHTML = `<div class="ordends" style="width:100%;max-width:300px"><span>${TI('front', '前')}</span><span>${TI('back', '后')}</span></div>
        <div class="kidrow">${[0, 1, 2, 3, 4, 5].map(i => lgKid(i === 3 ? '#c8742c' : '#3a76b8', 'appear' + (i === 3 ? ' me' : ''), .2 + i * .2)).join('')}</div>`
        + lessonEq('4 + 3 − <span class="hl">1</span> = 6', 1.8);
    }
  },
  {
    title: ['Order clues', '排顺序的线索'],
    text: ['Ann is taller than Ben. Cora is taller than Ann. Put them in order one clue at a time: Cora, Ann, Ben. So Cora is the tallest and Ben is the shortest.',
      'Ann 比 Ben 高，Cora 比 Ann 高。一条一条线索排：Cora、Ann、Ben。所以 Cora 最高，Ben 最矮。'],
    art(el) {
      el.innerHTML = `<ul class="clues"><li class="appear" style="animation-delay:.2s">${T('Ann is taller than Ben.', 'Ann 比 Ben 高。')}</li><li class="appear" style="animation-delay:.8s">${T('Cora is taller than Ann.', 'Cora 比 Ann 高。')}</li></ul>
        <div class="pics" style="align-items:flex-end">${[['Cora', 70], ['Ann', 55], ['Ben', 40]].map(([n, h], i) => `<div class="appear" style="animation-delay:${1.6 + i * .4}s"><span style="display:block;width:44px;height:${h}px;background:#3a76b8;border-radius:8px 8px 0 0"></span><small>${n}</small></div>`).join('')}</div>`;
    }
  },
  {
    title: ['Logic tables', '逻辑表格'],
    text: ['Ann, Ben and Cora each have one pet. Ben does not have the cat. Ann has the dog. Mark ✓ for Ann and the dog, then ✗ the rest of that row and column. Each row and column needs one ✓!',
      'Ann、Ben、Cora 每人养一种宠物。Ben 没有养猫，Ann 养的是狗。先给 Ann 和狗打 ✓，同一行同一列的其他格打 ✗。每行每列都只有一个 ✓！'],
    art(el) {
      const mark = (m, d) => `<td><button class="${m === '✓' ? 'yes' : 'no'} appear" style="animation-delay:${d}s">${m}</button></td>`;
      el.innerHTML = `<table class="lgrid"><tr><th></th><th>🐶</th><th>🐱</th><th>🐟</th></tr>
        <tr><th>Ann</th>${mark('✓', .6)}${mark('✗', 1)}${mark('✗', 1.1)}</tr>
        <tr><th>Ben</th>${mark('✗', 1.3)}${mark('✗', 1.8)}${mark('✓', 2.4)}</tr>
        <tr><th>Cora</th>${mark('✗', 1.4)}${mark('✓', 2.8)}${mark('✗', 2.6)}</tr></table>`
        + lessonEq('Ann 🐶 · Ben 🐟 · Cora 🐱', 3.3);
    }
  },
  {
    title: ['Truth and lies', '真话和假话'],
    text: ['Ann: "Ben did it." Ben: "Cora did it." Cora: "Ben is lying." Exactly one of them is lying. Try each kid as the one who did it, and count the lies. Only "Ben did it" gives exactly one lie!',
      'Ann：“是 Ben 干的。” Ben：“是 Cora 干的。” Cora：“Ben 在说谎。” 他们中只有一个人说谎。把每个人都假设成“干的人”，数一数有几句假话。只有“是 Ben 干的”正好一句假话！'],
    art(el) {
      el.innerHTML = `<table class="ngrid"><tr><th>${TI('If…', '假设…')}</th><th>${TI('lies', '假话')}</th></tr>
        ${[['Ann', 2], ['Ben', 1], ['Cora', 2]].map(([n, l], i) => `<tr class="appear" style="animation-delay:${.4 + i * .7}s"><td>${n}</td><td>${l}${l === 1 ? ' ✓' : ' ✗'}</td></tr>`).join('')}</table>`
        + lessonEq(TI('Ben did it!', '是 Ben 干的！'), 2.8);
    }
  },
  {
    title: ['To be sure', '一定能拿到'],
    text: ['A drawer has red, blue and green socks. In the dark, how many must Roo take to be SURE of two the same color? Unlucky first 3: one of each color. The 4th sock must match one of them!',
      '抽屉里有红、蓝、绿三种袜子。黑暗中至少拿几只，才能保证有两只同色？最倒霉的情况：前 3 只颜色都不同。第 4 只一定和其中一只同色！'],
    art(el) {
      el.innerHTML = `<div class="beads">${['#d6413f', '#3a76b8', '#2f8f6b'].map((c, i) => `<i class="appear" style="background:${c};width:34px;height:34px;animation-delay:${.3 + i * .5}s"></i>`).join('')}
        <i class="appear" style="background:#3a76b8;width:34px;height:34px;animation-delay:2.2s;outline:3px solid #f2b630"></i></div>`
        + lessonEq('3 + 1 = <span class="hl">4</span>', 2.8);
    }
  },
  {
    title: ['Your mission, detective!', '小侦探，任务来啦！'],
    text: ['20 puzzles: lines, races, tables, liars and socks. Read every clue slowly and use the hands-on box. After 10 you play a 60-second game. Ready?',
      '20 道谜题：排队、赛跑、表格、说谎的人和袜子。每条线索慢慢读，多用动手区。做完 10 题玩一次 60 秒小游戏。准备好了吗？'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110" style="animation:cheer 1s ease-out .3s both"><use href="#roo"/></svg>
        <div class="chips">${['20 ?', '🎮 60s', '👑 Boss'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;font-size:22px;animation-delay:${.8 + i * .4}s">${t}</span>`).join('')}</div>`;
    }
  }
];

// ---------- questions ----------
const lgNameChoices = (names, ans, cant = true) => { const ch = [...names].sort(); if (cant) ch.push(LG_CANT); return { choices: ch, answer: ch.indexOf(ans) }; };
const lgOrderQ = (n, ctx, askAt, ask, pts, places) => {
  const { order, clues, answer } = lgOrderPuzzle(n, LG_WORDS[ctx], askAt);
  return cq({ pts, ...lgNameChoices(order, answer, n < 5),
    q: [`${ask[0]}`, `${ask[1]}`], fig: lgList(clues), data: { ...lgPuzzleData(order, clues), ctx, at: askAt(n) },
    hints: [['Take one clue at a time. Put the names in order with the hands-on box.', '一条一条看线索，用动手区把名字排好。'], ['After moving names, check every clue again.', '挪动名字以后，把每条线索再检查一遍。']],
    explain: [`The order is ${order.join(', ')}. So the answer is ${answer}.`, `顺序是 ${order.join('、')}，所以答案是 ${answer}。`],
    tool: 'order', cfg: { items: [...order].sort(), places, ends: ctx === 'line' ? [['front', '前'], ['back', '后']] : null } });
};
const LG_PLACE_TALL = [['tallest', '最高'], ['2nd', '第 2'], ['3rd', '第 3'], ['4th', '第 4'], ['shortest', '最矮']];

const Q_LOGIC = [
  // 1 · type-in · front and back
  () => {
    const a = ri(3, 9), b = ri(3, 9);
    return cq({ pts: 3, input: true, answer: a + b - 1,
      q: [`Kids stand in a line. Roo is ${lgOrd(a)} from the front and ${lgOrd(b)} from the back. How many kids are in the line?`, `小朋友排成一队。袋鼠从前往后数是第 ${a} 个，从后往前数是第 ${b} 个。这一队有多少人？`],
      hints: [[`There are ${a - 1} kids in front of Roo and ${b - 1} behind Roo.`, `袋鼠前面有 ${a - 1} 人，后面有 ${b - 1} 人。`], ["Don't count Roo twice!", '别把袋鼠数两次！']],
      explain: [`${a - 1} in front + Roo + ${b - 1} behind = ${a + b - 1}. (Or ${a} + ${b} − 1.)`, `前面 ${a - 1} 人 + 袋鼠 + 后面 ${b - 1} 人 = ${a + b - 1}。（也就是 ${a} + ${b} − 1。）`] });
  },
  // 2 · choice · who is tallest / shortest
  () => {
    const top = Math.random() < .5;
    return lgOrderQ(5, 'tall', () => top ? 0 : 4, top ? ['Who is the tallest?', '谁最高？'] : ['Who is the shortest?', '谁最矮？'], 3, LG_PLACE_TALL);
  },
  // 3 · type-in · how many between
  () => {
    const a = ri(2, 6), b = a + ri(3, 9);
    return cq({ pts: 3, input: true, answer: b - a - 1,
      q: [`In a line, Roo is ${lgOrd(a)} from the front and Joey is ${lgOrd(b)} from the front. How many kids are between them?`, `在一队里，袋鼠从前往后是第 ${a} 个，小袋鼠是第 ${b} 个。他们中间有几个人？`],
      hints: [[`The kids between are number ${a + 1} up to number ${b - 1}.`, `中间的人是第 ${a + 1} 个到第 ${b - 1} 个。`], [`${b} − ${a} counts Joey too, so take 1 away.`, `${b} − ${a} 把小袋鼠也算进去了，要再减 1。`]],
      explain: [`From ${a + 1} to ${b - 1} is ${b} − ${a} − 1 = ${b - a - 1} kids.`, `第 ${a + 1} 个到第 ${b - 1} 个，共 ${b} − ${a} − 1 = ${b - a - 1} 人。`] });
  },
  // 4 · choice · who ate the cookie (3 kids)
  () => {
    const { kids, says, lieMode, culprit } = lgLiars(3);
    return cq({ pts: 3, ...lgNameChoices(kids, culprit),
      q: [`Someone ate the last cookie. ${lieMode ? 'Exactly one of them is lying.' : 'Exactly one of them is telling the truth.'} Who ate it?`, `有人吃了最后一块饼干。${lieMode ? '他们中正好有一个人说谎。' : '他们中正好有一个人说真话。'}是谁吃的？`],
      fig: `<ul class="clues">${says.map(x => `<li><b>${x.s}:</b> ${T(`“${x.text[0]}”`, `“${x.text[1]}”`)}</li>`).join('')}</ul>`,
      data: { kids, says: says.map(x => [x.s, x.kind, x.t]), lieMode },
      hints: [['Pretend each kid ate it, one at a time.', '把每个人都假设成吃饼干的人，一个一个试。'], [`For each guess, count the ${lieMode ? 'lies' : 'true sentences'}. Which guess gives exactly one?`, `每次假设后，数一数有几句${lieMode ? '假话' : '真话'}。哪个假设正好一句？`]],
      explain: [`If ${culprit} ate it, exactly one ${lieMode ? 'kid is lying' : 'kid tells the truth'}. Every other guess does not fit.`, `如果是 ${culprit} 吃的，正好一个人${lieMode ? '说谎' : '说真话'}。其他假设都不符合。`],
      tool: 'grid', cfg: { rows: kids.map(k => TI(`If ${k}`, `假设 ${k}`)), cols: says.map(x => x.s) }, lab: ['Each row is one guess. Mark ✓ if that kid tells the truth, ✗ if they lie.', '每一行是一种假设。说真话打 ✓，说谎打 ✗。'] });
  },
  // 5 · type-in · passing in a race
  () => {
    const p = ri(2, 6), k = ri(2, 9);
    return cq({ pts: 3, input: true, answer: k + p,
      q: [`In a race, Roo passes ${p} runners. Now Roo is in ${lgOrd(k)} place. What place was Roo in before?`, `赛跑时，袋鼠超过了 ${p} 个人，现在是第 ${k} 名。超人之前她是第几名？`],
      hints: [['Passing someone moves you 1 place up.', '超过一个人，名次往前进 1。'], [`Go back ${p} places from ${lgOrd(k)}.`, `从第 ${k} 名往后退 ${p} 名。`]],
      explain: [`Each pass moved Roo up 1 place, so before she was ${k} + ${p} = ${lgOrd(k + p)}.`, `每超一个人进一名，所以原来是第 ${k} + ${p} = ${k + p} 名。`] });
  },
  // 6 · choice · logic table with pets
  () => {
    const things = [['dog', '狗', '🐶'], ['cat', '猫', '🐱'], ['fish', '鱼', '🐟']], { kids, has, clues } = lgTable(things);
    const askKid = Math.random() < .5, k = ri(0, 2);
    const say = f => f.yes ? [`${kids[f.i]} has the ${things[f.j][0]}.`, `${kids[f.i]} 养的是${things[f.j][1]}。`] : [`${kids[f.i]} does not have the ${things[f.j][0]}.`, `${kids[f.i]} 没有养${things[f.j][1]}。`];
    const owner = kids[has.indexOf(k)];
    const ch = askKid ? lgNameChoices(kids, owner, false) : { choices: things.map(t => TI(t[2] + ' ' + t[0], t[1])), answer: has[k] };
    return cq({ pts: 3, ...ch,
      q: askKid ? [`${kids.join(', ')} each have one pet: a dog, a cat or a fish. Who has the ${things[k][0]}?`, `${kids.join('、')} 每人养一种宠物：狗、猫或鱼。谁养的是${things[k][1]}？`]
        : [`${kids.join(', ')} each have one pet: a dog, a cat or a fish. Which pet does ${kids[k]} have?`, `${kids.join('、')} 每人养一种宠物：狗、猫或鱼。${kids[k]} 养的是什么？`],
      fig: `<ul class="clues">${clues.map(f => `<li>${T(...say(f))}</li>`).join('')}</ul>`, data: { has, clues, askKid, k },
      hints: [['Put each clue in the table: ✓ for yes, ✗ for no.', '把每条线索填进表格：是打 ✓，不是打 ✗。'], ['Each row and each column has exactly one ✓.', '每行每列只有一个 ✓。']],
      explain: [`${kids.map((n, i) => `${n}: ${things[has[i]][0]}`).join(', ')}.`, `${kids.map((n, i) => `${n}：${things[has[i]][1]}`).join('，')}。`],
      tool: 'grid', cfg: { rows: kids, cols: things.map(t => t[2]) } });
  },
  // 7 · type-in · ages
  () => {
    const c = ri(8, 12), y = ri(1, 4), x = ri(1, 4), ben = c - y, ann = ben + x;
    return cq({ pts: 3, input: true, answer: ann, unit: ['years old', '岁'],
      q: [`Cora is ${c} years old. Ben is ${y} year${y > 1 ? 's' : ''} younger than Cora. Ann is ${x} year${x > 1 ? 's' : ''} older than Ben. How old is Ann?`, `Cora ${c} 岁。Ben 比 Cora 小 ${y} 岁，Ann 比 Ben 大 ${x} 岁。Ann 几岁？`],
      hints: [[`First Ben: ${c} − ${y} = ${ben}.`, `先算 Ben：${c} − ${y} = ${ben}。`], [`Then Ann: ${ben} + ${x}.`, `再算 Ann：${ben} + ${x}。`]],
      explain: [`Ben is ${c} − ${y} = ${ben}, and Ann is ${ben} + ${x} = ${ann}.`, `Ben ${c} − ${y} = ${ben} 岁，Ann ${ben} + ${x} = ${ann} 岁。`] });
  },
  // 8 · choice · who is in the middle of the line
  () => lgOrderQ(5, 'line', () => 2, ['Five kids stand in a line. Who is in the middle (3rd)?', '五个小朋友排成一队。谁站在正中间（第 3 个）？'], 3),
  // 9 · type-in · socks, two of the same color
  () => {
    const cols = shuffle([['red', '红'], ['blue', '蓝'], ['green', '绿'], ['yellow', '黄']]).slice(0, ri(2, 4)), counts = cols.map(() => ri(3, 8));
    return cq({ pts: 3, input: true, answer: cols.length + 1,
      q: [`A dark drawer has ${cols.map((c, i) => `${counts[i]} ${c[0]}`).join(', ')} socks. How many socks must Roo take out, without looking, to be sure to get 2 of the same color?`, `黑暗的抽屉里有${cols.map((c, i) => `${counts[i]} 只${c[1]}袜子`).join('、')}。不看的话，袋鼠至少要拿几只，才能保证有 2 只同色？`],
      hints: [['Think of the unluckiest way: every sock a different color.', '想想最倒霉的情况：每只颜色都不一样。'], [`There are ${cols.length} colors. After ${cols.length} different socks, the next one must match.`, `一共 ${cols.length} 种颜色。拿了 ${cols.length} 只不同色的以后，下一只一定配对。`]],
      explain: [`Unluckiest: ${cols.length} socks, one of each color. One more makes a pair: ${cols.length} + 1 = ${cols.length + 1}. The number of each color does not matter!`, `最倒霉：${cols.length} 只各一种颜色，再拿 1 只就配成对：${cols.length} + 1 = ${cols.length + 1}。每种颜色有几只并不重要！`] });
  },
  // 10 · choice · who won the race
  () => lgOrderQ(4, 'race', () => 0, ['Four friends ran a race. Who won?', '四个好朋友赛跑。谁得了第一？'], 3),
  // 11 · type-in · between, counting from both ends
  () => {
    let n, a, b;
    do { n = ri(10, 20); a = ri(2, 7); b = ri(2, 7); } while (n - b + 1 - a - 1 < 2);
    const pj = n - b + 1;
    return cq({ pts: 4, input: true, answer: pj - a - 1,
      q: [`${n} kids stand in a line. Roo is ${lgOrd(a)} from the front. Joey is ${lgOrd(b)} from the back. How many kids are between Roo and Joey?`, `${n} 个小朋友排成一队。袋鼠从前往后是第 ${a} 个，小袋鼠从后往前是第 ${b} 个。他们中间有几个人？`],
      hints: [[`Find Joey's place from the front: ${n} − ${b} + 1 = ${pj}.`, `先算小袋鼠从前往后是第几个：${n} − ${b} + 1 = ${pj}。`], [`Now between ${lgOrd(a)} and ${lgOrd(pj)}: ${pj} − ${a} − 1.`, `再算第 ${a} 个和第 ${pj} 个中间：${pj} − ${a} − 1。`]],
      explain: [`Joey is ${lgOrd(pj)} from the front. Between: ${pj} − ${a} − 1 = ${pj - a - 1}.`, `小袋鼠从前往后是第 ${pj} 个。中间有 ${pj} − ${a} − 1 = ${pj - a - 1} 人。`] });
  },
  // 12 · choice · who broke the vase (4 kids)
  () => {
    const { kids, says, lieMode, culprit } = lgLiars(4);
    return cq({ pts: 4, ...lgNameChoices(kids, culprit),
      q: [`One of the kids broke a vase. ${lieMode ? 'Exactly one of them is lying.' : 'Exactly one of them is telling the truth.'} Who broke the vase?`, `有个小朋友打破了花瓶。${lieMode ? '他们中正好有一个人说谎。' : '他们中正好有一个人说真话。'}是谁打破的？`],
      fig: `<ul class="clues">${says.map(x => `<li><b>${x.s}:</b> ${T(`“${x.text[0]}”`, `“${x.text[1]}”`)}</li>`).join('')}</ul>`,
      data: { kids, says: says.map(x => [x.s, x.kind, x.t]), lieMode },
      hints: [['Try each kid as the one who broke it.', '把每个人都假设成打破花瓶的人试一试。'], [`Count the ${lieMode ? 'lies' : 'true sentences'} for each guess.`, `每次假设都数一数有几句${lieMode ? '假话' : '真话'}。`]],
      explain: [`Only the guess "${culprit}" gives exactly one ${lieMode ? 'lie' : 'true sentence'}.`, `只有假设“${culprit}”时，正好一句${lieMode ? '假话' : '真话'}。`],
      tool: 'grid', cfg: { rows: kids.map(k => TI(`If ${k}`, `假设 ${k}`)), cols: says.map(x => x.s) }, lab: ['Each row is one guess. Mark ✓ if that kid tells the truth, ✗ if they lie.', '每一行是一种假设。说真话打 ✓，说谎打 ✗。'] });
  },
  // 13 · type-in · passing and being passed
  () => {
    let p, q, k;
    do { p = ri(2, 6); q = ri(1, 4); k = ri(2, 8); } while (k + p - q < 2 || p === q);
    const before = k + p - q;
    return cq({ pts: 4, input: true, answer: before,
      q: [`In a race, Roo passes ${p} runners. Then ${q} runner${q > 1 ? 's pass' : ' passes'} Roo. Now Roo is in ${lgOrd(k)} place. What place was Roo in at the start?`, `赛跑中，袋鼠超过了 ${p} 个人，后来又被 ${q} 个人超过。现在她是第 ${k} 名。一开始她是第几名？`],
      hints: [[`Work backwards. Being passed moved Roo back ${q} place${q > 1 ? 's' : ''}, so undo that first.`, `倒着想。被 ${q} 个人超过让名次往后退了 ${q} 名，先把它倒回来。`], [`Undo: ${k} − ${q} = ${k - q}, then ${k - q} + ${p} = ${before}.`, `倒推：${k} − ${q} = ${k - q}，再 ${k - q} + ${p} = ${before}。`]],
      explain: [`Passing ${p} moves up ${p}; being passed ${q} times moves back ${q}. Start: ${k} + ${p} − ${q} = ${lgOrd(before)}.`, `超过 ${p} 人前进 ${p} 名，被超 ${q} 次后退 ${q} 名。开始：${k} + ${p} − ${q} = 第 ${before} 名。`] });
  },
  // 14 · choice · logic table with sports
  () => {
    const things = [['soccer', '足球', '⚽'], ['swimming', '游泳', '🏊'], ['tennis', '网球', '🎾']], { kids, has, clues } = lgTable(things);
    const k = ri(0, 2), owner = kids[has.indexOf(k)];
    const say = f => f.yes ? [`${kids[f.i]} likes ${things[f.j][0]}.`, `${kids[f.i]} 喜欢${things[f.j][1]}。`] : [`${kids[f.i]} does not like ${things[f.j][0]}.`, `${kids[f.i]} 不喜欢${things[f.j][1]}。`];
    return cq({ pts: 4, ...lgNameChoices(kids, owner, false),
      q: [`${kids.join(', ')} each like a different sport: soccer, swimming or tennis. Who likes ${things[k][0]}?`, `${kids.join('、')} 每人喜欢一项不同的运动：足球、游泳或网球。谁喜欢${things[k][1]}？`],
      fig: `<ul class="clues">${clues.map(f => `<li>${T(...say(f))}</li>`).join('')}</ul>`, data: { has, clues, askKid: true, k },
      hints: [['Fill in the table with ✓ and ✗.', '用 ✓ 和 ✗ 填表格。'], ['When a row has two ✗, the last box must be ✓.', '一行有两个 ✗，剩下那个一定是 ✓。']],
      explain: [`${kids.map((n, i) => `${n}: ${things[has[i]][0]}`).join(', ')}.`, `${kids.map((n, i) => `${n}：${things[has[i]][1]}`).join('，')}。`],
      tool: 'grid', cfg: { rows: kids, cols: things.map(t => t[2]) } });
  },
  // 15 · type-in · sure to get one of a color
  () => {
    const cols = shuffle([['red', '红'], ['blue', '蓝'], ['green', '绿']]), c = cols.map(() => ri(2, 7)), others = c[1] + c[2];
    return cq({ pts: 4, input: true, answer: others + 1,
      q: [`A bag has ${c[0]} ${cols[0][0]}, ${c[1]} ${cols[1][0]} and ${c[2]} ${cols[2][0]} marbles. Without looking, how many must Roo take to be sure to get a ${cols[0][0]} one?`, `袋子里有 ${c[0]} 颗${cols[0][1]}弹珠、${c[1]} 颗${cols[1][1]}、${c[2]} 颗${cols[2][1]}。不看的话，至少拿几颗才能保证拿到${cols[0][1]}色的？`],
      hints: [[`Unluckiest: all the marbles that are NOT ${cols[0][0]} come out first.`, `最倒霉：先把不是${cols[0][1]}色的全拿出来了。`], [`That is ${c[1]} + ${c[2]} = ${others}. Then one more.`, `那是 ${c[1]} + ${c[2]} = ${others} 颗，再拿 1 颗。`]],
      explain: [`${others} marbles could all be the other colors. The next one must be ${cols[0][0]}: ${others} + 1 = ${others + 1}.`, `前 ${others} 颗可能都是别的颜色，下一颗一定是${cols[0][1]}色：${others} + 1 = ${others + 1}。`] });
  },
  // 16 · choice · oldest / youngest with mixed words
  () => {
    const top = Math.random() < .5;
    return lgOrderQ(4, 'old', () => top ? 0 : 3, top ? ['Who is the oldest?', '谁年龄最大？'] : ['Who is the youngest?', '谁年龄最小？'], 4,
      [['oldest', '最大'], ['2nd', '第 2'], ['3rd', '第 3'], ['youngest', '最小']]);
  },
  // 17 · type-in · yesterday and tomorrow
  () => {
    const [pw, pz, p] = pick([['Yesterday', '昨天', 1], ['The day before yesterday', '前天', 2]]), [fw, fz, f] = pick([['tomorrow', '明天', 1], ['the day after tomorrow', '后天', 2]]), d = ri(3, 25);
    return cq({ pts: 5, input: true, answer: d + p + f,
      q: [`${pw} was the ${lgOrd(d)} of the month. What is the date ${fw}?`, `${pz}是这个月的 ${d} 号。${fz}是几号？`],
      hints: [[`Today is ${p} day${p > 1 ? 's' : ''} after the ${lgOrd(d)}: the ${lgOrd(d + p)}.`, `今天比 ${d} 号晚 ${p} 天：${d + p} 号。`], [`Now go ${f} day${f > 1 ? 's' : ''} ahead.`, `再往后数 ${f} 天。`]],
      explain: [`Today is the ${lgOrd(d + p)}, so ${fw} is the ${lgOrd(d + p + f)}.`, `今天是 ${d + p} 号，所以${fz}是 ${d + p + f} 号。`] });
  },
  // 18 · choice · who tells the truth
  () => {
    const [a, b, c] = shuffle(LG_NAMES).slice(0, 3), good = TI(`Only ${b}`, `只有 ${b}`);
    const choices = [TI(`Only ${a}`, `只有 ${a}`), good, TI(`Only ${c}`, `只有 ${c}`), TI(`${a} and ${c}`, `${a} 和 ${c}`), TI('Nobody', '没有人')];
    return cq({ pts: 5, choices, answer: 1, data: { a, b, c },
      q: [`${a} says: "${b} is lying." ${b} says: "${c} is lying." ${c} says: "${a} and ${b} are both lying." Who is telling the truth?`, `${a} 说：“${b} 在说谎。” ${b} 说：“${c} 在说谎。” ${c} 说：“${a} 和 ${b} 都在说谎。” 谁说的是真话？`],
      hints: [[`Guess that ${b} tells the truth. Then what about ${c}? And ${a}?`, `假设 ${b} 说真话，那 ${c} 呢？${a} 呢？`], [`Check ${c}'s sentence with your guess. Does everything fit?`, `用你的假设检查 ${c} 的话，全都对得上吗？`]],
      explain: [`If ${b} tells the truth, ${c} is lying and ${a} is lying. ${c}'s sentence ("both lying") is then false, which fits. Other guesses break a sentence.`, `如果 ${b} 说真话，那 ${c} 和 ${a} 都在说谎。${c} 说“两人都说谎”就是假话，正好符合。其他假设都会出矛盾。`] });
  },
  // 19 · type-in · gloves
  () => {
    const n = ri(3, 6);
    return cq({ pts: 5, input: true, answer: n + 1,
      q: [`A box has ${n} pairs of gloves, each pair a different color. In the dark, how many gloves must Roo take to be sure to get a left and a right glove of the same color?`, `盒子里有 ${n} 双手套，每双颜色都不同。黑暗中至少拿几只，才能保证拿到同一种颜色的一只左手和一只右手？`],
      hints: [['Unluckiest: Roo takes only left gloves.', '最倒霉：拿到的全是左手。'], [`There are ${n} left gloves. What happens with the next one?`, `一共有 ${n} 只左手，下一只会怎样？`]],
      explain: [`Roo could take all ${n} left gloves first. The next one is a right glove, and its left partner is already out: ${n} + 1 = ${n + 1}.`, `可能先拿到 ${n} 只左手。下一只一定是右手，它的同色左手已经拿出来了：${n} + 1 = ${n + 1}。`] });
  },
  // 20 · choice · boss
  () => {
    const p = lgOrderPuzzle(4, LG_WORDS.cookies, () => 1);
    return cq({ pts: 5, boss: true, ...lgNameChoices(p.order, p.answer),
      q: ['Boss question! Four friends ate cookies. Each ate a different number. Who ate the second most?', 'Boss 题！四个好朋友吃饼干，每人吃的块数都不一样。谁吃得第二多？'],
      fig: lgList(p.clues), data: { ...lgPuzzleData(p.order, p.clues), ctx: 'cookies', at: 1 },
      hints: [['Line them up from most to fewest, one clue at a time.', '一条一条看线索，从多到少排好。'], ['Check that every clue is true for your order.', '检查你的顺序是不是每条线索都对。']],
      explain: [`From most to fewest: ${p.order.join(', ')}. ${p.answer} ate the second most.`, `从多到少：${p.order.join('、')}。${p.answer} 吃得第二多。`],
      tool: 'order', cfg: { items: [...p.order].sort(), places: [['most', '最多'], ['2nd', '第 2'], ['3rd', '第 3'], ['fewest', '最少']] } });
  }
];

registerSeries({
  id: 'logic', camp: true, breakEvery: 10, perRound: 20, games: ['jump', 'bubbles'],
  tag: ['Thinking Camp · Logic', '竞赛思维 · 逻辑营'], name: ['Logic Detective', '逻辑小侦探'],
  desc: ['Lines and places, order clues, logic tables, truth and lies', '排队与名次、排顺序、逻辑表格、真话假话'],
  lesson: LESSON_LOGIC,
  // paste a YouTube link here to add a video button:  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] },
  video: null,
  questions: Q_LOGIC
});
