// Annonces fictives : démonstration de l'interface uniquement.
const jobs=[
{id:1,title:"Responsable GRC & gouvernance cybersécurité",company:"Entreprise industrielle (démo)",location:"PACA",contract:"CDI",role:"GRC / gouvernance",senior:true,technical:2,score:93,tags:["GRC","Gouvernance","Risques","Senior"]},
{id:2,title:"RSSI / CISO — gouvernance et pilotage",company:"Groupe de services (démo)",location:"Aix-Marseille",contract:"CDI",role:"RSSI / CISO",senior:true,technical:3,score:90,tags:["RSSI","Pilotage","Conformité","Senior"]},
{id:3,title:"Consultant senior GRC cybersécurité",company:"Cabinet de conseil (démo)",location:"Sophia Antipolis",contract:"Freelance / portage",role:"GRC / gouvernance",senior:true,technical:2,score:88,tjm:800,tags:["GRC","Freelance / portage","TJM indicatif : 800 €"]},
{id:4,title:"Responsable risques cyber & conformité",company:"Groupe régional (démo)",location:"Toulon",contract:"CDI",role:"Risques / conformité",senior:true,technical:2,score:86,tags:["Risques","Conformité","NIS2"]},
{id:5,title:"Responsable gouvernance IA & risques",company:"Entreprise tech (démo)",location:"Remote",contract:"Freelance / portage",role:"Gouvernance IA",senior:true,technical:4,score:84,tjm:750,tags:["IA","Gouvernance","Remote","TJM indicatif : 750 €"]},
{id:6,title:"DPO / Privacy Manager",company:"Entreprise numérique (démo)",location:"PACA",contract:"CDI",role:"DPO / Privacy",senior:true,technical:1,score:72,tags:["Privacy","RGPD"]},
{id:7,title:"Ingénieur SOC N3",company:"ESN (démo)",location:"Sophia Antipolis",contract:"CDI",role:"RSSI / CISO",senior:false,technical:10,score:18,tags:["SOC","SIEM","Technique"]}
];
const $=id=>document.getElementById(id);
function locationMatches(j,v){if(v==="all")return true;if(v==="PACA")return ["PACA","Sophia Antipolis","Aix-Marseille","Toulon"].includes(j.location);return j.location===v}
function filtered(){return jobs.filter(j=>$("showDemo").checked&&locationMatches(j,$("location").value)&&($("contract").value==="all"||j.contract===$("contract").value)&&($("role").value==="all"||j.role===$("role").value)&&(!$("seniorOnly").checked||j.senior)&&(!$("excludeTechnical").checked||j.technical<7)&&j.score>=Number($("minScore").value)).sort((a,b)=>b.score-a.score)}
function render(){const list=filtered();$("count").textContent=list.length;$("jobs").innerHTML=list.length?list.map(j=>`<article class="job"><div class="job-head"><div><h3>${j.title}</h3><div class="company">${j.company}</div><div class="meta">${j.location} · ${j.contract}${j.tjm?` · TJM indicatif : ${j.tjm} €`:""}</div></div><div class="score">${j.score}<small>/100</small></div></div><div class="tags">${j.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><div class="actions"><button type="button" onclick="toggleFollow(this)">Suivre</button></div></article>`).join(""):'<div class="empty">Aucune offre ne correspond aux filtres sélectionnés.</div>'}
function toggleFollow(b){b.textContent=b.textContent==="Suivre"?"Suivie ✓":"Suivre"}
$("minScore").addEventListener("input",e=>{$("scoreValue").textContent=e.target.value;render()});
["location","contract","role","excludeTechnical","seniorOnly","showDemo"].forEach(id=>$(id).addEventListener("change",render));
$("refresh").addEventListener("click",render);render();