var form = document.getElementById("review")
var numStars = 0;

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

    addShow(showTitle, showNotes, numStars);
})

function addShow(title, notes, stars){
    var showTable = document.getElementById('show-list');

    var newRow = showTable.insertRow();
    var newStars =  ' ';
    for (let i = 0; i < numStars; i++){
        newStars += '<i class="fa fa-star"></i>';
    }
    newRow.innerHTML += `
        <td>${title}</td>
        <td><div class = 'unchanging-stars stars'>${newStars}<\div></td>
    `
}
function resetStarReview(){
    stars.forEach(i=>{i.style.color = "#AFAFAF"});
}