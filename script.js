let myProjects = [];
projectInputAvailable = false;
let getProjectTitle;
let getProjectDescription;
let getProjectDueDate;
const projectsContainer = document.getElementsByClassName("projects");
const projectsList = document.getElementById("projects-list");
const addProjectBtn = document.getElementById("add-project-btn");
const createProjectBtn = document.getElementById("create-new-project");
let newProject;
let availableProjects;
let completeBtn;
let deleteTaskBtn;
let projectDueDateDisplay;

// GET CONSTANTS FROM DOM
const upperPart = document.getElementById("upper-part");
const projectTitleHeading = document.getElementById("project-title-heading");
const taskList = document.getElementById("tasks-list");
let mainProjectContent = document.getElementById("project-info");
let completedProjectText = document.getElementById("completed-project-text");
console.log(completedProjectText.textContent);
projectDueDateDisplay = document.createElement("h3");
upperPart.appendChild(projectDueDateDisplay);

class Task {
  constructor(title) {
    this.title = title;
    this.completed = false;
  }
}
class Project {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.tasks = [];
  }

  addTask(taskTitle) {
    let newTask = new Task(taskTitle);
    this.tasks.push(newTask);
  }
}

let exampleProject = new Project("Example Project", "12-02-2022");
let exampleProject2 = new Project("Example Project 2", "13-02-2022");
exampleProject.addTask("do laundry");
exampleProject.addTask("walk dog");
exampleProject.addTask("cook dinner");
exampleProject2.addTask("do homework");
exampleProject2.addTask("grocery shopping");
myProjects.push(exampleProject);
myProjects.push(exampleProject2);

window.onload = displayProjects();
function displayProjects() {
  projectsList.textContent = "";
  myProjects.forEach(function (project, i) {
    let itemDiv = document.createElement("div");
    let newProjectItem = document.createElement("li");
    let completeProjectBtn = document.createElement("button");
    completeProjectBtn.textContent = "Complete Project";
    completeProjectBtn.classList.add("complete-project-btn");
    newProjectItem.classList.add("project");
    newProjectItem.setAttribute("id", i);
    newProjectItem.textContent = project.title;
    projectsList.appendChild(itemDiv);
    itemDiv.appendChild(newProjectItem);
    itemDiv.appendChild(completeProjectBtn);
    itemDiv.classList.add("item-div");
    addProjectsToDashboard();
    completeProject();
  });
}

function completeProject() {
  let allCompleteProjectBtns = document.querySelectorAll(
    ".complete-project-btn"
  );
  console.log(allCompleteProjectBtns);
  allCompleteProjectBtns.forEach((comp) =>
    comp.addEventListener("click", () => {
      for (let item of myProjects) {
        if (item.title === comp.previousSibling.textContent) {
          comp.parentElement.classList.add("hide");
        }
      }
    })
  );
}

function addProjectsToDashboard() {
  availableProjects = document.querySelectorAll(".project");
  console.log(availableProjects);
  availableProjects.forEach((availableProject) => {
    availableProject.addEventListener("click", (e) => {
      let ind = e.target.id;
      selectedProject = myProjects[ind];
      renderProject(selectedProject);

    });
  });
}

const addProjectFormBtn = document.getElementById("add-project-btn-form");
const addProjectForm = document.getElementById("add-project-form");

createProjectBtn.addEventListener("click", () => {
  addProjectFormBtn.classList.remove("hide");
  addProjectForm.classList.add("hide");
  addProjectFormBtn.classList.remove("lower-opacity");
  getProjectInput();
  addProject();
  displayProjects();
});

let taskTitleAvailable = false;
let getTaskTitle;
const addTaskBtn = document.getElementById("add-new-task-form-btn");
function getTaskInput() {
  getTaskTitle = document.getElementById("task-title").value;
  if (getTaskTitle != "") {
    taskTitleAvailable = true;
  }
}

function getProjectInput() {
  getProjectTitle = document.getElementById("project-title").value;
  getProjectDueDate = document.getElementById("project-due-date").value;
  if (getProjectTitle != "" && getProjectDueDate != "") {
    projectInputAvailable = true;
  }
}
function addTasktoProject() {
  if (taskTitleAvailable) {
    let projectNameNeeded = projectTitleHeading.textContent;
    for (let item of myProjects) {
      console.log(item.title);
      if (item.title === projectNameNeeded) {
        item.addTask(getTaskTitle);
        renderProject(item);
        break;
      }
    }
  } else {
    alert("Please type a task");
  }
}
function addProject() {
  if (projectInputAvailable) {
    newProject = new Project(getProjectTitle, getProjectDueDate);
    document.getElementById("project-title").value = "";
    document.getElementById("project-due-date").value = "";
    myProjects.push(newProject);
    console.log(myProjects.indexOf(newProject));
  } else {
    alert("Please fill in all project fields");
  }
}

function renderProject(p) {
  projectTitleHeading.textContent = "";
  projectDueDateDisplay.textContent = "";
  projectTitleHeading.textContent = p.title;
  projectDueDateDisplay.textContent = "Due: " + p.dueDate;
  projectDueDateDisplay.classList.add("display-due-date");
  currentTasks = p.tasks;
  taskList.textContent = "";
  let taskItem;
  currentTasks.forEach((currentTask) => {
    taskItem = document.createElement("li");
    taskItem.textContent = currentTask.title;
    completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-task-btn");
    taskItem.appendChild(completeBtn);
    deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task-btn");
    deleteTaskBtn.textContent = "Delete";
    taskItem.appendChild(deleteTaskBtn);
    taskItem.classList.add("task");
    taskList.appendChild(taskItem);
    if (currentTask.completed) {
      taskItem.classList.add("task-completed");
      deleteTaskBtn.classList.add("hide");
      completeBtn.classList.add("hide");
    }
  });
  completeTask(p);
  deleteTask(p);
}

addTaskBtn.addEventListener("click", () => {
  getTaskInput();
  addTasktoProject();
});

function deleteTask(p) {
  let deleteTaskBtnsE = document.querySelectorAll(".delete-task-btn");
  deleteTaskBtnsE.forEach((deleteTaskBtnE) =>
    deleteTaskBtnE.addEventListener("click", () => {
      let previousBtn = deleteTaskBtnE.previousElementSibling;
      let taskContent = previousBtn.previousSibling.textContent;
      for (let item of myProjects) {
        if (item.title === p.title) {
          for (let el of item.tasks) {
            if (el.title === taskContent) {
              let index = item.tasks.indexOf(el);
              item.tasks.splice(index, 1);
              deleteTaskBtnE.parentNode.classList.add("hide");
              renderProject(p);
            }
          }
        }
      }
    })
  );
}

function completeTask(p) {
  let compleTaskBtns = document.querySelectorAll(".complete-task-btn");
  compleTaskBtns.forEach((completeTaskBtn) =>
    completeTaskBtn.addEventListener("click", () => {
      let taskContent = completeTaskBtn.previousSibling.textContent;
      for (let item of myProjects) {
        if (item.title === p.title) {
          for (let el of item.tasks) {
            if (el.title === taskContent) {
              el.completed = true;
              completeTaskBtn.parentNode.classList.add("task-completed");
              completeTaskBtn.nextSibling.classList.add("hide");
              completeTaskBtn.classList.add("hide");
            }
          }
        }
      }
    })
  );
}

addProjectFormBtn.addEventListener("click", () => {
  addProjectFormBtn.classList.add("hide");
  addProjectFormBtn.classList.add("lower-opacity");
  addProjectForm.classList.remove("hide");
});

