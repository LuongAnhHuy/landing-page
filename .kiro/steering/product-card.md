# Rule: Thêm product-card vào index.html

## Cấu trúc bắt buộc

Mỗi product-card phải có đầy đủ các thẻ sau, đúng thứ tự và đóng mở chính xác:

```html
<div class="product-card" data-category="CATEGORY">
  <div class="product-img">
    <img src="images/products/CATEGORY/tên-file-CATEGORY.jpg" alt="Tên Sản Phẩm"/>
    <div class="product-badge">Mới</div>  <!-- hoặc: hot">Hot 🔥  |  sale">Set 🎁 -->
  </div>
  <div class="product-info">
    <span class="product-category">Tên Category Hiển Thị</span>
    <h3>Tên Sản Phẩm</h3>
    <p>Mô tả ngắn...</p>
    <div class="product-footer">
      <div class="price"><span class="price-new">XX.000đ</span></div>
    </div>
  </div>
</div>
```

## Các category hợp lệ

| data-category | Tên hiển thị |
|---|---|
| `rop` | Rộp |
| `crunchy` | Crunchy |
| `slowly` | Slowly |
| `vaseline` | Vaseline |
| `taba` | Taba |

## Vị trí chèn trong index.html

Chèn vào **cuối** block đúng category, trước comment category tiếp theo:

```
<!-- ===== ROP ===== -->        → thêm trước <!-- ===== CRUNCHY ===== -->
<!-- ===== CRUNCHY ===== -->    → thêm trước <!-- ===== SLOWLY ===== -->
<!-- ===== SLOWLY ===== -->     → thêm trước <!-- ===== VASELINE ===== -->
<!-- ===== VASELINE ===== -->   → thêm trước <!-- ===== TABA ===== -->
<!-- ===== TABA ===== -->       → thêm trước </div> đóng products-grid
```

## Quy tắc đặt tên file ảnh

- Format: `tên-sản-phẩm-lowercase-có-dấu-<category>.jpg`
- Ví dụ: `gối-cute-rop.jpg`, `phô-mai-7cm-vaseline.jpg`
- Đặt vào đúng folder: `images/products/<category>/`

## Kiểm tra sau khi thêm

Sau khi thêm sản phẩm, chạy lệnh này để xác nhận không có lỗi:

```bash
python3 - << 'EOF'
import re, os
with open('index.html', encoding='utf-8') as f:
    content = f.read()
cards   = len(re.findall(r'<div class="product-card"', content))
imgs    = len(re.findall(r'class="product-img"', content))
infos   = len(re.findall(r'class="product-info"', content))
footers = len(re.findall(r'class="product-footer"', content))
prices  = len(re.findall(r'class="price-new"', content))
srcs    = re.findall(r'<img src="(images/products/[^"]+)"', content)
missing = [s for s in srcs if not os.path.exists(s)]
print(f"Cards: {cards} | imgs: {imgs} | infos: {infos} | footers: {footers} | prices: {prices}")
print("Ảnh thiếu:", missing if missing else "Không có ✅")
EOF
```

Tất cả 5 số phải bằng nhau và bằng tổng sản phẩm. Không có ảnh thiếu.

## Cập nhật PRODUCTS.md

Sau khi thêm sản phẩm mới vào HTML, **bắt buộc** cập nhật `PRODUCTS.md`:
- Thêm version mới (ví dụ `## v1.2`)
- Ghi rõ category nào tăng bao nhiêu
- Điền đủ: Tên | Giá | Badge | File ảnh
