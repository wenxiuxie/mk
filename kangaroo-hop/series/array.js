// 方阵岛 — edit or add questions in the list below.
// Each question: mk(points, English stem, 中文题目, [5 choices], index of the right choice (0 = A),
//                   [[hint 1 en, zh], [hint 2 en, zh]], [explanation en, zh], tool, tool settings, extras)
// Extras can add  unit: ['kids', '人'],  shape: true  (choices are shapes),  video: { url, title: [en, zh] }
const Q_ARRAY = [
  mk(3, 'Apples are in 3 rows. Each row has 4 apples. How many apples are there?', '苹果摆成 3 行，每行 4 个。一共有几个苹果？',
    [7, 10, 12, 14, 16], 2, [['Count one row first.', '先数一行有几个。'], ['Count by 4s: 4, 8, …', '4 个 4 个地数：4、8……']],
    ['4, 8, 12. Three rows of 4 make 12.', '4、8、12，3 行每行 4 个是 12 个。'], 'array', { rows: 3, cols: 4, icon: 'apple' }),
  mk(3, 'Stars are in 2 rows of 5. How many stars are there?', '星星摆成 2 行，每行 5 个。一共几个？',
    [7, 9, 10, 12, 25], 2, [['How many are in one row?', '一行有几个？'], ['5 + 5 = ?', '5 + 5 = ?']],
    ['5 + 5 = 10.', '5 + 5 = 10。'], 'array', { rows: 2, cols: 5, icon: 'star' }),
  mk(3, 'An egg box has 2 rows with 6 eggs in each row. How many eggs fit in the box?', '一个鸡蛋盒有 2 行，每行放 6 个鸡蛋。一盒能放几个？',
    [8, 10, 11, 12, 14], 3, [['Count one row, then add the other row.', '先数一行，再加上另一行。'], ['6 + 6 = ?', '6 + 6 = ?']],
    ['6 + 6 = 12.', '6 + 6 = 12。'], 'array', { rows: 2, cols: 6, icon: 'egg' }),
  mk(4, 'The class sets up 4 rows of chairs with 5 chairs in each row. How many chairs are there?', '教室摆了 4 排椅子，每排 5 把。一共几把椅子？',
    [9, 16, 18, 20, 25], 3, [['Count one row at a time, adding 5 each time.', '一排一排地数，每次加 5。'], ['5, 10, 15, …', '5、10、15……']],
    ['5, 10, 15, 20. Four rows of 5 make 20.', '5、10、15、20，4 排每排 5 把是 20 把。'], 'array', { rows: 4, cols: 5, icon: 'seat' }),
  mk(4, 'A sticker sheet has 3 rows of 6 stickers. Tom uses one whole row. How many stickers are left?', '一张贴纸有 3 行，每行 6 个。Tom 用掉了一整行。还剩几个？',
    [6, 12, 15, 17, 18], 1, [['How many rows are left?', '还剩几行？'], ['2 rows of 6: 6 + 6.', '剩 2 行，每行 6 个：6 + 6。']],
    ['2 rows are left. 6 + 6 = 12.', '还剩 2 行，6 + 6 = 12。'], 'array', { rows: 3, cols: 6, icon: 'sticker' }),
  mk(4, 'Cookies are set out in 3 full rows of 5. A napkin hides some of them. How many cookies are under the napkin?', '饼干摆成 3 整行，每行 5 块，有一些被餐巾盖住了。餐巾下面有几块饼干？',
    [4, 5, 6, 7, 9], 2, [['How many cookies are there in all?', '一共应该有几块？'], ['There are 15 in all. Count the ones you can see, then subtract.', '一共 15 块。数数看得见的，再相减。']],
    ['3 rows of 5 make 15. You can see 9, so 15 − 9 = 6 are hidden.', '3 行每行 5 块是 15 块。看得见 9 块，15 − 9 = 6 块被盖住。'], 'array', { rows: 3, cols: 5, icon: 'cookie', cover: [8, 9, 10, 11, 12, 13] }),
  mk(4, 'Lily puts 12 cupcakes in rows of 3. How many rows does she make?', 'Lily 把 12 个纸杯蛋糕摆成每行 3 个。能摆几行？',
    [3, 4, 5, 6, 9], 1, [['Count by 3s until you reach 12.', '3 个 3 个地数到 12。'], ['3, 6, 9, 12. How many numbers did you say?', '3、6、9、12，你数了几次？']],
    ['3, 6, 9, 12: that is 4 rows.', '3、6、9、12，一共 4 行。'], 'array', { rows: 4, cols: 3, icon: 'cupcake' }, { unit: ['rows', '行'] }),
  mk(5, 'A garden has 5 rows of 4 flowers. Then 2 more rows of 4 are planted. How many flowers are there now?', '花园里有 5 行花，每行 4 朵。后来又种了 2 行，每行也是 4 朵。现在一共几朵？',
    [20, 24, 26, 28, 30], 3, [['How many rows are there now?', '现在一共几行？'], ['7 rows of 4. Count by 4s seven times.', '7 行，每行 4 朵。4 个 4 个数 7 次。']],
    ['5 + 2 = 7 rows. 4, 8, 12, 16, 20, 24, 28.', '5 + 2 = 7 行。4、8、12、16、20、24、28。'], 'array', { rows: 7, cols: 4, icon: 'flower' }),
  mk(5, 'A square floor is 5 tiles long and 5 tiles wide. Only the tiles along the edge are blue. How many blue tiles are there?', '一块正方形地面，长 5 块砖、宽 5 块砖。只有最外面一圈是蓝色的。蓝砖有几块？',
    [16, 20, 21, 24, 25], 0, [['Careful: each corner tile is on two sides.', '小心：角上的砖同时在两条边上。'], ['25 tiles in all. The inside part has 3 rows of 3.', '一共 25 块，里面不是蓝色的有 3 行，每行 3 块。']],
    ['25 tiles in all. The inside has 3 rows of 3, which is 9 tiles. 25 − 9 = 16 blue tiles.', '一共 25 块。里面 3 行每行 3 块，共 9 块。25 − 9 = 16 块蓝砖。'], 'array', { rows: 5, cols: 5, paint: (r, c) => r === 0 || r === 4 || c === 0 || c === 4 ? 'blue' : 'tile' }),
  mk(5, 'A small theater has 4 rows of 6 seats. In every row, 3 seats are taken. How many seats are empty?', '小剧场有 4 排座位，每排 6 个。每排都有 3 个座位有人坐。空座位有几个？',
    [9, 10, 12, 14, 18], 2, [['How many empty seats are in one row?', '一排有几个空座位？'], ['Each row has 3 empty seats, and there are 4 rows.', '每排 3 个空座，一共 4 排。']],
    ['Each row has 6 − 3 = 3 empty seats. 3, 6, 9, 12.', '每排空 6 − 3 = 3 个。3、6、9、12。'], 'array', { rows: 4, cols: 6, paint: (r, c) => c < 3 ? 'taken' : 'seat' })
];

registerSeries({
  id: 'array', next: 'share',
  tag: ['Arrays', '方阵'], name: ['Array Island', '方阵岛'], desc: ['Count a whole row at a time, not one by one', '一行一行地数，不用一个一个数'],
  // video: { url: 'https://www.youtube.com/watch?v=...', title: ['English title', '中文标题'] },
  video: null,
  questions: Q_ARRAY
});
