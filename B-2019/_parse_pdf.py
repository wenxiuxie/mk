# -*- coding: utf-8 -*-
"""Parse 2019 Level B PDF into structured questions + extract figures."""
import fitz
import os
import re
import json

PDF = r"D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级B\2019 等级2：3-4年级.pdf"
OUT = r"D:\文秀相关\binghao\袋鼠数学\tmp_2019B"
ASSETS = r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\B-2019\assets"
os.makedirs(OUT, exist_ok=True)
os.makedirs(ASSETS, exist_ok=True)

# 答案：ECADA ADBBC CEBAD DECBE BEBD
KEY = "ECADA" + "ADBBC" + "CEBAD" + "DECBE" + "BEBD"
assert len(KEY) == 24, len(KEY)

doc = fitz.open(PDF)
print("pages", doc.page_count, "key", KEY)

# Full text with page markers
chunks = []
for i in range(doc.page_count):
    chunks.append(f"\n<<<P{i+1}>>>\n" + doc[i].get_text())
text = "".join(chunks)
open(os.path.join(OUT, "full.txt"), "w", encoding="utf-8").write(text)

# Split on question numbers like "1・" or "1." or "1 ."
parts = re.split(r"(?m)(?=^\d{1,2}\s*[・\.．]\s*)", text)
qs = {}
for p in parts:
    m = re.match(r"^(\d{1,2})\s*[・\.．]\s*(.*)$", p.strip(), re.S)
    if not m:
        continue
    n = int(m.group(1))
    if n < 1 or n > 24:
        continue
    body = re.split(r"答案：", m.group(2))[0].strip()
    # remove page markers
    body = re.sub(r"<<<P\d+>>>", "\n", body)
    body = re.sub(r"Ecolier|2019 Mathematics Kangaroo Contest|Grade 3 & 4|\n\d+\n", "\n", body)
    opts = re.findall(r"\(([A-E])\)\s*([^\n(]*)", body)
    en_lines, zh_lines = [], []
    for line in body.splitlines():
        line = line.strip()
        if not line or re.match(r"^\([A-E]\)", line):
            continue
        if re.search(r"[\u4e00-\u9fff]", line):
            zh_lines.append(line)
        else:
            if not zh_lines:
                en_lines.append(line)
    qs[n] = {
        "en": " ".join(en_lines).strip(),
        "zh": " ".join(zh_lines).strip(),
        "opts": [[a, o.strip()] for a, o in opts[:5]],
        "ans": KEY[n - 1],
        "points": 3 if n <= 8 else (4 if n <= 16 else 5),
    }
    print(f"Q{n} [{qs[n]['ans']}] {qs[n]['en'][:70]}")

open(os.path.join(OUT, "questions.json"), "w", encoding="utf-8").write(
    json.dumps(qs, ensure_ascii=False, indent=2)
)
print("questions", len(qs))

# Locate each question y-band and extract figure clip
# Find line positions for each question header


def find_q_positions():
    pos = {}  # n -> (page_index, y0)
    for i in range(doc.page_count):
        page = doc[i]
        for b in page.get_text("dict")["blocks"]:
            if b.get("type") != 0:
                continue
            for line in b.get("lines", []):
                s = "".join(sp["text"] for sp in line["spans"]).strip()
                m = re.match(r"^(\d{1,2})\s*[・\.．]", s)
                if m:
                    n = int(m.group(1))
                    if 1 <= n <= 24:
                        pos[n] = (i, line["bbox"][1])
    return pos


pos = find_q_positions()
print("positions", sorted(pos.items()))

# Also find (A) option y for each question on same page
for n in range(1, 25):
    if n not in pos:
        print("MISSING POS", n)
        continue
    pi, qy = pos[n]
    page = doc[pi]
    next_y = pos[n + 1][1] if (n + 1) in pos and pos[n + 1][0] == pi else page.rect.y1 - 30
    if (n + 1) in pos and pos[n + 1][0] != pi:
        next_y = page.rect.y1 - 30

    # content bbox from drawings/images between qy and next_y
    xs, ys = [], []
    for path in page.get_drawings():
        r = path.get("rect")
        if not r:
            continue
        if r.y1 < qy + 8 or r.y0 > next_y - 5:
            continue
        if r.width < 3 or r.height < 3 or r.width > 520:
            continue
        xs += [r.x0, r.x1]
        ys += [r.y0, r.y1]
    for img in page.get_images(full=True):
        xref = img[0]
        try:
            rects = page.get_image_rects(xref)
        except Exception:
            continue
        for r in rects:
            if r.y1 < qy + 8 or r.y0 > next_y - 5:
                continue
            if r.height < 25:
                continue
            xs += [r.x0, r.x1]
            ys += [r.y0, r.y1]

    if not xs:
        print(f"Q{n}: no figure")
        qs[n]["has_fig"] = False
        continue

    clip = fitz.Rect(
        max(40, min(xs) - 6),
        max(qy + 5, min(ys) - 4),
        min(555, max(xs) + 6),
        min(next_y - 2, max(ys) + 4),
    )
    if clip.height < 20 or clip.width < 20:
        print(f"Q{n}: tiny clip skip", clip)
        qs[n]["has_fig"] = False
        continue

    pix = page.get_pixmap(matrix=fitz.Matrix(3.5, 3.5), clip=clip)
    path = os.path.join(ASSETS, f"q{n}_figure.png")
    pix.save(path)

    # trim white
    try:
        from PIL import Image
        import numpy as np

        im = Image.open(path).convert("RGB")
        a = __import__("numpy").array(im)
        mask = (a[:, :, 0] < 248) | (a[:, :, 1] < 248) | (a[:, :, 2] < 248)
        if mask.any():
            yy, xx = __import__("numpy").where(mask)
            pad = 8
            im = im.crop(
                (
                    max(0, xx.min() - pad),
                    max(0, yy.min() - pad),
                    min(im.width, xx.max() + pad),
                    min(im.height, yy.max() + pad),
                )
            )
            im.save(path)
        print(f"Q{n}: figure {im.size}")
        qs[n]["has_fig"] = True
    except Exception as e:
        print(f"Q{n}: saved raw", e)
        qs[n]["has_fig"] = True

open(os.path.join(OUT, "questions.json"), "w", encoding="utf-8").write(
    json.dumps(qs, ensure_ascii=False, indent=2)
)
print("done")
