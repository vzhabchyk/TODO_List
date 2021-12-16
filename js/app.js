'use strict';

const toDoList = [];
const toDoForm = document.forms[0];


function editToDo() {
  
}

document.getElementsByClassName('todo-list-form__btn-add')[0].addEventListener('click', function () {
  const newToDo = toDoForm.todo.value;
  if (newToDo) {
    const newToDoPriority = toDoForm.priority.value;
    const newToDoStatus = toDoForm.status.value;
    const toDoObj = {
      text: newToDo,
      priority: newToDoPriority,
      status: newToDoStatus,
    }

    const toDoListItems = document.getElementsByClassName('todo-list-items')[0];
    const toDoListItem = document.createElement('li');
    toDoListItem.classList.add('todo-list-items__item');

    toDoListItem.innerHTML = `
      ${newToDo} <span>${newToDoPriority}</span><span>${newToDoStatus}</span>
      <button data-attr="edit">Edit</button>
      <button data-attr="remove">Remove</button>
    `;

    toDoForm.todo.value = '';

    toDoListItem.addEventListener('click', function(event){
        if (event.target.tagName !== 'BUTTON') {
          return;
        } 
        
        const dataAttr = event.target.getAttribute('data-attr');
        if (dataAttr === 'edit') {
          
        } else {

        }
    });
    toDoListItems.appendChild(toDoListItem);
  }
});

function fillSelect(dataArray, className) {
  const select = document.getElementsByClassName(className)[0];
  for (let i = 0; i < dataArray.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', dataArray[i]);
    option.innerHTML = dataArray[i];
    select.appendChild(option);
  }
}

function getData() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      fillSelect(data.priorities, 'todo-list-form__priority');
      fillSelect(data.statuses, 'todo-list-form__status');
    })
}
getData();