const LANGUAGES={"en":"English","fr":"Français","pt":"Português","sw":"Kiswahili","sn":"Shona - ChiShona","nd":"Ndebele - isiNdebele","zu":"Zulu","ar":"العربية - Arabic","af":"Afrikaans","ha":"Hausa - Hausa","yo":"Yorùbá - Yoruba","ig":"Igbo - Igbo","tw":"Twi - Akan","wo":"Wolof","am":"አማርኛ - Amharic","rw":"Kinyarwanda","lg":"Luganda","so":"Somali","zgh":"Tamazight ⵜⴰⵎⴰⵣⵉⵖⵜ","ln":"Lingala","kg":"Kikongo","xh":"isiXhosa - Xhosa","tn":"Setswana","st":"Sesotho - Sotho","ts":"Xitsonga - Shangani","ny":"Chichewa - Nyanja","se":"Sena","ss":"siSwati","kj":"Oshiwambo","bem":"Bemba","ce":"Chewa","ve":"Tshivenda - Venda"};
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
  let html='<div style="position:sticky;top:0;background:#fff;padding:10px 0;z-index:1;border-bottom:1px solid #eee"><h3>🌍 Pan African - 32 Languages</h3><input id="langSearch" placeholder="Search language..." onkeyup="filterLang()" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #ddd;margin-top:8px"></div>';
  for(const [code,name] of Object.entries(LANGUAGES)){
    html+='<div class="lang-option '+(code===currentLang?'active':'')+'" data-name="'+name.toLowerCase()+' '+code+'" onclick="loadLang(\''+code+'\')"><span>'+name+'</span><span>'+(code===currentLang?'✓':'')+'</span></div>';
  }
  html+='<div style="text-align:center;margin-top:14px;padding-bottom:20px"><button onclick="closeSheet()" style="padding:8px 18px;border-radius:20px;border:1px solid #ddd;background:#fff;cursor:pointer">Close</button></div>';
  sheet.innerHTML=html;
}
function filterLang(){
  const q=document.getElementById('langSearch').value.toLowerCase();
  document.querySelectorAll('.lang-option').forEach(el=>{
    el.style.display = el.getAttribute('data-name').includes(q)? 'flex' : 'none';
  });
}
function openSheet(){renderSheet(); document.getElementById('sheet').classList.add('open');document.getElementById('overlay').classList.add('show');}
function closeSheet(){document.getElementById('sheet').classList.remove('open');document.getElementById('overlay').classList.remove('show');}
function updateUI(){
  const l=document.getElementById('langLabel');
  if(l) l.textContent=LANGUAGES[currentLang]||currentLang;
  renderSheet();
}
window.loadLang=loadLang;
window.filterLang=filterLang;
document.addEventListener('DOMContentLoaded',()=>{
  saveOriginals();
  createUI();
  if(currentLang!=='en') loadLang(currentLang);
});