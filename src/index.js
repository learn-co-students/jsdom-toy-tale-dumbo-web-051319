const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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


// OR HERE!
document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys")
    .then(rsp => rsp.json())
    .then(data => displayToys(data))

})

function displayToys(data) {
  // debugger;
  const outerDiv = document.getElementById('toy-collection')
  data.forEach(function(toy){
    let innerDiv = document.createElement("div")
    innerDiv.class = "card"
    innerDiv.id = `card-${toy.id}`
    innerDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src= ${toy.image} class="toy-avatar" />
      <p> ${toy.likes} Likes </p>
      <button data-id=${toy.id} data-likes=${toy.likes} class="like-btn" id="like-btn-${toy.id}"> Like <3</button>
    `
    outerDiv.append(innerDiv)
    // addLike(toy.id, toy.likes)
  })
}




const newToyForm = document.querySelector(".add-toy-form")

newToyForm.addEventListener("submit", function(event){
  event.preventDefault();
  // debugger;
  const toyName = newToyForm.name.value
  const toyImage = newToyForm.image.value
  postToy(toyName, toyImage)
})

function postToy(toyName, toyImage){
  let toyInfo = {
    name: toyName,
    image: toyImage,
    likes: 0
  }
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyInfo)
  }
  fetch("http://localhost:3000/toys", config)
    .then(rsp => rsp.json())
    .then(data => displayToys([data]))
}

document.querySelector("#toy-collection").addEventListener( 'click', () => {
  if(event.target.className === "like-btn") {
    likeToy(event.target.dataset.id, event.target.dataset.likes)
  }
})
//
//
// .forEach(function(likeButton){
//   likeButton.addEventListener("click", function(event){
//     likeToy(event)
//   })
// })


function likeToy(id, toyLikes){
  // debugger;
  let toyInfo = {
    likes: parseInt(toyLikes, 10) + 1
  }

  let config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyInfo)
  }

  fetch(`http://localhost:3000/toys/${id}`, config)
    .then(rsp => rsp.json())
    .then(data => updateLike(data))
  // console.log(event.target.value);
}

function updateLike(data){
  let pTag = document.querySelector(`#card-${data.id}`).querySelector("p")
  document.querySelector(`#like-btn-${data.id}`).dataset.likes = data.likes
  pTag.innerText = `${data.likes} likes`
}
