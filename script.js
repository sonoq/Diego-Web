/* ============================================
   Diego Peribañez Villalba — Script
   Scroll animations + mobile nav + navbar bg
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Fade-in on scroll (IntersectionObserver) ---- //
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly for elements in the same viewport
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));


    // ---- Navbar background on scroll ---- //
    const nav = document.getElementById('main-nav');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on load


    // ---- Mobile nav toggle ---- //
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });


    // ---- Smooth scroll for anchor links ---- //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 70; // account for fixed nav
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Gallery Carousel ---- //
    const galleryCarousel = document.getElementById('gallery-carousel');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');

    if (galleryCarousel && btnPrev && btnNext) {
        const getScrollAmount = () => {
            const item = galleryCarousel.querySelector('.gallery-item');
            if (!item) return 0;
            const gap = parseInt(window.getComputedStyle(galleryCarousel).gap) || 0;
            return item.offsetWidth + gap;
        };

        btnNext.addEventListener('click', () => {
            galleryCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            galleryCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // ---- Image Modal (Lightbox) ---- //
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-image-wrapper');

    if (modal && modalImg && captionText) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    modal.style.display = "flex";
                    modal.classList.add('show');
                    modalImg.src = img.src;
                    captionText.innerHTML = img.alt;
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scroll
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on background click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === "flex") {
                closeModal();
            }
        });
    }

});
