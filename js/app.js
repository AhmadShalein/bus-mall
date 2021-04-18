'use strict';

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

let counter = 0;
let maxRounds = 25;
let leftIndex;
let middleIndex;
let rightIndex;

function photo(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.views = 0;
  photo.allImages.push(this);
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
  leftImageElement.src = photo.allImages[leftIndex].source;
  middleImageElement.src = photo.allImages[middleIndex].source;
  rightImageElement.src = photo.allImages[rightIndex].source;

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
      photo.allImages[leftIndex].views++;
    } else if (event.target.id === 'middle-image') {
      photo.allImages[middleIndex].votes++;
      photo.allImages[middleIndex].views++;
    } else if (event.target.id === 'right-image') {
      photo.allImages[middleIndex].votes++;
      photo.allImages[middleIndex].views++;
    }
    renderThreeImages();
    console.log(photo.allImages);
  } else {
    leftImageElement.removeEventListener('click', handleClicking);
    middleImageElement.addEventListener('click', handleClicking);
    rightImageElement.removeEventListener('click', handleClicking);
  }
}

let container = document.getElementById('container');
let btn = document.createElement('button');
container.appendChild(btn);
btn.textContent = 'view results';
btn.onclick = renderList;
 function renderList(){
  let ul = document.getElementById('unList');
  for (let i = 0; i < photo.allImages.length; i++){
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${photo.allImages[i].name} had ${photo.allImages[i].votes} votes, and was seen ${photo.allImages[i].views} times`;
  }
 }
function genrateRandomIndex() {
  return Math.floor(Math.random() * photo.allImages.length);
}