const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Make modal box responsive
const oldModalBox = '.modal-box{background:#fff;padding:20px;border-radius:10px;width:300px}';
const newModalBox = '.modal-box{background:#fff;padding:20px;border-radius:10px;width:320px;max-width:90%;max-height:90vh;overflow-y:auto;box-sizing:border-box}';
html = html.replace(oldModalBox, newModalBox);

// 2. Adjust modal inputs for better touch target on mobile
const oldInput = 'input,textarea,select{width:100%;padding:8px;margin-bottom:8px;box-sizing:border-box}';
const newInput = 'input,textarea,select{width:100%;padding:10px;margin-bottom:12px;box-sizing:border-box;font-size:16px}';
html = html.replace(oldInput, newInput);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Improved modal responsiveness for mobile.");
