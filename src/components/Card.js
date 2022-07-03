export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _setLikes() {
    const likesAmount = this._likes.length;
    this._cardElement.querySelector(".card__likes-count").textContent =
      likesAmount;
  }

  getCardElement = () => {
    this._cardElement = this._getTemplate();

    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = `Photo of ${this._name}`;

    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._setLikes();

    this._setEventListener();

    return this._cardElement;
  };

  _setEventListener() {
    this._cardElement
      .querySelector(".card__like-btn")
      .addEventListener("click", (evt) => this._toggleLikeButton(evt));
    this._cardElement
      .querySelector(".card__bin-btn")
      .addEventListener("click", () => this._handleDeleteCard(this.id));
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _toggleLikeButton(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("card__like-btn_type_selected");
  }

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };
  // _handleDeleteCard = () => {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // };
}
