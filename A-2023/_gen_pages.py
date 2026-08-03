# -*- coding: utf-8 -*-
"""Generate A-2023 Q14-23 HTML pages, index, and teacher answers."""
import os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(ROOT, 'assets')

# Copy useful option assets
copies = {
    'p8_img1.jpeg': 'q18_cakeA.jpeg',
    'p8_img2.jpeg': 'q18_cakeB.jpeg',
    'p8_img3.jpeg': 'q18_cakeC.jpeg',
    'p8_img4.jpeg': 'q18_cakeD.jpeg',
    'p8_img5.jpeg': 'q18_cakeE.jpeg',
    'p9_img2.jpeg': 'q20_optA.jpeg',
    'p9_img3.jpeg': 'q20_optB.jpeg',
    'p9_img4.jpeg': 'q20_optC.jpeg',
    'p9_img5.jpeg': 'q20_optD.jpeg',
    'p9_img6.jpeg': 'q20_optE.jpeg',
}
for src, dst in copies.items():
    s, d = os.path.join(ASSETS, src), os.path.join(ASSETS, dst)
    if os.path.isfile(s) and not os.path.isfile(d):
        shutil.copy2(s, d)

BASE_CSS = """
:root{--primary:#4a90e2;--success:#2ec4b6;--danger:#e71d36;--bg:#f8f9fa;--dark:#2c3e50}
*{box-sizing:border-box}
body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:#333;margin:0;padding:20px;display:flex;flex-direction:column;align-items:center}
.lang-toggle-btn{position:fixed;top:20px;right:20px;background:var(--dark);color:#fff;border:none;padding:10px 18px;border-radius:20px;cursor:pointer;font-weight:bold;z-index:1000}
h1{text-align:center;color:var(--primary);margin:8px 0;font-size:22px}
.meta{color:#64748b;font-size:14px;margin-bottom:14px}
.wrap{max-width:920px;width:100%}
.section{background:#fff;padding:20px;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,.05);margin-bottom:16px}
h2{color:var(--primary);border-left:5px solid var(--primary);padding-left:10px;margin:0 0 10px;font-size:18px}
.fig{display:block;width:100%;max-width:720px;margin:8px auto;border-radius:10px;border:1px solid #e2e8f0}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0;line-height:1.5}
.actions{text-align:center;margin-top:12px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px;font-size:14px}
.submit{background:var(--success);color:#fff}.reset{background:#6c757d;color:#fff}.primary{background:var(--primary);color:#fff}.ghost{background:#e2e8f0;color:#334155}
.pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0}
.card{min-width:56px;padding:10px 14px;border-radius:12px;background:var(--primary);color:#fff;font-weight:800;cursor:pointer;text-align:center;user-select:none}
.card.on{outline:3px solid #f59e0b}
.answer-box{min-width:100px;min-height:56px;border:3px dashed var(--primary);border-radius:14px;margin:10px auto;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;background:#fafbfc;padding:8px}
.answer-box.filled{border-style:solid;background:#e8f5e9}
#feedback{text-align:center;font-weight:800;margin-top:12px;min-height:28px}
.ok{color:var(--success)}.bad{color:var(--danger)}
.nav{display:flex;justify-content:space-between;margin-top:8px;width:100%;max-width:920px}
.nav a{color:var(--primary);font-weight:700;text-decoration:none}
.lang-zh{display:block}.lang-en{display:none}
body.en-mode .lang-zh{display:none}body.en-mode .lang-en{display:block}
.info{text-align:center;font-weight:700;min-height:24px;margin:8px 0;color:#0f172a}
.opts-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:12px 0}
.opt-img{width:100px;border:3px solid #e2e8f0;border-radius:10px;cursor:pointer;padding:4px;background:#fff}
.opt-img.on{border-color:#f59e0b}
.opt-img img{width:100%;display:block;border-radius:6px}
.opt-lab{text-align:center;font-weight:800;font-size:12px;color:#64748b;margin-top:4px}
.stat{display:inline-block;background:#f0f9ff;border:2px solid #bae6fd;border-radius:12px;padding:8px 16px;font-weight:800;margin:4px}
"""

def shell(title_zh, title_en, qnum, points, prev_href, next_href, problem_zh, problem_en, fig, lab_title_zh, lab_title_en, lab_body, script, extra_css=''):
    fig_html = f'<img class="fig" src="{fig}" alt="Q{qnum}"/>' if fig else ''
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2023 A · Q{qnum} · {title_zh}</title>
<style>{BASE_CSS}{extra_css}</style>
</head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 English / 中文</button>
<h1 class="lang-zh">{title_zh}</h1>
<h1 class="lang-en">{title_en}</h1>
<div class="meta lang-zh">2023 等级 A · 第 {qnum} 题 · {points} 分</div>
<div class="meta lang-en">2023 Level A · Q{qnum} · {points} points</div>
<div class="wrap">
  <div class="section">
    <h2 class="lang-zh">题目</h2>
    <h2 class="lang-en">Problem</h2>
    {problem_zh}
    {problem_en}
    {fig_html}
  </div>
  <div class="section">
    <h2 class="lang-zh">{lab_title_zh}</h2>
    <h2 class="lang-en">{lab_title_en}</h2>
    {lab_body}
    <div class="actions">
      <button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
      <button class="btn reset" onclick="resetLab()"><span class="lang-zh">重置实验</span><span class="lang-en">Reset</span></button>
      <div id="feedback"></div>
    </div>
  </div>
</div>
<div class="nav">
  <a href="{prev_href}"><span class="lang-zh">← 上一题</span><span class="lang-en">← Prev</span></a>
  <a href="{next_href}"><span class="lang-zh">下一题 →</span><span class="lang-en">Next →</span></a>
</div>
<script>
function en(){{return document.body.classList.contains('en-mode');}}
{script}
</script>
</body>
</html>'''

# ---------- Q14 ----------
Q14 = shell(
    '对折打孔', 'Fold and Punch',
    14, 4, 'index.html', '15.html',
    '<p class="lang-zh">将一张纸对折后，打上方形孔和圆形孔。展开后这张纸是什么样子的？</p>',
    '<p class="lang-en">A sheet is folded in half. Square and round holes are punched. How does it look unfolded?</p>',
    'assets/q14_figure.png',
    '实验：对折 → 点孔位置 → 展开对比', 'Lab: fold → tap holes → unfold & compare',
    '''
    <p class="tip lang-zh">① 点「对折」→ ② 在折好的半张纸上点一下放<b>圆孔</b>、再点一下放<b>方孔</b>（和题目图一样：圆在左上、方在右下靠折痕）→ ③ 先猜右半会出现什么，点格子标记 → ④「展开」看你的预测。</p>
    <p class="tip lang-en">① Fold → ② Tap once for <b>circle</b>, once for <b>square</b> (like the picture: circle top-left, square bottom-right on fold) → ③ Predict the other half → ④ Unfold.</p>
    <div class="actions">
      <button class="btn primary" onclick="doFold()"><span class="lang-zh">对折</span><span class="lang-en">Fold</span></button>
      <button class="btn ghost" onclick="doUnfold()"><span class="lang-zh">展开</span><span class="lang-en">Unfold</span></button>
    </div>
    <div id="paperStage" style="display:flex;justify-content:center;margin:16px 0"></div>
    <div class="info" id="info"></div>
    <p class="tip lang-zh">对照展开结果，选 A–E</p>
    <p class="tip lang-en">Compare unfolded paper, pick A–E</p>
    <div class="pool" id="pool"></div>
    <div class="answer-box" id="ansBox"></div>
    ''',
    '''
const CORRECT='B';
let folded=false,unfolded=false,phase=0,holeType='circle',marks=new Set(),choice=null;
const foldedHoles={circle:[0.22,0.22],square:[0.78,0.78]};
function renderPaper(){
  const s=document.getElementById('paperStage');
  const w=280,h=280;
  let html=`<svg width="${w}" height="${h}" viewBox="0 0 100 100" style="border:2px solid #cbd5e1;border-radius:8px;background:#fff">`;
  if(!folded){
    html+=`<line x1="50" y1="2" x2="50" y2="98" stroke="#94a3b8" stroke-dasharray="4 3"/>`;
    if(unfolded){
      [['circle',0.22,0.22],['circle',0.78,0.22],['square',0.22,0.78],['square',0.78,0.78]].forEach(([t,x,y])=>{
        if(t==='circle') html+=`<circle cx="${x*100}" cy="${y*100}" r="5" fill="#111"/>`;
        else html+=`<rect x="${x*100-5}" y="${y*100-5}" width="10" height="10" fill="#111"/>`;
      });
    } else {
      marks.forEach(k=>{const [side,t]=k.split(':');const [x,y]=t==='circle'?[side==='L'?22:78,22]:[side==='L'?22:78,78];
        if(t==='circle') html+=`<circle cx="${x}" cy="${y}" r="5" fill="#0369a1" opacity=".7"/>`;
        else html+=`<rect x="${x-5}" y="${y-5}" width="10" height="10" fill="#0369a1" opacity=".7"/>`;
      });
    }
  } else {
    html+=`<rect x="50" y="2" width="48" height="96" fill="#f8fafc" stroke="#64748b"/>`;
    html+=`<line x1="50" y1="2" x2="50" y2="98" stroke="#64748b" stroke-dasharray="4 3"/>`;
    if(phase>=1) html+=`<circle cx="61" cy="24" r="5" fill="#111"/>`;
    if(phase>=2) html+=`<rect x="86" y="73" width="10" height="10" fill="#111"/>`;
  }
  html+='</svg>';
  s.innerHTML=html;
  updateInfo();
}
function doFold(){folded=true;unfolded=false;phase=0;marks.clear();renderPaper();}
function doUnfold(){
  if(!folded||phase<2){document.getElementById('info').textContent=en()?'Punch both holes on the folded half first.':'请先在折好的半张上打好两个孔。';return;}
  folded=false;unfolded=true;renderPaper();
}
document.getElementById('paperStage').onclick=e=>{
  if(!folded||phase>=2) return;
  phase++; renderPaper();
};
function updateInfo(){
  const el=document.getElementById('info');
  if(unfolded) el.textContent=en()?'Unfolded! Square holes are closer than round holes. Pick A–E.':'展开了！注意方孔比圆孔更靠近。选 A–E。';
  else if(folded&&phase===0) el.textContent=en()?'Tap the folded half: first circle (top-left), then square (bottom-right on fold).':'点折好的半张：先圆孔（左上），再方孔（右下靠折痕）。';
  else if(folded&&phase===1) el.textContent=en()?'Good — now tap for the square hole.':'圆孔好了——再点一下放方孔。';
  else if(folded&&phase===2) el.textContent=en()?'Both holes punched. Tap Unfold!':'两个孔都好了，点「展开」！';
  else el.textContent=en()?'Tap Fold to start.':'点「对折」开始。';
}
['A','B','C','D','E'].forEach(L=>{
  const d=document.createElement('div');d.className='card';d.textContent=L;
  d.onclick=()=>{choice=L;document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));d.classList.add('on');
    document.getElementById('ansBox').className='answer-box filled';document.getElementById('ansBox').textContent=L;
    document.getElementById('feedback').textContent='';};
  document.getElementById('pool').appendChild(d);
});
function checkAnswer(){
  const fb=document.getElementById('feedback');
  if(!choice){fb.className='bad';fb.textContent=en()?'❌ Pick A–E.':'❌ 请选择 A–E。';return;}
  fb.className=choice===CORRECT?'ok':'bad';
  fb.textContent=choice===CORRECT?(en()?'✅ Correct!':'✅ 答对了！'):(en()?'❌ Not yet — unfold and compare hole spacing.':'❌ 还不对——展开后仔细比一比孔的位置。');
}
function resetLab(){folded=false;unfolded=false;phase=0;choice=null;marks.clear();
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
  document.getElementById('ansBox').className='answer-box';document.getElementById('ansBox').textContent='';
  document.getElementById('feedback').textContent='';renderPaper();}
renderPaper();
''',
    '''
.paper-half{cursor:pointer}
'''
)

# Write all files - continuing in same script
pages = {'14.html': Q14}

# Q15
pages['15.html'] = shell(
    '立方体涂胶', 'Cube Glue Drops',
    15, 4, '14.html', '16.html',
    '<p class="lang-zh">一个学生用 12 个立方体搭成图中的形状。每两个共面的立方体之间涂一滴胶水。一共用了多少滴胶水？</p>',
    '<p class="lang-en">A student built the shape with 12 cubes. One glue drop between each pair of face-sharing cubes. How many drops?</p>',
    'assets/q15_figure.png',
    '实验：点共享面，数胶水滴', 'Lab: tap shared faces & count glue',
    '''
    <p class="tip lang-zh">点两个<strong>相邻且共面</strong>的立方体，就会在该接触面记一滴胶。自己数一数，再选答案。</p>
    <p class="tip lang-en">Tap two <strong>neighbouring face-sharing</strong> cubes to mark one glue drop. Count and pick.</p>
    <div id="cubeLab" style="display:flex;justify-content:center;margin:12px 0"></div>
    <div class="stat" id="glueCount">0</div>
    <p class="tip lang-zh">我的答案</p><p class="tip lang-en">My answer</p>
    <div class="pool" id="pool"></div>
    <div class="answer-box" id="ansBox"></div>
    ''',
    '''
const CORRECT=11;
const CUBES=[
  {id:0,x:1,y:2,z:0},{id:1,x:2,y:2,z:0},{id:2,x:3,y:2,z:0},{id:3,x:4,y:2,z:0},
  {id:4,x:1,y:1,z:0},{id:5,x:2,y:1,z:0},{id:6,x:3,y:1,z:0},
  {id:7,x:2,y:0,z:0},{id:8,x:3,y:0,z:0},
  {id:9,x:2,y:1,z:1},{id:10,x:3,y:1,z:1},{id:11,x:3,y:0,z:1}
];
const EDGES=new Set();
CUBES.forEach((a,i)=>CUBES.forEach((b,j)=>{
  if(i>=j) return;
  if(Math.abs(a.x-b.x)+Math.abs(a.y-b.y)+Math.abs(a.z-b.z)===1) EDGES.add([Math.min(i,j),Math.max(i,j)].join('-'));
}));
let picked=null,marked=new Set(),choice=null;
function renderCubes(){
  const box=document.getElementById('cubeLab');
  const svg=[];
  const proj=(c)=>[120+(c.x-c.y)*28,140-(c.x+c.y)*14+c.z*32];
  CUBES.forEach(c=>{
    const [px,py]=proj(c);
    const sel=picked===c.id;
    svg.push(`<g class="cube" data-id="${c.id}" style="cursor:pointer"><polygon points="${px},${py} ${px+24},${py-12} ${px+24},${py+20} ${px},${py+32}" fill="${sel?'#7dd3fc':'#94a3b8'}" stroke="#334155"/><polygon points="${px},${py} ${px+24},${py-12} ${px+36},${py} ${px+12},${py+12}" fill="${sel?'#38bdf8':'#64748b'}" stroke="#334155"/><polygon points="${px+24},${py-12} ${px+36},${py} ${px+36},${py+32} ${px+24},${py+20}" fill="${sel?'#0ea5e9':'#475569'}" stroke="#334155"/><text x="${px+14}" y="${py+18}" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">${c.id+1}</text></g>`);
  });
  box.innerHTML=`<svg width="320" height="220" viewBox="0 0 320 220">${svg.join('')}</svg>`;
  box.querySelectorAll('.cube').forEach(g=>g.onclick=()=>tapCube(+g.dataset.id));
  document.getElementById('glueCount').textContent=(en()?'Glue drops marked: ':'已标记胶水：')+marked.size;
}
function tapCube(id){
  if(picked===null){picked=id;renderCubes();return;}
  if(picked===id){picked=null;renderCubes();return;}
  const key=[Math.min(picked,id),Math.max(picked,id)].join('-');
  if(!EDGES.has(key)){document.getElementById('feedback').className='bad';
    document.getElementById('feedback').textContent=en()?'❌ Those cubes do not share a face.':'❌ 这两个立方体没有共面。';picked=null;renderCubes();return;}
  if(marked.has(key)) marked.delete(key); else marked.add(key);
  picked=null; renderCubes();
  document.getElementById('feedback').textContent='';
}
[8,9,10,11,12].forEach(n=>{
  const d=document.createElement('div');d.className='card';d.textContent=n;
  d.onclick=()=>{choice=n;document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));d.classList.add('on');
    document.getElementById('ansBox').className='answer-box filled';document.getElementById('ansBox').textContent=n;
    document.getElementById('feedback').textContent='';};
  document.getElementById('pool').appendChild(d);
});
function checkAnswer(){
  const fb=document.getElementById('feedback');
  if(choice==null){fb.className='bad';fb.textContent=en()?'❌ Pick a number.':'❌ 请选答案。';return;}
  fb.className=choice===CORRECT?'ok':'bad';
  fb.textContent=choice===CORRECT?(en()?'✅ Correct count!':'✅ 滴数对了！'):(en()?'❌ Not yet — mark every shared face.':'❌ 还不对——把每个共面都点一遍再数。');
}
function resetLab(){picked=null;marked.clear();choice=null;document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));
  document.getElementById('ansBox').className='answer-box';document.getElementById('ansBox').textContent='';
  document.getElementById('feedback').textContent='';renderCubes();}
renderCubes();
'''
)

print('Generated', len(pages), 'pages so far')
