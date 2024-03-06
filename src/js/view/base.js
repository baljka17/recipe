export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultDiv: document.querySelector(".results"),
  searchResultList: document.querySelector(".results"),
  pageButtons: document.querySelector(".pagination"),
  recipeDiv: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".bookmarks__list"),
  likesMenu: document.querySelector(".bookmarks__list"),
  likesList: document.querySelector(".bookmarks__list"),
};

export const elementStrings = {
  loader: "spinner",
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);

  if (loader) loader.parentElement.removeChild(loader);
};

export const renderLoader = (parent) => {
  const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="image/icons.svg#icon-loader"></use>
            </svg>
        </div>
    `;

  parent.insertAdjacentHTML("afterbegin", loader);
};
