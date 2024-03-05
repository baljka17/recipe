import { elements } from "./base";
const renderNairlaga = (orts) => `
    <li class="recipe__item recipe__ingredient">
        <svg class="recipe__icon">
            <use href="image/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__ingredient">

            ${orts}
        </div>
    </li>
`;

export const highlightSelectedRecipe = (id) => {
  const arr = Array.from(document.querySelectorAll(".results__link"));
  arr.forEach((el) => el.classList.remove("results__link--active"));

  const domObj = document.querySelector(`.results__link[href*="${id}"]`);

  if (domObj) domObj.classList.add("results__link--active");
};

export const clearRecipe = () => {
  // Одоо дэлгэц дээр харагдаж байгаа жорыг арилгана
  elements.recipeDiv.innerHTML = "";
};

export const renderRecipe = (recipe, isLiked) => {
  // Энэ жорыг дэлгэцэнд гаргаж үзүүлнэ.
  const html = `
    <figure class="recipe__fig">
        <img src="${recipe.image_url}" alt="${
    recipe.title
  }" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
        </figure>
        <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="image/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.time
            }</span>
            <span class="recipe__info-text"> минут </span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="image/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.huniiToo
            }</span>
            <span class="recipe__info-text"> хүний орц</span>

            <div class="recipe__info-buttons">
                <button class="btn--tiny btn--update-servings">
                    <svg>
                        <use href="image/icons.svg#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="btn--tiny btn--update-servings">
                    <svg>
                        <use href="image/icons.svg#icon-plus-circle"></use>
                    </svg>
                </button>
            </div>

        </div>
        <div class="recipe__love recipe__user-generated">
            <svg class="header__likes">
                <use href="image/icons.svg#icon-user"></use>
            </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="image/icons.svg#icon-bookmark"></use>
          </svg>
        </button>
        </div>

        <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
          
            ${recipe.ingredients
              .map((el) => renderNairlaga(el))
              .join(" ")}          

        </ul>

        <button class="btn-small recipe__btn hidden">
            <svg class="search__icon">
                <use href="image/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>САГСАНД ХИЙХ</span>
        </button>
        </div>

        <div class="recipe__directions">
        <h2 class="heading-2 heading--2">Хэрхэн бэлтгэх вэ</h2>
        <p class="recipe__directions-text">
            Жорыг бэлтгэж оруулсан
            <span class="recipe__by">${
              recipe.publisher
            }</span>. Манай вэб сайтаас жорын зааврыг авна уу
        </p>
        <a class="btn--small recipe__btn btn-small recipe__btn" href="${
          recipe.source_url
        }" target="_blank">
            <span>ЗААВАР ҮЗЭХ</span>
            <svg class="search__icon">
                <use href="image/icons.svg#icon-arrow-right"></use>
            </svg>

        </a>
        </div>
  `;

  elements.recipeDiv.insertAdjacentHTML("afterbegin", html);
};
