# -*- coding: utf-8 -*-
import fitz, os

pdf = r'D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级A\2023 等级A：1-2年级.pdf'
out = r'D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\A-2023\assets'
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
mat = fitz.Matrix(2.5, 2.5)

for i in range(5, 10):
    pix = doc[i].get_pixmap(matrix=mat)
    pix.save(os.path.join(out, f'page_{i+1}.png'))
    for ii, img in enumerate(doc[i].get_images(full=True)):
        xref = img[0]
        try:
            data = doc.extract_image(xref)
            ext = data['ext']
            with open(os.path.join(out, f'p{i+1}_img{ii}.{ext}'), 'wb') as f:
                f.write(data['image'])
        except Exception as e:
            print('err', i, ii, e)

mat3 = fitz.Matrix(3, 3)
clips = {
    'q14_figure.png': (5, (50, 80, 540, 420)),
    'q15_figure.png': (5, (50, 450, 540, 720)),
    'q16_figure.png': (6, (50, 80, 540, 420)),
    'q17_figure.png': (6, (50, 440, 540, 760)),
    'q18_figure.png': (7, (50, 80, 540, 380)),
    'q19_figure.png': (7, (50, 400, 540, 720)),
    'q20_figure.png': (8, (50, 80, 540, 380)),
    'q22_figure.png': (8, (50, 540, 540, 780)),
    'q23_figure.png': (9, (50, 80, 540, 320)),
}
for name, (pi, box) in clips.items():
    pix = doc[pi].get_pixmap(matrix=mat3, clip=fitz.Rect(*box))
    pix.save(os.path.join(out, name))
    print(name, pix.width, pix.height)

print('done', len(os.listdir(out)))
