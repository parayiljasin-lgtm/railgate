# 🚦 RailGate Kannur — Complete Beginner Guide
## From Zero to Live Website with Real Train Data

---

## 📁 STEP 1 — FOLDER STRUCTURE

Create this folder on your computer:

```
📁 railgate/              ← your main project folder
   ├── app.py             ← Python backend server
   ├── index.html         ← your website (frontend)
   ├── requirements.txt   ← list of Python packages
   ├── Procfile           ← needed for online hosting
   └── README.md          ← this guide
```

✅ All 3 files (app.py, index.html, requirements.txt) must be
   in the SAME folder. This is very important.

---

## 🐍 STEP 2 — INSTALL PYTHON

If you don't have Python:
1. Go to: https://python.org/downloads
2. Download Python 3.11 or newer
3. During install → tick ✅ "Add Python to PATH"
4. Click Install

Check it works — open terminal and type:
```
python --version
```
You should see: Python 3.11.x

---

## 📦 STEP 3 — INSTALL PACKAGES

Open terminal. Go to your project folder:

```bash
# On Windows:
cd C:\Users\YourName\railgate

# On Mac/Linux:
cd ~/railgate
```

Install required packages:
```bash
pip install flask flask-cors requests gunicorn
```

Wait for it to finish (takes 1-2 minutes).

---

## 🔑 STEP 4 — GET FREE API KEY

1. Open browser → go to: https://indianrailapi.com
2. Click "Sign Up" (top right)
3. Fill name, email, password → Register
4. Check your email → click verification link
5. Log in → go to "Dashboard"
6. Copy your API Key (looks like: abc123xyz456...)

Now open app.py in any text editor (Notepad, VS Code).
Find this line near the top:

```python
API_KEY = "YOUR_API_KEY_HERE"
```

Replace it with your real key:
```python
API_KEY = "abc123xyz456..."
```

Save the file.

---

## ▶️ STEP 5 — RUN THE SERVER LOCALLY

In terminal:
```bash
python app.py
```

You will see:
```
🚦  RailGate Kannur — Backend Server

  ✅ API Key: abc123••••••
  ✅ Tracking 18 trains
  ✅ Monitoring 47 Kannur gates
  ✅ Background refresh started

  🌐  Website  →  http://localhost:5000
  📡  API      →  http://localhost:5000/api/gates
  ❤️   Health  →  http://localhost:5000/api/status

  Press CTRL+C to stop
```

---

## 🌐 STEP 6 — OPEN YOUR WEBSITE

Open Chrome or Firefox.
Go to: http://localhost:5000

Your website now shows REAL live train data!

---

## 🧪 STEP 7 — TEST THE API IN BROWSER

Open these URLs in your browser to test:

| URL | What it shows |
|-----|--------------|
| http://localhost:5000 | Your website |
| http://localhost:5000/api/status | Is server running? |
| http://localhost:5000/api/gates | All 47 gates live data |
| http://localhost:5000/api/gate/26 | Kannur Gate only |
| http://localhost:5000/api/trains | Active trains now |
| http://localhost:5000/api/refresh | Force data update |

The API returns JSON data like this:
```json
{
  "ok": true,
  "mode": "live",
  "closed_count": 3,
  "open_count": 44,
  "active_trains": 6,
  "gates": [
    {
      "id": 26,
      "name": "Kannur Gate",
      "status": {
        "is_closed": true,
        "opens_in_secs": 180,
        "current_train": {
          "train_number": "12625",
          "train_name": "Kerala Express"
        }
      }
    }
  ]
}
```

---

## 🔗 STEP 8 — HOW FRONTEND TALKS TO BACKEND

Your index.html already has this code that calls the API:

```javascript
// This URL points to your backend server
const API_URL = 'http://localhost:5000/api/gates';

// Every 30 seconds, fetch live data
async function fetchLiveData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  // Update all gate cards with real status
}

setInterval(fetchLiveData, 30000);
```

This is called fetch() — it's how JavaScript talks to a server.

---

## 🚀 STEP 9 — HOST ONLINE (FREE)

### Option A — Railway.app (EASIEST for Python — Recommended)

1. Go to: https://railway.app
2. Sign up with GitHub (free)
3. Click "New Project"
4. Click "Deploy from GitHub"
5. Upload your railgate folder
6. Add environment variable:
   - Key:   API_KEY
   - Value: your actual API key
7. Click Deploy

Your site goes live at:
   https://railgate-kannur-production.railway.app

Takes about 3 minutes total! ✅

### Option B — Render.com (Also free)

1. Go to: https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect your GitHub repo
5. Settings:
   - Build Command: pip install -r requirements.txt
   - Start Command: gunicorn app:app
6. Add environment variable: API_KEY = your_key
7. Deploy

### Option C — PythonAnywhere (Easiest, no GitHub needed)

1. Go to: https://pythonanywhere.com
2. Sign up (free)
3. Go to "Files" → upload app.py, index.html, requirements.txt
4. Go to "Web" → Add new web app → Flask
5. Set working directory to your folder
6. Reload

---

## 🔄 STEP 10 — UPDATE API URL FOR ONLINE

After you deploy online, update index.html.
Find this line:

```javascript
const API_URL = 'http://localhost:5000/api/gates';
```

Change it to your live URL:
```javascript
const API_URL = 'https://railgate-kannur.railway.app/api/gates';
```

---

## 🛠️ ALL TERMINAL COMMANDS SUMMARY

```bash
# 1. Go to your project folder
cd railgate

# 2. Install packages (do this once)
pip install flask flask-cors requests gunicorn

# 3. Run server locally
python app.py

# 4. Stop server
CTRL + C

# 5. Check if Python is installed
python --version

# 6. Check if Flask is installed
pip show flask

# 7. Install one package
pip install flask

# 8. See all installed packages
pip list
```

---

## 🆘 TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| "python not found" | Reinstall Python, tick "Add to PATH" |
| "Module not found" | Run: pip install flask flask-cors requests |
| Website shows fake data | Check API key in app.py |
| "Address already in use" | Another app using port 5000 — restart computer |
| API returns empty gates | Check internet connection, verify API key |
| CORS error in browser | flask-cors is handling it — check it's installed |

---

## 📞 HOW IT ALL CONNECTS

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  indianrailapi.com  ←── real train positions        │
│         ↓  (every 60 seconds)                      │
│      app.py  ←── your Python backend               │
│      calculates gate open/close times              │
│         ↓  (every 30 seconds)                      │
│    index.html  ←── your website                    │
│    calls /api/gates using fetch()                  │
│    updates countdowns on screen                    │
│         ↓                                          │
│    👤 User sees real gate status                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

Built for Kannur District 🚦
Railway line: Shoranur–Mangalore
47 level crossings monitored
