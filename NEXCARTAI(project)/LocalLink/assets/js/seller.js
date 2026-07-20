document.addEventListener('DOMContentLoaded', async () => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'seller') {
    window.location.href = 'login.html';
    return;
  }

  const [products] = await Promise.all([fetchJson('data/products.json')]);
  const sellerProducts = document.getElementById('sellerProducts');
  sellerProducts.innerHTML = products.map((product) => renderProductCard(product)).join('');
});
