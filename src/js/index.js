import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe } from "./view/renderRecipe";
const state = {};

/**
 * Search controller
 */
const controlSearch = async () => {
  // 1
  const query = searchView.getInput();

  if (query) {
    // 2
    state.search = new Search(query);

    // 3
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4
    await state.search.doSearch();

    // 5
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};
controlSearch();

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn--inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/**
 * Recipe controller
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  state.recipe = new Recipe(id);

  clearRecipe();

  await state.recipe.getRecipe();

  state.recipe.calcTime();
  state.recipe.calcHuniiToo();

  renderRecipe(state.recipe, false);
};

window.addEventListener("hashchange", controlRecipe);
window.location.href = base_url + "#54439";
