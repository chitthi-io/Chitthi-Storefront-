#!/usr/bin/env python3
"""
================================================================================
 CHITTHI.IO — UNIVERSAL EDITORIAL THUMBNAIL ENGINE  (Section III)
================================================================================
Renders a 1920x1080 product thumbnail in the Chitthi.io editorial style:

    warm linen paper + spotlight vignette
    oak shelf along the bottom with a soft contact shadow
    LEFT    editorial title block
    CENTRE  titanium iPhone chassis containing the real template UI
    RIGHT   two polaroids on brass binder clips, tilted -5 deg and +7 deg
    PROPS   terracotta wax seal + three mini voucher cards

The phone screen uses a REAL screenshot of the deployed template, so the
thumbnail can never advertise a UI that does not exist.

USAGE
-----
    # capture the live site itself (needs playwright)
    python3 tools/generate_thumbnail.py \
        --repo Chitthi-Be-Mine-Proposal \
        --title "Playful 'Be Mine' Proposal" \
        --edition "VALENTINE & CRUSH EDITION" \
        --tagline "The question page they literally can't say no to." \
        --url https://chitthi-io.github.io/Chitthi-Be-Mine-Proposal/ \
        --polaroids photos/a.jpg photos/b.jpg \
        --chips "Coffee Date" "Free Hugs" "Ice Cream"

    # or composite a screenshot you already have
    python3 tools/generate_thumbnail.py --repo X --title Y --shot shot.png

OUTPUT
------
    thumbnails/<repo>_thumb.png        1920x1080
    thumbnails/<repo>_card.jpg         1600x1000 (16:10, storefront card)
================================================================================
"""
import argparse, math, os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# ---------------------------------------------------------------- brand tokens
PAPER   = (250, 248, 245)
INK     = (35, 39, 47)
SECOND  = (90, 96, 112)
ROSE    = (200, 122, 125)
TINT    = (244, 230, 228)
AMBER   = (245, 158, 11)
OAK     = (198, 170, 136)
OAK_DK  = (170, 141, 108)
WHITE   = (255, 255, 255)

W, H = 1920, 1080
FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")


def font(name, size, weight=None):
    f = ImageFont.truetype(os.path.join(FONTS, name), size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f


# ------------------------------------------------------------------- utilities
def rounded_shadow(base, box, radius, blur=34, spread=16, alpha=58, dy=16):
    """Soft drop shadow under a rounded rect."""
    x0, y0, x1, y1 = box
    lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(lay).rounded_rectangle(
        [x0 - spread // 2, y0 - spread // 2 + dy, x1 + spread // 2, y1 + spread // 2 + dy],
        radius=radius + spread // 2, fill=(35, 30, 26, alpha))
    base.alpha_composite(lay.filter(ImageFilter.GaussianBlur(blur)))


def paste_rotated(base, img, center, angle):
    r = img.rotate(angle, expand=True, resample=Image.BICUBIC)
    base.alpha_composite(r, (int(center[0] - r.width / 2), int(center[1] - r.height / 2)))


def text_block(d, xy, lines):
    """lines = [(text, font, fill, leading_after)]"""
    x, y = xy
    for txt, f, fill, gap in lines:
        d.text((x, y), txt, font=f, fill=fill)
        bb = d.textbbox((x, y), txt, font=f)
        y = bb[3] + gap
    return y


# --------------------------------------------------------------------- surface
def build_surface():
    img = Image.new("RGBA", (W, H), PAPER + (255,))
    d = ImageDraw.Draw(img)

    # linen weave
    weave = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wd = ImageDraw.Draw(weave)
    for x in range(0, W, 3):
        wd.line([(x, 0), (x, H)], fill=(35, 39, 47, 4))
    for y in range(0, H, 3):
        wd.line([(0, y), (W, y)], fill=(255, 255, 255, 5))
    img.alpha_composite(weave)

    # spotlight
    spot = Image.new("L", (W, H), 0)
    ImageDraw.Draw(spot).ellipse([W * 0.16, -H * 0.42, W * 0.86, H * 1.06], fill=104)
    spot = spot.filter(ImageFilter.GaussianBlur(190))
    img.alpha_composite(Image.merge("RGBA", (
        Image.new("L", (W, H), 255), Image.new("L", (W, H), 253),
        Image.new("L", (W, H), 248), spot)))

    # vignette
    vig = Image.new("L", (W, H), 0)
    ImageDraw.Draw(vig).ellipse([-W * 0.32, -H * 0.32, W * 1.32, H * 1.32], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(240)).point(lambda v: 255 - v)
    img.alpha_composite(Image.merge("RGBA", (
        Image.new("L", (W, H), 120), Image.new("L", (W, H), 104),
        Image.new("L", (W, H), 88), vig.point(lambda v: int(v * .30)))))

    # oak shelf
    shelf_y = int(H * 0.815)
    for i in range(H - shelf_y):
        k = i / max(1, (H - shelf_y))
        c = tuple(int(OAK[j] + (OAK_DK[j] - OAK[j]) * (k ** .7)) for j in range(3))
        d.line([(0, shelf_y + i), (W, shelf_y + i)], fill=c + (255,))
    import random as _r
    _r.seed(7)
    for _ in range(900):                           # grain, irregular
        gx = _r.randrange(0, W); gy = shelf_y + _r.randrange(4, H - shelf_y)
        d.line([(gx, gy), (gx + _r.randrange(18, 90), gy)], fill=(150, 122, 92, _r.randrange(8, 22)))
    d.line([(0, shelf_y), (W, shelf_y)], fill=(120, 96, 70, 90), width=2)

    # contact shadow above the shelf
    cs = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(cs).rectangle([0, shelf_y - 26, W, shelf_y], fill=(60, 44, 30, 46))
    img.alpha_composite(cs.filter(ImageFilter.GaussianBlur(20)))
    return img, shelf_y


# ----------------------------------------------------------------------- phone
def draw_phone(base, shot, cx, cy, screen_h=712):
    """Titanium chassis containing the real UI screenshot."""
    sw = int(screen_h * 393 / 852)                      # true iPhone aspect
    bezel, rim = 13, 4
    pw, ph = sw + bezel * 2, screen_h + bezel * 2
    x0, y0 = int(cx - pw / 2), int(cy - ph / 2)

    rounded_shadow(base, (x0, y0, x0 + pw, y0 + ph), 62, blur=42, alpha=70, dy=22)

    body = Image.new("RGBA", (pw, ph), (0, 0, 0, 0))
    bd = ImageDraw.Draw(body)
    bd.rounded_rectangle([0, 0, pw, ph], radius=62, fill=(31, 34, 40, 255))
    bd.rounded_rectangle([0, 0, pw, ph], radius=62, outline=(126, 130, 138, 255), width=rim)
    bd.rounded_rectangle([rim, rim, pw - rim, ph - rim], radius=58, outline=(58, 62, 70, 255), width=2)
    base.alpha_composite(body, (x0, y0))

    # screen
    scr = shot.convert("RGB").resize((sw, screen_h), Image.LANCZOS)
    SS = 4
    m = Image.new("L", (sw * SS, screen_h * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, sw * SS - 1, screen_h * SS - 1],
                                        radius=int(sw * .142) * SS, fill=255)
    m = m.resize((sw, screen_h), Image.LANCZOS).filter(ImageFilter.GaussianBlur(.6))
    base.paste(scr, (x0 + bezel, y0 + bezel), m)

    # dynamic island
    d = ImageDraw.Draw(base)
    iw, ih = int(sw * .28), int(sw * .072)
    ix, iy = int(cx - iw / 2), y0 + bezel + int(screen_h * .017)
    d.rounded_rectangle([ix, iy, ix + iw, iy + ih], radius=ih // 2, fill=(14, 14, 18, 255))

    # glass sheen
    sheen = Image.new("L", base.size, 0)
    ImageDraw.Draw(sheen).polygon(
        [(x0 + bezel, y0 + bezel),
         (x0 + bezel + int(sw * .60), y0 + bezel),
         (x0 + bezel, y0 + bezel + int(screen_h * .42))], fill=17)
    sheen = sheen.filter(ImageFilter.GaussianBlur(30))
    base.alpha_composite(Image.merge("RGBA", (
        Image.new("L", base.size, 255), Image.new("L", base.size, 255),
        Image.new("L", base.size, 255), sheen)))
    return x0, y0, pw, ph


# -------------------------------------------------------------------- polaroid
def make_polaroid(photo, caption, w=298):
    pad, capsp = 15, 66
    ph = int(w * 1.02)
    card = Image.new("RGBA", (w, ph + capsp + pad), (255, 255, 255, 255))
    d = ImageDraw.Draw(card)
    d.rectangle([0, 0, w - 1, card.height - 1], outline=(0, 0, 0, 18))
    if photo is not None:
        im = photo.convert("RGB")
        s = min(im.width / (w - pad * 2), im.height / ph)
        im = im.crop((0, 0, int((w - pad * 2) * s), int(ph * s))).resize((w - pad * 2, ph), Image.LANCZOS)
        card.paste(im, (pad, pad))
    else:
        d.rectangle([pad, pad, w - pad, pad + ph], fill=TINT + (255,))
    if caption:
        f = font("Caveat.ttf", 33, 600)
        tw = d.textlength(caption, font=f)
        d.text(((w - tw) / 2, pad + ph + 16), caption, font=f, fill=SECOND + (255,))
    return card


def brass_clip(w=58, h=34):
    """Flat binder clip seen head-on, not a padlock."""
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 8, w - 1, h - 1], radius=4, fill=(206, 172, 98, 255),
                        outline=(150, 118, 56, 255), width=2)
    d.rounded_rectangle([4, 12, w - 5, h - 6], radius=3, fill=(226, 196, 132, 255))
    d.line([(w * .28, 12), (w * .28, h - 7)], fill=(168, 134, 66, 190), width=2)
    d.line([(w * .72, 12), (w * .72, h - 7)], fill=(168, 134, 66, 190), width=2)
    d.arc([w * .22, 0, w * .78, 20], 200, 340, fill=(180, 146, 74, 255), width=3)
    return c


# ------------------------------------------------------------------- wax seal
def wax_seal(r=58):
    s = Image.new("RGBA", (r * 2 + 16, r * 2 + 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(s)
    cx = cy = r + 8
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(178, 102, 105, 255))
    d.ellipse([cx - r + 5, cy - r + 3, cx + r - 5, cy + r - 7], fill=ROSE + (255,))
    for i in range(24):                                   # wavy edge
        a = i * math.pi / 12
        d.ellipse([cx + math.cos(a) * r - 9, cy + math.sin(a) * r - 9,
                   cx + math.cos(a) * r + 9, cy + math.sin(a) * r + 9], fill=(190, 112, 114, 255))
    d.ellipse([cx - r + 17, cy - r + 15, cx + r - 17, cy + r - 19], outline=(158, 88, 91, 190), width=3)
    # embossed heart, centred
    hs = 17
    d.ellipse([cx - hs, cy - hs * .85, cx, cy + hs * .3], fill=(166, 94, 97, 235))
    d.ellipse([cx, cy - hs * .85, cx + hs, cy + hs * .3], fill=(166, 94, 97, 235))
    d.polygon([(cx - hs * .97, cy), (cx + hs * .97, cy), (cx, cy + hs * 1.2)], fill=(166, 94, 97, 235))
    hi = Image.new("RGBA", s.size, (0, 0, 0, 0))
    ImageDraw.Draw(hi).ellipse([cx - r + 12, cy - r + 8, cx - 6, cy - 10], fill=(255, 255, 255, 46))
    s.alpha_composite(hi.filter(ImageFilter.GaussianBlur(9)))
    return s


def mini_card(label, w=176, h=104):
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, w - 1, h - 1], radius=9, fill=(253, 251, 247, 255),
                        outline=(35, 39, 47, 34), width=2)
    # heart drawn as geometry — Jakarta has no ♥ glyph and renders tofu
    hx, hy, hs = w / 2, 27.0, 8.0
    d.ellipse([hx - hs, hy - hs * .8, hx, hy + hs * .35], fill=ROSE + (255,))
    d.ellipse([hx, hy - hs * .8, hx + hs, hy + hs * .35], fill=ROSE + (255,))
    d.polygon([(hx - hs * .96, hy + .05), (hx + hs * .96, hy + .05), (hx, hy + hs * 1.15)], fill=ROSE + (255,))
    f = font("Playfair.ttf", 22, 600)
    words, line, y = label.split(), "", 46
    for wd_ in words:
        t = (line + " " + wd_).strip()
        if d.textlength(t, font=f) > w - 22 and line:
            d.text((w / 2, y), line, font=f, fill=INK + (255,), anchor="ma"); y += 25; line = wd_
        else:
            line = t
    d.text((w / 2, y), line, font=f, fill=INK + (255,), anchor="ma")
    d.text((w / 2, h - 20), "V O U C H E R", font=font("Jakarta.ttf", 11, 700),
           fill=SECOND + (255,), anchor="mm")
    return c


# ==============================================================================
def build(args):
    base, shelf_y = build_surface()
    d = ImageDraw.Draw(base)

    # ---------------------------------------------------------- centre : phone
    shot = Image.open(args.shot)
    cx, cy = int(W * 0.512), int(H * 0.485)
    px0, py0, pw, ph = draw_phone(base, shot, cx, cy)

    # halo behind the phone
    halo = Image.new("L", (W, H), 0)
    ImageDraw.Draw(halo).ellipse([cx - 470, cy - 430, cx + 470, cy + 430], fill=52)
    halo = halo.filter(ImageFilter.GaussianBlur(120))
    base.alpha_composite(Image.merge("RGBA", (
        Image.new("L", (W, H), 255), Image.new("L", (W, H), 254),
        Image.new("L", (W, H), 250), halo)), (0, 0))
    draw_phone(base, shot, cx, cy)                      # redraw crisply over halo
    d = ImageDraw.Draw(base)

    # ------------------------------------------------------------- left : type
    lx = int(W * 0.055)
    ly = int(H * 0.255)
    d.text((lx, ly), "A", font=font("PlayfairItalic.ttf", 44, 500), fill=ROSE + (255,))
    ly += 62
    title_f = font("Playfair.ttf", 74, 600)
    words, line, lines = args.title.split(), "", []
    for wd_ in words:
        t = (line + " " + wd_).strip()
        if d.textlength(t, font=title_f) > W * 0.30 and line:
            lines.append(line); line = wd_
        else:
            line = t
    lines.append(line)
    for ln in lines:
        d.text((lx, ly), ln, font=title_f, fill=INK + (255,)); ly += 86
    ly += 8
    d.text((lx, ly), args.edition.upper(), font=font("Jakarta.ttf", 22, 700), fill=ROSE + (255,))
    ly += 46
    d.line([(lx, ly), (lx + 210, ly)], fill=ROSE + (150,), width=2); ly += 34
    d.text((lx, ly), f"by {args.brand}", font=font("Jakarta.ttf", 25, 500), fill=SECOND + (255,))
    ly += 66
    tag_f = font("Playfair.ttf", 30, 500)
    words, line, tl = args.tagline.split(), "", []
    for wd_ in words:
        t = (line + " " + wd_).strip()
        if d.textlength(t, font=tag_f) > W * 0.235 and line:
            tl.append(line); line = wd_
        else:
            line = t
    tl.append(line)
    for ln in tl:
        d.text((lx, ly), ln, font=tag_f, fill=INK + (235,)); ly += 42

    # -------------------------------------------------- right : two polaroids
    caps = args.captions or ["", ""]
    photos = []
    for p in (args.polaroids or [])[:2]:
        try: photos.append(Image.open(p))
        except Exception: photos.append(None)
    while len(photos) < 2: photos.append(None)

    for i, (ph_img, cap, ang, ctr) in enumerate([
        (photos[0], caps[0] if len(caps) > 0 else "", -5, (int(W * 0.775), int(H * 0.290))),
        (photos[1], caps[1] if len(caps) > 1 else "", 7,  (int(W * 0.905), int(H * 0.600))),
    ]):
        card = make_polaroid(ph_img, cap)
        sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
        blk = Image.new("RGBA", card.size, (40, 30, 22, 78)).rotate(ang, expand=True, resample=Image.BICUBIC)
        sh.alpha_composite(blk, (int(ctr[0] - blk.width / 2) + 8, int(ctr[1] - blk.height / 2) + 18))
        base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(22)))
        paste_rotated(base, card, ctr, ang)
        clip = brass_clip()
        paste_rotated(base, clip,
                      (ctr[0] + math.sin(math.radians(ang)) * (card.height / 2 - 6),
                       ctr[1] - math.cos(math.radians(ang)) * (card.height / 2 - 6)), ang)

    # ------------------------------------------------------------- props
    seal = wax_seal()
    sx, sy = int(W * 0.245), shelf_y - 6
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([sx - 66, sy - 26, sx + 66, sy + 30], fill=(50, 36, 24, 92))
    base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(16)))
    base.alpha_composite(seal, (sx - seal.width // 2, sy - seal.height + 20))

    chips = args.chips or []
    if chips:
        gap, cw = 16, 176
        total = len(chips) * cw + (len(chips) - 1) * gap
        startx = int(W * 0.905) - total
        for i, label in enumerate(chips[:3]):
            card = mini_card(label)
            x = startx + i * (cw + gap)
            y = shelf_y - card.height + 14
            sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
            ImageDraw.Draw(sh).rectangle([x + 6, y + card.height - 10, x + cw - 2, y + card.height + 12],
                                         fill=(50, 36, 24, 84))
            base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(12)))
            base.alpha_composite(card, (x, y))

    return base.convert("RGB")


def capture(url, out, w=400, ratio=852 / 393, wait=3800):
    from playwright.sync_api import sync_playwright
    h = round(w * ratio)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=3)
        pg.goto(url, wait_until="networkidle")
        pg.wait_for_timeout(wait)
        pg.screenshot(path=out)
        b.close()
    return out


def main():
    ap = argparse.ArgumentParser(description="Chitthi.io editorial thumbnail engine")
    ap.add_argument("--repo", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--edition", default="A DIGITAL KEEPSAKE")
    ap.add_argument("--tagline", default="A digital gift that stays forever.")
    ap.add_argument("--brand", default="Chitthi.io")
    ap.add_argument("--url", help="live URL to screenshot")
    ap.add_argument("--shot", help="existing screenshot instead of --url")
    ap.add_argument("--polaroids", nargs="*", default=[])
    ap.add_argument("--captions", nargs="*", default=[])
    ap.add_argument("--chips", nargs="*", default=[])
    ap.add_argument("--outdir", default="thumbnails")
    args = ap.parse_args()

    if not args.shot:
        if not args.url:
            sys.exit("need --url or --shot")
        os.makedirs("/tmp/cthumb", exist_ok=True)
        args.shot = f"/tmp/cthumb/{args.repo}.png"
        print(f"  capturing {args.url}")
        capture(args.url, args.shot)

    os.makedirs(args.outdir, exist_ok=True)
    img = build(args)

    p1 = os.path.join(args.outdir, f"{args.repo}_thumb.png")
    img.save(p1, optimize=True)
    print(f"  {p1}  {img.size}  {os.path.getsize(p1)//1024}KB")

    # 16:10 storefront card, extended (never cropped)
    th = round(W / 1.6)
    canvas = Image.new("RGB", (W, th))
    canvas.paste(img.crop((0, 0, W, 3)).resize((W, th - H), Image.BILINEAR), (0, 0))
    canvas.paste(img, (0, th - H))
    p2 = os.path.join(args.outdir, f"{args.repo}_card.jpg")
    canvas.resize((1600, 1000), Image.LANCZOS).save(p2, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"  {p2}  1600x1000  {os.path.getsize(p2)//1024}KB")


if __name__ == "__main__":
    main()
