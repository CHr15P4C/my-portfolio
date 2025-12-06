class porfolioPage {
    constructor() {
        this.project = projects;
        
        this.init();
        this.closeModal();
        this.closeFormModal();
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
        //darkmode
        document.getElementById('mode-button').addEventListener('click', () => {
            console.log(document.getElementById('mode-button').innerHTML);
            this.changeMode();
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
        //event listeners for the contact section
        //popup closer listeners
        document.querySelector('.close-modal-form').addEventListener('click', () => {
            this.closeFormModal();
        });
        document.getElementById('form-modal').addEventListener('click', (e) => {
            if (e.target.id === 'form-modal') {
                this.closeFormModal();
            }
        });

        //form buttons
        document.getElementById('submit').addEventListener('click', () => {
            this.formValidation();
        });
        document.getElementById('reset').addEventListener('click', () => {
            this.clearForm();
        });
    }
    //email validation
    emailIsValid (emailIn) {
    return /\S+@\S+\.\S+/.test(emailIn)
    }
    //form validation function
    formValidation() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const comment = document.getElementById('comment').value.trim(); 
        var formMessage = '';
        let validationCheck = true;
        if (name == '') {
            formMessage = "Missing Name.";
            validationCheck=false;
        } 
        if (this.emailIsValid(email) == false) {
            
            formMessage = formMessage + " Missing or wrong Email.";
            validationCheck=false;
        } 
        if (comment == '') {
            
            formMessage = formMessage + " Missing comment.";
            validationCheck=false;
        } 
        if (validationCheck == true) {
            formMessage = "Submitted!";
            this.showFormModal(formMessage);
        } else {
            this.showFormModal(formMessage);
            this.clearForm();
        }
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
    //show form validation popup
    showFormModal(formMessage) {
        const modal = document.getElementById('form-modal');
        const content = document.getElementById('modal-form-content');

        content.innerHTML = `
            <h2 class='modal-form-text'>${formMessage}</h2>        
        `;
        modal.style.display= 'block';
        
    }
    //close the popup
    closeFormModal() {
        document.getElementById('form-modal').style.display = 'none';
    }
    //clear the form fields
    clearForm() {
        console.log("clearing")
        const name = document.getElementById('name');
        name.value="";
        const email =  document.getElementById('email');
        email.value="";
        const comment = document.getElementById('comment');
        comment.value="";
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

    //dark mode stuff here.
    changeMode() {
        const mode = document.getElementById('mode-button');
        if (mode.innerHTML == 'Dark Mode') {
            console.log('mode match dark');
            document.documentElement.style.setProperty('--sub-txt-color', '#e7e7eeff');
            document.documentElement.style.setProperty('--title-txt-color', '#34f123ff');
        }
    }

}

  //FUNCTION TO SHOW A SECTION, idk why this was not working within the class. It was late at night....
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

