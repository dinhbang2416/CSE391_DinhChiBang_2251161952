const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329135/iphone-16-xanh-luu-ly-5-638639088298271455-750x500.jpg", rating: 4.5, inStock: true },
    { id: 2, name: "Laptop Asus", price: 10990000, category: "laptop", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/359250/asus-vivobook-go-e1404fa-r5-7520u-eb482w-2-639124499400293366-750x500.jpg", rating: 4.3, inStock: false },
    { id: 3, name: "iPhone 13", price: 17990000, category: "phone", image: "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-1-2-750x500.jpg", rating: 4.2, inStock: true },
    { id: 4, name: "Samsung Galaxy A36", price: 11990000, category: "phone", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/335174/samsung-galaxy-a36-tim-4-638790977953786045-750x500.jpg", rating: 4.4, inStock: false },
    { id: 5, name: "Ipad Pro", price: 26990000, category: "tablet", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/522/358082/ipad-pro-m5-11-inch-wifi-den-2-638980237936324205-750x500.jpg", rating: 4.1, inStock: false },
    { id: 6, name: "Macbook Pro", price: 27990000, category: "laptop", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/363537/macbook-neo-13-inch-a18-pro-8gb-256gb-3-639082630766392222-750x500.jpg", rating: 4.7, inStock: true },
    { id: 7, name: "SmartTV LG", price: 12990000, category: "TV", image: "https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/337726/smart-tivi-nanocell-lg-ai-4k-55-inch-55nano80asa-2-638822265975483242-700x467.jpg", rating: 4.0, inStock: true },
    { id: 8, name: "GoogleTV Sony", price: 19990000, category: "TV", image: "https://cdnv2.tgdd.vn/mwg-static/dmx/Products/Images/1942/339081/google-tivi-sony-4k-55-inch-k-55s25vm2-2-638844792902572071-700x467.jpg", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi Redmi", price: 7490000, category: "phone", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/362274/xiaomi-poco-x7-pro-xanh-1-639050171522753189-750x500.jpg", rating: 4.2, inStock: true },
    { id: 10, name: "Laptop HP Probook", price: 17990000, category: "laptop", image: "https://cdn.tgdd.vn/Products/Images/44/312989/hp-probook-445-g10-r5-878t1pa-thumb-1-600x600.jpg", rating: 4.0, inStock: false },
    { id: 11, name: "Samsung Galaxy TabS11", price: 20990000, category: "tablet", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/522/344721/samsung-galaxy-tab-s11-gray-2-638949146617728801-750x500.jpg", rating: 4.2, inStock: false },
    { id: 12, name: "Samsung Galaxy Tab A11", price: 9990000, category: "tablet", image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/522/359090/samsung-galaxy-tab-a11-plus-5g-bac-4-639027059336975090-750x500.jpg", rating: 3.9, inStock: true },
    // ... thêm ít nhất 12 sản phẩm 4 categories
];

let currentProducts = [...products];
let currentCategory = "all";
let searchKeyword = "";
let cartCount = 0;
function init() {
    createLayout();
    renderProducts(products);
    // attachEvents();
}
function createLayout() {
    const app = document.getElementById("app");
    const searchInput = document.createElement("input");
    searchInput.id = "search";
    searchInput.placeholder = "Tìm sản phẩm...";
    const categoryContainer = document.createElement("div");
    categoryContainer.id = "categories";
    const categories = ["all","phone","laptop","tablet","TV"
    ];
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.toUpperCase();
        button.dataset.category = category;
        categoryContainer.appendChild(button);
    })
    const sortSelect = document.createElement("select");
    sortSelect.id = "sort";
    const options = [
        { value: "", text: "-- Sắp xếp --" },
        { value: "price-asc", text: "Giá tăng dần" },
        { value: "price-desc", text: "Giá giảm dần" },
        { value: "name", text: "Tên A-Z" },
        { value: "rating", text: "Đánh giá cao nhất" }
    ];
    options.forEach(optionData => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        sortSelect.appendChild(option);
    })
    const productContainer = document.createElement("div");
    productContainer.id = "products";
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.innerHTML =`<div id="modal-content">
        <button id="close-modal">✕</button>
        <div id="modal-body"></div>
    </div>`;
    const cartWrapper = document.createElement("div");
    cartWrapper.id = "cart-wrapper";
    cartWrapper.innerHTML = `
    <span id="cart-icon">🛒</span>
    <span id="cart-badge">0</span>
    `;
    const darkModeBtn = document.createElement("button");
    darkModeBtn.id = "dark-mode-btn";
    darkModeBtn.textContent = "🌙 Dark Mode";
    app.appendChild(searchInput);
    app.appendChild(sortSelect);
    app.appendChild(darkModeBtn);
    app.appendChild(cartWrapper);
    app.appendChild(categoryContainer);
    app.appendChild(productContainer);
    app.appendChild(modal);
}
function renderProducts(products) {
    const productContainer =document.getElementById("products");
    productContainer.innerHTML = "";

    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    const img = document.createElement("img");
    img.src = product.image;
    const title = document.createElement("h3");
    title.textContent = product.name;
    const price = document.createElement("p");
    price.textContent =product.price.toLocaleString("vi-VN") + "đ";
    const btn = document.createElement("button");
    btn.textContent = "Thêm giỏ";
    card.append(img, title, price, btn);
    card.addEventListener("click", () =>{openModal(product);});
    btn.addEventListener("click",e=>{
        e.stopPropagation();
        cartCount++;
        updateCartBadge();
    })
    return card;
}

init();
function searchProducts(products,keyword) {
    return products.filter(product =>
        product.name
            .toLowerCase()
            .includes(keyword.toLowerCase())
    );
}
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", e => {
    searchKeyword = e.target.value;
    applyFilters();
});
function applyFilters() {
    let result = [...products];
    const sortSelect =document.getElementById("sort");
    result = searchProducts(result,searchKeyword);
    result = filterByCategory(result, currentCategory);
    result = sortProducts(result,sortSelect.value);
    renderProducts(result);
}
const buttons =document.querySelectorAll("#categories button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn =>btn.classList.remove("active"));
            button.classList.add("active");
            currentCategory = button.dataset.category;
            applyFilters();
        });
});

function filterByCategory(products,category) {
    if (category === "all") {
        return products;
    }
    return products.filter(
        product =>product.category === category
    );
}
function sortProducts(products, type) {
    const sorted = [...products];
    switch (type) {
        case "price-asc":
            return sorted.sort(
                (a, b) => a.price - b.price
            );
        case "price-desc":
            return sorted.sort(
                (a, b) => b.price - a.price
            );

        case "name":
            return sorted.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );
        case "rating":
            return sorted.sort(
                (a, b) =>
                    b.rating - a.rating
            );
        default:
            return sorted;
    }
}
const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change",()=>{applyFilters()});


function openModal(product) {
    // console.log("modal:", document.getElementById("modal"));
    // console.log("modalBody:", document.getElementById("modal-body"));
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}">
        <p>Giá: ${product.price.toLocaleString("vi-VN")}đ</p>
        <p>Danh mục: ${product.category}</p>
        <p>⭐ ${product.rating}</p>
        <p>${product.inStock?"Còn hàng":"Hết hàng"}</p>
    `;
    modal.classList.add("show");
}
function closeModal() {
    document.getElementById("modal").classList.remove("show");
}
document.getElementById("close-modal").addEventListener("click",closeModal);
function updateCartBadge() {
    const badge =document.getElementById("cart-badge");
    badge.textContent = cartCount;
}
const darkModeBtn =document.getElementById("dark-mode-btn");
darkModeBtn.addEventListener("click", () => {document.body.classList.toggle("dark-mode");
     darkModeBtn.textContent =document.body.classList.contains("dark-mode")? "☀️ Light Mode": "🌙 Dark Mode";
});