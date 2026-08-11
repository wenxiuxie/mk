# -*- coding: utf-8 -*-
"""
Crop Math Kangaroo 2020 Level A (PreEcolier) figure assets from rendered pages.

Source pages: assets/page_01.png … page_12.png at 1191×1684 px
(China bilingual paper). Bounding boxes are (left, top, right, bottom)
in page pixel coordinates.

Page → question map (refined from renders):
  p01: Q1 stairs, Q2 castle selfie
  p02: Q3 kangaroo pieces, Q4 toys
  p03: Q5 hole cards, Q6 grey cubes
  p04: Q7 shape boxes (figure options), Q8 braid
  p05: Q9 tile pattern
  p06: Q10 village map, Q11 polycubes
  p07: Q12 flowers, Q13 shaded grids
  p08: Q14 colored squares, Q15 flip card
  p09: Q16 cookies (text), Q17 cards + board
  p10: Q18 trains, Q19 honeycomb
  p11: Q20 height arrows, Q21 fruit (text), Q22 cross (+ options)
  p12: Q23 numbered cube, Q24 sweets (text)
"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
PAGE_W, PAGE_H = 1191, 1684

# ---------------------------------------------------------------------------
# Crops: name -> (page_index_1based, bbox)
# Each question gets at least qN_stem + qN_options.
# Optional extras: pieces / cards / tiles where useful.
# ---------------------------------------------------------------------------
CROPS: dict[str, tuple[int, tuple[int, int, int, int]]] = {
    # ----- Q1 stairs (text options) -----
    "q1_stem.png": (1, (250, 370, 920, 670)),  # kangaroo + 10 steps + rabbit
    "q1_options.png": (1, (95, 685, 900, 735)),
    # ----- Q2 castle selfie -----
    "q2_stem.png": (1, (375, 925, 810, 1100)),
    "q2_options.png": (1, (95, 1120, 1060, 1585)),
    # ----- Q3 kangaroo pieces -----
    "q3_stem.png": (2, (455, 310, 740, 670)),
    "q3_options.png": (2, (95, 680, 1070, 845)),
    "q3_piece1.png": (2, (463, 316, 597, 490)),
    "q3_piece2.png": (2, (597, 316, 732, 490)),
    "q3_piece3.png": (2, (463, 490, 597, 663)),
    "q3_piece4.png": (2, (597, 490, 732, 663)),
    # ----- Q4 repeating toys -----
    "q4_stem.png": (2, (105, 1135, 1090, 1220)),
    "q4_options.png": (2, (95, 1230, 870, 1475)),
    # ----- Q5 cards with holes -----
    "q5_stem.png": (3, (370, 320, 810, 490)),
    "q5_options.png": (3, (95, 520, 820, 975)),
    "q5_card_A.png": (3, (385, 336, 525, 490)),  # holes card (+ label A)
    "q5_card_B.png": (3, (640, 336, 800, 490)),  # stars card (+ label B)
    # ----- Q6 cube structure (text options) -----
    "q6_stem.png": (3, (455, 1240, 740, 1450)),
    "q6_options.png": (3, (100, 1485, 970, 1520)),
    # ----- Q7 shape boxes (figure-only options; stem = full A–E row) -----
    "q7_stem.png": (4, (155, 365, 1080, 575)),
    "q7_options.png": (4, (155, 365, 1080, 575)),
    # ----- Q8 braid (text color options) -----
    "q8_stem.png": (4, (280, 820, 960, 1100)),
    "q8_options.png": (4, (175, 1125, 1050, 1440)),
    # ----- Q9 complete the tile -----
    "q9_stem.png": (5, (390, 295, 805, 705)),
    "q9_options.png": (5, (165, 740, 1020, 1290)),
    "q9_tile.png": (5, (390, 295, 805, 705)),  # same as stem; missing-center board
    # Individual A–E tiles from q9_options.png region (relative boxes applied in post-step)
    # ----- Q10 village map (A–E marked on map) -----
    "q10_stem.png": (6, (420, 490, 780, 800)),
    "q10_options.png": (6, (100, 830, 980, 870)),  # letter row under map (if present)
    # ----- Q11 polycubes (figure-only options) -----
    "q11_stem.png": (6, (95, 1055, 1040, 1425)),
    "q11_options.png": (6, (95, 1055, 1040, 1425)),
    # ----- Q12 flowers (text options) -----
    # Q12: petal digits sit higher than the flower art bbox — keep y top ≤ ~340 (2x)
    # Prefer regenerating via PDF clip in fix script; 2x page fallback:
    "q12_stem.png": (7, (400, 340, 820, 750)),
    "q12_options.png": (7, (100, 730, 1040, 800)),
    # ----- Q13 shaded grids (figure-only options) -----
    "q13_stem.png": (7, (95, 950, 830, 1445)),
    "q13_options.png": (7, (95, 950, 830, 1445)),
    # ----- Q14 colored squares (text options) -----
    "q14_stem.png": (8, (380, 300, 820, 560)),
    "q14_options.png": (8, (140, 570, 960, 610)),
    # ----- Q15 flip card -----
    "q15_stem.png": (8, (200, 820, 1000, 980)),
    "q15_options.png": (8, (90, 1000, 520, 1550)),
    "q15_card.png": (8, (200, 820, 1000, 980)),
    # ----- Q16 cookies (text-only) -----
    "q16_stem.png": (9, (80, 155, 1130, 330)),
    "q16_options.png": (9, (100, 400, 970, 435)),
    # ----- Q17 cards + board -----
    "q17_stem.png": (9, (160, 990, 420, 1200)),  # board with grey square
    "q17_options.png": (9, (120, 1275, 1000, 1360)),
    "q17_cards.png": (9, (425, 495, 1075, 575)),  # nine source cards (tight)
    # ----- Q18 trains (text options) -----
    "q18_stem.png": (10, (85, 410, 1110, 660)),
    "q18_options.png": (10, (100, 725, 980, 765)),
    # ----- Q19 honeycomb (text options; A/B on figure) -----
    "q19_stem.png": (10, (430, 1040, 770, 1265)),
    "q19_options.png": (10, (100, 1295, 980, 1340)),
    # ----- Q20 height arrows -----
    "q20_stem.png": (11, (300, 360, 760, 640)),
    "q20_options.png": (11, (100, 650, 980, 690)),
    # ----- Q21 fruit (text-only) -----
    "q21_stem.png": (11, (75, 760, 1120, 1025)),
    "q21_options.png": (11, (100, 1035, 980, 1070)),
    # ----- Q22 cross (bottom of page 11; options under figure) -----
    "q22_stem.png": (11, (120, 1325, 560, 1510)),
    "q22_options.png": (11, (80, 1510, 1120, 1640)),
    # ----- Q23 cube -----
    "q23_stem.png": (12, (490, 470, 710, 690)),
    "q23_options.png": (12, (100, 715, 980, 755)),
    # ----- Q24 sweets (text-only) -----
    "q24_stem.png": (12, (70, 780, 1130, 1050)),
    "q24_options.png": (12, (100, 1190, 980, 1235)),
}


def _clamp_bbox(box: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    l, t, r, b = box
    l = max(0, min(l, PAGE_W - 1))
    t = max(0, min(t, PAGE_H - 1))
    r = max(l + 1, min(r, PAGE_W))
    b = max(t + 1, min(b, PAGE_H))
    return l, t, r, b


def main() -> None:
    pages: dict[int, Image.Image] = {}
    created: list[tuple[str, int, int, tuple[int, int, int, int]]] = []

    for name, (page_i, box) in CROPS.items():
        if page_i not in pages:
            path = ROOT / f"page_{page_i:02d}.png"
            im = Image.open(path)
            if im.size != (PAGE_W, PAGE_H):
                raise SystemExit(f"{path.name} size {im.size}, expected {(PAGE_W, PAGE_H)}")
            pages[page_i] = im

        box = _clamp_bbox(box)
        crop = pages[page_i].crop(box)
        out = ROOT / name
        crop.save(out)
        created.append((name, crop.width, crop.height, box))

    print(f"Created {len(created)} files in {ROOT}")
    print(f"{'file':28s} {'WxH':12s} bbox (L,T,R,B)")
    print("-" * 72)
    for name, w, h, box in created:
        print(f"{name:28s} {w:4d}x{h:<6d} {box}")

    # Per-question coverage check
    missing = []
    for n in range(1, 25):
        for kind in ("stem", "options"):
            fn = f"q{n}_{kind}.png"
            if fn not in CROPS:
                missing.append(fn)
    if missing:
        print("\nMISSING required:", ", ".join(missing))
    else:
        print("\nAll q1–q24 stem + options present.")


if __name__ == "__main__":
    main()
