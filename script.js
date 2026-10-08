const MASTER_DATA=[
{name:"Арман Садыков",initials:"АС",rating:"4.9",reviews:127,exp:"8 жыл",price:"8 000 ₸",distance:"1.2 км",specialty:"Сантехник",status:"Қазір бос",tags:["Сантехника","Құбыр","Кран"],about:"Су жүйелері мен сантехникалық жұмыстар бойынша тәжірибелі маман. Жұмысты таза және кепілдікпен орындайды.",comments:["Жылдам келді, мәселені бірден шешті.","Бағасы алдын ала айтылғандай болды."]},
{name:"Данияр Нұрбеков",initials:"ДН",rating:"4.8",reviews:94,exp:"6 жыл",price:"7 500 ₸",distance:"2.1 км",specialty:"Сантехник",status:"Қазір бос",tags:["Сантехника","Жуынатын бөлме","Құбыр"],about:"Пәтерлер мен үйлердегі сантехника жөндеуіне маманданған.",comments:["Өте жақсы маман.","Жұмысты сапалы жасады."]},
{name:"Нурлан Ахметов",initials:"НА",rating:"4.9",reviews:151,exp:"10 жыл",price:"9 000 ₸",distance:"2.8 км",specialty:"Сантехник",status:"Бос емес",tags:["Құбыр","Жылыту","Су жүйесі"],about:"10 жылдық тәжірибесі бар әмбебап сантехник.",comments:["Кәсіби маман.","Уақытында келді."]},
{name:"Ермек Төлеген",initials:"ЕТ",rating:"4.7",reviews:76,exp:"5 жыл",price:"6 500 ₸",distance:"3.4 км",specialty:"Электрик",status:"Қазір бос",tags:["Электрика","Розетка","Жарық"],about:"Үйдегі электр желілерін жөндеу және монтаждау маманы.",comments:["Мәселені тез тапты.","Ұқыпты жұмыс істейді."]},
{name:"Айдос Серік",initials:"АС",rating:"4.9",reviews:113,exp:"7 жыл",price:"8 500 ₸",distance:"3.8 км",specialty:"Электрик",status:"Қазір бос",tags:["Электрика","Сым","Автомат"],about:"Электр қауіпсіздігіне ерекше көңіл бөлетін маман.",comments:["Өте сауатты.","Барлығын түсіндіріп берді."]},
{name:"Бекзат Омаров",initials:"БО",rating:"4.8",reviews:88,exp:"6 жыл",price:"7 000 ₸",distance:"4.1 км",specialty:"Жиһаз жөндеу",status:"Қазір бос",tags:["Жиһаз","Шкаф","Ас үй"],about:"Жиһаз құрастыру және жөндеу бойынша шебер.",comments:["Шкафты керемет жөндеді.","Бағасы қолжетімді."]},
{name:"Марат Қасым",initials:"МҚ",rating:"4.7",reviews:64,exp:"4 жыл",price:"5 500 ₸",distance:"4.5 км",specialty:"Ұсақ жөндеу",status:"Қазір бос",tags:["Монтаж","Сөре","Есік"],about:"Үйдегі түрлі ұсақ жөндеу жұмыстарын орындайды.",comments:["Жылдам әрі арзан.","Риза болдым."]},
{name:"Руслан Есен",initials:"РЕ",rating:"4.9",reviews:132,exp:"9 жыл",price:"8 000 ₸",distance:"5.0 км",specialty:"Электрик",status:"Қазір бос",tags:["Электрика","Жарық","Кабель"],about:"Күрделі электр ақауларын диагностикалауға маманданған.",comments:["Тәжірибесі көрініп тұр.","Жақсы жұмыс."]},
{name:"Саян Бақыт",initials:"СБ",rating:"4.8",reviews:71,exp:"5 жыл",price:"6 000 ₸",distance:"5.7 км",specialty:"Сантехник",status:"Қазір бос",tags:["Сантехника","Кран","Су"],about:"Сантехника бойынша жедел шақырту қызметін көрсетеді.",comments:["Кешке де келді.","Мәселе шешілді."]},
{name:"Алихан Тұрсын",initials:"АТ",rating:"5.0",reviews:59,exp:"5 жыл",price:"9 500 ₸",distance:"6.2 км",specialty:"Ұсақ жөндеу",status:"Қазір бос",tags:["Жөндеу","Монтаж","Үй жұмысы"],about:"Жөндеу жұмыстарын ұқыпты орындауға бағытталған жас маман.",comments:["Өте мұқият.","Қайта шақырамын."]}
];

function getUsers(){return JSON.parse(localStorage.getItem("qalaFixUsers")||"[]")}
function saveUsers(users){localStorage.setItem("qalaFixUsers",JSON.stringify(users))}
function getCurrentUser(){return JSON.parse(localStorage.getItem("qalaFixCurrentUser")||"null")}
function setCurrentUser(user){localStorage.setItem("qalaFixCurrentUser",JSON.stringify(user))}
function openModal(id){document.getElementById(id).classList.add("show")}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function togglePassword(id){const x=document.getElementById(id);x.type=x.type==="password"?"text":"password"}
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}))

// Photo preview
document.getElementById("photoInput").addEventListener("change",function(){
 const grid=document.getElementById("previewGrid");grid.innerHTML="";
 [...this.files].slice(0,5).forEach(file=>{
   const img=document.createElement("img");img.src=URL.createObjectURL(file);grid.appendChild(img);
 });
});

// Demo AI diagnostic engine for frontend prototype.
// Real image recognition can be connected to a vision model/API later.
function analyzeProblem(){
 const files=document.getElementById("photoInput").files;
 const category=document.getElementById("problemCategory").value;
 const desc=document.getElementById("problemDescription").value.toLowerCase();
 const btn=document.getElementById("analyzeBtn");
 if(!files.length&&!category&&!desc){alert("Алдымен ақаудың суретін жүктеңіз немесе категорияны таңдаңыз.");return}
 btn.disabled=true;btn.textContent="🤖 AI талдап жатыр...";
 setTimeout(()=>{
   let type=category||"Ұсақ жөндеу",level="Орташа",price="5 000–12 000 ₸",specialist=category||"Жөндеу маманы",time="1–2 сағат";
   if(category==="Сантехник"||/су|кран|құбыр|течь|протеч/.test(desc)){type="Су жүйесі / сантехника";level="Орташа";price="7 000–15 000 ₸";specialist="Сантехник";time="1–2 сағат"}
   else if(category==="Электрик"||/сым|розетка|жарық|электр/.test(desc)){type="Электр ақауы";level="Орташа";price="6 000–18 000 ₸";specialist="Электрик";time="1–3 сағат"}
   else if(category==="Жиһаз жөндеу"){type="Жиһаз ақауы";level="Жеңіл";price="3 500–10 000 ₸";specialist="Жиһаз шебері";time="1–2 сағат"}
   else if(category==="Ұсақ жөндеу"){type="Тұрмыстық ұсақ ақау";level="Жеңіл";price="3 000–8 000 ₸";specialist="Жөндеу маманы";time="1–2 сағат"}
   document.getElementById("aiProblem").textContent=type;
   document.getElementById("aiLevel").textContent=level;
   document.getElementById("aiPrice").textContent=price;
   document.getElementById("aiSpecialist").textContent=specialist;
   document.getElementById("aiTime").textContent=time;
   document.getElementById("aiSummary").textContent="Сурет, категория және сипаттама негізінде алдын ала диагностика жасалды.";
   document.getElementById("aiResult").classList.add("show");
   renderMasters(specialist);
   document.getElementById("masters").classList.add("show");
   document.getElementById("masters").scrollIntoView({behavior:"smooth"});
   btn.disabled=false;btn.textContent="🤖 AI арқылы талдау";
 },1200);
}

function renderMasters(specialist){
 const grid=document.getElementById("masterGrid");
 let sorted=[...MASTER_DATA];
 const related=sorted.filter(m=>m.specialty.toLowerCase().includes(specialist.toLowerCase().replace(" маманы",""))||specialist.includes(m.specialty));
 const others=sorted.filter(m=>!related.includes(m));
 sorted=[...related,...others].slice(0,10);
 grid.innerHTML=sorted.map((m,i)=>`
 <div class="master-card">
  <div class="master-top"><div class="master-avatar">${m.initials}</div><div><h3>${m.name}</h3><div class="rating">★ ${m.rating} <span style="color:#667085;font-weight:normal">(${m.reviews})</span></div></div></div>
  <div class="master-meta">🛠️ ${m.specialty}<br>💼 ${m.exp} тәжірибе · 📍 ${m.distance}<br>💰 ${m.price} бастап · 🟢 ${m.status}</div>
  <div class="master-tags">${m.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
  <div class="master-actions"><button class="profile-btn" onclick="showMasterProfile(${i}, '${specialist}')">Профиль</button><button class="choose-btn" onclick="chooseMaster(${i}, '${specialist}')">Таңдау</button></div>
 </div>`).join("");
 window.currentMasters=sorted;
}

function showMasterProfile(index,specialist){
 const m=window.currentMasters[index];
 document.getElementById("masterProfileContent").innerHTML=`
 <div class="master-profile-head"><div class="master-profile-avatar">${m.initials}</div><div><h2>${m.name}</h2><div class="rating">★ ${m.rating} (${m.reviews} пікір)</div><p style="color:#667085">${m.specialty}</p></div></div>
 <p>${m.about}</p>
 <div class="profile-stats"><div class="profile-stat"><strong>${m.exp}</strong><span>тәжірибе</span></div><div class="profile-stat"><strong>${m.reviews}</strong><span>тапсырыс/пікір</span></div><div class="profile-stat"><strong>${m.price}</strong><span>бастап</span></div></div>
 <div class="master-tags">${m.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
 <div class="reviews"><h3>Клиент пікірлері</h3>${m.comments.map(c=>`<div class="review">⭐️⭐️⭐️⭐️⭐️ ${c}<br><small>Расталған клиент</small></div>`).join("")}</div>
 <button class="ai-analyze" style="margin-top:18px" onclick="closeModal('masterProfileModal');chooseMaster(${index}, '${specialist}')">Осы мастераға тапсырыс беру</button>`;
 openModal("masterProfileModal");
}

function chooseMaster(index,specialist){
 const user=getCurrentUser();
 if(!user){alert("Мастерді таңдау үшін алдымен тіркеліңіз немесе аккаунтқа кіріңіз.");openModal("loginModal");return}
 const m=window.currentMasters[index];
 const users=getUsers(),idx=users.findIndex(u=>u.email===user.email);
 const order={id:"QF-"+Date.now(),service:m.specialty,master:m.name,masterRating:m.rating,price:m.price,date:new Date().toLocaleString("kk-KZ"),status:"Мастерге жіберілді",statusKey:"sent",diagnosis:specialist,description:document.getElementById("problemDescription").value||"Фото арқылы анықталған ақау",createdAt:Date.now()};
 users[idx].orders=users[idx].orders||[];users[idx].orders.unshift(order);
 saveUsers(users);setCurrentUser(users[idx]);showCabinet();
 const box=document.getElementById("orderConfirm");
 box.innerHTML=`✅ <strong>Тапсырыс жіберілді!</strong><br>${m.name} мастері сіздің өтініміңізді алады. Өтінім жеке кабинетте сақталды.`;
 box.classList.add("show");
 document.getElementById("cabinet").scrollIntoView({behavior:"smooth"});
}


function showCabinet(){
 const user=getCurrentUser();if(!user)return;
 document.getElementById("cabinet").style.display="block";
 document.getElementById("cabinetName").textContent=user.name;
 document.getElementById("cabinetEmail").textContent=user.email;
 document.getElementById("cabinetPhone").textContent=user.phone||"Телефон көрсетілмеген";
 document.getElementById("cabinetDate").textContent=user.createdAt;
 document.getElementById("cabinetAvatar").textContent=user.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
 renderOrders(user);
}
function renderOrders(user){
 const list=document.getElementById("ordersList");
 if(!user.orders||!user.orders.length){
   list.innerHTML='<div class="empty-orders">Әзірге тапсырыстар жоқ.<br>AI диагностика жасап, мастер таңдаңыз.</div>';
 }else{
   list.innerHTML=user.orders.slice(0,3).map((o,i)=>`
   <div class="order-item">
    <strong>${o.master||"QalaFix маманы"} — ${o.service}</strong>
    <span>📅 ${o.date} · ${statusLabel(o.statusKey,o.status)}</span><br>
    <span>💰 ${o.price||"Баға келісім бойынша"}</span>
   </div>`).join("");
 }
 renderHistory(user,"all");
}
function statusLabel(key,status){
 return key==="done"?"Аяқталды":key==="progress"?"Орындалуда":key==="cancel"?"Бас тартылды":status||"Жаңа";
}
function statusClass(key){
 return key==="done"?"done":key==="progress"?"progress":key==="cancel"?"cancel":"sent";
}
function filterOrders(filter,btn){
 document.querySelectorAll(".history-filter button").forEach(b=>b.classList.remove("active"));
 if(btn)btn.classList.add("active");
 const user=getCurrentUser();if(user)renderHistory(user,filter);
}
function renderHistory(user,filter){
 const container=document.getElementById("historyList"); if(!container)return;
 let orders=user.orders||[];
 if(filter!=="all")orders=orders.filter(o=>(o.statusKey||"sent")===filter);
 if(!orders.length){container.innerHTML='<div class="no-history">Бұл бөлімде әзірге тапсырыстар жоқ.</div>';return}
 container.innerHTML=orders.map((o)=>`
 <div class="history-item">
  <div class="history-top">
   <div><div class="history-title">🛠️ ${o.service} · ${o.master||"Маман"}</div><div class="history-date">Тапсырыс № ${o.id||"QF-"+Math.floor(Math.random()*100000)} · ${o.date}</div></div>
   <span class="status ${statusClass(o.statusKey)}">${statusLabel(o.statusKey,o.status)}</span>
  </div>
  <div class="history-details">
   <div class="history-detail"><small>Маман</small><strong>${o.master||"—"}</strong></div>
   <div class="history-detail"><small>Баға</small><strong>${o.price||"Келісім бойынша"}</strong></div>
   <div class="history-detail"><small>AI диагностика</small><strong>${o.diagnosis||"—"}</strong></div>
  </div>
  <div class="history-actions"><button onclick="showOrderDetails('${o.id}')">Толығырақ</button></div>
 </div>`).join("");
}
function showOrderDetails(id){
 const user=getCurrentUser();if(!user)return;
 const o=(user.orders||[]).find(x=>x.id===id);if(!o)return;
 document.getElementById("orderDetailContent").innerHTML=`
 <h2>Тапсырыс туралы</h2>
 <p style="color:#667085;margin:8px 0 18px">№ ${o.id}</p>
 <div class="order-detail-line"><strong>🔧 Қызмет:</strong> ${o.service}</div>
 <div class="order-detail-line"><strong>👨‍🔧 Мастер:</strong> ${o.master}</div>
 <div class="order-detail-line"><strong>⭐ Рейтинг:</strong> ${o.masterRating||"—"}</div>
 <div class="order-detail-line"><strong>🤖 AI диагностика:</strong> ${o.diagnosis||"—"}</div>
 <div class="order-detail-line"><strong>📝 Сипаттама:</strong> ${o.description||"—"}</div>
 <div class="order-detail-line"><strong>💰 Болжамды баға:</strong> ${o.price||"Келісім бойынша"}</div>
 <div class="order-detail-line"><strong>📅 Күні:</strong> ${o.date}</div>
 <div class="order-detail-line"><strong>📌 Статус:</strong> ${statusLabel(o.statusKey,o.status)}</div>
 `;
 openModal("orderDetailModal");
}
function logout(){localStorage.removeItem("qalaFixCurrentUser");document.getElementById("cabinet").style.display="none";updateAuthUI();document.getElementById("home").scrollIntoView({behavior:"smooth"})}
function toggleMobileMenu(){
 const menu=document.getElementById("mobileMenu");
 if(menu) menu.classList.toggle("show");
}
function closeMobileMenu(){
 const menu=document.getElementById("mobileMenu");
 if(menu) menu.classList.remove("show");
}
function mobileCabinet(){
 const user=getCurrentUser();
 if(!user){openModal("loginModal");return}
 showCabinet();
 document.getElementById("cabinet").scrollIntoView({behavior:"smooth"});
}
document.addEventListener("click",function(e){
 const menu=document.getElementById("mobileMenu"),btn=document.getElementById("mobileMenuBtn");
 if(menu && menu.classList.contains("show") && !menu.contains(e.target) && e.target!==btn) closeMobileMenu();
});

function updateAuthUI(){
 const area=document.getElementById("authArea"),user=getCurrentUser();
 const mobileCab=document.getElementById("mobileCabinetBtn");
 if(mobileCab) mobileCab.style.display=user?"block":"none";
 if(user) area.innerHTML=`<div class="user-menu"><button class="user-btn" onclick="document.getElementById('userDropdown').classList.toggle('show')">👤 ${user.name.split(" ")[0]}</button><div class="user-dropdown" id="userDropdown"><button onclick="showCabinet();document.getElementById('cabinet').scrollIntoView({behavior:'smooth'});document.getElementById('userDropdown').classList.remove('show')">👤 Жеке кабинет</button><button onclick="logout()">🚪 Шығу</button></div></div>`;
 else area.innerHTML='<a class="auth-btn" href="#" onclick="openModal(\'loginModal\');return false;">Кіру</a><a class="auth-btn primary" href="#" onclick="openModal(\'registerModal\');return false;">Тіркелу</a>';
}

document.getElementById("registerForm").addEventListener("submit",function(e){
 e.preventDefault();
 const name=document.getElementById("regName").value.trim(),phone=document.getElementById("regPhone").value.trim(),email=document.getElementById("regEmail").value.trim().toLowerCase(),password=document.getElementById("regPassword").value,users=getUsers();
 if(users.some(u=>u.email===email)){alert("Бұл Email бұрын тіркелген. Кіруді таңдаңыз.");return}
 const user={name,phone,email,password,createdAt:new Date().toLocaleDateString("kk-KZ"),orders:[]};
 users.push(user);saveUsers(users);setCurrentUser(user);closeModal("registerModal");updateAuthUI();showCabinet();alert("✅ Тіркелу сәтті аяқталды!");this.reset();
});
document.getElementById("loginForm").addEventListener("submit",function(e){
 e.preventDefault();const email=document.getElementById("loginEmail").value.trim().toLowerCase(),password=document.getElementById("loginPassword").value,user=getUsers().find(u=>u.email===email&&u.password===password);
 if(!user){alert("❌ Email немесе құпия сөз қате.");return}
 setCurrentUser(user);closeModal("loginModal");updateAuthUI();showCabinet();alert("✅ Сәтті кірдіңіз!");this.reset();
});
updateAuthUI();if(getCurrentUser())showCabinet();
