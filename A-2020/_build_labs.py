# -*- coding: utf-8 -*-
"""Generate A-2020 interactive lab HTML pages + index + answer keys."""
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))

CSS = r"""
:root{--primary:#0ea5e9;--success:#2ec4b6;--danger:#e71d36;--bg:#f0f9ff;--dark:#0c4a6e}
*{box-sizing:border-box}
body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:radial-gradient(circle at top,#e0f2fe,var(--bg));color:#0f172a;margin:0;padding:20px;display:flex;flex-direction:column;align-items:center}
.lang-toggle-btn{position:fixed;top:20px;right:20px;background:var(--dark);color:#fff;border:none;padding:10px 18px;border-radius:20px;cursor:pointer;font-weight:bold;z-index:1000}
h1{text-align:center;color:var(--primary);margin:8px 0;font-size:22px}
.meta{color:#64748b;font-size:14px;margin-bottom:14px}
.wrap{max-width:920px;width:100%}
.section{background:#fff;padding:20px;border-radius:14px;box-shadow:0 8px 20px rgba(14,165,233,.1);margin-bottom:16px}
h2{color:var(--primary);border-left:5px solid var(--primary);padding-left:10px;margin:0 0 10px;font-size:18px}
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
.row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;align-items:center;margin:8px 0}
.stage{border:2px solid #bae6fd;border-radius:14px;background:#f8fafc;padding:12px;margin:10px auto;max-width:560px}
.fig{display:block;width:100%;max-width:520px;margin:8px auto;border-radius:10px;border:1px solid #e2e8f0}
"""


def enc(letter: str) -> str:
    return base64.b64encode(letter.encode()).decode()


def page(q, title_zh, title_en, pts, prev_h, next_h, problem_zh, problem_en, lab_zh, lab_en, lab_body, choices, ans_letter, extra_js=""):
    labels = choices  # list of display strings for A-E
    letters = "ABCDE"
    cards = "".join(
        f'<div class="card" data-v="{letters[i]}" onclick="pick(this)">{labels[i]}</div>'
        for i in range(5)
    )
    nav_prev = f'<a href="{prev_h}">← Prev</a>' if prev_h else "<span></span>"
    nav_next = f'<a href="{next_h}">Next →</a>' if next_h else '<a href="index.html">Index</a>'
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2020 A · Q{q} · {title_zh}</title>
<style>{CSS}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 English / 中文</button>
<h1 class="lang-zh">{title_zh}</h1>
<h1 class="lang-en">{title_en}</h1>
<div class="meta lang-zh">2020 等级 A · 第 {q} 题 · {pts} 分</div>
<div class="meta lang-en">2020 Level A · Q{q} · {pts} points</div>
<div class="wrap">
  <div class="section">
    <h2 class="lang-zh">题目</h2>
    <h2 class="lang-en">Problem</h2>
    <p class="lang-zh">{problem_zh}</p>
    <p class="lang-en">{problem_en}</p>
  </div>
  <div class="section">
    <h2 class="lang-zh">{lab_zh}</h2>
    <h2 class="lang-en">{lab_en}</h2>
    {lab_body}
    <p class="tip lang-zh" style="margin-top:16px">想好后选出答案（检查只提示对错）：</p>
    <p class="tip lang-en" style="margin-top:16px">Then pick an answer (Check only says right/wrong):</p>
    <div class="pool" id="pool">{cards}</div>
    <div class="answer-box" id="ansBox"></div>
    <div class="actions">
      <button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
      <button class="btn reset" onclick="location.reload()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button>
      <div id="feedback"></div>
    </div>
  </div>
  <div class="nav">{nav_prev}{nav_next}</div>
</div>
<script>
const KEY=atob('{enc(ans_letter)}');
let picked=null;
function pick(el){{
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  picked=el.dataset.v;
  const box=document.getElementById('ansBox');
  box.textContent=el.textContent.trim();
  box.classList.add('filled');
  document.getElementById('feedback').textContent='';
}}
function checkAnswer(){{
  const fb=document.getElementById('feedback');
  if(!picked){{ fb.className='bad'; fb.innerHTML='<span class="lang-zh">先选一个选项</span><span class="lang-en">Pick an option first</span>'; return; }}
  if(picked===KEY){{ fb.className='ok'; fb.innerHTML='<span class="lang-zh">正确！</span><span class="lang-en">Correct!</span>'; }}
  else {{ fb.className='bad'; fb.innerHTML='<span class="lang-zh">再试试</span><span class="lang-en">Try again</span>'; }}
}}
{extra_js}
</script>
</body>
</html>
"""


PAGES = []

# Q1 stairs
PAGES.append((
    "1.html",
    page(
        1, "楼梯上见面", "Meeting on the Stairs", 3, "index.html", "4.html",
        "图中的袋鼠每向上跳 <b>3</b> 层楼梯，兔子就会向下跳 <b>2</b> 层。请问它们会在哪一层见面？",
        "The kangaroo goes up <b>3</b> steps each time the rabbit goes down <b>2</b> steps. On which step do they meet?",
        "实验台：按步跳，看它们何时碰面",
        "Lab: step them and watch where they meet",
        """
    <p class="tip lang-zh">点「同时跳一步」：袋鼠上 3，兔子下 2。数它们站在哪一层。</p>
    <p class="tip lang-en">Tap Step: kangaroo +3, rabbit −2. Watch their floors.</p>
    <div class="stage" id="stairs"></div>
    <div class="info" id="posInfo"></div>
    <div class="actions">
      <button class="btn primary" onclick="stepOnce()"><span class="lang-zh">同时跳一步</span><span class="lang-en">Step once</span></button>
      <button class="btn ghost" onclick="resetStairs()"><span class="lang-zh">回到起点</span><span class="lang-en">Back to start</span></button>
    </div>
        """,
        ["3", "4", "5", "6", "7"], "D",
        r"""
const MAX=7; let k=0, r=7, steps=0;
function draw(){
  const el=document.getElementById('stairs');
  let html='<div style="display:flex;flex-direction:column-reverse;gap:4px;align-items:stretch">';
  for(let i=1;i<=MAX;i++){
    const onK=k===i, onR=r===i;
    html+=`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:8px;background:${onK||onR?'#fef3c7':'#fff'};border:1px solid #e2e8f0">
      <b style="width:28px">#${i}</b>
      <span style="flex:1">${onK?'🦘':''} ${onR?'🐇':''} ${onK&&onR?'<b style="color:#ea580c">MEET</b>':''}</span>
    </div>`;
  }
  html+='</div>';
  el.innerHTML=html;
  const zh=document.body.classList.contains('en-mode')?0:1;
  document.getElementById('posInfo').textContent = zh
    ? `第 ${steps} 次同步后：袋鼠在 ${k||'起点下'}，兔子在 ${r}`
    : `After ${steps} sync move(s): kangaroo at ${k||'below'}, rabbit at ${r}`;
}
function stepOnce(){ if(k>=MAX&&r<=1) return; k=Math.min(MAX,k+3); r=Math.max(1,r-2); steps++; draw(); }
function resetStairs(){ k=0; r=7; steps=0; draw(); }
resetStairs();
"""
    )
))

# Q4 pattern
PAGES.append((
    "4.html",
    page(
        4, "玩具规律", "Toy Pattern", 3, "1.html", "6.html",
        "小丹把玩具按顺序排成一行，每五个玩具为一组循环。请问接下来是哪两个玩具？",
        "Danial arranges toys in a repeating five-toy pattern. Which two toys come next?",
        "实验台：点出循环，预测下一对",
        "Lab: mark the cycle, predict the next pair",
        """
    <p class="tip lang-zh">下面用字母代表五种玩具。完整循环是 <b>A B C D E</b>。已摆出一段，点「下一个」看后面是谁。</p>
    <p class="tip lang-en">Letters stand for five toys. Cycle: <b>A B C D E</b>. Tap Next to reveal what follows.</p>
    <div class="stage"><div class="row" id="seq" style="font-size:22px;font-weight:800;letter-spacing:4px"></div></div>
    <div class="info" id="hint"></div>
    <div class="actions">
      <button class="btn primary" onclick="reveal()"><span class="lang-zh">显示下一个</span><span class="lang-en">Reveal next</span></button>
      <button class="btn ghost" onclick="resetSeq()"><span class="lang-zh">重来</span><span class="lang-en">Reset</span></button>
    </div>
    <p class="note lang-zh">真题图中五种玩具外观不同；规律是每 5 个重复。对照选项找「接下来的两个」。</p>
    <p class="note lang-en">Real toys look different; the rule is a 5-cycle. Match the next two toys in the options.</p>
        """,
        ["A", "B", "C", "D", "E"], "E",
        r"""
const cycle=['A','B','C','D','E'];
let shown=7; // show first 7 of infinite cycle
function paint(){
  const arr=[]; for(let i=0;i<shown;i++) arr.push(cycle[i%5]);
  document.getElementById('seq').textContent=arr.join(' ');
  document.getElementById('hint').textContent= document.body.classList.contains('en-mode')
    ? `Shown ${shown} toys. Next two would be: ${cycle[shown%5]} ${cycle[(shown+1)%5]}`
    : `已显示 ${shown} 个。接下来两个是：${cycle[shown%5]} ${cycle[(shown+1)%5]}`;
}
function reveal(){ shown++; paint(); }
function resetSeq(){ shown=7; paint(); }
paint();
"""
    )
))

# Q6 cubes
PAGES.append((
    "6.html",
    page(
        6, "看不见的灰方块", "Hidden Grey Cubes", 3, "4.html", "12.html",
        "小丽用一些白方块和 <b>14</b> 个灰方块拼成形状。图中还有多少个灰色正方体是看不见的？",
        "Mary used some white cubes and <b>14</b> grey cubes. How many grey cubes cannot be seen in the picture?",
        "实验台：先数看得见的，再用 14 减",
        "Lab: count visible greys, then 14 − visible",
        """
    <p class="tip lang-zh">点格子标记「我看见的灰块」。总数固定 14，看不见 = 14 − 看见。</p>
    <p class="tip lang-en">Tap cells you can see as grey. Hidden = 14 − visible.</p>
    <div class="stage">
      <div class="row"><label class="lang-zh">看得见的灰块：</label><label class="lang-en">Visible greys:</label>
        <input id="vis" type="number" min="0" max="14" value="8" style="width:70px;font-size:18px;font-weight:800;padding:6px"/>
      </div>
      <div class="info" id="hid"></div>
    </div>
    <div class="actions"><button class="btn primary" onclick="calc()"><span class="lang-zh">计算看不见</span><span class="lang-en">Compute hidden</span></button></div>
    <img class="fig" src="assets/page_03.png" alt="Q5-Q6 page"/>
        """,
        ["1", "3", "5", "6", "8"], "D",
        r"""
function calc(){
  const v=+document.getElementById('vis').value||0;
  const h=Math.max(0,14-v);
  document.getElementById('hid').textContent=document.body.classList.contains('en-mode')
    ? `Hidden (if visible=${v}): ${h}` : `若看得见 ${v} 个，则看不见 ${h} 个`;
}
calc();
"""
    )
))

# Q12 flowers
PAGES.append((
    "12.html",
    page(
        12, "被挡住的花瓣", "Hidden Flower Petal", 4, "6.html", "14.html",
        "两朵花的花瓣上写有数字，一片被挡住。两朵花数字之和相等。被挡住的花瓣是几？",
        "Two flowers have numbers on petals; one petal is hidden. The sums are equal. What number is on the hidden petal?",
        "实验台：分别加总，求出缺的数",
        "Lab: sum each flower, find the missing number",
        """
    <p class="tip lang-zh">把两朵花能看见的数字分别加起来，用「和相等」求出挡住的数。</p>
    <p class="tip lang-en">Add visible petals on each flower; equal totals reveal the hidden number.</p>
    <div class="row">
      <div class="stage" style="min-width:200px">
        <div class="lang-zh"><b>花 A 可见和</b></div><div class="lang-en"><b>Flower A visible sum</b></div>
        <input id="sa" type="number" value="25" style="width:100%;font-size:20px;font-weight:800;margin-top:8px;padding:8px"/>
      </div>
      <div class="stage" style="min-width:200px">
        <div class="lang-zh"><b>花 B 可见和</b></div><div class="lang-en"><b>Flower B visible sum</b></div>
        <input id="sb" type="number" value="18" style="width:100%;font-size:20px;font-weight:800;margin-top:8px;padding:8px"/>
      </div>
    </div>
    <div class="info" id="miss"></div>
    <div class="actions"><button class="btn primary" onclick="diff()"><span class="lang-zh">求被挡花瓣</span><span class="lang-en">Find hidden</span></button></div>
    <img class="fig" src="assets/q12_crop.png" alt="flowers"/>
        """,
        ["0", "3", "5", "7", "1"], "D",
        r"""
function diff(){
  const a=+document.getElementById('sa').value, b=+document.getElementById('sb').value;
  const m=a-b;
  document.getElementById('miss').textContent=document.body.classList.contains('en-mode')
    ? `If A total = B total and hidden is on B: hidden = ${m}`
    : `若 A 总和 = B 总和，且挡住在 B：被挡数字 = ${m}`;
}
diff();
"""
    )
))

# Q14 blue yellow
PAGES.append((
    "14.html",
    page(
        14, "蓝格与黄格", "Blue and Yellow Squares", 4, "12.html", "16.html",
        "把 1–6 填进六个方格（各不相同）。蓝格数字之和与黄格数字之和都为 10。问号格必须是几？",
        "Fill 1–6 in six squares (all different). Blue sum and yellow sum are both 10. What must go in the ? square?",
        "实验台：先不算具体填法，用总和推理",
        "Lab: reason from totals first",
        """
    <p class="tip lang-zh">1+2+3+4+5+6 = <b>21</b>。蓝 + 黄 = 10+10 = <b>20</b>。剩下那一格（问号）是？</p>
    <p class="tip lang-en">1+…+6=<b>21</b>. Blue+Yellow=20. What is left for ?</p>
    <div class="stage">
      <div class="info" id="calc14"></div>
      <button class="btn primary" onclick="show14()"><span class="lang-zh">显示推理</span><span class="lang-en">Show reasoning</span></button>
    </div>
        """,
        ["1", "2", "3", "4", "5"], "A",
        r"""
function show14(){
  document.getElementById('calc14').textContent=document.body.classList.contains('en-mode')
    ? '21 − 20 = 1 → the ? square must be 1'
    : '21 − 20 = 1 → 问号格必须是 1';
}
"""
    )
))

# Q16 cookies
PAGES.append((
    "16.html",
    page(
        16, "再多烤几块饼干", "Extra Cookies", 4, "14.html", "18.html",
        "祖母烤了 12 块饼干，要平均分给 5 个孙子。还需要再多烤几块？",
        "Grandmother baked 12 cookies and wants to share equally among 5 grandchildren. How many more should she bake?",
        "实验台：试加几块，看能否被 5 整除",
        "Lab: try adding until divisible by 5",
        """
    <p class="tip lang-zh">拖动「再烤」的数量，看总数能否平均分成 5 份。</p>
    <p class="tip lang-en">Slide how many extra to bake; check equal shares for 5.</p>
    <div class="stage">
      <input id="extra" type="range" min="0" max="4" value="0" style="width:100%" oninput="cook()"/>
      <div class="info" id="cookInfo"></div>
    </div>
        """,
        ["0", "1", "2", "3", "4"], "D",
        r"""
function cook(){
  const e=+document.getElementById('extra').value;
  const t=12+e;
  const ok=t%5===0;
  document.getElementById('cookInfo').innerHTML=document.body.classList.contains('en-mode')
    ? `Bake +${e} → total ${t}. Each gets ${ok?t/5:'?'}. ${ok?'Equal shares!':'Not divisible by 5.'}`
    : `再烤 ${e} → 共 ${t}。每人 ${ok?t/5:'?'} 块。${ok?'可以均分！':'不能被 5 整除。'}`;
}
cook();
"""
    )
))

# Q18 trains
PAGES.append((
    "18.html",
    page(
        18, "相对的车厢", "Opposite Train Cars", 5, "16.html", "20.html",
        "两列相同火车各 31 节，对开。当两列的 19 号相对时，几号与 12 号相对？",
        "Two identical 31-car trains travel opposite ways. When car 19 faces car 19, which car faces car 12?",
        "实验台：相对车厢号之和不变",
        "Lab: opposite car numbers share a constant sum",
        """
    <p class="tip lang-zh">19 对 19 时，相对号之和 = 19+19。与 12 相对的号码 = 这个和 − 12。</p>
    <p class="tip lang-en">When 19 faces 19, opposite pairs sum to 38. Facing 12: 38−12.</p>
    <div class="stage">
      <div class="info" id="tr"></div>
      <button class="btn primary" onclick="train()"><span class="lang-zh">计算</span><span class="lang-en">Compute</span></button>
    </div>
    <div class="note lang-zh">也可画两列：一列 1→31，另一列反向对齐，使 19 对齐 19。</div>
    <div class="note lang-en">Or sketch both trains aligned so 19 matches 19.</div>
        """,
        ["7", "12", "21", "26", "31"], "D",
        r"""
function train(){
  const s=19+19;
  document.getElementById('tr').textContent=document.body.classList.contains('en-mode')
    ? `Pair sum = ${s}. Opposite 12 → ${s-12}`
    : `相对和 = ${s}。与 12 相对 → ${s-12}`;
}
train();
"""
    )
))

# Q20 shortest
PAGES.append((
    "20.html",
    page(
        20, "谁最矮", "Who Is Shortest", 5, "18.html", "21.html",
        "箭头从甲指向乙表示甲比乙高。例如 B→A 表示 B 比 A 高。谁最矮？",
        "An arrow from one person to another means the first is taller. Example: B→A means B taller than A. Who is shortest?",
        "实验台：把「更高」关系理成链",
        "Lab: chain the taller-than relations",
        """
    <p class="tip lang-zh">点名字标记「可能最矮的候选人」，顺着箭头排除更高的人。</p>
    <p class="tip lang-en">Tap names as shortest candidates; eliminate anyone who has an arrow into someone shorter.</p>
    <div class="stage">
      <svg viewBox="0 0 320 220" width="100%" style="max-width:360px;display:block;margin:0 auto">
        <defs><marker id="m" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0ea5e9"/></marker></defs>
        <line x1="160" y1="40" x2="160" y2="90" stroke="#0ea5e9" stroke-width="2" marker-end="url(#m)"/>
        <line x1="160" y1="110" x2="80" y2="150" stroke="#0ea5e9" stroke-width="2" marker-end="url(#m)"/>
        <line x1="160" y1="110" x2="240" y2="150" stroke="#0ea5e9" stroke-width="2" marker-end="url(#m)"/>
        <line x1="80" y1="160" x2="80" y2="200" stroke="#0ea5e9" stroke-width="2" marker-end="url(#m)"/>
        <line x1="240" y1="160" x2="160" y2="200" stroke="#0ea5e9" stroke-width="2" marker-end="url(#m)"/>
        <g font-size="16" font-weight="800" text-anchor="middle">
          <circle cx="160" cy="30" r="16" fill="#e0f2fe" stroke="#0284c7"/><text x="160" y="35">E</text>
          <circle cx="160" cy="105" r="16" fill="#e0f2fe" stroke="#0284c7"/><text x="160" y="110">F</text>
          <circle cx="80" cy="155" r="16" fill="#e0f2fe" stroke="#0284c7"/><text x="80" y="160">D</text>
          <circle cx="240" cy="155" r="16" fill="#e0f2fe" stroke="#0284c7"/><text x="240" y="160">B</text>
          <circle cx="80" cy="205" r="16" fill="#e0f2fe" stroke="#0284c7"/><text x="80" y="210">A</text>
          <circle cx="160" cy="205" r="16" fill="#e0f2fe" stroke="#0284c7"/><text x="160" y="210">C</text>
        </g>
      </svg>
      <p class="note lang-zh">示意图仅作关系提示；请对照真题原图箭头再选答案。</p>
      <p class="note lang-en">Sketch is a helper — verify against the contest figure before answering.</p>
    </div>
        """,
        ["A", "B", "C", "D", "E"], "C",
        ""
    )
))

# Q21 apples
PAGES.append((
    "21.html",
    page(
        21, "黄色苹果", "Yellow Apples", 5, "20.html", "22.html",
        "篮子里有一些苹果和 8 个梨，绿或黄。苹果比绿色水果总数多 3。黄梨有 6 个。黄苹果有几个？",
        "Some apples and 8 pears, each green or yellow. Apples = green fruit + 3. There are 6 yellow pears. How many yellow apples?",
        "实验台：先算绿梨，再推黄苹果",
        "Lab: green pears first, then yellow apples",
        """
    <p class="tip lang-zh">绿梨 = 8 − 6。题意可推出：黄苹果 = 绿梨 + 3。</p>
    <p class="tip lang-en">Green pears = 8 − 6. Then yellow apples = green pears + 3.</p>
    <div class="stage">
      <div class="info" id="ap"></div>
      <button class="btn primary" onclick="apples()"><span class="lang-zh">推演</span><span class="lang-en">Derive</span></button>
    </div>
        """,
        ["4", "5", "6", "7", "8"], "B",
        r"""
function apples(){
  const gp=8-6;
  const ya=gp+3;
  document.getElementById('ap').textContent=document.body.classList.contains('en-mode')
    ? `Green pears=${gp}. Yellow apples=${ya}.`
    : `绿梨=${gp}。黄苹果=${ya}。`;
}
apples();
"""
    )
))

# Q22 cross
PAGES.append((
    "22.html",
    page(
        22, "行列数字和", "Row and Column Sums", 5, "21.html", "24.html",
        "把 1–5 填入五个圆（十字形），使横行数字和等于竖列数字和。问号（中心）可能是哪些数？",
        "Place 1–5 in five circles (a cross) so row sum equals column sum. What can the centre (?) be?",
        "实验台：中心数属于行也属于列",
        "Lab: the centre sits in both row and column",
        """
    <p class="tip lang-zh">全部数字和 15 是奇数。去掉中心后，左右之和 = 上下之和，剩下四个数之和为偶数 ⇒ 中心必须是奇数。</p>
    <p class="tip lang-en">Total 15 is odd. After removing the centre, the other four sum even ⇒ centre must be odd.</p>
    <div class="stage" style="text-align:center">
      <div style="display:inline-grid;grid-template-columns:40px 40px 40px;gap:6px;font-weight:800">
        <div></div><div style="width:40px;height:40px;border-radius:50%;border:2px solid #0ea5e9;line-height:36px">·</div><div></div>
        <div style="width:40px;height:40px;border-radius:50%;border:2px solid #0ea5e9;line-height:36px">·</div>
        <div style="width:40px;height:40px;border-radius:50%;border:2px solid #f59e0b;line-height:36px;background:#fff7ed">?</div>
        <div style="width:40px;height:40px;border-radius:50%;border:2px solid #0ea5e9;line-height:36px">·</div>
        <div></div><div style="width:40px;height:40px;border-radius:50%;border:2px solid #0ea5e9;line-height:36px">·</div><div></div>
      </div>
      <div class="info" id="c22" style="margin-top:12px"></div>
      <button class="btn primary" onclick="c22()"><span class="lang-zh">哪些奇数可用</span><span class="lang-en">Which odds work</span></button>
    </div>
        """,
        ["只有5", "2,3或4", "只有3", "只有1或3", "1,3或5"], "E",
        r"""
function c22(){
  document.getElementById('c22').textContent=document.body.classList.contains('en-mode')
    ? 'Odd options among 1–5: 1, 3, 5 — all possible.'
    : '1–5 中的奇数：1、3、5 —— 都可以。';
}
"""
    )
))

# Q24 sweets
PAGES.append((
    "24.html",
    page(
        24, "小强的糖果", "John’s Sweets", 5, "22.html", "index.html",
        "小强先给小欧「小欧当时有的那么多」；再小欧给小强「小强当时剩的那么多」。最后各 4 颗。小强起初有几颗？",
        "John gave Olivia as many as she had; then Olivia gave John as many as he then had. Each ends with 4. How many did John start with?",
        "实验台：从结尾倒推两次交换",
        "Lab: reverse both exchanges from the end",
        """
    <p class="tip lang-zh">最后各 4。先撤销「小欧给小强」：那时小强应是 2，小欧是 6。再撤销「小强给小欧」。</p>
    <p class="tip lang-en">End 4–4. Undo Olivia→John first, then undo John→Olivia.</p>
    <div class="stage">
      <div class="info" id="sw"></div>
      <button class="btn primary" onclick="sweets()"><span class="lang-zh">一步步倒推</span><span class="lang-en">Step back</span></button>
    </div>
        """,
        ["6", "5", "4", "3", "2"], "B",
        r"""
function sweets(){
  // end J=4 O=4; before O gave J: J had 2, O had 6
  // before J gave O: O had 3, J had 5
  document.getElementById('sw').innerHTML=document.body.classList.contains('en-mode')
    ? 'End: 4 & 4 → before 2nd move: John 2, Olivia 6 → start: John 5, Olivia 3'
    : '最后 4 与 4 → 第二次前：小强 2、小欧 6 → 起初：小强 5、小欧 3';
}
"""
    )
))


INDEX = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2020 Level A · Interactive</title>
<style>
:root{--bg:#f0f9ff;--card:#fff;--ink:#0c4a6e;--accent:#0284c7;--muted:#64748b}
*{box-sizing:border-box}
body{font-family:'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;margin:0;min-height:100vh;background:radial-gradient(circle at top,#e0f2fe,var(--bg));color:#0f172a;padding:20px 14px 40px}
.topbar{display:flex;justify-content:space-between;align-items:center;max-width:760px;margin:0 auto 14px;gap:10px;flex-wrap:wrap}
.brand{font-weight:800;color:var(--ink);font-size:14px}
.lang-btn{border:2px solid #7dd3fc;background:#fff;border-radius:999px;padding:8px 16px;font-weight:800;cursor:pointer;color:var(--ink)}
.wrap{max-width:760px;margin:0 auto;background:var(--card);border-radius:22px;box-shadow:0 12px 28px rgba(2,132,199,.12);padding:22px}
h1{margin:0 0 8px;color:var(--ink);font-size:24px}
.meta{color:var(--muted);font-size:13px;margin-bottom:14px;line-height:1.55}
h3{margin:18px 0 8px;color:var(--ink);font-size:15px}
.list a{display:block;padding:12px 14px;margin:8px 0;border-radius:12px;background:#f0f9ff;border:2px solid #bae6fd;color:#0c4a6e;text-decoration:none;font-weight:700}
.list a:hover{background:#e0f2fe}
.zh{display:block}.en{display:none}
body.en-mode .zh{display:none}body.en-mode .en{display:block}
</style>
</head>
<body>
<div class="topbar">
  <div class="brand">Math Kangaroo 2020 · Level A</div>
  <button class="lang-btn" onclick="document.body.classList.toggle('en-mode')">EN / 中文</button>
</div>
<div class="wrap">
  <h1 class="zh">2020 等级 A · 互动练习</h1>
  <h1 class="en">2020 Level A · Interactive labs</h1>
  <p class="meta zh">实验台先探索，检查只提示对错。题库 JSON：<code>Math Kangaroo 2020 – Level 1*.json</code>。教师答案见 <code>*-答案.md</code>。</p>
  <p class="meta en">Explore first; Check only says right/wrong. JSON bank + teacher keys included.</p>

  <h3 class="zh">3–4 分题（实验台）</h3>
  <h3 class="en">3–4 point labs</h3>
  <div class="list">
    <a href="1.html"><span class="zh">1 · 楼梯上见面</span><span class="en">1 · Stairs meet</span></a>
    <a href="4.html"><span class="zh">4 · 玩具规律</span><span class="en">4 · Toy pattern</span></a>
    <a href="6.html"><span class="zh">6 · 看不见的灰方块</span><span class="en">6 · Hidden cubes</span></a>
    <a href="12.html"><span class="zh">12 · 被挡住的花瓣</span><span class="en">12 · Hidden petal</span></a>
    <a href="14.html"><span class="zh">14 · 蓝格与黄格</span><span class="en">14 · Blue & yellow</span></a>
    <a href="16.html"><span class="zh">16 · 再多烤几块饼干</span><span class="en">16 · Extra cookies</span></a>
  </div>

  <h3 class="zh">5 分题（实验台）</h3>
  <h3 class="en">5-point labs</h3>
  <div class="list">
    <a href="18.html"><span class="zh">18 · 相对的车厢</span><span class="en">18 · Train cars</span></a>
    <a href="20.html"><span class="zh">20 · 谁最矮</span><span class="en">20 · Shortest</span></a>
    <a href="21.html"><span class="zh">21 · 黄色苹果</span><span class="en">21 · Yellow apples</span></a>
    <a href="22.html"><span class="zh">22 · 行列数字和</span><span class="en">22 · Cross sums</span></a>
    <a href="24.html"><span class="zh">24 · 小强的糖果</span><span class="en">24 · Sweets</span></a>
  </div>
</div>
</body>
</html>
"""

ANSWERS_MD = """# 2020 等级 A · 教师答案

来源：IKMC / Math Kangaroo 2020 PreEcolier（中国卷等级 1：1–2 年级）

| 题号 | 答案 | 分值 |
| --- | --- | --- |
| 1 | D | 3 |
| 2 | E | 3 |
| 3 | A | 3 |
| 4 | E | 3 |
| 5 | A | 3 |
| 6 | D | 3 |
| 7 | E | 3 |
| 8 | D | 3 |
| 9 | C | 4 |
| 10 | C | 4 |
| 11 | D | 4 |
| 12 | D | 4 |
| 13 | B | 4 |
| 14 | A | 4 |
| 15 | B | 4 |
| 16 | D | 4 |
| 17 | D | 5 |
| 18 | D | 5 |
| 19 | C | 5 |
| 20 | C | 5 |
| 21 | B | 5 |
| 22 | E | 5 |
| 23 | C | 5 |
| 24 | B | 5 |

学生页检查按钮只提示对错，不显示选项字母。
"""


def main():
    for name, html in PAGES:
        path = os.path.join(OUT, name)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", name)
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(INDEX)
    with open(os.path.join(OUT, "答案.md"), "w", encoding="utf-8") as f:
        f.write(ANSWERS_MD)
    print("wrote index.html, 答案.md")


if __name__ == "__main__":
    main()
