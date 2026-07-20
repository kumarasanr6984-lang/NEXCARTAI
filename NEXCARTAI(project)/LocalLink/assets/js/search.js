document.addEventListener('DOMContentLoaded', async () => {
  const browseProducts = document.getElementById('browseProducts');
  const browseSearch = document.getElementById('browseSearch');
  const categoryFilter = document.getElementById('categoryFilter');

  const [products, categories] = await Promise.all([fetchJson('data/products.json'), fetchJson('data/categories.json')]);
  categoryFilter.innerHTML = ['<option value="">All categories</option>', ...categories.map((category) => `<option value="${category.name}">${category.name}</option>`)].join('');

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('query') || '';
  const initialCategory = params.get('category') || '';
  if (browseSearch) {
    browseSearch.value = initialQuery;
  }
  if (categoryFilter) {
    categoryFilter.value = initialCategory;
  }

  function renderFilteredProducts() {
    const query = browseSearch.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const filtered = products.filter((product) => {
      const matchesQuery = !query || product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      const matchesCategory = !category || product.category === category;
      return matchesQuery && matchesCategory;
    });
    browseProducts.innerHTML = filtered.map((product) => renderProductCard(product)).join('');
  }

  browseSearch.addEventListener('input', renderFilteredProducts);
  categoryFilter.addEventListener('change', renderFilteredProducts);
  renderFilteredProducts();
});
