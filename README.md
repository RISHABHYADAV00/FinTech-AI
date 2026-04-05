# FinTech AI — Financial Intelligence Dashboard 🚀

FinTech AI is a sophisticated financial analytics platform that provides real-time insights and AI-powered analysis of major tech companies' financial performance (Microsoft, Tesla, and Apple) for the fiscal years 2021–2023.

## 📊 Features

- **Dynamic Data Visualization**: Interactive charts for revenue trends, net income, cash flows, and asset-liability ratios using Chart.js.
- **AI Financial Analyst**: A responsive chatbot powered by **Groq (Llama 3.3)** that can answer complex questions about growth, profitability, and comparative metrics.
- **Comprehensive Financial Tables**: Detailed breakdown of Revenue, Net Income, Assets, Liabilities, and Operating Cash Flow in USD Millions.
- **Premium UI/UX**: A modern, glassmorphic design system using the DM Sans and DM Mono typography for a high-end financial feel.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+).
- **Visualization**: [Chart.js](https://www.chartjs.org/) for high-performance interactive graphing.
- **Backend**: Node.js with Express.js.
- **AI Orchestration**: GroqCloud API (Llama 3.3 70B Versatile).
- **Environment Management**: Dotenv for secure API key handling.

---

## 🚀 Step-by-Step Documentary: How It Was Built

### Phase 1: The Vision & Design
The project started with the goal of creating a "Bloomberg-style" intelligence dashboard. I designed a custom CSS system featuring specific brand colors for tickers (MSFT Blue, TSLA Red, AAPL Grey) and a responsive two-panel layout: **Data on the Left, AI on the Right.**

### Phase 2: Structural Modularization
Originally built as a large single file, the project was refactored into a modular architecture:
- `index.html`: Optimized semantic structure.
- `style.css`: A comprehensive design system with refined variables and micro-animations.
- `script.js`: Client-side logic for chart rendering and chat interaction.

### Phase 3: Secure Backend Development
To protect sensitive API credentials, a dedicated Node.js backend was implemented using Express. This serves as a secure proxy, ensuring that the Groq API key is never exposed to the client's browser.

### Phase 4: AI Intelligent Integration
We integrated the **Groq Llama 3.3** model. This provides the "Intelligence" in FinTech AI, allowing the system to not just show data, but actually *understand* it when a user asks, "Which company has the healthiest cash flow?"

---

## 💻 How to Run Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A Groq API Key (Get it at [console.groq.com](https://console.groq.com/)).

### 2. Setup Backend
1. Open your terminal in the `backend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   GROQ_API_KEY=your_gsk_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Setup Frontend
1. Open `frontend/index.html` in any modern browser.
2. The dashboard will automatically connect to your backend on port 5000.

---

## 🌐 Deployment Plan

- **Backend**: Deploy the `/backend` folder to **Render.com**.
- **Frontend**: Deploy the `/frontend` folder to **Vercel** or **Netlify**.
- **Note**: Ensure the fetch URL in your `script.js` is updated to your live Render URL after deployment.

---

*Developed with ❤️ by the FinTech AI Team.*
