# -*- coding: utf-8 -*-
"""Insert official PDF figures into A-2024 HTML pages."""
import os
import re

DIR = os.path.dirname(os.path.abspath(__file__))

FIG_CSS = """
.figwrap{margin:12px 0 4px;text-align:center}
.fig{display:block;width:100%;max-width:720px;margin:8px auto;border-radius:12px;background:#fff;border:1px solid #e2e8f0}
.fig-md{max-width:420px}
.figcap{margin:10px 0 4px;font-weight:700;color:#0369a1;font-size:14px}
"""

INSERT = {
    15: """
<div class="figwrap"><img class="fig" src="assets/q15_figure.png" alt="Q15 pattern and options"/></div>
""",
    16: """
<div class="figwrap"><img class="fig fig-md" src="assets/q16_figure.png" alt="Q16 number network"/></div>
""",
    17: """
<div class="figwrap">
  <img class="fig fig-md" src="assets/q17_figure.png" alt="Q17 cube box"/>
  <p class="figcap" data-zh="从上往下看，选项如下：" data-en="Top-view options:"></p>
  <img class="fig" src="assets/q17opts_figure.png" alt="Q17 options A-E"/>
</div>
""",
    18: """
<div class="figwrap"><img class="fig fig-md" src="assets/q18_figure.png" alt="Q18 board 1-5"/></div>
""",
    20: """
<div class="figwrap">
  <img class="fig fig-md" src="assets/q20_figure.png" alt="Q20 Ali Bella Che"/>
  <p class="figcap" data-zh="小迪的选项：" data-en="Dimitry options:"></p>
  <img class="fig" src="assets/q20opts_figure.png" alt="Q20 options A-E"/>
</div>
""",
    21: """
<div class="figwrap"><img class="fig" src="assets/q21_figure.png" alt="Q21 towers"/></div>
""",
    22: """
<div class="figwrap"><img class="fig fig-md" src="assets/q22_figure.png" alt="Q22 path grid"/></div>
""",
    23: """
<div class="figwrap"><img class="fig fig-md" src="assets/q23_figure.png" alt="Q23 May calendar"/></div>
""",
}


def patch(q: int, snippet: str) -> None:
    path = os.path.join(DIR, f"{q}.html")
    html = open(path, encoding="utf-8").read()
    if ".figwrap" not in html and ".fig{" not in html:
        html = html.replace("</style>", FIG_CSS + "\n</style>", 1)
    # drop previous figwrap (first only) if re-run
    html = re.sub(r'\n?<div class="figwrap">[\s\S]*?</div>\n?', "\n", html, count=1)
    m = re.search(r'<div class="qbox"[\s\S]*?</div>', html)
    if not m:
        print("NO QBOX", q)
        return
    html = html[: m.end()] + "\n" + snippet + html[m.end() :]
    open(path, "w", encoding="utf-8").write(html)
    print("patched", q)


if __name__ == "__main__":
    for q, snip in INSERT.items():
        patch(q, snip)
    # Ensure Q19 has shared fig CSS extras if missing figwrap styles beyond .fig
    p19 = os.path.join(DIR, "19.html")
    h19 = open(p19, encoding="utf-8").read()
    if ".figwrap" not in h19:
        h19 = h19.replace(
            ".fig{",
            ".figwrap{margin:12px 0 4px;text-align:center}\n.fig{",
            1,
        )
        # wrap existing fig img
        h19 = re.sub(
            r'(<img class="fig"[^>]*>)',
            r'<div class="figwrap">\1</div>',
            h19,
            count=1,
        )
        open(p19, "w", encoding="utf-8").write(h19)
        print("patched 19 wrap")
    print("done")
