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
            //load in title with animation
            var projectstitle = new Typed('#projects-id', {
            strings: ['Projects Section'],
            typeSpeed: 50,
             });
            
        });

        document.getElementById('contact-button').addEventListener('click', () => {
            
            showSection('contact');
            //title animation
            var cotacttitle = new Typed('#contact-id', {
            strings: ['Contact Section'],
            typeSpeed: 50,
             });
        });
        //darkmode
        
            document.getElementById('mode-button').addEventListener('click', () => {
                console.log(document.getElementById('mode-button').innerHTML);
                var currentMode = document.getElementById('mode-button');
                if (currentMode.innerHTML == 'Dark Mode') {
                    this.changeModeDark();
                    currentMode.innerHTML = 'Light Mode';
                    return;
                } 
                if (currentMode.innerHTML == 'Light Mode') {
                    this.changeModeLight();
                    currentMode.innerHTML = 'Dark Mode';
                    return;
                }
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
    changeModeDark() {
        
        
            console.log('mode match dark');
            document.documentElement.style.setProperty('--sub-txt-color', '#71ce4cff');
            document.documentElement.style.setProperty('--title-txt-color', '#3edf29ff');
            document.documentElement.style.setProperty('--head-foot-txt-color', '#1f1c1cff');
            document.documentElement.style.setProperty('--body-bg-color', '#3b3939ff');
            document.documentElement.style.setProperty('--section-bg-color', '#1e1e20ff');
            document.documentElement.style.setProperty('--head-foot-bg-color', '#33ff00ff');
            document.documentElement.style.setProperty('--button-bg-color', '#53c249ff');
            document.documentElement.style.setProperty('--dark-border-color', '#00cf00ff');
            document.documentElement.style.setProperty('--light-border-color', '#21c03cff');
            document.documentElement.style.setProperty('--modal-bg-outer-color', 'rgba(85, 81, 85, 0.9)');
                    
    }
    changeModeLight() {

        
            console.log('mode match light');
            document.documentElement.style.setProperty('--sub-txt-color', '#212122');
            document.documentElement.style.setProperty('--title-txt-color', '#0f0f0f');
            document.documentElement.style.setProperty('--head-foot-txt-color', '#ffffff');
            document.documentElement.style.setProperty('--body-bg-color', '#a5a5a5');
            document.documentElement.style.setProperty('--section-bg-color', '#f7f7fa');
            document.documentElement.style.setProperty('--head-foot-bg-color', '#000000');
            document.documentElement.style.setProperty('--button-bg-color', '#343435');
            document.documentElement.style.setProperty('--dark-border-color', '#14141b');
            document.documentElement.style.setProperty('--light-border-color', '#716ffa');
            document.documentElement.style.setProperty('--modal-bg-outer-color', 'rgba(196, 184, 197, 0.9)');
            
        
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

