document.addEventListener('DOMContentLoaded', async () => {
  const themeToggle = document.getElementById('themeToggle');
  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    if (typeof window.applyTheme === 'function') {
      window.applyTheme(theme);
      return;
    }

    document.body.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    localStorage.setItem('nexcartai_theme', isDark ? 'dark' : 'light');
    if (themeToggle) {
      themeToggle.innerHTML = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  const savedTheme = localStorage.getItem('nexcartai_theme');
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');

  const currentUser = getCurrentUser();
  if (!currentUser && window.location.pathname.includes('buyer-home.html')) {
    window.location.href = 'login.html';
  }

  const categoryGrid = document.getElementById('categoryGrid');
  if (categoryGrid) {
    const categories = await fetchJson('data/categories.json');
    categoryGrid.innerHTML = categories.slice(0, 4).map((category) => renderCategoryCard(category)).join('');
  }

  const featuredProducts = document.getElementById('featuredProducts');
  if (featuredProducts) {
    const products = await fetchJson('data/products.json');
    featuredProducts.innerHTML = products.slice(0, 3).map((product) => renderProductCard(product)).join('');
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-product-id]');
    if (!button) return;
    const productId = Number(button.dataset.productId);
    toggleWishlist(productId);
    button.classList.remove('is-active');
    void button.offsetWidth;
    button.classList.add('is-active');
    window.setTimeout(() => button.classList.remove('is-active'), 260);
    button.textContent = '🤝';
  });
});

function renderCategoryCard(category) {
  return `
    <article class="info-card category-card">
      <div class="meta-row">
        <span>${category.icon}</span>
        <span>${category.name}</span>
      </div>
      <h3>${category.name}</h3>
      <p>${category.description || 'Discover nearby favorites'}</p>
      <a class="btn btn-secondary" href="browse.html?category=${encodeURIComponent(category.name)}">Browse ${category.name}</a>
    </article>
  `;
}

function renderProductCard(product) {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(product.id);
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.title}" />
      <div class="meta-row">
        <span>${product.category}</span>
        <span>⭐ ${product.rating}</span>
      </div>
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <div class="meta-row">
        <span>${product.seller}</span>
        <span>${product.location}</span>
      </div>
      <div class="price-row">
        <strong>₹${product.price}</strong>
        <div class="btn-row">
          <a class="btn btn-secondary" href="product-details.html?id=${product.id}">View details</a>
          <button class="icon-btn" data-product-id="${product.id}" aria-label="Toggle My Preference">🤝</button>
        </div>
      </div>
    </article>
  `;
}

function renderSellerCard(seller) {
  return `
    <article class="seller-card">
      <img src="${seller.image}" alt="${seller.name}" />
      <h3>${seller.name}</h3>
      <p>${seller.location}</p>
      <div class="meta-row">
        <span>⭐ ${seller.rating}</span>
        <span>${seller.distance}</span>
      </div>
      <div class="seller-actions">
        <a class="btn btn-primary" href="seller-profile.html">Open shop</a>
        <a class="btn btn-secondary" href="product-details.html?id=1">View products</a>
      </div>
    </article>
  `;
}

function safeText(text) {
  return text || '—';
}
