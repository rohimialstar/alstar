const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Ambil data tugas dari localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Simpan data tugas ke localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render daftar tugas
function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    };
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Tambah tugas baru
taskForm.onsubmit = function(e) {
  e.preventDefault();
  const tasks = getTasks();
  tasks.push(taskInput.value);
  saveTasks(tasks);
  taskInput.value = '';
  renderTasks();
};

// Inisialisasi
renderTasks();