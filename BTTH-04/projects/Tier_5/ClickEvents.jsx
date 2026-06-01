import { useState } from "react";

function ClickEventsChallenges() {
    const [divColor, setDivColor] = useState("#f0f0f0");

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleChangeColor = () => {
        setDivColor(getRandomColor());
    };

    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const [countC, setCountC] = useState(0);

    const [isLiked, setIsLiked] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
            <h2>🎯 Click Events - Thử thách</h2>

            <div style={{ marginBottom: "30px", border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
                <h3>1️⃣ Đổi màu ngẫu nhiên</h3>
                <div
                    style={{
                        width: "200px",
                        height: "150px",
                        backgroundColor: divColor,
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        transition: "background-color 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center"
                    }}
                >
                    <span>Màu nền: {divColor}</span>
                </div>
                <button onClick={handleChangeColor}>Đổi màu ngẫu nhiên 🎨</button>
            </div>

            <div style={{ marginBottom: "30px", border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
                <h3>2️⃣ Đếm click riêng biệt</h3>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <div>
                        <button onClick={() => setCountA(countA + 1)}>Nút A</button>
                        <p>Click A: {countA}</p>
                    </div>
                    <div>
                        <button onClick={() => setCountB(countB + 1)}>Nút B</button>
                        <p>Click B: {countB}</p>
                    </div>
                    <div>
                        <button onClick={() => setCountC(countC + 1)}>Nút C</button>
                        <p>Click C: {countC}</p>
                    </div>
                </div>
                <button onClick={() => { setCountA(0); setCountB(0); setCountC(0); }} style={{ marginTop: "10px" }}>
                    Reset tất cả
                </button>
            </div>

            <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
                <h3>3️⃣ Like button (❤️ / 🤍)</h3>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    style={{
                        fontSize: "24px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 20px"
                    }}
                >
                    {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
                </button>
                <p>{isLiked ? "Bạn đã thích bài viết này!" : "Hãy nhấn Thích nếu bạn thấy hay"}</p>
            </div>
        </div>
    );
}

export default ClickEventsChallenges;