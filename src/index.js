const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// EVENT LISTENERS
const newToyForm = document.querySelector('.add-toy-form');

document.addEventListener('DOMContentLoaded', function(e){
  // debugger;
  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((json) => displayToys(json))
});

newToyForm.addEventListener("submit", function(e){
  event.preventDefault();
  const toyName = newToyForm.name.value
  const toyImage = newToyForm.image.value
  postToy(toyName, toyImage);
  // debugger
});




// FUNCTIONS
function displayToys(json){
  const outerDiv = document.querySelector('#toy-collection');
  json.forEach(function(toy){
    let innerDiv = document.createElement('div');
    innerDiv.innerHTML = `<div class="card" id="card-${toy.id}">
                          <h2>${toy.name}</h2>
                          <img src=${toy.image} class="toy-avatar" />
                          <p id="likes-${toy.id}">${toy.likes}</p>
                          <button data-likes=${toy.likes} class="like-btn" id="like-btn-${toy.id}">Like <3</button>
                          </div>`;
    outerDiv.append(innerDiv);
    let likeButton = document.querySelector(`#like-btn-${toy.id}`)

    likeButton.addEventListener("click", function(event){
    incrementLikes(event, toy.id)})
    // debugger;
  })
}



function postToy(toyName, toyImage) {
  const toyInfo = {
    "name": toyName,
    "image": toyImage,
    "likes": 0
  }
  let config = {
    'method':   'POST',
    'headers':  {"Content-Type": "application/json",
                  "Accept": "application/json"},
      'body':   JSON.stringify(toyInfo)
    }
  fetch("http://localhost:3000/toys", config)
  .then((response) => response.json())
    .then((json) => displayToys([json]))
}




function incrementLikes(event, toyId) {
  let toyLikes = document.querySelector(`#like-btn-${toyId}`).dataset.likes
  const toyInfo = {
    "likes": parseInt(toyLikes, 10) + 1
  }
  let config = {
    'method':   'PATCH',
    'headers':  {"Content-Type": "application/json",
                  "Accept": "application/json"},
      'body':   JSON.stringify(toyInfo)
    }
  fetch(`http://localhost:3000/toys/${toyId}`, config)
  .then((response) => response.json())
    .then((json) => updateLikeCount(json))
}



function updateLikeCount (json) {
  document.querySelector(`#like-btn-${json.id}`).dataset.likes = json.likes
  const newLikeCount = json.likes
  const likeCount = document.querySelector(`#likes-${json.id}`)
  likeCount.innerText = newLikeCount
  // debugger
}
