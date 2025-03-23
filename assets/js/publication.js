document.addEventListener("DOMContentLoaded", function () {
    // Fetch data and populate the blog posts
    fetch('./data/publications.json')
        .then(response => response.json())
        .then(data => {
            // Trier les publications par date (du plus récent au plus ancien)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const blogPostsList = document.querySelector('.publications-posts-list');
            blogPostsList.innerHTML = ''; // Clear existing content

            data.forEach(publication => {
                const postItem = document.createElement('li');
                postItem.classList.add('blog-post-item');
                postItem.setAttribute('data-category', publication.category);

                postItem.innerHTML = `
                    <a href="${publication.link}" target="_blank">
                        <figure class="blog-banner-box">
                            <img src="${publication.image}" alt="${publication.title}" loading="lazy">
                        </figure>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <p class="blog-category">${publication.category}</p>
                                <span class="dot"></span>
                                <time datetime="${publication.date}">${new Date(publication.date).toDateString()}</time>
                            </div>
                            <h3 class="h3 blog-item-title">${publication.title}</h3>
                            <p class="blog-text">${publication.description}</p>
                        </div>
                    </a>
                `;

                blogPostsList.appendChild(postItem);
            });

            // Filtering logic
            const filterButtons = document.querySelectorAll('.filter-btn');
            const blogPosts = document.querySelectorAll('.blog-post-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');

                    blogPosts.forEach(post => {
                        if (category === 'all' || post.getAttribute('data-category') === category) {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    });

                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement des publications:', error));
});

// Code pour filtrer les articles de blog (déplacé à l'intérieur de la fonction DOMContentLoaded)
