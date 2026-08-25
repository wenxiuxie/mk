# -*- coding: utf-8 -*-
"""Generate B-2024 Level B interactive labs: all 24 questions + index + answer keys."""
from __future__ import annotations
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2024

ANS = {
    1: "E", 2: "C", 3: "C", 4: "C", 5: "D", 6: "C", 7: "E", 8: "B", 9: "C", 10: "A",
    11: "B", 12: "D", 13: "A", 14: "B", 15: "B", 16: "D", 17: "D", 18: "A", 19: "E", 20: "D",
    21: "D", 22: "C", 23: "E", 24: "D",
}
PTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

TITLE = {
    1: ("两个不同形状", "Two Different Shapes"),
    2: ("消防员的梯子", "Firefighter Ladders"),
    3: ("涂色的行与列", "Painted Rows and Column"),
    4: ("圆圈传球", "Soccer Circle Kick"),
    5: ("被擦掉的数字", "Erased Digits"),
    6: ("最贵的物品", "Most Expensive Item"),
    7: ("被撞掉的积木", "Knocked-Off Block"),
    8: ("海报后的灰砖", "Grey Tiles Behind Poster"),
    9: ("掷硬币前进", "Coin Toss Steps"),
    10: ("喜欢的水果", "Fruit Preferences"),
    11: ("拿走圆盘", "Removing Discs"),
    12: ("小企鹅吃鱼", "Penguin Chicks' Fish"),
    13: ("相交圆环", "Overlapping Rings"),
    14: ("毛毛虫拼图", "Caterpillar Puzzles"),
    15: ("翻转后的数字卡", "Flipped Number Cards"),
    16: ("正方形瓷砖边长", "Square Tile Side"),
    17: ("被虫吃掉的数字", "Worm-Eaten Digits"),
    18: ("积木称重", "Weighing Blocks"),
    19: ("黄背心橙书包", "Yellow Vest Orange Pack"),
    20: ("图形藏数字", "Hidden Digits Product"),
    21: ("青蛙同时跳", "Frogs Jump Together"),
    22: ("蜂巢蜂蜜格", "Honeycomb Honey Count"),
    23: ("饼干托盘", "Cookie Tray Order"),
    24: ("白红积木", "White and Red Blocks"),
}

PROB = {
    1: (
        "哪个正方形被切成了 <b>2 种不同</b> 的形状？",
        "Which square is cut into <b>2 different</b> shapes?",
    ),
    2: (
        "消防员不跳跃时，最少要用几把梯子才能到达火场？",
        "What is the smallest number of ladders the firefighter must use to reach the fire without jumping?",
    ),
    3: (
        "表格有 <b>28</b> 个白格。小艾涂 <b>2 行 + 1 列</b>（行从左到右，列从上到下）。还剩几个白格？",
        "The table has <b>28</b> white cells. Ira paints <b>2 rows + 1 column</b>. How many cells remain white?",
    ),
    4: (
        "球员 <b>1–11</b> 站成圆圈，每人把球踢给<strong>左边第 3 人</strong>。从 <b>1</b> 号开始，直到有人<strong>第二次</strong>拿到球。最后踢球的是几号？",
        "Players <b>1–11</b> stand in a circle. Each kicks to the <strong>3rd player on the left</strong>. Player <b>1</b> starts until someone gets the ball a <strong>second</strong> time. Who kicked last?",
    ),
    5: (
        "小莫写了 <b>3 个连续四位数</b>，姐姐擦掉一些数位。从左到右，被擦掉的是哪些数字？（例：213, 214, 215 是连续三位数）",
        "Mohammad wrote <b>3 consecutive 4-digit numbers</b>. His sister erased some digits. What are the missing digits (left to right)?",
    ),
    6: (
        "小李用 <b>7 美元</b>买了 <b>3 件</b>不同物品，每件都是整数美元。最贵的那件多少钱？",
        "Lizzy pays <b>7 dollars</b> for <b>3 different</b> whole-dollar items. How much is the most expensive?",
    ),
    7: (
        "小猫撞掉了小菲积木塔中的 <b>1 块</b>。撞掉之前，搭建可能是什么样？",
        "A cat knocks off <b>1 block</b> from Felix's construction. What could it have looked like before?",
    ),
    8: (
        "厨房墙上贴了袋鼠海报。海报<strong>后面</strong>有多少块灰色瓷砖？",
        "Alex has a Kangaroo poster on the wall. How many <strong>grey tiles</strong> are behind the poster?",
    ),
    9: (
        "掷硬币：紫色前进 <b>3</b> 格，绿色后退 <b>1</b> 格（或在起点不动）。两人从 <b>1</b> 号前出发，各掷 <b>4</b> 次。小安到 <b>4</b>，小卢到 <b>8</b>。一共几次绿色？",
        "Purple side: advance <b>3</b>. Green side: go back <b>1</b> or stay at start. Both start before <b>1</b>, each tosses <b>4</b> times. Antonia reaches <b>4</b>, Lucian <b>8</b>. Total green sides?",
    ),
    10: (
        "碗里有五种水果；每人得到一个<strong>自己喜欢且互不相同</strong>的水果。小本得到什么？",
        "Five fruits in a bowl. Everyone gets a fruit they like, all different. What does Ben get?",
    ),
    11: (
        "8 层圆盘塔：依次从底部往上拿走第 <b>2</b>、<b>3</b>、<b>4</b>、<b>5</b> 个（每次从新塔底部数）。最终是哪座塔？",
        "8-disc tower: remove the <b>2nd</b>, then <b>3rd</b>, then <b>4th</b>, then <b>5th</b> from the bottom (each time on the new tower). Which tower remains?",
    ),
    12: (
        "小皮每天带 <b>9</b> 条鱼：先看到的喂 <b>5</b> 条，后看到的喂 <b>4</b> 条。一只小企鹅吃了 <b>26</b> 条，另一只吃了多少？",
        "Peter brings <b>9</b> fish daily: first chick seen gets <b>5</b>, second gets <b>4</b>. One chick ate <b>26</b>. How many did the other eat?",
    ),
    13: (
        "数字 <b>1–7</b> 放在 <b>4</b> 个相交圆环中，每个圆环数字和为 <b>10</b>。问号下是哪个数？",
        "Cards <b>1–7</b> in <b>4</b> overlapping rings. Each ring sums to <b>10</b>. Which number is under the question mark?",
    ),
    14: (
        "毛毛虫有头、尾，中间放 <b>1、2 或 3</b> 片拼图（不翻转）。能拼出几种不同毛毛虫？",
        "A caterpillar has head, tail, and <b>1, 2, or 3</b> pieces in between (no flipping). How many different caterpillars?",
    ),
    15: (
        "正面写 <b>1–4</b>，翻面写 <b>5–8</b>，剪成 4 张卡排成 <b>? 5 ? 6</b>。两个问号的数字之和是多少？",
        "Front <b>1–4</b>, back <b>5–8</b>, cut into 4 cards in a row: <b>? 5 ? 6</b>. Sum of the two ? numbers?",
    ),
    16: (
        "长方形瓷砖 <b>23 cm × 11 cm</b>。图中正方形瓷砖边长是多少？",
        "Rectangular tiles are <b>23 cm × 11 cm</b>. What is the side length of the square tiles?",
    ),
    17: (
        "三张卡片数字之和 <b>782</b>，每张都被虫吃掉一部分。被吃掉的 <b>3 个数字</b>之和是多少？",
        "Three cards sum to <b>782</b>. A worm ate part of each. What is the sum of the <b>3 missing digits</b>?",
    ),
    18: (
        "三个天平分别显示 <b>200 g</b>、<b>100 g</b>、<b>240 g</b>。三种不同积木<strong>合在一起</strong>多重？",
        "Scales show <b>200 g</b>, <b>100 g</b>, <b>240 g</b>. How much do the <b>3 different blocks</b> weigh together?",
    ),
    19: (
        "<b>60</b> 名学生：背心黄绿黄绿…，书包红棕橙红棕橙…。穿<strong>黄色背心</strong>且背<strong>橙色书包</strong>的有几人？",
        "<b>60</b> pupils: vests yellow, green, yellow, green…; backpacks red, brown, orange, red, brown, orange… How many have a <strong>yellow vest</strong> and <strong>orange backpack</strong>?",
    ),
    20: (
        "相同图形代表相同数字，不同图形代表不同数字。三个相同图形相乘的值是多少？",
        "Same shapes hide the same digits, different shapes hide different digits. What is the product of the three shapes?",
    ),
    21: (
        "每行每列恰好 <b>2</b> 只青蛙。其中 <b>2</b> 只同时跳到相邻空格，跳后仍每行每列 <b>2</b> 只。有几种跳法？",
        "Exactly <b>2</b> frogs per row and column. Two jump together to neighbouring empty cells; still <b>2</b> per row/column. In how many ways?",
    ),
    22: (
        "蜂巢 <b>9</b> 格，数字表示相邻格中有蜂蜜的格数。共有几格含蜂蜜？",
        "A <b>9</b>-cell beehive: each number shows how many neighbouring cells contain honey. How many cells have honey?",
    ),
    23: (
        "三个女孩依次拿走：全部心形 / 全部白色 / 全部大块（顺序不定）。分别拿 <b>3、6、7</b> 块。哪组是其中一人拿走的？",
        "Three girls take all hearts / all white / all large (order unknown). They take <b>3, 6, 7</b> cookies. Which set did one girl take?",
    ),
    24: (
        "小立方体 = <b>4 白</b> 或 <b>1 白 + 1 红</b>。大立方体由小立方体组成。最少需要几块白色积木？",
        "A small cube = <b>4 white</b> OR <b>1 white + 1 red</b>. The large cube is made of small cubes. Minimum white blocks?",
    ),
}

CHOICE_LABELS = {
    2: ["4", "5", "6", "7", "8"],
    3: ["8", "10", "12", "14", "17"],
    4: ["7", "8", "9", "10", "11"],
    5: ["389/3/99", "489/3/96", "489/4/98", "489/4/99", "488/4/99"],
    6: ["2$", "3$", "4$", "5$", "6$"],
    8: ["15", "21", "25", "30", "35"],
    9: ["1", "2", "3", "4", "5"],
    12: ["19", "22", "25", "28", "31"],
    13: ["1", "2", "4", "5", "7"],
    14: ["3", "4", "5", "6", "7"],
    15: ["3", "4", "5", "6", "7"],
    16: ["3cm", "4cm", "5cm", "6cm", "7cm"],
    17: ["8", "9", "10", "11", "12"],
    18: ["270g", "280g", "290g", "300g", "310g"],
    19: ["3", "4", "6", "8", "10"],
    20: ["0", "15", "18", "28", "30"],
    21: ["1", "2", "3", "4", "5"],
    22: ["4", "5", "6", "7", "8"],
    24: ["8", "11", "13", "14", "23"],
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
.circle-row{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:8px 0}
.circle-cell{width:40px;height:40px;border-radius:50%;border:2px solid #cbd5e1;display:flex;align-items:center;justify-content:center;font-weight:800;background:#fff;font-size:12px}
.circle-cell.on{background:#fef3c7;border-color:#f59e0b}
.circle-cell.ball{background:#dbeafe;border-color:#0284c7}
.coinchip{display:inline-block;padding:6px 10px;border-radius:8px;font-weight:800;margin:3px;cursor:pointer;border:2px solid #cbd5e1}
.coinchip.purple{background:#e9d5ff;border-color:#9333ea;color:#581c87}
.coinchip.green{background:#bbf7d0;border-color:#22c55e;color:#166534}
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
<title>{YEAR} B · Q{n} · {zh_t}</title>
<style>{CSS}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode'); if(window.onLang) onLang();">🌐 EN / 中文</button>
<h1 class="lang-zh">{zh_t}</h1>
<h1 class="lang-en">{en_t}</h1>
<div class="meta lang-zh">Math Kangaroo {YEAR} · 等级 B · 第 {n} 题 · {PTS[n]} 分</div>
<div class="meta lang-en">Math Kangaroo {YEAR} · Level B · Q{n} · {PTS[n]} points</div>
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

    # Q1 — two different shapes
    body, js = lab_compare_options(
        1,
        "只有<strong>一种</strong>图形被切成两块<strong>形状不同</strong>的正方形。灰块与白块格子数也要不同。",
        "Only <strong>one</strong> square is cut into <strong>two different</strong> shapes. Grey and white parts should differ in shape.",
    )
    pages[1] = page(1, "实验台：对照选项形状", "Lab: compare cut shapes", body, js)

    # Q2 — firefighter ladders
    body, js = lab_compare_options(
        2,
        "消防员只能沿梯子走，不能跳格。在图上试最少要爬几把梯子。",
        "The firefighter can only use ladders, no jumping. Count the minimum ladders on the diagram.",
    )
    pages[2] = page(
        2, "实验台：数最少梯子", "Lab: count minimum ladders", body, js,
        choice_labels=CHOICE_LABELS[2],
    )

    # Q3 — painted rows/column
    pages[3] = page(
        3, "实验台：28 − 涂色格", "Lab: 28 − painted cells",
        f"""
    {mission(
        ["表格共 28 个白格（7 列 × 4 行）", "涂 2 行 = 2×7 = 14 格", "再涂 1 列 = 4 格，但角上 2 格重复", "剩余 = 28 − 14 − 4 + 2"],
        ["28 white cells (7×4 grid)", "Paint 2 rows → 2×7 = 14", "Paint 1 column → 4, overlap 2 corners", "Remain = 28 − 14 − 4 + 2"],
    )}
    <div class="stage">
      <div class="info" id="i3">28 白格 · 2 行 + 1 列</div>
      <button class="btn primary" onclick="calc3()"><span class="lang-zh">计算剩余白格</span><span class="lang-en">Compute remaining white</span></button>
    </div>
        """,
        r"""
function calc3(){
  const rows=2, cols=7, colCells=4, overlap=2;
  const painted=rows*cols+colCells-overlap;
  const remain=28-painted;
  document.getElementById('i3').textContent=document.body.classList.contains('en-mode')
    ? `28 − (${rows}×${cols} + ${colCells} − ${overlap}) = ${remain} white cells`
    : `28 − (${rows}×${cols} + ${colCells} − ${overlap}) = 还剩 ${remain} 个白格`;
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[3],
    )

    # Q4 — soccer circle kick
    pages[4] = page(
        4, "实验台：模拟圆圈传球", "Lab: simulate circle kicks",
        f"""
    {mission(
        ["11 人围圈，1 号先拿球", "每次踢给左边第 3 人", "记录每次踢球者", "直到有人第二次拿到球"],
        ["11 players, #1 starts with ball", "Kick to 3rd on the left each time", "Track each kicker", "Stop when someone gets ball twice"],
    )}
    <div class="stage">
      <div class="circle-row" id="circ4"></div>
      <div class="info" id="i4"></div>
      <button class="btn primary" onclick="kick4()"><span class="lang-zh">踢一次</span><span class="lang-en">Kick once</span></button>
      <button class="btn accent" onclick="run4()"><span class="lang-zh">自动踢完</span><span class="lang-en">Run to end</span></button>
      <button class="btn ghost" onclick="reset4()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button>
    </div>
        """,
        r"""
const N=11;
let holder=1, counts={}, kicks=[], done=false;
function left3(p){ return ((p-1+3)%N)+1; }
function draw4(){
  const row=document.getElementById('circ4');
  row.innerHTML='';
  for(let i=1;i<=N;i++){
    const c=document.createElement('div');
    c.className='circle-cell'+(i===holder?' ball':'')+(counts[i]===2?' on':'');
    c.textContent=i;
    row.appendChild(c);
  }
}
function step4(){
  if(done) return;
  counts[holder]=(counts[holder]||0)+1;
  if(counts[holder]===2){ done=true; return null; }
  const kicker=holder;
  holder=left3(holder);
  kicks.push(kicker);
  return kicker;
}
function kick4(){
  const k=step4(); draw4();
  const en=document.body.classList.contains('en-mode');
  if(done){
    const last=kicks[kicks.length-1];
    document.getElementById('i4').textContent=en
      ? `Player ${holder} got the ball twice. Last kicker: #${last}. Kicks: ${kicks.join('→')}`
      : `#${holder} 第二次拿球。最后踢球：#${last}。顺序：${kicks.join('→')}`;
    setMission(3);
  } else if(k){
    document.getElementById('i4').textContent=en?`#${k} kicked to #${holder}`:`#${k} 踢给 #${holder}`;
    setMission(1);
  }
}
function run4(){ while(!done) step4(); draw4(); kick4(); }
function reset4(){ holder=1; counts={}; kicks=[]; done=false; draw4();
  document.getElementById('i4').textContent=''; setMission(0); }
draw4(); setMission(0);
""",
        choice_labels=CHOICE_LABELS[4],
    )

    # Q5 — erased digits
    body, js = lab_compare_options(
        5,
        "三个连续四位数：4897, 4898, 4899。从左到右找出被擦掉的数字组。",
        "Three consecutive numbers: 4897, 4898, 4899. Find the missing digit groups left to right.",
    )
    pages[5] = page(
        5, "实验台：连续四位数", "Lab: consecutive 4-digit numbers", body, js,
        choice_labels=CHOICE_LABELS[5],
    )

    # Q6 — most expensive item
    pages[6] = page(
        6, "实验台：7 美元三分", "Lab: split 7 dollars",
        f"""
    {mission(
        ["3 件不同，整数美元，共 7", "试找三组正整数", "1 + 2 + 4 = 7", "最贵的是 4 美元"],
        ["3 distinct whole-dollar items, total 7", "Find a valid triple", "1 + 2 + 4 = 7", "Most expensive is 4 dollars"],
    )}
    <p class="tip lang-zh">提示：<b>1 + 2 + 4 = 7</b>，三件各不相同。</p>
    <p class="tip lang-en">Tip: <b>1 + 2 + 4 = 7</b> with three different amounts.</p>
    <div class="stage">
      <div class="info" id="i6">? + ? + ? = 7</div>
      <button class="btn primary" onclick="show6()"><span class="lang-zh">显示唯一分法</span><span class="lang-en">Show unique split</span></button>
    </div>
        """,
        r"""
function show6(){
  document.getElementById('i6').textContent=document.body.classList.contains('en-mode')
    ? 'Only 1 + 2 + 4 = 7 works. Most expensive = 4 dollars.'
    : '只有 1 + 2 + 4 = 7。最贵 = 4 美元。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[6],
    )

    # Q7 — knocked-off block
    body, js = lab_compare_options(
        7,
        "现在少 1 块。看哪个选项与现状<strong>只差 1 块</strong>。",
        "One block is missing now. Which option differs by <strong>only one block</strong> from the current shape?",
    )
    pages[7] = page(7, "实验台：只差一块", "Lab: one block difference", body, js)

    # Q8 — grey tiles
    pages[8] = page(
        8, "实验台：3+4 行模式", "Lab: 3+4 row pattern",
        f"""
    {mission(
        ["海报后有 6 行灰砖", "奇数行 3 块，偶数行 4 块", "每 2 行共 7 块", "6 行 → 3×7 = 21"],
        ["6 rows of grey tiles behind poster", "Odd rows: 3 tiles, even rows: 4", "Every 2 rows = 7 tiles", "6 rows → 3×7 = 21"],
    )}
    <p class="tip lang-zh">提示：<b>3 + 4</b> 交替，共 6 行 → <b>3 × 7 = 21</b>。</p>
    <p class="tip lang-en">Tip: alternating <b>3 + 4</b> for 6 rows → <b>3 × 7 = 21</b>.</p>
    <div class="stage">
      <div class="info" id="i8"></div>
      <button class="btn primary" onclick="pat8()"><span class="lang-zh">数行模式</span><span class="lang-en">Count row pattern</span></button>
    </div>
        """,
        r"""
function pat8(){
  document.getElementById('i8').textContent=document.body.classList.contains('en-mode')
    ? 'Rows: 3+4+3+4+3+4 = 21 grey tiles behind the poster.'
    : '各行：3+4+3+4+3+4 = 海报后共 21 块灰砖。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[8],
    )

    # Q9 — coin toss
    pages[9] = page(
        9, "实验台：紫/绿计数", "Lab: purple/green counters",
        f"""
    {mission(
        ["起点在第 1 格前（位置 1）", "紫色 +3，绿色 −1（不低于 1）", "各掷 4 次：小安到 4，小卢到 8", "数总共几次绿色"],
        ["Start at position 1", "Purple +3, green −1 (not below 1)", "4 tosses each: Antonia→4, Lucian→8", "Count total green sides"],
    )}
    <div class="stage">
      <div class="info"><span class="lang-zh"><b>小安</b></span><span class="lang-en"><b>Antonia</b></span>
        · <span class="lang-zh">紫</span><span class="lang-en">P</span> <span id="ap">0</span>
        · <span class="lang-zh">绿</span><span class="lang-en">G</span> <span id="ag">0</span>
        · <span class="lang-zh">位置</span><span class="lang-en">pos</span> <span id="apos">1</span></div>
      <div class="row">
        <button class="coinchip purple" onclick="coin9('a','p')">🟣 +3</button>
        <button class="coinchip green" onclick="coin9('a','g')">🟢 −1</button>
      </div>
      <div class="info"><span class="lang-zh"><b>小卢</b></span><span class="lang-en"><b>Lucian</b></span>
        · <span class="lang-zh">紫</span><span class="lang-en">P</span> <span id="lp">0</span>
        · <span class="lang-zh">绿</span><span class="lang-en">G</span> <span id="lg">0</span>
        · <span class="lang-zh">位置</span><span class="lang-en">pos</span> <span id="lpos">1</span></div>
      <div class="row">
        <button class="coinchip purple" onclick="coin9('l','p')">🟣 +3</button>
        <button class="coinchip green" onclick="coin9('l','g')">🟢 −1</button>
      </div>
      <div class="info" id="i9"></div>
      <button class="btn primary" onclick="hint9()"><span class="lang-zh">对照目标位置</span><span class="lang-en">Check target positions</span></button>
    </div>
        """,
        r"""
const st={a:{p:0,g:0,pos:1,toss:0}, l:{p:0,g:0,pos:1,toss:0}};
function upd9(){
  ['a','l'].forEach(k=>{
    document.getElementById(k+'p').textContent=st[k].p;
    document.getElementById(k+'g').textContent=st[k].g;
    document.getElementById(k+'pos').textContent=st[k].pos;
  });
  const tg=st.a.g+st.l.g;
  document.getElementById('i9').textContent=document.body.classList.contains('en-mode')
    ? `Total green so far: ${tg}. Need Antonia→4, Lucian→8.`
    : `目前绿色共 ${tg} 次。目标：小安→4，小卢→8。`;
}
function coin9(who,c){
  if(st[who].toss>=4) return;
  st[who].toss++;
  if(c==='p'){ st[who].p++; st[who].pos+=3; }
  else { st[who].g++; st[who].pos=Math.max(1,st[who].pos-1); }
  upd9(); setMission(1);
}
function hint9(){
  document.getElementById('i9').textContent=document.body.classList.contains('en-mode')
    ? 'Antonia: 2 purple + 2 green → 4. Lucian: 3 purple + 1 green → 8. Total green = 3.'
    : '小安：2 紫 2 绿 → 4。小卢：3 紫 1 绿 → 8。绿色共 3 次。';
  setMission(3);
}
upd9(); setMission(0);
""",
        choice_labels=CHOICE_LABELS[9],
    )

    # Q10 — fruit preferences
    body, js = lab_compare_options(
        10,
        "每人拿一种自己喜欢的、且互不相同的水果。用排除法：别人拿走后，小本只剩一种。",
        "Each gets a different liked fruit. Eliminate what others take — Ben gets what's left for him.",
    )
    pages[10] = page(10, "实验台：排除水果", "Lab: eliminate fruits", body, js)

    # Q11 — removing discs
    body, js = lab_compare_options(
        11,
        "从底部数：拿走第 2、3、4、5 个（每次从新塔底部重新数）。模拟颜色顺序。",
        "From the bottom: remove 2nd, 3rd, 4th, 5th (re-count from new bottom each time). Track colours.",
    )
    pages[11] = page(11, "实验台：模拟拿圆盘", "Lab: simulate disc removal", body, js)

    # Q12 — penguin fish
    pages[12] = page(
        12, "实验台：26 条鱼怎么分", "Lab: how 26 fish add up",
        f"""
    {mission(
        ["每天 9 条：先 5 后 4", "一只吃了 26 条", "26 = 4×4 + 2×5（4 天拿 4 条，2 天拿 5 条）", "另一只：4×5 + 2×4 = 28"],
        ["9 fish/day: 5 then 4", "One chick ate 26", "26 = 4×4 + 2×5 (four 4-fish days, two 5-fish days)", "Other: 4×5 + 2×4 = 28"],
    )}
    <p class="tip lang-zh">提示：<b>26 = 4×4 + 2×5</b> → 另一只 <b>28</b>。</p>
    <p class="tip lang-en">Tip: <b>26 = 4×4 + 2×5</b> → the other ate <b>28</b>.</p>
    <div class="stage">
      <div class="info" id="i12"></div>
      <button class="btn primary" onclick="calc12()"><span class="lang-zh">算另一只</span><span class="lang-en">Find other chick</span></button>
    </div>
        """,
        r"""
function calc12(){
  document.getElementById('i12').textContent=document.body.classList.contains('en-mode')
    ? '26 = 4×4 + 2×5. Same days → other chick: 4×5 + 2×4 = 28 fish.'
    : '26 = 4×4 + 2×5。同样天数 → 另一只：4×5 + 2×4 = 28 条。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[12],
    )

    # Q13 — overlapping rings
    body, js = lab_compare_options(
        13,
        "每个圆环和为 10。从已知数字 6 和 3 推出相邻卡片，再求问号。",
        "Each ring sums to 10. Use known 6 and 3 to find neighbours, then the ? card.",
    )
    pages[13] = page(
        13, "实验台：圆环求和", "Lab: ring sums", body, js,
        choice_labels=CHOICE_LABELS[13],
    )

    # Q14 — caterpillar
    body, js = lab_compare_options(
        14,
        "头 + 尾 + 中间 1/2/3 片，不翻转。数不同排列（拼图编号 1–8）。",
        "Head + tail + 1/2/3 middle pieces, no flipping. Count distinct arrangements (pieces 1–8).",
    )
    pages[14] = page(
        14, "实验台：数毛毛虫", "Lab: count caterpillars", body, js,
        choice_labels=CHOICE_LABELS[14],
    )

    # Q15 — flipped cards
    pages[15] = page(
        15, "实验台：正反配对", "Lab: front/back pairs",
        f"""
    {mission(
        ["纸正反面：1↔7，2↔6，3↔8，4↔5", "排成 ? 5 ? 6", "5 的背面是 4，6 的背面是 2", "两个 ? 对应 7 和 8 → 和 = 4"],
        ["Pairs: 1↔7, 2↔6, 3↔8, 4↔5", "Row shows ? 5 ? 6", "Back of 5 is 4, back of 6 is 2", "Two ? are 1 and 3 → sum = 4"],
    )}
    <p class="tip lang-zh">提示：配对 <b>1↔7, 2↔6, 3↔8, 4↔5</b>，两个 ? 之和 = <b>4</b>。</p>
    <p class="tip lang-en">Tip: pairs <b>1↔7, 2↔6, 3↔8, 4↔5</b>; sum of ?? = <b>4</b>.</p>
    <div class="stage">
      <div class="info" id="i15">? 5 ? 6</div>
      <button class="btn primary" onclick="pair15()"><span class="lang-zh">找 ? 的数字</span><span class="lang-en">Find ? digits</span></button>
    </div>
        """,
        r"""
function pair15(){
  document.getElementById('i15').textContent=document.body.classList.contains('en-mode')
    ? '? marks are 1 and 3 (behind 7 and 8). Sum = 4.'
    : '两个 ? 是 1 和 3（在 7、8 背面）。和 = 4。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[15],
    )

    # Q16 — square tile side
    pages[16] = page(
        16, "实验台：23 = 11 + 2s", "Lab: 23 = 11 + 2s",
        f"""
    {mission(
        ["长方形 23×11 cm", "长边 = 短边 + 两个正方形边", "23 = 11 + 2s", "s = 6 cm"],
        ["Rectangle 23×11 cm", "Long side = short side + two square sides", "23 = 11 + 2s", "s = 6 cm"],
    )}
    <p class="tip lang-zh">提示：<b>23 = 11 + 2s</b> → <b>s = 6 cm</b>。</p>
    <p class="tip lang-en">Tip: <b>23 = 11 + 2s</b> → <b>s = 6 cm</b>.</p>
    <div class="stage">
      <div class="info" id="i16">23 = 11 + 2 × ?</div>
      <button class="btn primary" onclick="calc16()"><span class="lang-zh">求正方形边长</span><span class="lang-en">Find square side</span></button>
    </div>
        """,
        r"""
function calc16(){
  const s=(23-11)/2;
  document.getElementById('i16').textContent=document.body.classList.contains('en-mode')
    ? `23 − 11 = 12 → two square sides → s = ${s} cm`
    : `23 − 11 = 12 → 两个正方形边 → s = ${s} cm`;
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[16],
    )

    # Q17 — worm-eaten digits
    pages[17] = page(
        17, "实验台：缺数字之和", "Lab: missing digit sum",
        f"""
    {mission(
        ["三卡片和 = 782", "个位：3+4+?=12 → ?=5", "十位带进位：缺的两数字和 = 6", "缺失三数字之和 = 6+5 = 11"],
        ["Three cards sum to 782", "Units: 3+4+?=12 → ?=5", "Tens with carry: two missing digits sum to 6", "Total missing = 6+5 = 11"],
    )}
    <p class="tip lang-zh">提示：被吃掉的 3 个数字之和 = <b>11</b>。</p>
    <p class="tip lang-en">Tip: sum of the 3 missing digits = <b>11</b>.</p>
    <div class="stage">
      <div class="info" id="i17"></div>
      <button class="btn primary" onclick="worm17()"><span class="lang-zh">逐步推理</span><span class="lang-en">Step reasoning</span></button>
    </div>
        """,
        r"""
function worm17(){
  document.getElementById('i17').textContent=document.body.classList.contains('en-mode')
    ? 'Missing units digit 5; missing tens digits sum to 6. Total = 11.'
    : '个位缺 5；十位缺的两数字和为 6。总共 = 11。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[17],
    )

    # Q18 — weighing blocks
    pages[18] = page(
        18, "实验台：三秤相加÷2", "Lab: add scales ÷ 2",
        f"""
    {mission(
        ["三个天平各称两种组合", "三秤相加 = 每种积木各 2 次", "总重 ÷ 2 = 三种积木之和", "(200+100+240)÷2 = 270 g"],
        ["Each scale weighs two blocks", "Sum of three scales = each block twice", "Total ÷ 2 = sum of three blocks", "(200+100+240)÷2 = 270 g"],
    )}
    <p class="tip lang-zh">提示：<b>(200+100+240)÷2 = 270 g</b>。</p>
    <p class="tip lang-en">Tip: <b>(200+100+240)÷2 = 270 g</b>.</p>
    <div class="stage">
      <div class="info" id="i18">200 + 100 + 240 = ?</div>
      <button class="btn primary" onclick="calc18()"><span class="lang-zh">相加再 ÷2</span><span class="lang-en">Add then ÷2</span></button>
    </div>
        """,
        r"""
function calc18(){
  const s=(200+100+240)/2;
  document.getElementById('i18').textContent=document.body.classList.contains('en-mode')
    ? `(200+100+240)÷2 = ${s} g`
    : `(200+100+240)÷2 = ${s} g`;
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[18],
    )

    # Q19 — vest and backpack
    pages[19] = page(
        19, "实验台：周期 LCM(2,3)", "Lab: LCM(2,3) pattern",
        f"""
    {mission(
        ["背心 2 周期：黄绿…", "书包 3 周期：红棕橙…", "LCM(2,3)=6 → 每 6 人重复", "60÷6=10 人黄背心+橙书包"],
        ["Vest cycle 2: YG…", "Backpack cycle 3: RBO…", "LCM(2,3)=6 → repeats every 6", "60÷6=10 with yellow vest + orange pack"],
    )}
    <p class="tip lang-zh">提示：<b>LCM(2,3)=6</b> → <b>60÷6=10</b>。</p>
    <p class="tip lang-en">Tip: <b>LCM(2,3)=6</b> → <b>60÷6=10</b>.</p>
    <div class="stage">
      <div class="info" id="i19"></div>
      <button class="btn primary" onclick="pat19()"><span class="lang-zh">看 6 人周期</span><span class="lang-en">Show 6-pupil cycle</span></button>
    </div>
        """,
        r"""
function pat19(){
  document.getElementById('i19').textContent=document.body.classList.contains('en-mode')
    ? 'Every 6 pupils: YR, GB, YO, GR, YB, GO. One YO per 6 → 60÷6 = 10.'
    : '每 6 人：黄红、绿棕、黄橙、绿红、黄棕、绿橙。每 6 人 1 个黄+橙 → 60÷6=10。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[19],
    )

    # Q20 — hidden digits product
    pages[20] = page(
        20, "实验台：图形乘积", "Lab: shape product",
        f"""
    {mission(
        ["相同图形 = 相同数字", "从加法推出各图形数字", "7+7=14, 4+7=11…", "三图形相乘 = 28"],
        ["Same shape = same digit", "Use additions to find digits", "7+7=14, 4+7=11…", "Product of three shapes = 28"],
    )}
    <p class="tip lang-zh">提示：三图形乘积 = <b>28</b>（7×4×1）。</p>
    <p class="tip lang-en">Tip: product of the three shapes = <b>28</b> (7×4×1).</p>
    <div class="stage">
      <div class="info" id="i20"></div>
      <button class="btn primary" onclick="prod20()"><span class="lang-zh">算乘积</span><span class="lang-en">Compute product</span></button>
    </div>
        """,
        r"""
function prod20(){
  document.getElementById('i20').textContent=document.body.classList.contains('en-mode')
    ? 'Digits: 7, 4, 1 → product 7×4×1 = 28.'
    : '数字：7、4、1 → 乘积 7×4×1 = 28。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[20],
    )

    # Q21 — frogs jump
    body, js = lab_compare_options(
        21,
        "每行每列 2 只青蛙，2 只同时跳到相邻空格，跳后仍 2/行/列。对照选项数跳法。",
        "2 frogs per row/column; two jump to neighbours together; still 2 per row/column. Count ways in options.",
    )
    pages[21] = page(
        21, "实验台：青蛙跳法", "Lab: frog jump ways", body, js,
        choice_labels=CHOICE_LABELS[21],
    )

    # Q22 — honeycomb
    pages[22] = page(
        22, "实验台：蜂巢推理", "Lab: honeycomb logic",
        f"""
    {mission(
        ["9 格蜂巢，数字 = 相邻蜂蜜格数", "从角落和最大数推理", "标记哪些格有蜂蜜", "共有 6 格含蜂蜜"],
        ["9 cells; number = honey neighbours", "Deduce from corners and high numbers", "Mark honey cells", "6 cells contain honey"],
    )}
    <p class="tip lang-zh">提示：共有 <b>6</b> 格含蜂蜜。</p>
    <p class="tip lang-en">Tip: <b>6</b> cells contain honey.</p>
    <div class="stage">
      <div class="info" id="i22">1 1 3 / 3 / 3 / 4 4 2 / 2</div>
      <button class="btn primary" onclick="hint22()"><span class="lang-zh">推理提示</span><span class="lang-en">Deduction hint</span></button>
    </div>
        """,
        r"""
function hint22(){
  document.getElementById('i22').textContent=document.body.classList.contains('en-mode')
    ? 'Work from cells showing 4 (need 4 honey neighbours). Total honey cells = 6.'
    : '从显示 4 的格推理（需 4 个相邻蜂蜜格）。共有 6 格含蜂蜜。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[22],
    )

    # Q23 — cookie tray
    body, js = lab_compare_options(
        23,
        "一人拿全部心形/白色/大块（顺序不定），分别 3、6、7 块。排除不符合的选项组。",
        "One takes all hearts/white/large (order unknown): 3, 6, 7 cookies. Eliminate impossible sets.",
    )
    pages[23] = page(23, "实验台：对照饼干组", "Lab: compare cookie sets", body, js)

    # Q24 — white and red blocks
    pages[24] = page(
        24, "实验台：最少白积木", "Lab: minimum white blocks",
        f"""
    {mission(
        ["大立方体 = 8 个小立方体", "每个小立方体至少 1 白", "4 白型或 1白+1红型", "6×1 + 2×4 = 14 最少"],
        ["Large cube = 8 small cubes", "Each small cube needs ≥1 white", "Type A: 4 white; Type B: 1W+1R", "6×1 + 2×4 = 14 minimum"],
    )}
    <p class="tip lang-zh">提示：<b>8</b> 个小立方体 → 最少白色 <b>14</b>（6 个 1 白 + 2 个 4 白）。</p>
    <p class="tip lang-en">Tip: <b>8</b> small cubes → minimum <b>14</b> white (six with 1W + two with 4W).</p>
    <div class="stage">
      <div class="info" id="i24">8 小立方体</div>
      <button class="btn primary" onclick="min24()"><span class="lang-zh">算最少白块</span><span class="lang-en">Min white count</span></button>
    </div>
        """,
        r"""
function min24(){
  document.getElementById('i24').textContent=document.body.classList.contains('en-mode')
    ? '8 small cubes: 6 need only 1 white, 2 need 4 white → 6+8 = 14 minimum.'
    : '8 个小立方体：6 个各 1 白，2 个各 4 白 → 最少 14 块白积木。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[24],
    )

    for n, html in pages.items():
        path = os.path.join(OUT, f"{n}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", n)

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
<title>{YEAR} Level B · Interactive (all 24)</title>
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
  <div class="brand">Math Kangaroo {YEAR} · Level B · 24 labs</div>
  <button class="lang-btn" onclick="document.body.classList.toggle('en-mode')">EN / 中文</button>
</div>
<div class="wrap">
  <h1 class="zh">{YEAR} 等级 B · 全部 24 题互动</h1>
  <h1 class="en">{YEAR} Level B · All 24 interactive labs</h1>
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

    rows_all = "\n".join(f"| {n} | {ANS[n]} | {PTS[n]} |" for n in range(1, 25))
    md_all = f"""# {YEAR} 等级 B · 教师答案（全 24 题）

学生页检查按钮只提示对错，不显示选项字母。

| 题号 | 答案 | 分值 |
| --- | --- | --- |
{rows_all}

答案：1E 2C 3C 4C 5D 6C 7E 8B 9C 10A 11B 12D 13A 14B 15B 16D 17D 18A 19E 20D 21D 22C 23E 24D
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
        md = f"""# {YEAR} 等级 B · 教师答案（{start}–{end} · {pts_label}）

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
