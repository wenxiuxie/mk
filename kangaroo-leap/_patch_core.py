# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parent / "engine" / "core.js"
t = p.read_text(encoding="utf-8")
t = t.replace("Kangaroo Hop engine", "Kangaroo Leap engine (independent copy; do not share data with Hop)")
t = t.replace("袋鼠闯关", "袋鼠跃级")
t = t.replace("KANGAROO HOP · 数学竞赛练习", "KANGAROO LEAP · G4 分数与运算")
t = t.replace("Hop across the islands!", "Leap up with fractions!")
t = t.replace("跳过一座座小岛！", "用分数往上跃！")
t = t.replace(
    "Each correct answer moves the kangaroo one stone forward. Every 5 questions you get a mini game.",
    "Each correct answer moves the kangaroo one stone forward. Then enjoy a mini game break.",
)
t = t.replace(
    "每答对一题，袋鼠就向前跳一块石头。每做 5 题，可以玩一次小游戏。",
    "每答对一题，袋鼠就向前跳一块石头。做完一组题可以玩小游戏。",
)

# Replace locked camp + islands section
start = "      ${SERIES.filter(s => s.camp).map(islandCard).join('')}"
i = t.find(start)
j = t.find('    <h2 class="sect">${TI(\'Game corner\', \'小游戏乐园\')}</h2>', i)
if i < 0 or j < 0:
    raise SystemExit(f"anchors not found i={i} j={j}")

mid = """      ${SERIES.filter(s => s.camp).map(islandCard).join('')}
      ${lockedCard(['Fraction Camp D', '分数营 D'], ['Fraction × Whole Number', '分数乘整数'], ['Find a fraction of a set', '求一个数的几分之几'])}
      ${lockedCard(['Mixed Ops A', '混合运算营 A'], ['Order & Parentheses', '顺序与括号'], ['Later Leap phase', 'Leap 后续阶段'])}
    </div>
    <h2 class="sect">${TI('Practice islands', '练习岛')}</h2>
    <div class="islands">
      ${SERIES.filter(s => !s.camp).map(islandCard).join('')}
      ${lockedCard(['G5 Track', '五年级线'], ['New folder later', '以后单独建目录'], ['Leap stays G4 only', 'Leap 只做 G4'])}
    </div>
"""
t = t[:i] + mid + t[j:]

t = t.replace(
    "热身岛改编自 Math Kangaroo 2019 Level 1（A 级），图形为重新绘制，选项顺序与原卷可能不同。四个专题岛和训练营是原创练习题；训练营的计算题每次数字都不一样。本网站暂不保存学习记录。",
    "袋鼠跃级（Kangaroo Leap）面向四年级（G4）。本目录引擎与题库独立，不与 kangaroo-hop 共用数据。训练营题目数字可不一样。本网站暂不保存学习记录。",
)

p.write_text(t, encoding="utf-8")
print("patched", p)
