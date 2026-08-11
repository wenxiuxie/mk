# -*- coding: utf-8 -*-
"""Build Math Kangaroo 2020 Level 1 bilingual JSON."""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2020
SET1 = f"Math Kangaroo {YEAR} – Level 1 -1"
SET2 = f"Math Kangaroo {YEAR} – Level 1 -2"
FULL = f"Math Kangaroo {YEAR} – Level 1"
CONTEST = f"Math Kangaroo {YEAR}"

# PreEcolier / China Level 1 (grades 1–2) — Nordanglia Level 0 / IKMC PreEcolier
LETTERS = "ABCDE"
ANSWERS = {
    1: "D", 2: "E", 3: "A", 4: "E", 5: "A", 6: "D", 7: "E", 8: "D",
    9: "C", 10: "C", 11: "D", 12: "C", 13: "B", 14: "A", 15: "B", 16: "D",
    17: "D", 18: "D", 19: "C", 20: "C", 21: "B", 22: "E", 23: "C", 24: "B",
}
POINTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

# Short bilingual titles (used in JSON title field with year + set + Qn)
TITLES = {
    1: ("Stairs Meet", "楼梯上见面"),
    2: ("Castle Selfie", "城堡自拍"),
    3: ("Kangaroo Puzzle Pieces", "袋鼠拼图"),
    4: ("Toy Pattern", "玩具规律"),
    5: ("Card with Holes", "带洞的卡片"),
    6: ("Hidden Grey Cubes", "看不见的灰方块"),
    7: ("Black Triangles and Squares", "黑三角与正方形"),
    8: ("Three-Thread Braid", "三色麻花绳"),
    9: ("Complete the Picture", "补全图片"),
    10: ("Twelfth House", "第12间房子"),
    11: ("Most Cubes", "方块最多的形状"),
    12: ("Hidden Flower Petal", "被挡住的花瓣"),
    13: ("Largest Shaded Area", "阴影面积最大"),
    14: ("Blue and Yellow Squares", "蓝格与黄格"),
    15: ("Flipping the Card", "翻转卡片"),
    16: ("Extra Cookies", "再多烤几块饼干"),
    17: ("Card on Grey Square", "灰格上的卡片"),
    18: ("Opposite Train Cars", "相对的车厢"),
    19: ("Bee Path Colouring", "蜜蜂涂色通路"),
    20: ("Who Is Shortest", "谁最矮"),
    21: ("Yellow Apples", "黄色苹果"),
    22: ("Row and Column Sums", "行列数字和"),
    23: ("Opposite Face of 5", "5的对面"),
    24: ("John’s Sweets", "小强的糖果"),
}

CHOICES_ABCDE = [{"en": L, "zh": L} for L in LETTERS]

# Text choices where options are not pure A–E figures
CHOICES_TEXT = {
    1: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
        {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    6: [{"en": "1", "zh": "1"}, {"en": "3", "zh": "3"}, {"en": "5", "zh": "5"},
        {"en": "6", "zh": "6"}, {"en": "8", "zh": "8"}],
    8: [
        {"en": "1 blue, 2 green, 3 red", "zh": "1蓝，2绿，3红"},
        {"en": "1 green, 2 red, 3 blue", "zh": "1绿，2红，3蓝"},
        {"en": "1 red, 2 blue, 3 green", "zh": "1红，2蓝，3绿"},
        {"en": "1 green, 2 blue, 3 red", "zh": "1绿，2蓝，3红"},
        {"en": "1 blue, 2 red, 3 green", "zh": "1蓝，2红，3绿"},
    ],
    10: [{"en": "A", "zh": "A"}, {"en": "B", "zh": "B"}, {"en": "C", "zh": "C"},
         {"en": "D", "zh": "D"}, {"en": "E", "zh": "E"}],
    12: [{"en": "0", "zh": "0"}, {"en": "3", "zh": "3"}, {"en": "5", "zh": "5"},
         {"en": "7", "zh": "7"}, {"en": "1", "zh": "1"}],
    14: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    16: [{"en": "0", "zh": "0"}, {"en": "1", "zh": "1"}, {"en": "2", "zh": "2"},
         {"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}],
    18: [{"en": "7", "zh": "7"}, {"en": "12", "zh": "12"}, {"en": "21", "zh": "21"},
         {"en": "26", "zh": "26"}, {"en": "31", "zh": "31"}],
    19: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
         {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    20: [{"en": "A", "zh": "A"}, {"en": "B", "zh": "B"}, {"en": "C", "zh": "C"},
         {"en": "D", "zh": "D"}, {"en": "E", "zh": "E"}],
    21: [{"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"},
         {"en": "7", "zh": "7"}, {"en": "8", "zh": "8"}],
    22: [
        {"en": "Only 5", "zh": "只有 5"},
        {"en": "2, 3 or 4", "zh": "2、3 或 4"},
        {"en": "Only 3", "zh": "只有 3"},
        {"en": "Only 1 or 3", "zh": "只有 1 或 3"},
        {"en": "1, 3 or 5", "zh": "1、3 或 5"},
    ],
    23: [{"en": "3", "zh": "3"}, {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"},
         {"en": "7", "zh": "7"}, {"en": "9", "zh": "9"}],
    24: [{"en": "6", "zh": "6"}, {"en": "5", "zh": "5"}, {"en": "4", "zh": "4"},
         {"en": "3", "zh": "3"}, {"en": "2", "zh": "2"}],
}

CONTENT = {
    1: (
        "The kangaroo goes up 3 steps each time the rabbit goes down 2 steps. On which step do they meet?",
        "图中的袋鼠每向上跳 3 层楼梯，兔子就会向下跳 2 层。请问它们会在哪一层见面？",
    ),
    2: (
        "Mordka took a selfie in front of this castle. Which of the pictures below could be Mordka’s photo?",
        "小莫在这座城堡前拍了张自拍照。以下哪张图片可能是小莫的照片？",
    ),
    3: (
        "Nelly arranged the 4 pieces to make a picture of a kangaroo. How are the pieces arranged?",
        "小奈要把以下 4 张图片重新排列成袋鼠的画像。请问该如何排列这些图片？",
    ),
    4: (
        "Danial is arranging his toys in a line, as shown below. The pattern repeats every five toys. Which two toys will be next?",
        "小丹把他的玩具按照下图所示的顺序排成一行。每五个玩具被排列后，他再依照同样的顺序重复摆放。请问接下来是哪两个玩具？",
    ),
    5: (
        "José has two cards of the same size. Card A has four holes cut in it. José places card A directly on top of card B. What can José see?",
        "小何拥有两张相同大小的卡片。卡片 A 上有四个小洞。小何将卡片 A 直接放在卡片 B 的上面。请问小何会看到什么？",
    ),
    6: (
        "Mary made a shape using some white cubes and 14 grey cubes. How many of these grey cubes cannot be seen in the picture?",
        "小丽拿了一些白色的正方体和 14 个灰色的正方体拼成以下形状。请问在图中还有多少个灰色的正方体是无法被看到的？",
    ),
    7: (
        "Anna draws a picture of some shapes. Her picture contains 3 black triangles and fewer than 4 squares. Which could be Anna’s picture?",
        "小安画了几个图形。她的图画里有 3 个黑色三角形和少于 4 个正方形。请问以下哪张图可能是小安画的？",
    ),
    8: (
        "The braid in the figure is composed of three threads. One thread is green, one is blue and one is red. What colours are the three threads?",
        "下图是一股由三根绳子编成的麻花绳，其中一根绳子是绿色的，一根是蓝色的，还有一根是红色的。请问带编号的这三根绳子分别都是什么颜色？",
    ),
    9: (
        "Which piece completes the picture?",
        "以下哪一张图可以用于填补图片中的空白？",
    ),
    10: (
        "A village with 12 houses has four straight roads and four circular roads. The map shows 11 of the houses. On each straight road there are 3 houses. On each circular road there are also 3 houses. Where is the 12th house?",
        "一个村庄，有 12 间房子，还有 4 条直路和 4 条环形路。以下图片一共显示了 11 间房子。每条直路上要有 3 间房子，每条环形路上也要有 3 间房子。请问第 12 间房子会在哪里？",
    ),
    11: (
        "Five shapes are made by gluing cubes together. Which shape uses the most cubes?",
        "把一些正方体粘合在一起可以制作成以下的五个形状。请问哪种形状使用的正方体最多？",
    ),
    12: (
        "A number is written on each petal of two flowers. One petal is hidden. The sums of the numbers on the two flowers are equal. What number is written on the hidden petal?",
        "两朵花的每片花瓣上都写有数字，其中一片花瓣被挡住了。如果两朵花上的数字之和是相等的，请问被挡住的那片花瓣上的数字是什么？",
    ),
    13: (
        "Which picture has the largest shaded area?",
        "以下哪张图片中的阴影部分面积最大？",
    ),
    14: (
        "Mary wants to write the numbers 1, 2, 3, 4, 5 and 6 inside the six squares of the figure. She wants a different number in each square. She wants both the sum of the numbers in the blue squares and the sum of the numbers in the yellow squares to be 10. What number must she write in the square with the question mark?",
        "小莉想把数字 1, 2, 3, 4, 5, 6 写进下面的六个方格中，且每个方格中的数字都不同。除此之外，她想让蓝色方格里的数字之和与黄色方格里的数字之和都为 10。请问她必须在标有问号的方格里写上什么数字？",
    ),
    15: (
        "The card was on the table. It is flipped over its top edge then flipped over its left edge. What does the card look like now?",
        "如图所示，桌子上摆放着一张卡片。该卡片沿着顶部的边缘进行折叠翻转，然后再沿着左侧的边缘折叠翻转后，请问该卡片会变成什么样子？",
    ),
    16: (
        "Grandmother has baked 12 cookies. She wants to give all the cookies to her 5 grandchildren. She also wants to give each grandchild the same number of cookies. How many extra cookies should she bake?",
        "祖母烤了 12 块饼干，她想将所有饼干平均分配给她的 5 个孙子。请问她还需要再多烤几块饼干？",
    ),
    17: (
        "Tom has 9 cards, as shown. He puts the cards on the board so that each horizontal line and each vertical line contains three cards with three different shapes and three different numbers of shapes. He has already put three cards, as shown. Which card does he put on the grey square?",
        "小唐有 9 张卡片，如图。他把卡片放在方格内，使得每个水平和垂直方向上都有三张不同形状和不同形状数目的卡片。他已经放了三张卡片了，如下图所示。请问他应该在灰色的方格内放入哪张卡片？",
    ),
    18: (
        "Two identical trains, each with 31 cars, are traveling in opposite directions. When car No. 19 of one train is opposite car No. 19 of the other, which car is opposite car No. 12?",
        "两列相同的火车，各有 31 节车厢，它们朝相反的方向行驶。当其中一列火车的 19 号车厢与另一列火车的 19 号车厢相对时，几号车厢会与 12 号车厢相对？",
    ),
    19: (
        "Mark the Bee can walk only on grey cells. In how many ways could you colour exactly two white cells grey so that Mark can walk from A to B?",
        "有一只小蜜蜂只能在灰色的蜂房上行走。请问你可以通过几种方式将其中两个白色蜂房涂为灰色，以便小蜜蜂可以从 A 行走到 B？",
    ),
    20: (
        "An arrow pointing from one person to another means that the first person is taller than the second. For example, person B is taller than person A. Who is the shortest?",
        "如图所示，当一个箭头从一个人指向另一个人时，表示第一个人比第二个人高。例如，箭头从 B 指向 A，表示 B 比 A 高。请问谁是当中最矮的？",
    ),
    21: (
        "There are some apples and 8 pears in a basket, each of them green or yellow. There are three more apples than the total number of green fruit. There are 6 yellow pears. How many yellow apples are there in the basket?",
        "一个篮子里有一些苹果和 8 个梨，它们要么是绿色，要么是黄色。苹果的数量比绿色水果总数多了三个。如果篮子里有 6 个黄色的梨，请问篮子里有几个黄色的苹果？",
    ),
    22: (
        "Roo wrote each of the numbers 1, 2, 3, 4 and 5 in one of the circles so that the sum of the numbers in the row is equal to the sum of the numbers in the column. What number could be written in the circle with the question mark?",
        "小卢在每个圆中分别写下了数字 1、2、3、4 和 5，因此横行中的数字之和等于竖列中的数字之和。请问图中画问号的圆中是什么数字？",
    ),
    23: (
        "Six different numbers chosen from 1 to 9 are written on the faces of a cube, one number on each face. The sums of numbers on each pair of opposite faces are equal. Which number could be on the face opposite to the face with number 5?",
        "从 1 到 9 中选择六个不同的数字写在正方体的表面上，且每一面只写一个数字。如果每一个数字与它相对面上的数字总和是相等的，请问哪个数字将会出现在数字 5 相对的面上？",
    ),
    24: (
        "John and Olivia exchanged sweets. First, John gave Olivia as many sweets as Olivia had. Then, Olivia gave John as many sweets as John had after the first exchange. After these two exchanges, each had 4 sweets. How many sweets did John have at the beginning?",
        "小强和小欧互相交换糖果。首先，小强给小欧的糖果数量是小欧原本有的糖果数量。然后，小欧给小强的糖果数量是第一次交换后小强还剩的糖果数量。经过这两次交换后，每个人都有 4 颗糖果。请问小强一开始拥有多少颗糖果？",
    ),
}

EXPL = {
    1: ("They meet on step 6.", "它们在第 6 层见面。"),
    2: ("Only one option matches the castle after a selfie (mirror) view.", "只有一张图符合自拍（镜像）后的城堡样子。"),
    3: ("Arrange the four pieces so the kangaroo picture is complete.", "把四块拼图排成完整的袋鼠画像。"),
    4: ("The five-toy pattern repeats; read the next two in the cycle.", "五个玩具为一组循环；读出接下来的两个。"),
    5: ("Stack A on B; only the parts of B under the four holes remain visible.", "把 A 叠在 B 上，只能透过四个洞看到 B 上的图案。"),
    6: ("Count all 14 grey cubes in the structure; subtract the ones you can see.", "先确认结构里共有 14 个灰方块，再减去看得见的个数。"),
    7: ("Need exactly 3 black triangles and fewer than 4 squares.", "需要正好 3 个黑三角，且正方形少于 4 个。"),
    8: ("Trace each continuous thread through the braid.", "顺着麻花绳把每一根连续的绳子颜色追到底。"),
    9: ("Find the piece that fits the missing region’s pattern.", "找出能补上空白区域花纹的那一块。"),
    10: ("Each straight and each circular road must have exactly 3 houses.", "每条直路和每条环路都恰好有 3 间房子。"),
    11: ("Count the cubes in each polycube; pick the largest count.", "数每个形状用了多少个方块，选最多的。"),
    12: ("Big flower 1+3+5+7+9=25; small shows 2+4+6+8=20; hidden = 5.", "大花 1+3+5+7+9=25；小花可见 2+4+6+8=20；被挡 = 5。"),
    13: ("Each grid has 9 cells. Count white (halves = 0.5); shade = 9 − white. Least white wins.", "每图 9 格。数白色（半格算 0.5）；阴影 = 9 − 白。白最少的阴影最大。"),
    14: ("1+…+6=21 and blue+yellow=20, so the remaining square is 1.", "1 到 6 之和为 21，蓝格与黄格各为 10，剩余格必为 1。"),
    15: ("Flip over the top edge, then over the left edge; track the drawing.", "先沿顶边翻转，再沿左边翻转，跟踪图案朝向。"),
    16: ("Need a multiple of 5; from 12 bake 3 more to get 15.", "要能被 5 整除；从 12 再烤 3 块得到 15。"),
    17: ("Each row/column needs three different shapes and three different counts.", "每行每列形状与数量都要不重复。"),
    18: ("Opposite cars sum to 19+19=38, so opposite 12 is 26.", "相对车厢号之和为 38，与 12 相对的是 26。"),
    19: ("Count the ways to grey exactly two white cells that connect A to B.", "数出使 A 通到 B 的“恰涂两格”的方法种数。"),
    20: ("Follow the taller-than arrows; the person with no one shorter is shortest.", "按“更高”箭头比较，谁最矮。"),
    21: ("Green pears=2; yellow apples=green pears+3=5.", "绿梨有 2 个；黄苹果=绿梨+3=5。"),
    22: ("The centre must be odd; 1, 3 and 5 are all possible.", "中心数必为奇数；1、3、5 都可能。"),
    23: ("Opposite pairs share one common sum; opposite 5 can be 6.", "三对对面数字和相同；5 的对面可以是 6。"),
    24: ("Work backwards from 4 and 4; John started with 5.", "从最后都是 4 倒推；小强起初有 5 颗。"),
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
    all_items = [make_item(n) for n in range(1, 25)]
    dump(f"{SET1}.json", all_items[:12])
    dump(f"{SET2}.json", all_items[12:])
    dump(f"{FULL}.json", all_items)


if __name__ == "__main__":
    main()
