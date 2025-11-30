// Sample wallpaper data
const wallpapers = [
    {
        id: 1,
        title: "Aurora Borealis",
        category: "nature",
        resolution: "1920x1080",
        poster: "assets/posters/aurora.jpg",
        thumbnail: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        videoUrl: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    },
    {
        id: 2,
        title: "Cosmic Waves",
        category: "abstract",
        resolution: "2560x1440",
        poster: "assets/posters/cosmic_waves.jpg",
        thumbnail: "https://archive.org/download/ElephantsDream/ed_hd.mp4",
        videoUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    },
    {
        id: 3,
        title: "Galaxy Spiral",
        category: "space",
        resolution: "3840x2160",
        poster: "assets/posters/galaxy_spiral.jpg",
        thumbnail: "https://archive.org/download/Sintel/sintel-2048-surround.mp4",
        videoUrl: "https://archive.org/download/Sintel/sintel-2048-surround.mp4"
    },
    {
        id: 4,
        title: "Ocean Waves",
        category: "nature",
        resolution: "1920x1080",
        poster: "assets/posters/ocean_waves.jpg",
        thumbnail: "https://archive.org/download/spring-5400/spring-5400_512kb.mp4",
        videoUrl: "https://archive.org/download/spring-5400/spring-5400_512kb.mp4"
    },
    {
        id: 5,
        title: "Fluid Gradient",
        category: "abstract",
        resolution: "2560x1440",
        poster: "assets/posters/fluid_gradient.jpg",
        thumbnail: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        videoUrl: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    },
    {
        id: 6,
        title: "Minimal Geometry",
        category: "minimal",
        resolution: "1920x1080",
        poster: "assets/posters/minimal_geometry.jpg",
        thumbnail: "https://archive.org/download/ElephantsDream/ed_hd.mp4",
        videoUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    },
    {
        id: 7,
        title: "Nebula Dream",
        category: "space",
        resolution: "3840x2160",
        poster: "assets/posters/nebula_dream.jpg",
        thumbnail: "https://archive.org/download/Sintel/sintel-2048-surround.mp4",
        videoUrl: "https://archive.org/download/Sintel/sintel-2048-surround.mp4"
    },
    {
        id: 8,
        title: "Forest Rain",
        category: "nature",
        resolution: "2560x1440",
        poster: "assets/posters/forest_rain.jpg",
        thumbnail: "https://archive.org/download/spring-5400/spring-5400_512kb.mp4",
        videoUrl: "https://archive.org/download/spring-5400/spring-5400_512kb.mp4"
    },
    {
        id: 9,
        title: "Particle Flow",
        category: "abstract",
        resolution: "1920x1080",
        poster: "assets/posters/particle_flow.jpg",
        thumbnail: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        videoUrl: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    },
    {
        id: 10,
        title: "Anime City Night",
        category: "anime",
        resolution: "1920x1080",
        poster: "assets/posters/anime_city_night.jpg",
        thumbnail: "https://archive.org/download/ElephantsDream/ed_hd.mp4",
        videoUrl: "https://archive.org/download/ElephantsDream/ed_hd.mp4"
    },
    {
        id: 11,
        title: "Sakura Dreams",
        category: "anime",
        resolution: "2560x1440",
        poster: "assets/posters/sakura_dreams.jpg",
        thumbnail: "https://archive.org/download/Sintel/sintel-2048-surround.mp4",
        videoUrl: "https://archive.org/download/Sintel/sintel-2048-surround.mp4"
    },
    {
        id: 12,
        title: "Neon Tokyo",
        category: "anime",
        resolution: "3840x2160",
        poster: "assets/posters/neon_tokyo.jpg",
        thumbnail: "https://archive.org/download/spring-5400/spring-5400_512kb.mp4",
        videoUrl: "https://archive.org/download/spring-5400/spring-5400_512kb.mp4"
    },
    {
        id: 13,
        title: "Dragon Ball",
        category: "anime",
        resolution: "1920x1080",
        poster: "assets/posters/dragon_ball_frame3.jpg",
        thumbnail: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        videoUrl: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    }
];

function createWallpaperCard(wallpaper) {
    const card = document.createElement('div');
    card.className = 'wallpaper-card';
    card.setAttribute('data-category', wallpaper.category);

    const posterSrc = wallpaper.poster || 'assets/logo.jpg';
    const posterAttr = `poster='${posterSrc}'`;

    card.innerHTML = `
        <div class="wallpaper-thumbnail">
            <video ${posterAttr} muted playsinline preload="none" data-src="${wallpaper.thumbnail}" loop crossorigin="anonymous" referrerpolicy="no-referrer"></video>
        </div>
        <div class="wallpaper-info">
            <h3>${wallpaper.title}</h3>
            <span class="wallpaper-category">${wallpaper.category}</span>
            <p class="wallpaper-resolution">${wallpaper.resolution}</p>
        </div>
    `;

    card.addEventListener('click', () => openModal(wallpaper));
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    renderWallpapers(wallpapers);
    setupEventListeners();
    initBgVideo();
    initWallpaperLazyPlayback();
});

function initWallpaperLazyPlayback() {
    const cards = document.querySelectorAll('.wallpaper-card video');
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all
        cards.forEach(v => {
            const src = v.getAttribute('data-src');
            if (src) {
                const sourceEl = document.createElement('source');
                sourceEl.src = src;
                sourceEl.type = 'video/mp4';
                v.appendChild(sourceEl);
                v.load();
                v.play().catch(()=>{});
            }
        });
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (!video.dataset.loaded) {
                    const src = video.getAttribute('data-src');
                    if (src) {
                        const sourceEl = document.createElement('source');
                        sourceEl.src = src;
                        sourceEl.type = 'video/mp4';
                        video.appendChild(sourceEl);
                        video.dataset.loaded = 'true';
                        video.load();
                    }
                }
                video.play().catch(()=>{});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });
    cards.forEach(v => observer.observe(v));
}

// DOM Elements
const wallpaperGrid = document.getElementById('wallpaperGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('previewModal');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalResolution = document.getElementById('modalResolution');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = document.querySelector('.close');
const bgVideo = document.getElementById('bgVideo');

let currentFilter = 'all';
let currentWallpaper = null;

// Initialize

// Render wallpapers
function renderWallpapers(wallpapersToRender) {
    wallpaperGrid.innerHTML = '';
    
    wallpapersToRender.forEach(wallpaper => {
        const card = createWallpaperCard(wallpaper);
        wallpaperGrid.appendChild(card);
    });
}


// Filter wallpapers
function filterWallpapers(category) {
    currentFilter = category;
    
    const base = category === 'all' ? wallpapers : wallpapers.filter(w => w.category === category);
    const term = (searchInput?.value || '').trim().toLowerCase();
    const filteredBySearch = term
        ? base.filter(w => w.title.toLowerCase().includes(term) || w.category.toLowerCase().includes(term))
        : base;
    renderWallpapers(filteredBySearch);
}

// Open modal
function openModal(wallpaper) {
    currentWallpaper = wallpaper;
    
    // Clear previous video
    modalVideo.pause();
    modalVideo.innerHTML = '';
    modalVideo.removeAttribute('src');

    // Ensure safe attributes for remote playback
    try {
        modalVideo.setAttribute('crossorigin', 'anonymous');
        modalVideo.setAttribute('referrerpolicy', 'no-referrer');
        modalVideo.muted = true; // allow reliable autoplay
        modalVideo.autoplay = true;
    } catch (_) {}
    
    modalTitle.textContent = wallpaper.title;
    modalCategory.textContent = `Category: ${wallpaper.category}`;
    modalResolution.textContent = `Resolution: ${wallpaper.resolution}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Set video source directly
    modalVideo.src = wallpaper.videoUrl;
    
    // Add error handler with diagnostics and graceful guidance
    modalVideo.onerror = function() {
        const mediaErr = modalVideo.error?.code;
        console.error('Video loading error. MediaError code:', mediaErr, 'src:', wallpaper.videoUrl);
        alert('Unable to load video. The video URL may block embeds or your network is restricting it. Use the Download button to open directly.');
    };
    
    // Load and play when ready
    const attemptPlay = () => {
        const p = modalVideo.play();
        if (p && typeof p.then === 'function') {
            p.catch(err => {
                console.log('Autoplay prevented. Use the play button.', err);
            });
        }
    };

    modalVideo.addEventListener('canplay', attemptPlay, { once: true });
    modalVideo.load();
    // Fallback attempt after a brief delay
    setTimeout(attemptPlay, 400);
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.innerHTML = '';
    modalVideo.removeAttribute('src');
    currentWallpaper = null;
    document.body.style.overflow = 'auto';
}

// Download wallpaper
function downloadWallpaper() {
    if (!currentWallpaper) return;
    
    const link = document.createElement('a');
    link.href = currentWallpaper.videoUrl;
    link.download = `${currentWallpaper.title.replace(/\s+/g, '_')}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download notification
    showNotification('Download started!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterWallpapers(btn.getAttribute('data-filter'));
        });
    });
    
    // Modal close
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Download button
    downloadBtn.addEventListener('click', downloadWallpaper);
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', () => filterWallpapers(currentFilter));
    }
}

// Initialize background video playback speed and autoplay handling
function initBgVideo() {
    if (!bgVideo) return;
    // Reduce playback speed for calmer motion
    try { bgVideo.playbackRate = 0.6; } catch (e) {}
    // Ensure autoplay on some mobile browsers
    const play = () => {
        const p = bgVideo.play();
        if (p && typeof p.then === 'function') {
            p.catch(() => { /* ignore autoplay block */ });
        }
    };
    bgVideo.muted = true;
    play();
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { bgVideo.pause(); } else { play(); }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
