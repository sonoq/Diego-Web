/* ============================================
   Diego PeribaÃ±ez Villalba â€” Script
   Data + Render + Scroll + Interactive
   ============================================ */

const artworks = [
    {
        id: "pilar",
        title: "Pilar",
        category: "Escultura",
        medium: "Modelado en barro, copia resina acrÃ­lica",
        tall: 111,
        wide: 34,
        depth: 23,
        image: "images/Pilar.jpeg",
        description: "Modelado en barro, copia resina acrÃ­lica. 111x34x23cm",
        showInGallery: true,
        contests: [{ name: "Modelado en barro, copia resina acrÃ­lica - 111x34x23cm", url: "" }]
    },
    {
        id: "teruel-1966",
        title: "Teruel 1966",
        category: "Pintura",
        medium: "Ã“leo sobre lienzo",
        tall: 130,
        wide: 195,
        image: "images/Teruel_1966.jpeg",
        description: "Ã“leo sobre lienzo. 130x195cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre lienzo - 130x195cm", url: "" }]
    },
    {
        id: "malaga-1971",
        title: "MÃ¡laga 1971",
        category: "Pintura",
        medium: "Ã“leo sobre tabla",
        tall: 63,
        wide: 73,
        image: "images/malaga_1971.jpeg",
        description: "Ã“leo sobre tabla. 63x73cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre tabla - 63x73cm", url: "" }]
    },
    {
        id: "chus",
        title: "Chus",
        category: "Pintura",
        medium: "Ã“leo sobre lienzo",
        tall: 114,
        wide: 195,
        image: "images/Chus.jpeg",
        description: "Ã“leo sobre lienzo. 114x195cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre lienzo - 114x195cm", url: "" }]
    },
    {
        id: "barcelona-1950",
        title: "Barcelona 1950",
        category: "Pintura",
        medium: "Ã“leo sobre lienzo",
        tall: 73,
        wide: 92,
        image: "images/Barcelona_1950.jpeg",
        description: "Ã“leo sobre lienzo. 73x92cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre lienzo - 73x92cm", url: "" }]
    },
    {
        id: "elena-y-su-circunstancia",
        title: "Elena y su circunstancia",
        category: "Pintura",
        medium: "Ã“leo sobre tabla",
        tall: 62,
        wide: 73,
        image: "images/Elena_y_su_circunstancia.jpeg",
        description: "Ã“leo sobre tabla. 62x73cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre tabla - 62x73cm", url: "" }]
    },
    {
        id: "kore",
        title: "KorÃ©",
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
        medium: "Ã“leo sobre lienzo",
        tall: 81,
        wide: 130,
        image: "images/Reflejo_de_un matrimonio.jpeg",
        description: "Ã“leo sobre lienzo. 81x130cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre lienzo - 81x130cm", url: "" }]
    },
    {
        id: "padre",
        title: "Padre",
        category: "Pintura",
        medium: "Ã“leo sobre lienzo",
        tall: 130,
        wide: 81,
        image: "images/padre.jpeg",
        description: "Ã“leo sobre lienzo. 130x81cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre lienzo - 130x81cm", url: "" }]
    },
    {
        id: "calle-las-barcas-valencia",
        title: "Calle las barcas, Valencia",
        category: "Pintura",
        medium: "Ã“leo sobre lienzo",
        tall: 99,
        wide: 108,
        image: "images/CalleLasbarcas_Valencia.jpeg",
        description: "Ã“leo sobre lienzo. 99x108cm",
        showInGallery: true,
        contests: [{ name: "Ã“leo sobre lienzo - 99x108cm", url: "" }]
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

        captionText.innerHTML = `<span class="modal-title">"${work.title}"</span><br><span class="modal-details">${details}</span>`;
        document.body.style.overflow = 'hidden'; 
        
        // --- Measurement Interaction Logic ---
        const dimSpan = captionText.querySelector('.hoverable-dimensions');
        const wrapper = document.querySelector('.modal-img-wrapper');
        const widthLine = document.getElementById('measure-width');
        const heightLine = document.getElementById('measure-height');

        if (dimSpan && wrapper && hasDimensions) {
            // Swap values to fix inversion: heightLine (vertical) -> wide, widthLine (horizontal) -> tall
            if (heightLine) heightLine.querySelector('.measure-val').textContent = `${work.wide} cm`;
            if (widthLine) widthLine.querySelector('.measure-val').textContent = `${work.tall} cm`;

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
                    <div class="timeline-work clickable-work" data-id="${entry.work.id}">"${entry.work.title.toUpperCase()}"</div>
                    <div class="timeline-dot"></div>
                    <div class="timeline-info">${contestDisplay}</div>
                </div>
            `;
        }).join('');
        cvTimeline.innerHTML = `<div class="timeline-line"></div>${timelineHTML}`;
    }

    // ---- CV Scrollytelling Implementation ---- //
    const cvWrapper = document.getElementById('cv-wrapper');
    const cvImageCol = document.getElementById('cv-image-col');
    const cvMenu = document.getElementById('cv-menu');

    if (cvWrapper && cvImageCol && cvMenu) {
        const entries = artworks
            .filter(work => work.showInGallery)
            .flatMap(work => {
                if (!work.contests || work.contests.length === 0) {
                    return [{ name: "", url: "", work }];
                }
                return work.contests.map(c => ({ ...c, work }));
            });

        let currentIndex = -1;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let isMouseOverCol = false;

        const apply3DHover = (el, x, y) => {
            if (!el) return;
            const colRect = cvImageCol.getBoundingClientRect();
            // Standardize coordinates relative to the container
            const rotateX = ((y - (colRect.height / 2)) / (colRect.height / 2)) * -12;
            const rotateY = ((x - (colRect.width / 2)) / (colRect.width / 2)) * 12;
            el.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        // Set wrapper height
        const stepHeight = window.innerHeight; // 100% of viewport height per entry
        cvWrapper.style.height = `${(entries.length * stepHeight) + 80}px`;

        // Generate DOM Elements
        entries.forEach((entry, index) => {
            // Image Wrapper
            const imgDiv = document.createElement('div');
            imgDiv.className = `cv-image-wrapper`;
            imgDiv.id = `img-${index}`;
            imgDiv.innerHTML = `<img src="${entry.work.image}" alt="${entry.work.title}" loading="${index === 0 ? 'eager' : 'lazy'}">`;
            imgDiv.addEventListener('click', () => {
                openModal(entry.work);
            });
            cvImageCol.appendChild(imgDiv);

            // Menu Entry
            const contestLink = entry.url ? `<a href="${entry.url}" target="_blank" rel="noopener">${entry.name}</a>` : entry.name;
            const textDiv = document.createElement('div');
            textDiv.className = `cv-entry`;
            textDiv.id = `entry-${index}`;
            textDiv.innerHTML = `
                <div class="cv-dot"></div>
                <div class="cv-entry-content">
                    <div class="cv-title-group">
                        <h2 class="cv-work-title">"${entry.work.title}"</h2>
                    </div>
                    <div class="cv-details">
                        <div class="cv-contest">${contestLink}</div>
                    </div>
                </div>
            `;
            textDiv.addEventListener('click', () => {
                const targetScroll = cvWrapper.offsetTop + (index * stepHeight);
                window.scrollTo({ top: targetScroll, behavior: 'instant' });
            });
            cvMenu.appendChild(textDiv);
        });

        const updateCVUI = (index) => {
            if (index === currentIndex) return;
            currentIndex = index;

            document.querySelectorAll('.cv-entry').forEach((el, i) => el.classList.toggle('active', i === index));
            document.querySelectorAll('.cv-image-wrapper').forEach((el, i) => {
                el.classList.toggle('active', i === index);
                if (i !== index) {
                    el.style.transform = '';
                    el.style.transition = '';
                }
            });

            const activeEntry = document.getElementById(`entry-${index}`);
            if (activeEntry) {
                const textCol = document.getElementById('cv-text-col');
                const colHeight = textCol.clientHeight;

                // Calculate position to center the entry ANCHOR (title line)
                // We use 38px as the fixed anchor point (matches CSS dot position)
                const anchorPoint = activeEntry.offsetTop + 38;
                const translateY = (colHeight / 2) - anchorPoint;

                cvMenu.style.transform = `translateY(${translateY}px)`;

                // RE-TRIGGER HOVER if mouse is inside
                if (isMouseOverCol) {
                    const newActive = document.querySelector('.cv-image-wrapper.active');
                    if (newActive) {
                        // Apply with a slight transition to avoid jumps during scroll
                        newActive.style.transition = 'transform 0.4s ease-out';
                        apply3DHover(newActive, lastMouseX, lastMouseY);
                    }
                }
            }
        };

        window.addEventListener('scroll', () => {
            const rect = cvWrapper.getBoundingClientRect();
            let scrolledInside = -rect.top + 80;
            if (scrolledInside < 0) scrolledInside = 0;

            let newIndex = Math.round(scrolledInside / stepHeight);
            newIndex = Math.max(0, Math.min(entries.length - 1, newIndex));
            updateCVUI(newIndex);
        }, { passive: true });

        // 3D Hover Effect
        if (window.innerWidth > 968) {
            let hoverTimeout;
            cvImageCol.addEventListener('mouseenter', () => {
                isMouseOverCol = true;
                const active = document.querySelector('.cv-image-wrapper.active');
                if (!active) return;
                active.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    const activeNow = document.querySelector('.cv-image-wrapper.active');
                    if (activeNow) activeNow.style.transition = 'transform 0.15s ease-out';
                }, 800);
            });

            cvImageCol.addEventListener('mousemove', (e) => {
                const colRect = cvImageCol.getBoundingClientRect();
                lastMouseX = e.clientX - colRect.left;
                lastMouseY = e.clientY - colRect.top;

                const active = document.querySelector('.cv-image-wrapper.active');
                if (!active) return;
                apply3DHover(active, lastMouseX, lastMouseY);
            });

            cvImageCol.addEventListener('mouseleave', () => {
                isMouseOverCol = false;
                const active = document.querySelector('.cv-image-wrapper.active');
                if (!active) return;
                active.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                active.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
            });
        }

        // Initial trigger
        window.dispatchEvent(new Event('scroll'));
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

    // (Modal logic moved to top of DOMContentLoaded)

});

