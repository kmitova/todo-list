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

console.log(exampleProject.tasks)
exampleProject.tasks.forEach(function (task) {
  console.log(task.title)
})
myProjects.push(exampleProject)
myProjects.push(exampleProject2)

function displayProjects() {
  projectsList.innerHTML = "";
  myProjects.forEach(function (project, i) {
    let newProjectItem = document.createElement("li");
    newProjectItem.classList.add('project')
    newProjectItem.setAttribute('id', i)
    console.log(project.title);
    console.log(i)
    newProjectItem.textContent = project.title;
    projectsList.appendChild(newProjectItem);
  })
}


// EVENTS 
// addProjectBtn.addEventListener()

createProjectBtn.addEventListener('click', () => {
  getProjectInput()
  addProject()
  displayProjects()
})

function getProjectInput() {
  console.log('in project function')
  getProjectTitle = document.getElementById('project-title').value
  // getProjectDescription = document.getElementById('project-description').value
  getProjectDueDate = document.getElementById('project-due-date').value
  if (getProjectTitle != '' && getProjectDueDate !='') {
    projectInputAvailable = true
  }
  console.log(getProjectTitle)
  console.log(getProjectDueDate)
  // console.log(getProjectDescription)
}

function addProject() {
  console.log('in add project function')
  if (projectInputAvailable) {
    newProject = new Project(getProjectTitle, getProjectDueDate)
    console.log(newProject.title)
    document.getElementById("project-title").value = "";
    document.getElementById("project-due-date").value = "";
    myProjects.push(newProject)
    
  } else {
    alert('Please fill in all project fields')
  }
}

console.log(myProjects)

// let newProject2 = new Project('title of project', '12.03.2022')
// console.log(newProject2.dueDate)
// let randomItem = document.createElement("li");
// projectsList.appendChild(randomItem);
// randomItem.textContent = newProject2.title;

window.onload = displayProjects()