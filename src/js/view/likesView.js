import { elements } from "./base";

export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `image/icons.svg#${iconString}`);
};

export const toggleLikeMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

export const renderLike = (newLike) => {
  const html = `
      <li class="preview">
          <a class="preview__link likes__link" href="#${newLike.id}">
              <figure class="preview__fig likes__fig">
                  <img src="${newLike.img}" alt="Test">
              </figure>
              <div class="preview__data">
              <h4 class="preview__title">${newLike.title}</h4>
              <p class="preview__publisher">${newLike.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                <use href="image/icons.svg#icon-minus-circle"></use>
                </svg>
              </div>
            </div>
          </a>
      </li>
    `;

  elements.likesList.insertAdjacentHTML("beforeend", html);
};

export const deleteLike = (id) => {
  const li = document.querySelector(
    `.likes__link[href*="${id}"]`
  ).parentElement;
  if (li) li.parentElement.removeChild(li);
};
