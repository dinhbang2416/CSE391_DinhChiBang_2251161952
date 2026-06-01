import { useState, useRef } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    const [message, setMessage] = useState("");
    const [deletedItem, setDeletedItem] = useState(null); // Lưu item vừa xóa để hoàn tác
    const timeoutRef = useRef(null); 
    const handleDelete = (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
            return;
        }

        const itemToDelete = items.find(item => item.id === id);
        if (!itemToDelete) return;

        setMessage(`✅ Đã xóa "${itemToDelete.name}"`);
        setDeletedItem(itemToDelete);

        setItems(items.filter(item => item.id !== id));

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setMessage("");
            setDeletedItem(null);
            timeoutRef.current = null;
        }, 5000);
    };

    const handleUndo = () => {
        if (deletedItem) {
            setItems([...items, deletedItem]); 
            setMessage(`↩️ Đã hoàn tác xóa "${deletedItem.name}"`);
            setDeletedItem(null);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setTimeout(() => setMessage(""), 2000);
        }
    };

    const handleDeleteAll = () => {
        if (window.confirm("Xóa tất cả sinh viên?")) {
            setItems([]);
            setMessage("🗑 Đã xóa tất cả sinh viên");
            setDeletedItem(null);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "0 auto" }}>
            <h2>📋 Quản lý sinh viên</h2>
            {message && (
                <div style={{
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "4px",
                    backgroundColor: message.includes("hoàn tác") ? "#fff3cd" : "#d4edda",
                    color: message.includes("hoàn tác") ? "#856404" : "#155724",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <span>{message}</span>
                    {deletedItem && !message.includes("hoàn tác") && (
                        <button
                            onClick={handleUndo}
                            style={{
                                marginLeft: "10px",
                                padding: "4px 8px",
                                background: "#3498db",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            ↩️ Hoàn tác
                        </button>
                    )}
                </div>
            )}

            {items.length > 0 && (
                <button
                    onClick={handleDeleteAll}
                    style={{
                        marginBottom: "10px",
                        background: "#e74c3c",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    🗑 Xóa tất cả
                </button>
            )}

            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Danh sách trống</p>
            ) : (
                items.map(item => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            margin: "5px 0",
                            background: "#f9f9f9",
                            borderRadius: "4px"
                        }}
                    >
                        <span>{item.name}</span>
                        <button
                            onClick={() => handleDelete(item.id)}
                            style={{
                                background: "#e74c3c",
                                color: "white",
                                border: "none",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeleteItem;