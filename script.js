/* ==========================================
   PAINTING DATA COLLECTION
   ========================================== */
const paintings = [
    {
        id: 1,
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: "1503",
        period: "Renaissance",
        description: "Lukisan minyak di atas panel kayu poplar ini terkenal di seluruh dunia karena senyum misterius subjeknya serta teknik sfumato yang revolusioner tanpa garis batas yang jelas. Lukisan ini menggambarkan Lisa Gherardini, istri seorang pedagang Florence bernama Francesco del Giocondo.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/800px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg"
    },
    {
        id: 2,
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        year: "1889",
        period: "Post-Impressionism",
        description: "Dilukis dari kamar suaka di Saint-Rémy-de-Provence saat fajar menyingsing, mahakarya ini merepresentasikan pandangan idealis dari jendela kamarnya. Kombinasi sapuan kuas yang dinamis, pusaran langit malam, dan pohon cemara yang menjulang mencerminkan gejolak emosi senimannya.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
    },
    {
        id: 3,
        title: "The Birth of Venus",
        artist: "Sandro Botticelli",
        year: "1485",
        period: "Renaissance",
        description: "Menggambarkan dewi Venus yang baru lahir tiba di daratan pantai setelah bangkit dari lautan. Karya monumental era Early Renaissance ini memancarkan keanggunan klasik dengan komposisi dewa angin Zephyrus dan Chloris yang meniup sang dewi ke pantai.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_de_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_de_Venere_-_Google_Art_Project_-_edited.jpg"
    },
    {
        id: 4,
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        year: "1665",
        period: "Baroque",
        description: "Sering dijuluki sebagai 'Mona Lisa dari Utara', lukisan tronie (studi kepala) ini menampilkan seorang gadis misterius dengan sorot mata menawan dan anting mutiara besar yang ikonik di atas latar belakang gelap gulita yang dramatis.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg"
    },
    {
        id: 5,
        title: "The Great Wave off Kanagawa",
        artist: "Katsushika Hokusai",
        year: "1831",
        period: "Romanticism",
        description: "Cetak blok kayu ukiyo-e paling terkenal di dunia karya Hokusai. Menggambarkan ombak besar yang mengancam perahu nelayan di lepas pantai Kanagawa dengan latar belakang Gunung Fuji yang tampak kecil namun tetap kokoh berdiri.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg"
    },
    {
        id: 6,
        title: "The Creation of Adam",
        artist: "Michelangelo",
        year: "1512",
        period: "Renaissance",
        description: "Bagian dari mahakarya fresko langit-langit Kapel Sistina di Vatikan. Adegan ikonik ini mengabadikan momen sentuh hampir bersentuhan antara tangan Allah dan tangan Adam, menyimbolkan penciptaan kehidupan dan percikan ilahi manusia.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg"
    }
];

/* ==========================================
   DOM ELEMENTS & APP STATE
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Smooth lagging follower
            setTimeout(() => {
                follower.style.left = `${e.clientX}px`;
                follower.style.top = `${e.clientY}px`;
            }, 50);
        });
    }

    // Header Scroll Effect & Back to Top
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Favorites State (Stored in sessionStorage)
    let favorites = JSON.parse(sessionStorage.getItem('aurelia_favs')) || [];

    // Render Gallery Cards
    const galleryGrid = document.getElementById('gallery-grid');
    const favCountSpan = document.getElementById('fav-count');

    function updateFavCount() {
        favCountSpan.textContent = favorites.length;
    }
    updateFavCount();

    function renderGallery(items) {
        galleryGrid.innerHTML = '';
        if (items.length === 0) {
            galleryGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem 0;">Tidak ada lukisan yang ditemukan.</p>`;
            return;
        }

        items.forEach(painting => {
            const isFav = favorites.includes(painting.id);
            const card = document.createElement('div');
            card.classList.add('gallery-card', 'reveal');
            card.setAttribute('data-period', painting.period);
            
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${painting.image}" alt="${painting.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'">
                    <div class="card-overlay">
                        <div class="card-actions">
                            <button class="card-btn card-view-btn" data-id="${painting.id}"><i class="fa-solid fa-eye"></i> Detail</button>
                            <button class="card-btn card-fav-btn ${isFav ? 'favorited' : ''}" data-id="${painting.id}">
                                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <span class="card-tag">${painting.period}</span>
                    <h3 class="card-title">${painting.title}</h3>
                    <p class="card-artist">${painting.artist}</p>
                    <div class="card-footer">
                        <span>${painting.year}</span>
                        <span>Mahakarya</span>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(card);
        });

        initReveal();
        attachCardEvents();
    }

    renderGallery(paintings);

    // Search and Filter Functionality
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';
    let searchQuery = '';

    function filterPaintings() {
        let filtered = paintings.filter(p => {
            const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 p.artist.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPeriod = currentFilter === 'all' || p.period === currentFilter;
            return matchesQuery && matchesPeriod;
        });
        renderGallery(filtered);
    }

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        filterPaintings();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterPaintings();
        });
    });

    // Modal Details & Lightbox Handlers
    const detailModal = document.getElementById('detail-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalPeriod = document.getElementById('modal-period');
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const modalYear = document.getElementById('modal-year');
    const modalDesc = document.getElementById('modal-desc');
    const modalFavBtn = document.getElementById('modal-fav-btn');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    let activeModalPaintingId = null;

    function attachCardEvents() {
        // View Details
        document.querySelectorAll('.card-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const painting = paintings.find(p => p.id === id);
                if (painting) {
                    activeModalPaintingId = painting.id;
                    modalImg.src = painting.image;
                    modalPeriod.textContent = painting.period;
                    modalTitle.textContent = painting.title;
                    modalArtist.textContent = painting.artist;
                    modalYear.textContent = `Tahun Pembuatan: ${painting.year}`;
                    modalDesc.textContent = painting.description;
                    
                    updateModalFavButtonState();
                    detailModal.classList.add('open');
                }
            });
        });

        // Toggle Favorite from Card
        document.querySelectorAll('.card-fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                toggleFavorite(id);
            });
        });

        // Click image to open Lightbox
        document.querySelectorAll('.card-img-wrapper img').forEach(img => {
            img.addEventListener('click', (e) => {
                lightboxImg.src = e.currentTarget.src;
                lightbox.classList.add('open');
            });
        });
    }

    function toggleFavorite(id) {
        const index = favorites.indexOf(id);
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(id);
        }
        sessionStorage.setItem('aurelia_favs', JSON.stringify(favorites));
        updateFavCount();
        filterPaintings();
        if (activeModalPaintingId === id) {
            updateModalFavButtonState();
        }
    }

    function updateModalFavButtonState() {
        const isFav = favorites.includes(activeModalPaintingId);
        if (isFav) {
            modalFavBtn.innerHTML = `<i class="fa-solid fa-heart" style="color: #e74c3c;"></i> Remove from Favorites`;
        } else {
            modalFavBtn.innerHTML = `<i class="fa-regular fa-heart"></i> Add to Favorites`;
        }
    }

    modalFavBtn.addEventListener('click', () => {
        if (activeModalPaintingId !== null) {
            toggleFavorite(activeModalPaintingId);
        }
    });

    modalClose.addEventListener('click', () => {
        detailModal.classList.remove('open');
    });

    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('open');
        }
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
        }
    });

    // Favorites Filter Toggle
    const favoritesBtn = document.getElementById('favorites-btn');
    let showingFavoritesOnly = false;

    favoritesBtn.addEventListener('click', () => {
        showingFavoritesOnly = !showingFavoritesOnly;
        if (showingFavoritesOnly) {
            favoritesBtn.style.borderColor = 'var(--accent-gold)';
            favoritesBtn.style.color = 'var(--accent-gold)';
            const favItems = paintings.filter(p => favorites.includes(p.id));
            renderGallery(favItems);
        } else {
            favoritesBtn.style.borderColor = 'var(--border-color)';
            favoritesBtn.style.color = 'var(--text-primary)';
            filterPaintings();
        }
    });

    // Intersection Observer for Reveal Animations
    function initReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax Effect on Hero Background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', () => {
            let scrollOffset = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrollOffset * 0.35}px) scale(1.05)`;
        });
    }
});
