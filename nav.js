let lastScroll = 0;
const nav = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;

  if (current > lastScroll && current > 120) {
    nav.classList.add("nav-hide");
  } else {
    nav.classList.remove("nav-hide");
  }
  lastScroll = current;
});
<script>
(function(){
  const dd = document.getElementById("topicDD");
  if(!dd) return;

  const btn = dd.querySelector(".dd-btn");
  const menu = dd.querySelector(".dd-menu");
  const label = document.getElementById("topicLabel");
  const hidden = document.getElementById("topicValue");
  const items = dd.querySelectorAll(".dd-item");

  function open(){
    dd.classList.add("open");
    btn.setAttribute("aria-expanded","true");
  }
  function close(){
    dd.classList.remove("open");
    btn.setAttribute("aria-expanded","false");
  }
  function toggle(){
    dd.classList.contains("open") ? close() : open();
  }

  btn.addEventListener("click", toggle);

  items.forEach(it=>{
    it.addEventListener("click", ()=>{
      const v = it.dataset.value || it.textContent.trim();
      hidden.value = v;
      label.textContent = v;
      dd.classList.add("has-value");
      close();
    });
  });

  // dışarı tıklayınca kapat
  document.addEventListener("click", (e)=>{
    if(!dd.contains(e.target)) close();
  });

  // ESC ile kapat
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") close();
  });
})();
</script>
