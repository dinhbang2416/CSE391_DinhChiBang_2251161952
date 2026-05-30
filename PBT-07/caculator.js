function caculate(num1, operator, num2){
    //Ktra input có phải số không
    if(typeof num1 !== 'number' || typeof num2!== `number` || isNaN(num1) || isNaN(num2)){
        return "Lỗi: input phải là số";
    }
    //Ktra chia cho 0
    if((operator === "/" || operator === "%") && num2 === 0){
        return "Lỗi: Không thể chia cho 0";
    }
    //Xử lý phép toán
    switch(operator){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        case "**":
            return num1 ** num2;
        default:
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}
//Test
console.log(caculate(10, "+", 5));    // → 15
console.log(caculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(caculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(caculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(caculate(2, "**", 10));   // → 1024



