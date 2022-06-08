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
const library =[];
let idCount = 0;
restore();
saveLocal();


add.addEventListener('click',()=>{
  if (formValidation() == true ){
  let book = new Book;
  readBook(book);
  addBook(book);
  saveLocal();
  }
})


function readBook(book){
  book.title = titleInput.value;
  book.author = authorInput.value;
  book.pages = pagesInput.value;
  book.isRead = readInput.checked;

}
function addBook(book) {
  let card = document.createElement('div');
  card.id = `${idCount}`
  //console.log(card.id)
  idCount++
  let content = document.createElement('div');
  let remove =  document.createElement('button');
  content.classList.add("card-content");
  
  remove.classList.add("remove");
  remove.innerHTML = "&times;"
  remove.addEventListener('click',selfRemove)
  content.appendChild(remove);
  
  card.classList.add("card");
  for (const item in book) {
    let x = document.createElement('div');
    x.textContent = book[item];
    if(item!='isRead')content.appendChild(x);
  }
  content.appendChild(createReadSlider(book));
  card.appendChild(content);
  grid.appendChild(card);
  library.push(book);
}

function createReadSlider(book){
  let container = document.createElement('div');
  let label = document.createElement('label');
  let read = document.createElement('div');
  let input = document.createElement('input');
  let span = document.createElement('span');

  if(book.isRead == true) {
    read.textContent = "Read";
    input.checked = true
  }
  else read.textContent = "Not Read";

  container.appendChild(read);
  label.classList.add("switch");
  input.id = "isRead";
  input.type = "checkbox";
  input.addEventListener('click', e =>{
    let self = e.target
    let x = self.parentElement;
    let y = x.previousElementSibling;
    if(self.checked == true) {
      y.textContent = "Read";
      book.isRead = true;
    }
    else {
      y.textContent = "Not Read";
      book.isRead = false;
    }
    saveLocal();
  })
  label.appendChild(input);
  span.classList.add("slider", "round");
  label.appendChild(span);
  container.appendChild(label);

  return container;
}

function formValidation(){
  if(titleInput.value == "") return false;
  if(authorInput.value == "") return false;
  if(pagesInput.value == "") return false;
  return true
}
function restore() {
var retrievedObject = localStorage.getItem(`library`);
retrievedObject = JSON.parse(retrievedObject);
for(item in retrievedObject){ 
    addBook(retrievedObject[item]);    
}
}

function selfRemove(){
  let x = (this.parentElement).parentElement
  console.log(x.id);
  library.splice(x.id, 1);
  x.remove();
  saveLocal();
  
}
 function saveLocal() {
  localStorage.setItem(`library`, JSON.stringify(library));
}


