document.addEventListener('DOMContentLoaded', async () => {
  const recommendationGrid = document.getElementById('recommendationGrid');
  const products = await fetchJson('data/products.json');
  const viewed = getViewedProducts();
  const viewedProduct = products.find((product) => product.id === viewed[0]);

  let recommended = products;
  if (viewedProduct) {
    recommended = products.filter((product) => product.category === viewedProduct.category);
  }

  recommendationGrid.innerHTML = recommended.slice(0, 3).map((product) => renderProductCard(product)).join('');
});
