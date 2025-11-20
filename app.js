//refference from recipe app lab.not used in page.

class RecipeApp {
    constructor() {
        this.recipes = recipes;
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.currentFilter = 'all';
        this.currentSort = 'name';
        this.searchTerm = '';
        this.currentSection = 'home';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderRecipes();
        this.updateFavoritesCount();
        this.showSection('home');
    }

    bindEvents() {
        document.getElementById('recipe-search').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderRecipes();
            this.toggleClearButton();
        });

        document.getElementById('search-btn').addEventListener('click', () => {
            this.renderRecipes();
            this.showSection('recipes');
        });

        document.getElementById('clear-search').addEventListener('click', () => {
            document.getElementById('recipe-search').value = '';
            this.searchTerm = '';
            this.renderRecipes();
            this.toggleClearButton();
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.currentFilter = e.target.dataset.category;
                this.renderRecipes();
                this.showSection('recipes');
            });
        });

        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderRecipes();
        });

        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('recipe-modal').addEventListener('click', (e) => {
            if (e.target.id === 'recipe-modal') {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showSection(sectionName) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(sectionName).classList.add('active');
        this.currentSection = sectionName;

        if (sectionName === 'favorites') {
            this.renderFavorites();
        }
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    getFilteredRecipes() {
        let filtered = this.recipes;

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(recipe => recipe.category === this.currentFilter);
        }

        if (this.searchTerm) {
            filtered = filtered.filter(recipe => 
                recipe.name.toLowerCase().includes(this.searchTerm) ||
                recipe.description.toLowerCase().includes(this.searchTerm) ||
                recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(this.searchTerm)
                )
            );
        }

        return this.sortRecipes(filtered);
    }

    sortRecipes(recipes) {
        return recipes.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'time':
                    return a.prepTime - b.prepTime;
                case 'difficulty':
                    const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
    }

    renderRecipes() {
        const filteredRecipes = this.getFilteredRecipes();
        const grid = document.getElementById('recipe-grid');
        const noResults = document.getElementById('no-results');

        if (filteredRecipes.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        grid.innerHTML = filteredRecipes.map(recipe => this.createRecipeCard(recipe)).join('');

        this.bindRecipeActions();
    }

    renderFavorites() {
        const favoriteRecipes = this.recipes.filter(recipe => 
            this.favorites.includes(recipe.id)
        );
        const grid = document.getElementById('favorites-grid');
        const noFavorites = document.getElementById('no-favorites');

        if (favoriteRecipes.length === 0) {
            grid.innerHTML = '';
            noFavorites.style.display = 'block';
            return;
        }

        noFavorites.style.display = 'none';
        grid.innerHTML = favoriteRecipes.map(recipe => this.createRecipeCard(recipe)).join('');

        this.bindRecipeActions();
    }

    createRecipeCard(recipe) {
        const isFavorited = this.favorites.includes(recipe.id);
        const stars = '★'.repeat(Math.floor(recipe.rating)) + '☆'.repeat(5 - Math.floor(recipe.rating));
        
        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <span class="recipe-category">${recipe.category}</span>
                    <div class="recipe-meta">
                        <span class="recipe-time">⏱ ${recipe.prepTime} min</span>
                        <span class="recipe-difficulty">📊 ${recipe.difficulty}</span>
                        <span class="recipe-rating">${stars} ${recipe.rating}</span>
                    </div>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-actions">
                        <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${recipe.id}">
                            ${isFavorited ? '❤️' : '🤍'} Favorite
                        </button>
                        <button class="view-btn" data-id="${recipe.id}">👁 View Recipe</button>
                    </div>
                </div>
            </div>
        `;
    }

    bindRecipeActions() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(e.target.dataset.id);
                this.toggleFavorite(recipeId);
            });
        });

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(e.target.dataset.id);
                this.showRecipeModal(recipeId);
            });
        });
    }

    toggleFavorite(recipeId) {
        const index = this.favorites.indexOf(recipeId);
        
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(recipeId);
        }

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
        
        if (this.currentSection === 'recipes') {
            this.renderRecipes();
        } else if (this.currentSection === 'favorites') {
            this.renderFavorites();
        }
    }

    updateFavoritesCount() {
        document.getElementById('favorites-count').textContent = this.favorites.length;
    }

    showRecipeModal(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const modal = document.getElementById('recipe-modal');
        const content = document.getElementById('modal-recipe-content');
        const isFavorited = this.favorites.includes(recipe.id);
        const stars = '★'.repeat(Math.floor(recipe.rating)) + '☆'.repeat(5 - Math.floor(recipe.rating));

        content.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-image">
            <h2 class="modal-recipe-title">${recipe.name}</h2>
            <div class="modal-recipe-meta">
                <span class="recipe-category">${recipe.category}</span>
                <span class="recipe-time">⏱ ${recipe.prepTime} min</span>
                <span class="recipe-difficulty">📊 ${recipe.difficulty}</span>
                <span class="recipe-rating">${stars} ${recipe.rating}</span>
            </div>
            <p class="modal-recipe-description">${recipe.description}</p>
            
            <div class="modal-ingredients">
                <h4>Ingredients:</h4>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-instructions">
                <h4>Instructions:</h4>
                <ol>
                    ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
            
            <div class="modal-actions">
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${recipe.id}">
                    ${isFavorited ? '❤️' : '🤍'} ${isFavorited ? 'Remove from' : 'Add to'} Favorites
                </button>
            </div>
        `;

        const favoriteBtn = content.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(recipe.id);
            this.showRecipeModal(recipe.id);
        });

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('recipe-modal').style.display = 'none';
    }

    toggleClearButton() {
        const clearBtn = document.getElementById('clear-search');
        clearBtn.style.display = this.searchTerm ? 'inline-block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RecipeApp();
});