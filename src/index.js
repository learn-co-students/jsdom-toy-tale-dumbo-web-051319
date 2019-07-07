const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector('#toy-collection');
let addToy = false;

fetchToys();

function fetchToys() {
  fetch('http://localhost:3000/toys').then(resp => resp.json()).then(addToysToDOM);
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
    const addToyForm = document.querySelector("form");
    addToyForm.addEventListener('submit', addToyToDOM);
  } else {
    toyForm.style.display = 'none';
  }
});

toyCollection.addEventListener('click', increaseLikes);

function addToysToDOM(toys) {
  toyCollection.innerHTML = '';
  toys.forEach(toy => {
    toyCollection.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p id="likes-${toy.id}">${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `;
  });
}

function addToyToDOM(e) {
  e.preventDefault();
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: e.target.querySelector("input[name='name']").value,
      image: e.target.querySelector("input[name='image']").value,
      likes: 0
    })
  }).then(resp => resp.json()).then(fetchToys);
  document.querySelector("form").reset();
}

function increaseLikes(e) {
  if(e.target.className == 'like-btn') {
    let likes = e.target.parentNode.getElementsByTagName('p')[0];
    const id = parseInt(likes.id.match(/\d/g).join(''));
    const increasedLikes = +likes.innerText.match(/\d/g).join('') + 1;
    likes.innerText = increasedLikes + ' Likes';
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({likes: increasedLikes})
    }).then(resp => resp.json());
  }
}
