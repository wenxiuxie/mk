// 规律岛 — edit or add questions in the list below.
// Each question: mk(points, English stem, 中文题目, [5 choices], index of the right choice (0 = A),
//                   [[hint 1 en, zh], [hint 2 en, zh]], [explanation en, zh], tool, tool settings, extras)
// Extras can add  unit: ['kids', '人'],  shape: true  (choices are shapes),  video: { url, title: [en, zh] }
const Q_PATTERN = [
  mk(3, 'What comes next in the pattern?', '下一个是什么图形？',
    ['R', 'B', 'G', 'Y', 'P'], 0, [['Look at the shapes two at a time.', '两个两个地看。'], ['Circle, square, circle, square, …', '圆、正方形、圆、正方形……']],
    ['Circle, square repeats. After a square comes a circle.', '“圆、正方形”重复，正方形后面是圆。'], 'pattern', { seq: ['R', 'B', 'R', 'B', 'R', 'B'], slots: 1, palette: 'RBG' }, { shape: true }),
  mk(3, 'What comes next in the pattern?', '下一个是什么图形？',
    ['G', 'R', 'Y', 'B', 'P'], 3, [['Find the group that repeats.', '找出重复的那一组。'], ['Try groups of 3.', '试试 3 个一组。']],
    ['Circle, circle, square repeats. After two circles comes a square.', '“圆、圆、正方形”一组重复。两个圆后面是正方形。'], 'pattern', { seq: ['R', 'R', 'B', 'R', 'R', 'B', 'R', 'R'], slots: 1, palette: 'RBG' }, { shape: true }),
  mk(3, 'What number comes next? 2, 4, 6, 8, __', '下一个数是几？2、4、6、8、__',
    [9, 10, 11, 12, 16], 1, [['Press “Show the jumps”.', '按“显示每次变化”。'], ['Each number is 2 more.', '每次多 2。']],
    ['The numbers go up by 2. 8 + 2 = 10.', '每次加 2，8 + 2 = 10。'], 'pattern', { nums: [2, 4, 6, 8], slots: 1 }),
  mk(4, 'The pattern keeps going. What is the 10th shape?', '这个规律一直继续下去。第 10 个图形是什么？',
    ['B', 'G', 'R', 'Y', 'P'], 2, [['Circle, square, triangle repeats.', '“圆、正方形、三角形”一组重复。'], ['The 1st, 4th and 7th are circles. What comes 3 places after the 7th?', '第 1、4、7 个都是圆，再往后 3 个呢？']],
    ['Circles are at places 1, 4, 7, 10. The 10th shape is a circle.', '圆在第 1、4、7、10 个，所以第 10 个是圆。'], 'pattern', { seq: ['R', 'B', 'G', 'R', 'B', 'G', 'R'], slots: 3, palette: 'RBG' }, { shape: true }),
  mk(4, 'What number comes next? 20, 17, 14, 11, __', '下一个数是几？20、17、14、11、__',
    [6, 7, 8, 9, 10], 2, [['Are the numbers going up or down?', '数是变大还是变小？'], ['Each time it goes down by 3.', '每次少 3。']],
    ['The numbers go down by 3. 11 − 3 = 8.', '每次减 3，11 − 3 = 8。'], 'pattern', { nums: [20, 17, 14, 11], slots: 1 }),
  mk(4, 'What number comes next? 1, 2, 4, 7, 11, __', '下一个数是几？1、2、4、7、11、__',
    [14, 15, 16, 17, 18], 2, [['Show the jumps. Are they all the same?', '显示每次变化，每次加的一样吗？'], ['The jumps are +1, +2, +3, +4. What is the next jump?', '变化是 +1、+2、+3、+4，下一次加几？']],
    ['Each jump is one bigger: +1, +2, +3, +4, +5. 11 + 5 = 16.', '每次多加 1：+1、+2、+3、+4、+5。11 + 5 = 16。'], 'pattern', { nums: [1, 2, 4, 7, 11], slots: 1 }),
  mk(4, 'The pattern continues. How many stars are in the first 12 shapes?', '这个规律继续下去。前 12 个图形里有几颗星星？',
    [4, 6, 8, 9, 12], 2, [['Star, star, triangle repeats.', '“星、星、三角形”一组重复。'], ['12 shapes make 4 groups. Each group has 2 stars.', '12 个图形是 4 组，每组 2 颗星。']],
    ['Each group of 3 has 2 stars. 12 shapes are 4 groups: 2, 4, 6, 8 stars.', '每 3 个一组，有 2 颗星。12 个是 4 组：2、4、6、8 颗星。'], 'pattern', { seq: ['Y', 'Y', 'G', 'Y', 'Y', 'G'], slots: 6, palette: 'YG' }),
  mk(5, 'Tower 1 has 1 block, tower 2 has 3 blocks and tower 3 has 5 blocks. The pattern continues. How many blocks are in tower 6?', '第 1 座塔有 1 块积木，第 2 座有 3 块，第 3 座有 5 块。照这个规律，第 6 座塔有几块？',
    [9, 10, 11, 12, 13], 2, [['How many more blocks does each tower have?', '每座塔比前一座多几块？'], ['+2 each time: 5, 7, …', '每次加 2：5、7……']],
    ['1, 3, 5, 7, 9, 11. Tower 6 has 11 blocks.', '1、3、5、7、9、11，第 6 座有 11 块。'], 'pattern', { nums: [1, 3, 5], slots: 3 }),
  mk(5, 'The pattern keeps going. What is the 15th shape?', '这个规律一直继续。第 15 个图形是什么？',
    ['R', 'B', 'G', 'Y', 'P'], 1, [['Find the repeating group. How many shapes are in it?', '找出重复的一组，一组有几个？'], ['A group has 4 shapes. Shapes 13, 14 and 15 start a new group.', '一组 4 个。第 13、14、15 个是新一组的开头。']],
    ['Circle, square, square, triangle repeats. The 13th is a circle, and the 14th and 15th are squares.', '“圆、正方形、正方形、三角形”一组重复。第 13 个是圆，第 14、15 个是正方形。'], 'pattern', { seq: ['R', 'B', 'B', 'G', 'R', 'B', 'B', 'G'], slots: 7, palette: 'RBG' }, { shape: true }),
  mk(5, 'What is the 10th number? 1, 5, 2, 6, 3, 7, …', '第 10 个数是几？1、5、2、6、3、7、……',
    [5, 6, 8, 9, 10], 3, [['Look at every other number: 1, 2, 3, … and 5, 6, 7, …', '隔一个看：1、2、3……和 5、6、7……'], ['The 2nd, 4th, 6th, 8th and 10th numbers are 5, 6, 7, …', '第 2、4、6、8、10 个数是 5、6、7……']],
    ['Two patterns take turns. The even places go 5, 6, 7, 8, 9, so the 10th number is 9.', '两个规律交替出现。双数位置是 5、6、7、8、9，所以第 10 个是 9。'], 'pattern', { nums: [1, 5, 2, 6, 3, 7], slots: 4 })
];

registerSeries({
  id: 'pattern', next: null,
  tag: ['Patterns', '找规律'], name: ['Pattern Island', '规律岛'], desc: ['Shapes and numbers that repeat or grow', '会重复、会变大的图形和数'],
  // video: { url: 'https://www.youtube.com/watch?v=...', title: ['English title', '中文标题'] },
  video: null,
  questions: Q_PATTERN
});
