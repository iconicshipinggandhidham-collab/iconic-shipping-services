const params=new URLSearchParams(location.search);
if(params.get("register")) showRegister();
function showRegister(){loginBox.hidden=true;registerBox.hidden=false}
function showLogin(){loginBox.hidden=false;registerBox.hidden=true}
function go(u){location.href=u}
login.addEventListener("submit",async e=>{
 e.preventDefault(); msg.textContent="Signing in…";
 const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(login)))});
 const d=await r.json(); if(!r.ok){msg.textContent=d.message;return}
 go(d.user.role==="admin"?"/admin.html":"/account.html");
});
register.addEventListener("submit",async e=>{
 e.preventDefault(); msg.textContent="Creating account…";
 const r=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(register)))});
 const d=await r.json(); if(!r.ok){msg.textContent=d.message;return} go("/account.html");
});
