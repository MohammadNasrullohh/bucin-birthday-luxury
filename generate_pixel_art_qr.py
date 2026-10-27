import qrcode
from PIL import Image, ImageDraw, ImageFont
import os
import cv2

url = "https://wise-borg.vercel.app"

# 1. Generate QR Code Matrix with Error Correction Level H
qr = qrcode.QRCode(
    version=3,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=18,
    border=2,
)
qr.add_data(url)
qr.make(fit=True)

# Generate QR image with crisp pixel art modules
# Color: Deep Crimson Velvet #9F1239 on Rose Silk #FFF0F5
qr_img = qr.make_image(fill_color="#9F1239", back_color="#FFF0F5").convert("RGBA")
qw, qh = qr_img.size

# 2. Add Center 8-bit Pixel Heart Emblem
pixel_heart_map = [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
]
ph_h = len(pixel_heart_map)
ph_w = len(pixel_heart_map[0])
pix_sz = 10
ph_img_w = ph_w * pix_sz + 16
ph_img_h = ph_h * pix_sz + 16

center_badge = Image.new("RGBA", (ph_img_w, ph_img_h), "#FFF0F5")
cb_draw = ImageDraw.Draw(center_badge)

# Draw 8-bit pixel heart in center
for r in range(ph_h):
    for c in range(ph_w):
        if pixel_heart_map[r][c] == 1:
            x0 = 8 + c * pix_sz
            y0 = 8 + r * pix_sz
            cb_draw.rectangle([x0, y0, x0 + pix_sz, y0 + pix_sz], fill="#E11D48")
            # Pixel art white/pink gleam
            if (r == 2 and 2 <= c <= 4) or (r == 3 and c == 2):
                cb_draw.rectangle([x0, y0, x0 + pix_sz, y0 + pix_sz], fill="#FDA4AF")

cx = (qw - ph_img_w) // 2
cy = (qh - ph_img_h) // 2
qr_img.paste(center_badge, (cx, cy))

# 3. Create Full Pixel Art Heart Grid
GRID_COLS = 51
GRID_ROWS = 53
C_SZ = 18

W = GRID_COLS * C_SZ
H = GRID_ROWS * C_SZ
heart_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
hdraw = ImageDraw.Draw(heart_canvas)

# Mathematical Pixel Art Heart boundary
def is_in_heart(gr, gc):
    nx = (gc - (GRID_COLS - 1) / 2) / 22.0
    ny = -(gr - 24.0) / 22.0
    return ((nx**2 + ny**2 - 1)**3 - nx**2 * (ny**3)) <= 0

# Fill interior with Soft Rose Silk #FFF0F5
for gr in range(GRID_ROWS):
    for gc in range(GRID_COLS):
        if is_in_heart(gr, gc):
            x0 = gc * C_SZ
            y0 = gr * C_SZ
            hdraw.rectangle([x0, y0, x0 + C_SZ, y0 + C_SZ], fill="#FFF0F5")

# Draw 2-layer Pixel Art Border:
# Outer Pixel Layer: Crimson Velvet #881337
# Inner Pixel Layer: Hot Pink #F43F5E
for gr in range(GRID_ROWS):
    for gc in range(GRID_COLS):
        if is_in_heart(gr, gc):
            # Check layer 1 (outer border)
            is_edge_1 = False
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = gr + dr, gc + dc
                if nr < 0 or nr >= GRID_ROWS or nc < 0 or nc >= GRID_COLS or not is_in_heart(nr, nc):
                    is_edge_1 = True
                    break
            if is_edge_1:
                x0 = gc * C_SZ
                y0 = gr * C_SZ
                hdraw.rectangle([x0, y0, x0 + C_SZ, y0 + C_SZ], fill="#881337")

for gr in range(GRID_ROWS):
    for gc in range(GRID_COLS):
        if is_in_heart(gr, gc):
            # Check layer 2 (inner border)
            # Not edge 1, but touches edge 1
            is_edge_1 = any(
                (gr + dr < 0 or gr + dr >= GRID_ROWS or gc + dc < 0 or gc + dc >= GRID_COLS or not is_in_heart(gr + dr, gc + dc))
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]
            )
            if not is_edge_1:
                is_edge_2 = False
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = gr + dr, gc + dc
                    if 0 <= nr < GRID_ROWS and 0 <= nc < GRID_COLS:
                        touches_outside = any(
                            (nr + d2r < 0 or nr + d2r >= GRID_ROWS or nc + d2c < 0 or nc + d2c >= GRID_COLS or not is_in_heart(nr + d2r, nc + d2c))
                            for d2r, d2c in [(-1, 0), (1, 0), (0, -1), (0, 1)]
                        )
                        if touches_outside:
                            is_edge_2 = True
                            break
                if is_edge_2:
                    x0 = gc * C_SZ
                    y0 = gr * C_SZ
                    hdraw.rectangle([x0, y0, x0 + C_SZ, y0 + C_SZ], fill="#F43F5E")

# 4. Paste QR Code inside Pixel Heart
qx = (W - qw) // 2
qy = (H - qh) // 2 - C_SZ * 2
heart_canvas.paste(qr_img, (qx, qy), qr_img)

# 5. Pixel Art Typography: 'MEGAWATI' at top and 'SCAN ME' at bottom
try:
    f_pixel_title = ImageFont.truetype("arialbd.ttf", 26)
    f_pixel_sub = ImageFont.truetype("arialbd.ttf", 20)
except:
    f_pixel_title = f_pixel_sub = ImageFont.load_default()

# Top Lobe Text
hdraw.text((W // 2, C_SZ * 3), "MEGAWATI", fill="#881337", font=f_pixel_title, anchor="mm")

# Bottom Tip Text
hdraw.text((W // 2, H - C_SZ * 4), "SCAN ME", fill="#881337", font=f_pixel_sub, anchor="mm")

# 6. Save outputs
os.makedirs("public", exist_ok=True)
heart_canvas.save("public/qr-code-love-heart.png", "PNG")
heart_canvas.save("public/qr-code-love.png", "PNG")
heart_canvas.save("qr-code-love-heart.png", "PNG")
heart_canvas.save("qr-code-love.png", "PNG")

# Also copy to artifacts directory
artifact_dir = r"C:\Users\meong\.gemini\antigravity\brain\52a9a379-d43d-4319-8e07-5c202a8ec213"
heart_canvas.save(os.path.join(artifact_dir, "qr-code-love-heart.png"), "PNG")
heart_canvas.save(os.path.join(artifact_dir, "qr-code-love.png"), "PNG")

# 7. Verify decoding
d = cv2.QRCodeDetector()
val, pts, _ = d.detectAndDecode(cv2.imread("public/qr-code-love-heart.png"))
print("Pixel Art Heart Decoded:", val)
