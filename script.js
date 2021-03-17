const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  // Create todoText to take the input
  let todoText = input.value;
  // Take value from unput
  if (todo) {
    todoText = todo.text;
  }

  //Create funtion to add Li element to DOM
  if (todoText) {
    //create element
    const todoEl = document.createElement('li');
    // if todo = true and it completed
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;
    // click to completed to not completed
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });
    // right click to remove the todos
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });
    //Add list to un-order list in DOM
    todosUL.appendChild(todoEl);
    input.value = '';

    //function will update local storage
    updateLS();
  }
}

function updateLS() {
  todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
