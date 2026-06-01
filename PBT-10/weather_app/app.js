const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const historyList = document.getElementById('history-list');

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const successState = document.getElementById('success-state');

// Khởi tạo app
init();

function init() {
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    });
    renderHistory();
}

async function fetchWeather(city) {
    // 1. Show Loading State
    loadingState.style.display = 'block';
    successState.style.display = 'none';
    errorState.style.display = 'none';

    try {
        // Sử dụng API wttr.in định dạng JSON
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error(`Không tìm thấy thành phố hoặc lỗi hệ thống (${response.status})`);
        }

        const data = await response.json();
        
        // 2. Show Success State & Render Data
        loadingState.style.display = 'none';
        successState.style.display = 'block';

        const current = data.current_condition[0];
        const area = data.nearest_area[0];

        document.getElementById('weather-city').innerText = `${area.areaName[0].value}, ${area.country[0].value}`;
        document.getElementById('weather-temp').innerText = current.temp_C;
        document.getElementById('weather-humidity').innerText = current.humidity;
        document.getElementById('weather-desc').innerText = current.weatherDesc[0].value;

        // Lưu vào LocalStorage
        saveToHistory(city);

    } catch (error) {
        // 3. Show Error State
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        errorState.innerText = `Lỗi: ${error.message}. Vui lòng thử lại!`;
    }
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weather_history')) || [];
    // Loại bỏ trùng và đưa thành phố mới lên đầu
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    // Giới hạn 5 thành phố
    if (history.length > 5) history.pop();
    
    localStorage.setItem('weather_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('weather_history')) || [];
    historyList.innerHTML = '';
    
    history.forEach(city => {
        const btn = document.createElement('button');
        btn.innerText = city;
        btn.style.marginRight = '5px';
        btn.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(btn);
    });
}