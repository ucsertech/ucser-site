// app.js

const STORAGE_LANG = "ucser_lang";
const STORAGE_MODE = "ucser_mode"; // public | press | sponsor | jury

let I18N = {};
let currentLang = "tr";
let currentMode = "public";

// ---------- helpers ----------
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return [...document.querySelectorAll(sel)]; }

function isMobile(){
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 900;
}

function setMode(mode){
  currentMode = mode || "public";
  localStorage.setItem(STORAGE_MODE, currentMode);
  renderModeBadge();
}

function getMode(){
  return localStorage.getItem(STORAGE_MODE) || "public";
}

function setLang(lang){
  currentLang = (lang === "en") ? "en" : "tr";
  localStorage.setItem(STORAGE_LANG, currentLang);
  updateLangButtons();
  applyI18n();
  refreshStatusPanel(); // not dili de değişsin
}

function getLang(){
  const saved = localStorage.getItem(STORAGE_LANG);
  if(saved === "tr" || saved === "en") return saved;
  // otomatik algı
  const nav = (navigator.language || "tr").toLowerCase();
  return nav.startsWith("en") ? "en" : "tr";
}

function updateLangButtons(){
  qsa("[data-lang-btn]").forEach(b=>{
    b.classList.toggle("active", b.dataset.langBtn === currentLang);
  });
}

// ---------- i18n ----------
async function loadI18n(){
  currentLang = getLang();
  const res = await fetch(`lang/${currentLang}.json`, {cache:"no-store"});
  I18N = await res.json();
  applyI18n();
  updateLangButtons();
}

function t(key){
  return I18N[key] ?? key;
}

function applyI18n(){
  qsa("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // mode labels (varsa)
  qsa("[data-mode-label]").forEach(el=>{
    const m = getMode();
    const map = {
      public: t("mode_public"),
      press: t("mode_press"),
      sponsor: t("mode_sponsor"),
      jury: t("mode_jury")
    };
    el.textContent = map[m] || t("mode_public");
  });
}

// ---------- status panel (REAL) ----------
async function refreshStatusPanel(){
  const elSys = qs("#sys_system");
  const elPhase = qs("#sys_phase");
  const elUpd = qs("#sys_updated");
  const elConn = qs("#sys_conn");
  const elNote = qs("#sys_note");

  if(!elSys) return;

  // online/offline gerçek
  const connText = navigator.onLine ? t("status_online") : t("status_offline");
  elConn.textContent = connText;

  // repo’dan gerçek durum bilgisi
  try{
    const r = await fetch("status.json", {cache:"no-store"});
    const s = await r.json();

    elSys.textContent = s.system || "-";
    elPhase.textContent = s.phase || "-";
    elUpd.textContent = s.lastUpdate || "-";
    elNote.textContent = (currentLang === "en" ? (s.noteEN||"") : (s.noteTR||"")) || "";
  }catch(e){
    elSys.textContent = "-";
    elPhase.textContent = "-";
    elUpd.textContent = "-";
    elNote.textContent = "";
  }
}

function bindConnectionWatcher(){
  window.addEventListener("online", refreshStatusPanel);
  window.addEventListener("offline", refreshStatusPanel);
}

// ---------- digital id ----------
function renderIdCard(){
  const dev = qs("#id_device_value");
  const time = qs("#id_time_value");
  const sys = qs("#id_status_value");

  if(dev) dev.textContent = isMobile() ? t("device_mobile") : t("device_desktop");
  if(time) time.textContent = new Date().toLocaleString(currentLang === "en" ? "en-US":"tr-TR");
  if(sys) sys.textContent = navigator.onLine ? t("status_online") : t("status_offline");
}

// ---------- mode badge ----------
function renderModeBadge(){
  const badge = qs("#modePill");
  if(!badge) return;

  const m = getMode();
  const map = {
    public: t("mode_public"),
    press: t("mode_press"),
    sponsor: t("mode_sponsor"),
    jury: t("mode_jury")
  };
  badge.textContent = `${t("id_role")}: ${map[m] || t("mode_public")}`;

  // jury modunda küçük bir “sunum” hissi
  document.documentElement.dataset.mode = m;
}

// ---------- easter egg modal ----------
let logoClicks = 0;
let logoTimer = null;

function openModal(){
  const back = qs("#modalBackdrop");
  if(back) back.classList.add("show");
}
function closeModal(){
  const back = qs("#modalBackdrop");
  if(back) back.classList.remove("show");
}

function bindEasterEgg(){
  const logo = qs("#brandLogoTrigger");
  if(!logo) return;

  logo.addEventListener("click", ()=>{
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(()=>{ logoClicks = 0; }, 1200);

    if(logoClicks >= 5){
      logoClicks = 0;
      openModal();
    }
  });
}

function bindModal(){
  const back = qs("#modalBackdrop");
  const closeBtn = qs("#modalClose");
  if(closeBtn) closeBtn.addEventListener("click", closeModal);
  if(back) back.addEventListener("click", (e)=>{
    if(e.target === back) closeModal();
  });

  // mode buttons
  qsa("[data-set-mode]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const m = btn.dataset.setMode;
      setMode(m);
      applyI18n();
      closeModal();
    });
  });

  // fake login/register (gösterim amaçlı)
  const loginForm = qs("#loginForm");
  const regForm = qs("#regForm");
  if(loginForm){
    loginForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      qs("#authMsg").textContent = "✅ Tamam. (Vitrin amaçlı)";
    });
  }
  if(regForm){
    regForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      qs("#authMsg").textContent = "✅ Tamam. (Vitrin amaçlı)";
    });
  }
}

// ---------- story reveal ----------
function bindReveals(){
  const els = qsa(".reveal");
  if(!els.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting) en.target.classList.add("on");
    });
  }, {threshold:.12});

  els.forEach(el=>io.observe(el));
}

// ---------- language buttons ----------
function bindLangButtons(){
  qsa("[data-lang-btn]").forEach(b=>{
    b.addEventListener("click", ()=> setLang(b.dataset.langBtn));
  });
}

// ---------- init ----------
(function init(){
  currentMode = getMode();
  loadI18n().then(()=>{
    setMode(currentMode);
    renderIdCard();
    refreshStatusPanel();
    bindConnectionWatcher();
    bindLangButtons();
    bindEasterEgg();
    bindModal();
    bindReveals();

    // her 30 saniyede saat/id yenile
    setInterval(renderIdCard, 30000);
  });
})();
