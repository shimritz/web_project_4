import { previewModal, popupImage, popupName, openModal } from "./utils.js";

export class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListener() {
    this._cardElement
      .querySelector(".card__like-btn")
      .addEventListener("click", () => this._toggleLikeButton);
    this._cardElement
      .querySelector(".card__bin-btn")
      .addEventListener("click", () => this._deleteCard(cardElement));
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", function () {
        popupImage.src = this._link;
        popupImage.alt = `A beautiful view of ${this._name}`;
        popupName.textContent = this._name;
        openModal(previewModal);
      });
  }

  _toggleLikeButton(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("card__like-btn_type_selected");
  }

  _deleteCard = () => this.cardElement.remove();

  //   _toggleLikeButton = (evt) =>
  //     evt.target.classList.toggle("card__like-btn_type_selected");

  _getTemplate() {
    return document
      .querySelector("#card-template")
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
}

//     const cardImage = this._cardElement.querySelector(".card__image");
//     const cardTitle = this._cardElement.querySelector(".card__name");
//     const cardLikeButton = this._cardElement.querySelector(".card__like-btn");
//     const cardDeleteButton = this._cardElement.querySelector(".card__bin-btn");

//     cardImage.src = `url(${this._link})`;
//     cardTitle.textContent = this._name;

//     cardLikeButton.addEventListener("click", this._toggleLikeButton);
//     cardDeleteButton.addEventListener("click", () =>
//       this._deleteCard(cardElement)
//     );
//     cardImage.addEventListener("click", function () {
//       cardImage.src = this._link;
//       cardImage.alt = `A beautiful view of ${this._name}`;
//       cardTitle.textContent = this._name;
//       openModal(previewModal);
//     });
//     return this._cardElement;
//   };
// }
