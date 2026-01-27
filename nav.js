// UÇSER - Navbar hide on scroll (down hide, up show)
(function () {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    // küçük hareketleri yok say
    const delta = y - lastY;
    if (Math.abs(delta) < 8) return;

    if (delta > 0 && y > 120) {
      // aşağı
      nav.style.transform = "translateY(-110%)";
    } else {
      // yukarı
      nav.style.transform = "translateY(0)";
    }

    lastY = y;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
    (function(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".tabs .tab").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if (href === path) a.classList.add("active");
    else a.classList.remove("active");
  }
  });
})();
