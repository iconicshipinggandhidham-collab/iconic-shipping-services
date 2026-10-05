const id=new URLSearchParams(location.search).get("id");
(async()=>{
 const r=await fetch("/api/services");const d=await r.json();const s=d.services.find(x=>String(x.id)===String(id))||d.services[0];
 document.title=s.name+" | ICONIC SHIPPING SERVICES";title.textContent=s.name;lead.textContent=s.short_description;heading.textContent=s.name;details.textContent=s.details;
 list.innerHTML=["Maker / model / part number where applicable","Quantity and technical specification","Vessel name and IMO number","Indian port and ETA","Required delivery or working window"].map(x=>`<li>${x}</li>`).join("");
})();
