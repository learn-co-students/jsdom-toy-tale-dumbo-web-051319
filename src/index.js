const addBtn = document.querySelector('#new-cat-btn')
const catForm = document.querySelector('.container')
const catCollection = document.querySelector('#cat-collection')
const nameInput = catForm.querySelector('#js-input-name')
const imgInput = catForm.querySelector('#js-input-url')
let addCat = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addCat = !addCat
  if (addCat) {
    catForm.style.display = 'block'
    // submit listener here
  } else {
    catForm.style.display = 'none'
  }
})
//**********************Create Cat********************************
catForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if(event.target.className === "add-cat-form"){
    // debugger
    fetch(`http://localhost:3000/toys/`,
      {method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(
          {name: `${nameInput.value}`,
          image: `${imgInput.value}`,
          likes: `0`
          })
      })
      .then(resp => resp.json())
      .then(newCat => {
        catCollection.innerHTML +=
        `
    <div class="card" data-catid=${newCat.id}>
    <h2>${newCat.name}</h2>
    <img src="${newCat.image}" class="cat-avatar"/>
    <p >${newCat.likes} like</p>
    <button class="like-button" data-likes= "${newCat.likes}"> Likes <3 </button>
    </div>
    <button class="delete-button">Delete This</button>
    `
      })
  }

}
)

// cat-collection div-name
// **************** Cat Index from cat API **********************
document.addEventListener("DOMContentLoaded", function() {
  // debugger
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(cats => {
      cats.forEach(cat => {
        // debugger
        const catName = cat.name
        const catImg = cat.image
        const catLikes = cat.likes
        // debugger
        catCollection.innerHTML +=
          `
      <div class="card" data-catid=${cat.id}>
      <h2>${catName}</h2>
      <img src="${catImg}" class="cat-avatar"/>
      <p >${catLikes} like</p>
      <button class="like-button" data-likes= "${catLikes}"> Likes <3 </button>
      <button class="delete-button"> Delete This </button>
      </div>
      `
      })
    })
})

// ******************** cat likes ***********************************
catCollection.addEventListener("click", function() {
  if (event.target.className === "like-button") {
    const catId = event.target.parentElement.dataset.catid
    // debugger
    let likes = parseInt(event.target.dataset.likes)
    let afterLiked = likes + 1

    const fetchCat = (event, catId, afterLiked) => {
      fetch(`http://localhost:3000/toys/${catId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            "likes": afterLiked
          })
        })
        .then(response => response.json())
        .then(littleMeow => {
          currentCard = event.target.parentElement
          currentCard.innerHTML = `
    <h2>${littleMeow.name}</h2>
    <img src="${littleMeow.image}" class="cat-avatar"/>
    <p >${afterLiked} like</p>
    <button class="like-button" data-likes= "${afterLiked}"> Likes <3 </button>
    `
        })
    }
    fetchCat(event, catId, afterLiked)
  }
})
// ********************************Delete Cat*******************************
catCollection.addEventListener('click', function(){
  if (event.target.className === 'delete-button'){
    const catId = event.target.parentElement.dataset.catid
    fetch(`http://localhost:3000/toys/${catId}`, {
      method: "DELETE"
    })
    // debugger
      event.target.parentElement.remove()

  }
})




// ***************
// likes = littleMeow.likes
// debugger
//   catCollection.innerHTML =
//     `
// <div class="card" data-catid=${cat.id}>
// <h2>${catName}</h2>
// <img src="${catImg}" class="cat-avatar"/>
// <p >${catLikes} like</p>
// <button class="like-button" data-likes= "${catLikes}"> Likes <3 </button>
// </div>
// `
