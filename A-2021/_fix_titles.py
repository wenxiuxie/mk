# -*- coding: utf-8 -*-
import json
import os

OUT = r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\A-2021"

DESC = {
    1: ("Three Sticks Shape", "三根棍子摆图形"),
    2: ("Mushroom Height Difference", "蘑菇高度差"),
    3: ("Longest Path", "最长的路径"),
    4: ("Punch Through Four Papers", "打穿四张纸"),
    5: ("T-shirt in the Mirror", "镜子里的T恤"),
    6: ("Tallest Tower", "最高的塔"),
    7: ("Children Holding Hands", "牵手的小朋友"),
    8: ("Kangaroo Constellation", "袋鼠星座"),
    9: ("Cut Ribbon Pieces", "剪丝带"),
    10: ("Cat Walking on the Wall", "墙上走路的猫"),
    11: ("Equal Flowers in Two Pots", "两盆花数量相等"),
    12: ("Letter Code Board", "字母密码板"),
    13: ("Two Pieces Make a Figure", "两块拼图"),
    14: ("Kangball Points", "袋鼠球得分"),
    15: ("Whose House Is Eva's", "Eva的家"),
    16: ("Leaves on Two Branches", "两根树枝上的叶子"),
    17: ("Which Shape Was Not Used", "哪块形状没用到"),
    18: ("Witch Apples and Bananas", "女巫的苹果和香蕉"),
    19: ("Two Boxes Same Sum", "两个盒子数字和相等"),
    20: ("Two Cogs Black Teeth", "两个齿轮的黑齿"),
    21: ("Dance Pairs Minutes", "跳舞配对分钟数"),
    22: ("Cookie Trays", "饼干烤盘"),
    23: ("Kangie's Fruit in Two Weeks", "两周吃的水果"),
    24: ("Toys on Shelves", "书架上的玩具"),
}

FILES = [
    "Math Kangaroo 2021 – Level 1 -1.json",
    "Math Kangaroo 2021 – Level 1 -2.json",
    "Math Kangaroo 2021 – Level 1.json",
]


def main():
    for fn in FILES:
        path = os.path.join(OUT, fn)
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        for q in data:
            n = q["meta"]["question_number"]
            set_title = (
                "Math Kangaroo 2021 – Level 1 -1"
                if n <= 12
                else "Math Kangaroo 2021 – Level 1 -2"
            )
            en_d, zh_d = DESC[n]
            q["title"] = {
                "en": f"{set_title} Q{n}: {en_d}",
                "zh": f"{set_title} 第{n}题：{zh_d}",
            }
            q["meta"]["set_title"] = set_title
            q["meta"]["contest"] = "Math Kangaroo 2021"
        ens = [q["title"]["en"] for q in data]
        zhs = [q["title"]["zh"] for q in data]
        assert len(set(ens)) == len(ens), ens
        assert len(set(zhs)) == len(zhs), zhs
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(fn, "OK", ens[0])


if __name__ == "__main__":
    main()
