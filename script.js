class porfolioPage {
    constructor() {
        this.project = projects;
        this.init();
    }
  
    //init
    init(){
        this.bindEvents();
    }
    

    //event listeners to toggle sections. Not sure why they have to be in a function
    bindEvents() {
        //about section active
        document.getElementById('about-button').addEventListener('click', () => {
            
            showSection('about');
            console.log('about button click')
        });

        document.getElementById('projects-button').addEventListener('click', () => {
            //render the projects first
            this.renderProjects();
            showSection('projects');
        });

        document.getElementById('contact-button').addEventListener('click', () => {
            
            showSection('contact');
        });

        //for closing modal content
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });
        //close modal if clicking outside modal box
         document.getElementById('project-modal').addEventListener('click', (e) => {
            if (e.target.id === 'project-modal') {
                this.closeModal();
            }
        });


    }

    //function to load in project data from projects-data.js
    renderProjects() {
        
        const proj = this.project
        const grid = document.getElementById('projects-grid');

         grid.innerHTML = proj.map(project => this.createProjectCard(project)).join('');
         this.bindProjectEvents();
         console.log(proj);
         this.bindProjectEvents();
    }
    //returns the html with associated elements from project objects to be rendered.
    createProjectCard(project) {
         return `
            <div class="project-card" data-id="${project.id}">               
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>         
                    <button class="view-btn" data-id="${project.id}">👁 View Project</button>
                </div>
            </div>
        `;
    }

    //bind even listeners for project view button to produce a popup.
    bindProjectEvents() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = parseInt(e.target.dataset.id);

                this.showProjectModal(projectId);
            });
        });
    }

    //show a project as a popup
    showProjectModal(projectId) {
        const project = this.project.find(r => r.id === projectId);
        //do nothing if id doesnt exist
        if (!project) {
            console.log('no recipe exist for id');
            return;
        }

        const modal = document.getElementById('project-modal');
        const content = document.getElementById('modal-project-content');

       content.innerHTML = `
            
            <h2 class="modal-project-title">${project.name}</h2>
            
            <p class="modal-project-desc">${project.desc}</p>
            
            <p class="modal-project-repo">${project.repo}</p>
            
            <p class="modal-project-pages">${project.pages}</p>

        `;

         modal.style.display = 'block';

    }

    closeModal() {
        document.getElementById('project-modal').style.display = 'none';
    }


}

  //FUNCTION TO SHOW A SECTION
   function showSection(sectionName) {
        //hides all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            console.log('first part of show section')
        });
        //shows section corresponding to input
        document.getElementById(sectionName).classList.add('active');
        
        console.log('second part of show section')     
    }
    
     
  //ON PAGE LOAD, create the class.
    document.addEventListener('DOMContentLoaded', () => {
        console.log('page loaded');
        new porfolioPage();
        
    });

