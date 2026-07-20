document.addEventListener('DOMContentLoaded', async () => {
  const buyerProfileCard = document.getElementById('buyerProfileCard');
  const sellerProfileCard = document.getElementById('sellerProfileCard');
  const sellerProfileProducts = document.getElementById('sellerProfileProducts');

  const currentUser = getCurrentUser();
  const savedProfile = readStorage('nexcartai_profile', {});

  if (buyerProfileCard) {
    const profile = {
      name: currentUser?.name || 'Demo Buyer',
      email: currentUser?.email || 'demo@nexcartai.dev',
      location: currentUser?.location || savedProfile.address || 'North District',
      phone: savedProfile.phone || '+1 555 0100',
      address: savedProfile.address || 'North District, Local Market 12',
    };

    buyerProfileCard.innerHTML = `
      <div>
        <p class="eyebrow">Buyer profile</p>
        <h2>${safeText(profile.name)}</h2>
        <p>${safeText(profile.email)}</p>
        <p>${safeText(profile.location)}</p>
      </div>
      <div class="contact-list">
        <form class="form-stack" id="buyerProfileForm">
          <label>
            Address
            <input name="address" value="${safeText(profile.address)}" />
          </label>
          <label>
            Phone
            <input name="phone" value="${safeText(profile.phone)}" />
          </label>
          <button class="btn btn-primary" type="submit">Save details</button>
        </form>
        <p>My Preference: ${getWishlist().length} saved</p>
        <p>Connectors: ${getConnectors().length} saved sellers</p>
      </div>
    `;

    document.getElementById('buyerProfileForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const nextProfile = {
        ...savedProfile,
        address: String(formData.get('address') || ''),
        phone: String(formData.get('phone') || ''),
      };
      writeStorage('nexcartai_profile', nextProfile);
      alert('Buyer details updated.');
      window.location.reload();
    });
  }

  if (sellerProfileCard) {
    const sellers = await fetchJson('data/sellers.json');
    const seller = sellers[0];
    const profile = {
      name: seller.name,
      location: seller.location,
      phone: savedProfile.phone || seller.phone,
      whatsapp: savedProfile.whatsapp || seller.whatsapp,
      email: savedProfile.email || seller.email,
      address: savedProfile.address || 'Downtown market 204',
    };

    sellerProfileCard.innerHTML = `
      <div>
        <p class="eyebrow">Seller profile</p>
        <h2>${safeText(profile.name)}</h2>
        <p>${safeText(profile.location)}</p>
        <p>${safeText(profile.phone)}</p>
      </div>
      <div class="contact-list">
        <form class="form-stack" id="sellerProfileForm">
          <label>
            Address
            <input name="address" value="${safeText(profile.address)}" />
          </label>
          <label>
            Phone
            <input name="phone" value="${safeText(profile.phone)}" />
          </label>
          <label>
            WhatsApp
            <input name="whatsapp" value="${safeText(profile.whatsapp)}" />
          </label>
          <label>
            Email
            <input name="email" value="${safeText(profile.email)}" />
          </label>
          <button class="btn btn-primary" type="submit">Save details</button>
        </form>
      </div>
    `;

    document.getElementById('sellerProfileForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const nextProfile = {
        ...savedProfile,
        address: String(formData.get('address') || ''),
        phone: String(formData.get('phone') || ''),
        whatsapp: String(formData.get('whatsapp') || ''),
        email: String(formData.get('email') || ''),
      };
      writeStorage('nexcartai_profile', nextProfile);
      alert('Seller details updated.');
      window.location.reload();
    });
  }

  if (sellerProfileProducts) {
    const products = await fetchJson('data/products.json');
    sellerProfileProducts.innerHTML = products.map((product) => renderProductCard(product)).join('');
  }
});
