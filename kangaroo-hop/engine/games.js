// Mini games: 60 seconds each. Shown between questions on an island, or played alone from the map.
const GAME_SECONDS = 60;
let stopGame = null;   // cleanup for the game that is running
// times-table levels for the × and ÷ games; a camp's `facts` picks its level, and players can switch on the start screen
const GAME_LEVELS = [[2, 5, 10], [3, 4, 6], [7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9, 10]];
// one times fact from the level: [table, other factor 2–10], in either order
const gFact = facts => { const a = pick(facts), b = ri(2, 10); return rnd(2) ? [a, b] : [b, a]; };
// wiggle a wrong answer so the child sees it
const gBad = b => { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); boo(); };
const gBurst = (b, n = 25) => { const r = b.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n); };

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
  },

  catch: {
    title: ['Times Star Catch', '乘法接星星'], sign: '×', levels: true,
    rule: ['Stars fall from the sky. Tap the star with the right answer before it lands! They fall faster as you score.', '星星从天上掉下来，在它落地前点中正确答案！得分越多，星星掉得越快。'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a'];
      let ans, round = 0;
      g.body.innerHTML = `<div class="prompt eqbig" id="ceq"></div><div class="sky" id="sky"></div>`;
      const sky = $('#sky', g.body);
      const next = () => {
        const r = ++round, [a, b] = gFact(g.facts);
        ans = a * b;
        const o = new Set([ans]);
        while (o.size < 4) { const v = pick([ans + a, ans - a, ans + b, ans - b, ans + 1, ans - 1, ans + 10, a + b]); if (v > 0) o.add(v); }
        $('#ceq', g.body).textContent = `${a} × ${b} = ?`;
        const dur = Math.max(3, 6 - g.score * .12);
        sky.innerHTML = shuffle([...o]).map((v, i) => `<button class="fstar" data-n="${v}" style="left:${1 + i * 25}%;--bc:${cols[i]};animation-duration:${dur}s;animation-delay:${rnd(9) / 10}s">${v}</button>`).join('');
        // the right star landed: no point, a new round comes
        sky.querySelector(`[data-n="${ans}"]`).addEventListener('animationend', e => { if (e.animationName === 'fall' && r === round && !g.over) { boo(); next(); } });
      };
      sky.onclick = e => {
        const b = e.target.closest('.fstar'); if (!b || g.over || b.classList.contains('pop')) return;
        if (+b.dataset.n === ans) { g.add(); pop(); gBurst(b); b.classList.add('pop'); round++; setTimeout(next, 300); }
        else gBad(b);
      };
      next();
    }
  },

  share: {
    title: ['Share the Cookies', '分饼干'], sign: '÷', levels: true,
    rule: ['Share the cookies fairly, or pack them into bags. Pop the right answer!', '把饼干平均分给小袋鼠，或者装进袋子里。戳中正确答案！'],
    setup(g) {
      const cols = ['#3a76b8', '#2f8f6b', '#c8742c', '#c8435a', '#8a5cc2'];
      let ans;
      g.body.innerHTML = `<div class="prompt" id="sp"></div><div class="shview" id="sv"></div><div class="prompt eqbig" id="seq"></div><div class="bubbles opts" id="sop"></div>`;
      const next = () => {
        // sharing: k joeys, how many does each get?   grouping: k in each bag, how many bags?
        const k = pick(g.facts), q = ri(2, 9), n = k * q, bags = rnd(2);
        ans = q;
        $('#sp', g.body).innerHTML = bags ? TI(`${n} cookies, ${k} in each bag. How many bags?`, `${n} 块饼干，每袋装 ${k} 块。能装几袋？`)
          : TI(`${n} cookies shared by ${k} joeys. How many does each get?`, `${n} 块饼干平均分给 ${k} 只小袋鼠。每只分几块？`);
        $('#sv', g.body).innerHTML = (n <= 40 ? `<div class="cpile">${item('cookie', 'sm').repeat(n)}</div>` : `<div class="bignum">${n} ${item('cookie')}</div>`)
          + `<div class="joeys">${bags ? `<span class="bag">🛍️ ?</span><small>${TI(`${k} in each bag`, `每袋 ${k} 块`)}</small>` : '<svg viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>'.repeat(k)}</div>`;
        $('#seq', g.body).textContent = `${n} ÷ ${k} = ?`;
        const o = new Set([ans]);
        while (o.size < 3) { const v = pick([ans - 2, ans - 1, ans + 1, ans + 2, k]); if (v > 0) o.add(v); }
        $('#sop', g.body).innerHTML = shuffle([...o]).map(v => `<button class="bub" data-n="${v}" style="--bc:${pick(cols)};animation-delay:${-Math.random() * 3}s">${v}</button>`).join('');
      };
      $('#sop', g.body).onclick = e => {
        const b = e.target.closest('.bub'); if (!b || g.over) return;
        if (+b.dataset.n === ans) { g.add(); pop(); gBurst(b); b.classList.add('pop'); setTimeout(next, 300); }
        else gBad(b);
      };
      next();
    }
  },

  compare: {
    title: ['Bigger Wins', '比大小'], sign: '×', levels: true,
    rule: ['Which side is bigger? Tap it. If they are the same, tap =.', '哪边大？点大的那一边。一样大就点 =。'],
    setup(g) {
      let L, R;
      g.body.innerHTML = `<div class="prompt">${TI('Tap the bigger one', '点大的那一个')}</div><div class="cmp" id="cmp"></div><div class="msg" id="cm"></div>`;
      const val = f => f[0] * f[1], sign = () => val(L) > val(R) ? '>' : val(L) < val(R) ? '<' : '=';
      const next = () => {
        L = gFact(g.facts);
        if (rnd(4) === 0) {
          // same answer, different look: the turn-around fact or another pair with the same product
          const p = val(L), same = [];
          for (let x = 2; x <= 10; x++) if (p % x === 0 && p / x >= 2 && p / x <= 10 && x !== L[0]) same.push([x, p / x]);
          R = same.length ? pick(same) : gFact(g.facts);
        } else do { R = gFact(g.facts); } while (val(R) === val(L) || Math.abs(val(R) - val(L)) > 15);
        $('#cmp', g.body).innerHTML = `<button class="cmpcard" data-a=">">${L[0]} × ${L[1]}</button><button class="cmpeq" data-a="=">=</button><button class="cmpcard" data-a="<">${R[0]} × ${R[1]}</button>`;
      };
      $('#cmp', g.body).onclick = e => {
        const b = e.target.closest('[data-a]'); if (!b || g.over) return;
        const said = `${L[0]} × ${L[1]} = ${val(L)}  ${sign()}  ${R[0]} × ${R[1]} = ${val(R)}`;
        if (b.dataset.a === sign()) { g.add(); pop(); gBurst(b, 18); $('#cm', g.body).textContent = '✓ ' + said; next(); }
        else { gBad(b); $('#cm', g.body).textContent = said; }
      };
      next();
    }
  },

  memory: {
    title: ['Flip and Match', '翻牌配对'], sign: '×', levels: true,
    rule: ['Flip two cards. Match a fact with its answer, like 6 × 4 and 24. Clear the board for a bonus!', '每次翻两张牌，把算式和它的得数配成一对，比如 6 × 4 和 24。全部配完有奖励分！'],
    setup(g) {
      let cards, open = [], busy = false;
      g.body.innerHTML = `<div class="mgrid" id="mg"></div>`;
      const mg = $('#mg', g.body);
      const deal = () => {
        const pairs = [], used = new Set();
        while (pairs.length < 6) {
          const [a, b] = gFact(g.facts), p = a * b, face = rnd(10) < 3 ? [`${p} ÷ ${a}`, b] : [`${a} × ${b}`, p];   // some division cards too
          if (used.has(face[1])) continue;
          used.add(face[1]); pairs.push(face);
        }
        cards = shuffle(pairs.flatMap((f, k) => [{ k, t: f[0] }, { k, t: String(f[1]) }]));
        mg.innerHTML = cards.map((c, i) => `<button class="mcard" data-i="${i}"><span>${c.t}</span></button>`).join('');
      };
      mg.onclick = e => {
        const b = e.target.closest('.mcard'); if (!b || g.over || busy || b.classList.contains('up')) return;
        b.classList.add('up'); tick(); open.push(+b.dataset.i);
        if (open.length < 2) return;
        const [i, j] = open; open = [];
        if (cards[i].k === cards[j].k) {
          g.add(); pop(); gBurst(b, 18);
          [i, j].forEach(x => mg.children[x].classList.add('ok'));
          if (mg.querySelectorAll('.ok').length === cards.length) { g.add(3); fanfare(); busy = true; setTimeout(() => { busy = false; deal(); }, 700); }
        } else {
          busy = true; boo();
          setTimeout(() => { [i, j].forEach(x => mg.children[x].classList.remove('up')); busy = false; }, 800);
        }
      };
      deal();
    }
  },

  coins: {
    title: ['Coin Shop', '硬币商店'],
    rule: ['Pay the exact price with quarters, dimes, nickels and pennies. Use the fewest coins for a bonus!', '用 quarter、dime、nickel、penny 正好付清价钱。用的硬币最少还有奖励分！'],
    setup(g) {
      const COIN = [[25, 'quarter', 'q'], [10, 'dime', 'd'], [5, 'nickel', 'n'], [1, 'penny', 'p']];
      const toys = ['🧸', '🎈', '🪀', '🍭', '🚀', '🦖', '🎨', '⚽', '🍦', '📚'];
      let price, paid = [];
      g.body.innerHTML = `<div class="shop"><span class="toy" id="ct"></span><span class="ptag" id="cp"></span></div>
        <div class="tray" id="tr"></div><div class="prompt" id="cpaid"></div>
        <div class="row" style="justify-content:center" id="cb">${COIN.map(([v, n, c]) => `<button class="coin ${c}" data-c="${v}" aria-label="${n}"><b>${v}¢</b><small>${n}</small></button>`).join('')}</div>
        <div class="row" style="justify-content:center"><button class="btn ghost" id="cu">${TI('Take one back', '拿回一个')}</button></div>`;
      const fewest = c => COIN.reduce((s, [v]) => { s += Math.floor(c / v); c %= v; return s; }, 0);
      const draw = () => {
        $('#tr', g.body).innerHTML = paid.map(v => `<span class="coin sm ${COIN.find(x => x[0] === v)[2]}"><b>${v}</b></span>`).join('');
        $('#cpaid', g.body).innerHTML = TI(`Paid ${sum(paid)}¢ of ${price}¢`, `已付 ${sum(paid)} 分，要付 ${price} 分`);
      };
      const next = () => { price = ri(11, 99); paid = []; $('#ct', g.body).textContent = pick(toys); $('#cp', g.body).textContent = price + '¢'; draw(); };
      $('#cb', g.body).onclick = e => {
        const b = e.target.closest('.coin'); if (!b || g.over || sum(paid) === price) return;
        paid.push(+b.dataset.c); tick();
        const t = sum(paid);
        if (t === price) {
          const best = paid.length === fewest(price);
          g.add(best ? 2 : 1); pop(); gBurst($('#ct', g.body), best ? 50 : 25); draw();
          $('#cpaid', g.body).innerHTML = best ? TI('Fewest coins! +2', '硬币最少！+2') : TI('Paid! +1', '付清啦！+1');
          setTimeout(next, 800);
        } else if (t > price) { paid.pop(); gBad(b); draw(); $('#cpaid', g.body).innerHTML += '<br>' + TI('Too much! Try a smaller coin.', '多了！换个小一点的硬币。'); }
        else draw();
      };
      $('#cu', g.body).onclick = () => { if (sum(paid) !== price) { paid.pop(); draw(); } };
      next();
    }
  },
  river: {
    title: ['River Hop', '袋鼠过河'], sign: '×', levels: true,
    rule: ['Hop across the river one row at a time! Only land on lily pads from the times table shown. Reach the other bank for a bonus. The river gets faster!', '一行一行跳过河！只能跳到口诀里的荷叶上，跳到对岸有奖励分。河水会越流越快！'],
    setup(g) {
      const LANES = 4, ROO = '<svg class="proo" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>';
      let t, row, crossings = 0;
      g.body.innerHTML = `<div class="prompt" id="rp"></div><div class="river" id="rv"></div>`;
      const rv = $('#rv', g.body);
      const lane = k => {
        const good = [1, 2].map(() => t * ri(1, 10)), bad = [];
        while (bad.length < 4) { const v = t * ri(1, 10) + pick([-2, -1, 1, 2]); if (v > 0 && v % t) bad.push(v); }
        const pads = shuffle([...good, ...bad]).map(v => `<button class="lily" data-n="${v}" data-l="${k}">${v}</button>`).join('');
        const dur = Math.max(6, 15 - crossings * 1.5 - k);
        return `<div class="rlane"><div class="strip" style="animation-duration:${dur}s;animation-direction:${k % 2 ? 'reverse' : 'normal'}">${pads}${pads}</div></div>`;
      };
      const newRiver = () => {
        t = pick(g.facts); row = -1;
        $('#rp', g.body).innerHTML = TI(`Hop only on the ${t}s: ${t}, ${2 * t}, ${3 * t}, …`, `只能跳到 ${t} 的口诀数上：${t}、${2 * t}、${3 * t}……`);
        rv.innerHTML = `<div class="bank far">🏁</div>${Array.from({ length: LANES }, (_, i) => lane(LANES - 1 - i)).join('')}<div class="bank near" id="near">${ROO}</div>`;
      };
      rv.onclick = e => {
        const b = e.target.closest('.lily'); if (!b || g.over) return;
        const n = +b.dataset.n, k = +b.dataset.l;
        if (k !== row + 1) { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); tick(); return; }   // one row at a time
        if (n % t) { gBad(b); return; }
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

  balance: {
    title: ['Balance the Scale', '天平平衡'],
    rule: ['Tap a weight to move it to the other side. Make the scale level! Doing it in one move gets a bonus.', '点一个砝码，把它挪到另一边，让天平平衡！一步就摆平还有奖励分。'],
    setup(g) {
      let L, R, moves, done;
      g.body.innerHTML = `<div class="prompt">${TI('Make both sides the same!', '让两边一样重！')}</div>
        <div class="scale"><div class="beam" id="bm"><div class="pan" id="pl"></div><div class="pan" id="pr"></div></div><div class="post"></div></div>
        <div class="msg" id="bmsg"></div><div class="row" style="justify-content:center"><button class="btn ghost" id="brs">${TI('Start over', '重来')}</button></div>`;
      let start;
      const fresh = () => {
        // move one weight x from the heavy side: the heavy side is 2x heavier, so one move can balance it
        let heavy, light;
        do {
          const x = ri(1, 9);
          heavy = [x, ri(1, 9), ri(1, 9)];
          let need = sum(heavy) - 2 * x;
          light = [];
          while (need > 0) { const w = light.length === 2 ? need : Math.min(need, ri(1, 9)); light.push(w); need -= w; }
        } while (light.length < 2 || light.some(w => w > 12));
        start = rnd(2) ? [shuffle(heavy), shuffle(light)] : [shuffle(light), shuffle(heavy)];
        reset();
      };
      const reset = () => { L = [...start[0]]; R = [...start[1]]; moves = 0; done = false; draw(); };
      const draw = () => {
        const d = sum(R) - sum(L);
        $('#bm', g.body).style.transform = `rotate(${Math.max(-16, Math.min(16, d * 2))}deg)`;
        const w = (a, side) => a.map((v, i) => `<button class="wt" data-s="${side}" data-i="${i}" style="--w:${30 + v * 3}px">${v}</button>`).join('');
        $('#pl', g.body).innerHTML = w(L, 'L') + `<small>${sum(L)}</small>`;
        $('#pr', g.body).innerHTML = w(R, 'R') + `<small>${sum(R)}</small>`;
        $('#bmsg', g.body).innerHTML = d ? TI(`Moves: ${moves}. One side is ${Math.abs(d)} heavier.`, `挪了 ${moves} 次。一边重了 ${Math.abs(d)}。`) : TI('Level! ✓', '平衡啦！✓');
      };
      $('#bm', g.body).onclick = e => {
        const b = e.target.closest('.wt'); if (!b || g.over || done) return;
        const from = b.dataset.s === 'L' ? L : R, to = from === L ? R : L, [v] = from.splice(+b.dataset.i, 1);
        to.push(v); moves++; boing(); draw();
        if (sum(L) === sum(R)) {
          done = true; g.add(moves === 1 ? 2 : 1); pop(); gBurst($('#bm', g.body), moves === 1 ? 50 : 25);
          if (moves === 1) $('#bmsg', g.body).innerHTML = TI('Level in one move! +2', '一步就平衡！+2');
          setTimeout(() => { if (!g.over) fresh(); }, 900);
        }
      };
      $('#brs', g.body).onclick = reset;
      fresh();
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
  let lv = Math.max(0, GAME_LEVELS.findIndex(l => cur && cur.facts && l.join() === cur.facts.join()));
  body.innerHTML = `<div class="gameover"><svg width="84" height="84" viewBox="0 0 64 64" aria-hidden="true"><use href="#roo"/></svg>
    <p class="big" style="margin:0;max-width:40ch">${T(G.rule[0], G.rule[1])}</p>
    ${G.levels ? `<div class="row lvl" id="glv">${GAME_LEVELS.map((l, i) => `<button class="btn ${i === lv ? 'next' : 'ghost'}" data-l="${i}">${i === GAME_LEVELS.length - 1 ? TI(`All ${G.sign}2–${G.sign}10`, `全部 ${G.sign}2–${G.sign}10`) : l.map(n => G.sign + n).join(' ')}</button>`).join('')}</div>` : ''}
    <div class="row"><button class="btn next" id="gstart">${TI('Go!', '开始！')}</button>${opts.skip === false ? '' : `<button class="btn ghost" id="gskip">${TI('Skip', '跳过')}</button>`}</div></div>`;
  if ($('#gskip', el)) $('#gskip', el).onclick = opts.onEnd;
  if (G.levels) $('#glv', el).onclick = e => {
    const b = e.target.closest('[data-l]'); if (!b) return;
    lv = +b.dataset.l; tick();
    $('#glv', el).querySelectorAll('button').forEach((x, i) => x.className = `btn ${i === lv ? 'next' : 'ghost'}`);
  };
  $('#gstart', el).onclick = () => {
    let score = 0, left = GAME_SECONDS, over = false, cleanup;
    const sc = $('#gs', el), bar = $('#gt', el);
    const g = {
      body, facts: GAME_LEVELS[lv],
      get over() { return over; },
      get score() { return score; },
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
