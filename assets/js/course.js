fetch('./data/courses.json')
    .then(response => response.json())
    .then(data => {
        const courseList = document.querySelector('.cours-list');
        courseList.innerHTML = ''; // Clear existing content

        data.forEach(course => {
            const courseItem = document.createElement('li');
            courseItem.classList.add('project-item', 'active');
            courseItem.setAttribute('data-filter-item', '');
            courseItem.setAttribute('data-category', course.category);

            courseItem.innerHTML = `
        <a href="${course.file}" download>
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="arrow-down-circle-outline"></ion-icon>
            </div>
            <img src="${course.image}" alt="${course.title}" loading="lazy">
          </figure>
          <h3 class="project-title">${course.title}</h3>
          <p class="project-category">${course.category}</p>
        </a>
      `;

            courseList.appendChild(courseItem);
        });
    });

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const courseList = document.querySelector('.cours-list');

    // Fonction pour filtrer les cours
    function filterCourses(category) {
        const courses = courseList.querySelectorAll('li.project-item');

        courses.forEach(course => {
            const courseCategory = course.getAttribute('data-category');
            if (category === 'Tous' || courseCategory === category) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    }

    // Ajout d'événements de clic pour chaque bouton de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Retirer la classe 'active' de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe 'active' au bouton cliqué
            this.classList.add('active');

            const selectedCategory = this.textContent.trim();
            filterCourses(selectedCategory);
        });
    });

    // Si vous avez un select dropdown pour les filtres
    const selectItems = document.querySelectorAll('[data-select-item]');
    const selectValue = document.querySelector('[data-selecct-value]');

    selectItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedCategory = this.textContent.trim();
            filterCourses(selectedCategory);
            selectValue.textContent = selectedCategory;
        });
    });
});

