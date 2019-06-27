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
  .then(response => response.json())
  .then(x => {
    createLi(x)
    x.forEach(img => {
      let element = document.createElement("div")
      // element.classList.add('card')
      element.innerHTML = `
          <div class="card">
            <h2>${img.name}</h2>
            <img src="${img.image}" class="toy-avatar" />
            <p>${img.likes} </p>
            <button class="like-btn">Like <3</button>
          </div>
      `
      // element.name = <h2 class="toy-header"> ${img.name} </h2>
      // element.src = img.image
      // element.likes = img.likes

      document.querySelector("#toy-collection").append(element)

    }

    )
  })
})



function createLi(toyArray) {
  let div = document.createElement('div')
  div.setAttribute('class', 'card')
  div.setAttribute('class', 'toy-avatar"')
  toyCollection.appendChild(div)
  console.log(toyArray)
  toyArray.forEach(function(div){
    const div1 = document.createElement("div")
    div.id = "toyArray" + toyArray.id
    // /div.className = "card"

    div.innerText = toyArray.name


    div.innerText = toyArray.likes

    // work on reffering to dom - show on pg
  })
}
``
// div()
let toyCollection = document.querySelector("#toy-collection")
