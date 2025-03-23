document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => renderTodo(todo.text, todo.completed));
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text === '') {
    alert('Tugas tidak boleh kosong');
    return;
  }

  renderTodo(text, false);
  saveTodo(text, false);

  input.value = '';
}

function renderTodo(text, completed) {
  const list = document.getElementById('todo-list');
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    checklist(text);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Hapus';
  deleteBtn.addEventListener('click', () => {
    deleteTodo(text);
    li.remove();
  });

  li.textContent = text;
  if (completed) {
    li.style.textDecoration = 'line-through';
  }

  li.prepend(checkbox);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

function checklist(text) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = todos.map(todo => {
    if (todo.text === text) {
      todo.completed = !todo.completed;
    }
    return todo;
  });

  save(updatedTodos);
  refresh();
}

function save(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function saveTodo(text, completed) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text, completed });
  save(todos);
}

function deleteTodo(text) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.text !== text);
  save(todos);
}

function refresh() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  loadTodos();
}

function saveToFile() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  if (todos.length === 0) {
    alert('Daftar tugas kosong!');
    return;
  }

  let data = 'Daftar Tugas:\n\n';
  todos.forEach((todo, index) => {
    const status = todo.completed ? '[✔️]' : '[ ]';
    data += `${index + 1}. ${status} ${todo.text}\n`;
  });

  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'todo-list.txt';
  a.click();

  URL.revokeObjectURL(url);
}
