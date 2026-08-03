# -*- coding: utf-8 -*-
"""Build bilingual single_choice JSON from Math Kangaroo 2025 China Level B PDF.
Set titles: Math Kangaroo 2025 – Level 2-1 / Level 2-2.
"""
import json
import os

OUT = r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\B-2025"

# Answers from solutions section in the same PDF (China Level B / Ecolier)
ANSWERS = {
    1: "E",
    2: "C",
    3: "E",
    4: "B",
    5: "A",
    6: "E",
    7: "B",
    8: "E",
    9: "B",
    10: "B",
    11: "B",
    12: "E",
    13: "B",
    14: "D",
    15: "C",
    16: "E",
    17: "D",
    18: "B",
    19: "D",
    20: "C",
    21: "B",
    22: "A",
    23: "C",
    24: "A",
}
IDX = {L: i + 1 for i, L in enumerate("ABCDE")}


def fig():
    return [{"en": L, "zh": L} for L in "ABCDE"]


def num(*vals):
    return [{"en": str(v), "zh": str(v)} for v in vals]


def txt(pairs):
    return [{"en": a, "zh": b} for a, b in pairs]


BANK = [
    dict(
        n=1,
        pts=3,
        title=("Building a 3×3×3 Cube", "搭建 3×3×3 立方体"),
        content=(
            "Mia is joining small cubes, adding one at a time, to build a 3×3×3 cube. "
            "She took pictures at 5 different moments. What does Mia’s third picture look like?",
            "小米正在用小立方体搭建一个 3×3×3 的大立方体，每次添加一块小立方体。"
            "她在五个不同的时刻拍下照片。请问小米拍的第三张照片是什么样子？",
        ),
        choices=fig(),
        explain=(
            "As cubes are added, the count increases. The photo order is D, B, E, A, C; the third is E.",
            "小立方体数量逐渐增加，五张照片顺序为 D、B、E、A、C，第三张是 E。",
        ),
    ),
    dict(
        n=2,
        pts=3,
        title=("Largest Result with Digits 2025", "用 2、0、2、5 得到最大结果"),
        content=(
            "Simona writes the four digits 2, 0, 2, 5 in the four boxes. "
            "Which order would give her the largest result?",
            "小西将 2、0、2、5 四个数字填入四个方框中。请问哪种顺序能让她得到最大的结果？",
        ),
        choices=txt(
            [
                ("5, 2, 2, 0", "5, 2, 2, 0"),
                ("5, 2, 0, 2", "5, 2, 0, 2"),
                ("5, 0, 2, 2", "5, 0, 2, 2"),
                ("2, 2, 5, 0", "2, 2, 5, 0"),
                ("2, 2, 0, 5", "2, 2, 0, 5"),
            ]
        ),
        explain=(
            "One digit is subtracted and the other three are added. Subtract the smallest digit 0: 5−0+2+2=9.",
            "一个数被减去、另外三个相加。减去最小的 0：5−0+2+2=9，最大。",
        ),
    ),
    dict(
        n=3,
        pts=3,
        title=("Which Rope Ties a Knot", "哪根绳子会打结"),
        content=(
            "Which rope ties into a knot when the ends are pulled?",
            "请问下面哪根绳子在两端拉紧时会打成结？",
        ),
        choices=fig(),
        explain=(
            "Only a rope that forms a tightening loop (under–over–under) will knot; that is E.",
            "只有形成收紧环（一股从另一股下、上、再下穿过）的绳子会打结，即 E。",
        ),
    ),
    dict(
        n=4,
        pts=3,
        title=("Tracks Beneath the Shoe", "鞋底下的印记"),
        content=(
            "Alex stepped on some tracks on the ground. What is beneath her shoe?",
            "小艾踩到了地上的一些印记。请问她鞋底的图案是什么样子？",
        ),
        choices=fig(),
        explain=(
            "Connecting the visible tracks shows the pattern matches option B.",
            "把可见印记连起来，图案对应选项 B。",
        ),
    ),
    dict(
        n=5,
        pts=3,
        title=("Normal Dice Opposite Faces", "标准骰子相对面"),
        content=(
            "On a normal dice, the total number of spots on two opposite faces is always 7. "
            "Which one of the dice shown could be a normal dice?",
            "在一个标准的骰子上，相对的两个面上的点数之和总是 7。"
            "请问下面哪个骰子可能是一个标准的骰子？",
        ),
        choices=fig(),
        explain=(
            "Pairs 1–6, 2–5, 3–4 must be opposite. Only A does not force any of these pairs to be adjacent.",
            "1 与 6、2 与 5、3 与 4 必须相对。只有 A 不会迫使这些对数相邻。",
        ),
    ),
    dict(
        n=6,
        pts=3,
        title=("Spinning Sail", "旋转的风车"),
        content=(
            "Larissa spins her sail. Which of the sails below is hers?",
            "小拉在旋转她的风车。请问下面哪个风车是她的？",
        ),
        choices=fig(),
        explain=(
            "Two black fields are opposite; the gray field is clockwise next to a black field → E.",
            "两块黑色相对，灰色在黑色顺时针相邻处，对应 E。",
        ),
    ),
    dict(
        n=7,
        pts=3,
        title=("Kenny Jumps to a House", "袋鼠小肯跳到哪座房子"),
        content=(
            "Kenny the Kangaroo jumps from the School to the Zoo as follows: ↑2, ↖2, ↙1, ←4. "
            "Then from the Zoo: →5, ↗2, ↑2. Which house will he get to?",
            "袋鼠小肯从学校跳到动物园：↑2, ↖2, ↙1, ←4。"
            "再从动物园：→5, ↗2, ↑2。请问它会跳到哪座房子？",
        ),
        choices=fig(),
        explain=(
            "Following the path from the Zoo leads to house B.",
            "从动物园按路线走，到达房子 B。",
        ),
    ),
    dict(
        n=8,
        pts=3,
        title=("Pinwheel with Three Rods", "三根小棒搭风车"),
        content=(
            "Which pinwheel can Jorge build with these 3 rods?",
            "请问小豪可以用这 3 根小棒搭建出哪个风车？",
        ),
        choices=fig(),
        explain=(
            "The rod with two green triangles has both on the same side; only E matches all three rods.",
            "带两个绿色三角形的小棒上两三角形同侧，只有 E 能用这三根小棒搭成。",
        ),
    ),
    dict(
        n=9,
        pts=4,
        title=("Shells and Marbles Value 15", "贝壳与弹珠总值 15"),
        content=(
            "Nico and his little sister pay with shells and marbles. "
            "Each shell has value 6 and each marble has value 1. Which has a total value of 15?",
            "小尼和妹妹用贝壳和弹珠支付。每个贝壳价值 6，每个弹珠价值 1。"
            "请问下列哪个选项的总价值是 15？",
        ),
        choices=fig(),
        explain=(
            "Option B: 1 shell + 9 marbles = 6+9 = 15.",
            "选项 B：1 个贝壳 + 9 个弹珠 = 6+9 = 15。",
        ),
    ),
    dict(
        n=10,
        pts=4,
        title=("Sharing Kangaroo Cookies", "分享袋鼠饼干"),
        content=(
            "Anna, Bonnie and Caspar have some kangaroo cookies on their plates, as shown. "
            "They share the remaining 15 cookies so everyone has the same number. "
            "How many more cookies does Bonnie get?",
            "小安、小波和小卡盘子里各有一些袋鼠饼干。他们分享托盘上剩余的 15 块饼干，"
            "使每人数量相同。请问小波又得到了多少块饼干？",
        ),
        choices=num(4, 5, 6, 7, 8),
        explain=(
            "They have 3, 4, 5 cookies; total with 15 is 27, so each gets 9. Bonnie needs 9−4=5 more.",
            "已有 3、4、5 块，加上 15 共 27，每人 9 块。小波还需 9−4=5 块。",
        ),
    ),
    dict(
        n=11,
        pts=4,
        title=("Whose Phone Is Edward’s", "哪部手机是小爱的"),
        content=(
            "In the morning, 5 friends had identical fully-charged phones. "
            "By evening, Bob had spoken as much as Ann and Cristina together. "
            "Bob ran out of power. David had not used his phone at all. Which phone belonged to Edward?",
            "早上 5 个朋友各有一部满电的相同手机。晚上小鲍的通话时间等于小安和小克之和。"
            "小鲍手机没电了，小戴完全没用手机。请问哪部手机是小爱的？",
        ),
        choices=num(1, 2, 3, 4, 5),
        explain=(
            "Bob is phone 3 (empty), David is phone 1 (full). Phones 4 and 5 sum to one full battery "
            "(Ann & Cristina). Phone 2 is Edward’s.",
            "小鲍是 3 号（没电），小戴是 1 号（满电）。4 与 5 电量相加等于一整格（小安、小克）。"
            "2 号属于小爱。",
        ),
    ),
    dict(
        n=12,
        pts=4,
        title=("Complete the Chessboard", "补全棋盘"),
        content=(
            "Which two of the pieces shown below complete the chessboard?",
            "请问下面哪两块碎片可以补全这个棋盘？",
        ),
        choices=txt(
            [
                ("Pieces 1 and 2", "碎片 1 和 2"),
                ("Pieces 1 and 5", "碎片 1 和 5"),
                ("Pieces 3 and 4", "碎片 3 和 4"),
                ("Pieces 3 and 5", "碎片 3 和 5"),
                ("Pieces 4 and 5", "碎片 4 和 5"),
            ]
        ),
        explain=(
            "After rotating, pieces 4 and 5 fit the holes with correct coloring.",
            "旋转后，碎片 4 和 5 形状与着色都吻合缺口。",
        ),
    ),
    dict(
        n=13,
        pts=4,
        title=("Food for Six Sheep", "六只羊的干粮"),
        content=(
            "Renée feeds 6 sheep a total of 210 grams of dry food. "
            "The smallest sheep gets twice as much as each of the others. "
            "How much does the smallest sheep get?",
            "小芮给 6 只羊共分发 210 克干粮。最小的羊获得的是其他每只羊的两倍。"
            "请问最小的羊得到了多少克干粮？",
        ),
        choices=txt(
            [
                ("55 grams", "55 克"),
                ("60 grams", "60 克"),
                ("70 grams", "70 克"),
                ("75 grams", "75 克"),
                ("80 grams", "80 克"),
            ]
        ),
        explain=(
            "Count the small sheep as two shares: 7 shares of 30 g; smallest gets 60 g.",
            "把最小的羊算作两份：共 7 份，每份 30 克，最小的羊得 60 克。",
        ),
    ),
    dict(
        n=14,
        pts=4,
        title=("Pizza Cuts Equal Tomatoes", "披萨均分番茄"),
        content=(
            "Tom wishes to slice a pizza into 2 halves with the same number of tomatoes on each half. "
            "It is possible with two different cuts. Along which lines could he cut?",
            "小汤想把披萨切成两半，且每半番茄数量相同。已知有两种不同切法可以实现。"
            "请问他可以沿着哪些线来切？",
        ),
        choices=txt(
            [
                ("1 and 3", "1 和 3"),
                ("1 and 4", "1 和 4"),
                ("2 and 3", "2 和 3"),
                ("2 and 4", "2 和 4"),
                ("3 and 4", "3 和 4"),
            ]
        ),
        explain=(
            "Cuts 2 and 4 each give 9 tomatoes on both halves.",
            "沿 2 和沿 4 切割时，两边番茄都是 9 个。",
        ),
    ),
    dict(
        n=15,
        pts=4,
        title=("Number Pyramid Star", "数字金字塔中的星号"),
        content=(
            "Maria fills the circles with 1–7. Each lower circle equals the sum of the two connected "
            "circles above it. What number is in the circle marked with ★?",
            "小玛在圆圈里填入 1–7。下方每个圆圈等于上方相连两圆之和。"
            "请问标有 ★ 的圆圈里的数字是什么？",
        ),
        choices=num(2, 3, 4, 5, 7),
        explain=(
            "Working from the given 6, the star (bottom middle) must be 4.",
            "由已给出的 6 推导，★（下排中间）是 4。",
        ),
    ),
    dict(
        n=16,
        pts=4,
        title=("Fourth Piece of the Square", "正方形的第四块"),
        content=(
            "Bob makes a square from 4 rectangular pieces. 3 of the pieces he uses are shown. "
            "Which of the following is the fourth piece he uses?",
            "小鲍用 4 块长方形碎片拼出一个正方形。其中 3 块如图所示。"
            "请问下列哪个选项是他用的第四块碎片？",
        ),
        choices=fig(),
        explain=(
            "The square is 6×6=36 cells; three pieces use 24, so the fourth has 12 cells — option E.",
            "大正方形为 6×6=36 格，三块共 24 格，第四块 12 格，对应 E。",
        ),
    ),
    dict(
        n=17,
        pts=5,
        title=("Ladybirds Fourth Photo", "瓢虫第四张照片"),
        content=(
            "6 ladybirds have 1, 2, 3, 4, 5 or 6 spots. Marta took 4 photos of groups of 3. "
            "Each ladybird appeared the same number of times. How many spots do the three ladybirds "
            "in the fourth photo have in total?",
            "6 只瓢虫斑点分别为 1–6。小玛拍了 4 张照片，每张 3 只，每只出现次数相同。"
            "请问第四张照片里三只瓢虫斑点总数是多少？",
        ),
        choices=num(9, 10, 11, 12, 23),
        explain=(
            "Ladybirds 1,3,5 appear twice in the first three photos; 2,4,6 once. "
            "The fourth photo has 2+4+6=12.",
            "前三张中 1、3、5 各出现两次，2、4、6 各一次。第四张是 2+4+6=12。",
        ),
    ),
    dict(
        n=18,
        pts=5,
        title=("Paper Snowflake Cuts", "纸雪花裁剪"),
        content=(
            "Nela folds a paper square in half and then in half again. She cuts pieces out. "
            "After unfolding she sees a paper snowflake. How did she cut the folded piece of paper?",
            "小娜把正方形纸对折两次后剪掉几块，展开后得到纸雪花。"
            "请问她是如何裁剪这张折好的纸的？",
        ),
        choices=fig(),
        explain=(
            "Each quarter of the snowflake matches cutting pattern B.",
            "雪花每一象限的图案对应裁剪方式 B。",
        ),
    ),
    dict(
        n=19,
        pts=5,
        title=("Black and Grey Pyramid", "黑灰立方体金字塔"),
        content=(
            "Leonia built a pyramid with black and grey cubes so that no face of a cube touches "
            "another cube of the same colour. One black cube is shown. "
            "What will the pyramid look like from above?",
            "小莉用黑、灰立方体搭金字塔，同色立方体面不相贴。其中一个黑色立方体如图所示。"
            "请问从上面看，金字塔是什么样子？",
        ),
        choices=fig(),
        explain=(
            "The cube under the shown black must be grey, forcing bottom X,Z black and Y grey → D.",
            "图中黑块正下方必为灰，从而底层 X、Z 为黑、Y 为灰，俯视图为 D。",
        ),
    ),
    dict(
        n=20,
        pts=5,
        title=("Calendar First Day", "日历第一天是星期几"),
        content=(
            "The picture shows one month of a calendar without dates. "
            "The total of the dates for the 2 shaded days is 31. "
            "On what day of the week does the first day of the month fall?",
            "图中展示了一个月的日历页（未标日期）。两个阴影日期之和是 31。"
            "请问这个月的第一天是星期几？",
        ),
        choices=txt(
            [
                ("Monday", "星期一"),
                ("Tuesday", "星期二"),
                ("Wednesday", "星期三"),
                ("Thursday", "星期四"),
                ("Sunday", "星期日"),
            ]
        ),
        explain=(
            "The shaded dates differ by 13 and sum to 31 → 9 and 22. Day 1 is 8 days before the 9th → Wednesday.",
            "两日期相差 13 且和为 31，即 9 与 22。1 号比 9 号早 8 天，是星期三。",
        ),
    ),
    dict(
        n=21,
        pts=5,
        title=("Size of Each Brick", "每块砖的尺寸"),
        content=(
            "The construction uses 11 identical bricks. It has length 100 cm and width 60 cm. "
            "What is the size of each brick?",
            "如图建筑使用了 11 块相同的砖，长 100 cm、宽 60 cm。请问每块砖的尺寸是多少？",
        ),
        choices=txt(
            [
                ("40 cm × 8 cm", "40 cm × 8 cm"),
                ("40 cm × 10 cm", "40 cm × 10 cm"),
                ("40 cm × 12 cm", "40 cm × 12 cm"),
                ("44 cm × 9 cm", "44 cm × 9 cm"),
                ("50 cm × 10 cm", "50 cm × 10 cm"),
            ]
        ),
        explain=(
            "Height is 6 brick-heights: 60÷6=10 cm. Length is 4×height=40 cm → 40×10.",
            "高度为 6 块砖高：60÷6=10 cm；砖长为高的 4 倍=40 cm，即 40×10。",
        ),
    ),
    dict(
        n=22,
        pts=5,
        title=("How Many Bananas", "有多少根香蕉"),
        content=(
            "Rossitza listed counts of different fruits; some digits are covered by paint. "
            "In total she has 106 pieces. Two types have equal counts; one type is twice another. "
            "She has more than 10 of each type. How many bananas does she have?",
            "小罗写下了各种水果数量，部分数字被颜料遮住。一共 106 个；有两种数量相同；"
            "有一种是另一种的两倍；每种都超过 10 个。请问她有多少根香蕉？",
        ),
        choices=num(13, 23, 43, 53, 63),
        explain=(
            "Apples=oranges=30; mangoes=2×pears with pears≥11 → mangoes≥22. "
            "Minimum for four types is 93, so bananas ≤13 and >10 → 13.",
            "苹果=橙子=30；芒果是梨的两倍且梨≥11→芒果≥22。前四种至少 93，香蕉≤13 且>10，故为 13。",
        ),
    ),
    dict(
        n=23,
        pts=5,
        title=("Least Water After Removing Balls", "取出球后水最少的试管"),
        content=(
            "Identical balls are in 5 identical test tubes; then water is added. "
            "Levels in tubes 1–3 are the same; levels in 4–5 are the same and twice as high. "
            "After all balls are removed, which test tube has the least water?",
            "5 个相同试管中放入相同的球后加水。试管 1–3 水位相同；4 与 5 水位相同且为前三者两倍。"
            "取出所有球后，哪个试管里的水最少？",
        ),
        choices=txt(
            [
                ("Test tube 1", "试管 1"),
                ("Test tube 2", "试管 2"),
                ("Test tube 3", "试管 3"),
                ("Test tube 4", "试管 4"),
                ("Test tube 5", "试管 5"),
            ]
        ),
        explain=(
            "With the same water level, more balls mean less water. Tube 3 has the least among 1–3; "
            "tube 5 has twice tube 3’s water, so tube 3 has the least overall.",
            "同水位时球越多水越少。1–3 中 3 最少；5 的水量是 3 的两倍，故整体最少是试管 3。",
        ),
    ),
    dict(
        n=24,
        pts=5,
        title=("Mass of One Star", "一颗星的质量"),
        content=(
            "A pair of scales weighs 3 different objects (results shown). "
            "Each type has a different mass from {1,2,3,4,5} kg. "
            "What is the mass of one ★ in kilograms?",
            "用天平称量 3 种不同物体（结果如图）。每种质量不同，可能是 1–5 千克。"
            "请问一颗 ★ 的质量是多少千克？",
        ),
        choices=num(1, 2, 3, 4, 5),
        explain=(
            "Circle=5, square=3, star=1 satisfies both weighings.",
            "圆=5、方=3、星=1 满足两次称量结果。",
        ),
    ),
]


def make_item(q):
    letter = ANSWERS[q["n"]]
    n = q["n"]
    set_title = (
        "Math Kangaroo 2025 – Level 2-1" if n <= 12 else "Math Kangaroo 2025 – Level 2-2"
    )
    en_d, zh_d = q["title"]
    return {
        "title": {
            "en": f"{set_title} Q{n}: {en_d}",
            "zh": f"{set_title} 第{n}题：{zh_d}",
        },
        "type": "single_choice",
        "content": {"en": q["content"][0], "zh": q["content"][1]},
        "choices": q["choices"],
        "correct_answer": IDX[letter],
        "explanation": {"en": q["explain"][0], "zh": q["explain"][1]},
        "meta": {
            "contest": "Math Kangaroo 2025 (China) – Level B",
            "set_title": set_title,
            "level_en": "Level B / Level 2 (Grades 3–4)",
            "level_zh": "等级 B / Level 2（3–4 年级）",
            "question_number": n,
            "points": q["pts"],
            "answer_letter": letter,
            "source_pdf": "2025 等级B：3-4年级.pdf",
        },
        "is_published": True,
    }


def main():
    os.makedirs(OUT, exist_ok=True)
    items = [make_item(q) for q in BANK]
    part1, part2 = items[:12], items[12:]
    files = {
        "Math Kangaroo 2025 – Level 2-1.json": part1,
        "Math Kangaroo 2025 – Level 2-2.json": part2,
        "Math Kangaroo 2025 – Level 2.json": items,
    }
    for name, data in files.items():
        path = os.path.join(OUT, name)
        ens = [q["title"]["en"] for q in data]
        assert len(set(ens)) == len(ens), ens
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("wrote", name, len(data), data[0]["title"]["en"])


if __name__ == "__main__":
    main()
