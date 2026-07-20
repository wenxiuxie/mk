# -*- coding: utf-8 -*-
"""Generate interactive B-2022 Q1-9 HTML pages."""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
ANSWERS = {1: "A", 2: "B", 3: "C", 4: "C", 5: "E", 6: "D", 7: "A", 8: "C", 9: "B"}

CSS = r"""
:root{--primary:#4a90e2;--success:#2ec4b6;--danger:#e71d36;--bg:#f8f9fa;--dark:#2c3e50}
*{box-sizing:border-box}
body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:#333;margin:0;padding:20px;display:flex;flex-direction:column;align-items:center}
.lang-toggle-btn{position:fixed;top:20px;right:20px;background:var(--dark);color:#fff;border:none;padding:10px 18px;border-radius:20px;cursor:pointer;font-weight:bold;z-index:1000}
h1{text-align:center;color:var(--primary);margin:8px 0;font-size:22px}
.meta{color:#64748b;font-size:14px;margin-bottom:14px}
.wrap{max-width:920px;width:100%}
.section{background:#fff;padding:20px;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,.05);margin-bottom:16px}
h2{color:var(--primary);border-left:5px solid var(--primary);padding-left:10px;margin:0 0 10px;font-size:18px}
.fig{display:block;width:100%;max-width:420px;margin:8px auto;border-radius:10px;border:1px solid #e2e8f0}
.fig.wide{max-width:720px}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0}
.actions{text-align:center;margin-top:12px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px;font-size:14px}
.submit{background:var(--success);color:#fff}
.reset{background:#6c757d;color:#fff}
.ghost{background:#e2e8f0;color:#334155}
.primary{background:var(--primary);color:#fff}
.pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0}
.card{min-width:64px;padding:10px 12px;border-radius:12px;background:var(--primary);color:#fff;font-weight:800;cursor:pointer;text-align:center;user-select:none}
.card.on{outline:3px solid #f59e0b}
.answer-box{min-width:120px;min-height:56px;border:3px dashed var(--primary);border-radius:14px;margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;background:#fafbfc;padding:8px}
.answer-box.filled{border-style:solid;background:#e8f5e9}
#feedback{text-align:center;font-weight:800;margin-top:12px;min-height:28px}
.ok{color:var(--success)}.bad{color:var(--danger)}
.nav{display:flex;justify-content:space-between;margin-top:8px}
.nav a{color:var(--primary);font-weight:700;text-decoration:none}
.lang-zh{display:block}.lang-en{display:none}
body.en-mode .lang-zh{display:none}body.en-mode .lang-en{display:block}
.info{text-align:center;font-weight:700;min-height:24px;margin:8px 0;color:#0f172a}
"""

def shell(n, title_zh, title_en, pts, q_zh, q_en, fig_html, lab_zh, lab_en, tip_zh, tip_en, body, js, prev, nxt):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2022 B · Q{n} · {title_zh}</title>
<style>
{CSS}
</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode'); if(window.onLang) onLang();">🌐 English / 中文</button>

<h1 class="lang-zh">{title_zh}</h1>
<h1 class="lang-en">{title_en}</h1>
<div class="meta lang-zh">2022 等级 B · 第 {n} 题 · {pts} 分</div>
<div class="meta lang-en">2022 Level B · Q{n} · {pts} points</div>

<div class="wrap">
  <div class="section">
    <h2 class="lang-zh">题目</h2>
    <h2 class="lang-en">Problem</h2>
    <p class="lang-zh">{q_zh}</p>
    <p class="lang-en">{q_en}</p>
    {fig_html}
  </div>

  <div class="section">
    <h2 class="lang-zh">{lab_zh}</h2>
    <h2 class="lang-en">{lab_en}</h2>
    <p class="tip lang-zh">{tip_zh}</p>
    <p class="tip lang-en">{tip_en}</p>
    {body}
  </div>

  <div class="nav">
    <a href="{prev}"><span class="lang-zh">← 上一题</span><span class="lang-en">← Prev</span></a>
    <a href="{nxt}"><span class="lang-zh">下一题 →</span><span class="lang-en">Next →</span></a>
  </div>
</div>

<script>
const ANSWER='{ANSWERS[n]}';
function en(){{ return document.body.classList.contains('en-mode'); }}
function setAns(L, text){{
  window._ans=L;
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
  const el=[...document.querySelectorAll('.card')].find(c=>c.dataset.ans===L);
  if(el) el.classList.add('on');
  const box=document.getElementById('ansBox');
  if(box){{ box.className='answer-box filled'; box.textContent=text||L; }}
  const fb=document.getElementById('feedback'); if(fb) fb.textContent='';
}}
function checkAnswer(){{
  const fb=document.getElementById('feedback');
  if(!window._ans){{
    fb.className='bad';
    fb.textContent=en()?'❌ Pick an option first.':'❌ 请先选一个选项。';
    return;
  }}
  const ok=window._ans===ANSWER;
  fb.className=ok?'ok':'bad';
  fb.textContent=ok
    ?(en()?'✅ You found it!':'✅ 找对了！')
    :(en()?'❌ Not yet — try again in the lab.':'❌ 还不对——回到实验台再试一试。');
}}
{js}
</script>
</body>
</html>
"""

def choice_pool(choices, with_html=False):
    # choices: list of (L, zh, en) or (L, html)
    cards = []
    for ch in choices:
        L = ch[0]
        if with_html:
            cards.append(f'<div class="card" data-ans="{L}" onclick="setAns(\'{L}\', this.innerText)">{ch[1]}</div>')
        else:
            zh, en_ = ch[1], ch[2]
            cards.append(
                f'<div class="card" data-ans="{L}" onclick="setAns(\'{L}\', \'{L}: \'+(en()?`{en_}`:`{zh}`))">'
                f'<div>{L}</div><div style="font-size:12px;opacity:.95"><span class="lang-zh">{zh}</span><span class="lang-en">{en_}</span></div></div>'
            )
    return (
        '<div class="pool" id="pool">' + "".join(cards) + '</div>'
        '<div class="answer-box" id="ansBox"></div>'
        '<div class="actions">'
        '<button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>'
        '<div id="feedback"></div></div>'
    )


# ---------- Q1 Bee ----------
q1_body = """
<style>
.bee-grid{display:grid;grid-template-columns:repeat(4,64px);grid-template-rows:repeat(4,64px);gap:0;margin:12px auto;border:3px solid #334155;width:max-content;background:#fef9c3}
.bee-grid .cell{border:1px dashed #94a3b8;display:flex;align-items:center;justify-content:center;font-size:28px;position:relative}
.bee-grid .cell.path{background:#fde68a}
.trail{font-size:12px;color:#b45309;position:absolute;bottom:2px}
</style>
<div class="bee-grid" id="beeGrid"></div>
<div class="info" id="info"></div>
<div class="actions">
  <button class="btn primary" onclick="runPath()"><span class="lang-zh">按所选方向走</span><span class="lang-en">Walk chosen path</span></button>
  <button class="btn reset" onclick="resetBee()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button>
</div>
""" + choice_pool([
    ("A", "→↓→↓↓→", "→↓→↓↓→"),
    ("B", "↓↓→↓↓", "↓↓→↓↓"),
    ("C", "→↓→↓→", "→↓→↓→"),
    ("D", "→→↓↓↓", "→→↓↓↓"),
    ("E", "↓→→↓↓↓", "↓→→↓↓↓"),
])

q1_js = r"""
const PATHS={
  A:['R','D','R','D','D','R'],
  B:['D','D','R','D','D'],
  C:['R','D','R','D','R'],
  D:['R','R','D','D','D'],
  E:['D','R','R','D','D','D'],
};
let timer=null;
function resetBee(){
  if(timer){clearInterval(timer);timer=null;}
  const g=document.getElementById('beeGrid');
  g.innerHTML='';
  for(let r=0;r<4;r++) for(let c=0;c<4;c++){
    const d=document.createElement('div');
    d.className='cell';
    d.id=`c${r}${c}`;
    if(r===0&&c===0) d.textContent='🐝';
    if(r===3&&c===3) d.innerHTML=(d.textContent?d.textContent+' ':'')+'🌸';
    g.appendChild(d);
  }
  document.getElementById('info').textContent=en()?'Pick a path, then walk.':'先选一组方向，再点「走」。';
}
function runPath(){
  if(!window._ans){ document.getElementById('info').textContent=en()?'Pick an option first.':'请先选一组方向。'; return; }
  resetBee();
  const steps=PATHS[window._ans];
  let r=0,c=0,i=0;
  const visited=[[0,0]];
  timer=setInterval(()=>{
    if(i>=steps.length){
      clearInterval(timer); timer=null;
      const ok=r===3&&c===3;
      document.getElementById('info').textContent=ok
        ?(en()?'Reached the flower!':'到花了！')
        :(en()?`Stopped at (${r+1},${c+1}).`:`停在第 ${r+1} 行第 ${c+1} 列。`);
      return;
    }
    const s=steps[i++];
    if(s==='R') c++; else if(s==='D') r++;
    if(r>3||c>3||r<0||c<0){
      clearInterval(timer); timer=null;
      document.getElementById('info').textContent=en()?'Went off the grid.':'走出格子了。';
      return;
    }
    visited.push([r,c]);
    document.querySelectorAll('.bee-grid .cell').forEach(el=>{el.textContent=''; el.classList.remove('path');});
    visited.forEach(([rr,cc],idx)=>{
      const el=document.getElementById(`c${rr}${cc}`);
      el.classList.add('path');
      if(rr===3&&cc===3) el.textContent='🌸';
      if(idx===visited.length-1) el.textContent=(el.textContent==='🌸'?'🐝🌸':'🐝');
    });
    if(!document.getElementById('c33').textContent.includes('🌸') && !(r===3&&c===3))
      document.getElementById('c33').textContent='🌸';
  }, 400);
}
resetBee();
"""

# ---------- Q2 Laser ----------
q2_body = """
<style>
.laser-wrap{display:flex;justify-content:center;margin:12px 0}
.laser{
  display:grid;grid-template-columns:repeat(3,72px);grid-template-rows:repeat(2,72px);
  gap:0;border:3px solid #334155;position:relative;background:#fff;
}
.lmirror{
  border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;
  font-size:28px;font-weight:900;position:relative;
}
.lmirror.hit{background:#fee2e2}
.exit-lab{position:absolute;font-weight:800;color:#334155;font-size:14px}
</style>
<p class="tip lang-zh">小图：激光碰到镜子会拐弯（见题目图）。</p>
<p class="tip lang-en">Inset: beam turns 90° on a mirror (see figure).</p>
<img class="fig" src="assets/q2_ex.png" alt="example" style="max-width:240px"/>
<div class="laser-wrap">
  <div class="laser" id="laser">
    <span class="exit-lab" style="bottom:-22px;left:28px">A</span>
    <span class="exit-lab" style="bottom:-22px;left:100px">B</span>
    <span class="exit-lab" style="bottom:-22px;left:172px">C</span>
    <span class="exit-lab" style="right:-22px;bottom:24px">D</span>
    <span class="exit-lab" style="right:-22px;top:24px">E</span>
  </div>
</div>
<div class="info" id="info"></div>
<div class="actions">
  <button class="btn primary" onclick="fire()"><span class="lang-zh">发射激光（逐步）</span><span class="lang-en">Fire (step by step)</span></button>
  <button class="btn reset" onclick="resetLaser()"><span class="lang-zh">清空轨迹</span><span class="lang-en">Clear</span></button>
</div>
""" + choice_pool([
    ("A", "A", "A"), ("B", "B", "B"), ("C", "C", "C"), ("D", "D", "D"), ("E", "E", "E"),
])

q2_js = r"""
// row0=E top, row1=D bottom; cols A B C — from contest figure
const M=[['\\','/','\\'],['/','\\','\\']];
function reflect(m, dir){
  // dir = travel direction
  if(m==='\\'){ // top-left to bottom-right
    return {R:'D',L:'U',U:'R',D:'L'}[dir];
  } else { // /
    return {R:'U',L:'D',U:'L',D:'R'}[dir];
  }
}
function resetLaser(){
  const box=document.getElementById('laser');
  [...box.querySelectorAll('.lmirror')].forEach(e=>e.remove());
  for(let r=0;r<2;r++) for(let c=0;c<3;c++){
    const d=document.createElement('div');
    d.className='lmirror';
    d.id=`m${r}${c}`;
    d.textContent=M[r][c];
    box.appendChild(d);
  }
  document.getElementById('info').textContent=en()?'Fire to trace the beam.':'点发射，逐步看激光走到哪。';
}
let firing=false;
async function fire(){
  if(firing) return; firing=true;
  resetLaser();
  let r=0,c=0,dir='R';
  const path=[];
  for(let step=0;step<20;step++){
    const m=M[r][c];
    document.getElementById(`m${r}${c}`).classList.add('hit');
    dir=reflect(m,dir);
    path.push([r,c,dir]);
    // move to next cell or exit
    let nr=r,nc=c;
    if(dir==='R') nc++; else if(dir==='L') nc--; else if(dir==='U') nr--; else nr++;
    await new Promise(res=>setTimeout(res,350));
    if(nr<0){ document.getElementById('info').textContent=en()?'Exits at E (top).':'从上方 E 出去。'; firing=false; return; }
    if(nr>1){ const letters=['A','B','C']; document.getElementById('info').textContent=en()?`Exits at ${letters[c]} (bottom).`:`从下方 ${letters[c]} 出去。`; firing=false; return; }
    if(nc<0){ document.getElementById('info').textContent=en()?'Exits left.':'从左边出去。'; firing=false; return; }
    if(nc>2){ document.getElementById('info').textContent=en()?`Exits at ${r===0?'E':'D'} (right).`:`从右方 ${r===0?'E':'D'} 出去。`; firing=false; return; }
    r=nr; c=nc;
  }
  firing=false;
}
resetLaser();
"""

# ---------- Q3 Coins ----------
q3_body = """
<style>
.coin-grid{display:grid;grid-template-columns:repeat(5,56px);grid-template-rows:repeat(5,56px);gap:0;margin:12px auto;border:3px solid #334155;width:max-content}
.coin-cell{border:1px solid #94a3b8;display:flex;align-items:center;justify-content:center;background:#fff;cursor:pointer}
.coin{width:36px;height:36px;border-radius:50%;background:#7dd3fc;border:2px solid #0369a1;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;color:#0c4a6e}
.coin.sel{outline:3px solid #f59e0b;outline-offset:2px}
.coin-cell.drop{background:#fef3c7}
.counts{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;font-size:13px;font-weight:700;color:#475569;margin-top:8px}
</style>
<div class="coin-grid" id="coinGrid"></div>
<div class="counts" id="counts"></div>
<div class="info" id="info"></div>
<div class="actions">
  <button class="btn reset" onclick="resetCoins()"><span class="lang-zh">恢复原图</span><span class="lang-en">Reset</span></button>
</div>
""" + choice_pool([
    ("A", "移 A", "move A"), ("B", "移 B", "move B"), ("C", "移 C", "move C"),
    ("D", "移 D", "move D"), ("E", "移 E", "move E"),
])

q3_js = r"""
// 5x5; labeled coins + plains. Move one labeled coin.
const INIT=[
  // [r,c,label|null]
  [0,0,'A'],[0,4,null],
  [1,1,null],[1,3,null],
  [2,2,'D'],[2,3,null],
  [3,0,'B'],
  [4,0,'C'],[4,2,'E'],[4,4,null],
];
let coins=INIT.map(x=>x.slice());
let picked=null; // index in coins
function resetCoins(){ coins=INIT.map(x=>x.slice()); picked=null; renderCoins(); }
function renderCoins(){
  const g=document.getElementById('coinGrid');
  g.innerHTML='';
  const map={};
  coins.forEach((co,i)=>{ map[`${co[0]},${co[1]}`]=i; });
  for(let r=0;r<5;r++) for(let c=0;c<5;c++){
    const d=document.createElement('div');
    d.className='coin-cell';
    const key=`${r},${c}`;
    if(key in map){
      const i=map[key];
      const lab=coins[i][2];
      const coin=document.createElement('div');
      coin.className='coin'+(picked===i?' sel':'');
      coin.textContent=lab||'';
      coin.onclick=(e)=>{ e.stopPropagation(); picked=i; renderCoins(); };
      d.appendChild(coin);
    } else {
      d.onclick=()=>{
        if(picked==null) return;
        // only allow moving labeled A-E once from original? allow any move of one coin
        const occ=coins.some((co,j)=>j!==picked && co[0]===r && co[1]===c);
        if(occ) return;
        coins[picked][0]=r; coins[picked][1]=c;
        picked=null; renderCoins();
      };
    }
    g.appendChild(d);
  }
  const row=[0,0,0,0,0], col=[0,0,0,0,0];
  coins.forEach(([r,c])=>{ row[r]++; col[c]++; });
  document.getElementById('counts').innerHTML=
    `<span>行 rows: ${row.join(', ')}</span><span>列 cols: ${col.join(', ')}</span>`;
  const ok=row.every(x=>x===2)&&col.every(x=>x===2);
  document.getElementById('info').textContent=ok
    ?(en()?'Every row and column has 2 — which labeled coin did you move?':'每行每列都是 2 枚了——你移动的是哪枚带字母的？')
    :(en()?'Tap a labeled coin, then tap an empty cell.':'先点带字母的硬币，再点空格放下。');
}
resetCoins();
"""

# ---------- Q4 Boxes ----------
q4_body = """
<style>
.box-stage{position:relative;width:min(100%,520px);height:280px;margin:12px auto;background:#f1f5f9;border-radius:12px;border:1px solid #e2e8f0}
.box{
  position:absolute;border:2px solid #334155;border-radius:6px;padding:4px 6px;
  font-size:11px;font-weight:800;cursor:pointer;user-select:none;text-align:center;
  display:flex;align-items:center;justify-content:center;line-height:1.2;
  transition:opacity .2s, transform .2s;
}
.box.gone{opacity:0;pointer-events:none;transform:scale(.6)}
.box.train{background:#1e293b;color:#fff}
.box.blocked{box-shadow:0 0 0 3px #f87171}
.box.free{box-shadow:0 0 0 3px #4ade80}
</style>
<div class="box-stage" id="stage"></div>
<div class="info" id="info"></div>
<div class="actions">
  <button class="btn reset" onclick="resetBoxes()"><span class="lang-zh">重来</span><span class="lang-en">Reset</span></button>
</div>
""" + choice_pool([
    ("A", "3", "3"), ("B", "4", "4"), ("C", "5", "5"), ("D", "6", "6"), ("E", "7", "7"),
])

q4_js = r"""
// simplified layout; resting-on relations
const BOXES=[
  {id:'cloths', zh:'布料', en:'cloths', x:8, y:200, w:90, h:60, on:[], train:false},
  {id:'train', zh:'火车', en:'TRAIN', x:90, y:190, w:120, h:70, on:[], train:true},
  {id:'cds', zh:'光碟', en:'CDs', x:210, y:200, w:90, h:60, on:[], train:false},
  {id:'booksBig', zh:'书(底)', en:'BOOKS', x:320, y:200, w:100, h:60, on:[], train:false},
  {id:'stuffed', zh:'毛绒', en:'stuffed animals', x:30, y:120, w:160, h:70, on:['cloths','train'], train:false},
  {id:'bedding', zh:'床上用品', en:'bedding', x:170, y:120, w:160, h:70, on:['train','cds'], train:false},
  {id:'puzzles', zh:'拼图', en:'puzzles', x:340, y:130, w:90, h:55, on:['booksBig'], train:false},
  {id:'books', zh:'书', en:'books', x:40, y:50, w:80, h:55, on:['stuffed'], train:false},
  {id:'music', zh:'乐谱', en:'music sheets', x:130, y:45, w:110, h:55, on:['stuffed','bedding'], train:false},
  {id:'board', zh:'棋盘', en:'board games', x:260, y:45, w:130, h:55, on:['bedding','puzzles'], train:false},
];
let removed=new Set();
let moves=0;
function topsOn(id){
  return BOXES.filter(b=>!removed.has(b.id) && b.on.includes(id)).map(b=>b.id);
}
function canRemove(id){
  return topsOn(id).length===0 && id!=='train';
}
function trainBlocked(){
  return topsOn('train').length>0;
}
function resetBoxes(){ removed=new Set(); moves=0; renderBoxes(); }
function renderBoxes(){
  const st=document.getElementById('stage');
  st.innerHTML='';
  BOXES.forEach(b=>{
    const d=document.createElement('div');
    d.className='box'+(removed.has(b.id)?' gone':'')+(b.train?' train':'');
    if(b.train && !removed.has(b.id)) d.classList.add(trainBlocked()?'blocked':'free');
    d.style.left=b.x+'px'; d.style.top=b.y+'px'; d.style.width=b.w+'px'; d.style.height=b.h+'px';
    d.textContent=en()?b.en:b.zh;
    d.title=b.id;
    d.onclick=()=>{
      if(removed.has(b.id)) return;
      if(b.train){
        document.getElementById('info').textContent=trainBlocked()
          ?(en()?'TRAIN still has boxes on it.':'火车盒上还有东西。')
          :(en()?`TRAIN is free after ${moves} moves.`:`火车盒已可打开，共移了 ${moves} 个。`);
        return;
      }
      if(!canRemove(b.id)){
        document.getElementById('info').textContent=en()?'Something is still on this box.':'这个盒子上面还有东西。';
        return;
      }
      removed.add(b.id); moves++; renderBoxes();
    };
    st.appendChild(d);
  });
  document.getElementById('info').textContent=en()
    ?`Moved: ${moves}. Tap topmost boxes to move them. Green TRAIN = clear.`
    :`已移动：${moves}。先点最上面的盒子移走。火车变绿=已清开。`;
}
resetBoxes();
"""

# ---------- Q5 Kangaroo ----------
q5_body = """
<style>
.numline{position:relative;height:90px;margin:20px auto;max-width:640px;border-bottom:4px solid #334155}
.tick{position:absolute;bottom:0;width:2px;height:12px;background:#334155;transform:translateX(-1px)}
.tick label{position:absolute;top:16px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:700}
.roo{position:absolute;bottom:14px;font-size:28px;transform:translateX(-50%);transition:left .35s}
</style>
<div class="numline" id="numline"><div class="roo" id="roo">🦘</div></div>
<div class="info" id="info"></div>
<div class="actions">
  <button class="btn primary" onclick="jumpOnce()"><span class="lang-zh">跳一下（大→小→小）</span><span class="lang-en">Jump (big→small→small)</span></button>
  <button class="btn ghost" onclick="jumpAll()"><span class="lang-zh">一直跳到 16</span><span class="lang-en">Jump until 16</span></button>
  <button class="btn reset" onclick="resetRoo()"><span class="lang-zh">重来</span><span class="lang-en">Reset</span></button>
</div>
""" + choice_pool([
    ("A", "4", "4"), ("B", "7", "7"), ("C", "8", "8"), ("D", "9", "9"), ("E", "12", "12"),
])

q5_js = r"""
let pos=0, jumps=0, phase=0; // 0 big(+2), 1 small(+1), 2 small(+1)
function resetRoo(){
  pos=0; jumps=0; phase=0; renderRoo();
}
function renderRoo(){
  const line=document.getElementById('numline');
  [...line.querySelectorAll('.tick')].forEach(e=>e.remove());
  for(let i=0;i<=16;i++){
    const t=document.createElement('div');
    t.className='tick';
    t.style.left=(i/16*100)+'%';
    if(i%2===0){ const lab=document.createElement('label'); lab.textContent=i; t.appendChild(lab); }
    line.appendChild(t);
  }
  document.getElementById('roo').style.left=(pos/16*100)+'%';
  document.getElementById('info').textContent=en()
    ?`Position ${pos}, jumps ${jumps}. Pattern: big(+2), small(+1), small(+1).`
    :`位置 ${pos}，已跳 ${jumps} 次。规律：大跳(+2)、小跳(+1)、小跳(+1)。`;
}
function jumpOnce(){
  if(pos>=16) return;
  const delta=phase===0?2:1;
  pos=Math.min(16,pos+delta);
  jumps++;
  phase=(phase+1)%3;
  renderRoo();
}
function jumpAll(){
  resetRoo();
  const run=()=>{
    if(pos>=16) return;
    jumpOnce();
    setTimeout(run, 200);
  };
  run();
}
resetRoo();
"""

# ---------- Q6 Jigsaw ----------
q6_body = """
<style>
.jg{display:grid;grid-template-columns:repeat(6,44px);grid-template-rows:repeat(6,44px);gap:0;margin:12px auto;border:3px solid #334155;width:max-content}
.jg .c{border:1px solid #94a3b8;display:flex;align-items:center;justify-content:center;font-weight:800;background:#e0f2fe;font-size:16px}
.jg .c.hole{background:#fff;border-style:dashed}
.jg .c.bad{background:#fecaca}
.jg .c.ok{background:#bbf7d0}
.pieces{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:12px 0}
.piece{display:grid;grid-template-columns:repeat(3,36px);grid-template-rows:repeat(2,36px);gap:0;border:2px solid #334155;cursor:pointer;background:#fff}
.piece .pc{border:1px solid #94a3b8;display:flex;align-items:center;justify-content:center;font-weight:800;background:#e0f2fe;font-size:14px}
.piece .pc.empty{background:transparent;border-color:transparent}
.piece.on{outline:3px solid #f59e0b}
</style>
<img class="fig" src="assets/q6_grid.png" alt="grid" style="max-width:280px"/>
<div class="jg" id="jg"></div>
<div class="info" id="info"></div>
<p class="tip lang-zh">点选一块拼图放进缺口，看邻格数字是否冲突</p>
<p class="tip lang-en">Tap a piece to place it; conflicting neighbors turn red</p>
<div class="pieces" id="pieces"></div>
""" + choice_pool([
    ("A", "A", "A"), ("B", "B", "B"), ("C", "C", "C"), ("D", "D", "D"), ("E", "E", "E"),
])

q6_js = r"""
const GRID=[
  [3,2,5,4,2,1],
  [1,4,3,1,3,4],
  [2,5,null,5,2,1],
  [4,1,null,null,null,3],
  [3,2,4,2,5,2],
  [4,1,3,1,3,4],
];
// L: top at (2,2); bottom (3,2)(3,3)(3,4)
const PIECES={
  A:[4,1,2,3],
  B:[1,3,4,2],
  C:[2,4,1,3],
  D:[2,3,1,4],
  E:[3,2,1,4],
};
let placed=null;
function neighbors(r,c){
  return [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([a,b])=>a>=0&&a<6&&b>=0&&b<6);
}
function renderJg(){
  const g=document.getElementById('jg');
  g.innerHTML='';
  const filled={};
  if(placed){
    const [t,a,b,c]=PIECES[placed];
    filled['2,2']=t; filled['3,2']=a; filled['3,3']=b; filled['3,4']=c;
  }
  let conflict=false;
  for(let r=0;r<6;r++) for(let c=0;c<6;c++){
    const d=document.createElement('div');
    d.className='c';
    let val=GRID[r][c];
    const key=`${r},${c}`;
    if(val==null){
      d.classList.add('hole');
      val=filled[key];
      if(val!=null){
        // check neighbors
        let bad=false;
        neighbors(r,c).forEach(([nr,nc])=>{
          let nv=GRID[nr][nc];
          if(nv==null) nv=filled[`${nr},${nc}`];
          if(nv===val) bad=true;
        });
        if(bad){ d.classList.add('bad'); conflict=true; } else d.classList.add('ok');
      }
    }
    d.textContent=val==null?'':val;
    g.appendChild(d);
  }
  document.getElementById('info').textContent=placed
    ?(conflict?(en()?'Neighbor conflict — try another piece.':'和邻格数字相同了——换一块试试。')
              :(en()?'No neighbor conflict for this piece.':'这块与邻格不冲突。'))
    :(en()?'Tap a piece below.':'点下面一块拼图。');
}
(function(){
  const wrap=document.getElementById('pieces');
  Object.keys(PIECES).forEach(L=>{
    const [t,a,b,c]=PIECES[L];
    const p=document.createElement('div');
    p.className='piece';
    p.innerHTML=`<div class="pc">${t}</div><div class="pc empty"></div><div class="pc empty"></div>
      <div class="pc">${a}</div><div class="pc">${b}</div><div class="pc">${c}</div>`;
    const lab=document.createElement('div'); lab.style.textAlign='center'; lab.style.fontWeight='800'; lab.textContent=L;
    const col=document.createElement('div'); col.appendChild(lab); col.appendChild(p);
    p.onclick=()=>{
      placed=L; setAns(L,L);
      [...wrap.querySelectorAll('.piece')].forEach(x=>x.classList.remove('on'));
      p.classList.add('on');
      renderJg();
    };
    wrap.appendChild(col);
  });
  renderJg();
})();
"""

# ---------- Q7 Equation ----------
q7_body = """
<style>
.eq{font-size:28px;font-weight:800;text-align:center;margin:16px 0;letter-spacing:1px}
.eq .box{display:inline-block;min-width:48px;padding:4px 10px;border:3px dashed #4a90e2;border-radius:10px;margin:0 4px;background:#f0f9ff}
.result{text-align:center;font-size:18px;font-weight:700;min-height:28px}
</style>
<div class="eq">2022 + <span class="box" id="b1">□</span> = 2020 + <span class="box" id="b2">□</span></div>
<div class="result" id="result"></div>
""" + choice_pool([
    ("A", "3 和 5", "3 and 5"),
    ("B", "4 和 1", "4 and 1"),
    ("C", "3 和 4", "3 and 4"),
    ("D", "7 和 2", "7 and 2"),
    ("E", "9 和 8", "9 and 8"),
])

q7_js = r"""
const PAIRS={A:[3,5],B:[4,1],C:[3,4],D:[7,2],E:[9,8]};
const _setAns=setAns;
setAns=function(L,text){
  _setAns(L,text);
  const [x,y]=PAIRS[L];
  document.getElementById('b1').textContent=x;
  document.getElementById('b2').textContent=y;
  const Lhs=2022+x, Rhs=2020+y;
  const ok=Lhs===Rhs;
  document.getElementById('result').textContent=en()
    ?`Left ${Lhs}  ·  Right ${Rhs}  ·  ${ok?'Equal':'not equal'}`
    :`左边 ${Lhs}  ·  右边 ${Rhs}  ·  ${ok?'相等':'不相等'}`;
  document.getElementById('result').style.color=ok?'#16a34a':'#dc2626';
};
"""

# ---------- Q8 Top view ----------
q8_body = """
<style>
.opts8{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:12px 0}
.opts8 img{width:100px;height:100px;border:3px solid #e2e8f0;border-radius:10px;cursor:pointer;background:#fff}
.opts8 img.on{border-color:#f59e0b;outline:3px solid #fbbf24}
.tower-view{text-align:center}
</style>
<div class="tower-view">
  <img class="fig" src="assets/q8_tower.png" alt="tower" style="max-width:200px"/>
  <p class="tip lang-zh">想象你站在塔的正上方往下看</p>
  <p class="tip lang-en">Imagine looking straight down from above</p>
</div>
<div class="opts8" id="opts8"></div>
<div class="answer-box" id="ansBox"></div>
<div class="actions">
  <button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
  <div id="feedback"></div>
</div>
"""

q8_js = r"""
(function(){
  const wrap=document.getElementById('opts8');
  'ABCDE'.split('').forEach(L=>{
    const col=document.createElement('div');
    col.style.textAlign='center';
    const lab=document.createElement('div'); lab.style.fontWeight='800'; lab.textContent=L;
    const img=document.createElement('img');
    img.src=`assets/q8_opt${L}.png`; img.alt=L;
    img.onclick=()=>{
      setAns(L,L);
      wrap.querySelectorAll('img').forEach(i=>i.classList.remove('on'));
      img.classList.add('on');
    };
    col.appendChild(lab); col.appendChild(img); wrap.appendChild(col);
  });
})();
"""

# ---------- Q9 Cars ----------
q9_body = """
<style>
.road{display:flex;gap:8px;justify-content:center;align-items:center;margin:16px auto;flex-wrap:wrap;min-height:80px}
.car{
  width:64px;height:48px;border-radius:10px 14px 8px 8px;display:flex;align-items:center;justify-content:center;
  font-weight:900;font-size:20px;color:#fff;border:2px solid #0f172a;position:relative;
  transition:transform .35s;
}
.car::after{content:'◀'; position:absolute;left:-10px;font-size:12px;color:#64748b}
.dir{text-align:center;font-weight:700;color:#64748b;margin-bottom:4px}
</style>
<div class="dir lang-zh">行驶方向 ← （左边是前面）</div>
<div class="dir lang-en">Direction ← (left = front)</div>
<div class="road" id="road"></div>
<div class="info" id="info"></div>
<div class="actions">
  <button class="btn primary" id="btnStep" onclick="nextOvertake()"><span class="lang-zh">下一步超车</span><span class="lang-en">Next overtake</span></button>
  <button class="btn reset" onclick="resetCars()"><span class="lang-zh">重来</span><span class="lang-en">Reset</span></button>
</div>
""" + choice_pool([
    ("A", "1,2,3,5,4", "1,2,3,5,4"),
    ("B", "2,1,3,5,4", "2,1,3,5,4"),
    ("C", "2,1,5,3,4", "2,1,5,3,4"),
    ("D", "3,1,4,2,5", "3,1,4,2,5"),
    ("E", "4,1,2,5,3", "4,1,2,5,3"),
])

q9_js = r"""
const COLORS={1:'#ef4444',2:'#22c55e',3:'#38bdf8',4:'#eab308',5:'#a16207'};
let cars=[1,2,3,4,5]; // front ... back
let step=0;
function overtakeTwoFromBack(){
  // last car overtakes two ahead: move last to index length-3
  if(cars.length<3) return;
  const last=cars.pop();
  cars.splice(cars.length-2, 0, last);
}
function overtakeTwoFromSecondLast(){
  // second last overtakes two ahead
  if(cars.length<4) return;
  const i=cars.length-2;
  const car=cars.splice(i,1)[0];
  cars.splice(i-2, 0, car);
}
function overtakeTwoFromMiddle(){
  // middle car (index 2 in 5) overtakes two ahead
  const mid=Math.floor(cars.length/2);
  const car=cars.splice(mid,1)[0];
  cars.splice(Math.max(0,mid-2), 0, car);
}
function resetCars(){ cars=[1,2,3,4,5]; step=0; renderCars(); }
function renderCars(){
  const road=document.getElementById('road');
  road.innerHTML='';
  cars.forEach(n=>{
    const d=document.createElement('div');
    d.className='car'; d.style.background=COLORS[n]; d.textContent=n;
    road.appendChild(d);
  });
  const labels=[
    en()?'Start: 1 2 3 4 5':'开始：1 2 3 4 5',
    en()?'After last (5) overtakes two':'最后一辆(5)超了前面两辆之后',
    en()?'After second-last overtakes two':'倒数第二超了前面两辆之后',
    en()?'After middle overtakes two — done':'中间车超了前面两辆 — 完成',
  ];
  document.getElementById('info').textContent=labels[step]+' → '+cars.join(', ');
  document.getElementById('btnStep').style.display=step>=3?'none':'inline-block';
}
function nextOvertake(){
  if(step===0) overtakeTwoFromBack();
  else if(step===1) overtakeTwoFromSecondLast();
  else if(step===2) overtakeTwoFromMiddle();
  step=Math.min(3,step+1);
  renderCars();
}
resetCars();
"""

def write(n, **kw):
    path = os.path.join(ROOT, f"{n}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(shell(n, **kw))
    print("wrote", path)


def main():
    write(1, title_zh="蜜蜂采蜜", title_en="Bee to Flower", pts=3,
          q_zh="蜜蜂按照哪组方向前进可以采到花蜜？",
          q_en="Buzz the bee wants to reach the flower. Which set of directions will get him there?",
          fig_html='<img class="fig" src="assets/q1_figure.png" alt="Q1"/>',
          lab_zh="实验：选方向，看蜜蜂怎么走", lab_en="Lab: pick a path and watch the bee",
          tip_zh="选一组箭头后点「走」。蜜蜂从左上角出发，花在右下角。",
          tip_en="Pick a path, then Walk. Bee starts top-left; flower is bottom-right.",
          body=q1_body, js=q1_js, prev="index.html", nxt="2.html")

    write(2, title_zh="激光反射", title_en="Laser Mirrors", pts=3,
          q_zh="激光按图中方式遇镜反射。激光会从哪个字母位置射出？",
          q_en="Laser beams reflect in mirrors as shown. At which letter will this laser beam end?",
          fig_html='<img class="fig" src="assets/q2_figure.png" alt="Q2"/>',
          lab_zh="实验：发射激光，逐步跟踪", lab_en="Lab: fire the laser and trace it",
          tip_zh="点发射看拐弯过程，再选出口字母。",
          tip_en="Fire to see each turn, then pick the exit letter.",
          body=q2_body, js=q2_js, prev="1.html", nxt="3.html")

    write(3, title_zh="硬币网格", title_en="Coin Grid", pts=3,
          q_zh="小萝想让每行、每列都正好有 2 枚硬币。需要把哪枚带字母的硬币移到空格？",
          q_en="Rossitza wants 2 coins in each row and each column. Which labeled coin must she move to an empty cell?",
          fig_html='<img class="fig" src="assets/q3_figure.png" alt="Q3"/>',
          lab_zh="实验：拖移一枚带字母硬币，看行列计数", lab_en="Lab: move one labeled coin; watch row/col counts",
          tip_zh="点一枚带字母硬币，再点空格放下。目标：五行五列都是 2。",
          tip_en="Tap a labeled coin, then an empty cell. Goal: every row and column has 2.",
          body=q3_body, js=q3_js, prev="2.html", nxt="4.html")

    write(4, title_zh="挪盒子", title_en="Move Boxes", pts=3,
          q_zh="小博至少要移动多少个盒子，才能打开装着玩具火车的黑色盒子？",
          q_en="What is the smallest number of boxes Bill has to move to open the dark TRAIN box?",
          fig_html='<img class="fig wide" src="assets/q4_figure.png" alt="Q4"/>',
          lab_zh="实验：先移上面的盒子，清出火车", lab_en="Lab: move upper boxes until TRAIN is clear",
          tip_zh="只能移「上面没有东西」的盒子。火车变绿表示已清开。数你移了几个。",
          tip_en="Only move boxes with nothing on top. Green TRAIN = clear. Count your moves.",
          body=q4_body, js=q4_js, prev="3.html", nxt="5.html")

    write(5, title_zh="袋鼠跳跃", title_en="Kangaroo Jumps", pts=3,
          q_zh="袋鼠按「一大跳再两小跳」从 0 跳到 16。一共跳了多少次？",
          q_en="Kengu makes one large jump then two small jumps, from 0 to 16. How many jumps?",
          fig_html='<img class="fig wide" src="assets/q5_figure.png" alt="Q5"/>',
          lab_zh="实验：按规律在数轴上跳", lab_en="Lab: jump on the number line by the pattern",
          tip_zh="大跳 +2，小跳 +1。可一步步跳，或一键跳到 16，看次数。",
          tip_en="Big +2, small +1. Jump step by step or auto to 16 and count.",
          body=q5_body, js=q5_js, prev="4.html", nxt="6.html")

    write(6, title_zh="数字拼图", title_en="Number Jigsaw", pts=3,
          q_zh="有公共边的两格数字不能相同。应选哪一块补全拼图？",
          q_en="Squares sharing a side must not have the same number. Which piece completes the jigsaw?",
          fig_html='<img class="fig" src="assets/q6_opts.png" alt="Q6 options" style="max-width:640px"/>',
          lab_zh="实验：试放每一块，看是否与邻格冲突", lab_en="Lab: try each piece; watch neighbor conflicts",
          tip_zh="点一块放入缺口。红色=与邻格数字相同；绿色=这块邻格没冲突。",
          tip_en="Tap a piece into the hole. Red = same as a neighbor; green = OK for neighbors.",
          body=q6_body, js=q6_js, prev="5.html", nxt="7.html")

    write(7, title_zh="填等式", title_en="Fill the Equation", pts=3,
          q_zh="哪两个数填入方框能使等式成立？ 2022 + □ = 2020 + □",
          q_en="Which two numbers make the statement correct? 2022 + □ = 2020 + □",
          fig_html="",
          lab_zh="实验：选一对数字，看左右是否相等", lab_en="Lab: pick a pair and compare both sides",
          tip_zh="点选项后自动代入，比较两边的结果。",
          tip_en="Tap an option to plug in and compare both sides.",
          body=q7_body, js=q7_js, prev="6.html", nxt="8.html")

    write(8, title_zh="塔的俯视图", title_en="Tower Top View", pts=3,
          q_zh="小吉搭了一座塔。从正上方看，会看到哪个图案？",
          q_en="John builds the tower shown. What will he see from above?",
          fig_html="",
          lab_zh="实验：对照塔的立体图，选俯视图案", lab_en="Lab: compare the tower with top-view options",
          tip_zh="想一想：被挡住的、更小的层从上面看不见。",
          tip_en="Think which smaller layers are hidden under larger ones above.",
          body=q8_body, js=q8_js, prev="7.html", nxt="9.html")

    write(9, title_zh="汽车超车", title_en="Car Overtakes", pts=4,
          q_zh="五辆车同向行驶。先是最后一辆超前两辆，再是倒数第二超前两辆，最后中间车超前两辆。现在顺序是？",
          q_en="Five cars. Last overtakes two ahead; then second-last overtakes two; then middle overtakes two. Final order?",
          fig_html='<img class="fig wide" src="assets/q9_figure.png" alt="Q9"/>',
          lab_zh="实验：按题目三步超车，看最终顺序", lab_en="Lab: run the three overtakes; read the final order",
          tip_zh="左边是车队前方。点「下一步」模拟三次超车。",
          tip_en="Left = front of the line. Tap Next for each overtake.",
          body=q9_body, js=q9_js, prev="8.html", nxt="10.html")

    # Update index + answers
    idx = os.path.join(ROOT, "index.html")
    with open(idx, "w", encoding="utf-8") as f:
        links = "\n".join(
            f'<a href="{i}.html">第 {i} 题 · {t}</a>'
            for i, t in [
                (1, "蜜蜂采蜜"), (2, "激光反射"), (3, "硬币网格"), (4, "挪盒子"),
                (5, "袋鼠跳跃"), (6, "数字拼图"), (7, "填等式"), (8, "塔的俯视图"),
                (9, "汽车超车"), (10, "袋鼠年龄"), (11, "明信片推理"), (12, "改一个数"),
                (13, "地毯圆点"), (14, "折纸打孔"), (15, "教室座位"), (16, "白色木块"),
                (17, "形状拼图"), (18, "足球积分"), (19, "蚂蚁爬金字塔"), (20, "路口拼片"),
                (21, "花园绕圈"), (22, "谁吃一样多"), (23, "毛毛虫睡觉"), (24, "彩色格子下的数"),
            ]
        )
        f.write(f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2022 等级 B · 教学动画</title>
<style>
body{{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:#f8f9fa;margin:0;padding:24px;}}
.wrap{{max-width:720px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,.06)}}
h1{{color:#4a90e2}}
a{{display:block;padding:12px 14px;margin:8px 0;border-radius:12px;background:#f0f9ff;border:2px solid #bae6fd;color:#0c4a6e;text-decoration:none;font-weight:700}}
a:hover{{background:#e0f2fe}}
.note{{color:#64748b;font-size:14px;line-height:1.6}}
</style>
</head>
<body>
<div class="wrap">
  <h1>袋鼠数学 2022 · 等级 B（3–4 年级）</h1>
  <p class="note">第 1–24 题互动教学页。学生页不公布答案讲解；教师见 <code>1-24-答案.md</code> / <code>10-24-答案.md</code>。</p>
  {links}
</div>
</body>
</html>
""")
    print("wrote index")

    ans = os.path.join(ROOT, "1-9-答案.md")
    with open(ans, "w", encoding="utf-8") as f:
        f.write("""# 2022 等级 B · 第 1–9 题答案（教师用）

> 学生页不含答案讲解。

| 题 | 答案 | 要点 |
|----|------|------|
| 1 | **A** | 右下各三步：→↓→↓↓→ |
| 2 | **B** | 逐步反射后从下方 B 射出 |
| 3 | **C** | 5×5 格；移 C 到第 4 行第 2 列 |
| 4 | **C**（5） | 书、乐谱、棋盘、毛绒、床上用品 |
| 5 | **E**（12） | 一大两小共 +4，16÷4=4 组 ×3 跳 |
| 6 | **D** | 邻格数字不冲突的唯一块 |
| 7 | **A**（3 和 5） | 左边比右边大 2，故右框比左框大 2 |
| 8 | **C** | 俯视时被挡住的层看不见 |
| 9 | **B**（2,1,3,5,4） | 三次超车模拟 |

互动设计：操作贴合题意；检查只反馈对错，不给解法剧透。
""")
    print("wrote", ans)

    # Fix nav on 10.html prev link
    p10 = os.path.join(ROOT, "10.html")
    if os.path.exists(p10):
        txt = open(p10, encoding="utf-8").read()
        if 'href="9.html"' not in txt:
            txt2 = txt.replace('href="index.html"', 'href="9.html"', 1) if '上一题' in txt else txt
            # try common patterns
            import re
            txt2 = re.sub(
                r'(<a href=")[^"]*(">\s*<span class="lang-zh">← 上一题)',
                r'\g<1>9.html\2',
                txt,
                count=1,
            )
            open(p10, "w", encoding="utf-8").write(txt2)
            print("patched 10.html prev → 9.html")


if __name__ == "__main__":
    main()
