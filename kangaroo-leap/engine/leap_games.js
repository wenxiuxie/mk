// Leap-only mini games (fraction + mixed-ops flavored). Replaces Hop's game list for this folder.
// Loaded after games.js. Do not use from kangaroo-hop.

const _lgBar = (d, shaded, w = 200, h = 28) => {
  const cell = w / d;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${Array.from({ length: d }, (_, i) =>
    `<rect x="${i * cell}" y="0" width="${cell}" height="${h}" fill="${i < shaded ? '#f2b630' : '#fff8e8'}" stroke="#1f2b3a" stroke-width="2"/>`).join('')}</svg>`;
};
const _lgPie = (d, shaded, r = 48) => {
  const cx = r + 4, cy = r + 4, R = r;
  const slice = (i, on) => {
    const a0 = -Math.PI / 2 + (i / d) * Math.PI * 2;
    const a1 = -Math.PI / 2 + ((i + 1) / d) * Math.PI * 2;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    return `<path d="M${cx},${cy} L${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} Z" fill="${on ? '#c8742c' : '#fff8e8'}" stroke="#1f2b3a" stroke-width="2"/>`;
  };
  return `<svg viewBox="0 0 ${2 * r + 8} ${2 * r + 8}" width="${2 * r + 8}" height="${2 * r + 8}">${Array.from({ length: d }, (_, i) => slice(i, i < shaded)).join('')}</svg>`;
};

const LEAP_GAMES = {
  fracmatch: {
    title: ['Fraction Twin', '分数双胞胎'],
    rule: ['Tap two fractions that are equal (like 1/2 and 2/4). How many pairs in 60 seconds?',
      '点两个相等的分数（例如 1/2 和 2/4）。60 秒能对上几对？'],
    setup(g) {
      const pairs = () => {
        const base = pick([[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [1, 5], [2, 5]]);
        const k = pick([2, 3, 4]);
        const a = `${base[0]}/${base[1]}`, b = `${base[0] * k}/${base[1] * k}`;
        return [a, b];
      };
      const vals = [];
      for (let i = 0; i < 4; i++) vals.push(...pairs());
      shuffle(vals);
      let sel = -1;
      g.body.innerHTML = `<div class="prompt">${TI('Find equivalent fractions', '找出相等的分数')}</div>
        <div class="bubbles" id="fm" style="grid-template-columns:repeat(4,minmax(0,1fr))">${vals.map((_, i) =>
          `<button class="bub" data-i="${i}" style="--bc:${pick(['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'])};border-radius:18px;font-size:clamp(16px,4.5vw,22px)"></button>`).join('')}</div>`;
      const box = $('#fm', g.body);
      const paint = i => { box.children[i].textContent = vals[i]; box.children[i].className = 'bub'; };
      vals.forEach((_, i) => paint(i));
      const eq = (x, y) => {
        const [a, b] = x.split('/').map(Number), [c, d] = y.split('/').map(Number);
        return a * d === b * c;
      };
      box.onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        const i = +b.dataset.i;
        if (sel < 0) { sel = i; b.classList.add('sel'); tick(); return; }
        const j = sel; sel = -1; box.children[j].classList.remove('sel');
        if (i === j) return;
        if (eq(vals[i], vals[j])) {
          g.add(); pop(); gBurst(b);
          box.children[i].classList.add('pop'); box.children[j].classList.add('pop');
          setTimeout(() => {
            const [p, q] = pairs();
            vals[i] = p; vals[j] = q;
            const a = rnd(vals.length), c = rnd(vals.length);
            [vals[i], vals[a]] = [vals[a], vals[i]];
            [vals[j], vals[c]] = [vals[c], vals[j]];
            new Set([i, j, a, c]).forEach(paint);
          }, 280);
        } else gBad(b), gBad(box.children[j]);
      };
    }
  },

  piepop: {
    title: ['Pie Pop', '蛋糕点分数'],
    rule: ['Look at the shaded pie or bar. Tap the matching fraction bubble!',
      '看涂色的圆或长条，点出正确的分数泡泡！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'];
      g.body.innerHTML = `<div id="ppfig" style="display:flex;justify-content:center;min-height:110px"></div>
        <div class="prompt" id="ppq"></div><div class="bubbles opts" id="ppop"></div>`;
      let ans = '';
      const deal = () => {
        const d = pick([2, 3, 4, 5, 6, 8]), n = ri(1, Math.max(1, d - 1));
        ans = `${n}/${d}`;
        const opts = new Set([ans]);
        while (opts.size < 3) {
          const nn = ri(1, d), dd = pick([d, d + 1, Math.max(2, d - 1)]);
          opts.add(`${nn}/${dd}`);
        }
        $('#ppfig', g.body).innerHTML = rnd(2) ? _lgPie(d, n) : _lgBar(d, n, 240, 32);
        $('#ppq', g.body).innerHTML = TI('What fraction is shaded?', '涂色是几分之几？');
        $('#ppop', g.body).innerHTML = shuffle([...opts]).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:18px;font-size:clamp(18px,5vw,26px)">${v}</button>`).join('');
      };
      g.body.onclick = e => {
        const b = e.target.closest('#ppop .bub'); if (!b || g.over) return;
        if (b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  barshade: {
    title: ['Shade the Bar', '涂色挑战'],
    rule: ['Tap squares to shade the bar until it matches the target fraction. Then press Check!',
      '点小格涂色，涂到目标分数后按“检查”！'],
    setup(g) {
      let d, need, shaded;
      g.body.innerHTML = `<div class="prompt" id="bsq"></div>
        <div id="bsbar" style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;max-width:420px;margin:8px auto"></div>
        <div class="row" style="justify-content:center"><button class="btn next" id="bsok">${TI('Check', '检查')}</button>
        <button class="btn ghost" id="bsclear">${TI('Clear', '清空')}</button></div>`;
      const deal = () => {
        d = pick([4, 5, 6, 8]); need = ri(1, d - 1); shaded = 0;
        $('#bsq', g.body).innerHTML = TI(`Shade ${need}/${d} of the bar`, `请涂出 ${need}/${d}`);
        $('#bsbar', g.body).innerHTML = Array.from({ length: d }, (_, i) =>
          `<button class="jcell" data-i="${i}" style="width:44px;height:44px;border-radius:8px;background:#fff8e8"></button>`).join('');
      };
      const paint = () => {
        [...$('#bsbar', g.body).children].forEach((c, i) => {
          c.style.background = i < shaded ? '#f2b630' : '#fff8e8';
        });
      };
      $('#bsbar', g.body).onclick = e => {
        const b = e.target.closest('.jcell'); if (!b || g.over) return;
        const i = +b.dataset.i;
        shaded = i + 1; // tap cell i means shade 0..i
        tick(); paint();
      };
      $('#bsclear', g.body).onclick = () => { if (g.over) return; shaded = 0; paint(); };
      $('#bsok', g.body).onclick = () => {
        if (g.over) return;
        if (shaded === need) { g.add(); pop(); confetti(innerWidth / 2, 180, 30); deal(); paint(); }
        else { boo(); $('#bsq', g.body).classList.remove('bad'); void $('#bsq', g.body).offsetWidth; }
      };
      deal(); paint();
    }
  },

  orderops: {
    title: ['Who Goes First?', '先算谁'],
    rule: ['For each expression, tap what you should compute first — or tap the final answer when asked!',
      '看算式：点出应先算的一步；有时直接点最终答案！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      g.body.innerHTML = `<div class="prompt eqbig" id="ooeq" style="font-size:clamp(22px,6vw,34px)"></div>
        <div class="prompt" id="oohint" style="font-size:16px;opacity:.85"></div>
        <div class="bubbles opts" id="ooop"></div>`;
      let mode, ans;
      const deal = () => {
        mode = rnd(2); // 0 = first step product/sum snippet, 1 = final value
        const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
        if (mode === 0) {
          //  a + b × c  → first is b×c
          const expr = `${a} + ${b} × ${c}`;
          ans = `${b} × ${c}`;
          const wrong = [`${a} + ${b}`, `${a} × ${c}`, `${a} + ${b} × ${c}`];
          $('#oohint', g.body).innerHTML = TI('Tap the part to do first', '先点出要先算的部分');
          $('#ooeq', g.body).textContent = expr;
          $('#ooop', g.body).innerHTML = shuffle([ans, ...wrong.filter(w => w !== ans).slice(0, 2)]).map(v =>
            `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:16px;font-size:clamp(14px,3.8vw,20px)">${v}</button>`).join('');
        } else {
          const useParen = rnd(2);
          let expr, val;
          if (useParen) {
            expr = `(${a} + ${b}) × ${c}`;
            val = (a + b) * c;
          } else {
            expr = `${a} + ${b} × ${c}`;
            val = a + b * c;
          }
          ans = String(val);
          const trap = useParen ? a + b * c : (a + b) * c;
          const opts = new Set([val, trap, a + b + c, a * b * c]);
          $('#oohint', g.body).innerHTML = TI('Tap the final answer', '点出最终答案');
          $('#ooeq', g.body).textContent = expr;
          $('#ooop', g.body).innerHTML = shuffle([...opts].slice(0, 3).map(String)).map(v =>
            `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:16px;font-size:clamp(18px,5vw,28px)">${v}</button>`).join('');
        }
      };
      $('#ooop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  opsprint: {
    title: ['Ops Sprint', '运算冲刺'],
    rule: ['Mixed + − × with parentheses sometimes. Pop the correct answer bubble!',
      '混合加减乘（有时带括号）。戳中正确答案！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'];
      g.body.innerHTML = `<div class="prompt eqbig" id="oseq"></div><div class="bubbles opts" id="osop"></div>`;
      const deal = () => {
        const t = rnd(4);
        let expr, ans;
        if (t === 0) { const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9); expr = `${a} + ${b} × ${c}`; ans = a + b * c; }
        else if (t === 1) { const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9); expr = `${a} × ${b} − ${c}`; ans = a * b - c; }
        else if (t === 2) { const a = ri(2, 8), b = ri(2, 8), c = ri(2, 6); expr = `(${a} + ${b}) × ${c}`; ans = (a + b) * c; }
        else { const a = ri(10, 20), b = ri(2, 9), c = ri(2, 5); expr = `${a} − ${b} × ${c}`; ans = a - b * c; }
        const opts = new Set([ans]);
        const m = expr.match(/(\d+)\s*([+−×])\s*(\d+)\s*([+−×])\s*(\d+)/);
        if (m && !expr.includes('(')) {
          let ltr = +m[1];
          const op = (x, o, y) => o === '+' ? x + y : o === '−' ? x - y : x * y;
          ltr = op(op(ltr, m[2], +m[3]), m[4], +m[5]);
          opts.add(ltr);
        }
        if (expr.includes('(')) {
          const naked = expr.replace(/[()]/g, '');
          try { opts.add(Function('"use strict";return (' + naked.replace(/×/g, '*').replace(/−/g, '-') + ')')()); } catch (e) {}
        }
        while (opts.size < 3) opts.add(ans + pick([-3, -2, -1, 1, 2, 3]));
        $('#oseq', g.body).textContent = expr + ' = ?';
        $('#osop', g.body).innerHTML = shuffle([...opts].filter(v => Number.isFinite(v)).slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)}">${v}</button>`).join('');
        g.body.dataset.ans = String(ans);
      };
      $('#osop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (b.dataset.n === g.body.dataset.ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  // —— more complex Leap games ——
  fracdrop: {
    title: ['Fraction Star Catch', '分数接星星'],
    rule: ['A target fraction appears. Stars fall with fractions — tap one that equals the target before it lands! Gets faster as you score.',
      '出现目标分数后，天上掉下分数星星——点中与目标相等的那颗！得分越高掉得越快。'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      const eq = (a, b, c, d) => a * d === b * c;
      const fs = (n, d) => `${n}/${d}`;
      let ansN, ansD, round = 0;
      g.body.innerHTML = `<div class="prompt" id="fdq"></div><div class="prompt eqbig" id="fdeq"></div><div class="sky" id="fdsky"></div>`;
      const sky = $('#fdsky', g.body);
      const next = () => {
        const r = ++round;
        const base = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [1, 6], [5, 6]]);
        const k = pick([1, 2, 3, 4]);
        ansN = base[0] * k; ansD = base[1] * k;
        const target = fs(ansN, ansD);
        const show = rnd(2) ? fs(base[0], base[1]) : target;
        $('#fdq', g.body).innerHTML = TI('Tap a star equal to', '点中等于下面的星星');
        $('#fdeq', g.body).textContent = show;
        const opts = new Set([target]);
        // one guaranteed equivalent look-alike
        const k2 = pick([2, 3, 4].filter(x => x !== k));
        opts.add(fs(base[0] * k2, base[1] * k2));
        while (opts.size < 4) {
          const dn = pick([ansD, ansD + 1, Math.max(2, ansD - 1), base[1] * pick([2, 3])]);
          const nn = ri(1, Math.max(1, dn - 1));
          if (!eq(nn, dn, ansN, ansD)) opts.add(fs(nn, dn));
        }
        const list = shuffle([...opts]).slice(0, 4);
        // ensure at least one correct
        if (!list.some(v => { const [a, b] = v.split('/').map(Number); return eq(a, b, ansN, ansD); }))
          list[0] = target;
        const dur = Math.max(3.2, 6.2 - g.score * .1);
        sky.innerHTML = list.map((v, i) =>
          `<button class="fstar" data-n="${v}" style="left:${1 + i * 25}%;--bc:${cols[i]};animation-duration:${dur}s;animation-delay:${rnd(8) / 10}s;font-size:clamp(14px,3.8vw,20px)">${v}</button>`).join('');
        const good = [...sky.querySelectorAll('.fstar')].find(b => {
          const [a, b2] = b.dataset.n.split('/').map(Number); return eq(a, b2, ansN, ansD);
        });
        if (good) good.addEventListener('animationend', e => {
          if (e.animationName === 'fall' && r === round && !g.over) { boo(); next(); }
        });
      };
      sky.onclick = e => {
        const b = e.target.closest('.fstar'); if (!b || g.over || b.classList.contains('pop')) return;
        const [a, d] = b.dataset.n.split('/').map(Number);
        if (eq(a, d, ansN, ansD)) { g.add(); pop(); gBurst(b); b.classList.add('pop'); round++; setTimeout(next, 280); }
        else gBad(b);
      };
      next();
    }
  },

  fracraft: {
    title: ['Fraction River', '分数过河'],
    rule: ['Hop row by row! Only land on lily pads equal to the target fraction (equivalents OK). Reach the far bank for a bonus!',
      '一行一行跳！只能跳到等于目标分数的荷叶上（等价分数也行）。跳到对岸有奖励！'],
    setup(g) {
      const ROO = '<svg class="proo" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>';
      const LANES = 4;
      const eq = (a, b, c, d) => a * d === b * c;
      const fs = (n, d) => `${n}/${d}`;
      let tn, td, row, crossings = 0;
      g.body.innerHTML = `<div class="prompt" id="frp"></div><div class="river" id="frv"></div>`;
      const rv = $('#frv', g.body);
      const makeGood = () => {
        const k = pick([1, 2, 3]);
        return fs(tn * k, td * k);
      };
      const makeBad = () => {
        let n, d, tries = 0;
        do { d = pick([td, td + 1, td * 2, Math.max(2, td - 1)]); n = ri(1, d); tries++; }
        while (eq(n, d, tn, td) && tries < 20);
        return fs(n, d);
      };
      const lane = k => {
        const pads = shuffle([makeGood(), makeGood(), makeBad(), makeBad(), makeBad(), makeBad()]);
        const dur = Math.max(6, 14 - crossings * 1.2 - k);
        const html = pads.map(v => `<button class="lily" data-f="${v}" data-l="${k}" style="font-size:15px">${v}</button>`).join('');
        return `<div class="rlane"><div class="strip" style="animation-duration:${dur}s;animation-direction:${k % 2 ? 'reverse' : 'normal'}">${html}${html}</div></div>`;
      };
      const newRiver = () => {
        const base = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5]]);
        tn = base[0]; td = base[1]; row = -1;
        const show = rnd(2) ? fs(tn, td) : fs(tn * 2, td * 2);
        $('#frp', g.body).innerHTML = TI(`Hop only on pads = ${show}`, `只能跳到等于 ${show} 的荷叶`);
        rv.innerHTML = `<div class="bank far">🏁</div>${Array.from({ length: LANES }, (_, i) => lane(LANES - 1 - i)).join('')}<div class="bank near" id="frnear">${ROO}</div>`;
      };
      rv.onclick = e => {
        const b = e.target.closest('.lily'); if (!b || g.over) return;
        const k = +b.dataset.l;
        if (k !== row + 1) { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); tick(); return; }
        const [n, d] = b.dataset.f.split('/').map(Number);
        if (!eq(n, d, tn, td)) { gBad(b); return; }
        rv.querySelectorAll('.proo').forEach(r => r.remove());
        b.insertAdjacentHTML('beforeend', ROO); b.classList.add('on');
        row = k; g.add(); boing();
        if (row === LANES - 1) {
          crossings++; g.add(3); fanfare(); gBurst($('.far', rv), 50);
          rv.querySelector('.far').innerHTML = '🏁' + ROO;
          setTimeout(() => { if (!g.over) newRiver(); }, 900);
        }
      };
      newRiver();
    }
  },

  parenfix: {
    title: ['Paren Fix', '括号修理工'],
    rule: ['You get a target. Tap the expression with parentheses in the right place so it equals the target!',
      '给出目标得数。点出括号位置正确、结果等于目标的那条算式！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      g.body.innerHTML = `<div class="prompt" id="pfq"></div><div class="prompt eqbig" id="pft" style="font-size:clamp(28px,7vw,40px)"></div>
        <div class="bubbles opts" id="pfop" style="grid-template-columns:1fr"></div>`;
      const deal = () => {
        const a = ri(2, 8), b = ri(2, 8), c = ri(2, 7);
        const forms = [
          { s: `(${a} + ${b}) × ${c}`, v: (a + b) * c },
          { s: `${a} + ${b} × ${c}`, v: a + b * c },
          { s: `${a} × (${b} + ${c})`, v: a * (b + c) },
          { s: `${a} × ${b} + ${c}`, v: a * b + c },
          { s: `(${a} × ${b}) + ${c}`, v: a * b + c },
          { s: `${a} × ${b} − ${c}`, v: a * b - c },
          { s: `${a} − ${b} × ${c}`, v: a - b * c }
        ].filter(f => f.v > 0 && f.v < 120);
        const win = pick(forms);
        const others = shuffle(forms.filter(f => f.v !== win.v && f.s !== win.s)).slice(0, 2);
        // if not enough distinct values, invent traps
        while (others.length < 2) {
          const trap = pick(forms);
          if (trap.s !== win.s) others.push(trap);
          else others.push({ s: `${a} + ${b} + ${c}`, v: a + b + c });
        }
        const opts = shuffle([win, ...others.slice(0, 2)]);
        $('#pfq', g.body).innerHTML = TI('Which equals the target?', '哪条等于目标？');
        $('#pft', g.body).textContent = '= ' + win.v;
        $('#pfop', g.body).innerHTML = opts.map(o =>
          `<button class="bub" data-ok="${o.s === win.s ? 1 : 0}" style="--bc:${pick(cols)};border-radius:16px;font-size:clamp(16px,4.2vw,24px);width:100%;max-width:360px">${o.s}</button>`).join('');
      };
      $('#pfop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (b.dataset.ok === '1') { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  opcombo: {
    title: ['Ops Combo', '运算三连击'],
    rule: ['Three hits in a row: ① first step ② that product/sum ③ final answer. Clear all three for a combo bonus!',
      '三连击：①先算哪一步 ②这一步得几 ③最终答案。全对有连击奖励！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#8a5cc2'];
      let stage, first, mid, final, expr;
      g.body.innerHTML = `<div class="prompt" id="ocstage"></div>
        <div class="prompt eqbig" id="oceq"></div>
        <div class="msg" id="ocbar" style="font-weight:700"></div>
        <div class="bubbles opts" id="ocop"></div>`;
      const paintBar = () => {
        const dots = ['①', '②', '③'].map((d, i) =>
          `<span style="opacity:${i < stage ? 1 : .35};color:${i < stage ? '#2f8f6b' : 'inherit'}">${d}${i < stage ? '✓' : ''}</span>`).join(' → ');
        $('#ocbar', g.body).innerHTML = dots;
      };
      const showOpts = (ans, wrongs, asStr = true) => {
        const opts = new Set([asStr ? String(ans) : ans]);
        wrongs.forEach(w => opts.add(asStr ? String(w) : w));
        while (opts.size < 3) opts.add(String(+ans + pick([-2, -1, 1, 2, 3])));
        $('#ocop', g.body).innerHTML = shuffle([...opts].slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:16px">${v}</button>`).join('');
        g.body.dataset.ans = String(ans);
      };
      const deal = () => {
        stage = 0;
        const a = ri(2, 9), b = ri(2, 9), c = ri(2, 8);
        if (rnd(2)) {
          expr = `${a} + ${b} × ${c}`;
          first = `${b} × ${c}`; mid = b * c; final = a + mid;
        } else {
          expr = `${a} × ${b} − ${c}`;
          first = `${a} × ${b}`; mid = a * b; final = mid - c;
        }
        $('#oceq', g.body).textContent = expr;
        $('#ocstage', g.body).innerHTML = TI('① Tap the first step', '① 点出第一步');
        paintBar();
        showOpts(first, [`${a} + ${b}`, `${a} × ${c}`, `${a} + ${b} × ${c}`].filter(x => x !== first));
      };
      const advance = b => {
        g.add(); pop(); gBurst(b); stage++;
        paintBar();
        if (stage === 1) {
          $('#ocstage', g.body).innerHTML = TI(`② What is ${first}?`, `② ${first} = ?`);
          showOpts(mid, [mid + 1, mid - 1, a + b, a * c]);
        } else if (stage === 2) {
          $('#ocstage', g.body).innerHTML = TI('③ Final answer?', '③ 最终得几？');
          const trap = expr.includes('+') ? (a + b) * c : a * (b - c);
          showOpts(final, [trap, mid + a, mid - a, final + 2, final - 2].filter(v => v !== final && v > 0));
        } else {
          g.add(2); fanfare(); confetti(innerWidth / 2, 160, 40);
          $('#ocstage', g.body).innerHTML = TI('Combo! +2 bonus', '三连击！奖励 +2');
          setTimeout(() => { if (!g.over) deal(); }, 700);
        }
      };
      $('#ocop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (b.dataset.n === g.body.dataset.ans) advance(b);
        else { gBad(b); /* break combo — restart round */ setTimeout(() => { if (!g.over) deal(); }, 450); }
      };
      deal();
    }
  },

  fracmem: {
    title: ['Fraction Flip', '分数翻翻乐'],
    rule: ['Flip two cards. Match equivalent fractions (like 1/2 and 2/4). Clear the board for a bonus!',
      '翻两张牌，配对等价分数（如 1/2 和 2/4）。全部翻完有奖励！'],
    setup(g) {
      let cards, open = [], busy = false;
      g.body.innerHTML = `<div class="mgrid" id="fmmg" style="grid-template-columns:repeat(4,minmax(0,1fr))"></div>`;
      const mg = $('#fmmg', g.body);
      const deal = () => {
        const pairs = [];
        const bases = shuffle([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [1, 6]]).slice(0, 6);
        bases.forEach(([n, d]) => {
          const k = pick([2, 3, 4]);
          const id = pairs.length;
          pairs.push({ id, face: `${n}/${d}` }, { id, face: `${n * k}/${d * k}` });
        });
        cards = shuffle(pairs);
        open = []; busy = false;
        mg.innerHTML = cards.map((c, i) =>
          `<button class="mcard" data-i="${i}"><span>${c.face}</span></button>`).join('');
      };
      mg.onclick = e => {
        const b = e.target.closest('.mcard'); if (!b || g.over || busy || b.classList.contains('up')) return;
        const i = +b.dataset.i;
        b.classList.add('up'); open.push(i); tick();
        if (open.length < 2) return;
        const [x, y] = open; open = [];
        if (cards[x].id === cards[y].id) {
          g.add(); pop(); gBurst(b, 18);
          mg.children[x].classList.add('ok'); mg.children[y].classList.add('ok');
          if (mg.querySelectorAll('.ok').length === cards.length) {
            g.add(3); fanfare(); busy = true;
            setTimeout(() => { busy = false; deal(); }, 700);
          }
        } else {
          busy = true;
          setTimeout(() => {
            mg.children[x].classList.remove('up'); mg.children[y].classList.remove('up');
            busy = false; boo();
          }, 550);
        }
      };
      deal();
    }
  }
};

// Replace Hop game catalog with Leap games only (this folder stays independent).
Object.keys(GAMES).forEach(k => { delete GAMES[k]; });
Object.assign(GAMES, LEAP_GAMES);
