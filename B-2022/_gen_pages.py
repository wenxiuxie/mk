# -*- coding: utf-8 -*-
"""Build B-2022 pages Q10-24 (keep existing 17.html interactive core)."""
import os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(ROOT, "assets")

# Map extracted images -> q figures
COPIES = {
    "q11_figure.jpeg": "p4_img3.jpeg",
    "q11_optA.png": "p4_img4.png",
    "q11_optB.png": "p4_img5.png",
    "q11_optC.png": "p4_img6.png",
    "q11_optD.png": "p4_img7.png",
    "q11_optE.png": "p4_img8.png",
    "q12_figure.png": "p4_img0.png",
    "q13_figure.png": "p5_img0.png",
    "q14_figure.png": "p5_img1.png",
    "q16_figure.png": "p6_img0.png",
    "q17_figure.png": "p6_img1.png",
    "q19_figure.png": "p7_img0.png",
    "q20_figure.png": "p7_img1.png",
    "q21_figure.jpeg": "p8_img0.jpeg",
    "q23_optA.png": "p8_img2.png",
    "q23_optB.png": "p8_img3.png",
    "q23_optC.png": "p8_img4.png",
    "q23_optD.png": "p8_img5.png",
    "q23_optE.png": "p8_img6.png",
    "q24_figure.png": "p9_img0.png",
}
for dst, src in COPIES.items():
    s = os.path.join(ASSETS, src)
    d = os.path.join(ASSETS, dst)
    if os.path.exists(s):
        shutil.copy2(s, d)

ANSWERS = {
    10: "C", 11: "A", 12: "B", 13: "E", 14: "B", 15: "E", 16: "B", 17: "B",
    18: "D", 19: "E", 20: "E", 21: "C", 22: "B", 23: "A", 24: "D",
}

POINTS = {n: (4 if n <= 16 else 5) for n in range(10, 25)}

META = {
    10: ("袋鼠年龄", "Kangaroo Ages",
         "一家袋鼠年龄是 2、4、5、6、8、10 岁。其中四只年龄之和为 22。另外两只各几岁？",
         "Ages are 2, 4, 5, 6, 8, 10. Four of them sum to 22. Ages of the other two?",
         ["2和8", "4和5", "5和8", "6和8", "6和10"],
         ["2 and 8", "4 and 5", "5 and 8", "6 and 8", "6 and 10"]),
    11: ("明信片推理", "Postcard Logic",
         "五张明信片寄给五位朋友。小明的卡上没有鸭子；卡拉的卡有太阳；宝拉的卡正好两种生物；莱西的卡有狗；希希的卡有袋鼠。小明收到哪张？",
         "Five postcards. Mike: no ducks. Cara: has sun. Paula: exactly two living creatures. Lexi: has a dog. Heather: has kangaroos. Which card did Mike get?",
         ["A", "B", "C", "D", "E"], ["A", "B", "C", "D", "E"]),
    12: ("改一个数", "Fix One Number",
         "小莫想让每行每列三个数之和都相同，但写错了一个数。应改哪个数？",
         "Mosif wants equal row/column sums, but made one mistake. Which number must he correct?",
         ["1", "3", "某个4", "5", "某个7"],
         ["1", "3", "one of the 4s", "5", "one of the 7s"]),
    13: ("地毯圆点", "Carpet Dots",
         "阿拉丁的正方形地毯，每边两排点数相同。地毯折叠了。一共有多少个圆点？",
         "Aladdin’s square carpet has the same number of dots in two lines along each side. It folded. How many dots in total?",
         ["48", "44", "40", "36", "32"], ["48", "44", "40", "36", "32"]),
    14: ("折纸打孔", "Fold and Punch",
         "小乔把数字方阵按图折两次，再在箭头黑点处打孔。还会打到哪些数？",
         "Joanna folds the number square twice as shown, then punches the black spot. Which numbers are also punched?",
         ["8,11,26,29", "14,17,20,23", "15,16,21,22", "14,16,21,23", "15,17,20,22"],
         ["8,11,26,29", "14,17,20,23", "15,16,21,22", "14,16,21,23", "15,17,20,22"]),
    15: ("教室座位", "Classroom Seats",
         "每排人数相同。小罗前面 2 排、后面 1 排；他这一排左边 3 人、右边 5 人。全班多少人？",
         "Same number per row. 2 rows in front of Robert, 1 behind; 3 on his left, 5 on his right. How many pupils?",
         ["10", "17", "18", "27", "36"], ["10", "17", "18", "27", "36"]),
    16: ("白色木块", "White Blocks",
         "大立方体由三种木块搭成。用了多少个白色小木块？",
         "The cube is built from three kinds of wooden blocks. How many white blocks are used?",
         ["8", "11", "13", "16", "19"], ["8", "11", "13", "16", "19"]),
    18: ("足球积分", "Football Points",
         "三支球队两两各赛一场。胜 3 分，负 0 分，平各 1 分。结束时哪一个分数任何队都不可能得到？",
         "Three teams play each other once. Win 3, lose 0, draw 1 each. Which total is impossible for any team?",
         ["1", "2", "4", "5", "6"], ["1", "2", "4", "5", "6"]),
    19: ("蚂蚁爬金字塔", "Ant on Pyramid",
         "边长 10 cm 的立方体搭成金字塔。蚂蚁沿红线爬过的路程多长？",
         "Pyramid of 10 cm cubes. Length of the ant’s red path across the pyramid?",
         ["30 cm", "60 cm", "70 cm", "80 cm", "90 cm"],
         ["30 cm", "60 cm", "70 cm", "80 cm", "90 cm"]),
    20: ("路口拼片", "Road Pieces",
         "把一片拼到中间，使 A 能到 B 和 E，但不能到 D（可旋转）。哪两片可以？",
         "Place a piece in the middle so A can reach B and E but not D (rotations allowed). Which two pieces work?",
         ["1和2", "2和3", "1和4", "4和5", "1和5"],
         ["1 and 2", "2 and 3", "1 and 4", "4 and 5", "1 and 5"]),
    21: ("花园绕圈", "Garden Laps",
         "小安与小哲同速从 A 出发绕各自花园，再在 A 相遇。小安绕正方形花园最少几圈？",
         "Ahmad and Zhaleh walk at same speed from A around square/rect gardens and meet again at A. Fewest square laps for Ahmad?",
         ["1", "2", "3", "4", "5"], ["1", "2", "3", "4", "5"]),
    22: ("谁吃一样多", "Same Number of Plums",
         "L 比 S 多吃 2 个；B 比 L 少 3 个；C 比 B 多 1 个，且比 A 少 3 个。哪两人吃的一样多？",
         "Lauren = Sophie+2; Betty = Lauren−3; Claire = Betty+1 = Alice−3. Who ate the same number?",
         ["C和L", "C和S", "L和A", "S和A", "A和B"],
         ["Claire & Lauren", "Claire & Sophie", "Lauren & Alice", "Sophie & Alice", "Alice & Betty"]),
    23: ("毛毛虫睡觉", "Sleeping Caterpillar",
         "图中毛毛虫蜷起来睡觉，可能是哪一个样子？",
         "The caterpillar curls up to sleep. What might that look like?",
         ["A", "B", "C", "D", "E"], ["A", "B", "C", "D", "E"]),
    24: ("彩色格子下的数", "Hidden Coloured Numbers",
         "同色格子下藏着相同数字。每行右侧是该行数字之和。黑色格子下是几？",
         "Same colour hides the same number. Row sums are on the right. What is under the black square?",
         ["6", "8", "10", "12", "14"], ["6", "8", "10", "12", "14"]),
}

CSS = r"""
:root{--primary:#4a90e2;--success:#2ec4b6;--danger:#e71d36;--bg:#f8f9fa;--dark:#2c3e50}
*{box-sizing:border-box}
body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:#333;margin:0;padding:20px;display:flex;flex-direction:column;align-items:center}
.lang-toggle-btn{position:fixed;top:20px;right:20px;background:var(--dark);color:#fff;border:none;padding:10px 18px;border-radius:20px;cursor:pointer;font-weight:bold;z-index:1000}
h1{text-align:center;color:var(--primary);margin:8px 0;font-size:22px}
.meta{color:#64748b;font-size:14px;margin-bottom:14px}
.wrap{max-width:900px;width:100%}
.section{background:#fff;padding:20px;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,.05);margin-bottom:16px}
h2{color:var(--primary);border-left:5px solid var(--primary);padding-left:10px;margin:0 0 10px;font-size:18px}
.fig{display:block;width:100%;max-width:640px;margin:8px auto;border-radius:10px;border:1px solid #e2e8f0}
.fig-sm{max-width:420px}
.opts-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0}
.opt-img{width:110px;border:2px solid #e2e8f0;border-radius:10px;background:#fff;padding:4px;cursor:pointer}
.opt-img.picked{border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,.35)}
.pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0}
.card{min-width:72px;padding:10px 12px;border-radius:12px;background:var(--primary);color:#fff;font-weight:800;cursor:grab;text-align:center;user-select:none}
.answer-box{min-width:120px;min-height:72px;border:3px dashed var(--primary);border-radius:14px;margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;background:#fafbfc;padding:8px}
.answer-box.filled{border-style:solid;background:#e8f5e9}
.actions{text-align:center;margin-top:10px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px}
.submit{background:var(--success);color:#fff}
.reset{background:#6c757d;color:#fff}
.ghost{background:#e2e8f0;color:#334155}
.primary{background:var(--primary);color:#fff}
#feedback{text-align:center;font-weight:800;margin-top:12px;min-height:28px}
.ok{color:var(--success)}.bad{color:var(--danger)}
.nav{display:flex;justify-content:space-between;margin-top:8px}
.nav a{color:var(--primary);font-weight:700;text-decoration:none}
.lang-zh{display:block}.lang-en{display:none}
body.en-mode .lang-zh{display:none}body.en-mode .lang-en{display:block}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0}
.info{text-align:center;font-weight:700;min-height:28px;margin:8px 0;color:#0f172a}
.chip{display:inline-block;background:#e0f2fe;border:1px solid #7dd3fc;border-radius:999px;padding:6px 12px;margin:3px;font-weight:700;color:#0369a1}
.ages{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:12px 0}
.age{width:56px;height:56px;border-radius:12px;border:3px solid var(--primary);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;cursor:pointer;background:#fff}
.age.on{background:var(--primary);color:#fff}
.grid3{display:inline-grid;grid-template-columns:repeat(3,56px);gap:6px}
.cell{width:56px;height:56px;border:2px solid #94a3b8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;background:#fff;cursor:pointer}
.cell.bad{background:#fee2e2;border-color:#ef4444}
.cell.good{background:#dcfce7;border-color:#16a34a}
.sumbox{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;font-size:13px;font-weight:700;color:#475569;margin-top:8px}
.seat{display:inline-grid;gap:4px;background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #e2e8f0}
.s{width:36px;height:36px;border-radius:8px;border:2px solid #cbd5e1;background:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}
.s.me{background:#fde68a;border-color:#f59e0b}
.s.occ{background:#bfdbfe;border-color:#3b82f6}
.bar{display:flex;gap:8px;align-items:center;justify-content:center;margin:8px 0;flex-wrap:wrap}
input[type=number],input[type=range],select{padding:6px 8px;border-radius:8px;border:2px solid #cbd5e1;font-weight:700}
"""


def shell(n, title_zh, title_en, q_zh, q_en, choices_zh, choices_en, fig_html, play_html, play_js, ans_letter):
    prev = "index.html" if n == 10 else f"{n-1}.html"
    nxt = "index.html" if n == 24 else f"{n+1}.html"
    choice_cards = []
    for i, L in enumerate("ABCDE"):
        zh = choices_zh[i]
        en = choices_en[i]
        choice_cards.append(
            f'<div class="card" draggable="true" data-ans="{L}" '
            f'ondragstart="dragN=\'{L}\'" onclick="setAns(\'{L}\')">'
            f'<div>{L}</div><div style="font-size:12px;opacity:.95">'
            f'<span class="lang-zh">{zh}</span><span class="lang-en">{en}</span></div></div>'
        )
    pts = POINTS[n]
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2022 B · Q{n} · {title_zh}</title>
<style>{CSS}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 English / 中文</button>
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
    {play_html}
    <p class="tip lang-zh" style="margin-top:16px">我的答案（拖进去或点选）</p>
    <p class="tip lang-en" style="margin-top:16px">My answer (drag or tap)</p>
    <div class="pool" id="pool">{''.join(choice_cards)}</div>
    <div class="answer-box" id="ansBox" ondragover="event.preventDefault()" ondrop="dropAns(event)" onclick="clearAns()"></div>
    <div class="actions">
      <button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
      <div id="feedback"></div>
    </div>
  </div>
  <div class="nav">
    <a href="{prev}"><span class="lang-zh">← 上一题</span><span class="lang-en">← Prev</span></a>
    <a href="{nxt}"><span class="lang-zh">下一题 →</span><span class="lang-en">Next →</span></a>
  </div>
</div>
<script>
const CORRECT='{ans_letter}';
let ans=null, dragN=null;
function en(){{return document.body.classList.contains('en-mode');}}
function setAns(L){{
  ans=L; dragN=null;
  const c=document.querySelector('.card[data-ans="'+L+'"]');
  const box=document.getElementById('ansBox');
  box.className='answer-box filled';
  box.innerHTML=c?c.innerHTML:L;
  document.getElementById('feedback').textContent='';
}}
function dropAns(e){{e.preventDefault(); if(dragN) setAns(dragN);}}
function clearAns(){{
  ans=null; const box=document.getElementById('ansBox');
  box.className='answer-box'; box.innerHTML='';
  document.getElementById('feedback').textContent='';
}}
function checkAnswer(){{
  const fb=document.getElementById('feedback');
  if(!ans){{ fb.className='bad'; fb.textContent=en()?'❌ Choose an option first.':'❌ 请先选择一个选项。'; return; }}
  const ok=ans===CORRECT;
  fb.className=ok?'ok':'bad';
  fb.textContent=ok?(en()?'✅ Correct!':'✅ 答对了！'):(en()?'❌ Not yet — keep experimenting.':'❌ 还不对——再实验一下。');
}}
{play_js}
</script>
</body>
</html>
"""


def fig(src, cls="fig"):
    if not src:
        return ""
    return f'<img class="{cls}" src="assets/{src}" alt="figure"/>'


PLAY = {}

# Q10 ages
PLAY[10] = (
    f"""
    <h2 class="lang-zh">实验：点选「这四只」看剩下两只之和</h2>
    <h2 class="lang-en">Lab: pick four ages, see the other two</h2>
    <p class="tip lang-zh">全家年龄和是固定的。点选四只（和应为 22），看剩下两只。</p>
    <p class="tip lang-en">Total age is fixed. Select four (sum should be 22) and see the other two.</p>
    <div class="ages" id="ages"></div>
    <div class="info" id="info"></div>
    """,
    """
const AGES=[2,4,5,6,8,10];
let sel=new Set();
function renderAges(){
  const box=document.getElementById('ages'); box.innerHTML='';
  AGES.forEach(a=>{
    const d=document.createElement('div');
    d.className='age'+(sel.has(a)?' on':''); d.textContent=a;
    d.onclick=()=>{ if(sel.has(a)) sel.delete(a); else { if(sel.size>=4) return; sel.add(a);} renderAges(); };
    box.appendChild(d);
  });
  const picked=[...sel];
  const rest=AGES.filter(x=>!sel.has(x));
  const s=picked.reduce((x,y)=>x+y,0);
  const r=rest.reduce((x,y)=>x+y,0);
  const info=document.getElementById('info');
  if(picked.length===0) info.textContent=en()?'Pick up to 4 ages.':'点选最多 4 个年龄。';
  else if(picked.length<4) info.textContent=en()?`Selected ${picked.join('+')}=${s}. Pick ${4-picked.length} more.`:`已选 ${picked.join('+')}=${s}。再选 ${4-picked.length} 个。`;
  else info.textContent=en()?`Four sum=${s}${s===22?' ✓':''}. Other two: ${rest.join(' & ')} (sum ${r}).`:`四只之和=${s}${s===22?' ✓':''}。另外两只：${rest.join(' 和 ')}（和 ${r}）。`;
}
renderAges();
"""
)

# Q11 postcards
PLAY[11] = (
    f"""
    <h2 class="lang-zh">实验：对照线索，排除明信片</h2>
    <h2 class="lang-en">Lab: use clues to eliminate cards</h2>
    <p class="tip lang-zh">点选一张卡，勾选它满足哪些线索，推理小明是谁。</p>
    <p class="tip lang-en">Tap a card and reason with the clues to find Mike’s card.</p>
    {fig("q11_figure.jpeg")}
    <div class="opts-row" id="cards"></div>
    <div class="info" id="info"></div>
    """,
    """
const LABELS=['A','B','C','D','E'];
const FILES=['q11_optA.png','q11_optB.png','q11_optC.png','q11_optD.png','q11_optE.png'];
let focus=null;
function renderCards(){
  const box=document.getElementById('cards'); box.innerHTML='';
  LABELS.forEach((L,i)=>{
    const d=document.createElement('div');
    d.className='opt-img'+(focus===L?' picked':'');
    d.innerHTML=`<div style="font-weight:800;text-align:center">${L}</div><img src="assets/${FILES[i]}" style="width:100%;display:block;border-radius:6px"/>`;
    d.onclick=()=>{ focus=L; renderCards();
      document.getElementById('info').textContent=en()?`Looking at card ${L}. Does it fit Mike (no ducks)?`:`正在看卡片 ${L}。符合小明（没有鸭子）吗？`;
    };
    box.appendChild(d);
  });
}
renderCards();
"""
)

# Q12 grid
PLAY[12] = (
    f"""
    <h2 class="lang-zh">实验：看每行每列的和，找出异常交点</h2>
    <h2 class="lang-en">Lab: check row/column sums, find the odd intersection</h2>
    {fig("q12_figure.png", "fig fig-sm")}
    <p class="tip lang-zh">原卷表格如下。点「计算和」看哪一行/列与众不同。</p>
    <p class="tip lang-en">Tap Compute sums to see which row/column is different.</p>
    <div style="text-align:center"><div class="grid3" id="g"></div></div>
    <div class="sumbox" id="sums"></div>
    <div class="actions"><button class="btn ghost" onclick="showSums()"><span class="lang-zh">计算和</span><span class="lang-en">Compute sums</span></button></div>
    <div class="info" id="info"></div>
    """,
    """
const G=[[9,1,5],[3,7,6],[4,7,4]];
function renderG(){
  const box=document.getElementById('g'); box.innerHTML='';
  G.flat().forEach((v,i)=>{
    const d=document.createElement('div'); d.className='cell'; d.textContent=v; box.appendChild(d);
  });
}
function showSums(){
  const rows=G.map(r=>r.reduce((a,b)=>a+b,0));
  const cols=[0,1,2].map(c=>G[0][c]+G[1][c]+G[2][c]);
  document.getElementById('sums').innerHTML =
    (en()?`Rows: ${rows.join(', ')} · Cols: ${cols.join(', ')}`:`行和：${rows.join('、')} · 列和：${cols.join('、')}`);
  document.getElementById('info').textContent = en()
    ? 'Most sums are 15. Find the shared cell of the two 16s — change that number.'
    : '多数和是 15。找到两个「16」相交的那个数——改它。';
}
renderG();
"""
)

# Q13 carpet
PLAY[13] = (
    f"""
    <h2 class="lang-zh">实验：想象展开后每边两排圆点</h2>
    <h2 class="lang-en">Lab: unfold and count two rows of dots per side</h2>
    {fig("q13_figure.png", "fig fig-sm")}
    <p class="tip lang-zh">先估每边有几列圆点，再算整块地毯。可用计算器试选项。</p>
    <p class="tip lang-en">Estimate dots per side, then total. Try option values.</p>
    <div class="bar">
      <span class="lang-zh">每边点数（一排）</span><span class="lang-en">Dots per side (one row)</span>
      <input type="number" id="n" value="6" min="3" max="12" oninput="calc()"/>
    </div>
    <div class="info" id="info"></div>
    """,
    """
function calc(){
  const n=+document.getElementById('n').value||6;
  // two rows per side, corners shared: 4*n + 4*(n-2) wait
  // solution: 4*6 + 8 = 32, or 6*6-4=32
  const full=n*n;
  const missing=4; // two middle rows missing 4
  const tot1=4*n + 8; // from solution 1 with n=6
  const tot2=full-missing;
  document.getElementById('info').textContent = en()
    ? `If n=${n}: full square ${full}; one approach 4×${n}+8=${4*n+8}; or ${n}×${n}−4=${n*n-4}.`
    : `若每边 ${n} 个：整方 ${full}；一种算法 4×${n}+8=${4*n+8}；或 ${n}×${n}−4=${n*n-4}。`;
}
calc();
"""
)

# Q14 fold
PLAY[14] = (
    f"""
    <h2 class="lang-zh">实验：看折叠后打孔会穿过哪 4 层</h2>
    <h2 class="lang-en">Lab: after two folds, one punch hits 4 layers</h2>
    {fig("q14_figure.png")}
    <p class="tip lang-zh">折两次后打一个孔，展开会有 4 个洞。对照选项看是哪四个数。</p>
    <p class="tip lang-en">Two folds → one hole becomes four. Match which four numbers.</p>
    <div class="info" id="info"></div>
    <div class="actions"><button class="btn ghost" onclick="hint()"><span class="lang-zh">提示折叠方向</span><span class="lang-en">Fold tip</span></button></div>
    """,
    """
function hint(){
  document.getElementById('info').textContent = en()
    ? 'Fold as shown, then the punch goes through four stacked cells that become four holes when unfolded.'
    : '按图示折叠后，打孔穿过叠在一起的 4 格；展开就是 4 个洞。';
}
"""
)

# Q15 seats
PLAY[15] = (
    f"""
    <h2 class="lang-zh">实验：画出小罗周围的座位</h2>
    <h2 class="lang-en">Lab: draw the seats around Robert</h2>
    <p class="tip lang-zh">前面 2 排、后面 1 排 → 共 4 排；左边 3、自己、右边 5 → 每排 9 人。</p>
    <p class="tip lang-en">2 rows front + him + 1 back = 4 rows; 3 left + him + 5 right = 9 per row.</p>
    <div style="text-align:center" id="seat"></div>
    <div class="info" id="info"></div>
    <div class="actions"><button class="btn ghost" onclick="draw()"><span class="lang-zh">画出座位图</span><span class="lang-en">Draw seats</span></button></div>
    """,
    """
function draw(){
  const rows=4, cols=9, meR=2, meC=3; // 0-index: front 0,1 then Robert row 2, behind 3; left 0,1,2 then me at 3
  const box=document.getElementById('seat');
  const g=document.createElement('div'); g.className='seat'; g.style.gridTemplateColumns=`repeat(${cols},36px)`;
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const d=document.createElement('div'); d.className='s occ';
    if(r===meR&&c===meC){ d.className='s me'; d.textContent='R'; }
    g.appendChild(d);
  }
  box.innerHTML=''; box.appendChild(g);
  document.getElementById('info').textContent = en()
    ? `Rows=${rows}, seats/row=${cols}, total=${rows*cols}.`
    : `排数=${rows}，每排=${cols}，全班=${rows*cols}。`;
}
"""
)

# Q16 white blocks
PLAY[16] = (
    f"""
    <h2 class="lang-zh">实验：按层数白色小块，或用 27 减去灰色/黑色占的白块</h2>
    <h2 class="lang-en">Lab: count whites by layer, or 27 minus replaced whites</h2>
    {fig("q16_figure.png")}
    <p class="tip lang-zh">大立方体 3×3×3=27。灰块≈5 白，黑块≈3 白。图中 2 灰 + 2 黑。</p>
    <p class="tip lang-en">Big cube 27. Grey≈5 whites, black≈3. Picture uses 2 grey + 2 black.</p>
    <div class="bar">
      <span class="lang-zh">灰块数</span><span class="lang-en">Grey</span><input type="number" id="g" value="2" min="0" max="5" oninput="calc()"/>
      <span class="lang-zh">黑块数</span><span class="lang-en">Black</span><input type="number" id="b" value="2" min="0" max="5" oninput="calc()"/>
    </div>
    <div class="info" id="info"></div>
    """,
    """
function calc(){
  const g=+document.getElementById('g').value||0;
  const b=+document.getElementById('b').value||0;
  const white=27 - 5*g - 3*b;
  document.getElementById('info').textContent = en()
    ? `27 − 5×${g} − 3×${b} = ${white} white cubes.`
    : `27 − 5×${g} − 3×${b} = ${white} 个白色小木块。`;
}
calc();
"""
)

# Q18 football
PLAY[18] = (
    f"""
    <h2 class="lang-zh">实验：每队只打 2 场，可能的积分组合</h2>
    <h2 class="lang-en">Lab: each team plays 2 games — possible point totals</h2>
    <p class="tip lang-zh">每场可得 0 / 1 / 3 分。点选两场结果，看总分。哪些总分永远得不到？</p>
    <p class="tip lang-en">Each game: 0 / 1 / 3 points. Pick two results and see totals. Which total never appears?</p>
    <div class="bar">
      <select id="g1" onchange="upd()"><option value="0">0</option><option value="1">1</option><option value="3">3</option></select>
      <span>+</span>
      <select id="g2" onchange="upd()"><option value="0">0</option><option value="1">1</option><option value="3">3</option></select>
    </div>
    <div class="info" id="info"></div>
    <div id="all" style="text-align:center;margin-top:8px"></div>
    """,
    """
const possible=new Set();
function upd(){
  const a=+document.getElementById('g1').value, b=+document.getElementById('g2').value;
  possible.add(a+b);
  document.getElementById('info').textContent = en()?`This team gets ${a}+${b}=${a+b}.`:`这队得 ${a}+${b}=${a+b} 分。`;
  document.getElementById('all').innerHTML=[...possible].sort((x,y)=>x-y).map(x=>`<span class="chip">${x}</span>`).join('');
}
upd();
"""
)

# Q19 ant
PLAY[19] = (
    f"""
    <h2 class="lang-zh">实验：把路径拆成竖直段 + 水平段</h2>
    <h2 class="lang-en">Lab: split path into vertical + horizontal parts</h2>
    {fig("q19_figure.png", "fig fig-sm")}
    <div class="bar">
      <span class="lang-zh">竖直段数（每段10）</span><span class="lang-en">Vertical segments (×10)</span>
      <input type="number" id="v" value="6" min="0" max="10" oninput="calc()"/>
      <span class="lang-zh">水平总长（cm）</span><span class="lang-en">Horizontal total (cm)</span>
      <input type="number" id="h" value="30" min="0" max="100" step="5" oninput="calc()"/>
    </div>
    <div class="info" id="info"></div>
    """,
    """
function calc(){
  const v=+document.getElementById('v').value||0;
  const h=+document.getElementById('h').value||0;
  const tot=10*v+h;
  document.getElementById('info').textContent = en()
    ? `Length = 10×${v} + ${h} = ${tot} cm.`
    : `路程 = 10×${v} + ${h} = ${tot} cm。`;
}
calc();
"""
)

# Q20 road pieces
PLAY[20] = (
    f"""
    <h2 class="lang-zh">实验：想清楚 A 要连到谁、不能连到谁</h2>
    <h2 class="lang-en">Lab: decide who A must / must not connect to</h2>
    {fig("q20_figure.png")}
    <p class="tip lang-zh">需要：A↔B、A↔E；禁止：A↔D。可旋转拼片。先排除明显不行的。</p>
    <p class="tip lang-en">Need A–B and A–E; forbid A–D. Rotations OK. Eliminate pieces that fail.</p>
    <div class="info" id="info"></div>
    """,
    """
document.getElementById('info').textContent = en()
  ? 'Try each piece mentally: does A reach B & E but not D?'
  : '对每一片想一想：A 能否到 B、E，又到不了 D？';
"""
)

# Q21 laps
PLAY[21] = (
    f"""
    <h2 class="lang-zh">实验：正方形周长 vs 长方形周长，找最小公倍数圈数</h2>
    <h2 class="lang-en">Lab: square vs rectangle perimeter — LCM of laps</h2>
    {fig("q21_figure.jpeg", "fig fig-sm")}
    <p class="tip lang-zh">正方形周长 4×5=20；长方形 2×(5+10)=30。同速再在 A 相遇时路程相等。</p>
    <p class="tip lang-en">Square 20 m; rectangle 30 m. Same speed → equal distance when meeting at A.</p>
    <div class="bar">
      <span class="lang-zh">小安圈数</span><span class="lang-en">Ahmad laps</span>
      <input type="number" id="a" value="1" min="1" max="10" oninput="calc()"/>
    </div>
    <div class="info" id="info"></div>
    """,
    """
function calc(){
  const a=+document.getElementById('a').value||1;
  const dist=20*a;
  const z=dist/30;
  const ok=Number.isInteger(z);
  document.getElementById('info').textContent = en()
    ? `Ahmad walks ${dist} m = ${z} rect laps.`+(ok?' They meet!':' Not an integer — Zhaleh not at A.')
    : `小安走了 ${dist} m = ${z} 圈长方形。`+(ok?' 正好相遇！':' 不是整数圈——小哲不在 A。');
}
calc();
"""
)

# Q22 plums
PLAY[22] = (
    f"""
    <h2 class="lang-zh">实验：设 Sophie = n，推出每个人</h2>
    <h2 class="lang-en">Lab: let Sophie = n, deduce everyone</h2>
    <div class="bar">
      <span>Sophie</span>
      <input type="range" id="n" min="1" max="12" value="4" oninput="calc()"/>
      <b id="nv">4</b>
    </div>
    <div class="info" id="info" style="line-height:1.8"></div>
    """,
    """
function calc(){
  const s=+document.getElementById('n').value; document.getElementById('nv').textContent=s;
  const L=s+2, B=L-3, C=B+1, A=C+3;
  const pairs=[['C','L',C,L],['C','S',C,s],['L','A',L,A],['S','A',s,A],['A','B',A,B]];
  const same=pairs.filter(p=>p[2]===p[3]).map(p=>p[0]+'='+p[1]).join(', ')||'(none)';
  document.getElementById('info').innerHTML = en()
    ? `S=${s}, L=${L}, B=${B}, C=${C}, A=${A}<br>Equal pairs: ${same}`
    : `S=${s}, L=${L}, B=${B}, C=${C}, A=${A}<br>相同的一对：${same}`;
}
calc();
"""
)

# Q23 caterpillar (HTML rebuilt in write_page)
PLAY[23] = (
    "",
    """
function pick(L){ setAns(L); document.getElementById('info').textContent=en()?`Considering option ${L}.`:`正在考虑选项 ${L}。`; }
"""
)

# Q24 color numbers
PLAY[24] = (
    f"""
    <h2 class="lang-zh">实验：设灰=g、白=w、黑=b，用行和列方程</h2>
    <h2 class="lang-en">Lab: let grey=g, white=w, black=b; use row equations</h2>
    {fig("q24_figure.png", "fig fig-sm")}
    <p class="tip lang-zh">同色同数。先由两行推出 g+w，再代入含黑色的那一行。</p>
    <p class="tip lang-en">Same colour = same number. Find g+w first, then the black row.</p>
    <div class="bar">
      <span>g</span><input type="number" id="g" value="8" oninput="calc()"/>
      <span>w</span><input type="number" id="w" value="12" oninput="calc()"/>
      <span>b</span><input type="number" id="b" value="12" oninput="calc()"/>
    </div>
    <div class="info" id="info"></div>
    """,
    """
function calc(){
  const g=+document.getElementById('g').value, w=+document.getElementById('w').value, b=+document.getElementById('b').value;
  // typical rows from solution: g+2w=34, w+2g=26 => g+w=20, then middle row with black =32 => b=12
  document.getElementById('info').textContent = en()
    ? `Try: g+2w=${g+2*w}, w+2g=${w+2*g}, g+w=${g+w}. If a row is g+w+b, that equals ${g+w+b}.`
    : `试算：g+2w=${g+2*w}，w+2g=${w+2*g}，g+w=${g+w}。若一行是 g+w+b，则和为 ${g+w+b}。`;
}
calc();
"""
)


def write_page(n):
    title_zh, title_en, q_zh, q_en, cz, ce = META[n]
    play_html, play_js = PLAY[n]
    # fix Q23 play_html which used f-string wrongly inside dict - rebuild
    if n == 23:
        imgs = "".join(
            f'<div class="opt-img" onclick="pick(\'{L}\')"><div style="font-weight:800;text-align:center">{L}</div>'
            f'<img src="assets/q23_opt{L}.png" style="width:100%;border-radius:6px"/></div>'
            for L in "ABCDE"
        )
        play_html = f"""
    <h2 class="lang-zh">实验：黄黑相间，能否从头部走出一条路</h2>
    <h2 class="lang-en">Lab: yellow-black alternate path from the head</h2>
    <p class="tip lang-zh">毛毛虫颜色交替。蜷起来后仍应能走出黄-黑-黄-黑……</p>
    <p class="tip lang-en">Colors alternate. The curled shape must still allow a yellow–black path.</p>
    <div class="opts-row">{imgs}</div>
    <div class="info" id="info"></div>
    """
    fig_map = {
        10: "",
        11: "",  # figure inside play
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        18: "",
        19: "",
        20: "",
        21: "",
        22: "",
        23: "",
        24: "",
    }
    html = shell(n, title_zh, title_en, q_zh, q_en, cz, ce, fig_map[n], play_html, play_js, ANSWERS[n])
    path = os.path.join(ROOT, f"{n}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", path)


for n in list(range(10, 17)) + list(range(18, 25)):
    write_page(n)

# index
links = []
for n in range(10, 25):
    title = META.get(n, ("形状拼图",))[0] if n != 17 else "形状拼图（小达）"
    if n == 17:
        title = "形状拼图（已有互动）"
    links.append(f'<a href="{n}.html">第 {n} 题 · {title}</a>')

index = f"""<!DOCTYPE html>
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
  <p class="note">从第 10 题起的互动教学页。第 17 题沿用已做好的「小达形状拼图」。学生页不公布答案讲解，教师见 <code>10-24-答案.md</code>。</p>
  {''.join(links)}
</div>
</body>
</html>
"""
with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
    f.write(index)

# answers md
ans_md = """# 2022 等级 B · 第 10–24 题答案（教师用）

> 学生页不含答案讲解。第 17 题互动页已有，未重做。

| 题 | 答案 | 要点 |
|---|---|---|
| 10 | **C**（5 和 8） | 总和 35，其余两只和 13 |
| 11 | **A** | 线索排除后小明只能是 A |
| 12 | **B**（改 3） | 多数和为 15；行2与列1为 16，交点 3 应改为 2 |
| 13 | **E**（32） | 6×6−4 或 4×6+8 |
| 14 | **B**（14,17,20,23） | 折两次打孔穿过四层 |
| 15 | **E**（36） | 4 排 × 9 人 |
| 16 | **B**（11） | 27−10−6=11 或分层 2+6+3 |
| 17 | **B**（3） | 两圆 + 大红方块 |
| 18 | **D**（5） | 两场只能得 0,1,2,4,6，不能 5 |
| 19 | **E**（90 cm） | 竖直 60 + 水平 30 |
| 20 | **E**（1 和 5） | 仅这两片可满足连通条件 |
| 21 | **C**（3） | 20 与 30 的最小公倍数路程对应 3 圈 |
| 22 | **B**（C 和 S） | Claire = Sophie |
| 23 | **A** | 唯有 A 可黄黑交替贯通 |
| 24 | **D**（12） | g+w=20，黑 = 32−20=12 |
"""
with open(os.path.join(ROOT, "10-24-答案.md"), "w", encoding="utf-8") as f:
    f.write(ans_md)

print("all done")
