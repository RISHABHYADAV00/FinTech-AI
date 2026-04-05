const cOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 10, family: 'DM Mono' }, color: '#9ca3af' } },
    y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 10, family: 'DM Mono' }, color: '#9ca3af' } }
  }
};

new Chart(document.getElementById('revChart'), {
  type: 'line',
  data: {
    labels: ['2021','2022','2023'],
    datasets: [
      { data: [168.1,198.3,211.9], borderColor:'#0078d4', backgroundColor:'rgba(0,120,212,0.07)', tension:0.35, pointRadius:4, pointBackgroundColor:'#0078d4', fill:true },
      { data: [53.8,81.5,96.8], borderColor:'#cc2228', backgroundColor:'rgba(204,34,40,0.06)', tension:0.35, pointRadius:4, pointBackgroundColor:'#cc2228', fill:true },
      { data: [365.8,394.3,383.3], borderColor:'#6b7280', backgroundColor:'rgba(107,114,128,0.05)', tension:0.35, pointRadius:4, pointBackgroundColor:'#6b7280', fill:true }
    ]
  },
  options: { ...cOpts }
});

new Chart(document.getElementById('incChart'), {
  type: 'line',
  data: {
    labels: ['2021','2022','2023'],
    datasets: [
      { data: [61.3,72.7,72.4], borderColor:'#0078d4', tension:0.35, pointRadius:4, pointBackgroundColor:'#0078d4' },
      { data: [5.5,12.6,15.0], borderColor:'#cc2228', tension:0.35, pointRadius:4, pointBackgroundColor:'#cc2228' },
      { data: [94.7,99.8,97.0], borderColor:'#6b7280', tension:0.35, pointRadius:4, pointBackgroundColor:'#6b7280' }
    ]
  },
  options: { ...cOpts }
});

new Chart(document.getElementById('cfChart'), {
  type: 'bar',
  data: {
    labels: ['Microsoft','Tesla','Apple'],
    datasets: [{ data: [87.6,13.3,110.5], backgroundColor:['rgba(0,120,212,0.8)','rgba(204,34,40,0.8)','rgba(107,114,128,0.8)'], borderRadius:5, borderSkipped:false }]
  },
  options: { ...cOpts, scales: { x: { grid:{display:false}, ticks:{font:{size:10},color:'#6b7280'} }, y: { grid:{color:'#f3f4f6'}, ticks:{font:{size:10,family:'DM Mono'},color:'#9ca3af',callback:v=>'$'+v+'B'} } } }
});

new Chart(document.getElementById('alChart'), {
  type: 'bar',
  data: {
    labels: ['Microsoft','Tesla','Apple'],
    datasets: [
      { label:'Assets', data:[412.0,106.6,352.6], backgroundColor:'rgba(37,99,235,0.8)', borderRadius:4, borderSkipped:false },
      { label:'Liabilities', data:[205.8,43.0,290.4], backgroundColor:'rgba(220,38,38,0.65)', borderRadius:4, borderSkipped:false }
    ]
  },
  options: { ...cOpts, scales: { x:{grid:{display:false},ticks:{font:{size:10},color:'#6b7280'}}, y:{grid:{color:'#f3f4f6'},ticks:{font:{size:10,family:'DM Mono'},color:'#9ca3af',callback:v=>'$'+v+'B'}} } }
});

// CHATBOT
const SYS = `You are FinAI, a concise financial analyst. Data (USD millions):
Microsoft: 2023(Rev:211915,NI:72361,Assets:411976,Liab:205753,OCF:87582), 2022(Rev:198270,NI:72738,Assets:364840,Liab:198298,OCF:89035), 2021(Rev:168088,NI:61271,Assets:333779,Liab:191791,OCF:76740)
Tesla: 2023(Rev:96773,NI:14997,Assets:106618,Liab:43009,OCF:13256), 2022(Rev:81462,NI:12556,Assets:82338,Liab:36440,OCF:14724), 2021(Rev:53823,NI:5519,Assets:62131,Liab:30548,OCF:11497)
Apple: 2023(Rev:383285,NI:96995,Assets:352583,Liab:290437,OCF:110543), 2022(Rev:394328,NI:99803,Assets:352755,Liab:302083,OCF:122151), 2021(Rev:365817,NI:94680,Assets:351002,Liab:287912,OCF:104038)
Be concise, use $ and B/M, bold key numbers with **, compute growth/margins when useful. Only reference these 3 companies and 3 years.`;

let history = [], busy = false;

function getTime() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }
function autoResize(el) { el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,100)+'px'; }
function handleKey(e) { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();} }
function hideWelcome() { const w=document.getElementById('welcomeBlock'); if(w)w.remove(); }

function fmt(t) {
  return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
}

function addMsg(role, html) {
  hideWelcome();
  const c=document.getElementById('messages');
  const d=document.createElement('div');
  d.className='msg '+role;
  d.innerHTML=`<div class="avatar">${role==='bot'?'AI':'YOU'}</div><div><div class="bubble">${html}</div><div class="msg-time">${getTime()}</div></div>`;
  c.appendChild(d); c.scrollTop=c.scrollHeight; return d;
}

function showTyping() {
  hideWelcome();
  const c=document.getElementById('messages');
  const d=document.createElement('div');
  d.className='msg bot'; d.id='typing';
  d.innerHTML='<div class="avatar">AI</div><div class="bubble"><div class="typing-wrap"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
  c.appendChild(d); c.scrollTop=c.scrollHeight;
}

function removeTyping() { const t=document.getElementById('typing'); if(t)t.remove(); }

async function sendMessage() {
  const inp=document.getElementById('chatInput');
  const text=inp.value.trim();
  if(!text||busy) return;
  inp.value=''; inp.style.height='auto';
  busy=true; document.getElementById('sendBtn').disabled=true;
  history.push({role:'user',content:text});
  addMsg('user',text); showTyping();
  try {
    const res=await fetch('https://fintech-ai-1.onrender.com/api/chat',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-3-sonnet-20240229',system:SYS,messages:history})
    });
    const data=await res.json(); removeTyping();
    const reply=data.content?.[0]?.text||'Something went wrong.';
    history.push({role:'assistant',content:reply});
    addMsg('bot',fmt(reply));
  } catch(e) { removeTyping(); addMsg('bot','Connection error. Please try again.'); }
  busy=false; document.getElementById('sendBtn').disabled=false; inp.focus();
}

function sendQ(q) { document.getElementById('chatInput').value=q; sendMessage(); }

function clearChat() {
  history=[];
  document.getElementById('messages').innerHTML=`<div class="welcome" id="welcomeBlock"><div class="welcome-icon">💬</div><div class="welcome-title">Ask the AI analyst</div><div class="welcome-desc">Ask about revenue, profitability, growth rates, or comparisons using the data shown on the left.</div></div>`;
}

document.getElementById('chatInput').focus();
