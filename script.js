/* ============================================
   Diego Peribañez Villalba — Script
   Data + Render + Scroll + Interactive
   ============================================ */

const artworks = [
    {
        id: "pilar",
        title: "Pilar",
        category: "Escultura",
        medium: "Modelado en barro, copia resina acrílica",
        tall: 111,
        wide: 34,
        depth: 23,
        image: "images/Pilar.jpeg",
        description: "Modelado en barro, copia resina acrílica. 111x34x23cm",
        showInGallery: true,
        contests: [{ name: "Modelado en barro, copia resina acrílica - 111x34x23cm", url: "" }]
    },
    {
        id: "teruel-1966",
        title: "Teruel 1966",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        tall: 195,
        wide: 130,
        image: "images/Teruel_1966.jpeg",
        description: "Óleo sobre lienzo. 130x195cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre lienzo - 130x195cm", url: "" }]
    },
    {
        id: "malaga-1971",
        title: "Málaga 1971",
        category: "Pintura",
        medium: "Óleo sobre tabla",
        tall: 73,
        wide: 63,
        image: "images/malaga_1971.jpeg",
        description: "Óleo sobre tabla. 63x73cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre tabla - 63x73cm", url: "" }]
    },
    {
        id: "chus",
        title: "Chus",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        tall: 195,
        wide: 114,
        image: "images/Chus.jpeg",
        description: "Óleo sobre lienzo. 114x195cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre lienzo - 114x195cm", url: "" }]
    },
    {
        id: "barcelona-1950",
        title: "Barcelona 1950",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        tall: 92,
        wide: 73,
        image: "images/Barcelona_1950.jpeg",
        description: "Óleo sobre lienzo. 73x92cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre lienzo - 73x92cm", url: "" }]
    },
    {
        id: "elena-y-su-circunstancia",
        title: "Elena y su circunstancia",
        category: "Pintura",
        medium: "Óleo sobre tabla",
        tall: 73,
        wide: 62,
        image: "images/Elena_y_su_circunstancia.jpeg",
        description: "Óleo sobre tabla. 62x73cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre tabla - 62x73cm", url: "" }]
    },
    {
        id: "kore",
        title: "Koré",
        category: "Escultura",
        medium: "Talla en madera policromada",
        tall: 164,
        wide: 48,
        depth: 30,
        image: "images/kore.jpeg",
        description: "Talla en madera policromada. 164x48x30cm",
        showInGallery: true,
        contests: [{ name: "Talla en madera policromada - 164x48x30cm", url: "" }]
    },
    {
        id: "reflejo-de-un-matrimonio",
        title: "Reflejo de un matrimonio",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        tall: 130,
        wide: 81,
        image: "images/Reflejo_de_un matrimonio.jpeg",
        description: "Óleo sobre lienzo. 81x130cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre lienzo - 81x130cm", url: "" }]
    },
    {
        id: "padre",
        title: "Padre",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        tall: 81,
        wide: 130,
        image: "images/padre.jpeg",
        description: "Óleo sobre lienzo. 130x81cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre lienzo - 130x81cm", url: "" }]
    },
    {
        id: "calle-las-barcas-valencia",
        title: "Calle las barcas, Valencia",
        category: "Pintura",
        medium: "Óleo sobre lienzo",
        tall: 108,
        wide: 99,
        image: "images/CalleLasbarcas_Valencia.jpeg",
        description: "Óleo sobre lienzo. 99x108cm",
        showInGallery: true,
        contests: [{ name: "Óleo sobre lienzo - 99x108cm", url: "" }]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // ---- Global Modal Logic ---- //
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    const openModal = (work) => {
        if (!work || !modal || !modalImg) return;
        modal.style.display = "flex";
        modal.classList.add('show');
        modalImg.src = work.image;

        let details = work.medium;

        // Dynamically build the dimensions string from the new data structure
        let hasDimensions = work.tall && work.wide;
        if (hasDimensions) {
            let dimString = `${work.tall}x${work.wide}`;
            if (work.depth) dimString += `x${work.depth}`; // Add depth if it's a sculpture
            dimString += 'cm';

            details += ` - <span class="hoverable-dimensions">${dimString}</span>`;
        }

        captionText.innerHTML = `<span class="modal-title">${work.title}</span><br><span class="modal-details">${details}</span>`;
        document.body.style.overflow = 'hidden';

        // Hide floating back button
        document.querySelectorAll('.floating-back-btn').forEach(btn => btn.classList.add('hidden'));

        // --- Measurement Interaction Logic ---
        const dimSpan = captionText.querySelector('.hoverable-dimensions');
        const wrapper = document.querySelector('.modal-img-wrapper');
        const widthLine = document.getElementById('measure-width');
        const heightLine = document.getElementById('measure-height');

        if (dimSpan && wrapper && hasDimensions) {
            // Width line gets wide, height line gets tall
            if (heightLine) heightLine.querySelector('.measure-val').textContent = `${work.tall} cm`;
            if (widthLine) widthLine.querySelector('.measure-val').textContent = `${work.wide} cm`;

            dimSpan.addEventListener('mouseenter', () => {
                wrapper.classList.add('show-measures');
            });
            dimSpan.addEventListener('mouseleave', () => {
                wrapper.classList.remove('show-measures');
            });
        }
    };

    const closeModal = () => {
        if (!modal) return;
        modal.style.display = "none";
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scroll

        // Show floating back button
        document.querySelectorAll('.floating-back-btn').forEach(btn => btn.classList.remove('hidden'));
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeModal(); });
    }

    // Modal click delegation for dynamic elements
    document.addEventListener('click', (e) => {
        // Gallery items
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const id = galleryItem.getAttribute('data-id');
            const work = artworks.find(w => w.id === id);
            openModal(work);
            return;
        }
        // CV Timeline items
        const timelineWork = e.target.closest('.clickable-work');
        if (timelineWork) {
            const id = timelineWork.getAttribute('data-id');
            const work = artworks.find(w => w.id === id);
            openModal(work);
            return;
        }
        // CV Scrollytelling images
        const cvImg = e.target.closest('.cv-image-wrapper');
        if (cvImg) {
            // Find index from id (img-X)
            const index = cvImg.id.split('-')[1];
            // We need access to the entries array here... 
            // Better to use data-id like the others or handle it in the listener below.
        }
        // Collage items
        const collageItem = e.target.closest('.collage-item');
        if (collageItem) {
            const id = collageItem.getAttribute('data-id');
            const work = artworks.find(w => w.id === id);
            if (work) openModal(work);
            return;
        }
    });


    // ---- Render CV Timeline ---- //
    const cvTimeline = document.getElementById('cv-timeline');
    if (cvTimeline) {
        // Collect all entries: if showInGallery is true, include it. 
        // If it has contests, flatten them. If not, include it once with empty contest info.
        const entries = artworks
            .filter(work => work.showInGallery)
            .flatMap(work => {
                if (!work.contests || work.contests.length === 0) {
                    return [{ name: "", url: "", work }];
                }
                return work.contests.map(c => ({ ...c, work }));
            });

        const timelineHTML = entries.map(entry => {
            const contestInfo = entry.name;
            const contestDisplay = entry.url
                ? `<a href="${entry.url}" target="_blank" rel="noopener" class="timeline-link">${contestInfo}</a>`
                : contestInfo;

            return `
                <div class="timeline-item fade-in">
                    <div class="timeline-work clickable-work" data-id="${entry.work.id}">${entry.work.title.toUpperCase()}</div>
                    <div class="timeline-dot"></div>
                    <div class="timeline-info">${contestDisplay}</div>
                </div>
            `;
        }).join('');
        cvTimeline.innerHTML = `<div class="timeline-line"></div>${timelineHTML}`;
    }

    // ---- Scroll Carousel (obra-sel.html) ---- //
    const mainContainer = document.getElementById('main-container');
    const thumbList = document.getElementById('thumb-list');

    if (mainContainer && thumbList) {
        const galleryWorks = artworks.filter(w => w.showInGallery);
        const N = galleryWorks.length;
        const THUMB_HEIGHT = 60;
        const sections = [];

        galleryWorks.forEach((work, i) => {
            const section = document.createElement('div');
            section.className = 'main-image-section';

            let textSizeClass = 'large-text';
            if (work.title.length > 20) textSizeClass = 'small-text';
            else if (work.title.length > 12) textSizeClass = 'medium-text';

            section.innerHTML = `
                <div class="main-image-wrapper">
                    <div class="collage-item" data-id="${work.id}">
                        <img src="${work.image}" alt="${work.title}" loading="${i < 3 ? 'eager' : 'lazy'}">
                        <div class="collage-overlay">
                            <div class="text-mask"><span class="${textSizeClass}">${work.title}</span></div>
                            <div class="text-mask"><span class="style-text">${work.medium}</span></div>
                        </div>
                    </div>
                </div>`;
            mainContainer.appendChild(section);
            sections.push(section);

            // Sidebar thumbnail
            const thumbContainer = document.createElement('div');
            thumbContainer.className = 'sidebar-thumb-container';
            thumbContainer.onclick = () => {
                // Scroll to exact offset of this section
                mainContainer.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            };

            const thumb = document.createElement('img');
            thumb.className = 'sidebar-thumb';
            thumb.src = work.image;
            thumb.alt = work.title;
            thumb.loading = 'lazy';

            thumbContainer.appendChild(thumb);
            thumbList.appendChild(thumbContainer);
        });

        const thumbs = document.querySelectorAll('.sidebar-thumb');
        const thumbHovered = new Array(galleryWorks.length).fill(false);

        // Hover: colorize thumbnail on hover (no scale change)
        document.querySelectorAll('.sidebar-thumb-container').forEach((container, i) => {
            container.addEventListener('mouseenter', () => {
                thumbHovered[i] = true;
                thumbs[i].style.filter = 'grayscale(0%)';
                thumbs[i].style.opacity = 1;
            });
            container.addEventListener('mouseleave', () => {
                thumbHovered[i] = false;
                // Let next scroll update restore the correct style
                updateCarouselEffects();
            });
        });

        function getScrollIndex() {
            const scrollTop = mainContainer.scrollTop;
            const viewportH = mainContainer.clientHeight;

            // Simple: find which section the scroll position maps to
            // Each section starts at its offsetTop; we measure progress
            // from one section's top to the next section's top
            for (let i = sections.length - 1; i >= 0; i--) {
                const secTop = sections[i].offsetTop;
                if (scrollTop >= secTop || i === 0) {
                    if (i === sections.length - 1) return i;
                    const nextTop = sections[i + 1].offsetTop;
                    const span = nextTop - secTop;
                    const progress = (scrollTop - secTop) / span;
                    return i + Math.min(1, Math.max(0, progress));
                }
            }
            return 0;
        }

        function updateCarouselEffects() {
            const scrollIndex = getScrollIndex();
            const viewportH = mainContainer.clientHeight;

            // Visual effects on thumbnails — use actual dimensions for layout push
            const thumbContainers = document.querySelectorAll('.sidebar-thumb-container');

            thumbs.forEach((thumb, i) => {
                const distance = Math.abs(i - scrollIndex);
                let grayscale = 100;
                let opacity = 1;

                // Size interpolation: base 60×79, active +25% → 75×99
                const minW = 60, maxW = 75;
                const minH = 79, maxH = 99;
                let w = minW, h = minH;

                if (distance < 1) {
                    const progress = 1 - distance;
                    w = minW + ((maxW - minW) * progress);
                    h = minH + ((maxH - minH) * progress);
                    grayscale = 100 - (100 * progress);
                }

                thumb.style.width = `${w}px`;
                thumb.style.height = `${h}px`;

                // Don't override filter if hovered
                if (!thumbHovered[i]) {
                    thumb.style.filter = `grayscale(${grayscale}%)`;
                    thumb.style.opacity = opacity;
                }

                // Container height matches thumb + small padding
                const containerH = h + 6;
                thumbContainers[i].style.height = `${containerH}px`;
            });

            // Reposition thumbnail list so active thumb is centered
            let activeOffset = 0;
            for (let i = 0; i < Math.floor(scrollIndex); i++) {
                activeOffset += parseFloat(thumbContainers[i].style.height);
            }
            const frac = scrollIndex - Math.floor(scrollIndex);
            const currentContainerH = parseFloat(thumbContainers[Math.floor(scrollIndex)]?.style.height || 48);
            activeOffset += frac * currentContainerH + currentContainerH / 2;

            const listOffset = (viewportH / 2) - activeOffset;
            thumbList.style.transform = `translateY(${listOffset}px)`;
        }

        mainContainer.addEventListener('scroll', updateCarouselEffects);
        window.addEventListener('resize', updateCarouselEffects);

        // Initial update
        requestAnimationFrame(() => {
            updateCarouselEffects();
        });
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


    // ---- Navbar background and Hero Parallax on scroll ---- //
    const nav = document.getElementById('main-nav');
    const hero = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const heroTint = document.querySelector('.hero-scroll-tint');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
        
        // Add scrolled class after passing hero section (minus a small offset)
        if (scrollY > (heroHeight - 80)) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hero Parallax Effect
        if (heroContent && heroTint) {
            // Disable CSS transitions on scroll so it updates instantly without lag/scaling issues
            heroContent.style.transition = 'none';

            // Progress from 0 (top) to 1 (bottom of hero)
            let progress = scrollY / heroHeight;
            progress = Math.max(0, Math.min(1, progress));
            
            // Fade out the text (fully transparent at ~66% scrolled)
            const textOpacity = 1 - (progress * 1.5);
            heroContent.style.opacity = Math.max(0, textOpacity);
            
            // Optional slight parallax shift upwards for text
            heroContent.style.transform = `translateY(${progress * -20}px)`;

            // Fade in the black tint (caps at 0.85 opacity max for deep shadow)
            const tintOpacity = progress * 0.85;
            heroTint.style.opacity = tintOpacity;
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

});

