let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let currentUser = null;

// Show Forms
function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
}

function showRegister() {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
}

// Register
function register() {
  let u = regUser.value;
  let p = regPass.value;

  if (!u || !p) return alert("Fill all fields");

  users.push({ username: u, password: p });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered! Now Login");
  showLogin();
}

// Login
function login() {
  let u = loginUser.value;
  let p = loginPass.value;

  let found = users.find(x => x.username === u && x.password === p);

  if (found) {
    currentUser = u;
    loginForm.classList.add("hidden");
    dashboard.classList.remove("hidden");
    welcomeUser.innerText = "Welcome " + u;
    loadTasks();
  } else {
    alert("Wrong username or password");
  }
}

// Logout
function logout() {
  dashboard.classList.add("hidden");
  loginForm.classList.remove("hidden");
}

// Task Add
function addTask() {
  let t = taskInput.value;
  if (!t) return;

  if (!tasks[currentUser]) tasks[currentUser] = [];
  tasks[currentUser].push(t);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";

  loadTasks();
}

// Load Tasks
function loadTasks() {
  taskList.innerHTML = "";

  let userTasks = tasks[currentUser] || [];

  userTasks.forEach((t, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${t} <button onclick="deleteTask(${i})">X</button>`;
    taskList.appendChild(li);
  });
}

// Delete Task
function deleteTask(i) {
  tasks[currentUser].splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
