document.addEventListener("DOMContentLoaded", function () {
    // Charger les données depuis le fichier JSON
    fetch('./data/doctorants.json')
        .then(response => response.json())
        .then(data => {
            const testimonialsContainer = document.getElementById('testimonials-container');
            testimonialsContainer.innerHTML = ''; // Vider le conteneur initialement

            data.forEach(testimonial => {
                const card = document.createElement('div');
                card.classList.add('card', 'swiper-slide');
                card.setAttribute('data-testimonials-item', '');

                card.innerHTML = `
                    <div class="content-img">
                        <span class="overlay"></span>
                        <div class="card-img">
                            <img src="${testimonial.image}" data-testimonials-avatar alt="User Image" class="card-image">
                        </div>
                    </div>
                    <div class="content-box">
                        <div class="name-linkedin">
                            <h2 class="username" data-testimonials-title>${testimonial.name}</h2>
                            <a href="${testimonial.linkedin}" target="_blank"><i class='bx bxl-linkedin'></i></a>
                        </div>
                        <p style="display: none" data-testimonials-text-hidden>${testimonial.profession}</p>
                        <p class="user-profession" data-testimonials-text>${testimonial.profession.substring(0,30)}</p>
                    </div>
                `;


                testimonialsContainer.appendChild(card);

            });



            // Ajouter les événements de clic pour ouvrir la modale après avoir ajouté les doctorants
            const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
            const modalContainer = document.querySelector("[data-modal-container]");
            const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
            const overlay = document.querySelector("[data-overlay]");

            // Variables de la modale
            const modalImg = document.querySelector("[data-modal-img]");
            const modalTitle = document.querySelector("[data-modal-title]");
            const modalText = document.querySelector("[data-modal-text]");

            // Fonction de bascule de la modale
            const testimonialsModalFunc = function () {
                modalContainer.classList.toggle("active");
                overlay.classList.toggle("active");
            };

            // Ajout d'un événement de clic à tous les éléments de la modale (pour les doctorants)
            testimonialsItem.forEach(item => {
                item.addEventListener("click", function () {
                    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
                    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
                    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
                    modalText.innerHTML = this.querySelector("[data-testimonials-text-hidden]").innerHTML;
                    testimonialsModalFunc();
                });
            });

            // Ajout d'un événement de clic au bouton de fermeture de la modale
            modalCloseBtn.addEventListener("click", testimonialsModalFunc);
            overlay.addEventListener("click", testimonialsModalFunc);

        })
        .catch(error => console.error('Erreur lors du chargement des témoignages:', error));
});
