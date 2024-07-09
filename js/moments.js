const importField = document.querySelector(".import-img-field");
const fileInput = document.getElementById('file-input');


function uploadImg(){
    fileInput.click();
}

fileInput.addEventListener("change", function(){
    const importingImg = this.files[0];
    const reader = new FileReader();
    reader.onload = () =>{          //if file is read successfully....
        const imgUrl = reader.result;   //returns file contents
        const insertedImg = document.createElement('img'); //creates HTML img element 
        insertedImg.src = imgUrl;   //image's link is the url returned by file content
        if (importField.getElementsByTagName('img').length>0){
            var imgs = importField.getElementsByTagName('img');  //NodeList of imgs
            imgs[0].parentNode.removeChild(imgs[0]);               //removing first (and only) element of imgs NodeList
        }
        importField.appendChild(insertedImg);  //add the image variable to the import field
        insertedImg.id = "pending-img";
        importField.classList.add("active"); //add the "active" class when we add an image
        importField.dataset.img = importingImg.name;   //the uploadName variable = name of imported image
    }
    reader.readAsDataURL(importingImg);
})

function removeMoment(idx){
    const momentToDel = document.getElementById(idx);
    momentToDel.remove();
}

const postButton = document.getElementById("post-button");
const form = document.getElementById("pending-form");
var draftButton = document.getElementById("add-moment");

draftButton.addEventListener("click", function(){
    form.classList.toggle("visible");
})

var momentCounter = document.querySelectorAll(".moment-box.entry");
console.log(momentCounter.length);

form.addEventListener("submit", function(event){
        form.classList.toggle("visible");
        event.preventDefault(); 
        const newTitle = document.getElementById("pending-title").value;
        const newEp = document.getElementById("pending-episodeNum").value;
        const newImg = document.getElementById("pending-img");
        const newCaption = document.getElementById("pending-caption").value;
        const newIdx = momentCounter.length;
    
        const date = new Date().toLocaleString("en-US");

        console.log(newImg);

        const startHTML = `<div class = 'moment-box entry' id = 'idx${newIdx}' draggable="true">
            <div class = "header">
                <div class = "title">${newTitle}</div>
                <div class = "episode">(${newEp})</div>
                <i class="fa-solid fa-x remove" onclick = "removeMoment('idx${newIdx}')"></i>
            </div>
        `
        var medHTML = '';
        if(newImg != null){
            medHTML = `<img class = "screenshot" src = '${newImg.src}'></img>`;
        }
        const endHTML =
        `
            <div class = "caption">${newCaption}</div>
            <div class = "date"> ${date} </div>
        </div>
        `

        form.insertAdjacentHTML("beforebegin", startHTML + medHTML + endHTML)
})



