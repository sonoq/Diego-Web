/* ============================================
   Diego Peribañez Villalba — Script
   Data + Render + Scroll + Interactive
   ============================================ */

const artworks = [
    {
        id: "kore",
        title: "Koré",
        category: "Escultura",
        medium: "Madera de tilo policromada",
        image: "images/kore.png",
        description: "Escultura en madera de tilo policromada.",
        showInGallery: true,
        contests: [{ name: "Premio Reina Sofía", year: 2025 }]
    },
    {
        id: "retrato",
        title: "Retrato",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        image: "images/retrato.jpg",
        description: "Óleo sobre lienzo.",
        showInGallery: true,
        contests: [{ name: "Premio Reina Sofía", year: 2024 }]
    },
    {
        id: "busto",
        title: "Busto en arcilla",
        category: "Escultura",
        medium: "Estudio volumétrico",
        image: "images/busto.png",
        description: "Busto — Escultura en arcilla.",
        showInGallery: true,
        contests: []
    },
    {
        id: "padre",
        title: "Padre",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        image: "images/padre.jpg",
        description: "Óleo sobre lienzo.",
        showInGallery: true,
        contests: [{ name: "Concurso II", year: 2024 }]
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // ---- Render Gallery ---- //
    const galleryCarousel = document.getElementById('gallery-carousel');
    if (galleryCarousel) {
        const galleryHTML = artworks
            .filter(work => work.showInGallery)
            .map(work => `
                <div class="gallery-item fade-in" data-id="${work.id}">
                    <div class="gallery-image-wrapper">
                        <img src="${work.image}" alt="${work.title} — ${work.medium}" loading="lazy">
                        <div class="gallery-overlay">
                            <span class="gallery-label">${work.title}</span>
                            <span class="gallery-year">${work.medium}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        galleryCarousel.innerHTML = galleryHTML;
    }

    // ---- Render CV Timeline ---- //
    const cvTimeline = document.getElementById('cv-timeline');
    if (cvTimeline) {
        // Collect all contest entries and flatten them
        const entries = artworks
            .filter(work => work.contests && work.contests.length > 0)
            .flatMap(work => work.contests.map(c => ({ ...c, work })))
            .sort((a, b) => b.year - a.year); // Descending by year

        const timelineHTML = entries.map(entry => `
            <div class="timeline-item fade-in">
                <div class="timeline-work clickable-work" data-id="${entry.work.id}">${entry.work.title.toUpperCase()}</div>
                <div class="timeline-dot"></div>
                <div class="timeline-info">${entry.name} - ${entry.year}</div>
            </div>
        `).join('');
        cvTimeline.innerHTML = `<div class="timeline-line"></div>${timelineHTML}`;
    }

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
    const hero = document.getElementById('hero');

    const handleScroll = () => {
        const heroHeight = hero ? hero.offsetHeight : 60;
        // Add scrolled class after passing hero section (minus a small offset)
        if (window.scrollY > (heroHeight - 80)) {
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

    if (toggle && navLinks) {
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
    }


    // ---- Smooth scroll for anchor links ---- //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            // Only handle if it's an internal link on the SAME page
            if (href.startsWith('#')) {
                e.preventDefault();
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
            }
        });
    });

    // ---- Circular Gallery Carousel ---- //
    // Re-select because it was injected dynamically or doesn't exist on all pages
    const galleryCarouselContainer = document.getElementById('gallery-carousel');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');

    if (galleryCarouselContainer && btnPrev && btnNext) {
        let isScrolling = false;
        const scrollWaitTime = 500; // time in ms to block new clicks while animating

        const scrollNext = () => {
            if (isScrolling) return;
            isScrolling = true;

            const items = galleryCarouselContainer.querySelectorAll('.gallery-item');
            if (items.length === 0) {
                isScrolling = false;
                return;
            }

            // Get width to scroll + gap
            const scrollAmount = items[0].offsetWidth + (parseInt(window.getComputedStyle(galleryCarouselContainer).gap) || 0);

            // Smoothly scroll
            galleryCarouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // After transition, take the first child and append it to the end to create infinite loops
            setTimeout(() => {
                galleryCarouselContainer.appendChild(items[0]);
                // Instantly adjust scroll position back so it feels seamless
                galleryCarouselContainer.scrollBy({ left: -scrollAmount, behavior: 'instant' });
                isScrolling = false;
            }, scrollWaitTime);
        };

        const scrollPrev = () => {
            if (isScrolling) return;
            isScrolling = true;

            const items = galleryCarouselContainer.querySelectorAll('.gallery-item');
            if (items.length === 0) {
                isScrolling = false;
                return;
            }

            // Get width to scroll + gap
            const scrollAmount = items[0].offsetWidth + (parseInt(window.getComputedStyle(galleryCarouselContainer).gap) || 0);

            // Take the last child and prepend it to the start
            const lastItem = items[items.length - 1];
            galleryCarouselContainer.prepend(lastItem);

            // Instantly offset scroll so the current view doesn't jump
            galleryCarouselContainer.scrollBy({ left: scrollAmount, behavior: 'instant' });

            // Ensure reflow happens before animating back
            requestAnimationFrame(() => {
                galleryCarouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                setTimeout(() => {
                    isScrolling = false;
                }, scrollWaitTime);
            });
        };

        btnNext.addEventListener('click', scrollNext);
        btnPrev.addEventListener('click', scrollPrev);
    }

    // ---- Image Modal (Lightbox) ---- //
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    if (modal && modalImg && captionText) {

        const openModal = (work) => {
            if (!work) return;
            modal.style.display = "flex";
            modal.classList.add('show');
            modalImg.src = work.image;
            captionText.innerHTML = `${work.title} — ${work.medium}`;
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        };

        // Delegate click events for gallery items (since they are dynamic)
        document.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const id = item.getAttribute('data-id');
                const work = artworks.find(w => w.id === id);
                openModal(work);
            }
            
            // Handle timeline clicks
            const timelineWork = e.target.closest('.clickable-work');
            if (timelineWork) {
                const id = timelineWork.getAttribute('data-id');
                const work = artworks.find(w => w.id === id);
                openModal(work);
            }
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
