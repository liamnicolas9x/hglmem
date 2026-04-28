const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Revert Lightbox CSS
const newLightboxCss = `#lightbox { touch-action: none; }
#lightbox .img-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
#lightbox img { max-width: 90%; max-height: 90%; transition: transform 0.1s ease-out; cursor: grab; user-select: none; }`;
const oldLightboxCss = `#lightbox img{max-width:90%;max-height:90%}`;

if (html.includes(newLightboxCss)) {
    html = html.replace(newLightboxCss, oldLightboxCss);
    // Also remove the extra #lightbox { touch-action: none; } if it's there
    html = html.replace('#lightbox { touch-action: none; }', '');
}

// 2. Revert HTML structure for lightbox
html = html.replace('<div class="img-container"><img id="lbImg"></div>', '<img id="lbImg">');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Reverted CSS and HTML structure for lightbox.");
