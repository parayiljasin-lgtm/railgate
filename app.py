"""
RailGate Kannur — Complete Flask Backend
Serves HTML from templates/, CSS+JS from static/

HOW TO RUN:
  pip install flask flask-cors
  python app.py
  Open: http://localhost:5000
"""
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

TRAINS = [
    {"train_number":"06047","train_name":"Kannur-Ernakulam Special","train_type":"Special","source":"Kannur","destination":"Ernakulam","arrival_time_kannur":"Source","departure_time_kannur":"15:40","running_days":"Mon","days_map":{"Mon":True,"Tue":False,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":False}},
    {"train_number":"10216","train_name":"Ernakulam-Madgaon Express","train_type":"Express","source":"Ernakulam","destination":"Madgaon","arrival_time_kannur":"17:52","departure_time_kannur":"17:55","running_days":"Mon","days_map":{"Mon":True,"Tue":False,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":False}},
    {"train_number":"11097","train_name":"Poorna Express","train_type":"Express","source":"Pune","destination":"Ernakulam","arrival_time_kannur":"21:17","departure_time_kannur":"21:20","running_days":"Sun","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":True}},
    {"train_number":"12081","train_name":"Thiruvananthapuram Jan Shatabdi","train_type":"Shatabdi","source":"Kannur","destination":"Thiruvananthapuram","arrival_time_kannur":"Source","departure_time_kannur":"04:50","running_days":"Mon-Sat","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":False}},
    {"train_number":"12134","train_name":"MAJN-CSMT Express","train_type":"Express","source":"Mangalore","destination":"Mumbai CSMT","arrival_time_kannur":"16:07","departure_time_kannur":"16:10","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"12218","train_name":"Kerala Sampark Kranti Express","train_type":"SF Express","source":"Chandigarh","destination":"Kochuveli","arrival_time_kannur":"01:52","departure_time_kannur":"01:55","running_days":"Fri,Sun","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":False,"Fri":True,"Sat":False,"Sun":True}},
    {"train_number":"12431","train_name":"Thiruvananthapuram Rajdhani Express","train_type":"Rajdhani","source":"Thiruvananthapuram","destination":"H. Nizamuddin","arrival_time_kannur":"03:12","departure_time_kannur":"03:15","running_days":"Wed,Fri,Sat","days_map":{"Mon":False,"Tue":False,"Wed":True,"Thu":False,"Fri":True,"Sat":True,"Sun":False}},
    {"train_number":"12484","train_name":"Amritsar-Kochuveli Weekly SF Express","train_type":"SF Express","source":"Amritsar","destination":"Kochuveli","arrival_time_kannur":"01:52","departure_time_kannur":"01:55","running_days":"Tue","days_map":{"Mon":False,"Tue":True,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":False}},
    {"train_number":"12602","train_name":"Mangalore Mail","train_type":"Mail","source":"Mangalore","destination":"Chennai Central","arrival_time_kannur":"15:57","departure_time_kannur":"16:00","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"12618","train_name":"Mangala Lakshadweep SF Express","train_type":"SF Express","source":"H. Nizamuddin","destination":"Ernakulam","arrival_time_kannur":"00:37","departure_time_kannur":"00:40","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"12685","train_name":"Chennai-Mangalore Superfast Express","train_type":"SF Express","source":"Chennai Central","destination":"Mangalore","arrival_time_kannur":"04:37","departure_time_kannur":"04:40","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16159","train_name":"Chennai Egmore-Mangalore Express","train_type":"Express","source":"Chennai Egmore","destination":"Mangalore","arrival_time_kannur":"15:47","departure_time_kannur":"15:50","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16308","train_name":"Kannur-Alappuzha Executive Express","train_type":"Executive","source":"Kannur","destination":"Alappuzha","arrival_time_kannur":"Source","departure_time_kannur":"05:10","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16334","train_name":"Veraval Express","train_type":"Express","source":"Thiruvananthapuram","destination":"Veraval","arrival_time_kannur":"01:37","departure_time_kannur":"01:40","running_days":"Tue","days_map":{"Mon":False,"Tue":True,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":False}},
    {"train_number":"16336","train_name":"Gandhidham Express","train_type":"Express","source":"Nagercoil","destination":"Gandhidham","arrival_time_kannur":"01:37","departure_time_kannur":"01:40","running_days":"Wed","days_map":{"Mon":False,"Tue":False,"Wed":True,"Thu":False,"Fri":False,"Sat":False,"Sun":False}},
    {"train_number":"16338","train_name":"Ernakulam-Okha Express","train_type":"Express","source":"Ernakulam","destination":"Okha","arrival_time_kannur":"01:37","departure_time_kannur":"01:40","running_days":"Thu,Sat","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":True,"Fri":False,"Sat":True,"Sun":False}},
    {"train_number":"16345","train_name":"Netravati Express","train_type":"Express","source":"LTT Mumbai","destination":"Thiruvananthapuram","arrival_time_kannur":"06:32","departure_time_kannur":"06:35","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16347","train_name":"Mangalore Express","train_type":"Express","source":"Thiruvananthapuram","destination":"Mangalore","arrival_time_kannur":"07:55","departure_time_kannur":"08:00","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16348","train_name":"Thiruvananthapuram Express","train_type":"Express","source":"Mangalore","destination":"Thiruvananthapuram","arrival_time_kannur":"16:52","departure_time_kannur":"16:55","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16356","train_name":"Antyodaya Express","train_type":"Antyodaya","source":"Mangalore","destination":"Kochuveli","arrival_time_kannur":"21:55","departure_time_kannur":"22:00","running_days":"Fri,Sun","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":False,"Fri":True,"Sat":False,"Sun":True}},
    {"train_number":"16512","train_name":"Kannur-KSR Bengaluru Express","train_type":"Express","source":"Kannur","destination":"KSR Bengaluru","arrival_time_kannur":"Source","departure_time_kannur":"17:05","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16527","train_name":"Yesvantpur Express","train_type":"Express","source":"Kannur","destination":"Yesvantpur","arrival_time_kannur":"Source","departure_time_kannur":"18:05","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16604","train_name":"Maveli Express","train_type":"Express","source":"Thiruvananthapuram","destination":"Mangalore","arrival_time_kannur":"04:55","departure_time_kannur":"05:00","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16606","train_name":"Ernad Express","train_type":"Express","source":"Thiruvananthapuram","destination":"Mangalore","arrival_time_kannur":"14:12","departure_time_kannur":"14:15","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16608","train_name":"Coimbatore-Kannur Express","train_type":"Express","source":"Coimbatore","destination":"Kannur","arrival_time_kannur":"21:00","departure_time_kannur":"Terminates","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16629","train_name":"Malabar Express (Southbound)","train_type":"Express","source":"Thiruvananthapuram","destination":"Mangalore","arrival_time_kannur":"06:37","departure_time_kannur":"06:40","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16630","train_name":"Malabar Express (Northbound)","train_type":"Express","source":"Mangalore","destination":"Thiruvananthapuram","arrival_time_kannur":"20:50","departure_time_kannur":"20:55","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16650","train_name":"Parasuram Express","train_type":"Express","source":"Kanyakumari","destination":"Mangalore","arrival_time_kannur":"18:26","departure_time_kannur":"18:29","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"16858","train_name":"Mangalore-Puducherry Express","train_type":"Express","source":"Mangalore","destination":"Puducherry","arrival_time_kannur":"18:32","departure_time_kannur":"18:35","running_days":"Sun","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":True}},
    {"train_number":"19259","train_name":"Kochuveli-Bhavnagar Express","train_type":"Express","source":"Kochuveli","destination":"Bhavnagar","arrival_time_kannur":"01:37","departure_time_kannur":"01:40","running_days":"Fri","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":False,"Fri":True,"Sat":False,"Sun":False}},
    {"train_number":"20631","train_name":"MAQ-TVC Vande Bharat Express","train_type":"Vande Bharat","source":"Mangalore","destination":"Thiruvananthapuram","arrival_time_kannur":"07:55","departure_time_kannur":"07:57","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"20632","train_name":"TVC-MAQ Vande Bharat Express","train_type":"Vande Bharat","source":"Thiruvananthapuram","destination":"Mangalore","arrival_time_kannur":"22:35","departure_time_kannur":"22:38","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"22610","train_name":"Coimbatore-Mangalore Intercity SF","train_type":"SF Express","source":"Coimbatore","destination":"Mangalore","arrival_time_kannur":"10:42","departure_time_kannur":"10:45","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"22637","train_name":"West Coast SF Express","train_type":"SF Express","source":"Chennai Central","destination":"Mangalore","arrival_time_kannur":"02:37","departure_time_kannur":"02:40","running_days":"Daily","days_map":{"Mon":True,"Tue":True,"Wed":True,"Thu":True,"Fri":True,"Sat":True,"Sun":True}},
    {"train_number":"22852","train_name":"Vivek SF Express","train_type":"SF Express","source":"Mangalore","destination":"Santragachi","arrival_time_kannur":"00:57","departure_time_kannur":"01:00","running_days":"Sun","days_map":{"Mon":False,"Tue":False,"Wed":False,"Thu":False,"Fri":False,"Sat":False,"Sun":True}},
]

TRAINS.sort(key=lambda t: t["departure_time_kannur"] if t["departure_time_kannur"] not in ("Source","Terminates") else "00:00")

def runs_today(t):
    day = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][datetime.now().weekday()]
    return t["days_map"].get(day, False)

GATES = [
    {"id":1,"lc":"LC-01","name":"Trikaripur South Gate","area":"Trikaripur","taluk":"Payyannur","road":"Trikaripur–Payyannur Rd","type":"M","stn":"PAY","km":2.8},
    {"id":2,"lc":"LC-02","name":"Payyannur Gate","area":"Payyannur","taluk":"Payyannur","road":"NH-66 / Station Road","type":"S","stn":"PAY","km":0.0},
    {"id":3,"lc":"LC-03","name":"Payyannur North Gate","area":"Payyannur","taluk":"Payyannur","road":"Payyannur North Road","type":"M","stn":"PAY","km":0.6},
    {"id":4,"lc":"LC-04","name":"Payyannur South Gate","area":"Payyannur","taluk":"Payyannur","road":"Payyannur South Road","type":"M","stn":"PAY","km":1.1},
    {"id":5,"lc":"LC-05","name":"Edat Gate","area":"Edat","taluk":"Payyannur","road":"Edat Main Road","type":"M","stn":"PAY","km":3.4},
    {"id":6,"lc":"LC-06","name":"Edat South Gate","area":"Edat","taluk":"Payyannur","road":"Edat–Ramanthali Road","type":"U","stn":"PAY","km":3.9},
    {"id":7,"lc":"LC-07","name":"Ramanthali Gate","area":"Ramanthali","taluk":"Payyannur","road":"Ramanthali Main Road","type":"M","stn":"PAY","km":6.2},
    {"id":8,"lc":"LC-08","name":"Ramanthali North Gate","area":"Ramanthali","taluk":"Payyannur","road":"Ramanthali North Road","type":"U","stn":"PAY","km":5.8},
    {"id":9,"lc":"LC-09","name":"Valapattanam Gate","area":"Valapattanam","taluk":"Kannur","road":"Valapattanam River Road","type":"M","stn":"CAN","km":5.8},
    {"id":10,"lc":"LC-10","name":"Valapattanam North","area":"Valapattanam","taluk":"Kannur","road":"Valapattanam North Road","type":"U","stn":"CAN","km":6.3},
    {"id":11,"lc":"LC-11","name":"Pazhayangadi Gate","area":"Pazhayangadi","taluk":"Kannur","road":"Pazhayangadi Town Road","type":"I","stn":"CAN","km":3.6},
    {"id":12,"lc":"LC-12","name":"Pazhayangadi North","area":"Pazhayangadi","taluk":"Kannur","road":"Pazhayangadi North Road","type":"U","stn":"CAN","km":4.1},
    {"id":13,"lc":"LC-13","name":"Peringome Gate","area":"Peringome","taluk":"Kannur","road":"Peringome Main Road","type":"M","stn":"CAN","km":2.2},
    {"id":14,"lc":"LC-14","name":"Peringome South Gate","area":"Peringome","taluk":"Kannur","road":"Peringome–Madai Road","type":"U","stn":"CAN","km":1.7},
    {"id":15,"lc":"LC-15","name":"Madai Gate","area":"Madai","taluk":"Kannur","road":"Madai–Payangadi Road","type":"M","stn":"CAN","km":0.3},
    {"id":16,"lc":"LC-16","name":"Madai South Gate","area":"Madai","taluk":"Kannur","road":"Madai South Road","type":"U","stn":"CAN","km":0.2},
    {"id":17,"lc":"LC-17","name":"Pappinisseri Gate","area":"Pappinisseri","taluk":"Kannur","road":"Pappinisseri Main Road","type":"M","stn":"CAN","km":7.5},
    {"id":18,"lc":"LC-18","name":"Pappinisseri North","area":"Pappinisseri","taluk":"Kannur","road":"Pappinisseri North Road","type":"U","stn":"CAN","km":7.0},
    {"id":19,"lc":"LC-19","name":"Pappinisseri South","area":"Pappinisseri","taluk":"Kannur","road":"Pappinisseri–Kannapuram Rd","type":"M","stn":"CAN","km":8.1},
    {"id":20,"lc":"LC-20","name":"Kannapuram Gate","area":"Kannapuram","taluk":"Kannur","road":"Kannapuram–Mattannur Road","type":"I","stn":"CAN","km":9.5},
    {"id":21,"lc":"LC-21","name":"Kannapuram East Gate","area":"Kannapuram","taluk":"Kannur","road":"Kannapuram East Road","type":"U","stn":"CAN","km":9.9},
    {"id":22,"lc":"LC-22","name":"Dharmadam Gate","area":"Dharmadam","taluk":"Kannur","road":"Dharmadam Beach Road","type":"M","stn":"CAN","km":4.4},
    {"id":23,"lc":"LC-23","name":"Chirakkal Gate","area":"Chirakkal","taluk":"Kannur","road":"Chirakkal–Kannapuram Road","type":"M","stn":"CAN","km":3.7},
    {"id":24,"lc":"LC-24","name":"Chirakkal South Gate","area":"Chirakkal","taluk":"Kannur","road":"Chirakkal South Road","type":"U","stn":"CAN","km":3.3},
    {"id":25,"lc":"LC-25","name":"Azhikkal Gate","area":"Azhikkal","taluk":"Kannur","road":"Azhikkal Harbour Road","type":"M","stn":"CAN","km":2.6},
    {"id":26,"lc":"LC-26","name":"Kannur Gate","area":"Kannur Town","taluk":"Kannur","road":"SM Street / Station Road","type":"S","stn":"CAN","km":0.0},
    {"id":27,"lc":"LC-27","name":"Kannur North Gate","area":"Kannur North","taluk":"Kannur","road":"Kannur North Station Road","type":"M","stn":"CAN","km":0.5},
    {"id":28,"lc":"LC-28","name":"Kannur South Gate","area":"Kannur South","taluk":"Kannur","road":"Kannur South Road","type":"M","stn":"CAN","km":0.6},
    {"id":29,"lc":"LC-29","name":"Palayad Gate","area":"Palayad","taluk":"Kannur","road":"Palayad Main Road","type":"M","stn":"CAN","km":1.2},
    {"id":30,"lc":"LC-30","name":"Payangadi Gate","area":"Payangadi","taluk":"Kannur","road":"Payangadi Road","type":"M","stn":"CAN","km":2.1},
    {"id":31,"lc":"LC-31","name":"Payangadi South Gate","area":"Payangadi","taluk":"Kannur","road":"Payangadi South Road","type":"U","stn":"CAN","km":2.6},
    {"id":32,"lc":"LC-32","name":"Iritty Gate","area":"Iritty","taluk":"Irikkur","road":"Iritty Town Road","type":"M","stn":"CAN","km":3.5},
    {"id":33,"lc":"LC-33","name":"Iritty North Gate","area":"Iritty","taluk":"Irikkur","road":"Iritty North Road","type":"U","stn":"CAN","km":3.0},
    {"id":34,"lc":"LC-34","name":"Iritty South Gate","area":"Iritty South","taluk":"Irikkur","road":"Iritty–Thalassery Road","type":"U","stn":"CAN","km":4.1},
    {"id":35,"lc":"LC-35","name":"Thalassery North Gate","area":"Thalassery","taluk":"Thalassery","road":"Thalassery North Road","type":"M","stn":"TLY","km":0.9},
    {"id":36,"lc":"LC-36","name":"Thalassery Gate","area":"Thalassery","taluk":"Thalassery","road":"Thalassery Town Road","type":"S","stn":"TLY","km":0.0},
    {"id":37,"lc":"LC-37","name":"Thalassery South Gate","area":"Thalassery","taluk":"Thalassery","road":"Thalassery South Road","type":"M","stn":"TLY","km":0.6},
    {"id":38,"lc":"LC-38","name":"Thalassery Bazaar Gate","area":"Thalassery Baz","taluk":"Thalassery","road":"Thalassery Bazaar Road","type":"M","stn":"TLY","km":0.2},
    {"id":39,"lc":"LC-39","name":"Muzhappilangad Gate","area":"Muzhappilangad","taluk":"Thalassery","road":"Muzhappilangad Beach Road","type":"M","stn":"TLY","km":2.1},
    {"id":40,"lc":"LC-40","name":"Muzhappilangad North","area":"Muzhappilangad","taluk":"Thalassery","road":"Muzhappilangad North Road","type":"U","stn":"TLY","km":1.7},
    {"id":41,"lc":"LC-41","name":"Edakkad Gate","area":"Edakkad","taluk":"Thalassery","road":"Edakkad Road","type":"M","stn":"TLY","km":3.4},
    {"id":42,"lc":"LC-42","name":"Edakkad South Gate","area":"Edakkad","taluk":"Thalassery","road":"Edakkad–Mahe Road","type":"U","stn":"TLY","km":3.9},
    {"id":43,"lc":"LC-43","name":"Kadambur Gate","area":"Kadambur","taluk":"Thalassery","road":"Kadambur Road","type":"U","stn":"TLY","km":5.0},
    {"id":44,"lc":"LC-44","name":"Mahe North Gate","area":"Mahe North","taluk":"Mahe","road":"Mahe North Road","type":"M","stn":"MAHE","km":0.5},
    {"id":45,"lc":"LC-45","name":"Mahe Gate","area":"Mahe","taluk":"Mahe","road":"Mahe Town Road","type":"I","stn":"MAHE","km":0.0},
    {"id":46,"lc":"LC-46","name":"New Mahe Gate","area":"Mahe","taluk":"Mahe","road":"New Mahe Bypass Road","type":"M","stn":"MAHE","km":0.4},
    {"id":47,"lc":"LC-47","name":"Mahe South Gate","area":"Mahe South","taluk":"Mahe","road":"Mahe South Road","type":"U","stn":"MAHE","km":0.8},
]

def t2m(s):
    if not s or s in ("Source","Terminates","--"): return None
    try:
        h,m = map(int,s.split(":")); return h*60+m
    except: return None

def gate_status(gate):
    now_m = datetime.now().hour*60+datetime.now().minute+datetime.now().second/60
    events=[]
    for t in TRAINS:
        if not runs_today(t): continue
        stn_t = t2m(t["departure_time_kannur"]) or t2m(t["arrival_time_kannur"])
        if stn_t is None: continue
        travel=(gate["km"]/55)*60
        arrive=stn_t+travel; depart=arrive+5
        dc=(arrive-now_m)*60; do=(depart-now_m)*60
        events.append({"train_number":t["train_number"],"train_name":t["train_name"],"train_type":t["train_type"],"diff_close_secs":int(dc),"diff_open_secs":int(do)})
    events.sort(key=lambda e:e["diff_close_secs"])
    is_closed=False; opens_in=None; closes_in=None; cur=None; nxt=None
    for ev in events:
        dc,do=ev["diff_close_secs"],ev["diff_open_secs"]
        if dc<=0 and do>0: is_closed=True;opens_in=do;cur=ev;break
        elif 0<dc<=1800: closes_in=dc;nxt=ev;break
    return {"is_closed":is_closed,"opens_in_secs":opens_in,"closes_in_secs":closes_in,"current_train":cur,"next_train":nxt,"upcoming":events[:3]}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/trains")
def api_trains():
    result = list(TRAINS)
    if request.args.get("today")=="1": result=[t for t in result if runs_today(t)]
    if request.args.get("type"): result=[t for t in result if t["train_type"].lower()==request.args["type"].lower()]
    if request.args.get("day"): result=[t for t in result if t["days_map"].get(request.args["day"].capitalize(),False)]
    return jsonify({"ok":True,"count":len(result),"trains":result})

@app.route("/api/trains/today")
def api_today():
    day=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][datetime.now().weekday()]
    result=[t for t in TRAINS if runs_today(t)]
    return jsonify({"ok":True,"today":day,"count":len(result),"trains":result})

@app.route("/api/trains/<train_number>")
def api_train(train_number):
    t=next((x for x in TRAINS if x["train_number"]==train_number),None)
    if not t: return jsonify({"ok":False,"error":f"Train {train_number} not found"}),404
    return jsonify({"ok":True,"train":t})

@app.route("/api/gates")
def api_gates():
    results=[{**g,"status":gate_status(g)} for g in GATES]
    closed=sum(1 for g in results if g["status"]["is_closed"])
    return jsonify({"ok":True,"total_gates":len(results),"closed_count":closed,"open_count":len(results)-closed,"timestamp":datetime.now().isoformat(),"gates":results})

@app.route("/api/gates/<int:gid>")
def api_gate(gid):
    g=next((x for x in GATES if x["id"]==gid),None)
    if not g: return jsonify({"ok":False,"error":"Gate not found"}),404
    return jsonify({"ok":True,"gate":{**g,"status":gate_status(g)}})

@app.route("/api/status")
def api_status():
    day=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][datetime.now().weekday()]
    return jsonify({"ok":True,"server":"RailGate Kannur","status":"running","time":datetime.now().strftime("%H:%M:%S"),"today":day,"total_trains":len(TRAINS),"trains_today":sum(1 for t in TRAINS if runs_today(t)),"total_gates":len(GATES),"endpoints":{"all_trains":"GET /api/trains","today_trains":"GET /api/trains/today","single_train":"GET /api/trains/12625","all_gates":"GET /api/gates","single_gate":"GET /api/gates/26","health":"GET /api/status"}})

if __name__ == "__main__":
    day=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][datetime.now().weekday()]
    today=sum(1 for t in TRAINS if runs_today(t))
    print(f"\n🚦 RailGate Kannur Backend")
    print(f"📅 Today: {day} | 🚂 Trains: {len(TRAINS)} | Running today: {today} | 🚦 Gates: {len(GATES)}")
    print(f"\n🌐 http://localhost:5000")
    print(f"🚂 http://localhost:5000/api/trains")
    print(f"🚦 http://localhost:5000/api/gates")
    print(f"❤️  http://localhost:5000/api/status\n")
    app.run(debug=True, host="0.0.0.0", port=5000)
