// ==================== MENÚ HAMBURGUESA ====================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-menu');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
});

// ==================== ANIMACIONES AL SCROLL ====================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .banner-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== SMOOTH SCROLL PARA NAVEGACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==================== SCROLL REVEAL PARA NAV ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ==================== GALERÍA INTERACTIVA ====================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ==================== MODAL PARA IMÁGENES ====================
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage && imgElement) {
        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Cerrar modal al presionar Escape o click en fondo
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target.classList.contains('modal-close')) {
                closeModal();
            }
        });
    }
});
