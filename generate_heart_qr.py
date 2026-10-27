import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

url = "https://wise-borg.vercel.app"

# 1. Generate QR Code
qr = qrcode.QRCode(
    version=4,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=16,
    border=2,
)
qr.add_data(url)
qr.make(fit=True)

# Colors: Deep Crimson Velvet modules on Rose Silk background
qr_img = qr.make_image(fill_color="#9F1239", back_color="#FFF0F5").convert("RGBA")
qw, qh = qr_img.size

# 2. Add Center Heart Emblem onto QR code
logo_sz = int(qw * 0.22)
logo = Image.new("RGBA", (logo_sz, logo_sz), (0, 0, 0, 0))
ldraw = ImageDraw.Draw(logo)

# Backing circle with rose border
ldraw.ellipse([2, 2, logo_sz - 2, logo_sz - 2], fill="#FFF0F5", outline="#F43F5E", width=4)

def get_heart_points(cx, cy, scale):
    pts = []
    for step in range(360):
        rad = math.radians(step)
        hx = 16 * (math.sin(rad) ** 3)
        hy = -(13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad))
        pts.append((cx + hx * (scale / 36), cy + hy * (scale / 36)))
    return pts

# Outer heart in logo
l_pts = get_heart_points(logo_sz // 2, logo_sz // 2 + 2, logo_sz * 0.54)
ldraw.polygon(l_pts, fill="#E11D48")

# Little gleam
g_pts = get_heart_points(logo_sz // 2, logo_sz // 2 + 2, logo_sz * 0.22)
ldraw.polygon(g_pts, fill="#FDA4AF")

# Paste logo into QR center
qr_img.paste(logo, ((qw - logo_sz) // 2, (qh - logo_sz) // 2), logo)

# 3. Create Pure Heart-Shaped Die-Cut Badge Canvas (1100 x 1100)
W, H = 1100, 1100
canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))

cx = W // 2
cy = H // 2 - 25

# A. Outer Heart Soft Ambient Glow
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
glow_pts = get_heart_points(cx, cy, 1060)
gdraw.polygon(glow_pts, fill=(244, 63, 94, 110))
glow = glow.filter(ImageFilter.GaussianBlur(35))
canvas = Image.alpha_composite(canvas, glow)

# B. Main Heart Silhouette Layers (Crimson Velvet -> Rose Pink -> Rose Satin)
draw = ImageDraw.Draw(canvas)

# Layer 1: Crimson Red Outer Rim
pts_1 = get_heart_points(cx, cy, 1020)
draw.polygon(pts_1, fill=(190, 18, 60, 255))

# Layer 2: Radiant Rose Pink Border
pts_2 = get_heart_points(cx, cy, 1000)
draw.polygon(pts_2, fill=(244, 63, 94, 255))

# Layer 3: Soft Blush Gold Accent
pts_3 = get_heart_points(cx, cy, 980)
draw.polygon(pts_3, fill=(254, 205, 211, 255))

# Layer 4: Inner Satin Silk Bed
pts_4 = get_heart_points(cx, cy, 960)
draw.polygon(pts_4, fill=(255, 240, 245, 255))

# C. Paste QR Code right inside the heart
qx = (W - qw) // 2
qy = (H - qh) // 2 - 15
canvas.paste(qr_img, (qx, qy), qr_img)
draw = ImageDraw.Draw(canvas)

# D. Typography inside the Heart Shape
try:
    font_title = ImageFont.truetype("georgiab.ttf", 36)
    font_sub = ImageFont.truetype("arialbd.ttf", 20)
    font_quote = ImageFont.truetype("georgiai.ttf", 24)
except:
    font_title = font_sub = font_quote = ImageFont.load_default()

# Top Lobe Ribbon: "Megawati Sayang"
draw.text((cx, 160), "Megawati Soekarnoputri", fill=(159, 18, 57, 255), font=font_title, anchor="mm")
draw.text((cx, 205), "UNTUKMU YANG PALING TERSAYANG", fill=(225, 29, 72, 230), font=font_sub, anchor="mm")

# Bottom Heart Tip: Romantic Quote & Song Tag
draw.text((cx, 895), '"Hanya kamu yang bisa membuatku tersenyum..."', fill=(159, 18, 57, 255), font=font_quote, anchor="mm")
draw.text((cx, 935), "Dash Uciha — Merindukanmu", fill=(225, 29, 72, 220), font=font_sub, anchor="mm")

# Save files:
os.makedirs("public", exist_ok=True)
canvas.save("public/qr-code-love-heart.png", "PNG")
canvas.save("public/qr-code-love.png", "PNG")  # Overwrite with heart shape
canvas.save("qr-code-love-heart.png", "PNG")
canvas.save("qr-code-love.png", "PNG")

# Copy to artifact directory
artifact_dir = r"C:\Users\meong\.gemini\antigravity\brain\52a9a379-d43d-4319-8e07-5c202a8ec213"
canvas.save(os.path.join(artifact_dir, "qr-code-love-heart.png"), "PNG")
canvas.save(os.path.join(artifact_dir, "qr-code-love.png"), "PNG")

# Verify decoding with cv2
import cv2
d = cv2.QRCodeDetector()
val, pts, _ = d.detectAndDecode(cv2.imread("public/qr-code-love-heart.png"))
print("Heart QR Decoded successfully:", val)
