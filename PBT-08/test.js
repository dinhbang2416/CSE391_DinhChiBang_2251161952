const pm = require('./product_manager');
const { createCart } = require('./shopping_cart');
const ho = require('./higher_order');

console.log("==================================================");
console.log("🚀 STARTING ALL TESTS FOR PART B");
console.log("==================================================\n");

// ==========================================
// TEST BÀI B1: PRODUCT MANAGER
// ==========================================
console.log("--- TEST B1: PRODUCT MANAGER ---");

console.log("1. Sản phẩm còn hàng (getInStock):", pm.getInStock(pm.products).length, "items");

console.log("2. Lọc Laptop từ 30M đến 50M:");
console.table(pm.filterProducts(pm.products, "laptop", 30000000, 50000000), ["name", "price"]);

console.log("3. Sắp xếp giá giảm dần (3 SP đầu):");
console.table(pm.sortByPrice(pm.products, "desc").slice(0, 3), ["name", "price"]);

console.log("4. Sản phẩm rẻ nhất mỗi danh mục:");
console.log(pm.cheapestByCategory(pm.products));

console.log("5. Tổng giá trị kho hàng:", pm.totalInventoryValue(pm.products).toLocaleString() + "đ");

console.log("6. Định dạng danh sách (2 SP đầu):");
console.log(pm.formatProductList(pm.products).slice(0, 2));

console.log("7. Rating trung bình hệ thống:", pm.averageRating(pm.products));

console.log("8. Tìm kiếm từ khóa 'pad':");
console.table(pm.searchProducts(pm.products, "pad"), ["name", "category"]);


// ==========================================
// TEST BÀI B2: SHOPPING CART
// ==========================================
console.log("\n--------------------------------------------------");
console.log("--- TEST B2: SHOPPING CART ---");
const cart = createCart();

console.log("-> Thêm 2 iPhone 16 và 2 AirPods Pro...");
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng số lượng item id 1

console.log("\n[Giỏ hàng ban đầu]");
cart.printCart();

console.log("\n-> Áp mã giảm giá SALE10 (-10%)...");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("Tổng số lượng item trong giỏ (Kỳ vọng: 4):", cart.getItemCount());

console.log("\n-> Xóa sản phẩm AirPods Pro (id: 3)...");
cart.removeItem(3);
console.log("Tổng số lượng item sau khi xóa (Kỳ vọng: 2):", cart.getItemCount());
cart.printCart();


// ==========================================
// TEST BÀI B3: HIGHER-ORDER FUNCTIONS
// ==========================================
console.log("\n--------------------------------------------------");
console.log("--- TEST B3: HIGHER-ORDER FUNCTIONS ---");

// 1. Test Pipe
const mathPipe = ho.pipe(x => x * 2, x => x + 10, x => `Kết quả cuối: ${x}`);
console.log("1. Pipe Test (Đầu vào là 5):", mathPipe(5)); // (5 * 2) + 10 = 20

// 2. Test Memoize
let callCount = 0;
const heavyFunc = ho.memoize((a, b) => {
    callCount++;
    return a + b;
});
heavyFunc(2, 3);
heavyFunc(2, 3); // Gọi lại lần 2 với cùng đối số
console.log(`2. Memoize Test: Hàm thực sự chạy ${callCount} lần (Kỳ vọng: 1 lần)`);

// 3. Test Retry
console.log("3. Retry Test:");
let attempts = 0;
const unstableFunc = async () => {
    attempts++;
    if (attempts < 3) throw new Error("Kết nối timeout!");
    return "Thành công rực rỡ!";
};

ho.retry(unstableFunc, 4)
    .then(res => console.log("   👉 Kết quả Retry:", res))
    .catch(err => console.error("   👉 Kết quả Retry thất bại:", err.message));

// 4. Test Debounce (Chạy cuối cùng vì có setTimeout)
console.log("4. Debounce Test (Đợi 1s để xem kết quả)...");
const logData = ho.debounce((msg) => console.log("   👉 Debounce kích hoạt:", msg), 300);
logData("Lần gọi 1");
logData("Lần gọi 2");
logData("Lần gọi cuối"); // Chỉ có lần gọi này được thực thi sau 300ms