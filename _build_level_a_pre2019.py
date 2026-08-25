# -*- coding: utf-8 -*-
"""Batch-build Level A (Pre-Ecolier / grades 1–2) packages for 2013–2018.

Source PDFs: 力迈 …/等级A/
Output: 袋鼠数学教学动画/A-YYYY/
"""
from __future__ import annotations

import base64
import io
import json
import re
from pathlib import Path

import fitz
import numpy as np
from PIL import Image

SRC = Path(r"D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级A")
OUT_ROOT = Path(r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画")
YEARS = [2013, 2014, 2015, 2016, 2017, 2018]
LETTERS = "ABCDE"

ANSWERS: dict[int, dict[int, str]] = {
    2013: {i: a for i, a in enumerate("DBADBECECADBDECACCBDDA", 1)},
    2014: {i: a for i, a in enumerate("BADBCDDBACDECDBDDEDA", 1)},
    2016: {i: a for i, a in enumerate("DBDECCADCECBBAEDDEAB", 1)},
    2018: {i: a for i, a in enumerate("EDDDDBBECADACCBADCBEE", 1)},
}
ANSWERS[2015] = {
    1: "D", 2: "C", 3: "B", 4: "C", 5: "B", 6: "E", 7: "B", 8: "E", 9: "C", 10: "B",
    11: "C", 12: "C", 13: "A", 14: "E", 15: "D", 16: "E", 17: "D", 18: "D", 19: "D", 20: "C",
    21: "C", 22: "A", 23: "A", 24: "D",
}
ANSWERS[2017] = {
    1: "D", 2: "C", 3: "B", 4: "A", 5: "A", 6: "A", 7: "E", 8: "C", 9: "D", 10: "A",
    11: "E", 12: "D", 13: "A", 14: "B", 15: "C", 16: "E", 17: "E", 18: "D", 19: "C", 20: "E",
}

N_Q = {y: (24 if y == 2015 else 20) for y in YEARS}


def points(n: int, total: int) -> int:
    if total == 24:
        return 3 if n <= 8 else 4 if n <= 16 else 5
    return 3 if n <= 10 else 4


def pdf_path(year: int) -> Path:
    return sorted(SRC.glob(f"{year}*.pdf"))[0]


def extract_embedded_answers(text: str) -> dict[int, str] | None:
    m = re.findall(r"答案[:：]\s*([A-E\s]+)", text)
    if not m:
        return None
    letters = re.findall(r"[A-E]", m[-1])
    if len(letters) < 20:
        return None
    return {i + 1: letters[i] for i in range(len(letters))}


def clean_en(line: str) -> str:
    line = re.sub(r"^#\s*\d+\.\s*", "", line)
    line = re.sub(r"^\d+\.\s*", "", line)
    return line.strip()


def title_from(text: str, max_len: int = 28) -> str:
    t = re.sub(r"\s+", " ", text).strip()
    if len(t) <= max_len:
        return t
    cut = t[:max_len]
    if " " in cut:
        cut = cut.rsplit(" ", 1)[0]
    return cut + "…"


def parse_questions(text: str, n_q: int) -> dict[int, dict]:
    chunks: dict[int, str] = {}
    for m in re.finditer(r"(?:^|\n)\s*#?\s*(\d{1,2})\.\s", text):
        n = int(m.group(1))
        if 1 <= n <= n_q:
            chunks[n] = text[m.start() :]
    # trim each chunk at next question
    ordered = sorted(chunks)
    qs: dict[int, dict] = {}
    for i, n in enumerate(ordered):
        chunk = chunks[n]
        if i + 1 < len(ordered):
            nxt = ordered[i + 1]
            idx = chunk.find(f"\n# {nxt}.")
            if idx < 0:
                idx = chunk.find(f"\n{nxt}.")
            if idx > 0:
                chunk = chunk[:idx]
        lines = [ln.strip() for ln in chunk.splitlines() if ln.strip()]
        en_lines, zh_lines = [], []
        for ln in lines:
            if re.match(r"^\([A-E]\)", ln) or re.match(r"^[A-E]\)", ln):
                break
            if re.search(r"[\u4e00-\u9fff]", ln):
                zh_lines.append(ln)
            elif re.search(r"[A-Za-z]", ln) and "Math Kangaroo" not in ln and "Kangaroo Math" not in ln:
                if not re.match(r"^\d+$", ln):
                    en_lines.append(clean_en(ln))
        en = " ".join(en_lines[:3])
        zh = " ".join(zh_lines[:2])
        if not en:
            en = f"Question {n}"
        if not zh:
            zh = en
        qs[n] = {
            "en": en[:500],
            "zh": zh[:300],
            "title_en": title_from(en),
            "title_zh": title_from(zh, 16),
        }
    return qs


def find_question_positions(doc: fitz.Document, n_q: int) -> dict[int, tuple[int, float]]:
    pos: dict[int, tuple[int, float]] = {}
    for i in range(doc.page_count):
        page = doc[i]
        for b in page.get_text("dict")["blocks"]:
            if b.get("type") != 0:
                continue
            for line in b.get("lines", []):
                s = "".join(sp["text"] for sp in line["spans"]).strip()
                m = re.match(r"^#?\s*(\d{1,2})\.\s", s)
                if not m:
                    continue
                n = int(m.group(1))
                if 1 <= n <= n_q:
                    y = line["bbox"][1]
                    if n not in pos or (pos[n][0], pos[n][1]) > (i, y):
                        pos[n] = (i, y)
    return pos


def render_and_crop(year: int, doc: fitz.Document, assets: Path, n_q: int) -> None:
    assets.mkdir(parents=True, exist_ok=True)
    zoom = 150 / 72
    mat = fitz.Matrix(zoom, zoom)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=mat, alpha=False)
        pix.save(str(assets / f"page_{i + 1:02d}.png"))

    pos = find_question_positions(doc, n_q)
    for n in range(1, n_q + 1):
        if n not in pos:
            print(f"  WARN {year} Q{n} no position")
            continue
        pi, y0 = pos[n]
        page = doc[pi]
        same = [(nn, yy) for nn, (pp, yy) in pos.items() if pp == pi and nn > n]
        y1 = min(yy for _, yy in same) - 6 if same else page.rect.y1 - 40
        y0 = max(40, y0 - 4)
        clip = fitz.Rect(36, y0, page.rect.x1 - 36, min(y1, page.rect.y1 - 30))
        if clip.height < 50:
            continue
        pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5), clip=clip, alpha=False)
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        arr = np.array(img)
        mask = (arr[:, :, 0] < 248) | (arr[:, :, 1] < 248) | (arr[:, :, 2] < 248)
        if mask.any():
            ys, xs = np.where(mask)
            pad = 8
            img = img.crop(
                (
                    max(0, xs.min() - pad),
                    max(0, ys.min() - pad),
                    min(img.width, xs.max() + pad),
                    min(img.height, ys.max() + pad),
                )
            )
        img.save(assets / f"q{n}_stem.png")
        if img.height > 280:
            img.crop((0, int(img.height * 0.55), img.width, img.height)).save(
                assets / f"q{n}_options.png"
            )
        else:
            img.save(assets / f"q{n}_options.png")


def write_json(year: int, qs: dict, answers: dict, out: Path, n_q: int) -> None:
    set1 = f"Math Kangaroo {year} – Level 1 -1"
    set2 = f"Math Kangaroo {year} – Level 1 -2"
    full = f"Math Kangaroo {year} – Level 1"
    split = 12 if n_q == 24 else 10

    def item(n: int) -> dict:
        q = qs.get(n, {})
        letter = answers[n]
        st = set1 if n <= split else set2
        return {
            "title": {
                "en": f"{st} Q{n}: {q.get('title_en', f'Q{n}')}",
                "zh": f"{st} 第{n}题：{q.get('title_zh', f'第{n}题')}",
            },
            "type": "single_choice",
            "content": {"en": q.get("en", f"Question {n}"), "zh": q.get("zh", f"第{n}题")},
            "choices": [{"en": L, "zh": L} for L in LETTERS],
            "correct_answer": LETTERS.index(letter) + 1,
            "explanation": {
                "en": f"The correct answer is {letter}.",
                "zh": f"正确答案是 {letter}。",
            },
            "meta": {
                "contest": f"Math Kangaroo {year}",
                "level_en": "Level 1 (Grades 1–2)",
                "level_zh": "等级 1（1–2 年级）",
                "question_number": n,
                "points": points(n, n_q),
                "answer_letter": letter,
                "set_title": st,
            },
            "is_published": True,
        }

    items = [item(n) for n in range(1, n_q + 1)]

    def dump(name: str, chunk: list) -> None:
        stem = name.replace(".json", "")
        payload = {
            "title": {
                "en": stem,
                "zh": stem.replace("Level 1", "等级 1"),
            },
            "questions": chunk,
        }
        with open(out / name, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
            f.write("\n")

    dump(f"{set1}.json", items[:split])
    dump(f"{set2}.json", items[split:])
    dump(f"{full}.json", items)


CSS = r"""
:root{--primary:#0284c7;--success:#14b8a6;--danger:#e11d48;--bg:#f0f9ff;--dark:#0c4a6e;--ink:#0f172a}
*{box-sizing:border-box}
body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;background:radial-gradient(circle at top,#e0f2fe,var(--bg) 55%);color:var(--ink);margin:0;padding:18px;display:flex;flex-direction:column;align-items:center}
.lang-toggle-btn{position:fixed;top:16px;right:16px;background:var(--dark);color:#fff;border:none;padding:10px 16px;border-radius:999px;cursor:pointer;font-weight:800;z-index:1000}
h1{text-align:center;color:var(--primary);margin:6px 0;font-size:22px}
.meta{color:#64748b;font-size:13px;margin-bottom:12px}
.wrap{max-width:960px;width:100%}
.section{background:#fff;padding:18px;border-radius:16px;box-shadow:0 10px 28px rgba(2,132,199,.1);margin-bottom:14px}
h2{color:var(--primary);border-left:5px solid var(--primary);padding-left:10px;margin:0 0 10px;font-size:17px}
.fig,.optgrid{display:block;width:100%;max-width:640px;margin:8px auto;border-radius:12px;border:1px solid #e2e8f0}
.tip{font-size:13px;color:#64748b;text-align:center;margin:6px 0;line-height:1.55}
.pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0}
.card{min-width:56px;padding:12px 14px;border-radius:12px;background:var(--primary);color:#fff;font-weight:800;cursor:pointer}
.card.on{outline:3px solid #f59e0b}
.answer-box{min-width:120px;min-height:52px;border:3px dashed var(--primary);border-radius:14px;margin:10px auto;display:flex;align-items:center;justify-content:center;font-weight:800}
.actions{text-align:center;margin-top:12px}
.btn{border:none;border-radius:22px;padding:10px 18px;font-weight:800;cursor:pointer;margin:4px}
.submit{background:var(--success);color:#fff}.reset{background:#64748b;color:#fff}
#feedback{text-align:center;font-weight:800;margin-top:12px;min-height:28px}
.ok{color:var(--success)}.bad{color:var(--danger)}
.nav{display:flex;justify-content:space-between;margin-top:8px;width:100%;max-width:960px}
.nav a{color:var(--primary);font-weight:700;text-decoration:none}
.lang-zh{display:block}.lang-en{display:none}
body.en-mode .lang-zh{display:none}body.en-mode .lang-en{display:block}
.list{display:grid;gap:8px;max-width:720px;margin:0 auto}
.list a{display:block;padding:12px 14px;border-radius:12px;background:#fff;border:2px solid #bae6fd;color:#0c4a6e;text-decoration:none;font-weight:700}
"""


def enc(letter: str) -> str:
    return base64.b64encode(letter.encode()).decode()


def write_labs(year: int, qs: dict, answers: dict, out: Path, n_q: int) -> None:
    for n in range(1, n_q + 1):
        q = qs.get(n, {})
        zh_t = q.get("title_zh", f"第{n}题")
        en_t = q.get("title_en", f"Q{n}")
        pz = q.get("zh", zh_t)
        pe = q.get("en", en_t)
        pts = points(n, n_q)
        stem = f'<img class="fig" src="assets/q{n}_stem.png" alt="Q{n}"/>' if (out / "assets" / f"q{n}_stem.png").exists() else ""
        opts = f'<img class="optgrid" src="assets/q{n}_options.png" alt="opts"/>' if (out / "assets" / f"q{n}_options.png").exists() else ""
        cards = "".join(
            f'<div class="card" data-v="{L}" onclick="pick(this)">{L}</div>' for L in LETTERS
        )
        prev_l = f'<a href="{n-1}.html">← Q{n-1}</a>' if n > 1 else '<a href="index.html">← Index</a>'
        next_l = f'<a href="{n+1}.html">Q{n+1} →</a>' if n < n_q else '<a href="index.html">Index →</a>'
        html = f"""<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{year} A · Q{n}</title><style>{CSS}</style></head>
<body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 EN / 中文</button>
<h1 class="lang-zh">{zh_t}</h1><h1 class="lang-en">{en_t}</h1>
<div class="meta lang-zh">Math Kangaroo {year} · 等级 A · 第 {n} 题 · {pts} 分</div>
<div class="meta lang-en">Math Kangaroo {year} · Level 1 · Q{n} · {pts} pts</div>
<div class="wrap">
<div class="section"><h2 class="lang-zh">题目</h2><h2 class="lang-en">Problem</h2>
<p class="lang-zh">{pz}</p><p class="lang-en">{pe}</p>{stem}{opts}</div>
<div class="section"><h2 class="lang-zh">作答</h2><h2 class="lang-en">Answer</h2>
<p class="tip lang-zh">先思考，再选答案（检查只提示对错）：</p>
<p class="tip lang-en">Think, then pick (Check only says right/wrong):</p>
<div class="pool">{cards}</div>
<div class="answer-box" id="ansBox"></div>
<div class="actions">
<button class="btn submit" onclick="checkAnswer()"><span class="lang-zh">检查答案</span><span class="lang-en">Check</span></button>
<button class="btn reset" onclick="location.reload()"><span class="lang-zh">重置</span><span class="lang-en">Reset</span></button>
<div id="feedback"></div></div></div>
<div class="nav">{prev_l}{next_l}</div></div>
<script>
const KEY=atob('{enc(answers[n])}'); let picked=null;
function pick(el){{document.querySelectorAll('.card').forEach(c=>c.classList.remove('on'));el.classList.add('on');picked=el.dataset.v;document.getElementById('ansBox').textContent=el.textContent;document.getElementById('feedback').textContent='';}}
function checkAnswer(){{const fb=document.getElementById('feedback');if(!picked){{fb.className='bad';fb.textContent='先选一个选项 / Pick first';return;}}
if(picked===KEY){{fb.className='ok';fb.innerHTML='<span class="lang-zh">正确！</span><span class="lang-en">Correct!</span>';}}
else{{fb.className='bad';fb.innerHTML='<span class="lang-zh">再试试</span><span class="lang-en">Try again</span>';}}}}
</script></body></html>"""
        (out / f"{n}.html").write_text(html, encoding="utf-8")

    links = "".join(
        f'<a href="{n}.html"><span class="lang-zh">{n} · {qs.get(n,{}).get("title_zh",f"第{n}题")} · {points(n,n_q)}分</span>'
        f'<span class="lang-en">{n} · {qs.get(n,{}).get("title_en",f"Q{n}")} · {points(n,n_q)} pts</span></a>'
        for n in range(1, n_q + 1)
    )
    index = f"""<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"/><title>Math Kangaroo {year} Level A</title>
<style>{CSS}</style></head><body>
<button class="lang-toggle-btn" onclick="document.body.classList.toggle('en-mode')">🌐 EN / 中文</button>
<h1 class="lang-zh">袋鼠数学 {year} · 等级 A（1–2 年级）</h1>
<h1 class="lang-en">Math Kangaroo {year} · Level 1 (Grades 1–2)</h1>
<p class="meta lang-zh">共 {n_q} 题。教师答案见 <code>答案.md</code>。</p>
<p class="meta lang-en">{n_q} questions. Teacher key in <code>答案.md</code>.</p>
<div class="list">{links}</div></body></html>"""
    (out / "index.html").write_text(index, encoding="utf-8")


def write_answer_md(year: int, answers: dict, out: Path, n_q: int) -> None:
    rows = "\n".join(f"| {n} | {answers[n]} | {points(n, n_q)} |" for n in range(1, n_q + 1))
    key = " ".join(f"{n}{answers[n]}" for n in range(1, n_q + 1))
    (out / "答案.md").write_text(
        f"# {year} 等级 A · 教师答案（全 {n_q} 题）\n\n| 题号 | 答案 | 分值 |\n|------|------|------|\n{rows}\n\n答案：{key}\n",
        encoding="utf-8",
    )
    if n_q == 24:
        splits = [(1, 8, "3 分", "1-8-答案.md"), (9, 16, "4 分", "9-16-答案.md"), (17, 24, "5 分", "17-24-答案.md")]
    else:
        splits = [(1, 10, "3 分", "1-10-答案.md"), (11, 20, "4 分", "11-20-答案.md")]
    for start, end, label, fname in splits:
        r2 = "\n".join(f"| {n} | {answers[n]} |" for n in range(start, end + 1))
        (out / fname).write_text(
            f"# {year} 等级 A · 教师答案（{start}–{end} · {label}）\n\n| 题号 | 答案 |\n|------|------|\n{r2}\n",
            encoding="utf-8",
        )


def build_year(year: int) -> None:
    print(f"\n===== {year} =====")
    pdf = pdf_path(year)
    out = OUT_ROOT / f"A-{year}"
    out.mkdir(parents=True, exist_ok=True)
    n_q = N_Q[year]
    doc = fitz.open(pdf)
    text = "\n".join(page.get_text() for page in doc)

    embedded = extract_embedded_answers(text)
    answers = ANSWERS[year]
    if embedded and len(embedded) >= n_q:
        for k, v in embedded.items():
            if k <= n_q:
                answers[k] = v

    qs = parse_questions(text, n_q)
    for n in range(1, n_q + 1):
        if n not in qs:
            qs[n] = {"en": f"Question {n}", "zh": f"第{n}题", "title_en": f"Q{n}", "title_zh": f"第{n}题"}

    render_and_crop(year, doc, out / "assets", n_q)
    write_json(year, qs, answers, out, n_q)
    write_labs(year, qs, answers, out, n_q)
    write_answer_md(year, answers, out, n_q)
    (out / "_questions.json").write_text(json.dumps(qs, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  done: {n_q} questions, {len(list((out/'assets').glob('q*_stem.png')))} stems")


def main():
    for year in YEARS:
        build_year(year)
    print("\nAll years built.")


if __name__ == "__main__":
    main()
