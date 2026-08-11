# -*- coding: utf-8 -*-
"""Best-effort full A-2020 interactive labs: all 24 questions."""
from __future__ import annotations
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))
ANS = {
    1: "D", 2: "E", 3: "A", 4: "E", 5: "A", 6: "D", 7: "E", 8: "D",
    9: "C", 10: "C", 11: "D", 12: "C", 13: "B", 14: "A", 15: "B", 16: "D",
    17: "D", 18: "D", 19: "C", 20: "C", 21: "B", 22: "E", 23: "C", 24: "B",
}
PTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}
TITLE = {
    1: ("楼梯上见面", "Meeting on the Stairs"),
    2: ("城堡自拍", "Castle Selfie"),
    3: ("袋鼠拼图", "Kangaroo Puzzle"),
    4: ("玩具规律", "Toy Pattern"),
    5: ("带洞的卡片", "Card with Holes"),
    6: ("看不见的灰方块", "Hidden Grey Cubes"),
    7: ("黑三角与正方形", "Triangles & Squares"),
    8: ("三色麻花绳", "Three-Thread Braid"),
    9: ("补全图片", "Complete the Picture"),
    10: ("第12间房子", "The 12th House"),
    11: ("方块最多的形状", "Most Cubes"),
    12: ("被挡住的花瓣", "Hidden Petal"),
    13: ("阴影面积最大", "Largest Shade"),
    14: ("蓝格与黄格", "Blue & Yellow"),
    15: ("翻转卡片", "Flip the Card"),
    16: ("再多烤几块饼干", "Extra Cookies"),
    17: ("灰格上的卡片", "Grey Square Card"),
    18: ("相对的车厢", "Opposite Train Cars"),
    19: ("蜜蜂涂色通路", "Bee Path Colouring"),
    20: ("谁最矮", "Who Is Shortest"),
    21: ("黄色苹果", "Yellow Apples"),
    22: ("行列数字和", "Row & Column Sums"),
    23: ("5的对面", "Opposite Face of 5"),
    24: ("小强的糖果", "John’s Sweets"),
}
PROB = {
    1: (
        "图中的袋鼠每向上跳 <b>3</b> 层楼梯，兔子就会向下跳 <b>2</b> 层。请问它们会在哪一层见面？",
        "The kangaroo goes up <b>3</b> steps each time the rabbit goes down <b>2</b> steps. On which step do they meet?",
    ),
    2: (
        "小莫在这座城堡前拍了张自拍照。以下哪张图片可能是小莫的照片？（自拍相当于左右镜像）",
        "Mordka took a selfie in front of this castle. Which picture could be the photo? (A selfie mirrors left–right.)",
    ),
    3: (
        "小奈要把以下 4 张图片重新排列成袋鼠的画像。请问该如何排列这些图片？",
        "Nelly arranged the 4 pieces to make a kangaroo picture. How are the pieces arranged?",
    ),
    4: (
        "小丹把玩具按顺序排成一行，每五个玩具为一组循环重复。请问接下来是哪两个玩具？",
        "Danial arranges toys in a line; the pattern repeats every five toys. Which two toys come next?",
    ),
    5: (
        "小何有两张同样大小的卡片。卡片 A 上有四个小洞。把 A 直接叠在 B 上，会看到什么？",
        "José has two same-size cards. Card A has four holes. Place A on B — what can he see?",
    ),
    6: (
        "小丽用一些白方块和 <b>14</b> 个灰方块拼成形状。图中还有多少个灰色正方体是看不见的？",
        "Mary used some white cubes and <b>14</b> grey cubes. How many grey cubes cannot be seen?",
    ),
    7: (
        "小安的图画里有 <b>3</b> 个黑色三角形，且正方形 <b>少于 4</b> 个。哪张图可能是她画的？",
        "Anna’s picture has <b>3</b> black triangles and <b>fewer than 4</b> squares. Which could it be?",
    ),
    8: (
        "麻花绳由绿、蓝、红三根绳子编成。带编号的 1、2、3 分别是什么颜色？",
        "The braid has green, blue and red threads. What colours are threads 1, 2 and 3?",
    ),
    9: (
        "以下哪一张图可以用于填补图片中的空白？",
        "Which piece completes the picture?",
    ),
    10: (
        "村庄有 12 间房子、4 条直路和 4 条环路。图中已有 11 间。每条直路、每条环路都要恰好 3 间房子。第 12 间在哪里？",
        "A village has 12 houses, 4 straight and 4 circular roads. 11 houses are shown. Each straight/circular road has 3 houses. Where is the 12th?",
    ),
    11: (
        "五个形状由正方体粘成。哪种形状使用的正方体最多？",
        "Five shapes are made by gluing cubes. Which uses the most cubes?",
    ),
    12: (
        "两朵花的花瓣上写有数字，一片被挡住。两朵花数字之和相等。被挡住的花瓣是几？",
        "Numbers on two flowers’ petals; one petal hidden. Equal sums — what is the hidden number?",
    ),
    13: (
        "以下哪张图片中的阴影部分面积最大？",
        "Which picture has the largest shaded area?",
    ),
    14: (
        "把 1–6 填进六个方格（各不相同）。蓝格之和与黄格之和都为 10。问号格必须是几？",
        "Fill 1–6 in six squares (all different). Blue sum and yellow sum are both 10. What must ? be?",
    ),
    15: (
        "卡片在桌上。先沿顶边翻转，再沿左边翻转。现在卡片是什么样？",
        "The card is flipped over its top edge, then over its left edge. What does it look like now?",
    ),
    16: (
        "祖母烤了 12 块饼干，要平均分给 5 个孙子。还需要再多烤几块？",
        "Grandmother baked 12 cookies to share equally among 5 grandchildren. How many more should she bake?",
    ),
    17: (
        "小唐有 9 张卡片。每行每列要有三种不同形状和三种不同数量。已放三张。灰格应放哪张？",
        "Tom places 9 cards so each row/column has three different shapes and three different counts. Which card goes on the grey square?",
    ),
    18: (
        "两列相同火车各 31 节对开。当两列的 19 号相对时，几号与 12 号相对？",
        "Two identical 31-car trains travel opposite ways. When car 19 faces 19, which faces car 12?",
    ),
    19: (
        "小蜜蜂只能走灰色蜂房。恰把两个白格涂灰，使能从 A 走到 B，有几种涂法？",
        "Mark the bee walks only on grey cells. In how many ways can you grey exactly two white cells so A connects to B?",
    ),
    20: (
        "箭头从甲指向乙表示甲比乙高。例如 B→A 表示 B 比 A 高。谁最矮？",
        "An arrow from one person to another means the first is taller. Who is the shortest?",
    ),
    21: (
        "篮子里有一些苹果和 8 个梨（绿或黄）。苹果比绿色水果总数多 3。黄梨有 6 个。黄苹果有几个？",
        "Some apples and 8 pears (green or yellow). Apples = green fruit + 3. 6 yellow pears. How many yellow apples?",
    ),
    22: (
        "把 1–5 填入五个圆（十字），使横行之和等于竖列之和。问号（中心）可能是哪些数？",
        "Place 1–5 in a cross so row sum equals column sum. What can the centre (?) be?",
    ),
    23: (
        "从 1–9 选六个不同数字写在立方体六面。每对对面数字和相等。5 的对面可能是几？",
        "Six distinct numbers from 1–9 on a cube; opposite pairs share one sum. What could be opposite 5?",
    ),
    24: (
        "小强先给小欧「小欧当时有的那么多」；再小欧给小强「小强当时剩的那么多」。最后各 4 颗。小强起初有几颗？",
        "John gave Olivia as many as she had; then Olivia gave John as many as he then had. Each ends with 4. How many did John start with?",
    ),
}

# choice button labels (what student sees on cards)
CHOICE_LABELS = {
    1: ["3", "4", "5", "6", "7"],
    6: ["1", "3", "5", "6", "8"],
    8: ["A", "B", "C", "D", "E"],
    12: ["0", "3", "5", "7", "1"],
    14: ["1", "2", "3", "4", "5"],
    16: ["0", "1", "2", "3", "4"],
    18: ["7", "12", "21", "26", "31"],
    19: ["3", "4", "5", "6", "7"],
    21: ["4", "5", "6", "7", "8"],
    22: ["只有5", "2/3/4", "只有3", "1或3", "1/3/5"],
    23: ["3", "5", "6", "7", "9"],
    24: ["6", "5", "4", "3", "2"],
}

CSS = r"""
:root{--primary:#0284c7;--success:#14b8a6;--danger:#e11d48;--bg:#f0f9ff;--dark:#0c4a6e;--ink:#0f172a}
*{box-sizing:border-box}
body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:radial-gradient(circle at top,#e0f2fe,var(--bg) 55%);color:var(--ink);margin:0;padding:18px;display:flex;flex-direction:column;align-items:center}
.lang-toggle-btn{position:fixed;top:16px;right:16px;background:var(--dark);color:#fff;border:none;padding:10px 16px;border-radius:999px;cursor:pointer;font-weight:800;z-index:1000;box-shadow:0 6px 16px rgba(12,74,110,.25)}
h1{text-align:center;color:var(--primary);margin:6px 0;font-size:22px}
.meta{color:#64748b;font-size:13px;margin-bottom:12px}
.wrap{max-width:960px;width:100%}
.section{background:#fff;padding:18px 18px 16px;border-radius:16px;box-shadow:0 10px 28px rgba(2,132,199,.1);margin-bottom:14px}
h2{color:var(--primary);border-left:5px solid var(--primary);padding-left:10px;margin:0 0 10px;font-size:17px}
.fig{display:block;width:100%;max-width:560px;margin:8px auto;border-radius:12px;border:1px solid #e2e8f0;background:#fff}
.fig.sm{max-width:380px}.fig.xs{max-width:280px}
.optgrid{display:block;width:100%;max-width:640px;margin:10px auto;border-radius:12px;border:1px solid #e2e8f0}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0;line-height:1.55}
.note{font-size:13px;color:#475569;background:#f1f5f9;border-radius:12px;padding:10px 12px;line-height:1.55;margin:8px 0}
.mission{display:grid;gap:8px;margin:10px 0}
.mission .step{padding:10px 12px;border-radius:12px;border:2px solid #e2e8f0;font-size:14px;line-height:1.5;display:flex;gap:10px;align-items:flex-start}
.mission .step .num{flex:0 0 28px;height:28px;border-radius:50%;background:#dbeafe;color:#1d4ed8;display:flex;align-items:center;justify-content:center;font-weight:900}
.mission .step.active{border-color:#93c5fd;background:#eff6ff}
.mission .step.done{border-color:#86efac;background:#f0fdf4}
.mission .step.done .num{background:#bbf7d0;color:#166534}
.actions{text-align:center;margin-top:12px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px;font-size:14px}
.btn:disabled{opacity:.45;cursor:not-allowed}
.submit{background:var(--success);color:#fff}.reset{background:#64748b;color:#fff}
.ghost{background:#e2e8f0;color:#334155}.primary{background:var(--primary);color:#fff}.accent{background:#f59e0b;color:#111}
.pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0}
.card{min-width:56px;padding:12px 14px;border-radius:12px;background:var(--primary);color:#fff;font-weight:800;cursor:pointer;text-align:center;user-select:none}
.card.on{outline:3px solid #f59e0b}
.answer-box{min-width:120px;min-height:52px;border:3px dashed var(--primary);border-radius:14px;margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;background:#fafbfc}
.answer-box.filled{border-style:solid;background:#e8f5e9}
#feedback{text-align:center;font-weight:800;margin-top:12px;min-height:28px}
.ok{color:var(--success)}.bad{color:var(--danger)}
.nav{display:flex;justify-content:space-between;margin-top:8px;gap:8px}
.nav a{color:var(--primary);font-weight:700;text-decoration:none}
.lang-zh{display:block}.lang-en{display:none}
body.en-mode .lang-zh{display:none}body.en-mode .lang-en{display:block}
.info{text-align:center;font-weight:800;min-height:28px;margin:8px 0;color:#0f172a;line-height:1.45}
.row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;align-items:center;margin:8px 0}
.stage{border:2px solid #bae6fd;border-radius:16px;background:linear-gradient(180deg,#f8fafc,#eff6ff);padding:14px;margin:10px auto;max-width:560px}
.tabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}
.tab{min-width:48px;padding:8px 12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;font-weight:800;cursor:pointer}
.tab.on{background:var(--primary);color:#fff;border-color:var(--primary)}
.counter{display:inline-flex;align-items:center;gap:8px;background:#fff;border:2px solid #bae6fd;border-radius:999px;padding:6px 12px;font-weight:800}
.counter button{width:32px;height:32px;border:none;border-radius:50%;background:var(--primary);color:#fff;font-size:18px;font-weight:900;cursor:pointer}
.grid4{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto}
.grid4 img{width:100%;border:2px solid #e2e8f0;border-radius:10px;cursor:pointer;background:#fff}
.grid4 img.on{border-color:#f59e0b;box-shadow:0 0 0 3px #fde68a}
.slot{width:100%;aspect-ratio:1;border:2px dashed #94a3b8;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#fff;font-weight:800;color:#94a3b8}
.cellpick{width:44px;height:44px;border-radius:10px;border:2px solid #cbd5e1;background:#fff;cursor:pointer;font-weight:800}
.cellpick.on{background:#fef3c7;border-color:#f59e0b}
.cellpick.grey{background:#94a3b8;color:#fff}
"""


def enc(letter: str) -> str:
    return base64.b64encode(letter.encode()).decode()


def mission(steps_zh, steps_en):
    zh = "".join(f'<div class="step" data-i="{i}"><div class="num">{i+1}</div><div>{s}</div></div>' for i, s in enumerate(steps_zh))
    en = "".join(f'<div class="step" data-i="{i}"><div class="num">{i+1}</div><div>{s}</div></div>' for i, s in enumerate(steps_en))
    return f'<div class="mission lang-zh">{zh}</div><div class="mission lang-en">{en}</div>'


def figs(n, stem=True, opts=True, extra=""):
    parts = []
    if stem and os.path.exists(os.path.join(OUT, "assets", f"q{n}_stem.png")):
        parts.append(f'<img class="fig" src="assets/q{n}_stem.png" alt="Q{n} figure"/>')
    if opts and os.path.exists(os.path.join(OUT, "assets", f"q{n}_options.png")):
        parts.append(f'<img class="optgrid" src="assets/q{n}_options.png" alt="Q{n} options"/>')
    parts.append(extra)
    return "\n".join(parts)


def page(n: int, lab_zh: str, lab_en: str, lab_body: str, lab_js: str, choice_labels=None) -> str:
    zh_t, en_t = TITLE[n]
    pz, pe = PROB[n]
    labels = choice_labels or CHOICE_LABELS.get(n) or list("ABCDE")
    letters = "ABCDE"
    cards = "".join(
        f'<div class="card" data-v="{letters[i]}" onclick="pick(this)">{labels[i]}</div>'
        for i in range(5)
    )
    prev_n = n - 1 if n > 1 else None
    next_n = n + 1 if n < 24 else None
    nav_prev = f'<a href="{prev_n}.html">← Q{prev_n}</a>' if prev_n else '<a href="index.html">← Index</a>'
    nav_next = f'<a href="{next_n}.html">Q{next_n} →</a>' if next_n else '<a href="index.html">Index →</a>'
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2020 A · Q{n} · {zh_t}</title>
<style>{CSS}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode'); if(window.onLang) onLang();">🌐 EN / 中文</button>
<h1 class="lang-zh">{zh_t}</h1>
<h1 class="lang-en">{en_t}</h1>
<div class="meta lang-zh">Math Kangaroo 2020 · 等级 A · 第 {n} 题 · {PTS[n]} 分</div>
<div class="meta lang-en">Math Kangaroo 2020 · Level A · Q{n} · {PTS[n]} points</div>
<div class="wrap">
  <div class="section">
    <h2 class="lang-zh">题目</h2>
    <h2 class="lang-en">Problem</h2>
    <p class="lang-zh">{pz}</p>
    <p class="lang-en">{pe}</p>
    {figs(n)}
  </div>
  <div class="section">
    <h2 class="lang-zh">{lab_zh}</h2>
    <h2 class="lang-en">{lab_en}</h2>
    {lab_body}
    <p class="tip lang-zh" style="margin-top:16px">想好后选出答案（检查只提示对错，不公布选项字母）：</p>
    <p class="tip lang-en" style="margin-top:16px">Then pick an answer (Check only says right/wrong):</p>
    <div class="pool">{cards}</div>
    <div class="answer-box" id="ansBox"></div>
    <div class="actions">
      <button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
      <button class="btn reset" onclick="location.reload()"><span class="lang-zh">重置整页</span><span class="lang-en">Reset page</span></button>
      <div id="feedback"></div>
    </div>
  </div>
  <div class="nav">{nav_prev}{nav_next}</div>
</div>
<script>
const KEY=atob('{enc(ANS[n])}');
let picked=null;
function pick(el){{
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
  el.classList.add('on'); picked=el.dataset.v;
  const box=document.getElementById('ansBox');
  box.textContent=el.textContent.trim(); box.classList.add('filled');
  document.getElementById('feedback').textContent='';
}}
function checkAnswer(){{
  const fb=document.getElementById('feedback');
  if(!picked){{ fb.className='bad'; fb.innerHTML='<span class="lang-zh">先选一个选项</span><span class="lang-en">Pick an option first</span>'; return; }}
  if(picked===KEY){{ fb.className='ok'; fb.innerHTML='<span class="lang-zh">正确！</span><span class="lang-en">Correct!</span>'; }}
  else {{ fb.className='bad'; fb.innerHTML='<span class="lang-zh">再试试，回实验台看看</span><span class="lang-en">Try again — explore the lab</span>'; }}
}}
function setMission(i){{
  document.querySelectorAll('.mission .step').forEach(s=>{{
    const idx=+s.dataset.i;
    s.classList.toggle('active', idx===i);
    s.classList.toggle('done', idx<i);
  }});
}}
{lab_js}
</script>
</body>
</html>
"""


def lab_compare_options(n, tip_zh, tip_en, extra_js=""):
    body = f"""
    {mission(
        ["先仔细看题干图", "逐个对照选项 A–E", "用实验工具帮助排除", "选出你的答案"],
        ["Study the stem figure", "Compare options A–E", "Use the lab tools", "Pick your answer"],
    )}
    <p class="tip lang-zh">{tip_zh}</p>
    <p class="tip lang-en">{tip_en}</p>
    <div class="tabs" id="tabs"></div>
    <div class="stage"><img class="fig sm" id="optView" src="assets/q{n}_options.png" alt="option"/></div>
    <div class="info" id="labInfo"></div>
    """
    js = f"""
const letters='ABCDE';
const tabs=document.getElementById('tabs');
letters.split('').forEach((L,i)=>{{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L;
  b.onclick=()=>{{ document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on')); b.classList.add('on');
    document.getElementById('labInfo').textContent=(document.body.classList.contains('en-mode')?'Focusing on option ':'正在看选项 ')+L;
    setMission(1);
  }};
  tabs.appendChild(b);
}});
setMission(0);
{extra_js}
"""
    return body, js


# ---------- per-question labs ----------
def build_all():
    pages = {}

    # Q1 stairs
    pages[1] = page(
        1,
        "实验台：同步跳跃，找碰面楼层",
        "Lab: sync jumps — find the meeting step",
        f"""
    {mission(
        ["起点：袋鼠在地面，兔子在第 10 层（与真题图一致）", "点「同时跳一步」：袋鼠向上 +3，兔子向下 −2", "观察何时站在同一层", "选出碰面楼层"],
        ["Start: kangaroo on the ground, rabbit on step 10", "Tap Step: kangaroo +3 up, rabbit −2 down", "Watch when they share a floor", "Pick that floor number"],
    )}
    <p class="note lang-zh">对照题干图：楼梯标号 1–10；袋鼠站在 1 层下方的地面，兔子站在最上方第 10 层。</p>
    <p class="note lang-en">Match the figure: steps 1–10; kangaroo below step 1, rabbit on step 10 at the top.</p>
    <div class="stage" id="stairs"></div>
    <div class="info" id="posInfo"></div>
    <div class="actions">
      <button class="btn primary" onclick="stepOnce()"><span class="lang-zh">同时跳一步</span><span class="lang-en">Step once</span></button>
      <button class="btn ghost" onclick="resetStairs()"><span class="lang-zh">回到起点</span><span class="lang-en">Reset</span></button>
      <button class="btn accent" onclick="autoMeet()"><span class="lang-zh">连续跳到碰面</span><span class="lang-en">Auto until meet</span></button>
    </div>
        """,
        r"""
const MAX=10; let k=0, r=10, steps=0; // rabbit starts on step 10
function row(label, showK, showR, meet, tip){
  const bg=meet?'#fef3c7':(showK||showR)?'#e0f2fe':'#fff';
  return `<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:${bg};border:1px solid #e2e8f0">
    <b style="width:72px">${label}</b>
    <span style="flex:1;font-size:22px">${showK?'🦘':''}${showR?'🐇':''}${meet?' <b style="color:#ea580c;font-size:14px">MEET</b>':''}</span>
    <span style="font-size:12px;color:#64748b;font-weight:700">${tip||''}</span>
  </div>`;
}
function draw(){
  setMission(steps?2:0);
  const en=document.body.classList.contains('en-mode');
  let html='<div style="display:flex;flex-direction:column-reverse;gap:4px">';
  html+=row(en?'Ground':'地面', k===0, false, false, k===0?(en?'start':'袋鼠起点'):'');
  for(let i=1;i<=MAX;i++){
    const meet=k===i&&r===i;
    let tip='';
    if(i===10&&r===10&&steps===0) tip=en?'rabbit start':'兔子起点';
    html+=row('#'+i, k===i, r===i, meet, tip);
  }
  html+='</div>';
  document.getElementById('stairs').innerHTML=html;
  document.getElementById('posInfo').textContent=en
    ? `Sync moves: ${steps}. Kangaroo: ${k===0?'ground':('step '+k)}. Rabbit: step ${r}.`
    : `同步 ${steps} 次。袋鼠：${k===0?'地面':('第 '+k+' 层')}。兔子：第 ${r} 层。`;
  if(k===r&&k>0) setMission(3);
}
function stepOnce(){ if(k===r&&k>0) return; k=Math.min(MAX,k===0?3:k+3); r=Math.max(1,r-2); steps++; draw(); }
function resetStairs(){ k=0; r=10; steps=0; draw(); }
function autoMeet(){ resetStairs(); const t=setInterval(()=>{ stepOnce(); if(k===r&&k>0) clearInterval(t); },380); }
function onLang(){ draw(); }
resetStairs();
""",
    )

    # Q2 selfie / mirror
    body, js = lab_compare_options(
        2,
        "真题城堡有左右不对称的塔。自拍会左右翻转。点选项对比：哪一张和「镜像后的城堡」一致？",
        "The castle is asymmetric. A selfie flips left–right. Compare options: which matches the mirrored castle?",
    )
    pages[2] = page(
        2, "实验台：左右镜像对比", "Lab: left–right mirror check",
        body + """
    <div class="actions">
      <button class="btn primary" onclick="toggleMirror()"><span class="lang-zh">翻转题干城堡（镜像）</span><span class="lang-en">Mirror the stem castle</span></button>
    </div>
    <img class="fig sm" id="stemFlip" src="assets/q2_stem.png" alt="stem" style="transition:transform .35s"/>
        """,
        js + r"""
let mirrored=false;
function toggleMirror(){
  mirrored=!mirrored;
  document.getElementById('stemFlip').style.transform=mirrored?'scaleX(-1)':'none';
  setMission(mirrored?2:1);
}
""",
    )

    # Q3 puzzle arrange
    pages[3] = page(
        3, "实验台：拼四块袋鼠", "Lab: arrange four pieces",
        f"""
    {mission(
        ["观察完整袋鼠应有的朝向", "点击下方小块，再点 2×2 格子放入", "对照选项的编号排列", "选出正确排法"],
        ["Imagine the finished kangaroo", "Tap a piece, then a 2×2 slot", "Match the numbering in options", "Pick the arrangement"],
    )}
    <div class="stage">
      <div class="grid4" id="board">
        <div class="slot" data-i="0" onclick="place(0)">?</div>
        <div class="slot" data-i="1" onclick="place(1)">?</div>
        <div class="slot" data-i="2" onclick="place(2)">?</div>
        <div class="slot" data-i="3" onclick="place(3)">?</div>
      </div>
      <div class="info" id="arrInfo"></div>
    </div>
    <p class="tip lang-zh">零件池（点选再放入）：</p>
    <p class="tip lang-en">Piece pool (select then place):</p>
    <div class="row" id="pool3"></div>
    <div class="actions"><button class="btn ghost" onclick="clearBoard()"><span class="lang-zh">清空棋盘</span><span class="lang-en">Clear board</span></button></div>
        """,
        r"""
let sel=null; const board=[null,null,null,null];
const pool=document.getElementById('pool3');
[1,2,3,4].forEach(n=>{
  const img=document.createElement('img');
  img.src='assets/q3_piece'+n+'.png'; img.style.width='72px'; img.style.cursor='pointer';
  img.style.border='2px solid #e2e8f0'; img.style.borderRadius='8px';
  img.onclick=()=>{ sel=n; document.querySelectorAll('#pool3 img').forEach(x=>x.style.outline=''); img.style.outline='3px solid #f59e0b'; setMission(1); };
  pool.appendChild(img);
});
function place(i){
  if(!sel) return;
  board[i]=sel;
  const slot=document.querySelectorAll('#board .slot')[i];
  slot.innerHTML=`<img src="assets/q3_piece${sel}.png" style="width:100%;border:none;border-radius:8px"/>`;
  slot.style.borderStyle='solid';
  document.getElementById('arrInfo').textContent=
    (document.body.classList.contains('en-mode')?'Order TL-TR / BL-BR: ':'左上右上/左下右下：')+board.map(x=>x||'?').join(',');
  setMission(2);
}
function clearBoard(){
  board.fill(null); sel=null;
  document.querySelectorAll('#board .slot').forEach((s,i)=>{ s.textContent='?'; s.style.borderStyle='dashed'; s.onclick=()=>place(i); });
  document.getElementById('arrInfo').textContent='';
  setMission(0);
}
setMission(0);
""",
    )

    # Q4 pattern
    pages[4] = page(
        4, "实验台：找出五玩具循环", "Lab: find the five-toy cycle",
        f"""
    {mission(
        ["看题干已摆出的玩具序列", "圈出「每 5 个重复」的一组", "读出接下来的两个", "对照选项图"],
        ["Look at the toy sequence", "Find the repeating group of 5", "Read the next two toys", "Match the option pictures"],
    )}
    <div class="stage">
      <img class="fig" src="assets/q4_stem.png" alt="sequence"/>
      <div class="info" id="patInfo"></div>
      <div class="actions">
        <button class="btn primary" onclick="markCycle()"><span class="lang-zh">高亮一组循环（示意）</span><span class="lang-en">Highlight one cycle</span></button>
        <button class="btn accent" onclick="askNext()"><span class="lang-zh">我找到下一对了</span><span class="lang-en">I found the next pair</span></button>
      </div>
    </div>
    <p class="note lang-zh">循环长度是 5：把序列按 5 个一组切开，下一组开头就是「接下来的两个」所在位置。</p>
    <p class="note lang-en">Cycle length is 5: split the sequence into groups of 5; the next toys start the following group.</p>
        """,
        r"""
function markCycle(){
  document.getElementById('patInfo').textContent=document.body.classList.contains('en-mode')
    ? 'Group size = 5. Count 1–2–3–4–5, then the pattern restarts.'
    : '一组 = 5 个。数 1–2–3–4–5，然后从头再来。';
  setMission(1);
}
function askNext(){
  document.getElementById('patInfo').textContent=document.body.classList.contains('en-mode')
    ? 'Now match those two toys in options A–E (answer is a picture pair).'
    : '现在去选项 A–E 里找这一对玩具（答案是图片）。';
  setMission(3);
}
setMission(0);
""",
    )

    # Q5 overlay
    pages[5] = page(
        5, "实验台：叠卡片，透过洞看", "Lab: overlay cards — see through holes",
        f"""
    {mission(
        ["看清卡片 A 的四个洞位置", "看清卡片 B 的图案", "把 A 叠到 B 上（点按钮）", "对照透过洞能看到的图案"],
        ["Note the four holes on A", "Study the pattern on B", "Stack A on B", "Match what shows through"],
    )}
    <div class="stage" style="position:relative;min-height:200px">
      <div class="row">
        <div><div class="tip">A</div><img id="cardA" src="assets/q5_card_A.png" style="width:140px;border:2px solid #94a3b8;border-radius:8px"/></div>
        <div><div class="tip">B</div><img id="cardB" src="assets/q5_card_B.png" style="width:140px;border:2px solid #94a3b8;border-radius:8px"/></div>
      </div>
      <div id="stack" style="display:none;position:relative;width:160px;height:160px;margin:12px auto">
        <img src="assets/q5_card_B.png" style="position:absolute;inset:0;width:100%;border-radius:8px"/>
        <img src="assets/q5_card_A.png" style="position:absolute;inset:0;width:100%;border-radius:8px;opacity:.92;mix-blend-mode:multiply"/>
      </div>
      <div class="info" id="ovInfo"></div>
    </div>
    <div class="actions">
      <button class="btn primary" onclick="doStack()"><span class="lang-zh">把 A 叠到 B 上</span><span class="lang-en">Stack A on B</span></button>
      <button class="btn ghost" onclick="unStack()"><span class="lang-zh">分开</span><span class="lang-en">Separate</span></button>
    </div>
        """,
        r"""
function doStack(){
  document.getElementById('stack').style.display='block';
  document.getElementById('ovInfo').textContent=document.body.classList.contains('en-mode')
    ? 'Only B’s ink under the four holes stays visible. Match options.'
    : '只有洞下面露出来的 B 图案看得见。去对照选项。';
  setMission(3);
}
function unStack(){ document.getElementById('stack').style.display='none'; setMission(0); }
setMission(0);
""",
    )

    # Q6 cubes
    pages[6] = page(
        6, "实验台：数看得见的灰块，再用 14 减", "Lab: count visible greys, then 14 − visible",
        f"""
    {mission(
        ["看立体图，灰块与白块", "用 +/− 记下你看见的灰块数", "看不见 = 14 − 看见", "选出答案"],
        ["Study grey vs white cubes", "Tally visible grey cubes", "Hidden = 14 − visible", "Pick the answer"],
    )}
    <div class="stage">
      <img class="fig sm" src="assets/q6_stem.png" alt="cubes"/>
      <div class="row">
        <div class="counter">
          <span class="lang-zh">看得见</span><span class="lang-en">Visible</span>
          <button onclick="chg(-1)">−</button>
          <span id="vis">8</span>
          <button onclick="chg(1)">+</button>
        </div>
      </div>
      <div class="info" id="hid6"></div>
      <button class="btn primary" onclick="calc6()"><span class="lang-zh">计算看不见</span><span class="lang-en">Compute hidden</span></button>
    </div>
        """,
        r"""
let vis=8;
function chg(d){ vis=Math.max(0,Math.min(14,vis+d)); document.getElementById('vis').textContent=vis; calc6(); setMission(1); }
function calc6(){
  const h=14-vis;
  document.getElementById('hid6').textContent=document.body.classList.contains('en-mode')
    ? `If visible=${vis}, hidden=${h}` : `若看得见 ${vis}，则看不见 ${h}`;
  setMission(2);
}
calc6(); setMission(0);
""",
    )

    # Q7 count shapes
    pages[7] = page(
        7, "实验台：逐选项数黑三角与正方形", "Lab: count black triangles & squares per option",
        f"""
    {mission(
        ["条件：黑三角 = 3，正方形 < 4", "点选项标签，对照图计数", "两项都满足的才留下", "选出答案"],
        ["Need: 3 black triangles, squares < 4", "Focus each option and count", "Keep only options that fit both", "Pick the answer"],
    )}
    <div class="tabs" id="tabs7"></div>
    <div class="stage">
      <img class="fig" src="assets/q7_options.png" alt="options"/>
      <div class="row">
        <div class="counter"><span>△</span><button onclick="c7('t',-1)">−</button><span id="t7">0</span><button onclick="c7('t',1)">+</button></div>
        <div class="counter"><span>□</span><button onclick="c7('s',-1)">−</button><span id="s7">0</span><button onclick="c7('s',1)">+</button></div>
      </div>
      <div class="info" id="ok7"></div>
    </div>
        """,
        r"""
let t=0,s=0,cur='A';
const tabs=document.getElementById('tabs7');
'ABCDE'.split('').forEach((L,i)=>{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L;
  b.onclick=()=>{ cur=L; document.querySelectorAll('#tabs7 .tab').forEach(x=>x.classList.remove('on')); b.classList.add('on'); t=0;s=0; upd7(); setMission(1); };
  tabs.appendChild(b);
});
function c7(k,d){ if(k==='t') t=Math.max(0,t+d); else s=Math.max(0,s+d); upd7(); }
function upd7(){
  document.getElementById('t7').textContent=t; document.getElementById('s7').textContent=s;
  const pass=t===3&&s<4;
  document.getElementById('ok7').textContent=document.body.classList.contains('en-mode')
    ? `Option ${cur}: triangles=${t}, squares=${s} → ${pass?'FITS':'does not fit'}`
    : `选项 ${cur}：黑三角=${t}，正方形=${s} → ${pass?'符合条件':'不符合'}`;
  setMission(pass?3:2);
}
upd7(); setMission(0);
""",
    )

    # Q8 braid
    pages[8] = page(
        8, "实验台：追三根绳子的颜色", "Lab: trace the three thread colours",
        f"""
    {mission(
        ["从编号 1、2、3 端点出发", "沿麻花绳追踪每一根", "记下绿/蓝/红", "对照文字选项"],
        ["Start from ends 1, 2, 3", "Trace each thread through the braid", "Assign green / blue / red", "Match the text options"],
    )}
    <div class="stage">
      <img class="fig" src="assets/q8_stem.png" alt="braid"/>
      <div class="row">
        <label>1 <select id="c1"><option value="">?</option><option>green</option><option>blue</option><option>red</option></select></label>
        <label>2 <select id="c2"><option value="">?</option><option>green</option><option>blue</option><option>red</option></select></label>
        <label>3 <select id="c3"><option value="">?</option><option>green</option><option>blue</option><option>red</option></select></label>
      </div>
      <div class="info" id="brInfo"></div>
      <button class="btn primary" onclick="chkBraid()"><span class="lang-zh">检查我的颜色分配</span><span class="lang-en">Check my colouring</span></button>
    </div>
    <p class="note lang-zh">三种颜色各用一次。分配好后去选项里找同一句话。</p>
    <p class="note lang-en">Use each colour once, then find the matching sentence in A–E.</p>
        """,
        r"""
function chkBraid(){
  const a=[c1.value,c2.value,c3.value];
  const ok=a.every(Boolean)&&new Set(a).size===3;
  document.getElementById('brInfo').textContent=document.body.classList.contains('en-mode')
    ? (ok?`You set 1=${a[0]}, 2=${a[1]}, 3=${a[2]}. Match options.`:'Pick three different colours.')
    : (ok?`你设 1=${a[0]}, 2=${a[1]}, 3=${a[2]}。去对照选项。`:'请为 1/2/3 选三种不同颜色。');
  setMission(ok?3:1);
}
setMission(0);
""",
    )

    # Q9: handcrafted drag-into-hole lab in 9.html — do not overwrite
    # pages[9] intentionally omitted
    # Q17–Q19: handcrafted labs — do not overwrite
    # pages[17], pages[18], pages[19] intentionally omitted

    # Q10 houses
    pages[10] = page(
        10, "实验台：检查每条路是否满 3 间", "Lab: check each road has 3 houses",
        f"""
    {mission(
        ["图上已有 11 间房子", "每条直路、每条环路都要恰好 3 间", "把候选点 A–E 逐个「试放」", "只有一个位置让全部路都满足"],
        ["11 houses are already placed", "Each straight/circular road needs exactly 3", "Try candidates A–E", "Only one spot makes every road work"],
    )}
    <div class="stage">
      <img class="fig sm" src="assets/q10_stem.png" alt="map"/>
      <div class="tabs" id="tabs10"></div>
      <div class="info" id="i10"></div>
      <p class="note lang-zh">策略：先找「还差 1 间」的路，它们的交集就是第 12 间的位置。</p>
      <p class="note lang-en">Strategy: find roads that still need 1 house; their intersection is the 12th house.</p>
    </div>
        """,
        r"""
const tabs=document.getElementById('tabs10');
'ABCDE'.split('').forEach((L,i)=>{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L;
  b.onclick=()=>{
    document.querySelectorAll('#tabs10 .tab').forEach(x=>x.classList.remove('on')); b.classList.add('on');
    document.getElementById('i10').textContent=document.body.classList.contains('en-mode')
      ? `Trying house at ${L}. Recheck every straight & circular road for count 3.`
      : `试把第 12 间放在 ${L}。重新数每条直路与环路是否都是 3。`;
    setMission(2);
  };
  tabs.appendChild(b);
});
setMission(0);
""",
    )

    # Q11 count cubes
    pages[11] = page(
        11, "实验台：逐个形状数方块", "Lab: count cubes in each shape",
        f"""
    {mission(
        ["每个形状点开计数", "注意被挡住的方块也要算", "比较五个数量", "选最多的那个选项"],
        ["Count cubes in each shape", "Include hidden cubes", "Compare the five totals", "Pick the largest"],
    )}
    <div class="tabs" id="tabs11"></div>
    <div class="stage">
      <img class="fig" src="assets/q11_options.png" alt="shapes"/>
      <div class="counter"><button onclick="c11(-1)">−</button><span id="n11">0</span><button onclick="c11(1)">+</button>
        <span class="lang-zh">块</span><span class="lang-en">cubes</span></div>
      <div class="info" id="i11"></div>
      <button class="btn ghost" onclick="save11()"><span class="lang-zh">记下这个形状的数量</span><span class="lang-en">Save this count</span></button>
    </div>
        """,
        r"""
let n=0, cur='A'; const saved={};
const tabs=document.getElementById('tabs11');
'ABCDE'.split('').forEach((L,i)=>{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L;
  b.onclick=()=>{ cur=L; n=saved[L]||0; document.getElementById('n11').textContent=n;
    document.querySelectorAll('#tabs11 .tab').forEach(x=>x.classList.remove('on')); b.classList.add('on'); show11(); setMission(1); };
  tabs.appendChild(b);
});
function c11(d){ n=Math.max(0,n+d); document.getElementById('n11').textContent=n; }
function save11(){ saved[cur]=n; show11(); setMission(2); }
function show11(){
  const parts='ABCDE'.split('').map(L=>L+':'+(saved[L]??'?'));
  document.getElementById('i11').textContent=parts.join('  ');
}
show11(); setMission(0);
""",
    )

    # Q12 flowers
    pages[12] = page(
        12, "实验台：两朵花分别求和", "Lab: sum each flower",
        f"""
    {mission(
        ["分清两朵花各自的花瓣", "把看得见的数字分别加总", "用「两花总和相等」求被挡数", "对照选项"],
        ["Separate the two flowers", "Add visible numbers on each", "Equal totals → find hidden", "Match options"],
    )}
    <div class="stage">
      <img class="fig sm" src="assets/q12_stem.png" alt="flowers"/>
      <div class="row">
        <label class="lang-zh">花 A 可见和</label><label class="lang-en">Flower A sum</label>
        <input id="sa" type="number" value="0" style="width:80px;font-size:18px;font-weight:800;padding:6px"/>
        <label class="lang-zh">花 B 可见和</label><label class="lang-en">Flower B sum</label>
        <input id="sb" type="number" value="0" style="width:80px;font-size:18px;font-weight:800;padding:6px"/>
      </div>
      <div class="info" id="i12"></div>
      <button class="btn primary" onclick="diff12()"><span class="lang-zh">求被挡花瓣</span><span class="lang-en">Find hidden</span></button>
    </div>
        """,
        r"""
function diff12(){
  const a=+sa.value, b=+sb.value;
  document.getElementById('i12').textContent=document.body.classList.contains('en-mode')
    ? `If hidden is on the smaller side: |A−B| = ${Math.abs(a-b)}`
    : `若挡住在数字和较小的那朵：|A−B| = ${Math.abs(a-b)}`;
  setMission(3);
}
setMission(0);
""",
    )

    # Q13: handcrafted "count white, not grey" race lab — do not overwrite
    # pages[13] intentionally omitted

    # Q14/Q15: handcrafted labs — do not overwrite
    # pages[14], pages[15] intentionally omitted

    # Q16 cookies
    pages[16] = page(
        16, "实验台：加到能被 5 整除", "Lab: add until divisible by 5",
        f"""
    {mission(
        ["现在有 12 块", "要平均分给 5 人", "试再烤 0–4 块", "找到刚能均分的数量"],
        ["Start with 12", "Share equally among 5", "Try baking 0–4 more", "Find the smallest that works"],
    )}
    <div class="stage">
      <input id="extra" type="range" min="0" max="4" value="0" style="width:100%" oninput="cook()"/>
      <div class="info" id="cookInfo"></div>
      <div id="cookies" class="row" style="justify-content:center"></div>
    </div>
        """,
        r"""
function cook(){
  const e=+document.getElementById('extra').value, t=12+e, ok=t%5===0;
  document.getElementById('cookInfo').innerHTML=document.body.classList.contains('en-mode')
    ? `+${e} → total ${t}. Each ${ok?t/5:'?'}. ${ok?'Equal!':'Not ÷5.'}`
    : `再烤 ${e} → 共 ${t}。每人 ${ok?t/5:'?'}。${ok?'可以均分！':'不能被 5 整除'}`;
  document.getElementById('cookies').innerHTML=Array.from({length:Math.min(t,20)},()=>'<span style="font-size:22px">🍪</span>').join('')+(t>20?'…':'');
  setMission(ok?3:2);
}
cook(); setMission(0);
""",
    )

    # Q17–Q19 handcrafted in 17.html / 18.html / 19.html

    # Q20 height
    pages[20] = page(
        20, "实验台：按箭头排出高矮", "Lab: order heights from arrows",
        f"""
    {mission(
        ["箭头甲→乙 表示甲比乙高", "从最高往下追，或找没有「更矮出口」的人", "最矮的人：没有箭头从别人指向「比他还矮」的链末端", "对照选项 A–E"],
        ["Arrow X→Y means X taller than Y", "Trace from tallest, or find the bottom of the chain", "Shortest is at the end of taller-than links", "Match A–E"],
    )}
    <div class="stage">
      <img class="fig sm" src="assets/q20_stem.png" alt="arrows"/>
      <div class="tabs" id="tabs20"></div>
      <div class="info" id="i20"></div>
    </div>
        """,
        r"""
const tabs=document.getElementById('tabs20');
'ABCDE'.split('').forEach((L,i)=>{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L;
  b.onclick=()=>{
    document.querySelectorAll('#tabs20 .tab').forEach(x=>x.classList.remove('on')); b.classList.add('on');
    document.getElementById('i20').textContent=document.body.classList.contains('en-mode')
      ? `Candidate shortest: person ${L}. Anyone with an arrow into a shorter person is not shortest.`
      : `最短候选人：${L}。若还有箭头指向比他更矮的人，他就不是最矮。`;
    setMission(2);
  };
  tabs.appendChild(b);
});
setMission(0);
""",
    )

    # Q21 apples
    pages[21] = page(
        21, "实验台：先算绿梨，再推黄苹果", "Lab: green pears first, then yellow apples",
        f"""
    {mission(
        ["梨共 8 个，黄梨 6 → 绿梨 = 2", "苹果数 = 绿色水果总数 + 3", "可推出黄苹果 = 绿梨 + 3", "得出数字"],
        ["8 pears, 6 yellow → 2 green pears", "Apples = green fruit + 3", "Yellow apples = green pears + 3", "Get the number"],
    )}
    <div class="stage">
      <div class="info" id="i21"></div>
      <button class="btn primary" onclick="step21()"><span class="lang-zh">一步步推演</span><span class="lang-en">Derive step by step</span></button>
    </div>
        """,
        r"""
let s=0;
function step21(){
  s=Math.min(3,s+1);
  const en=document.body.classList.contains('en-mode');
  const msgs=en?[
    'Green pears = 8 − 6. Write that number down.',
    'From the apple rule: yellow apples = (green pears) + 3.',
    'Finish the addition, then pick that number below.'
  ]:[
    '绿梨 = 8 − 6。先写下这个数。',
    '由苹果条件可推出：黄苹果 = 绿梨 + 3。',
    '算完加法后，在下方选出这个数。'
  ];
  document.getElementById('i21').textContent=msgs.slice(0,s).join(' · ');
  setMission(s);
}
setMission(0);
""",
    )

    # Q22 cross
    pages[22] = page(
        22, "实验台：中心数的奇偶", "Lab: parity of the centre",
        f"""
    {mission(
        ["中心数既在横行也在竖列", "左右之和 = 上下之和", "全部和 15 为奇数 → 中心必为奇数", "检验 1、3、5 是否都能排"],
        ["Centre is in both row and column", "Left+right = top+bottom", "Total 15 odd → centre must be odd", "Check that 1, 3, 5 all work"],
    )}
    <div class="stage" style="text-align:center">
      <img class="fig sm" src="assets/q22_stem.png" alt="cross"/>
      <div class="info" id="i22"></div>
      <button class="btn primary" onclick="c22()"><span class="lang-zh">推出中心必须是？</span><span class="lang-en">What must the centre be?</span></button>
    </div>
        """,
        r"""
function c22(){
  document.getElementById('i22').textContent=document.body.classList.contains('en-mode')
    ? 'Centre must be odd. Which option lists exactly the odd numbers from 1–5?'
    : '中心必须是奇数。哪个选项正好列出了 1–5 里全部奇数？';
  setMission(3);
}
setMission(0);
""",
    )

    # Q23 cube
    pages[23] = page(
        23, "实验台：对面和相同", "Lab: equal opposite-face sums",
        f"""
    {mission(
        ["看见的面上有 5、4、8 等", "三对对面共用同一个和 S", "试 S，使 5 的对面在选项里", "注意六个数互不相同且来自 1–9"],
        ["Visible faces include 5, 4, 8…", "Three opposite pairs share one sum S", "Try S so opposite-of-5 is an option", "Six distinct numbers from 1–9"],
    )}
    <div class="stage">
      <img class="fig xs" src="assets/q23_stem.png" alt="cube"/>
      <div class="row">
        <label>S <input id="S" type="number" value="11" style="width:70px;font-size:18px;font-weight:800;padding:6px"/></label>
        <button class="btn primary" onclick="cube()"><span class="lang-zh">若对面和为 S，5 的对面？</span><span class="lang-en">If pair sum is S, opposite 5?</span></button>
      </div>
      <div class="info" id="i23"></div>
    </div>
        """,
        r"""
function cube(){
  const S=+document.getElementById('S').value;
  const opp=S-5;
  document.getElementById('i23').textContent=document.body.classList.contains('en-mode')
    ? `Opposite 5 would be ${opp}. Check if a full triple of pairs with sum ${S} fits the figure.`
    : `5 的对面将是 ${opp}。再检查能否配齐三对和都为 ${S}，且符合图中可见数字。`;
  setMission(2);
}
setMission(0);
""",
    )

    # Q24 sweets
    pages[24] = page(
        24, "实验台：从结尾倒推两次交换", "Lab: reverse both exchanges",
        f"""
    {mission(
        ["最后：小强 4，小欧 4", "撤销「小欧→小强」：那时小强应是一半", "再撤销「小强→小欧」", "得到起初小强的糖果数"],
        ["End: John 4, Olivia 4", "Undo Olivia→John: John had half then", "Undo John→Olivia", "Get John’s start amount"],
    )}
    <div class="stage">
      <div class="info" id="i24"></div>
      <button class="btn primary" onclick="sw()"><span class="lang-zh">一步步倒推</span><span class="lang-en">Step backwards</span></button>
    </div>
        """,
        r"""
let s=0;
function sw(){
  s=Math.min(3,s+1);
  const en=document.body.classList.contains('en-mode');
  const msgs=en?[
    'End: both have 4.',
    'Undo Olivia→John: before that, John had half of 4, and Olivia had 4 plus that amount.',
    'Undo John→Olivia next: Olivia’s amount halves; John’s start = what he had after step 1 plus what he gave.'
  ]:[
    '最后：两人都是 4。',
    '撤销「小欧→小强」：那时小强是 4 的一半，小欧是 4 再加上这个数。',
    '再撤销「小强→小欧」：小欧当时数量再减半；小强起初 = 第一次后他的数量 + 他给出的数量。'
  ];
  document.getElementById('i24').textContent=msgs.slice(0,s).join(' ');
  setMission(s);
}
setMission(0);
""",
    )

    for n, html in pages.items():
        path = os.path.join(OUT, f"{n}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", n)

    # index
    links = []
    for n in range(1, 25):
        zh, en = TITLE[n]
        links.append(
            f'<a href="{n}.html"><span class="zh">{n} · {zh} · {PTS[n]}分</span>'
            f'<span class="en">{n} · {en} · {PTS[n]} pts</span></a>'
        )
    index = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2020 Level A · Interactive (all 24)</title>
<style>
:root{{--bg:#f0f9ff;--card:#fff;--ink:#0c4a6e;--muted:#64748b}}
*{{box-sizing:border-box}}
body{{font-family:'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;margin:0;min-height:100vh;background:radial-gradient(circle at top,#e0f2fe,var(--bg));color:#0f172a;padding:20px 14px 40px}}
.topbar{{display:flex;justify-content:space-between;align-items:center;max-width:800px;margin:0 auto 14px;gap:10px;flex-wrap:wrap}}
.brand{{font-weight:800;color:var(--ink);font-size:14px}}
.lang-btn{{border:2px solid #7dd3fc;background:#fff;border-radius:999px;padding:8px 16px;font-weight:800;cursor:pointer;color:var(--ink)}}
.wrap{{max-width:800px;margin:0 auto;background:var(--card);border-radius:22px;box-shadow:0 12px 28px rgba(2,132,199,.12);padding:22px}}
h1{{margin:0 0 8px;color:var(--ink);font-size:24px}}
.meta{{color:var(--muted);font-size:13px;margin-bottom:14px;line-height:1.55}}
h3{{margin:18px 0 8px;color:var(--ink);font-size:15px}}
.list a{{display:block;padding:12px 14px;margin:8px 0;border-radius:12px;background:#f0f9ff;border:2px solid #bae6fd;color:#0c4a6e;text-decoration:none;font-weight:700}}
.list a:hover{{background:#e0f2fe}}
.zh{{display:block}}.en{{display:none}}
body.en-mode .zh{{display:none}}body.en-mode .en{{display:block}}
</style>
</head>
<body>
<div class="topbar">
  <div class="brand">Math Kangaroo 2020 · Level A · 24 labs</div>
  <button class="lang-btn" onclick="document.body.classList.toggle('en-mode')">EN / 中文</button>
</div>
<div class="wrap">
  <h1 class="zh">2020 等级 A · 全部 24 题互动</h1>
  <h1 class="en">2020 Level A · All 24 interactive labs</h1>
  <p class="meta zh">每题：真题配图 + 实验台 + 中英切换。检查只提示对错。题库 JSON：<code>Math Kangaroo 2020 – Level 1*.json</code>。教师答案：<code>1-8-答案.md</code>、<code>9-16-答案.md</code>、<code>17-24-答案.md</code>。</p>
  <p class="meta en">Each lab: contest figures + experiment + EN/中文. Check only says right/wrong. Teacher keys in <code>*-答案.md</code>.</p>
  <h3 class="zh">3 分题（1–8）</h3>
  <h3 class="en">3-point (1–8)</h3>
  <div class="list">{''.join(links[:8])}</div>
  <h3 class="zh">4 分题（9–16）</h3>
  <h3 class="en">4-point (9–16)</h3>
  <div class="list">{''.join(links[8:16])}</div>
  <h3 class="zh">5 分题（17–24）</h3>
  <h3 class="en">5-point (17–24)</h3>
  <div class="list">{''.join(links[16:])}</div>
</div>
</body>
</html>
"""
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(index)
    print("wrote index.html")

    # split answer md
    rows = "\n".join(f"| {n} | {ANS[n]} | {PTS[n]} |" for n in range(1, 25))
    md = f"""# 2020 等级 A · 教师答案（全 24 题）

学生页检查按钮只提示对错，不显示选项字母。

| 题号 | 答案 | 分值 |
| --- | --- | --- |
{rows}

答案依据：Math Kangaroo 2020 PreEcolier / 中国卷等级 1。
"""
    with open(os.path.join(OUT, "答案.md"), "w", encoding="utf-8") as f:
        f.write(md)
    print("wrote 答案.md")


if __name__ == "__main__":
    # remove broken first draft call
    build_all()
