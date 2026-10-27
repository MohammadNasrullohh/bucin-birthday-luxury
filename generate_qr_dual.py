import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

url = "https://wise-borg.vercel.app"

# 1. Base QR Code generation (Level H error correction)
qr = qrcode.QRCode(
    version=4,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=18,
    border=3,
)
qr.add_data(url)
qr.make(fit=True)

# Colors: Romantic Crimson Velvet on Soft Rose Silk
qr_base = qr.make_image(fill_color="#9F1239", back_color="#FFF0F5").convert("RGBA")
qw, qh = qr_base.size

# Heart emblem for the center
logo_size = int(qw * 0.22)
logo = Image.new("RGBA", (logo_size, logo_size), (0, 0, 0, 0))
ldraw = ImageDraw.Draw(logo)

# Circular frame for heart
ldraw.ellipse([3, 3, logo_size - 3, logo_size - 3], fill="#FFF0F5", outline="#F43F5E", width=4)

# Draw Heart Shape
points = []
cx = logo_size // 2
cy = logo_size // 2 + 2
s = logo_size * 0.52
for step in range(360):
    rad = math.radians(step)
    hx = 16 * (math.sin(rad) ** 3)
    hy = -(13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad))
    points.append((cx + hx * (s / 36), cy + hy * (s / 36)))

ldraw.polygon(points, fill="#E11D48")

# Little inner gleam
gleam_pts = []
s_g = logo_size * 0.22
for step in range(360):
    rad = math.radians(step)
    hx = 16 * (math.sin(rad) ** 3)
    hy = -(13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad))
    gleam_pts.append((cx + hx * (s_g / 36), cy + hy * (s_g / 36)))
ldraw.polygon(gleam_pts, fill="#FDA4AF")

# Paste center heart logo
pos = ((qw - logo_size) // 2, (qh - logo_size) // 2)
qr_base.paste(logo, pos, logo)

# Rounded corners for the QR code
mask = Image.new("L", (qw, qh), 0)
mask_draw = ImageDraw.Draw(mask)
mask_draw.rounded_rectangle([0, 0, qw, qh], radius=32, fill=255)
qr_rounded = Image.new("RGBA", (qw, qh), (0, 0, 0, 0))
qr_rounded.paste(qr_base, (0, 0), mask=mask)

# Save 1: Standalone Clean Love QR Code
os.makedirs("public", exist_ok=True)
qr_base.save("public/qr-code-love.png", "PNG")
qr_base.save("qr-code-love.png", "PNG")

# 2. Luxury Gift Card Presentation (1000 x 1350)
card_w = 1000
card_h = 1350
card = Image.new("RGBA", (card_w, card_h), (10, 4, 8, 255))
cdraw = ImageDraw.Draw(card)

# Ambient Radial Rose Glow behind card
glow_layer = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow_layer)
for r in range(450, 0, -15):
    alpha = int(45 * (1 - r / 450))
    gdraw.ellipse([card_w // 2 - r, 680 - r, card_w // 2 + r, 680 + r], fill=(244, 63, 94, alpha))
glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(35))
card = Image.alpha_composite(card, glow_layer)
cdraw = ImageDraw.Draw(card)

# Outer Card Gold / Rose Borders
cdraw.rounded_rectangle([45, 45, card_w - 45, card_h - 45], radius=44, outline=(244, 63, 94, 100), width=2)
cdraw.rounded_rectangle([58, 58, card_w - 58, card_h - 58], radius=36, outline=(253, 164, 175, 40), width=1)

# Corner hearts flourish
def draw_corner_heart(cx, cy, sz):
    h_layer = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    hd = ImageDraw.Draw(h_layer)
    pts = []
    for step in range(360):
        rad = math.radians(step)
        hx = 16 * (math.sin(rad) ** 3)
        hy = -(13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad))
        pts.append((cx + hx * (sz / 36), cy + hy * (sz / 36)))
    hd.polygon(pts, fill=(244, 63, 94, 160))
    return h_layer

card = Image.alpha_composite(card, draw_corner_heart(90, 90, 22))
card = Image.alpha_composite(card, draw_corner_heart(card_w - 90, 90, 22))
card = Image.alpha_composite(card, draw_corner_heart(90, card_h - 90, 22))
card = Image.alpha_composite(card, draw_corner_heart(card_w - 90, card_h - 90, 22))
cdraw = ImageDraw.Draw(card)

# Fonts
try:
    f_badge = ImageFont.truetype("arialbd.ttf", 20)
    f_title = ImageFont.truetype("georgiab.ttf", 46)
    f_sub = ImageFont.truetype("arial.ttf", 24)
    f_quote = ImageFont.truetype("georgiai.ttf", 26)
    f_url = ImageFont.truetype("arialbd.ttf", 22)
except:
    f_badge = f_title = f_sub = f_quote = f_url = ImageFont.load_default()

# Top Heart Pill Badge
badge_w = 320
badge_h = 46
bx = (card_w - badge_w) // 2
by = 100
cdraw.rounded_rectangle([bx, by, bx + badge_w, by + badge_h], radius=23, fill=(28, 10, 22, 230), outline=(244, 63, 94, 180), width=1)
cdraw.text((card_w // 2, by + 23), "KADO SPESIAL ULANG TAHUN", fill=(253, 164, 175, 255), font=f_badge, anchor="mm")

# Header Title
cdraw.text((card_w // 2, 195), "Megawati Soekarnoputri", fill=(255, 245, 247, 255), font=f_title, anchor="mm")
cdraw.text((card_w // 2, 245), "Scan barcode di bawah dengan kamera ponselmu", fill=(253, 164, 175, 220), font=f_sub, anchor="mm")

# QR Platter Background with soft shadow
qr_display_w = 540
qr_display_h = 540
qx = (card_w - qr_display_w) // 2
qy = 315

# Outer Platter Glow
cdraw.rounded_rectangle([qx - 16, qy - 16, qx + qr_display_w + 16, qy + qr_display_h + 16], radius=42, fill=(22, 8, 18, 240), outline=(244, 63, 94, 160), width=2)

# Paste QR code resized
qr_to_paste = qr_rounded.resize((qr_display_w, qr_display_h), Image.Resampling.LANCZOS)
card.paste(qr_to_paste, (qx, qy), qr_to_paste)
cdraw = ImageDraw.Draw(card)

# Bottom Poetic Quote
cdraw.text((card_w // 2, 925), '"Hanya kamu yang bisa membuatku tersenyum..."', fill=(255, 241, 243, 240), font=f_quote, anchor="mm")
cdraw.text((card_w // 2, 970), "Dash Uciha — Merindukanmu", fill=(253, 164, 175, 190), font=f_sub, anchor="mm")

# Instructions & URL Pill
desc_text = "Buka kamera HP, arahkan ke barcode, dan nikmati persembahan cinta ini"
cdraw.text((card_w // 2, 1030), desc_text, fill=(255, 225, 232, 170), font=f_badge, anchor="mm")

url_w = 460
url_h = 52
ux = (card_w - url_w) // 2
uy = 1080
cdraw.rounded_rectangle([ux, uy, ux + url_w, uy + url_h], radius=26, fill=(30, 11, 24, 255), outline=(244, 63, 94, 150), width=1)
cdraw.text((card_w // 2, uy + 26), "wise-borg.vercel.app", fill=(255, 245, 247, 240), font=f_url, anchor="mm")

# Save files
card.save("public/qr-code-love-card.png", "PNG")
card.save("qr-code-love-card.png", "PNG")

# Verify decoding
import cv2
d = cv2.QRCodeDetector()
val1, _, _ = d.detectAndDecode(cv2.imread("public/qr-code-love.png"))
print("Decoded Solo QR:", val1)

# Also test crop area of card
val2, _, _ = d.detectAndDecode(cv2.imread("public/qr-code-love-card.png")[qy:qy+qr_display_h, qx:qx+qr_display_w])
print("Decoded Card QR Crop:", val2)
