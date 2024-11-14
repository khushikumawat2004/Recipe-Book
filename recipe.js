const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

const addRecipeForm = document.querySelector('#add-recipe-form');
const recipeNameInput = document.querySelector('#recipe-name');
const recipeImageInput = document.querySelector('#recipe-image');
const recipeIngredientsInput = document.querySelector('#recipe-ingredients');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRecipe();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function addRecipe() {
    const recipeName = recipeNameInput.value.trim();
    const recipeImage = recipeImageInput.value.trim();
    const recipeIngredients = recipeIngredientsInput.value.trim().split(',').map(ingredient => ingredient.trim());

    // Check if inputs are valid
    if (recipeName === "" || recipeImage === "" || recipeIngredients.length === 0) {
        alert("Please fill in all fields to add a recipe.");
        return;
    }

    const newRecipe = {
        label: recipeName,
        image: recipeImage,
        ingredientLines: recipeIngredients,
        url: '#' // No URL for added recipes
    };

    displayRecipes([{ recipe: newRecipe }], true);

    // Clear the form inputs after adding the recipe
    recipeNameInput.value = '';
    recipeImageInput.value = '';
    recipeIngredientsInput.value = '';
}

function displayRecipes(recipes, isAppend = false) {
    let html = '';
    recipes.forEach(item => {
        const recipe = item.recipe;
        html += `
        <div class="recipe">
            <img src="${recipe.image}" alt="${recipe.label}"/>
            <h3>${recipe.label}</h3>
            <ul>
                ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
            <button class="delete-btn" onclick="deleteRecipe(this)">Delete Recipe</button>
        </div>
        `;
    });

    if (isAppend) {
        resultsList.innerHTML += html;
    } else {
        resultsList.innerHTML = html;
    }
}

function deleteRecipe(element) {
    element.parentElement.remove();
}
