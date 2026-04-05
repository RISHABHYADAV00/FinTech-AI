const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/chat', {
      system: 'You are a test helper.',
      messages: [{role: 'user', content: 'Say hello'}]
    });
    console.log("Success:", res.data);
  } catch(e) {
    console.error("Error:", e.response ? e.response.data : e.message);
  }
}
test();
