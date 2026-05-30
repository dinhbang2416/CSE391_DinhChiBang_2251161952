## 🅱️  TRACK A — BOOTSTRAP 5

# **PHẦN A - KIỂM TRA ĐỌC HIỂU**

**Câu A1:**
1. Mobile
```
+-------------------+
|       Box 1       |
+-------------------+

+-------------------+
|       Box 2       |
+-------------------+

+-------------------+
|       Box 3       |
+-------------------+

+-------------------+
|       Box 4       |
+-------------------+
```
2. Tablet
```
+-----------+-----------+
|   Box 1   |   Box 2   |
+-----------+-----------+

+-----------+-----------+
|   Box 3   |   Box 4   |
+-----------+-----------+
```
3. Desktop
```
+------+------+------+------+
| Box1| Box2| Box3| Box4|
+------+------+------+------+
```
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1  | 2 | 4 |
| Box layout | 1 cột x 4 hàng | 2 cột x 2 hàng | 4 cột x 1 hàng |
- `col-md-6` trong Bootstrap nghĩa là:
    - col: Cột trong grid system
    - md: Áp dụng từ kích thước medium trở lên
    - 6: Chiếm 6/12 cột (tức 50% chiều ngang)
    - => Từ 768px trở lên → box rộng 50%; Nhỏ hơn 768px → Bootstrap tự động cho box xuống full width (100%)
- Không cần viết `col-sm-12` bởi vì Bootstrap dùng kiểu Mobile First. Nếu bạn không ghi class cho màn hình nhỏ hơn (sm), Bootstrap mặc định: `width: 100%`

**Câu A2:**
1. `d-none d-md-block` là utility class của Bootstrap dùng để ẩn/hiện element theo kích thước màn hình.
- `d-none`: `display: none;`//Ẩn element
- `d-md-block`: `@media (min-width: 768px) {display: block;}`//Từ màn hình medium trở lên (>=768px) thì hiện element dưới dạng block.
- Tức là kích cỡ màn hình mobile không hiển thị. Từ kích cỡ mà hình tablet trở lên thì sẽ hiển thị

2. Liệt kê 5 spacing utilities (margin/padding)
- `mt-3`
    - m: margin
    - t: top
    - 3: mức spacing số 3
    - ➡ Thêm margin phía trên.
- `px-4`
    - p: padding
    - x: left + right
    - 4: mức spacing số 4
    - ➡ Thêm padding trái và phải.
- `mb-auto`
    - m: margin
    - b: bottom
    - auto: margin tự động
    - ➡ Margin-bottom tự co giãn.
- `py-2`
    - p: padding
    - y: top + bottom
    - 2: spacing level 2
    - ➡ Thêm padding trên và dưới.
- `mx-auto`
    - m: margin
    - x: left + right
    - auto: tự động
    - ➡ Căn giữa ngang element.

3. Ba class này đều dùng để tạo vùng chứa layout trong Bootstrap, nhưng khác nhau ở cách xử lý chiều rộng responsive.
- `.container`
    - Có max-width theo từng breakpoint
    - Nội dung không kéo full màn hình
    - Tự căn giữa
    - ➡ Có khoảng trống hai bên.
    - Dùng cho: Website thông thường; Blog; Dashboard
- `.container-fluid`
    - Luôn rộng 100%
    - Full chiều ngang màn hình ở mọi kích thước
    - Dùng cho: Banner; Hero section; Full-width layout; Admin panel full screen
- `.container-md`
    - Nhỏ hơn md → full width
    - Từ md trở lên → giống .container

# **PHẦN C - PHÂN TÍCH**
**Câu C1:**
1. Quy trình và các công cụ cần có:
- Công cụ cần có: 
    - Node.js
    - npm/yarn
    - Sass compiler (sass)
    - Bootstrap source SCSS
- B1: Cài đặt: 
```bash
npm install bootstrap sass
```
- B2: Tạo file:
```
src/styles/custom.scss
```
- B3: Nội dung file custom.scss
```scss
// Override biến trước khi import bootstrap
$primary: #E63946;
@import "../../node_modules/bootstrap/scss/bootstrap";
```
- Bootstrap sẽ rebuild toàn bộ component (btn-primary, alert-primary, bg-primary, …) theo màu mới.
- B4: Build SCSS
```bash
npx sass src/styles/custom.scss public/css/app.css
```
2. KHÔNG nên override trực tiếp `.btn-primary { background: red; }` vì:
- Chỉ đổi background của button
- Hover / active / focus sẽ bị lệch màu
- Dẫn đến sự mâu thuẫn CSS specificity
- Khó maintain khi scale project
- Framework thường derive color system từ $primary

**Câu C2:**
1. Số dòng cần viết:

| Tiêu chí | CSS thuần | Bootstrap 
|---|---|---|
|Navbar responsive | ~80–150 dòng | ~0–20 dòng custom |
| Product card | ~50–120 dòng | ~10–30 dòng custom |
| Responsive breakpoints| Tự viết media query | Có sẵn |
| Utilities (spacing/flex/display)| Tự define | Có sẵn |

2. Thời gian phát triển

| Tiêu chí | CSS thuần | Bootstrap 
|---|---|---|
|Prototype nhanh|Chậm hơn|Rất nhanh|
| MVP/admin/dashboard |Mất nhiều thời gian  |  Nhanh|
| Pixel-perfect custom UI|Có thể lâu nhưng chính xác  | Phải override nhiều |
| Responsive|  Tự xử lý|  Gần như free|

3. Khả năng tùy biến

| Tiêu chí | CSS thuần | Bootstrap 
|---|---|---|
|Full control|Rất cao|Trung bình|
|  Design độc đáo| Dễ hơn |Khó hơn  |
|Ghi đè style | Không cần | Thường xuyên |
| CSS output tối ưu| Tốt | Có thể dư nhiều CSS |
| Consistency|Tự maintain  | Có sẵn |

4. Khi NÊN dùng Bootstrap:
- MVP / startup prototype. Cần ra sản phẩm nhanh, ít frontend engineer
- Admin dashboard / CRUD system
- Deadline gấp: Bootstrap tiết kiệm cực nhiều thời gian.
- Khi Không cần branding quá mạnh, animation phức tạp, design system riêng

Không nên dùng khi:
- Product cần UI độc đáo
- Design system riêng lớn
- Performance cực quan trọng
- App frontend hiện đại dùng component architecture. Ví dụ React + Tailwind; Vue + UnoCSS






