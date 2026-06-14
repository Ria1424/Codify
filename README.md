# Codify 🚀

**Codify** is a premium, dark-mode competitive programming and interactive learning platform built entirely in client-side HTML, CSS, and JavaScript. 

It provides Mastery Quests (DSA, Language, Company, Algorithms paths), time-boxed Arena Trials (skill tests), Weekly Clashes (leaderboard tournaments), an in-browser split-pane IDE supporting multiple compilers (Python, C, C++, Go), a slide-out AI coding mentor, and a rich CodeChef-aligned coder profile with dynamic ratings, ranks, SVG progression charts, and a submissions heatmap.

🔗 **Live Demo**: [Deploy yours on GitHub Pages!](#github-pages-deployment-guide)

---

## 🌟 Key Features

1. **Interactive Multi-Language IDE**:
   - Split-pane layout with tabs for problem description and testcases.
   - CodeMirror editor with syntax highlighting (Dracula theme), auto-closing brackets, and line numbers.
   - **Supported Languages**: Python 3, C++ (Clang), C (GCC), Go Lang.
2. **Client-Side Compilers**:
   - **Python 3**: Runs natively using **Skulpt** with custom serializers to handle classes, arguments parsing, and exceptions.
   - **C, C++, Go**: Transpiled on-the-fly to secure ES6 JavaScript to capture stdout console outputs and verify testcases client-side.
3. **Codify Profile & Submissions Heat Map**:
   - Dynamic CodeChef star ratings (`1★` to `5★` Coder) and divisions (`Div 1` to `Div 4`) linked to XP.
   - Global Rank & Country Rank tracking.
   - **SVG Rating Progression Chart**: Interactive line graph charting ratings changes over contests.
   - **Submissions Heat Map**: Aligned horizontally with weekday rows starting on Thursday (like CodeChef) and a dynamic time-range filter select dropdown (Last 6 Months vs Last 1 Year).
4. **Mastery Quests & Arena Trials**:
   - Curated coding paths with visual progress tracking.
   - Skill trials awarding profile achievement badges (e.g. *DSA Elite*, *Python Sage*).
5. **AI Coding Mentor**:
   - Simulated chat mentor helping users explain problems, suggest complexity optimizations, and debug syntax/runtime bugs.

---

## 📂 Project Structure

- `index.html` - The Single Page Application structural shell.
- `style.css` - Custom premium dark-mode styling with neon accents and responsive flex/grid layouts.
- `app.js` - Core logic, compilers transpiler, mock database, AI mentor rules, and state management.
- `README.md` - Documentation and deployment guide.

---

## 🚀 GitHub Pages Deployment Guide

Since **Codify** is a fully client-side SPA, it requires **no backend server** and can be hosted for free on GitHub Pages in under a minute!

### Step 1: Create a GitHub Repository
1. Log in to your [GitHub Account](https://github.com).
2. Click **New** to create a repository.
3. Name it `codify` (or any name you prefer).
4. Select **Public** and click **Create repository** (do not add a README, license, or gitignore yet).

### Step 2: Upload Project Files
You can upload the files directly through the web browser or via Git:

**Option A: Uploading via Web Browser (Easiest)**
1. On your new repository page, click the **uploading an existing file** link.
2. Drag and drop these 4 files into the browser:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Click **Commit changes** at the bottom.

**Option B: Uploading via Git Command Line**
Open your terminal in the project directory and run:
```bash
git init
git add .
git commit -m "Initial commit of Codify"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name).*

### Step 3: Enable GitHub Pages
1. Go to your repository settings by clicking the **Settings** (⚙️) tab at the top.
2. In the left sidebar under the "Code and automation" section, click on **Pages**.
3. Under the **Build and deployment** section, look for **Branch**.
4. Change the dropdown selection from `None` to `main` (or `master`), leave the folder as `/ (root)`, and click **Save**.

🎉 **You are done!** Within a few seconds, GitHub will publish your site. A link will appear at the top of the Pages settings panel looking like:
`https://your_username.github.io/your_repo_name/`

---

## 🛠️ Local Development

If you want to run the project locally:
1. Clone the repository or navigate to the directory.
2. Start a local server:
   - Using Python: `python -m http.server 3000`
   - Using Node.js: `npx serve`
3. Open `http://localhost:3000` in your browser.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
