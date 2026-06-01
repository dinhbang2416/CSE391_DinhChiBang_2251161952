document.getElementById('refresh-btn').addEventListener('click', loadDashboard);

async function loadDashboard() {
    const startTime = Date.now();
    
    // Reset và hiển thị trạng thái Loading
    document.getElementById('global-loading').style.display = 'block';
    document.getElementById('total-time').innerText = '';
    
    for (let i = 0; i < 3; i++) {
        document.getElementById(`widget-${i}-load`).style.display = 'block';
        document.getElementById(`widget-${i}-error`).style.display = 'none';
        document.getElementById(`widget-${i}-content`).innerHTML = '';
    }

    // Các Promise Fetch của từng API
    const p1 = fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then(r => r.json());
    const p2 = fetch("https://restcountries.com/v3.1/name/vietnam").then(r => r.json());
    const p3 = fetch("https://dog.ceo/api/breeds/image/random").then(r => r.json());

    // Gọi SONG SONG tất cả API, chấp nhận có API lỗi (Promise.allSettled)
    const results = await Promise.allSettled([p1, p2, p3]);

    // Tắt loading tổng thể
    document.getElementById('global-loading').style.display = 'none';
    document.getElementById('total-time').innerText = `Dữ liệu tải xong trong: ${Date.now() - startTime} ms`;

    // Duyệt qua từng kết quả trả về để map vào Widget tương ứng
    results.forEach((result, index) => {
        document.getElementById(`widget-${index}-load`).style.display = 'none';
        
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, "Không thể kết nối đến API này.");
        }
    });
}

function renderWidget(index, data) {
    const contentDiv = document.getElementById(`widget-${index}-content`);
    
    if (index === 0) {
        // Render Thời tiết
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        contentDiv.innerHTML = `<p>Nhiệt độ: ${temp}°C</p><p>Tốc độ gió: ${wind} km/h</p>`;
    } 
    else if (index === 1) {
        // Render Quốc gia
        const country = data[0];
        contentDiv.innerHTML = `
            <p>Tên: ${country.name.official}</p>
            <p>Thủ đô: ${country.capital[0]}</p>
            <p>Dân số: ${country.population.toLocaleString()}</p>
        `;
    } 
    else if (index === 2) {
        // Render Ảnh Cún
        contentDiv.innerHTML = `<img src="${data.message}" alt="Dog" style="width:100%; max-height:150px; object-fit:contain;">`;
    }
}

function renderWidgetError(index, errorMessage) {
    const errorDiv = document.getElementById(`widget-${index}-error`);
    errorDiv.style.display = 'block';
    errorDiv.innerText = `Lỗi: ${errorMessage}`;
}

// Chạy ứng dụng khi vừa mở trang
loadDashboard();