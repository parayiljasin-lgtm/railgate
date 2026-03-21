// ═══════════════════════════════════════════════════════════
// LIVE API CONNECTION — fetches real data from Flask backend
// ═══════════════════════════════════════════════════════════

const API_URL = '/api/gates';        // gate open/close status
const TRAINS_URL = '/api/trains';    // train schedule

let liveMode = false;

// Called every 30 seconds — fetches live gate data from Flask
async function fetchLiveData() {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error('Server responded with ' + res.status);
    const data = await res.json();
    if (!data.ok || !data.gates) throw new Error('Bad data');

    // Apply live gate statuses to local state S
    const now = Math.floor(Date.now() / 1000);
    data.gates.forEach(g => {
      const st = g.status;
      if (!st) return;
      S[g.id] = {
        cl:      st.is_closed,
        oA:      st.opens_in_secs  ? now + st.opens_in_secs  : 0,
        cA:      st.opens_in_secs  ? now - (300 - st.opens_in_secs) : 0,
        closeIn: st.closes_in_secs ? now + st.closes_in_secs : null,
        trains:  buildTrains(st),
        live:    true,
      };
    });

    if (!liveMode) {
      liveMode = true;
      toast('✅ Connected to live data!');
    }
    return true;
  } catch (err) {
    // Backend not running — fall back to simulation
    return false;
  }
}

// Build trains array from API status object
function buildTrains(st) {
  const trains = [];
  if (st.current_train) {
    trains.push({
      num:  st.current_train.train_number,
      name: st.current_train.train_name,
      type: st.current_train.train_type || 'Express',
      eta:  'crossing',
    });
  }
  if (st.next_train) {
    const mins = Math.ceil((st.closes_in_secs || 0) / 60);
    trains.push({
      num:  st.next_train.train_number,
      name: st.next_train.train_name,
      type: st.next_train.train_type || 'Express',
      eta:  `+${mins} min`,
    });
  }
  return trains;
}

// Smart refresh: try live API first, fall back to simulation
async function smartRefresh() {
  const gotLive = await fetchLiveData();
  if (!gotLive) initS(); // use simulation if backend not available
}

/**
 * RailGate Kannur — script.js
 * All JavaScript — loaded from /static/script.js by Flask
 *
 * KEY FUNCTION: fetchGates() calls GET /api/gates from backend
 * KEY FUNCTION: fetchTrains() calls GET /api/trains from backend
 */

const G=[
  {id:1, lc:"LC-01",name:"Trikaripur South Gate",ml:"തൃക്കരിപ്പൂർ സൗത്ത്",area:"Trikaripur",    taluk:"Payyannur", road:"Trikaripur–Payyannur Rd",   type:"M",gk:"Manoj T.",    km:"142.4"},
  {id:2, lc:"LC-02",name:"Payyannur Gate",        ml:"പയ്യന്നൂർ ഗേറ്റ്",   area:"Payyannur",     taluk:"Payyannur", road:"NH-66 / Station Road",      type:"S",gk:"Sreeja K.",   km:"145.2"},
  {id:3, lc:"LC-03",name:"Payyannur North Gate",  ml:"പയ്യന്നൂർ നോർത്ത്",  area:"Payyannur",     taluk:"Payyannur", road:"Payyannur North Road",      type:"M",gk:"Biju V.",     km:"145.8"},
  {id:4, lc:"LC-04",name:"Payyannur South Gate",  ml:"പയ്യന്നൂർ സൗത്ത്",   area:"Payyannur",     taluk:"Payyannur", road:"Payyannur South Road",      type:"M",gk:"Aneesh P.",   km:"146.3"},
  {id:5, lc:"LC-05",name:"Edat Gate",             ml:"എടത്ത് ഗേറ്റ്",       area:"Edat",          taluk:"Payyannur", road:"Edat Main Road",            type:"M",gk:"Rajan E.",    km:"148.6"},
  {id:6, lc:"LC-06",name:"Edat South Gate",       ml:"എടത്ത് സൗത്ത്",       area:"Edat",          taluk:"Payyannur", road:"Edat–Ramanthali Road",      type:"U",gk:"—",           km:"149.1"},
  {id:7, lc:"LC-07",name:"Ramanthali Gate",       ml:"രാമന്തളി ഗേറ്റ്",     area:"Ramanthali",    taluk:"Payyannur", road:"Ramanthali Main Road",      type:"M",gk:"Noushad K.",  km:"151.4"},
  {id:8, lc:"LC-08",name:"Ramanthali North Gate", ml:"രാമന്തളി നോർത്ത്",    area:"Ramanthali",    taluk:"Payyannur", road:"Ramanthali North Road",     type:"U",gk:"—",           km:"151.0"},
  {id:9, lc:"LC-09",name:"Valapattanam Gate",     ml:"വളപട്ടണം ഗേറ്റ്",     area:"Valapattanam",  taluk:"Kannur",    road:"Valapattanam River Road",   type:"M",gk:"Sudhir V.",   km:"153.7"},
  {id:10,lc:"LC-10",name:"Valapattanam North",    ml:"വളപട്ടണം നോർത്ത്",    area:"Valapattanam",  taluk:"Kannur",    road:"Valapattanam North Road",   type:"U",gk:"—",           km:"153.2"},
  {id:11,lc:"LC-11",name:"Pazhayangadi Gate",     ml:"പഴയങ്ങാടി ഗേറ്റ്",    area:"Pazhayangadi",  taluk:"Kannur",    road:"Pazhayangadi Town Road",    type:"I",gk:"Vijayan P.",  km:"155.9"},
  {id:12,lc:"LC-12",name:"Pazhayangadi North",    ml:"പഴയങ്ങാടി നോർത്ത്",   area:"Pazhayangadi",  taluk:"Kannur",    road:"Pazhayangadi North Road",   type:"U",gk:"—",           km:"155.4"},
  {id:13,lc:"LC-13",name:"Peringome Gate",        ml:"പേരിങ്ങോം ഗേറ്റ്",     area:"Peringome",     taluk:"Kannur",    road:"Peringome Main Road",       type:"M",gk:"Rajan P.",    km:"157.3"},
  {id:14,lc:"LC-14",name:"Peringome South Gate",  ml:"പേരിങ്ങോം സൗത്ത്",     area:"Peringome",     taluk:"Kannur",    road:"Peringome–Madai Road",      type:"U",gk:"—",           km:"157.8"},
  {id:15,lc:"LC-15",name:"Madai Gate",            ml:"മടായി ഗേറ്റ്",          area:"Madai",         taluk:"Kannur",    road:"Madai–Payangadi Road",      type:"M",gk:"Anitha R.",   km:"159.2"},
  {id:16,lc:"LC-16",name:"Madai South Gate",      ml:"മടായി സൗത്ത്",          area:"Madai",         taluk:"Kannur",    road:"Madai South Road",          type:"U",gk:"—",           km:"159.7"},
  {id:17,lc:"LC-17",name:"Pappinisseri Gate",     ml:"പാപ്പിനിശ്ശേരി ഗേറ്റ്",area:"Pappinisseri",  taluk:"Kannur",    road:"Pappinisseri Main Road",    type:"M",gk:"Biju M.",     km:"161.5"},
  {id:18,lc:"LC-18",name:"Pappinisseri North",    ml:"പാപ്പിനിശ്ശേരി നോർത്ത്",area:"Pappinisseri", taluk:"Kannur",    road:"Pappinisseri North Road",   type:"U",gk:"—",           km:"161.0"},
  {id:19,lc:"LC-19",name:"Pappinisseri South",    ml:"പാപ്പിനിശ്ശേരി സൗത്ത്",area:"Pappinisseri",  taluk:"Kannur",    road:"Pappinisseri–Kannapuram Rd",type:"M",gk:"Shyam P.",    km:"162.1"},
  {id:20,lc:"LC-20",name:"Kannapuram Gate",       ml:"കണ്ണപുരം ഗേറ്റ്",       area:"Kannapuram",    taluk:"Kannur",    road:"Kannapuram–Mattannur Road", type:"I",gk:"Suresh V.",   km:"163.8",feat:true},
  {id:21,lc:"LC-21",name:"Kannapuram East Gate",  ml:"കണ്ണപുരം ഈസ്റ്റ്",      area:"Kannapuram",    taluk:"Kannur",    road:"Kannapuram East Road",      type:"U",gk:"—",           km:"164.2"},
  {id:22,lc:"LC-22",name:"Dharmadam Gate",        ml:"ധർമ്മടം ഗേറ്റ്",        area:"Dharmadam",     taluk:"Kannur",    road:"Dharmadam Beach Road",      type:"M",gk:"Ajith K.",    km:"165.4"},
  {id:23,lc:"LC-23",name:"Chirakkal Gate",        ml:"ചിറക്കൽ ഗേറ്റ്",        area:"Chirakkal",     taluk:"Kannur",    road:"Chirakkal–Kannapuram Road", type:"M",gk:"Pradeep N.",  km:"166.1"},
  {id:24,lc:"LC-24",name:"Chirakkal South Gate",  ml:"ചിറക്കൽ സൗത്ത്",        area:"Chirakkal",     taluk:"Kannur",    road:"Chirakkal South Road",      type:"U",gk:"—",           km:"166.5"},
  {id:25,lc:"LC-25",name:"Azhikkal Gate",         ml:"അഴിക്കൽ ഗേറ്റ്",         area:"Azhikkal",      taluk:"Kannur",    road:"Azhikkal Harbour Road",     type:"M",gk:"Basheer A.",  km:"167.2"},
  {id:26,lc:"LC-26",name:"Kannur Gate",           ml:"കണ്ണൂർ ഗേറ്റ്",           area:"Kannur Town",   taluk:"Kannur",    road:"SM Street / Station Road",  type:"S",gk:"Rajan K.",    km:"168.3"},
  {id:27,lc:"LC-27",name:"Kannur North Gate",     ml:"കണ്ണൂർ നോർത്ത്",          area:"Kannur North",  taluk:"Kannur",    road:"Kannur North Station Road", type:"M",gk:"Rajeev K.",   km:"167.8"},
  {id:28,lc:"LC-28",name:"Kannur South Gate",     ml:"കണ്ണൂർ സൗത്ത്",           area:"Kannur South",  taluk:"Kannur",    road:"Kannur South Road",         type:"M",gk:"Krishnan M.", km:"168.9"},
  {id:29,lc:"LC-29",name:"Palayad Gate",          ml:"പാലയാട് ഗേറ്റ്",          area:"Palayad",       taluk:"Kannur",    road:"Palayad Main Road",         type:"M",gk:"Shibu P.",    km:"169.5"},
  {id:30,lc:"LC-30",name:"Payangadi Gate",        ml:"പയ്യങ്ങാടി ഗേറ്റ്",       area:"Payangadi",     taluk:"Kannur",    road:"Payangadi Road",            type:"M",gk:"Shafi P.",    km:"170.4"},
  {id:31,lc:"LC-31",name:"Payangadi South Gate",  ml:"പയ്യങ്ങാടി സൗത്ത്",       area:"Payangadi",     taluk:"Kannur",    road:"Payangadi South Road",      type:"U",gk:"—",           km:"170.9"},
  {id:32,lc:"LC-32",name:"Iritty Gate",           ml:"ഇരിട്ടി ഗേറ്റ്",          area:"Iritty",        taluk:"Irikkur",   road:"Iritty Town Road",          type:"M",gk:"Soman I.",    km:"171.8"},
  {id:33,lc:"LC-33",name:"Iritty North Gate",     ml:"ഇരിട്ടി നോർത്ത്",         area:"Iritty",        taluk:"Irikkur",   road:"Iritty North Road",         type:"U",gk:"—",           km:"171.3"},
  {id:34,lc:"LC-34",name:"Iritty South Gate",     ml:"ഇരിട്ടി സൗത്ത്",          area:"Iritty South",  taluk:"Irikkur",   road:"Iritty–Thalassery Road",    type:"U",gk:"—",           km:"172.4"},
  {id:35,lc:"LC-35",name:"Thalassery North Gate", ml:"തലശ്ശേരി നോർത്ത്",        area:"Thalassery",    taluk:"Thalassery",road:"Thalassery North Road",     type:"M",gk:"Anoop T.",    km:"174.2"},
  {id:36,lc:"LC-36",name:"Thalassery Gate",       ml:"തലശ്ശേരി ഗേറ്റ്",          area:"Thalassery",    taluk:"Thalassery",road:"Thalassery Town Road",      type:"S",gk:"Joseph M.",   km:"175.1"},
  {id:37,lc:"LC-37",name:"Thalassery South Gate", ml:"തലശ്ശേരി സൗത്ത്",          area:"Thalassery",    taluk:"Thalassery",road:"Thalassery South Road",     type:"M",gk:"Dileep T.",   km:"175.7"},
  {id:38,lc:"LC-38",name:"Thalassery Bazaar Gate",ml:"തലശ്ശേരി ബസാർ",           area:"Thalassery Baz",taluk:"Thalassery",road:"Thalassery Bazaar Road",    type:"M",gk:"Santhosh B.", km:"175.3"},
  {id:39,lc:"LC-39",name:"Muzhappilangad Gate",   ml:"മുഴപ്പിലങ്ങാട് ഗേറ്റ്",  area:"Muzhappilangad",taluk:"Thalassery",road:"Muzhappilangad Beach Road", type:"M",gk:"Sunil M.",    km:"177.2"},
  {id:40,lc:"LC-40",name:"Muzhappilangad North",  ml:"മുഴപ്പിലങ്ങാട് നോർത്ത്", area:"Muzhappilangad",taluk:"Thalassery",road:"Muzhappilangad North Road", type:"U",gk:"—",           km:"176.8"},
  {id:41,lc:"LC-41",name:"Edakkad Gate",          ml:"എടക്കാട് ഗേറ്റ്",         area:"Edakkad",       taluk:"Thalassery",road:"Edakkad Road",              type:"M",gk:"Vinayan E.",  km:"178.5"},
  {id:42,lc:"LC-42",name:"Edakkad South Gate",    ml:"എടക്കാട് സൗത്ത്",         area:"Edakkad",       taluk:"Thalassery",road:"Edakkad–Mahe Road",         type:"U",gk:"—",           km:"179.0"},
  {id:43,lc:"LC-43",name:"Kadambur Gate",         ml:"കടമ്പൂർ ഗേറ്റ്",          area:"Kadambur",      taluk:"Thalassery",road:"Kadambur Road",             type:"U",gk:"—",           km:"180.1"},
  {id:44,lc:"LC-44",name:"Mahe North Gate",       ml:"മാഹി നോർത്ത്",             area:"Mahe North",    taluk:"Mahe",      road:"Mahe North Road",           type:"M",gk:"Rajan M.",    km:"181.2"},
  {id:45,lc:"LC-45",name:"Mahe Gate",             ml:"മാഹി ഗേറ്റ്",              area:"Mahe",          taluk:"Mahe",      road:"Mahe Town Road",            type:"I",gk:"Ravi P.",     km:"181.7"},
  {id:46,lc:"LC-46",name:"New Mahe Gate",         ml:"ന്യൂ മാഹി ഗേറ്റ്",         area:"Mahe",          taluk:"Mahe",      road:"New Mahe Bypass Road",      type:"M",gk:"Santhosh R.", km:"182.1"},
  {id:47,lc:"LC-47",name:"Mahe South Gate",       ml:"മാഹി സൗത്ത്",              area:"Mahe South",    taluk:"Mahe",      road:"Mahe South Road",           type:"U",gk:"—",           km:"182.5"},
];

const DEMO_TR=[
  {num:"12625",name:"Kerala Express",    type:"SF Express"},
  {num:"16305",name:"Kannur Express",    type:"Express"},
  {num:"12618",name:"Mangala Lakshadweep",type:"SF Express"},
  {num:"22637",name:"West Coast Express",type:"SF Express"},
  {num:"16629",name:"Malabar Express",   type:"Express"},
  {num:"16650",name:"Parasuram Express", type:"Express"},
  {num:"20631",name:"Vande Bharat",      type:"Vande Bharat"},
  {num:"12431",name:"Rajdhani Express",  type:"Rajdhani"},
];

const TO=["Payyannur","Kannur","Irikkur","Thalassery","Mahe"];
let S={},af='all',isMl=false,noOn=false,liveMode=false;
let favs=JSON.parse(localStorage.getItem('rg_kn_f')||'[]');
let curQ='',curTaluk='all',curRes=[];

// ── FETCH FROM BACKEND ────────────────────────────────────────────
async function fetchGates(){
  try{
    const res=await fetch("/api/gates",{signal:AbortSignal.timeout(8000)});
    const data=await res.json();
    if(!data.ok||!data.gates)throw new Error("bad");
    const now=Math.floor(Date.now()/1000);
    data.gates.forEach(g=>{
      const st=g.status;if(!st)return;
      S[g.id]={
        cl:st.is_closed,
        oA:st.opens_in_secs?now+st.opens_in_secs:0,
        cA:st.opens_in_secs?now-(300-st.opens_in_secs):0,
        closeIn:st.closes_in_secs?now+st.closes_in_secs:null,
        trains:buildTr(st),live:true
      };
    });
    if(!liveMode){liveMode=true;toast('✅ Live data connected!');
      const b=document.querySelector('.pill-live');
      if(b)b.innerHTML='<div class="ldot"></div>LIVE DATA';}
    updStats();updTicker();
  }catch(e){if(!liveMode){console.log('Backend offline — using simulation');initSim();}}
}

function buildTr(st){
  const t=[];
  if(st.current_train)t.push({num:st.current_train.train_number,name:st.current_train.train_name,type:st.current_train.train_type||'Express',eta:'crossing'});
  if(st.next_train){const m=Math.ceil((st.closes_in_secs||0)/60);t.push({num:st.next_train.train_number,name:st.next_train.train_name,type:st.next_train.train_type||'Express',eta:`+${m} min`});}
  return t;
}

// ── SIMULATION FALLBACK ───────────────────────────────────────────
function rand(s,a,b){const x=Math.sin(s)*10000;return a+Math.floor((x-Math.floor(x))*(b-a+1));}
function initSim(){
  const now=Math.floor(Date.now()/1000);
  G.forEach(g=>{
    const seed=Math.floor(now/300)+g.id*37;
    const cl=g.type!=='U'&&rand(seed,0,4)===0;
    const cA=cl?now-rand(seed+1,10,100):0,oA=cl?cA+rand(seed+2,80,250):0;
    const n=cl?rand(g.id+seed,1,2):rand(g.id+seed+5,0,1);
    const trains=[],used=new Set();
    for(let i=0;i<n;i++){let x;do{x=rand(seed+g.id+i*13,0,DEMO_TR.length-1);}while(used.has(x));used.add(x);trains.push({...DEMO_TR[x],eta:cl?'crossing':`+${rand(g.id+i,2,18)} min`});}
    const em=(!cl&&trains.length)?parseInt((trains[0].eta||'+10 min').replace(/\D+/g,''))||10:null;
    S[g.id]={cl,cA,oA,closeIn:em?now+em*60:null,trains,live:false};
  });
  updStats();updTicker();
}

function sl(id){const s=S[id];if(!s||!s.cl)return null;const r=s.oA-Math.floor(Date.now()/1000);return r>0?r:0;}
function sc(id){const s=S[id];if(!s||s.cl||!s.closeIn)return null;const r=s.closeIn-Math.floor(Date.now()/1000);return r>0?r:0;}
function pg(id){const s=S[id];if(!s||!s.cl)return 100;return Math.min(100,Math.max(0,(Math.floor(Date.now()/1000)-s.cA)/(s.oA-s.cA)*100));}
function ft(s){if(s<=0)return isMl?'തുറക്കുന്നു...':'Opening...';return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
function ftC(s){if(s<=0)return isMl?'അടയ്ക്കുന്നു...':'Closing...';if(s<=120)return s+'s';return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}

function updStats(){
  document.getElementById('hs-t').textContent=G.length;
  document.getElementById('hs-o').textContent=G.filter(g=>!S[g.id]?.cl).length;
  document.getElementById('hs-c').textContent=G.filter(g=>S[g.id]?.cl).length;
}

function updTicker(){
  const b=document.getElementById('tkbody');if(!b)return;
  b.innerHTML=G.slice(0,5).map(g=>{const cl=S[g.id]?.cl;return`<div class="tick-row"><span>${isMl?g.ml:g.name}</span><span class="tick-st ${cl?'cl':'op'}">${cl?'🔴 CLOSED':'🟢 OPEN'}</span></div>`;}).join('');
}

function doSearch(){
  const q=document.getElementById('qi').value.trim().toLowerCase();
  const taluk=document.getElementById('qt').value;
  curQ=q;curTaluk=taluk;
  let r=G.filter(g=>{
    const mT=taluk==='all'||g.taluk===taluk;
    const mQ=!q||g.name.toLowerCase().includes(q)||g.area.toLowerCase().includes(q)||g.road.toLowerCase().includes(q)||g.taluk.toLowerCase().includes(q)||g.lc.toLowerCase().includes(q);
    return mT&&mQ;
  });
  showR(r,taluk!=='all'?taluk+' Taluk':(q?`"${q}"`:'All Kannur Gates'));
}

function qs(k){document.getElementById('qi').value=k;document.getElementById('qt').value='all';doSearch();}
function qclosed(){curQ='';curTaluk='all';showR(G.filter(g=>S[g.id]?.cl),'🔴 Closed Gates Now');}
function qopen(){curQ='';curTaluk='all';showR(G.filter(g=>!S[g.id]?.cl),'🟢 Open Gates Now');}

function showR(r,lbl){
  curRes=r;
  document.getElementById('pg-s').style.display='none';
  document.getElementById('pg-r').style.display='block';
  document.getElementById('rtitle').textContent=lbl;
  af='all';document.querySelectorAll('.ftab').forEach(b=>b.classList.remove('on'));
  document.getElementById('ft-all').classList.add('on');
  renderL(r);
}

function goBack(){document.getElementById('pg-r').style.display='none';document.getElementById('pg-s').style.display='flex';}

function setF(f,btn){
  af=f;document.querySelectorAll('.ftab').forEach(b=>b.classList.remove('on'));btn.classList.add('on');
  let l=curRes;
  if(f==='open')l=l.filter(g=>!S[g.id]?.cl);
  if(f==='closed')l=l.filter(g=>S[g.id]?.cl);
  if(f==='favs')l=l.filter(g=>favs.includes(g.id));
  renderL(l);
}

function renderL(list){
  const el=document.getElementById('glist');el.innerHTML='';
  let nO=0,nC=0,nT=0;
  list.forEach(g=>{const s=S[g.id];if(!s)return;s.cl?nC++:nO++;nT+=s.trains.length;});
  document.getElementById('rcnt').textContent=list.length+' gate'+(list.length!==1?'s':'');
  document.getElementById('is-o').textContent=nO;
  document.getElementById('is-c').textContent=nC;
  document.getElementById('is-t').textContent=nT;
  if(!list.length){el.innerHTML='<div class="nores"><div style="font-size:2rem;margin-bottom:.5rem;">🔍</div>No gates found.</div>';return;}
  const grp={};list.forEach(g=>{if(!grp[g.taluk])grp[g.taluk]=[];grp[g.taluk].push(g);});
  const ord=TO.filter(t=>grp[t]);Object.keys(grp).forEach(t=>{if(!ord.includes(t))ord.push(t);});
  ord.forEach(taluk=>{
    if(ord.length>1){
      const d=document.createElement('div');d.className='ddiv';
      const tO=grp[taluk].filter(g=>!S[g.id]?.cl).length,tC=grp[taluk].filter(g=>S[g.id]?.cl).length;
      d.innerHTML=`${taluk} Taluk <span class="ddiv-sub">${grp[taluk].length} gates · <span style="color:var(--gn);">${tO} open</span> · <span style="color:var(--rd);">${tC} closed</span></span>`;
      el.appendChild(d);
    }
    grp[taluk].forEach(g=>el.appendChild(mkCard(g)));
  });
}

function mkCard(g){
  const s=S[g.id];if(!s)return document.createElement('div');
  const isOp=!s.cl,fav=favs.includes(g.id),name=isMl?g.ml:g.name;
  const cis=sc(g.id),sec=sl(g.id),pr=pg(g.id),urg=cis!==null&&cis<=120;
  const tl={S:'SPECIAL',I:'INTERLOCKED',M:'MANNED',U:'UNMANNED'};
  let tH;
  if(s.cl)tH=`<div class="tblock"><div class="tbl" style="color:var(--rd);">🔴 ${isMl?'തുറക്കുന്ന സമയം':'Opens in'}</div><div class="tbt" id="tm-${g.id}" style="color:var(--rd);">${ft(sec)}</div><div class="tpw"><div class="tpb" id="pb-${g.id}" style="width:${pr}%"></div></div></div>`;
  else if(g.type==='U')tH=`<div class="tblock"><div class="tbl">Status</div><div class="tbt op">⚠️ Unmanned — use caution</div></div>`;
  else if(cis!==null)tH=`<div class="tblock" id="ci-block-${g.id}" style="border:1px solid ${urg?'rgba(231,76,60,0.5)':'rgba(245,166,35,0.4)'};background:${urg?'rgba(231,76,60,0.06)':'rgba(245,166,35,0.04)'};"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;"><div><div class="tbl" id="ci-lbl-${g.id}" style="color:${urg?'var(--rd)':'var(--ac)'};">${urg?(isMl?'🚨 ഇപ്പോൾ അടയ്ക്കുന്നു!':'🚨 CLOSING SOON!'):(isMl?'⚠️ അടയ്ക്കുന്ന സമയം':'⚠️ Gate closes in')}</div><div id="ci-${g.id}" style="font-family:'IBM Plex Mono',monospace;font-size:${urg?'2rem':'1.5rem'};font-weight:700;color:${urg?'var(--rd)':'var(--ac)'};line-height:1;">${ftC(cis)}</div></div><div style="text-align:right;"><div class="tbl" style="color:var(--gn);">Status</div><div style="font-size:.85rem;color:var(--gn);font-weight:700;">🟢 OPEN</div></div></div><div class="tpw"><div id="cp-${g.id}" style="height:100%;border-radius:2px;background:${urg?'var(--rd)':'var(--ac)'};width:0%;transition:width 1s linear;"></div></div></div>`;
  else tH=`<div class="tblock"><div class="tbl" style="color:var(--gn);">🟢 Status</div><div class="tbt op">✓ Gate open — road clear</div></div>`;
  const trH=s.trains.length?`<div class="trblock"><div class="blbl">🚂 Train at crossing</div>${s.trains.map(t=>`<div class="trow ${s.cl?'cr':'ap'}"><span class="trn">${t.num}</span><span class="trname">${t.name}</span><span class="trtype">${t.type}</span><span class="treta ${s.cl?'cr':'ap'}">${s.cl?'🔴 NOW':'🟡 '+t.eta}</span></div>`).join('')}</div>`:`<div class="notrain">🚂 <span>No trains now</span></div>`;
  const card=document.createElement('div');
  card.className=`gc ${isOp?'op':'cl'}${g.type==='S'?' sp':''}`;
  card.innerHTML=`<div class="gc-hd"><div class="gc-l"><div class="gc-nm">${name}<span class="badge ${g.type}">${tl[g.type]}</span>${g.feat?'<span style="font-size:.57rem;background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);border-radius:4px;padding:2px 6px;color:var(--ac);">📍 YOUR AREA</span>':''}</div><div class="gc-loc">📌 ${g.area}, ${g.taluk} Taluk · ${g.road}<br><span class="hl">Shoranur–Mangalore · KM ${g.km} · ${g.lc}</span></div></div><div class="gc-r"><div class="spill ${isOp?'op':'cl'}"><div class="sdot ${isOp?'op':'cl'}"></div>${isOp?(isMl?'തുറന്നത്':'OPEN'):(isMl?'അടഞ്ഞത്':'CLOSED')}</div><button class="fbtn ${fav?'on':''}" onclick="toggleFav(${g.id},event)">${fav?'⭐':'☆'}</button></div></div><div class="gc-bd">${tH}${trH}<div class="acts"><button class="abt" onclick="toast('🔔 Alert set!')">🔔 Alert</button><button class="abt wa" onclick="shareG(${g.id})">💬 Share</button><button class="abt" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(g.name+' Kannur')}','_blank')">🗺️ Maps</button></div><div class="gcft">Gatekeeper: ${g.gk==='—'?'None (Unmanned)':g.gk}</div></div>`;
  return card;
}

function updTimers(){
  G.forEach(g=>{
    const s=S[g.id];if(!s)return;
    if(s.cl){
      const te=document.getElementById('tm-'+g.id),pe=document.getElementById('pb-'+g.id);
      if(!te)return;const sec=sl(g.id);te.textContent=ft(sec);
      if(pe)pe.style.width=pg(g.id)+'%';
      if(sec<=0){liveMode?fetchGates():initSim();}
    }else if(s.closeIn){
      const ci=document.getElementById('ci-'+g.id),cp=document.getElementById('cp-'+g.id);
      const lbl=document.getElementById('ci-lbl-'+g.id),blk=document.getElementById('ci-block-'+g.id);
      if(!ci)return;
      const sec=sc(g.id);if(sec===null||sec<=0){liveMode?fetchGates():initSim();return;}
      const urg=sec<=120;
      ci.textContent=ftC(sec);ci.style.color=urg?'var(--rd)':'var(--ac)';ci.style.fontSize=urg?'2rem':'1.5rem';
      if(lbl){lbl.textContent=urg?(isMl?'🚨 ഇപ്പോൾ അടയ്ക്കുന്നു!':'🚨 CLOSING SOON!'):(isMl?'⚠️ അടയ്ക്കുന്ന സമയം':'⚠️ Gate closes in');lbl.style.color=urg?'var(--rd)':'var(--ac)';}
      if(blk){blk.style.borderColor=urg?'rgba(231,76,60,0.5)':'rgba(245,166,35,0.4)';blk.style.background=urg?'rgba(231,76,60,0.06)':'rgba(245,166,35,0.04)';}
      if(cp){const tot=s.trains[0]?parseInt((s.trains[0].eta||'+10 min').replace(/\D+/g,''))*60||300:300;const el=tot-sec;cp.style.width=Math.min(100,Math.max(0,el/tot*100))+'%';cp.style.background=urg?'var(--rd)':'var(--ac)';}
    }
  });
}

function toggleFav(id,e){
  e.stopPropagation();const i=favs.indexOf(id),g=G.find(x=>x.id===id);
  if(i===-1){favs.push(id);toast(`⭐ ${g.name} saved!`);}else{favs.splice(i,1);toast('Removed');}
  localStorage.setItem('rg_kn_f',JSON.stringify(favs));
  const btn=document.querySelector(`.fbtn[onclick="toggleFav(${id},event)"]`);
  if(btn){btn.classList.toggle('on',favs.includes(id));btn.textContent=favs.includes(id)?'⭐':'☆';}
}

function shareG(id){
  const g=G.find(x=>x.id===id),s=S[id];
  const st=s?.cl?'🔴 CLOSED':'🟢 OPEN';
  window.open('https://wa.me/?text='+encodeURIComponent(`🚦 *RailGate Kerala*\n*${g.name}* (${g.area}, Kannur)\nStatus: ${st}\nRoad: ${g.road}`),'_blank');
}

function toggleLang(){
  isMl=!isMl;document.getElementById('langBtn').textContent=isMl?'ML / EN':'EN / ML';
  document.getElementById('hsub').textContent=isMl?'ഗേറ്റ് നാമം, റോഡ്, പ്രദേശം ഉപയോഗിച്ച് തിരയുക.':'Search by gate name, road, area or village.';
  document.getElementById('btn-txt').textContent=isMl?'ലെവൽ ക്രോസിംഗ് തിരയൂ':'SEARCH LEVEL CROSSINGS';
  updTicker();
  const rp=document.getElementById('pg-r');
  if(rp&&rp.style.display!=='none')setF(af,document.getElementById('ft-'+af)||document.getElementById('ft-all'));
}

function toggleNotif(){noOn=!noOn;document.getElementById('notifBtn').classList.toggle('on',noOn);toast(noOn?'🔔 Alerts ON':'🔕 Alerts OFF');}

function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),3000);}

function tick(){
  const now=new Date(),t=now.toLocaleTimeString('en-IN',{hour12:true}),d=now.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
  ['clk','hdr-clk','res-clk'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=t;});
  const hrc=document.getElementById('hero-clk');if(hrc)hrc.textContent=t;
  const hrd=document.getElementById('hero-date');if(hrd)hrd.textContent=d;
  const tkt=document.getElementById('tkt');if(tkt)tkt.textContent=t;
}

// ── START ─────────────────────────────────────────────────────────
fetchGates();
tick();
setInterval(updTimers,1000);
setInterval(tick,1000);
setInterval(async()=>{
  if(liveMode){await fetchGates();const rp=document.getElementById('pg-r');if(rp&&rp.style.display!=='none')setF(af,document.getElementById('ft-'+af)||document.getElementById('ft-all'));}
  else initSim();
},30000);
