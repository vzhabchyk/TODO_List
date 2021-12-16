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
    })
    const toDoListItems = document.getElementsByClassName('todo-list-items')[0];
    const toDoListItem = document.createElement('li');
    toDoListItem.classList.add('todo-list-items__item');
    toDoListItem.innerHTML = `
      ${newToDo} <span>${newToDoPriority}</span><span>${'Open'}</span>
    `;
    toDoListItems.appendChild(toDoListItem);
  }
})

