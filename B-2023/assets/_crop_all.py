# -*- coding: utf-8 -*-
"""Crop 2023 Level B figures from pages (1191×1684). Lives in assets/."""
from __future__ import annotations
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parent

CROPS: dict[str, tuple[int, tuple[int, int, int, int]]] = {
    "q1_stem.png": (1, (80, 220, 1110, 780)),
    "q1_options.png": (1, (80, 700, 900, 900)),
    "q2_stem.png": (1, (80, 920, 1110, 1250)),
    "q2_options.png": (1, (80, 1200, 700, 1380)),
    "q3_stem.png": (1, (250, 1400, 940, 1620)),
    "q3_options.png": (1, (80, 1500, 900, 1650)),
    "q4_stem.png": (2, (80, 140, 1110, 780)),
    "q4_options.png": (2, (80, 700, 900, 980)),
    "q5_stem.png": (2, (80, 1000, 1110, 1480)),
    "q5_options.png": (2, (80, 1450, 800, 1620)),
    "q6_stem.png": (3, (80, 140, 1110, 700)),
    "q6_options.png": (3, (80, 450, 1110, 780)),
    "q7_stem.png": (3, (80, 820, 1110, 1100)),
    "q7_options.png": (3, (80, 1050, 700, 1200)),
    "q8_stem.png": (3, (80, 1220, 1110, 1580)),
    "q8_options.png": (3, (80, 1380, 1110, 1600)),
    "q9_stem.png": (4, (80, 200, 1110, 700)),
    "q9_options.png": (4, (80, 500, 1110, 820)),
    "q10_stem.png": (4, (80, 860, 1110, 1180)),
    "q10_options.png": (4, (80, 1120, 900, 1320)),
    "q11_stem.png": (4, (80, 1340, 1110, 1620)),
    "q11_options.png": (4, (80, 1450, 1110, 1640)),
    "q12_stem.png": (5, (80, 140, 1110, 620)),
    "q12_options.png": (5, (80, 560, 700, 720)),
    "q13_stem.png": (5, (80, 740, 1110, 980)),
    "q13_options.png": (5, (80, 920, 700, 1080)),
    "q14_stem.png": (5, (80, 1100, 1110, 1420)),
    "q14_options.png": (5, (80, 1360, 700, 1500)),
    "q15_stem.png": (5, (250, 1500, 940, 1640)),
    "q15_options.png": (5, (80, 1560, 700, 1660)),
    "q16_stem.png": (6, (80, 140, 1110, 780)),
    "q16_options.png": (6, (80, 650, 1110, 900)),
    "q17_stem.png": (6, (80, 980, 1110, 1280)),
    "q17_options.png": (6, (80, 1220, 700, 1380)),
    "q18_stem.png": (6, (80, 1400, 1110, 1600)),
    "q18_options.png": (6, (80, 1480, 1110, 1640)),
    "q19_stem.png": (6, (80, 1520, 1110, 1640)),
    "q19_options.png": (6, (80, 1560, 700, 1660)),
    "q20_stem.png": (7, (80, 140, 1110, 720)),
    "q20_options.png": (7, (80, 600, 900, 820)),
    "q21_stem.png": (7, (80, 860, 1110, 1180)),
    "q21_options.png": (7, (80, 1120, 700, 1280)),
    "q22_stem.png": (7, (80, 1300, 1110, 1600)),
    "q22_options.png": (7, (80, 1480, 900, 1640)),
    "q23_stem.png": (8, (80, 140, 1110, 700)),
    "q23_options.png": (8, (80, 600, 700, 820)),
    "q24_stem.png": (8, (80, 860, 1110, 1500)),
    "q24_options.png": (8, (80, 1100, 1110, 1580)),
}


def main():
    for name, (page, box) in CROPS.items():
        src = ASSETS / f"page_{page:02d}.png"
        if not src.exists():
            print("missing", src)
            continue
        crop = Image.open(src).crop(box)
        crop.save(ASSETS / name)
        print("ok", name, crop.size)


if __name__ == "__main__":
    main()
