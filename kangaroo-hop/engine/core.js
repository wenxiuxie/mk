// Kangaroo Hop engine: helpers, language, sound, effects, buddy kangaroo,
// the question flow (auto-advance, mini-game breaks), videos and the island map.

// ---------- helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const T = (en, zh) => `<span class="en">${en}</span><span class="zh">${zh}</span>`;
const TI = (en, zh) => `<span class="inl">${T(en, zh)}</span>`;
const rnd = n => Math.floor(Math.random() * n);
const ri = (a, b) => a + rnd(b - a + 1);   // whole number from a to b
const pick = a => a[rnd(a.length)];
const shuffle = a => a.map(v => [Math.random(), v]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ROOT = document.body.dataset.root || '';   // '' on the map page, '../' inside series/ and games/
const app = $('#app');

const BREAK_EVERY = 5;     // a mini game after every 5 questions (a series can set its own breakEvery)
const AUTO_NEXT = 5;       // seconds before moving on after a correct answer

document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <g id="roo">
    <path fill="#c8742c" d="M20 50 C10 52 4 57 2 62 L9 62 C12 58 16 56 24 55 Z"/>
    <ellipse fill="#c8742c" cx="30" cy="42" rx="13" ry="15"/>
    <ellipse fill="#f3c99a" cx="33" cy="46" rx="6" ry="8"/>
    <circle fill="#c8742c" cx="40" cy="22" r="8.5"/>
    <ellipse fill="#c8742c" cx="36.5" cy="11" rx="2.6" ry="6.5" transform="rotate(-18 36.5 11)"/>
    <ellipse fill="#c8742c" cx="42.5" cy="10.5" rx="2.6" ry="6.5" transform="rotate(12 42.5 10.5)"/>
    <path fill="#c8742c" d="M46 19 L56 24 L47 28 Z"/>
    <circle fill="#1f2b3a" cx="55" cy="24" r="1.6"/>
    <circle fill="#1f2b3a" cx="43" cy="20" r="1.5"/>
    <path fill="#c8742c" d="M38 34 L48 39 L47 42 L37 38 Z"/>
    <path fill="#a85d1f" d="M22 53 L46 59 L46 63 L20 63 Z"/>
  </g></defs></svg><canvas id="fx"></canvas>`);

// ---------- header: language + sound ----------
let soundOn = store.get('roo-snd', '1') === '1';
function setLang(l) {
  document.body.dataset.lang = l;
  document.querySelectorAll('#top .seg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === l));
  store.set('roo-lang', l);
}
function renderHeader() {
  $('#top').innerHTML = `<a class="brand" href="${ROOT}index.html">
      <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>
      <div><h1>袋鼠闯关</h1><small>KANGAROO HOP · 数学竞赛练习</small></div></a>
    <div class="tools">
      <div class="seg" role="group" aria-label="Language"><button data-l="en">EN</button><button data-l="both">双语</button><button data-l="zh">中文</button></div>
      <button class="pill" id="snd"></button>
    </div>`;
  document.querySelectorAll('#top .seg button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  setLang(store.get('roo-lang', 'both'));
  const snd = $('#snd');
  const paint = () => { snd.setAttribute('aria-pressed', soundOn); snd.textContent = soundOn ? '♪ 声音开' : '♪ 静音'; };
  snd.onclick = () => { soundOn = !soundOn; store.set('roo-snd', soundOn ? '1' : '0'); paint(); };
  paint();
}

// ---------- sound ----------
let actx;
function tone(f, t, d, type = 'sine', vol = .16, f2) {
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d + .02);
}
function play(fn) {
  if (!soundOn) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    fn(actx.currentTime);
  } catch (e) {}
}
// correct: rising arpeggio plus sparkle, pitched up a little with every answer in the streak
const yay = (streak = 0) => play(t => {
  const k = Math.pow(2, Math.min(streak, 6) / 12);
  [523, 659, 784, 1047].forEach((f, i) => { tone(f * k, t + i * .08, .35, 'triangle', .14); tone(f * k * 2, t + i * .08, .2, 'sine', .04); });
  [1568, 2093, 2637].forEach((f, i) => tone(f * k, t + .36 + i * .05, .25, 'sine', .05));
});
const boo = () => play(t => { tone(392, t, .22, 'sine', .12); tone(330, t + .16, .32, 'sine', .12); });
const tick = () => play(t => tone(1200, t, .06, 'sine', .08, 900));
const pop = () => play(t => { tone(500, t, .12, 'sine', .16, 1500); tone(1800, t + .05, .1, 'sine', .05); });
const boing = () => play(t => { tone(220, t, .28, 'sine', .14, 660); tone(660, t + .25, .2, 'sine', .06, 330); });
const fanfare = () => play(t => {
  [[523, 0], [523, .12], [523, .24], [659, .36], [784, .6], [659, .8], [784, .92], [1047, 1.1]]
    .forEach(([f, d], i) => tone(f, t + d, i === 7 ? .8 : .22, 'triangle', .14));
});

// ---------- confetti ----------
const fx = $('#fx'), fxc = fx.getContext('2d');
let parts = [];
function confetti(x, y, n = 70) {
  if (reduce) return;
  fx.width = innerWidth; fx.height = innerHeight;
  const running = parts.length > 0;
  const cols = ['#c8742c', '#2f8f6b', '#f2b630', '#3a76b8', '#c8435a'];
  for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 9, vy: -Math.random() * 9 - 3, c: cols[i % 5], r: Math.random() * 6 + 3, life: 70 });
  if (!running) requestAnimationFrame(step);
}
function step() {
  fxc.clearRect(0, 0, fx.width, fx.height);
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .3; p.life--; fxc.fillStyle = p.c; fxc.fillRect(p.x, p.y, p.r, p.r * .6); });
  parts = parts.filter(p => p.life > 0);
  if (parts.length) requestAnimationFrame(step); else fxc.clearRect(0, 0, fx.width, fx.height);
}

// ---------- buddy kangaroo ----------
const HELLO = [['Read the question slowly. You can do it!', '慢慢读题，你可以的！'], ['Try the hands-on box first!', '先在动手区试一试！'], ['Ready? Let\'s hop!', '准备好了吗？我们跳吧！'], ['Draw it or count it. Both work!', '画一画、数一数，都是好办法！']];
const CHEER = [['Awesome!', '太棒了！'], ['You got it!', '答对啦！'], ['What a jump!', '跳得真高！'], ['Super brain!', '真聪明！'], ['Boing boing! Yes!', '蹦蹦蹦！对啦！']];
const OOPS = [['Almost! Check with the hands-on box.', '差一点！用动手区检查一下。'], ['Mistakes help us learn.', '错了没关系，错题让我们变聪明。'], ['Take a breath and read it again.', '深呼吸，再读一遍题目。'], ['Kangaroos never give up!', '袋鼠从不放弃！']];
function say(text, mood) {
  const b = $('#buddy'), bb = $('#bubble'); if (!b) return;
  bb.innerHTML = text; bb.classList.remove('pop'); void bb.offsetWidth; bb.classList.add('pop');
  b.classList.remove('cheer', 'sad'); if (mood) { void b.offsetWidth; b.classList.add(mood); }
}

// ---------- videos (YouTube) ----------
// A series or a question can carry  video: { url: 'https://www.youtube.com/watch?v=…', title: ['English', '中文'] }
const VIDS = [];
const ytId = url => (String(url).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
const videoBtn = (v, label) => v ? `<button class="btn vid" data-v="${VIDS.push(v) - 1}">▶ ${label || TI('Watch the video', '看视频讲解')}</button>` : '';
function openVideo(v) {
  const id = ytId(v.url), m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<div class="inner" role="dialog" aria-label="video">
    <div class="row"><b class="big" style="flex:1;min-width:0">${v.title ? T(v.title[0], v.title[1]) : ''}</b><button class="btn ghost" id="vx">${TI('Close', '关闭')}</button></div>
    ${id ? `<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>` : ''}
    <p class="note">${TI('Video not playing?', '视频放不出来？')} <a href="${v.url}" target="_blank" rel="noopener">${TI('Open it on YouTube', '在 YouTube 打开')}</a></p></div>`;
  document.body.appendChild(m);
  const close = () => m.remove();
  m.onclick = e => { if (e.target === m) close(); };
  $('#vx', m).onclick = close;
}
document.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) openVideo(VIDS[+b.dataset.v]); });

// ---------- read aloud ----------
function speak(pair) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const [en, zh] = pair, lang = document.body.dataset.lang;
  const parts = lang === 'zh' ? [[zh, 'zh-CN']] : lang === 'en' ? [[en, 'en-US']] : [[en, 'en-US'], [zh, 'zh-CN']];
  parts.forEach(([t, l]) => { const u = new SpeechSynthesisUtterance(t.replace(/<[^>]+>/g, '')); u.lang = l; u.rate = .92; speechSynthesis.speak(u); });
}
const hush = () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); };

// ---------- series registry ----------
// Island options: breakEvery (questions between mini games), games (which mini games, in turn),
// lesson (animated slides shown before the first round), perRound (questions drawn from a longer list).
// A question may be a function that builds a fresh question each round.
const SERIES = [];
function registerSeries(s) { SERIES.push(s); }

// ---------- map page ----------
const islandCard = s => `<a class="island open${s.camp ? ' camp' : ''}" href="series/${s.id}.html">
        <span class="tag">${TI(s.tag[0], s.tag[1])}</span>
        <h3>${T(s.name[0], s.name[1])}</h3>
        <span class="meta">${T(s.desc[0], s.desc[1])}</span>
        <span class="meta">${TI(`${s.perRound || s.questions.length} questions`, `${s.perRound || s.questions.length} 道题`)}${s.lesson ? ' · ' + TI('mini-lesson', '趣味小课') : ''}${s.video ? ' · ' + TI('with video', '有视频讲解') : ''}</span>
        <span class="go">${TI('Start', '开始')} →</span></a>`;
const lockedCard = (tag, name, desc) => `<div class="island locked"><span class="tag">${TI(...tag)}</span><h3>${T(...name)}</h3><span class="meta">${T(...desc)}</span><span class="meta">${TI('Coming soon', '即将开放')}</span></div>`;
function renderMap() {
  renderHeader();
  app.innerHTML = `<section class="hero">
      <div><h2>${T('Hop across the islands!', '跳过一座座小岛！')}</h2>
      <p>${T('Each correct answer moves the kangaroo one stone forward. Every 5 questions you get a mini game.', '每答对一题，袋鼠就向前跳一块石头。每做 5 题，可以玩一次小游戏。')}</p></div>
      <svg class="roo-big" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>
    </section>
    <h2 class="sect">${TI('Training Camp', '训练营')}</h2>
    <p class="note" style="margin-top:4px">${T('Watch the mini-lesson, answer 20 questions, and play a 60-second game after every 10.', '先看趣味小课，再做 20 题，每做 10 题玩一次 60 秒小游戏。')}</p>
    <div class="islands">
      ${SERIES.filter(s => s.camp).map(islandCard).join('')}
      ${lockedCard(['Times Camp 2', '乘法营 2'], ['Times Tables ×3 ×4 ×6', '口诀 ×3 ×4 ×6'], ['Use facts you know to find new ones', '用会的口诀推出新的'])}
      ${lockedCard(['Division Camp', '除法营'], ['Sharing & Grouping', '平均分与分组'], ['More questions on the way', '题量会更多'])}
    </div>
    <h2 class="sect">${TI('Islands', '闯关岛')}</h2>
    <div class="islands">
      ${SERIES.filter(s => !s.camp).map(islandCard).join('')}
      <div class="island locked"><span class="tag">Level A · 2013–2024</span><h3>${T('Past Papers Island', '真题岛')}</h3><span class="meta">${T('Full 24-question papers, timed like the real contest', '整套 24 题，按正式比赛计时')}</span><span class="meta">${TI('Coming soon', '即将开放')}</span></div>
      <div class="island locked"><span class="tag">Level B · 3–4 年级</span><h3>${T('Big Jump Island', '大跳岛')}</h3><span class="meta">${T('Unlocks after Level A feels easy', 'A 级练熟后开放')}</span><span class="meta">${TI('Coming soon', '即将开放')}</span></div>
    </div>
    <h2 class="sect">${TI('Game corner', '小游戏乐园')}</h2>
    <div class="islands">
      ${Object.entries(GAMES).map(([k, g]) => `<a class="island play" href="games/${k}.html">
        <span class="tag">${TI('Mini game · 60 seconds', '小游戏 · 60 秒')}</span>
        <h3>${T(g.title[0], g.title[1])}</h3>
        <span class="meta">${T(g.rule[0], g.rule[1])}</span>
        <span class="go">${TI('Play', '开始玩')} →</span></a>`).join('')}
    </div>
    <p class="note">热身岛改编自 Math Kangaroo 2019 Level 1（A 级），图形为重新绘制，选项顺序与原卷可能不同。四个专题岛和训练营是原创练习题；训练营的计算题每次数字都不一样。本网站暂不保存学习记录。</p>`;
}

// ---------- one island ----------
let S, Q = [], cur, timer, keyFn = null, lessonSeen = false;
const letters = 'ABCDE';
const brkN = () => cur.breakEvery || BREAK_EVERY;
addEventListener('keydown', e => { if (keyFn) keyFn(e); });

// a fresh round: draw perRound questions (kept in list order, easy to hard) and build the generated ones
function buildRound() {
  let pool = cur.questions;
  if (cur.perRound && pool.length > cur.perRound) {
    const keep = new Set(shuffle(pool.map((_, i) => i)).slice(0, cur.perRound));
    pool = pool.filter((_, i) => keep.has(i));
  }
  return pool.map(q => typeof q === 'function' ? q() : q);
}

function playSeries(id) {
  renderHeader();
  cur = SERIES.find(s => s.id === id);
  Q = buildRound();
  document.title = `${cur.name[1]} · 袋鼠闯关`;
  showIntro();
}

function showIntro() {
  clearTimeout(timer); keyFn = null;
  const typed = Q.filter(q => q.input).length;
  app.innerHTML = `<section class="hero">
      <div><span class="tag">${TI(cur.tag[0], cur.tag[1])}</span>
      <h2>${T(cur.name[0], cur.name[1])}</h2>
      <p>${T(cur.desc[0], cur.desc[1])}</p>
      <p class="meta" style="margin-top:6px">${TI(`${Q.length} questions · a mini game every ${brkN()}`, `${Q.length} 道题 · 每 ${brkN()} 题玩一次小游戏`)}${typed ? ' · ' + TI(`${Q.length - typed} pick an answer, ${typed} type it in`, `${Q.length - typed} 道选择题，${typed} 道输入题`) : ''}</p>
      <div class="row" style="margin-top:14px"><button class="btn next" id="go">${TI('Start', '开始闯关')} →</button>${cur.lesson ? `<button class="btn hint" id="les">🎬 ${TI('Mini-lesson', '趣味小课')}</button>` : ''}${videoBtn(cur.video)}</div></div>
      <svg class="roo-big" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>
    </section>`;
  $('#go').onclick = () => cur.lesson && !lessonSeen ? showLesson(start) : start();
  if (cur.lesson) $('#les').onclick = () => showLesson(start);
}

// animated mini-lesson: one slide at a time, each slide draws itself with art(el)
function showLesson(done) {
  clearTimeout(timer); keyFn = null;
  const L = cur.lesson;
  let k = 0;
  const finish = () => { hush(); lessonSeen = true; done(); };
  const draw = () => {
    hush();
    const s = L[k], last = k === L.length - 1;
    app.innerHTML = `<section class="lesson">
      <div class="row"><span class="tag" style="flex:1">🎬 ${TI('Mini-lesson', '趣味小课')} · ${k + 1} / ${L.length}</span><button class="btn ghost" id="lskip">${TI('Skip', '跳过')}</button></div>
      <h2>${T(...s.title)}</h2>
      <div class="lart" id="lart"></div>
      <div class="ltext">${T(...s.text)}</div>
      <div class="row"><button class="btn ghost" id="lprev"${k ? '' : ' hidden'}>← ${TI('Back', '上一页')}</button>
        <button class="btn hint" id="lsay">🔊 ${TI('Read to me', '读给我听')}</button><button class="btn ghost" id="lagain">↻ ${TI('Play again', '再看一遍')}</button>
        <span style="flex:1"></span><button class="btn next" id="lnext">${last ? TI("Let's go!", '开始闯关！') : TI('Next', '下一页')} →</button></div>
      <div class="dots">${L.map((_, i) => `<i class="${i === k ? 'on' : ''}"></i>`).join('')}</div>
    </section>`;
    s.art($('#lart'));
    $('#lskip').onclick = finish;
    $('#lprev').onclick = () => { k--; draw(); };
    $('#lnext').onclick = () => { if (last) finish(); else { k++; tick(); draw(); } };
    $('#lsay').onclick = () => speak(s.text);
    $('#lagain').onclick = () => s.art($('#lart'));
  };
  draw();
}

function start() {
  Q = buildRound();
  S = { i: 0, streak: 0, games: 0, res: Q.map(() => ({ tries: 0, hints: 0, done: false, stars: 0 })) };
  showQ();
}

const starText = () => `★ ${S.res.reduce((s, r) => s + r.stars, 0)} / ${Q.length * 3}`;
function trackHTML() {
  return `<div class="track${Q.length > 12 ? ' long' : ''}"><div class="stones" style="--n:${Q.length + 1}" id="stones">${Q.map((q, i) => {
      const r = S.res[i], gift = (i + 1) % brkN() === 0 ? ' gift' : '';
      return `<div class="stone${gift} ${r.done ? 'done' : i === S.i ? 'now' : ''}">${i + 1}${r.done ? `<span class="st">${'★'.repeat(r.stars)}</span>` : ''}</div>`;
    }).join('')}<div class="stone goal">★</div></div>
    <svg class="roo-runner" id="runner" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>
    <div class="score"><span>${TI(`Question ${Math.min(S.i + 1, Q.length)} of ${Q.length}`, `第 ${Math.min(S.i + 1, Q.length)} / ${Q.length} 题`)}</span>
    <span><span class="starcount" id="starcount">${starText()}</span><span class="streak" id="streak"${S.streak >= 2 ? '' : ' hidden'}>${TI(`${S.streak} in a row`, `连对 ${S.streak}`)}</span></span></div></div>`;
}
function placeRunner(idx, hop) {
  const st = $('#stones')?.children[idx], tr = $('.track'), rn = $('#runner');
  if (!st) return;
  rn.style.left = st.getBoundingClientRect().left + st.offsetWidth / 2 - tr.getBoundingClientRect().left + 'px';
  if (hop) {
    boing();
    if (!reduce) { rn.classList.remove('hop'); void rn.offsetWidth; rn.classList.add('hop'); }
    setTimeout(() => { st.classList.remove('land'); void st.offsetWidth; st.classList.add('land'); }, 450);
  }
}
addEventListener('resize', () => { if ($('#runner') && S) placeRunner(S.res[S.i]?.done ? S.i + 1 : S.i, false); });

function flyStars(fromEl, n) {
  const to = $('#starcount'); if (!to) return;
  const done = () => { to.textContent = starText(); to.classList.remove('bump'); void to.offsetWidth; to.classList.add('bump'); };
  if (reduce) return done();
  const a = fromEl.getBoundingClientRect(), b = to.getBoundingClientRect();
  for (let k = 0; k < n; k++) {
    const s = document.createElement('span'); s.className = 'flystar'; s.textContent = '★';
    s.style.left = a.left + a.width / 2 - 14 + 'px'; s.style.top = a.top + 'px';
    document.body.appendChild(s);
    setTimeout(() => { s.style.transform = `translate(${b.left - a.left - a.width / 2 + 14}px, ${b.top - a.top}px) scale(.6) rotate(270deg)`; s.style.opacity = '.4'; }, 80 + k * 180);
    setTimeout(() => { s.remove(); tick(); }, 900 + k * 180);
  }
  setTimeout(done, 900 + n * 180);
}

// on-screen number pad for type-in questions (the computer keyboard works too)
const padHTML = unit => `<div class="pad" id="pad">
    <div class="padshow"><span class="padval empty" id="pv" aria-live="polite">?</span>${unit ? `<small>${unit}</small>` : ''}</div>
    <div class="keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button class="key" data-k="${n}">${n}</button>`).join('')}
      <button class="key del" data-k="del" aria-label="delete">⌫</button><button class="key" data-k="0">0</button><button class="key ok" data-k="ok" aria-label="OK">✓</button></div></div>`;

function showQ() {
  clearTimeout(timer); keyFn = null;
  const q = Q[S.i], r = S.res[S.i];
  const u = q.unit || ['', ''], unit = TI(u[0], u[1]);
  app.innerHTML = `${trackHTML()}
    <div class="buddy" id="buddy"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg><div class="bubble" id="bubble"></div></div>
    <section class="card${q.boss ? ' boss' : ''}">
      <div class="qhead"><span class="qnum">${TI(`Question ${S.i + 1}`, `第 ${S.i + 1} 题`)}</span><span class="pts">${q.pts} ${TI('points', '分')}</span>${q.boss ? `<span class="bossb">👑 ${TI('Boss question', 'Boss 题')}</span>` : ''}${q.input ? `<span class="kind">⌨ ${TI('Type the answer', '输入答案')}</span>` : ''}<span class="src">${q.src || TI(cur.name[0], cur.name[1])}</span></div>
      <div class="stem">${q.stem}</div>
      ${q.fig ? `<div class="fig">${q.fig}</div>` : ''}
      ${q.mount ? `<div class="lab"><div class="lab-title">${TI('Try it with your hands', '动手试试')}</div><div class="lab-tip">${q.lab}</div><div id="labbody" style="display:flex;flex-direction:column;gap:10px"></div></div>` : ''}
      ${q.input ? padHTML(u[0] ? unit : '') : `<div class="choices" id="ch">${q.choices.map((c, i) => `<button class="choice" data-i="${i}"><b>${letters[i]}</b><span>${q.shape ? shp(c) : c}${u[0] ? `<small style="font-size:14px"> ${unit}</small>` : ''}</span></button>`).join('')}</div>`}
      <div id="fb"></div>
      <div id="hintwrap" style="display:flex;flex-direction:column;gap:8px"></div>
      <div class="row"><button class="btn hint" id="hb"></button>${videoBtn(q.video)}<span style="flex:1"></span><a class="btn ghost" href="${ROOT}index.html">${TI('Map', '地图')}</a></div>
    </section>`;
  if (q.mount) q.mount($('#labbody'));
  say(T(...pick(HELLO)));
  requestAnimationFrame(() => placeRunner(S.i, false));
  const paintHint = () => {
    $('#hintwrap').innerHTML = q.hints.slice(0, r.hints).map((h, k) => `<div class="box hintbox"><h4>${TI(`Hint ${k + 1}`, `提示 ${k + 1}`)}</h4>${h}</div>`).join('');
    const hb = $('#hb');
    hb.hidden = r.done || r.hints >= q.hints.length;
    hb.innerHTML = TI(`Hint ${r.hints + 1}/${q.hints.length}`, `提示 ${r.hints + 1}/${q.hints.length}`);
  };
  $('#hb').onclick = () => { r.hints++; paintHint(); };
  paintHint();
  // el: the button or answer box that was right; it gets the stars and confetti
  const right = el => {
    r.done = true; keyFn = null;
    r.stars = r.tries === 0 && r.hints === 0 ? 3 : r.tries <= 1 ? 2 : 1;
    document.querySelectorAll('#ch .choice, #pad .key').forEach(x => x.disabled = true);
    S.streak = r.tries === 0 ? S.streak + 1 : 0;
    yay(S.streak);
    const c = pick(CHEER);
    say(S.streak >= 2 ? T(`${c[0]} ${S.streak} in a row!`, `${c[1]}连对 ${S.streak} 题！`) : T(...c), 'cheer');
    const sk = $('#streak');
    sk.hidden = S.streak < 2;
    sk.innerHTML = TI(`${S.streak} in a row`, `连对 ${S.streak}`);
    sk.classList.remove('bump'); void sk.offsetWidth; sk.classList.add('bump');
    flyStars(el, r.stars);
    const rect = el.getBoundingClientRect(); confetti(rect.left + rect.width / 2, rect.top);
    paintHint();
    const stones = $('#stones').children;
    stones[S.i].classList.remove('now'); stones[S.i].classList.add('done');
    stones[S.i].innerHTML = `${S.i + 1}<span class="st">${'★'.repeat(r.stars)}</span>`;
    placeRunner(S.i + 1, true);
    autoNext(q, r);
  };
  const wrong = () => {
    r.tries++;
    boo();
    S.streak = 0; $('#streak').hidden = true;
    say(T(...pick(OOPS)), 'sad');
    const help = q.mount ? T('Use the hands-on box above, or open a hint.', '用上面的“动手试试”验证一下，或者看一个提示。') : T('Open a hint, or work it out step by step.', '看一个提示，或者一步一步算一算。');
    $('#fb').innerHTML = `<div class="box bad"><h4>${TI('Not quite. Think again!', '再想想！')}</h4>${
      r.hints < q.hints.length ? help : T('Read the hints again and try once more.', '再读一读提示，再试一次。')}</div>`;
    if (r.tries >= 2 && r.hints === 0) { r.hints = 1; paintHint(); }
  };

  if (q.input) {
    let typed = '';
    const pv = $('#pv'), pad = $('#pad');
    const show = () => { pv.textContent = typed || '?'; pv.classList.toggle('empty', !typed); };
    const press = k => {
      if (r.done) return;
      if (k === 'del') typed = typed.slice(0, -1);
      else if (k === 'ok') {
        if (!typed) return;
        if (+typed === q.answer) { pad.classList.add('right'); right(pv); return; }
        pad.classList.remove('wrong'); void pad.offsetWidth; pad.classList.add('wrong');
        typed = ''; show(); wrong(); return;
      }
      else if (typed.length < 4) typed = (typed === '0' ? '' : typed) + k;
      tick(); show();
    };
    pad.onclick = e => { const b = e.target.closest('.key'); if (b) press(b.dataset.k); };
    keyFn = e => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') press('del');
      else if (e.key === 'Enter') press('ok');
      else return;
      e.preventDefault();
    };
  } else {
    document.querySelectorAll('#ch .choice').forEach(b => b.onclick = () => {
      if (r.done) return;
      if (+b.dataset.i === q.answer) { b.classList.add('right'); right(b); }
      else { b.classList.add('wrong'); b.disabled = true; wrong(); }
    });
  }
}

// after a correct answer: show the explanation, then move on by itself unless the child asks to wait
function autoNext(q, r) {
  const last = S.i === Q.length - 1, brk = (S.i + 1) % brkN() === 0;
  const label = brk ? TI('Mini game time!', '小游戏时间！') : last ? TI('See my results', '看看成绩') : TI('Next question', '下一题');
  $('#fb').innerHTML = `<div class="box ok"><div class="stars-big">${'★'.repeat(r.stars)}<span class="off">${'★'.repeat(3 - r.stars)}</span></div>
    <h4>${TI('Correct!', '答对了！')}</h4>${q.explain}</div>
    <div class="row" style="margin-top:10px">
      <button class="btn next" id="nx"><svg class="countdown" id="cdsvg" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
        <circle id="cd" cx="18" cy="18" r="15" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="94.2" stroke-dashoffset="0" transform="rotate(-90 18 18)" style="transition:stroke-dashoffset ${AUTO_NEXT}s linear"/></svg>${label} →</button>
      <button class="btn ghost" id="wait">${TI('Wait, let me read', '等一下，我看看讲解')}</button>
    </div>`;
  const go = () => {
    clearTimeout(timer);
    if (brk) showBreak(last);
    else if (last) showResult();
    else { S.i++; showQ(); }
  };
  $('#nx').onclick = go;
  $('#wait').onclick = () => { clearTimeout(timer); $('#wait').hidden = true; $('#cdsvg').style.display = 'none'; };
  requestAnimationFrame(() => requestAnimationFrame(() => { const cd = $('#cd'); if (cd) cd.style.strokeDashoffset = '94.2'; }));
  timer = setTimeout(go, AUTO_NEXT * 1000);
}

function showBreak(last) {
  keyFn = null;
  const keys = cur.games || Object.keys(GAMES);
  const key = keys[S.games++ % keys.length];
  app.innerHTML = `${trackHTML()}<div id="gamebox"></div>`;
  requestAnimationFrame(() => placeRunner(S.i + 1, false));
  runGame($('#gamebox'), key, {
    cont: last ? TI('See my results', '看看成绩') : TI('Back to the island', '继续闯关'),
    onEnd: () => { if (last) showResult(); else { S.i++; showQ(); } }
  });
}

function showResult() {
  clearTimeout(timer);
  S.i = Q.length;
  const stars = S.res.reduce((s, r) => s + r.stars, 0);
  const pts = Q.reduce((s, q, i) => s + (S.res[i].tries === 0 ? q.pts : 0), 0);
  const maxPts = Q.reduce((s, q) => s + q.pts, 0);
  const ratio = stars / (Q.length * 3);
  const medal = ratio >= .85 ? ['Gold Kangaroo', '金袋鼠', '#f2b630'] : ratio >= .65 ? ['Silver Kangaroo', '银袋鼠', '#b9c3cc'] : ['Bronze Kangaroo', '铜袋鼠', '#cd8a4f'];
  app.innerHTML = `${trackHTML()}<section class="result">
    <h2>${TI(`${cur.name[0]} cleared!`, `${cur.name[1]}通关！`)}</h2>
    <div class="medal" style="--m:${medal[2]}"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg></div>
    <div class="big">${TI(medal[0], medal[1])}</div>
    <div class="stars-big">★ ${stars} / ${Q.length * 3}</div>
    <p style="margin:0;max-width:52ch">${T(`Contest score: ${pts} / ${maxPts}. In the real contest only your first answer counts.`, `比赛得分：${pts} / ${maxPts}。正式比赛只算第一次作答。`)}</p>
    <div style="overflow-x:auto;width:100%"><table class="recap"><thead><tr><th>#</th><th>${TI('Points', '分值')}</th><th>${TI('Wrong tries', '答错次数')}</th><th>${TI('Hints', '提示')}</th><th>★</th></tr></thead><tbody>
    ${Q.map((q, i) => { const r = S.res[i]; return `<tr><td class="num">${i + 1}</td><td class="num">${q.pts}</td><td class="num">${r.tries}</td><td class="num">${r.hints}</td><td class="s">${'★'.repeat(r.stars)}</td></tr>`; }).join('')}
    </tbody></table></div>
    <div class="row"><button class="btn next" id="again">${TI('Play again', '再玩一次')}</button>
      ${cur.next ? `<a class="btn next" href="${cur.next}.html">${TI('Next island', '下一座岛')} →</a>` : ''}
      <a class="btn ghost" href="${ROOT}index.html">${TI('Back to map', '回到地图')}</a>${videoBtn(cur.video)}</div>
  </section>`;
  requestAnimationFrame(() => placeRunner(Q.length, true));
  fanfare(); confetti(innerWidth / 2, innerHeight / 3);
  setTimeout(() => confetti(innerWidth / 4, innerHeight / 2), 500);
  setTimeout(() => confetti(innerWidth * .75, innerHeight / 2), 900);
  $('#again').onclick = start;
}
