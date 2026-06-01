import { useState, useEffect } from "react";

function KeyboardChallenges() {
    const [randomKey, setRandomKey] = useState(null);
    const [gameMessage, setGameMessage] = useState("");
    const [gameActive, setGameActive] = useState(false);

    const generateRandomKey = () => {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        return letters[Math.floor(Math.random() * letters.length)];
    };

    const startGame = () => {
        setRandomKey(generateRandomKey());
        setGameMessage("Hãy nhấn phím: " + randomKey);
        setGameActive(true);
    };

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const MOVE_STEP = 20;

    const [bgColor, setBgColor] = useState("#f0f0f0");

    const handleGlobalKeyDown = (event) => {
        const key = event.key;

        if (gameActive && key === randomKey) {
            setGameMessage("🎉 Chính xác! Bạn đã thắng! 🎉");
            setGameActive(false);
            setRandomKey(null);
        } else if (gameActive && key !== randomKey && key.length === 1 && /[a-z]/i.test(key)) {
            setGameMessage(`❌ Sai! Hãy nhấn phím: ${randomKey}`);
        }

        if (!gameActive) {
            switch (key) {
                case "ArrowUp":
                    setPosition(prev => ({ ...prev, y: prev.y - MOVE_STEP }));
                    event.preventDefault();
                    break;
                case "ArrowDown":
                    setPosition(prev => ({ ...prev, y: prev.y + MOVE_STEP }));
                    event.preventDefault();
                    break;
                case "ArrowLeft":
                    setPosition(prev => ({ ...prev, x: prev.x - MOVE_STEP }));
                    event.preventDefault();
                    break;
                case "ArrowRight":
                    setPosition(prev => ({ ...prev, x: prev.x + MOVE_STEP }));
                    event.preventDefault();
                    break;
                default:
                    break;
            }
        }

        if (event.ctrlKey && key === "d") {
            event.preventDefault();  // tránh bookmark trong trình duyệt
            const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            setBgColor(newColor);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => {
            window.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [gameActive, randomKey]); 

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: bgColor, minHeight: "100vh", transition: "background 0.2s" }}>
            <h1>🎮 Keyboard Events – Thử thách</h1>

            <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px", background: "#fff" }}>
                <h3>1️⃣ Game đoán phím (a-z)</h3>
                <button onClick={startGame} disabled={gameActive}>Bắt đầu game</button>
                {gameActive && randomKey && (
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>
                        🔤 Hãy nhấn phím: <span style={{ background: "#3498db", color: "white", padding: "8px 16px", borderRadius: "8px" }}>{randomKey.toUpperCase()}</span>
                    </p>
                )}
                <p>{gameMessage}</p>
            </div>

            <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px", background: "#fff" }}>
                <h3>2️⃣ Di chuyển ô vuông (phím mũi tên ↑↓←→)</h3>
                <div style={{ position: "relative", height: "200px", border: "1px solid #ccc", overflow: "hidden" }}>
                    <div
                        style={{
                            position: "absolute",
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#e74c3c",
                            transition: "left 0.05s linear, top 0.05s linear"
                        }}
                    />
                </div>
                <p>Vị trí: ({position.x}, {position.y})</p>
                <button onClick={() => setPosition({ x: 0, y: 0 })}>Reset vị trí</button>
            </div>

            <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "#fff" }}>
                <h3>3️⃣ Phím tắt Ctrl + D</h3>
                <p>Nhấn <kbd>Ctrl</kbd> + <kbd>D</kbd> để đổi màu nền ngẫu nhiên.</p>
                <p>Màu nền hiện tại: {bgColor}</p>
            </div>
        </div>
    );
}

export default KeyboardChallenges;