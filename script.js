// Attendre que le document HTML soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const againBtn = document.getElementById('againBtn');
  const question = document.getElementById('question');
  const subtext = document.getElementById('subtext');

  // Fonction pour déplacer le 1er bouton
  function moveButton() {
    if (!yesBtn) return;

    const btnRect = yesBtn.getBoundingClientRect();
    const btnWidth = btnRect.width || 100;
    const btnHeight = btnRect.height || 40;

    const margin = 20;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;

    const randomX = Math.floor(Math.random() * Math.max(margin, maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * Math.max(margin, maxY - margin)) + margin;

    yesBtn.style.position = 'fixed';
    yesBtn.style.left = `${randomX}px`;
    yesBtn.style.top = `${randomY}px`;
    yesBtn.style.zIndex = '999';
  }

  // Événements sur le 1er bouton (fuit au clic ou survol/tactile)
  if (yesBtn) {
    yesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      moveButton();
    });

    yesBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moveButton();
    });
  }

  // Événements sur le 2ème bouton (valide la réponse)
  if (againBtn) {
    againBtn.addEventListener('click', () => {
      // 1. Masquer les éléments non nécessaires
      const heartIcon = document.querySelector('.heart-icon');
      if (heartIcon) heartIcon.style.display = 'none';

      const buttonsContainer = document.querySelector('.buttons');
      if (buttonsContainer) buttonsContainer.style.display = 'none';

      if (yesBtn) yesBtn.style.display = 'none';

      // 2. Afficher le grand message final avec emojis
      if (question) {
        question.textContent = "C'est un rendez-vous ! ❤️🥰";
        question.style.fontSize = "2.2rem";
        question.style.marginBottom = "20px";
      }

      if (subtext) {
        subtext.textContent = "Prépare-toi pour une super journée le 17/10 ! 🎉✨💖";
        subtext.style.fontSize = "1.3rem";
      }

      // 3. Déclencher les confettis
      try {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
        }
      } catch (err) {
        console.log("Confetti non disponible :", err);
      }
    });
  }
});