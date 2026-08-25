# -*- coding: utf-8 -*-
"""Generate B-2017 Level B interactive labs (20 questions) + index + answer keys.
Check only right/wrong; answers live in teacher *.md files."""
from __future__ import annotations
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2017
N_Q = 20

ANS = {
    1: "E", 2: "A", 3: "C", 4: "A", 5: "E", 6: "A", 7: "E", 8: "E", 9: "B", 10: "C",
    11: "D", 12: "D", 13: "C", 14: "D", 15: "C", 16: "B", 17: "A", 18: "D", 19: "C", 20: "E",
}
PTS = {i: (3 if i <= 10 else 4) for i in range(1, N_Q + 1)}

TITLE = {
    1: ("拼图等式", "Puzzle Piece Equations"),
    2: ("公园里的袋鼠", "Kangaroos in the Park"),
    3: ("颠倒的脚印", "Upside-Down Footprints"),
    4: ("熊猫后的数字", "Number Behind Panda"),
    5: ("加法表问号", "Addition Table Mystery"),
    6: ("同一条珠链", "Same Bead Necklace"),
    7: ("Ann 家的后面", "Back of Ann’s House"),
    8: ("哪项正确", "Which Statement True"),
    9: ("最少气球包数", "Fewest Balloon Packets"),
    10: ("Bob 如何折纸", "How Bob Folded Paper"),
    11: ("泳池比赛分组", "Pool Tournament Teams"),
    12: ("最大2×2和", "Largest 2×2 Sum"),
    13: ("双炉烹饪", "Two-Stove Cooking"),
    14: ("圆圈里的问号", "Circle Question Mark"),
    15: ("平面图墨迹", "Ink on Building Plan"),
    16: ("火车有多长", "How Long Is the Train"),
    17: ("出发去训练", "Leave for Training"),
    18: ("动物园两动物行程", "Zoo Two-Animal Tours"),
    19: ("兄弟吃曲奇", "Brothers Eat Cookies"),
    20: ("Eric 的糖果", "Candy Bags for Eric"),
}

PROB = {
    1: ("哪块中间拼图能使两边等式都正确？", "Which middle piece makes both equations correct?"),
    2: ("窗边看见一半袋鼠，公园一共几只？", "Sees half the kangaroos — how many in the park?"),
    3: ("脚印图上下颠倒后，哪双不见了？", "Picture upside down — which footprints missing?"),
    4: ("熊猫后面藏着什么数？", "What number is behind the panda?"),
    5: ("加法表问号格子是几？", "What number is in the ? cell of the addition table?"),
    6: ("哪条是同一条六珠项链？", "Which is the same six-bead necklace?"),
    7: ("后方三窗无门，从后面看是哪幅？", "Back has 3 windows, no door — what does she see?"),
    8: ("下列哪项正确？", "Which one is true?"),
    9: ("恰好 70 粒气球（5/10/25 包），最少几包？", "Exactly 70 balloons in packs of 5/10/25 — fewest packs?"),
    10: ("剪一洞展开如图，起初如何折？", "One hole cut, unfold as shown — how folded?"),
    11: ("13+19 人，六组等人数，至少还要几人？", "13+19 signed up; 6 equal teams — how many more min?"),
    12: ("4×4 中最大 2×2 数字和？", "Largest 2×2 sum in the 4×4 grid?"),
    13: ("两炉做五道菜，最短总时间？", "5 dishes on 2 stoves — shortest time?"),
    14: ("问号圆圈应填几？", "Number in the ? circle?"),
    15: ("墨迹下数字之和？", "Sum of numbers under the ink blots?"),
    16: ("火车有多长？", "How long is the train?"),
    17: ("5:00 训练，路程共多久，何时出门？", "Training 5:00 pm — when to leave home?"),
    18: ("看 2 种动物且不以狮子开头，几种行程？", "2-animal tours not starting with lion — how many?"),
    19: ("四兄弟吃 11 块曲奇，最多的那人吃几块？", "4 brothers, 11 cookies — how many did the biggest eater have?"),
    20: ("Alex/Bob/Charles/Dennis 已知，Eric 几粒？", "Given four boys’ totals — how many candies for Eric?"),
}

CHOICE_LABELS = {
    2: ["12", "14", "16", "18", "20"],
    4: ["16", "18", "20", "24", "28"],
    5: ["10", "12", "13", "15", "16"],
    9: ["3", "4", "5", "6", "7"],
    11: ["1", "2", "3", "4", "5"],
    12: ["11", "12", "13", "14", "15"],
    13: ["60m", "70m", "75m", "80m", "85m"],
    14: ["10", "11", "12", "13", "14"],
    15: ["3", "4", "5", "6", "7"],
    16: ["55m", "115m", "170m", "220m", "230m"],
    18: ["3", "7", "8", "9", "12"],
    19: ["3", "4", "5", "6", "7"],
    20: ["9", "11", "13", "17", "19"],
}

LAB = {
    1: ("左边算式得几，右边算式也要等于末块。", "Left piece result must match; right expression must equal the end.",
        ["算 8−3", "中间左边须匹配", "中间右边须等于 2", "对照 A–E"],
        ["Compute 8−3", "Middle left must match", "Middle right must = 2", "Compare A–E"]),
    2: ("图中可见是一半，总数 = 可见×2。", "Picture shows half; total = visible × 2.",
        ["数图中袋鼠", "这是一半", "×2 得总数", "选选项"],
        ["Count visible", "That is half", "×2 for total", "Pick option"]),
    3: ("把整图旋转 180°，看缺哪双脚印。", "Rotate the picture 180°; see which pair is missing.",
        ["想象上下颠倒", "对照选项脚印", "找缺失的一对", "作选择"],
        ["Imagine upside down", "Compare footprint options", "Find missing pair", "Choose"]),
    4: ("沿运算链一步步算，或从已知反推。", "Follow the operation chain, or work backwards.",
        ["读运算箭头", "逐步计算", "求熊猫后数字", "对照选项"],
        ["Read operations", "Compute step by step", "Find hidden number", "Match options"]),
    5: ("加法表：行加数 + 列加数 = 格内和。", "Addition table: row addend + column addend = cell.",
        ["找已知行列", "推出缺失加数", "算问号格", "选答案"],
        ["Use known cells", "Find missing addends", "Compute ?", "Pick answer"]),
    6: ("项链可旋转、翻转，珠序循环相同即同一条。", "Necklace can rotate/flip; same cyclic order = same necklace.",
        ["记下珠子顺序", "试旋转/翻转", "对照选项", "找相同循环"],
        ["Note bead order", "Try rotate/flip", "Compare options", "Find same cycle"]),
    7: ("从屋内看出后方：左右与前方图对调。", "Looking out the back from inside swaps left and right.",
        ["看前方门窗布局", "后方无门三窗", "左右对调想象", "选匹配图"],
        ["See front layout", "Back: 3 windows, no door", "Swap left/right", "Match figure"]),
    8: ("逐项检查图中说法是否成立。", "Check each pictured statement for truth.",
        ["读每个选项", "用图验证", "找出真命题", "作选择"],
        ["Read each option", "Verify with figure", "Find the true one", "Choose"]),
    9: ("尽量多用 25 包，再用 10、5 凑满 70，包数最少。", "Use as many 25s as possible, then 10s/5s; minimize packs.",
        ["目标 70", "优先 25 包", "再用 10/5", "比较包数"],
        ["Target 70", "Prefer packs of 25", "Fill with 10/5", "Minimize count"]),
    10: ("展开后洞的位置反映折了几层、怎么折。", "Hole positions after unfolding show the fold pattern.",
        ["看洞的对称", "推断折痕", "对照折法选项", "作选择"],
        ["See hole symmetry", "Infer folds", "Match fold options", "Choose"]),
    11: ("总人数须是 6 的倍数；找 ≥32 的最小倍数。", "Total must be a multiple of 6; next ≥32.",
        ["13+19=32", "找 ≥32 的 6 倍数", "差多少人", "选答案"],
        ["13+19=32", "Next multiple of 6 ≥32", "How many more?", "Pick answer"]),
    12: ("枚举所有 2×2 小方块，算和取最大。", "Enumerate every 2×2 block; take the max sum.",
        ["列出各 2×2", "分别求和", "取最大值", "选选项"],
        ["List 2×2 blocks", "Sum each", "Take maximum", "Pick option"]),
    13: ("两炉并行；一道菜做完才能换下一道。找最短完工时间。", "Two stoves in parallel; remove only when done. Minimize finish time.",
        ["排出两炉时间表", "尝试不同搭配", "看总完工时刻", "选最短"],
        ["Schedule both stoves", "Try pairings", "Read finish time", "Pick shortest"]),
    14: ("沿箭头运算正推或从结果反推。", "Follow arrows forward, or work backwards from the result.",
        ["读各步运算", "正推或反推", "求问号", "对照选项"],
        ["Read operations", "Forward or backward", "Find ?", "Match options"]),
    15: ("平面图数字表示该柱高度；用可见数字与立体图推墨迹下。", "Plan numbers = tower heights; use figure to recover covered cells.",
        ["对照立体与平面", "推出墨迹下数字", "求和", "选答案"],
        ["Match 3D and plan", "Recover covered numbers", "Add them", "Pick answer"]),
    16: ("用图中桥/隧道与火车的长度关系列方程。", "Use bridge/tunnel vs train lengths in the figure.",
        ["读图中长度", "列关系式", "解火车长", "选选项"],
        ["Read lengths", "Write relation", "Solve train length", "Pick option"]),
    17: ("三段路程相加，从 5:00 往前推。", "Add three travel legs; count back from 5:00.",
        ["5+15+5 分钟", "从 5:00 减去", "得出门时间", "对照钟面选项"],
        ["5+15+5 minutes", "Subtract from 5:00", "Departure time", "Match clock options"]),
    18: ("有序选 2 种动物：4×3，再去掉以狮子开头的。", "Ordered pairs of 2 animals: 4×3, minus those starting with lion.",
        ["4 种动物", "有序选 2 个", "去掉狮子开头", "得行程数"],
        ["4 animals", "Ordered pairs of 2", "Drop lion-first", "Count tours"]),
    19: ("四人数量互异、≥1、和 11；含 3；某三人总和 9。", "Distinct ≥1 summing to 11; includes 3; some three sum to 9.",
        ["列出可能四元组", "含 3 且某三人和 9", "找最大那个数", "选选项"],
        ["List 4-tuples", "Include 3; some triple sums 9", "Find the largest", "Pick option"]),
    20: ("1–10 各用一次；已知四人的两袋之和，剩下两袋给 Eric。", "1–10 used once; known four pair-sums; Eric gets the rest.",
        ["列出可能配对", "匹配 5,7,9,15", "剩两袋给 Eric", "求和"],
        ["List pairings", "Match 5,7,9,15", "Remaining pair → Eric", "Sum them"]),
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
    if os.path.exists(opts):
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
