# Soyal Islam - Sci-Fi Cyberpunk Portfolio

This is a premium, high-fidelity, sci-fi cyberpunk-themed portfolio for **Soyal Islam**, optimized as a Software Developer / AI & ML Specialist.

The page is designed with a sleek HUD cockpit layout, custom particles network node background, custom synth sound effects (Web Audio API), an interactive terminal command interface, and slide-out project compilation drawers.

## 🚀 Live Preview & Features
- **Section 01 // Introduction**: Core profile overview, resume download link, and an **Interactive Terminal Command Shell** (type `help`, `neofetch`, `about`, `skills`, `projects`, etc.).
- **Section 02 // Skills Metric Integration**: Interactive glowing progress indicators divided by Language, AI/ML, DevOps, and Agentic AI concepts.
- **Section 03 // Active Repositories**: Futuristic project showcase displaying Soyal's key projects:
  - Qwen Ternary Quantization Framework
  - Face Recognition Attendance System
  - CNN Animal Image Classifier
  - Student Score Prediction System
  - *Clicking any card executes a real-time command compilation emulator inside a sliding HUD drawer!*
- **Section 04 // Secure Communications**: Futuristic validation contact form with signal transmission animation and direct contact channels.
- **Background Grid & Canvas Nodes**: Interactive particle nodes that gravitate toward the mouse pointer and dynamically connect.
- **Web Audio Interface**: Dynamic synth beep & glitch effects triggered on UI actions (fully muteable, default state is silent).

---

## 🛠️ Local Development & Testing

Since this is a lightweight, zero-dependency static site (HTML5, Vanilla CSS3, Vanilla ES6 Javascript), there are **no build steps or framework configurations required**.

To run it locally:
1. **VS Code Live Server**: Open this folder in VS Code, right-click `index.html`, and select **Open with Live Server**.
2. **Python HTTP Server**:
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your web browser.
3. **Node.js HTTP Server**:
   ```bash
   npm install -g http-server
   http-server
   ```

---

## ⚡ Deployment to Vercel

Vercel detects static files out of the box. You have two main ways to deploy:

### Option A: Direct Command-Line Deployment (Fastest)
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel (if not already logged in):
   ```bash
   vercel login
   ```
3. Run the deployment command inside this portfolio folder:
   ```bash
   vercel
   ```
4. Follow the prompts (use default choices for everything). Vercel will upload and deploy the static folder instantly.
5. For production release:
   ```bash
   vercel --prod
   ```

### Option B: GitHub Git Integration (Recommended for auto-deploys)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initialize cyber portfolio"
   ```
2. Create a new repository on your GitHub account (`github.com/soyalislam`) and push your code:
   ```bash
   git remote add origin https://github.com/soyalislam/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```
3. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
4. Import your repository from GitHub.
5. Vercel will auto-detect the configuration as a **Static Project**. Click **Deploy**.
6. Every time you push updates to GitHub, Vercel will automatically build and update your live site!
