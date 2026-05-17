# **PHẦN A - KIỂM TRA ĐỌC HIỂU**
**Câu A1:**
1. Khi gõ https://shopee.vn và nhấn Enter, các bước xảy ra như sau:
- B1: Request đi qua laptop, tới router wifi
- B2: Qua nhà mạng Viettel tới máy chủ của shoppee
- B3: Sever của shoppee xử lý: Tôi muốn xem trang giao diện của website shoppe.vn
- B4: Response chạy ngược lại cáp quang, tới máy tính laptop
- B5: Chrome nhận file HTML,CSS,JS -> render thành giao diện
2. Trong DevTools của Chrome, tab Network cho thấy thông tin gì?
- Trong Google Chrome DevTools, tab Network cho ta thấy toàn bộ hoạt động mạng (network activity) giữa trình duyệt và server khi tải trang hoặc thực hiện request.
3.
![Ảnh](screenshots/1.png)
![Ảnh](screenshots/2.png)

**Câu A2:** 

Các lỗi semantic: 
- Dùng thẻ `<div>` thay vì thẻ semantic
- Dùng toàn thẻ `<div>`  cho: `<header>` `<menu>`  `<main>`  `<content>` `<footer>` => Bot không biết đâu là phần chính, đâu là điều hướng
- Không có thẻ `<header>` , `<nav>` , `<main>` , `<footer>`. Đây là các thẻ cực kỳ quan trọng cho SEO giúp Google hiểu cấu trúc trang
- Không dùng heading (`<h1>`, `<h2>`) `<div class="title">iPhone 16 Pro</div>` => Sai → nên là `<h1> hoặc <h2>`. Thiếu heading = mất tín hiệu nội dung chính
- Ảnh không có alt `<img src="iphone.jpg">` => Thiếu mô tả cho SEO hỗ trợ accessibility
- Menu không dùng danh sách (`<ul>` `<li>`), Navigation nên có cấu trúc rõ ràng. Hiện tại chỉ là `<div>` lồng nhau

**Câu A3:**
____________________
Hộp 1               
Text A Text B
Hộp 2
Text C **Text D**
Hộp 3
___________________
Giải thích: 
- Thẻ `<div>` bao trọn 1 dòng nên các text hộp 1, hộp 2, hộp 3 sẽ nằm riêng 1 dòng trên trang web
- Text A, Text B, Text C  nằm trong thẻ `<span>` không nằm cùng dòng với thẻ `<div>`  và không có gì thay đổi 
- Thẻ `<strong>` in đậm từ Text D

**Câu A4:**
1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`:
- `<thead>`: Là phần đầu bảng chứa tiêu đề cột. Thường dùng `<th>`
=> Ý nghĩa:
    - Giúp trình duyệt và công cụ tìm kiếm hiểu cấu trúc bảng
    - Một số trình duyệt sẽ giữ header khi scroll
- `<tbody>`: Là phần thân bảng chứa dữ liệu chính => Đây là phần lớn nhất của bảng
- `<tfoot>`: Là phần cuối bảng. Chứa tổng kết / ghi chú
=> Thường dùng cho:
    - tổng tiền
    - thống kê
2. Tại sao không nên dùng table để tạo layout trang web?
- Sai mục đích sử dụng (semantic sai)
- `<table>` sinh ra để hiển thị dữ liệu dạng hàng/cột
- Dùng nó để chia layout (header, sidebar, content…) là lạm dụng HTML
=> Hậu quả:
    - Code khó hiểu
    - Không đúng chuẩn semantic HTML
- Khó bảo trì và chỉnh sửa
- Layout bằng table thường lồng nhiều bảng (nested tables)
=>Khi muốn thay đổi giao diện:
    - rất dễ vỡ layout
    - khó sửa một phần nhỏ
- So với CSS layout hiện đại thì cực kỳ bất tiện
- Không responsive tốt (kém trên mobile)
- Table cố định cấu trúc hàng/cột
- Khó co giãn theo màn hình nhỏ
=> Kết quả:
    - Trang web bị vỡ trên điện thoại
    - Scroll ngang khó chịu
- Hiệu năng và render chậm hơn
- Browser phải xử lý toàn bộ bảng trước khi hiển thị
- Layout phức tạp → render chậm hơn so với CSS layout

# **PHẦN B - THỰC HÀNH CODE**
**Câu B3:**
Các lỗi trong file debug.html:
- Lỗi 1: Dòng 1 `<!DOCTYPE>` sai → phải là `<!DOCTYPE html>`
- Lỗi 2: Dòng 4 `<title>` chưa đóng thẻ
- Lỗi 3: Dòng 5 `<meta charset="utf8">` sai chuẩn → phải là utf-8
- Lỗi 4: Dòng 8 `<h1>` chưa đóng đúng (`<\h1>` thay vì `<h1>`)
- Lỗi 5: Dòng 12 thẻ `<a>` đầu tiên chưa đóng
- Lỗi 6: Dòng 12,13 `href="home"` và `href="products"` không phải URL hợp lệ (nên dùng .html hoặc /)
- Lỗi 7: Dòng 20`<img>` thiếu alt và nên có dấu " cho src
- Lỗi 8: Dòng 22 lồng thẻ sai: `<b>` nằm ngoài `<p>` (sai cấu trúc)
- Lỗi 9: Dùng 2 thẻ `<main>` (sai semantic, chỉ nên có 1)
- Lỗi 10: Dòng 46 phần`<footer>` chưa đóng thẻ `<p>`
- Lỗi 11: Thiếu `</html>` (kết thúc tài liệu)
- Lỗi 12: Thiếu `<thead>` hoặc `<th>` cho bảng (semantic chưa chuẩn)
- Lỗi 13 :Thiếu `lang="vi"` trong `<html>` (không bắt buộc nhưng nên có)

**Câu B4:**
1. 3 thẻ senmatic HTML5 mà trang đó sử dụng là
![Ảnh](screenshots/4.png)
- Thẻ `<header>` và thẻ `<section>`
![Ảnh](screenshots/3.png)
- Thẻ `<footer>`
Thẻ mà trang đó không sử dụng senmatic là thẻ `<div>`
2. 
![Ảnh](screenshots/5.png)
- Table thể hiện nội dung là thông số kỹ thuật của máy tính bảng
- Có dùng `<tbody>` nhưng không dùng `<thead>`
3. 
![Ảnh](screenshots/6.png)
- Form đó có action là: /tim-kiem 
- input type là text

# **PHẦN C - SUY LUẬN**
**Câu C1:**
```html
<html lang="vi"> <!-- Xác định ngôn ngữ giúp SEO và accessibility -->
<head>
    <meta charset="UTF-8"> <!-- Bộ mã ký tự chuẩn -->
    <title>Chi tiết sản phẩm</title> <!-- Tiêu đề trang -->
</head>
<body>

    <!-- HEADER: chứa logo + điều hướng chính -->
    <header>
        <!-- NAV: nhóm các liên kết điều hướng -->
        <nav>
            <!-- danh sách link nên dùng ul/li để có cấu trúc rõ ràng -->
            <ul>
                <li><a href="#">Trang chủ</a></li> <!-- link điều hướng -->
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>

    <!-- MAIN: nội dung chính của trang (chỉ nên có 1 main) -->
    <main>

        <!-- BREADCRUMB: dùng nav vì đây cũng là điều hướng -->
        <nav aria-label="breadcrumb">
            <!-- ol thể hiện thứ tự phân cấp -->
            <ol>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Điện thoại</a></li>
                <li>iPhone 16</li> <!-- item cuối không cần link -->
            </ol>
        </nav>

        <!-- SECTION: nhóm nội dung chính của sản phẩm -->
        <section>
            
            <!-- ARTICLE: đại diện cho 1 sản phẩm độc lập -->
            <article>

                <!-- Khu vực ảnh -->
                <div>
                    <!-- div dùng để layout nhóm ảnh -->
                    <img src="#" alt="Ảnh sản phẩm 1"> <!-- img hiển thị ảnh -->
                    <img src="#" alt="Ảnh sản phẩm 2">
                    <img src="#" alt="Ảnh sản phẩm 3">
                    <img src="#" alt="Ảnh sản phẩm 4">
                    <img src="#" alt="Ảnh sản phẩm 5">
                </div>

                <!-- Thông tin sản phẩm -->
                <div>
                    <h1>Tên sản phẩm</h1> <!-- h1: tiêu đề chính quan trọng nhất -->

                    <p>Giá sản phẩm</p> <!-- p: văn bản mô tả thông tin -->

                    <!-- Đánh giá sao -->
                    <div>
                        <!-- span dùng cho nội dung inline (sao, số rating) -->
                        <span>★★★★★</span>
                        <span>(100 đánh giá)</span>
                    </div>

                    <!-- Mô tả -->
                    <p>Mô tả sản phẩm...</p>
                </div>

            </article>
        </section>

        <!-- SECTION: thông số kỹ thuật -->
        <section>
            <h2>Thông số kỹ thuật</h2> <!-- tiêu đề phụ -->

            <!-- TABLE: dữ liệu dạng bảng -->
            <table>
                <thead>
                    <!-- thead: phần tiêu đề bảng -->
                    <tr>
                        <th>Thuộc tính</th> <!-- th: ô tiêu đề -->
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- tbody: dữ liệu chính -->
                    <tr>
                        <td>Ví dụ</td> <!-- td: ô dữ liệu -->
                        <td>Thông tin</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- SECTION: đánh giá -->
        <section>
            <h2>Đánh giá</h2>

            <!-- mỗi đánh giá có thể là 1 article -->
            <article>
                <p>Tên người dùng</p>
                <p>Nội dung bình luận</p>
            </article>

            <article>
                <p>Tên người dùng</p>
                <p>Nội dung bình luận</p>
            </article>
        </section>

        <!-- ASIDE: nội dung phụ (sidebar) -->
        <aside>
            <h2>Sản phẩm tương tự</h2>

            <!-- danh sách sản phẩm liên quan -->
            <ul>
                <li><a href="#">Sản phẩm 1</a></li>
                <li><a href="#">Sản phẩm 2</a></li>
                <li><a href="#">Sản phẩm 3</a></li>
            </ul>
        </aside>

    </main>

    <!-- FOOTER: thông tin cuối trang -->
    <footer>
        <p>Thông tin bản quyền</p>
    </footer>

</body>
</html>
```
**Câu C2:**
Quan điểm “dùng `<div>` cho mọi thứ rồi thêm class là đủ” nghe có vẻ nhanh gọn, nhưng về kỹ thuật thì thiếu bền vững. Trước hết, SEO: công cụ tìm kiếm như Google không chỉ đọc nội dung mà còn dựa vào cấu trúc semantic để hiểu trang. Các thẻ như `<header>`, `<nav>`, `<article>`, `<section>`, `<footer>` giúp xác định phần nào là điều hướng, phần nào là nội dung chính, từ đó cải thiện khả năng lập chỉ mục và xếp hạng.

Thứ hai là accessibility: các trình đọc màn hình như NVDA hay JAWS sử dụng semantic HTML để giúp người khiếm thị “điều hướng” trang nhanh hơn. Nếu mọi thứ đều là `<div>`, người dùng phải nghe toàn bộ nội dung thay vì nhảy trực tiếp đến menu, nội dung chính hay phần bình luận — trải nghiệm rất kém.

Ví dụ cụ thể: một trang chi tiết sản phẩm. Nếu dùng `<nav>` cho breadcrumb và menu, người dùng có thể nhấn phím tắt để chuyển ngay đến vùng điều hướng. Nếu dùng `<main>` cho nội dung chính, screen reader có thể bỏ qua phần header lặp lại trên mọi trang. Những lợi ích này gần như không thể đạt được chỉ với `<div>` và class.

Tuy nhiên, `<div>` không phải vô dụng. Nó vẫn phù hợp khi bạn cần wrapper thuần túy cho layout hoặc styling, ví dụ nhóm các phần tử để áp dụng CSS Grid/Flexbox mà không mang ý nghĩa nội dung cụ thể.

Tóm lại, semantic HTML không phải “tốn thời gian”, mà là đầu tư đúng chỗ để code dễ hiểu, thân thiện hơn với máy tìm kiếm và người dùng.