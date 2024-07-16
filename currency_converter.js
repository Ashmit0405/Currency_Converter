import countryList from "./list.js";
const url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#convert");
const clc=document.querySelector("#clear");
let amtval=document.querySelector(".enteramount input");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let msg= document.querySelector(".msg");
let msg1=document.querySelector("#msg1");
msg.classList.add("hide");
for(let select of dropdowns){
    for(let curr in countryList){
        let option=document.createElement("option");
        option.innerText=curr;
        option.value=curr;
        if(select.name==="from"&&curr==="USD"){
            option.selected="selected";
        }
        if(select.name==="to"&&curr==="INR"){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        changeflag(evt.target);
        msg.classList.add("hide");
    })
}

const changeflag=(element)=>{
    let country=element.value;
    let concode=countryList[country];
    let img=element.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${concode}/flat/64.png`;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amt=amtval.value;
    const u=`${url}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(u);
    let data=await response.json();
    let ans=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    msg.innerText=`1 ${fromcurr.value}= ${ans} ${tocurr.value}`;
    msg.classList.remove("hide");
    msg1.innerText="Converted amount";
    amtval.value=amt*ans;
    console.log("Entered amount= "+amt);
    console.log("Converted amount= "+amtval.value);
})
clc.addEventListener("click",(evt)=>{
    evt.preventDefault();
   amtval.value=null;
   msg.classList.add("hide");
   msg1.innerText="Enter the amount";
})