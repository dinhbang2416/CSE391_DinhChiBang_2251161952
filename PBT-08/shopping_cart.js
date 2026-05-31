function createCart() {
    // Private data
    let items = [];
    let discountInfo = { code: "", percentage: 0, flatAmount: 0 };
    
    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
            }
        },
        
        // Tính tổng tiền sau khi áp giảm giá
        getTotal() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let finalTotal = subTotal;
            
            if (discountInfo.percentage > 0) {
                finalTotal -= subTotal * discountInfo.percentage;
            } else if (discountInfo.flatAmount > 0) {
                finalTotal -= discountInfo.flatAmount;
            }
            
            return finalTotal < 0 ? 0 : finalTotal;
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            discountInfo = { code, percentage: 0, flatAmount: 0 }; // Reset mã cũ
            switch (code) {
                case "SALE10":
                    discountInfo.percentage = 0.1;
                    break;
                case "SALE20":
                    discountInfo.percentage = 0.2;
                    break;
                case "FREESHIP":
                    discountInfo.flatAmount = 30000;
                    break;
                default:
                    discountInfo = { code: "", percentage: 0, flatAmount: 0 };
                    console.log("Mã giảm giá không hợp lệ!");
            }
        },
        
        // In giỏ hàng dạng bảng chuẩn đẹp bằng template string
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            
            items.forEach((item, index) => {
                const num = String(index + 1).padEnd(1, ' ');
                const name = item.name.padEnd(14, ' ');
                const qty = String(item.quantity).padStart(2, ' ');
                const price = item.price.toLocaleString("vi-VN").padStart(10, ' ');
                const total = (item.price * item.quantity).toLocaleString("vi-VN").padStart(11, ' ');
                console.log(`│ ${num} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            const formattedTotal = this.getTotal().toLocaleString("vi-VN") + "đ";
            const discountLabel = discountInfo.code ? ` (Mã: ${discountInfo.code})` : "";
            console.log(`│ Tổng cộng${discountLabel}:` + formattedTotal.padStart(36 - discountLabel.length, ' ') + " │");
            console.log("└──────────────────────────────────────────────┘");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountInfo = { code: "", percentage: 0, flatAmount: 0 };
        }
    };
}

// === TEST CODE THEO ĐỀ BÀI ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2
module.exports = { createCart };