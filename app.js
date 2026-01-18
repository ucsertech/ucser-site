const ADMIN_EMAIL = "admin@ucser.com"; // birazdan değiştireceğiz

function login(){
  const e = document.getElementById('email').value;
  const p = document.getElementById('password').value;
  if(e===ADMIN_EMAIL && p){
    localStorage.setItem("ucser_admin","1");
    location.href="admin.html";
  } else {
    document.getElementById('msg').innerText="Yetkisiz giriş.";
  }
}
function logout(){
  localStorage.removeItem("ucser_admin");
  location.href="login.html";
}
if(location.pathname.endsWith("admin.html")){
  if(!localStorage.getItem("ucser_admin")) location.href="login.html";
}
