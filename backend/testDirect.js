const API_KEY = 'AIzaSyDx-oEHP6cPjkNX2DU_6j35Q_xDBd_cvYE';

async function run() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "Hello" }] }] })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error("Error:", e.message);
  }
}
run();
