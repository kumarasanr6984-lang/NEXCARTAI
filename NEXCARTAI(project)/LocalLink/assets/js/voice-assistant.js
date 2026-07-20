document.addEventListener('DOMContentLoaded', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  let isListening = false;

  const voiceBtn = document.getElementById('voiceBtn');
  if (!voiceBtn) return;

  voiceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isListening) return;
    
    isListening = true;
    recognition.start();
    voiceBtn.textContent = '🎙️ Listening...';
    voiceBtn.disabled = true;
  });

  recognition.onstart = () => {
    isListening = true;
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    const searchInput = document.getElementById('searchInput');
    
    // Parse commands or fill search input
    if (command.includes('search')) {
      const searchTerm = command.replace('search', '').trim();
      searchInput.value = searchTerm;
    } else if (command.includes('profile')) {
      window.location.href = 'buyer-profile.html';
      return;
    } else if (command.includes('wishlist')) {
      window.location.href = 'wishlist.html';
      return;
    } else if (command.includes('shop') || command.includes('browse')) {
      window.location.href = 'browse.html';
      return;
    } else {
      // Fill search input with the recognized text
      searchInput.value = command;
    }

    voiceBtn.textContent = '🎙️';
    voiceBtn.disabled = false;
    isListening = false;
  };

  recognition.onerror = () => {
    voiceBtn.textContent = '🎙️';
    voiceBtn.disabled = false;
    isListening = false;
  };

  recognition.onend = () => {
    voiceBtn.textContent = '🎙️';
    voiceBtn.disabled = false;
    isListening = false;
  };
});
