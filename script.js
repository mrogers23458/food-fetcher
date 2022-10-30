const apiKey = "37d80fa3eddd4a9eacc113d000ed4d45";
const searchInputElement = document.getElementById("search");
const searchBtn = document.getElementById("btn");
const main = document.getElementById("main");

console.log({ searchInputElement, searchBtn });

function handleSearch() {
  const calorieInput = searchInputElement.value;
  console.log(calorieInput);
  if (calorieInput === "") {
    window.alert("please enter a value between 0-1500");
  }
  if (calorieInput !== "") {
    const searchUrl = `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${calorieInput}&apiKey=${apiKey}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        main.innerHTML = "";
        data.forEach((item) => {
          const recipeMarkup = createMarkUp(item);
          main.innerHTML += recipeMarkup;
        });
      });
  }
}

function createMarkUp(data) {
  const titleArray = data.title.split(" ");
  const titleUrl = titleArray.join("-");
  const id = data.id;
  const recipeUrl = `https://spoonacular.com/recipes/${titleUrl}-${id}`;
  const markup = `
    <div class="recipe container">
        <a class="link container" href=${recipeUrl}>
        <h1 class="title" >${data.title}</h1>
        <img class="image" src=${data.image}>
        </a>
    </div>
    `;

  return markup;
}

searchBtn.addEventListener("click", handleSearch);

/* <a href={ `https://spoonacular.com/recipes/${recipeName}-${recipeId}`} > Recipe Here </a> */
