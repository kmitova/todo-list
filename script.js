// projects do not display on the right if another is added

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

window.onload = displayProjects();

function displayProjects() {
  projectsList.innerHTML = "";
  myProjects.forEach(function (project, i) {
    let newProjectItem = document.createElement("li");
    newProjectItem.classList.add('project')
    newProjectItem.setAttribute('id', i)
    // console.log(project.title);
    console.log(i)
    newProjectItem.textContent = project.title;
    projectsList.appendChild(newProjectItem);
    
  })
  availableProjects = document.querySelectorAll(".project");
  console.log(availableProjects)
}


// EVENTS 
// addProjectBtn.addEventListener()

createProjectBtn.addEventListener('click', () => {
  getProjectInput()
  addProject()
  displayProjects()
  console.log(myProjects)
})

availableProjects.forEach((availableProject) => {
  console.log("in loop");
  availableProject.addEventListener("click", (e) => {
    let ind = e.target.id;
    console.log(availableProject);
    console.log(ind);
    selectedProject = myProjects[ind];
    renderProject(selectedProject);
    // displayProjects()
    console.log('exit loop')
  });
  
});

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

// GET CONSTANTS FROM DOM
const upperPart = document.getElementById('upper-part')
const projectTitleHeading = document.getElementById('project-title-heading')

// let newProject2 = new Project('title of project', '12.03.2022')
// console.log(newProject2.dueDate)
// let randomItem = document.createElement("li");
// projectsList.appendChild(randomItem);
// randomItem.textContent = newProject2.title;
let i = 0
let selectedProject

// availableProjects = (document.querySelectorAll('.project'))
console.log(availableProjects)
// console.log(availableProjects)
// myProjects.forEach((myProject) => (
  
//   console.log(myProject.title))
//   let id = document.getElementsByClassName('project')[i].id
//   console.log(id)
//   selectedProject = document.getElementById(id)
//   console.log(selectedProject)
//   // selectedProject = e.target.id
//   renderProject(selectedProject)
//   // myProject.addEventListener('click', (e) => {
//   //   selectedProject = e.target.id
//   //   console.log(e.target.id)
//   // }))
//   i++
// )
// availableProjects.forEach((availableProject) => {
//   console.log('in loop')
//   availableProject.addEventListener('click', (e) => {
//     let ind = e.target.id;
//     console.log(availableProject)
//     console.log(ind)
//     selectedProject = myProjects[ind]
//     renderProject(selectedProject)
//   })
// })
// myProjects.forEach((myProject) => {
//   // console.log(myProject.title);
//   let id = document.getElementsByClassName("project")[i].id;
//   id = myProjects.indexOf(myProject)
//   console.log(id);
//   selectedProject = document.getElementById(id);
//     // console.log(selectedProject)
//     selectedProject.addEventListener('click', ()=> {
//       // console.log(myProject.title);
//       // let id = document.getElementsByClassName("project")[i].id;
//       // id = myProjects.indexOf(myProject);
//       // console.log(id);
//       // selectedProject = document.getElementById(id);
//       // let index = myProjects[i]
//       console.log('clicked')
//       console.log(myProjects)
//       console.log(myProjects[id])
//       renderProject(myProjects[id]);
//     })
//     // selectedProject = e.target.id
    
//     // myProject.addEventListener('click', (e) => {
//     //   selectedProject = e.target.id
//     //   console.log(e.target.id)
//     // }))
//     i++
//     if (i == myProjects.length -1) {
//       i = 0
//     }

// })

function renderProject(p) {
  projectTitleHeading.textContent = ''
  // projectTitleHeading.textContent = p.title
  console.log(p.title)
  projectTitleHeading.textContent = p.title
}
// for (let item of myProjects) {
//   console.log(item.title)

// }
