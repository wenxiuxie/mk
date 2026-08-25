# -*- coding: utf-8 -*-
"""Generate B-2023 Level B interactive labs: all 24 questions + index + answer keys."""
from __future__ import annotations
import base64
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2023

ANS = {
    1: "D", 2: "C", 3: "B", 4: "C", 5: "C", 6: "E", 7: "C", 8: "E",
    9: "A", 10: "A", 11: "E", 12: "A", 13: "D", 14: "D", 15: "B", 16: "A",
    17: "C", 18: "B", 19: "B", 20: "D", 21: "B", 22: "B", 23: "D", 24: "E",
}
PTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

TITLE = {
    1: ("最先熄灭的蜡烛", "Candle Burned First"),
    2: ("袋鼠硬币面值", "Kangaroo Coin Value"),
    3: ("钟面圆盘孔", "Clock Face Holes"),
    4: ("拼成正方形", "Puzzle Square Pieces"),
    5: ("恰好两灯同亮", "Exactly Two Lights On"),
    6: ("折叠透明纸", "Fold Transparent Paper"),
    7: ("三层圆盘塔", "Three-Disc Towers"),
    8: ("粘在黑圆上", "Glue on Black Circle"),
    9: ("盖住圆点的碎片", "Piece Covering the Dot"),
    10: ("天平旁的砝码", "Balanced Scale Weight"),
    11: ("褪色刻度尺", "Faded Ruler Marks"),
    12: ("路B西面的房屋", "Houses West of Road B"),
    13: ("只坐两人的车", "Cars with Two People"),
    14: ("地铁第96站", "Metro 96th Stop"),
    15: ("圆圈最少着色", "Colour Connected Circles"),
    16: ("迷宫贴纸顺序", "Maze Wall Stickers"),
    17: ("队列中的袋鼠", "Kangaroos in a Line"),
    18: ("对折剪角展开", "Fold Cut Unfold"),
    19: ("进入顺序", "Entering Orders"),
    20: ("正确的钟", "Correct Clock"),
    21: ("小亚的蓝弹珠", "Adam's Blue Marbles"),
    22: ("机器R与S", "Machines R and S"),
    23: ("圆圈数字和", "Circle Number Sums"),
    24: ("阴影网格猜测", "Shaded Grid Guess"),
}

PROB = {
    1: (
        "小安将 <b>5 支相同的蜡烛</b>同时点燃。蜡烛在不同时间停止燃烧，现在如图。哪支蜡烛<strong>最先</strong>停止燃烧？",
        "Akira lights <b>5 identical candles</b> all at the same time. They stopped burning at different times and now look as shown. Which candle stopped burning <strong>first</strong>?",
    ),
    2: (
        "标注问号的两枚袋鼠硬币面值相同。面值是多少？<b>20+10+10+?+?+1=51</b>",
        "The 2 kangaroo coins with the question mark have the same value. What is this value? <b>20+10+10+?+?+1=51</b>",
    ),
    3: (
        "带两个孔的灰色圆盘放在钟面上并绕中心旋转。哪两个数字<strong>可能同时</strong>被看到？",
        "A gray circle with 2 large holes is put on a clock-face and turned around its center. Which 2 numbers is it possible to see at the same time?",
    ),
    4: (
        "小艾有拼图 <b>1–4</b>。她可以用哪<strong>两块</strong>拼成图中的正方形？",
        "Alice has puzzle pieces <b>1–4</b>. Which <strong>2 pieces</strong> can she put together to form the square shown?",
    ),
    5: (
        "灯光开关计划如图。恰好有 <b>2 盏灯</b>同时亮起的<strong>总时长</strong>是多少？",
        "A light engineer turns lights on and off using the plan shown. How long in total are exactly <b>2 of the lights</b> on at the same time?",
    ),
    6: (
        "小凯沿虚线折叠透明纸。他能看到什么图案？",
        "Kristoffer folds the transparent paper along the dashed line. What can he then see?",
    ),
    7: (
        "小娜有 <b>4 张</b>大小不同的圆盘，建 <b>3 层</b>塔且每层都比下面小。能建多少种<strong>不同的塔</strong>？",
        "Anna has <b>4 discs</b> of different sizes. She builds a tower of <b>3 discs</b> so every disc is smaller than the one below it. How many different towers can she make?",
    ),
    8: (
        "小丹把两张纸粘在黑色圆上。他<strong>无法</strong>获得以下哪个图案？",
        "Danny glued 2 pieces of paper on top of the black circle. What can he <strong>not</strong> obtain?",
    ),
    9: (
        "右侧图形被下方 <b>5 个碎片</b>覆盖。哪个碎片会<strong>盖住圆点</strong>？",
        "The shape on the right is covered with the 5 pieces below. Which piece will cover the dot?",
    ),
    10: (
        "砝码 <b>1–6 千克</b>。小罗放五个在天平上，剩一个旁置，天平平衡。旁置的是多重？",
        "There are weights <b>1–6 kg</b>. Rossitza puts five on the scales and one aside; the scales balance. Which weight did she put aside?",
    ),
    11: (
        "<b>60 cm</b> 尺部分刻度褪色，但一次测量可得 <b>10–60 cm</b>（每 10）。哪把是他的尺子？",
        "Ali's <b>60 cm</b> ruler has faded marks, but he can measure 10, 20, 30, 40, 50, 60 cm using it only once. Which is Ali's ruler?",
    ),
    12: (
        "路 A 北 <b>7</b> 栋、路 B 东 <b>8</b> 栋、路 A 南 <b>5</b> 栋。路 B 西面有多少栋？",
        "<b>7</b> houses north of Road A, <b>8</b> east of Road B, <b>5</b> south of Road A. How many houses are west of Road B?",
    ),
    13: (
        "<b>8 辆</b>车排队，每辆 <b>2 或 3 人</b>，共 <b>19 人</b>。恰好坐 <b>2 人</b>的车有几辆？",
        "<b>8 cars</b> wait for the ferry; each has <b>2 or 3 people</b>; <b>19 people</b> total. How many cars contain exactly <b>2 people</b>?",
    ),
    14: (
        "地铁站 A–F，到终点折返。从 B 出发第一站 C。<strong>第 96 站</strong>是哪一站？",
        "Metro stations A–F; train reverses at ends. Started at B, first stop C. Which is the <strong>96th stop</strong>?",
    ),
    15: (
        "相连圆圈不同色。最少需要多少种颜色？",
        "Hatice paints circles so any two connected by a line have different colours. Smallest number of colours needed?",
    ),
    16: (
        "小莎走过两层迷宫，路过三张贴纸。她按什么顺序看到它们？",
        "Sam walks the two-storey maze from entrance to exit, passing 3 wall stickers. In what order will she see them?",
    ),
    17: (
        "<b>6 海狸 2 袋鼠</b>站成一排；任意连续 <b>3</b> 个中恰有 <b>1 只袋鼠</b>。哪个编号是袋鼠？",
        "<b>6 beavers and 2 kangaroos</b> in a line. Amongst any <b>3 consecutively numbered</b> animals, exactly <b>1 is a kangaroo</b>. Which numbered animal is a kangaroo?",
    ),
    18: (
        "正方形纸对折两次，剪掉一角再展开。展开后是什么样？",
        "Rebecca folds a square twice, cuts off one corner, then unfolds. What does the paper look like?",
    ),
    19: (
        "赫敏不当第一，哈利不当第二，罗恩不当第三。有多少种<strong>进入顺序</strong>？",
        "Hermione is never first, Harry never second, Ron never third. In how many different orders could they walk in?",
    ),
    20: (
        "五个钟：一个快一小时，一个慢一小时，一个正确，两个停走。哪个显示<strong>正确时间</strong>？",
        "Five clocks: one hour fast, one hour slow, one correct, two stopped. Which shows the correct time?",
    ),
    21: (
        "两人各 <b>9 颗</b>弹珠，共 <b>8 红 10 蓝</b>；小布蓝是红的两倍。小亚有几颗<strong>蓝弹珠</strong>？",
        "Adam and Brenda have <b>9 marbles</b> each; together <b>8 red and 10 blue</b>. Brenda has twice as many blue as red. How many <strong>blue marbles</strong> does Adam have?",
    ),
    22: (
        "机器 R 顺时针转 <b>90°</b>，机器 S 盖章 ♣。要得到图示结果，机器顺序是？",
        "Machine R rotates 90° clockwise; machine S stamps ♣. In which order are the machines used to produce the result shown?",
    ),
    23: (
        "把 <b>1–7</b> 写入圆圈，相邻和如图。阴影圆圈必须写几？",
        "Write <b>1–7</b> in circles so neighbouring sums match the labels. What number must be in the green/shaded circle?",
    ),
    24: (
        "<b>4×4</b> 中恰涂 <b>5 格</b>。一人全对，其余每人猜对 4 个阴影格。哪个是<strong>正确网格</strong>？",
        "Maria shaded exactly <b>5 cells</b> in a <b>4×4</b> grid. One friend is right; each of the others has four cells correct. Which is the correct grid?",
    ),
}

CHOICE_LABELS = {
    2: ["1", "2", "5", "10", "20"],
    3: ["4和9", "5和9", "5和10", "6和9", "7和12"],
    4: ["1和2", "1和3", "1和4", "2和3", "2和4"],
    5: ["2分", "6分", "8分", "9分", "10分"],
    7: ["1", "2", "4", "5", "6"],
    10: ["1kg", "2kg", "3kg", "4kg", "无法确定"],
    12: ["4", "5", "6", "7", "8"],
    13: ["2", "3", "4", "5", "6"],
    14: ["A", "B", "C", "D", "E"],
    15: ["2", "3", "4", "5", "6"],
    17: ["1", "2", "3", "4", "5"],
    19: ["1", "2", "3", "4", "6"],
    21: ["3", "4", "5", "6", "0"],
    22: ["SRR", "RSR", "RSS", "RRS", "SRS"],
    23: ["1", "2", "3", "4", "5"],
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

    # Q1 — candle burned first (figure)
    body, js = lab_compare_options(
        1,
        "相同蜡烛同时点燃：<strong>最先熄灭</strong>的是剩余最短（燃尽最少）的那支。",
        "Identical candles lit together: the one that stopped <strong>first</strong> has the shortest remaining wax.",
    )
    pages[1] = page(1, "实验台：对照蜡烛高度", "Lab: compare candle heights", body, js)

    # Q2 — kangaroo coin value
    pages[2] = page(
        2, "实验台：算问号面值", "Lab: compute coin value",
        f"""
    {mission(
        ["已知：20+10+10+?+?+1=51", "两枚问号硬币面值相同", "问号共占：51−41=10", "每枚 = 10÷2 = 5"],
        ["Given: 20+10+10+?+?+1=51", "Two ? coins have equal value", "Both ? total: 51−41=10", "Each = 10÷2 = 5"],
    )}
    <div class="stage">
      <div class="info" id="i2">51 − (20+10+10+1) = ?</div>
      <button class="btn primary" onclick="calc2()"><span class="lang-zh">计算面值</span><span class="lang-en">Compute value</span></button>
    </div>
        """,
        r"""
function calc2(){
  const known=20+10+10+1;
  const both=51-known;
  const each=both/2;
  document.getElementById('i2').textContent=document.body.classList.contains('en-mode')
    ? `51 − ${known} = ${both} for two ? coins → each = ${each}`
    : `51 − ${known} = ${both}，两枚问号共 ${both} → 每枚 = ${each}`;
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[2],
    )

    # Q3 — clock face holes
    pages[3] = page(
        3, "实验台：两孔相差 4 小时", "Lab: holes 4 hours apart",
        f"""
    {mission(
        ["圆盘有两个大孔", "两孔在钟面上相差 4 小时", "试 12 点方向与 4 小时后的数字", "只有 5 和 9 能同时看到"],
        ["Disc has two large holes", "Holes are 4 hours apart on the clock", "Try numbers 4 hours apart", "Only 5 and 9 can appear together"],
    )}
    <p class="tip lang-zh">提示：两孔相差 <b>4 小时</b>；只有 <b>5 和 9</b> 符合。</p>
    <p class="tip lang-en">Tip: holes are <b>4 hours</b> apart; only <b>5 and 9</b> work.</p>
    <div class="stage">
      <div class="info" id="i3"></div>
      <button class="btn primary" onclick="hint3()"><span class="lang-zh">列出可能组合</span><span class="lang-en">List pairs</span></button>
    </div>
        """,
        r"""
function hint3(){
  document.getElementById('i3').textContent=document.body.classList.contains('en-mode')
    ? '4-hour pairs: (1,5)(2,6)(3,7)(4,8)(5,9)(6,10)(7,11)(8,12). Only 5 and 9 fits the disc.'
    : '相差 4 小时：(1,5)(2,6)(3,7)(4,8)(5,9)(6,10)(7,11)(8,12)。圆盘只有 5 和 9 符合。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[3],
    )

    # Q4 — puzzle square (figure)
    body, js = lab_compare_options(
        4,
        "在选项中试哪两块拼图能拼成图中的正方形。",
        "Try which two puzzle pieces form the square shown in the options.",
    )
    pages[4] = page(
        4, "实验台：对照拼图", "Lab: compare puzzle pieces", body, js,
        choice_labels=CHOICE_LABELS[4],
    )

    # Q5 — exactly two lights on
    pages[5] = page(
        5, "实验台：数两灯同亮", "Lab: count 2-light minutes",
        f"""
    {mission(
        ["读灯光开关时间表", "找出每一分钟亮几盏灯", "统计恰好 2 盏灯同亮的分钟", "加起来得到总时长"],
        ["Read the light schedule", "Count how many lights are on each minute", "Add minutes with exactly 2 lights on", "Total duration"],
    )}
    <p class="tip lang-zh">提示：恰好两灯同亮共 <b>8</b> 分钟。</p>
    <p class="tip lang-en">Tip: exactly two lights are on for <b>8</b> minutes total.</p>
    <div class="stage">
      <div class="info" id="i5"></div>
      <button class="btn primary" onclick="hint5()"><span class="lang-zh">显示计数提示</span><span class="lang-en">Show count hint</span></button>
    </div>
        """,
        r"""
function hint5(){
  document.getElementById('i5').textContent=document.body.classList.contains('en-mode')
    ? 'Go minute by minute on the chart. Exactly 2 lights on → total = 8 minutes.'
    : '逐分钟对照图表。恰好 2 盏灯同亮 → 共 8 分钟。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[5],
    )

    # Q6 — fold transparent paper (figure)
    body, js = lab_compare_options(
        6,
        "沿虚线对折透明纸，想象两层图案叠加后的样子。",
        "Fold along the dashed line and imagine how the transparent layers overlap.",
    )
    pages[6] = page(6, "实验台：对照折叠结果", "Lab: compare folded view", body, js)

    # Q7 — three-disc towers
    pages[7] = page(
        7, "实验台：C(4,3)=4", "Lab: C(4,3)=4",
        f"""
    {mission(
        ["4 张大小不同的圆盘", "选 3 张建塔", "大小顺序唯一（大在下）", "C(4,3) = 4 种塔"],
        ["4 discs of different sizes", "Choose 3 for a tower", "Only one stacking order (largest bottom)", "C(4,3) = 4 different towers"],
    )}
    <p class="tip lang-zh">提示：从 4 盘中选 3 盘，大小顺序唯一 ⇒ <b>C(4,3)=4</b>。</p>
    <p class="tip lang-en">Tip: pick 3 of 4 discs; stacking order fixed ⇒ <b>C(4,3)=4</b>.</p>
    <div class="stage">
      <div class="info" id="i7">4 选 3 = ?</div>
      <button class="btn primary" onclick="calc7()"><span class="lang-zh">计算种数</span><span class="lang-en">Count towers</span></button>
    </div>
        """,
        r"""
function calc7(){
  document.getElementById('i7').textContent=document.body.classList.contains('en-mode')
    ? 'Choose 3 of 4 discs: C(4,3) = 4 different towers.'
    : '从 4 盘中选 3 盘：C(4,3) = 4 种不同的塔。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[7],
    )

    # Q8 — glue on black circle (figure)
    body, js = lab_compare_options(
        8,
        "两张纸叠在黑圆上。看哪个选项<strong>无法</strong>得到。",
        "Two pieces on the black circle. Which option can <strong>not</strong> be obtained?",
    )
    pages[8] = page(8, "实验台：对照叠纸结果", "Lab: compare glued patterns", body, js)

    # Q9 — piece covering dot (figure)
    body, js = lab_compare_options(
        9,
        "5 个碎片铺满图形。看哪个碎片会盖住圆点。",
        "Five pieces tile the shape. Find which piece covers the dot.",
    )
    pages[9] = page(9, "实验台：对照碎片位置", "Lab: compare piece placement", body, js)

    # Q10 — balanced scale weight
    pages[10] = page(
        10, "实验台：旁置 1 kg", "Lab: aside 1 kg",
        f"""
    {mission(
        ["砝码 1–6 kg，五个放天平，一个旁置", "天平平衡 → 两边重量相等", "1+2+3+4+5+6=21", "旁置 1 kg → 两边各 10 kg"],
        ["Weights 1–6 kg; five on scale, one aside", "Balanced → equal total on each side", "1+2+3+4+5+6=21", "Aside 1 kg → 10 kg per side"],
    )}
    <p class="tip lang-zh">提示：旁置 <b>1 kg</b> 与图中天平一致。</p>
    <p class="tip lang-en">Tip: the weight put aside is <b>1 kg</b>.</p>
    <div class="stage">
      <div class="info" id="i10">1+2+3+4+5+6 = 21</div>
      <button class="btn primary" onclick="calc10()"><span class="lang-zh">求旁置砝码</span><span class="lang-en">Find aside weight</span></button>
    </div>
        """,
        r"""
function calc10(){
  document.getElementById('i10').textContent=document.body.classList.contains('en-mode')
    ? 'Total 21 kg. Aside 1 kg → 10 kg on each pan (2+3+5 vs 4+6).'
    : '总共 21 kg。旁置 1 kg → 两边各 10 kg（2+3+5 对 4+6）。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[10],
    )

    # Q11 — faded ruler (figure)
    body, js = lab_compare_options(
        11,
        "刻度 10 和 40 可一次量出 10–60 cm 各长度。对照选项找他的尺子。",
        "Marks at 10 and 40 allow measuring 10–60 cm once each. Find Ali's ruler in the options.",
    )
    pages[11] = page(11, "实验台：对照刻度尺", "Lab: compare rulers", body, js)

    # Q12 — houses west of Road B
    pages[12] = page(
        12, "实验台：7+5−8=4", "Lab: 7+5−8=4",
        f"""
    {mission(
        ["路 A 北 7 栋 + 南 5 栋", "总房屋 = 7+5 = 12", "路 B 东 8 栋", "路 B 西 = 12−8 = 4"],
        ["7 north + 5 south of Road A", "Total houses = 7+5 = 12", "8 east of Road B", "West of B = 12−8 = 4"],
    )}
    <p class="tip lang-zh">提示：<b>7+5=12</b>，路 B 西 = <b>12−8=4</b>。</p>
    <p class="tip lang-en">Tip: <b>7+5=12</b>; west of B = <b>12−8=4</b>.</p>
    <div class="stage">
      <div class="info" id="i12">7 + 5 − 8 = ?</div>
      <button class="btn primary" onclick="calc12()"><span class="lang-zh">计算西面房屋</span><span class="lang-en">Count west houses</span></button>
    </div>
        """,
        r"""
function calc12(){
  const w=7+5-8;
  document.getElementById('i12').textContent=document.body.classList.contains('en-mode')
    ? `Total ${7+5} houses; east of B = 8 → west = ${w}.`
    : `共 ${7+5} 栋；路 B 东 8 栋 → 西面 ${w} 栋。`;
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[12],
    )

    # Q13 — cars with two people
    pages[13] = page(
        13, "实验台：2a+3(8−a)=19", "Lab: 2a+3(8−a)=19",
        f"""
    {mission(
        ["8 辆车，每辆 2 或 3 人", "设 2 人车 a 辆，3 人车 (8−a) 辆", "2a + 3(8−a) = 19", "解得 a = 5"],
        ["8 cars, 2 or 3 people each", "Let a cars have 2 people, (8−a) have 3", "2a + 3(8−a) = 19", "Solve: a = 5"],
    )}
    <p class="tip lang-zh">提示：<b>2a+3(8−a)=19</b> ⇒ <b>a=5</b>。</p>
    <p class="tip lang-en">Tip: <b>2a+3(8−a)=19</b> ⇒ <b>a=5</b>.</p>
    <div class="stage">
      <div class="info" id="i13">2a + 3(8−a) = 19</div>
      <button class="btn primary" onclick="calc13()"><span class="lang-zh">解方程</span><span class="lang-en">Solve equation</span></button>
    </div>
        """,
        r"""
function calc13(){
  document.getElementById('i13').textContent=document.body.classList.contains('en-mode')
    ? '2a + 24 − 3a = 19 → −a = −5 → a = 5 cars with exactly 2 people.'
    : '2a + 24 − 3a = 19 → −a = −5 → a = 5 辆恰好 2 人。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[13],
    )

    # Q14 — metro 96th stop
    pages[14] = page(
        14, "实验台：周期 10", "Lab: period 10",
        f"""
    {mission(
        ["站 A–F，到终点折返", "从 B 出发，第一站 C", "找往返周期长度", "96 mod 10 = 6 → 第 6 站 D"],
        ["Stations A–F, reverse at ends", "Start B, first stop C", "Find round-trip period", "96 mod 10 = 6 → 6th stop is D"],
    )}
    <p class="tip lang-zh">提示：周期 <b>10</b>，<b>96÷10 余 6</b> → <b>D</b> 站。</p>
    <p class="tip lang-en">Tip: period <b>10</b>, <b>96 mod 10 = 6</b> → station <b>D</b>.</p>
    <div class="stage">
      <div class="info" id="i14">96 % 10 = ?</div>
      <button class="btn primary" onclick="calc14()"><span class="lang-zh">算第 96 站</span><span class="lang-en">Find 96th stop</span></button>
    </div>
        """,
        r"""
function calc14(){
  const r=96%10;
  document.getElementById('i14').textContent=document.body.classList.contains('en-mode')
    ? `Period 10 stops. 96 mod 10 = ${r} → 6th stop in cycle = D.`
    : `周期 10 站。96÷10 余 ${r} → 周期内第 6 站 = D。`;
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[14],
    )

    # Q15 — chromatic number
    pages[15] = page(
        15, "实验台：最少 3 色", "Lab: minimum 3 colours",
        f"""
    {mission(
        ["相连圆圈必须不同色", "这是图着色问题", "试 2 色能否完成", "最少需要 3 种颜色"],
        ["Connected circles need different colours", "This is graph colouring", "Try if 2 colours work", "Minimum is 3 colours"],
    )}
    <p class="tip lang-zh">提示：图着色最少 <b>3</b> 色。</p>
    <p class="tip lang-en">Tip: chromatic number is <b>3</b>.</p>
    <div class="stage">
      <div class="info" id="i15"></div>
      <button class="btn primary" onclick="hint15()"><span class="lang-zh">着色提示</span><span class="lang-en">Colouring hint</span></button>
    </div>
        """,
        r"""
function hint15(){
  document.getElementById('i15').textContent=document.body.classList.contains('en-mode')
    ? 'Two colours cannot work — some circles form an odd cycle. Minimum = 3 colours.'
    : '2 色不够——有奇数环。最少需要 3 种颜色。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[15],
    )

    # Q16 — maze stickers (figure)
    body, js = lab_compare_options(
        16,
        "从入口走到出口，记录三张贴纸的顺序：青蛙→犀牛→鲨鱼。",
        "Walk entrance to exit; sticker order: frog → rhino → shark.",
    )
    pages[16] = page(16, "实验台：对照迷宫路径", "Lab: trace maze path", body, js)

    # Q17 — kangaroos in a line
    pages[17] = page(
        17, "实验台：袋鼠在 3 和 6", "Lab: kangaroos at 3 and 6",
        f"""
    {mission(
        ["6 海狸 2 袋鼠，共 8 只", "任意连续 3 只中恰 1 袋鼠", "试袋鼠可能位置", "编号 3 和 6 是袋鼠"],
        ["6 beavers, 2 kangaroos (8 animals)", "Exactly 1 kangaroo in any 3 consecutive", "Try kangaroo positions", "Numbers 3 and 6 are kangaroos"],
    )}
    <p class="tip lang-zh">提示：袋鼠只能在 <b>3</b> 与 <b>6</b>；故选 <b>3</b>。</p>
    <p class="tip lang-en">Tip: kangaroos only at <b>3</b> and <b>6</b>; answer <b>3</b>.</p>
    <div class="stage">
      <div class="info" id="i17">1 2 3 4 5 6 7 8</div>
      <button class="btn primary" onclick="hint17()"><span class="lang-zh">标记袋鼠位置</span><span class="lang-en">Mark kangaroos</span></button>
    </div>
        """,
        r"""
function hint17(){
  document.getElementById('i17').textContent=document.body.classList.contains('en-mode')
    ? 'Positions 3 and 6 must be kangaroos. Question asks which number is a kangaroo → 3.'
    : '编号 3 和 6 必须是袋鼠。题目问哪个编号是袋鼠 → 3。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[17],
    )

    # Q18 — fold cut unfold (figure)
    body, js = lab_compare_options(
        18,
        "正方形对折两次，剪角，再展开。对照选项找展开图。",
        "Square folded twice, corner cut, unfolded. Match the result in the options.",
    )
    pages[18] = page(18, "实验台：对照展开图", "Lab: compare unfolded shape", body, js)

    # Q19 — entering orders
    pages[19] = page(
        19, "实验台：仅 2 种顺序", "Lab: only 2 orders",
        f"""
    {mission(
        ["赫敏 ≠ 第一", "哈利 ≠ 第二", "罗恩 ≠ 第三", "枚举后只有 2 种合法顺序"],
        ["Hermione ≠ 1st", "Harry ≠ 2nd", "Ron ≠ 3rd", "Only 2 valid orders remain"],
    )}
    <p class="tip lang-zh">提示：仅 <b>2</b> 种：哈→赫→罗，哈→罗→赫。</p>
    <p class="tip lang-en">Tip: only <b>2</b> orders: H→Hermione→Ron and H→Ron→Hermione.</p>
    <div class="stage">
      <div class="info" id="i19"></div>
      <button class="btn primary" onclick="hint19()"><span class="lang-zh">列出合法顺序</span><span class="lang-en">List valid orders</span></button>
    </div>
        """,
        r"""
function hint19(){
  document.getElementById('i19').textContent=document.body.classList.contains('en-mode')
    ? 'Valid: Harry→Hermione→Ron, Harry→Ron→Hermione. Count = 2.'
    : '合法：哈利→赫敏→罗恩，哈利→罗恩→赫敏。共 2 种。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[19],
    )

    # Q20 — correct clock (figure)
    body, js = lab_compare_options(
        20,
        "一个快 1 小时、一个慢 1 小时、一个正确、两个停走。找显示正确 3 点的钟。",
        "One fast, one slow, one correct, two stopped. Find the clock showing the correct 3 o'clock.",
    )
    pages[20] = page(20, "实验台：对照五个钟", "Lab: compare five clocks", body, js)

    # Q21 — Adam's blue marbles
    pages[21] = page(
        21, "实验台：小布 6 蓝 3 红", "Lab: Brenda 6B 3R",
        f"""
    {mission(
        ["两人各 9 颗，共 8 红 10 蓝", "小布蓝 = 2 × 小布红", "小布 9 颗 → 6 蓝 + 3 红", "小亚蓝 = 10 − 6 = 4"],
        ["9 each; 8 red, 10 blue total", "Brenda blue = 2 × Brenda red", "Brenda: 6 blue + 3 red", "Adam blue = 10 − 6 = 4"],
    )}
    <p class="tip lang-zh">提示：小布 <b>6 蓝 + 3 红</b> → 小亚蓝弹珠 <b>4</b>。</p>
    <p class="tip lang-en">Tip: Brenda <b>6 blue + 3 red</b> → Adam has <b>4</b> blue marbles.</p>
    <div class="stage">
      <div class="info" id="i21">小布蓝 = 2 × 小布红，共 9 颗</div>
      <button class="btn primary" onclick="calc21()"><span class="lang-zh">算小亚蓝弹珠</span><span class="lang-en">Find Adam's blue</span></button>
    </div>
        """,
        r"""
function calc21(){
  document.getElementById('i21').textContent=document.body.classList.contains('en-mode')
    ? 'Brenda: 6 blue + 3 red (blue = 2×red, total 9). Adam blue = 10 − 6 = 4.'
    : '小布：6 蓝 + 3 红（蓝=2×红，共 9）。小亚蓝 = 10 − 6 = 4。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[21],
    )

    # Q22 — machines R and S
    pages[22] = page(
        22, "实验台：顺序 RSR", "Lab: order RSR",
        f"""
    {mission(
        ["R = 顺时针转 90°", "S = 盖章 ♣", "要得到图示结果", "盖章前后各转一次 → RSR"],
        ["R = rotate 90° clockwise", "S = stamp ♣", "Match the shown result", "Rotate, stamp, rotate → RSR"],
    )}
    <p class="tip lang-zh">提示：盖章前后各转一次 ⇒ <b>RSR</b>。</p>
    <p class="tip lang-en">Tip: rotate before and after stamping ⇒ <b>RSR</b>.</p>
    <div class="stage">
      <div class="info" id="i22">R → S → ?</div>
      <button class="btn primary" onclick="hint22()"><span class="lang-zh">显示机器顺序</span><span class="lang-en">Show machine order</span></button>
    </div>
        """,
        r"""
function hint22(){
  document.getElementById('i22').textContent=document.body.classList.contains('en-mode')
    ? 'First R (rotate), then S (stamp), then R (rotate) → RSR.'
    : '先 R（旋转），再 S（盖章），再 R（旋转）→ RSR。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[22],
    )

    # Q23 — circle number sums
    pages[23] = page(
        23, "实验台：阴影 = 4", "Lab: shaded = 4",
        f"""
    {mission(
        ["1–7 填入圆圈", "相邻两圆数字之和 = 边上标签", "从已知和反推各圆数字", "阴影圆 = 4"],
        ["Place 1–7 in circles", "Neighbour sums match edge labels", "Deduce digits from sums", "Shaded circle = 4"],
    )}
    <p class="tip lang-zh">提示：相邻和推出阴影格 = <b>4</b>。</p>
    <p class="tip lang-en">Tip: neighbour sums force the shaded circle = <b>4</b>.</p>
    <div class="stage">
      <div class="info" id="i23"></div>
      <button class="btn primary" onclick="hint23()"><span class="lang-zh">推理提示</span><span class="lang-en">Deduction hint</span></button>
    </div>
        """,
        r"""
function hint23(){
  document.getElementById('i23').textContent=document.body.classList.contains('en-mode')
    ? 'Work from corner sums inward. The green/shaded circle must be 4.'
    : '从角落的和向内推理。阴影圆圈必须是 4。';
  setMission(3);
}
setMission(0);
""",
        choice_labels=CHOICE_LABELS[23],
    )

    # Q24 — shaded grid guess (figure)
    body, js = lab_compare_options(
        24,
        "一人全对，其余各猜对 4 格。找唯一完全正确的 5 格阴影网格。",
        "One grid is fully correct; each other shares exactly 4 shaded cells with it. Find the correct grid.",
    )
    pages[24] = page(24, "实验台：对照阴影网格", "Lab: compare shaded grids", body, js)

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

答案：1D 2C 3B 4C 5C 6E 7C 8E 9A 10A 11E 12A 13D 14D 15B 16A 17C 18B 19B 20D 21B 22B 23D 24E
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
