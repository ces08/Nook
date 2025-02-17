const form = document.getElementById("review")
const showTable = document.getElementById('show-list');

var numStars = 0;

var favorite;

var yesFavButton = document.getElementById('yes-button');
var noFavButton = document.getElementById('no-button');

yesFavButton.addEventListener("click", function(event){
    favorite = true;
    yesFavButton.style.color = '#F59D78';
    noFavButton.style.color = '#a9a9a9';
})
noFavButton.addEventListener("click", function(event){
    favorite = false;
    noFavButton.style.color = '#F59D78';
    yesFavButton.style.color = '#a9a9a9';

})

var stars = document.querySelectorAll("#star-rating .fa-star");
function userStarReview(n){
    numStars = n;
    resetStarReview();
    console.log(stars[n]);
    for (let x = 5-n; x >=0; x ++){
        stars[x].style.color = "#FFCD91";            //style is not translating well to node 
    }
}
form.addEventListener("submit", function(event){
    event.preventDefault(); //prevents inputs from disappearing -- test 
    var showTitle = document.getElementById('title').value;
    var showNotes = document.getElementById('note').value;


    console.log(showTitle);
    console.log(showNotes);
    console.log(numStars);
    console.log(favorite);

    addShow(showTitle, showNotes, favorite);
})

const favList = document.getElementById('favorite-list');

function addShow(title, notes){  
    var newRow = showTable.insertRow();
    var newStars =  ' ';
    for (let i = 0; i < numStars; i++){
        newStars += '<i class="fa fa-star"></i>';
    }
    newRow.innerHTML += `
        <td><i class="fa-solid fa-x remove" onclick = "removeShow(this)"></i></td>
        <td><div class = 'text'>${title}${favorite? `<i class="fa-solid fa-heart"></i></div>` : `</div>`}
        
        <div class = 'tool-tip'><span>${title}(${numStars})</span><br>
            ${notes}
        </div>

        </td>
        <td>
            <div class = 'unchanging-stars stars'>${newStars}</div>
            <div class = 'short-stars stars'> (${numStars}<i class="fa fa-star"></i>) </div>
        </td>
    `
    if (favorite){
        favList.innerHTML += `
        <li>${title}<\li>
        `
    }
    newRow.scrollIntoView({behavior: "smooth",block: 'nearest'});
}

function removeShow(cellObj){
    var rowObj = cellObj.closest('tr');
    showTable.deleteRow(rowObj.rowIndex);
}

function resetStarReview(){
    stars.forEach(i=>{i.style.color = "#c1c1c19b"});
}

const favListElements = favList.querySelectorAll("li");

favList.addEventListener("click",function(e){
    console.log('start!');
    const target = e.target.innerText;
    for (var r = 0; r < showTable.rows.length; r++) {
        if (showTable.rows[r].cells[1].innerText.includes(target)){
            showTable.rows[r].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            console.log('done!');
        }
    }
})
