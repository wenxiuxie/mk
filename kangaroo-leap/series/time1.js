// Leap G4 · 时间 / 钱币进阶：经过时间、找零

const LESSON_TIME1 = [
  {
    title: ['Elapsed time', '经过时间'],
    text: ['From 3:20 to 3:45 is 25 minutes. Count on from the start time to the end time.',
      '从 3:20 到 3:45 经过 25 分钟。从开始时间往后数到结束时间。'],
    art(el) {
      el.innerHTML = lessonEq('3:20 → 3:45', .3) + lessonEq('25 minutes', 1.3);
    }
  },
  {
    title: ['Across the hour', '跨过整点'],
    text: ['From 2:50 to 3:15: first 10 minutes to 3:00, then 15 more, total 25 minutes.',
      '从 2:50 到 3:15：先到 3:00 是 10 分钟，再加 15 分钟，一共 25 分钟。'],
    art(el) {
      el.innerHTML = lessonEq('10 + 15 = 25', 1);
    }
  },
  {
    title: ['Making change', '找零'],
    text: ['Price 35, pay with 50. Change = 50 − 35 = 15.',
      '价钱 35 元，付 50 元。找零 = 50 − 35 = 15 元。'],
    art(el) {
      el.innerHTML = lessonEq('50 − 35 = 15', 1);
    }
  },
  {
    title: ['Pay with a bigger bill', '大钞付钱'],
    text: ['If something costs 28 and you pay 100, change is 72. Always subtract price from what you paid.',
      '东西 28 元，付 100 元，找零 72 元。用付出的钱减去价钱。'],
    art(el) {
      el.innerHTML = lessonEq('100 − 28 = 72', 1);
    }
  },
  {
    title: ['Two items', '买两样'],
    text: ['Book 24 and pen 9 cost 33 together. Paying 50, change is 17.',
      '书 24 元、笔 9 元，一共 33 元。付 50 元，找零 17 元。'],
    art(el) {
      el.innerHTML = lessonEq('24 + 9 = 33', .3) + lessonEq('50 − 33 = 17', 1.3);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 questions: elapsed time and making change. A mini game every 10 questions.',
      '20 道四年级题：经过时间和找零。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_TIME1 = [
  () => {
    const startM = ri(0, 35), span = ri(10, 20), endM = startM + span;
    return cq({ pts: 3, input: true, answer: span,
      q: [`From 4:${String(startM).padStart(2, '0')} to 4:${String(endM).padStart(2, '0')}, how many minutes pass?`,
        `从 4:${String(startM).padStart(2, '0')} 到 4:${String(endM).padStart(2, '0')}，经过多少分钟？`],
      hints: [[`${endM} − ${startM} = ${span}.`, `${endM} − ${startM} = ${span}。`]],
      explain: [`${span} minutes.`, `${span} 分钟。`] });
  },
  () => {
    const toHour = ri(5, 20), after = ri(5, 25), ans = toHour + after, startM = 60 - toHour;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`From 2:${String(startM).padStart(2, '0')} to 3:${String(after).padStart(2, '0')}, how many minutes pass?`,
        `从 2:${String(startM).padStart(2, '0')} 到 3:${String(after).padStart(2, '0')}，经过多少分钟？`],
      hints: [[`${toHour} minutes to 3:00, then + ${after}.`, `先到 3:00 是 ${toHour} 分钟，再加 ${after}。`]],
      explain: [`${ans} minutes.`, `${ans} 分钟。`] });
  },
  () => {
    const bill = pick([20, 50, 100]), price = ri(Math.max(1, Math.floor(bill / 5)), bill - 2), ans = bill - price;
    const { choices, answer } = numChoices(ans, [price, bill, ans + 1, Math.max(1, ans - 2)]);
    return cq({ pts: 3, choices, answer,
      q: [`An item costs ${price} yuan. You pay ${bill}. How much change?`, `一件商品 ${price} 元，付 ${bill} 元。应找回多少元？`],
      hints: [[`${bill} − ${price} = ${ans}.`, `${bill} − ${price} = ${ans}。`]],
      explain: [`${ans} yuan.`, `${ans} 元。`] });
  },
  () => {
    let a = ri(12, 30), b = ri(5, 15), bill = pick([50, 100]), total = a + b, ans = bill - total;
    while (ans <= 0) { a = ri(12, 25); b = ri(5, 12); bill = 50; total = a + b; ans = bill - total; }
    return cq({ pts: 4, input: true, answer: ans,
      q: [`Items cost ${a} and ${b} yuan. You pay ${bill}. How much change?`,
        `两样东西分别 ${a} 元和 ${b} 元，付 ${bill} 元。应找回多少？`],
      hints: [[`${a} + ${b} = ${total}.`, `${a} + ${b} = ${total}。`], [`${bill} − ${total} = ${ans}.`, `${bill} − ${total} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const choices = shuffle(['25', '20', '30', '15', '35']);
    return cq({ pts: 3, choices, answer: choices.indexOf('25'),
      q: ['From 3:20 to 3:45, how many minutes?', '从 3:20 到 3:45，经过多少分钟？'],
      hints: [['45 − 20 = 25.', '45 − 20 = 25。']],
      explain: ['25.', '25。'] });
  },
  () => {
    const choices = shuffle(['25', '35', '15', '45', '20']);
    return cq({ pts: 4, choices, answer: choices.indexOf('25'),
      q: ['From 2:50 to 3:15, how many minutes?', '从 2:50 到 3:15，经过多少分钟？'],
      hints: [['10 to 3:00, then 15 more.', '先 10 分钟到 3:00，再 15 分钟。']],
      explain: ['25.', '25。'] });
  },
  () => cq({ pts: 3, input: true, answer: 15,
    q: ['Price 35 yuan, pay 50. Change?', '价钱 35 元，付 50 元。找零？'],
    hints: [['50 − 35 = 15.', '50 − 35 = 15。']],
    explain: ['15.', '15。'] }),
  () => {
    const start = 10, span = ri(15, 40), end = start + span;
    return cq({ pts: 3, input: true, answer: span,
      q: [`A class starts at 9:${String(start).padStart(2, '0')} and ends at 9:${String(end).padStart(2, '0')}. How long is the class?`,
        `课从 9:${String(start).padStart(2, '0')} 上到 9:${String(end).padStart(2, '0')}。这节课多长？`],
      hints: [[`${end} − ${start} = ${span}.`, `${end} − ${start} = ${span}。`]],
      explain: [`${span} minutes.`, `${span} 分钟。`] });
  },
  () => {
    const price = ri(28, 85), ans = 100 - price;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`Something costs ${price} yuan. You pay 100. Change?`, `东西 ${price} 元，付 100 元。找零多少？`],
      hints: [[`100 − ${price} = ${ans}.`, `100 − ${price} = ${ans}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => cq({ pts: 4, input: true, answer: 35,
    q: ['From 4:45 to 5:20, how many minutes?', '从 4:45 到 5:20，经过多少分钟？'],
    hints: [['15 to 5:00, then 20.', '先 15 分钟到 5:00，再 20 分钟。']],
    explain: ['35.', '35。'] }),
  () => {
    const a = 18, b = 27, bill = 50, ans = bill - a - b;
    const { choices, answer } = numChoices(ans, [a + b, bill - a, a, b]);
    return cq({ pts: 4, choices, answer,
      q: [`Snacks cost ${a} and ${b}. Pay ${bill}. Change?`, `点心 ${a} 元和 ${b} 元，付 ${bill} 元。找零？`],
      hints: [[`${a}+${b}=${a + b}, then ${bill}−${a + b}.`, '先加再减。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const choices = [
      T('50 − 28', '50 − 28'), T('50 + 28', '50 + 28'), T('28 − 50', '28 − 50'),
      T('50 × 28', '50 × 28'), T('28 ÷ 50', '28 ÷ 50')
    ];
    return cq({ pts: 3, choices, answer: 0,
      q: ['Price 28, pay 50. Which calculates the change?', '价钱 28，付 50。哪个算式求找零？'],
      hints: [['Change = money paid − price.', '找零 = 付出的钱 − 价钱。']],
      explain: ['50 − 28.', '50 − 28。'] });
  },
  () => cq({ pts: 4, input: true, answer: 10,
    q: ['A film starts at 1:30 and lasts 40 minutes. It ends at 2:□. What is □?',
      '电影 1:30 开始，放 40 分钟。结束于 2:□。□ 是多少？'],
    hints: [['30 + 40 = 70 minutes past 1:00 → 2:10.', '1 点过 70 分就是 2:10。']],
    explain: ['10.', '10。'] }),
  () => cq({ pts: 3, input: true, answer: 36,
    q: ['Price 64, pay 100. Change?', '价钱 64 元，付 100 元。找零？'],
    hints: [['100 − 64 = 36.', '100 − 64 = 36。']],
    explain: ['36.', '36。'] }),
  () => {
    const choices = shuffle(['45', '15', '30', '60', '20']);
    return cq({ pts: 4, choices, answer: choices.indexOf('45'),
      q: ['From 10:30 to 11:15, how many minutes?', '从 10:30 到 11:15，经过多少分钟？'],
      hints: [['30 to 11:00, then 15.', '先 30 分钟到 11:00，再 15。']],
      explain: ['45.', '45。'] });
  },
  () => cq({ pts: 4, input: true, answer: 20,
    q: ['Two tickets cost 15 yuan each. You pay 50. Change?', '两张票每张 15 元，付 50 元。找零？'],
    hints: [['2 × 15 = 30, then 50 − 30 = 20.', '2 × 15 = 30，再 50 − 30。']],
    explain: ['20.', '20。'] }),
  () => cq({ pts: 3, input: true, answer: 20,
    q: ['From 8:00 to 8:20, how many minutes?', '从 8:00 到 8:20，经过多少分钟？'],
    hints: [['20 − 0 = 20.', '20 − 0 = 20。']],
    explain: ['20.', '20。'] }),
  () => {
    const choices = shuffle(['72', '28', '100', '128', '82']);
    return cq({ pts: 4, choices, answer: choices.indexOf('72'),
      q: ['Price 28, pay 100. Change?', '价钱 28 元，付 100 元。找零？'],
      hints: [['100 − 28 = 72.', '100 − 28 = 72。']],
      explain: ['72.', '72。'] });
  },
  () => cq({ pts: 4, input: true, answer: 50,
    q: ['From 9:10 to 10:00, how many minutes?', '从 9:10 到 10:00，经过多少分钟？'],
    hints: [['50 minutes to the next hour.', '到下一个整点还有 50 分钟。']],
    explain: ['50.', '50。'] }),
  () => cq({ pts: 5, boss: true, input: true, answer: 17,
    q: ['Boss: A book is 24 yuan, a pen is 9 yuan. You pay 50. How much change?',
      'Boss 题：书 24 元、笔 9 元，付 50 元。找零多少？'],
    hints: [['24 + 9 = 33.', '24 + 9 = 33。'], ['50 − 33 = 17.', '50 − 33 = 17。']],
    explain: ['17.', '17。'] })
];

registerSeries({
  id: 'time1', camp: true, breakEvery: 10, perRound: 20, games: ['changechase', 'blankdial', 'extraout'],
  tag: ['Time & Money · G4', '时间钱币 · 四年级'],
  name: ['Elapsed Time & Change', '经过时间与找零'],
  desc: ['Minutes between times; making change', '算经过几分钟；付钱找零'],
  lesson: LESSON_TIME1,
  questions: Q_TIME1,
  next: 'think1'
});
