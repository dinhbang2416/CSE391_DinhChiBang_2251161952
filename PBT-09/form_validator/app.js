const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector("#submitBtn");
const nameStatus = document.querySelector("#nameStatus");
const emailError = document.querySelector("#emailError");
const confirmError = document.querySelector("#confirmError");
const phoneError = document.querySelector("#phoneError");
const strengthFill = document.querySelector("#strengthFill");
const strengthText = document.querySelector("#strengthText");
const modal = document.querySelector("#modal");
const userInfo = document.querySelector("#userInfo");

let validName = false;
let validEmail = false;
let validPassword = false;
let validConfirm = false;
let validPhone = false;

function updateSubmitButton() {
    submitBtn.disabled = !(
        validName &&
        validEmail &&
        validPassword &&
        validConfirm &&
        validPhone
    );
}

nameInput.addEventListener("input", () => {
    const length = nameInput.value.trim().length;
    validName = length >= 2 && length <= 50;
    nameStatus.textContent =
        validName ? "✅" : "❌";
    updateSubmitButton();
});

emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validEmail = regex.test(email);
    emailError.textContent =validEmail? "": "Email không đúng định dạng";
    updateSubmitButton();
});

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    let strength = 0;
    if(password.length >= 8)
        strength++;
    if(/[a-zA-Z]/.test(password)
       && /\d/.test(password))
        strength++;
    if(
        /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && /\d/.test(password)
        && /[^A-Za-z0-9]/.test(password)
    ){
        strength = 3;
    }
    if(strength === 1){
        strengthFill.style.width = "33%";
        strengthFill.style.background = "red";
        strengthText.textContent = "Yếu";
        validPassword = false;
    }
    else if(strength === 2){
        strengthFill.style.width = "66%";
        strengthFill.style.background = "orange";
        strengthText.textContent = "Trung bình";
        validPassword = true;
    }
    else if(strength === 3){
        strengthFill.style.width = "100%";
        strengthFill.style.background = "green";
        strengthText.textContent = "Mạnh";
        validPassword = true;
    }
    else{
        strengthFill.style.width = "0";
        strengthText.textContent = "";
        validPassword = false;
    }
    validateConfirm();
    updateSubmitButton();
});

function validateConfirm(){
    validConfirm =
        passwordInput.value ===
        confirmInput.value &&
        confirmInput.value.length > 0;
    confirmError.textContent =validConfirm? "": "Mật khẩu không khớp";
}

confirmInput.addEventListener("input", () => {
    validateConfirm();
    updateSubmitButton();
});

phoneInput.addEventListener("input", () => {
    let digits =phoneInput.value.replace(/\D/g, "");
    digits = digits.substring(0, 10);
    let formatted = digits;
    if(digits.length > 4){
        formatted =
            digits.slice(0,4) +
            "-" +
            digits.slice(4);
    }
    if(digits.length > 7){
        formatted =
            digits.slice(0,4) +
            "-" +
            digits.slice(4,7) +
            "-" +
            digits.slice(7);
    }
    phoneInput.value = formatted;
    validPhone =digits.length === 10;
    phoneError.textContent =validPhone? "": "Số điện thoại phải có 10 số";
    updateSubmitButton();
});
form.addEventListener("submit", e => {
    e.preventDefault();
    userInfo.innerHTML = `
        <p><strong>Tên:</strong> ${nameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>Phone:</strong> ${phoneInput.value}</p>
    `;
    modal.style.display = "flex";
});
document
    .querySelector("#closeModal")
    .addEventListener("click", () => {
        modal.style.display = "none";
    });