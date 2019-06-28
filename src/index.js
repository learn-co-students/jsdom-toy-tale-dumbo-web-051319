const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.querySelector("#toy-collection")
let addToy = false

toyDiv.addEventListener('click', handleClick)

function handleClick(e) {
  if (e.target.className ===  'like-btn'){
    // console.log(e);
    updateLike(e)
  }
  // else if (e.target.className ===  'delete-btn'){
  //   deleteCard(e)
  // }
}

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

function addToys(toyItems){
  const toyDiv = document.querySelector("#toy-collection")
  toyItems.forEach(function(toyItem){
    const div = document.createElement("div");
    div.className = "card"
    div.innerHTML = `<h2>${toyItem.name}</h2>
    <img src=${toyItem.image} class="toy-avatar"/>
    <p class='likes-count'>${toyItem.likes} </p>
    <button class="like-btn">Like</button>`

    const likeButton = div.querySelector(".like-btn")

    likeButton.dataset.id = toyItem.id
    // likeButton.addEventListener("click", updateLike)
    toyDiv.append(div)
    // make function that updates the amount of likes
    // put them on the DOM
  })
}

function updateLike(event){
  const id = event.target.dataset.id
  let likes = parseInt(event.target.parentElement.querySelector('.likes-count').innerText)
  likes += 1
  // let newLikes = (likes + 1)

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "likes": likes
    })
  }).then(res => res.json())
  .then(res => event.target.previousElementSibling.innerText = res.likes)
}

function addNewToy(newToy){


  const div = document.createElement("div");
  div.className = "card"
  div.innerHTML = `<h2>${newToy.name}</h2>
  <img src=${newToy.image} class="toy-avatar" />
  <p>${newToy.likes} </p>
  <button class="like-btn">Like</button>`
  toyDiv.append(div)
}
// OR HERE!
document.addEventListener('DOMContentLoaded', function(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(addToys)
})

const form = document.querySelector(".add-toy-form")
form.addEventListener('submit',function(event){
  event.preventDefault();
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": form.name.value,
      "image": form.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(addNewToy)
})
