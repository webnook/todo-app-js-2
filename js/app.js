const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todoBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const displayTodos = () => {
  todoBody.innerHTML = "";
  if (!todos.length) {
    todoBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
    return;
  }
  todos.forEach((todo) => {
    todoBody.innerHTML += `<tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No Date"}</td>
            <td>${todo.completed ? "Completed" : "Pending"}</td>
            <td>
              <button onclick="editHandler('${todo.id}')">Edit</button>
              <button onclick="toggleHandler('${todo.id}')">
              ${todo.completed ? "Undo" : "Do"}
              </button>
              <button onclick="deleteHandler('${todo.id}')">Delete</button>
            </td>
          </tr>`;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: new Date().getTime().toString(),
    completed: false,
    task,
    date,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("Please enter a valid todo", "error");
  }
};
const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

const deleteHandler = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo is Deleted Successfully", "success");
};

const toggleHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo Status changed successfully", "success");
};

const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (e) => {
  const id = e.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  addButton.style.display = "inline-block";
  editButton.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo edited successfully", "success");
};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
