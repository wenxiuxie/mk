# -*- coding: utf-8 -*-
"""Crop 2019 Level A figures from rendered pages (1190×1684)."""
from __future__ import annotations
import os
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parent  # this file lives in assets/

# page (1-based), bbox (l,t,r,b) on full page
CROPS: dict[str, tuple[int, tuple[int, int, int, int]]] = {
    "q1_stem.png": (1, (90, 300, 1100, 720)),
    "q1_options.png": (1, (90, 300, 1100, 720)),
    "q2_stem.png": (1, (350, 780, 840, 1080)),
    "q2_options.png": (1, (80, 1100, 1110, 1550)),
    # p2: Q3 text, Q4 grid, Q5 queue
    "q3_stem.png": (2, (80, 160, 1110, 420)),
    "q3_options.png": (2, (80, 360, 500, 520)),
    "q4_stem.png": (2, (380, 540, 810, 900)),
    "q4_options.png": (2, (80, 920, 1110, 1120)),
    "q5_stem.png": (2, (80, 1180, 1110, 1580)),
    "q5_options.png": (2, (90, 1520, 750, 1630)),
    # p3: Q6 socks, Q7 flowers
    "q6_stem.png": (3, (200, 200, 990, 780)),
    "q6_options.png": (3, (80, 780, 700, 900)),
    "q7_stem.png": (3, (280, 980, 900, 1480)),
    "q7_options.png": (3, (80, 1480, 700, 1600)),
    # p4: Q8 fruit prices
    "q8_stem.png": (4, (60, 200, 1130, 1100)),
    "q8_options.png": (4, (80, 1100, 900, 1400)),
    # p5: Q9 maze, Q10 fold, Q11 cards
    "q9_stem.png": (5, (280, 220, 900, 780)),
    "q9_options.png": (5, (90, 760, 950, 980)),
    "q10_stem.png": (5, (200, 1000, 990, 1280)),
    "q10_options.png": (5, (90, 1260, 750, 1380)),
    "q11_stem.png": (5, (250, 1380, 940, 1630)),
    "q11_options.png": (6, (90, 140, 1000, 340)),
    # p6: Q12 cat, Q13 weave
    "q12_stem.png": (6, (300, 340, 900, 780)),
    "q12_options.png": (6, (80, 780, 700, 900)),
    "q13_stem.png": (6, (380, 980, 800, 1280)),
    "q13_options.png": (6, (80, 1300, 1110, 1600)),
    # p7: Q14 cubes, Q15 tiles, Q16 train diagram
    "q14_stem.png": (7, (80, 200, 1110, 620)),
    "q14_options.png": (7, (80, 200, 1110, 620)),
    "q15_stem.png": (7, (280, 700, 900, 1100)),
    "q15_options.png": (7, (80, 1100, 800, 1220)),
    "q16_stem.png": (7, (120, 1280, 1070, 1580)),
    "q16_options.png": (8, (90, 180, 750, 380)),
    # p8: Q17 text, Q18 pieces
    "q17_stem.png": (8, (80, 400, 1110, 700)),
    "q17_options.png": (8, (80, 640, 700, 820)),
    "q18_stem.png": (8, (200, 880, 990, 1120)),
    "q18_options.png": (8, (80, 1200, 1110, 1580)),
    # p9: Q19–21
    "q19_stem.png": (9, (80, 160, 1110, 420)),
    "q19_options.png": (9, (80, 360, 600, 500)),
    "q20_stem.png": (9, (80, 520, 1110, 780)),
    "q20_options.png": (9, (80, 740, 600, 880)),
    "q21_stem.png": (9, (300, 920, 890, 1450)),
    "q21_options.png": (9, (80, 1450, 700, 1580)),
    # p10: Q22–23
    "q22_stem.png": (10, (150, 180, 1040, 460)),
    "q22_options.png": (10, (90, 460, 1100, 900)),
    "q23_stem.png": (10, (300, 980, 890, 1320)),
    "q23_options.png": (10, (90, 1320, 750, 1480)),
    # p11: Q24
    "q24_stem.png": (11, (80, 80, 1110, 900)),
    "q24_options.png": (11, (80, 900, 700, 1100)),
}


def main():
    for name, (page, box) in CROPS.items():
        src = ASSETS / f"page_{page:02d}.png"
        if not src.exists():
            print("missing", src)
            continue
        im = Image.open(src)
        crop = im.crop(box)
        out = ASSETS / name
        crop.save(out)
        print("ok", name, crop.size)


if __name__ == "__main__":
    main()
