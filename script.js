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
  return state[stateKeys[key]];
}

function setState(key, value) {
  state[stateKeys[key]] = value;
}

// Application Logic
document.addEventListener("DOMContentLoaded", () => {
  displayAllTasks();
  // addTaskInit();
  // editTaskInit();
  // deleteTaskInit();
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

  taskListEl.appendChild(fragmentEl);
}

function createTaskElList(taskList) {
  return taskList.map((task) => createTaskEl(task));
}

function createTaskEl(task) {
  const taskEl = document.createElement("li");
  taskEl.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "gap-5"
  );

  const titleEl = document.createElement("p");
  titleEl.classList.add("lead");
  titleEl.textContent = task.title;
  taskEl.appendChild(titleEl);

  const deletBtnEl = document.createElement("button");
  deletBtnEl.classList.add("btn", "btn-danger", "align-self-center");
  deletBtnEl.textContent = "X";
  taskEl.appendChild(deletBtnEl);

  return taskEl;
}
