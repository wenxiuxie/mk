// Leap G4 · 分数营 A：再认识 — Fraction Camp A (independent Leap data; not used by Hop).

const LESSON_FRAC1 = [
  {
    title: ['Equal parts make a fraction', '平均分才能写分数'],
    text: ['Cut a bar into 4 equal pieces. One piece is 1/4. The bottom number (denominator) is how many equal parts. The top number (numerator) is how many we take.',
      '把一条带子平均分成 4 份，其中 1 份就是 1/4。分母是平均分成几份，分子是取了几份。'],
    art(el) {
      el.innerHTML = `<div class="appear">${fBar(4, 1)}</div>` + lessonEq('1 / 4', 1.2)
        + `<p class="big appear" style="animation-delay:2s">${T('denominator 4 · numerator 1', '分母 4 · 分子 1')}</p>`;
    }
  },
  {
    title: ['Unit fractions', '单位分数'],
    text: ['1/2, 1/3, 1/4, 1/5… are unit fractions: the numerator is 1. They mean “one equal part of the whole”.',
      '1/2、1/3、1/4、1/5… 叫单位分数：分子是 1，表示“整体平均分后的一份”。'],
    art(el) {
      el.innerHTML = `<div class="chips">${[2, 3, 4, 5].map((d, i) =>
        `<div class="appear" style="animation-delay:${.3 + i * .35}s;text-align:center">${fPie(d, 1, 40)}<div>${fLabel(1, d)}</div></div>`).join('')}</div>`;
    }
  },
  {
    title: ['Fractions of a set', '一组物体的几分之几'],
    text: ['8 stars, 2 are gold. The gold stars are 2/8 of the set. Count the whole set first, then the part.',
      '8 颗星里有 2 颗金色，金色占 2/8。先数整体，再数部分。'],
    art(el) {
      el.innerHTML = fDots(8, 2) + lessonEq('2 / 8', 1.4);
    }
  },
  {
    title: ['The whole as a fraction', '整体也是分数'],
    text: ['If all 4 equal parts are shaded, that is 4/4, which equals 1 whole.',
      '4 等份全部涂色就是 4/4，等于 1 个整体。'],
    art(el) {
      el.innerHTML = `<div class="appear">${fBar(4, 4)}</div>` + lessonEq('4/4 = 1', 1.2);
    }
  },
  {
    title: ['Unequal pieces are not fair fractions', '不平均就不能乱写分数'],
    text: ['If pieces are different sizes, you cannot call the biggest piece “1/3” just because there are three pieces. Fractions need equal parts.',
      '如果三块大小不一样，不能因为有三块就把最大块叫作 1/3。分数一定要平均分。'],
    art(el) {
      el.innerHTML = `<svg viewBox="0 0 280 40" width="280" height="40"><rect x="0" y="0" width="160" height="40" fill="#c8435a" stroke="#1f2b3a" stroke-width="2"/><rect x="160" y="0" width="70" height="40" fill="#fff8e8" stroke="#1f2b3a" stroke-width="2"/><rect x="230" y="0" width="50" height="40" fill="#fff8e8" stroke="#1f2b3a" stroke-width="2"/></svg>`
        + `<p class="big appear" style="animation-delay:1s">${T('Not equal → not 1/3', '不平均 → 不是 1/3')}</p>`;
    }
  },
  {
    title: ['Your mission!', '开始挑战！'],
    text: ['20 Grade-4 fraction questions: read, shade, and find a fraction of a set. A mini game after every 10.',
      '20 道四年级分数题：读分数、涂色、求一组物体的几分之几。每 10 题玩一次小游戏。'],
    art(el) {
      el.innerHTML = `<svg class="appear" viewBox="0 0 64 64" width="110" height="110"><use href="#roo"/></svg>
        <div class="chips">${['1/2', '3/4', '2/8'].map((t, i) => `<span class="chip appear" style="width:auto;padding:0 14px;animation-delay:${.5 + i * .3}s">${t}</span>`).join('')}</div>`;
    }
  }
];

const Q_FRAC1 = [
  () => {
    const d = pick([2, 3, 4, 5, 6, 8]);
    return cq({ pts: 3, input: true, answer: 1,
      q: [`A whole is cut into ${d} equal parts. What is the numerator of one part written as a fraction?`, `整体平均分成 ${d} 份。其中 1 份写成几分之几，分子是几？`],
      fig: fBar(d, 1),
      hints: [[`One part means numerator 1.`, '取 1 份，分子就是 1。'], [`The fraction is 1/${d}.`, `分数是 1/${d}。`]],
      explain: [`1/${d} has numerator 1.`, `1/${d} 的分子是 1。`] });
  },
  () => {
    const d = pick([3, 4, 5, 6, 8]), n = ri(1, d - 1);
    const { choices, answer } = (() => {
      const good = `${n}/${d}`;
      const wrong = [`${d}/${n}`, `${n}/${d + 1}`, `${n + 1}/${d}`, `1/${d}`, `${n}/${n}`].filter(x => x !== good);
      const set = shuffle([good, ...shuffle(wrong).slice(0, 4)]);
      return { choices: set, answer: set.indexOf(good) };
    })();
    return cq({ pts: 3, choices, answer,
      q: [`What fraction is shaded?`, `涂色部分是几分之几？`],
      fig: fBar(d, n),
      hints: [[`Count equal parts: ${d}.`, `平均一共 ${d} 份。`], [`Shaded parts: ${n}. So ${n}/${d}.`, `涂色 ${n} 份，所以是 ${n}/${d}。`]],
      explain: [`${n} of ${d} equal parts → ${n}/${d}.`, `${d} 等份中的 ${n} 份 → ${n}/${d}。`] });
  },
  () => {
    const d = pick([3, 4, 5, 6]);
    return cq({ pts: 3, choices: ['1/2', `1/${d}`, `1/${d + 1}`, `${d}/1`, '1'], answer: 1,
      q: [`A pizza is shared equally among ${d} friends. What fraction does each friend get?`, `一个披萨平均分给 ${d} 个朋友。每人得到几分之几？`],
      fig: fPie(d, 1),
      hints: [[`Equal share → unit fraction.`, '平均分 → 单位分数。'], [`Each gets 1/${d}.`, `每人得到 1/${d}。`]],
      explain: [`Each gets 1/${d}.`, `每人得到 1/${d}。`] });
  },
  () => {
    const total = pick([6, 8, 9, 10, 12]), part = pick([1, 2, 3, 4].filter(x => x < total));
    const good = `${part}/${total}`;
    const wrong = [`${part}/${total - 1}`, `${part + 1}/${total}`, `1/${total}`, `${total}/${part}`, `${part}/${part}`];
    const choices = shuffle([good, ...shuffle(wrong).slice(0, 4)]);
    return cq({ pts: 3, choices, answer: choices.indexOf(good),
      q: [`There are ${total} stars; ${part} are gold. What fraction are gold?`, `有 ${total} 颗星，其中 ${part} 颗是金色。金色占几分之几？`],
      fig: fDots(total, part),
      hints: [[`Whole set = ${total}.`, `整体是 ${total}。`], [`Gold = ${part}, so ${part}/${total}.`, `金色 ${part}，所以是 ${part}/${total}。`]],
      explain: [`${part}/${total}.`, `${part}/${total}。`] });
  },
  () => {
    const d = pick([4, 5, 6, 8]);
    return cq({ pts: 3, input: true, answer: d,
      q: [`The fraction ${d}/${d} equals 1 whole. How many equal parts make the whole here?`, `分数 ${d}/${d} 等于整体 1。这里把整体平均分成了几份？`],
      fig: fBar(d, d),
      hints: [[`Denominator tells equal parts.`, '分母表示平均分成几份。'], [`Denominator is ${d}.`, `分母是 ${d}。`]],
      explain: [`${d}/${d} → ${d} equal parts.`, `${d}/${d} → 平均 ${d} 份。`] });
  },
  () => cq({ pts: 3, choices: [
      T('Yes, because there are 3 pieces', '能，因为有 3 块'),
      T('No, parts must be equal', '不能，必须平均分'),
      T('Yes, the biggest piece is 1/3', '能，最大块就是 1/3'),
      T('Yes, any piece is 1/3', '能，随便一块都是'),
      T('Only if we eat them', '只有吃掉才行')
    ], answer: 1,
      q: ['A cake is broken into 3 unequal pieces. Can the biggest piece be called 1/3?', '蛋糕掰成大小不等的 3 块。最大块能叫作 1/3 吗？'],
      hints: [['Fractions need equal parts.', '分数要求平均分。'], ['Unequal pieces are not unit fractions of 3.', '大小不等就不能写成三分之一。']],
      explain: ['No. 1/3 means one of three equal parts.', '不能。1/3 必须是三等份中的一份。'] }),
  () => {
    const total = pick([8, 10, 12]), k = total / 2;
    return cq({ pts: 3, input: true, answer: k,
      q: [`A strip has ${total} equal squares. Shade 1/2. How many squares should you shade?`, `带子有 ${total} 个一样大的小格。涂色 1/2，应涂几个小格？`],
      fig: fBar(total, 0),
      hints: [[`1/2 of ${total} means divide by 2.`, `${total} 的 1/2 就是 ÷2。`], [`${total} ÷ 2 = ${k}.`, `${total} ÷ 2 = ${k}。`]],
      explain: [`1/2 of ${total} = ${k}.`, `${total} 的 1/2 = ${k}。`] });
  },
  () => {
    const d = 4, n = 3;
    const choices = ['1/4', '2/4', '3/4', '4/4', '3/3'];
    return cq({ pts: 3, choices, answer: 2,
      q: ['What fraction is shaded?', '涂色部分是几分之几？'],
      fig: fPie(d, n),
      hints: [['4 equal slices; 3 shaded.', '平均 4 份，涂了 3 份。'], ['3/4.', '3/4。']],
      explain: ['3 of 4 → 3/4.', '4 份中的 3 份 → 3/4。'] });
  },
  () => {
    const d = pick([5, 6, 8]), left = d - 1;
    return cq({ pts: 3, choices: [`1/${d}`, `2/${d}`, `${left}/${d}`, `${d}/${d}`, `1/${left}`], answer: 2,
      q: [`A full cup is drunk by 1/${d}. What fraction is left?`, `满满一杯水喝掉 1/${d}，还剩几分之几？`],
      hints: [[`Whole = ${d}/${d}.`, `整体是 ${d}/${d}。`], [`${d}/${d} − 1/${d} = ${left}/${d}.`, `${d}/${d} − 1/${d} = ${left}/${d}。`]],
      explain: [`Left ${left}/${d}.`, `还剩 ${left}/${d}。`] });
  },
  () => {
    const total = 9, part = 3;
    return cq({ pts: 3, input: true, answer: 3,
      q: [`There are ${total} books; ${part} are storybooks. What is the numerator of the fraction of storybooks?`, `有 ${total} 本书，其中 ${part} 本是故事书。故事书占几分之几，分子是几？`],
      fig: fDots(total, part, 'cookie'),
      hints: [[`Numerator = number of storybooks.`, '分子 = 故事书本数。'], [`Numerator is ${part}.`, `分子是 ${part}。`]],
      explain: [`${part}/${total} → numerator ${part}.`, `${part}/${total} → 分子 ${part}。`] });
  },
  // 11–20
  () => {
    const d = pick([3, 4, 5]);
    return cq({ pts: 4, choices: [`1/${d}`, `2/${d}`, `${d}/${d}`, '0', `${d}/1`], answer: 2,
      q: [`All ${d} equal parts of a bar are shaded. What fraction is shaded?`, `一条带子的 ${d} 等份全部涂色。涂色占几分之几？`],
      fig: fBar(d, d),
      hints: [[`All parts shaded → ${d}/${d}.`, '全部涂色 → ${d}/${d}。'], [`And ${d}/${d} = 1.`, `而且 ${d}/${d} = 1。`]],
      explain: [`${d}/${d} (one whole).`, `${d}/${d}（等于整体 1）。`] });
  },
  () => {
    const total = 12, n = 4;
    return cq({ pts: 4, input: true, answer: n,
      q: [`Shade 1/3 of ${total} equal squares. How many squares?`, `${total} 个小格涂色 1/3，应涂几个？`],
      hints: [[`${total} ÷ 3 = ${n}.`, `${total} ÷ 3 = ${n}。`], [`1/3 means one of three equal groups.`, '1/3 就是三等份中的一份。']],
      explain: [`1/3 of ${total} = ${n}.`, `${total} 的 1/3 = ${n}。`] });
  },
  () => {
    const choices = ['1/5', '2/5', '3/5', '4/5', '5/5'];
    return cq({ pts: 4, choices, answer: 0,
      q: ['Which is a unit fraction?', '哪个是单位分数？'],
      hints: [['Unit fraction has numerator 1.', '单位分数分子是 1。'], ['Only 1/5 has numerator 1.', '只有 1/5 的分子是 1。']],
      explain: ['1/5 has numerator 1.', '1/5 分子是 1。'] });
  },
  () => {
    const d = 8, n = 5;
    const choices = ['3/8', '4/8', '5/8', '6/8', '5/5'];
    return cq({ pts: 4, choices, answer: 2,
      q: ['What fraction is shaded on the circle?', '圆里涂色部分是几分之几？'],
      fig: fPie(d, n),
      hints: [['8 equal slices.', '平均 8 份。'], ['5 shaded → 5/8.', '涂了 5 份 → 5/8。']],
      explain: ['5/8.', '5/8。'] });
  },
  () => {
    const total = 10, part = 4;
    return cq({ pts: 4, choices: ['2/10', '4/10', '4/6', '6/10', '1/4'], answer: 1,
      q: [`${total} balloons; ${part} are red. What fraction are red?`, `${total} 个气球里有 ${part} 个红的。红色占几分之几？`],
      fig: fDots(total, part, 'berry'),
      hints: [[`Part/whole = ${part}/${total}.`, `部分/整体 = ${part}/${total}。`]],
      explain: [`${part}/${total}.`, `${part}/${total}。`] });
  },
  () => {
    const d = 6;
    return cq({ pts: 4, input: true, answer: 1,
      q: [`Write the numerator of 1/${d}.`, `写出 1/${d} 的分子。`],
      hints: [['Top number is the numerator.', '上面的数是分子。'], ['It is 1.', '是 1。']],
      explain: [`Numerator is 1.`, '分子是 1。'] });
  },
  () => {
    const d = 5;
    return cq({ pts: 4, choices: [
      T('denominator', '分母'), T('numerator', '分子'), T('sum', '和'), T('product', '积'), T('difference', '差')
    ], answer: 0,
      q: [`In the fraction 2/${d}, what do we call the number ${d}?`, `分数 2/${d} 里，${d} 叫作什么？`],
      hints: [['Bottom number = denominator.', '下面的数叫分母。']],
      explain: [`${d} is the denominator.`, `${d} 是分母。`] });
  },
  () => {
    const total = 8, shade = 2;
    return cq({ pts: 4, input: true, answer: shade,
      q: [`A set has ${total} cookies. Shade 1/4 of them. How many cookies are shaded?`, `一共 ${total} 块饼干，涂色其中 1/4。涂色几块？`],
      fig: fDots(total, 0, 'cookie'),
      hints: [[`${total} ÷ 4 = ${shade}.`, `${total} ÷ 4 = ${shade}。`]],
      explain: [`1/4 of ${total} = ${shade}.`, `${total} 的 1/4 = ${shade}。`] });
  },
  () => {
    const choices = ['1/8', '2/8', '3/8', '7/8', '8/8'];
    return cq({ pts: 4, choices, answer: 3,
      q: ['A ribbon is cut into 8 equal pieces; 1 piece is used. What fraction is left?', '丝带平均剪成 8 段，用掉 1 段。还剩几分之几？'],
      fig: fBar(8, 7),
      hints: [['Left 7 pieces → 7/8.', '剩 7 段 → 7/8。']],
      explain: ['7/8 left.', '还剩 7/8。'] });
  },
  () => {
    const d = pick([4, 5, 6, 8]), n = ri(1, d - 1);
    return cq({ pts: 5, boss: true, input: true, answer: n,
      q: [`Look at the bar. How many parts are shaded? (The fraction is ${n}/${d}.)`, `看色带。涂色了几份？（分数是 ${n}/${d}。）`],
      fig: fBar(d, n) + `<div style="margin-top:8px">${fLabel(n, d)}</div>`,
      hints: [[`Numerator tells shaded parts.`, '分子就是涂色份数。'], [`Numerator is ${n}.`, `分子是 ${n}。`]],
      explain: [`${n} parts shaded.`, `涂色 ${n} 份。`] });
  }
];

registerSeries({
  id: 'frac1', camp: true, breakEvery: 10, perRound: 20, games: ['piepop', 'barshade', 'fracdrop'],
  tag: ['Fraction Camp A · G4', '分数营 A · 四年级'],
  name: ['Fractions Again', '分数再认识'],
  desc: ['Equal parts, unit fractions, fractions of a set', '平均分、单位分数、一组物体的几分之几'],
  lesson: LESSON_FRAC1,
  questions: Q_FRAC1,
  next: 'frac2'
});
