//Random 1 số từ 1 -> 100
const randomNumber = Math.floor(Math.random() *100)+1;
//Số lần đoán tối đa
const maxTurn = 7;
//Đếm số lần đoán
let attemps = 0;
//Lưu các số đã đoán
let guessedNumber = [];
while(attemps<maxTurn){
    let input = prompt(`Nhập số từ 1-100\nLượt còn lại: ${maxTurn - attemps}`);
    //Nếu user bấm cancel
    if(input === null){
        alert("Bạn đã thoát game!");
        break;
    }
    //Chuyển sang number
    let guess = Number(input);
    if(isNaN(guess) || guess < 1 || guess>100){
        alert("Vui lòng nhập số từ 1 - 100");
        continue;
    }
    //Check trùng
    let duplicated = false;
    for(let i =0; i<guessedNumber.length; i++){
        if(guessedNumber[i] === guess){
            duplicated = true;
            break;    
        }
    }
    if(duplicated){
        alert("Bạn đã đoán số này rồi!");
        continue;   
    }
    //Lưu số đã đoán
    guessedNumber.push(guess);
    attemps++;//Tăng biến đếm
    //So sánh
    if(guess === randomNumber){
        alert(`Bạn đã đoán đúng rồi! Xin chúc mừng.\nBạn đã đoán đúng sau ${attemps} lần`);
        break;
    }else if(guess > randomNumber){
        alert("Thấp hơn!");
    }else{
        alert("Cao hơn!");
    }
    //Hết lượt
    if(attemps === maxTurn){
        alert(`Tiếc quá, hết lượt mất rồi\nĐáp án là: ${randomNumber}`)
    }
}