# -*- coding: utf-8 -*-
"""Build Math Kangaroo 2016 Level B (China / Ecolier grades 3–4) bilingual JSON.
Paper has 20 questions: Q1–10 = 3 pts, Q11–20 = 4 pts.
Answers: KMC 2016 Ecolier key."""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2016
SET1 = f"Math Kangaroo {YEAR} – Level B -1"
SET2 = f"Math Kangaroo {YEAR} – Level B -2"
FULL = f"Math Kangaroo {YEAR} – Level B"
CONTEST = f"Math Kangaroo {YEAR}"
LETTERS = "ABCDE"

ANSWERS = {
    1: "E", 2: "E", 3: "A", 4: "A", 5: "D", 6: "B", 7: "A", 8: "B", 9: "B", 10: "C",
    11: "D", 12: "A", 13: "C", 14: "D", 15: "B", 16: "D", 17: "C", 18: "C", 19: "E", 20: "B",
}
POINTS = {i: (3 if i <= 10 else 4) for i in range(1, 21)}

TITLES = {
    1: ("Largest Dice Total", "骰子点数最大"),
    2: ("Kanga Turns 8 Weeks", "小袋鼠满八周"),
    3: ("Arrow Number Puzzle", "箭头算式求值"),
    4: ("Pipo in the Mirror", "Pipo 照镜子"),
    5: ("Circus Seat Direction", "马戏团座位方向"),
    6: ("Sharing Half Apples", "分享半个苹果"),
    7: ("Hidden Behind Curtain", "窗帘后的形状"),
    8: ("Year Digit Sum 9", "年份数字和为9"),
    9: ("Mouse Maze Paths", "老鼠迷宫路线"),
    10: ("Zoe’s Hidden Numbers", "Zoe 卡上的数字"),
    11: ("Triangle Above Square", "三角形在正方形上"),
    12: ("Three Pieces Make Square", "三片拼正方形"),
    13: ("Shaded Cells Sum", "涂黑格数字和"),
    14: ("Turn the Card Over", "翻转卡片"),
    15: ("Four Brothers’ Ages", "四兄弟年龄和"),
    16: ("Magic Trees Fruit", "魔幻树的水果"),
    17: ("Cats Legs and Noses", "猫的腿与鼻子"),
    18: ("Replace 201 with 102", "把201换成102"),
    19: ("Breaking Brick Bars", "切开砖条"),
    20: ("Sparrows Chirping", "麻雀转头呼叫"),
}

CHOICES_ABCDE = [{"en": L, "zh": L} for L in LETTERS]
CHOICES_TEXT = {
    1: [{"en": "Amy", "zh": "Amy"}, {"en": "Bert", "zh": "Bert"}, {"en": "Carl", "zh": "Carl"},
        {"en": "Doris", "zh": "Doris"}, {"en": "Ernst", "zh": "Ernst"}],
    2: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
        {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    3: [{"en": "24", "zh": "24"}, {"en": "28", "zh": "28"}, {"en": "36", "zh": "36"},
        {"en": "56", "zh": "56"}, {"en": "80", "zh": "80"}],
    6: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
        {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    7: [
        {"en": "Triangle", "zh": "三角形"},
        {"en": "Square", "zh": "正方形"},
        {"en": "Hexagon", "zh": "六边形"},
        {"en": "Circle", "zh": "圆形"},
        {"en": "Rectangle", "zh": "长方形"},
    ],
    8: [{"en": "2007", "zh": "2007"}, {"en": "2025", "zh": "2025"}, {"en": "2034", "zh": "2034"},
        {"en": "2108", "zh": "2108"}, {"en": "2134", "zh": "2134"}],
    9: [{"en": "2", "zh": "2"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
        {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    10: [
        {"en": "7 & 0", "zh": "7 和 0"},
        {"en": "8 & 1", "zh": "8 和 1"},
        {"en": "11 & 4", "zh": "11 和 4"},
        {"en": "9 & 2", "zh": "9 和 2"},
        {"en": "6 & 3", "zh": "6 和 3"},
    ],
    11: [{"en": "0", "zh": "0"}, {"en": "1", "zh": "1"}, {"en": "2", "zh": "2"},
         {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}],
    12: [
        {"en": "1, 3, 5", "zh": "1, 3, 5"},
        {"en": "1, 2, 5", "zh": "1, 2, 5"},
        {"en": "1, 4, 5", "zh": "1, 4, 5"},
        {"en": "3, 4, 5", "zh": "3, 4, 5"},
        {"en": "2, 3, 5", "zh": "2, 3, 5"},
    ],
    13: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    15: [{"en": "25", "zh": "25"}, {"en": "27", "zh": "27"}, {"en": "29", "zh": "29"},
         {"en": "30", "zh": "30"}, {"en": "60", "zh": "60"}],
    16: [{"en": "35", "zh": "35"}, {"en": "40", "zh": "40"}, {"en": "45", "zh": "45"},
         {"en": "50", "zh": "50"}, {"en": "56", "zh": "56"}],
    17: [{"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"},
         {"en": "8", "zh": "8"}, {"en": "9", "zh": "9"}],
    18: [{"en": "1815", "zh": "1815"}, {"en": "1914", "zh": "1914"}, {"en": "1917", "zh": "1917"},
         {"en": "2115", "zh": "2115"}, {"en": "2118", "zh": "2118"}],
    20: [
        {"en": "Angel", "zh": "Angel"},
        {"en": "Bertha", "zh": "Bertha"},
        {"en": "Charlie", "zh": "Charlie"},
        {"en": "David", "zh": "David"},
        {"en": "Eglio", "zh": "Eglio"},
    ],
}

CONTENT = {
    1: (
        "Amy, Bert, Carl, Doris and Ernst each rolled two dice and added the number of dots. Who rolled the largest total?",
        "Amy、Bert、Carl、Doris 和 Ernst 各掷了两颗骰子并把点数相加。谁的点数之和最大？",
    ),
    2: (
        "Small Kanga is 7 weeks and 2 days old. In how many days will he be 8 weeks old?",
        "小 Kanga 现在 7 个星期又 2 天大。再过多少天他会满 8 个星期？",
    ),
    3: (
        "Follow the arrows in the diagram. What number replaces the question mark?",
        "按图中箭头运算。问号处应填什么数？",
    ),
    4: (
        "What does Pipo see when he looks at himself in the mirror?",
        "Pipo 照镜子时将看见什么？",
    ),
    5: (
        "Geoff goes with his father to a circus. Their seats are numbered 71 and 72. Which way should they go?",
        "Geoff 和他爸爸去马戏团，座位编号是 71 和 72。他们应向哪个方向走？",
    ),
    6: (
        "Anna shares some apples between herself and 5 friends (6 people total). Everyone gets half an apple. How many apples does she share?",
        "Anna 与 5 位朋友（共 6 人）分享苹果，每人半个。她一共分享了多少个苹果？",
    ),
    7: (
        "A rectangle is partly hidden behind a curtain. What shape is the hidden part?",
        "一个长方形的一部分藏在窗帘后面。被隐藏的部分是什么形状？",
    ),
    8: (
        "The digit sum of 2016 is 2+0+1+6=9. What is the nearest year after 2016 whose digits also sum to 9?",
        "2016 的数字之和为 9。2016 年之后，下一个数字之和同样为 9 的最近年份是哪一年？",
    ),
    9: (
        "The mouse wants to escape from the maze. How many different paths can it take without passing through the same gate more than once?",
        "老鼠想逃出迷宫。在不经过同一扇门超过一次的情况下，有几条逃脱路线？",
    ),
    10: (
        "Zoe has two cards with a number on each side. The two side-sums are equal; the four numbers sum to 32. What could the two hidden numbers be?",
        "Zoe 有两张卡，每面一个数。两张卡各自两面之和相等，四个数之和为 32。看不见的两面可能是哪两个数？",
    ),
    11: (
        "Five children each stacked a square, a triangle and a circle. The teacher removed all circles. How many piles have the triangle above the square?",
        "五位孩子各把正方形、三角形、圆形纸片堆起来。老师拿走所有圆形后，有几堆是三角形在正方形之上？",
    ),
    12: (
        "Which three of the five jigsaw pieces can be joined to form a square?",
        "下列五片拼图中，哪三片可以拼成一个正方形？",
    ),
    13: (
        "Each row and column of the table must contain 1, 2 and 3 exactly once. What is the sum of the numbers in the two shaded squares?",
        "表格每行每列的 1、2、3 各出现一次。两个涂黑格子里的数字之和是多少？",
    ),
    14: (
        "After turning a card over around its right side we see the figure. What do we see if we turn it over around its upper side?",
        "沿右边翻转卡片后看到图中一面。若沿上边翻转，会看到哪一面？",
    ),
    15: (
        "Tim, Tom and Jim are triplets; Paul is exactly 3 years older. Which number can be the sum of the four brothers’ ages?",
        "Tim、Tom、Jim 是三胞胎，哥哥 Paul 正好大 3 岁。下列哪个可能是四兄弟年龄之和？",
    ),
    16: (
        "Each magic tree has either 6 pears & 3 apples, or 8 pears & 4 apples. There are 25 apples. How many pears are there?",
        "每棵魔幻树有 6 梨+3 苹果，或 8 梨+4 苹果。果园共 25 个苹果，有多少个梨？",
    ),
    17: (
        "My cats have 18 more legs than noses. How many cats do I have?",
        "我的猫腿的总数比鼻子总数多 18。我有多少只猫？",
    ),
    18: (
        "Rachel adds seven numbers and gets 2016. One number is 201; she replaces it with 102. What answer does she get?",
        "Rachel 把七个数加得 2016，其中有一个 201。把 201 换成 102 后再加，得到什么？",
    ),
    19: (
        "Malte has a bar of 27 bricks. He repeatedly breaks a bar into two bars where one is twice the other. Which bar can he not get?",
        "Malte 有 27 块砖的砖条，反复切成一条是另一条两倍长的两段。他不可能得到下列哪段？",
    ),
    20: (
        "Five sparrows chirp as many times as the sparrows they see. After one turns around, the total chirps increase. Which sparrow turned?",
        "五只麻雀呼叫次数等于它看见的麻雀数。一只转头后，呼叫总数变多。是哪只转头了？",
    ),
}

EXPL = {
    1: ("Dice totals: Amy 7, Bert 6, Carl 5, Doris 8, Ernst 9. Ernst is largest.",
        "点数：Amy7、Bert6、Carl5、Doris8、Ernst9。最大是 Ernst。"),
    2: ("8 weeks = 7 weeks + 7 days; already 2 days into the week ⇒ 5 days left.",
        "8 周=7 周+7 天；已过 2 天，还差 5 天。"),
    3: ("17+3=20 and 20−16=4; then 20+4=24.",
        "17+3=20，20−16=4；再 20+4=24。"),
    4: ("A mirror flips left and right; only option A matches the reflection.",
        "镜子左右翻转，只有 A 与镜像一致。"),
    5: ("Seats 71–72 fall in the 61–80 range, which points diagonally up-right.",
        "71、72 属于 61–80，对应斜向上右箭头。"),
    6: ("6 people × 1/2 apple = 3 apples.",
        "6 人×半个苹果=3 个苹果。"),
    7: ("The visible cut shows the hidden part is a triangle.",
        "从露出的切口可判断隐藏部分是三角形。"),
    8: ("After 2016, the nearest year with digit sum 9 is 2025 (2+0+2+5=9).",
        "2016 之后最近数字和为 9 的是 2025。"),
    9: ("Counting gate-paths without reuse gives 4 routes.",
        "不重复过门，共有 4 条路线。"),
    10: ("Each card sums to 16. Visible numbers force the hidden pair 11 & 4.",
        "每张卡和为 16；可见数字推出背面是 11 与 4。"),
    11: ("After removing circles, 3 piles still have triangle above square.",
        "拿走圆形后，仍有 3 堆三角形在正方形之上。"),
    12: ("Pieces 1, 3 and 5 fit together into a square.",
        "第 1、3、5 片可拼成正方形。"),
    13: ("Latin-square style filling forces the shaded cells to sum to 4.",
        "每行每列 1–3 各一次，涂黑格之和为 4。"),
    14: ("Turning over the top edge gives the figure in option D.",
        "沿上边翻转后得到选项 D。"),
    15: ("Ages: x,x,x,x+3 → sum 4x+3. Only 27=4×6+3 works among the options.",
        "年龄和=4x+3；选项中只有 27=4×6+3 成立。"),
    16: ("Apples come in 3s and 4s totaling 25 ⇒ 3 type-A + 4 type-B trees; pears=3×6+4×8=50.",
        "苹果 3a+4b=25 ⇒ a=3,b=4；梨=3×6+4×8=50。"),
    17: ("Each cat: 4 legs − 1 nose = 3 extra legs. 18÷3=6 cats.",
        "每只猫多 3 条腿（4−1）；18÷3=6 只。"),
    18: ("New sum = 2016 − 201 + 102 = 1917.",
        "新和=2016−201+102=1917。"),
    19: ("Breaks keep lengths that are multiples of powers of 3 from 27; E cannot appear.",
        "每次按 2:1 切开，长度始终是 3 的方幂相关；E 不可能出现。"),
    20: ("Only Bertha turning increases the total number of chirps.",
        "只有 Bertha 转头会使呼叫总数增加。"),
}


def set_title(n: int) -> str:
    return SET1 if n <= 10 else SET2


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
    all_items = [make_item(n) for n in range(1, 21)]
    dump(f"{SET1}.json", all_items[:10])
    dump(f"{SET2}.json", all_items[10:])
    dump(f"{FULL}.json", all_items)


if __name__ == "__main__":
    main()
