// Fullscreen Modal Script
const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImage = document.getElementById('fullscreenImage');
const closeBtn = document.querySelector('.fullscreen-close');
const triggers = document.querySelectorAll('.fullscreen-trigger');

triggers.forEach(img => {
    img.addEventListener('click', function () {
        fullscreenImage.src = this.src;
        fullscreenModal.style.display = 'flex';
        fullscreenModal.setAttribute('aria-hidden', 'false');
    });
});

const closeModal = () => {
    fullscreenModal.style.display = 'none';
    fullscreenModal.setAttribute('aria-hidden', 'true');
};

closeBtn.addEventListener('click', closeModal);
fullscreenModal.addEventListener('click', function (e) {
    if (e.target === fullscreenModal) {
        closeModal();
    }
});

// Live Clock and Date Script
// Optimized: Use simpler date/time formatting to avoid expensive locale operations
// Cache formatted time to reduce DOM reflows
let lastFormattedDate = '';
let lastFormattedTime = '';

function updateDateTime() {
    const now = new Date();
    
    // Optimize date formatting - avoid expensive toLocaleDateString
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    
    // Optimize time formatting - use faster alternative to toLocaleTimeString
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Only update DOM if values changed (reduces layout thrashing)
    if (formattedDate !== lastFormattedDate) {
        document.getElementById('current-date').innerText = formattedDate;
        lastFormattedDate = formattedDate;
    }
    
    if (formattedTime !== lastFormattedTime) {
        document.getElementById('current-time').innerText = formattedTime;
        lastFormattedTime = formattedTime;
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);


// bg video
// --- FIX: Video Refresh & Playback Fixer ---
const bgVideo = document.getElementById('bgVideo');

// 1. Force Play on Page Load / Refresh
function guaranteeAutoplay() {
    bgVideo.muted = true; // Browser bypass ke liye load par hamesha mute rakhein

    const playPromise = bgVideo.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Video started successfully on refresh.");
        }).catch(error => {
            console.log("Autoplay prevented by browser, retrying on first document click...", error);
            // Agar browser phir bhi block kare, to screen par kahin bhi pehle click par video live ho jayega
            document.body.addEventListener('click', () => {
                bgVideo.play();
            }, { once: true });
        });
    }
}

// Page refresh hote hi loop execute hoga
window.addEventListener('DOMContentLoaded', guaranteeAutoplay);
window.addEventListener('load', guaranteeAutoplay);

// for certificates
document.getElementById('starLink').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    var certificatesDiv = document.getElementById('certificates');
    certificatesDiv.classList.toggle('highlighted');
});
// for photos
document.getElementById('cameraLink').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    var projectsDiv = document.getElementById('projects');
    projectsDiv.classList.toggle('highlighted');
});

document.getElementById('briefcaseLink').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    var projectsDiv = document.getElementById('lang');
    projectsDiv.classList.toggle('highlighted');
});

document.getElementById('homeLink').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    var projectsDiv = document.getElementById('home');
    projectsDiv.classList.toggle('highlighted');
});

// for hide border
// Apne highlighted element ko select karein
const highlightedWidget = document.querySelector('.widget-tile.language.highlighted');

if (highlightedWidget) {
    // Exactly 10000 milliseconds (10 seconds) baad class remove ho jayegi
    setTimeout(() => {
        highlightedWidget.classList.remove('highlighted');
    }, 10000);
}

// for mobile scroll view
document.querySelectorAll('.link-item').forEach(link => {
    link.addEventListener('click', function (e) {
        const isMobile = window.innerWidth <= 767.98;
        if (!isMobile) return;

        const targetSelector = this.dataset.target || this.getAttribute('href');
        if (!targetSelector || !targetSelector.startsWith('#')) return;

        const targetEl = document.querySelector(targetSelector);
        if (!targetEl) return;

        e.preventDefault();

        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });

        targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        document.querySelectorAll('.link-item').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});
