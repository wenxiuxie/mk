// Kangaroo Hop engine: reusable hands-on tools (number line, arrays, sharing, patterns) and the mk() question builder.
const COLORS = { cookie: '#c98b4a', sticker: '#3a76b8', berry: '#d6413f', marble: '#2f8f6b', pencil: '#f2b630', balloon: '#c8435a', apple: '#d6413f', candy: '#c8435a', star: '#f2b630', egg: '#e9d6b4', seat: '#3a76b8', taken: '#8b98a8', flower: '#c8435a', tile: '#e3ebf1', blue: '#3a76b8', cupcake: '#c8435a' };
const item = (k, cls = '') => `<i class="it ${cls}" style="--c:${COLORS[k] || '#c8742c'}"></i>`;
const SHAPES = {
  R: '<circle cx="20" cy="20" r="15" fill="#d6413f"/>',
  B: '<rect x="6" y="6" width="28" height="28" rx="3" fill="#3a76b8"/>',
  G: '<path d="M20 4 L36 34 H4 Z" fill="#2f8f6b"/>',
  Y: '<path d="M20 3 L24.7 14.5 L37 15.3 L27.6 23.2 L30.6 35.3 L20 28.7 L9.4 35.3 L12.4 23.2 L3 15.3 L15.3 14.5 Z" fill="#f2b630"/>',
  P: '<path d="M20 3 L36 20 L20 37 L4 20 Z" fill="#8a5cc2"/>'
};
const SHAPE_NAME = { R: 'circle', B: 'square', G: 'triangle', Y: 'star', P: 'diamond' };
const shp = (c, s = 34) => `<svg class="shp" width="${s}" height="${s}" viewBox="0 0 40 40" role="img" aria-label="${SHAPE_NAME[c]}">${SHAPES[c]}</svg>`;
const sum = a => a.reduce((s, v) => s + v, 0);

const TOOLS = {
  // number line; each lane is one hopper with its own start and step
  hop(el, cfg) {
    const lanes = cfg.lanes.map(l => ({ ...l, pos: [l.start] }));
    const max = cfg.max, W = 640, x = n => 24 + n * (W - 48) / max;
    const every = max <= 20 ? 1 : max <= 40 ? 2 : max <= 60 ? 5 : 10;
    el.innerHTML = `<div id="lanes" style="overflow-x:auto"></div>
      <div class="row" style="justify-content:center"><button class="btn next" id="hp">${TI('Hop!', '跳！')}</button><button class="btn ghost" id="hr">${TI('Start over', '重来')}</button></div>
      <div class="msg" id="hm"></div>`;
    const draw = () => {
      $('#lanes', el).innerHTML = lanes.map(l => {
        const cur = l.pos[l.pos.length - 1], land = new Set(l.pos), col = l.color || '#c8742c';
        let s = `<svg viewBox="0 0 ${W} 86" style="width:100%;min-width:420px;display:block">`;
        if (l.name) s += `<text x="4" y="14" font-size="13" font-weight="700" fill="${col}">${l.name}</text>`;
        s += `<line x1="${x(0)}" y1="62" x2="${x(max)}" y2="62" stroke="#5d6b7c" stroke-width="2"/>`;
        for (let n = 0; n <= max; n++) {
          const lab = n % every === 0 || land.has(n);
          if (max <= 60 || n % 5 === 0 || land.has(n)) s += `<line x1="${x(n)}" y1="${lab ? 56 : 59}" x2="${x(n)}" y2="68" stroke="#8b98a8" stroke-width="${lab ? 2 : 1}"/>`;
          if (lab) s += `<text x="${x(n)}" y="82" text-anchor="middle" font-size="${land.has(n) ? 13 : 11}" font-weight="${land.has(n) ? 800 : 500}" fill="${land.has(n) ? col : '#5d6b7c'}">${n}</text>`;
        }
        for (let k = 1; k < l.pos.length; k++) {
          const a = x(l.pos[k - 1]), b = x(l.pos[k]);
          s += `<path d="M${a} 60 Q${(a + b) / 2} 22 ${b} 60" fill="none" stroke="${col}" stroke-width="2.5" stroke-dasharray="4 3"/>`;
        }
        return s + `<svg x="${x(cur) - 15}" y="28" width="30" height="30" viewBox="0 0 64 64"><use href="#roo"/></svg></svg>`;
      }).join('');
      $('#hm', el).innerHTML = lanes.map(l => TI(`${l.name ? l.name + ': ' : ''}${l.pos.length - 1} hops, now at ${l.pos[l.pos.length - 1]}`,
        `${l.name ? l.name + '：' : ''}跳了 ${l.pos.length - 1} 下，现在在 ${l.pos[l.pos.length - 1]}`)).join('<br>');
    };
    $('#hp', el).onclick = () => {
      let moved = false;
      lanes.forEach(l => { const c = l.pos[l.pos.length - 1] + l.step; if (c >= 0 && c <= max) { l.pos.push(c); moved = true; } });
      if (moved) boing();
      draw();
    };
    $('#hr', el).onclick = () => { lanes.forEach(l => l.pos = [l.start]); draw(); };
    draw();
  },

  // rows × cols of items; + lights a whole row and shows the running skip count
  array(el, cfg) {
    const { rows, cols } = cfg, cover = new Set(cfg.cover || []), lit = [], marked = new Set();
    el.innerHTML = `<div style="overflow-x:auto"><div class="arr" id="arr" style="--cols:${cols}"></div></div><div class="msg" id="am"></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" id="ar">${TI('Start over', '重来')}</button></div>`;
    const draw = () => {
      let h = '';
      for (let r = 0; r < rows; r++) {
        const k = lit.indexOf(r);
        h += `<button class="rowbtn ${k > -1 ? 'on' : ''}" data-r="${r}" aria-label="row ${r + 1}">${k > -1 ? (k + 1) * cols : '+'}</button>`;
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c, kind = cfg.paint ? cfg.paint(r, c) : cfg.icon;
          h += cover.has(i) ? `<button class="acell cov ${k > -1 ? 'lit' : ''}" data-i="${i}" aria-label="hidden">?</button>`
            : `<button class="acell ${k > -1 ? 'lit' : ''} ${marked.has(i) ? 'mk' : ''}" data-i="${i}" aria-label="item">${item(kind)}</button>`;
        }
      }
      $('#arr', el).innerHTML = h;
      const counts = lit.map((_, k) => (k + 1) * cols);
      $('#am', el).innerHTML = (lit.length ? TI(`Counting rows: ${counts.join(', ')}`, `一行一行数：${counts.join('、')}`) : TI('Tap + to count a whole row.', '点 + 一次数一整行。'))
        + (marked.size ? '<br>' + TI(`Marked: ${marked.size}`, `已做记号 ${marked.size} 个`) : '');
      el.querySelectorAll('.rowbtn').forEach(b => b.onclick = () => {
        const r = +b.dataset.r, k = lit.indexOf(r);
        if (k > -1) lit.splice(k, 1); else lit.push(r);
        tick(); draw();
      });
      el.querySelectorAll('.acell').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; if (cover.has(i)) return;
        marked.has(i) ? marked.delete(i) : marked.add(i); tick(); draw();
      });
    };
    $('#ar', el).onclick = () => { lit.length = 0; marked.clear(); draw(); };
    draw();
  },

  // a pile shared onto plates, one at a time or one round at a time
  share(el, cfg) {
    let plates = cfg.plates, have = Array(plates).fill(0);
    const reset = () => { have = Array(plates).fill(0); };
    el.innerHTML = `${cfg.adjustable ? `<div class="row" style="justify-content:center"><span class="big">${TI('Plates', '分成几份')}</span><div class="pm"><button id="pmm" aria-label="fewer plates">−</button><span id="pn"></span><button id="pmp" aria-label="more plates">+</button></div></div>` : ''}
      <div class="pile" id="pile"></div><div class="plates" id="plates"></div><div class="msg" id="sm"></div>
      <div class="row" style="justify-content:center"><button class="btn next" id="deal">${TI('One for each', '每份发一个')}</button><button class="btn ghost" id="sr">${TI('Start over', '重来')}</button></div>`;
    const draw = () => {
      const used = sum(have), left = cfg.items - used, eq = have.every(h => h === have[0]);
      if (cfg.adjustable) $('#pn', el).textContent = plates;
      $('#pile', el).innerHTML = left ? item(cfg.icon, 'sm').repeat(left) : TI('All shared out', '分完了');
      $('#plates', el).innerHTML = have.map((h, i) => `<button class="plate" data-i="${i}" aria-label="plate ${i + 1}"><span class="pc">${item(cfg.icon, 'sm').repeat(h)}</span><b>${h}</b></button>`).join('');
      let m = '';
      if (used && !left) m = eq ? TI(`Fair! ${have[0]} each.`, `公平！每份 ${have[0]} 个。`) : TI('All shared, but not fair yet.', '分完了，但还不一样多。');
      else if (used && left < plates && eq) m = TI(`${have[0]} each, ${left} left over. Not enough for another round.`, `每份 ${have[0]} 个，剩 ${left} 个，不够每份再发一个了。`);
      $('#sm', el).innerHTML = m;
      el.querySelectorAll('.plate').forEach(b => b.onclick = () => { if (cfg.items - sum(have) > 0) { have[+b.dataset.i]++; tick(); draw(); } });
    };
    $('#deal', el).onclick = () => {
      const left = cfg.items - sum(have);
      if (left >= plates) { have = have.map(h => h + 1); tick(); draw(); }
      else if (left > 0) $('#sm', el).innerHTML = TI(`Only ${left} left. Not enough for every plate.`, `只剩 ${left} 个，不够每份一个。`);
    };
    $('#sr', el).onclick = () => { reset(); draw(); };
    if (cfg.adjustable) {
      $('#pmm', el).onclick = () => { plates = Math.max(1, plates - 1); reset(); tick(); draw(); };
      $('#pmp', el).onclick = () => { plates = Math.min(8, plates + 1); reset(); tick(); draw(); };
    }
    draw();
  },

  // shape or number sequence with empty slots; shapes can be grouped and continued
  pattern(el, cfg) {
    const isNum = !!cfg.nums, seq = cfg.nums || cfg.seq, slots = cfg.slots || 0, mine = [];
    let chunk = 0, diffs = false;
    el.innerHTML = `<div class="pseq" id="ps"></div><div class="row" style="justify-content:center" id="pc"></div>
      ${isNum ? '' : '<div class="row" style="justify-content:center" id="pal"></div>'}`;
    const draw = () => {
      const all = [...seq, ...Array.from({ length: slots }, (_, k) => mine[k])];
      $('#ps', el).innerHTML = all.map((v, i) => {
        const band = chunk ? Math.floor(i / chunk) % 2 : -1;
        const face = v === undefined ? '<span class="q">?</span>' : isNum ? `<span class="nv">${v}</span>` : shp(v, 30);
        const d = isNum && diffs && i > 0 && v !== undefined && all[i - 1] !== undefined
          ? `<span class="df">${v - all[i - 1] >= 0 ? '+' : '−'}${Math.abs(v - all[i - 1])}</span>` : '';
        return `<div class="pcell ${i >= seq.length ? 'slot' : ''} ${band === 0 ? 'b0' : band === 1 ? 'b1' : ''}">${d}${face}<small>${i + 1}</small></div>`;
      }).join('');
    };
    if (isNum) {
      $('#pc', el).innerHTML = `<button class="btn hint" id="pd">${TI('Show the jumps', '显示每次变化')}</button>`;
      $('#pd', el).onclick = () => { diffs = !diffs; tick(); draw(); };
    } else {
      $('#pc', el).innerHTML = `<span class="lab-tip">${TI('Group by', '几个一组')}</span>` + [2, 3, 4].map(n => `<button class="btn ghost" data-n="${n}">${n}</button>`).join('');
      el.querySelectorAll('#pc button').forEach(b => b.onclick = () => { chunk = chunk === +b.dataset.n ? 0 : +b.dataset.n; tick(); draw(); });
      if (slots) {
        $('#pal', el).innerHTML = `<span class="lab-tip">${TI('Fill the gaps', '接着画')}</span>` + (cfg.palette || 'RBGYP').split('').map(c => `<button class="palbtn" data-c="${c}">${shp(c, 28)}</button>`).join('')
          + `<button class="btn ghost" id="pu">${TI('Undo', '撤销')}</button>`;
        el.querySelectorAll('.palbtn').forEach(b => b.onclick = () => { if (mine.length < slots) { mine.push(b.dataset.c); tick(); draw(); } });
        $('#pu', el).onclick = () => { mine.pop(); draw(); };
      }
    }
    draw();
  },

  // ten-frames: tap empty boxes to add counters (mode 'add') or tap counters to take them away (mode 'take');
  // "Make 10" slides counters from the later frames into the first one
  tenframe(el, cfg) {
    const frames = cfg.frames || 1, mode = cfg.mode || 'add';
    const init = () => {
      const c = Array(frames * 10).fill(null);
      cfg.groups.forEach(g => { let at = (g.frame || 0) * 10; for (let k = 0; k < g.n; k++) { while (c[at]) at++; c[at] = { k: g.c }; } });
      return c;
    };
    let cells = init();
    el.innerHTML = `<div class="tfs" id="tfs"></div><div class="msg" id="tm"></div>
      <div class="row" style="justify-content:center">${cfg.make10 ? `<button class="btn next" id="t10">${TI('Make 10', '凑成 10')}</button>` : ''}<button class="btn ghost" id="tr">${TI('Start over', '重来')}</button></div>`;
    const draw = (moved = new Set()) => {
      let h = '';
      for (let f = 0; f < frames; f++) {
        h += '<div class="tf">';
        for (let i = f * 10; i < f * 10 + 10; i++) {
          const x = cells[i];
          h += `<button class="tcell" data-i="${i}" aria-label="${x ? 'counter' : 'empty'}">${x ? `<i class="ctr${x.out ? ' out' : ''}${moved.has(i) ? ' moved' : ''}" style="--c:${COLORS[x.k] || x.k}"></i>` : ''}</button>`;
        }
        h += '</div>';
      }
      $('#tfs', el).innerHTML = h;
      const live = cells.filter(x => x && !x.out).length;
      const per = Array.from({ length: frames }, (_, f) => cells.slice(f * 10, f * 10 + 10).filter(x => x && !x.out).length);
      let m;
      if (mode === 'take') { const out = cells.filter(x => x && x.out).length; m = TI(`Took away ${out}. ${live} left.`, `拿走了 ${out} 个，还剩 ${live} 个。`); }
      else if (frames === 1) m = per[0] === 10 ? TI('10! The frame is full.', '10！装满啦！') : TI(`${per[0]} in the frame. ${10 - per[0]} more make 10.`, `框里有 ${per[0]} 个，再放 ${10 - per[0]} 个就是 10。`);
      else m = TI(`${per.join(' + ')} = ${live}`, `${per.join(' + ')} = ${live}`);
      $('#tm', el).innerHTML = m;
    };
    $('#tfs', el).onclick = e => {
      const b = e.target.closest('.tcell'); if (!b) return;
      const i = +b.dataset.i, x = cells[i];
      if (mode === 'take') { if (x) { x.out = !x.out; tick(); draw(); } return; }
      if (!x) cells[i] = { k: 'pencil', mine: true };
      else if (x.mine) cells[i] = null;
      else return;
      tick(); draw();
    };
    if (cfg.make10) $('#t10', el).onclick = () => {
      const moved = new Set();
      for (let i = 0; i < 10; i++) {
        if (cells[i]) continue;
        let j = cells.length - 1;
        while (j >= 10 && !cells[j]) j--;
        if (j < 10) break;
        cells[i] = cells[j]; cells[j] = null; moved.add(i);
      }
      if (moved.size) boing();
      draw(moved);
    };
    $('#tr', el).onclick = () => { cells = init(); draw(); };
    draw();
  },

  // open number line from lo to hi: the kangaroo jumps by the key steps; repeated presses of one key join into one jump
  jumper(el, cfg) {
    const { lo, hi } = cfg, keys = cfg.keys || [-10, -1, 1, 10], W = 640, x = n => 24 + (n - lo) * (W - 48) / (hi - lo);
    let jumps = [], lastKey = 0;
    const now = () => jumps.length ? jumps[jumps.length - 1][1] : cfg.start;
    el.innerHTML = `<div style="overflow-x:auto"><svg id="jl" viewBox="0 0 ${W} 104" style="width:100%;min-width:440px;display:block"></svg></div>
      <div class="msg" id="jm"></div>
      <div class="row" style="justify-content:center">${keys.map(k => `<button class="btn ${k > 0 ? 'next' : 'hint'}" data-k="${k}">${k > 0 ? '+' : '−'}${Math.abs(k)}</button>`).join('')}
        <button class="btn ghost" id="ju">${TI('Undo', '撤销')}</button><button class="btn ghost" id="jr">${TI('Start over', '重来')}</button></div>`;
    const draw = () => {
      const seen = new Set([cfg.start, ...jumps.map(j => j[1])]), span = hi - lo;
      const every = span <= 20 ? 1 : span <= 50 ? 5 : span <= 100 ? 10 : span <= 250 ? 50 : 100;
      // long lines (hundreds) only mark the tens; the big marks move from tens to hundreds
      const big = span > 100 ? 100 : 10;
      let s = `<line x1="${x(lo)}" y1="74" x2="${x(hi)}" y2="74" stroke="#5d6b7c" stroke-width="2"/>`;
      const labels = [];
      for (let n = lo; n <= hi; n++) {
        const ten = n % big === 0, lab = n % every === 0 || seen.has(n);
        if (span > 100 && n % 10 && !seen.has(n)) continue;
        s += `<line x1="${x(n)}" y1="${ten ? 63 : lab ? 67 : 70}" x2="${x(n)}" y2="80" stroke="${ten ? '#c8742c' : '#8b98a8'}" stroke-width="${ten ? 3 : 1}"/>`;
        if (lab) labels.push([n, n === now() ? 0 : n === cfg.start ? 1 : seen.has(n) ? 2 : 3]);
      }
      // numbers that would overlap are skipped: where the kangaroo is now wins, then the start, then other landings
      const placed = [];
      labels.sort((p, q) => p[1] - q[1]).forEach(([n]) => {
        if (placed.some(m => Math.abs(x(m) - x(n)) < 30)) return;
        placed.push(n);
        s += `<text x="${x(n)}" y="97" text-anchor="middle" font-size="${seen.has(n) ? 15 : 11}" font-weight="${seen.has(n) ? 800 : 500}" fill="${seen.has(n) ? '#c8742c' : '#5d6b7c'}">${n}</text>`;
      });
      jumps.forEach(([a, b]) => {
        const xa = x(a), xb = x(b), d = b - a, top = 72 - Math.min(48, 16 + Math.abs(xb - xa) / 3);
        s += `<path d="M${xa} 72 Q${(xa + xb) / 2} ${top} ${xb} 72" fill="none" stroke="${d > 0 ? '#2f8f6b' : '#c8435a'}" stroke-width="2.5"/>
          <text x="${(xa + xb) / 2}" y="${(72 + top) / 2 - 4}" text-anchor="middle" font-size="14" font-weight="800" fill="${d > 0 ? '#2f8f6b' : '#c8435a'}">${d > 0 ? '+' : '−'}${Math.abs(d)}</text>`;
      });
      $('#jl', el).innerHTML = s + `<svg x="${x(now()) - 15}" y="${jumps.length ? 2 : 38}" width="30" height="30" viewBox="0 0 64 64"><use href="#roo"/></svg>`;
      const trail = [cfg.start, ...jumps.map(j => j[1])].join(' → ');
      $('#jm', el).innerHTML = jumps.length ? TI(`${trail}. Now at ${now()}.`, `${trail}，现在在 ${now()}。`) : TI(`Start at ${cfg.start}. Press a jump button.`, `从 ${cfg.start} 出发，按跳的按钮。`);
    };
    el.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      const k = +b.dataset.k, to = now() + k;
      if (to < lo || to > hi) { boo(); return; }
      if (k === lastKey && jumps.length) jumps[jumps.length - 1][1] = to;
      else jumps.push([now(), to]);
      lastKey = k; boing(); draw();
    });
    $('#ju', el).onclick = () => { jumps.pop(); lastKey = 0; draw(); };
    $('#jr', el).onclick = () => { jumps = []; lastKey = 0; draw(); };
    draw();
  },

  // base-ten blocks. { nums: [47, 38] } puts numbers together and can trade 10 ones for a ten
  // ({ parts: [[7, 16]] } gives tens and ones directly); { take: 62 } shows one number,
  // can break a ten into 10 ones, and a tap takes a block away
  blocks(el, cfg) {
    const take = cfg.take != null, cols = ['#c8742c', '#3a76b8'];
    const init = () => {
      const b = [];
      (cfg.parts || (take ? [cfg.take] : cfg.nums).map(n => [Math.floor(n / 10), n % 10])).forEach(([t, o], k) => {
        for (let i = 0; i < t; i++) b.push({ t: 1, c: cols[k] });
        for (let i = 0; i < o; i++) b.push({ t: 0, c: cols[k] });
      });
      return b;
    };
    let b = init(), fresh = new Set();
    el.innerHTML = `<div class="b10" id="b10"></div><div class="msg" id="bm"></div>
      <div class="row" style="justify-content:center">${take ? `<button class="btn hint" id="bbreak">${TI('Break a ten', '拆一个十')}</button>` : `<button class="btn next" id="btrade">${TI('Trade 10 ones', '10 个一换 1 个十')}</button>`}<button class="btn ghost" id="br">${TI('Start over', '重来')}</button></div>`;
    const draw = () => {
      const idx = b.map((x, i) => [x, i]);
      const cls = x => `${x.out ? ' out' : ''}${fresh.has(x) ? ' moved' : ''}`;
      $('#b10', el).innerHTML = `<div class="bcol"><small>${TI('Tens', '十')}</small><div class="rods">${idx.filter(p => p[0].t).map(([x, i]) =>
          `<button class="rod${cls(x)}" data-i="${i}" style="--c:${x.c}" aria-label="ten">${'<i></i>'.repeat(10)}</button>`).join('')}</div></div>
        <div class="bcol"><small>${TI('Ones', '一')}</small><div class="cubes">${idx.filter(p => !p[0].t).map(([x, i]) =>
          `<button class="cube${cls(x)}" data-i="${i}" style="--c:${x.c}" aria-label="one"></button>`).join('')}</div></div>`;
      const live = b.filter(x => !x.out), tens = live.filter(x => x.t).length, ones = live.length - tens;
      const out = b.filter(x => x.out).reduce((s, x) => s + (x.t ? 10 : 1), 0);
      $('#bm', el).innerHTML = TI(`${tens} tens and ${ones} ones = ${tens * 10 + ones}`, `${tens} 个十和 ${ones} 个一 = ${tens * 10 + ones}`)
        + (take && out ? '<br>' + TI(`Took away ${out}.`, `拿走了 ${out}。`) : '')
        + (!take && ones >= 10 ? '<br>' + TI('10 or more ones? Trade them for a ten!', '一满 10 个了，换成 1 个十！') : '');
      fresh = new Set();
    };
    $('#b10', el).onclick = e => {
      if (!take) return;
      const x = e.target.closest('[data-i]'); if (!x) return;
      b[+x.dataset.i].out = !b[+x.dataset.i].out; tick(); draw();
    };
    if (take) $('#bbreak', el).onclick = () => {
      const k = b.findIndex(x => x.t && !x.out); if (k < 0) return boo();
      const c = b[k].c; b.splice(k, 1);
      for (let i = 0; i < 10; i++) { const n = { t: 0, c }; fresh.add(n); b.push(n); }
      boing(); draw();
    };
    else $('#btrade', el).onclick = () => {
      const ones = b.filter(x => !x.t); if (ones.length < 10) return boo();
      const gone = new Set(ones.slice(0, 10)), n = { t: 1, c: '#f2b630' };
      b = b.filter(x => !gone.has(x)); b.push(n); fresh.add(n);
      boing(); draw();
    };
    $('#br', el).onclick = () => { b = init(); draw(); };
    draw();
  },

  // logic table: rows × cols of boxes; a tap marks ✗ (no), a second tap ✓ (yes), a third clears it
  grid(el, cfg) {
    const marks = {};
    el.innerHTML = `<div style="overflow-x:auto"><table class="lgrid" id="lg"></table></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" id="gr">${TI('Start over', '重来')}</button></div>`;
    const draw = () => {
      $('#lg', el).innerHTML = `<tr><th></th>${cfg.cols.map(c => `<th>${c}</th>`).join('')}</tr>` + cfg.rows.map((r, i) =>
        `<tr><th>${r}</th>${cfg.cols.map((_, j) => { const m = marks[i + '-' + j] || ''; return `<td><button data-c="${i}-${j}" class="${m}" aria-label="${m || 'empty'}">${m === 'no' ? '✗' : m === 'yes' ? '✓' : ''}</button></td>`; }).join('')}</tr>`).join('');
    };
    $('#lg', el).onclick = e => {
      const b = e.target.closest('[data-c]'); if (!b) return;
      const k = b.dataset.c;
      marks[k] = !marks[k] ? 'no' : marks[k] === 'no' ? 'yes' : '';
      tick(); draw();
    };
    $('#gr', el).onclick = () => { Object.keys(marks).forEach(k => delete marks[k]); draw(); };
    draw();
  },

  // put people in order: tap one name, then another, and they swap places
  order(el, cfg) {
    let items = [...cfg.items], sel = -1;
    const place = cfg.places || [['1st', '第 1'], ['2nd', '第 2'], ['3rd', '第 3'], ['4th', '第 4'], ['5th', '第 5']];
    el.innerHTML = `${cfg.ends ? `<div class="ordends"><span>${TI(...cfg.ends[0])}</span><span>${TI(...cfg.ends[1])}</span></div>` : ''}<div class="ordrow" id="or"></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" id="ors">${TI('Start over', '重来')}</button></div>`;
    const draw = () => {
      $('#or', el).innerHTML = items.map((n, i) => `<button class="ordchip${i === sel ? ' sel' : ''}" data-i="${i}"><b>${n}</b><small>${TI(...place[i])}</small></button>`).join('');
    };
    $('#or', el).onclick = e => {
      const b = e.target.closest('[data-i]'); if (!b) return;
      const i = +b.dataset.i;
      if (sel === -1) sel = i;
      else { [items[sel], items[i]] = [items[i], items[sel]]; sel = -1; boing(); }
      tick(); draw();
    };
    $('#ors', el).onclick = () => { items = [...cfg.items]; sel = -1; draw(); };
    draw();
  }
};

// column (vertical) sum for a question picture. Any non-digit in a number is drawn as a box with that letter in it.
const colDigits = n => String(n).split('').map(d => /\d/.test(d) ? `<span class="d">${d}</span>` : `<span class="d box">${d}</span>`).join('');
const colHTML = (a, b, op, res) => `<div class="colsum"><div><span class="op"></span>${colDigits(a)}</div><div><span class="op">${op}</span>${colDigits(b)}</div><div class="bar"></div><div><span class="op"></span>${colDigits(res)}</div></div>`;

// ---------- mini-lesson drawing helpers ----------
// a big equation line that pops in after d seconds
const lessonEq = (html, d) => `<div class="bigeq appear" style="animation-delay:${d}s">${html}</div>`;
// number line from lo to hi with jumps [[from, to, delay]] drawn one after another; the kangaroo ends on the last landing
function lessonLine(lo, hi, jumps, every = 1) {
  const W = 600, x = n => 20 + (n - lo) * (W - 40) / (hi - lo), big = new Set(jumps.flatMap(j => [j[0], j[1]]));
  let s = `<line x1="${x(lo)}" y1="80" x2="${x(hi)}" y2="80" stroke="#5d6b7c" stroke-width="2"/>`;
  for (let n = lo; n <= hi; n++) {
    const lab = n % every === 0 || big.has(n);
    if (!lab && hi - lo > 40) continue;
    s += `<line x1="${x(n)}" y1="${n % 10 ? 74 : 68}" x2="${x(n)}" y2="86" stroke="${n % 10 ? '#8b98a8' : '#c8742c'}" stroke-width="${n % 10 ? 1 : 3}"/>`;
    if (lab) s += `<text x="${x(n)}" y="104" text-anchor="middle" font-size="${big.has(n) ? 18 : 12}" font-weight="${big.has(n) ? 800 : 500}" fill="${big.has(n) ? '#c8742c' : '#5d6b7c'}">${n}</text>`;
  }
  jumps.forEach(([a, b, d]) => {
    const col = b > a ? '#2f8f6b' : '#c8435a', mid = (x(a) + x(b)) / 2, top = Math.max(14, 70 - Math.abs(x(b) - x(a)) / 2.2);
    s += `<path class="drawpath" pathLength="1" style="animation-delay:${d}s" d="M${x(a)} 78 Q${mid} ${top} ${x(b)} 78" fill="none" stroke="${col}" stroke-width="3"/>
      <text class="fadein" style="animation-delay:${d + .5}s" x="${mid}" y="${(78 + top) / 2 - 4}" text-anchor="middle" font-size="20" font-weight="800" fill="${col}">${b > a ? '+' : '−'}${Math.abs(b - a)}</text>`;
  });
  const first = jumps[0][0], last = jumps[jumps.length - 1], end = last[2] + 1;
  const roo = (n, cls) => `<svg class="${cls}" style="animation-delay:${end}s" x="${x(n) - 20}" y="34" width="40" height="40" viewBox="0 0 64 64"><use href="#roo"/></svg>`;
  return `<svg viewBox="0 0 ${W} 112" style="width:100%;max-width:600px;display:block">${s}${roo(first, 'fadeout')}${roo(last[1], 'fadein')}</svg>`;
}

const LABS = {
  hop: T('Press Hop to make the kangaroo jump.', '按“跳！”让袋鼠跳起来。'),
  array: T('Tap + to count a whole row. Tap an item to mark it.', '点 + 一次数一整行，点东西可以做记号。'),
  share: T('Tap a plate to give it one, or deal one to every plate.', '点盘子放一个，或者按“每份发一个”。'),
  pattern: T('Color the repeating groups, or continue the pattern yourself.', '给重复的部分涂色，或者自己接着画下去。'),
  tenframe: T('Tap the empty boxes to add counters. Count how many you need.', '点空格子放圆片，数一数要几个。'),
  jumper: T('Press the jump buttons to move the kangaroo. Jump to a ten first!', '按按钮让袋鼠跳，先跳到整十！'),
  blocks: T('Each stick is a ten, each cube is a one. 10 ones can trade for a ten.', '一根是一个十，一块是一个一。10 个一可以换成 1 个十。'),
  grid: T('Tap a box once for ✗ (no), twice for ✓ (yes). Each row and each column has exactly one ✓.', '点一下格子打 ✗（不是），点两下打 ✓（是）。每行每列只有一个 ✓。'),
  order: T('Tap two names to swap them. Move everyone until every clue is true.', '点两个名字可以交换位置。一直调整，直到每条线索都对。')
};
const mk = (pts, en, zh, choices, answer, hints, explain, tool, cfg, extra = {}) =>
  ({ pts, stem: T(en, zh), choices, answer, hints: hints.map(h => T(...h)), explain: T(...explain), lab: LABS[tool], mount: el => TOOLS[tool](el, cfg), ...extra });

// Training-camp questions, written as one object:
//   choice question:   { pts, q: [en, zh], choices: [...], answer: index, hints, explain, tool?, cfg?, lab?: [en, zh] }
//   type-in question:  { pts, q: [en, zh], input: true, answer: number, hints, explain, ... }
// tool is optional; fig is a picture under the question (e.g. colHTML); shape: true draws choices as shapes (R B G Y P);
// boss: true marks the last, hardest question; data is kept on the question for the answer-checking tests.
const cq = o => ({
  pts: o.pts, stem: T(...o.q), fig: o.fig, choices: o.choices, answer: o.answer, input: !!o.input, boss: o.boss, unit: o.unit, shape: o.shape,
  hints: o.hints.map(h => T(...h)), explain: T(...o.explain),
  lab: o.tool && (o.lab ? T(...o.lab) : LABS[o.tool]), mount: o.tool && (el => TOOLS[o.tool](el, o.cfg)), cfg: o.cfg, data: o.data
});
// five number choices: the answer plus distinct wrong ones (near misses filled in if needed), smallest first like the contest
function numChoices(ans, wrongs) {
  const set = [ans];
  wrongs.forEach(w => { if (w >= 0 && !set.includes(w) && set.length < 5) set.push(w); });
  for (let d = 1; set.length < 5; d++) [ans + d, ans - d].forEach(v => { if (v >= 0 && !set.includes(v) && set.length < 5) set.push(v); });
  set.sort((a, b) => a - b);
  return { choices: set, answer: set.indexOf(ans) };
}
// five single-digit choices (0–9): the answer, the given wrong digits, then other digits
function digitChoices(ans, wrongs) {
  return numChoices(ans, [...wrongs, ...shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])].filter(d => d >= 0 && d <= 9));
}
