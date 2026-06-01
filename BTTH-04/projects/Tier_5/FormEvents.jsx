import { useState } from "react";

function FormWithValidation() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    
    const [errors, setErrors] = useState({
        email: "",
        confirmPassword: ""
    });

    const validateEmail = (email) => {
        if (!email.includes("@")) {
            return "Email phải chứa ký tự '@'";
        }
        return "";
    };

    const validateConfirmPassword = (password, confirm) => {
        if (password !== confirm) {
            return "Mật khẩu xác nhận không khớp";
        }
        return "";
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === "email") {
            setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        }
        if (name === "confirmPassword" || name === "password") {
            const passwordVal = name === "password" ? value : formData.password;
            const confirmVal = name === "confirmPassword" ? value : formData.confirmPassword;
            setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(passwordVal, confirmVal) }));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const emailError = validateEmail(formData.email);
        const pwdError = validateConfirmPassword(formData.password, formData.confirmPassword);
        
        if (formData.name.trim() === "") {
            alert("Vui lòng nhập tên");
            return;
        }
        if (emailError) {
            alert(emailError);
            return;
        }
        if (pwdError) {
            alert(pwdError);
            return;
        }

        setSubmitted(true);
    }

    function handleReset() {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            message: ""
        });
        setErrors({ email: "", confirmPassword: "" });
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
            <h2>📝 Form đăng ký (có validation)</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    {/* Tên */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Họ tên: </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "6px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Email: </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "6px" }}
                        />
                        {errors.email && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Mật khẩu: </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "6px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Xác nhận mật khẩu: </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "6px" }}
                        />
                        {errors.confirmPassword && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Tin nhắn: </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            style={{ width: "100%", padding: "6px" }}
                        />
                    </div>

                    <button type="submit" style={{ marginRight: "10px" }}>Đăng ký</button>
                    <button type="button" onClick={handleReset}>Xóa form</button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "8px" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p><strong>Họ tên:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Mật khẩu:</strong> {formData.password.replace(/./g, '*')}</p>
                    <p><strong>Tin nhắn:</strong> {formData.message || "(không có)"}</p>
                    <button onClick={handleReset}>Đăng ký lại</button>
                </div>
            )}
        </div>
    );
}

export default FormWithValidation;