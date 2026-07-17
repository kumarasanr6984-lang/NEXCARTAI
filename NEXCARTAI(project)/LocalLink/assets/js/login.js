document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const role = document.getElementById('roleSelect').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const buyers = await fetchJson('data/buyers.json');
    const matchingUser = buyers.find((user) => user.email === email && user.password === password && user.role === role);

    if (matchingUser) {
      setCurrentUser({ ...matchingUser, role });
      window.location.href = role === 'seller' ? 'seller-dashboard.html' : 'buyer-home.html';
    } else {
      alert('No matching account found. Try ava@nexcartai.dev with password demo123.');
    }
  });
});
