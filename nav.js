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
