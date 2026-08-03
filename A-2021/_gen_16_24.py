# -*- coding: utf-8 -*-
"""Generate interactive labs for A-2021 Q16–24."""
import os

OUT = r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\A-2021"

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
.fig{display:block;width:100%;max-width:560px;margin:8px auto;border-radius:10px;border:1px solid #e2e8f0}
.fig.sm{max-width:360px}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0;line-height:1.5}
.note{font-size:13px;color:#475569;background:#f1f5f9;border-radius:10px;padding:10px 12px;line-height:1.55;margin:8px 0}
.actions{text-align:center;margin-top:12px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px;font-size:14px}
.submit{background:var(--success);color:#fff}
.reset{background:#6c757d;color:#fff}
.ghost{background:#e2e8f0;color:#334155}
.primary{background:var(--primary);color:#fff}
.pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0}
.card{min-width:64px;padding:12px 14px;border-radius:12px;background:var(--primary);color:#fff;font-weight:800;cursor:pointer;text-align:center;user-select:none}
.card.on{outline:3px solid #f59e0b}
.answer-box{min-width:120px;min-height:52px;border:3px dashed var(--primary);border-radius:14px;margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;background:#fafbfc}
.answer-box.filled{border-style:solid;background:#e8f5e9}
#feedback{text-align:center;font-weight:800;margin-top:12px;min-height:28px}
.ok{color:var(--success)}.bad{color:var(--danger)}
.nav{display:flex;justify-content:space-between;margin-top:8px}
.nav a{color:var(--primary);font-weight:700;text-decoration:none}
.lang-zh{display:block}.lang-en{display:none}
body.en-mode .lang-zh{display:none}body.en-mode .lang-en{display:block}
.info{text-align:center;font-weight:800;min-height:28px;margin:8px 0;color:#0f172a;line-height:1.45}
.row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;align-items:center;margin:8px 0}
"""

JS_COMMON = r"""
function en(){ return document.body.classList.contains('en-mode'); }
function initPool(opts, letters){
  const pool=document.getElementById('pool'); pool.innerHTML='';
  (letters||'ABCDE').split('').forEach((L,i)=>{
    const d=document.createElement('div'); d.className='card'; d.dataset.ans=L;
    const label = Array.isArray(opts)? opts[i] : L;
    d.innerHTML = Array.isArray(opts)? `<div>${L}</div><div style="font-size:12px;opacity:.95">${label}</div>` : L;
    d.onclick=()=>{
      window._ans=L;
      document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
      d.classList.add('on');
      const box=document.getElementById('ansBox');
      box.className='answer-box filled';
      box.textContent = Array.isArray(opts)? `${L}: ${opts[i]}` : L;
      document.getElementById('feedback').textContent='';
    };
    pool.appendChild(d);
  });
}
function checkKey(key, badZh, badEn){
  const fb=document.getElementById('feedback');
  if(!window._ans){ fb.className='bad'; fb.textContent=en()?'❌ Pick an option first.':'❌ 请先选一个选项。'; return; }
  const ok=window._ans===key;
  fb.className=ok?'ok':'bad';
  fb.textContent=ok?(en()?'✅ You found it!':'✅ 找对了！'):(en()?badEn:badZh);
}
function clearAns(){
  window._ans=null;
  const box=document.getElementById('ansBox'); if(box){ box.className='answer-box'; box.textContent=''; }
  const fb=document.getElementById('feedback'); if(fb) fb.textContent='';
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
}
"""


def page(n, title_zh, title_en, pts, problem_zh, problem_en, fig_html, lab_zh, lab_en, lab_body, lab_script, prev_n, next_n, opts=None, key_b64="", bad_zh="", bad_en=""):
    opts_js = "null" if opts is None else repr(opts)
    nav_prev = f'{prev_n}.html' if prev_n else 'index.html'
    nav_next = f'{next_n}.html' if next_n else 'index.html'
    prev_label_zh = '← 上一题' if prev_n else '← 目录'
    next_label_zh = '下一题 →' if next_n else '目录 →'
    prev_label_en = '← Prev' if prev_n else '← Index'
    next_label_en = 'Next →' if next_n else 'Index →'
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2021 A · Q{n} · {title_zh}</title>
<style>
{CSS}
{EXTRA_CSS.get(n,'')}
</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode'); if(window.onLang) onLang();">🌐 English / 中文</button>
<h1 class="lang-zh">{title_zh}</h1>
<h1 class="lang-en">{title_en}</h1>
<div class="meta lang-zh">2021 等级 A · 第 {n} 题 · {pts} 分</div>
<div class="meta lang-en">2021 Level A · Q{n} · {pts} points</div>
<div class="wrap">
  <div class="section">
    <h2 class="lang-zh">题目</h2>
    <h2 class="lang-en">Problem</h2>
    <p class="lang-zh">{problem_zh}</p>
    <p class="lang-en">{problem_en}</p>
    {fig_html}
  </div>
  <div class="section">
    <h2 class="lang-zh">{lab_zh}</h2>
    <h2 class="lang-en">{lab_en}</h2>
    {lab_body}
    <p class="tip lang-zh" style="margin-top:16px">选出你的答案：</p>
    <p class="tip lang-en" style="margin-top:16px">Pick your answer:</p>
    <div class="pool" id="pool"></div>
    <div class="answer-box" id="ansBox"></div>
    <div class="actions">
      <button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
      <div id="feedback"></div>
    </div>
  </div>
  <div class="nav">
    <a href="{nav_prev}"><span class="lang-zh">{prev_label_zh}</span><span class="lang-en">{prev_label_en}</span></a>
    <a href="{nav_next}"><span class="lang-zh">{next_label_zh}</span><span class="lang-en">{next_label_en}</span></a>
  </div>
</div>
<script>
{JS_COMMON}
const KEY=atob('{key_b64}');
const OPTS={opts_js};
function checkAnswer(){{
  checkKey(KEY, {repr(bad_zh)}, {repr(bad_en)});
}}
{lab_script}
initPool(OPTS);
</script>
</body>
</html>
"""


EXTRA_CSS = {
    16: """
.branch{border:2px solid #e2e8f0;border-radius:14px;padding:12px;background:#fafbfc;min-width:200px}
.leaves{display:flex;flex-wrap:wrap;gap:4px;min-height:40px;margin:8px 0;justify-content:center}
.leaf{width:22px;height:28px;background:#22c55e;border-radius:50% 50% 45% 45%;border:1px solid #166534}
.leaf.gone{opacity:.15;background:#94a3b8}
""",
    18: """
.fruit-box{border:2px solid #e2e8f0;border-radius:14px;padding:12px;min-width:220px;background:#fafbfc}
.fruits{display:flex;flex-wrap:wrap;gap:6px;min-height:48px;justify-content:center;margin:8px 0}
.fruit{font-size:28px;line-height:1}
""",
    19: """
.boxes{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}
@media(max-width:640px){.boxes{grid-template-columns:1fr}}
.box{border:3px dashed #94a3b8;border-radius:14px;padding:12px;min-height:120px;background:#f8fafc}
.box h3{margin:0 0 8px;font-size:15px}
.box .sum{font-weight:900;color:#0369a1}
.cards{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0}
.nc{width:48px;height:48px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px;cursor:pointer;border:2px solid #334155;color:#0f172a}
.nc.on{outline:3px solid #f59e0b}
.slot{display:flex;flex-wrap:wrap;gap:6px;min-height:48px}
""",
    21: """
.grid{display:inline-grid;grid-template-columns:auto repeat(2,64px);gap:6px;margin:12px auto}
.cell{width:64px;height:48px;border-radius:10px;border:2px solid #cbd5e1;display:flex;align-items:center;justify-content:center;font-weight:800;cursor:pointer;background:#fff}
.cell.head{border:none;background:transparent;cursor:default;font-size:13px;color:#64748b}
.cell.on{background:#fef3c7;border-color:#f59e0b}
""",
    23: """
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;max-width:520px;margin:12px auto}
.day{border:2px solid #e2e8f0;border-radius:10px;padding:8px 4px;text-align:center;font-size:12px;font-weight:800;background:#fff;min-height:64px}
.day .n{color:#64748b;font-size:11px}
.day .f{font-size:20px;margin-top:4px}
""",
    24: """
.shelf-wrap{max-width:280px;margin:12px auto;border:4px solid #a16207;border-radius:8px;background:#fef3c7;padding:8px}
.shelf{display:flex;align-items:center;gap:8px;border-bottom:3px solid #a16207;padding:8px;min-height:48px}
.shelf .num{font-weight:900;color:#92400e;width:20px}
.shelf .slot{flex:1;min-height:36px;border:2px dashed #d6d3d1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;cursor:pointer;background:#fffbeb}
.shelf .slot.filled{border-style:solid;background:#fff;border-color:#f59e0b}
.toys{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0}
.toy{padding:8px 12px;border-radius:999px;background:#dbeafe;border:2px solid #3b82f6;font-weight:800;cursor:pointer;font-size:13px}
.toy.on{background:#1d4ed8;color:#fff}
.toy.used{opacity:.4}
""",
}


def main():
    pages = []

    # ---- 16 ----
    pages.append(page(
        16, "两根树枝上的叶子", "Leaves on Two Branches", 5,
        "袋鼠中午吃了两根树枝上的叶子。每根树枝上有 <b>10</b> 片叶子。袋鼠先吃掉第一根上的一些叶子，再从第二根上吃掉与第一根剩余叶子同样多的叶子。两根树枝上总共还剩多少片叶子？",
        "The kangaroo had two branches for lunch. Each branch had <b>10</b> leaves. It ate some from the first branch, then from the second ate as many as were left on the first. How many leaves in total were left?",
        "",
        "实验台：先吃第一根，再按规则吃第二根",
        "Lab: eat from branch 1, then match on branch 2",
        """
    <p class="tip lang-zh">用滑块决定第一根吃掉几片；第二根会自动按规则吃掉相同数量。观察「总共还剩」是不是总一样？</p>
    <p class="tip lang-en">Choose how many are eaten from branch 1; branch 2 follows the rule. Watch the total left.</p>
    <div class="row">
      <div class="branch">
        <div class="lang-zh"><b>第一根</b></div><div class="lang-en"><b>Branch 1</b></div>
        <div class="leaves" id="b1"></div>
        <div class="info" id="i1"></div>
        <input id="eat1" type="range" min="0" max="10" value="3" style="width:100%" oninput="syncLeaves()"/>
      </div>
      <div class="branch">
        <div class="lang-zh"><b>第二根</b></div><div class="lang-en"><b>Branch 2</b></div>
        <div class="leaves" id="b2"></div>
        <div class="info" id="i2"></div>
      </div>
    </div>
    <div class="info" id="total"></div>
    <div class="note lang-zh">试几个不同的「第一根吃掉」数量，看看总和有没有变化。</div>
    <div class="note lang-en">Try different amounts eaten from branch 1 — does the total change?</div>
    <div class="actions"><button class="btn reset" onclick="document.getElementById('eat1').value=3;syncLeaves();clearAns()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button></div>
        """,
        """
function paint(el, left){
  el.innerHTML='';
  for(let i=0;i<10;i++){
    const d=document.createElement('div');
    d.className='leaf'+(i>=left?' gone':'');
    el.appendChild(d);
  }
}
function syncLeaves(){
  const eaten1=+document.getElementById('eat1').value;
  const left1=10-eaten1;
  const eaten2=left1; // rule
  const left2=Math.max(0,10-eaten2);
  paint(document.getElementById('b1'), left1);
  paint(document.getElementById('b2'), left2);
  document.getElementById('i1').textContent=en()?`Ate ${eaten1}, left ${left1}`:`吃掉 ${eaten1}，剩 ${left1}`;
  document.getElementById('i2').textContent=en()?`Ate ${eaten2}, left ${left2}`:`吃掉 ${eaten2}，剩 ${left2}`;
  document.getElementById('total').textContent=en()
    ?`Add the two leftovers yourself, then pick below. (Try another slider value!)`
    :`自己把两根「剩下」加起来，再选题。（再拖滑块试几个数！）`;
}
function onLang(){ syncLeaves(); }
syncLeaves();
        """,
        15, 17, [5,6,8,10,15], "RA==",
        "❌ 还不对——多试几个「第一根吃掉」的数量，看总共剩下是不是总一样。",
        "❌ Not yet — try several amounts for branch 1; watch whether the total stays the same.",
    ))

    # ---- 17 ----
    pages.append(page(
        17, "哪块形状没用到", "Which Shape Was Not Used", 5,
        "Mara 用下面五块形状中的四块拼成了正方形。哪一块没有被用到？",
        "Mara built the square by using four of the following five shapes. Which shape was not used?",
        '<img class="fig" src="assets/q17_figure.png" alt="Q17"/>',
        "实验台：点选你认为「没用到」的那一块",
        "Lab: tap the shape you think was not used",
        """
    <p class="tip lang-zh">对照大正方形，想象哪四块能拼进去。把「多余」的那块点亮，再检查。</p>
    <p class="tip lang-en">Compare with the big square. Highlight the leftover shape, then check.</p>
    <div class="row" id="shapePick"></div>
    <div class="info" id="labInfo"></div>
    <div class="actions"><button class="btn reset" onclick="pickShape(null)"><span class="lang-zh">清空选择</span><span class="lang-en">Clear</span></button></div>
        """,
        """
let pick=null;
function pickShape(L){
  pick=L;
  document.querySelectorAll('#shapePick .card').forEach(c=>c.classList.toggle('on', c.dataset.ans===L));
  document.getElementById('labInfo').textContent = L
    ? (en()?`You marked ${L} as unused.`:`你标成没用到：${L}`)
    : (en()?'Tap A–E above the answer pool, or use the buttons here.':'点下面按钮或选项。');
  if(L){ window._ans=L; document.querySelectorAll('#pool .card').forEach(c=>c.classList.toggle('on', c.dataset.ans===L));
    const box=document.getElementById('ansBox'); box.className='answer-box filled'; box.textContent=L; }
  else clearAns();
}
(function(){
  const row=document.getElementById('shapePick');
  'ABCDE'.split('').forEach(L=>{
    const d=document.createElement('div'); d.className='card'; d.dataset.ans=L; d.textContent=L;
    d.onclick=()=>pickShape(L); row.appendChild(d);
  });
  pickShape(null);
})();
        """,
        16, 18, None, "RA==",
        "❌ 还不对——数一数大正方形的格子，再看每块有几格，哪一块拼不进去。",
        "❌ Not yet — count cells in the square and each piece; find which piece does not fit.",
    ))

    # ---- 18 ----
    pages.append(page(
        18, "女巫的苹果和香蕉", "Witch Apples and Bananas", 5,
        "女巫每有 <b>3</b> 个苹果就变成 <b>1</b> 根香蕉；每有 <b>3</b> 根香蕉就变成 <b>1</b> 个苹果。如果开始有 <b>4</b> 个苹果和 <b>5</b> 根香蕉，她最终会剩下什么？",
        "Every time the witch has 3 apples she turns them into 1 banana. Every time she has 3 bananas she turns them into 1 apple. She starts with 4 apples and 5 bananas. What will she finish with?",
        '<img class="fig sm" src="assets/q18_figure.png" alt="Q18"/>',
        "实验台：凑满 3 个就变！",
        "Lab: convert whenever you have 3",
        """
    <p class="tip lang-zh">点按钮变水果。能变就继续变，直到不能再变。</p>
    <p class="tip lang-en">Tap to convert. Keep going until no more moves.</p>
    <div class="row">
      <div class="fruit-box">
        <div class="lang-zh"><b>苹果 🍎 × <span id="na">4</span></b></div>
        <div class="lang-en"><b>Apples 🍎 × <span id="na2">4</span></b></div>
        <div class="fruits" id="apples"></div>
        <button class="btn primary" onclick="convA()"><span class="lang-zh">3 苹果 → 1 香蕉</span><span class="lang-en">3🍎 → 1🍌</span></button>
      </div>
      <div class="fruit-box">
        <div class="lang-zh"><b>香蕉 🍌 × <span id="nb">5</span></b></div>
        <div class="lang-en"><b>Bananas 🍌 × <span id="nb2">5</span></b></div>
        <div class="fruits" id="bananas"></div>
        <button class="btn primary" onclick="convB()"><span class="lang-zh">3 香蕉 → 1 苹果</span><span class="lang-en">3🍌 → 1🍎</span></button>
      </div>
    </div>
    <div class="info" id="fin"></div>
    <div class="actions">
      <button class="btn ghost" onclick="autoAll()"><span class="lang-zh">自动变到不能再变</span><span class="lang-en">Auto until stuck</span></button>
      <button class="btn reset" onclick="resetFruit()"><span class="lang-zh">重置为 4🍎 5🍌</span><span class="lang-en">Reset 4🍎 5🍌</span></button>
    </div>
    <div class="note lang-zh">选项：(A) 1🍌　(B) 1🍎　(C) 1🍎1🍌　(D) 2🍎　(E) 2🍌</div>
    <div class="note lang-en">Choices: (A) 1🍌 (B) 1🍎 (C) 1🍎1🍌 (D) 2🍎 (E) 2🍌</div>
        """,
        """
let A=4,B=5;
function paintF(){
  const ap=document.getElementById('apples'), ba=document.getElementById('bananas');
  ap.innerHTML='🍎'.repeat(A); ba.innerHTML='🍌'.repeat(B);
  document.getElementById('na').textContent=A;
  document.getElementById('na2').textContent=A;
  document.getElementById('nb').textContent=B;
  document.getElementById('nb2').textContent=B;
  document.getElementById('fin').textContent=en()
    ?`Now: ${A} apple(s), ${B} banana(s)`
    :`现在：${A} 个苹果，${B} 根香蕉`;
}
function convA(){ if(A>=3){ A-=3; B+=1; paintF(); } }
function convB(){ if(B>=3){ B-=3; A+=1; paintF(); } }
function autoAll(){
  let guard=20;
  while(guard-- && (A>=3||B>=3)){ if(A>=3) convA(); else convB(); }
}
function resetFruit(){ A=4; B=5; paintF(); clearAns(); }
function onLang(){ paintF(); }
paintF();
        """,
        17, 19, None, "QQ==",
        "❌ 还不对——从 4🍎5🍌 开始，能变就继续变，看最后剩什么。",
        "❌ Not yet — start from 4🍎5🍌 and keep converting until you cannot.",
    ))

    # ---- 19 ----
    pages.append(page(
        19, "两个盒子数字和相等", "Two Boxes Same Sum", 5,
        "把卡片 <b>2、3、4、5、6</b> 放进两个盒子，使两个盒子里数字的和相同。与数字 <b>4</b> 在同一盒子里的数一定是哪个？",
        "Cards 2, 3, 4, 5, 6 go into two boxes with equal sums. Which number must be in the box with 4?",
        "",
        "实验台：把卡片分进两个盒子",
        "Lab: split the cards into two boxes",
        """
    <p class="tip lang-zh">先点卡片，再点盒子放进去。目标和：两盒数字和相等。看看和 4 在一起的是谁。</p>
    <p class="tip lang-en">Tap a card, then a box. Make both box sums equal. What sits with 4?</p>
    <div class="cards" id="cards"></div>
    <div class="boxes">
      <div class="box" id="box1" onclick="drop(1)"><h3 class="lang-zh">盒子 1　和 = <span class="sum" id="s1">0</span></h3><h3 class="lang-en">Box 1　sum = <span class="sum" id="s1b">0</span></h3><div class="slot" id="slot1"></div></div>
      <div class="box" id="box2" onclick="drop(2)"><h3 class="lang-zh">盒子 2　和 = <span class="sum" id="s2">0</span></h3><h3 class="lang-en">Box 2　sum = <span class="sum" id="s2b">0</span></h3><div class="slot" id="slot2"></div></div>
    </div>
    <div class="info" id="boxInfo"></div>
    <div class="actions"><button class="btn reset" onclick="resetBoxes()"><span class="lang-zh">清空盒子</span><span class="lang-en">Clear boxes</span></button></div>
        """,
        """
const NUMS=[2,3,4,5,6];
const COLORS={2:'#ddd6fe',3:'#fef08a',4:'#f1f5f9',5:'#bbf7d0',6:'#bae6fd'};
let hand=null, b1=[], b2=[];
function renderCards(){
  const used=new Set([...b1,...b2]);
  const el=document.getElementById('cards'); el.innerHTML='';
  NUMS.forEach(n=>{
    const d=document.createElement('div'); d.className='nc'+(hand===n?' on':'');
    d.style.background=COLORS[n]; d.style.opacity=used.has(n)?.35:1;
    d.textContent=n;
    d.onclick=()=>{ if(used.has(n)) return; hand=n; renderCards(); };
    el.appendChild(d);
  });
  paintSlots();
}
function paintSlots(){
  const paint=(id,arr)=>{
    const s=document.getElementById(id); s.innerHTML='';
    arr.forEach(n=>{
      const d=document.createElement('div'); d.className='nc'; d.style.background=COLORS[n]; d.textContent=n;
      d.onclick=(e)=>{ e.stopPropagation(); if(id==='slot1') b1=b1.filter(x=>x!==n); else b2=b2.filter(x=>x!==n); renderCards(); };
      s.appendChild(d);
    });
  };
  paint('slot1',b1); paint('slot2',b2);
  const s1=b1.reduce((a,b)=>a+b,0), s2=b2.reduce((a,b)=>a+b,0);
  document.getElementById('s1').textContent=s1; document.getElementById('s1b').textContent=s1;
  document.getElementById('s2').textContent=s2; document.getElementById('s2b').textContent=s2;
  const eq=s1===s2 && b1.length+b2.length===5 && s1>0;
  let msg='';
  if(eq){
    const with4 = (b1.includes(4)?b1:b2).filter(x=>x!==4);
    msg = en()?`Sums equal (${s1}). With 4: ${with4.join(', ')||'(alone)'}`:`两盒和相等（${s1}）。与 4 同盒：${with4.join('、')||'（只有4）'}`;
  } else {
    msg = en()?'Make both sums equal and use all 5 cards.':'用完 5 张卡，让两盒和相等。';
  }
  document.getElementById('boxInfo').textContent=msg;
}
function drop(which){
  if(hand==null) return;
  if(b1.includes(hand)||b2.includes(hand)) return;
  if(which===1) b1.push(hand); else b2.push(hand);
  hand=null; renderCards();
}
function resetBoxes(){ hand=null; b1=[]; b2=[]; renderCards(); clearAns(); }
function onLang(){ paintSlots(); }
renderCards();
        """,
        18, 20,
        ["only 3", "only 5", "only 6", "only 5 or 6", "impossible"],
        "Qw==",
        "❌ 还不对——总和是 20，每盒应是 10；想想和 4 凑成 10 只能配谁。",
        "❌ Not yet — total is 20 so each box is 10; what pairs with 4 to make 10?",
    ))

    # ---- 20 ----
    pages.append(page(
        20, "两个齿轮的黑齿", "Two Cogs Black Teeth", 5,
        "图中有两个齿轮，每个都有一颗黑齿。小齿轮完整转一圈后，两颗黑齿会在什么位置？",
        "The picture shows two cogs, each with a black tooth. Where will the black teeth be after the small cog has made one full turn?",
        '<img class="fig" src="assets/q20_figure.png" alt="Q20"/>',
        "实验台：想一想「转一圈」意味着什么",
        "Lab: what does one full turn mean?",
        """
    <p class="tip lang-zh">小齿轮转完整一圈：它自己的黑齿回到原位；大齿轮会被带动转过「小齿轮的齿数」那么多齿。</p>
    <p class="tip lang-en">One full turn of the small cog: its black tooth returns; the big cog advances by the small cog’s tooth count.</p>
    <div class="note lang-zh">数一数图里小齿轮有几颗齿，大齿轮转过这么多齿后黑齿在哪，再对照选项 A–E。</div>
    <div class="note lang-en">Count teeth on the small cog; move the big black tooth that many steps; match A–E.</div>
    <div class="info" id="cogInfo"></div>
    <div class="row">
      <button class="btn primary" onclick="nudge(+1)"><span class="lang-zh">大齿轮黑齿 +1 步</span><span class="lang-en">Big black tooth +1</span></button>
      <button class="btn ghost" onclick="nudge(-1)">−1</button>
      <button class="btn reset" onclick="steps=0;showCog()"><span class="lang-zh">清零步数</span><span class="lang-en">Reset steps</span></button>
    </div>
        """,
        """
let steps=0;
const SMALL=10; // typical from figure; student can recount
function showCog(){
  document.getElementById('cogInfo').textContent=en()
    ?`You moved the big cog's black tooth ${steps} step(s). (One full small turn ≈ ${SMALL} teeth — check the figure!)`
    :`你把大齿轮黑齿挪了 ${steps} 步。（小齿轮转一圈约带动 ${SMALL} 齿——请对照原图数一数！）`;
}
function nudge(d){ steps=Math.max(0,steps+d); showCog(); }
function onLang(){ showCog(); }
showCog();
        """,
        19, 21, None, "Qw==",
        "❌ 还不对——小齿轮转一圈后自己黑齿回原位；大齿轮转过的齿数=小齿轮的齿数。",
        "❌ Not yet — after one full small turn, its black tooth is back; big cog moves by the small tooth count.",
    ))

    # ---- 21 ----
    pages.append(page(
        21, "跳舞配对分钟数", "Dance Pairs Minutes", 5,
        "三个女孩和两个男孩跳舞。他们两人一对，每个女孩与每个男孩都正好跳一分钟。任意时刻场上只有一对。他们一共跳了多少分钟？",
        "Three girls and two boys danced in pairs so each girl danced with each boy for exactly one minute. Only one pair at a time. For how many minutes did they dance?",
        "",
        "实验台：点亮每一对「女孩×男孩」",
        "Lab: light every girl×boy pair",
        """
    <p class="tip lang-zh">每点亮一格 = 跳了 1 分钟。把所有配对都点亮，再数分钟数。</p>
    <p class="tip lang-en">Each lit cell = 1 minute. Light all pairs, then count.</p>
    <div style="text-align:center"><div class="grid" id="dance"></div></div>
    <div class="info" id="danceInfo"></div>
    <div class="actions">
      <button class="btn ghost" onclick="fillAll()"><span class="lang-zh">点亮全部配对</span><span class="lang-en">Light all pairs</span></button>
      <button class="btn reset" onclick="resetDance()"><span class="lang-zh">清空</span><span class="lang-en">Clear</span></button>
    </div>
        """,
        """
const G=['👧1','👧2','👧3'], B=['👦1','👦2'];
let on=Array.from({length:3},()=>[false,false]);
function renderDance(){
  const g=document.getElementById('dance'); g.innerHTML='';
  const corner=document.createElement('div'); corner.className='cell head'; g.appendChild(corner);
  B.forEach(b=>{ const h=document.createElement('div'); h.className='cell head'; h.textContent=b; g.appendChild(h); });
  for(let i=0;i<3;i++){
    const h=document.createElement('div'); h.className='cell head'; h.textContent=G[i]; g.appendChild(h);
    for(let j=0;j<2;j++){
      const c=document.createElement('div'); c.className='cell'+(on[i][j]?' on':''); c.textContent=on[i][j]?'✓':'';
      c.onclick=()=>{ on[i][j]=!on[i][j]; renderDance(); };
      g.appendChild(c);
    }
  }
  const n=on.flat().filter(Boolean).length;
  document.getElementById('danceInfo').textContent=en()?`Lit pairs: ${n} → ${n} minute(s)`:`已点亮 ${n} 对 → ${n} 分钟`;
}
function fillAll(){ on=on.map(r=>r.map(()=>true)); renderDance(); }
function resetDance(){ on=Array.from({length:3},()=>[false,false]); renderDance(); clearAns(); }
function onLang(){ renderDance(); }
renderDance();
        """,
        20, 22, [5,6,8,9,10], "Qg==",
        "❌ 还不对——每个女孩都要和每个男孩跳一次，场上每次只有一对。",
        "❌ Not yet — every girl with every boy, one pair at a time.",
    ))

    # ---- 22 ----
    pages.append(page(
        22, "饼干烤盘", "Cookie Trays", 5,
        "每位参赛者烤出一盘如图所示的饼干。要摆成下面的盘子，最少需要几盘饼干？",
        "Each participant baked one tray like the one shown. What is the smallest number of trays needed to make the plate below?",
        '<img class="fig sm" src="assets/q22_tray.png" alt="tray"/><img class="fig" src="assets/q22_plate.png" alt="plate"/>',
        "实验台：数一数每种饼干「一盘有几块 / 盘子要几块」",
        "Lab: count each cookie type on tray vs plate",
        """
    <p class="tip lang-zh">对照原图：找出盘子上需求最多、而一盘里最少的那种饼干——它决定最少盘数。</p>
    <p class="tip lang-en">Compare the figures: the type that is rarest on a tray but needed on the plate sets the minimum trays.</p>
    <div class="note lang-zh">在纸上或心里列：每种饼干「盘子需要几个 ÷ 一盘有几个」，向上取整后取最大。</div>
    <div class="note lang-en">For each type: ceil(needed on plate ÷ per tray), then take the max.</div>
    <div class="info lang-zh">数清楚后再选 1–5。</div>
    <div class="info lang-en">Count carefully, then pick 1–5.</div>
        """,
        "",
        21, 23, [1,2,3,4,5], "Qw==",
        "❌ 还不对——找一盘里最少的那种饼干，盘子上却要好几个。",
        "❌ Not yet — find the cookie type that is scarcest on one tray but needed several times on the plate.",
    ))

    # ---- 23 ----
    pages.append(page(
        23, "两周吃的水果", "Kangie’s Fruit in Two Weeks", 5,
        "Kangie 在周一、周三、周五只吃苹果；周二、周四只吃芒果。他每天要么吃 <b>2</b> 个苹果，要么吃 <b>3</b> 个芒果。周六周日不吃。两周里他一共吃了多少个水果？",
        "Kangie eats only apples Mon/Wed/Fri (2 each day) and only mangoes Tue/Thu (3 each day). Nothing on weekends. How many pieces in two weeks?",
        "",
        "实验台：先排一周日历，再乘 2",
        "Lab: fill one week, then ×2",
        """
    <p class="tip lang-zh">下面是一周。已按规则放好水果，把每天数量加起来，再想两周。</p>
    <p class="tip lang-en">One week is filled by the rules. Sum the week, then think about two weeks.</p>
    <div class="cal" id="cal"></div>
    <div class="info" id="weekSum"></div>
    <div class="actions">
      <button class="btn primary" onclick="showWeek()"><span class="lang-zh">显示一周合计</span><span class="lang-en">Show week total</span></button>
      <button class="btn ghost" onclick="document.getElementById('weekSum').textContent=en()?'Now double for two weeks — pick below.':'两周就是再乘 2——下面选题。'"><span class="lang-zh">提示：两周怎么算</span><span class="lang-en">Hint: two weeks</span></button>
    </div>
        """,
        """
const DAYS=[
  {zh:'一',en:'Mon',f:'🍎🍎',n:2},
  {zh:'二',en:'Tue',f:'🥭🥭🥭',n:3},
  {zh:'三',en:'Wed',f:'🍎🍎',n:2},
  {zh:'四',en:'Thu',f:'🥭🥭🥭',n:3},
  {zh:'五',en:'Fri',f:'🍎🍎',n:2},
  {zh:'六',en:'Sat',f:'—',n:0},
  {zh:'日',en:'Sun',f:'—',n:0},
];
function renderCal(){
  const c=document.getElementById('cal'); c.innerHTML='';
  DAYS.forEach(d=>{
    const el=document.createElement('div'); el.className='day';
    el.innerHTML=`<div class="n">${en()?d.en:('周'+d.zh)}</div><div class="f">${d.f}</div><div>${d.n||''}</div>`;
    c.appendChild(el);
  });
}
function showWeek(){
  document.getElementById('weekSum').textContent=en()
    ?`Add Mon–Fri yourself (Sat/Sun=0), then think about two weeks.`
    :`自己把周一到周五加起来（六日为 0），再想两周。`;
}
function onLang(){ renderCal(); }
renderCal();
        """,
        22, 24, [12,16,18,20,24], "RQ==",
        "❌ 还不对——先算一周（3天苹果+2天芒果），再乘 2。",
        "❌ Not yet — total one week (3 apple days + 2 mango days), then ×2.",
    ))

    # ---- 24 ----
    pages.append(page(
        24, "书架上的玩具", "Toys on Shelves", 5,
        "Stan 有五个玩具：球、积木、游戏、拼图和汽车。每个放在不同一层。球比积木高，比汽车低。游戏紧挨在球的上面。拼图不可能放在第几层？（图中 <b>1 在最下，5 在最上</b>）",
        "Five toys on different shelves: ball, blocks, game, puzzle, car. Ball higher than blocks and lower than car. Game is directly above the ball. On which shelf can the puzzle not be placed? (Shelf <b>1 bottom, 5 top</b>)",
        '<img class="fig sm" src="assets/q24_shelf.png" alt="shelves"/>',
        "实验台：把玩具摆上架，看拼图能不能放某层",
        "Lab: place toys — which shelf is impossible for the puzzle?",
        """
    <p class="tip lang-zh">先点玩具，再点架子层。规则：游戏必须在球的正上方一层；汽车比球高；积木比球低。</p>
    <p class="tip lang-en">Tap a toy, then a shelf. Rules: game directly above ball; car above ball; blocks below ball.</p>
    <div class="toys" id="toys"></div>
    <div class="shelf-wrap" id="shelves"></div>
    <div class="info" id="shelfInfo"></div>
    <div class="actions"><button class="btn reset" onclick="resetShelf()"><span class="lang-zh">清空架子</span><span class="lang-en">Clear shelves</span></button></div>
        """,
        """
const TOYS=['🚗汽车','🎮游戏','⚽球','🧩拼图','🧱积木'];
const TOY_EN=['🚗 car','🎮 game','⚽ ball','🧩 puzzle','🧱 blocks'];
const ID=['car','game','ball','puzzle','blocks'];
let hand=null, shelf=[null,null,null,null,null]; // index 0=shelf1 bottom
function renderShelf(){
  const tw=document.getElementById('toys'); tw.innerHTML='';
  const used=new Set(shelf.filter(Boolean));
  ID.forEach((id,i)=>{
    const d=document.createElement('div');
    d.className='toy'+(hand===id?' on':'')+(used.has(id)?' used':'');
    d.textContent=en()?TOY_EN[i]:TOYS[i];
    d.onclick=()=>{ if(used.has(id)) return; hand=id; renderShelf(); };
    tw.appendChild(d);
  });
  const sw=document.getElementById('shelves'); sw.innerHTML='';
  for(let level=5; level>=1; level--){ // draw top to bottom
    const idx=level-1;
    const row=document.createElement('div'); row.className='shelf';
    const num=document.createElement('div'); num.className='num'; num.textContent=level;
    const slot=document.createElement('div'); slot.className='slot'+(shelf[idx]?' filled':'');
    const ti=ID.indexOf(shelf[idx]);
    slot.textContent=shelf[idx]?(en()?TOY_EN[ti]:TOYS[ti]):'';
    slot.onclick=()=>{
      if(hand){ // place
        const old=shelf.indexOf(hand); if(old>=0) shelf[old]=null;
        shelf[idx]=hand; hand=null;
      } else if(shelf[idx]){ hand=shelf[idx]; shelf[idx]=null; }
      renderShelf();
    };
    row.appendChild(num); row.appendChild(slot); sw.appendChild(row);
  }
  document.getElementById('shelfInfo').textContent=checkRules();
}
function checkRules(){
  const pos={}; ID.forEach(id=>{ const i=shelf.indexOf(id); if(i>=0) pos[id]=i+1; });
  if(Object.keys(pos).length<5) return en()?'Place all 5 toys.':'把 5 个玩具都摆上。';
  const ok = pos.ball>pos.blocks && pos.ball<pos.car && pos.game===pos.ball+1;
  if(!ok) return en()?'Arrangement breaks a rule — try again.':'这样摆不符合规则，再试试。';
  return en()?`Valid! Puzzle is on shelf ${pos.puzzle}.`:`符合规则！拼图在第 ${pos.puzzle} 层。`;
}
function resetShelf(){ hand=null; shelf=[null,null,null,null,null]; renderShelf(); clearAns(); }
function onLang(){ renderShelf(); }
renderShelf();
        """,
        23, None, [1,2,3,4,5], "Qw==",
        "❌ 还不对——游戏必须紧挨在球上面；试试所有合法摆法，看拼图永远去不了哪一层。",
        "❌ Not yet — game is directly above ball; try all valid layouts and see which shelf puzzle never gets.",
    ))

    for html, n in zip(pages, range(16, 25)):
        path = os.path.join(OUT, f"{n}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", path)

    # teacher answers
    ans = """# 2021 等级 A · 第 16–24 题（教师用）

学生页面不公布选项字母。

| 题号 | 答案 | 要点 |
|------|------|------|
| 16 | **D（10）** | 第一根剩 x，第二根再吃 x，共剩 x+(10−x)=10，与 x 无关 |
| 17 | **D** | 四块拼满正方形，D 块用不上 |
| 18 | **A（1🍌）** | 4🍎5🍌 → 变：1🍎+1🍌+1🍌(由3🍎)… 最终只剩 1 香蕉（按规则推演） |
| 19 | **C（只能是 6）** | 总和 20，每盒 10；与 4 同盒只能是 6 |
| 20 | **C** | 小齿轮转一圈黑齿回原位；大齿轮转过小齿轮齿数后的黑齿位置 |
| 21 | **B（6）** | 3×2=6 对，每对 1 分钟 |
| 22 | **C（3）** | 由「一盘最少的那种饼干」与盘子需求决定最少盘数 |
| 23 | **E（24）** | 一周 3×2+2×3=12，两周 24 |
| 24 | **C（3）** | 1 最下 5 最上；游戏=球+1；合法摆法中拼图永远不在第 3 层 |

来源：`2021 等级1：1-2年级.pdf`
"""
    with open(os.path.join(OUT, "16-24-答案.md"), "w", encoding="utf-8") as f:
        f.write(ans)
    print("answers ok")


if __name__ == "__main__":
    main()
