async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         messages: [{ role: 'user', content: 'Say "Working!"' }],
         system: 'Keep it short.'
       })
    });
    const data = await res.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
