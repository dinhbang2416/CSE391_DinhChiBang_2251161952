//Version1:
for(let i=1;i<100;i++){
    if(i%3 ===0 & i%5 ===0){
        console.log("FizzBuzz")
    }else if(i%3 === 0){
        console.log("Fizz");
    }else if(i%5 === 0){
        console.log("Buzz");
    }else{
        console.log(i);
    }
}
//Version2:
function customFizzBuzz(n,rules){
    for(let i =0; i<=n; i++){
        let result = "";
        //Duyệt từng rule
        for(let j=0;j<rules.length;j++){
            if(i % rules[j].divisor === 0){
                result += rules[j].word;
            }
        }
        //Nếu ko khớp rule nào
        if(result === ""){
            console.log(i);
        }else{
            console.log(i + "=" + result);
        }
    }
}
//Ví dụ mẫu:
customFizzBuzz(30,[{divisor: 3,word: "Fizz"}, {divisor: 5,word: "Buzz"}, {divisor: 7,word: "Jazz"}]);
//Chạy version 1 thì comment version 2. Chạy version 2 thì comment version 1. Version 2 có thể thêm luật tùy thích.