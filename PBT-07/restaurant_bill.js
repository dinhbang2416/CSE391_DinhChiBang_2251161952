const menu = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 2 },
    { name: "Bún chả", price: 55000, quantity: 1 },
    { name: "coca", price: 15000, quantity: 1}
];
//Có tính tip hay ko
const hasTip = true;
const today = new Date().getDay();
// ================================
// TÍNH TIỀN
// ================================
let subTotal = 0;
// In header
console.log("╔══════════════════════════════════════╗");
console.log("║         HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠══════════════════════════════════════╣");
// In danh sách món
for(let i=0;i<menu.length;i++){
    let item = menu[i];
    let itemTotal = item.price * item.quantity;
    subTotal +=itemTotal;
    console.log(
        `║ ${i + 1}. ${item.name.padEnd(12)} x${item.quantity} ` +
        `@${(item.price / 1000)}k = ${(itemTotal / 1000)}k`.padEnd(15) +
        "║"
    );
}
// ================================
// GIẢM GIÁ
// ================================
let discountPercent = 0;
// Discount theo tổng tiền
if(subTotal > 1000000){
    discountPercent = 15;
}else if(subTotal > 500000){
    discountPercent = 10;
}
if (today === 3) {
    discountPercent += 5;
}
let discount = subTotal * discountPercent / 100;
let afterDiscount = subTotal - discount;
let vat = afterDiscount * 0.08;
let tip =0;
if (hasTip) {
    tip = afterDiscount * 0.05;
}
let finalTotal = afterDiscount + vat + tip;
// ================================
// FORMAT TIỀN
// ================================
function formatMoney(number){
    return number + "đ";
}
// ================================
// IN TỔNG KẾT
// ================================
console.log("╠══════════════════════════════════════╣");
console.log(
    `║ Tổng cộng:        ${formatMoney(subTotal).padStart(18)} ║`
);
console.log(
    `║ Giảm giá (${discountPercent}%): ${formatMoney(discount).padStart(16)} ║`
);
console.log(
    `║ VAT (8%):         ${formatMoney(vat).padStart(18)} ║`
);
console.log(
    `║ Tip (5%):         ${formatMoney(tip).padStart(18)} ║`
);
console.log("╠══════════════════════════════════════╣");
console.log(
    `║ THANH TOÁN:       ${formatMoney(finalTotal).padStart(18)} ║`
);
console.log("╚══════════════════════════════════════╝");