// Globals
// 1. Constants
const BASE_URL = "http://localhost:3000";
const END_POINT = "tasks";
const URL = `${BASE_URL}/${END_POINT}`;
// 2. State
const state = {
  taskList: [],
};

// 3. State keys
const stateKeys = Object.freeze({
  taskList: "taskList",
});

// 4. State functions
function getState(key) {
  return state[key];
}

function setState(key, value) {
  state[key] = value;
}

// Application Logic
document.addEventListener("DOMContentLoaded", () => {
  displayAllTasks();
  addTaskInit();
  deleteTaskInit();
  // editTaskInit();
});

// Utility functions
async function displayAllTasks() {
  await getAllTasks();
  renderAllTasks(state[stateKeys.taskList]);
}

async function getAllTasks() {
  const allTasks = await fetchAllTasks();
  setState(stateKeys.taskList, allTasks);
}

async function fetchAllTasks() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Network request was not ok ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch error: ${error}`);
  }
}

function renderAllTasks(taskList) {
  const taskElList = createTaskElList(taskList);

  const fragmentEl = document.createDocumentFragment();
  for (task of taskElList) {
    fragmentEl.appendChild(task);
  }

  const taskListEl = document.querySelector("ul#task-list");

  taskListEl.innerHTML = null;
  taskListEl.appendChild(fragmentEl);
}

function createTaskElList(taskList) {
  return taskList.map((task) => createTaskEl(task));
}

function createTaskEl(task) {
  const taskEl = document.createElement("li");
  taskEl.style.minWidth = "24rem";
  taskEl.dataset.id = task.id;
  taskEl.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start"
  );

  const titleEl = document.createElement("p");
  titleEl.classList.add("lead", "flex-grow-1");
  titleEl.textContent = task.title;
  if (task.completed) {
    titleEl.classList.add(
      "text-decoration-line-through",
      "fst-italic",
      "text-secondary"
    );
  }
  taskEl.appendChild(titleEl);

  const deletBtnEl = document.createElement("button");
  deletBtnEl.classList.add("btn", "btn-danger");
  deletBtnEl.textContent = "X";
  taskEl.appendChild(deletBtnEl);

  return taskEl;
}

function addTaskInit() {
  const addTaskFormEl = document.querySelector("#add-task-form");
  const addTaskBtnEl = document.querySelector("#add-task-btn");
  const addTaskFormSubmitBtnEl = addTaskFormEl.querySelector(
    "button[type='submit']"
  );

  addTaskBtnEl.addEventListener("click", () => {
    addTaskFormSubmitBtnEl.click();
  });

  addTaskFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(addTaskFormEl);
    const validatedFormData = validateFormData(formData);

    const newTask = await createTaskOnServer(validatedFormData);
    createTaskOnLocalState(newTask);
    addTaskFormEl.reset();
    // hideAddTaskModal();
    renderAllTasks(state.taskList);
  });
}

function validateFormData(formData) {
  if (!formData.has("completed")) {
    formData.append("completed", false);
  } else {
    formData.set("completed", true);
  }
  const object = Object.fromEntries(formData.entries());
  object.completed = object.completed === "false" ? false : true;
  return object;
}

async function createTaskOnServer(task) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Network request was not ok ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch error: ${error}`);
  }
}

function createTaskOnLocalState(task) {
  state[stateKeys.taskList].push(task);
  renderAllTasks(state.taskList);
}

function deleteTaskInit() {
  const taskListEl = document.querySelector("ul#task-list");

  taskListEl.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
      const taskEl = event.target.parentElement;
      const taskId = taskEl.dataset.id;
      const numberTaskId = Number.parseInt(taskId, 10);
      deleteTaskFromServer(numberTaskId);
      deleteFromLocalState(numberTaskId);
      renderAllTasks(state.taskList);
    }
  });
}

async function deleteTaskFromServer(taskId) {
  try {
    const response = await fetch(`${URL}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Network request was not ok ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch error: ${error}`);
  }
}

function deleteFromLocalState(id) {
  const newState = state.taskList.filter((task) => task.id !== id);
  setState(stateKeys.taskList, newState);
}
