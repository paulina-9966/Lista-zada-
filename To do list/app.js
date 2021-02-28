// ****** select items **********

const form = document.querySelector('.list-form');
const alertDanger = document.querySelector('.alert-danger');
const alertSuccess = document.querySelector('.alert-success');
const input = document.getElementById("list-input");
const submitBtn  = document.querySelector('.btn-secondary');
const clearBtn = document.querySelector('.btn-danger');
const container = document.querySelector('.list-container');
const list = document.querySelector('.list');


// edit option
let editElement;
let editFlag = false;
let editID = '';
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click",clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********
// add item
function addItem(e) {
e.preventDefault();
const value = input.value;
const id = new Date().getTime()
.toString();

if (value !== "" && !editFlag) {
  const element = document.createElement("article");
  
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
  <li class="list-group-item">${value}</li>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

    // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector('.edit-btn');
  editBtn.addEventListener("click", editItem);
    // append child
    list.appendChild(element); //dodaje węzeł do listy
    // display alert
    showSuccess("Dodano nowe zadanie");
    // show container
  container.classList.add('show-container');
    // set local storage
   addToLocalStorage(id, value);
    // set back to default
   setBackToDefault();
   }  else if (value !== "" && editFlag){
     editElement.innerHTML = value;
     //alert success
    showSuccess("Edytowano zadanie");
     // edit  local storage
     editLocalStorage(editID, value);
     setBackToDefault();
   } else {
     //alert danger
     showDanger("Niepowodzenie");
   }
}   


// display alert
function showDanger(message) {
  alertDanger.textContent = message;
alertDanger.classList.add("show-danger");
setTimeout (function(){
alertDanger.classList.remove("show-danger")
}, 2000)
}
function showSuccess(message) {
  alertSuccess.textContent = message;
alertSuccess.classList.add("show-success");
setTimeout (function(){
  alertSuccess.classList.remove("show-success")
  }, 2000)
}
  // remove alert
  
// clear items
function clearItems() {
 const items = document.querySelectorAll(".list-item");
 if (items.length > 0 ){
   items.forEach(function (item) {
     list.removeChild(item);
   });
 }
 container.classList.remove("show-container");
//alert danger
showDanger("Usunięto wszystkie zadania");
setBackToDefault();
localStorage.removeItem("list");
}
// delete item
function deleteItem(e){
  const element = e.currentTarget.parentElement
  .parentElement;
  const id = element.dataset.id;

  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  showDanger("Usunięto zadanie");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit item
function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
// set edit item
 editElement = e.currentTarget.parentElement
 .previousElementSibling;
  // set form value
  input.value = editElement.innerHTML;
  editFlag=true;
  editID = element.dataset.id;
  //
 submitBtn.textContent = "Edytuj";
 }
// set backt to defaults
function setBackToDefault() {
  input.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Dodaj";
}
// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value){
  const listInLocalSt = {id, value};
  let items = getLocalStorage();
  items.push(listInLocalSt);  //dodanie local st pushem
  localStorage.setItem("list", JSON.stringify(items)); 
}

function getLocalStorage() {
  return localStorage.getItem("list") ?
  JSON.parse(localStorage.getItem("list")) : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value){
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0 ) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function createListItem(id, value){
  const element = document.createElement("ul");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("list-group");
    element.innerHTML = `
  <li class="list-group-item">${value}</li>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
           // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector('.edit-btn');
  editBtn.addEventListener("click", editItem);
    // append child
    list.appendChild(element); //dodaje węzeł do listy
}
 
  