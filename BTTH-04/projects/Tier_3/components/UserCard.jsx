function UserCard({ name, email, avatar }) {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
            margin: "10px",
            width: "250px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
            <img 
                src={avatar} 
                alt={name}
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover"
                }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{name}</h3>
            <p style={{ color: "#666", margin: "5px 0" }}>{email}</p>
        </div>
    );
}

export default UserCard;