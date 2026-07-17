document.addEventListener('DOMContentLoaded', async () => {
  const statsGrid = document.getElementById('statsGrid');
  const [products, orders] = await Promise.all([fetchJson('data/products.json'), fetchJson('data/orders.json')]);

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Orders', value: orders.length },
    { label: 'Revenue', value: '$' + orders.reduce((sum, order) => sum + order.amount, 0) },
    { label: 'Rating', value: '4.8/5' },
  ];

  statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span>${stat.label}</span>
      <strong>${stat.value}</strong>
    </article>
  `).join('');
});
