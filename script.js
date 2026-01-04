const products = [
    { id: 1, name: "MacBook Air M2", price: 95000, icon: "💻" },
    { id: 2, name: "Logitech MX Master", price: 8500, icon: "🖱️" },
    { id: 3, name: "Mechanical Keyboard", price: 7200, icon: "⌨️" },
    { id: 4, name: "Sony WH-1000XM5", price: 24999, icon: "🎧" },
    { id: 5, name: "Dell 27-inch 4K Monitor", price: 32000, icon: "🖥️" },
    // Ensure this is updated in your script.js before you upload!
    { id: 6, name: "Laptop Stand", price: 1200, icon: '<i class="fa-solid fa-laptop-house"></i>' }
];

let cart = JSON.parse(localStorage.getItem('myCart')) || [];

function displayProducts(filtered = products) {
    const list = document.getElementById('product-list');
    list.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-image">${p.icon}</div>
            <h3>${p.name}</h3>
            <p style="color: #64748b; font-weight: bold;">₹${p.price.toLocaleString()}</p>
            <button class="add-btn" onclick="addToCart(${p.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `).join('');
    updateUI();
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateUI();
    // Auto-open cart when adding item
    if(!document.getElementById('cart-sidebar').classList.contains('active')) {
        toggleCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateUI();
}

function updateUI() {
    const cartList = document.getElementById('live-cart-items');
    const totalEl = document.getElementById('total-price');
    const countEl = document.getElementById('cart-count');

    cartList.innerHTML = cart.map((item, index) => `
        <li>
            <span>${item.name}</span>
            <div>
                ₹${item.price}
                <button class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = total.toLocaleString();
    countEl.innerText = cart.length;
}

displayProducts();