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
// let completeProjectBtn = document.createElement("button");
// upperPart.appendChild(completeProjectBtn);
let mainProjectContent = document.getElementById("project-info");
let completedProjectText = document.getElementById("completed-project-text");
console.log(completedProjectText.textContent);
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
    let itemDiv = document.createElement('div')
    let newProjectItem = document.createElement("li");
    let completeProjectBtn = document.createElement('button')
    completeProjectBtn.textContent = 'Complete Project'
    completeProjectBtn.classList.add('complete-project-btn')
    
    newProjectItem.classList.add("project");
    newProjectItem.setAttribute("id", i);
    // console.log(project.title);
    console.log(i);
    newProjectItem.textContent = project.title;
    projectsList.appendChild(itemDiv);
    itemDiv.appendChild(newProjectItem)
    itemDiv.appendChild(completeProjectBtn)
    console.log(newProjectItem)
    // completedProjectText.classList.add("hide");
    // mainProjectContent.classList.remove("hide");
    addProjectsToDashboard();
    completeProject()
  });
}

function completeProject() {
  let allCompleteProjectBtns = document.querySelectorAll('.complete-project-btn')
  console.log(allCompleteProjectBtns)
  allCompleteProjectBtns.forEach((comp) => 
    comp.addEventListener('click', () => {
      console.log('clicked')
      console.log(comp.previousSibling.textContent)
      for (let item of myProjects) {
        if (item.title === comp.previousSibling.textContent) {
          console.log('same name')
          comp.parentElement.classList.add('hide')
        }
      }
    }))
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
      // completeProject(selectedProject)
      // displayProjects()
      
      console.log("exit loop");
    });
  });
}

// EVENTS
// addProjectBtn.addEventListener()
const addProjectFormBtn = document.getElementById("add-project-btn-form");
const addProjectForm = document.getElementById("add-project-form");

createProjectBtn.addEventListener("click", () => {
  addProjectFormBtn.classList.remove('hide')
  addProjectForm.classList.add('hide')
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
  // completedProjectText.classList.add('hide')
  // mainProjectContent.classList.remove('hide')
  projectTitleHeading.textContent = "";
  projectDueDateDisplay.textContent = "";
  // console.log(p.title);
  projectTitleHeading.textContent = p.title;
  projectDueDateDisplay.textContent = "Due: " + p.dueDate;
  // for each task: display
  
  // let completeProjectBtn = document.createElement('button')
  // completeProjectBtn.classList.add('complete-project-btn')
  // completeProjectBtn.textContent = 'Complete Project'
  // upperPart.append(completeProjectBtn)
  // console.log('button added')
  // upperPart.appendChild(completeProjectBtn)
  currentTasks = p.tasks;
  // console.table(currentTasks);
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
  deleteTask(p)
  // completeProject(p)
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
              renderProject(p)
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

addProjectFormBtn.addEventListener('click', () => {
  addProjectForm.classList.remove('hide')
  addProjectFormBtn.classList.add('hide')
})

// let completeProjectBtns = document.querySelectorAll(".complete-project-btn");
// console.log(completeProjectBtns);
// completeProjectBtns.forEach((completeProjectBtnE) =>
//   completeProjectBtnE.addEventListener("click", () => {
//     console.log("clicked");
//     let neededTitle = projectTitleHeading.textContent;
//     console.log(neededTitle);
//     for (let item of myProjects) {
//       console.log(item);
//       if (item.title === neededTitle) {
//         console.log("title is the same: " + p.title);
//         let index = myProjects.indexOf(item);
//         console.log(item);
//         myProjects.splice(index, 1);
//         console.log(myProjects);
//         completedProjectText.classList.remove("hide");
//         // mainProjectContent.classList.add('hide')
//         break;
//         // mainProjectContent.classList.add('hide')
//       }
//     }
//     displayProjects()
//   })
// );
// function completeProject(p) {
//   let completeProjectBtns = document.querySelectorAll(".complete-project-btn");
//   console.log(completeProjectBtns)
//   completeProjectBtns.forEach((completeProjectBtnE) => 
//   completeProjectBtnE.addEventListener('click', ()=> {
//     console.log('clicked')
//     let neededTitle = projectTitleHeading.textContent
//     console.log(neededTitle)
//     for (let item of myProjects) {
//       console.log(item)
//       if (item.title === neededTitle) {
//         console.log('title is the same: ' + p.title)
//         let index = myProjects.indexOf(item)
//         console.log(item)
//         myProjects.splice(index, 1)
//         console.log(myProjects)
//         completedProjectText.classList.remove('hide')
//         // mainProjectContent.classList.add('hide')
//         break
//         // mainProjectContent.classList.add('hide')
        
//       }

//     }
//   }))
// }

