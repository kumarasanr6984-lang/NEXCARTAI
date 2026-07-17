document.addEventListener('DOMContentLoaded', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = false;

  const button = document.createElement('button');
  button.className = 'btn btn-secondary';
  button.textContent = '🎙️ Voice assistant';
  button.style.marginTop = '14px';
  const hero = document.querySelector('.hero');
  if (hero) hero.appendChild(button);

  button.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes('search')) {
      const searchTerm = command.replace('search', '').trim();
      window.location.href = `browse.html?query=${encodeURIComponent(searchTerm)}`;
    } else if (command.includes('profile')) {
      window.location.href = 'buyer-profile.html';
    } else if (command.includes('wishlist')) {
      window.location.href = 'wishlist.html';
    } else if (command.includes('shop')) {
      window.location.href = 'browse.html';
    }
  };
});
