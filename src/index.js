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
    console.log(div)
    div.innerHTML=`<h2>${toy.name}</h2> <img src="${toy.image}" class="toy-avatar"> <p>"${toy.likes} Likes"</p> <button class="like-btn">Like <3</button>`
    toyCollection.append(div)
  })
}


// Each card should have the following child elements:
//
//   * `h2` tag with the toy's name
//   * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
//   * `p` tag with how many likes that toy has
//   * `button` tag with an class "like-btn"



// OR HERE!

document.addEventListener("DOMContentLoaded", function(){
  const promise = fetch("http://localhost:3000/toys")
  // console.log(promise)
  promise.then(response => response.json())
          .then(toyObject => slapToysOnDOM(toyObject))
})

// toy-collection div-name
