import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

const renderRecipe = (recipe) => {
  const markup = `
    <li class="preview">
        <a class="preview__link" href="#${recipe.recipe_id}">
            <figure class="preview__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated hidden">
                    <svg>
                    <use href="./image/icons.c781f215.svg#icon-user"></use>
                    </svg>
                </div>
            </div>
        </a>
    </li>
  `;
  // ul рүүгээ нэмнэ
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // Хайлтын үр дүнг хуудаслаж үзүүлэх
  //page  = 2, start = 10, end = 20
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // Хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

const createButton = (
  page,
  type,
  direction
) => `<button class="btn--inline pagination__btn--${type}" data-goto=${page}>
  <span>Хуудас ${page}</span>
  <svg class="search__icon">
    <use href="./image/icons.svg#icon-arrow-${direction}"></use>
  </svg>
  </button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудсан дээр байна, 2-р хуудас гэдэг товчийг гарга
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх болон дараачийн хуудас руу шилжих товчуудыг үзүүл
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудас дээр байна. Өмнөх рүү шилжүүлэх товчийг л үзүүлнэ.
    buttonHtml = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
