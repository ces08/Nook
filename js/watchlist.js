const watchList = document.getElementById("watch-list");
const progList= document.getElementById("inprog-list");
const musicList = document.getElementById("music-list");
const addBulletWatch = document.getElementById("add-bullet-watch");
const addBulletProg = document.getElementById("add-bullet-prog");
const addBulletMusic = document.getElementById("add-bullet-music");

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

const progCheck = document.getElementById('prog-check');
const imgUpload = document.getElementById('add-prog-img');
const imgUploadBtn = document.getElementById('img-upload')
const progArr = ['cardcaptorsakura.jpg','frieren.jpg','windbreaker.jpg','nonnonbyori.jpg','oshinoko.jpg','snow-white.jpg'];

addBulletProg.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        const imgToPost = imgUpload.value;
        console.log(imgToPost);
        const progTitle = addBulletProg.value;
        const checked = progCheck.checked;
        progList.innerHTML += `
        <li>
            <div class = 'title' onclick = "removeProgShow(this,${imgToPost})">${progTitle}
            <input class = 'post-checkbox' type = 'checkbox' ${checked? `checked`:``} disabled = 'disabled'>
        </li>`
        if (checked){
            progArr.push(imgToPost);
            addProgGallery(imgToPost,progTitle);
        }
    }
})

const progGallery = document.getElementById('prog-box');

function addProgGallery(imgURL, title){
    console.log('add');
    progGallery.innerHTML += 
    `
    <div class = 'prog-widget'>
        <img src = '${imgURL}'>
         <div class = 'prog-title'>${title}</div>
    </div>
    `
}

const toolTip = document.getElementById("tooltip");
imgUpload.addEventListener("change", function(){
    const importingImg = this.files[0];
    const reader = new FileReader();
    reader.onload = () =>{          //if file is read successfully....
        const imgURL = reader.result;   //returns file contents
        const insertedImg = document.createElement('img'); //creates HTML img element 
        insertedImg.src = imgURL;   //image's link is the url returned by file content
        console.log(insertedImg);
        insertedImg.id = "uploaded-img";
        imgUploadBtn.classList.add("active"); //add the "active" class when we add an image
        toolTip.dataset.img = importingImg.name;   //the uploadName variable = name of imported image
        console.log(importingImg.name);

    }
    reader.readAsDataURL(importingImg);
})


const addURL = document.getElementById("add-url");
const musicCheck = document.getElementById("music-check");
const musicArr = ['PgBvV9ofjmA', 'ED66vOZg9t4'];

const checkboxes = document.querySelectorAll('input[type = checkbox]');
addBulletMusic.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        const postBool = musicCheck.checked;
        const ytURL = addURL.value;

        const startIdx = ytURL.indexOf('watch?v=')+8;
        const endIdx = ytURL.indexOf('&ab_channel');
        const urlID = ytURL.substring(startIdx,endIdx);

        musicList.innerHTML += `
        <li>
            <div class = 'title' onclick = "removeMusic(this, '${urlID}')">${addBulletMusic.value}</div>
            <div class = 'ytURL'>${urlID}</div>
            <input class = 'post-checkbox' type = 'checkbox' ${postBool?`checked`:``} disabled = 'disabled'>
        </li>`
        if (postBool){
            musicArr.push(urlID);
            addMusic(urlID);
        }
    }
})

const vidBox = document.getElementById('vid-box');

function addMusic(urlID){
    
    vidBox.innerHTML += 
    `<iframe id = '${urlID}' class = 'vid' src="https://www.youtube.com/embed/${urlID}?"  
    frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
    web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
}



function removeWatchShow(e){
    e.parentElement.remove();
}
function removeProgShow(e){
    e.parentElement.remove();
}
function removeMusic(e, urlID){
    e.parentElement.remove();
    console.log(document.getElementById('PgBvV9ofjmA'));
    document.getElementById(urlID).remove();
}

const tabs = document.getElementById("tabs");
const tabItems = tabs.querySelectorAll('li');
const checklists = document.querySelectorAll(".checklist");
console.log(checklists);



