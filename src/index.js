const addBtn = document.querySelector('#new-toy-btn')
const toyBlock = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

let addToy = false




// YOUR CODE HERE
function slapCardOnTheDOM(toyCollection ,toyData){
    const toyCard = document.createElement('div')
    const h2Test = document.createElement('h2')
    const p = document.createElement('p')
    const image = `<img src="${toyData.image}" class="toy-avatar" />`
    const button = document.createElement('button')
    // toyCard.setAttribute('class', 'card') same as line 18
    toyCard.className="card"
    button.className="like-btn"
    toyCard.append(h2Test)
    h2Test.innerHTML = (toyData.name)
    p.innerHTML = `${toyData.likes} Likes`
    button.innerText = ("Like <3")
    toyCard.innerHTML += image
    toyCard.append(p)
    toyCard.append(button)
    toyCollection.append(toyCard)
}


function slapCardsOnTheDOM(toyData){
  const toyCollection = document.querySelector('#toy-collection')
  toyData.forEach(function(toy){
    slapCardOnTheDOM(toyCollection, toy)
  })
}




addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyBlock.style.display = 'block'
    // submit listener here
    toyForm.addEventListener("submit", function(event){
      event.preventDefault();
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": toyForm.name.value,
          "image": toyForm.image.value,
          "likes": 0,
        })
      })
        .then(res => res.json())
        .then(toyData => slapCardOnTheDOM(toyCollection, toyData))
    })


  } else {
    toyBlock.style.display = 'none'
  }
})


// OR HERE!

document.addEventListener("DOMContentLoaded", function(){
  allToys()
})

function allToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyData => slapCardsOnTheDOM(toyData))
}
