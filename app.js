/* =========================
   UÇSER – APP.JS (Firebase YOK)
   ========================= */

/* --- Basit admin kilidi (isteğe bağlı) --- */
const ADMIN_PASSWORD = "Hy124500.."; // değiştir

window.adminLoginLocal = function(){
  const pass = document.getElementById("adminPass")?.value || "";
  const msg = document.getElementById("loginMsg");

  if(pass === ADMIN_PASSWORD){
    localStorage.setItem("ucser_admin", "1");
    window.location.href = "admin.html";
  } else {
    msg && (msg.innerText = "❌ Şifre yanlış");
  }
};

window.adminLogoutLocal = function(){
  localStorage.removeItem("ucser_admin");
  window.location.href = "index.html";
};

/* --- Admin sayfası koruması --- */
(function protectAdmin(){
  const path = (window.location.pathname || "").toLowerCase();
  if(!path.endsWith("admin.html")) return;

  if(localStorage.getItem("ucser_admin") !== "1"){
    window.location.href = "admin-login.html";
  }
})();
