# -*- coding: utf-8 -*-
"""Generate bilingual interactive HTML for all 2019 Level B questions."""
import json
import os
import html as htmlmod

ROOT = os.path.dirname(os.path.abspath(__file__))
QS = json.load(open(os.path.join(ROOT, "questions.json"), encoding="utf-8"))

CSS = r"""
:root{--bg:#f0f9ff;--card:#fff;--ink:#0c4a6e;--accent:#0284c7;--ok:#16a34a;--muted:#64748b}
*{box-sizing:border-box}
body{font-family:'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;margin:0;min-height:100vh;background:radial-gradient(circle at top,#e0f2fe,var(--bg));color:#0f172a;padding:20px 14px 40px}
.topbar{display:flex;justify-content:space-between;align-items:center;max-width:820px;margin:0 auto 14px;gap:10px;flex-wrap:wrap}
.brand{font-weight:800;color:var(--ink);font-size:14px}
.lang-btn{border:2px solid #7dd3fc;background:#fff;border-radius:999px;padding:8px 16px;font-weight:800;cursor:pointer;color:var(--ink)}
.lang-btn:hover{background:#e0f2fe}
.wrap{max-width:820px;margin:0 auto;background:var(--card);border-radius:22px;box-shadow:0 12px 28px rgba(2,132,199,.12);padding:22px}
h1{margin:0 0 8px;color:var(--ink);font-size:24px}
.meta{color:var(--muted);font-size:13px;margin-bottom:14px}
.qbox{background:#f8fafc;border:2px dashed #cbd5e1;border-radius:14px;padding:14px;line-height:1.65;margin-bottom:12px}
.figwrap{margin:10px 0 14px;text-align:center}
.fig{display:block;width:100%;max-width:720px;margin:8px auto;border-radius:12px;background:#fff;border:1px solid #e2e8f0}
.hint{margin-top:12px;font-size:13px;color:var(--muted);line-height:1.6}
.options{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.opt{min-width:64px;padding:10px 14px;border:2px solid #e2e8f0;border-radius:12px;background:#fff;font-weight:800;cursor:pointer;text-align:center}
.opt.correct{background:#dcfce7;border-color:#16a34a;color:#166534}
.opt.wrong{background:#fee2e2;border-color:#ef4444;color:#991b1b}
.msg{min-height:22px;margin-top:10px;font-weight:700;color:var(--ink)}
.msg.good{color:var(--ok)}
.nav{display:flex;justify-content:space-between;margin-top:18px;font-size:14px}
.nav a{color:var(--accent);font-weight:700;text-decoration:none}
.list a{display:block;padding:12px 14px;margin:8px 0;border-radius:12px;background:#f0f9ff;border:2px solid #bae6fd;color:#0c4a6e;text-decoration:none;font-weight:700}
.list a:hover{background:#e0f2fe}
.sec{margin:18px 0 6px;font-weight:800;color:#0369a1}
"""

JS = r"""
let lang = localStorage.getItem('mk_lang') || 'zh';
function applyLang(){
  document.querySelectorAll('[data-zh]').forEach(el=>{
    el.textContent = lang==='zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
  });
  document.querySelectorAll('[data-zh-html]').forEach(el=>{
    el.innerHTML = lang==='zh' ? el.getAttribute('data-zh-html') : el.getAttribute('data-en-html');
  });
  const b=document.getElementById('langBtn');
  if(b) b.textContent = lang==='zh' ? 'EN / 中文' : '中文 / EN';
  localStorage.setItem('mk_lang', lang);
}
function toggleLang(){ lang = lang==='zh'?'en':'zh'; applyLang(); }
function markAnswer(btn, correctLetter){
  const letter=btn.dataset.ans;
  document.querySelectorAll('.opt').forEach(o=>{
    o.classList.remove('correct','wrong');
    if(o.dataset.ans===correctLetter) o.classList.add('correct');
    if(o.dataset.ans===letter && letter!==correctLetter) o.classList.add('wrong');
  });
  const msg=document.getElementById('msg');
  if(!msg) return;
  if(letter===correctLetter){
    msg.className='msg good';
    msg.setAttribute('data-zh','答对了！');
    msg.setAttribute('data-en','Correct!');
  }else{
    msg.className='msg';
    msg.setAttribute('data-zh','再想想～正确答案已标绿。');
    msg.setAttribute('data-en','Try again — correct option is highlighted.');
  }
  applyLang();
}
document.addEventListener('DOMContentLoaded', applyLang);
"""


def esc(s):
    return htmlmod.escape(s or "", quote=True)


def page_html(n, q):
    ans = q["ans"]
    pts = q["points"]
    letters = "ABCDE"
    opts = q.get("opts") or list(letters)
    while len(opts) < 5:
        opts.append(letters[len(opts)])

    opt_html = ['<div class="options">']
    for i, lab in enumerate(opts[:5]):
        L = letters[i]
        # lab may be bilingual "星期二 Tuesday" — show via data attrs if contains /
        if " / " in lab:
            zh, en = lab.split(" / ", 1)
            opt_html.append(
                f'<div class="opt" data-ans="{L}" data-zh="{esc(zh)}" data-en="{esc(en)}" onclick="markAnswer(this,\'{ans}\')"></div>'
            )
        else:
            opt_html.append(
                f'<div class="opt" data-ans="{L}" onclick="markAnswer(this,\'{ans}\')">{esc(lab)}</div>'
            )
    opt_html.append("</div>")

    fig = ""
    fig_path = os.path.join(ROOT, "assets", f"q{n}_figure.png")
    if os.path.exists(fig_path):
        fig = f'<div class="figwrap"><img class="fig" src="assets/q{n}_figure.png" alt="Q{n} figure"/></div>'
    # Q4 second figure
    if n == 4 and os.path.exists(os.path.join(ROOT, "assets", "q4_figure_b.png")):
        fig = (
            '<div class="figwrap">'
            '<img class="fig" src="assets/q4_figure.png" alt="Q4"/>'
            '<img class="fig" src="assets/q4_figure_b.png" alt="Q4 continued"/>'
            "</div>"
        )

    prev_link = f"{n-1}.html" if n > 1 else "index.html"
    next_link = f"{n+1}.html" if n < 24 else "index.html"
    prev_zh = "上一题" if n > 1 else "目录"
    next_zh = "下一题" if n < 24 else "目录"
    prev_en = "Prev" if n > 1 else "Index"
    next_en = "Next" if n < 24 else "Index"

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2019 B · Q{n}</title>
<style>{CSS}</style>
</head>
<body>
<div class="topbar">
  <div class="brand">Math Kangaroo 2019 · Level B (Ecolier)</div>
  <button class="lang-btn" id="langBtn" onclick="toggleLang()">EN / 中文</button>
</div>
<div class="wrap">
  <h1 data-zh="{esc(q['title_zh'])}" data-en="{esc(q['title_en'])}"></h1>
  <div class="meta" data-zh="第 {n} 题 · {pts} 分 · 答案 {ans}" data-en="Question {n} · {pts} points · Answer {ans}"></div>
  <div class="qbox" data-zh-html="{esc(q['zh'])}" data-en-html="{esc(q['en'])}"></div>
  {fig}
  {''.join(opt_html)}
  <div class="msg" id="msg" data-zh="先自己想一想，再点选项。" data-en="Think first, then tap an option."></div>
  <p class="hint" data-zh="提示：{esc(q.get('hint_zh',''))}" data-en="Hint: {esc(q.get('hint_en',''))}"></p>
  <div class="nav">
    <a href="{prev_link}" data-zh="← {prev_zh}" data-en="← {prev_en}"></a>
    <a href="{next_link}" data-zh="{next_zh} →" data-en="{next_en} →"></a>
  </div>
</div>
<script>{JS}</script>
</body>
</html>
"""


# Hide answer from meta until answered? User might want teaching mode with answer visible in meta - for kids maybe hide.
# Change meta to not show answer letter until they pick - better UX for practice
def page_html_practice(n, q):
    h = page_html(n, q)
    h = h.replace(
        f' data-zh="第 {n} 题 · {q["points"]} 分 · 答案 {q["ans"]}" data-en="Question {n} · {q["points"]} points · Answer {q["ans"]}"',
        f' data-zh="第 {n} 题 · {q["points"]} 分" data-en="Question {n} · {q["points"]} points"',
    )
    return h


for n in range(1, 25):
    q = QS[str(n)]
    path = os.path.join(ROOT, f"{n}.html")
    open(path, "w", encoding="utf-8").write(page_html_practice(n, q))
    print("wrote", n)

# index
items = []
for n in range(1, 25):
    q = QS[str(n)]
    items.append(
        f'<a href="{n}.html" data-zh="{n} · {esc(q["title_zh"])}（{q["points"]}分）" data-en="{n} · {esc(q["title_en"])} ({q["points"]} pts)"></a>'
    )

index = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>2019 Level B · All Questions</title>
<style>{CSS}</style>
</head>
<body>
<div class="topbar">
  <div class="brand">Math Kangaroo 2019 · Level B (Ecolier 3–4)</div>
  <button class="lang-btn" id="langBtn" onclick="toggleLang()">EN / 中文</button>
</div>
<div class="wrap">
  <h1 data-zh="2019 等级 B 全部题目" data-en="2019 Level B — All Questions"></h1>
  <p class="meta" data-zh="共 24 题 · 右上角可切换中文 / English · 答案见卷末：ECADA ADBBC CEBAD DECBE BEBD"
     data-en="24 questions · Toggle Chinese / English · Key: ECADA ADBBC CEBAD DECBE BEBD"></p>
  <div class="sec" data-zh="第一部分 · 每题 3 分（1–8）" data-en="Part 1 · 3 points (1–8)"></div>
  <div class="list">{''.join(items[:8])}</div>
  <div class="sec" data-zh="第二部分 · 每题 4 分（9–16）" data-en="Part 2 · 4 points (9–16)"></div>
  <div class="list">{''.join(items[8:16])}</div>
  <div class="sec" data-zh="第三部分 · 每题 5 分（17–24）" data-en="Part 3 · 5 points (17–24)"></div>
  <div class="list">{''.join(items[16:])}</div>
</div>
<script>{JS}</script>
</body>
</html>
"""
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(index)
print("wrote index.html")
print("assets", sorted(os.listdir(os.path.join(ROOT, "assets"))))
