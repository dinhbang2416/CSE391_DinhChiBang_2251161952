// Toàn cục lưu data tạm thời ở Client-side (In-Memory)
let currentUsers = [];

// API Layer
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Không thể lấy danh sách");
        return res.json();
    },
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!res.ok) throw new Error("Không thể thêm user");
        return res.json();
    },
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!res.ok) throw new Error("Không thể cập nhật");
        return res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Không thể xóa");
        return true;
    }
};

// UI Layer
const ui = {
    renderUsers(users) {
        const tbody = document.getElementById('users-body');
        tbody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id})">Sửa</button>
                    <button onclick="deleteUser(${user.id})">Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },
    showLoading() {
        document.getElementById('loading-placeholder').style.display = 'block';
        document.getElementById('users-table').style.display = 'none';
    },
    hideLoading() {
        document.getElementById('loading-placeholder').style.display = 'none';
        document.getElementById('users-table').style.display = 'table';
    },
    setStatus(msg, isSuccess = true) {
        const box = document.getElementById('status-message');
        box.innerText = msg;
        box.style.color = isSuccess ? 'green' : 'red';
        setTimeout(() => box.innerText = '', 3000);
    }
};

// Logic điều khiển App
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('user-id').value;
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    
    try {
        if (id) { // UPDATE
            await api.updateUser(id, { name, email });
            currentUsers = currentUsers.map(u => u.id == id ? { ...u, name, email } : u);
            ui.setStatus("Cập nhật thành công!");
        } else { // CREATE
            const newUser = await api.createUser({ name, email });
            // Tạo ID giả cho client vì API JSONPlaceholder luôn trả về ID 11
            newUser.id = currentUsers.length ? Math.max(...currentUsers.map(u => u.id)) + 1 : 1;
            currentUsers.push(newUser);
            ui.setStatus("Thêm user mới thành công!");
        }
        resetForm();
        ui.renderUsers(currentUsers);
    } catch (err) {
        ui.setStatus(err.message, false);
    }
});

// Chức năng Xóa công khai ra Window để onclick nhận được
window.deleteUser = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;
    try {
        await api.deleteUser(id);
        currentUsers = currentUsers.filter(u => u.id !== id);
        ui.renderUsers(currentUsers);
        ui.setStatus("Xóa thành công!");
    } catch (err) {
        ui.setStatus(err.message, false);
    }
};

// Chức năng Sửa điền dữ liệu lên form
window.editUser = (id) => {
    const user = currentUsers.find(u => u.id === id);
    if (!user) return;
    document.getElementById('user-id').value = user.id;
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('form-title').innerText = "Cập nhật thành viên";
    document.getElementById('cancel-btn').style.display = 'inline';
};

document.getElementById('cancel-btn').addEventListener('click', resetForm);

function resetForm() {
    document.getElementById('user-id').value = '';
    document.getElementById('user-form').reset();
    document.getElementById('form-title').innerText = "Thêm thành viên";
    document.getElementById('cancel-btn').style.display = 'none';
}

// Search Fillter (Client-side)
document.getElementById('search-input').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = currentUsers.filter(u => 
        u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

// Tải dữ liệu ban đầu
async function loadInitialData() {
    ui.showLoading();
    try {
        currentUsers = await api.getUsers();
        ui.renderUsers(currentUsers);
    } catch (err) {
        ui.setStatus(err.message, false);
    } finally {
        ui.hideLoading();
    }
}

loadInitialData();