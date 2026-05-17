# **PHẦN A - KIỂM TRA ĐỌC HIỂU**
**Câu A1:**
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. type = "text" → Ô nhập text, kiểm tra minlength, maxlength, pattern → Dùng cho form điển tên đăng nhập
3. type = "password" → Ô ẩn ký tự, kiểm tra minlength, pattern → Dùng cho form điền mật khẩu
4. type = "number" → nút tăng/giảm, kiểm tra min, max, step -> Dùng cho form điền số
5. type = "tel" → bàn phím số(mobile), kiểm tra pattern -> Dùng cho form điền số điện thoại
6. type = "date" → date picker, kiểm tra min max -> Dùng cho form chọn ngày tháng năm
7. type = "color" → color picker, không validation -> Dùng trong form chọn màu
8. type = "range" → slider, không validation-> Dùng trong form có thanh trượt lên xuống
9. type = "file" → upload file, kiểm tra accept, multiple -> Dùng trong form upload file
10. type = "url" → validate url, kiểm tra http:// -> Dùng trong form nhập url

**Câu A2:**
- Trường hợp 1: Trang web hiển thị dòng thông báo: "Vui lòng điền vào trường này". Vì có thuộc tính `required` nên bắt buộc phải nhập ít nhất 1 ký tự 
- Trường hợp 2: Trang web hiển thị dòng thông báo: "Vui lòng bao gồm @ trong địa chỉ email. 'abc' bị thiếu '@'". Vì input type là email nên bắt buộc phải nhập chữ @
- Trường hợp 3: Trang web hiển thị dòng thông báo: "Giá trị phải nhỏ hơn hoặc bằng 10". Vì có validate min = 1 và max = 10.
- Trường hợp 4: Trang web hiển thị dòng thông báo: "Vui lòng khớp với định dạng được yêu cầu". Vì pattern = [0,9]{10} nghĩa là chỉ được nhập số
- Trường hợp 5: Trang web hiển thị dòng thông báo: "Mật khẩu chứa ít nhất 8 ký tự ". Vì có validate minlength="8"

**Câu A3:**
1. Vì nếu form không có `<label>` = người dùng screen reader không biết ô nhập gì. 
2. Dùng `<fieldset>` + `<legend>` cho nhóm liên quan. Ví dụ dùng trong nhóm các lựa chọn cùng loại như chọn phương thức thanh toán, giới tính, sở thích… 
3. `aria-label` dùng để cung cấp tên (accessible name) cho phần tử khi không có text hiển thị rõ ràng hoặc text hiển thị không đủ mô tả. Dùng `aria-label` khi:
- Phần tử chỉ có icon, không có text
- Link hoặc button mơ hồ về nghĩa
- Khi không thể dùng `<label>` (về layout/UI)
Tại sao KHÔNG nên dùng aria-label khi đã có `<label>`?  
- Nó ghi đè label thật
- Dễ gây mất đồng bộ
- `<label>` đã là semantic chuẩn rồi

**Câu A4:**
1. `loading="lazy"` trên `<img>` là cách trì hoãn việc tải ảnh cho đến khi ảnh gần xuất hiện trong viewport (vùng người dùng đang nhìn thấy). Trình duyệt không tải ảnh ngay khi parse HTML. Chỉ khi người dùng scroll gần tới ảnh → mới bắt đầu tải
Nó cải thiện điều gì?
- Tăng tốc độ load ban đầu
- Giảm băng thông 
- Cải thiện chỉ số hiệu năng
Khi nào không nên dùng?
- Ảnh “above the fold” (hiển thị ngay khi mở trang)
- Ảnh logo, avatar chính, ảnh trong header
- Khi cần preload/control bằng JS
- Một số edge case SEO/crawler đã cũ
2. Nên cung cấp nhiều `<source>` trong `<video>` vì không phải trình duyệt nào cũng hỗ trợ cùng một định dạng video. Khi có nhiều nguồn, trình duyệt sẽ tự chọn format đầu tiên mà nó phát được → tăng khả năng tương thích và trải nghiệm ổn định.
Các format video web phổ biến: 
- MP4 (H.264)
- WebM  
- Ogg (Theora)
3. Thuộc tính `alt` trên `<img>` dùng để cung cấp văn bản thay thế (alternative text) cho ảnh. Nó phục vụ 3 mục đích chính:
- Accessibility: screen reader (như NVDA, VoiceOver) sẽ đọc `alt` để người khiếm thị hiểu nội dung ảnh
- Fallback khi ảnh không tải được
- SEO: giúp công cụ tìm kiếm hiểu nội dung ảnh
```html
<!-- Trường hơp 1: Ảnh sản phẩm iPhone 16 -->
<img src="iphone16.jpg" alt="iPhone 16 màu đen, mặt trước và mặt sau">
<!-- Trường hơp 2: Ảnh trang trí (decorative) -->
<img src="divider.png" alt="">
<!-- Trường hơp 3: Ảnh biểu đồ doanh thu Q1/2026 -->
<img src="chart.png" alt="Biểu đồ doanh thu quý 1 năm 2026, tăng trưởng 20% so với quý trước">
```

**Câu A5:**
Khi dùng Cách 1 (chỉ `<img>` + `alt`):
- Khi ảnh chỉ là một phần của UI
- Không cần chú thích riêng
- Nội dung đã đủ rõ trong context xung quanh
- Dùng cho: Thumbnail sản phẩm trong danh sách; Avatar người dùng

Khi dùng Cách 2 (`<figure>` + `<figcaption>`):
- Khi ảnh là nội dung quan trọng, độc lập
- Cần chú thích rõ ràng
- Có thể được tham chiếu riêng (ví dụ: “xem hình 1”)
- Dùng cho: Trang chi tiết sản phẩm; Bài blog / báo chí

# **PHẦN B - THỰC HÀNH CODE**

**Câu B1:**
HTML chỉ validate được các rule độc lập của từng input như:
- `required`
- `minlength`
- `maxlength`
- `pattern`
- `type="email"`
- `type="number"`

Nhưng `confirm password` cần so sánh 2 field với nhau. HTML không có cú pháp kiểu: `same-as="password"` nên nó không biết phải đối chiếu giá trị giữa hai input.

# **PHẦN C - THỰC HÀNH CODE**

**Câu C1:**
- Lỗi 1: Dòng 2 — Input "Tên" không có `<label for="...">`, vi phạm accessibility. Sửa: 
```html
<label for="name">Tên:</label> <input type="text" id="name" name="name" required>
```
- Lỗi 2: Dòng 4 - Email không có `<label foi="..."`, vi phạm accessibility. Sửa
```html
<label for="email">Email:</label>
```
- Lỗi 3: Dòng 6 - Password không có `<label for="...">`, vi phạm accessibility. Sửa:
```html
 <label for="password">Mật khẩu:</label>
```
- Lỗi 4: Dòng 7 - Password nhập lại không có `<label for="...">`, vi phạm accessibility. Sửa:
```html
 <label for="confirm-password">Mật khẩu:</label>
```
- Lỗi 5: Dòng 6,7 - Hai ô password không phân biệt bằng id/name. Sửa:
```html
 <input 
    type="password"
    id="password"
    name="password"
    placeholder="Mật khẩu"
    minlength="6"
    required
    >
<input 
    type="password"
    id="confirm-password"
    name="confirm-password"
    placeholder="Nhập lại mật khẩu"
    minlength="6"
    required
>
```
- Lỗi 6: Dòng 9: Phone dùng type="text" thay vì type="tel". Sửa:
```html
<input 
        type="tel"
        id="phone"
        name="phone"
        value="0901234567"
        pattern="[0-9]{10}"
        required
    >
```
- Lỗi 7: Dòng 16-18 Checkbox điều khoản bị thiếu `<input type="checkbox">`. Sửa:
```html
<label>
    <input type="checkbox" name="terms" required>
        Tôi đồng ý điều khoản
</label>
```
- Lỗi : Dòng 11-14: select không có label. Sửa:
```html
<option value="">-- Chọn thành phố --</option>
<option value="hn">Hà Nội</option>
<option value="hcm">TP.HCM</option>
```

**Câu C2:**
1. Viết pattern
- Pattern cho CMND/CCCD: đúng 12 chữ số: `pattern="^\d{12}$"`
- Số tài khoản: 10-15 chữ số: `pattern="^\d{10,15}$"`
- Email: bắt buộc, đúng format `<input type="email" id="email" name="email" required>`
- PIN: đúng 6 chữ số, không hiển thị `pattern="^\d{6}$"`
2. HTML5 validation không đủ an toàn cho ứng dụng ngân hàng vì: 
HTML5 validation chỉ là client-side validation (kiểm tra phía trình duyệt). Người dùng hoặc hacker có thể:
- Tắt validation
- Sửa HTML bằng DevTools
- Gửi request trực tiếp bằng Postman/cURL
- Bypass JavaScript hoàn toàn
3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript):
- Kiểm tra dữ liệu đã tồn tại chưa
- So sánh giữa nhiều field
- Validation logic nghiệp vụ phức tạp
4. Hai rủi ro bảo mật nếu chỉ validate Frontend:
- Bypass dữ liệu độc hại. VD: SQL Injection; XSS payload; Dữ liệu giả mạo
- Gửi dữ liệu sai định dạng gây lỗi hệ thống. Ví dụ: PIN chứa ký tự lạ; Account number cực dài; Email giả

