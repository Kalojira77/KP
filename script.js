// Menu burger
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    console.log('Menu toggle clicked');
  navList.classList.toggle('open');
});

// Modal
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

cards.forEach(card => {
  card.addEventListener('click', () => {
    modal.removeAttribute('hidden');
  });
});

modalClose.addEventListener('click', () => {
  modal.setAttribute('hidden', true);
});

// Année dynamique
document.getElementById('year').textContent = new Date().getFullYear();

// EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_PUBLIC_KEY')
    .then(() => {
      alert('Message envoyé !');
      this.reset();
    }, (err) => {
      alert('Erreur : ' + JSON.stringify(err));
    });
});
