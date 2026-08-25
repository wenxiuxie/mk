# -*- coding: utf-8 -*-
"""Build Math Kangaroo 2024 Level B (China / Ecolier grades 3–4) bilingual JSON."""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2024
SET1 = f"Math Kangaroo {YEAR} – Level B -1"
SET2 = f"Math Kangaroo {YEAR} – Level B -2"
FULL = f"Math Kangaroo {YEAR} – Level B"
CONTEST = f"Math Kangaroo {YEAR}"

LETTERS = "ABCDE"
# China Level B order; verified against PDF solutions + Think Academy Level 3–4
ANSWERS = {
    1: "E", 2: "C", 3: "C", 4: "C", 5: "D", 6: "C", 7: "E", 8: "B",
    9: "C", 10: "A", 11: "B", 12: "D", 13: "A", 14: "B", 15: "B", 16: "D",
    17: "D", 18: "A", 19: "E", 20: "D", 21: "D", 22: "C", 23: "E", 24: "D",
}
POINTS = {i: (3 if i <= 8 else 4 if i <= 16 else 5) for i in range(1, 25)}

TITLES = {
    1: ("Two Different Shapes", "两个不同形状"),
    2: ("Firefighter Ladders", "消防员的梯子"),
    3: ("Painted Rows and Column", "涂色的行与列"),
    4: ("Soccer Circle Kick", "圆圈传球"),
    5: ("Erased Digits", "被擦掉的数字"),
    6: ("Most Expensive Item", "最贵的物品"),
    7: ("Knocked-Off Block", "被撞掉的积木"),
    8: ("Grey Tiles Behind Poster", "海报后的灰砖"),
    9: ("Coin Toss Steps", "掷硬币前进"),
    10: ("Fruit Preferences", "喜欢的水果"),
    11: ("Removing Discs", "拿走圆盘"),
    12: ("Penguin Chicks’ Fish", "小企鹅吃鱼"),
    13: ("Overlapping Rings", "相交圆环"),
    14: ("Caterpillar Puzzles", "毛毛虫拼图"),
    15: ("Flipped Number Cards", "翻转后的数字卡"),
    16: ("Square Tile Side", "正方形瓷砖边长"),
    17: ("Worm-Eaten Digits", "被虫吃掉的数字"),
    18: ("Weighing Blocks", "积木称重"),
    19: ("Yellow Vest Orange Pack", "黄背心橙书包"),
    20: ("Hidden Digits Product", "图形藏数字"),
    21: ("Frogs Jump Together", "青蛙同时跳"),
    22: ("Honeycomb Honey Count", "蜂巢蜂蜜格"),
    23: ("Cookie Tray Order", "饼干托盘"),
    24: ("White and Red Blocks", "白红积木"),
}

CHOICES_ABCDE = [{"en": L, "zh": L} for L in LETTERS]

CHOICES_TEXT = {
    2: [{"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"},
        {"en": "7", "zh": "7"}, {"en": "8", "zh": "8"}],
    3: [{"en": "8", "zh": "8"}, {"en": "10", "zh": "10"}, {"en": "12", "zh": "12"},
        {"en": "14", "zh": "14"}, {"en": "17", "zh": "17"}],
    4: [{"en": "7", "zh": "7"}, {"en": "8", "zh": "8"}, {"en": "9", "zh": "9"},
        {"en": "10", "zh": "10"}, {"en": "11", "zh": "11"}],
    5: [
        {"en": "389, 3, 99", "zh": "389, 3, 99"},
        {"en": "489, 3, 96", "zh": "489, 3, 96"},
        {"en": "489, 4, 98", "zh": "489, 4, 98"},
        {"en": "489, 4, 99", "zh": "489, 4, 99"},
        {"en": "488, 4, 99", "zh": "488, 4, 99"},
    ],
    6: [
        {"en": "2 dollars", "zh": "2 美元"},
        {"en": "3 dollars", "zh": "3 美元"},
        {"en": "4 dollars", "zh": "4 美元"},
        {"en": "5 dollars", "zh": "5 美元"},
        {"en": "6 dollars", "zh": "6 美元"},
    ],
    8: [{"en": "15", "zh": "15"}, {"en": "21", "zh": "21"}, {"en": "25", "zh": "25"},
        {"en": "30", "zh": "30"}, {"en": "35", "zh": "35"}],
    9: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
        {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    12: [{"en": "19", "zh": "19"}, {"en": "22", "zh": "22"}, {"en": "25", "zh": "25"},
         {"en": "28", "zh": "28"}, {"en": "31", "zh": "31"}],
    13: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "4", "zh": "4"},
         {"en": "5", "zh": "5"}, {"en": "7", "zh": "7"}],
    14: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
         {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    15: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
         {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    16: [{"en": "3 cm", "zh": "3 cm"}, {"en": "4 cm", "zh": "4 cm"}, {"en": "5 cm", "zh": "5 cm"},
         {"en": "6 cm", "zh": "6 cm"}, {"en": "7 cm", "zh": "7 cm"}],
    17: [{"en": "8", "zh": "8"}, {"en": "9", "zh": "9"}, {"en": "10", "zh": "10"},
         {"en": "11", "zh": "11"}, {"en": "12", "zh": "12"}],
    18: [{"en": "270 g", "zh": "270 g"}, {"en": "280 g", "zh": "280 g"}, {"en": "290 g", "zh": "290 g"},
         {"en": "300 g", "zh": "300 g"}, {"en": "310 g", "zh": "310 g"}],
    19: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "6", "zh": "6"},
         {"en": "8", "zh": "8"}, {"en": "10", "zh": "10"}],
    20: [{"en": "0", "zh": "0"}, {"en": "15", "zh": "15"}, {"en": "18", "zh": "18"},
         {"en": "28", "zh": "28"}, {"en": "30", "zh": "30"}],
    21: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    22: [{"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}, {"en": "6", "zh": "6"},
         {"en": "7", "zh": "7"}, {"en": "8", "zh": "8"}],
    24: [{"en": "8", "zh": "8"}, {"en": "11", "zh": "11"}, {"en": "13", "zh": "13"},
         {"en": "14", "zh": "14"}, {"en": "23", "zh": "23"}],
}

CONTENT = {
    1: (
        "Which square is cut into 2 different shapes?",
        "请问哪个正方形被划分为两个不同的形状？",
    ),
    2: (
        "What is the smallest number of ladders the firefighter must use to reach the fire without jumping?",
        "在不跳跃的情况下，消防员最少要用多少把梯子才能去救火？",
    ),
    3: (
        "The table consists of 28 white cells. Ira paints 2 rows and 1 column. How many cells will remain white?",
        "下表由 28 个白色方格组成。小艾为其中 2 行和 1 列方格涂色。请问最后还剩多少个白色方格？",
    ),
    4: (
        "Soccer players numbered 1 to 11 stand in a circle. Each player kicks the ball to the third player on their left. Player 1 starts. This continues until a player has the ball for the second time. What is the number of the player who kicked the ball last?",
        "编号为 1 到 11 的足球运动员站成圆圈，每人把球踢给左边第三名球员。从 1 号开始，直到有人第二次拿到球。请问最后一名踢球的是几号？",
    ),
    5: (
        "Mohammad wrote 3 consecutive 4-digit numbers in a row. His sister erased some digits. What are the missing digits (from left to right)?",
        "小莫将 3 个连续的四位数写成一行，姐姐擦掉了一些数位。请问哪些数字被擦掉了？（从左到右）",
    ),
    6: (
        "Lizzy pays 7 dollars for 3 items. The cost of each item is different and is a whole number. How much is the most expensive item?",
        "小李花 7 美元买了 3 件物品。每件价格不同且为整数。请问最贵的物品价格是多少？",
    ),
    7: (
        "A cat knocks off 1 block from Felix’s construction. What could this construction have looked like before the block was knocked off?",
        "小猫撞掉了小菲搭建形状中的一块积木。请问撞掉前可能是什么形状？",
    ),
    8: (
        "Alex has a Kangaroo poster on the kitchen wall. How many grey tiles are there behind the poster?",
        "小亚在厨房墙上贴了袋鼠海报。请问海报后面有多少块灰色瓷砖？",
    ),
    9: (
        "Antonia and Lucian toss a coin. Purple advances 3 steps; green goes back 1 step or stays. Each tossed 4 times. Antonia reached 4 and Lucian reached 8. How many times in total did they see the green side?",
        "掷出紫色前进 3 格，绿色后退 1 格或停在起点。两人各掷 4 次；小安到 4，小卢到 8。请问一共几次掷出绿色？",
    ),
    10: (
        "There are five different kinds of fruit in a bowl. Everyone gets a fruit they like, and everyone gets a different kind. What does Ben get?",
        "碗里有五种不同水果。每人得到自己喜欢且互不相同的水果。请问小本得到了什么？",
    ),
    11: (
        "Ada has a tower of 8 discs. She removes the 2nd from the bottom, then the 3rd from the bottom of the new tower, then the 4th, then the 5th. Which tower does she end up with?",
        "小艾用 8 个圆盘建塔。依次拿走从底往上第 2、再新塔第 3、再第 4、再第 5 个圆盘。最终是哪座塔？",
    ),
    12: (
        "Peter brings 9 fish daily for 2 chicks: 5 to the first he sees and 4 to the second. Over some days one chick ate 26 fish. How many did the other eat?",
        "企鹅每天带回 9 条鱼：先看到的喂 5，另一只喂 4。过去几天一只吃了 26 条，另一只吃了多少？",
    ),
    13: (
        "7 cards numbered 1 to 7 are in 4 overlapping rings. Each ring sums to 10. Which number is under the question mark?",
        "1–7 的卡片放在 4 个相交圆环中，每环数字和为 10。问号下是哪个数？",
    ),
    14: (
        "Lucas makes a caterpillar with a head, a tail and 1, 2 or 3 puzzle pieces between. How many different caterpillars can he make without flipping pieces?",
        "毛毛虫有头有尾，中间 1、2 或 3 片拼图。不翻转时能拼出几条不同的？",
    ),
    15: (
        "John writes 1–4 on a sheet, flips it and writes 5–8, then cuts into 4 cards in a row: ? 5 ? 6. What is the sum of the numbers under the question marks?",
        "纸上写 1–4，翻面写 5–8，剪成 4 张排成 ? 5 ? 6。问号数字之和是多少？",
    ),
    16: (
        "A floor uses rectangular tiles 23 cm × 11 cm and square tiles. What is the side-length of the square tiles?",
        "地板有 23 cm × 11 cm 长方形瓷砖和正方形瓷砖。正方形边长是多少？",
    ),
    17: (
        "Three cards sum to 782. A worm ate part of each card. What is the sum of the 3 missing digits?",
        "三张卡片数字之和为 782，每张都被虫吃掉一部分。被吃掉的 3 个数字之和是多少？",
    ),
    18: (
        "Lucy weighs some blocks on three scales showing 200 g, 100 g and 240 g. How much do the 3 different blocks weigh together?",
        "三台秤分别显示 200 g、100 g、240 g。三种不同积木一共多重？",
    ),
    19: (
        "60 pupils: vests yellow, green, yellow, green…; backpacks red, brown, orange, red, brown, orange… How many have a yellow vest and an orange backpack?",
        "60 名学生：背心黄绿交替；书包红棕橙循环。黄背心且橙书包的有多少人？",
    ),
    20: (
        "Same shapes hide the same digits; different shapes hide different digits. What is the value of the product of the three shapes?",
        "相同图形代表相同数字。请问三个图形相乘的值是多少？",
    ),
    21: (
        "Exactly 2 frogs in each row and column. Two frogs jump at once to neighbouring empty cells; afterwards still 2 per row/column. In how many ways?",
        "每行每列恰有 2 只青蛙。两只同时跳到相邻空格后仍每行每列 2 只。有几种跳法？",
    ),
    22: (
        "A beehive has 9 cells. Each number shows how many neighbouring cells contain honey. How many cells contain honey?",
        "9 格蜂巢，数字表示相邻含蜜格数。共有多少格含有蜂蜜？",
    ),
    23: (
        "Three girls take cookies in some order: all hearts; all white; all large. They take 3, 6 and 7 cookies. Which set does one girl take?",
        "三个女孩分别拿走所有心形、所有白色、所有大块饼干（顺序不定），分别拿 3、6、7 块。哪一组是其中一人拿走的？",
    ),
    24: (
        "A small cube uses 4 white blocks or 1 white + 1 red. The large cube is made of small cubes. What is the smallest number of white blocks needed?",
        "小立方体可用 4 白或 1 白+1 红搭成。大立方体由小立方体组成。最少需要几块白色积木？",
    ),
}

EXPL = {
    1: ("Only option E splits into two shapes with different area (9 vs 7 small squares).", "只有 E 分成面积不同的两块（9 与 7 个小格）。"),
    2: ("The shortest ladder path without jumping uses 6 ladders.", "不跳跃的最短路径需要 6 把梯子。"),
    3: ("Paint 2 rows and 1 column on a 4×7 grid of 28; 12 cells remain white.", "4×7 共 28 格，涂 2 行 1 列后剩 12 个白格。"),
    4: ("Kicks +3 mod 11 from 1 until a player gets the ball twice; the last kicker is 9.", "从 1 每次传给左边第 3 人，直到有人第二次拿球；最后踢球的是 9 号。"),
    5: ("The numbers are 4897, 4898, 4899; missing digits 489, 4, 99.", "连续数为 4897、4898、4899；缺 489、4、99。"),
    6: ("Different positive integers summing to 7: 1+2+4; most expensive is 4.", "互不相同正整数和为 7：1+2+4；最贵 4 美元。"),
    7: ("Only option E differs from the remaining figure by exactly one block.", "只有 E 与剩余形状恰好差一块。"),
    8: ("Behind the poster there are 21 grey tiles (pattern 3+4 repeating).", "海报后灰砖共 21 块（3+4 交替共 6 行）。"),
    9: ("Antonia: 2 purple + 2 green; Lucian: 3 purple + 1 green; green total 3.", "小安 2 紫 2 绿；小卢 3 紫 1 绿；绿色共 3 次。"),
    10: ("By elimination, Ben must get the apple — the only fruit only he likes.", "排除后小本只能拿到苹果（只有他喜欢）。"),
    11: ("After the four removals the remaining discs are blue–orange–white–blue.", "四次移除后剩下蓝–橙–白–蓝。"),
    12: ("26 = 4×4 + 2×5 ⇒ other chick 4×5 + 2×4 = 28.", "26=4×4+2×5 ⇒ 另一只 4×5+2×4=28。"),
    13: ("Ring sums force ? = 1.", "各环和为 10 可推出问号为 1。"),
    14: ("Without flipping, exactly 4 different caterpillars are possible.", "不翻转时恰有 4 种拼法。"),
    15: ("Pairs: 1↔7, 2↔6, 3↔8, 4↔5; the ? cards show 1 and 3, sum 4.", "正反配对后问号为 1 与 3，和为 4。"),
    16: ("23 = 11 + 2s ⇒ s = 6.", "23=11+2s ⇒ s=6。"),
    17: ("Missing units digit 5; missing tens digits sum to 6; total missing 11.", "个位缺 5；十位两缺数之和 6；缺数之和 11。"),
    18: ("(200+100+240)/2 = 270 because each block appears twice.", "三秤相加每种积木出现两次，(200+100+240)/2=270。"),
    19: ("LCM of periods 2 and 3 is 6; yellow+orange once per 6 ⇒ 60/6=10.", "周期 2 与 3 的最小公倍数为 6；每 6 人 1 个黄+橙 ⇒ 10。"),
    20: ("Digits give 7+7=14 and 4+7=11; product 7×4×1=28.", "解得 7+7=14、4+7=11；乘积 7×4×1=28。"),
    21: ("There are exactly 4 valid simultaneous jump pairs.", "恰有 4 种合法的同时跳跃方式。"),
    22: ("Forced neighbour constraints yield exactly 6 honey cells.", "由邻格约束可推出恰有 6 格含蜜。"),
    23: ("Order must be large → hearts → white, taking 7, 6, 3 cookies.", "顺序为大块→心形→白色，分别 7、6、3 块。"),
    24: ("8 small cubes; minimize whites: 6×1 + 2×4 = 14.", "8 个小立方体；最少白块 6×1+2×4=14。"),
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
    all_items = [make_item(n) for n in range(1, 25)]
    dump(f"{SET1}.json", all_items[:12])
    dump(f"{SET2}.json", all_items[12:])
    dump(f"{FULL}.json", all_items)


if __name__ == "__main__":
    main()
