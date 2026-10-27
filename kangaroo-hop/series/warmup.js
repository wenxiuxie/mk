// 热身岛 — 6 questions adapted from Math Kangaroo 2019 Level 1 (A). Each has its own hands-on drawing.
// ---------- small drawings ----------
const kidSVG = `<svg viewBox="0 0 30 44"><circle cx="15" cy="9" r="7" fill="#f3c99a"/><path d="M5 44 L7 22 Q15 16 23 22 L25 44 Z" fill="#3a76b8"/><circle cx="12" cy="9" r="1" fill="#1f2b3a"/><circle cx="18" cy="9" r="1" fill="#1f2b3a"/></svg>`;
const appleSVG = `<svg viewBox="0 0 40 40"><path d="M20 12 C10 6 3 14 5 24 C7 34 14 38 20 35 C26 38 33 34 35 24 C37 14 30 6 20 12Z" fill="#d6413f"/><path d="M20 12 Q21 6 24 3" stroke="#6b4a2a" stroke-width="2" fill="none"/><ellipse cx="27" cy="6" rx="4" ry="2" fill="#2f8f6b" transform="rotate(-25 27 6)"/></svg>`;
const pearSVG = `<svg viewBox="0 0 40 40"><path d="M20 6 C15 6 14 12 14 16 C8 20 7 30 12 35 C16 39 24 39 28 35 C33 30 32 20 26 16 C26 12 25 6 20 6Z" fill="#b5c93a"/><path d="M20 6 Q20 3 22 1" stroke="#6b4a2a" stroke-width="2" fill="none"/></svg>`;
const catSVG = `<svg viewBox="0 0 40 40"><path d="M9 10 L13 20 L7 20Z M31 10 L27 20 L33 20Z" fill="#6c6f7d"/><circle cx="20" cy="23" r="12" fill="#6c6f7d"/><circle cx="15.5" cy="21" r="2" fill="#f2b630"/><circle cx="24.5" cy="21" r="2" fill="#f2b630"/><path d="M18 27 L20 29 L22 27" stroke="#fff" stroke-width="1.5" fill="none"/></svg>`;
const milkSVG = `<svg viewBox="0 0 40 40"><path d="M5 20 H35 L31 32 H9 Z" fill="#3a76b8"/><ellipse cx="20" cy="20" rx="15" ry="4" fill="#fff" stroke="#3a76b8" stroke-width="2"/></svg>`;
const camelSVG = two => `<svg viewBox="0 0 60 46">${two
  ? '<ellipse cx="22" cy="18" rx="7" ry="8" fill="var(--camel)"/><ellipse cx="36" cy="18" rx="7" ry="8" fill="var(--camel)"/>'
  : '<ellipse cx="29" cy="17" rx="9" ry="9" fill="var(--camel)"/>'}
  <ellipse cx="29" cy="26" rx="18" ry="8" fill="var(--camel)"/>
  <path d="M42 24 Q50 20 52 10" stroke="var(--camel)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="54" cy="9" rx="5.5" ry="3.5" fill="var(--camel)"/><circle cx="55" cy="8" r="1" fill="#1f2b3a"/>
  <rect x="15" y="30" width="3" height="14" fill="#b07c3e"/><rect x="21" y="30" width="3" height="14" fill="#b07c3e"/>
  <rect x="35" y="30" width="3" height="14" fill="#b07c3e"/><rect x="41" y="30" width="3" height="14" fill="#b07c3e"/></svg>`;

const Q_WARM = [
{
  no: 3, pts: 3, unit: ['kg', '千克'],
  stem: T('Mother Kangaroo and her son Jumper weigh 60 kg together. Mother Kangaroo weighs 52 kg. How much does Jumper weigh?',
          '袋鼠妈妈和儿子 Jumper 一共重 60 千克。袋鼠妈妈重 52 千克。Jumper 重多少千克？'),
  choices: [6, 7, 8, 9, 12], answer: 2,
  hints: [T('Put both of them on one side of the scale. What must you add to 52 to make 60?', '把它们俩放在天平同一边。52 再加多少才等于 60？'),
          T('Count up from 52: 53, 54, … How many steps until you reach 60?', '从 52 往上数：53、54……数到 60 一共数了几下？')],
  explain: T('60 − 52 = 8, so Jumper weighs 8 kg.', '60 − 52 = 8，所以 Jumper 重 8 千克。'),
  lab: T('Move the slider until the scale balances.', '拖动滑块，让天平平衡。'),
  mount(el) {
    el.innerHTML = `<div class="balance"><svg viewBox="0 0 320 170" id="bal"></svg></div>
      <input type="range" id="q3r" min="0" max="16" value="0" aria-label="Jumper weight">
      <div class="center big" id="q3m"></div>`;
    const svg = $('#bal', el), r = $('#q3r', el), m = $('#q3m', el);
    const draw = () => {
      const j = +r.value, diff = 52 + j - 60, a = Math.max(-14, Math.min(14, diff * 2.2)) * Math.PI / 180;
      const ly = 60 + Math.sin(a) * 110, ry = 60 - Math.sin(a) * 110;
      svg.innerHTML = `<rect x="154" y="60" width="12" height="96" fill="#8b98a8"/><path d="M120 162 H200 L190 150 H130Z" fill="#8b98a8"/>
        <line x1="${160 - 110 * Math.cos(a)}" y1="${ly}" x2="${160 + 110 * Math.cos(a)}" y2="${ry}" stroke="#5d6b7c" stroke-width="7" stroke-linecap="round"/>
        <circle cx="160" cy="60" r="7" fill="#c8742c"/>
        <line x1="${160 - 110 * Math.cos(a)}" y1="${ly}" x2="${160 - 110 * Math.cos(a)}" y2="${ly + 34}" stroke="#8b98a8" stroke-width="2"/>
        <line x1="${160 + 110 * Math.cos(a)}" y1="${ry}" x2="${160 + 110 * Math.cos(a)}" y2="${ry + 34}" stroke="#8b98a8" stroke-width="2"/>
        <path d="M${160 - 110 * Math.cos(a) - 46} ${ly + 34} h92 l-10 12 h-72z" fill="#cfe0ec"/>
        <path d="M${160 + 110 * Math.cos(a) - 46} ${ry + 34} h92 l-10 12 h-72z" fill="#cfe0ec"/>
        <g transform="translate(${160 - 110 * Math.cos(a) - 46} ${ly - 8})"><svg width="44" height="44" viewBox="0 0 64 64"><use href="#roo"/></svg></g>
        <g transform="translate(${160 - 110 * Math.cos(a) + 8} ${ly + 12}) scale(${0.3 + j / 40})"><svg width="44" height="44" viewBox="0 0 64 64"><use href="#roo"/></svg></g>
        <text x="${160 - 110 * Math.cos(a) - 24}" y="${ly + 60}" font-size="12" font-weight="700" fill="#1f2b3a">52 + ${j}</text>
        <rect x="${160 + 110 * Math.cos(a) - 22}" y="${ry + 8}" width="44" height="26" rx="4" fill="#1f2b3a"/>
        <text x="${160 + 110 * Math.cos(a)}" y="${ry + 26}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">60 kg</text>`;
      m.innerHTML = diff === 0 ? TI(`Balanced! Jumper = ${j} kg`, `平衡了！Jumper = ${j} 千克`)
        : diff < 0 ? TI(`Jumper = ${j} kg · too light`, `Jumper = ${j} 千克 · 太轻`)
        : TI(`Jumper = ${j} kg · too heavy`, `Jumper = ${j} 千克 · 太重`);
    };
    r.oninput = () => { draw(); if (52 + +r.value === 60) tick(); };
    draw();
  }
},
{
  no: 5, pts: 3, unit: ['', ''],
  stem: T('12 children stand in line at the zoo entrance. Lucy is 7th from the front. Kim is 2nd from the back. How many children are between Lucy and Kim?',
          '动物园入口有 12 个孩子在排队。Lucy 从前面数是第 7 个，Kim 从后面数是第 2 个。Lucy 和 Kim 之间有几个孩子？'),
  choices: [2, 3, 4, 5, 6], answer: 1,
  hints: [T('Kim is 2nd from the back. Which place is that from the front?', 'Kim 从后面数第 2 个，那从前面数是第几个？'),
          T('Kim is 11th from the front. Count the children in places 8, 9 and 10.', 'Kim 从前面数是第 11 个。数一数第 8、9、10 位。')],
  explain: T('Kim is 11th from the front. Between 7th and 11th stand the 8th, 9th and 10th: 3 children.', 'Kim 从前面数是第 11 个。第 7 和第 11 之间是第 8、9、10 个，一共 3 人。'),
  lab: T('Tap a child once to mark Lucy, twice for Kim. Switch how you count.', '点一下小朋友标成 Lucy，点两下变成 Kim。可以切换从前数或从后数。'),
  mount(el) {
    let from = 'front'; const mark = Array(12).fill('');
    el.innerHTML = `<div class="row"><div class="seg" id="q5s"><button data-f="front" aria-pressed="true">${TI('Count from front', '从前数')}</button><button data-f="back" aria-pressed="false">${TI('Count from back', '从后数')}</button></div></div>
      <div class="queue" id="q5q"></div><div class="msg" id="q5m"></div>`;
    const q = $('#q5q', el);
    const draw = () => {
      const li = mark.indexOf('L'), ki = mark.indexOf('K');
      q.innerHTML = `<div class="gate">入口 GATE</div>` + mark.map((m, i) => {
        const btw = li > -1 && ki > -1 && i > Math.min(li, ki) && i < Math.max(li, ki);
        return `<button class="kid ${m} ${btw ? 'between' : ''}" data-i="${i}" aria-label="child ${i + 1}"><span class="who">${m === 'L' ? 'Lucy' : m === 'K' ? 'Kim' : ''}</span>${kidSVG}<span class="n">${from === 'front' ? i + 1 : 12 - i}</span></button>`;
      }).join('');
      q.querySelectorAll('.kid').forEach(b => b.onclick = () => {
        const i = +b.dataset.i, next = mark[i] === '' ? 'L' : mark[i] === 'L' ? 'K' : '';
        if (next) mark.forEach((v, k) => { if (v === next) mark[k] = ''; });
        mark[i] = next; tick(); draw();
      });
      $('#q5m', el).innerHTML = li > -1 && ki > -1 ? TI('The yellow children are between them. Count them!', '黄色的小朋友站在她们中间，数一数！') : '';
    };
    el.querySelectorAll('#q5s button').forEach(b => b.onclick = () => {
      from = b.dataset.f; el.querySelectorAll('#q5s button').forEach(x => x.setAttribute('aria-pressed', x === b)); draw();
    });
    draw();
  }
},
{
  no: 8, pts: 3, unit: ['¢', '分'],
  stem: T('Two apples cost 6 cents together. Two pears cost 8 cents together. How much do one apple and one pear cost together?',
          '两个苹果一共 6 分钱，两个梨一共 8 分钱。一个苹果加一个梨一共多少钱？'),
  choices: [5, 6, 7, 8, 14], answer: 2,
  hints: [T('Two apples cost 6 cents. How much is one apple?', '两个苹果 6 分钱，一个苹果多少钱？'),
          T('One apple is 6 ÷ 2 = 3 cents. One pear is 8 ÷ 2 = ? cents.', '一个苹果 6 ÷ 2 = 3 分。一个梨 8 ÷ 2 = ? 分。')],
  explain: T('One apple costs 3¢ and one pear costs 4¢. 3 + 4 = 7¢.', '一个苹果 3 分，一个梨 4 分。3 + 4 = 7 分。'),
  lab: T('Tap a fruit to give it one coin. Share the coins so both fruits get the same.', '点水果给它一枚硬币。把钱分得一样多。'),
  mount(el) {
    const g = [{ k: 'a', total: 6, svg: appleSVG, have: [0, 0], name: TI('2 apples = 6¢', '2 个苹果 = 6 分') },
               { k: 'p', total: 8, svg: pearSVG, have: [0, 0], name: TI('2 pears = 8¢', '2 个梨 = 8 分') }];
    el.innerHTML = `<div class="fruitrow">${g.map(x => `<div class="fgroup" data-k="${x.k}"><div class="big">${x.name}</div><div class="pile"></div><div class="fruits">
      ${[0, 1].map(i => `<button class="fruitbtn" data-i="${i}">${x.svg}<div class="coins"></div></button>`).join('')}</div><div class="msg"></div></div>`).join('')}</div>
      <div class="row" style="justify-content:center"><button class="btn ghost" id="q8r">${TI('Start over', '重新分')}</button></div>`;
    const draw = () => g.forEach(x => {
      const box = el.querySelector(`.fgroup[data-k="${x.k}"]`), left = x.total - x.have[0] - x.have[1];
      box.querySelector('.pile').innerHTML = '<span class="coin">1¢</span>'.repeat(left) || TI('All shared out', '分完了');
      box.querySelectorAll('.fruitbtn').forEach((b, i) => b.querySelector('.coins').innerHTML = '<span class="coin">1¢</span>'.repeat(x.have[i]));
      box.querySelector('.msg').innerHTML = left ? '' : x.have[0] === x.have[1]
        ? TI(`Each one costs ${x.have[0]}¢`, `每个 ${x.have[0]} 分`) : TI('Not fair yet. They cost the same!', '还不公平，它们一样贵！');
    });
    g.forEach(x => el.querySelectorAll(`.fgroup[data-k="${x.k}"] .fruitbtn`).forEach((b, i) => b.onclick = () => {
      if (x.have[0] + x.have[1] < x.total) { x.have[i]++; tick(); draw(); }
    }));
    $('#q8r', el).onclick = () => { g.forEach(x => x.have = [0, 0]); draw(); };
    draw();
  }
},
{
  no: 12, pts: 4, unit: ['', ''],
  stem: T('A cat sits in one corner of a 3×3 board. A bowl of milk is in the opposite corner. The cat can only move right or down. How many different ways can the cat reach the milk?',
          '3×3 棋盘的一个角上有一只猫，对角上有一碗牛奶。猫只能向右或向下走。猫有多少种不同的路线可以到达牛奶？'),
  choices: [4, 5, 6, 8, 9], answer: 2,
  hints: [T('Every path makes exactly 2 moves right and 2 moves down.', '每条路线都正好向右走 2 步、向下走 2 步。'),
          T('Write each path as letters, like R R D D. How many different orders can you make?', '用字母写下来，比如“右右下下”。一共能排出几种不同的顺序？')],
  explain: T('RRDD, RDRD, RDDR, DRRD, DRDR, DDRR: 6 ways.', '右右下下、右下右下、右下下右、下右右下、下右下右、下下右右，一共 6 种。'),
  lab: T('Tap squares to walk the cat to the milk. Every new path is saved on the right.', '点格子，带小猫走到牛奶。每找到一条新路线，右边就记下来。'),
  mount(el) {
    let path = [0]; const found = [];
    el.innerHTML = `<div class="gridlab"><div class="board" id="q12b"></div><div style="display:flex;flex-direction:column;gap:8px;min-width:0">
      <div class="big" id="q12c"></div><div class="found" id="q12f"></div><div class="msg" id="q12m" style="text-align:left"></div>
      <div><button class="btn ghost" id="q12x">${TI('Clear this path', '清空这条路')}</button></div></div></div>`;
    const b = $('#q12b', el);
    const draw = () => {
      b.innerHTML = [...Array(9)].map((_, i) => {
        const step = path.indexOf(i);
        const inner = i === 0 ? catSVG : i === 8 ? milkSVG : step > 0 ? step : '';
        return `<button class="cell ${step > -1 ? 'on' : ''}" data-i="${i}" aria-label="square ${i + 1}">${inner}</button>`;
      }).join('');
      $('#q12c', el).innerHTML = TI(`Paths found: ${found.length}`, `已找到 ${found.length} 条`);
      $('#q12f', el).innerHTML = found.map(p => `<div class="mini">${[...Array(9)].map((_, i) => `<i class="${p.includes(i) ? 'on' : ''}"></i>`).join('')}</div>`).join('');
      b.querySelectorAll('.cell').forEach(c => c.onclick = () => {
        const i = +c.dataset.i, end = path[path.length - 1];
        const ok = (i === end + 1 && end % 3 !== 2) || i === end + 3;
        if (!ok) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); $('#q12m', el).innerHTML = TI('Only right or down, one square at a time.', '只能向右或向下，一次走一格。'); return; }
        path.push(i); tick();
        if (i === 8) {
          const key = path.join(',');
          if (found.some(p => p.join(',') === key)) $('#q12m', el).innerHTML = TI('You already found that one. Try another!', '这条已经找过了，换一条！');
          else { found.push(path.slice()); $('#q12m', el).innerHTML = TI('New path!', '新路线！'); }
          path = [0];
        } else $('#q12m', el).innerHTML = '';
        draw();
      });
    };
    $('#q12x', el).onclick = () => { path = [0]; draw(); };
    draw();
  }
},
{
  no: 19, pts: 5, unit: ['', ''],
  stem: T('A zoo has 10 camels. Each camel has either one hump or two humps. Altogether there are 14 humps. How many camels have two humps?',
          '动物园有 10 只骆驼。每只骆驼有 1 个或 2 个驼峰，一共有 14 个驼峰。双峰驼有几只？'),
  choices: [2, 3, 4, 5, 6], answer: 2,
  hints: [T('Pretend every camel has one hump. How many humps is that?', '先假设每只骆驼都只有 1 个驼峰，一共几个驼峰？'),
          T('That makes 10 humps, but we need 14. Each two-hump camel adds 1 extra hump.', '这样只有 10 个，还差 4 个。每只双峰驼会多出 1 个驼峰。')],
  explain: T('If all 10 camels had one hump, there would be 10 humps. We need 4 more, so 4 camels have two humps. Check: 4 × 2 + 6 × 1 = 14.',
             '如果 10 只都是单峰，只有 10 个驼峰。还差 4 个，所以有 4 只双峰驼。检查：4 × 2 + 6 × 1 = 14。'),
  lab: T('Tap a camel to switch between one hump and two humps.', '点骆驼，在单峰和双峰之间切换。'),
  mount(el) {
    const two = Array(10).fill(false);
    el.innerHTML = `<div class="herd" id="q19h"></div><div class="center big" id="q19c"></div><div class="meter" id="q19m"></div>`;
    const draw = () => {
      const humps = two.reduce((s, t) => s + (t ? 2 : 1), 0);
      $('#q19h', el).innerHTML = two.map((t, i) => `<button class="camel ${t ? 'two' : ''}" data-i="${i}">${camelSVG(t)}<small>${t ? TI('2 humps', '双峰') : TI('1 hump', '单峰')}</small></button>`).join('');
      $('#q19c', el).innerHTML = TI(`Humps: ${humps} / 14`, `驼峰：${humps} / 14`) + (humps === 14 ? ' ✓' : '');
      $('#q19m', el).innerHTML = [...Array(Math.max(14, humps))].map((_, i) => `<i class="${i < humps ? (i >= 14 ? 'over' : 'on') : ''}"></i>`).join('');
      el.querySelectorAll('.camel').forEach(c => c.onclick = () => { two[+c.dataset.i] = !two[+c.dataset.i]; tick(); draw(); });
    };
    draw();
  }
},
{
  no: 20, pts: 5, unit: ['', ''],
  stem: T('Three squirrels, Anni, Asia and Elli, collected 7 nuts together. Each squirrel has a different number of nuts, and each has at least 1. Anni has the fewest and Asia has the most. How many nuts did Elli collect?',
          '三只松鼠 Anni、Asia 和 Elli 一共采了 7 个坚果。每只采的数量都不一样，而且至少 1 个。Anni 最少，Asia 最多。Elli 采了几个？'),
  choices: [1, 2, 3, 4, 5], answer: 1,
  hints: [T('Anni has the fewest. What is the smallest number she can have?', 'Anni 最少。她最少可以有几个？'),
          T('If Anni has 1 and Elli has 3, then Asia has 3 too. Is that allowed?', '如果 Anni 1 个、Elli 3 个，那 Asia 也是 3 个。这样可以吗？')],
  explain: T('Anni 1, Elli 2, Asia 4. All different, and 1 + 2 + 4 = 7. Elli collected 2.', 'Anni 1 个，Elli 2 个，Asia 4 个。数量都不同，1 + 2 + 4 = 7。Elli 采了 2 个。'),
  lab: T('Use + and − to share the nuts. Make every line in the checklist turn green.', '用 + 和 − 分坚果，让下面每一条都变成绿色。'),
  mount(el) {
    const names = ['Anni', 'Elli', 'Asia'], n = [1, 1, 1];
    el.innerHTML = `<div class="sq" id="q20s"></div><ul class="checks" id="q20c"></ul>`;
    const draw = () => {
      $('#q20s', el).innerHTML = names.map((nm, i) => `<div class="sqc"><b>${nm}</b><div class="nuts">${'<span class="nut"></span>'.repeat(n[i])}</div>
        <div class="pm"><button data-i="${i}" data-d="-1" aria-label="${nm} minus">−</button><span>${n[i]}</span><button data-i="${i}" data-d="1" aria-label="${nm} plus">+</button></div></div>`).join('');
      const sum = n[0] + n[1] + n[2];
      const rules = [
        [sum === 7, TI(`Total is 7 (now ${sum})`, `一共 7 个（现在 ${sum}）`)],
        [new Set(n).size === 3, TI('All different', '数量都不一样')],
        [n[0] < n[1] && n[0] < n[2], TI('Anni has the fewest', 'Anni 最少')],
        [n[2] > n[0] && n[2] > n[1], TI('Asia has the most', 'Asia 最多')]];
      $('#q20c', el).innerHTML = rules.map(([ok, t]) => `<li class="${ok ? 'ok' : ''}">${t}</li>`).join('');
      el.querySelectorAll('.pm button').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; n[i] = Math.max(1, Math.min(7, n[i] + +b.dataset.d)); tick(); draw();
      });
    };
    draw();
  }
}];


registerSeries({
  id: 'warmup', next: 'hop',
  tag: ['Level A · 2019', 'A 级 · 2019 真题'], name: ['Warm-up Island', '热身岛'],
  desc: ['6 real contest questions, 3 to 5 points each', '真题 6 道，每题 3–5 分'],
  // demo link taken from 袋鼠数学/B级考点对应视频.txt
  video: { url: 'https://www.youtube.com/watch?v=KxJiQDWqmb8', title: ['Math Kangaroo: Grade 3–4 Geometry and Logic', '袋鼠数学官方讲解：3–4 年级几何与逻辑'] },
  questions: Q_WARM.map(q => ({ ...q, src: `2019 · Level A · Q${q.no}` }))
});
