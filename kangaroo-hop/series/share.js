// 平分岛 — edit or add questions in the list below.
// Each question: mk(points, English stem, 中文题目, [5 choices], index of the right choice (0 = A),
//                   [[hint 1 en, zh], [hint 2 en, zh]], [explanation en, zh], tool, tool settings, extras)
// Extras can add  unit: ['kids', '人'],  shape: true  (choices are shapes),  video: { url, title: [en, zh] }
const Q_SHARE = [
  mk(3, 'Two friends share 8 cookies equally. How many cookies does each friend get?', '两个好朋友平分 8 块饼干。每人得几块？',
    [2, 3, 4, 5, 6], 2, [['Give one to each friend, then again and again.', '每人发一块，再发一块……一直发。'], ['Equal means both get the same number.', '平分就是两人一样多。']],
    ['Each gets 4, because 4 + 4 = 8.', '每人 4 块，因为 4 + 4 = 8。'], 'share', { items: 8, plates: 2, icon: 'cookie' }),
  mk(3, '3 children share 12 stickers equally. How many stickers does each child get?', '3 个小朋友平分 12 张贴纸。每人得几张？',
    [3, 4, 5, 6, 9], 1, [['Deal them out one round at a time.', '一轮一轮地发，每人一张。'], ['How many rounds can you deal?', '能发几轮？']],
    ['Each gets 4. Check: 4 + 4 + 4 = 12.', '每人 4 张。检查：4 + 4 + 4 = 12。'], 'share', { items: 12, plates: 3, icon: 'sticker' }),
  mk(3, '10 strawberries go into 5 bowls. Each bowl gets the same number. How many strawberries are in each bowl?', '10 颗草莓放进 5 个碗里，每碗一样多。每碗几颗？',
    [1, 2, 3, 5, 10], 1, [['Put one in each bowl. How many are left?', '每碗先放 1 颗，还剩几颗？'], ['5 bowls with 2 each: 2, 4, 6, 8, 10.', '5 个碗每碗 2 颗：2、4、6、8、10。']],
    ['Each bowl gets 2. 2 + 2 + 2 + 2 + 2 = 10.', '每碗 2 颗。2 + 2 + 2 + 2 + 2 = 10。'], 'share', { items: 10, plates: 5, icon: 'berry' }),
  mk(4, '15 marbles are put into 3 bags. Each bag has the same number. How many marbles are in each bag?', '15 颗弹珠装进 3 个袋子，每袋一样多。每袋几颗？',
    [3, 4, 5, 6, 12], 2, [['Put one marble in each bag, again and again.', '每袋放一颗，一轮一轮地放。'], ['Count by 3s to 15. How many rounds is that?', '3 个 3 个数到 15，一共几轮？']],
    ['5 rounds of 3 use all 15 marbles, so each bag has 5.', '发 5 轮，每轮 3 颗，正好 15 颗，所以每袋 5 颗。'], 'share', { items: 15, plates: 3, icon: 'marble' }),
  mk(4, '14 pencils are shared equally among 4 children. Each child gets as many as possible. How many pencils are left over?', '14 支铅笔平分给 4 个小朋友，每人尽量多分。还剩几支？',
    [0, 1, 2, 3, 4], 2, [['Deal one round at a time until you cannot give everyone one more.', '一轮一轮地发，直到不够每人再发一支。'], ['After 3 rounds, 12 pencils are used.', '发 3 轮用掉 12 支。']],
    ['Each child gets 3 pencils, which uses 12. 14 − 12 = 2 are left.', '每人 3 支，用了 12 支。14 − 12 = 2 支剩下。'], 'share', { items: 14, plates: 4, icon: 'pencil' }),
  mk(4, 'There are 20 balloons. Each child gets 5 balloons. How many children get balloons?', '有 20 个气球，每个小朋友拿 5 个。几个小朋友能拿到？',
    [3, 4, 5, 10, 15], 1, [['Change the number of plates until each plate gets exactly 5.', '改变份数，直到每份正好 5 个。'], ['Count by 5s to 20.', '5 个 5 个数到 20。']],
    ['5, 10, 15, 20. That is 4 groups of 5, so 4 children.', '5、10、15、20，是 4 组，所以是 4 个小朋友。'], 'share', { items: 20, plates: 2, adjustable: true, icon: 'balloon' }, { unit: ['kids', '人'] }),
  mk(4, '3 friends share 9 apples equally. Then Mom gives each friend 1 more apple. How many apples does each friend have now?', '3 个好朋友平分 9 个苹果。然后妈妈又给每人 1 个。现在每人有几个？',
    [3, 4, 5, 10, 12], 1, [['First share 9 apples among 3 friends.', '先把 9 个苹果分给 3 人。'], ['Each gets 3 at first. Then add 1.', '一开始每人 3 个，再加 1 个。']],
    ['9 shared by 3 is 3 each. 3 + 1 = 4.', '9 个分给 3 人，每人 3 个。3 + 1 = 4。'], 'share', { items: 9, plates: 3, icon: 'apple' }),
  mk(5, 'Ann and Ben share 16 candies equally. Then Ann gives 2 of her candies to Ben. How many candies does Ben have now?', 'Ann 和 Ben 平分 16 颗糖。然后 Ann 把自己的 2 颗给了 Ben。Ben 现在有几颗？',
    [6, 8, 9, 10, 12], 3, [['First, how many does each one get?', '先算每人分到几颗。'], ['Each gets 8. Then Ben gets 2 more.', '每人 8 颗，Ben 又多了 2 颗。']],
    ['Each gets 8 at first. Ben: 8 + 2 = 10. (Ann has 6 left, and 6 + 10 = 16.)', '一开始每人 8 颗。Ben：8 + 2 = 10。（Ann 剩 6 颗，6 + 10 = 16。）'], 'share', { items: 16, plates: 2, icon: 'candy' }),
  mk(5, 'Which number of children can NOT share 12 cookies equally with none left over?', '12 块饼干要平分而且不剩。下面哪个人数分不了？',
    [2, 3, 4, 5, 6], 3, [['Try each number of plates and see if any are left over.', '把每种份数都试一试，看有没有剩下的。'], ['Try 5 plates. Does it come out even?', '试试 5 份，能正好分完吗？']],
    ['12 works for 2, 3, 4 and 6 children. With 5 children each gets 2 and 2 are left over.', '12 块可以平分给 2、3、4、6 人。分给 5 人时每人 2 块，还剩 2 块。'], 'share', { items: 12, plates: 2, adjustable: true, icon: 'cookie' }, { unit: ['kids', '人'] }),
  mk(5, 'Grandma puts her cookies into 4 boxes with 3 cookies in each box. She keeps 2 cookies for herself. How many cookies did she bake?', '奶奶把饼干装进 4 个盒子，每盒 3 块，自己还留了 2 块。奶奶一共烤了几块？',
    [12, 13, 14, 15, 16], 2, [['How many cookies are in the boxes?', '盒子里一共几块？'], ['3, 6, 9, 12 in the boxes. Then add the 2 she kept.', '盒子里 3、6、9、12 块，再加上留下的 2 块。']],
    ['4 boxes of 3 hold 12. 12 + 2 = 14.', '4 盒每盒 3 块是 12 块。12 + 2 = 14。'], 'share', { items: 14, plates: 4, icon: 'cookie' })
];

registerSeries({
  id: 'share', next: 'pattern',
  tag: ['Fair share', '平分'], name: ['Fair Share Island', '平分岛'], desc: ['Share things equally and find the leftovers', '把东西分得一样多，看看剩几个'],
  // video: { url: 'https://www.youtube.com/watch?v=...', title: ['English title', '中文标题'] },
  video: null,
  questions: Q_SHARE
});
