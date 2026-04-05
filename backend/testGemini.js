const fs = require('fs');
const API_KEY = 'AIzaSyDx-oEHP6cPjkNX2DU_6j35Q_xDBd_cvYE';

async function run() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await res.json();
    fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
