'use strict';

const toDoForm = document.forms[0];
const btnAdd = document.getElementsByClassName('todo-list-form__btn-add')[0];


function showToDoList() {
  const toDoListItems = document.getElementsByClassName('todo-list-items')[0];
  toDoListItems.innerHTML = '';
  const toDoListData = getToDos();
  for (let i = 0; i < toDoListData.length; i++) {
    const toDoListItem = document.createElement('li');
    toDoListItem.classList.add('todo-list-items__item');
    toDoListItem.innerHTML = `
      ${toDoListData[i].text} <span>${toDoListData[i].priority}</span><span>${toDoListData[i].status}</span>
      <button data-attr="edit">Edit</button>
      <button data-attr="remove">Remove</button>
    `;

    toDoListItem.onclick = function(event){
        if (event.target.tagName !== 'BUTTON') {
          return;
        } 
        
        const dataAttr = event.target.getAttribute('data-attr');
        if (dataAttr === 'edit') {
          editToDo(toDoListData[i], i);
        } else {

        }
    };
    toDoListItems.appendChild(toDoListItem);
  }
} 
showToDoList();

function getToDos() {
  const toDos = localStorage.getItem('todos');
  if (toDos) {
    return JSON.parse(toDos);
  } else {
    return [];
  }
}

function editToDo(toDoObj, i) {
  btnAdd.classList.add('hidden');
  const editBtnsContainer = document.getElementsByClassName('todo-list-form__edit-btns')[0];
  editBtnsContainer.classList.remove('hidden');
  toDoForm.todo.value = toDoObj.text;
  toDoForm.priority.value = toDoObj.priority;
  toDoForm.status.value = toDoObj.status;
  editBtnsContainer.children[0].onclick = function() {
    const toDoListData = getToDos();
    toDoListData[i].text = toDoForm.todo.value;
    toDoListData[i].priority = toDoForm.priority.value;
    toDoListData[i].status = toDoForm.status.value;
    localStorage.setItem('todos', JSON.stringify(toDoListData));
    showToDoList();

    toDoForm.todo.value = '';
    
    editBtnsContainer.classList.add('hidden');
    btnAdd.classList.remove('hidden');
  }
}

btnAdd.addEventListener('click', function () {
  const newToDo = toDoForm.todo.value;
  if (newToDo) {
    const newToDoPriority = toDoForm.priority.value;
    const newToDoStatus = toDoForm.status.value;
    const toDoObj = {
      text: newToDo,
      priority: newToDoPriority,
      status: newToDoStatus,
    };
    
    const toDos = getToDos();
    toDos.push(toDoObj);
    localStorage.setItem('todos', JSON.stringify(toDos));
    toDoForm.todo.value = '';
    showToDoList();
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