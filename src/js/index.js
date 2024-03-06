import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe } from "./view/renderRecipe";
import List from "./model/List";
import Like from "./model/Like";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";

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

// window.addEventListener("hashchange", controlRecipe);
["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

window.addEventListener("load", (e) => {
  // Шинээр лайк моделийг апп дөнгөж ачаалагдахад үүсгэнэ.
  if (!state.likes) state.likes = new Like();

  // Лайк цэсийг гаргах эсэхийг шийдэх
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

  // Лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна.
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

/**
 * Like контроллер
 */
const controlLike = () => {
  // 1) Лайкийн моделийг үүсгэнэ.
  if (!state.likes) state.likes = new Like();

  // 2) Одоо харагдаж байгаа жорын ID-ийг олж авах
  const currentRecipeId = state.recipe.id;

  // 3) Энэ жорыг лайкласан эсэхийг шалгах
  if (state.likes.isLiked(currentRecipeId)) {
    // Лайкласан бол лайкийг нь болиулна
    state.likes.deleteLike(currentRecipeId);
    // Лайкын цэснээс устгана
    likesView.deleteLike(currentRecipeId);

    // Лайк товчны лайкласан байдлыг болиулах
    likesView.toggleLikeBtn(false);
  } else {
    // Лайклаагүй бол лайклана.
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );

    // Лайк цэсэнд энэ лайкыг оруулах
    likesView.renderLike(newLike);

    // Лайк товчны лайкласан байдлыг лайкласан болгох
    likesView.toggleLikeBtn(true);
  }

  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".btn--bookmark, .btn--bookmark *")) {
    controlLike();
  }
});

/**
 * Найрлаганы контроллер
 */

const controlList = () => {
  // Найрлаганы моделийг үүсгэнэ
  state.list = new List();

  // Өмнө харагдаж байсан найрлагануудыг дэлгэцээс зайлуулна.
  listView.clearItems();

  // Уг модел рүү одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
  state.recipe.ingredients.forEach((n) => {
    // Тухайн найрлагыг модел рүү хийнэ.
    const item = state.list.addItem(n);

    // Тухайн найрлагыг дэлгэцэнд гаргана.
    // listView.renderItem(item);
  });
};

elements.shoppingList.addEventListener("click", (e) => {
  // Клик хийсэн li элементийн data-itemid аттрибутыг шүүж гаргаж авах
  const id = e.target.closest(".bookmarks__list").dataset.itemid;

  // Олдсон ID-тэй орцыг моделоос устгана.
  state.list.deleteItem(id);

  // Дэлгэцээс ийм ID-тэй орцыг олж бас устгана.
  listView.deleteItem(id);
});
