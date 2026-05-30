const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

//Biến thống kê
let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let maxStudent = null;
let minStudent = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

//TB theo gioi tinh
let maleTotal =  0;
let femalTotal = 0;

let femaleCount = 0;
let maleCount = 0;
console.log("3. Bảng xếp loại");
console.log("|STT\t|Tên\t|TB\t|Xếp loại\t|");
console.log("|-------|-------|-------|---------------|");

for(let i =0;i<students.length; i++){
    let s = students[i];
    //Tinh diem TB
    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
    //Lam tron
    avg = Number(avg.toFixed(1));

    //Rank
    let rank = "";
    if(avg>=8.0){
        rank="Giỏi";
        gioi++;
    }
    else if(avg>=6.5){
        rank = "Khá";
        kha++;
    }
    else if(avg>=5.0){
        rank = "Trung bình";
        trungBinh++;
    }
    else{
        rank="Yếu";
        yeu++;
    }
    console.log(
        `|${i+1}\t| ${s.name}\t|${avg}]\t|${rank}\t|`
    );

    //Find Max
    if(maxStudent === null || avg > maxStudent.avg){
        maxStudent = {
            name: s.name,
            avg: avg
        };
    }

    //Find Min
    if(minStudent === null || avg < minStudent.avg){
        minStudent = {
            name: s.name,
            avg: avg
        };
    }

    //Cộng điểm từng môn
    totalMath +=s.math;
    totalPhysics += s.physics;
    totalCS += s.cs;

    //Theo giới tính
    if(s.gender === "M"){
        maleTotal += avg;
        maleCount++;
    }else{
        femalTotal += avg;
        femaleCount++;
    }
}
// TB từng môn

console.log("\n=== 4.Đếm số sinh viên mỗi xếp loại ===");
console.log("Giỏi: ",gioi);
console.log("Khá: ",kha);
console.log("Trung bình: ",trungBinh);
console.log("Yếu: ",yeu);

//Thống kê xếp loại
console.log("\n=== 5.1.Sinh viên có điểm trung bình cao nhất ===");
console.log(maxStudent.name, "-", maxStudent.avg);

console.log("\n=== 5.2.Sinh viên có điểm trung bình thấp nhất ===");
console.log(minStudent.name, "-", minStudent.avg);

console.log("\n=== 6.Điểm trung bình toàn lớp ===");
console.log(
    "Math:",
    (totalMath /students.length).toFixed(1)
);
console.log(
    "Physics:",
    (totalPhysics / students.length).toFixed(1)
);
console.log(
    "CS:",
    (totalCS / students.length).toFixed(1)
);

//TB theo giới tính
console.log("\n=== 7.Điểm trung bình theo giới tính ===");
console.log(
    "Nam:",
    (maleTotal/maleCount).toFixed(1)
);
console.log(
    "Nữ:",
    (femalTotal/femaleCount).toFixed(1)
);
