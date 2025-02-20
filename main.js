const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskBoard = document.getElementById("task-board");
const tabs = document.querySelectorAll(".task-tabs div");
const underLine = document.getElementById("under-line");
const date = document.querySelector(".main-top__date");
const deleteBtn = document.getElementById("delete-btn");
console.log("DDD", deleteBtn);
let taskList = [];
let mode = "all";
let filteredList = [];
let deleteTargetId = null;

// 탭 색상 변경 함수
const changeTabColor = (event) => {
  tabs.forEach((tab) => tab.classList.remove("active"));
  // 클릭된 탭에만 active 클래스 추가
  event.target.classList.add("active");
};

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (e) => {
    filter(e);
    changeTabColor(e);
  }); // 새로 추가한 함수 호출
}

const today = new Date().toDateString();
const parts = today.split(" ");

date.innerHTML = `<div>${parts[0]}</div><div>${parts[1]} ${parts[2]} ${parts[3]}</div>`;

const addTask = (event) => {
  event.preventDefault();
  if (taskInput.value.trim() === "") {
    return alert("할 일을 입력해주세요");
  }
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
  for (let i = 0; i < filteredList.length; i++) {
    if (filteredList[i].id == id) {
      filteredList.splice(i, 1);
      break;
    }
  }
  render();
};

const filter = (event) => {
  mode = event.target.id;
  console.log(mode);
  filteredList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ing") {
    //task.isComplete == false
    for (task of taskList) {
      if (task.isComplete === false) {
        filteredList.push(task);
      }
    }
    render();
  } else if (mode === "done") {
    for (task of taskList) {
      if (task.isComplete === true) {
        filteredList.push(task);
      }
    }
    render();
  }
};

const render = () => {
  let resultHTML = "";
  let list = [];
  console.log("ttt", taskList);

  if (mode === "all") {
    list = taskList;
  } else if (mode === "ing" || mode === "done") {
    list = filteredList;
  }

  list.map((v) => {
    if (v.isComplete == true) {
      resultHTML += `<div class="task task-done-container">
      <div class="task-done">${v.taskContent}</div>
      <div>
      <button onClick="toggleComplete('${v.id}')"><i class="fa-solid fa-rotate-left"></i></button>
      <button type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="openDeleteModal('${v.id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${v.taskContent}</div>
      <div>
      <button onClick="toggleComplete('${v.id}')"><i class="fa-solid fa-check"></i></button>
      <button type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="openDeleteModal('${v.id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      </div>`;
    }
  });

  taskBoard.innerHTML = resultHTML;
};

const randomIdGenerator = () => Math.random().toString(36).substring(2, 16);

const openDeleteModal = (id) => {
  deleteTargetId = id;
};

const colorChange = () => {};

addBtn.addEventListener("click", addTask);
deleteBtn.addEventListener("click", () => {
  if (deleteTargetId) {
    deleteTask(deleteTargetId);
    deleteTargetId = null;
  }
});
