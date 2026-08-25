# -*- coding: utf-8 -*-
"""Build Math Kangaroo 2023 Level B (China / Ecolier grades 3–4) bilingual JSON."""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2023
SET1 = f"Math Kangaroo {YEAR} – Level B -1"
SET2 = f"Math Kangaroo {YEAR} – Level B -2"
FULL = f"Math Kangaroo {YEAR} – Level B"
CONTEST = f"Math Kangaroo {YEAR}"
LETTERS = "ABCDE"

# China Level B / Ecolier solutions + Think Academy Level 3–4
ANSWERS = {
    1: "D", 2: "C", 3: "B", 4: "C", 5: "C", 6: "E", 7: "C", 8: "E",
    9: "A", 10: "A", 11: "E", 12: "A", 13: "D", 14: "D", 15: "B", 16: "A",
    17: "C", 18: "B", 19: "B", 20: "D", 21: "B", 22: "B", 23: "D", 24: "E",
}
POINTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

TITLES = {
    1: ("Candle Burned First", "最先熄灭的蜡烛"),
    2: ("Kangaroo Coin Value", "袋鼠硬币面值"),
    3: ("Clock Face Holes", "钟面圆盘孔"),
    4: ("Puzzle Square Pieces", "拼成正方形"),
    5: ("Exactly Two Lights On", "恰好两灯同亮"),
    6: ("Fold Transparent Paper", "折叠透明纸"),
    7: ("Three-Disc Towers", "三层圆盘塔"),
    8: ("Glue on Black Circle", "粘在黑圆上"),
    9: ("Piece Covering the Dot", "盖住圆点的碎片"),
    10: ("Balanced Scale Weight", "天平旁的砝码"),
    11: ("Faded Ruler Marks", "褪色刻度尺"),
    12: ("Houses West of Road B", "路B西面的房屋"),
    13: ("Cars with Two People", "只坐两人的车"),
    14: ("Metro 96th Stop", "地铁第96站"),
    15: ("Colour Connected Circles", "圆圈最少着色"),
    16: ("Maze Wall Stickers", "迷宫贴纸顺序"),
    17: ("Kangaroos in a Line", "队列中的袋鼠"),
    18: ("Fold Cut Unfold", "对折剪角展开"),
    19: ("Entering Orders", "进入顺序"),
    20: ("Correct Clock", "正确的钟"),
    21: ("Adam’s Blue Marbles", "小亚的蓝弹珠"),
    22: ("Machines R and S", "机器R与S"),
    23: ("Circle Number Sums", "圆圈数字和"),
    24: ("Shaded Grid Guess", "阴影网格猜测"),
}

CHOICES_ABCDE = [{"en": L, "zh": L} for L in LETTERS]
CHOICES_TEXT = {
    2: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "5", "zh": "5"},
        {"en": "10", "zh": "10"}, {"en": "20", "zh": "20"}],
    3: [
        {"en": "4 and 9", "zh": "4 和 9"},
        {"en": "5 and 9", "zh": "5 和 9"},
        {"en": "5 and 10", "zh": "5 和 10"},
        {"en": "6 and 9", "zh": "6 和 9"},
        {"en": "7 and 12", "zh": "7 和 12"},
    ],
    4: [
        {"en": "1 and 2", "zh": "1 和 2"},
        {"en": "1 and 3", "zh": "1 和 3"},
        {"en": "1 and 4", "zh": "1 和 4"},
        {"en": "2 and 3", "zh": "2 和 3"},
        {"en": "2 and 4", "zh": "2 和 4"},
    ],
    5: [
        {"en": "2 minutes", "zh": "2 分钟"},
        {"en": "6 minutes", "zh": "6 分钟"},
        {"en": "8 minutes", "zh": "8 分钟"},
        {"en": "9 minutes", "zh": "9 分钟"},
        {"en": "10 minutes", "zh": "10 分钟"},
    ],
    7: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "4", "zh": "4"},
        {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    10: [
        {"en": "1 kg", "zh": "1 千克"},
        {"en": "2 kg", "zh": "2 千克"},
        {"en": "3 kg", "zh": "3 千克"},
        {"en": "4 kg", "zh": "4 千克"},
        {"en": "can’t be sure", "zh": "无法确定"},
    ],
    12: [{"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"},
         {"en": "7", "zh": "7"}, {"en": "8", "zh": "8"}],
    13: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    14: [{"en": "A", "zh": "A"}, {"en": "B", "zh": "B"}, {"en": "C", "zh": "C"},
         {"en": "D", "zh": "D"}, {"en": "E", "zh": "E"}],
    15: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    17: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    19: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "6", "zh": "6"}],
    21: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
         {"en": "6", "zh": "6"}, {"en": "0", "zh": "0"}],
    22: [
        {"en": "SRR", "zh": "SRR"},
        {"en": "RSR", "zh": "RSR"},
        {"en": "RSS", "zh": "RSS"},
        {"en": "RRS", "zh": "RRS"},
        {"en": "SRS", "zh": "SRS"},
    ],
    23: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
}

CONTENT = {
    1: (
        "Akira lights 5 identical candles all at the same time. They stopped burning at different times and now look as shown. Which candle stopped burning first?",
        "小安将 5 支相同的蜡烛同时点燃。蜡烛在不同时间停止燃烧，现在如图。哪支蜡烛最先停止燃烧？",
    ),
    2: (
        "The 2 kangaroo coins with the question mark have the same value. What is this value? 20+10+10+?+?+1=51",
        "标注问号的两枚袋鼠硬币面值相同。面值是多少？20+10+10+?+?+1=51",
    ),
    3: (
        "A gray circle with 2 large holes is put on a clock-face and turned around its center. Which 2 numbers is it possible to see at the same time?",
        "带两个孔的灰色圆盘放在钟面上并绕中心旋转。哪两个数字可能同时被看到？",
    ),
    4: (
        "Alice has puzzle pieces 1–4. Which 2 pieces can she put together to form the square shown?",
        "小艾有拼图 1–4。她可以用哪两块拼成图中的正方形？",
    ),
    5: (
        "A light engineer turns lights on and off using the plan shown. How long in total are exactly 2 of the lights on at the same time?",
        "灯光开关计划如图。恰好有 2 盏灯同时亮起的总时长是多少？",
    ),
    6: (
        "Kristoffer folds the transparent paper along the dashed line. What can he then see?",
        "小凯沿虚线折叠透明纸。他能看到什么图案？",
    ),
    7: (
        "Anna has 4 discs of different sizes. She builds a tower of 3 discs so every disc is smaller than the one below it. How many different towers can she make?",
        "小娜有 4 张大小不同的圆盘，建 3 层塔且每层都比下面小。能建多少种不同的塔？",
    ),
    8: (
        "Danny glued 2 pieces of paper on top of the black circle. What can he not obtain?",
        "小丹把两张纸粘在黑色圆上。他无法获得以下哪个图案？",
    ),
    9: (
        "The shape on the right is covered with the 5 pieces below. Which piece will cover the dot?",
        "右侧图形被下方 5 个碎片覆盖。哪个碎片会盖住圆点？",
    ),
    10: (
        "There are weights 1–6 kg. Rossitza puts five on the scales and one aside; the scales balance. Which weight did she put aside?",
        "砝码 1–6 千克。小罗放五个在天平上，剩一个旁置，天平平衡。旁置的是多重？",
    ),
    11: (
        "Ali’s 60 cm ruler has faded marks, but he can measure 10,20,30,40,50,60 cm using it only once. Which is Ali’s ruler?",
        "60 cm 尺部分刻度褪色，但一次测量可得 10–60 cm（每 10）。哪把是他的尺子？",
    ),
    12: (
        "7 houses north of Road A, 8 east of Road B, 5 south of Road A. How many houses are west of Road B?",
        "路 A 北 7 栋、路 B 东 8 栋、路 A 南 5 栋。路 B 西面有多少栋？",
    ),
    13: (
        "8 cars wait for the ferry; each has 2 or 3 people; 19 people total. How many cars contain exactly 2 people?",
        "8 辆车排队，每辆 2 或 3 人，共 19 人。恰好坐 2 人的车有几辆？",
    ),
    14: (
        "Metro stations A–F; train reverses at ends. Started at B, first stop C. Which is the 96th stop?",
        "地铁站 A–F，到终点折返。从 B 出发第一站 C。第 96 站是哪一站？",
    ),
    15: (
        "Hatice paints circles so any two connected by a line have different colours. Smallest number of colours needed?",
        "相连圆圈不同色。最少需要多少种颜色？",
    ),
    16: (
        "Sam walks the two-storey maze from entrance to exit, passing 3 wall stickers. In what order will she see them?",
        "小莎走过两层迷宫，路过三张贴纸。她按什么顺序看到它们？",
    ),
    17: (
        "6 beavers and 2 kangaroos in a line. Amongst any 3 consecutively numbered animals, exactly 1 is a kangaroo. Which numbered animal is a kangaroo?",
        "6 海狸 2 袋鼠站成一排；任意连续 3 个中恰有 1 只袋鼠。哪个编号是袋鼠？",
    ),
    18: (
        "Rebecca folds a square twice, cuts off one corner, then unfolds. What does the paper look like?",
        "正方形纸对折两次，剪掉一角再展开。展开后是什么样？",
    ),
    19: (
        "Hermione is never first, Harry never second, Ron never third. In how many different orders could they walk in?",
        "赫敏不当第一，哈利不当第二，罗恩不当第三。有多少种进入顺序？",
    ),
    20: (
        "Five clocks: one hour fast, one hour slow, one correct, two stopped. Which shows the correct time?",
        "五个钟：一个快一小时，一个慢一小时，一个正确，两个停走。哪个显示正确时间？",
    ),
    21: (
        "Adam and Brenda have 9 marbles each; together 8 red and 10 blue. Brenda has twice as many blue as red. How many blue marbles does Adam have?",
        "两人各 9 颗弹珠，共 8 红 10 蓝；小布蓝是红的两倍。小亚有几颗蓝弹珠？",
    ),
    22: (
        "Machine R rotates 90° clockwise; machine S stamps ♣. In which order are the machines used to produce the result shown?",
        "机器 R 顺时针转 90°，机器 S 盖章 ♣。要得到图示结果，机器顺序是？",
    ),
    23: (
        "Write 1–7 in circles so neighbouring sums match the labels. What number must be in the green/shaded circle?",
        "把 1–7 写入圆圈，相邻和如图。阴影圆圈必须写几？",
    ),
    24: (
        "Maria shaded exactly 5 cells in a 4×4 grid. One friend is right; each of the others has four cells correct. Which is the correct grid?",
        "4×4 中恰涂 5 格。一人全对，其余每人猜对 4 个阴影格。哪个是正确网格？",
    ),
}

EXPL = {
    1: ("Identical candles: first out is the one that decreased least (shortest leftover).", "相同蜡烛：最先熄灭的是烧得最少、剩余最短的那支。"),
    2: ("51−20−10−10−1=10 for two equal coins ⇒ each 5.", "两枚问号共 10，每枚 5。"),
    3: ("The holes are 4 hours apart; only 5 and 9 fit.", "两孔相差 4 小时；只有 5 和 9 符合。"),
    4: ("Pieces 1 and 4 fit the square.", "拼图 1 与 4 能拼成正方形。"),
    5: ("Exactly two lights are on for 8 of the minutes shown.", "恰好两灯同亮共 8 分钟。"),
    6: ("Fold along the dashed line and match overlays.", "沿虚线对折后对照图案。"),
    7: ("Choose any 3 of 4 sizes; only one stacking order each ⇒ C(4,3)=4.", "从 4 盘中选 3 盘，大小顺序唯一 ⇒ 4 种。"),
    8: ("All options except E can be obtained by stacking the two pieces.", "除 E 外均可由两片叠出。"),
    9: ("Tiling forces piece A over the dot.", "铺满后圆点被 A 覆盖。"),
    10: ("Aside weight 1 kg matches the pictured balanced scale.", "旁置 1 kg 与图中天平一致。"),
    11: ("Marks at 10 and 40 allow all required lengths once.", "刻度 10、40 可一次量出全部所需长度。"),
    12: ("All houses = 7+5=12; west of B = 12−8=4.", "总房屋 12；路 B 西 =12−8=4。"),
    13: ("2a+3(8−a)=19 ⇒ a=5.", "2a+3(8−a)=19 ⇒ a=5。"),
    14: ("Period 10; 96 mod 10 = 6 → station D.", "周期 10；96÷10 余 6 → D 站。"),
    15: ("Graph colouring needs 3 colours.", "图着色最少 3 色。"),
    16: ("Path order: frog, then rhino, then shark.", "路径顺序：青蛙→犀牛→鲨鱼。"),
    17: ("Only positions 3 and 6 work; so 3 is a kangaroo.", "袋鼠只能在 3 与 6；故选 3。"),
    18: ("Two folds then cut corner unfolds to option B.", "对折两次剪角展开对应 B。"),
    19: ("Only two orders: H→Hermione→Ron and H→Ron→Hermione.", "仅两种：哈→赫→罗，哈→罗→赫。"),
    20: ("Correct time is 3 o’clock — clock D.", "正确时间是 3 点，钟 D。"),
    21: ("Brenda 6 blue + 3 red; Adam has 4 blue.", "小布 6 蓝 3 红；小亚蓝弹珠 4。"),
    22: ("Two clockwise turns with stamp between ⇒ RSR.", "盖章前后各转一次 ⇒ RSR。"),
    23: ("Neighbour sums force 4 in the shaded circle.", "相邻和推出阴影格为 4。"),
    24: ("Only grid E is fully correct while others share exactly 4 shaded cells with it.", "只有 E 全对，且与其余各恰重叠 4 个阴影格。"),
}


def set_title(n: int) -> str:
    return SET1 if n <= 12 else SET2


def make_item(n: int) -> dict:
    letter = ANSWERS[n]
    en_t, zh_t = TITLES[n]
    st = set_title(n)
    en_c, zh_c = CONTENT[n]
    en_e, zh_e = EXPL[n]
    return {
        "title": {"en": f"{st} Q{n}: {en_t}", "zh": f"{st} 第{n}题：{zh_t}"},
        "type": "single_choice",
        "content": {"en": en_c, "zh": zh_c},
        "choices": CHOICES_TEXT.get(n, CHOICES_ABCDE),
        "correct_answer": LETTERS.index(letter) + 1,
        "explanation": {"en": en_e, "zh": zh_e},
        "meta": {
            "contest": CONTEST,
            "level_en": "Level B (Grades 3–4)",
            "level_zh": "等级 B（3–4 年级）",
            "question_number": n,
            "points": POINTS[n],
            "answer_letter": letter,
            "set_title": st,
        },
        "is_published": True,
    }


def dump(name: str, items: list) -> None:
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("wrote", path, len(items))


def main():
    items = [make_item(n) for n in range(1, 25)]
    dump(f"{SET1}.json", items[:12])
    dump(f"{SET2}.json", items[12:])
    dump(f"{FULL}.json", items)


if __name__ == "__main__":
    main()
