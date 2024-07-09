const watchList = document.getElementById("watch-list");
const progList= document.getElementById("prog-list");
const addBulletWatch = document.getElementById("add-bullet-watch");
const addBulletProg = document.getElementById("add-bullet-prog");

addBulletWatch.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        console.log(addBulletWatch.value);
        watchList.innerHTML += `
        <li onclick = "removeWatchShow(this)">${addBulletWatch.value}</li>`
    }
})
addBulletProg.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        console.log(addBulletProg.value);
        progList.innerHTML += `
        <li onclick = "removeProgShow(this)">${addBulletProg.value}</li>`
    }
})
function removeWatchShow(cellObj){
    watchList.removeChild(cellObj);
}
function removeProgShow(cellObj){
    progList.removeChild(cellObj);
}

const tabs = document.getElementById("tabs");
const tabItems = tabs.querySelectorAll('li');
const checklists = document.querySelectorAll(".checklist");
console.log(checklists);

var idx = 0;
function tabClicked(cellObj,num){
    tabItems.forEach(li=>{
        li.classList.remove('active');
    })
    cellObj.classList.add('active');

    checklists.forEach(item=>{
        item.classList.remove('active');
    })
    num == 1 ? document.getElementById('towatch-container').classList.add('active'):document.getElementById('inprog-container').classList.add('active');
}


