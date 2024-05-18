let Projects = [];

const createProjectBtn = document.getElementById('new-project-btn');
const fetchAllProjectsBtn = document.getElementById('fetch-all-projects-btn');
const fetchActiveProjectsBtn = document.getElementById('fetch-active-projects-btn');
const fetchCompletedProjectsBtn = document.getElementById('fetch-completed-projects-btn');
const clearCompletedProjectsBtn = document.getElementById('clear-completed-projects-btn');
const createProjectForm = document.getElementById('new-project-form');
const projectsSection = document.getElementById('projects-section');
const formSection = document.getElementById('form-section');

createProjectBtn.addEventListener('click', toggleForm);
fetchAllProjectsBtn.addEventListener('click', fetchAllProjects);
fetchActiveProjectsBtn.addEventListener('click', fetchActiveProjects);
fetchCompletedProjectsBtn.addEventListener('click', fetchCompletedProjects);
clearCompletedProjectsBtn.addEventListener('click', clearCompletedProjects);
createProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    createProject();
});

function toggleForm() {
    if (projectsSection.classList.contains('hidden')) {
        projectsSection.classList.remove('hidden');
        formSection.classList.add('hidden');
        projectsSection.style.display = 'none';
        formSection.style.display = 'flex';
    } else {
        projectsSection.classList.add('hidden');
        formSection.classList.remove('hidden');
        formSection.style.display = 'none';
        projectsSection.style.display = 'flex';
    }
}

function createProject() {
    let title = document.getElementById('project-title').value;
    let description = document.getElementById('project-description').value;
    let start_date = document.getElementById('project-start-date').value;
    let end_date = document.getElementById('project-end-date').value;

    if (title.trim() === '' || description.trim() === '' || start_date.trim() === '' || end_date.trim() === '') {
        document.getElementById('error').textContent = 'All fields are required';
        setTimeout(() => {
            document.getElementById('error').textContent = '';
        }, 3000);
        
        return;
    }
    
    let newProject = {
        id: Projects.length + 1,
        //! Dummy image url
        image: './images/project.png',
        title: title,
        description: description,
        start_date: start_date,
        end_date: end_date,
        status: 'active'
    };
    
    Projects.push(newProject);
    saveProjects();

    document.getElementById('new-project-form').reset();
    
    document.getElementById('projects').value = '';
    renderProjects(Projects);
    toggleForm();
}

function fetchAllProjects() {
    renderProjects(Projects);
}

function fetchActiveProjects() {
    let activeProjects = Projects.filter(project => project.status === 'active');
    renderProjects(activeProjects);
}

function fetchCompletedProjects() {
    let completedProjects = Projects.filter(project => project.status === 'completed');
    renderProjects(completedProjects);
}

function clearCompletedProjects() {
    Projects = Projects.filter(project => project.status === 'active');
    saveProjects();
    fetchAllProjects();
    updateActiveCount();
}

function changeProjectstatus(projectId) {
    let projectIndex = Projects.findIndex(project => project.id === projectId);
    if (projectIndex !== -1) {
        Projects[projectIndex].status = Projects[projectIndex].status === 'active' ? 'completed' : 'active';
        saveProjects();
        updateActiveCount();
    }
}

function renderProjects(ProjectsArray) {
    let projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = '';

    ProjectsArray.forEach(project => {
        let projectItem = document.createElement('div');
        projectItem.classList.add('project');

        let imageDiv = document.createElement('div');
        imageDiv.classList.add('project-img');

        let projectImage = document.createElement('img');
        projectImage.setAttribute('src', project.image);

        let detailsDiv = document.createElement('div');
        detailsDiv.classList.add('project-details');

        let projectTitle = document.createElement('h3');
        projectTitle.classList.add('title');
        projectTitle.textContent = project.title;

        // Truncate description to first 10 words
        let descriptionWords = project.description.split(' ');
        let truncatedDescription = descriptionWords.slice(0, 10).join(' ');
        if (descriptionWords.length > 10) {
            truncatedDescription += '...';
        }

        let projectDescription = document.createElement('p');
        projectDescription.classList.add('description');
        projectDescription.textContent = truncatedDescription;

        let projectDates = document.createElement('p');
        projectDates.classList.add('date');

        let projectStartDate = document.createElement('span')
        projectStartDate.classList.add('start-date');
        projectStartDate.textContent = 'start: ' + project.start_date;

        let projectEndDate = document.createElement('span');
        projectEndDate.classList.add('end-date');
        projectEndDate.textContent = ' end: ' + project.end_date;

        let projectStatusP = document.createElement('p');
        projectStatusP.classList.add('status-p');
        projectStatusP.textContent = 'status: ';

        let projectStatus = document.createElement('span');
        projectStatus.classList.add('status');
        projectStatus.classList.add(project.status);
        projectStatus.textContent = project.status;

        let moreInfoBtn = document.createElement('button');
        moreInfoBtn.classList.add('more-info-btn');
        moreInfoBtn.textContent = 'more info';

        imageDiv.appendChild(projectImage);

        projectDates.appendChild(projectStartDate);
        projectDates.appendChild(projectEndDate);

        projectStatusP.appendChild(projectStatus);

        detailsDiv.appendChild(projectTitle);
        detailsDiv.appendChild(projectDescription);
        detailsDiv.appendChild(projectDates);
        detailsDiv.appendChild(projectStatusP);
        detailsDiv.appendChild(moreInfoBtn);

        projectItem.appendChild(imageDiv);
        projectItem.appendChild(detailsDiv);
        
        moreInfoBtn.addEventListener('click', () => {
            window.location.href = `./pages/project.html?id=${project.id}`;
        });
        
        projectsContainer.appendChild(projectItem);
    });
}

function saveProjects() {
    localStorage.setItem('Projects', JSON.stringify(Projects));
}

function loadProjects() {
    let storedProjects = localStorage.getItem('Projects');
    if (storedProjects) {
        Projects = JSON.parse(storedProjects);
        renderProjects(Projects);
    }
}

// Load existing Projects when the page loads
loadProjects();
