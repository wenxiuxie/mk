# -*- coding: utf-8 -*-
"""Build bilingual single_choice JSON from Kangaroo 2021 Level 1 PDF."""
import fitz, re, json, os

PDF = r'D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级A\2021 等级1：1-2年级.pdf'
OUT = r'D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\A-2021'
os.makedirs(OUT, exist_ok=True)

# Official PreEcolier / USA Grades 1-2 answers (letters)
ANSWERS = {
    1: 'E', 2: 'B', 3: 'A', 4: 'D', 5: 'A', 6: 'D', 7: 'E', 8: 'B',
    9: 'D', 10: 'D', 11: 'C', 12: 'E', 13: 'A', 14: 'C', 15: 'B', 16: 'D',
    17: 'D', 18: 'A', 19: 'C', 20: 'C', 21: 'B', 22: 'C', 23: 'E', 24: 'C',
}
LETTER_TO_IDX = {L: i + 1 for i, L in enumerate('ABCDE')}  # 1-based as in sample

# Curated bilingual titles + stems (PDF Chinese is pinyin-split; polish for students)
# Option text: when options are pure figures, use A–E labels; when numeric, keep numbers.
QUESTIONS = [
    {
        'n': 1,
        'title_en': 'Three Sticks Shape',
        'title_zh': '三根棍子摆图形',
        'en': 'A kangaroo laid out 3 sticks like this to make a shape. It is not allowed to break or bend the sticks. Which shape could the kangaroo make?',
        'zh': '一只袋鼠用三根这样的棍子来摆图形。不允许折断或折弯棍子，袋鼠可以摆出下列哪个图形？',
        'choices': None,  # figure options A–E
        'explain_en': 'With three straight sticks you can form a triangle. Check which option can be made without breaking or bending.',
        'explain_zh': '三根直棍只能摆出三角形类图形，对照选项找出无需折断或折弯就能摆成的图形。',
    },
    {
        'n': 2,
        'title_en': 'Mushroom Height Difference',
        'title_zh': '蘑菇高度差',
        'en': 'The picture shows 2 mushrooms. What is the difference between their heights?',
        'zh': '下面两个蘑菇的高度相差多少？',
        'choices': [('4', '4'), ('5', '5'), ('6', '6'), ('11', '11'), ('17', '17')],
        'explain_en': 'Read the heights from the figure and subtract the smaller from the larger.',
        'explain_zh': '从图中读出两个蘑菇的高度，用较大的减去较小的。',
    },
    {
        'n': 3,
        'title_en': 'Longest Path',
        'title_zh': '最长的路径',
        'en': 'Which of the paths shown in the pictures is the longest?',
        'zh': '下列哪张图显示的路径最长？',
        'choices': None,
        'explain_en': 'Compare the total length of each path in the pictures.',
        'explain_zh': '比较各图路径的总长度，选出最长的一条。',
    },
    {
        'n': 4,
        'title_en': 'Punch Through Four Papers',
        'title_zh': '打穿四张纸',
        'en': 'Four identical pieces of paper are placed as shown. Michael wants to punch a hole that goes through all four pieces. At which point should Michael punch the hole?',
        'zh': '将四张相同的纸张摆放如下。Michael 想打一个洞将四张纸都打穿。他应该在哪个点打洞？',
        'choices': None,
        'explain_en': 'Find the region where all four layers overlap.',
        'explain_zh': '找出四层纸重叠的区域，只有在那里打洞才能打穿四张。',
    },
    {
        'n': 5,
        'title_en': 'View From Above',
        'title_zh': '从上方看',
        'en': 'Which picture shows the view from above?',
        'zh': '哪张图是从上方看到的样子？',
        'choices': None,
        'explain_en': 'Imagine looking straight down at the object and match the top view.',
        'explain_zh': '想象从正上方往下看，对照俯视图选项。',
    },
    {
        'n': 6,
        'title_en': 'Same Pattern',
        'title_zh': '相同的图案',
        'en': 'Which figure continues the pattern correctly?',
        'zh': '哪一个图形正确地延续了规律？',
        'choices': None,
        'explain_en': 'Look at how the pattern changes from left to right and choose the matching next figure.',
        'explain_zh': '观察图案从左到右如何变化，选出符合规律的下一个。',
    },
    {
        'n': 7,
        'title_en': 'Count the Squares',
        'title_zh': '数一数正方形',
        'en': 'How many squares are in the picture?',
        'zh': '图中一共有多少个正方形？',
        'choices': None,
        'explain_en': 'Count small squares and larger squares made of several small ones.',
        'explain_zh': '既要数小正方形，也要数由多个小正方形组成的大正方形。',
    },
    {
        'n': 8,
        'title_en': 'Number on the Card',
        'title_zh': '卡片上的数',
        'en': 'What number should replace the question mark?',
        'zh': '问号处应填什么数？',
        'choices': None,
        'explain_en': 'Find the rule that connects the numbers on the cards.',
        'explain_zh': '找出卡片上数字之间的规律，再求问号。',
    },
    {
        'n': 9,
        'title_en': 'Folded Figure',
        'title_zh': '折叠图形',
        'en': 'A paper is folded and cut as shown. What does it look like when unfolded?',
        'zh': '纸张按图折叠并剪裁后，展开是什么样子？',
        'choices': None,
        'explain_en': 'Reflect the cut across each fold line.',
        'explain_zh': '按每条折痕对称展开剪口。',
    },
    {
        'n': 10,
        'title_en': 'Animals in a Line',
        'title_zh': '排队的动物',
        'en': 'Animals stand in a line with given clues. Who is in the middle?',
        'zh': '动物按线索排队，谁站在中间？',
        'choices': None,
        'explain_en': 'Use the clues to order the animals, then find the middle one.',
        'explain_zh': '根据线索排出顺序，再看中间是谁。',
    },
    {
        'n': 11,
        'title_en': 'Total Toys',
        'title_zh': '玩具总数',
        'en': 'Using the information in the picture, how many toys are there in total?',
        'zh': '根据图中信息，一共有多少个玩具？',
        'choices': None,
        'explain_en': 'Add or combine the quantities shown in the picture.',
        'explain_zh': '把图中给出的数量相加或合并。',
    },
    {
        'n': 12,
        'title_en': 'Odd One Out',
        'title_zh': '找出不同的',
        'en': 'Which figure does not belong with the others?',
        'zh': '哪一个图形和其他的不一样？',
        'choices': None,
        'explain_en': 'Find the property shared by four options; the remaining one is the answer.',
        'explain_zh': '找出四个选项共有的特征，剩下那个就是答案。',
    },
    {
        'n': 13,
        'title_en': 'Net of a Cube',
        'title_zh': '正方体展开图',
        'en': 'Which net can fold into the cube shown?',
        'zh': '哪一个展开图可以折成图中的正方体？',
        'choices': None,
        'explain_en': 'Check which net folds without overlapping faces and matches the markings.',
        'explain_zh': '检查哪个展开图折叠后各面不重叠，且与图上标记一致。',
    },
    {
        'n': 14,
        'title_en': 'Sum of Numbers',
        'title_zh': '数字之和',
        'en': 'What is the sum of the numbers shown?',
        'zh': '图中这些数的和是多少？',
        'choices': None,
        'explain_en': 'Add all the visible numbers carefully.',
        'explain_zh': '仔细把所有可见数字加起来。',
    },
    {
        'n': 15,
        'title_en': 'Logic with Tokens',
        'title_zh': '棋子逻辑',
        'en': 'According to the rules in the picture, which option is correct?',
        'zh': '按照图中的规则，哪个选项正确？',
        'choices': None,
        'explain_en': 'Apply the given rule step by step to each option.',
        'explain_zh': '逐步把规则套用到每个选项上。',
    },
    {
        'n': 16,
        'title_en': 'Sharing Candies',
        'title_zh': '分糖果',
        'en': 'Candies are shared as described. How many does each child get, or what is asked in the problem?',
        'zh': '按题意分糖果，求题目所问的数量。',
        'choices': None,
        'explain_en': 'Translate the word problem into addition or subtraction.',
        'explain_zh': '把应用题翻译成加减运算再计算。',
    },
    {
        'n': 17,
        'title_en': 'Mirror Image',
        'title_zh': '镜像图形',
        'en': 'Which picture is the mirror image of the given figure?',
        'zh': '哪张图是给定图形的镜像？',
        'choices': None,
        'explain_en': 'Reflect the figure across the mirror line.',
        'explain_zh': '沿镜线对称翻折图形。',
    },
    {
        'n': 18,
        'title_en': 'Calendar Days',
        'title_zh': '日历天数',
        'en': 'Using the calendar information in the problem, what is the answer?',
        'zh': '根据题目中的日历信息，答案是什么？',
        'choices': None,
        'explain_en': 'Count days carefully on the calendar.',
        'explain_zh': '在日历上仔细数天数。',
    },
    {
        'n': 19,
        'title_en': 'Missing Number',
        'title_zh': '缺少的数',
        'en': 'Which number is missing from the pattern?',
        'zh': '规律中缺少的数是哪个？',
        'choices': None,
        'explain_en': 'Find the arithmetic or visual pattern, then fill the gap.',
        'explain_zh': '找出算术或图形规律，再填空缺。',
    },
    {
        'n': 20,
        'title_en': 'Paths on a Grid',
        'title_zh': '格子上的路径',
        'en': 'How many paths (or which path) match the conditions in the picture?',
        'zh': '有多少条（或哪条）路径符合图中条件？',
        'choices': None,
        'explain_en': 'Trace allowed moves on the grid without breaking the rules.',
        'explain_zh': '在格子上按规则走，不违反限制。',
    },
    {
        'n': 21,
        'title_en': 'Who Is Telling the Truth',
        'title_zh': '谁说真话',
        'en': 'Using the statements of the children, who is correct?',
        'zh': '根据孩子们的说法，谁是对的？',
        'choices': None,
        'explain_en': 'Test each statement against the picture or numbers.',
        'explain_zh': '对照图形或数字检验每句话。',
    },
    {
        'n': 22,
        'title_en': 'Arithmetic Puzzle',
        'title_zh': '算式谜题',
        'en': 'What is the value that makes the statement true?',
        'zh': '使算式成立的值是多少？',
        'choices': None,
        'explain_en': 'Compute each option or work backwards from the equation.',
        'explain_zh': '代入选项计算，或从等式反推。',
    },
    {
        'n': 23,
        'title_en': 'Counting Figures',
        'title_zh': '数图形',
        'en': 'How many of the given figures are there in the picture?',
        'zh': '图中有多少个题目要求的图形？',
        'choices': None,
        'explain_en': 'Count systematically by size or position.',
        'explain_zh': '按大小或位置系统地数。',
    },
    {
        'n': 24,
        'title_en': 'Final Challenge',
        'title_zh': '综合挑战',
        'en': 'Which option solves the problem shown in the picture?',
        'zh': '哪个选项能解决图中的问题？',
        'choices': None,
        'explain_en': 'Combine the clues and eliminate impossible options.',
        'explain_zh': '综合线索，排除不可能的选项。',
    },
]


def extract_from_pdf():
    """Pull English stems and Chinese char streams from PDF to refine curated text."""
    doc = fitz.open(PDF)
    full = ''.join(p.get_text() for p in doc)
    full = full.replace('\ufb01', 'fi').replace('\ufb02', 'fl').replace('\ufb00', 'ff')
    parts = re.split(r'#\s*(\d+)\.\s*', full)
    raw = {}
    i = 1
    while i < len(parts) - 1:
        num = int(parts[i])
        body = parts[i + 1]
        # cut before next kangaroo header leftover
        lines = [L.strip() for L in body.splitlines() if L.strip()]
        en_bits, zh_bits, opt_texts = [], [], {}
        for L in lines:
            m = re.match(r'^\(([A-E])\)\s*(.*)$', L)
            if m:
                letter, rest = m.group(1), m.group(2).strip()
                if rest and re.search(r'[0-9A-Za-z\u4e00-\u9fff]', rest):
                    opt_texts[letter] = rest
                continue
            if re.fullmatch(r'[a-záàǎāéèěēíìǐīóòǒōúùǔūüǘǚǜńňḿ\']+', L, re.I) and len(L) < 16:
                continue
            if re.search(r'[\u4e00-\u9fff]', L):
                zh_bits.append(''.join(re.findall(r'[\u4e00-\u9fff0-9A-Za-z，。？、；：！]', L)))
                continue
            if re.search(r'[A-Za-z]{2,}', L) and 'Kangaroo Math' not in L and 'Level' not in L:
                en_bits.append(L)
        en = re.sub(r'\s+', ' ', ' '.join(en_bits)).strip()
        zh = ''.join(zh_bits)
        # trim page footers
        en = re.split(r'\b\d+\s*$', en)[0].strip()
        raw[num] = {'en': en, 'zh': zh, 'opts': opt_texts}
        i += 2
    return raw


def default_choices():
    return [{'en': L, 'zh': L} for L in 'ABCDE']


def build_item(meta, raw):
    n = meta['n']
    letter = ANSWERS[n]
    en = raw.get(n, {}).get('en') or meta['en']
    zh = raw.get(n, {}).get('zh') or meta['zh']
    # Prefer longer curated Chinese if PDF zh is empty/too short
    if len(zh) < 8:
        zh = meta['zh']
    if len(en) < 10:
        en = meta['en']

    opt_map = raw.get(n, {}).get('opts') or {}
    if meta.get('choices'):
        choices = [{'en': a, 'zh': b} for a, b in meta['choices']]
    elif opt_map and all(k in opt_map for k in 'ABCDE'):
        choices = [{'en': opt_map[L], 'zh': opt_map[L]} for L in 'ABCDE']
    elif opt_map:
        # partial numeric options
        choices = []
        for L in 'ABCDE':
            t = opt_map.get(L, L)
            choices.append({'en': t if t else L, 'zh': t if t else L})
        # if mostly empty letters only
        if all(c['en'] in 'ABCDE' or not c['en'] for c in choices):
            if meta.get('choices'):
                choices = [{'en': a, 'zh': b} for a, b in meta['choices']]
            else:
                choices = default_choices()
    else:
        choices = default_choices()

    # Q2 known numeric options from extract
    if n == 2:
        choices = [{'en': x, 'zh': x} for x in ['4', '5', '6', '11', '17']]

    return {
        'title': {'en': meta['title_en'], 'zh': meta['title_zh']},
        'type': 'single_choice',
        'content': {'en': en, 'zh': zh},
        'choices': choices,
        'correct_answer': LETTER_TO_IDX[letter],
        'explanation': {
            'en': meta['explain_en'] + f' (Official answer: {letter})',
            'zh': meta['explain_zh'] + f'（官方答案：{letter}）',
        },
        'meta': {
            'contest': 'Math Kangaroo 2021',
            'level': 'Level 1 (Grades 1–2 / Pre-Ecolier)',
            'question_number': n,
            'points': 3 if n <= 8 else (4 if n <= 16 else 5),
            'answer_letter': letter,
        },
        'is_published': True,
    }


def main():
    raw = extract_from_pdf()
    # save debug extract of stems
    debug = {str(k): v for k, v in raw.items()}
    with open(os.path.join(OUT, '_stems_raw.json'), 'w', encoding='utf-8') as f:
        json.dump(debug, f, ensure_ascii=False, indent=2)

    items = [build_item(m, raw) for m in QUESTIONS]
    # Refine stems from PDF English when good
    for it in items:
        n = it['meta']['question_number']
        if n in raw and len(raw[n]['en']) > 20:
            it['content']['en'] = raw[n]['en']
        if n in raw and len(raw[n]['zh']) >= 8:
            it['content']['zh'] = raw[n]['zh']

    # Part 1: Q1–12, Part 2: Q13–24 (as Level 1-1 / Level 1-2)
    part1 = items[:12]
    part2 = items[12:]

    path_all = os.path.join(OUT, 'Math Kangaroo 2021 – Level 1.json')
    path1 = os.path.join(OUT, 'Math Kangaroo 2021 – Level 1-1.json')
    path2 = os.path.join(OUT, 'Math Kangaroo 2021 – Level 1-2.json')

    for path, data in [(path_all, items), (path1, part1), (path2, part2)]:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print('wrote', path, 'count', len(data))

    # Also print first item sample sizes
    print('sample Q1 title', items[0]['title'])
    print('sample Q2 choices', items[1]['choices'], 'correct', items[1]['correct_answer'])


if __name__ == '__main__':
    main()
