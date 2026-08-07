
const LANGUAGES={en:"English",fr:"Francais",pt:"Portugues",sw:"Kiswahili",sn:"Shona - ChiShona",nd:"Ndebele - isiNdebele",zu:"Zulu"};
let currentLang=localStorage.getItem('chigalex_lang')||'en';
let dict={};
let originalTexts={};
function saveOriginals(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(!originalTexts[key]) originalTexts[key]=el.textContent;
  });
}
async function loadLang(lang){
  currentLang=lang;
  localStorage.setItem('chigalex_lang',lang);
  if(lang==='en'){
    dict={};
    apply();
    updateUI();
    closeSheet();
    return;
  }
  try{
    const res=await fetch('./locales/'+lang+'/translation.json?v='+Date.now());
    if(!res.ok) throw new Error('404');
    dict=await res.json();
  }catch(e){
    console.error('Failed',lang,e);
    dict={};
  }
  apply();
  updateUI();
  closeSheet();
}
function apply(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(currentLang==='en'){
      if(originalTexts[key]) el.textContent=originalTexts[key];
    } else {
      if(dict[key]) el.textContent=dict[key];
    }
  });
}
function createUI(){
  const btn=document.createElement('button');
  btn.className='lang-btn';
  btn.id='langBtn';
  btn.innerHTML='🌐 <span id="langLabel">'+(LANGUAGES[currentLang]||currentLang)+'</span> ▼';
  btn.onclick=openSheet;
  document.body.appendChild(btn);
  const overlay=document.createElement('div');
  overlay.className='overlay'; overlay.id='overlay'; overlay.onclick=closeSheet;
  document.body.appendChild(overlay);
  const sheet=document.createElement('div');
  sheet.className='lang-sheet'; sheet.id='sheet';
  document.body.appendChild(sheet);
  renderSheet();
}
function renderSheet(){
  const sheet=document.getElementById('sheet');
  if(!sheet) return;
  let html='<h3 style="margin-bottom:12px">Select Language / Sarudza Mutauro / Khetha Ulimi</h3>';
  for(const [code,name] of Object.entries(LANGUAGES)){
    html+='<div class="lang-option '+(code===currentLang?'active':'')+'" onclick="loadLang(\''+code+'\')"><span>'+name+'</span><span>'+(code===currentLang?'✓':'')+'</span></div>';
  }
  html+='<div style="text-align:center;margin-top:14px"><button onclick="closeSheet()" style="padding:8px 18px;border-radius:20px;border:1px solid #ddd;background:#fff;cursor:pointer">Close</button></div>';
  sheet.innerHTML=html;
}
function openSheet(){renderSheet(); document.getElementById('sheet').classList.add('open');document.getElementById('overlay').classList.add('show');}
function closeSheet(){document.getElementById('sheet').classList.remove('open');document.getElementById('overlay').classList.remove('show');}
function updateUI(){
  const l=document.getElementById('langLabel');
  if(l) l.textContent=LANGUAGES[currentLang]||currentLang;
  renderSheet();
}
window.loadLang=loadLang;
document.addEventListener('DOMContentLoaded',()=>{
  saveOriginals();
  createUI();
  if(currentLang!=='en') loadLang(currentLang);
});

