// Leap G4 · 分数营 E：分数应用题 — 已知部分求整体、两步故事

const LESSON_FRAC5 = [
  {
    title: ['One share tells the whole', '知道一份，就能求整体'],
    text: ['If 1/4 of a ribbon is 5 m, one share is 5 m. The whole ribbon is 4 shares: 5 × 4 = 20 m.',
      '如果丝带的 1/4 是 5 米，那么一份就是 5 米。整条是 4 份：5 × 4 = 20 米。'],
    art(el) {
      el.innerHTML = lessonEq('1/4 → 5 m', .2) + lessonEq('5 × 4 = 20 m', 1.3);
    }
  },
  {
    title: ['More than one share', '知道的不是一份'],
    text: ['If 2/5 of the class is 8 students, first find one share: 8 ÷ 2 = 4. The whole class is 5 shares: 4 × 5 = 20.',
      '如果全班的 2/5 是 8 人，先求一份：8 ÷ 2 = 4。全班是 5 份：4 × 5 = 20 人。'],
    art(el) {
      el.innerHTML = lessonEq('8 ÷ 2 = 4', .2) + lessonEq('4 × 5 = 20', 1.3);
    }
  },
  {
    title: ['What is left is also a clue', '剩下的也能当线索'],
    text: ['If 3/4 of the paper is left and that is 18 sheets, one share is 18 ÷ 3 = 6. At the start there were 6 × 4 = 24 sheets.',
      '如果还剩 3/4，而且是 18 张，一份就是 18 ÷ 3 = 6。原来有 6 × 4 = 24 张。'],
    art(el) {
      el.innerHTML = fBar(4, 3) + lessonEq('18 ÷ 3 × 4 = 24', 1.2);
    }
  },
  {
    title: ['Two steps', '故事要分两步'],
    text: ['20 cookies. Eat 1/4, then eat 3 more. Step 1: 20 ÷ 4 = 5. Step 2: 20 − 5 − 3 = 12 left.',
      '20 块饼干，先吃 1/4，再吃 3 块。第 1 步：20 ÷ 4 = 5。第 2 步：20 − 5 − 3 = 12，还剩 12 块。'],
    art(el) {
      el.innerHTML = lessonEq('20 ÷ 4 = 5', .2) + lessonEq('20 − 5 − 3 = 12', 1.3);
    }
  },
  {
    title: ['Do not skip the middle', '不要跳过中间那一步'],
    text: ['“1/3 are red, and half of the red ones are big” needs the red count before you can find the big ones.',
      '“1/3 是红色，红色里的一半是大的。”要先算出红色有多少，才能再算大的。'],
    art(el) {
      el.innerHTML = lessonEq('find the part', .3) + lessonEq('then use that part', 1.4);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 stories: find the whole from a part, and solve two steps. A mini game every 10 questions.',
      '20 道四年级应用题：从一部分求整体，以及两步故事。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_FRAC5 = [
  () => {
    const part = ri(3, 9), whole = part * 4;
    return cq({ pts: 3, input: true, answer: whole,
      q: [`1/4 of a ribbon is ${part} m. How long is the whole ribbon?`, `一条丝带的 1/4 是 ${part} 米。整条有多长？`],
      hints: [[`One share is ${part} m.`, `一份是 ${part} 米。`], [`4 shares: ${part} × 4 = ${whole}.`, `4 份：${part} × 4 = ${whole}。`]],
      explain: [`${whole} m.`, `${whole} 米。`] });
  },
  () => {
    const part = ri(4, 10), whole = part * 3;
    const { choices, answer } = numChoices(whole, [part, part * 2, part + 3, whole + part]);
    return cq({ pts: 3, choices, answer,
      q: [`1/3 of a rope is ${part} m. How long is the rope?`, `一根绳子的 1/3 是 ${part} 米。整根有多长？`],
      hints: [[`${part} × 3 = ${whole}.`, `${part} × 3 = ${whole}。`]],
      explain: [`${whole} m.`, `${whole} 米。`] });
  },
  () => {
    const share = ri(2, 6), known = share * 2, whole = share * 5;
    return cq({ pts: 4, input: true, answer: whole,
      q: [`2/5 of the class is ${known} students. How many students are in the class?`, `全班的 2/5 是 ${known} 人。全班有多少人？`],
      hints: [[`One share: ${known} ÷ 2 = ${share}.`, `一份：${known} ÷ 2 = ${share}。`], [`Whole: ${share} × 5 = ${whole}.`, `整体：${share} × 5 = ${whole}。`]],
      explain: [`${whole} students.`, `${whole} 人。`] });
  },
  () => {
    const share = ri(2, 6), known = share * 3, whole = share * 4;
    const { choices, answer } = numChoices(whole, [known, share, known + 3, whole + share]);
    return cq({ pts: 4, choices, answer,
      q: [`3/4 of the stickers is ${known}. How many stickers are there in all?`, `贴纸的 3/4 是 ${known} 张。一共有多少张？`],
      hints: [[`${known} ÷ 3 = ${share}, then × 4.`, `${known} ÷ 3 = ${share}，再乘 4。`]],
      explain: [`${whole}.`, `${whole} 张。`] });
  },
  () => {
    const share = ri(2, 8), known = share * 2;
    const { choices, answer } = numChoices(share, [known, share * 5, share * 2, known + 2]);
    return cq({ pts: 3, choices, answer,
      q: [`2/5 of a path is ${known} m. How many meters is one equal part?`, `一条小路的 2/5 是 ${known} 米。平均每一份是几米？`],
      hints: [[`${known} ÷ 2 = ${share}.`, `${known} ÷ 2 = ${share}。`]],
      explain: [`${share} m.`, `${share} 米。`] });
  },
  () => {
    const q = ri(3, 9), N = q * 3, stay = q * 2;
    return cq({ pts: 3, input: true, answer: stay,
      q: [`${N} birds are in a tree. 1/3 fly away. How many stay?`, `树上有 ${N} 只鸟，飞走 1/3。还剩几只？`],
      hints: [[`Fly away ${q}. Stay ${N} − ${q}.`, `飞走 ${q} 只。剩下 ${N} − ${q}。`]],
      explain: [`${stay}.`, `${stay} 只。`] });
  },
  () => {
    const N = pick([16, 20, 24, 28, 32]), eaten = N / 4, extra = ri(1, 3), left = N - eaten - extra;
    const { choices, answer } = numChoices(left, [N - eaten, eaten, left + extra, N]);
    return cq({ pts: 4, choices, answer,
      q: [`${N} cookies. Eat 1/4 of them, then eat ${extra} more. How many are left?`,
        `${N} 块饼干，先吃掉 1/4，再吃 ${extra} 块。还剩几块？`],
      hints: [[`First eat ${eaten}.`, `先吃 ${eaten} 块。`], [`Then ${N} − ${eaten} − ${extra} = ${left}.`, `再算 ${N} − ${eaten} − ${extra} = ${left}。`]],
      explain: [`${left} left.`, `还剩 ${left} 块。`] });
  },
  () => {
    const q = ri(2, 6), N = q * 6, red = N / 2, big = red / 3;
    return cq({ pts: 4, input: true, answer: big,
      q: [`${N} marbles. 1/2 are red, and 1/3 of the red ones are big. How many big red marbles?`,
        `${N} 颗弹珠，1/2 是红色，红色中的 1/3 是大的。大红弹珠有几颗？`],
      hints: [[`Red: ${red}.`, `红色 ${red} 颗。`], [`Big red: ${red} ÷ 3 = ${big}.`, `大红：${red} ÷ 3 = ${big}。`]],
      explain: [`${big}.`, `${big} 颗。`] });
  },
  () => {
    const q = ri(3, 8), N = q * 5, read = q * 3;
    const { choices, answer } = numChoices(read, [q * 2, q, N - read, read + q]);
    return cq({ pts: 4, choices, answer,
      q: [`A book has ${N} pages. You read 2/5 yesterday and 1/5 today. How many pages have you read?`,
        `一本书 ${N} 页。昨天读了 2/5，今天读了 1/5。一共读了多少页？`],
      hints: [[`2/5 + 1/5 = 3/5.`, `2/5 + 1/5 = 3/5。`], [`3/5 of ${N} = ${read}.`, `${N} 的 3/5 = ${read}。`]],
      explain: [`${read} pages.`, `${read} 页。`] });
  },
  () => {
    const q = ri(2, 5), N = q * 8, gave = q * 3, buy = ri(2, 6), now = N - gave + buy;
    return cq({ pts: 4, input: true, answer: now,
      q: [`You had ${N} apples. You gave away 3/8 of them, then bought ${buy} more. How many do you have now?`,
        `原来有 ${N} 个苹果，送出 3/8，又买了 ${buy} 个。现在有几个？`],
      hints: [[`Gave away ${gave}. Left ${N - gave}.`, `送出 ${gave} 个，还剩 ${N - gave} 个。`],
        [`Then + ${buy} = ${now}.`, `再加 ${buy}，是 ${now}。`]],
      explain: [`${now}.`, `${now} 个。`] });
  },
  () => {
    const share = ri(3, 8), known = share * 2, whole = share * 3;
    const { choices, answer } = numChoices(whole, [known, share, known + 2, whole + share]);
    return cq({ pts: 4, choices, answer,
      q: [`A kangaroo has hopped 2/3 of a path, and that is ${known} m. How long is the path?`,
        `袋鼠已经跳了小路的 2/3，这段是 ${known} 米。整条小路有多长？`],
      hints: [[`${known} ÷ 2 × 3 = ${whole}.`, `${known} ÷ 2 × 3 = ${whole}。`]],
      explain: [`${whole} m.`, `${whole} 米。`] });
  },
  () => {
    const share = ri(2, 7), known = share * 3, whole = share * 5;
    return cq({ pts: 4, input: true, answer: whole,
      q: [`3/5 of the coins in a jar is ${known} coins. How many coins are in the jar?`,
        `罐子里的硬币有 3/5 是 ${known} 枚。罐子里一共有多少枚？`],
      hints: [[`${known} ÷ 3 = ${share}.`, `${known} ÷ 3 = ${share}。`], [`${share} × 5 = ${whole}.`, `${share} × 5 = ${whole}。`]],
      explain: [`${whole} coins.`, `${whole} 枚。`] });
  },
  () => {
    const share = ri(3, 8), left = share * 3, whole = share * 4;
    return cq({ pts: 4, input: true, answer: whole,
      q: [`After using 1/4 of the paper, ${left} sheets are left. How many sheets were there at first?`,
        `用掉纸的 1/4 以后，还剩 ${left} 张。原来有多少张？`],
      hints: [[`${left} sheets are 3/4, so one share is ${share}.`, `${left} 张是 3/4，一份是 ${share} 张。`],
        [`${share} × 4 = ${whole}.`, `${share} × 4 = ${whole}。`]],
      explain: [`${whole} sheets.`, `${whole} 张。`] });
  },
  () => {
    const share = ri(3, 8), known = share * 2, whole = share * 3;
    const { choices, answer } = numChoices(whole, [known, share, known + 3, whole - share]);
    return cq({ pts: 4, choices, answer,
      q: [`2/3 of the books are on the shelf: ${known} books. How many books are there altogether?`,
        `书的 2/3 在书架上，有 ${known} 本。一共有多少本书？`],
      hints: [[`${known} ÷ 2 × 3 = ${whole}.`, `${known} ÷ 2 × 3 = ${whole}。`]],
      explain: [`${whole} books.`, `${whole} 本。`] });
  },
  () => {
    const half = ri(6, 12), whole = half * 2;
    const { choices, answer } = numChoices(whole, [half, half + 2, half * 3, whole + 2]);
    return cq({ pts: 3, choices, answer,
      q: [`Half of the nuts in a bag is ${half}. How many nuts are in the bag?`, `一袋坚果的一半是 ${half} 颗。这袋一共有多少颗？`],
      hints: [[`${half} × 2 = ${whole}.`, `${half} × 2 = ${whole}。`]],
      explain: [`${whole}.`, `${whole} 颗。`] });
  },
  () => {
    const N = pick([20, 40, 60]), walk = N / 4, rest = N - walk, bus = rest / 5 * 2;
    return cq({ pts: 5, input: true, answer: bus,
      q: [`${N} students. 1/4 walk to school. Of the students who do not walk, 2/5 take the bus. How many take the bus?`,
        `${N} 名学生，1/4 步行上学。不步行的学生中，2/5 乘公交。乘公交的有几人？`],
      hints: [[`Walk: ${walk}. The rest: ${rest}.`, `步行 ${walk} 人，其余 ${rest} 人。`],
        [`2/5 of ${rest} = ${bus}.`, `${rest} 的 2/5 = ${bus}。`]],
      explain: [`${bus}.`, `${bus} 人。`] });
  },
  () => {
    const N = pick([24, 36, 48, 60]), friend = N / 4, sister = N / 3, left = N - friend - sister;
    return cq({ pts: 5, input: true, answer: left,
      q: [`${N} pencils. Give 1/4 to a friend and 1/3 of the original number to a sister. How many are left?`,
        `${N} 支铅笔，把 1/4 送给朋友，再把原来支数的 1/3 送给姐姐。还剩几支？`],
      hints: [[`Friend ${friend}, sister ${sister}.`, `朋友 ${friend} 支，姐姐 ${sister} 支。`],
        [`${N} − ${friend} − ${sister} = ${left}.`, `${N} − ${friend} − ${sister} = ${left}。`]],
      explain: [`${left} left.`, `还剩 ${left} 支。`] });
  },
  () => {
    const share = ri(2, 7), short = share, long = share * 4;
    const { choices, answer } = numChoices(long, [short, share * 5, short * 2, long + share]);
    return cq({ pts: 4, choices, answer,
      q: [`A rope is cut into a short piece and a long piece. The short piece is 1/5 of the rope and is ${short} m. How long is the long piece?`,
        `一根绳子剪成短的和长的。短的是整根的 1/5，长 ${short} 米。长的那一段是几米？`],
      hints: [[`The long piece is 4/5: ${short} × 4 = ${long}.`, `长的是 4/5：${short} × 4 = ${long}。`]],
      explain: [`${long} m.`, `${long} 米。`] });
  },
  () => {
    const q = ri(1, 4), N = q * 14, yellow = q * 6, vase = yellow / 2;
    return cq({ pts: 4, input: true, answer: vase,
      q: [`${N} flowers. 3/7 are yellow. Half of the yellow flowers are in a vase. How many yellow flowers are in the vase?`,
        `${N} 朵花，3/7 是黄色。黄色花的一半插在花瓶里。花瓶里有几朵黄花？`],
      hints: [[`Yellow: ${yellow}.`, `黄色 ${yellow} 朵。`], [`Half of ${yellow} is ${vase}.`, `${yellow} 的一半是 ${vase}。`]],
      explain: [`${vase}.`, `${vase} 朵。`] });
  },
  () => {
    const N = pick([30, 45, 60]), toA = N / 5 * 2, left1 = N - toA, toB = left1 / 3, still = left1 - toB;
    return cq({ pts: 5, boss: true, input: true, answer: still,
      q: [`Boss: A box has ${N} pencils. 2/5 are given to class A. Then 1/3 of the pencils still in the box are given to class B. How many pencils are still in the box?`,
        `Boss 题：盒子里有 ${N} 支铅笔。先把 2/5 送给 A 班，再把盒子里剩下的 1/3 送给 B 班。盒子里最后还剩几支？`],
      hints: [[`Class A gets ${toA}. Left in the box: ${left1}.`, `A 班拿走 ${toA} 支，盒中还剩 ${left1} 支。`],
        [`Class B gets ${toB}. Still in the box: ${still}.`, `B 班拿走 ${toB} 支，最后还剩 ${still} 支。`]],
      explain: [`${still}.`, `${still} 支。`] });
  }
];

registerSeries({
  id: 'frac5', camp: true, breakEvery: 10, perRound: 20, games: ['twostep', 'jarwhole', 'frachop'],
  tag: ['Fraction Camp E · G4', '分数营 E · 四年级'],
  name: ['Fraction Stories', '分数应用题'],
  desc: ['Find the whole from a part; two-step stories', '已知部分求整体；两步故事'],
  lesson: LESSON_FRAC5,
  questions: Q_FRAC5,
  next: 'mix1'
});
