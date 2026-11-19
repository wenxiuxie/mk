# 袋鼠跃级 Kangaroo Leap（G4）

Higher-grade track for **四年级 / Grade 4**. Companion to `kangaroo-hop` (G3).

| | kangaroo-hop | kangaroo-leap（本目录） |
|---|---|---|
| 年级 | ~G3 | **G4 only** |
| G5 | — | **以后单独新建目录**，不写进 Leap |
| 引擎 | 自有 | **技术同源**（从 Hop 复制后改品牌），**数据完全独立** |
| 已开放 | （Hop 未做组仍在 Hop 做） | **分数营 A–D** + **混合运算营 A** |

## 打开方式

用浏览器打开本目录的 `index.html`（勿与 Hop 的 `index.html` 混用）。

已开放训练营：
- `series/frac1.html` 分数营 A：再认识
- `series/frac2.html` 分数营 B：等价与比较
- `series/frac3.html` 分数营 C：同分母加减
- `series/frac4.html` 分数营 D：一个数的几分之几
- `series/mix1.html` 混合运算营 A：顺序与括号

在线：https://wenxiuxie.github.io/mk/kangaroo-leap/

Leap 专属小游戏（`engine/leap_games.js`）：
- 分数：双胞胎 · 蛋糕点分数 · 涂色挑战 · 接星星 · 过河 · 翻翻乐 · 披萨订单 · 分数跳格子 · 分碗达人
- 混合运算：先算谁 · 运算冲刺 · 括号修理工 · 运算三连击 · 算式机器

分数营 E 下次再做。

## 独立原则（请保持）

1. **不要**让 Leap 的 `index.html` 去加载 Hop 的 `series/*.js`
2. **不要**让 Hop 去加载 Leap 的分数题
3. 两边的 `engine/` 是各自副本；改 Leap 引擎不影响 Hop
4. 本地存储键目前仍可能与 Hop 共用语言/声音开关（仅 UI 偏好）；题库互不共享

## 提纲

见 [训练营提纲.md](训练营提纲.md)。
