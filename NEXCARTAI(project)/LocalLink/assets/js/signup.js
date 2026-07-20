document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const role = document.getElementById('roleSelect').value;
    const account = {
      id: Date.now(),
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      location: document.getElementById('location').value,
      role,
    };
    const existing = readStorage('nexcartai_accounts', []);
    writeStorage('nexcartai_accounts', [...existing, account]);
    setCurrentUser(account);
    window.location.href = role === 'seller' ? 'seller-dashboard.html' : 'buyer-home.html';
  });
});
