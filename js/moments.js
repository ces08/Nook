const smallerBox = document.getElementById("smaller-box");
var draftButton = document.getElementById("add-moment");
var boxButton = document.getElementById("box-button");
var momentCounter = document.querySelectorAll(".moment-box.entry");
console.log(momentCounter.length);


draftButton.addEventListener("click", function(event){
    boxButton.insertAdjacentHTML("beforebegin",`
        <form class = "moment-box new-moment" id = "pending-form">
            <div class = "header">
                <input class = "title" id = "pending-title" name = "title" type = "text" placeholder = "Show Title" required class = "fill"> </input>
                <input class = "episode" id = "pending-episodeNum" placeholder = "S0, Ep0"> </input>
                <i class="fa-solid fa-x remove" onclick = "removeMoment('idx${momentCounter.length++}')"></i>

            </div>
            <input class = "screenshot import-img-box" id = "pending-img" type = "file" accept= "image/png, image/jpg, image/jpeg"></input>
            <textarea class = "caption"id = "pending-caption" name = "caption" placeholder = "Start writing a caption..." required rows = "3"></textarea>
            <button id = "submit-form-button" form = "pending-form" value = "Submit">Post</button>
        </form>
        `)
        
        var form = document.getElementById("pending-form");
        form.addEventListener("submit", function(event){
            event.preventDefault();
        
            var newTitle = document.getElementById("pending-title").value;
            var newEp = document.getElementById("pending-episodeNum").value;
            var newImg = document.getElementById("pending-img");
            var newCaption = document.getElementById("pending-caption").value;
            var newIdx = momentCounter.length;
        
            console.log(newImg);
            form.insertAdjacentHTML("beforebegin", 
            `<div class = 'moment-box entry' id = 'idx${newIdx}' draggable="true">
                <div class = "header">
                    <div class = "title">${newTitle}</div>
                    <div class = "episode">(${newEp})</div>
                    <i class="fa-solid fa-x remove" onclick = "removeMoment('idx${newIdx}')"></i>
                </div>
                <img class = "screenshot" src = '${URL.createObjectURL(newImg.files[0])}'>
                <div class = "caption">${newCaption}</div>
                <div class = "date">06/09/24 12:46AM</div>
            </div>
            `
            )
        })
})




function removeMoment(idx){
    const momentToDel = document.getElementById(idx);
    momentToDel.remove();
}


