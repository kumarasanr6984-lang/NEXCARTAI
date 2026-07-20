document.addEventListener('DOMContentLoaded', async () => {
  const wishlistGrid = document.getElementById('wishlistGrid');
  const products = await fetchJson('data/products.json');
  const wishlist = getWishlist();
  const items = products.filter((product) => wishlist.includes(product.id));

  if (!items.length) {
    wishlistGrid.innerHTML = '<article class="info-card">Your My Preference list is empty. Explore products and save favorites.</article>';
    return;
  }

  wishlistGrid.innerHTML = items.map((product) => renderProductCard(product)).join('');
});
