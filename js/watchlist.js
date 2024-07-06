var checklist = document.getElementById("mainCheckList");
var addBullet = document.getElementById("add-bullet");

addBullet.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        console.log(addBullet.value);
        checklist.innerHTML += `
        <li onclick = "removeShow(this)">${addBullet.value}</li>`
    }
})
function removeShow(cellObj){
    checklist.removeChild(cellObj);
}



