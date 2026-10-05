let all=[];let selected=null;
async function api(url,opt={}){const r=await fetch(url,opt);if(r.status===401||r.status===403){location="/login.html?admin=1";return null}return r.json();}
async function init(){
 const me=await api("/api/auth/me");if(!me)return;if(me.user.role!=="admin")return location="/account.html";
 const s=await api("/api/admin/stats");stats.innerHTML=Object.entries(s.stats).map(([k,v])=>`<div><b>${v}</b><span>${k}</span></div>`).join("");
 const d=await api("/api/enquiries");all=d.enquiries||[];
 enquiries.innerHTML=all.map(e=>`<div class="enq" onclick="selectEnq('${e.id}')"><b>${e.reference}</b><span>${esc(e.name)} • ${esc(e.service)}</span><span>${esc(e.vessel||"-")} / ${esc(e.port||"-")}</span><select onclick="event.stopPropagation()" onchange="setStatus('${e.id}',this.value)">${["New","Processing","Quoted","Completed","Closed"].map(x=>`<option ${x===e.status?"selected":""}>${x}</option>`).join("")}</select></div>`).join("")||"<p>No enquiries.</p>";
}
function selectEnq(id){selected=all.find(x=>x.id===id);quoteBox.innerHTML=`<p><b>${selected.reference}</b> — ${esc(selected.name)} — ${esc(selected.vessel||"")}</p><div id="items"></div><button class="btn outline" onclick="addItem()">+ Add Item</button><div class="row"><label>Tax %<input id="tax" type="number" value="0" min="0" max="100"></label><label>Valid Until<input id="valid" type="date"></label></div><label>Notes<textarea id="notes"></textarea></label><button class="btn primary" onclick="createQuote()">Create Quotation PDF</button><div id="qmsg"></div>`;addItem();
}
function addItem(){const d=document.createElement("div");d.className="quote-item";d.innerHTML='<input class="desc" placeholder="Description"><input class="qty" type="number" value="1" min="0"><input class="price" type="number" value="0" min="0 step="0.01">';items.appendChild(d);}
async function createQuote(){const rows=[...document.querySelectorAll(".quote-item")].map(x=>({description:x.querySelector(".desc").value,qty:x.querySelector(".qty").value,unit_price:x.querySelector(".price").value}));const d=await api("/api/quotes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({enquiry_id:selected.id,items:rows,tax_rate:tax.value,valid_until:valid.value,notes:notes.value,currency:"INR"})});qmsg.textContent=d.ok?"✓ Quotation created and emailed to customer.":d.message;init();}
async function setStatus(id,status){await api("/api/enquiries/"+id+"/status",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});init();}
async function logout(){await fetch("/api/auth/logout",{method:"POST"});location="/";}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
init();
