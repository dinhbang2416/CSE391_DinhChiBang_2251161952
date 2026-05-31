# **PHẦN A - KIỂM TRA ĐỌC HIỂU**

**Câu A1:**
1. Cách 1: Function Declaration
```javascript
// 1. Function Declaration
function tinhThueBaoHiem(luong){
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return {
        thue,
        thuc_nhan
    };
}
console.log(tinhThueBaoHiem(15000000));
```
2. Cách 2: Function Expression
```javascript
// 2. Function Expression
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return {
        thue,
        thuc_nhan
    };
};
console.log(tinhThueBaoHiem(10000000));
```
3. Cách 3: Arrow Function
```javascript
// 3. Arrow Function
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return {
        thue,
        thuc_nhan
    };
};
console.log(tinhThueBaoHiem(20000000));
```
- 3 cách này hoàn toàn khác nhau về hoisting. Function Declaration được hoisting toàn bộ hàm lên đầu scope. Trong khi đó Function Expression và Arrow Function chỉ hoisting biến. 
- Function Declaration gọi hàm được trước khi khai báo còn Function Expression và Arrow Function thì không 

**Câu A2:**
```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: ???
//var:3
//var:3
//var:3
//let:0
//let:1
//let:2
```
- Giải thích:
    - `var` không tạo block scope
        - Vòng lặp chạy rất nhanh. Biến i tăng dần từ 0 đến 3 sau đó kết thúc. 
        - Sau 100ms thì xuất thông báo in ra biến i = 3 3 lần
    - `let` tạo block scope. Mỗi lần lặp, JavaScript tạo ra một biến j mới.
```javascript
{let j = 0;setTimeout(() => console.log(j), 200);}
{let j = 1;setTimeout(() => console.log(j), 200);}
{let j = 2;setTimeout(() => console.log(j), 200);}
```

**Câu A3:**
```javascript
// 1. Lấy các số chẵn
const soChan = nums.filter(n => n % 2 === 0);
// 2. Nhân mỗi số với 3
const nhan3 = nums.map(n => n * 3);
// 3. Tính tổng tất cả
const tong = nums.reduce((sum, n) => sum + n, 0);
// 4. Tìm số đầu tiên > 7
const lonHon7 = nums.find(n => n > 7);
// 5. Kiểm tra CÓ số > 10 không
bool coSoLonHon10 = nums.some(n => n > 10);
// 6. Kiểm tra TẤT CẢ đều > 0
bool tatCaLonHon0 = nums.every(n => n > 0);
// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const chanLe = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// 8. Đảo ngược mảng (không mutate gốc)
const daoNguoc = [...nums].reverse();
```

**Câu A4:**
```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};
// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // ReferenceError: specs is not defined
// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000
// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16. Vì spread chỉ copy nông (shallow copy)
```
# **PHẦN C - SUY LUẬN**
**Câu C1:**
```javascript
const processOrders = (orders) =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return {
                id,
                customer,
                total,
                discount,
                finalTotal: total - discount
            };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

**Câu C2:**
```javascript
const miniArray = {
    map(arr,fn){
        // Implement: giống Array.prototype.map
        const result = [];
        for(let i =0; i<arr.length;i++){
            result.push(fn(arr[i],i,arr));
        }
        return result;
    },
    filter(arr,fn){
        // Implement: giống Array.prototype.filter
        const result = [];
        for(let i =0; i<arr.length;i++){
            if(fn(arr[i],i,arr)){
                result.push(arr[i]);
            }
        }
        return result;
    },
    reduce(arr,fn,initialValue){
        // Implement: giống Array.prototype.reduce
        let accumulator = initialValue;
        let startIndex = 0;
        //Nếu ko truyền initialValue
        if(accumulator == undefined){
            accumulator = arr[0];
            startIndex = 1;
        }
        for(let i = startIndex;i<arr.length;i++){
            accumulator = fn(accumulator,arr[i],i,arr);
        }
        return accumulator;
    }
};

// Test phải pass:
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
```


