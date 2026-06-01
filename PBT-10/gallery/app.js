let page = 1;
const limit = 20;
let isFetching = false;

const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// HÀM GỌI API (ĐÃ CẬP NHẬT TRẠNG THÁI LỖI TRÊN UI)
async function loadMorePhotos() {
    if (isFetching) return;
    isFetching = true;
    
    // Đặt lại chữ thành Loading mỗi khi kích hoạt tải dữ liệu
    loadTrigger.innerHTML = "⏳ Đang tải thêm ảnh...";
    
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        
        // Nếu API trả về lỗi (ví dụ: sập server 500 hoặc 404)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const photos = await response.json();
        
        if (photos.length === 0) {
            loadTrigger.innerHTML = "🎉 Đã tải hết tất cả ảnh!";
            observer.unobserve(loadTrigger); // Dừng kích hoạt cuộn
            return;
        }

        photos.forEach(photo => {
            const card = document.createElement('div');
            card.className = 'photo-item';
            card.innerHTML = `
                <img data-src="${photo.download_url}" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'></svg>" alt="Photo by ${photo.author}">
                <p><small>Tác giả: ${photo.author}</small></p>
            `;
            
            card.querySelector('img').addEventListener('click', () => {
                lightboxImg.src = photo.download_url;
                lightbox.style.display = 'block';
            });

            galleryGrid.appendChild(card);
            lazyLoadObserver.observe(card.querySelector('img'));
        });

        page++;
    } catch (error) {
        // TRẠNG THÁI LỖI (ERROR STATE) HIỂN THỊ LÊN MÀN HÌNH
        // Thay vì ẩn đi hoặc chỉ ghi console, ta hiện thông báo lỗi kèm nút "Thử lại"
        loadTrigger.innerHTML = `
            <span style="color: red;">❌ Lỗi: Không thể tải ảnh (${error.message})</span>
            <br>
            <button id="retry-btn" style="margin-top: 8px; padding: 4px 10px; cursor: pointer;">Thử lại</button>
        `;

        // Bắt sự kiện click vào nút Thử lại để gọi lại API
        document.getElementById('retry-btn').addEventListener('click', () => {
            loadMorePhotos();
        });

    } finally {
        isFetching = false;
    }
}

// 2. IntersectionObserver phục vụ Infinite Scroll
const observer = new IntersectionObserver((entries) => {
    // Chỉ tự động tải khi trigger xuất hiện VÀ trên màn hình không hiển thị nút "Thử lại" (để tránh lặp lỗi vô hạn)
    if (entries[0].isIntersecting && !document.getElementById('retry-btn')) {
        loadMorePhotos();
    }
}, { rootMargin: '100px' });

observer.observe(loadTrigger);

// 3. IntersectionObserver phục vụ Lazy Loading cho từng ảnh đơn lẻ
const lazyLoadObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            observerInstance.unobserve(img);
        }
    });
});

// Đóng Lightbox Modal
document.getElementById('close-modal').addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; });