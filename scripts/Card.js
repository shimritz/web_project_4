import { previewModal, popupImage, popupName, openModal } from "./utils.js";

export class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    console.log("should be card name and link here", name, link);
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCardElement = () => {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__name").textContent = this._name;

    this._setEventListener();

    return this._cardElement;
  };

  _setEventListener() {
    this._cardElement
      .querySelector(".card__like-btn")
      .addEventListener("click", (evt) => this._toggleLikeButton(evt));
    this._cardElement
      .querySelector(".card__bin-btn")
      .addEventListener("click", () => this._deleteCard());
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
  }

  _toggleLikeButton(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("card__like-btn_type_selected");
  }

  _deleteCard = () => this._cardElement.remove();

  // _popUpImage = () => {
  //   popupImage.src = this._link;
  //   popupImage.alt = `A beautiful view of ${this._name}`;
  //   popupName.textContent = this._name;
  //   openModal(previewModal);
  // };
}
