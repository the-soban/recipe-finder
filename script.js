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
        <svg class="modal-close-btn" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
        <div class="modal-content">
            <h3 class="modal-heading">Name Here</h3>
            <p class="modal-category">Category Here</p>
            <div class="modal-instructions">
                <h4 class="instructions-heading">Instructions</h4>
                <p class="instructions">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsa fugit nostrum dolorum illo itaque nemo voluptas omnis quisquam sequi asperiores ipsum veritatis enim consequuntur vel aspernatur, inventore, distinctio voluptatibus voluptate vitae alias, quia ipsam aperiam culpa. Aperiam nulla ea aliquam autem dicta similique voluptatem accusantium quis facere. Laboriosam a maiores quaerat aliquid illo quam ut, odio corrupti optio blanditiis rerum voluptates saepe tempore temporibus porro ratione velit, voluptas expedita.</p>
            </div>
            <div class="modal-image-box">
                <img src="./images/food.jpg" alt="Meal Image" class="modal-image">
            </div>
            <a href="#" class="modal-link" target="_blank">Watch Video</a>
        </div>
    `;
}