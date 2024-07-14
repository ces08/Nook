const watchList = document.getElementById("watch-list");
const progList= document.getElementById("inprog-list");
const addBulletWatch = document.getElementById("add-bullet-watch");
const addBulletProg = document.getElementById("add-bullet-prog");

var tagList = [];
const tagInput = document.getElementById("add-tags");

addBulletWatch.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        console.log(addBulletWatch.value);
        const watchTitle = `<li onclick = "removeWatchShow(this)"><div class = 'title'>${addBulletWatch.value}</div>`
        let tagArr = `<div class = 'tags'>\n`;
        tagList.forEach(e=>{
            tagArr += `<span class = ${e.toLowerCase()}>${e}</span>\n`;
            console.log(e);
        });
        watchList.innerHTML += (watchTitle +tagArr + `</div></li>`);
    }
})

const genres = ['sports','action','shonen','fantasy','romance','isekai','mystery','shoujo','sci-fi','comedy','slice-of-life'];

function addTag(){
    let newTag = tagList.at(-1);
    if (genres.includes(newTag.toLowerCase())){
        let tagHTML = `<span class = ${newTag.toLowerCase()}>${newTag}<i class="fa-solid fa-xmark" onclick = 'remove(this, "${newTag}")'></i></span>`;
        tagInput.insertAdjacentHTML('beforeBegin', tagHTML);
    } 
    if (tagList.length >=2){
        tagInput.classList.toggle('hidden');
    }
}
function remove(obj, tagToDel){
    let i = tagList.indexOf(tagToDel);
    console.log(i);
    tagList.splice(i, 1);
    obj.parentElement.remove();
    console.log(tagList);
    if (tagList.length ==1){
        tagInput.classList.toggle('hidden');
    }
}


tagInput.addEventListener("keyup", function(event){
    if (tagList.length < 2){
        if (event.key === "Enter"){
            let newTag = event.target.value.replace(/\s+/g, ''); //remove white space
            if (genres.includes(newTag.toLowerCase())){
            newTag = newTag.charAt(0).toUpperCase() + newTag.slice(1).toLowerCase();
                if (newTag.length>1 && !tagList.includes(newTag)){
                        tagList.push(newTag);
                        addTag();
                }
                console.log(tagList);
                event.target.value = "";
            }
        }
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


