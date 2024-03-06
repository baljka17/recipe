import { elements } from "./base";

export const renderItem = (item) => {
  const html = `
    <li class="preview bookmarks__list shopping__item" data-itemid=${item.id}>
        <a class="preview__link" href="#${item.id}">
          <div class="preview__data">
            <h4 class="preview__title">${item.item}</h4>
            <p class="preview__publisher">Tasty Kitchen</p>
            <div class="preview__user-generated">
              <svg>
              <use href="image/icons.svg#icon-minus-circle"></use>
              </svg>
            </div>
          </div>
        </a>
    </li>
    `;

  elements.shoppingList.insertAdjacentHTML("beforeend", html);
};

export const clearItems = () => {
  elements.shoppingList.innerHTML = "";
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
