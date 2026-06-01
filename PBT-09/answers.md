# **PHẦN A - KIỂM TRA ĐỌC HIỂU**

**Câu A1:**
- Sơ đồ DOM tree:
```
document
└── html
    ├── head
    └── body
        └── div
            ├──header
            |    ├──h1
            |    └──nav
            |       └──a                    
            └──main
                ├──form
                |   ├──input
                |   └──button
                └──ul
                    └──li
```
- Viết querySelector:
```javascript
// 1. Chọn thẻ <h1>
const heading = document.querySelector("h1");
// 2. Chọn input trong form
const input = document.querySelector("#todoForm input");
// 3. Chọn tất cả .todo-item
const todoItems = document.querySelectorAll(".todo-item");
// 4. Chọn link đang active
const activeLink = document.querySelector("nav a.active");
// 5. Chọn <li> đầu tiên trong #todoList
const firstTodo = document.querySelector("#todoList li");
// Hoặc:
const firstTodo2 = document.querySelector("#todoList li:first-child");
// 6. Chọn tất cả <a> bên trong <nav>
const navLinks = document.querySelectorAll("nav a");
```

**Câu A2:**
- `innerHTML` và `textContent` đều dùng để đọc hoặc thay đổi nội dung của một phần tử DOM, nhưng chúng hoạt động khác nhau.
- textContent: Lấy hoặc gán văn bản thuần túy (plain text).
- innerHTML: Lấy hoặc gán toàn bộ HTML bên trong phần tử.
```html
<div id="demo"><b>Hello World</b></div>
```
```javascript
//textContent
const demo = document.querySelector("#demo");
console.log(demo.textContent);//In ra Hello World, text thuần túy
//innerHTML
console.log(demo.innerHTML);//In ra <b>Hello World</b>, lấy toàn bộ tag bên trong phần tử
```
- Dùng textContent khi:
    - Hiển thị tên người dùng
    - Hiển thị bình luận
    - Hiển thị dữ liệu từ API
    - Chỉ cần thay đổi văn bản
Ví dụ
```javascript
username.textContent = "Nguyễn Văn A";
```
- Dùng innerHTML khi:
    - Cần tạo cấu trúc HTML
    - Render danh sách
    - Chèn icon, button, card,...
Ví dụ
```javascript
todoList.innerHTML += `<li><span>Học JavaScript</span><button>Xóa</button></li>`;
```
- XSS (Cross-Site Scripting) xảy ra khi dữ liệu do người dùng nhập được trình duyệt hiểu như mã HTML hoặc JavaScript và thực thi nó.
- Với innerHTML, trình duyệt sẽ parse chuỗi thành HTML thật, thay vì coi nó là văn bản.
```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Sửa thế nào?
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
//Lúc này trình duyệt chỉ hiển thị: <img src=x onerror="alert('Hacked!')"> như một chuỗi văn bản, không thực thi gì cả.
```

**Câu A3:**
- Khi click vào button, output:
    - Trường hợp 1: Không có stopPropagation()
    ```
    BUTTON
    INNER
    OUTER
    ```
    - Trường hợp 1: Bỏ comment stopPropagation()
    ```
    BUTTON
    ```

# **PHẦN C - DEBUG & PHÂN TÍCH**
**Câu C1:**
```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // li.addEventListener("click", function() {
    //     deleteHistory(this);
    // });//Bỏ đoạn này
    //Sửa lại
    historyList.addEventListener("click", e => {
        if(e.target.tagName === "LI"){
        deleteHistory(e.target);
        }
    });
    historyList.append(li);
});

//document.querySelector("#decrementBtn").addEventListener("onclick", function() {//Sai ở dòng này
document.querySelector("#decrementBtn").addEventListener("click", function() {//Sửa
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    //countDisplay = count;//Sai ở dòng này
    countDisplay.textContent = count;//Sửa
    // historyList.innerHTML = null;//Sai ở dòng này
    historyList.innerHTML = "";//Sửa
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        // item.remove;Sai ở dòng này
        item.remove();//Sửa
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // count = localStorage.getItem("count");//Sai ở dòng này
    count = Number(localStorage.getItem("count")) || 0;//Sửa
    countDisplay.textContent = count;
});
```
**Câu C2:**
-  bind event lên 1000 elements riêng lẻ là BAD PRACTICE vì:
    - Tốn bộ nhớ (Memory): Mỗi listener là một function được trình duyệt quản lý.
    - Hiệu năng khởi tạo kém. Khi trang load: `buttons.forEach(...)` phải chạy 1000 lần.
    - Element tạo động không có event
- Cách Event Delegation giải quyết vấn đề:
    - Thay vì: 1000 listeners. Ta dùng 1 listener gắn lên phần tử cha. Không cần addEventListener(...) cho từng item
- Refactor bằng DocumentFragment:
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
```
- DocumentFragment là một DOM container tạm thời. Nó: Có thể chứa element; Không nằm trong DOM thật; Không hiển thị trên trang
- Giải thích tại sao nhanh hơn:
    - Cách cũ: Loop 1000 lần: appendChild(div) -> DOM update -> Layout -> Paint. Có thể xảy ra: 1000 DOM updates, 1000 reflows, 1000 repaints.
    - Cách mới: Loop 1000 lần: append vào fragment -> chỉ thao tác trong memory. Sau đó: `document.body.appendChild(fragment);`
    - Trình duyệt chỉ cần:
        - 1 DOM update
        - 1 layout calculation
        - 1 repaint



