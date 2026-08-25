# -*- coding: utf-8 -*-
"""Crop 2024 Level B figures from rendered pages (1191×1684). File lives in assets/."""
from __future__ import annotations
from pathlib import Path
from PIL import Image

ASSETS = Path(__file__).resolve().parent

# Approximate crops — refine later if needed
CROPS: dict[str, tuple[int, tuple[int, int, int, int]]] = {
    # p1: Q1–Q3
    "q1_stem.png": (1, (80, 200, 1110, 620)),
    "q1_options.png": (1, (80, 200, 1110, 620)),
    "q2_stem.png": (1, (280, 680, 920, 1100)),
    "q2_options.png": (1, (80, 1100, 700, 1280)),
    "q3_stem.png": (1, (300, 1320, 900, 1580)),
    "q3_options.png": (1, (80, 1520, 700, 1640)),
    # p2: Q4–Q6
    "q4_stem.png": (2, (80, 120, 1110, 520)),
    "q4_options.png": (2, (80, 480, 700, 620)),
    "q5_stem.png": (2, (80, 640, 1110, 1000)),
    "q5_options.png": (2, (80, 980, 1000, 1200)),
    "q6_stem.png": (2, (80, 1220, 1110, 1550)),
    "q6_options.png": (2, (80, 1480, 700, 1640)),
    # p3: Q7–Q8
    "q7_stem.png": (3, (80, 160, 1110, 900)),
    "q7_options.png": (3, (80, 500, 1110, 900)),
    "q8_stem.png": (3, (250, 980, 940, 1450)),
    "q8_options.png": (3, (80, 1450, 700, 1600)),
    # p4: Q9–Q10
    "q9_stem.png": (4, (80, 200, 1110, 780)),
    "q9_options.png": (4, (80, 720, 700, 880)),
    "q10_stem.png": (4, (80, 900, 1110, 1500)),
    "q10_options.png": (4, (80, 1380, 1110, 1600)),
    # p5: Q11–Q13
    "q11_stem.png": (5, (80, 160, 1110, 720)),
    "q11_options.png": (5, (80, 520, 1110, 780)),
    "q12_stem.png": (5, (80, 820, 1110, 1180)),
    "q12_options.png": (5, (80, 1120, 700, 1260)),
    "q13_stem.png": (5, (280, 1280, 920, 1580)),
    "q13_options.png": (5, (80, 1520, 700, 1640)),
    # p6: Q14–Q16
    "q14_stem.png": (6, (80, 160, 1110, 700)),
    "q14_options.png": (6, (80, 620, 700, 760)),
    "q15_stem.png": (6, (200, 780, 990, 1200)),
    "q15_options.png": (6, (80, 1180, 700, 1320)),
    "q16_stem.png": (6, (200, 1340, 990, 1600)),
    "q16_options.png": (6, (80, 1540, 800, 1650)),
    # p7: Q17–Q19
    "q17_stem.png": (7, (80, 200, 1110, 700)),
    "q17_options.png": (7, (80, 640, 700, 800)),
    "q18_stem.png": (7, (200, 820, 990, 1200)),
    "q18_options.png": (7, (80, 1180, 800, 1340)),
    "q19_stem.png": (7, (80, 1360, 1110, 1600)),
    "q19_options.png": (7, (80, 1520, 700, 1640)),
    # p8: Q20–Q22
    "q20_stem.png": (8, (80, 160, 1110, 700)),
    "q20_options.png": (8, (80, 640, 700, 800)),
    "q21_stem.png": (8, (250, 820, 940, 1200)),
    "q21_options.png": (8, (80, 1180, 700, 1320)),
    "q22_stem.png": (8, (250, 1340, 940, 1600)),
    "q22_options.png": (8, (80, 1520, 700, 1640)),
    # p9: Q23–Q24
    "q23_stem.png": (9, (80, 160, 1110, 900)),
    "q23_options.png": (9, (80, 700, 1110, 1000)),
    "q24_stem.png": (9, (80, 1040, 1110, 1500)),
    "q24_options.png": (9, (80, 1480, 800, 1620)),
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
