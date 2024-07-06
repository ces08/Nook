var form = document.getElementById("review")
var showTable = document.getElementById('show-list');

var numStars = 0;

var favorite;

var yesFavButton = document.getElementById('yes-button');
var noFavButton = document.getElementById('no-button');

yesFavButton.addEventListener("click", function(event){
    favorite = true;
    yesFavButton.style.color = '#4d74bd';
    noFavButton.style.color = 'black';
})
noFavButton.addEventListener("click", function(event){
    favorite = false;
    noFavButton.style.color = '#4d74bd';
    yesFavButton.style.color = 'black';

})

var stars = document.querySelectorAll("#star-rating .fa-star");
function userStarReview(n){
    numStars = n;
    resetStarReview();
    console.log(stars[n]);
    for (let x = 5-n; x >=0; x ++){
        stars[x].style.color = "#fbc36e";            //style is not translating well to node 
    }
}
form.addEventListener("submit", function(event){
    event.preventDefault() //prevents inputs from disappearing -- test 
    var showTitle = document.getElementById('title').value;
    var showNotes = document.getElementById('note').value;


    console.log(showTitle);
    console.log(showNotes);
    console.log(numStars);
    console.log(favorite);

    addShow(showTitle, showNotes, favorite);
})

function addShow(title, notes){
    
    var newRow = showTable.insertRow();
    var newStars =  ' ';
    for (let i = 0; i < numStars; i++){
        newStars += '<i class="fa fa-star"></i>';
    }
    newRow.innerHTML += `
        <td><i class="fa-solid fa-x remove" onclick = "removeShow(this)"></i></td>
        ${favorite? `<td>${title} <img class = "heart-favorite" src = "svg/heart.svg"> </td>` : `<td>${title}</td>`}
        <td><div class = 'unchanging-stars stars'>${newStars}<\div></td>
    `}

function removeShow(cellObj){
    var rowObj = cellObj.closest('tr');
    showTable.deleteRow(rowObj.rowIndex);
}

function resetStarReview(){
    stars.forEach(i=>{i.style.color = "#AFAFAF"});
}

