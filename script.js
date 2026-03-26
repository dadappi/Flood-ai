var map=L.map('map').setView([-6.2,106.8],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// toggle island
document.addEventListener("DOMContentLoaded",()=>{
let panel=document.getElementById("panel");
document.getElementById("panel-header").onclick=()=>{
panel.classList.toggle("collapsed");
};
});

// normalize
function n(x){return x/100;}

function calculateFRI(r,e,b,v,d){
return (0.3*n(r))+(0.25*(1-n(e)))+(0.2*n(b))+(0.15*(1-n(v)))+(0.1*(1-n(d)));
}

function manualPredict(){
let fri=calculateFRI(+rain.value||0,+elev.value||0,+density.value||0,+veg.value||0,+river.value||0);
alert("FRI:"+fri.toFixed(2));
}

let markers=[];
let compare=[];

map.on('click',function(e){

let fri=Math.random();

if(markers.length>=2){
markers.forEach(m=>map.removeLayer(m));
markers=[];
compare=[];
}

let m=L.circle(e.latlng,{radius:500,color:fri>0.6?"red":fri>0.3?"orange":"green"})
.addTo(map).bindPopup("FRI:"+fri.toFixed(2)).openPopup();

markers.push(m);
compare.push(fri);

if(compare.length===2){
alert("T1:"+compare[0].toFixed(2)+" T2:"+compare[1].toFixed(2));
}
});
