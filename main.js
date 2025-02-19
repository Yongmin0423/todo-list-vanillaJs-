const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskBoard = document.getElementById("task-board");
let taskList = [];

const addTask = (event) => {
  event.preventDefault();
  let task = {
    id: randomIdGenerator(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log("taskList", taskList);
  taskInput.value = "";
  render();
};

const toggleComplete = (id) => {
  for (let v of taskList) {
    if (v.id == id) {
      v.isComplete = !v.isComplete;
      break;
    }
  }
  render();
};

const deleteTask = (id) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
};

const render = () => {
  let resultHTML = "";

  taskList.map((v) => {
    if (v.isComplete == true) {
      resultHTML += `<div class="task task-done-container">
      <div class="task-done">${v.taskContent}</div>
      <div>
      <button onClick="toggleComplete('${v.id}')"><i class="fa-solid fa-rotate-left"></i></button>
      <button onClick="deleteTask('${v.id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${v.taskContent}</div>
      <div>
      <button onClick="toggleComplete('${v.id}')"><i class="fa-solid fa-check"></i></button>
      <button onClick="deleteTask('${v.id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      </div>`;
    }
  });

  taskBoard.innerHTML = resultHTML;
};

const randomIdGenerator = () => Math.random().toString(36).substring(2, 16);
addBtn.addEventListener("click", addTask);
