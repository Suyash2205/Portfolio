# Chatbot AI setup

The “Ask about Suyash” chatbot can use **real AI** (OpenAI or **Groq**, free tier) when the chat API is available. Otherwise it uses **local, data-driven replies** (same projects, experience, education, skills as the site).

## How to test (step-by-step)

### Prerequisites

- **Node.js** (v18 or newer) and **npm**
- For **AI** replies: set **one** of these in Vercel env vars — **Groq (free):** key from [console.groq.com](https://console.groq.com) → `GROQ_API_KEY`; **OpenAI (paid):** key from [platform.openai.com](https://platform.openai.com/api-keys) → `OPENAI_API_KEY`

---

### Option A: Test locally **without** AI (no setup)

This uses only local, data-driven replies. No API key or deploy needed.

1. **Install and run**
   ```bash
   cd "Suyash Portfolio"   # or your project folder
   npm install
   npm run dev
   ```
2. Open the URL shown (e.g. `http://localhost:5173`).
3. Scroll to **"Ask about Suyash"** (or click **Chat** in the nav).
4. **Try these:**
   - Click **Work**, **About me**, **Skills**, **Contact** → instant local answers.
   - Type **"all projects"** or **"list projects"** → list of projects.
   - Type **"Lane Detection"** or **"E-Waste"** → project-specific answer with link.
   - Type **"Buildup"** or **"Somaiya"** → experience-specific answer.
   - Type something random (e.g. **"hello"**) → you get a short fallback message (no AI, so no smart reply).

If all of that works, the **local** chatbot is working.

---

### Option B: Test **with** AI (deployed on Vercel)

To get real AI replies, the app must call `/api/chat` on a host that has the serverless API and **one** API key (Groq or OpenAI).

#### Step 1: Deploy to Vercel

1. Push your project to **GitHub** (if not already).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. **Add New Project** → **Import** your GitHub repo.
4. Leave framework preset as **Vite**; root directory as `.` (or the repo root).
5. Click **Deploy**. Wait for the build to finish.
6. Note your deployment URL, e.g. `https://your-project.vercel.app`.

#### Step 2: Add an API key (use one)

1. In Vercel: open your project → **Settings** → **Environment Variables**.
2. Add **one** of these (Groq is free, no card required):
   - **Groq (free):** Name `GROQ_API_KEY`, Value = your key from [console.groq.com](https://console.groq.com) (sign up → API Keys).
   - **OpenAI (paid):** Name `OPENAI_API_KEY`, Value = your key from [platform.openai.com](https://platform.openai.com/api-keys).
3. Set **Environment** to Production (and optionally Preview). Save.
4. Go to **Deployments** → **⋯** on the latest deployment → **Redeploy** so the new env is applied.

#### Step 3: Test on the live site

1. Open your **deployed** URL (e.g. `https://your-project.vercel.app`).
2. Go to the **Chat** section.
3. **Try:**
   - **"Tell me about all projects"** → AI should list projects (from context).
   - **"What is the Lane Detection project?"** → AI describes it and can include the link.
   - **"How can I contact Suyash?"** / **"LinkedIn?"** → AI gives contact info with clickable links.
   - **"Summarize his experience"** → AI uses the experience section.
   - **Quick-reply buttons** → still instant local replies.

If those work and links are clickable, **AI + API** are working in production.

---

### Option C: Test AI while developing **locally**

Use your **already deployed** API from localhost so you don't have to deploy after every change.

1. **Deploy and set `GROQ_API_KEY` or `OPENAI_API_KEY`** (Option B, Step 1 and Step 2).
2. In your **project root**, create a file **`.env`** (or `.env.local`):
   ```env
   VITE_CHAT_API_URL=https://your-project.vercel.app/api/chat
   ```
   Replace `your-project.vercel.app` with your real Vercel URL.
3. **Restart** the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` and test the same free-text queries as in Option B. The app will call your **deployed** `/api/chat`, so you get AI replies while coding locally.

**Note:** `.env` is usually in `.gitignore`; don't commit your API key. Only `VITE_CHAT_API_URL` points at a **URL**; the key stays on Vercel.

---

### Quick checklist

| What to test | Local (no AI) | Deployed (with AI) |
|--------------|----------------|--------------------|
| Quick replies (Work, About, Skills, Contact) | ✅ Instant | ✅ Instant |
| "All projects" / "list projects" | ✅ Local list | ✅ AI list |
| Specific project ("Lane Detection") | ✅ Local + link | ✅ AI + link |
| Contact / LinkedIn / GitHub | ✅ Local + link | ✅ AI + link |
| Random question | Fallback message | AI answer from context |
| Links in replies clickable | ✅ | ✅ |

---

## 1. Deploy the app

Deploy this repo to **Vercel** (or any host that runs the `api/` serverless function):

- Connect the repo to Vercel and deploy.
- The `api/chat.js` file is used as a serverless route: **POST /api/chat**.

## 2. Set environment variable

In your deployment (e.g. Vercel project → Settings → Environment variables), set **one** of:

- **`GROQ_API_KEY`** — Your Groq API key (free at [console.groq.com](https://console.groq.com)). Recommended for no-cost AI.
- **`OPENAI_API_KEY`** — Your OpenAI API key (paid).

If neither is set, **POST /api/chat** returns 500 and the frontend falls back to local replies.

## 3. (Optional) Local development with the live API

By default, the frontend calls the chat API at the **same origin** (e.g. `https://your-site.vercel.app/api/chat` when the site is open from that URL). So once deployed with `GROQ_API_KEY` or `OPENAI_API_KEY`, opening the deployed site will use AI.

To use the **deployed** API while developing locally:

- Add a **`.env`** (or `.env.local`) in the project root:
  - **`VITE_CHAT_API_URL=https://your-deployed-url.vercel.app/api/chat`**
- Restart the dev server so Vite picks up the variable.
- The chatbot will then call that URL and use AI first; on failure or timeout it still falls back to local replies.

## 4. Behavior summary

| Scenario | Behavior |
|----------|----------|
| **Deployed + `GROQ_API_KEY` or `OPENAI_API_KEY` set** | Frontend uses same-origin `/api/chat` → AI answers first; local fallback on error/timeout. |
| **Local dev + `VITE_CHAT_API_URL` set** | Frontend calls that URL → AI first; local fallback on error/timeout. |
| **Local dev, no env** | No API URL → local-only for clear intents (e.g. “all projects”, project names); other free-text still tries same-origin `/api/chat` (will fail locally) and then uses local reply. |

Quick-reply buttons (Work, About me, Skills, Contact) always use **local** replies for instant answers. Free-text uses **AI first** when the chat API is configured, otherwise falls back to the same local, data-driven logic.
