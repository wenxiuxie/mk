// 跳跳数岛 — edit or add questions in the list below.
// Each question: mk(points, English stem, 中文题目, [5 choices], index of the right choice (0 = A),
//                   [[hint 1 en, zh], [hint 2 en, zh]], [explanation en, zh], tool, tool settings, extras)
// Extras can add  unit: ['kids', '人'],  shape: true  (choices are shapes),  video: { url, title: [en, zh] }
const Q_HOP = [
  mk(3, 'A kangaroo starts at 0 and hops 2 steps each time. Where does it land after 5 hops?', '袋鼠从 0 出发，每次跳 2 格。跳 5 下后落在几？',
    [5, 7, 8, 10, 12], 3, [['Press Hop 5 times and watch the numbers.', '按 5 次“跳！”，看看落在哪些数上。'], ['Count by 2s five times: 2, 4, 6, …', '2 个 2 个数 5 次：2、4、6……']],
    ['2, 4, 6, 8, 10. After 5 hops it lands on 10.', '2、4、6、8、10，跳 5 下落在 10。'], 'hop', { max: 20, lanes: [{ start: 0, step: 2 }] }),
  mk(3, 'What number comes next? 5, 10, 15, 20, __', '下一个数是几？5、10、15、20、__',
    [21, 22, 25, 30, 35], 2, [['Each number is 5 more than the one before.', '每个数都比前一个多 5。'], ['20 + 5 = ?', '20 + 5 = ?']],
    ['Counting by 5s: 5, 10, 15, 20, 25.', '5 个 5 个数：5、10、15、20、25。'], 'hop', { max: 50, lanes: [{ start: 0, step: 5 }] }),
  mk(3, 'Sam has 6 pairs of socks. How many socks is that?', 'Sam 有 6 双袜子，一共有几只袜子？',
    [6, 8, 10, 12, 14], 3, [['A pair means 2 socks.', '一双就是 2 只。'], ['Count by 2s six times.', '2 个 2 个地数 6 次。']],
    ['2, 4, 6, 8, 10, 12. Six pairs are 12 socks.', '2、4、6、8、10、12，6 双是 12 只。'], 'hop', { max: 20, lanes: [{ start: 0, step: 2 }] }),
  mk(4, 'A kangaroo starts at 0 and hops 3 steps each time. Which number will it land on?', '袋鼠从 0 出发，每次跳 3 格。它会落在下面哪个数上？',
    [10, 14, 16, 18, 20], 3, [['Write the landing numbers: 3, 6, 9, …', '写出落点：3、6、9……'], ['Keep counting by 3s past 20. Which choice is on your list?', '3 个 3 个数到 20 以上，哪个选项在里面？']],
    ['3, 6, 9, 12, 15, 18, 21. Only 18 is on the list.', '3、6、9、12、15、18、21，只有 18 在里面。'], 'hop', { max: 30, lanes: [{ start: 0, step: 3 }] }),
  mk(4, 'Every child raises both hands. 7 children raise their hands. How many fingers are up?', '每个小朋友举起两只手，7 个小朋友一共举起多少根手指？',
    [35, 50, 60, 70, 75], 3, [['Two hands have 10 fingers.', '两只手有 10 根手指。'], ['Count by 10s seven times.', '10 个 10 个地数 7 次。']],
    ['Each child shows 10 fingers: 10, 20, 30, 40, 50, 60, 70.', '每人 10 根：10、20、30、40、50、60、70。'], 'hop', { max: 100, lanes: [{ start: 0, step: 10 }] }),
  mk(4, 'A kangaroo starts at 30 and hops back 3 steps each time. Where is it after 4 hops?', '袋鼠从 30 出发，每次往回跳 3 格。跳 4 下后在几？',
    [15, 18, 21, 24, 26], 1, [['Hopping back means the numbers get smaller.', '往回跳，数会变小。'], ['30, 27, 24, …', '30、27、24……']],
    ['30 → 27 → 24 → 21 → 18.', '30 → 27 → 24 → 21 → 18。'], 'hop', { max: 30, lanes: [{ start: 30, step: -3 }] }),
  mk(4, 'Which number is missing? 4, 8, 12, __, 20, 24', '缺了哪个数？4、8、12、__、20、24',
    [13, 14, 15, 16, 18], 3, [['How much bigger is each number than the one before?', '每个数比前一个大多少？'], ['They go up by 4. 12 + 4 = ?', '每次加 4。12 + 4 = ?']],
    ['The numbers go up by 4: 12 + 4 = 16, and 16 + 4 = 20.', '每次加 4：12 + 4 = 16，16 + 4 = 20。'], 'hop', { max: 40, lanes: [{ start: 0, step: 4 }] }),
  mk(5, 'Kangaroo A hops 2 steps at a time. Kangaroo B hops 3 steps at a time. Both start at 0. What is the first number after 0 that both land on?', '袋鼠 A 每次跳 2 格，袋鼠 B 每次跳 3 格，都从 0 出发。除了 0，它们第一次都落到的数是几？',
    [4, 5, 6, 9, 12], 2, [['A: 2, 4, 6, 8, …  B: 3, 6, 9, …', 'A：2、4、6、8…… B：3、6、9……'], ['Find the smallest number on both lists.', '找两张表里都有的最小的数。']],
    ['A lands on 2, 4, 6. B lands on 3, 6. They both land on 6 first.', 'A 落在 2、4、6，B 落在 3、6。第一次都落到的是 6。'], 'hop', { max: 20, lanes: [{ start: 0, step: 2, name: 'A +2' }, { start: 0, step: 3, name: 'B +3', color: '#3a76b8' }] }),
  mk(5, 'Mia starts at 3 and counts by 5s: 3, 8, 13, 18, … Which number will she say?', 'Mia 从 3 开始，5 个 5 个地数：3、8、13、18……她会数到下面哪个数？',
    [25, 30, 33, 35, 40], 2, [['Look at the last digit of each number.', '看看每个数的个位。'], ['The last digit is always 3 or 8.', '个位总是 3 或 8。']],
    ['3, 8, 13, 18, 23, 28, 33. Every number ends in 3 or 8, so only 33 works.', '3、8、13、18、23、28、33。个位只能是 3 或 8，所以是 33。'], 'hop', { max: 50, lanes: [{ start: 3, step: 5 }] }),
  mk(5, 'Roo hops 4 steps at a time. Rabbit hops 2 steps at a time. Both start at 0. Rabbit makes 10 hops. How many hops does Roo need to land on the same number?', '袋鼠每次跳 4 格，兔子每次跳 2 格，都从 0 出发。兔子跳了 10 下。袋鼠要跳几下才能落在同一个数上？',
    [4, 5, 6, 8, 10], 1, [['Where is Rabbit after 10 hops?', '兔子跳 10 下后在哪里？'], ['Rabbit is at 20. Count by 4s up to 20.', '兔子在 20。4 个 4 个数到 20。']],
    ['Rabbit: 10 hops of 2 reach 20. Roo: 4, 8, 12, 16, 20, which is 5 hops.', '兔子跳 10 下到 20。袋鼠：4、8、12、16、20，跳 5 下。'], 'hop', { max: 24, lanes: [{ start: 0, step: 4, name: 'Roo +4' }, { start: 0, step: 2, name: 'Rabbit +2', color: '#3a76b8' }] }, { unit: ['hops', '下'] })
];

registerSeries({
  id: 'hop', next: 'array',
  tag: ['Skip counting', '跳着数'], name: ['Hop Count Island', '跳跳数岛'], desc: ['Count by 2s, 3s, 5s and 10s on the number line', '在数轴上 2 个 2 个、5 个 5 个地跳'],
  // video: { url: 'https://www.youtube.com/watch?v=...', title: ['English title', '中文标题'] },
  video: null,
  questions: Q_HOP
});
