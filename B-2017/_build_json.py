# -*- coding: utf-8 -*-
"""Build Math Kangaroo 2017 Level B (China / Ecolier grades 3–4) bilingual JSON.
Paper has 20 questions: Q1–10 = 3 pts, Q11–20 = 4 pts.
Answers: KMC 2017 Ecolier key."""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
YEAR = 2017
SET1 = f"Math Kangaroo {YEAR} – Level B -1"
SET2 = f"Math Kangaroo {YEAR} – Level B -2"
FULL = f"Math Kangaroo {YEAR} – Level B"
CONTEST = f"Math Kangaroo {YEAR}"
LETTERS = "ABCDE"

ANSWERS = {
    1: "E", 2: "A", 3: "C", 4: "A", 5: "E", 6: "A", 7: "E", 8: "E", 9: "B", 10: "C",
    11: "D", 12: "D", 13: "C", 14: "D", 15: "C", 16: "B", 17: "A", 18: "D", 19: "C", 20: "E",
}
POINTS = {i: (3 if i <= 10 else 4) for i in range(1, 21)}

TITLES = {
    1: ("Puzzle Piece Equations", "拼图等式"),
    2: ("Kangaroos in the Park", "公园里的袋鼠"),
    3: ("Upside-Down Footprints", "颠倒的脚印"),
    4: ("Number Behind Panda", "熊猫后的数字"),
    5: ("Addition Table Mystery", "加法表问号"),
    6: ("Same Bead Necklace", "同一条珠链"),
    7: ("Back of Ann’s House", "Ann 家的后面"),
    8: ("Which Statement True", "哪项正确"),
    9: ("Fewest Balloon Packets", "最少气球包数"),
    10: ("How Bob Folded Paper", "Bob 如何折纸"),
    11: ("Pool Tournament Teams", "泳池比赛分组"),
    12: ("Largest 2×2 Sum", "最大2×2和"),
    13: ("Two-Stove Cooking", "双炉烹饪"),
    14: ("Circle Question Mark", "圆圈里的问号"),
    15: ("Ink on Building Plan", "平面图墨迹"),
    16: ("How Long Is the Train", "火车有多长"),
    17: ("Leave for Training", "出发去训练"),
    18: ("Zoo Two-Animal Tours", "动物园两动物行程"),
    19: ("Brothers Eat Cookies", "兄弟吃曲奇"),
    20: ("Candy Bags for Eric", "Eric 的糖果"),
}

CHOICES_ABCDE = [{"en": L, "zh": L} for L in LETTERS]
CHOICES_TEXT = {
    2: [{"en": "12", "zh": "12"}, {"en": "14", "zh": "14"}, {"en": "16", "zh": "16"},
        {"en": "18", "zh": "18"}, {"en": "20", "zh": "20"}],
    4: [{"en": "16", "zh": "16"}, {"en": "18", "zh": "18"}, {"en": "20", "zh": "20"},
        {"en": "24", "zh": "24"}, {"en": "28", "zh": "28"}],
    5: [{"en": "10", "zh": "10"}, {"en": "12", "zh": "12"}, {"en": "13", "zh": "13"},
        {"en": "15", "zh": "15"}, {"en": "16", "zh": "16"}],
    9: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
        {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    11: [{"en": "1", "zh": "1"}, {"en": "2", "zh": "2"}, {"en": "3", "zh": "3"},
         {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"}],
    12: [{"en": "11", "zh": "11"}, {"en": "12", "zh": "12"}, {"en": "13", "zh": "13"},
         {"en": "14", "zh": "14"}, {"en": "15", "zh": "15"}],
    13: [
        {"en": "60 min", "zh": "60 分钟"},
        {"en": "70 min", "zh": "70 分钟"},
        {"en": "75 min", "zh": "75 分钟"},
        {"en": "80 min", "zh": "80 分钟"},
        {"en": "85 min", "zh": "85 分钟"},
    ],
    14: [{"en": "10", "zh": "10"}, {"en": "11", "zh": "11"}, {"en": "12", "zh": "12"},
         {"en": "13", "zh": "13"}, {"en": "14", "zh": "14"}],
    15: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
         {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    16: [
        {"en": "55 m", "zh": "55 m"},
        {"en": "115 m", "zh": "115 m"},
        {"en": "170 m", "zh": "170 m"},
        {"en": "220 m", "zh": "220 m"},
        {"en": "230 m", "zh": "230 m"},
    ],
    18: [{"en": "3", "zh": "3"}, {"en": "7", "zh": "7"}, {"en": "8", "zh": "8"},
         {"en": "9", "zh": "9"}, {"en": "12", "zh": "12"}],
    19: [{"en": "3", "zh": "3"}, {"en": "4", "zh": "4"}, {"en": "5", "zh": "5"},
         {"en": "6", "zh": "6"}, {"en": "7", "zh": "7"}],
    20: [{"en": "9", "zh": "9"}, {"en": "11", "zh": "11"}, {"en": "13", "zh": "13"},
         {"en": "17", "zh": "17"}, {"en": "19", "zh": "19"}],
}

CONTENT = {
    1: (
        "Which piece can be placed between the above two pieces so the equations are correct?",
        "哪一块拼图放在中间能使等式都正确？",
    ),
    2: (
        "John sees half of the kangaroos in the park through the window, as in the picture. How many kangaroos are in the park?",
        "John 透过窗户看见公园里一半的袋鼠（如图）。公园里一共有多少只袋鼠？",
    ),
    3: (
        "A picture of footprints was turned upside down. Which footprints are missing?",
        "一张脚印图被上下颠倒。哪一双脚印不见了？",
    ),
    4: (
        "What number is hidden behind the panda?",
        "熊猫后面藏着什么数字？",
    ),
    5: (
        "In the incomplete addition table, what number is in the box with the question mark?",
        "不完整加法表中，问号格子里是什么数字？",
    ),
    6: (
        "Which option is the same necklace of six beads?",
        "下列哪项是同一条六颗珠子的项链？",
    ),
    7: (
        "The picture shows the front of Ann’s house. The back has three windows and no door. What does Ann see at the back?",
        "图为 Ann 家前方；后方有三个窗且没有门。她看后方会看见什么？",
    ),
    8: (
        "Which one is true?",
        "下列哪项是正确的？",
    ),
    9: (
        "Balloons are sold in packets of 5, 10 and 25. Marius buys exactly 70. What is the smallest number of packets?",
        "气球按 5、10、25 粒一包出售。Marius 恰好买 70 粒，最少买几包？",
    ),
    10: (
        "Bob folded paper, cut one hole, then unfolded it as shown. How did he fold the paper?",
        "Bob 折纸后剪一个洞再展开如图。他起初如何折纸？",
    ),
    11: (
        "13 then 19 children signed up. Six equal teams are needed. At least how many more children must sign up?",
        "先有 13 人再有 19 人报名。需要六组人数相等。至少还要几人报名？",
    ),
    12: (
        "In the 4×4 grid, what is the largest sum of numbers in a 2×2 square?",
        "4×4 方格中，最大的 2×2 数字之和是多少？",
    ),
    13: (
        "Cook 5 dishes (40,15,35,10,45 min) on 2 stoves; remove only when done. Shortest total time?",
        "两炉做 5 道菜（40、15、35、10、45 分钟），做完才能取下。最短总时间？",
    ),
    14: (
        "Which number should be written in the circle with the question mark?",
        "问号圆圈里应填哪个数？",
    ),
    15: (
        "Some ink covers numbers on the building-block plan. What is the sum of the numbers under the ink?",
        "积木平面图上墨迹盖住一些数字。墨迹下数字之和是多少？",
    ),
    16: (
        "How long is the train?",
        "这列火车有多长？",
    ),
    17: (
        "George’s training starts at 5:00 pm. Walk 5 min to bus, 15 min bus, 5 min walk to field. When must he leave home?",
        "训练 5:00 pm 开始；到站 5 分钟、巴士 15 分钟、再走 5 分钟。他何时出门？",
    ),
    18: (
        "Zoo has giraffe, elephant, lion, turtle. Susan sees 2 different animals and won’t start with the lion. How many tours?",
        "动物园有长颈鹿、大象、狮子、龟。看 2 种动物且不以狮子开头，有多少种行程？",
    ),
    19: (
        "Four brothers ate 11 cookies, all different positive amounts. Three ate 9 total; one ate exactly 3. How many did the biggest eater eat?",
        "四兄弟共吃 11 块，数量互不相同且至少 1。其中三人共 9 块，有一人恰吃 3 块。最多的那人吃了几块？",
    ),
    20: (
        "Bags hold 1–10 candies (all different). Five boys take two bags each. Alex 5, Bob 7, Charles 9, Dennis 15. How many did Eric get?",
        "十袋糖果 1–10 粒。五人各拿两袋：Alex5、Bob7、Charles9、Dennis15。Eric 拿了几粒？",
    ),
}

EXPL = {
    1: ("8−3=5 and the right side must equal 2; only E has =5 and 1+1=2.",
        "8−3=5，右边须等于 2；只有 E 是 =5 且 1+1=2。"),
    2: ("The picture shows 6 kangaroos (half) ⇒ 12 in the park.",
        "图中可见 6 只（一半）⇒ 公园共 12 只。"),
    3: ("After rotating 180°, the missing pair is option C.",
        "上下颠倒 180° 后，缺失的脚印是 C。"),
    4: ("Working the chain of operations gives 16 behind the panda.",
        "按运算链推算，熊猫后是 16。"),
    5: ("Row/column sums force the ? cell to be 16.",
        "由行列加法关系得问号为 16。"),
    6: ("Rotating/reflecting the bead cycle matches option A.",
        "珠子循环旋转/翻转后与 A 相同。"),
    7: ("From inside looking out the back, windows reverse left–right → E.",
        "从屋内看出后方，左右对调后是 E。"),
    8: ("Comparing the pictured statements, only E is true.",
        "对照图中各说法，只有 E 正确。"),
    9: ("70=25+25+10+10 → 4 packets (minimum).",
        "70=25+25+10+10 → 最少 4 包。"),
    10: ("The hole pattern after unfolding matches fold pattern C.",
        "展开后的洞位与折法 C 一致。"),
    11: ("13+19=32; next multiple of 6 is 36 ⇒ need 4 more.",
        "13+19=32；下一个 6 的倍数是 36 ⇒ 还要 4 人。"),
    12: ("The maximum 2×2 sum in the grid is 14.",
        "网格中最大 2×2 之和为 14。"),
    13: ("Optimal schedule on two stoves finishes in 75 minutes.",
        "两炉最优安排总时间 75 分钟。"),
    14: ("Working backwards/forwards along the operations gives 13.",
        "沿运算正推或反推得问号为 13。"),
    15: ("The covered plan numbers sum to 5.",
        "墨迹下数字之和为 5。"),
    16: ("From the bridge/tunnel lengths in the figure, the train is 115 m.",
        "由图中桥/隧道长度关系得火车长 115 m。"),
    17: ("Total travel 5+15+5=25 min ⇒ leave at 4:35 pm (option A).",
        "路程共 25 分钟 ⇒ 4:35 pm 出门（选项 A）。"),
    18: ("4×3=12 ordered pairs, minus 3 that start with lion ⇒ 9 tours.",
        "4×3=12 种有序对，去掉以狮子开头的 3 种 ⇒ 9。"),
    19: ("Amounts are distinct positive integers summing to 11; one is 3; three sum to 9 ⇒ largest is 5.",
        "互异正整数和 11，含 3，三人和 9 ⇒ 最大为 5。"),
    20: ("Used pairs leave Eric with 1+10+… → 19 candies.",
        "其余人用去的袋子推出 Eric 为 19 粒。"),
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
