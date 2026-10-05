async function loadServices(){
 const r=await fetch("/api/services"),d=await r.json();
 servicesGrid.innerHTML=d.services.map(s=>`<a class="card" href="/service.html?id=${s.id}"><div class="icon">⚓</div><h3>${esc(s.name)}</h3><p>${esc(s.short_description)}</p><span>View Details →</span></a>`).join("");
 service.innerHTML='<option value="">Select a service</option>'+d.services.map(s=>`<option>${esc(s.name)}</option>`).join("");
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
loadServices();
enquiryForm.addEventListener("submit",async e=>{
 e.preventDefault();status.textContent="Submitting…";
 const r=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(enquiryForm)))});
 const d=await r.json();status.textContent=r.ok?`✓ Enquiry received. Reference: ${d.enquiry.reference}`:(d.message||"Submission failed.");
 if(r.ok) enquiryForm.reset();
});
