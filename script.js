const searchField = document.querySelector('.meal-search-field');
const searchBtn = document.querySelector('.meal-search-btn');
const resultHeading = document.querySelector('.result-heading');
const mealResults = document.querySelector('.meal-result');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalContent = document.querySelector('.modal-content');

searchBtn.addEventListener('click', () => {
    getMeals();
});

mealResults.addEventListener('click', getRecipe);

modalCloseBtn.addEventListener('click', () => {
    modalContent.parentElement.style.display = 'none';
});

function getMeals(){
    let searchInput = searchField.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        let htmlData = "";
        if(data.meals){
            data.meals.forEach(meal => {
                htmlData += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-image-box">
                        <img class="meal-image" src="${meal.strMealThumb}" alt="Meal Image">
                    </div>
                    <div class="meal-text-box">
                        <h3 class="meal-name">${meal.strMeal}</h3>
                        <a href="#" class="meal-btn">See Details</a>
                    </div>
                </div>
                `;
            });
            mealResults.classList.add('meal-result');
            mealResults.classList.remove('result-msg');

        } else {
            htmlData = `Sorry! We Couldn't find any meals with that ingredient.<br>Please try again</h2>`;
            mealResults.classList.add('result-msg');
            mealResults.classList.remove('meal-result');
        }

        mealResults.innerHTML = htmlData;
    })
}


function getRecipe(e){
    e.preventDefault();
    // console.log(e.target)
    if(e.target.classList.contains('meal-btn')){
        let meal = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.dataset.id}`).then(response => response.json()).then(data => openModal(data.meals));
    }
}


function openModal(meal){
    meal = meal[0];
    let htmlData = `

            <h3 class="modal-heading">${meal.strMeal}</h3>
            <p class="modal-category">Category: ${meal.strCategory}</p>
            <div class="modal-instructions">
                <h4 class="instructions-heading">Instructions</h4>
                <p class="instructions">${meal.strInstructions}</p>
            </div>
            <div class="modal-image-box">
                <img src="${meal.strMealThumb}" alt="Meal Image" class="modal-image">
            </div>
            <a href="${meal.strYoutube}" class="modal-video" target="_blank">Watch Video</a>
            <a href="${meal.strSource}" class="modal-source" target="_blank">Recipe Source</a>
    `;
    modalContent.innerHTML = htmlData;
    modalContent.parentElement.style.display = 'block';
}