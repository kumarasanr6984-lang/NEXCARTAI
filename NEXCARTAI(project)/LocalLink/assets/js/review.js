document.addEventListener('DOMContentLoaded', async () => {
  const reviewCards = document.getElementById('reviewCards');
  const productDetailSection = document.getElementById('productDetailSection');
  const reviewList = document.getElementById('reviewList');

  const [products, reviews] = await Promise.all([fetchJson('data/products.json'), fetchJson('data/reviews.json')]);

  if (reviewCards) {
    reviewCards.innerHTML = reviews.map((review) => `
      <article class="review-card">
        <div class="meta-row"><strong>${review.name}</strong><span>⭐ ${review.rating}</span></div>
        <p>${review.text}</p>
      </article>
    `).join('');
  }

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id')) || 1;
  const product = products.find((item) => item.id === productId) || products[0];
  addViewedProduct(product.id);

  if (productDetailSection) {
    productDetailSection.innerHTML = `
      <div class="detail-panel">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="detail-panel">
        <p class="eyebrow">${product.category}</p>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <div class="price-tag">$${product.price}</div>
        <div class="meta-row"><span>Seller: ${product.seller}</span><span>⭐ ${product.rating}</span></div>
        <div class="btn-row">
          <button class="btn btn-primary" id="connectSellerButton">Connect with seller</button>
          <button class="btn btn-secondary" id="wishlistButton">Add to My Preference</button>
        </div>
        <ul>
          ${product.specs.map((spec) => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
    `;

    document.getElementById('connectSellerButton').addEventListener('click', () => {
      addConnector(product.seller);
      alert(`Connected with ${product.seller}.`);
    });

    document.getElementById('wishlistButton').addEventListener('click', () => {
      toggleWishlist(product.id);
      alert('My Preference updated.');
    });
  }

  if (reviewList) {
    const filteredReviews = reviews.filter((review) => review.productId === product.id);
    reviewList.innerHTML = filteredReviews.map((review) => `
      <article class="review-card">
        <div class="meta-row"><strong>${review.name}</strong><span>⭐ ${review.rating}</span></div>
        <p>${review.text}</p>
      </article>
    `).join('');
  }
});
