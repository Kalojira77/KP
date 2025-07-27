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
const modalClose = modal.querySelector('.modal-close');
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

    // Lien vers le site
    if (project.visit) {
        const visitLink = document.createElement('a');
        visitLink.href = project.visit;
        visitLink.target = '_blank';
        visitLink.rel = 'noopener noreferrer';
        visitLink.className = 'btn btn-visit';
        visitLink.textContent = 'Voir le projet';
        visitLink.setAttribute('aria-label', `Visiter le site ou le code du projet ${project.title}`);
        modalContent.appendChild(visitLink);
    }

    // Description
    const desc = document.createElement('p');
    desc.innerHTML = `<strong>Description :</strong> ${project.description}`;
    modalContent.appendChild(desc);

    // Problèmes rencontrés
    if (project.problems) {
        const problems = document.createElement('p');
        problems.innerHTML = `<strong>Problématiques rencontrées :</strong> ${project.problems}`;
        modalContent.appendChild(problems);
    }

    // Compétences développées
    if (project.skills) {
        const skills = document.createElement('p');
        skills.innerHTML = `<strong>Compétences développées :</strong> ${project.skills}`;
        modalContent.appendChild(skills);
    }

    // Lien
    if (project.link && project.link !== "[à ajouter]") {
        const link = document.createElement('p');
        link.innerHTML = `<strong>Lien :</strong> <a href="${project.link}" target="_blank">${project.link}</a>`;
        modalContent.appendChild(link);
    }

    // Technologies
    const techTitle = document.createElement('h4');
    techTitle.textContent = "Technologies utilisées";
    modalContent.appendChild(techTitle);

    const techContainer = document.createElement('div');
    techContainer.classList.add('modal-tech-icons');

    if (project.technologies) {
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.innerHTML = `<i class="${tech.icon}"></i><small>${tech.name}</small>`;
            techContainer.appendChild(span);
        });
    }

    modalContent.appendChild(techContainer);

    // Images
if (project.images) {
    project.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || `Aperçu de ${project.title}`;
        modalContent.appendChild(img);
    });
}
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

// Fermer la modale en cliquant sur l'arrière-plan
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.setAttribute('hidden', true);
    }
});

// Année dynamique
document.getElementById('year').textContent = new Date().getFullYear();

// EmailJS
let lastSubmitTime = 0; // Variable pour limiter les envois rapides

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < 5000) { // 5 secondes d'intervalle minimum
        alert("Veuillez patienter avant de renvoyer le formulaire.");
        return;
    }
    lastSubmitTime = now;

    // Honeypot anti-bot
    const honeypot = document.getElementById('honeypot');
    if (honeypot && honeypot.value.trim() !== "") {
        console.warn("Bot détecté !");
        return; // Stop l'envoi
    }

    emailjs.sendForm('service_aan0wzc', 'template_y8qgj4c', this, '0YitJV__S0yeF_WVu')
        .then(() => {
            alert('Message envoyé !');
            this.reset();
        }, (err) => {
            alert('Erreur : ' + JSON.stringify(err));
        });
});
