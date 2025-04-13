// Yohanes Christian Panjaitan
// 122140217
// Class mirip seperti interface di TypeScript, digunakan untuk mendefinisikan struktur data
// dan fungsionalitas yang akan digunakan dalam aplikasi.

// Class Definitions
class Schedule {
    constructor(title) {
      this.id = Date.now();
      this.title = title;
    }
  }
  class Task {
    constructor(title) {
      this.id = Date.now();
      this.title = title;
    }
  }

  // Note Class
  class Note {
    constructor(content) {
      this.id = Date.now();
      this.content = content;
    }
  }
  
  // Element references
  const scheduleForm = document.getElementById("schedule-form");
  const scheduleInput = document.getElementById("schedule-input");
  const scheduleList = document.getElementById("schedule-list");
  
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  
  const noteForm = document.getElementById("note-form");
  const noteInput = document.getElementById("note-input");
  const noteList = document.getElementById("note-list");
  
  // Load data from localStorage
  let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  
  // Save data
  const saveData = () => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  
  // Render functions (arrow functions & template literals)
  const renderList = (list, container, type) => {
    container.innerHTML = "";
    list.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `${item.title || item.content} 
        <button onclick="removeItem('${type}', ${item.id})">X</button>`;
      container.appendChild(li);
    });
  };
  
  const removeItem = (type, id) => {
    if (type === "schedule") schedules = schedules.filter(item => item.id !== id);
    if (type === "task") tasks = tasks.filter(item => item.id !== id);
    if (type === "note") notes = notes.filter(item => item.id !== id);
    saveData();
    renderAll();
  };
  
  const renderAll = () => {
    renderList(schedules, scheduleList, "schedule");
    renderList(tasks, taskList, "task");
    renderList(notes, noteList, "note");
  };
  
  // Event listeners
  scheduleForm.addEventListener("submit", e => {
    e.preventDefault();
    schedules.push(new Schedule(scheduleInput.value));
    scheduleInput.value = "";
    saveData();
    renderAll();
  });
  
  taskForm.addEventListener("submit", e => {
    e.preventDefault();
    tasks.push(new Task(taskInput.value));
    taskInput.value = "";
    saveData();
    renderAll();
  });
  
  noteForm.addEventListener("submit", e => {
    e.preventDefault();
    notes.push(new Note(noteInput.value));
    noteInput.value = "";
    saveData();
    renderAll();
  });
  
  // Time function with async/await
  const updateTime = async () => {
    const timeDiv = document.getElementById("time");
    const now = new Date();
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulasi async
    timeDiv.textContent = `⏰ Waktu sekarang: ${now.toLocaleTimeString()}`;
  };
  setInterval(updateTime, 1000);
  
  // Init
  renderAll();
  updateTime();
  