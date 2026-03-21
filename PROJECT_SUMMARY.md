# 🚦 RailGate Kannur — Complete Project Summary

---

## 📁 YOUR FILES (download all of these)

| File | What it does |
|------|-------------|
| `app.py` | Python Flask backend — runs your server |
| `index.html` | Your website HTML (goes in templates/ folder) |
| `style.css` | All CSS styling (goes in static/ folder) |
| `script.js` | All JavaScript + API fetch (goes in static/ folder) |
| `requirements.txt` | Python packages list |
| `Procfile` | Needed for Railway.app hosting |
| `trains.json` | All 35 Kannur trains as JSON dataset |
| `trains.csv` | All 35 Kannur trains as spreadsheet |
| `README.md` | Step by step setup guide |

---

## 📂 CORRECT FOLDER STRUCTURE

```
railgate-kannur/
├── app.py
├── requirements.txt
├── Procfile
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

⚠️ IMPORTANT: index.html MUST be inside templates/ folder
⚠️ IMPORTANT: style.css and script.js MUST be inside static/ folder

---

## ▶️ HOW TO RUN LOCALLY

```bash
# 1. Install packages
pip install flask flask-cors

# 2. Run server
python app.py

# 3. Open browser
http://localhost:5000
```

---

## 🚀 HOW TO GO LIVE (15 minutes, FREE)

### Step 1 — GitHub (5 min)
1. Go to github.com → Sign Up (free)
2. Click New Repository
3. Name it: railgate-kannur
4. Click "uploading an existing file"
5. Upload ALL your files (keep folder structure)
6. Click Commit

### Step 2 — Railway.app (5 min)
1. Go to railway.app
2. Sign in with GitHub
3. Click New Project → Deploy from GitHub
4. Select your railgate-kannur repo
5. Add environment variable: PORT = 5000
6. Click Deploy
7. Wait 2 minutes → YOUR SITE IS LIVE!

Your URL: https://railgate-kannur.railway.app

### Step 3 — Test (2 min)
Open these in browser:
- https://railgate-kannur.railway.app          → website
- https://railgate-kannur.railway.app/api/status  → health check
- https://railgate-kannur.railway.app/api/trains  → all 35 trains
- https://railgate-kannur.railway.app/api/gates   → all 47 gates

---

## 🚂 TRAIN DATA — 35 Trains at Kannur Station

| # | Train No | Train Name | Type | Arrival | Departure | Days |
|---|----------|-----------|------|---------|-----------|------|
| 1 | 12618 | Mangala Lakshadweep SF Exp | SF Express | 00:37 | 00:40 | Daily |
| 2 | 22852 | Vivek SF Express | SF Express | 00:57 | 01:00 | Sun |
| 3 | 16334 | Veraval Express | Express | 01:37 | 01:40 | Tue |
| 4 | 16336 | Gandhidham Express | Express | 01:37 | 01:40 | Wed |
| 5 | 16338 | Ernakulam-Okha Express | Express | 01:37 | 01:40 | Thu,Sat |
| 6 | 19259 | Kochuveli-Bhavnagar Exp | Express | 01:37 | 01:40 | Fri |
| 7 | 12218 | Kerala Sampark Kranti | SF Express | 01:52 | 01:55 | Fri,Sun |
| 8 | 12484 | ASR-KCVL Weekly SF | SF Express | 01:52 | 01:55 | Tue |
| 9 | 22637 | West Coast SF Express | SF Express | 02:37 | 02:40 | Daily |
| 10 | 12431 | Rajdhani Express | Rajdhani | 03:12 | 03:15 | Wed,Fri,Sat |
| 11 | 12685 | Chennai-Mangalore SF Exp | SF Express | 04:37 | 04:40 | Daily |
| 12 | 12081 | TVC Jan Shatabdi | Shatabdi | Source | 04:50 | Mon-Sat |
| 13 | 16604 | Maveli Express | Express | 04:55 | 05:00 | Daily |
| 14 | 16308 | CAN-ALLP Executive Exp | Executive | Source | 05:10 | Daily |
| 15 | 16345 | Netravati Express | Express | 06:32 | 06:35 | Daily |
| 16 | 16629 | Malabar Express (South) | Express | 06:37 | 06:40 | Daily |
| 17 | 20631 | MAQ-TVC Vande Bharat | Vande Bharat | 07:55 | 07:57 | Daily |
| 18 | 16347 | Mangalore Express | Express | 07:55 | 08:00 | Daily |
| 19 | 22610 | Coimbatore-MAQ Intercity | SF Express | 10:42 | 10:45 | Daily |
| 20 | 16606 | Ernad Express | Express | 14:12 | 14:15 | Daily |
| 21 | 06047 | CAN-ERS Special | Special | Source | 15:40 | Mon |
| 22 | 16159 | Chennai Egmore-MAQ Exp | Express | 15:47 | 15:50 | Daily |
| 23 | 12602 | Mangalore Mail | Mail | 15:57 | 16:00 | Daily |
| 24 | 12134 | MAJN-CSMT Express | Express | 16:07 | 16:10 | Daily |
| 25 | 16348 | Thiruvananthapuram Exp | Express | 16:52 | 16:55 | Daily |
| 26 | 16512 | CAN-SBC Express | Express | Source | 17:05 | Daily |
| 27 | 10216 | Ernakulam-Madgaon Exp | Express | 17:52 | 17:55 | Mon |
| 28 | 16527 | Yesvantpur Express | Express | Source | 18:05 | Daily |
| 29 | 16650 | Parasuram Express | Express | 18:26 | 18:29 | Daily |
| 30 | 16858 | Mangalore-Puducherry Exp | Express | 18:32 | 18:35 | Sun |
| 31 | 16630 | Malabar Express (North) | Express | 20:50 | 20:55 | Daily |
| 32 | 16608 | Coimbatore-Kannur Exp | Express | 21:00 | Terminates | Daily |
| 33 | 11097 | Poorna Express | Express | 21:17 | 21:20 | Sun |
| 34 | 16356 | Antyodaya Express | Antyodaya | 21:55 | 22:00 | Fri,Sun |
| 35 | 20632 | TVC-MAQ Vande Bharat | Vande Bharat | 22:35 | 22:38 | Daily |

---

## 🚦 GATE DATA — 47 Kannur Level Crossings

### Payyannur Taluk (8 gates)
LC-01 Trikaripur South Gate | LC-02 Payyannur Gate (Special)
LC-03 Payyannur North Gate | LC-04 Payyannur South Gate
LC-05 Edat Gate | LC-06 Edat South Gate (Unmanned)
LC-07 Ramanthali Gate | LC-08 Ramanthali North Gate (Unmanned)

### Kannur Taluk (23 gates)
LC-09 Valapattanam Gate | LC-10 Valapattanam North (Unmanned)
LC-11 Pazhayangadi Gate (Interlocked) | LC-12 Pazhayangadi North (Unmanned)
LC-13 Peringome Gate | LC-14 Peringome South (Unmanned)
LC-15 Madai Gate | LC-16 Madai South (Unmanned)
LC-17 Pappinisseri Gate | LC-18 Pappinisseri North (Unmanned)
LC-19 Pappinisseri South | LC-20 Kannapuram Gate (Interlocked) ⭐
LC-21 Kannapuram East (Unmanned) | LC-22 Dharmadam Gate
LC-23 Chirakkal Gate | LC-24 Chirakkal South (Unmanned)
LC-25 Azhikkal Gate | LC-26 Kannur Gate (Special Class)
LC-27 Kannur North Gate | LC-28 Kannur South Gate
LC-29 Palayad Gate | LC-30 Payangadi Gate
LC-31 Payangadi South (Unmanned)

### Irikkur Taluk (3 gates)
LC-32 Iritty Gate | LC-33 Iritty North (Unmanned) | LC-34 Iritty South (Unmanned)

### Thalassery Taluk (9 gates)
LC-35 Thalassery North Gate | LC-36 Thalassery Gate (Special)
LC-37 Thalassery South Gate | LC-38 Thalassery Bazaar Gate
LC-39 Muzhappilangad Gate | LC-40 Muzhappilangad North (Unmanned)
LC-41 Edakkad Gate | LC-42 Edakkad South (Unmanned) | LC-43 Kadambur (Unmanned)

### Mahe (4 gates)
LC-44 Mahe North Gate | LC-45 Mahe Gate (Interlocked)
LC-46 New Mahe Gate | LC-47 Mahe South (Unmanned)

---

## 🔌 API ENDPOINTS

| URL | Returns |
|-----|---------|
| GET / | Your website |
| GET /api/trains | All 35 trains |
| GET /api/trains?today=1 | Today's trains only |
| GET /api/trains?type=Rajdhani | Filter by type |
| GET /api/trains?day=Mon | Filter by day |
| GET /api/trains/12625 | Single train |
| GET /api/trains/today | Today shortcut |
| GET /api/gates | All 47 gates with status |
| GET /api/gates/26 | Single gate (Kannur Gate) |
| GET /api/status | Health check |

---

## 🌐 WEBSITE FEATURES

- ✅ Search by gate name, road, area, village
- ✅ Filter by Taluk (Payyannur, Kannur, Thalassery, Irikkur, Mahe)
- ✅ 🔴 Closed Now filter
- ✅ 🟢 Open Now filter
- ✅ ⭐ Save favourite gates
- ✅ 🔔 Gate close alerts
- ✅ Live countdown timer (opens in X:XX)
- ✅ Closing timer (⚠️ closes in X:XX)
- ✅ URGENT red countdown under 2 minutes (shows raw seconds)
- ✅ Train name + number on each gate card
- ✅ 🔴 CROSSING NOW / 🟡 +X min approaching
- ✅ Live clock in header and search page
- ✅ Gate type badges (Special, Interlocked, Manned, Unmanned)
- ✅ WhatsApp share button
- ✅ Google Maps button
- ✅ Malayalam language toggle (EN/ML)
- ✅ Gatekeeper name on each card
- ✅ Railway KM marker and LC number
- ✅ Mobile responsive design
- ✅ Auto-refresh every 30 seconds

---

## 🔑 GET REAL TRAIN DATA

1. Go to: indianrailapi.com
2. Sign Up (free)
3. Dashboard → Copy API Key
4. In app.py find: API_KEY = "YOUR_API_KEY_HERE"
5. Replace with your key
6. Redeploy on Railway.app

---

## 💰 COST SUMMARY

| Item | Cost |
|------|------|
| GitHub | FREE |
| Railway.app hosting | FREE |
| Indian Rail API | FREE |
| Custom domain (optional) | ~₹500/year |
| **Total to go live** | **₹0** |

---

## 📞 NEXT UPGRADES (future)

1. Connect real NTES API for live train positions
2. Add push notifications (PWA)
3. Add more districts (Kozhikode, Kasaragod etc.)
4. Add user GPS location for nearby gates
5. Add WhatsApp bot integration

---

Built with ❤️ for Kannur District
Railway Line: Shoranur–Mangalore
47 Level Crossings · 35 Trains
