import { useState } from "react";

function InputEventsChallenges() {
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const isValidEmail = email.includes("@");
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
            <h2>📝 Input Events - Thử thách</h2>

            <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                <h3>1️⃣ Email validation (kiểm tra @)</h3>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
                />
                {email && (
                    <p style={{ color: isValidEmail ? "green" : "red", marginTop: "5px" }}>
                        {isValidEmail ? "✅ Email hợp lệ" : "❌ Email phải chứa ký tự @"}
                    </p>
                )}
            </div>

            <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
                <h3>2️⃣ + 3️⃣ Preview + Đếm số từ</h3>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nhập đoạn văn bản để xem preview và đếm số từ..."
                    rows={4}
                    style={{ padding: "8px", width: "100%", boxSizing: "border-box", fontFamily: "Arial" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "14px" }}>
                    <span>📊 Số từ: {wordCount}</span>
                    <span>🔤 Số ký tự: {text.length}</span>
                </div>

                <div style={{ marginTop: "15px", padding: "10px", background: "#f9f9f9", borderRadius: "4px" }}>
                    <strong>👁️ Preview:</strong>
                    <p style={{ whiteSpace: "pre-wrap", margin: "5px 0 0 0" }}>
                        {text || "(chưa có nội dung)"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InputEventsChallenges;