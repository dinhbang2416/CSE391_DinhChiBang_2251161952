import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag"; // nếu muốn dùng thêm

function App() {
    const users = [
        { id: 1, name: "Nguyễn Văn A", email: "a.nguyen@example.com", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "Trần Thị B", email: "b.tran@example.com", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
        { id: 3, name: "Lê Văn C", email: "c.le@example.com", avatar: "https://randomuser.me/api/portraits/men/3.jpg" }
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Danh sách người dùng</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {users.map(user => (
                    <UserCard 
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        avatar={user.avatar}
                    />
                ))}
            </div>

            <h2 style={{ marginTop: "30px" }}>Sản phẩm giảm giá</h2>
            <PriceTag originalPrice={1200000} salePrice={899000} />
            <PriceTag originalPrice={500000} salePrice={500000} /> {/* không giảm */}
        </div>
    );
}

export default App;