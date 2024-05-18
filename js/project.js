let Projects = JSON.parse(localStorage.getItem('Projects'));

if (!Projects) {
    console.log('Could not load projects');
}

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

if (projectId) {
    const project = Projects.find(project => project.id === parseInt(projectId));
    
    if (project) {
        renderProject(project);
    } 
}

function renderProject(project) {
    let projectContainer = document.getElementById('container');
    projectContainer.innerHTML = '';

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('project-img');

    let projectImage = document.createElement('img');
    projectImage.setAttribute('src', '.' + project.image); //!

    let detailsDiv = document.createElement('div');
    detailsDiv.classList.add('project-details');

    let projectTitle = document.createElement('h3');
    projectTitle.classList.add('title');
    projectTitle.textContent = project.title;
    
    let projectDescription = document.createElement('p');
    projectDescription.classList.add('description');
    projectDescription.textContent = project.description;
    
    let projectStartDate = document.createElement('p');
    projectStartDate.classList.add('start-date-p');
    projectStartDate.textContent = 'start: ' + project.start_date;
    
    let projectEndDate = document.createElement('p');
    projectEndDate.classList.add('end-date-p');
    projectEndDate.textContent = 'end: ' + project.end_date;
    
    let projectStatusP = document.createElement('p');
    projectStatusP.classList.add('status-p');
    projectStatusP.textContent = 'status: ';

    let projectStatus = document.createElement('span');
    projectStatus.classList.add('status');
    projectStatus.classList.add(project.status);
    projectStatus.textContent = project.status;
    
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'delete';
    
    deleteBtn.addEventListener('click', () => {
        deleteProject(project.id);
    });

    imageDiv.appendChild(projectImage);

    projectStatusP.appendChild(projectStatus);

    detailsDiv.appendChild(projectTitle);
    detailsDiv.appendChild(projectDescription);
    detailsDiv.appendChild(projectStartDate);
    detailsDiv.appendChild(projectEndDate);
    detailsDiv.appendChild(projectStatusP);

    if(project.status == 'active') {
        let markAsCompletedBtn = document.createElement('button');
        markAsCompletedBtn.classList.add('mark-completed-btn');
        markAsCompletedBtn.textContent = 'mark as completed';
        
        markAsCompletedBtn.addEventListener('click', () => {
            changeProjectStatus(project.id);
            renderProject(project);
        });

        detailsDiv.appendChild(markAsCompletedBtn);
    }

    detailsDiv.appendChild(deleteBtn);

    projectContainer.appendChild(imageDiv);
    projectContainer.appendChild(detailsDiv);
}

function changeProjectStatus(projectId) {
    let projectIndex = Projects.findIndex(project => project.id === projectId);
    if (projectIndex !== -1) {
        Projects[projectIndex].status = Projects[projectIndex].status === 'active' ? 'completed' : 'active';
        saveProjects();
    }
}

function deleteProject(id) {
    const index = Projects.findIndex(project => project.id === id);

    if (index !== -1) {
        if (confirm("Are you sure you want to delete this project?")) {
            Projects.splice(index, 1);
            saveProjects();

            window.location.href = `../projects.html`;
        }
    } else {
        alert(`Project with ID ${id} not found.`);
    }
}

function saveProjects() {
    localStorage.setItem('Projects', JSON.stringify(Projects));
}
