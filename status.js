// === UÇSER | Dijital Kimlik & Canlı Sistem Durumu ===
(function () {

  // Dijital kimlik alanları
  const deviceEl = document.getElementById("id_device_value");
  const timeEl   = document.getElementById("id_time_value");
  const statusEl = document.getElementById("id_status_value");

  // Sistem durumu paneli
  const sysSystem  = document.getElementById("sys_system");
  const sysPhase   = document.getElementById("sys_phase");
  const sysUpdated = document.getElementById("sys_updated");
  const sysConn    = document.getElementById("sys_conn");
  const sysNote    = document.getElementById("sys_note");

  // Güvenli kontrol (sayfa yoksa patlamasın)
  if (!deviceEl || !timeEl || !statusEl) return;

  /* === Cihaz Algılama === */
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  deviceEl.innerText = isMobile ? "Mobil Cihaz" : "Masaüstü Cihaz";

  /* === Saat (Yerel) === */
  const now = new Date();
  timeEl.innerText = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  /* === Bağlantı Durumu (Gerçek) === */
  const online = navigator.onLine;
  statusEl.innerText = online ? "Çevrimiçi" : "Offline";

  if (sysConn) sysConn.innerText = online ? "Aktif" : "Bağlantı Yok";

  /* === Canlı Sistem Durumu (Vitrin ama dürüst) === */
  if (sysSystem)  sysSystem.innerText  = "Aktif";
  if (sysPhase)   sysPhase.innerText   = "Geliştirme";
  if (sysUpdated) sysUpdated.innerText = now.toLocaleDateString("tr-TR");
  if (sysNote)    sysNote.innerText    = "Bilgi paneli – vitrin amaçlı";

})();
