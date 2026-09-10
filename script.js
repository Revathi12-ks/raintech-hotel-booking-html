const rooms=[
{code:"R101",type:"Deluxe Room",price:3500,maxGuests:2},
{code:"R102",type:"Deluxe Room",price:3500,maxGuests:2},
{code:"R201",type:"Executive Suite",price:5800,maxGuests:3},
{code:"R202",type:"Executive Suite",price:5800,maxGuests:3},
{code:"R301",type:"Family Room",price:4200,maxGuests:4}];
const bookings=[
{roomCode:"R101",checkIn:"2026-09-18",checkOut:"2026-09-20"},
{roomCode:"R201",checkIn:"2026-09-22",checkOut:"2026-09-25"}];
let selected=null;
const $=id=>document.getElementById(id);
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function date(v){const [y,m,d]=v.split("-").map(Number);return new Date(y,m-1,d)}
function nights(a,b){return a&&b?Math.round((date(b)-date(a))/86400000):0}
function overlap(code,a,b){return bookings.some(x=>x.roomCode===code&&a<x.checkOut&&b>x.checkIn)}
function fmt(v){return v?date(v).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"}

$("checkIn").min=today();
function render(){
 const g=+$("guests").value,a=$("checkIn").value,b=$("checkOut").value;
 $("rooms").innerHTML="";
 rooms.forEach(r=>{
  const tooMany=r.maxGuests<g, booked=a&&b&&b>a&&overlap(r.code,a,b), unavailable=tooMany||booked;
  const el=document.createElement("div");el.className=`room ${selected?.code===r.code?"selected":""} ${unavailable?"unavailable":""}`;
  el.innerHTML=`<div class="rrow"><div><h3>${r.code}</h3><p>${r.type}</p></div><div class="price">₹${r.price.toLocaleString("en-IN")}/night</div></div><div class="meta"><span>Up to ${r.maxGuests} guests</span><span class="${unavailable?"bad":"ok"}">${tooMany?"Max "+r.maxGuests+" guests":booked?"Booked for these dates":"Available"}</span></div>`;
  if(!unavailable)el.onclick=()=>{selected=r;render();update()};
  $("rooms").appendChild(el);
 });
 if(selected&&(selected.maxGuests<g||(a&&b&&b>a&&overlap(selected.code,a,b))))selected=null;
}
function validate(){
 $("dateError").textContent="";$("roomError").textContent="";
 const a=$("checkIn").value,b=$("checkOut").value,g=+$("guests").value;
 let ok=true;
 if(!a||!b){$("dateError").textContent="Please select both check-in and check-out dates.";ok=false}
 else if(a<today()){$("dateError").textContent="Check-in date cannot be in the past.";ok=false}
 else if(b<=a){$("dateError").textContent="Check-out date must be after check-in date.";ok=false}
 if(!selected){$("roomError").textContent="Please select a room.";ok=false}
 else if(selected.maxGuests<g){$("roomError").textContent=`Room ${selected.code} allows up to ${selected.maxGuests} guests.`;ok=false}
 else if(a&&b&&overlap(selected.code,a,b)){$("roomError").textContent=`Room ${selected.code} is already booked for the selected dates.`;ok=false}
 return ok;
}
function update(){
 const a=$("checkIn").value,b=$("checkOut").value,n=nights(a,b),ok=validate();
 $("sRoom").textContent=selected?`${selected.code} — ${selected.type}`:"—";
 $("sIn").textContent=fmt(a);$("sOut").textContent=fmt(b);$("sNights").textContent=n>0?n:0;
 $("sTotal").textContent=selected&&n>0?"₹"+(n*selected.price).toLocaleString("en-IN"):"₹0";
 $("status").textContent=ok?"Ready to book":"Select dates and a room";$("status").classList.toggle("ready",ok);
 $("confirm").disabled=!ok;
}
function refresh(){render();update()}
$("checkIn").onchange=refresh;$("checkOut").onchange=refresh;$("guests").onchange=refresh;
$("confirm").onclick=()=>{if(validate())$("success").textContent="Booking details validated successfully. No backend or payment is required for this assessment."};
render();update();