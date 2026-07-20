# -*- coding: utf-8 -*-
"""Build complete 2019 Level B question bank + page-region figures + HTML pages."""
import fitz
import os
import re
import json
from PIL import Image
import numpy as np

PDF = r"D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级B\2019 等级2：3-4年级.pdf"
ROOT = r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\B-2019"
ASSETS = os.path.join(ROOT, "assets")
os.makedirs(ASSETS, exist_ok=True)

# 答案：ECADA ADBBC CEBAD DECBE BEBD
KEY = "ECADAADBBCCEBADDECBEBEBD"

# Curated bilingual content (OCR/PDF text cleaned)
QS = {
    1: {
        "title_zh": "领奖台排名",
        "title_en": "Podium Ranking",
        "zh": "领奖台上站的台阶越高，跑步者的排名越靠前。问谁是第三个跑完的？",
        "en": "The higher the step on the podium, the higher the rank of the runner. Who finished third?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "台阶越高名次越好。按台阶高度排出 1–5 名，第 3 名是 E。",
        "hint_en": "Higher step = better rank. Order by height; 3rd place is E.",
    },
    2: {
        "title_zh": "点与长条计数",
        "title_en": "Dots and Bars",
        "zh": "每个点代表 1，每个长条代表 5。哪张图代表 12？",
        "en": "Each dot = 1, each bar = 5. Which picture stands for 12?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "12 = 2×1 + 2×5。找「2个点 + 2根长条」。",
        "hint_en": "12 = 2×1 + 2×5. Find 2 dots + 2 bars.",
    },
    3: {
        "title_zh": "昨天星期天",
        "title_en": "Day After Tomorrow",
        "zh": "昨天是星期天。明天是星期几？",
        "en": "Yesterday was Sunday. What day is tomorrow?",
        "opts": ["星期二 Tuesday", "星期四 Thursday", "星期三 Wednesday", "星期一 Monday", "星期六 Saturday"],
        "hint_zh": "昨天日→今天一→明天二。",
        "hint_en": "Yesterday Sun → today Mon → tomorrow Tue.",
    },
    4: {
        "title_zh": "书封面的洞",
        "title_en": "Holes in the Book Cover",
        "zh": "书的封面上有两个洞。合上书时，Olaf 透过洞会看到哪些图片？",
        "en": "Two holes in the book cover. Which pictures does Olaf see through the holes when he closes the book?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "合上书相当于封面翻转到另一面，注意洞的位置与镜像。",
        "hint_en": "Closing the book flips the cover; watch hole positions and mirroring.",
    },
    5: {
        "title_zh": "切下一片",
        "title_en": "Cut Out a Piece",
        "zh": "Karina 从上图中切出给定形状的一片。哪一块儿是她有可能得到的？",
        "en": "Karina cuts out one piece like the given shape from the sheet. Which piece can she get?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "对照原图格子，看哪一块能完整覆盖且不超出图案。",
        "hint_en": "Match the cutout to the sheet pattern without going outside.",
    },
    6: {
        "title_zh": "雪地脚印顺序",
        "title_en": "Muddy Footprints Order",
        "zh": "三个人穿着泥泞的鞋子走过雪地。他们是按什么顺序走的？",
        "en": "Three people walked across snow with muddy shoes. In which order did they do this?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "后走的脚印会盖住先走的。看谁的脚印在最上面。",
        "hint_en": "Later footprints cover earlier ones. See which prints are on top.",
    },
    7: {
        "title_zh": "木棒拼形",
        "title_en": "Stick Shapes",
        "zh": "Pia 用图中相连的木棒拼形。下面哪个形状需要比她现有的还多的木棒？",
        "en": "Pia makes shapes with the connected sticks shown. Which shape needs more sticks than Pia has?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "先数 Pia 有几根木棒，再数各选项需要几根。",
        "hint_en": "Count Pia’s sticks, then count sticks needed for each option.",
    },
    8: {
        "title_zh": "问号是几",
        "title_en": "Replace the Question Mark",
        "zh": "如果所有计算都正确，问号应是几？",
        "en": "What number should replace the question mark when all calculations are correct?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "按图中运算箭头一步步算回去或算下去。",
        "hint_en": "Follow the operations along the arrows step by step.",
    },
    9: {
        "title_zh": "照片与大头针",
        "title_en": "Photos and Pins",
        "zh": "Linda 用 8 个大头针固定 3 张照片。Peter 想同样固定 7 张，需要多少针？",
        "en": "Linda pinned 3 photos with 8 pins. How many pins for 7 photos the same way?",
        "opts": ["14", "16", "18", "22", "26"],
        "hint_zh": "3 张用 8 针 → 两端各 1，相邻共用。n 张需要 2n+2？先找规律：8=2×3+2。",
        "hint_en": "3 photos → 8 pins. Pattern: 2n+2 → for n=7: 16.",
    },
    10: {
        "title_zh": "去掉一格",
        "title_en": "Remove One Cell",
        "zh": "Dennis 想从上面的形状中删除一个单元格。他可以得到下面几种形状？",
        "en": "Dennis wants to remove one cell from the shape. How many of the following shapes can he get?",
        "opts": ["1", "2", "3", "4", "5"],
        "hint_zh": "逐个试删不同格子，看能否得到各选项图形。",
        "hint_en": "Try removing different cells and match the option shapes.",
    },
    11: {
        "title_zh": "编织背面",
        "title_en": "Woven Pattern From Back",
        "zh": "六条带子编织成图案。从背面看是什么样？",
        "en": "Six strips are woven into a pattern. What does it look like from the back?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "背面相当于左右翻转，并注意上下交织关系反过来。",
        "hint_en": "The back is a flip; over/under relations reverse.",
    },
    12: {
        "title_zh": "玩具狗重量",
        "title_en": "Dog Toy Weight",
        "zh": "玩具狗的重量是整数千克。一只玩具狗重多少千克？",
        "en": "The weight of a dog toy is a whole number of kilograms. How many kg is one dog toy?",
        "opts": ["A", "B", "C", "D", "E"],
        "hint_zh": "用天平两边相等列方程，求一只狗的重量。",
        "hint_en": "Set the balance scales equal and solve for one dog.",
    },
    13: {
        "title_zh": "玻璃球交换",
        "title_en": "Marble Trading",
        "zh": "Sara 有 16 个蓝球。3 蓝换 1 红，2 红换 5 绿。最多能得多少绿球？",
        "en": "Sara has 16 blue marbles. Trade 3 blue→1 red, or 2 red→5 green. Max green marbles?",
        "opts": ["5", "10", "13", "15", "20"],
        "hint_zh": "16÷3=5 余1 → 最多 5 红；5 红只能配成 2 组换绿（用 4 红）→ 10 绿。",
        "hint_en": "16÷3 → 5 red (1 blue left). 4 red → 2 trades → 10 green.",
    },
    14: {
        "title_zh": "填数字求最大和",
        "title_en": "Largest Sum with 2,0,1,9",
        "zh": "把 2、0、1、9 填入加法算式各方框，使结果尽可能大。问号可以是哪个数字？",
        "en": "Write digits 2,0,1,9 in the boxes to get the largest sum. Which digit could replace the question mark?",
        "opts": ["0或1 Either 0 or 1", "0或2 Either 0 or 2", "只能0 Only 0", "只能1 Only 1", "只能2 Only 2"],
        "hint_zh": "要最大和，大数字尽量放在高位。看问号位置能填哪些。",
        "hint_en": "Place larger digits in higher places; see which digits fit the ?.",
    },
    15: {
        "title_zh": "半杯水多重",
        "title_en": "Half-full Glass Weight",
        "zh": "装满水的杯子重 400 克，空杯 100 克。半杯水的杯子重多少克？",
        "en": "A full glass of water weighs 400 g. Empty glass 100 g. How many grams is a half-full glass?",
        "opts": ["15", "200", "225", "250", "300"],
        "hint_zh": "水重 400−100=300；半杯水 150；总重 100+150=250。",
        "hint_en": "Water = 300 g; half water = 150; total = 100+150 = 250.",
    },
    16: {
        "title_zh": "糖果值多少钱",
        "title_en": "Candy Costs",
        "zh": "根据图中「一起值多少钱」的信息，问号组合一共值多少美分？",
        "en": "Using the ‘together we cost …’ clues, how much do the asked candies cost together?",
        "opts": ["8美分", "9美分", "10美分", "11美分", "12美分"],
        "hint_zh": "设未知数，用三个等式联立求解。",
        "hint_en": "Set variables and solve the three given equations.",
    },
    17: {
        "title_zh": "形状代表数字",
        "title_en": "Shapes as Numbers",
        "zh": "每个形状代表不同的数。每行三个数的和写在右边。问某个形状代表几？",
        "en": "Each shape stands for a different number. Row sums are shown. Which number does the asked shape stand for?",
        "opts": ["2", "3", "4", "5", "6"],
        "hint_zh": "用行和列方程消元，求出目标形状。",
        "hint_en": "Use the row-sum equations to solve for the target shape.",
    },
    18: {
        "title_zh": "画框用多少小方块",
        "title_en": "Framing a Picture",
        "zh": "7×7 的画用 32 个小白方块加框。给 10×10 的画加框需要多少？",
        "en": "Anna used 32 small white squares to frame a 7×7 picture. How many to frame a 10×10?",
        "opts": ["36", "40", "44", "48", "52"],
        "hint_zh": "外框一圈：对边 n 的画，框边长 n+2，方块数 = 4(n+1)。7→32=4×8；10→4×11=44。",
        "hint_en": "Frame size: 4(n+1). For n=10: 4×11=44.",
    },
    19: {
        "title_zh": "数字5出现16次",
        "title_en": "Digit 5 Appears 16 Times",
        "zh": "页码从 1 开始，数字 5 恰好出现 16 次。这本书最多有多少页？",
        "en": "Pages numbered 1,2,3… Digit 5 appears exactly 16 times. Max number of pages?",
        "opts": ["49", "64", "66", "74", "80"],
        "hint_zh": "分段数：1–9、10–59、60–… 统计含 5 的次数，取最多页仍恰好 16 次。",
        "hint_en": "Count digit-5 occurrences by ranges; maximize pages with exactly 16 fives.",
    },
    20: {
        "title_zh": "猫走走廊",
        "title_en": "Cat in the Hallway",
        "zh": "走廊尺寸如图。猫沿中间虚线走，共走多少米？",
        "en": "A hallway has the dimensions shown. A cat walks on the dashed midline. How many meters?",
        "opts": ["63", "68", "69", "71", "83"],
        "hint_zh": "把折线走廊拉直：虚线长度 = 各段中线长之和。",
        "hint_en": "Unfold the hallway: dashed path = sum of midline segments.",
    },
    21: {
        "title_zh": "公园里的袋鼠",
        "title_en": "Kangaroos in the Park",
        "zh": "15 只动物：牛、猫、袋鼠。恰好 10 只不是牛，恰好 8 只不是猫。有多少袋鼠？",
        "en": "15 animals: cows, cats, kangaroos. Exactly 10 are not cows, exactly 8 are not cats. How many kangaroos?",
        "opts": ["2", "3", "4", "8", "10"],
        "hint_zh": "牛=15−10=5；猫=15−8=7；袋鼠=15−5−7=3。",
        "hint_en": "Cows=5, cats=7, kangaroos=15−5−7=3.",
    },
    22: {
        "title_zh": "彩色小三角形",
        "title_en": "Colored Triangles",
        "zh": "9 个小三角形（3红3黄3蓝）拼大三角，相邻不同色。根据已放的，哪句话正确？",
        "en": "9 small triangles (3R,3Y,3B) form a big triangle; adjacent different colors. Which statement is true?",
        "opts": [
            "1黄且3红 / 1 yellow and 3 red",
            "1蓝且2红 / 1 blue and 2 red",
            "1和3都红 / 1 and 3 are red",
            "5红且2黄 / 5 red and 2 yellow",
            "1和3都黄 / 1 and 3 are yellow",
        ],
        "hint_zh": "相邻必须异色，结合已给出的颜色推理剩余位置。",
        "hint_en": "Adjacent must differ; deduce remaining cells from the given ones.",
    },
    23: {
        "title_zh": "谁吃了饼干",
        "title_en": "Who Ate the Cookie?",
        "zh": "五个孩子中一人吃了饼干，每人一句陈述，只有一人撒谎。谁吃了饼干？",
        "en": "One of five children ate a cookie. Each makes a statement; only one lies. Who ate it?",
        "opts": ["Alek", "Bartek", "Czarek", "Darek", "Edek"],
        "hint_zh": "假设每个人吃了饼干，检查是否恰好一人说谎。",
        "hint_en": "Assume each eater in turn; check that exactly one statement is false.",
    },
    24: {
        "title_zh": "夹子挂毛巾",
        "title_en": "Towels and Pegs",
        "zh": "图1每条毛巾2夹；图2相邻共用夹。共挂35条用58夹。按图1挂了多少条？",
        "en": "Fig.1: 2 pegs per towel; Fig.2: shared pegs. 35 towels, 58 pegs. How many hung as in Fig.1?",
        "opts": ["12", "13", "21", "22", "23"],
        "hint_zh": "设图1有 x 条（用 2x 夹），图2有 35−x 条（用 (35−x)+1 夹）。2x+(35−x)+1=58 → x=22。",
        "hint_en": "Let x be Fig.1 towels: 2x + (35−x)+1 = 58 → x=22.",
    },
}

for n in QS:
    QS[n]["ans"] = KEY[n - 1]
    QS[n]["points"] = 3 if n <= 8 else (4 if n <= 16 else 5)

doc = fitz.open(PDF)

# Better question y positions: search multiple patterns
pos = {}
for i in range(doc.page_count):
    page = doc[i]
    for b in page.get_text("dict")["blocks"]:
        if b.get("type") != 0:
            continue
        for line in b.get("lines", []):
            s = "".join(sp["text"] for sp in line["spans"]).strip()
            m = re.match(r"^(\d{1,2})\s*[・\.．]?\s*", s)
            if not m:
                continue
            n = int(m.group(1))
            # accept if looks like a question start
            if 1 <= n <= 24 and (
                "・" in s
                or re.match(r"^\d{1,2}\s*[・\.．]", s)
                or (re.match(r"^\d{1,2}\.$", s) or re.match(r"^\d{1,2}\.\s", s))
            ):
                # prefer earliest on page for each n
                if n not in pos or pos[n][0] > i or (pos[n][0] == i and pos[n][1] > line["bbox"][1]):
                    # skip lone page numbers like "3" at bottom - those are short
                    if len(s) <= 3 and s.rstrip(".").isdigit():
                        continue
                    pos[n] = (i, line["bbox"][1], s[:60])

# Manual anchors from page layout when OCR missed numbers
MANUAL_POS = {
    # n: (page_index, y0, y1_or_None)
    3: (0, 560, 700),
    4: (0, 700, None),  # continues p2
    7: (2, 120, 590),
    8: (2, 590, None),
    10: (3, 430, 620),
    11: (4, 70, 330),
    15: (5, 300, 520),
    16: (5, 520, 740),
}

# Extract figure by clipping question band; for multi-page use first page band
print("auto pos:", {k: (v[0], round(v[1], 1)) for k, v in sorted(pos.items())})

for n in range(1, 25):
    if n in MANUAL_POS:
        pi, y0, y1 = MANUAL_POS[n]
        page = doc[pi]
        if y1 is None:
            y1 = page.rect.y1 - 40
        clip = fitz.Rect(45, y0, 550, y1)
    elif n in pos:
        pi, y0, _ = pos[n]
        page = doc[pi]
        # next question on same page
        same = [(nn, yy) for nn, (pp, yy, *_) in pos.items() if pp == pi and nn > n]
        if same:
            y1 = min(yy for _, yy in same) - 4
        else:
            y1 = page.rect.y1 - 35
        # also check MANUAL next
        clip = fitz.Rect(45, y0, 550, min(y1, page.rect.y1 - 30))
    else:
        print("NO POS", n)
        continue

    if clip.height < 40:
        print(f"Q{n} clip too short", clip)
        continue
    pix = page.get_pixmap(matrix=fitz.Matrix(2.8, 2.8), clip=clip)
    path = os.path.join(ASSETS, f"q{n}_figure.png")
    pix.save(path)
    im = Image.open(path).convert("RGB")
    a = np.array(im)
    mask = (a[:, :, 0] < 250) | (a[:, :, 1] < 250) | (a[:, :, 2] < 250)
    if mask.any():
        ys, xs = np.where(mask)
        pad = 6
        im = im.crop(
            (
                max(0, xs.min() - pad),
                max(0, ys.min() - pad),
                min(im.width, xs.max() + pad),
                min(im.height, ys.max() + pad),
            )
        )
        im.save(path)
    QS[n]["has_fig"] = True
    print(f"Q{n} fig {im.size}")

# Q4 spans p1-p2: also save a combined note — extract from p2 top for Chinese/options
# Improve Q4: clip from p2
page = doc[1]
pix = page.get_pixmap(matrix=fitz.Matrix(2.8, 2.8), clip=fitz.Rect(45, 55, 550, 270))
pix.save(os.path.join(ASSETS, "q4_figure_b.png"))
print("Q4 extra saved")

open(os.path.join(ROOT, "questions.json"), "w", encoding="utf-8").write(
    json.dumps(QS, ensure_ascii=False, indent=2)
)
print("questions.json written", len(QS))
