let myProjects = [];
projectInputAvailable = false;
let getProjectTitle;
let getProjectDescription;
let getProjectDueDate;
const projectsContainer = document.getElementsByClassName("projects");
const projectsList = document.getElementById("projects-list");
// BUTTONS
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

projectDueDateDisplay = document.createElement("h3");
// projectDueDateDisplay.textContent = p.dueDate;
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
    // this.description = description
    this.dueDate = dueDate;
    this.tasks = [];
  }

  addTask(taskTitle) {
    // let taskTitle
    let newTask = new Task(taskTitle);
    this.tasks.push(newTask);
    // return
  }
}

let exampleProject = new Project("Example Project", "12-02-2022");
let exampleProject2 = new Project("Example Project 2", "13-02-2022");
exampleProject.addTask("do laundry");
exampleProject.addTask("walk dog");
exampleProject2.addTask("do homework");
console.log(exampleProject.tasks);
exampleProject.tasks.forEach(function (task) {
  console.log(task.title);
});
myProjects.push(exampleProject);
myProjects.push(exampleProject2);

window.onload = displayProjects();

function displayProjects() {
  projectsList.textContent = "";
  myProjects.forEach(function (project, i) {
    let newProjectItem = document.createElement("li");
    newProjectItem.classList.add("project");
    newProjectItem.setAttribute("id", i);
    // console.log(project.title);
    console.log(i);
    newProjectItem.textContent = project.title;
    projectsList.appendChild(newProjectItem);
    addProjectsToDashboard();
  });
}

// was not in a function before
function addProjectsToDashboard() {
  availableProjects = document.querySelectorAll(".project");
  console.log(availableProjects);
  availableProjects.forEach((availableProject) => {
    availableProject.addEventListener("click", (e) => {
      console.log("in loop");
      let ind = e.target.id;
      console.log(availableProject);
      console.log(ind);
      selectedProject = myProjects[ind];
      renderProject(selectedProject);
      // displayProjects()
      console.log("exit loop");
    });
  });
}

// EVENTS
// addProjectBtn.addEventListener()

createProjectBtn.addEventListener("click", () => {
  getProjectInput();
  addProject();
  displayProjects();
  console.log(myProjects);
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
        console.log("such project exists");
        item.addTask(getTaskTitle);
        console.log(item);
        renderProject(item);
        break;
      }
    }
  } else {
    alert("Please type a task");
  }
}
function addProject() {
  // console.log('in add project function')
  if (projectInputAvailable) {
    newProject = new Project(getProjectTitle, getProjectDueDate);
    // console.log(newProject.title)
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
  console.log(p.title);
  projectTitleHeading.textContent = p.title;
  projectDueDateDisplay.textContent = "Due: " + p.dueDate;
  // for each task: display
  currentTasks = p.tasks;
  console.table(currentTasks);
  taskList.textContent = "";
  let taskItem
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
    // console.log('adding task')
    if (currentTask.completed) {
      taskItem.classList.add("task-completed");
      deleteTaskBtn.classList.add("hide");
      completeBtn.classList.add("hide");
    }
  });
  completeTask(p);
  deleteTask(p, taskItem)
}

addTaskBtn.addEventListener("click", () => {
  getTaskInput();
  addTasktoProject();
});

function deleteTask(p) {
  // similar to complete task function
  let deleteTaskBtnsE = document.querySelectorAll('.delete-task-btn')
  console.log(deleteTaskBtnsE)
  deleteTaskBtnsE.forEach((deleteTaskBtnE) => 
    deleteTaskBtnE.addEventListener('click', () => {
      console.log('in delete task loop')
      console.log(deleteTaskBtnE.previousElementSibling.textContent)
      let previousBtn = deleteTaskBtnE.previousElementSibling
      console.log(previousBtn.previousSibling.textContent)
      let taskContent = previousBtn.previousSibling.textContent
      for (let item of myProjects) {
        if (item.title === p.title) {
          console.log(p.title)
          for (let el of item.tasks) {
            if (el.title === taskContent) {
              console.log(el.title)

              let index = item.tasks.indexOf(el)
              item.tasks.splice(index, 1)
              console.log(item.tasks)
              console.log(deleteTaskBtnE.parentNode)
              deleteTaskBtnE.parentNode.classList.add('hide')
            }
          }
        }
      }
    }))
}

function completeTask(p) {
  let compleTaskBtns = document.querySelectorAll(".complete-task-btn");
  console.log(compleTaskBtns);
  compleTaskBtns.forEach((completeTaskBtn) =>
    completeTaskBtn.addEventListener("click", () => {
      console.log("in complete loop");
      console.log(completeTaskBtn.previousSibling.textContent);
      let taskContent = completeTaskBtn.previousSibling.textContent;
      console.log(taskContent);
      for (let item of myProjects) {
        if (item.title === p.title) {
          console.log(p.title);
          console.log(item.tasks);
          for (let el of item.tasks) {
            if (el.title === taskContent) {
              el.completed = true;
              console.log("task completed");
              console.log(completeTaskBtn.parentNode);
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



// let compleTaskBtns = document.querySelectorAll('.complete-task-btn')
// console.log(compleTaskBtns)
// compleTaskBtns.forEach((completeTaskBtn) =>
//   completeTaskBtn.addEventListener('click', ()=> {
//     console.log('in complete loop')
//   }))
