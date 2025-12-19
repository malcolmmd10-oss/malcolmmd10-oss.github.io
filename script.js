let currentScreen = 0;
let musicStarted = false;
let photoRevealed = false;
const screens = document.querySelectorAll('.screen');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Set up audio source from config
const audioSource = document.createElement('source');
audioSource.src = CONFIG.MUSIC_URL;
audioSource.type = 'audio/mpeg';
bgMusic.appendChild(audioSource);

// Navigation menu toggle
function toggleNavMenu() {
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('nav-overlay') || createNavOverlay();
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

function createNavOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.className = 'nav-overlay';
    overlay.onclick = toggleNavMenu;
    document.body.appendChild(overlay);
    return overlay;
}

// Jump to a specific screen
function jumpToScreen(screenIndex) {
    if (screenIndex < 0 || screenIndex >= screens.length) return;
    
    screens[currentScreen].classList.remove('active');
    currentScreen = screenIndex;
    screens[currentScreen].classList.add('active');
    
    updateNavigation();
    
    // Always close menu when navigating
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('nav-overlay');
    navMenu.classList.remove('active');
    if (navOverlay) {
        navOverlay.classList.remove('active');
    }
    
    // Reset photo reveal if jumping to different screen
    if (screenIndex !== 3) {
        photoRevealed = false;
    }
}

// Previous screen
function previousScreen() {
    if (currentScreen > 0) {
        jumpToScreen(currentScreen - 1);
    }
}

// Update navigation UI
function updateNavigation() {
    // Update progress dots
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentScreen);
    });
    
    // Update nav menu items
    document.querySelectorAll('.nav-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === currentScreen);
    });
}

// Heart tap to start
document.getElementById('heartTap').addEventListener('click', function() {
    startExperience();
});

// Initialize navigation
updateNavigation();

// Start music and advance
function startExperience() {
    if (!musicStarted) {
        bgMusic.volume = CONFIG.MUSIC_VOLUME;
        bgMusic.play().catch(err => console.log('Audio play failed:', err));
        musicStarted = true;
        musicToggle.classList.add('playing');
    }
    nextScreen();
}

// Navigate to next screen
function nextScreen() {
    if (currentScreen < screens.length - 1) {
        jumpToScreen(currentScreen + 1);
    }
}

// Photo reveal function
function revealPhoto() {
    if (!photoRevealed) {
        const photoImage = document.getElementById('photoImage');
        const photoHint = document.querySelector('.photo-hint');
        const photoCaption = document.getElementById('photoCaption');
        const photoBtn = document.getElementById('photoBtn');
        
        photoImage.classList.remove('photo-blur');
        photoImage.classList.add('photo-clear');
        photoHint.style.opacity = '0';
        setTimeout(() => {
            photoHint.style.display = 'none';
        }, 300);
        
        photoCaption.style.display = 'block';
        photoBtn.style.display = 'block';
        photoRevealed = true;
    }
}

// Open WhatsApp with prefilled message
function openWhatsApp() {
    const message = encodeURIComponent("Hihi");
    const phoneNumber = "+60109507802"; // Change this to the actual phone number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Close quietly
function closeQuietly() {
    screens[currentScreen].classList.remove('active');
    fadeOutMusic();
    setTimeout(() => {
        showGoodbye();
    }, 1000);
}

// Goodbye message
function showGoodbye() {
    const goodbyeScreen = document.createElement('div');
    goodbyeScreen.className = 'screen active';
    goodbyeScreen.style.background = 'linear-gradient(180deg, #fff5f9 0%, #f5e6f0 100%)';
    goodbyeScreen.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 30px;">
            <p style="font-size: 15px; line-height: 1.8; color: #7a6a7a; max-width: 320px; font-style: italic;">
                Jaga diri Jess.<br><br>You're valued. 🤍
            </p>
            <button class="btn" onclick="finalClose()">Goodbye</button>
        </div>
    `;
    
    document.querySelector('.container').innerHTML = '';
    document.querySelector('.container').appendChild(goodbyeScreen);
}

// Final close
function finalClose() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-out';
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Fade out music
function fadeOutMusic() {
    let vol = CONFIG.MUSIC_VOLUME;
    const fadeOut = setInterval(() => {
        if (vol > 0) {
            vol -= 0.02;
            bgMusic.volume = Math.max(0, vol);
        } else {
            bgMusic.pause();
            clearInterval(fadeOut);
        }
    }, 50);
}

// Music toggle
musicToggle.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    }
});
