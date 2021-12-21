'use strict';

const toDoForm = document.forms[0];
const btnAdd = document.getElementsByClassName('todo-list-form__btn-add')[0];
let defaultPriority;
let defaultStatus;


function removeToDo(index, toDoListItem) {
  const toDoListData = getToDos();
  toDoListData.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(toDoListData));
  toDoListItem.remove();
}

function showToDoList() {
  const toDoListItems = document.getElementsByClassName('todo-list-items')[0];
  toDoListItems.innerHTML = '';
  const toDoListData = getToDos();
  for (let i = 0; i < toDoListData.length; i++) {
    const toDoListItem = document.createElement('li');
    toDoListItem.classList.add('todo-list-items__item');
    toDoListItem.innerHTML = `
      <span>${toDoListData[i].text}</span> ${toDoListData[i].priority} &nbsp;${toDoListData[i].status}
      <button data-attr="edit" class="btn-todo-action">Edit</button>
      <button data-attr="remove" class="btn-todo-action">Remove</button>
    `;

    toDoListItem.onclick = function(event){
        if (event.target.tagName !== 'BUTTON') {
          return;
        } 
        
        const dataAttr = event.target.getAttribute('data-attr');
        if (dataAttr === 'edit') {
          editToDo(toDoListData[i], i);
        } else {
          removeToDo(i, toDoListItem);
        }
    };
    toDoListItems.appendChild(toDoListItem);
  }
} 

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

    clearForm();

    editBtnsContainer.classList.add('hidden');
    btnAdd.classList.remove('hidden');
  }

  editBtnsContainer.children[1].onclick = function() {
    clearForm();
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
    clearForm();
    showToDoList();
  }
});

function clearForm() {
  toDoForm.todo.value = '';
  toDoForm.priority.value = defaultPriority;
  toDoForm.status.value = defaultStatus;
}

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
      defaultPriority = data.priorities[0];
      defaultStatus = data.statuses[0];
      const todos = getToDos();
      for (let i = 0; i < todos.length; i++) {
        if (!data.statuses.includes(todos[i].status)) {
          todos[i].status = 'Not Defined';
        }
        if (!data.priorities.includes(todos[i].priority)) {
          todos[i].priority = 'Not Defined';
        }
      }
      localStorage.setItem('todos', JSON.stringify(todos));
      showToDoList();
    })
}
getData();