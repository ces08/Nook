const watchList = document.getElementById("watch-list");
const progList= document.getElementById("inprog-list");
const musicList = document.getElementById("music-list");
const addBulletWatch = document.getElementById("add-bullet-watch");
const addBulletProg = document.getElementById("add-bullet-prog");
const addBulletMusic = document.getElementById("add-bullet-music");

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



const addURL = document.getElementById("add-url");
const addCheck = document.getElementById("add-check");
const opArr = ['https://www.youtube.com/watch?v=PgBvV9ofjmA', 'https://www.youtube.com/watch?v=ED66vOZg9t4&ab_channel=Crunchyroll'];

const checkboxes = document.querySelectorAll('input[type = checkbox]');
addBulletMusic.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        const postBool = addCheck.checked;
        const ytURL = addURL.value;
        musicList.innerHTML += `
        <li>
            <div onclick = "removeMusic(this)">${addBulletMusic.value}</div>
            <div class = 'ytURL'>${ytURL}</div>
            <input class = 'post-checkbox' type = 'checkbox' ${postBool?`checked`:``} disabled = 'disabled'>
        </li>`
        if (postBool){
            opArr.push(ytURL);
            addMusic(ytURL);
        }
    }
})

const vidBox = document.getElementById('vid-box');

function addMusic(url){
    const startIdx = url.indexOf('watch?v=')+8;
    const endIdx = url.indexOf('&ab_channel');
    const alteredURL = url.substring(startIdx,endIdx);
    vidBox.innerHTML += 
    `<iframe class = 'vid' src="https://www.youtube.com/embed/${alteredURL}?"  
    frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
    web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
}

function removeMusic(url){

}


function removeWatchShow(e){
    e.parentElement.remove();
}
function removeProgShow(e){
    e.parentElement.remove();
}
function removeMusic(e){
    e.parentElement.remove();
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
    if (num===1){
        document.getElementById('towatch-container').classList.add('active');
    }
    else if (num===2){
        document.getElementById('inprog-container').classList.add('active');
    }
    else{
        document.getElementById('music-container').classList.add('active');
    }
}


