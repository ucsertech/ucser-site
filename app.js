// Firebase (CDN modules) — GitHub Pages uyumlu
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

/* --- Firebase config --- */
const firebaseConfig = {
  apiKey: "AIzaSyASe8dNxDvuobSAkZ-0vgMcZBX_9WILPAk",
  authDomain: "ucser-a2be1.firebaseapp.com",
  projectId: "ucser-a2be1",
  storageBucket: "ucser-a2be1.firebasestorage.app",
  messagingSenderId: "761780483657",
  appId: "1:761780483657:web:bdd079394e15415bf93198"
};

/* --- Tek admin email: BUNU DEĞİŞTİR --- */
const ADMIN_EMAIL = "ADMIN_MAILINI_BURAYA_YAZ";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ========== ADMIN LOGIN (login.html) ========== */
window.adminLogin = async function adminLogin() {
  const msg = document.getElementById("loginMsg");
  const email = (document.getElementById("email")?.value || "").trim();
  const password = document.getElementById("password")?.value || "";

  if (!email || !password) {
    msg && (msg.innerText = "❌ E-posta ve şifre zorunlu.");
    return;
  }

  msg && (msg.innerText = "Giriş yapılıyor...");

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const userEmail = cred.user.email || "";

    if (userEmail !== ADMIN_EMAIL) {
      await signOut(auth);
      msg && (msg.innerText = "❌ Bu hesap admin değil.");
      return;
    }

    msg && (msg.innerText = "✅ Başarılı. Yönlendiriliyorsun...");
    window.location.href = "admin.html";
  } catch (e) {
    msg && (msg.innerText = "❌ Giriş başarısız: " + (e?.message || "Hata"));
  }
};

window.adminLogout = async function adminLogout() {
  await signOut(auth);
  window.location.href = "login.html";
};

/* ========== ADMIN SAYFASI KORUMA ========== */
(function protectAdmin() {
  const path = (window.location.pathname || "").toLowerCase();
  if (!path.endsWith("admin.html")) return;

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    if ((user.email || "") !== ADMIN_EMAIL) {
      await signOut(auth);
      window.location.href = "login.html";
    }
  });
})();

/* ========== FORM: İLETİŞİM (iletisim.html) ========== */
window.submitContactFirebase = async function submitContactFirebase(payload) {
  // payload: {name, email, phone, topic, subject, message}
  await addDoc(collection(db, "contact_messages"), {
    ...payload,
    createdAt: serverTimestamp(),
    source: "iletisim"
  });
};

/* ========== FORM: SPONSOR (sponsorlar.html) ========== */
window.submitSponsorFirebase = async function submitSponsorFirebase(payload) {
  // payload: {name, email, phone, company, budget, note}
  await addDoc(collection(db, "sponsor_requests"), {
    ...payload,
    createdAt: serverTimestamp(),
    source: "sponsorlar"
  });
};
