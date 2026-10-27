// Mini games: 60 seconds each. Shown between questions on an island, or played alone from the map.
const GAME_SECONDS = 60;
let stopGame = null;   // cleanup for the game that is running

const GAMES = {
  bubbles: {
    title: ['Make 10 Bubbles', '凑 10 泡泡'],
    rule: ['Tap two bubbles that add up to 10. How many pairs can you pop in 60 seconds?', '点两个加起来等于 10 的泡泡。60 秒内能戳破多少对？'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2', '#d99a10', '#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      const pair = () => { const a = 1 + rnd(9); return [a, 10 - a]; };
      const vals = [];
      for (let k = 0; k < 6; k++) vals.push(...pair());
      vals.sort(() => Math.random() - .5);
      let sel = -1;
      g.body.innerHTML = `<div class="prompt">${TI('Find two numbers that make 10', '找出凑成 10 的两个数')}</div><div class="bubbles" id="bb">${vals.map((_, i) => `<button class="bub" data-i="${i}"></button>`).join('')}</div>`;
      const bb = $('#bb', g.body);
      const paint = i => {
        const b = bb.children[i];
        b.textContent = vals[i]; b.className = 'bub';
        b.style.setProperty('--bc', cols[vals[i]]); b.style.animationDelay = -Math.random() * 3 + 's';
      };
      vals.forEach((_, i) => paint(i));
      bb.onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        const i = +b.dataset.i;
        if (sel === -1) { sel = i; b.classList.add('sel'); tick(); return; }
        const j = sel; sel = -1; bb.children[j].classList.remove('sel');
        if (i === j) return;
        if (vals[i] + vals[j] === 10) {
          g.add(); pop();
          bb.children[i].classList.add('pop'); bb.children[j].classList.add('pop');
          const r = b.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, 25);
          // refill with a fresh pair, then swap it into random spots so the new pair isn't always side by side
          setTimeout(() => {
            [vals[i], vals[j]] = pair();
            const a = rnd(vals.length), c = rnd(vals.length);
            [vals[i], vals[a]] = [vals[a], vals[i]];
            [vals[j], vals[c]] = [vals[c], vals[j]];
            sel = -1;
            new Set([i, j, a, c]).forEach(paint);
          }, 300);
        } else {
          [i, j].forEach(k => { const x = bb.children[k]; x.classList.remove('bad'); void x.offsetWidth; x.classList.add('bad'); });
          boo();
        }
      };
    }
  },

  jump: {
    title: ['Kangaroo Jump', '袋鼠跳格'],
    rule: ['Read the clue and tap the number where the kangaroo should land.', '看提示，点袋鼠应该跳到的那个数。'],
    setup(g) {
      let pos = 1 + rnd(20), target;
      g.body.innerHTML = `<div class="prompt" id="jp"></div><div class="jboard" id="jb">${Array.from({ length: 50 }, (_, k) =>
        `<button class="jcell ${(k + 1) % 10 === 0 ? 'ten' : ''}" data-n="${k + 1}">${k + 1}</button>`).join('')}<svg class="jroo" id="jr" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg></div>`;
      const jb = $('#jb', g.body), jr = $('#jr', g.body), cell = n => jb.children[n - 1];
      const moveRoo = hop => {
        const c = cell(pos);
        jr.style.left = c.offsetLeft + c.offsetWidth / 2 + 'px';
        jr.style.top = c.offsetTop + c.offsetHeight / 2 + 'px';
        jb.querySelectorAll('.here').forEach(x => x.classList.remove('here'));
        c.classList.add('here');
        if (hop && !reduce) { jr.classList.remove('hop'); void jr.offsetWidth; jr.classList.add('hop'); }
      };
      const clues = [
        n => { const k = 2 + rnd(7); return [n + k, `Hop forward ${k}`, `往前跳 ${k} 格`]; },
        n => { const k = 2 + rnd(7); return [n - k, `Hop back ${k}`, `往回跳 ${k} 格`]; },
        n => [n + 10, 'Go to the number that is 10 more', '跳到比现在大 10 的数'],
        n => [n - 10, 'Go to the number that is 10 less', '跳到比现在小 10 的数'],
        n => { const k = 2 + rnd(3); return [n + 2 * k, `Hop by 2s, ${k} times`, `2 个 2 个往前跳 ${k} 下`]; },
        n => { const k = 2 + rnd(2); return [n + 5 * k, `Hop by 5s, ${k} times`, `5 个 5 个往前跳 ${k} 下`]; },
        n => [Math.ceil((n + 1) / 10) * 10, 'Go to the next number that ends in 0', '跳到下一个个位是 0 的数']
      ];
      const next = () => {
        let c;
        do { c = pick(clues)(pos); } while (c[0] < 1 || c[0] > 50 || c[0] === pos);
        target = c[0];
        $('#jp', g.body).innerHTML = TI(`You are on ${pos}. ${c[1]}.`, `你在 ${pos}。${c[2]}。`);
      };
      jb.onclick = e => {
        const b = e.target.closest('.jcell'); if (!b || g.over) return;
        if (+b.dataset.n === target) { pos = target; g.add(); boing(); moveRoo(true); next(); }
        else { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); boo(); }
      };
      requestAnimationFrame(() => moveRoo(false));
      next();
      const onResize = () => moveRoo(false);
      addEventListener('resize', onResize);
      return () => removeEventListener('resize', onResize);
    }
  },

  sprint: {
    title: ['Speedy Sums', '加减快闪'],
    rule: ['Pop the bubble with the right answer. Every right answer moves the kangaroo along. Reach the flag for a bonus!', '戳中正确答案的泡泡，每答对一题袋鼠就往前跳一格，跳到旗子还有奖励分！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'];
      let ans, run = 0;
      g.body.innerHTML = `<div class="lane" id="ln"><span class="flag">🚩</span><svg class="sroo" id="sr" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg></div>
        <div class="prompt eqbig" id="eq"></div><div class="bubbles opts" id="op"></div>`;
      // make-10 facts, adding within 20, subtracting within 20
      const next = () => {
        const t = rnd(3);
        let s;
        if (t === 0) { const a = ri(1, 9); ans = 10 - a; s = `${a} + ? = 10`; }
        else if (t === 1) { const a = ri(2, 9), b = ri(2, 9); ans = a + b; s = `${a} + ${b} = ?`; }
        else { const b = ri(2, 9); ans = ri(2, 9); s = `${ans + b} − ${b} = ?`; }
        const o = new Set([ans]);
        while (o.size < 3) { const v = ans + pick([-2, -1, 1, 2, 10]); if (v >= 0) o.add(v); }
        $('#eq', g.body).textContent = s;
        $('#op', g.body).innerHTML = shuffle([...o]).map(v => `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};animation-delay:${-Math.random() * 3}s">${v}</button>`).join('');
      };
      const move = () => { $('#sr', g.body).style.left = `calc(${(run % 10) * 9}% + 4px)`; };
      $('#op', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n === ans) {
          run++; g.add(); pop(); b.classList.add('pop');
          if (run % 10 === 0) { g.add(5); fanfare(); const r = $('#ln', g.body).getBoundingClientRect(); confetti(r.right - 30, r.top, 50); }
          move(); setTimeout(next, 250);
        } else { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); boo(); }
      };
      move(); next();
    }
  }
};

// opts: { cont: button label after the game, onEnd(), again() optional, skip: false to hide Skip }
function runGame(el, key, opts) {
  if (stopGame) stopGame();
  const G = GAMES[key];
  el.innerHTML = `<section class="game"><div class="ghead"><h2>${T(G.title[0], G.title[1])}</h2><span class="gscore" id="gs">0</span></div>
    <div class="timer"><i id="gt"></i></div><div id="gbody"></div></section>`;
  const body = $('#gbody', el);
  body.innerHTML = `<div class="gameover"><svg width="84" height="84" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>
    <p class="big" style="margin:0;max-width:40ch">${T(G.rule[0], G.rule[1])}</p>
    <div class="row"><button class="btn next" id="gstart">${TI('Go!', '开始！')}</button>${opts.skip === false ? '' : `<button class="btn ghost" id="gskip">${TI('Skip', '跳过')}</button>`}</div></div>`;
  if ($('#gskip', el)) $('#gskip', el).onclick = opts.onEnd;
  $('#gstart', el).onclick = () => {
    let score = 0, left = GAME_SECONDS, over = false, cleanup;
    const sc = $('#gs', el), bar = $('#gt', el);
    const g = {
      body,
      get over() { return over; },
      add(n = 1) { score += n; sc.textContent = score; sc.classList.remove('bump'); void sc.offsetWidth; sc.classList.add('bump'); }
    };
    const finish = () => {
      over = true;
      if (cleanup) cleanup();
      fanfare();
      const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, Math.max(60, r.top + 60));
      body.innerHTML = `<div class="gameover"><div class="stars-big">${score}</div>
        <p class="big" style="margin:0">${T(`Time's up! You scored ${score}.`, `时间到！你得了 ${score} 分。`)}</p>
        <div class="row"><button class="btn next" id="gnext">${opts.cont} →</button>${opts.again ? `<button class="btn ghost" id="gagain">${TI('Play again', '再玩一次')}</button>` : ''}</div></div>`;
      $('#gnext', el).onclick = opts.onEnd;
      if (opts.again) $('#gagain', el).onclick = opts.again;
    };
    const iv = setInterval(() => {
      left--;
      bar.style.transform = `scaleX(${left / GAME_SECONDS})`;
      if (left <= 5 && left > 0) tick();
      if (left <= 0) { clearInterval(iv); stopGame = null; finish(); }
    }, 1000);
    stopGame = () => { clearInterval(iv); if (cleanup) cleanup(); stopGame = null; };
    cleanup = G.setup(g);
  };
}

// standalone game page
function playGame(key) {
  renderHeader();
  document.title = `${GAMES[key].title[1]} · 袋鼠闯关`;
  runGame(app, key, {
    skip: false,
    cont: TI('Back to map', '回到地图'),
    onEnd: () => { location.href = ROOT + 'index.html'; },
    again: () => playGame(key)
  });
}
