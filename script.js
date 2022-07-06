let myProjects = []
projectInputAvailable = false
let getProjectTitle 
let getProjectDescription 
let getProjectDueDate
const projectsContainer = document.getElementsByClassName('projects')
const projectsList = document.getElementById('projects-list')
// BUTTONS
const addProjectBtn = document.getElementById("add-project-btn");
const createProjectBtn = document.getElementById("create-new-project");
let newProject
let availableProjects;
let completeBtn
let deleteTaskBtn
let projectDueDateDisplay
// GET CONSTANTS FROM DOM
const upperPart = document.getElementById('upper-part')
const projectTitleHeading = document.getElementById('project-title-heading')
const taskList = document.getElementById('tasks-list')

projectDueDateDisplay = document.createElement("h3");
// projectDueDateDisplay.textContent = p.dueDate;
upperPart.appendChild(projectDueDateDisplay);

class Task {
  constructor(title) {
    this.title = title
    this.completed = false
  }
}
class Project {
  constructor(title, dueDate) {
    this.title = title;
    // this.description = description
    this.dueDate = dueDate;
    this.tasks = []
  }

  addTask(taskTitle) {
    // let taskTitle
    let newTask = new Task(taskTitle)
    this.tasks.push(newTask)
    // return
  }
}


let exampleProject = new Project('Example Project', '12-02-2022')
let exampleProject2 = new Project("Example Project 2", "13-02-2022");
exampleProject.addTask('do laundry')
exampleProject.addTask('walk dog')
exampleProject2.addTask('do homework')
console.log(exampleProject.tasks)
exampleProject.tasks.forEach(function (task) {
  console.log(task.title)
})
myProjects.push(exampleProject)
myProjects.push(exampleProject2)

window.onload = displayProjects();

function displayProjects() {
  projectsList.textContent = "";
  myProjects.forEach(function (project, i) {
    let newProjectItem = document.createElement("li");
    newProjectItem.classList.add('project')
    newProjectItem.setAttribute('id', i)
    // console.log(project.title);
    console.log(i)
    newProjectItem.textContent = project.title;
    projectsList.appendChild(newProjectItem);
    addProjectsToDashboard()
  })
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

createProjectBtn.addEventListener('click', () => {
  getProjectInput()
  addProject()
  displayProjects()
  console.log(myProjects)
})
let taskTitleAvailable = false
let getTaskTitle
const addTaskBtn = document.getElementById("add-new-task-form-btn");
function getTaskInput() {
  getTaskTitle = document.getElementById('task-title').value
  if (getTaskTitle != '') {
    taskTitleAvailable = true
  }
}

function getProjectInput() {
  // console.log('in project function')
  getProjectTitle = document.getElementById('project-title').value
  // getProjectDescription = document.getElementById('project-description').value
  getProjectDueDate = document.getElementById('project-due-date').value
  if (getProjectTitle != '' && getProjectDueDate !='') {
    projectInputAvailable = true
  }
  // console.log(getProjectTitle)
  // console.log(getProjectDueDate)
  // console.log(getProjectDescription)
}
function addTasktoProject() {
  if (taskTitleAvailable) {
    let projectNameNeeded = projectTitleHeading.textContent
    for (let item of myProjects) {
      console.log(item.title)
      if (item.title === projectNameNeeded) {
        console.log('such project exists')
        item.addTask(getTaskTitle)
        console.log(item)
        renderProject(item)
        break
      }
    }
  } else {
    alert('Please type a task')
  }
}
function addProject() {
  // console.log('in add project function')
  if (projectInputAvailable) {
    newProject = new Project(getProjectTitle, getProjectDueDate)
    // console.log(newProject.title)
    document.getElementById("project-title").value = "";
    document.getElementById("project-due-date").value = "";
    myProjects.push(newProject)
    console.log(myProjects.indexOf(newProject))
  } else {
    alert('Please fill in all project fields')
  }
}


function renderProject(p) {
  projectTitleHeading.textContent = ''
  projectDueDateDisplay.textContent = ''
  console.log(p.title)
  projectTitleHeading.textContent = p.title
  projectDueDateDisplay.textContent = "Due: " + p.dueDate;
  // for each task: display
  currentTasks = p.tasks
  console.table(currentTasks)
  taskList.textContent = ''
  currentTasks.forEach((currentTask) => {
    let taskItem = document.createElement('li')
    taskItem.textContent = currentTask.title
    completeBtn = document.createElement('button')
    completeBtn.textContent = 'Complete'
    taskItem.appendChild(completeBtn)
    deleteTaskBtn = document.createElement('button')
    deleteTaskBtn.textContent = 'Delete'
    taskItem.appendChild(deleteTaskBtn)
    taskItem.classList.add('task')
    taskList.appendChild(taskItem)
    console.log('adding task')
  })
}



addTaskBtn.addEventListener("click", () => {
  getTaskInput();
  addTasktoProject();
});

