const toDoList = [];
const toDoForm = document.forms[0];

document.getElementsByClassName('todo-list-form__btn-add')[0].addEventListener('click', function () {
  const newToDo = toDoForm.todo.value;
  if (newToDo) {
    const newToDoPriority = toDoForm.priority.value;
    toDoList.push({
      text: newToDo,
      priority: newToDoPriority,
      status: 'Open'
    });
    const toDoListItems = document.getElementsByClassName('todo-list-items')[0];
    const toDoListItem = document.createElement('li');
    toDoListItem.classList.add('todo-list-items__item');
    toDoListItem.innerHTML = `
      ${newToDo} <span>${newToDoPriority}</span><span>${'Open'}</span>
      <button data-attr="edit">Edit</button>
      <button data-attr="remove">Remove</button>
    `;
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

function fillSelect() {
  const selectPriorities = document.getElementsByClassName('todo-list-form__priority')[0];
  for (let i = 0; i < data.priorities.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', data.priorities[i]);
    option.innerHTML = data.priorities[i];
    selectPriorities.appendChild(option);
  }
}

function getData() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      
    })
}
getData();