# -*- coding: utf-8 -*-
"""Generate A-2019 Level 1 interactive labs: all 24 questions + index + answer keys."""
from __future__ import annotations
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2019

ANS = {
    1: "D", 2: "C", 3: "C", 4: "E", 5: "B", 6: "C", 7: "A", 8: "C",
    9: "E", 10: "B", 11: "A", 12: "E", 13: "B", 14: "B", 15: "E", 16: "D",
    17: "D", 18: "A", 19: "D", 20: "B", 21: "C", 22: "D", 23: "A", 24: "C",
}
PTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

TITLE = {
    1: ("少于7的云", "Cloud with Numbers < 7"),
    2: ("项链片段", "Necklace Part"),
    3: ("袋鼠体重", "Kangaroo Weight"),
    4: ("切下的块", "Cut Piece"),
    5: ("排队中间", "Between in Queue"),
    6: ("袜子配对", "Sock Pairs"),
    7: ("长方形内的花", "Flowers in Rectangle"),
    8: ("苹果与梨", "Apples & Pears"),
    9: ("关两扇门", "Close Two Gates"),
    10: ("折纸剪片", "Fold & Cut"),
    11: ("叠卡顺序", "Stacked Cards"),
    12: ("猫的路径", "Cat Paths"),
    13: ("编织背面", "Weave from Back"),
    14: ("涂色面积", "Paint Area"),
    15: ("瓷砖边长", "Tile Length"),
    16: ("火车时刻", "Train Stops"),
    17: ("羊与牛", "Sheep & Cows"),
    18: ("三块拼图", "Three Pieces"),
    19: ("双峰骆驼", "Bactrian Camels"),
    20: ("松鼠坚果", "Squirrel Nuts"),
    21: ("沙堡高度", "Sandcastle Height"),
    22: ("颜色替换", "Colour Replace"),
    23: ("网格求和", "Grid Sum"),
    24: ("代币转换", "Token Machine"),
}

PROB = {
    1: (
        "哪朵云只包含少于 7 的数？",
        "Which cloud contains only numbers less than 7?",
    ),
    2: (
        "哪个图是这条项链的一部分？",
        "Which figure shows a part of this necklace?",
    ),
    3: (
        "袋鼠妈妈和 Jumper 共 <b>60 kg</b>，妈妈 <b>52 kg</b>，Jumper 多重？",
        "Mum and Jumper weigh <b>60 kg</b> together. Mum is <b>52 kg</b>. How heavy is Jumper?",
    ),
    4: (
        "Karen 切下哪一块？",
        "Which piece did Karen cut?",
    ),
    5: (
        "<b>12</b> 人排队，Lucy 从前往后数第 <b>7</b>，Kim 从后往前数第 <b>2</b>，中间有几人？",
        "<b>12</b> people in a queue. Lucy is <b>7th</b> from the front, Kim is <b>2nd</b> from the back. How many are between them?",
    ),
    6: (
        "袜子上的数字配对，能配几双？",
        "How many sock pairs can be made from matching numbers?",
    ),
    7: (
        "长方形内、三角形外有几朵花？",
        "How many flowers are inside the rectangle but outside the triangle?",
    ),
    8: (
        "两苹果 <b>6</b> 分，两梨 <b>8</b> 分，一苹果加一梨多少钱？",
        "Two apples cost <b>6</b>, two pears cost <b>8</b>. How much is one apple plus one pear?",
    ),
    9: (
        "关两扇门，使老鼠到不了奶酪。",
        "Close two gates so the mouse cannot reach the cheese.",
    ),
    10: (
        "折两次再剪，会得到几片纸？",
        "Fold twice then cut — how many pieces of paper?",
    ),
    11: (
        "五张叠卡，按移除顺序排列？",
        "Five stacked cards — in what order are they removed?",
    ),
    12: (
        "猫只能向右或向下，到牛奶有几种走法？",
        "The cat can only go right or down. How many ways to the milk?",
    ),
    13: (
        "编织从另一侧看是什么？",
        "What does the weave look like from the other side?",
    ),
    14: (
        "四个立方体粘成的形状，哪个涂色面积最小？",
        "Which shape made of four cubes has the smallest painted area?",
    ),
    15: (
        "瓷砖短边 <b>1 m</b>，问号边多长？",
        "Tile short side is <b>1 m</b>. How long is the side marked ?",
    ),
    16: (
        "<b>6:00</b> 出发，<b>23:00</b> 到达。站间用时 <b>2 + 3 + 7 + ?</b> 小时，<b>?</b> 是几？",
        "Depart <b>6:00</b>, arrive <b>23:00</b>. Stop times are <b>2 + 3 + 7 + ?</b> hours. What is <b>?</b>?",
    ),
    17: (
        "羊比牛多 <b>8</b>，牛是羊的一半，共几只动物？",
        "Sheep = cows + 8, and cows = half the sheep. How many animals in total?",
    ),
    18: (
        "哪张图被切成了三块？",
        "Which figure was cut into three pieces?",
    ),
    19: (
        "<b>10</b> 只骆驼共 <b>14</b> 个驼峰，几只双峰骆驼？",
        "<b>10</b> camels have <b>14</b> humps. How many are bactrian (two-hump)?",
    ),
    20: (
        "三只松鼠共 <b>7</b> 坚果，各不同且至少 <b>1</b>。Anni 最少，Asia 最多，Elli 几个？",
        "Three squirrels share <b>7</b> nuts (all different, at least <b>1</b> each). Anni has least, Asia most. How many for Elli?",
    ),
    21: (
        "旗杆一半插入沙中，顶端 <b>80 cm</b>、底端 <b>20 cm</b>，沙堡高多少？",
        "Half the flagpole is buried. Tip is <b>80 cm</b>, bottom <b>20 cm</b> above ground. Sandcastle height?",
    ),
    22: (
        "黑→白，灰→黑，白→灰。按 Ani、Bob、Chris 顺序替换后，图案怎样？",
        "Black→white, grey→black, white→grey. After Ani, Bob, Chris — what pattern?",
    ),
    23: (
        "在 <b>4×5</b> 数字格中选 <b>2×2</b>，和 <b>&gt; 63</b> 时必须含哪个数？",
        "Pick a <b>2×2</b> block in a <b>4×5</b> grid. If the sum must be <b>&gt; 63</b>, which number must it include?",
    ),
    24: (
        "开始有 <b>3</b> 红 <b>1</b> 白代币，机器最多用 <b>3</b> 次（红→<b>3</b>白 或 白→<b>2</b>红），最少几个代币？",
        "Start with <b>3</b> red and <b>1</b> white token. Up to <b>3</b> uses (R→<b>3</b>W or W→<b>2</b>R). Minimum tokens?",
    ),
}

CHOICE_LABELS = {
    3: ["2", "4", "8", "30", "46"],
    5: ["2", "3", "4", "5", "6"],
    6: ["3", "4", "5", "6", "8"],
    7: ["9", "10", "13", "17", "20"],
    8: ["5", "6", "7", "8", "9"],
    9: ["1和2", "2和3", "3和4", "3和5", "4和5"],
    10: ["2", "3", "4", "5", "6"],
    11: ["5-2-3-1-4", "5-2-3-4-1", "4-5-2-3-1", "5-3-2-1-4", "1-2-3-4-5"],
    12: ["2", "3", "4", "5", "6"],
    15: ["6m", "8m", "10m", "11m", "12m"],
    16: ["2", "3", "4", "5", "6"],
    17: ["16", "18", "20", "24", "28"],
    19: ["1", "2", "3", "4", "5"],
    20: ["1", "2", "3", "4", "5"],
    21: ["40", "45", "50", "55", "60"],
    23: ["14", "15", "17", "18", "20"],
    24: ["7", "6", "8", "5", "9"],
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
.colorchip{display:inline-block;width:36px;height:36px;border-radius:8px;border:2px solid #334155;font-size:11px;font-weight:800;line-height:32px;text-align:center;margin:2px}
.queue-row{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:8px 0}
.queue-cell{width:44px;height:44px;border-radius:10px;border:2px solid #cbd5e1;display:flex;align-items:center;justify-content:center;font-weight:800;background:#fff;font-size:12px}
.queue-cell.lucy{background:#fef3c7;border-color:#f59e0b}
.queue-cell.kim{background:#dbeafe;border-color:#0284c7}
.queue-cell.between{background:#f0fdf4;border-color:#86efac}
.path-grid{display:grid;grid-template-columns:repeat(3,52px);gap:6px;justify-content:center;margin:10px auto}
.path-cell{width:52px;height:52px;border-radius:10px;border:2px solid #cbd5e1;display:flex;align-items:center;justify-content:center;font-weight:800;background:#fff;cursor:pointer;font-size:20px}
.path-cell.on{background:#fef3c7;border-color:#f59e0b}
.path-cell.start{background:#dcfce7;border-color:#22c55e;cursor:default}
.path-cell.goal{background:#dbeafe;border-color:#0284c7;cursor:default}
.numgrid{display:grid;grid-template-columns:repeat(5,44px);gap:6px;justify-content:center;margin:10px auto}
.numgrid .cellpick.sel{background:#bbf7d0;border-color:#22c55e}
.token{display:inline-block;padding:8px 12px;border-radius:10px;font-weight:800;margin:3px}
.token.r{background:#fecaca;color:#991b1b}
.token.w{background:#f1f5f9;color:#334155}
"""


def enc(letter: str) -> str:
    return base64.b64encode(letter.encode()).decode()


def mission(steps_zh, steps_en):
    zh = "".join(
        f'<div class="step" data-i="{i}"><div class="num">{i+1}</div><div>{s}</div></div>'
        for i, s in enumerate(steps_zh)
    )
    en = "".join(
        f'<div class="step" data-i="{i}"><div class="num">{i+1}</div><div>{s}</div></div>'
        for i, s in enumerate(steps_en)
    )
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
<title>{YEAR} A · Q{n} · {zh_t}</title>
<style>{CSS}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode'); if(window.onLang) onLang();">🌐 EN / 中文</button>
<h1 class="lang-zh">{zh_t}</h1>
<h1 class="lang-en">{en_t}</h1>
<div class="meta lang-zh">Math Kangaroo {YEAR} · 等级 A · 第 {n} 题 · {PTS[n]} 分</div>
<div class="meta lang-en">Math Kangaroo {YEAR} · Level A · Q{n} · {PTS[n]} points</div>
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
    <div class="stage"><img class="fig sm" id="optView" src="assets/q{n}_options.png" alt="option" onerror="this.style.display='none'"/></div>
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


def build_all():
    pages = {}

    # Q1 clouds — tabs A–E, check each number < 7
    body, js = lab_compare_options(
        1,
        "逐朵云检查：云里<strong>每一个</strong>数都要 &lt; 7。有一朵不满足就排除。",
        "Check each cloud: <strong>every</strong> number must be &lt; 7. Eliminate any cloud with a number ≥ 7.",
    )
    pages[1] = page(
        1, "实验台：逐云检查是否全 &lt; 7", "Lab: check every number &lt; 7",
        body + """
    <div class="actions">
      <button class="btn primary" onclick="checkCloud()"><span class="lang-zh">我检查完了</span><span class="lang-en">Done checking</span></button>
    </div>
        """,
        js + r"""
function checkCloud(){
  document.getElementById('labInfo').textContent=document.body.classList.contains('en-mode')
    ? 'Only one cloud has ALL numbers less than 7. Pick that option.'
    : '只有一朵云里的数全部小于 7。选出对应选项。';
  setMission(3);
}
""",
    )

    # Q2 necklace
    body, js = lab_compare_options(
        2,
        "项链珠子按固定顺序重复。看选项里哪一段和题干「连续珠子」一致。",
        "Beads repeat in a fixed order. Find which option matches the consecutive beads in the stem.",
    )
    pages[2] = page(2, "实验台：匹配连续珠子", "Lab: match consecutive beads", body, js)

    # Q3 weight 60 - 52
    pages[3] = page(
        3, "实验台：60 − 52", "Lab: 60 − 52",
        f"""
    {mission(
        ["总重 60 kg，妈妈 52 kg", "Jumper = 60 − 52", "算出千克数", "对照选项"],
        ["Total 60 kg, Mum 52 kg", "Jumper = 60 − 52", "Find the weight", "Match options"],
    )}
    <div class="stage">
      <div class="row">
        <div class="counter">
          <span class="lang-zh">Jumper (kg)</span><span class="lang-en">Jumper (kg)</span>
          <button onclick="w3(-1)">−</button><span id="w3">8</span><button onclick="w3(1)">+</button>
        </div>
      </div>
      <div class="info" id="i3"></div>
      <button class="btn primary" onclick="calc3()"><span class="lang-zh">用 60−52 计算</span><span class="lang-en">Compute 60−52</span></button>
    </div>
        """,
        r"""
let w=8;
function w3(d){ w=Math.max(0,Math.min(60,w+d)); document.getElementById('w3').textContent=w; setMission(1); }
function calc3(){
  const j=60-52;
  document.getElementById('i3').textContent=document.body.classList.contains('en-mode')
    ? `60 − 52 = ${j} kg` : `60 − 52 = ${j} kg`;
  setMission(3);
}
setMission(0);
""",
    )

    # Q4 grid piece
    body, js = lab_compare_options(
        4,
        "想象 Karen 切下的块拼回网格。对照选项哪一块形状和缺口一致。",
        "Imagine the cut piece fitting back. Which option matches the missing shape?",
    )
    pages[4] = page(4, "实验台：对照切下的块", "Lab: match the cut piece", body, js)

    # Q5 queue
    pages[5] = page(
        5, "实验台：标出 Lucy 和 Kim", "Lab: mark Lucy & Kim",
        f"""
    {mission(
        ["12 人排成一行，位置 1…12", "Lucy 从前往后第 7", "Kim 从后往前第 2 → 位置 11", "数中间有几人"],
        ["12 people, positions 1…12", "Lucy is 7th from front", "Kim is 2nd from back → position 11", "Count between them"],
    )}
    <div class="stage">
      <div class="queue-row" id="queue5"></div>
      <div class="info" id="i5"></div>
      <button class="btn primary" onclick="count5()"><span class="lang-zh">数中间人数</span><span class="lang-en">Count between</span></button>
    </div>
        """,
        r"""
const q=document.getElementById('queue5');
for(let i=1;i<=12;i++){
  const c=document.createElement('div');
  c.className='queue-cell';
  if(i===7) c.classList.add('lucy');
  if(i===11) c.classList.add('kim');
  if(i>7&&i<11) c.classList.add('between');
  c.textContent=i;
  q.appendChild(c);
}
function count5(){
  const n=11-7-1;
  document.getElementById('i5').textContent=document.body.classList.contains('en-mode')
    ? `Between positions 7 and 11: ${n} people (positions 8,9,10).`
    : `第 7 与第 11 之间：${n} 人（位置 8、9、10）。`;
  setMission(3);
}
setMission(0);
""",
    )

    # Q6 socks
    body, js = lab_compare_options(
        6,
        "把相同数字的袜子配对。数有几对（一双 = 两只同号）。",
        "Pair socks with matching numbers. Count how many pairs (one pair = two matching socks).",
    )
    pages[6] = page(6, "实验台：数配对双数", "Lab: count matching pairs", body, js)

    # Q7 flowers
    body, js = lab_compare_options(
        7,
        "只数「在长方形里面、又在三角形外面」的花。三角形里的不要算。",
        "Count flowers inside the rectangle but outside the triangle. Ignore flowers inside the triangle.",
    )
    pages[7] = page(7, "实验台：长方形减三角形", "Lab: rectangle minus triangle", body, js)

    # Q8 apple/pear
    pages[8] = page(
        8, "实验台：先单价再相加", "Lab: unit prices then add",
        f"""
    {mission(
        ["2 苹果 = 6 → 1 苹果 = 3", "2 梨 = 8 → 1 梨 = 4", "1 苹果 + 1 梨 = ?", "对照选项"],
        ["2 apples = 6 → 1 apple = 3", "2 pears = 8 → 1 pear = 4", "1 apple + 1 pear = ?", "Match options"],
    )}
    <div class="stage">
      <div class="info" id="i8">2🍎=6 · 2🍐=8</div>
      <button class="btn primary" onclick="step8()"><span class="lang-zh">一步步算</span><span class="lang-en">Step by step</span></button>
    </div>
        """,
        r"""
let s=0;
function step8(){
  s=Math.min(3,s+1);
  const en=document.body.classList.contains('en-mode');
  const msgs=en?[
    'One apple = 6÷2 = 3',
    'One pear = 8÷2 = 4',
    'Apple + pear = 3 + 4 = 7'
  ]:[
    '一苹果 = 6÷2 = 3',
    '一梨 = 8÷2 = 4',
    '一苹果 + 一梨 = 3 + 4 = 7'
  ];
  document.getElementById('i8').textContent=msgs.slice(0,s).join(' · ');
  setMission(s);
}
setMission(0);
""",
    )

    # Q9 gates
    pages[9] = page(
        9, "实验台：试关两扇门", "Lab: try closing two gates",
        f"""
    {mission(
        ["老鼠要沿通路到奶酪", "关两扇门 = 选两个门号", "必须阻断所有通路", "对照选项里的门对"],
        ["Mouse must reach cheese on paths", "Close two gates = pick two numbers", "Block every route", "Match the gate pair in options"],
    )}
    <p class="tip lang-zh">策略：找「必经之路」上的门，试哪一对能完全挡住。</p>
    <p class="tip lang-en">Strategy: find gates on every path; try which pair blocks all routes.</p>
    <div class="tabs" id="tabs9"></div>
    <div class="info" id="i9"></div>
        """,
        r"""
const pairs=['1和2','2和3','3和4','3和5','4和5'];
const tabs=document.getElementById('tabs9');
'ABCDE'.split('').forEach((L,i)=>{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L+' '+pairs[i];
  b.onclick=()=>{
    document.querySelectorAll('#tabs9 .tab').forEach(x=>x.classList.remove('on')); b.classList.add('on');
    document.getElementById('i9').textContent=document.body.classList.contains('en-mode')
      ? `Try closing gates ${pairs[i]}. Does the mouse still have a path?`
      : `试关门 ${pairs[i]}。老鼠还能过去吗？`;
    setMission(2);
  };
  tabs.appendChild(b);
});
setMission(0);
""",
        choice_labels=CHOICE_LABELS[9],
    )

    # Q10 fold paper
    pages[10] = page(
        10, "实验台：跟踪层数", "Lab: track layers",
        f"""
    {mission(
        ["折一次 → 层数加倍", "再折一次 → 再加倍", "剪开：每层变成一片", "数总片数"],
        ["Fold once → layers double", "Fold again → double again", "Cut: each layer becomes a piece", "Count total pieces"],
    )}
    <p class="tip lang-zh">从 1 张纸开始：折 2 次后有几层？剪 1 刀通常每层各变 1 片。</p>
    <p class="tip lang-en">Start with 1 sheet: after 2 folds how many layers? One cut often splits each layer.</p>
    <div class="stage">
      <div class="info" id="i10">1 层</div>
      <button class="btn primary" onclick="fold10()"><span class="lang-zh">折一次</span><span class="lang-en">Fold once</span></button>
      <button class="btn accent" onclick="cut10()"><span class="lang-zh">剪开数片</span><span class="lang-en">Cut & count</span></button>
    </div>
        """,
        r"""
let layers=1, folds=0;
function fold10(){
  if(folds>=2) return;
  layers*=2; folds++;
  document.getElementById('i10').textContent=document.body.classList.contains('en-mode')
    ? `${folds} fold(s): ${layers} layer(s)` : `折 ${folds} 次：${layers} 层`;
  setMission(folds);
}
function cut10(){
  document.getElementById('i10').textContent=document.body.classList.contains('en-mode')
    ? `After cut: about ${layers} piece(s) per cut through all layers. Match options.`
    : `剪开后：每层 1 片，约 ${layers} 片。对照选项。`;
  setMission(3);
}
setMission(0);
""",
    )

    # Q11 cards order
    body, js = lab_compare_options(
        11,
        "每次只能拿走<strong>最上面且没有被别的牌挡</strong>的那张。模拟移除顺序。",
        "Each time remove the top card that is not covered. Simulate the removal order.",
    )
    pages[11] = page(
        11, "实验台：模拟移除顺序", "Lab: simulate removal order", body, js,
        choice_labels=CHOICE_LABELS[11],
    )

    # Q12 cat paths 3x3 grid
    pages[12] = page(
        12, "实验台：右/下路径计数", "Lab: count right/down paths",
        f"""
    {mission(
        ["3×3 格，猫在左上，牛奶在右下", "只能向右或向下", "点格子试一条路，或数全部走法", "组合数 C(4,2)=6"],
        ["3×3 grid: cat top-left, milk bottom-right", "Only right or down", "Try a path or count all routes", "Combinatorics: C(4,2)=6"],
    )}
    <div class="stage">
      <div class="path-grid" id="pg12"></div>
      <div class="info" id="i12"></div>
      <button class="btn primary" onclick="hint12()"><span class="lang-zh">需要走几步？</span><span class="lang-en">How many steps?</span></button>
      <button class="btn accent" onclick="combo12()"><span class="lang-zh">算 C(4,2)</span><span class="lang-en">Compute C(4,2)</span></button>
    </div>
        """,
        r"""
const pg=document.getElementById('pg12');
const coords=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
coords.forEach(([r,c],i)=>{
  const d=document.createElement('div');
  d.className='path-cell';
  d.dataset.r=r; d.dataset.c=c;
  if(r===0&&c===0){ d.classList.add('start'); d.textContent='🐱'; }
  else if(r===2&&c===2){ d.classList.add('goal'); d.textContent='🥛'; }
  else {
    d.onclick=()=>{ d.classList.toggle('on'); setMission(1); };
  }
  pg.appendChild(d);
});
function hint12(){
  document.getElementById('i12').textContent=document.body.classList.contains('en-mode')
    ? 'Need 2 rights + 2 downs = 4 moves total.'
    : '需要向右 2 次、向下 2 次，共 4 步。';
  setMission(2);
}
function combo12(){
  document.getElementById('i12').textContent=document.body.classList.contains('en-mode')
    ? 'Choose 2 of 4 moves to be "right": C(4,2) = 6 paths.'
    : '4 步里选 2 步向右：C(4,2) = 6 种走法。';
  setMission(3);
}
setMission(0);
""",
    )

    # Q13 weave back
    body, js = lab_compare_options(
        13,
        "编织从背面看：上下交错会翻转。对照选项里「从另一侧」的图案。",
        "From the back, over-under weave flips. Match the pattern seen from the other side.",
    )
    pages[13] = page(13, "实验台：想象背面", "Lab: imagine the back side", body, js)

    # Q14 paint area
    body, js = lab_compare_options(
        14,
        "四立方体粘在一起：接触面不涂色。连接越多 → 隐藏面越多 → 涂色面积越小。2×2 通常最小。",
        "Four cubes glued: hidden faces aren't painted. More joins → less paint. A 2×2 block often has smallest area.",
    )
    pages[14] = page(14, "实验台：比较涂色面积", "Lab: compare painted area", body, js)

    # Q15 tiles
    body, js = lab_compare_options(
        15,
        "短边 = 1 m。用图中比例推出问号边长。",
        "Short side = 1 m. Use the diagram scale to find the ? side length.",
    )
    pages[15] = page(
        15, "实验台：短边 1 m 推 ?", "Lab: short side 1 m → ?",
        body, js, choice_labels=CHOICE_LABELS[15],
    )

    # Q16 train 17-(2+3+7)
    pages[16] = page(
        16, "实验台：17 − 12", "Lab: 17 − 12",
        f"""
    {mission(
        ["6:00 到 23:00 共 17 小时", "已知站间 2 + 3 + 7", "? = 17 − (2+3+7)", "对照选项"],
        ["6:00 to 23:00 is 17 hours", "Known stops: 2 + 3 + 7", "? = 17 − (2+3+7)", "Match options"],
    )}
    <div class="stage">
      <div class="info" id="i16">2 + 3 + 7 + ? = 17</div>
      <button class="btn primary" onclick="calc16()"><span class="lang-zh">计算 ?</span><span class="lang-en">Find ?</span></button>
    </div>
        """,
        r"""
function calc16(){
  const q=17-(2+3+7);
  document.getElementById('i16').textContent=document.body.classList.contains('en-mode')
    ? `? = 17 − 12 = ${q} hour(s)` : `? = 17 − 12 = ${q} 小时`;
  setMission(3);
}
setMission(0);
""",
    )

    # Q17 sheep/cows
    pages[17] = page(
        17, "实验台：试羊和牛的数量", "Lab: try sheep & cows",
        f"""
    {mission(
        ["设羊 = S，牛 = C", "条件：S = C + 8", "条件：C = S ÷ 2", "求 S + C"],
        ["Let sheep = S, cows = C", "S = C + 8", "C = S ÷ 2", "Find S + C"],
    )}
    <div class="stage">
      <div class="row">
        <div class="counter"><span class="lang-zh">羊</span><span class="lang-en">Sheep</span>
          <button onclick="adj17('s',-1)">−</button><span id="s17">16</span><button onclick="adj17('s',1)">+</button></div>
        <div class="counter"><span class="lang-zh">牛</span><span class="lang-en">Cows</span>
          <button onclick="adj17('c',-1)">−</button><span id="c17">8</span><button onclick="adj17('c',1)">+</button></div>
      </div>
      <div class="info" id="i17"></div>
      <button class="btn primary" onclick="chk17()"><span class="lang-zh">检查条件</span><span class="lang-en">Check conditions</span></button>
    </div>
        """,
        r"""
let sheep=16, cows=8;
function adj17(k,d){
  if(k==='s') sheep=Math.max(0,sheep+d);
  else cows=Math.max(0,cows+d);
  document.getElementById('s17').textContent=sheep;
  document.getElementById('c17').textContent=cows;
  chk17(); setMission(1);
}
function chk17(){
  const ok1=sheep===cows+8, ok2=cows*2===sheep;
  const en=document.body.classList.contains('en-mode');
  document.getElementById('i17').textContent=en
    ? `Sheep=${sheep}, cows=${cows}. S=C+8: ${ok1?'✓':'✗'}. C=S/2: ${ok2?'✓':'✗'}. Total=${sheep+cows}`
    : `羊=${sheep}，牛=${cows}。S=C+8：${ok1?'✓':'✗'}。C=S/2：${ok2?'✓':'✗'}。共 ${sheep+cows} 只`;
  if(ok1&&ok2) setMission(3);
}
chk17(); setMission(0);
""",
    )

    # Q18 three pieces
    body, js = lab_compare_options(
        18,
        "哪张完整图被切成三块？看选项里三块能否拼回某个形状。",
        "Which whole figure was cut into three pieces? See which option's pieces fit together.",
    )
    pages[18] = page(18, "实验台：三块拼图", "Lab: three-piece puzzle", body, js)

    # Q19 camels
    pages[19] = page(
        19, "实验台：试双峰骆驼数", "Lab: try bactrian count",
        f"""
    {mission(
        ["10 只骆驼，14 个驼峰", "单峰 1 个，双峰 2 个", "调双峰数量使总驼峰 = 14", "得出几只双峰"],
        ["10 camels, 14 humps", "Dromedary 1 hump, bactrian 2", "Adjust bactrian count for 14 total", "How many bactrian?"],
    )}
    <div class="stage">
      <div class="counter">
        <span class="lang-zh">双峰</span><span class="lang-en">Bactrian</span>
        <button onclick="cam19(-1)">−</button><span id="b19">4</span><button onclick="cam19(1)">+</button>
      </div>
      <div class="info" id="i19"></div>
    </div>
        """,
        r"""
let b=4;
function cam19(d){
  b=Math.max(0,Math.min(10,b+d));
  document.getElementById('b19').textContent=b;
  const drom=10-b, humps=b*2+drom;
  const en=document.body.classList.contains('en-mode');
  document.getElementById('i19').textContent=en
    ? `${b} bactrian + ${drom} dromedary → ${humps} humps (need 14)`
    : `${b} 双峰 + ${drom} 单峰 → ${humps} 驼峰（要 14）`;
  if(humps===14) setMission(3);
  else setMission(1);
}
cam19(0); setMission(0);
""",
    )

    # Q20 nuts partitions of 7
    pages[20] = page(
        20, "实验台：7 的分法", "Lab: partitions of 7",
        f"""
    {mission(
        ["三只松鼠，坚果各不同，各至少 1，共 7", "Anni 最少，Asia 最多", "列出可能的三元组", "Elli 有几个"],
        ["Three squirrels, distinct counts ≥1, total 7", "Anni least, Asia most", "List possible triples", "How many for Elli?"],
    )}
    <p class="note lang-zh">例：(1,2,4)、(1,3,3) 不行（有相同）。试 Anni=1 或 2…</p>
    <p class="note lang-en">e.g. (1,2,4) works; (1,3,3) fails (duplicate). Try Anni=1 or 2…</p>
    <div class="stage">
      <div class="info" id="i20"></div>
      <button class="btn primary" onclick="part20()"><span class="lang-zh">列出有效分法</span><span class="lang-en">List valid splits</span></button>
    </div>
        """,
        r"""
function part20(){
  document.getElementById('i20').textContent=document.body.classList.contains('en-mode')
    ? 'Valid: (1,2,4) only with Anni=1, Asia=4, Elli=2. Check options.'
    : '有效：(1,2,4)，Anni=1，Asia=4，Elli=2。对照选项。';
  setMission(3);
}
setMission(0);
""",
    )

    # Q21 sandcastle 80+20 → pole 60 → height 50
    pages[21] = page(
        21, "实验台：旗杆与沙堡", "Lab: pole & sandcastle",
        f"""
    {mission(
        ["顶端 80 cm，底端 20 cm → 露出长度", "一半插入 → 整根旗杆长度", "沙堡高 = 露出 − 底端高度？", "对照选项"],
        ["Tip 80 cm, bottom 20 cm → visible length", "Half buried → full pole length", "Castle height from diagram", "Match options"],
    )}
    <div class="stage">
      <div class="info" id="i21">80 + 20 = ?</div>
      <button class="btn primary" onclick="step21()"><span class="lang-zh">一步步算</span><span class="lang-en">Step by step</span></button>
    </div>
        """,
        r"""
let s=0;
function step21(){
  s=Math.min(3,s+1);
  const en=document.body.classList.contains('en-mode');
  const msgs=en?[
    'Visible pole = 80 + 20 = 100 cm. Half buried → full pole = 200 cm.',
    'Buried part = 100 cm. Tip 80 above ground…',
    'Sandcastle height = 80 − 20 = 50 cm (from the figure).'
  ]:[
    '露出旗杆 = 80 + 20 = 100 cm。一半插入 → 整根 200 cm。',
    '插入部分 100 cm。顶端离地 80 cm…',
    '沙堡高 = 80 − 20 = 50 cm（对照图）。'
  ];
  document.getElementById('i21').textContent=msgs.slice(0,s).join(' · ');
  setMission(s);
}
setMission(0);
""",
    )

    # Q22 color replace — step transform, compare to options image
    pages[22] = page(
        22, "实验台：三步颜色替换", "Lab: three colour swaps",
        f"""
    {mission(
        ["起始：W B W G G W B G W", "Ani：黑→白", "Bob：灰→黑", "Chris：白→灰 → 对照选项图"],
        ["Start: W B W G G W B G W", "Ani: black→white", "Bob: grey→black", "Chris: white→grey → match options"],
    )}
    <p class="note lang-zh">W=白 B=黑 G=灰。每步只改对应颜色，其它不变。最后与选项图比对。</p>
    <p class="note lang-en">W=white, B=black, G=grey. Each step only swaps one colour. Compare final pattern to options.</p>
    <div class="stage">
      <div id="colors22" class="row"></div>
      <div class="info" id="i22"></div>
      <button class="btn primary" onclick="step22(0)"><span class="lang-zh">Ani：黑→白</span><span class="lang-en">Ani: B→W</span></button>
      <button class="btn primary" onclick="step22(1)"><span class="lang-zh">Bob：灰→黑</span><span class="lang-en">Bob: G→B</span></button>
      <button class="btn accent" onclick="step22(2)"><span class="lang-zh">Chris：白→灰</span><span class="lang-en">Chris: W→G</span></button>
      <button class="btn ghost" onclick="reset22()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button>
    </div>
        """,
        r"""
const COL={W:'#f8fafc',B:'#1e293b',G:'#94a3b8'};
const NAME={W:'W',B:'B',G:'G'};
let seq=['W','B','W','G','G','W','B','G','W'], step=0;
function draw22(){
  const box=document.getElementById('colors22');
  box.innerHTML=seq.map(c=>`<span class="colorchip" style="background:${COL[c]};color:${c==='B'?'#fff':'#111'}">${NAME[c]}</span>`).join('');
}
function step22(s){
  if(s===0){ seq=seq.map(c=>c==='B'?'W':c); document.getElementById('i22').textContent='Ani: B→W'; setMission(1); }
  else if(s===1){ seq=seq.map(c=>c==='G'?'B':c); document.getElementById('i22').textContent='Bob: G→B'; setMission(2); }
  else { seq=seq.map(c=>c==='W'?'G':c);
    document.getElementById('i22').textContent=document.body.classList.contains('en-mode')
      ? 'Chris: W→G. Compare this pattern to options A–E.'
      : 'Chris：白→灰。与下方选项图比对。';
    setMission(3);
  }
  draw22();
}
function reset22(){
  seq=['W','B','W','G','G','W','B','G','W'];
  document.getElementById('i22').textContent='';
  draw22(); setMission(0);
}
draw22(); setMission(0);
""",
    )

    # Q23 grid sum 4x5, 2x2 > 63, must include 14
    pages[23] = page(
        23, "实验台：选 2×2 求和", "Lab: pick 2×2 block sum",
        f"""
    {mission(
        ["1–20 填在 4×5 格", "点四个相邻格选 2×2", "算和，试哪些块 &gt; 63", "哪个数必须在块里"],
        ["Numbers 1–20 in 4×5 grid", "Click four adjacent cells for 2×2", "Find sums &gt; 63", "Which number must appear"],
    )}
    <div class="stage">
      <div class="numgrid" id="grid23"></div>
      <div class="info" id="i23"></div>
      <button class="btn ghost" onclick="clear23()"><span class="lang-zh">清除选择</span><span class="lang-en">Clear</span></button>
    </div>
        """,
        r"""
const vals=Array.from({length:20},(_,i)=>i+1);
let sel=[];
const g=document.getElementById('grid23');
vals.forEach((v,i)=>{
  const b=document.createElement('button');
  b.className='cellpick'; b.textContent=v; b.dataset.i=i;
  b.onclick=()=>{
    const idx=+b.dataset.i;
    if(sel.includes(idx)) sel=sel.filter(x=>x!==idx);
    else if(sel.length<4) sel.push(idx);
    else return;
    upd23();
  };
  g.appendChild(b);
});
function is2x2(idxs){
  if(idxs.length!==4) return false;
  const rs=idxs.map(i=>Math.floor(i/5)), cs=idxs.map(i=>i%5);
  const r0=Math.min(...rs), c0=Math.min(...cs);
  const set=new Set(idxs.map(i=>`${Math.floor(i/5)-r0},${i%5-c0}`));
  return set.size===4 && set.has('0,0')&&set.has('0,1')&&set.has('1,0')&&set.has('1,1');
}
function upd23(){
  document.querySelectorAll('#grid23 .cellpick').forEach((b,i)=>{
    b.classList.toggle('sel', sel.includes(i));
  });
  if(sel.length===4 && is2x2(sel)){
    const sum=sel.reduce((a,i)=>a+vals[i],0);
    const nums=sel.map(i=>vals[i]).sort((a,b)=>a-b);
    document.getElementById('i23').textContent=document.body.classList.contains('en-mode')
      ? `Sum=${sum}${sum>63?' > 63':''}. Numbers: ${nums.join(', ')}`
      : `和=${sum}${sum>63?' > 63':''}。含：${nums.join('、')}`;
    if(sum>63) setMission(3);
  } else {
    document.getElementById('i23').textContent=sel.length? (document.body.classList.contains('en-mode')?'Pick 4 cells in a 2×2 block':'选 2×2 四格'):'';
  }
}
function clear23(){ sel=[]; upd23(); setMission(0); }
setMission(0);
""",
    )

    # Q24 tokens 3R1W, max 3 conversions
    pages[24] = page(
        24, "实验台：代币转换", "Lab: token conversions",
        f"""
    {mission(
        ["开始 3 红 1 白（共 4 个）", "红→3 白：+2 个代币", "白→2 红：+1 个代币", "最多 3 次，试最少总数"],
        ["Start 3R 1W (4 tokens)", "R→3W: net +2 tokens", "W→2R: net +1 token", "Up to 3 uses — minimize total"],
    )}
    <div class="stage">
      <div id="tok24" class="row"></div>
      <div class="info" id="i24">3R 1W · 0/3 uses</div>
      <button class="btn primary" onclick="conv24('r')"><span class="lang-zh">1红→3白</span><span class="lang-en">1R→3W</span></button>
      <button class="btn primary" onclick="conv24('w')"><span class="lang-zh">1白→2红</span><span class="lang-en">1W→2R</span></button>
      <button class="btn ghost" onclick="reset24()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button>
    </div>
        """,
        r"""
let r=3,w=1,uses=0,minTotal=4;
function draw24(){
  const box=document.getElementById('tok24');
  box.innerHTML=[...Array(r)].map(()=>'<span class="token r">R</span>').join('')+
    [...Array(w)].map(()=>'<span class="token w">W</span>').join('');
  const t=r+w;
  minTotal=Math.min(minTotal,t);
  document.getElementById('i24').textContent=document.body.classList.contains('en-mode')
    ? `${r}R ${w}W · total ${t} · uses ${uses}/3 · best so far ${minTotal}`
    : `${r}红 ${w}白 · 共 ${t} 个 · 已用 ${uses}/3 · 目前最少 ${minTotal}`;
}
function conv24(type){
  if(uses>=3) return;
  if(type==='r' && r>=1){ r--; w+=3; uses++; }
  else if(type==='w' && w>=1){ w--; r+=2; uses++; }
  else return;
  draw24();
  if(uses===3) setMission(3);
  else setMission(uses);
}
function reset24(){ r=3;w=1;uses=0;minTotal=4; draw24(); setMission(0); }
draw24(); setMission(0);
""",
    )

    for n, html in pages.items():
        path = os.path.join(OUT, f"{n}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", n)

    # index.html
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
<title>{YEAR} Level A · Interactive (all 24)</title>
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
  <div class="brand">Math Kangaroo {YEAR} · Level A · 24 labs</div>
  <button class="lang-btn" onclick="document.body.classList.toggle('en-mode')">EN / 中文</button>
</div>
<div class="wrap">
  <h1 class="zh">{YEAR} 等级 A · 全部 24 题互动</h1>
  <h1 class="en">{YEAR} Level A · All 24 interactive labs</h1>
  <p class="meta zh">每题：真题配图 + 实验台 + 中英切换。检查只提示对错。教师答案：<code>1-8-答案.md</code>、<code>9-16-答案.md</code>、<code>17-24-答案.md</code>。</p>
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

    # answer markdown files
    rows_all = "\n".join(f"| {n} | {ANS[n]} | {PTS[n]} |" for n in range(1, 25))
    md_all = f"""# {YEAR} 等级 A · 教师答案（全 24 题）

学生页检查按钮只提示对错，不显示选项字母。

| 题号 | 答案 | 分值 |
| --- | --- | --- |
{rows_all}

答案：1D 2C 3C 4E 5B 6C 7A 8C 9E 10B 11A 12E 13B 14B 15E 16D 17D 18A 19D 20B 21C 22D 23A 24C
"""
    with open(os.path.join(OUT, "答案.md"), "w", encoding="utf-8") as f:
        f.write(md_all)
    print("wrote 答案.md")

    for start, end, pts_label, fname in [
        (1, 8, "3 分", "1-8-答案.md"),
        (9, 16, "4 分", "9-16-答案.md"),
        (17, 24, "5 分", "17-24-答案.md"),
    ]:
        rows = "\n".join(f"| {n} | {ANS[n]} |" for n in range(start, end + 1))
        md = f"""# {YEAR} 等级 A · 教师答案（{start}–{end} · {pts_label}）

| 题号 | 答案 |
| --- | --- |
{rows}

学生页检查只提示对错。
"""
        with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
            f.write(md)
        print("wrote", fname)


if __name__ == "__main__":
    build_all()
