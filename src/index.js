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
//when the page loads, show the toys:
function slapToysOnDOM(toys){
  const toyCollection = document.querySelector("#toy-collection")
  toys.forEach(function(toy){
    //create divs for each toy object
    const div = document.createElement("div")
    div.className = "card"
    // console.log(div)
    div.innerHTML=`<h2>${toy.name}</h2> <img src="${toy.image}" class="toy-avatar"> <p>"${toy.likes} Likes"</p> <button class="like-btn">Like <3</button>`
    toyCollection.append(div)
  })
}

const form = document.querySelector("form")
console.log(form)

form.addEventListener("submit", function(event){
  // event.preventDefault();
  // if event.target === "submit"
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": form.name.value,
      "image": form.image.value
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))

  // console.log(response.json())


})



// OR HERE!

document.addEventListener("DOMContentLoaded", function(){
  const promise = fetch("http://localhost:3000/toys")
  // console.log(promise)
  promise.then(response => response.json())
          .then(toyObject => slapToysOnDOM(toyObject))
})

// toy-collection div-name
