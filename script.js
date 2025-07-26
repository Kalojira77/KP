// Menu burger
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    console.log('Menu toggle clicked');
  navList.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// MODAL avec JSON
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = modal.querySelector('#modal-title');
const modalContent = modal.querySelector('.modal-content');

let projects = [];

// Charger les données depuis le JSON
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    projects = data;
  })
  .catch(err => console.error('Erreur de chargement du JSON :', err));

// Fonction pour mettre à jour la modale
function updateModal(project) {
  modalTitle.textContent = project.title;

  // Nettoyer le contenu précédent (sauf bouton et titre)
  const oldElements = modalContent.querySelectorAll('p, img, h4, div');
  oldElements.forEach(el => el.remove());

  // Description
  const desc = document.createElement('p');
  desc.textContent = project.description;
  modalContent.appendChild(desc);

  // Technologies
  const techTitle = document.createElement('h4');
  techTitle.textContent = "Technologies utilisées";
  modalContent.appendChild(techTitle);

  const logos = document.createElement('div');
  logos.classList.add('logos');
  project.technologies.forEach(tech => {
    const span = document.createElement('span');
    span.textContent = tech;
    logos.appendChild(span);
  });
  modalContent.appendChild(logos);

    // Images
  project.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Aperçu de ${project.title}`;
    modalContent.appendChild(img);
  });
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.id;
    const project = projects[id];
    if (project) {
      updateModal(project);
      modal.removeAttribute('hidden');
    }
  });
});

modalClose.addEventListener('click', () => {
  modal.setAttribute('hidden', true);
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
