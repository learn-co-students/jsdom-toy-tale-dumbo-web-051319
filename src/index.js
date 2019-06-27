const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = document.querySelector('.add-toy-form')
let toyCollection = document.querySelector("#toy-collection")
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
form.addEventListener("submit", postNewToy)

function postNewToy(event){
  event.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value
    })
  })
  .then(response => response.json())
  .then(displayNewToy)

}



document.addEventListener("DOMContentLoaded", function(){

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    // createLi(data)
    data.forEach(eli => {
      // element.classList.add('card')
      toyCollection.innerHTML += `
          <div class="card">
            <h2>${eli.name}</h2>
            <img src="${eli.image}" class="toy-avatar" />
            <p>${eli.likes} </p>
            <button class="like-btn">Like <3</button>
          </div>`
    }
    )
  })
})



function displayNewToy(toy) {
  // let div = document.createElement('div')
  // let img = document.createElement('img')
  // let h2 = document.createElement('h2')
  // let p = document.createElement('p')
  // let button = document.createElement('button')
  //
  // div.className = 'card'
  // img.className = "toy-avatar"
  // img.src = `${toy.image}`
  // p.innerText = `${toy.likes}`
  // button.className = "like-btn"
  // button.innerText = "Like <3"
  //
  // div.append(h2)
  // div.append(img)
  // div.append(p)
  // div.append(button)
  // toyCollection.append(div)

  toyCollection.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
  form.reset()
}

// div()
