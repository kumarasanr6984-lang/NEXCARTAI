document.addEventListener('DOMContentLoaded', async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const categoryGrid = document.getElementById('categoryGrid');
  const recommendationGrid = document.getElementById('recommendationGrid');
  const sellerGrid = document.getElementById('sellerGrid');
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  const [categories, products, sellers] = await Promise.all([
    fetchJson('data/categories.json'),
    fetchJson('data/products.json'),
    fetchJson('data/sellers.json'),
  ]);

  categoryGrid.innerHTML = categories.slice(0, 4).map((category) => renderCategoryCard(category)).join('');
  recommendationGrid.innerHTML = products.map((product) => renderProductCard(product)).join('');
  sellerGrid.innerHTML = sellers.map((seller) => renderSellerCard(seller)).join('');

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = products.filter((product) => product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
    recommendationGrid.innerHTML = filtered.map((product) => renderProductCard(product)).join('');
  });
});
