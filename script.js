const searchField = document.querySelector('.meal-search-field');
const searchBtn = document.querySelector('.meal-search-btn');
const mealResults = document.querySelector('.meal-result');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalContent = document.querySelector('.modal-content');

searchBtn.addEventListener('click', () => {
    getMeals();
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
                <div class="meal-item">
                    <div class="meal-image-box">
                        <img class="meal-image" src="${meal.strMealThumb}" alt="Meal Image">
                    </div>
                    <div class="meal-text-box">
                        <h3 class="meal-name">${meal.strMeal}</h3>
                        <a href="#" class="meal-btn">See Details</a>
                    </div>
                </div>
                `;
            })
        }

        mealResults.innerHTML = htmlData;
    })
}

// function getMeals(){
//     let searchInput = searchField.value.trim();
//     fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`).then(response => response.json()).then(data => {console.log(data)})
// }