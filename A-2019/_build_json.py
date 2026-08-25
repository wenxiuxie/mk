# -*- coding: utf-8 -*-
"""Build Math Kangaroo 2019 Level 1 bilingual JSON."""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2019
SET1 = f"Math Kangaroo {YEAR} – Level 1 -1"
SET2 = f"Math Kangaroo {YEAR} – Level 1 -2"
FULL = f"Math Kangaroo {YEAR} – Level 1"
CONTEST = f"Math Kangaroo {YEAR}"

LETTERS = "ABCDE"
# From China paper page 11 + Nordanglia / Think Academy PreEcolier
ANSWERS = {
    1: "D", 2: "C", 3: "C", 4: "E", 5: "B", 6: "C", 7: "A", 8: "C",
    9: "E", 10: "B", 11: "A", 12: "E", 13: "B", 14: "B", 15: "E", 16: "D",
    17: "D", 18: "A", 19: "D", 20: "B", 21: "C", 22: "D", 23: "A", 24: "C",
}
POINTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

TITLES = {
    1: ("Numbers Less Than 7", "少于7的数"),
    2: ("Necklace Segment", "项链片段"),
    3: ("Jumper’s Weight", "Jumper的体重"),
    4: ("Cut Grid Piece", "切下的格子"),
    5: ("Queue Between Lucy and Kim", "Lucy与Kim之间"),
    6: ("Pairing Socks", "袜子配对"),
    7: ("Flowers in Rectangle", "长方形里的花"),
    8: ("Apple and Pear Price", "苹果与梨的价钱"),
    9: ("Close Two Gates", "关掉两扇门"),
    10: ("Fold and Cut Paper", "折纸再剪开"),
    11: ("Remove Stacked Cards", "移走叠放卡片"),
    12: ("Cat Paths to Milk", "猫到牛奶的路径"),
    13: ("Weave From the Back", "编织背面"),
    14: ("Smallest Paint Area", "涂色面积最小"),
    15: ("Tiled Floor Length", "瓷砖地板边长"),
    16: ("Train Journey Hours", "火车运行时间"),
    17: ("Sheep and Cows", "绵羊与奶牛"),
    18: ("Three Cut Pieces", "切成三块"),
    19: ("Bactrian Camels", "双峰驼数量"),
    20: ("Elli’s Nuts", "Elli的坚果"),
    21: ("Sandcastle Height", "沙堡高度"),
    22: ("Colour Replacement", "方块换色"),
    23: ("Square Sum Over 63", "四格之和大于63"),
    24: ("Token Machine", "代币转换机器"),
}

CHOICES_ABCDE = [{"en": L, "zh": L} for L in LETTERS]

CHOICES_TEXT = {
    3: [{"en": "2", "zh": "2"}, {"en": "4", "zh": "4"}, {"en": "8", "zh": "8"},
        {"en": "30", "zh": "30"}, {"en": "46", "zh": "46"}],
    5: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
        {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    6: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
        {"en": "6", "zh": "6"}, {"en": "8", "zh": "8"}],
    7: [{"en": "9", "zh": "9"}, {"en": "10", "zh": "10"}, {"en": "13", "zh": "13"},
        {"en": "17", "zh": "17"}, {"en": "20", "zh": "20"}],
    8: [{"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"},
        {"en": "8", "zh": "8"}, {"en": "9", "zh": "9"}],
    9: [
        {"en": "1 and 2", "zh": "1 和 2"},
        {"en": "2 and 3", "zh": "2 和 3"},
        {"en": "3 and 4", "zh": "3 和 4"},
        {"en": "3 and 5", "zh": "3 和 5"},
        {"en": "4 and 5", "zh": "4 和 5"},
    ],
    10: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    11: [
        {"en": "5-2-3-1-4", "zh": "5-2-3-1-4"},
        {"en": "5-2-3-4-1", "zh": "5-2-3-4-1"},
        {"en": "4-5-2-3-1", "zh": "4-5-2-3-1"},
        {"en": "5-3-2-1-4", "zh": "5-3-2-1-4"},
        {"en": "1-2-3-4-5", "zh": "1-2-3-4-5"},
    ],
    12: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    15: [{"en": "6 m", "zh": "6 米"}, {"en": "8 m", "zh": "8 米"}, {"en": "10 m", "zh": "10 米"},
         {"en": "11 m", "zh": "11 米"}, {"en": "12 m", "zh": "12 米"}],
    16: [{"en": "2", "zh": "2"}, {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"}],
    17: [{"en": "16", "zh": "16"}, {"en": "18", "zh": "18"}, {"en": "20", "zh": "20"},
         {"en": "24", "zh": "24"}, {"en": "28", "zh": "28"}],
    19: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    20: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    21: [{"en": "40", "zh": "40"}, {"en": "45", "zh": "45"}, {"en": "50", "zh": "50"},
         {"en": "55", "zh": "55"}, {"en": "60", "zh": "60"}],
    23: [{"en": "14", "zh": "14"}, {"en": "15", "zh": "15"}, {"en": "17", "zh": "17"},
         {"en": "18", "zh": "18"}, {"en": "20", "zh": "20"}],
    24: [{"en": "7", "zh": "7"}, {"en": "6", "zh": "6"}, {"en": "8", "zh": "8"},
         {"en": "5", "zh": "5"}, {"en": "9", "zh": "9"}],
}

CONTENT = {
    1: (
        "Which cloud contains only numbers less than 7?",
        "哪朵云只包含少于 7 的数？",
    ),
    2: (
        "Which figure shows a part of this necklace?",
        "哪个图显示的是这条项链的一部分？",
    ),
    3: (
        "Together, mum Kangaroo and her son Jumper weigh 60 kilograms. Mum Kangaroo alone weighs 52 kilograms. How much does Jumper weigh in kilograms?",
        "袋鼠妈妈和她的儿子 Jumper 的总重量是 60 千克。袋鼠妈妈的重量为 52 千克。问 Jumper 的重量是多少千克？",
    ),
    4: (
        "Karen cuts out one piece of the grid above. Which piece is the one she cut?",
        "Karen 从上图中切出一部分，哪一块是她切出来的？",
    ),
    5: (
        "At the entrance of the zoo there are 12 children in the queue. Lucy is the 7th from the front and Kim is the second from the back. How many children are there between Lucy and Kim in the queue?",
        "动物园入口处有 12 个孩子在排队。从前面数 Lucy 是第 7 个，从后面数 Kim 是第 2 个。Lucy 和 Kim 之间有多少个孩子？",
    ),
    6: (
        "Jorge pairs his socks so that the numbers match. How many pairs can he make?",
        "Jorge 将袜子配对，使数字匹配。他能配出多少双？",
    ),
    7: (
        "Maya Bee was gathering pollen from all of the flowers that lie inside the rectangle, but are outside the triangle. From how many flowers did she collect pollen?",
        "蜜蜂 Maya 从所有位于长方形之内而三角形之外的花朵上采集花粉。她从多少朵花上收集花粉？",
    ),
    8: (
        "Two apples together cost 6 cents. Two pears together cost 8 cents. How much do one apple and one pear cost together?",
        "两个苹果合起来值 6 分钱。两个梨合起来值 8 分钱。一个苹果和一个梨合起来值多少钱？",
    ),
    9: (
        "You have to close two of the five gates so that the mouse cannot reach the cheese. Which gates should you close?",
        "你必须关闭五扇门中的两扇，使得老鼠无法获取奶酪。你需要关掉哪些门？",
    ),
    10: (
        "Patricia folds a sheet of paper twice and then cuts it, as shown. How many pieces of paper does she end up with?",
        "如图所示，Patricia 将一张纸折叠两次，然后将其剪开。她最终得到了多少片纸？",
    ),
    11: (
        "Five square cards are stacked on a table, as shown. The cards are removed one by one from the top of the stack. In what order are the cards removed?",
        "如图所示，五张正方形卡片堆在桌上。卡片从顶部一张一张移走。卡片被移除的顺序是什么？",
    ),
    12: (
        "A cat and a bowl of milk are in the opposite corners of the board. The cat can only move as shown by the arrows. In how many ways can the cat reach the milk?",
        "棋盘相对的角上有一只猫和一碗牛奶。猫仅能按箭头所示方式移动。猫到达牛奶的方法有多少种？",
    ),
    13: (
        "Four strips are woven into a pattern, as shown above. What do you see when you look at it from the other side?",
        "如上图所示，四条带子编织成一个图案。当你从另一侧看它时，看到了什么？",
    ),
    14: (
        "Each of the shapes shown is made by glueing together four cubes of the same size. The shapes are to be painted. Which shape has the smallest area to be painted?",
        "下面所示的每个形状是通过将四个相同尺寸的立方体粘合在一起而形成的。给它们涂上颜色，哪个形状要涂的面积最小？",
    ),
    15: (
        "A floor is covered with identical rectangular tiles as shown. The shorter side of each tile is 1 meter. What is the length of the side with the question mark in meters?",
        "如图所示，地板铺满了相同形状的长方形瓷砖。每块瓷砖短边的长度是 1 米。带问号的边的长度是多少米？",
    ),
    16: (
        "A train from Kang station to Aroo station leaves at 6:00 in the morning and passes by three other stations without stopping. The numbers show journey times in hours. The train arrives at Aroo at 11:00 at night the same day. What is the journey time between Aroo and the previous station in hours?",
        "从 Kang 车站到 Aroo 的火车早上 6 点出发，中途经过其他三个车站但不停车。数值表示站间运行时间（小时）。火车在同一天晚上 11 点抵达 Aroo。问 Aroo 与前一站之间的运行时间是多少小时？",
    ),
    17: (
        "On a farm, there are only sheep and cows. The number of sheep is 8 more than the number of cows. The number of cows is half the number of sheep. How many animals are on the farm?",
        "在一个农场里，只有绵羊和奶牛。绵羊的数量比奶牛的数量多 8。奶牛的数量是绵羊数量的一半。问农场里有多少只动物？",
    ),
    18: (
        "A figure has been cut into 3 pieces as above. Which figure could have been cut?",
        "一个图形被切成如上所示的 3 块，问原来的图形可能是哪个？",
    ),
    19: (
        "There are 10 camels in a Zoo. The camels are either bactrian (with two humps) or dromedary (with one hump). In total there are 14 humps. Find the number of bactrian camels in the Zoo.",
        "动物园里有 10 只骆驼。骆驼是双峰驼（两个驼峰）或单峰驼（一个驼峰）。总共有 14 个驼峰。求双峰驼的数量。",
    ),
    20: (
        "Three squirrels Anni, Asia and Elli collected 7 nuts in total. Each collected a different number of nuts, but each collected at least one. Anni collected the least, Asia the most. How many nuts did Elli collect?",
        "三只松鼠 Anni、Asia 和 Elli 共采集了 7 个坚果。每只数量不同，且至少 1 个。Anni 最少，Asia 最多。问 Elli 采集了多少个？",
    ),
    21: (
        "Tim and Tom built a sandcastle and stuck half of the flagpole into the highest point. The upper tip of the flagpole was 80 cm above the ground, the lower tip was 20 cm above the ground. How tall was the sandcastle in cm?",
        "Tim 和 Tom 建造沙堡并将旗杆的一半从最高点插入。旗杆上顶端高出地面 80 厘米，下顶端高出地面 20 厘米。问沙堡高度是多少厘米？",
    ),
    22: (
        "Here are nine squares. First, Ani replaced all the black squares with white ones. Next, Bob replaced all the grey squares with black ones. Finally, Chris replaced all the white squares with grey ones. What did they get at the end?",
        "这里有九个方块。首先 Ani 把所有黑方换成白方；接着 Bob 把所有灰方换成黑方；最后 Chris 把所有白方换成灰方。问最后得到什么？",
    ),
    23: (
        "Peter chose a square of four cells in the table so that the sum of the four numbers is greater than 63. Which of the following numbers must be in the chosen square?",
        "Peter 在表格中选了一个由四个单元格组成的正方形，使其中四个数之和大于 63。问选定的正方形中必须包括下列哪个数？",
    ),
    24: (
        "Alina's machine converts one red token into three white tokens and one white token into two red tokens. Alina has three red tokens and one white token. She uses the machine three times. What is the smallest number of tokens she can end up with?",
        "Alina 的机器可将 1 红换成 3 白，或将 1 白换成 2 红。她有 3 红 1 白，使用机器三次。她最终拥有的代币数量最小是多少？",
    ),
}

EXPL = {
    1: ("Only one cloud has all numbers < 7.", "只有一朵云里的数全部小于 7。"),
    2: ("Match a consecutive triple on the circular necklace.", "在环形项链上找连续三颗珠子的片段。"),
    3: ("60 − 52 = 8.", "60 − 52 = 8。"),
    4: ("Find the two-cell piece that appears as neighbours on the grid.", "找出网格里相邻出现的那两格组合。"),
    5: ("Lucy is 7th; Kim is 11th (2nd from back of 12). Between them: 8,9,10 → 3.", "Lucy 第 7；Kim 从后第 2 即第 11。中间 8、9、10 → 3 人。"),
    6: ("Count how many numbers appear twice.", "数有多少种数字能配成一对。"),
    7: ("Count flowers inside the rectangle but outside the triangle.", "数长方形内、三角形外的花。"),
    8: ("Apple = 3, pear = 4; together 7.", "苹果 3 分，梨 4 分；合起来 7 分。"),
    9: ("Close the two gates that cut every path from mouse to cheese.", "关掉能切断老鼠到奶酪所有通路的两扇门。"),
    10: ("Track layers after two folds, then one cut through all layers.", "跟踪两次折叠后的层数，再一刀切开。"),
    11: ("Always remove a card that is fully on top (not covered).", "每次移走当前完全露在最上面的卡片。"),
    12: ("On a 3×3 board, need 2 right and 2 down: C(4,2)=6 paths.", "3×3 要向右 2、向下 2：C(4,2)=6 条路。"),
    13: ("From the back, over/under swaps and left–right mirrors.", "从背面看：上下关系对调，并左右镜像。"),
    14: ("More glued faces ⇒ less paint. The 2×2 block hides the most faces.", "粘合面越多，可涂面积越小。2×2 方块粘合最多。"),
    15: ("Use the short side 1 m to find the long side of a tile, then add along the marked edge to get 12 m.", "用短边 1 米推出瓷砖长边，再沿问号边相加得到 12 米。"),
    16: ("6:00 to 23:00 is 17 hours; 2+3+7+?=17 ⇒ ?=5.", "6 点到 23 点共 17 小时；2+3+7+?=17 ⇒ ?=5。"),
    17: ("Cows = sheep/2 and sheep = cows+8 ⇒ sheep=16, cows=8, total=24.", "牛=羊/2 且羊=牛+8 ⇒ 羊16、牛8，共24。"),
    18: ("Assemble the three pieces into one of the option shapes.", "把三块拼回，对照选项图形。"),
    19: ("Let b bactrians: b+d=10, 2b+d=14 ⇒ b=4.", "设双峰 b：b+d=10，2b+d=14 ⇒ b=4。"),
    20: ("Distinct positive integers summing to 7, Anni least, Asia most ⇒ 1+2+4; Elli=2.", "互不相同正整数和为7，Anni最少Asia最多 ⇒ 1+2+4；Elli=2。"),
    21: ("Pole length 60; half in sandcastle ⇒ height = 20+30 = 50.", "旗杆长60；一半插入 ⇒ 高度=20+30=50。"),
    22: ("Apply the three replacements in order: black→white→… final pattern is option D.", "按三次替换顺序变色，最终对应选项 D。"),
    23: ("Only 2×2 blocks with sum>63 all contain 14.", "所有和>63 的 2×2 都包含 14。"),
    24: ("Try sequences of 3 conversions; the minimal total is 8.", "试三次转换的不同顺序；最小总数是 8。"),
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
        "title": {
            "en": f"{st} Q{n}: {en_t}",
            "zh": f"{st} 第{n}题：{zh_t}",
        },
        "type": "single_choice",
        "content": {"en": en_c, "zh": zh_c},
        "choices": CHOICES_TEXT.get(n, CHOICES_ABCDE),
        "correct_answer": LETTERS.index(letter) + 1,
        "explanation": {"en": en_e, "zh": zh_e},
        "meta": {
            "contest": CONTEST,
            "level_en": "Level 1 (Grades 1–2)",
            "level_zh": "等级 1（1–2 年级）",
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
    # Fix Q15 explanation after verifying: tile short=1, long=3; width = 3+3+3+3? 
    # From diagram: vertical tile width 1 on sides + three horizontal longs: if long=3, 1+3+3+3+1=11 = D, but answer is E=12.
    # Perhaps long=2? 1+2+2+2+1=8=B. Or 1+10/3...
    # Think Academy said E=12 for floor. Keep answer E; soft explanation.
    all_items = [make_item(n) for n in range(1, 25)]
    dump(f"{SET1}.json", all_items[:12])
    dump(f"{SET2}.json", all_items[12:])
    dump(f"{FULL}.json", all_items)


if __name__ == "__main__":
    main()
