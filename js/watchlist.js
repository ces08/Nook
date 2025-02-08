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
const progForm = document.getElementById('add-prog-form');
const imgUpload = document.getElementById('add-prog-img');
const imgUploadBtn = document.getElementById('img-upload')

const progGallery = document.getElementById('prog-box');

const toolTip = document.getElementById("tooltip");
var imgURL = '';
imgUpload.addEventListener("change", function(){
    const importingImg = this.files[0];
    const reader = new FileReader();
    reader.onload = () =>{          //if file is read successfully....
        imgURL = reader.result;   //returns file contents
        toolTip.dataset.img = importingImg.name;   //the uploadName variable = name of imported image
    }
    reader.readAsDataURL(importingImg);
    imgUploadBtn.classList.add('active');
})


progForm.addEventListener("submit", function(event){
    event.preventDefault();
    const progTitle = addBulletProg.value;
    const progTitleEdited = progTitle.toLowerCase().replace(/\s+/g,'');
    const imgSubmitted = imgURL != '';
    console.log("IMG SUBMITTED: " + imgSubmitted);
    progList.innerHTML += `
    <li>
        <div class = 'title' onclick = "removeProgShow(this,'${progTitleEdited}')">${progTitle}
        <input class = 'post-checkbox right-div' type = 'checkbox' ${imgSubmitted? `checked`:``} disabled = 'disabled'>
    </li>`
    if (imgSubmitted){
        addProgGallery(imgURL,progTitle);
        importingImg = null;
        imgURL = '';
        toolTip.dataset.img = 'No file';
        imgUploadBtn.classList.remove("active");
        addBulletProg.value = "";
    }
})

function addProgGallery(imgURL, title){
    const titleTBA = title.replace(/\s+/g, '').slice(0, 21);
    progGallery.innerHTML += 
    `
    <div class = 'prog-widget'>
        <img src = '${imgURL}'>
        <div id = '${titleTBA}' class = 'prog-title'>${titleTBA.toUpperCase()}</div>
    </div>
    `

    
    document.getElementById(titleTBA).scrollIntoView({behavior: "smooth",block: 'nearest'});
}
const addURL = document.getElementById("add-url");
const musicCheck = document.getElementById("music-check");
const musicForm = document.getElementById("add-music-form");
const checkboxes = document.querySelectorAll('input[type = checkbox]');
musicForm.addEventListener("submit", function(event){
    event.preventDefault();
    const ytURL = addURL.value;
    const urlSubmitted = (ytURL.length!=0);
    console.log(urlSubmitted);
    const startIdx = ytURL.indexOf("watch?v=") + 8;
    if (urlSubmitted && !ytURL.includes('youtube.com/watch?v=')){
        alert("Invalid Youtube URL. Please copy the exact URL");
    }
    else{
        const urlID = ytURL.substring(startIdx);

        musicList.innerHTML += `
        <li>
            <div class = 'title' onclick = "removeMusic(this, '${urlID}')">${addBulletMusic.value}</div>
            <div class = 'ytURL'>${urlID}</div>
            <input class = 'post-checkbox right-div' type = 'checkbox' ${urlSubmitted?`checked`:``} disabled = 'disabled'>
        </li>`
        if (urlSubmitted){
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
    document.getElementById(urlID).scrollIntoView({behavior: "smooth",block: 'nearest'});

}



function removeWatchShow(e){
    e.parentElement.remove();
}
function removeProgShow(e, progTitle){
    const widget =  document.getElementById(progTitle);
    e.parentElement.remove();
    if(widget){
        widget.parentElement.remove();
    }
   
}

function removeMusic(e, urlID){
    e.parentElement.remove();
    document.getElementById(urlID).remove();
}

const tabs = document.getElementById("tabs");
const tabItems = tabs.querySelectorAll('li');
const checklists = document.querySelectorAll(".checklist");
console.log(checklists);



