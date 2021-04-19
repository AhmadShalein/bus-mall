'use strict';

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

let counter = 0;
let maxRounds = 25;
let leftIndex;
let middleIndex;
let rightIndex;
let prevLeftIndex;
let prevMiddleIndex;
let prevRightIndex;
let arrOfNames = [];

function photo(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.views = 0;
  photo.allImages.push(this);
  arrOfNames.push(this.name);
}


photo.allImages = [];
new photo('bag', 'img/bag.jpg');
new photo('banana', 'img/banana.jpg');
new photo('bathroom', 'img/bathroom.jpg');
new photo('boots', 'img/boots.jpg');
new photo('breakfast', 'img/breakfast.jpg');
new photo('bubblegum', 'img/bubblegum.jpg');
new photo('chair', 'img/chair.jpg');
new photo('cthulhu', 'img/cthulhu.jpg');
new photo('dog-duck', 'img/dog-duck.jpg');
new photo('dragon', 'img/dragon.jpg');
new photo('pen', 'img/pen.jpg');
new photo('pet-sweep', 'img/pet-sweep.jpg');
new photo('scissors', 'img/scissors.jpg');
new photo('shark', 'img/shark.jpg');
new photo('sweep', 'img/sweep.png');
new photo('tauntaun', 'img/tauntaun.jpg');
new photo('unicorn', 'img/unicorn.jpg');
new photo('usb', 'img/usb.gif');
new photo('water-can', 'img/water-can.jpg');
new photo('wine-glass', 'img/wine-glass.jpg');

console.log(photo.allImages);

function renderThreeImages() {
  leftIndex = genrateRandomIndex();
  middleIndex = genrateRandomIndex();
  rightIndex = genrateRandomIndex();

  while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex) {
    leftIndex = genrateRandomIndex();
    middleIndex = genrateRandomIndex();
  }
  while (leftIndex === prevLeftIndex || leftIndex === prevMiddleIndex || leftIndex === prevRightIndex) {
    leftIndex = genrateRandomIndex();
    leftIndex = prevLeftIndex;
  }
  while (middleIndex === prevLeftIndex || middleIndex === prevMiddleIndex || middleIndex === prevRightIndex || middleIndex === leftIndex) {
    middleIndex = genrateRandomIndex();
    middleIndex = prevMiddleIndex;
  }
  while (rightIndex === prevLeftIndex || rightIndex === prevMiddleIndex || rightIndex === prevRightIndex || rightIndex === leftIndex || rightIndex === middleIndex) {
    rightIndex = genrateRandomIndex();
    rightIndex = prevRightIndex;
  }
  console.log(leftIndex,middleIndex,rightIndex);

  leftImageElement.src = photo.allImages[leftIndex].source;
  photo.allImages[leftIndex].views++;
  middleImageElement.src = photo.allImages[middleIndex].source;
  photo.allImages[middleIndex].views++;
  rightImageElement.src = photo.allImages[rightIndex].source;
  photo.allImages[rightIndex].views++;
}
renderThreeImages();

leftImageElement.addEventListener('click', handleClicking);
middleImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);

function handleClicking(event) {
  counter++;
  if (maxRounds >= counter) {
    if (event.target.id === 'left-image') {
      photo.allImages[leftIndex].votes++;
    } else if (event.target.id === 'middle-image') {
      photo.allImages[middleIndex].votes++;
    } else if (event.target.id === 'right-image') {
      photo.allImages[middleIndex].votes++;
    }
    renderThreeImages();
    console.log(photo.allImages);
  } else {
    leftImageElement.removeEventListener('click', handleClicking);
    middleImageElement.addEventListener('click', handleClicking);
    rightImageElement.removeEventListener('click', handleClicking);
  }
}
let button = document.getElementById('btn');
button.addEventListener('click',showningList);

function showningList(){
  renderList();
  chart();
  button.removeEventListener('click',showningList);
}

  let arrOfVotes = [];
  let arrOfViews = [];

 function renderList(){
  let ul = document.getElementById('unList');
  for (let i = 0; i < photo.allImages.length; i++){
    arrOfVotes.push(photo.allImages[i].votes);
    arrOfViews.push(photo.allImages[i].views);
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${photo.allImages[i].name} had ${photo.allImages[i].votes} votes, and was seen ${photo.allImages[i].views} times`;
  }
 }
function genrateRandomIndex() {
  return Math.floor(Math.random() * photo.allImages.length);
}

function chart(){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arrOfNames,
        datasets: [{
            label: 'Number Of Votes',
            data: arrOfVotes,
            backgroundColor: [
                'rgba(60, 60, 60, 0.5)'
            ],
            borderWidth: 1
        },{label: 'Number Of Views',
        data: arrOfViews,
        backgroundColor: [
            'rgba(255, 0, 0, 0.5)'
        ],
        borderWidth: 1
    }]
    }
})
}
