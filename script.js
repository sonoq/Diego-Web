/* ============================================
   Diego Peribañez Villalba — Script
   Scroll animations + mobile nav + navbar bg + Gallery logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // ---- Fade-in on scroll ---- //
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly
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


    // ============================================
    // ---- Navbar background on scroll ---- //
    // ============================================
    const nav = document.getElementById('main-nav');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    // ============================================
    // ---- Mobile nav toggle ---- //
    // ============================================
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }


    // ============================================
    // ---- Smooth scroll for anchor links ---- //
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // ============================================
    // ---- Circular Gallery Carousel ---- //
    // ============================================
    const galleryCarousel = document.getElementById('gallery-carousel');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');

    if (galleryCarousel && btnPrev && btnNext) {
        let isScrolling = false;
        const scrollWaitTime = 500;

        const scrollNext = () => {
            if (isScrolling) return;
            isScrolling = true;

            const items = galleryCarousel.querySelectorAll('.gallery-item');
            if (items.length === 0) {
                isScrolling = false;
                return;
            }

            const scrollAmount = items[0].offsetWidth + (parseInt(window.getComputedStyle(galleryCarousel).gap) || 0);
            galleryCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            setTimeout(() => {
                galleryCarousel.appendChild(items[0]);
                galleryCarousel.scrollBy({ left: -scrollAmount, behavior: 'instant' });
                isScrolling = false;
            }, scrollWaitTime);
        };

        const scrollPrev = () => {
            if (isScrolling) return;
            isScrolling = true;

            const items = galleryCarousel.querySelectorAll('.gallery-item');
            if (items.length === 0) {
                isScrolling = false;
                return;
            }

            const scrollAmount = items[0].offsetWidth + (parseInt(window.getComputedStyle(galleryCarousel).gap) || 0);
            const lastItem = items[items.length - 1];
            galleryCarousel.prepend(lastItem);
            galleryCarousel.scrollBy({ left: scrollAmount, behavior: 'instant' });

            requestAnimationFrame(() => {
                galleryCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                setTimeout(() => {
                    isScrolling = false;
                }, scrollWaitTime);
            });
        };

        btnNext.addEventListener('click', scrollNext);
        btnPrev.addEventListener('click', scrollPrev);
    }


    // ============================================
    // ---- Image Modal (Lightbox) ---- //
    // ============================================
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    if (modal && modalImg && captionText) {
        // Event delegation to handle items rendered by Jekyll
        document.body.addEventListener('click', (e) => {
            const wrapper = e.target.closest('.gallery-image-wrapper');
            if (!wrapper) return;

            const img = wrapper.querySelector('img');
            if (img) {
                modal.style.display = 'flex';
                modal.classList.add('show');
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
                document.body.style.overflow = 'hidden';
            }
        });

        const closeModal = () => {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
        });
    }

});
