//đoạn1
try {
    console.log(x);
    var x = 5;
} catch (error) {
    console.log(error.message);
}

try {
    // Đoạn 2
    console.log(y);
    let y = 10;
} catch (error) {
    console.log(error.message);
}

try {
    // Đoạn 3
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
   console.log(error.message) ;
}

try {
    // Đoạn 4
    const arr = [1, 2, 3];
    arr.push(4);
    console.log(arr);
} catch (error) {
   console.log(error.message) ;
}

try {
    // Đoạn 5
    let a = 1;
    {
        let a = 2;
        console.log("Trong block:", a);
    }
    console.log("Ngoài block:", a);
    
} catch (error) {
   console.log(error.message) ;
}

