// Leap G4 · 混合运算营 D：应用建模、干扰信息

const numSet = (good, wrongs) => {
  const set = [String(good)];
  wrongs.forEach(w => { const s = String(w); if (s !== String(good) && !set.includes(s)) set.push(s); });
  let k = 1;
  while (set.length < 5) {
    const s = String(Number(good) + k);
    if (!set.includes(s)) set.push(s);
    k++;
  }
  const choices = shuffle(set.slice(0, 5));
  return { choices, answer: choices.indexOf(String(good)) };
};

const LESSON_MIX4 = [
  {
    title: ['Some numbers are extra', '有的数用不到'],
    text: ['4 bags with 6 stickers, and the shop is 8 km away. To find how many stickers, use 4 × 6. The 8 km is not needed.',
      '4 袋贴纸，每袋 6 张，商店在 8 千米外。求一共多少张，用 4 × 6。8 千米用不到。'],
    art(el) {
      el.innerHTML = lessonEq('4 × 6 = 24', .3)
        + `<p class="big appear" style="animation-delay:1.2s;color:#c8435a">${T('8 km is extra', '8 千米是多余的')}</p>`;
    }
  },
  {
    title: ['Read what is asked', '先看清问的是什么'],
    text: ['If the question asks “how many stickers”, distance, price, and age are often extra. Circle only the numbers the question uses.',
      '如果问的是“一共多少张”，路程、价钱、年龄常常是多余的。只圈问题真正用到的数。'],
    art(el) {
      el.innerHTML = lessonEq('question → useful numbers', 1);
    }
  },
  {
    title: ['Then compute', '圈完再计算'],
    text: ['20 cookies, eat 1/4, then eat 3 more. A plate costs 6 dollars. Left is 20 − 5 − 3 = 12. The 6 dollars is extra.',
      '20 块饼干，先吃 1/4，再吃 3 块。盘子要 6 元。剩下 20 − 5 − 3 = 12。6 元是多余的。'],
    art(el) {
      el.innerHTML = lessonEq('20 − 5 − 3 = 12', 1);
    }
  },
  {
    title: ['A fraction can hide in the story', '分数也会藏在故事里'],
    text: ['1/4 of 20 birds fly away. The tree is 7 years old. Flying birds: 20 ÷ 4 = 5. The age is extra.',
      '20 只鸟飞走 1/4。这棵树 7 岁了。飞走的是 20 ÷ 4 = 5。年龄是多余的。'],
    art(el) {
      el.innerHTML = lessonEq('20 ÷ 4 = 5', 1);
    }
  },
  {
    title: ['Check the units', '看单位是否对得上'],
    text: ['Kilometers do not count stickers. Dollars do not count cookies. If the unit does not match the question, that number is extra.',
      '千米不能用来数贴纸，钱也不能用来数饼干。单位和问题对不上，那个数就是多余的。'],
    art(el) {
      el.innerHTML = lessonEq('same unit → keep', .4) + lessonEq('other unit → extra', 1.4);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 stories. Some numbers are not needed. Cross them out, then compute. A mini game every 10 questions.',
      '20 道四年级应用题。有的数用不到。先划掉，再计算。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_MIX4 = [
  () => {
    const packs = ri(3, 8), each = ri(3, 9);
    let km = ri(2, 12);
    while (km === packs || km === each) km = ri(2, 15);
    const good = String(km);
    const { choices, answer } = numSet(good, [packs, each, packs * each, each + km]);
    return cq({ pts: 3, choices, answer,
      q: [`${packs} bags, ${each} stickers in each. The shop is ${km} km away. Which number is NOT needed to find how many stickers?`,
        `${packs} 袋贴纸，每袋 ${each} 张。商店在 ${km} 千米外。求一共多少张时，哪个数用不到？`],
      hints: [['Distance does not count stickers.', '路程不能用来数贴纸。']],
      explain: [`${km} km is extra.`, `${km} 千米是多余的。`] });
  },
  () => {
    const packs = ri(3, 8), each = ri(3, 8), km = ri(2, 9), ans = packs * each;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`${packs} bags with ${each} stickers in each. The shop is ${km} km away. How many stickers?`,
        `${packs} 袋贴纸，每袋 ${each} 张。商店在 ${km} 千米外。一共有多少张？`],
      hints: [[`Use ${packs} × ${each}. Ignore ${km} km.`, `用 ${packs} × ${each}。${km} 千米不用管。`]],
      explain: [`${ans}.`, `${ans} 张。`] });
  },
  () => {
    const q = ri(3, 8), N = 4 * q;
    let age = ri(2, 15);
    while (age === N || age === q || age === 4) age = ri(2, 18);
    return cq({ pts: 3, input: true, answer: q,
      q: [`${N} birds. 1/4 fly away. The tree is ${age} years old. How many birds fly away?`,
        `${N} 只鸟，飞走 1/4。这棵树 ${age} 岁了。飞走了几只？`],
      hints: [[`The age is extra. ${N} ÷ 4 = ${q}.`, `年龄是多余的。${N} ÷ 4 = ${q}。`]],
      explain: [`${q}.`, `${q} 只。`] });
  },
  () => {
    const packs = ri(3, 7), each = ri(3, 8);
    let km = ri(2, 9);
    while (km === packs || km === each) km = ri(2, 12);
    const good = `${packs} × ${each}`;
    const choices = shuffle([good, `${packs} + ${each}`, `${packs} × ${km}`, `${each} + ${km}`, `${packs} + ${each} + ${km}`]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`${packs} bags, ${each} in each, and the shop is ${km} km away. Which calculation finds the number of items?`,
        `${packs} 袋，每袋 ${each} 个，商店在 ${km} 千米外。哪个算式能求出物品个数？`],
      hints: [['Multiply bags by how many are in each bag.', '袋数乘每袋的个数。']],
      explain: [`${good} = ${packs * each}.`, `${good} = ${packs * each}。`] });
  },
  () => {
    const hops = ri(3, 8), size = ri(2, 6);
    let years = ri(2, 12);
    const ans = hops * size;
    while (years === hops || years === size || years === ans) years = ri(2, 15);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A kangaroo hops ${hops} times, ${size} m each hop. The kangaroo is ${years} years old. How many meters does it hop?`,
        `袋鼠跳了 ${hops} 下，每下 ${size} 米。这只袋鼠 ${years} 岁。它一共跳了多少米？`],
      hints: [[`Age is extra. ${hops} × ${size} = ${ans}.`, `年龄是多余的。${hops} × ${size} = ${ans}。`]],
      explain: [`${ans} m.`, `${ans} 米。`] });
  },
  () => {
    const N = pick([16, 20, 24, 28]), extra = ri(2, 4), part = N / 4;
    let price = ri(6, 12);
    while ([N, extra, part, 4].includes(price)) price = ri(6, 15);
    const good = String(price);
    const { choices, answer } = numSet(good, [N, extra, part, 4]);
    return cq({ pts: 4, choices, answer,
      q: [`${N} cookies. Eat 1/4, then eat ${extra} more. A plate costs ${price} dollars. Which number is NOT needed to find how many cookies are left?`,
        `${N} 块饼干，先吃 1/4，再吃 ${extra} 块。盘子要 ${price} 元。求还剩几块时，哪个数用不到？`],
      hints: [['The price is a different unit.', '价钱的单位不一样。']],
      explain: [`${price} is extra.`, `${price} 是多余的。`] });
  },
  () => {
    const N = pick([16, 20, 24, 28]), extra = ri(2, 4), ans = N - N / 4 - extra, price = 6;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${N} cookies. Eat 1/4 of them, then eat ${extra} more. A plate costs ${price} dollars. How many cookies are left?`,
        `${N} 块饼干，先吃掉 1/4，再吃 ${extra} 块。盘子要 ${price} 元。还剩几块饼干？`],
      hints: [[`Eat ${N / 4} first. The price is extra.`, `先吃 ${N / 4} 块。价钱是多余的。`],
        [`${N} − ${N / 4} − ${extra} = ${ans}.`, `${N} − ${N / 4} − ${extra} = ${ans}。`]],
      explain: [`${ans}.`, `${ans} 块。`] });
  },
  () => {
    const q = ri(3, 8), N = 5 * q, girls = 2 * q;
    let room = ri(1, 20);
    while ([N, girls, 2, 5].includes(room)) room = ri(1, 24);
    return cq({ pts: 4, input: true, answer: girls,
      q: [`A class of ${N} is in room ${room}. 2/5 of the students are girls. How many girls?`,
        `${N} 人的班在 ${room} 号教室。其中 2/5 是女生。女生有几人？`],
      hints: [[`The room number is extra. ${N} ÷ 5 × 2 = ${girls}.`, `教室号是多余的。${N} ÷ 5 × 2 = ${girls}。`]],
      explain: [`${girls}.`, `${girls} 人。`] });
  },
  () => {
    const q = ri(3, 7), N = 5 * q, girls = 2 * q;
    let room = ri(1, 18);
    while ([N, girls, 2, 5].includes(room)) room = ri(1, 22);
    const good = String(room);
    const { choices, answer } = numSet(good, [N, girls, 2, 5]);
    return cq({ pts: 3, choices, answer,
      q: [`${N} students in room ${room}. 2/5 are girls. Which number is NOT needed to find how many girls?`,
        `${N} 名学生在 ${room} 号教室，2/5 是女生。求女生人数时，哪个数用不到？`],
      hints: [['A room number does not tell you how many girls.', '教室号不能告诉你有多少女生。']],
      explain: [`${room} is extra.`, `${room} 是多余的。`] });
  },
  () => {
    const boxes = ri(3, 6), each = ri(4, 8), give = ri(2, 5), ans = boxes * each - give;
    let ribbon = ri(7, 14);
    while ([boxes, each, give, ans].includes(ribbon)) ribbon = ri(7, 16);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${boxes} boxes with ${each} pencils in each. You give away ${give}. The ribbon on the box is ${ribbon} cm. How many pencils are left?`,
        `${boxes} 盒铅笔，每盒 ${each} 支。送出 ${give} 支。盒子上的丝带长 ${ribbon} 厘米。还剩几支铅笔？`],
      hints: [[`The ribbon is extra. ${boxes} × ${each} − ${give} = ${ans}.`, `丝带是多余的。${boxes} × ${each} − ${give} = ${ans}。`]],
      explain: [`${ans}.`, `${ans} 支。`] });
  },
  () => {
    const N = pick([20, 24, 28, 32, 40]);
    let kg = ri(2, 9);
    const unread = N / 4;
    while ([N, unread, 4, 3].includes(kg)) kg = ri(2, 12);
    const good = String(kg);
    const { choices, answer } = numSet(good, [N, unread, 4, 3]);
    return cq({ pts: 3, choices, answer,
      q: [`A book has ${N} pages and weighs ${kg} kg. You have read 3/4 of it. Which number is NOT needed to find the unread pages?`,
        `一本书 ${N} 页，重 ${kg} 千克。已经读了 3/4。求还没读的页数时，哪个数用不到？`],
      hints: [['Weight is not pages.', '重量不是页数。']],
      explain: [`${kg} kg is extra.`, `${kg} 千克是多余的。`] });
  },
  () => {
    const N = pick([20, 24, 28, 32, 40]), ans = N / 4, kg = 2;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`A book has ${N} pages and weighs ${kg} kg. You read 3/4 of it. How many pages are unread?`,
        `一本书 ${N} 页，重 ${kg} 千克。读了 3/4。还没读多少页？`],
      hints: [[`Unread is 1/4. The weight is extra. ${N} ÷ 4 = ${ans}.`, `没读的是 1/4。重量是多余的。${N} ÷ 4 = ${ans}。`]],
      explain: [`${ans} pages.`, `${ans} 页。`] });
  },
  () => {
    const friends = ri(3, 6), each = ri(3, 6), N = friends * each, more = ri(1, 3), ans = each + more;
    let jar = ri(8, 16);
    while ([friends, each, N, more, ans].includes(jar)) jar = ri(8, 18);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${N} cookies are shared equally by ${friends} friends. Then each friend gets ${more} more. A jar nearby holds ${jar} cookies. How many cookies does each friend have?`,
        `${N} 块饼干平均分给 ${friends} 个朋友，每人再得到 ${more} 块。旁边的罐子里有 ${jar} 块。每人有几块？`],
      hints: [[`The jar is extra. ${N} ÷ ${friends} = ${each}, then + ${more}.`, `罐子是多余的。${N} ÷ ${friends} = ${each}，再加 ${more}。`]],
      explain: [`${ans}.`, `${ans} 块。`] });
  },
  () => {
    const q = ri(4, 8), N = 5 * q, ans = 2 * q;
    let colors = ri(2, 9);
    while ([q, N, ans, 2, 5].includes(colors)) colors = ri(2, 12);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`A ribbon is ${N} cm. A bow uses 2/5 of it and has ${colors} colors. How many centimeters does the bow use?`,
        `丝带长 ${N} 厘米。蝴蝶结用掉 2/5，这个结有 ${colors} 种颜色。蝴蝶结用了多少厘米？`],
      hints: [[`Colors are extra. 2/5 of ${N} = ${ans}.`, `颜色是多余的。${N} 的 2/5 = ${ans}。`]],
      explain: [`${ans} cm.`, `${ans} 厘米。`] });
  },
  () => {
    const q = ri(4, 8), N = 5 * q, ans = 2 * q;
    let colors = ri(2, 9);
    while ([q, N, ans, 2, 5].includes(colors)) colors = ri(2, 12);
    const good = `${N} ÷ 5 × 2`;
    const choices = shuffle([good, `${N} − ${colors}`, `${N} × ${colors}`, `${N} + ${colors}`, `${colors} × 2`]);
    return cq({ pts: 4, choices, answer: choices.indexOf(good),
      q: [`A ${N} cm ribbon. A bow uses 2/5 of it and has ${colors} colors. Which calculation finds the centimeters used?`,
        `丝带 ${N} 厘米，蝴蝶结用掉 2/5，有 ${colors} 种颜色。哪个算式能求出用了多少厘米？`],
      hints: [['Find 2/5 of the length. Ignore the colors.', '求长度的 2/5。颜色不用管。']],
      explain: [`${good} = ${ans}.`, `${good} = ${ans}。`] });
  },
  () => {
    const a = ri(2, 5), b = ri(2, 5), ans = a + b;
    let cost = ri(6, 12);
    while ([a, b, ans, 3, a * 3, b * 3].includes(cost)) cost = ri(6, 15);
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Take 1/3 of ${a * 3} apples and 1/3 of ${b * 3} pears. The basket costs ${cost} dollars. How many pieces of fruit do you take?`,
        `拿走 ${a * 3} 个苹果的 1/3，再拿走 ${b * 3} 个梨的 1/3。篮子要 ${cost} 元。一共拿走几个水果？`],
      hints: [[`The price is extra. ${a} + ${b} = ${ans}.`, `价钱是多余的。${a} + ${b} = ${ans}。`]],
      explain: [`${ans}.`, `${ans} 个。`] });
  },
  () => {
    const a = ri(2, 5), b = ri(2, 5);
    let cost = ri(6, 12);
    while ([a, b, a + b, 3].includes(cost)) cost = ri(6, 15);
    const good = String(cost);
    const { choices, answer } = numSet(good, [a * 3, b * 3, a, b]);
    return cq({ pts: 3, choices, answer,
      q: [`1/3 of ${a * 3} apples and 1/3 of ${b * 3} pears. The basket costs ${cost} dollars. Which number is NOT needed to find how many pieces of fruit?`,
        `${a * 3} 个苹果的 1/3，加上 ${b * 3} 个梨的 1/3。篮子 ${cost} 元。求水果个数时，哪个数用不到？`],
      hints: [['Money does not count fruit.', '钱不能用来数水果。']],
      explain: [`${cost} is extra.`, `${cost} 是多余的。`] });
  },
  () => {
    const rows = ri(3, 6), seats = ri(4, 8), ans = rows * seats;
    let min = ri(10, 25);
    while ([rows, seats, ans].includes(min)) min = ri(10, 30);
    return cq({ pts: 3, input: true, answer: ans,
      q: [`A room has ${rows} rows with ${seats} seats in each row. The lesson is ${min} minutes long. How many seats?`,
        `教室有 ${rows} 排，每排 ${seats} 个座位。这节课有 ${min} 分钟。一共有多少个座位？`],
      hints: [[`Minutes are extra. ${rows} × ${seats} = ${ans}.`, `分钟数是多余的。${rows} × ${seats} = ${ans}。`]],
      explain: [`${ans}.`, `${ans} 个。`] });
  },
  () => {
    const boxes = ri(3, 6), each = ri(4, 7), price = ri(2, 4);
    let km = ri(3, 12);
    const ans = boxes * each * price;
    while ([boxes, each, price, boxes * each, ans].includes(km)) km = ri(3, 15);
    const good = String(km);
    const { choices, answer } = numSet(good, [boxes, each, price, ans]);
    return cq({ pts: 4, choices, answer,
      q: [`${boxes} boxes of ${each} pencils. Each pencil costs ${price} dollars. The shop is ${km} km away. Which number is NOT needed to find the total cost?`,
        `${boxes} 盒铅笔，每盒 ${each} 支，每支 ${price} 元。商店在 ${km} 千米外。求一共要多少钱时，哪个数用不到？`],
      hints: [['Distance is not part of the price.', '路程不算进价钱。']],
      explain: [`${km} km is extra.`, `${km} 千米是多余的。`] });
  },
  () => {
    const boxes = ri(3, 6), each = ri(4, 7), price = ri(2, 4), ans = boxes * each * price;
    let km = ri(3, 12);
    while ([boxes, each, price, ans].includes(km)) km = ri(3, 15);
    return cq({ pts: 5, boss: true, input: true, answer: ans,
      q: [`Boss: ${boxes} boxes with ${each} pencils in each. Each pencil costs ${price} dollars. The shop is ${km} km away. How much do all the pencils cost?`,
        `Boss 题：${boxes} 盒铅笔，每盒 ${each} 支，每支 ${price} 元。商店在 ${km} 千米外。这些铅笔一共多少元？`],
      hints: [[`Ignore ${km} km.`, `不用管 ${km} 千米。`],
        [`${boxes} × ${each} = ${boxes * each} pencils. Then × ${price} = ${ans}.`, `${boxes} × ${each} = ${boxes * each} 支，再乘 ${price} 得 ${ans}。`]],
      explain: [`${ans} dollars.`, `${ans} 元。`] });
  }
];

registerSeries({
  id: 'mix4', camp: true, breakEvery: 10, perRound: 20, games: ['extraout', 'fracchain', 'twostep'],
  tag: ['Mixed Ops Camp D · G4', '混合运算营 D · 四年级'],
  name: ['Stories with Extra Facts', '应用题与干扰信息'],
  desc: ['Cross out numbers the question does not use, then compute', '划掉用不到的数，再列式计算'],
  lesson: LESSON_MIX4,
  questions: Q_MIX4,
  next: 'big1'
});
