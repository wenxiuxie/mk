# -*- coding: utf-8 -*-
"""Generate clean bilingual single_choice JSON for Kangaroo 2021 Level 1."""
import json, os, re

OUT = r'D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\A-2021'
ANSWERS = {
    1: 'E', 2: 'B', 3: 'A', 4: 'D', 5: 'A', 6: 'D', 7: 'E', 8: 'B',
    9: 'D', 10: 'D', 11: 'C', 12: 'E', 13: 'A', 14: 'C', 15: 'B', 16: 'D',
    17: 'D', 18: 'A', 19: 'C', 20: 'C', 21: 'B', 22: 'C', 23: 'E', 24: 'C',
}
IDX = {L: i + 1 for i, L in enumerate('ABCDE')}


def fig_choices():
    return [{'en': L, 'zh': L} for L in 'ABCDE']


def num_choices(*vals):
    return [{'en': str(v), 'zh': str(v)} for v in vals]


def txt_choices(pairs):
    # pairs: list of (en, zh)
    return [{'en': a, 'zh': b} for a, b in pairs]


# Full bilingual bank
BANK = [
    dict(
        n=1, pts=3,
        title=('Three Sticks Shape', '三根棍子摆图形'),
        content=(
            'A kangaroo laid out 3 sticks like this to make a shape. It is not allowed to break or to bend the sticks. Which shape could the kangaroo make?',
            '一只袋鼠用三根这样的棍子来摆图形。不允许折断或折弯棍子，袋鼠可以摆出下列哪个图形？',
        ),
        choices=fig_choices(),
        explain=(
            'Three straight sticks can form a triangle. Match the option that can be made without breaking or bending.',
            '三根直棍可摆成三角形。对照选项，找出无需折断或折弯就能摆成的图形。',
        ),
    ),
    dict(
        n=2, pts=3,
        title=('Mushroom Height Difference', '蘑菇高度差'),
        content=(
            'The picture shows 2 mushrooms. What is the difference between their heights?',
            '下面两个蘑菇的高度相差多少？',
        ),
        choices=num_choices(4, 5, 6, 11, 17),
        explain=('Read both heights from the figure and subtract.', '从图中读出两个高度再相减。'),
    ),
    dict(
        n=3, pts=3,
        title=('Longest Path', '最长的路径'),
        content=(
            'Which of the paths shown in the pictures is the longest?',
            '下列哪张图显示的路径最长？',
        ),
        choices=fig_choices(),
        explain=('Compare the total length of each path.', '比较各图路径的总长度。'),
    ),
    dict(
        n=4, pts=3,
        title=('Punch Through Four Papers', '打穿四张纸'),
        content=(
            'Four identical pieces of paper are placed as shown. Michael wants to punch a hole that goes through all four pieces. At which point should Michael punch the hole?',
            '将四张相同的纸张摆放如下。Michael 想打一个洞把四张纸都打穿。他应该在哪个点打洞？',
        ),
        choices=fig_choices(),
        explain=('Punch where all four layers overlap.', '在四层纸都重叠的位置打洞。'),
    ),
    dict(
        n=5, pts=3,
        title=('T-shirt in the Mirror', '镜子里的T恤'),
        content=(
            'Ella puts on this t-shirt and stands in front of a mirror. Which of these images does she see in the mirror?',
            'Ella 穿上这件T恤站在镜子前。她在镜子里会看到下面哪张图？',
        ),
        choices=fig_choices(),
        explain=('The mirror reverses left and right.', '镜子会左右颠倒图像。'),
    ),
    dict(
        n=6, pts=3,
        title=('Tallest Tower', '最高的塔'),
        content=(
            'The pink tower is taller than the red tower but shorter than the green tower. The silver tower is taller than the green tower. Which tower is the tallest?',
            '粉塔比红塔高，但比绿塔矮。银塔比绿塔高。哪一座塔最高？',
        ),
        choices=txt_choices([
            ('pink tower', '粉塔'),
            ('green tower', '绿塔'),
            ('red tower', '红塔'),
            ('silver tower', '银塔'),
            ('impossible to decide', '无法判断'),
        ]),
        explain=('Order: red < pink < green < silver, so silver is tallest.', '高度：红 < 粉 < 绿 < 银，银塔最高。'),
    ),
    dict(
        n=7, pts=3,
        title=('Children Holding Hands', '牵手的小朋友'),
        content=(
            'These children are standing in a line. Some are facing forwards and others are facing backwards. How many children are holding another child’s hand with their right hand?',
            '这些小朋友排成一队。有的面朝前，有的面朝后。有多少个小朋友用右手牵着另一个小朋友的手？',
        ),
        choices=num_choices(2, 3, 4, 5, 6),
        explain=('Check each child’s facing direction to see which hand is the right hand.', '结合每人朝向判断哪只手是右手。'),
    ),
    dict(
        n=8, pts=3,
        title=('Kangaroo Constellation', '袋鼠星座'),
        content=(
            'In the Kangaroo constellation, all stars have a number greater than 3 and their sum is 20. Which is the Kangaroo constellation?',
            '在袋鼠星座中，每颗星上的数都大于 3，且它们的和是 20。哪一个是袋鼠星座？',
        ),
        choices=fig_choices(),
        explain=('All numbers > 3 and sum to 20.', '所有数都大于 3，且总和为 20。'),
    ),
    dict(
        n=9, pts=4,
        title=('Cut Ribbon Pieces', '剪丝带'),
        content=(
            'Edmund cut a ribbon as shown in the picture. How many pieces of the ribbon did he finish with?',
            'Edmund 按图中所示剪断丝带。他一共得到多少段丝带？',
        ),
        choices=num_choices(9, 10, 11, 12, 13),
        explain=('Count how many times the scissors cut; pieces = cuts + 1 for a single ribbon (or use the figure).', '数剪刀剪过的次数；一段丝带剪 n 刀一般得到 n+1 段（结合图判断）。'),
    ),
    dict(
        n=10, pts=4,
        title=('Cat Walking on the Wall', '墙上走路的猫'),
        content=(
            'Rose the cat walks along the wall. She starts at point B and follows the direction of the arrows shown in the picture. The cat walks a total of 20 metres. Where does she end up?',
            '小猫 Rose 沿着墙走。她从 B 点出发，按图中箭头方向走，一共走了 20 米。她最终停在哪里？',
        ),
        choices=fig_choices(),
        explain=('Follow the arrows for a total length of 20 m.', '按箭头方向累计走满 20 米。'),
    ),
    dict(
        n=11, pts=4,
        title=('Equal Flowers in Two Pots', '两盆花数量相等'),
        content=(
            'Julia has two pots with flowers, as shown. She keeps the flowers exactly where they are. She buys more flowers and puts them in the pots. After that each pot has the same number of each type of flower. What is the smallest number of flowers she needs to buy?',
            'Julia 有两盆花，如图所示。她不移动原有的花，又买了一些花放进盆里，使两盆中每种花的数量都相同。她最少需要再买多少朵花？',
        ),
        choices=num_choices(2, 4, 6, 8, 10),
        explain=('For each flower type, buy enough so both pots match the larger count.', '对每种花，买到让两盆都达到较大的那个数量。'),
    ),
    dict(
        n=12, pts=4,
        title=('Letter Code Board', '字母密码板'),
        content=(
            'Tom encodes words using the board shown. For example, the word PIZZA has the code A2 A4 C1 C1 B2. What word did Tom encode as B3 B2 C4 D2?',
            'Tom 用图中的密码板给单词编码。例如 PIZZA 的编码是 A2 A4 C1 C1 B2。编码 B3 B2 C4 D2 对应哪个单词？',
        ),
        choices=txt_choices([
            ('MAZE', 'MAZE'),
            ('MASK', 'MASK'),
            ('MILK', 'MILK'),
            ('MATE', 'MATE'),
            ('MATH', 'MATH'),
        ]),
        explain=('Read each grid code as a letter from the board.', '在密码板上按坐标读出每个字母。'),
    ),
    dict(
        n=13, pts=4,
        title=('Two Pieces Make a Figure', '两块拼图'),
        content=(
            'Which figure can be made from these two pieces?',
            '用这两块拼图可以拼出下面哪个图形？',
        ),
        choices=fig_choices(),
        explain=('Try fitting the two pieces together without gaps or overlaps.', '把两块拼在一起，看哪个选项吻合。'),
    ),
    dict(
        n=14, pts=4,
        title=('Kangball Points', '袋鼠球得分'),
        content=(
            'Julie and Angela played “kangball”. Each goal scores 2 points. Julie scored 5 goals and Angela scored 9 goals. How many more points than Julie did Angela score?',
            'Julie 和 Angela 玩“袋鼠球”，每进一球得 2 分。Julie 进了 5 球，Angela 进了 9 球。Angela 比 Julie 多得多少分？',
        ),
        choices=num_choices(4, 6, 8, 10, 12),
        explain=('Angela has 4 more goals × 2 points = 8 more points.', 'Angela 多 4 球，每球 2 分，多 8 分。'),
    ),
    dict(
        n=15, pts=4,
        title=('Whose House Is Eva’s', 'Eva 的家'),
        content=(
            'The picture shows the five houses of five friends and their school. The school is the largest building in the picture. To go to school, Doris and Ali walk past Leo’s house. Eva walks past Chloe’s house. Which is Eva’s house?',
            '下图展示了五个朋友的家和学校的位置。学校是图中最大的建筑。上学路上 Doris 和 Ali 会经过 Leo 的家，Eva 会经过 Chloe 的家。请问哪一个是 Eva 的家？',
        ),
        choices=fig_choices(),
        explain=('Use who walks past whose house and the school location.', '结合谁经过谁的家以及学校位置推理。'),
    ),
    dict(
        n=16, pts=5,
        title=('Leaves on Two Branches', '两根树枝上的叶子'),
        content=(
            'The kangaroo had two branches for lunch. Each branch had 10 leaves. The kangaroo ate some leaves from one branch. Then, from the second branch, it ate as many leaves as were left on the first branch. How many leaves in total were left on the two branches?',
            '袋鼠中午吃了两根树枝上的叶子。每根树枝上有 10 片叶子。袋鼠先吃掉第一根上的一些叶子，再从第二根上吃掉与第一根剩余叶子同样多的叶子。两根树枝上总共还剩多少片叶子？',
        ),
        choices=num_choices(5, 6, 8, 10, 15),
        explain=('If x left on the first, second loses x too; total left = x + (10 − x) = 10.', '设第一根剩 x，第二根再吃掉 x，总共剩 x+(10−x)=10。'),
    ),
    dict(
        n=17, pts=5,
        title=('Which Shape Was Not Used', '哪块形状没用到'),
        content=(
            'Mara built the square by using four of the following five shapes. Which shape was not used?',
            'Mara 用下面五块形状中的四块拼成了正方形。哪一块没有被用到？',
        ),
        choices=fig_choices(),
        explain=('See which four shapes tile the square; the leftover is the answer.', '看哪四块能铺满正方形，剩下那块即答案。'),
    ),
    dict(
        n=18, pts=5,
        title=('Witch Apples and Bananas', '女巫的苹果和香蕉'),
        content=(
            'Every time the witch has 3 apples she turns them into 1 banana. Every time she has 3 bananas she turns them into 1 apple. What will she finish with if she starts with 4 apples and 5 bananas?',
            '女巫每有 3 个苹果就变成 1 根香蕉；每有 3 根香蕉就变成 1 个苹果。如果开始有 4 个苹果和 5 根香蕉，她最终会剩下什么？',
        ),
        choices=fig_choices(),  # typically picture options of fruit counts
        explain=('Keep converting while she has 3 of a kind; track the final fruits.', '只要凑满 3 个同类就转换，跟踪最终剩下的水果。'),
    ),
    dict(
        n=19, pts=5,
        title=('Two Boxes Same Sum', '两个盒子数字和相等'),
        content=(
            'The cards shown (2, 3, 4, 5, 6) are placed into two boxes. The sums of the numbers in each box are the same. Which number must be in the box with the number 4?',
            '把卡片 2、3、4、5、6 放进两个盒子，使两个盒子里数字的和相同。与数字 4 在同一盒子里的数一定是哪个？',
        ),
        choices=txt_choices([
            ('only 3', '只能是 3'),
            ('only 5', '只能是 5'),
            ('only 6', '只能是 6'),
            ('only 5 or 6', '只能是 5 或 6'),
            ('impossible to determine', '无法确定'),
        ]),
        explain=('Total sum 20, each box sums to 10; with 4 the partner must be 6.', '总和 20，每盒和为 10；与 4 同盒只能是 6。'),
    ),
    dict(
        n=20, pts=5,
        title=('Two Cogs Black Teeth', '两个齿轮的黑齿'),
        content=(
            'The picture shows two cogs, each with a black tooth. Where will the black teeth be after the small cog has made one full turn?',
            '图中有两个齿轮，每个都有一颗黑齿。小齿轮完整转一圈后，两颗黑齿会在什么位置？',
        ),
        choices=fig_choices(),
        explain=('Track relative positions after one full turn of the small cog.', '跟踪小齿轮转一圈后黑齿的相对位置。'),
    ),
    dict(
        n=21, pts=5,
        title=('Dance Pairs Minutes', '跳舞配对分钟数'),
        content=(
            'Three girls and two boys were dancing. They danced in pairs so that each girl danced with each boy for exactly one minute. At any time, there was only one pair on the dance floor. For how many minutes did they dance?',
            '三个女孩和两个男孩跳舞。他们两人一对，每个女孩与每个男孩都正好跳一分钟。任意时刻场上只有一对。他们一共跳了多少分钟？',
        ),
        choices=num_choices(5, 6, 8, 9, 10),
        explain=('3 girls × 2 boys = 6 pairs, each 1 minute → 6 minutes.', '3×2=6 对，每对 1 分钟，共 6 分钟。'),
    ),
    dict(
        n=22, pts=5,
        title=('Cookie Trays', '饼干烤盘'),
        content=(
            'Each participant in a cooking contest baked one tray of cookies like the one shown. What is the smallest number of trays of cookies needed to make the following plate?',
            '每位参赛者烤出一盘如图所示的饼干。要摆成下面的盘子，最少需要几盘饼干？',
        ),
        choices=num_choices(1, 2, 3, 4, 5),
        explain=('See how many trays are needed to supply the cookies on the plate.', '看目标盘子需要多少盘里的饼干。'),
    ),
    dict(
        n=23, pts=5,
        title=('Kangie’s Fruit in Two Weeks', '两周吃的水果'),
        content=(
            'Kangie eats only apples on Monday, Wednesday and Friday. On Tuesdays and Thursdays he eats only mangoes. He eats either 2 apples or 3 mangoes a day. On Saturdays and Sundays he eats nothing. How many pieces of fruit does Kangie eat in two weeks?',
            'Kangie 在周一、周三、周五只吃苹果；周二、周四只吃芒果。他每天要么吃 2 个苹果，要么吃 3 个芒果。周六周日不吃。两周里他一共吃了多少个水果？',
        ),
        choices=num_choices(12, 16, 18, 20, 24),
        explain=('Per week: 3×2 apples + 2×3 mangoes = 12; two weeks = 24.', '每周：3天×2苹果 + 2天×3芒果 = 12；两周 24。'),
    ),
    dict(
        n=24, pts=5,
        title=('Toys on Shelves', '书架上的玩具'),
        content=(
            'Stan has five toys: a ball, a set of blocks, a game, a puzzle and a car. He puts each toy on a different shelf of the bookcase. The ball is higher than the blocks and lower than the car. The game is directly above the ball. On which shelf can the puzzle not be placed?',
            'Stan 有五个玩具：球、积木、游戏、拼图和汽车。他把每个玩具放在书架不同的一层。球比积木高，比汽车低。游戏紧挨在球的上面。拼图不可能放在第几层？',
        ),
        choices=num_choices(1, 2, 3, 4, 5),
        explain=('Use the height constraints to see which shelf is impossible for the puzzle.', '用高低关系判断拼图不可能放在哪一层。'),
    ),
]


def make_item(q):
    letter = ANSWERS[q['n']]
    return {
        'title': {'en': q['title'][0], 'zh': q['title'][1]},
        'type': 'single_choice',
        'content': {'en': q['content'][0], 'zh': q['content'][1]},
        'choices': q['choices'],
        'correct_answer': IDX[letter],
        'explanation': {
            'en': q['explain'][0],
            'zh': q['explain'][1],
        },
        'meta': {
            'contest': 'Math Kangaroo 2021',
            'level_en': 'Level 1 (Grades 1–2)',
            'level_zh': '等级 1（1–2 年级）',
            'question_number': q['n'],
            'points': q['pts'],
            'answer_letter': letter,
        },
        'is_published': True,
    }


def main():
    items = [make_item(q) for q in BANK]
    part1, part2 = items[:12], items[12:]

    files = {
        'Math_Kangaroo_2021_Level1.json': items,
        'Math_Kangaroo_2021_Level1-1.json': part1,
        'Math_Kangaroo_2021_Level1-2.json': part2,
    }
    for name, data in files.items():
        path = os.path.join(OUT, name)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print('wrote', name, len(data))

    # remove old mangled filenames if present
    for fn in os.listdir(OUT):
        if fn.startswith('Math Kangaroo 2021') and fn.endswith('.json'):
            try:
                os.remove(os.path.join(OUT, fn))
                print('removed', fn)
            except OSError:
                pass


if __name__ == '__main__':
    main()
