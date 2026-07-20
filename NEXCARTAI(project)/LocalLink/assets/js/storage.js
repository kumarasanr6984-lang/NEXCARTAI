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
      price: 1162,
      rating: 4.8,
      seller: "Maya's Home Kitchen",
      location: 'North District',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      description: 'Homemade wildflower honey harvested from a local beekeeper and packaged in a small home kitchen.',
      specs: ['250g jar', 'Small-batch', '100% Organic', 'No additives'],
      reviews: [{ name: 'Alicia', text: 'Amazing homemade quality! Supports local entrepreneurship.', rating: 5 }],
    },
    {
      id: 2,
      title: 'Handwoven Clay Vase',
      category: 'Handicrafts',
      price: 2324,
      rating: 4.7,
      seller: "Priya's Handmade Ceramics",
      location: 'West Market',
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
      description: 'Each vase is individually hand-thrown and painted by Priya, a local woman entrepreneur working from her home studio.',
      specs: ['Handmade ceramic', 'Hand-painted finish', 'One-of-a-kind', 'Eco-friendly'],
      reviews: [{ name: 'Daniel', text: 'Beautiful! Supporting a talented local artisan.', rating: 5 }],
    },
    {
      id: 3,
      title: 'Golden Sourdough Loaf',
      category: 'Bakery',
      price: 747,
      rating: 4.9,
      seller: "Arun's Artisan Bakery",
      location: 'Riverside',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      description: 'Traditional slow-fermented sourdough baked fresh every morning in Arun\\'s home bakery using ancestral recipes.',
      specs: ['Freshly baked daily', 'Home-made tradition', 'No preservatives', 'Gluten-rich'],
      reviews: [{ name: 'Sofia', text: 'Tastes like homemade bread! Arun is an amazing local baker.', rating: 5 }],
    },
    {
      id: 4,
      title: 'Garden Herb Candle',
      category: 'Home Decor',
      price: 1328,
      rating: 4.6,
      seller: "Ritu's Natural Candles",
      location: 'Harbor Lane',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      description: 'Hand-poured soy candles made by Ritu in her small home workshop with natural herbs and essential oils.',
      specs: ['Hand-poured', 'Soy wax', '8 hour burn time', 'Eco-friendly'],
      reviews: [{ name: 'Mina', text: 'Perfect! Supporting a talented home entrepreneur.', rating: 4 }],
    },
  ],
  'data/sellers.json': [
    {
      id: 1,
      name: "Maya's Home Kitchen",
      location: 'North District',
      rating: 4.8,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
      phone: '+1 555 0123',
      whatsapp: '+1 555 0123',
      email: 'maya@nexcartai.dev',
      description: 'Small-batch homemade honey and preserves made with love from my kitchen',
    },
    {
      id: 2,"Priya's Handmade Ceramics",
      location: 'West Market',
      rating: 4.7,
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=80',
      phone: '+1 555 0456',
      whatsapp: '+1 555 0456',
      email: 'priya@nexcartai.dev',
      description: 'Handcrafted ceramics and pottery made by a local woman entrepreneur
      email: 'loft@nexcartai.dev',
    },
    {
      id: 3,Arun's Artisan Bakery",
      location: 'Riverside',
      rating: 4.9,
      distance: '3.4 km',
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
      phone: '+1 555 0789',
      whatsapp: '+1 555 0789',
      email: 'arun@nexcartai.dev',
      description: 'Traditional sourdough and fresh bread baked daily in a home kitchen
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
  'data/orders.json': [162 },
    { id: 2, product: 'Garden Herb Candle', status: 'Packed', date: '2026-07-14', amount: 1328t: 14 },
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
