async function init(){
 const me=await fetch("/api/auth/me"); if(!me.ok)return location="/login.html";
 const m=await me.json(); welcome.textContent=`Welcome, ${m.user.name}`;
 const r=await fetch("/api/enquiries/mine"); const d=await r.json();
 cards.innerHTML=d.enquiries.length?d.enquiries.map(e=>`<article class="portal-card"><div class="portal-head"><b>${e.reference}</b><span class="status">${e.status}</span></div><h3>${esc(e.service)}</h3><p><b>Vessel:</b> ${esc(e.vessel||"-")} &nbsp; <b>Port:</b> ${esc(e.port||"-")}</p><p>${esc(e.message)}</p>${e.quote_id?`<a class="btn primary" href="/api/quotes/${e.quote_id}/pdf">Download Quotation PDF</a>`:"<small>Quotation not issued yet.</small>"}</article>`).join(""):`<p>No enquiries found. <a href="/#quote">Send your first requirement →</a></p>`;
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
async function logout(){await fetch("/api/auth/logout",{method:"POST"});location="/";}
init();
