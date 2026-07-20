document.addEventListener('DOMContentLoaded', async () => {
  const orderList = document.getElementById('orderList');
  const orders = getOrders();
  const products = await fetchJson('data/products.json');

  if (!orders.length) {
    orderList.innerHTML = '<article class="info-card">No demo orders yet. Place an order from the product detail page.</article>';
    return;
  }

  orderList.innerHTML = orders.map((order, index) => `
    <article class="review-card">
      <h3>${order.product || products[index]?.title || 'Demo order'}</h3>
      <p>Status: ${order.status}</p>
      <p>Date: ${order.date}</p>
      <p>Amount: ₹${order.amount}</p>
    </article>
  `).join('');
});
