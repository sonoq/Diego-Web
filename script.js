/* ============================================
   Diego Peribañez Villalba — Script
   Content loader + Scroll animations + mobile nav + navbar bg
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {

    // ============================================
    // ---- Load content from datos.json ---- //
    // ============================================
    async function loadContent() {
        try {
            const response = await fetch('./datos.json');
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const data = await response.json();

            // -- Meta --
            document.title = data.meta.title;
            const metaDesc = document.querySelector('meta[data-content="meta-description"]');
            if (metaDesc) metaDesc.setAttribute('content', data.meta.description);

            // -- Hero --
            const heroImage = document.querySelector('[data-content="hero-image"]');
            if (heroImage) {
                heroImage.src = data.hero.imageSrc;
                heroImage.alt = data.hero.imageAlt;
            }
            setText('[data-content="hero-subtitle"]', data.hero.subtitle);
            setHTML('[data-content="hero-title"]', data.hero.titleHTML);
            setText('[data-content="hero-tagline"]', data.hero.tagline);
            const heroCta = document.querySelector('[data-content="hero-cta"]');
            if (heroCta) {
                heroCta.textContent = data.hero.cta;
                heroCta.href = data.hero.ctaHref;
            }

            // -- Sobre mí --
            setText('[data-content="sobre-mi-title"]', data.sobreMi.title);
            const sobreImage = document.querySelector('[data-content="sobre-mi-image"]');
            if (sobreImage) {
                sobreImage.src = data.sobreMi.imageSrc;
                sobreImage.alt = data.sobreMi.imageAlt;
            }
            const parasContainer = document.querySelector('[data-content="sobre-mi-paragraphs"]');
            if (parasContainer) {
                parasContainer.innerHTML = data.sobreMi.paragraphs
                    .map(p => `<p>${p}</p>`)
                    .join('');
            }

            // -- Galería --
            setText('[data-content="galeria-title"]', data.galeria.title);
            setText('[data-content="galeria-quote"]', data.galeria.quote);
            const galleryCarousel = document.getElementById('gallery-carousel');
            if (galleryCarousel) {
                galleryCarousel.innerHTML = data.galeria.items.map(item => `
                    <div class="gallery-item fade-in">
                        <div class="gallery-image-wrapper">
                            <img src="${item.src}" alt="${item.alt}" loading="lazy">
                            <div class="gallery-overlay">
                                <span class="gallery-label">${item.label}</span>
                                <span class="gallery-year">${item.year}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // -- Contacto --
            setText('[data-content="contacto-title"]', data.contacto.title);
            setText('[data-content="contacto-intro"]', data.contacto.intro);
            const emailLink = document.querySelector('[data-content="contacto-email"]');
            if (emailLink) {
                emailLink.textContent = data.contacto.email;
                emailLink.href = `mailto:${data.contacto.email}`;
            }
            setText('[data-content="contacto-estudio"]', data.contacto.estudio);

        } catch (err) {
            console.error('Error al cargar datos.json:', err);
        }
    }

    // Helpers
    function setText(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    }
    function setHTML(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = value;
    }

    // Load content first, then initialise everything else
    await loadContent();


    // ============================================
    // ---- Fade-in on scroll (IntersectionObserver) ---- //
    // ============================================
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
    handleScroll(); // run on load


    // ============================================
    // ---- Mobile nav toggle ---- //
    // ============================================
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
                const offset = 70; // account for fixed nav
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
        const scrollWaitTime = 500; // time in ms to block new clicks while animating

        const scrollNext = () => {
            if (isScrolling) return;
            isScrolling = true;

            const items = galleryCarousel.querySelectorAll('.gallery-item');
            if (items.length === 0) {
                isScrolling = false;
                return;
            }

            // Get width to scroll + gap
            const scrollAmount = items[0].offsetWidth + (parseInt(window.getComputedStyle(galleryCarousel).gap) || 0);

            // Smoothly scroll
            galleryCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // After transition, take the first child and append it to the end to create infinite loops
            setTimeout(() => {
                galleryCarousel.appendChild(items[0]);
                // Instantly adjust scroll position back so it feels seamless
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

            // Get width to scroll + gap
            const scrollAmount = items[0].offsetWidth + (parseInt(window.getComputedStyle(galleryCarousel).gap) || 0);

            // Take the last child and prepend it to the start
            const lastItem = items[items.length - 1];
            galleryCarousel.prepend(lastItem);

            // Instantly offset scroll so the current view doesn't jump
            galleryCarousel.scrollBy({ left: scrollAmount, behavior: 'instant' });

            // Ensure reflow happens before animating back
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
        // Use event delegation so dynamically inserted gallery items are covered
        document.getElementById('gallery-carousel').addEventListener('click', (e) => {
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

        // Close on background click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

});
