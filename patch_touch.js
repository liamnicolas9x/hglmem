const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Lightbox CSS to support smoother zooming and overflow
const oldLightboxCss = `#lightbox img{max-width:90%;max-height:90%}`;
const newLightboxCss = `#lightbox { touch-action: none; }
#lightbox .img-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
#lightbox img { max-width: 90%; max-height: 90%; transition: transform 0.1s ease-out; cursor: grab; user-select: none; }`;

html = html.replace(oldLightboxCss, newLightboxCss);

// 2. Add Touch Handling logic for Swipe and Pinch-to-zoom
const touchLogic = `
let touchStartX = 0;
let initialPinchDist = 0;
let currentScale = 1;
let lastScale = 1;

const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');

lb.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
  } else if (e.touches.length === 2) {
    initialPinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
}, { passive: true });

lb.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    currentScale = Math.min(Math.max(lastScale * (dist / initialPinchDist), 1), 5);
    lbImg.style.transform = \`scale(\${currentScale})\`;
  }
}, { passive: false });

lb.addEventListener('touchend', e => {
  if (e.touches.length === 0) {
    lastScale = currentScale;
    
    // Swipe logic
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50 && currentScale === 1) {
      if (diff > 0) navigateLightbox(1);
      else navigateLightbox(-1);
    }
  }
});

// Reset scale when opening new image
function resetLightboxScale() {
  currentScale = 1;
  lastScale = 1;
  lbImg.style.transform = 'scale(1)';
}

// Modify openLightbox and openSingleLightbox to call reset
`;

// Insert the touch logic and update open functions
html = html.replace('function openLightbox(i){', touchLogic + '\nfunction openLightbox(i){ resetLightboxScale();');
html = html.replace('function openSingleLightbox(url){', 'function openSingleLightbox(url){ resetLightboxScale();');

// Also update the HTML for lightbox to have the container
html = html.replace('<img id="lbImg">', '<div class="img-container"><img id="lbImg"></div>');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Added swipe and pinch-to-zoom functionality to lightbox.");
