/* ====== AYARLAR ====== */
const ADMIN_USER = "admin";
const ADMIN_PASS = "ucser123"; // 🔴 değiştir
const SESSION_KEY = "ucser_admin_logged";

/* ====== LOGIN ====== */
function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMsg");

  if (!u || !p) {
    msg.innerText = "❌ Bilgileri doldurun";
    return;
  }

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    localStorage.setItem(SESSION_KEY, "true");
    msg.innerText = "✅ Giriş başarılı";
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 500);
  } else {
    msg.innerText = "❌ Hatalı bilgiler";
  }
}

/* ====== ADMIN KORUMA ====== */
function protectAdmin() {
  const logged = localStorage.getItem(SESSION_KEY);
  if (logged !== "true") {
    window.location.href = "login.html";
  }
}

/* ====== LOGOUT ====== */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}
