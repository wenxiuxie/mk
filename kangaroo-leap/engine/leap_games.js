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
  },

  pizzarush: {
    title: ['Pizza Rush', '披萨订单'],
    rule: ['Each order asks for a fraction of the pizza. Tap slices to add topping, then press Serve. Three correct orders in a row give a bonus!',
      '每张订单要披萨的几分之几。点扇形加料，再按“上菜”。连续做对 3 单有奖励！'],
    setup(g) {
      let d, need, on, streak = 0;
      g.body.innerHTML = `<div class="prompt" id="pzq"></div>
        <div id="pzbox" style="display:flex;justify-content:center"></div>
        <div class="row" style="justify-content:center"><button class="btn next" id="pzgo">${TI('Serve', '上菜')}</button>
        <button class="btn ghost" id="pzclr">${TI('Clear', '清空')}</button></div>
        <div class="msg" id="pzmsg"></div>`;
      const slice = (i, R, cx, cy) => {
        const a0 = -Math.PI / 2 + (i / d) * Math.PI * 2;
        const a1 = -Math.PI / 2 + ((i + 1) / d) * Math.PI * 2;
        const large = (a1 - a0) > Math.PI ? 1 : 0;
        const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
        const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
        const fill = on.has(i) ? '#c8435a' : '#f6d7a7';
        return `<path data-i="${i}" d="M${cx},${cy} L${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} Z" fill="${fill}" stroke="#5a3d00" stroke-width="2" style="cursor:pointer"/>`;
      };
      const paint = () => {
        const cx = 130, cy = 130, R = 116;
        $('#pzbox', g.body).innerHTML = `<svg viewBox="0 0 260 260" width="240" height="240" id="pz">${
          Array.from({ length: d }, (_, i) => slice(i, R, cx, cy)).join('')
        }<circle cx="${cx}" cy="${cy}" r="26" fill="#f2b630" stroke="#5a3d00" stroke-width="2" pointer-events="none"/></svg>`;
        $('#pzmsg', g.body).innerHTML = TI(`Topped ${on.size}/${d} · streak ${streak}`, `已加料 ${on.size}/${d} · 连对 ${streak}`);
      };
      const deal = () => {
        d = pick([4, 6, 8]); need = ri(1, d - 1); on = new Set();
        $('#pzq', g.body).innerHTML = TI(`Order: top ${need}/${d} of the pizza`, `订单：请做出 ${need}/${d} 的披萨`);
        paint();
      };
      $('#pzbox', g.body).onclick = e => {
        const p = e.target.closest('path'); if (!p || g.over) return;
        const i = +p.dataset.i;
        if (on.has(i)) on.delete(i); else on.add(i);
        tick(); paint();
      };
      $('#pzclr', g.body).onclick = () => { if (g.over) return; on = new Set(); paint(); };
      $('#pzgo', g.body).onclick = () => {
        if (g.over) return;
        if (on.size === need) {
          streak++;
          const bonus = streak % 3 === 0;
          if (bonus) { g.add(2); fanfare(); } else g.add();
          pop(); confetti(innerWidth / 2, 200, bonus ? 40 : 18);
          deal();
        } else { streak = 0; boo(); const b = $('#pzgo', g.body); b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); paint(); }
      };
      deal();
    }
  },

  frachop: {
    title: ['Fraction Hop', '分数跳格子'],
    rule: ['The flag marks a fraction of the track. Hop by 1 part, 2 parts, or a half. Land exactly on the flag. Jump past it and you slide back to the start!',
      '旗帜标出跑道上的一个分数。可以跳 1 格、2 格或一半。正好跳到旗上得分；跳过头会滑回起点！'],
    setup(g) {
      let d, pos, target, steps;
      g.body.innerHTML = `<div class="prompt" id="fhq"></div><div class="lgcells" id="fhtrack"></div>
        <div class="row" id="fhops" style="justify-content:center;flex-wrap:wrap"></div>`;
      const paint = () => {
        $('#fhtrack', g.body).style.gridTemplateColumns = `repeat(${d + 1},minmax(0,1fr))`;
        $('#fhtrack', g.body).innerHTML = Array.from({ length: d + 1 }, (_, i) => {
          const flag = i === target ? ' flag' : '';
          const here = i === pos ? `<svg class="proo" viewBox="0 0 64 64"><use href="#roo"/></svg>` : '';
          const mark = i === target ? '🚩' : '';
          return `<div class="lgcell${flag}">${here}${mark}<span>${i}/${d}</span></div>`;
        }).join('');
      };
      const deal = () => {
        d = pick([4, 6, 8]); pos = 0;
        steps = [...new Set([1, 2, d / 2])].filter(s => s >= 1 && s < d);
        target = ri(Math.max(2, d / 2), d);
        $('#fhq', g.body).innerHTML = TI(`Land on ${target}/${d}`, `请跳到 ${target}/${d}`);
        $('#fhops', g.body).innerHTML = steps.map(s =>
          `<button class="btn next" data-s="${s}">+${s}/${d}</button>`).join('');
        paint();
      };
      $('#fhops', g.body).onclick = e => {
        const b = e.target.closest('[data-s]'); if (!b || g.over) return;
        const s = +b.dataset.s, nxt = pos + s;
        if (nxt === target) { pos = nxt; g.add(); pop(); boing(); paint(); setTimeout(() => { if (!g.over) deal(); }, 450); return; }
        if (nxt > target) { pos = 0; boo(); paint(); return; }
        pos = nxt; tick(); boing(); paint();
      };
      deal();
    }
  },

  bowlshare: {
    title: ['Bowl Share', '分碗达人'],
    rule: ['Move pieces into the bowl until it holds the fraction asked. Then press Check. A perfect share scores a point!',
      '把小物搬进碗里，直到碗里正好是题目要的几分之几，再按“检查”。'],
    setup(g) {
      let total, need, bowl;
      g.body.innerHTML = `<div class="prompt" id="bwq"></div>
        <div class="bowls"><div><div class="msg">${TI('Table', '桌上')}</div><div class="bowl" id="bwout"></div></div>
        <div><div class="msg">${TI('Bowl', '碗里')}</div><div class="bowl" id="bwin"></div></div></div>
        <div class="row" style="justify-content:center"><button class="btn next" id="bwok">${TI('Check', '检查')}</button></div>`;
      const paint = () => {
        const chip = (i, inn) => `<button class="pilebtn" data-i="${i}" data-in="${inn ? 1 : 0}" aria-label="piece">${item('cookie')}</button>`;
        $('#bwout', g.body).innerHTML = bowl.map((inn, i) => inn ? '' : chip(i, false)).join('');
        $('#bwin', g.body).innerHTML = bowl.map((inn, i) => inn ? chip(i, true) : '').join('');
      };
      const deal = () => {
        const d = pick([2, 3, 4, 5]), n = ri(1, d - 1), q = ri(2, 4);
        total = d * q; need = n * q; bowl = Array(total).fill(false);
        $('#bwq', g.body).innerHTML = TI(`Put ${n}/${d} of the ${total} cookies in the bowl`, `把 ${total} 块饼干的 ${n}/${d} 放进碗里`);
        paint();
      };
      g.body.onclick = e => {
        const b = e.target.closest('.pilebtn'); if (!b || g.over) return;
        const i = +b.dataset.i;
        bowl[i] = !bowl[i]; tick(); paint();
      };
      $('#bwok', g.body).onclick = () => {
        if (g.over) return;
        const got = bowl.filter(Boolean).length;
        if (got === need) { g.add(); pop(); gBurst($('#bwin', g.body), 28); deal(); }
        else { boo(); const el = $('#bwok', g.body); el.classList.remove('bad'); void el.offsetWidth; el.classList.add('bad'); }
      };
      deal();
    }
  },

  opmachine: {
    title: ['Expression Machine', '算式机器'],
    rule: ['Tap the operation buttons to cycle + − ×, and tap the parentheses button. Make the machine equal the target, then press Check!',
      '点运算按钮切换 + − ×，再点括号按钮。让算式等于目标数，然后按“检查”！'],
    setup(g) {
      const ops = ['+', '−', '×'];
      let a, b, c, i1, i2, paren, target;
      const apply = (x, o, y) => o === '+' ? x + y : o === '−' ? x - y : x * y;
      const value = () => {
        const o1 = ops[i1], o2 = ops[i2];
        if (paren === 'L') return apply(apply(a, o1, b), o2, c);
        if (paren === 'R') return apply(a, o1, apply(b, o2, c));
        if (o2 === '×' && o1 !== '×') return apply(a, o1, apply(b, o2, c));
        if (o1 === '×' && o2 !== '×') return apply(apply(a, o1, b), o2, c);
        return apply(apply(a, o1, b), o2, c);
      };
      const text = () => {
        const o1 = ops[i1], o2 = ops[i2];
        if (paren === 'L') return `(${a} ${o1} ${b}) ${o2} ${c}`;
        if (paren === 'R') return `${a} ${o1} (${b} ${o2} ${c})`;
        return `${a} ${o1} ${b} ${o2} ${c}`;
      };
      const parenLabel = () => paren === 'L' ? TI('( first two )', '括号在前两个') : paren === 'R' ? TI('( last two )', '括号在后两个') : TI('No parentheses', '没有括号');
      g.body.innerHTML = `<div class="prompt">${TI('Make this value', '凑出这个得数')}</div>
        <div class="prompt eqbig" id="omt"></div>
        <div class="prompt eqbig" id="omx" style="font-size:clamp(22px,5.5vw,34px)"></div>
        <div class="row" style="justify-content:center;flex-wrap:wrap">
          <button class="btn ghost" id="om1"></button>
          <button class="btn ghost" id="om2"></button>
          <button class="btn ghost" id="omp"></button>
          <button class="btn next" id="omok">${TI('Check', '检查')}</button>
        </div>
        <div class="msg" id="omnow"></div>`;
      const paint = () => {
        $('#om1', g.body).textContent = ops[i1];
        $('#om2', g.body).textContent = ops[i2];
        $('#omp', g.body).innerHTML = parenLabel();
        $('#omx', g.body).textContent = text();
        $('#omnow', g.body).innerHTML = TI(`Now = ${value()}`, `现在 = ${value()}`);
      };
      const deal = () => {
        const forms = [];
        a = ri(2, 9); b = ri(2, 9); c = ri(2, 6);
        [['+', '×', 'none'], ['×', '−', 'none'], ['+', '×', 'L'], ['×', '+', 'R'], ['−', '×', 'none'], ['+', '+', 'L']].forEach(([o1, o2, p]) => {
          i1 = ops.indexOf(o1); i2 = ops.indexOf(o2); paren = p;
          const v = value();
          if (v > 0 && v < 100 && Number.isInteger(v)) forms.push({ i1, i2, paren, v });
        });
        const win = forms.length ? pick(forms) : { v: a + b * c };
        target = win.v;
        let guard = 0;
        do { i1 = rnd(3); i2 = rnd(3); paren = pick(['none', 'L', 'R']); } while (value() === target && ++guard < 12);
        $('#omt', g.body).textContent = String(target);
        paint();
      };
      $('#om1', g.body).onclick = () => { if (g.over) return; i1 = (i1 + 1) % 3; tick(); paint(); };
      $('#om2', g.body).onclick = () => { if (g.over) return; i2 = (i2 + 1) % 3; tick(); paint(); };
      $('#omp', g.body).onclick = () => { if (g.over) return; paren = paren === 'none' ? 'L' : paren === 'L' ? 'R' : 'none'; tick(); paint(); };
      $('#omok', g.body).onclick = () => {
        if (g.over) return;
        if (value() === target) { g.add(); pop(); gBurst($('#omx', g.body), 30); deal(); }
        else { boo(); const el = $('#omok', g.body); el.classList.remove('bad'); void el.offsetWidth; el.classList.add('bad'); }
      };
      deal();
    }
  },

  jarwhole: {
    title: ['Fill the Jar', '补齐罐子'],
    rule: ['Some equal parts of the jar are already full. Tap an empty part to fill it with the same number of cookies, until the whole jar is full!',
      '罐子里已经装满了几份同样多的饼干。点空着的一份，装进同样多的饼干，直到整罐都满！'],
    setup(g) {
      let d, q, filled;
      g.body.innerHTML = `<div class="prompt" id="jwq"></div>
        <div class="lgcells" id="jwrow" style="padding-top:8px"></div>
        <div class="msg" id="jwmsg"></div>`;
      const paint = () => {
        $('#jwrow', g.body).style.gridTemplateColumns = `repeat(${d},minmax(0,1fr))`;
        $('#jwrow', g.body).innerHTML = Array.from({ length: d }, (_, i) => i < filled
          ? `<div class="lgcell" style="min-height:74px;background:#f6d7a7;align-items:center;flex-direction:column">${item('cookie').repeat(q)}</div>`
          : `<button class="lgcell" style="min-height:74px;cursor:pointer;font-size:28px">+</button>`).join('');
        $('#jwmsg', g.body).innerHTML = TI(`${filled}/${d} full · ${filled * q} cookies so far`, `已满 ${filled}/${d} 份 · 现在 ${filled * q} 块`);
      };
      const deal = () => {
        d = pick([4, 5, 6, 8]);
        const start = ri(1, Math.max(1, d - 2));
        q = ri(2, 3);
        filled = start;
        $('#jwq', g.body).innerHTML = TI(`${start}/${d} of the jar is full. Each part has ${q} cookies. Fill the rest!`,
          `罐子的 ${start}/${d} 已经装满，每份 ${q} 块。把空着的份补齐！`);
        paint();
      };
      $('#jwrow', g.body).onclick = e => {
        if (!e.target.closest('button') || g.over || filled >= d) return;
        filled++; tick(); paint();
        if (filled === d) {
          g.add(); pop();
          $('#jwmsg', g.body).innerHTML = TI(`The whole jar is ${d * q} cookies!`, `整罐是 ${d * q} 块！`);
          setTimeout(() => { if (!g.over) deal(); }, 550);
        }
      };
      deal();
    }
  },

  twostep: {
    title: ['Two-Step Trail', '两步小径'],
    rule: ['A short story needs two steps. Answer step 1, then step 2. Both correct gives a bonus!',
      '一小段故事要分两步算。先答第 1 步，再答第 2 步。两步都对有奖励！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      let stage, a1, a2, mode;
      g.body.innerHTML = `<div class="prompt" id="tsstory" style="font-size:clamp(16px,4vw,22px)"></div>
        <div class="msg" id="tsbar" style="font-weight:700"></div>
        <div class="prompt" id="tsq"></div>
        <div class="bubbles opts" id="tsop"></div>`;
      const opts = (ans, wrongs) => {
        const set = new Set([ans]);
        wrongs.forEach(w => { if (Number.isInteger(w) && w > 0 && w !== ans) set.add(w); });
        let k = 1;
        while (set.size < 3) { set.add(ans + k); k++; }
        $('#tsop', g.body).innerHTML = shuffle([...set].slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)}">${v}</button>`).join('');
      };
      const ask = () => {
        $('#tsbar', g.body).innerHTML = stage === 0 ? '① → ②' : '①✓ → ②';
        if (mode === 'cookie') {
          $('#tsq', g.body).innerHTML = stage === 0
            ? TI('Step 1: how many were eaten first?', '第 1 步：先吃了几块？')
            : TI('Step 2: how many are left?', '第 2 步：还剩几块？');
        } else {
          $('#tsq', g.body).innerHTML = stage === 0
            ? TI('Step 1: how long is one equal part?', '第 1 步：每一份是几米？')
            : TI('Step 2: how long is the whole path?', '第 2 步：整条小路有几米？');
        }
        opts(stage === 0 ? a1 : a2, [a1, a2, a2 - a1, a1 * 2, a1 + a2]);
      };
      const deal = () => {
        stage = 0;
        if (rnd(2) === 0) {
          mode = 'cookie';
          const k = pick([2, 3, 4, 5]), q = ri(3, 6), extra = ri(1, q - 1), N = k * q;
          a1 = q; a2 = N - q - extra;
          $('#tsstory', g.body).innerHTML = TI(`${N} cookies. Eat 1/${k} first, then eat ${extra} more.`,
            `${N} 块饼干。先吃掉 1/${k}，再吃 ${extra} 块。`);
        } else {
          mode = 'path';
          const d = pick([4, 5, 6]), share = ri(2, 6), parts = ri(1, d - 1);
          a1 = share; a2 = share * d;
          $('#tsstory', g.body).innerHTML = TI(`${parts}/${d} of the path is ${share * parts} m.`,
            `小路的 ${parts}/${d} 是 ${share * parts} 米。`);
        }
        ask();
      };
      $('#tsop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n !== (stage === 0 ? a1 : a2)) { gBad(b); setTimeout(() => { if (!g.over) deal(); }, 400); return; }
        g.add(); pop(); gBurst(b);
        if (stage === 0) { stage = 1; ask(); }
        else { g.add(2); fanfare(); setTimeout(() => { if (!g.over) deal(); }, 600); }
      };
      deal();
    }
  },

  blankdial: {
    title: ['Missing-Number Dial', '缺数转盘'],
    rule: ['A box is hiding a number. Nudge it with −5, −1, +1 and +5 until the equation is true, then press Check.',
      '方框里藏着一个数。用 −5、−1、+1、+5 把它调到正好，再按“检查”。'],
    setup(g) {
      let guess, ans, render;
      g.body.innerHTML = `<div class="prompt" id="bdeq" style="font-size:clamp(20px,5vw,30px)"></div>
        <div class="prompt eqbig" id="bdg"></div>
        <div class="msg" id="bdnow"></div>
        <div class="row" id="bddial" style="justify-content:center;flex-wrap:wrap">
          <button class="btn ghost" data-d="-5">−5</button>
          <button class="btn ghost" data-d="-1">−1</button>
          <button class="btn ghost" data-d="1">+1</button>
          <button class="btn ghost" data-d="5">+5</button>
          <button class="btn next" id="bdok">${TI('Check', '检查')}</button>
        </div>`;
      const paint = () => {
        $('#bdeq', g.body).textContent = render('□');
        $('#bdg', g.body).textContent = guess;
        $('#bdnow', g.body).innerHTML = TI(`Trying ${render(guess)}`, `正在试 ${render(guess)}`);
      };
      const deal = () => {
        const t = rnd(3);
        if (t === 0) {
          const b = ri(2, 9), c = ri(2, 6), q = ri(2, 12);
          ans = q;
          render = n => `${n} + ${b} × ${c} = ${q + b * c}`;
        } else if (t === 1) {
          const a = ri(2, 9), q = ri(2, 9);
          ans = q;
          render = n => `${a} × ${n} = ${a * q}`;
        } else {
          const b = ri(2, 8), c = ri(2, 5), q = ri(2, 9);
          ans = q;
          render = n => `(${n} + ${b}) × ${c} = ${(q + b) * c}`;
        }
        do { guess = ri(0, 12); } while (guess === ans);
        paint();
      };
      $('#bddial', g.body).onclick = e => {
        const b = e.target.closest('[data-d]'); if (!b || g.over) return;
        guess = Math.max(0, Math.min(40, guess + (+b.dataset.d)));
        tick(); paint();
      };
      $('#bdok', g.body).onclick = () => {
        if (g.over) return;
        if (guess === ans) { g.add(); pop(); gBurst($('#bdg', g.body), 28); deal(); }
        else { boo(); const el = $('#bdok', g.body); el.classList.remove('bad'); void el.offsetWidth; el.classList.add('bad'); }
      };
      deal();
    }
  },

  fracchain: {
    title: ['Fraction Chain', '同分母接龙'],
    rule: ['Add or subtract fractions with the same denominator. Tap the fraction you land on.',
      '同分母分数相加或相减。点出算完以后的分数。'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      let ans;
      g.body.innerHTML = `<div class="prompt eqbig" id="fceq"></div><div class="bubbles opts" id="fcop"></div>`;
      const deal = () => {
        const d = pick([6, 7, 8, 9, 10]);
        const n = ri(2, d - 2);
        let step, next;
        if (rnd(2) === 0 && n > 2) { step = ri(1, Math.min(2, n - 1)); next = n - step; $('#fceq', g.body).textContent = `${n}/${d} − ${step}/${d} = ?`; }
        else { step = ri(1, Math.min(2, d - 1 - n)); next = n + step; $('#fceq', g.body).textContent = `${n}/${d} + ${step}/${d} = ?`; }
        ans = `${next}/${d}`;
        const wrong = [`${n}/${d}`, `${step}/${d}`, `${next}/${d + d}`, `${next + 1}/${d}`, `${Math.max(1, next - 1)}/${d}`]
          .filter(v => v !== ans);
        const opts = shuffle([ans, ...wrong.filter((v, i, a) => a.indexOf(v) === i).slice(0, 2)]);
        $('#fcop', g.body).innerHTML = opts.map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:18px;font-size:clamp(18px,5vw,26px)">${v}</button>`).join('');
      };
      $('#fcop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  extraout: {
    title: ['Extra Number', '多余的数'],
    rule: ['A story hides one number you do not need. Tap that extra number, then tap the answer. Both steps score a bonus!',
      '故事里有一个用不到的数。先点出这个多余的数，再点出答案。两步都对有奖励！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#8a5cc2'];
      let stage, unused, ans, bags, each;
      g.body.innerHTML = `<div class="prompt" id="exstory" style="font-size:clamp(16px,4vw,22px)"></div>
        <div class="msg" id="exbar" style="font-weight:700"></div>
        <div class="prompt" id="exq"></div>
        <div class="bubbles opts" id="exop"></div>`;
      const buttons = values => {
        const set = [];
        values.forEach(v => { if (!set.includes(String(v))) set.push(String(v)); });
        let k = 1;
        while (set.length < 3) { const v = String(+ans + k); if (!set.includes(v)) set.push(v); k++; }
        $('#exop', g.body).innerHTML = shuffle(set.slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:18px;font-size:clamp(18px,5vw,28px)">${v}</button>`).join('');
      };
      const ask = () => {
        $('#exbar', g.body).innerHTML = stage === 0 ? '① → ②' : '①✓ → ②';
        $('#exq', g.body).innerHTML = stage === 0
          ? TI('Which number is NOT needed?', '哪个数用不到？')
          : TI('Now what is the answer?', '那么答案是多少？');
        buttons(stage === 0 ? [bags, each, unused] : [ans, unused, ans + each]);
      };
      const deal = () => {
        stage = 0;
        bags = ri(3, 8); each = ri(3, 9);
        while (each === bags) each = ri(3, 9);
        let km = ri(2, 12);
        const total = bags * each;
        while (km === bags || km === each || km === total) km = ri(2, 15);
        unused = km; ans = total;
        $('#exstory', g.body).innerHTML = TI(`${bags} bags with ${each} stickers in each. The shop is ${km} km away. How many stickers?`,
          `${bags} 袋贴纸，每袋 ${each} 张。商店在 ${km} 千米外。一共有多少张贴纸？`);
        ask();
      };
      $('#exop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        const want = stage === 0 ? String(unused) : String(ans);
        if (b.dataset.n !== want) { gBad(b); setTimeout(() => { if (!g.over) deal(); }, 400); return; }
        g.add(); pop(); gBurst(b);
        if (stage === 0) { stage = 1; ask(); }
        else { g.add(2); fanfare(); setTimeout(() => { if (!g.over) deal(); }, 600); }
      };
      deal();
    }
  },

  rounddash: {
    title: ['Round Dash', '四舍五入冲刺'],
    rule: ['Round the number to the nearest 10, 100, or 1000. Tap the rounded answer!',
      '把数四舍五入到最近的 10、100 或 1000。点出答案！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      let ans;
      g.body.innerHTML = `<div class="prompt" id="rdq"></div><div class="prompt eqbig" id="rdn"></div>
        <div class="bubbles opts" id="rdop"></div>`;
      const deal = () => {
        const place = pick([10, 100, 1000]);
        let n;
        if (place === 10) n = ri(25, 980);
        else if (place === 100) n = ri(150, 9800);
        else n = ri(1500, 9800);
        ans = Math.round(n / place) * place;
        const wrong = [ans + place, Math.max(0, ans - place), n, Math.floor(n / place) * place, Math.ceil(n / place) * place]
          .filter(v => v !== ans && v >= 0);
        const opts = shuffle([ans, ...wrong.filter((v, i, a) => a.indexOf(v) === i).slice(0, 2)]);
        const zhPlace = place === 10 ? '十' : place === 100 ? '百' : '千';
        $('#rdq', g.body).innerHTML = TI(`Round to the nearest ${place}`, `四舍五入到最近的${zhPlace}位`);
        $('#rdn', g.body).textContent = String(n);
        $('#rdop', g.body).innerHTML = opts.map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};border-radius:16px;font-size:clamp(16px,4vw,24px)">${v}</button>`).join('');
      };
      $('#rdop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  tenthmatch: {
    title: ['Tenth Twin', '十分位双胞胎'],
    rule: ['Tap the decimal and the fraction that match, like 0.3 and 3/10. How many pairs in 60 seconds?',
      '点出相等的小数和分数，例如 0.3 和 3/10。60 秒能对上几对？'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'];
      const makePair = () => {
        if (rnd(2) === 0) {
          const n = ri(1, 9);
          return [`0.${n}`, `${n}/10`];
        }
        const n = ri(1, 99);
        const dec = n < 10 ? `0.0${n}` : `0.${String(n).padStart(2, '0')}`;
        return [dec, `${n}/100`];
      };
      const vals = [];
      for (let i = 0; i < 4; i++) vals.push(...makePair());
      shuffle(vals);
      let sel = -1;
      g.body.innerHTML = `<div class="prompt">${TI('Match decimal ↔ fraction', '把小数和分数配对')}</div>
        <div class="bubbles" id="tm" style="grid-template-columns:repeat(4,minmax(0,1fr))">${vals.map((_, i) =>
          `<button class="bub" data-i="${i}" style="--bc:${pick(cols)};border-radius:18px;font-size:clamp(14px,3.8vw,20px)"></button>`).join('')}</div>`;
      const box = $('#tm', g.body);
      const paint = i => { box.children[i].textContent = vals[i]; box.children[i].className = 'bub'; };
      vals.forEach((_, i) => paint(i));
      const toHund = s => {
        if (s.includes('/')) {
          const [a, b] = s.split('/').map(Number);
          return a * (100 / b);
        }
        return Math.round(parseFloat(s) * 100);
      };
      box.onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        const i = +b.dataset.i;
        if (sel < 0) { sel = i; b.classList.add('sel'); tick(); return; }
        const j = sel; sel = -1; box.children[j].classList.remove('sel');
        if (i === j) return;
        if (toHund(vals[i]) === toHund(vals[j]) && vals[i] !== vals[j]) {
          g.add(); pop(); gBurst(b);
          box.children[i].classList.add('pop'); box.children[j].classList.add('pop');
          setTimeout(() => {
            const [p, q] = makePair();
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

  factorpop: {
    title: ['Factor Pop', '因数泡泡'],
    rule: ['A number appears. Tap every bubble that is a factor of that number. Clear the board for a bonus!',
      '出现一个数。点出所有是它因数的泡泡。清完一轮有奖励！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'];
      let N, left;
      g.body.innerHTML = `<div class="prompt" id="fpq"></div><div class="bubbles" id="fpb"></div>`;
      const factors = n => {
        const f = [];
        for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i);
        return f;
      };
      const deal = () => {
        N = pick([12, 16, 18, 20, 24, 30, 36]);
        const good = factors(N);
        const bad = [];
        while (bad.length < 4) {
          const v = ri(2, N + 6);
          if (N % v !== 0 && !bad.includes(v) && !good.includes(v)) bad.push(v);
        }
        const vals = shuffle([...good, ...bad]).slice(0, Math.min(8, good.length + 3));
        // ensure at least 3 factors present
        while (vals.filter(v => N % v === 0).length < 3) {
          const miss = good.find(v => !vals.includes(v));
          if (!miss) break;
          vals[rnd(vals.length)] = miss;
        }
        left = vals.filter(v => N % v === 0).length;
        $('#fpq', g.body).innerHTML = TI(`Tap factors of ${N}`, `点出 ${N} 的因数`);
        $('#fpb', g.body).innerHTML = vals.map((v, i) =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)}">${v}</button>`).join('');
      };
      $('#fpb', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over || b.classList.contains('pop')) return;
        const v = +b.dataset.n;
        if (N % v === 0) {
          g.add(); pop(); gBurst(b); b.classList.add('pop'); left--;
          if (left <= 0) { g.add(2); fanfare(); setTimeout(() => { if (!g.over) deal(); }, 500); }
        } else gBad(b);
      };
      deal();
    }
  },

  fencefill: {
    title: ['Fence & Floor', '篱笆与地板'],
    rule: ['Sometimes find the perimeter, sometimes the area. Tap the right number for the rectangle or square!',
      '有时求周长，有时求面积。点出长方形或正方形的正确答案！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#8a5cc2'];
      let ans;
      g.body.innerHTML = `<div class="prompt" id="ffq"></div>
        <div id="fffig" style="display:flex;justify-content:center;min-height:90px"></div>
        <div class="bubbles opts" id="ffop"></div>`;
      const rectSvg = (w, h) => {
        const W = 160, H = Math.max(40, Math.round(160 * h / w));
        return `<svg viewBox="0 0 ${W + 40} ${H + 36}" width="${W + 40}" height="${H + 36}">
          <rect x="20" y="8" width="${W}" height="${H}" fill="#fff8e8" stroke="#1f2b3a" stroke-width="3"/>
          <text x="${20 + W / 2}" y="${H + 28}" text-anchor="middle" font-size="14">${w}</text>
          <text x="10" y="${8 + H / 2}" text-anchor="middle" font-size="14" dominant-baseline="middle">${h}</text>
        </svg>`;
      };
      const deal = () => {
        const square = rnd(3) === 0;
        const L = square ? ri(3, 9) : ri(4, 12);
        const W = square ? L : ri(2, Math.min(8, L - 1));
        const peri = 2 * (L + W), area = L * W;
        const wantArea = rnd(2) === 0;
        ans = wantArea ? area : peri;
        $('#ffq', g.body).innerHTML = wantArea
          ? TI(square ? `Area of the ${L}×${L} square?` : `Area of the ${L}×${W} rectangle?`,
            square ? `边长 ${L} 的正方形，面积是多少？` : `长 ${L}、宽 ${W} 的长方形，面积是多少？`)
          : TI(square ? `Perimeter of the ${L}×${L} square?` : `Perimeter of the ${L}×${W} rectangle?`,
            square ? `边长 ${L} 的正方形，周长是多少？` : `长 ${L}、宽 ${W} 的长方形，周长是多少？`);
        $('#fffig', g.body).innerHTML = rectSvg(L, W);
        const opts = new Set([ans, peri, area, L + W, L * 2 + W]);
        while (opts.size < 3) opts.add(ans + pick([-2, -1, 1, 2, 3]));
        $('#ffop', g.body).innerHTML = shuffle([...opts].filter(v => v > 0).slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)}">${v}</button>`).join('');
      };
      $('#ffop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  changechase: {
    title: ['Change Chase', '找零追击'],
    rule: ['You pay with a bill. Tap the correct change. Prices and bills keep changing!',
      '用一张纸币付钱。点出应找回多少。价格和纸币会不断变化！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      const bills = [10, 20, 50, 100];
      let ans;
      g.body.innerHTML = `<div class="prompt" id="ccq"></div><div class="bubbles opts" id="ccop"></div>`;
      const deal = () => {
        const bill = pick(bills);
        let price = ri(1, bill - 1);
        // keep change interesting
        while (price === bill) price = ri(1, bill - 1);
        ans = bill - price;
        $('#ccq', g.body).innerHTML = TI(`Price ${price}. Pay with ${bill}. Change?`,
          `价钱 ${price} 元，付 ${bill} 元。应找回多少元？`);
        const opts = new Set([ans, price, bill, ans + 1, Math.max(1, ans - 1), bill + price]);
        $('#ccop', g.body).innerHTML = shuffle([...opts].filter(v => v >= 0).slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)}">${v}</button>`).join('');
      };
      $('#ccop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  },

  patternpick: {
    title: ['Pattern Pick', '找规律'],
    rule: ['Look at the sequence. Tap what comes next!',
      '看这一串数的规律。点出下一个！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#8a5cc2'];
      let ans;
      g.body.innerHTML = `<div class="prompt eqbig" id="ppseq" style="font-size:clamp(18px,4.5vw,28px)"></div>
        <div class="bubbles opts" id="ppop"></div>`;
      const deal = () => {
        const t = rnd(4);
        let seq;
        if (t === 0) {
          const a = ri(2, 8), d = ri(2, 6);
          seq = [a, a + d, a + 2 * d, a + 3 * d]; ans = a + 4 * d;
        } else if (t === 1) {
          const a = ri(2, 5); seq = [a, a * 2, a * 4, a * 8]; ans = a * 16;
        } else if (t === 2) {
          const a = ri(20, 40), d = ri(2, 5);
          seq = [a, a - d, a - 2 * d, a - 3 * d]; ans = a - 4 * d;
        } else {
          const a = ri(1, 4); seq = [a, a + 1, a + 3, a + 6]; ans = a + 10; // +1,+2,+3,+4
        }
        $('#ppseq', g.body).textContent = seq.join(', ') + ', ?';
        const opts = new Set([ans, ans + 1, ans - 1, seq[seq.length - 1] + (seq[1] - seq[0]), seq[seq.length - 1] * 2]);
        $('#ppop', g.body).innerHTML = shuffle([...opts].filter(v => Number.isInteger(v) && v > 0).slice(0, 3)).map(v =>
          `<button class="bub" data-n="${v}" style="--bc:${pick(cols)}">${v}</button>`).join('');
      };
      $('#ppop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n === ans) { g.add(); pop(); gBurst(b); deal(); }
        else gBad(b);
      };
      deal();
    }
  }
};

// Replace Hop game catalog with Leap games only (this folder stays independent).
Object.keys(GAMES).forEach(k => { delete GAMES[k]; });
Object.assign(GAMES, LEAP_GAMES);
