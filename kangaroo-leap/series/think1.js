// Leap G4 · 竞赛思维选组：规律与简单逻辑（独立于 Hop）

const LESSON_THINK1 = [
  {
    title: ['Find the rule', '找规律'],
    text: ['2, 5, 8, 11… each time add 3. The next is 14.',
      '2、5、8、11……每次加 3。下一个是 14。'],
    art(el) {
      el.innerHTML = lessonEq('+3, +3, +3', 1);
    }
  },
  {
    title: ['Growing steps', '步子越来越大'],
    text: ['1, 2, 4, 7, 11… the differences are +1, +2, +3, +4. Next add 5 → 16.',
      '1、2、4、7、11……差是 +1、+2、+3、+4。下一步加 5 → 16。'],
    art(el) {
      el.innerHTML = lessonEq('1, 2, 4, 7, 11, 16', 1);
    }
  },
  {
    title: ['Double each time', '每次翻倍'],
    text: ['3, 6, 12, 24… multiply by 2 each time. Next is 48.',
      '3、6、12、24……每次乘 2。下一个是 48。'],
    art(el) {
      el.innerHTML = lessonEq('×2, ×2, ×2', 1);
    }
  },
  {
    title: ['Which does not belong?', '谁是异类'],
    text: ['Look for the odd one out: maybe the only odd number, or the only one that is not a multiple of 5.',
      '找那个不一样的：可能是唯一的奇数，或唯一不是 5 的倍数的数。'],
    art(el) {
      el.innerHTML = lessonEq('spot the odd one', 1);
    }
  },
  {
    title: ['Read carefully', '仔细读题'],
    text: ['Contest questions often hide a simple rule. Write the differences or ratios before you guess.',
      '竞赛题常常藏着简单规律。先写出相邻差或倍数，再猜。'],
    art(el) {
      el.innerHTML = lessonEq('differences → rule', 1);
    }
  },
  {
    title: ['Mission time!', '开始闯关！'],
    text: ['20 Grade-4 thinking questions: sequences and odd-one-out. A mini game every 10 questions.',
      '20 道四年级思维题：找规律、找异类。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>`;
    }
  }
];

const Q_THINK1 = [
  () => {
    const a = ri(2, 8), d = ri(2, 5);
    const seq = [a, a + d, a + 2 * d, a + 3 * d], ans = a + 4 * d;
    const { choices, answer } = numChoices(ans, [ans + d, seq[3] + 1, ans - 1, seq[3] * 2]);
    return cq({ pts: 3, choices, answer,
      q: [`${seq.join(', ')}, … What is next?`, `${seq.join('、')}……下一个是多少？`],
      hints: [[`Add ${d} each time.`, `每次加 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(2, 5);
    const seq = [a, a * 2, a * 4, a * 8], ans = a * 16;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${seq.join(', ')}, … What is next?`, `${seq.join('、')}……下一个是多少？`],
      hints: [['Multiply by 2 each time.', '每次乘 2。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const a = ri(1, 4);
    const seq = [a, a + 1, a + 3, a + 6], ans = a + 10;
    return cq({ pts: 4, input: true, answer: ans,
      q: [`${seq.join(', ')}, … What is next?`, `${seq.join('、')}……下一个是多少？`],
      hints: [['Differences: +1, +2, +3, then +4.', '差是 +1、+2、+3，然后 +4。']],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const choices = shuffle(['14', '13', '12', '15', '17']);
    return cq({ pts: 3, choices, answer: choices.indexOf('14'),
      q: ['2, 5, 8, 11, … What is next?', '2、5、8、11……下一个是？'],
      hints: [['Add 3 each time.', '每次加 3。']],
      explain: ['14.', '14。'] });
  },
  () => {
    const choices = shuffle(['16', '15', '12', '18', '14']);
    return cq({ pts: 4, choices, answer: choices.indexOf('16'),
      q: ['1, 2, 4, 7, 11, … What is next?', '1、2、4、7、11……下一个是？'],
      hints: [['+1, +2, +3, +4, then +5.', '差 +1、+2、+3、+4，再 +5。']],
      explain: ['16.', '16。'] });
  },
  () => {
    const a = ri(30, 50), d = ri(3, 7);
    const seq = [a, a - d, a - 2 * d, a - 3 * d], ans = a - 4 * d;
    return cq({ pts: 3, input: true, answer: ans,
      q: [`${seq.join(', ')}, … What is next?`, `${seq.join('、')}……下一个是多少？`],
      hints: [[`Subtract ${d} each time.`, `每次减 ${d}。`]],
      explain: [`${ans}.`, `${ans}。`] });
  },
  () => {
    const odd = pick([15, 21, 25, 35]);
    const pool = [String(odd), '12', '18', '22', '28'];
    const choices = shuffle(pool);
    return cq({ pts: 3, choices, answer: choices.indexOf(String(odd)),
      q: ['Which number is the odd one out among these (the only odd number)?',
        '哪一个和其他不一样（唯一的奇数）？'],
      hints: [['Odd numbers end with 1, 3, 5, 7, 9.', '奇数个位是 1、3、5、7、9。']],
      explain: [`${odd}.`, `${odd}。`] });
  },
  () => {
    const choices = shuffle(['9', '6', '12', '24', '3']);
    return cq({ pts: 3, choices, answer: choices.indexOf('9'),
      q: ['In the doubling sequence 3, 6, 12, 24, … which of these is NOT a term?',
        '在每次乘 2 的数列 3、6、12、24……里，下面哪个不会出现？'],
      hints: [['Doubling 3 never makes 9.', '从 3 每次乘 2 到不了 9。']],
      explain: ['9.', '9。'] });
  },
  () => cq({ pts: 4, input: true, answer: 48,
    q: ['3, 6, 12, 24, … What is next?', '3、6、12、24……下一个是？'],
    hints: [['×2 each time.', '每次 ×2。']],
    explain: ['48.', '48。'] }),
  () => {
    const choices = shuffle(['10', '8', '12', '9', '11']);
    return cq({ pts: 3, choices, answer: choices.indexOf('10'),
      q: ['2, 4, 6, 8, … What is next?', '2、4、6、8……下一个是？'],
      hints: [['Add 2.', '每次加 2。']],
      explain: ['10.', '10。'] });
  },
  () => cq({ pts: 4, input: true, answer: 80,
    q: ['5, 10, 20, 40, … What is next?', '5、10、20、40……下一个是？'],
    hints: [['Double each time.', '每次翻倍。']],
    explain: ['80.', '80。'] }),
  () => {
    const choices = shuffle(['22', '21', '20', '24', '18']);
    return cq({ pts: 4, choices, answer: choices.indexOf('22'),
      q: ['4, 7, 11, 16, … What is next?', '4、7、11、16……下一个是？'],
      hints: [['Differences +3, +4, +5, then +6.', '差 +3、+4、+5，再 +6。']],
      explain: ['22.', '22。'] });
  },
  () => {
    const choices = shuffle(['32', '10', '15', '20', '25']);
    return cq({ pts: 3, choices, answer: choices.indexOf('32'),
      q: ['Which does not belong: 10, 15, 20, 25, 32?', '哪一个和其他不一样：10、15、20、25、32？'],
      hints: [['The others are multiples of 5.', '其他都是 5 的倍数。']],
      explain: ['32.', '32。'] });
  },
  () => cq({ pts: 3, input: true, answer: 13,
    q: ['1, 4, 7, 10, … What is next?', '1、4、7、10……下一个是？'],
    hints: [['Add 3.', '每次加 3。']],
    explain: ['13.', '13。'] }),
  () => cq({ pts: 4, input: true, answer: 1,
    q: ['81, 27, 9, 3, … What is next?', '81、27、9、3……下一个是？'],
    hints: [['Divide by 3 each time.', '每次除以 3。']],
    explain: ['1.', '1。'] }),
  () => {
    const choices = [
      T('The only odd number', '唯一的奇数'),
      T('The only even number', '唯一的偶数'),
      T('The largest', '最大的'),
      T('The smallest', '最小的'),
      T('A multiple of 10', '10 的倍数')
    ];
    return cq({ pts: 4, choices, answer: 0,
      q: ['In 8, 12, 15, 20, why is 15 often the odd one out?',
        '在 8、12、15、20 里，15 为什么常被看成异类？'],
      hints: [['8, 12, 20 are even; 15 is odd.', '8、12、20 是偶数，15 是奇数。']],
      explain: ['The only odd number.', '唯一的奇数。'] });
  },
  () => cq({ pts: 4, input: true, answer: 15,
    q: ['5, 8, 11, 14, … What is next?', '5、8、11、14……下一个是？'],
    hints: [['Add 3.', '每次加 3。']],
    explain: ['15.', '15。'] }),
  () => {
    const choices = shuffle(['36', '30', '32', '34', '40']);
    return cq({ pts: 4, choices, answer: choices.indexOf('36'),
      q: ['6, 12, 18, 24, 30, … What is next?', '6、12、18、24、30……下一个是？'],
      hints: [['Multiples of 6 / add 6.', '6 的倍数 / 每次加 6。']],
      explain: ['36.', '36。'] });
  },
  () => cq({ pts: 4, input: true, answer: 64,
    q: ['2, 4, 8, 16, 32, … What is next?', '2、4、8、16、32……下一个是？'],
    hints: [['Double.', '每次乘 2。']],
    explain: ['64.', '64。'] }),
  () => cq({ pts: 5, boss: true, input: true, answer: 28,
    q: ['Boss: 1, 3, 6, 10, 15, 21, … What is next?',
      'Boss 题：1、3、6、10、15、21……下一个是？'],
    hints: [['Differences +2, +3, +4, +5, +6, then +7.', '差是 +2、+3、+4、+5、+6，再 +7。'],
      ['21 + 7 = 28.', '21 + 7 = 28。']],
    explain: ['28.', '28。'] })
];

registerSeries({
  id: 'think1', camp: true, breakEvery: 10, perRound: 20, games: ['patternpick', 'factorpop', 'twostep'],
  tag: ['Contest Thinking · G4', '竞赛思维 · 四年级'],
  name: ['Patterns & Logic', '规律与逻辑'],
  desc: ['Sequences and odd-one-out (Leap-only)', '找规律、找异类（Leap 独立题）'],
  lesson: LESSON_THINK1,
  questions: Q_THINK1,
  next: null
});
