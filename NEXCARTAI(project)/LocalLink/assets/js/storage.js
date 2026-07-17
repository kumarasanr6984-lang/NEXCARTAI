const STORAGE_KEYS = {
  wishlist: 'nexcartai_wishlist',
  connectors: 'nexcartai_connectors',
  orders: 'nexcartai_orders',
  theme: 'nexcartai_theme',
  user: 'nexcartai_user',
  viewed: 'nexcartai_viewed',
  reviews: 'nexcartai_reviews',
};

const LOCAL_SAMPLE_DATA = {
  'data/products.json': [
    {
      id: 1,
      title: 'Wildflower Honey Jar',
      category: 'Food',
      price: 14,
      rating: 4.8,
      seller: "Maya's Pantry",
      location: 'North District',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      description: 'Locally harvested honey with a floral finish and rich texture.',
      specs: ['250g', 'Small-batch', 'Organic'],
      reviews: [{ name: 'Alicia', text: 'Excellent flavor and beautiful packaging.', rating: 5 }],
    },
    {
      id: 2,
      title: 'Handwoven Clay Vase',
      category: 'Handicrafts',
      price: 28,
      rating: 4.7,
      seller: 'Artisan Loft',
      location: 'West Market',
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
      description: 'A handcrafted ceramic vase designed for modern homes.',
      specs: ['Ceramic', 'Hand-painted', 'Indoor use'],
      reviews: [{ name: 'Daniel', text: 'Lovely finish and excellent craftsmanship.', rating: 5 }],
    },
    {
      id: 3,
      title: 'Golden Sourdough Loaf',
      category: 'Bakery',
      price: 9,
      rating: 4.9,
      seller: "Baker's Circle",
      location: 'Riverside',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      description: 'Slow-fermented sourdough baked fresh every morning.',
      specs: ['Freshly baked', 'Daily', 'Gluten-rich'],
      reviews: [{ name: 'Sofia', text: 'Amazing texture and aroma.', rating: 5 }],
    },
    {
      id: 4,
      title: 'Garden Herb Candle',
      category: 'Home Decor',
      price: 16,
      rating: 4.6,
      seller: 'Luna & Co.',
      location: 'Harbor Lane',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      description: 'A soothing candle with eucalyptus and rosemary notes.',
      specs: ['Soy wax', '8 hours burn', 'Gift-ready'],
      reviews: [{ name: 'Mina', text: 'Perfect gift for friends.', rating: 4 }],
    },
  ],
  'data/sellers.json': [
    {
      id: 1,
      name: "Maya's Pantry",
      location: 'North District',
      rating: 4.8,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
      phone: '+1 555 0123',
      whatsapp: '+1 555 0123',
      email: 'maya@nexcartai.dev',
    },
    {
      id: 2,
      name: 'Artisan Loft',
      location: 'West Market',
      rating: 4.7,
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=80',
      phone: '+1 555 0456',
      whatsapp: '+1 555 0456',
      email: 'loft@nexcartai.dev',
    },
    {
      id: 3,
      name: "Baker's Circle",
      location: 'Riverside',
      rating: 4.9,
      distance: '3.4 km',
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
      phone: '+1 555 0789',
      whatsapp: '+1 555 0789',
      email: 'baker@nexcartai.dev',
    },
  ],
  'data/buyers.json': [
    {
      id: 1,
      name: 'Ava Chen',
      email: 'ava@nexcartai.dev',
      password: 'demo123',
      location: 'North District',
      role: 'buyer',
    },
    {
      id: 2,
      name: 'Nadia Rivera',
      email: 'nadia@nexcartai.dev',
      password: 'demo123',
      location: 'West Market',
      role: 'seller',
    },
  ],
  'data/reviews.json': [
    { id: 1, productId: 1, name: 'Alicia', rating: 5, text: 'Amazing honey with a fresh and floral taste.' },
    { id: 2, productId: 2, name: 'Daniel', rating: 5, text: 'The craftsmanship is striking and elegant.' },
    { id: 3, productId: 3, name: 'Sofia', rating: 5, text: 'We ordered it for breakfast and it disappeared quickly.' },
  ],
  'data/orders.json': [
    { id: 1, product: 'Wildflower Honey Jar', status: 'Confirmed', date: '2026-07-10', amount: 14 },
    { id: 2, product: 'Garden Herb Candle', status: 'Packed', date: '2026-07-14', amount: 16 },
  ],
  'data/categories.json': [
    { name: 'Food', icon: '🍯' },
    { name: 'Bakery', icon: '🥐' },
    { name: 'Handicrafts', icon: '🎨' },
    { name: 'Home Decor', icon: '🏡' },
  ],
};

function readStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('Storage error', error);
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getWishlist() {
  return readStorage(STORAGE_KEYS.wishlist, []);
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const next = wishlist.includes(productId) ? wishlist.filter((item) => item !== productId) : [...wishlist, productId];
  writeStorage(STORAGE_KEYS.wishlist, next);
  return next;
}

function getConnectors() {
  return readStorage(STORAGE_KEYS.connectors, []);
}

function addConnector(sellerName) {
  const connectors = getConnectors();
  const next = connectors.includes(sellerName) ? connectors : [sellerName, ...connectors].slice(0, 6);
  writeStorage(STORAGE_KEYS.connectors, next);
  return next;
}

function getViewedProducts() {
  return readStorage(STORAGE_KEYS.viewed, []);
}

function addViewedProduct(productId) {
  const viewed = getViewedProducts();
  const next = [productId, ...viewed.filter((id) => id !== productId)].slice(0, 5);
  writeStorage(STORAGE_KEYS.viewed, next);
  return next;
}

function setCurrentUser(user) {
  writeStorage(STORAGE_KEYS.user, user);
}

function getCurrentUser() {
  return readStorage(STORAGE_KEYS.user, null);
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.user);
}

async function fetchJson(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Fetch failed');
    return response.json();
  } catch (error) {
    console.warn('Falling back to embedded sample data for', path);
    return LOCAL_SAMPLE_DATA[path] || [];
  }
}
