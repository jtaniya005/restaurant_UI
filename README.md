# 🍛 Spice Garden — Restaurant Website + AI Chatbot

A beautiful React frontend with a FastAPI + Claude AI backend.

---

## 📁 Project Structure

```
restaurant-ui/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        ← Fixed nav with cart count
│   │   ├── Hero.jsx          ← Full-screen hero section
│   │   ├── MenuSection.jsx   ← Filterable menu grid
│   │   ├── CartSidebar.jsx   ← Slide-out cart drawer
│   │   ├── ChatWindow.jsx    ← AI chat window (calls FastAPI)
│   │   ├── ChatFAB.jsx       ← Floating action button
│   │   └── StaticSections.jsx← About + Footer
│   ├── services.js           ← API calls + menu data
│   ├── App.jsx               ← Root component
│   └── index.css             ← Tailwind + custom styles
├── main.py                   ← FastAPI backend
├── requirements.txt
├── package.json
├── vite.config.js            ← Vite dev server + API proxy
└── tailwind.config.js
```

---

## 🚀 Setup

### 1. Frontend (React)
```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

### 2. Backend (FastAPI)
```bash
pip install -r requirements.txt

# Set your Anthropic API key
export ANTHROPIC_API_KEY=sk-ant-...

uvicorn main:app --reload --port 8000
# Runs at http://localhost:8000
```

> Vite proxies `/api/*` → `localhost:8000` automatically.

---

## 🤖 How the AI Chatbot Works

1. User types in `ChatWindow.jsx`
2. Frontend sends `POST /api/chat` with message history
3. FastAPI calls Claude (claude-sonnet-4-6) with restaurant system prompt
4. Response streamed back and displayed

### To customize the AI:
Edit `SYSTEM_PROMPT` in `main.py` — add your restaurant name, menu, personality.

---

## 🎨 Customise

| What | Where |
|------|-------|
| Restaurant name | `Navbar.jsx`, `Hero.jsx`, `StaticSections.jsx` |
| Menu items | `src/services.js` → `MENU_ITEMS` array + `main.py` → `MENU` |
| Colours | `tailwind.config.js` → `ember` and `ink` palettes |
| AI personality | `main.py` → `SYSTEM_PROMPT` |

---

## 📦 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI, Python 3.11+
- **AI**: Anthropic Claude (claude-sonnet-4-6)
