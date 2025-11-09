// --- Enregistrement du Service Worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js', { scope: './' })
      .then(() => console.log('Service Worker enregistré avec scope ./'))
      .catch(err => console.log('Erreur SW :', err));
  });
}

// --- Gestion du bouton d’installation ---
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-btn');
  installBtn.style.display = 'inline-block';

  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('Résultat installation :', outcome);
    deferredPrompt = null;
  });
});

// --- Sauvegarde de la dernière page visitée ---
window.addEventListener('beforeunload', () => {
  localStorage.setItem('lastVisited', window.location.pathname + window.location.search);
});

// --- Redirection à la réouverture ---
window.addEventListener('load', () => {
  const last = localStorage.getItem('lastVisited');
  if (last && window.location.pathname === '/test-appli-windows/') {
    window.location.replace(last);
  }
});
