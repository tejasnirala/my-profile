"""
Recolor the black-and-white portrait sketches into the site's palette.

Each sketch is gradient-mapped: every grey level is placed on a ramp from the
theme's "ink" color (black) to its "paper" color (white), so the strokes keep
their exact shading but pick up the site's cool tint instead of pure #000/#fff.
Transparency is kept as-is. Output is WebP, sized for a ~22rem slot at 2x.

It also writes the app icon source (favicon, Apple touch icon, PWA icons, the
icon Google shows in results): a square head-and-shoulders crop of the dark
version as PNG, because next/og (which renders the icons) doesn't read WebP.
And the portrait for the social share card (opengraph-image.tsx), also PNG.

Run from the repo root after changing the palette or the sketches:

    python3 design/portrait/tint.py

Needs Pillow and NumPy (dev-only; nothing here ships with the site).
"""

from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).parent
OUT = HERE.parent.parent / "src" / "assets"

# Hex values mirror the tokens in src/app/globals.css.
THEMES = {
    # Light theme: ink = --foreground, paper = --card (a touch brighter than the page).
    "light": {"src": "sketch-light.png", "ink": "#101218", "paper": "#f9f9fb"},
    # Dark theme: paper = --foreground; ink sits just below --background so the
    # dark masses (hair, jacket) still read as shadow against the page.
    "dark": {"src": "sketch-dark.png", "ink": "#060709", "paper": "#e8eaee"},
}

WIDTH = 880  # 22rem at 2x, rounded up
QUALITY = 86

# Square crop of the original sketch (x0, y0, x1, y1) framing the head and beard,
# so the face stays recognisable at 32-48px. Output edge in px.
ICON_CROP = (250, 10, 1030, 790)
ICON_SIZE = 512
ICON_LEVELS = 24  # grey levels; keeps the 512px PWA icon small without visible banding
SHARE_WIDTH = 520  # drawn at exactly this width in opengraph-image.tsx (no resampling)
SHARE_LEVELS = 16  # grey levels: fewer distinct tones compress far better as PNG


def hex_rgb(value: str) -> np.ndarray:
    value = value.lstrip("#")
    return np.array([int(value[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)


def recolor(image: Image.Image, ink: str, paper: str) -> Image.Image:
    pixels = np.asarray(image.convert("RGBA")).astype(np.float32)
    level = pixels[..., :3].mean(axis=2, keepdims=True) / 255.0
    rgb = hex_rgb(ink) + (hex_rgb(paper) - hex_rgb(ink)) * level
    out = np.concatenate([rgb, pixels[..., 3:4]], axis=2).round().clip(0, 255).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def posterize(image: Image.Image, levels: int) -> Image.Image:
    """Snap grey levels to `levels` steps (alpha untouched): far fewer distinct
    tones, so the PNGs rendered from it compress much better."""
    step = 255 / (levels - 1)
    pixels = np.asarray(image.convert("RGBA")).astype(np.float32)
    pixels[..., :3] = (pixels[..., :3] / step).round() * step
    return Image.fromarray(pixels.round().clip(0, 255).astype(np.uint8), "RGBA")


def report(path: Path) -> None:
    print(f"{path.relative_to(HERE.parent.parent)}: {path.stat().st_size // 1024} KB")


def tint(theme: str, src: str, ink: str, paper: str) -> None:
    image = Image.open(HERE / src).convert("RGBA")
    image = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
    path = OUT / f"portrait-{theme}.webp"
    recolor(image, ink, paper).save(path, "WEBP", quality=QUALITY, alpha_quality=90, method=6)
    report(path)


def icon() -> None:
    dark = THEMES["dark"]
    image = Image.open(HERE / dark["src"]).convert("RGBA").crop(ICON_CROP)
    image = posterize(image.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS), ICON_LEVELS)
    path = OUT / "portrait-icon.png"
    recolor(image, dark["ink"], dark["paper"]).save(path, "PNG", optimize=True)
    report(path)


def share() -> None:
    dark = THEMES["dark"]
    image = Image.open(HERE / dark["src"]).convert("RGBA")
    image = image.resize((SHARE_WIDTH, round(image.height * SHARE_WIDTH / image.width)), Image.LANCZOS)
    image = posterize(image, SHARE_LEVELS)
    path = OUT / "portrait-share.png"
    recolor(image, dark["ink"], dark["paper"]).save(path, "PNG", optimize=True)
    report(path)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for theme, config in THEMES.items():
        tint(theme, **config)
    icon()
    share()
