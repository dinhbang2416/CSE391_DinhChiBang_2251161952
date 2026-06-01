import { useState } from "react";

function ListChallenges() {
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "Anh", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    const avgAge = students.length > 0 ? (totalAge / students.length).toFixed(1) : 0;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>📋 Danh sách sinh viên</h2>

            {students.map((student, index) => (
                <div
                    key={student.id}
                    style={{
                        padding: "10px",
                        margin: "5px 0",
                        background: "#f9f9f9",
                        borderRadius: "4px",
                        color: student.age >= 20 ? "green" : "black",
                        fontWeight: student.age >= 20 ? "bold" : "normal"
                    }}
                >
                    <span style={{ display: "inline-block", width: "40px" }}>{index + 1}.</span>
                    {student.name} - {student.age} tuổi
                </div>
            ))}

            <div style={{ marginTop: "20px", padding: "10px", background: "#e9ecef", borderRadius: "4px" }}>
                <strong>📊 Tuổi trung bình:</strong> {avgAge}
            </div>
        </div>
    );
}

export default ListChallenges;