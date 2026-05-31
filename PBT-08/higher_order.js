// 1. pipe() — Nối chuỗi các functions
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

// Test pipe
const process = pipe(
    x => x * 2,        
    x => x + 10,       
    x => x.toString(), 
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả dựa vào tham số đầu vào
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Test memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // → In "Đang tính..." rồi ra 499999500000
console.log(expensiveCalc(1000000)); // → Chỉ ra kết quả lấy từ cache, không in "Đang tính..."


// 3. debounce() — Chờ user ngừng tác động một khoảng delay mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test debounce
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);


// 4. retry() — Thử lại hàm async n lần nếu gặp lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.warn(`Thử lại lần ${attempt} thất bại...`);
        }
    }
    throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi: ${lastError.message}`);
}

module.exports = { pipe, memoize, debounce, retry };