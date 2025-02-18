const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskBoard = document.getElementById("task-board");
let taskList = [];

const addTask = (event) => {
  event.preventDefault();
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  render();
};

const render = () => {
  let resultHTML = "";
  taskList.map((v) => {
    resultHTML += `<div class="task">
            <div>${v}</div>
            <div>
              <button>Check</button>
              <button>Delete</button>
            </div>
          </div>`;
  });

  taskBoard.innerHTML = resultHTML;
};

addBtn.addEventListener("click", addTask);
