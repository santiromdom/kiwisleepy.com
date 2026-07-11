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

// ==================== INTERNATIONALIZATION (i18n) ====================
function translatePage(lang) {
    if (typeof translations === 'undefined') return;
    
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            elem.innerHTML = translations[lang][key];
        }
    });

    // Translate href links (like legal page links)
    document.querySelectorAll('[data-i18n-href]').forEach(elem => {
        const key = elem.getAttribute('data-i18n-href');
        if (translations[lang] && translations[lang][key]) {
            elem.setAttribute('href', translations[lang][key]);
        }
    });

    // Translate metadata
    if (translations[lang]) {
        if (translations[lang]['meta.title']) {
            document.title = translations[lang]['meta.title'];
        }
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations[lang]['meta.description']) {
            metaDesc.setAttribute('content', translations[lang]['meta.description']);
        }
    }

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
}

function changeLanguage(lang) {
    // Smooth transition
    document.body.style.opacity = '0';
    setTimeout(() => {
        translatePage(lang);
        
        // Update active class on buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Persist language choice
        localStorage.setItem('preferred-lang', lang);
        
        // Fade back in
        document.body.style.opacity = '1';
    }, 150);
}

// Check current page filename
function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

// Redirect logic for legal pages
function handleLegalPageRedirect(lang) {
    const currentPage = getCurrentPage();
    let targetPage = '';

    if (currentPage === 'politica-de-privacidad.html' && lang === 'en') {
        targetPage = 'privacy-policy.html';
    } else if (currentPage === 'privacy-policy.html' && lang === 'es') {
        targetPage = 'politica-de-privacidad.html';
    } else if (currentPage === 'terminos-y-condiciones.html' && lang === 'en') {
        targetPage = 'terms-and-conditions.html';
    } else if (currentPage === 'terms-and-conditions.html' && lang === 'es') {
        targetPage = 'terminos-y-condiciones.html';
    }

    if (targetPage) {
        window.location.href = targetPage;
        return true;
    }
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detect language
    let lang = localStorage.getItem('preferred-lang');
    
    if (!lang) {
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        if (browserLang.startsWith('en')) {
            lang = 'en';
        } else {
            lang = 'es'; // Default is Spanish
        }
    }

    // If current page is a legal page, check if we need to redirect right away
    const currentPage = getCurrentPage();
    const isLegalPage = ['politica-de-privacidad.html', 'privacy-policy.html', 'terminos-y-condiciones.html', 'terms-and-conditions.html'].includes(currentPage);
    
    if (isLegalPage) {
        // Correct static page language based on preferences
        if (currentPage === 'politica-de-privacidad.html' && lang === 'en') {
            window.location.replace('privacy-policy.html');
            return;
        } else if (currentPage === 'privacy-policy.html' && lang === 'es') {
            window.location.replace('politica-de-privacidad.html');
            return;
        } else if (currentPage === 'terminos-y-condiciones.html' && lang === 'en') {
            window.location.replace('terms-and-conditions.html');
            return;
        } else if (currentPage === 'terms-and-conditions.html' && lang === 'es') {
            window.location.replace('terminos-y-condiciones.html');
            return;
        }
    }

    // 2. Translate index page dynamically
    if (!isLegalPage) {
        translatePage(lang);
    }

    // 3. Set up click listeners and active state for switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        
        // Active class setting
        if (btnLang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', (e) => {
            const selectedLang = e.currentTarget.getAttribute('data-lang');
            if (selectedLang !== localStorage.getItem('preferred-lang')) {
                // If it's a legal page, redirect instead of translating dynamically
                if (isLegalPage) {
                    localStorage.setItem('preferred-lang', selectedLang);
                    handleLegalPageRedirect(selectedLang);
                } else {
                    changeLanguage(selectedLang);
                }
            }
        });
    });
});

