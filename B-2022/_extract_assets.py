# -*- coding: utf-8 -*-
import fitz, os
pdf = r'D:\文秀相关\binghao\袋鼠数学\力迈学校资料\袋鼠数学历年真题\袋鼠数学历年真题（按照等级排列）\等级B\2022 等级2：3-4年级.pdf'
out = r'D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画\B-2022\assets'
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
for pi in range(0, 9):
    page = doc[pi]
    pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5))
    pix.save(os.path.join(out, f'page_{pi+1}.png'))
    for ii, img in enumerate(page.get_images(full=True)):
        xref = img[0]
        try:
            data = doc.extract_image(xref)
            ext = data['ext']
            with open(os.path.join(out, f'p{pi+1}_img{ii}.{ext}'), 'wb') as f:
                f.write(data['image'])
        except Exception as e:
            print('img err', pi, ii, e)
print('files', len(os.listdir(out)))
print(sorted(os.listdir(out)))
