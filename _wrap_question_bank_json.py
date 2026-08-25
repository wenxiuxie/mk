# -*- coding: utf-8 -*-
"""Wrap bare question-bank JSON arrays into import format:

{
  "title": {"en": "Math Kangaroo 2013 – Level 1", "zh": "Math Kangaroo 2013 – 等级 1"},
  "questions": [ ... ]
}
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(r"D:\文秀相关\binghao\袋鼠数学\袋鼠数学教学动画")

PATTERN = re.compile(r"Math Kangaroo (\d{4}) – (Level [12AB][^.\[]*)(?: -[12])?$")


def zh_title(stem: str, year: str, level: str) -> str:
    z = level
    z = z.replace("Level 1", "等级 1").replace("Level B", "等级 B").replace("Level 2", "等级 2")
    if "-1" in stem:
        z += " -1"
    elif "-2" in stem:
        z += " -2"
    return f"Math Kangaroo {year} – {z}"


def wrap_file(path: Path) -> bool:
    raw = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(raw, dict) and isinstance(raw.get("questions"), list):
        # ensure title has year
        title = raw.get("title") or {}
        stem = path.stem
        m = PATTERN.match(stem) or re.search(r"(20\d{2})", stem)
        year = m.group(1) if m and m.lastindex else (m.group(0) if m else "")
        en = title.get("en") or stem
        zh = title.get("zh") or stem
        if year and year not in str(en):
            en = stem
        if year and year not in str(zh):
            level = stem.split("–", 1)[-1].strip() if "–" in stem else stem
            zh = zh_title(stem, year, level)
        raw["title"] = {"en": en, "zh": zh}
        path.write_text(json.dumps(raw, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        return True

    if not isinstance(raw, list):
        return False

    stem = path.stem
    m = re.search(r"(20\d{2})", stem)
    year = m.group(1) if m else ""
    level_part = stem.split("–", 1)[-1].strip() if "–" in stem else stem
    wrapped = {
        "title": {
            "en": stem,
            "zh": zh_title(stem, year, level_part) if year else stem,
        },
        "questions": raw,
    }
    path.write_text(json.dumps(wrapped, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return True


def main():
    fixed = 0
    for path in sorted(ROOT.glob("**/Math Kangaroo *.json")):
        if wrap_file(path):
            fixed += 1
            print("fixed", path.relative_to(ROOT))
    print(f"done, {fixed} files")


if __name__ == "__main__":
    main()
