//Modal code...//
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

//..............//
function Book() {;
  this.title = "Unknown";
  this.author = "Unknown";
  this.pages = 0;
  this.isRead = false;
}

//Add button function...//
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector('#read');
const grid = document.querySelector(".main-bottom");
const add = document.querySelector('.add');
add.addEventListener('click',()=>{
  console.log(readInput.checked);
  let book = new Book;
  addBook(book)
})


function addBook(book){
  let content = document.createElement('div');
  book.title = titleInput.value
  book.author = authorInput.value;
  book.pages = pagesInput.value;
  book.isRead = readInput.checked;

  for (const item in book) {
    let x = document.createElement('div');
    x.textContent = book[item];
    content.appendChild(x);
  }
  let card = document.createElement('div');
  card.classList.add("card");
  card.appendChild(content);
  grid.appendChild(card);
}