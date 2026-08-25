# -*- coding: utf-8 -*-
"""Generate B-2016 Level B interactive labs (20 questions) + index + answer keys.
Check only right/wrong; answers live in teacher *.md files."""
from __future__ import annotations
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2016
N_Q = 20

ANS = {
    1: "E", 2: "E", 3: "A", 4: "A", 5: "D", 6: "B", 7: "A", 8: "B", 9: "B", 10: "C",
    11: "D", 12: "A", 13: "C", 14: "D", 15: "B", 16: "D", 17: "C", 18: "C", 19: "E", 20: "B",
}
PTS = {i: (3 if i <= 10 else 4) for i in range(1, N_Q + 1)}

TITLE = {
    1: ("骰子点数最大", "Largest Dice Total"),
    2: ("小袋鼠满八周", "Kanga Turns 8 Weeks"),
    3: ("箭头算式求值", "Arrow Number Puzzle"),
    4: ("Pipo 照镜子", "Pipo in the Mirror"),
    5: ("马戏团座位方向", "Circus Seat Direction"),
    6: ("分享半个苹果", "Sharing Half Apples"),
    7: ("窗帘后的形状", "Hidden Behind Curtain"),
    8: ("年份数字和为9", "Year Digit Sum 9"),
    9: ("老鼠迷宫路线", "Mouse Maze Paths"),
    10: ("Zoe 卡上的数字", "Zoe’s Hidden Numbers"),
    11: ("三角形在正方形上", "Triangle Above Square"),
    12: ("三片拼正方形", "Three Pieces Make Square"),
    13: ("涂黑格数字和", "Shaded Cells Sum"),
    14: ("翻转卡片", "Turn the Card Over"),
    15: ("四兄弟年龄和", "Four Brothers’ Ages"),
    16: ("魔幻树的水果", "Magic Trees Fruit"),
    17: ("猫的腿与鼻子", "Cats Legs and Noses"),
    18: ("把201换成102", "Replace 201 with 102"),
    19: ("切开砖条", "Breaking Brick Bars"),
    20: ("麻雀转头呼叫", "Sparrows Chirping"),
}

PROB = {
    1: ("五人各掷两骰，谁的点数之和最大？", "Who rolled the largest total with two dice?"),
    2: ("小 Kanga 现 7 周又 2 天，再几天满 8 周？", "Kanga is 7 weeks 2 days. Days until 8 weeks?"),
    3: ("按图中箭头运算，问号是多少？", "Follow the arrows. What replaces ?"),
    4: ("Pipo 照镜子看见哪一幅？", "What does Pipo see in the mirror?"),
    5: ("座位 71、72，应向哪个方向走？", "Seats 71 and 72 — which way?"),
    6: ("6 人各得半个苹果，一共分享几个？", "6 people each get half an apple. How many apples?"),
    7: ("窗帘后隐藏的部分是什么形状？", "What shape is hidden behind the curtain?"),
    8: ("2016 之后，下一个数字和为 9 的最近年份？", "Nearest year after 2016 with digit sum 9?"),
    9: ("不重复过门，老鼠有几条逃脱路线？", "How many maze paths without reusing a gate?"),
    10: ("两卡面和相等、四数和 32，看不见的两面是？", "Equal card sums, total 32 — which hidden pair?"),
    11: ("拿走圆形后，几堆三角形在正方形上？", "After removing circles, how many piles have △ above □?"),
    12: ("哪三片拼图能拼成正方形？", "Which three pieces form a square?"),
    13: ("每行每列 1–3 各一次，涂黑格之和？", "Latin 1–3 table: sum of shaded cells?"),
    14: ("沿上边翻转卡片，看见哪一面？", "Turn the card over the top — which face?"),
    15: ("三胞胎+大 3 岁哥哥，年龄和可能是？", "Triplets + brother 3 yrs older: possible age sum?"),
    16: ("树有 6梨3苹 或 8梨4苹，25 苹 → 多少梨？", "Trees 6P+3A or 8P+4A; 25 apples → pears?"),
    17: ("猫腿比鼻子多 18，有几只猫？", "Cats have 18 more legs than noses. How many cats?"),
    18: ("和为 2016，把 201 换成 102，新和？", "Sum 2016; replace 201 with 102. New sum?"),
    19: ("27 砖条反复 2:1 切开，哪段不可能？", "Break 27-bar 2:1 repeatedly. Which bar impossible?"),
    20: ("一只麻雀转头后呼叫变多，是哪只？", "One sparrow turns; chirps increase. Which one?"),
}

CHOICE_LABELS = {
    1: ["Amy", "Bert", "Carl", "Doris", "Ernst"],
    2: ["1", "2", "3", "4", "5"],
    3: ["24", "28", "36", "56", "80"],
    6: ["2", "3", "4", "5", "6"],
    7: ["△", "□", "六边", "○", "长方"],
    8: ["2007", "2025", "2034", "2108", "2134"],
    9: ["2", "4", "5", "6", "7"],
    10: ["7&0", "8&1", "11&4", "9&2", "6&3"],
    11: ["0", "1", "2", "3", "4"],
    12: ["1,3,5", "1,2,5", "1,4,5", "3,4,5", "2,3,5"],
    13: ["2", "3", "4", "5", "6"],
    15: ["25", "27", "29", "30", "60"],
    16: ["35", "40", "45", "50", "56"],
    17: ["4", "5", "6", "8", "9"],
    18: ["1815", "1914", "1917", "2115", "2118"],
    20: ["Angel", "Bertha", "Charlie", "David", "Eglio"],
}

# Lab tips: guide reasoning without stating the answer letter
LAB = {
    1: ("把五人的两颗骰点数相加，比较总和。", "Add each person’s two dice and compare totals.",
        ["列出每人点数", "比较五个总和", "找出最大者", "选出对应选项"],
        ["List each total", "Compare the five sums", "Find the largest", "Pick that option"]),
    2: ("1 周=7 天。已过 2 天，还差几天满一周？", "1 week = 7 days. Already 2 days — how many left?",
        ["8周=7周+7天", "已过 2 天", "还差 7−2 天", "选出天数"],
        ["8 weeks = 7 weeks + 7 days", "Already 2 days", "Left: 7−2", "Pick the number"]),
    3: ("先算上面两式，再按箭头相加。", "Evaluate the top two boxes, then add as the arrows show.",
        ["算 17+3", "算 20−16", "两结果相加", "对照选项"],
        ["Compute 17+3", "Compute 20−16", "Add the two results", "Match an option"]),
    4: ("镜子左右翻转：左边的装饰会到右边。", "A mirror flips left↔right.",
        ["看原图左右特征", "想象左右对调", "对照 A–E", "选出镜像"],
        ["Note left/right features", "Swap left and right", "Compare A–E", "Pick the mirror image"]),
    5: ("先看 71、72 属于哪个座位区间，再找箭头。", "Find which seat range contains 71–72, then the arrow.",
        ["读区间表", "定位 71–72", "对应方向箭头", "选选项"],
        ["Read the ranges", "Locate 71–72", "Match the arrow", "Pick the option"]),
    6: ("人数×每人半个 = 苹果数。", "People × half apple each = total apples.",
        ["共 6 人", "每人 1/2", "6×1/2", "选答案"],
        ["6 people", "Each gets 1/2", "6×1/2", "Pick answer"]),
    7: ("看露出的切口，想象被挡住的轮廓。", "Look at the cut edge; imagine the hidden outline.",
        ["看窗帘切口", "想象隐藏部分", "对照形状名", "作选择"],
        ["See the cut edge", "Imagine the hidden part", "Match shape names", "Choose"]),
    8: ("在选项里找 2016 之后、数字和为 9、且最近的年份。", "Among options after 2016 with digit sum 9, pick the nearest.",
        ["排除 ≤2016", "算各年数字和", "找和为 9 的", "取最近的"],
        ["Drop years ≤2016", "Sum digits", "Keep sum=9", "Take nearest"]),
    9: ("从起点枚举，不重复经过同一扇门。", "Enumerate paths; never reuse a gate.",
        ["看迷宫结构", "枚举路线", "禁止重复门", "数出条数"],
        ["Study the maze", "List paths", "No gate twice", "Count them"]),
    10: ("两卡面和相等 ⇒ 每卡和 = 32÷2。再匹配看不见的数。", "Equal card sums ⇒ each card sums to 16. Match hidden numbers.",
        ["四数和 32", "每卡和 16", "用可见数推背面", "对照选项"],
        ["Four numbers sum 32", "Each card = 16", "Use visible to find hidden", "Match options"]),
    11: ("拿走圆形后，看三角形是否在正方形上面。", "After removing circles, is the triangle still above the square?",
        ["看五堆顺序", "去掉圆形层", "检查 △ 是否在 □ 上", "统计堆数"],
        ["Read five stacks", "Remove circle layer", "Check △ above □", "Count piles"]),
    12: ("试哪三片能拼成正方形（看面积与缺口）。", "Try which three pieces form a square (area + notches).",
        ["看五片外形", "试组合三片", "能否成正方形", "选正确组合"],
        ["Study five pieces", "Try triples", "Can they form a square?", "Pick the triple"]),
    13: ("像数独：每行每列 1、2、3 各一次，填涂黑格。", "Like Sudoku: 1,2,3 once per row/column; fill shaded cells.",
        ["读已知数字", "填空格", "看涂黑格", "求和"],
        ["Read known digits", "Fill blanks", "Read shaded cells", "Add them"]),
    14: ("先理解「沿右边翻」看到的面，再推「沿上边翻」。", "Understand the right-edge flip, then deduce the top-edge flip.",
        ["理解右边翻转", "想象上边翻转", "对照选项图", "作选择"],
        ["Understand right flip", "Imagine top flip", "Compare figures", "Choose"]),
    15: ("设三胞胎各 x 岁，哥哥 x+3，总和 = 4x+3。看哪个选项可行。", "Ages x,x,x,x+3 → sum 4x+3. Which option works?",
        ["写年龄表达式", "总和=4x+3", "代入选项检验", "选可行的"],
        ["Write ages", "Sum = 4x+3", "Test options", "Pick feasible"]),
    16: ("苹果按 3 或 4 计，总数 25。解出两种树各几棵，再算梨。", "Apples in 3s and 4s totaling 25. Find tree counts, then pears.",
        ["列方程 3a+4b=25", "求 a,b", "梨=6a+8b", "选答案"],
        ["Solve 3a+4b=25", "Find a,b", "Pears=6a+8b", "Pick answer"]),
    17: ("每只猫：4 腿 − 1 鼻 = 多 3。用 18÷3。", "Per cat: 4 legs − 1 nose = 3 extra. Divide 18 by 3.",
        ["每猫多 3 条腿", "总数多 18", "18÷3", "得猫数"],
        ["+3 legs per cat", "Total +18", "18÷3", "Number of cats"]),
    18: ("新和 = 原和 − 201 + 102。", "New sum = old sum − 201 + 102.",
        ["原和 2016", "减去 201", "加上 102", "得新和"],
        ["Old sum 2016", "Subtract 201", "Add 102", "New sum"]),
    19: ("每次切成 1:2，长度始终与 3 的幂有关。排除不可能的段。", "1:2 breaks keep lengths tied to powers of 3. Eliminate impossible bars.",
        ["从 27 开始切", "每次 1:2", "列出可得长度", "对照选项排除"],
        ["Start from 27", "Break 1:2 each time", "List possible lengths", "Eliminate options"]),
    20: ("先算初始各鸟看见几只，再试每只转头后的总和变化。", "Compute initial chirps, then try each bird turning.",
        ["读朝向", "算初始呼叫", "试每人转头", "找总和变大的"],
        ["Read facing", "Initial chirps", "Try each turning", "Find who increases total"]),
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
.optgrid{display:block;width:100%;max-width:640px;margin:10px auto;border-radius:12px;border:1px solid #e2e8f0}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0;line-height:1.55}
.mission{display:grid;gap:8px;margin:10px 0}
.mission .step{padding:10px 12px;border-radius:12px;border:2px solid #e2e8f0;font-size:14px;line-height:1.5;display:flex;gap:10px;align-items:flex-start}
.mission .step .num{flex:0 0 28px;height:28px;border-radius:50%;background:#dbeafe;color:#1d4ed8;display:flex;align-items:center;justify-content:center;font-weight:900}
.mission .step.active{border-color:#93c5fd;background:#eff6ff}
.mission .step.done{border-color:#86efac;background:#f0fdf4}
.mission .step.done .num{background:#bbf7d0;color:#166534}
.actions{text-align:center;margin-top:12px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px;font-size:14px}
.submit{background:var(--success);color:#fff}.reset{background:#64748b;color:#fff}
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
.stage{border:2px solid #bae6fd;border-radius:16px;background:linear-gradient(180deg,#f8fafc,#eff6ff);padding:14px;margin:10px auto;max-width:560px}
.tabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}
.tab{min-width:48px;padding:8px 12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;font-weight:800;cursor:pointer}
.tab.on{background:var(--primary);color:#fff;border-color:var(--primary)}
.info{text-align:center;font-weight:700;margin:8px 0;min-height:24px}
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


def figs(n):
    parts = []
    stem = os.path.join(OUT, "assets", f"q{n}_stem.png")
    opts = os.path.join(OUT, "assets", f"q{n}_options.png")
    if os.path.exists(stem):
        parts.append(f'<img class="fig" src="assets/q{n}_stem.png" alt="Q{n}"/>')
    if os.path.exists(opts) and opts != stem:
        parts.append(f'<img class="optgrid" src="assets/q{n}_options.png" alt="Q{n} options"/>')
    return "\n".join(parts)


def page(n: int) -> str:
    zh_t, en_t = TITLE[n]
    pz, pe = PROB[n]
    tip_zh, tip_en, steps_zh, steps_en = LAB[n]
    labels = CHOICE_LABELS.get(n) or list("ABCDE")
    letters = "ABCDE"
    cards = "".join(
        f'<div class="card" data-v="{letters[i]}" onclick="pick(this)">{labels[i]}</div>'
        for i in range(5)
    )
    prev_n = n - 1 if n > 1 else None
    next_n = n + 1 if n < N_Q else None
    nav_prev = f'<a href="{prev_n}.html">← Q{prev_n}</a>' if prev_n else '<a href="index.html">← Index</a>'
    nav_next = f'<a href="{next_n}.html">Q{next_n} →</a>' if next_n else '<a href="index.html">Index →</a>'
    body = f"""
    {mission(steps_zh, steps_en)}
    <p class="tip lang-zh">{tip_zh}</p>
    <p class="tip lang-en">{tip_en}</p>
    <div class="tabs" id="tabs"></div>
    <div class="stage">
      <img class="fig sm" id="optView" src="assets/q{n}_options.png" alt="option" onerror="this.style.display='none'"/>
      <div class="info" id="labInfo"></div>
      <button class="btn primary" onclick="nudge()"><span class="lang-zh">下一步提示</span><span class="lang-en">Next hint</span></button>
    </div>
    """
    js = f"""
let step=0;
const letters='ABCDE';
const tabs=document.getElementById('tabs');
letters.split('').forEach((L,i)=>{{
  const b=document.createElement('button'); b.className='tab'+(i===0?' on':''); b.textContent=L;
  b.onclick=()=>{{ document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on')); b.classList.add('on');
    document.getElementById('labInfo').textContent=(document.body.classList.contains('en-mode')?'Focusing on option ':'正在看选项 ')+L;
  }};
  tabs.appendChild(b);
}});
function setMission(i){{
  document.querySelectorAll('.mission .step').forEach(s=>{{
    const idx=+s.dataset.i;
    s.classList.toggle('active', idx===i);
    s.classList.toggle('done', idx<i);
  }});
}}
function nudge(){{
  step=Math.min(step+1,3);
  setMission(step);
  const zh=['先看题干图','对照选项','用步骤推理','准备作答'];
  const en=['Study the figure','Compare options','Reason step by step','Ready to answer'];
  document.getElementById('labInfo').textContent=document.body.classList.contains('en-mode')?en[step]:zh[step];
}}
setMission(0);
"""
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{YEAR} B · Q{n} · {zh_t}</title>
<style>{CSS}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 EN / 中文</button>
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
    <h2 class="lang-zh">实验台</h2>
    <h2 class="lang-en">Lab</h2>
    {body}
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
{js}
</script>
</body>
</html>
"""


def main():
    for n in range(1, N_Q + 1):
        path = os.path.join(OUT, f"{n}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(page(n))
        print("wrote", n)

    links = []
    for n in range(1, N_Q + 1):
        zh, en = TITLE[n]
        links.append(
            f'<a href="{n}.html"><span class="lang-zh">{n} · {zh} · {PTS[n]}分</span>'
            f'<span class="lang-en">{n} · {en} · {PTS[n]} pts</span></a>'
        )
    index = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Math Kangaroo {YEAR} · Level B</title>
<style>
{CSS}
.list{{display:grid;gap:8px;max-width:720px;margin:0 auto}}
.list a{{display:block;padding:12px 14px;border-radius:12px;background:#fff;border:2px solid #bae6fd;color:#0c4a6e;text-decoration:none;font-weight:700;box-shadow:0 4px 12px rgba(2,132,199,.08)}}
.list a:hover{{background:#e0f2fe}}
</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 EN / 中文</button>
<h1 class="lang-zh">袋鼠数学 {YEAR} · 等级 B（3–4 年级）</h1>
<h1 class="lang-en">Math Kangaroo {YEAR} · Level B (Grades 3–4)</h1>
<p class="meta lang-zh">共 {N_Q} 题（当年 Ecolier 试卷）。检查只提示对错。教师答案见 <code>答案.md</code>。</p>
<p class="meta lang-en">{N_Q} questions (Ecolier paper that year). Check only says right/wrong. Keys in <code>答案.md</code>.</p>
<div class="list">{''.join(links)}</div>
</body>
</html>
"""
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(index)
    print("wrote index.html")

    key_line = " ".join(f"{n}{ANS[n]}" for n in range(1, N_Q + 1))
    rows = "\n".join(f"| {n} | {ANS[n]} | {PTS[n]} |" for n in range(1, N_Q + 1))
    md = f"""# {YEAR} 等级 B · 教师答案（全 {N_Q} 题）

| 题号 | 答案 | 分值 |
|------|------|------|
{rows}

答案：{key_line}
"""
    with open(os.path.join(OUT, "答案.md"), "w", encoding="utf-8") as f:
        f.write(md)
    print("wrote 答案.md")

    for start, end, label, fname in [
        (1, 10, "3 分", "1-10-答案.md"),
        (11, 20, "4 分", "11-20-答案.md"),
    ]:
        rows2 = "\n".join(f"| {n} | {ANS[n]} |" for n in range(start, end + 1))
        md2 = f"""# {YEAR} 等级 B · 教师答案（{start}–{end} · {label}）

| 题号 | 答案 |
|------|------|
{rows2}
"""
        with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
            f.write(md2)
        print("wrote", fname)


if __name__ == "__main__":
    main()
