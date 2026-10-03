"""
Rebuild src/app/favicon.ico from the generated 32px tab icon (the [n] monogram),
so the .ico (which some browsers request first) matches the tab icon. It holds
16 and 32px only: neither is a multiple of 48, so Google won't use it and shows
the 192px portrait instead.

    pnpm build && pnpm start          # in one terminal
    python3 design/favicon.py         # in another (defaults to localhost:3000)

Needs Pillow (dev-only; nothing here ships with the site).
"""

import io
import re
import sys
import urllib.request
from pathlib import Path

from PIL import Image

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
OUT = Path(__file__).parent.parent / "src" / "app" / "favicon.ico"

html = urllib.request.urlopen(BASE).read().decode()
icon_path = re.search(r'href="(/icon/tab\?[^"]*)"', html).group(1)
icon = Image.open(io.BytesIO(urllib.request.urlopen(BASE + icon_path).read())).convert("RGBA")

icon.save(OUT, format="ICO", sizes=[(32, 32), (16, 16)])
print(f"{OUT.relative_to(Path.cwd())}: {OUT.stat().st_size} bytes from {icon_path}")
