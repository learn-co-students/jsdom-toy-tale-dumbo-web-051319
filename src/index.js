const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
// const likeButton = document.querySelector('.like-btn')
const toyContainer = document.querySelector("#toy-collection")
let addToy = false

// YOUR CODE HERE

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

//---------------------  MANIPULATION HELPERS ---------------------
function increaseLikes(event, toyId, toyLikes) {
  let newLikes = +toyLikes
  newLikes += 1
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
  .then(response => response.json())
  .then(toy => updateToyDom(toy, event))
}

function updateToyDom(toy, event) {
  // debugger
  event.target.dataset.btnlikes = toy.likes
  event.target.parentElement.querySelector('.like-tag').innerText = `${toy.likes} likes`
}

function deleteToy(event, toyId) {
  debugger
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "DELETE"
  })
  event.target.parentElement.remove()
}



//---------------------  LOGIC ---------------------
function makeToys(toys) {
  toys.forEach((toy) => {singleToy(toy, toyContainer)})
}

function singleToy(toy, toyContainer) {
  toyContainer.innerHTML += `
  <div class="card" data-id=${toy.id}>
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar">
  <p class="like-tag">${toy.likes} likes</p>
  <button class="like-btn" data-btnlikes=${toy.likes}>Like <3</button>
  <button class="delete-btn">Delete :( </button>
  </div>
  `
}

function clickListeners(event) {
  const toyId = event.target.parentElement.dataset.id
  if (event.target.className === "like-btn") {
    const toyLikes = event.target.dataset.btnlikes
    increaseLikes(event, toyId, toyLikes)
  }
  if (event.target.className === "delete-btn") {
    deleteToy(event, toyId)
  }
}

//--------------------- EVENT LISTENERS ---------------------
document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(makeToys)
})

addToyForm.addEventListener("submit", function(event) {
  event.preventDefault()
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
    "name": event.target.name.value,
    "image": event.target.image.value,
    "Likes": 0
    })
  })
  .then(response => response.json())
  .then(toy => {singleToy(toy, toyContainer)})
})

toyContainer.addEventListener("click", clickListeners)
