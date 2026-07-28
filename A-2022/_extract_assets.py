# -*- coding: utf-8 -*-
import fitz, os
from PIL import Image

pdf = r'D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级A\2022 等级1：1-2年级.pdf'
out = r'D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\A-2022\assets'
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
mat = fitz.Matrix(2.5, 2.5)

for i in range(3, 8):
    pix = doc[i].get_pixmap(matrix=mat)
    pix.save(os.path.join(out, f'page_{i+1}.png'))
    for ii, img in enumerate(doc[i].get_images(full=True)):
        xref = img[0]
        try:
            data = doc.extract_image(xref)
            ext = data['ext']
            path = os.path.join(out, f'p{i+1}_img{ii}.{ext}')
            with open(path, 'wb') as f:
                f.write(data['image'])
        except Exception as e:
            print('err', i, ii, e)

# Crop question figures from pages (PDF coords * 2.5)
# page images are full page renders
crops = {
    # page_4: Q9 shapes + Q10 baskets
    'q10_figure.png': ('page_4.png', None),  # fill below
    'q11_figure.png': ('page_5.png', None),
}

# Use PDF clip for cleaner figures
clips = {
    # page index, rect in PDF points
    'q10_figure.png': (3, (50, 420, 540, 720)),   # baskets
    'q11_routes.png': (4, (50, 80, 540, 320)),    # routes A-E area
    'q12_pics.png': (4, (50, 340, 540, 560)),
    'q13_figure.png': (4, (50, 560, 540, 780)),
    'q14_stamp.png': (5, (50, 80, 540, 320)),
    'q15_figure.png': (5, (50, 340, 540, 520)),
    'q16_figure.png': (5, (50, 540, 540, 780)),
    'q17_figure.png': (6, (50, 80, 540, 320)),
    'q18_figure.png': (6, (50, 340, 540, 560)),
    'q19_figure.png': (6, (50, 560, 540, 720)),
}
mat3 = fitz.Matrix(3, 3)
for name, (pi, box) in clips.items():
    pix = doc[pi].get_pixmap(matrix=mat3, clip=fitz.Rect(*box))
    pix.save(os.path.join(out, name))
    print(name, pix.width, pix.height)

print('done', len(os.listdir(out)))
