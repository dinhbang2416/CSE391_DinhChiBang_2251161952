import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState(""); 
    const inputRef = useRef(null);

    function handleAdd() {
        if (newName.trim() === "") {
            setMessage("⚠️ Tên môn học không được để trống!");
            return;
        }
        const newItem = {
            id: Date.now(),
            name: newName
        };
        setItems([...items, newItem]);
        setNewName("");
        setMessage("✅ Đã thêm thành công!");
        inputRef.current.focus();
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    const handleChange = (e) => {
        setNewName(e.target.value);
        if (message) setMessage(""); 
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
            <h2>📚 Quản lý môn học</h2>
            <div style={{ marginBottom: "15px" }}>
                <input
                    ref={inputRef} 
                    value={newName}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", marginRight: "10px", width: "250px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
                    ➕ Thêm
                </button>
            </div>

            {message && (
                <div style={{
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "4px",
                    backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
                    color: message.includes("✅") ? "#155724" : "#721c24"
                }}>
                    {message}
                </div>
            )}

            <h3>Danh sách môn học ({items.length} môn):</h3>
            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Chưa có môn học nào.</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{
                        padding: "8px",
                        borderBottom: "1px solid #eee"
                    }}>
                        📘 {item.name}
                    </div>
                ))
            )}
        </div>
    );
}

export default CreateItem;