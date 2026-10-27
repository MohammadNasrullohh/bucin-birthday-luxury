import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

url = "https://wise-borg.vercel.app"

# 1. Generate QR Code matrix with highest error correction (Level H for center logo support)
qr = qrcode.QRCode(
    version=3,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

matrix = qr.get_matrix()
matrix_size = len(matrix)
box_size = 24
border = 4
qr_pixel_size = (matrix_size + border * 2) * box_size

# Create high-res canvas
card_w = 900
card_h = 1100
img = Image.new("RGBA", (card_w, card_h), (8, 3, 6, 255))
draw = ImageDraw.Draw(img)

# Background ambient radial glow
glow_layer = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_layer)
center_x = card_w // 2
center_y = 500

for r in range(400, 0, -10):
    alpha = int(35 * (1 - r / 400))
    glow_draw.ellipse(
        [center_x - r, center_y - r, center_x + r, center_y + r],
        fill=(244, 63, 94, alpha)
    )

glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(30))
img = Image.alpha_composite(img, glow_layer)
draw = ImageDraw.Draw(img)

# Draw decorative luxury card border
card_box = [40, 40, card_w - 40, card_h - 40]
draw.rounded_rectangle(card_box, radius=40, outline=(244, 63, 94, 90), width=2)
inner_box = [52, 52, card_w - 52, card_h - 52]
draw.rounded_rectangle(inner_box, radius=32, outline=(253, 164, 175, 45), width=1)

# Header Title: "SCAN UNTUK MEMBUKA KADO"
try:
    font_large = ImageFont.truetype("arialbd.ttf", 36)
    font_sub = ImageFont.truetype("arial.ttf", 22)
    font_quote = ImageFont.truetype("georgia.ttf", 24)
    font_hint = ImageFont.truetype("arial.ttf", 18)
except:
    font_large = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_quote = ImageFont.load_default()
    font_hint = ImageFont.load_default()

# Top Heart Badge
heart_badge_w = 260
heart_badge_h = 44
badge_x0 = (card_w - heart_badge_w) // 2
badge_y0 = 80
draw.rounded_rectangle(
    [badge_x0, badge_y0, badge_x0 + heart_badge_w, badge_y0 + heart_badge_h],
    radius=22,
    fill=(28, 11, 24, 230),
    outline=(244, 63, 94, 180),
    width=1
)
draw.text((card_w // 2, badge_y0 + 22), "KADO SPESIAL ULANG TAHUN", fill=(253, 164, 175, 240), font=font_sub, anchor="mm")

# Heading: "Selamat Ulang Tahun, Mega"
draw.text((card_w // 2, 165), "Megawati Soekarnoputri", fill=(255, 241, 243, 255), font=font_large, anchor="mm")
draw.text((card_w // 2, 210), "Scan untuk memutar lagu & melihat surat cinta", fill=(253, 164, 175, 200), font=font_hint, anchor="mm")

# QR Code Container Platter
qr_display_size = 520
qr_x0 = (card_w - qr_display_size) // 2
qr_y0 = 265
draw.rounded_rectangle(
    [qr_x0 - 20, qr_y0 - 20, qr_x0 + qr_display_size + 20, qr_y0 + qr_display_size + 20],
    radius=36,
    fill=(18, 7, 15, 240),
    outline=(244, 63, 94, 120),
    width=2
)

# Render QR Modules with Romantic Rose Pink & Ruby Gradient Dots
qr_img = Image.new("RGBA", (matrix_size * box_size, matrix_size * box_size), (0, 0, 0, 0))
qr_draw = ImageDraw.Draw(qr_img)

center_matrix = matrix_size / 2.0
heart_clear_radius = 4.2 # Matrix units to leave clear in center for the Love Heart

# Helper to check if a module is inside the 3 finder patterns (corners)
def is_finder(r, c):
    if r < 7 and c < 7: return True
    if r < 7 and c >= matrix_size - 7: return True
    if r >= matrix_size - 7 and c < 7: return True
    return False

# Draw modules
for r in range(matrix_size):
    for c in range(matrix_size):
        # Center cutout for heart logo
        dist_from_center = math.sqrt((r - center_matrix) ** 2 + (c - center_matrix) ** 2)
        if dist_from_center < heart_clear_radius:
            continue
        
        if matrix[r][c]:
            x = c * box_size
            y = r * box_size
            
            # Pink gradient calculation
            t = (r + c) / (matrix_size * 2)
            # From #FDA4AF (253, 164, 175) to #F43F5E (244, 63, 94) to #BE123C (190, 18, 60)
            red = int(253 * (1 - t) + 244 * t)
            green = int(164 * (1 - t) + 63 * t)
            blue = int(175 * (1 - t) + 94 * t)
            
            if is_finder(r, c):
                # Rounded finder dots
                qr_draw.rounded_rectangle([x + 1, y + 1, x + box_size - 1, y + box_size - 1], radius=6, fill=(255, 230, 236, 255))
            else:
                # Rounded romantic bubble modules
                pad = 2
                qr_draw.rounded_rectangle([x + pad, y + pad, x + box_size - pad, y + box_size - pad], radius=8, fill=(red, green, blue, 245))

# Resize QR image to display size with high quality antialiasing
qr_img_resized = qr_img.resize((qr_display_size, qr_display_size), Image.Resampling.LANCZOS)
img.paste(qr_img_resized, (qr_x0, qr_y0), qr_img_resized)

# Center Love Heart Emblem
heart_size = 130
heart_x = card_w // 2
heart_y = qr_y0 + qr_display_size // 2

# Draw glowing heart backing circle
draw.ellipse(
    [heart_x - heart_size // 2 - 8, heart_y - heart_size // 2 - 8, heart_x + heart_size // 2 + 8, heart_y + heart_size // 2 + 8],
    fill=(18, 7, 15, 255),
    outline=(244, 63, 94, 220),
    width=3
)

# Draw Heart Shape
heart_layer = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
h_draw = ImageDraw.Draw(heart_layer)

def draw_heart_polygon(d, cx, cy, s, color):
    points = []
    for step in range(360):
        rad = math.radians(step)
        # Heart formula
        hx = 16 * (math.sin(rad) ** 3)
        hy = -(13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad))
        points.append((cx + hx * (s / 36), cy + hy * (s / 36)))
    d.polygon(points, fill=color)

# Outer heart glow
draw_heart_polygon(h_draw, heart_x, heart_y + 4, heart_size * 0.95, (244, 63, 94, 255))
# Inner bright heart
draw_heart_polygon(h_draw, heart_x, heart_y + 4, heart_size * 0.75, (253, 164, 175, 255))
# White gleam
draw_heart_polygon(h_draw, heart_x, heart_y + 4, heart_size * 0.35, (255, 241, 243, 220))

img = Image.alpha_composite(img, heart_layer)
draw = ImageDraw.Draw(img)

# Bottom Quote / Song Tag
draw.text((card_w // 2, 855), '"Hanya kamu yang bisa membuatku tersenyum..."', fill=(255, 241, 243, 240), font=font_quote, anchor="mm")
draw.text((card_w // 2, 895), "Dash Uciha — Merindukanmu", fill=(253, 164, 175, 180), font=font_hint, anchor="mm")

# Bottom URL pill
url_badge_w = 420
url_badge_h = 44
ub_x0 = (card_w - url_badge_w) // 2
ub_y0 = 945
draw.rounded_rectangle(
    [ub_x0, ub_y0, ub_x0 + url_badge_w, ub_y0 + url_badge_h],
    radius=22,
    fill=(24, 10, 20, 240),
    outline=(244, 63, 94, 90),
    width=1
)
draw.text((card_w // 2, ub_y0 + 22), "wise-borg.vercel.app", fill=(255, 241, 243, 230), font=font_hint, anchor="mm")

# Save outputs
os.makedirs("public", exist_ok=True)
img.save("public/qr-code-love.png", "PNG")
img.save("qr-code-love.png", "PNG")

# Also save standalone transparent QR without card
qr_solo = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
qr_solo_resized = qr_img.resize((500, 500), Image.Resampling.LANCZOS)
qr_solo.paste(qr_solo_resized, (50, 50), qr_solo_resized)

# Center heart for solo
h_solo_layer = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
h_solo_draw = ImageDraw.Draw(h_solo_layer)
h_solo_draw.ellipse([250 - 55, 250 - 55, 250 + 55, 250 + 55], fill=(18, 7, 15, 255), outline=(244, 63, 94, 240), width=3)
draw_heart_polygon(h_solo_draw, 250, 250 + 4, 85, (244, 63, 94, 255))
draw_heart_polygon(h_solo_draw, 250, 250 + 4, 65, (253, 164, 175, 255))
draw_heart_polygon(h_solo_draw, 250, 250 + 4, 30, (255, 255, 255, 230))
qr_solo = Image.alpha_composite(qr_solo, h_solo_layer)
qr_solo.save("public/qr-love-solo.png", "PNG")
qr_solo.save("qr-love-solo.png", "PNG")

print("Generated successfully!")
