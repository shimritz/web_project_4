export class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeIcon
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;

    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likesAmount = this._likes.length;
    this._cardElement.querySelector(".card__likes-count").textContent =
      likesAmount;

    const cardIsLikedByCurrentUser = this.isLiked();

    if (cardIsLikedByCurrentUser) {
      this._cardElement
        .querySelector(".card__like-btn")
        .classList.toggle("card__like-btn_type_selected");
    }
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  getCardElement = () => {
    this._cardElement = this._getTemplate();

    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = `Photo of ${this._name}`;

    this._cardElement.querySelector(".card__name").textContent = this._name;
    this.setLikes(this._likes);

    this._setEventListener();

    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".card__bin-btn").style.display = "none";
    }

    return this._cardElement;
  };

  _setEventListener() {
    this._cardElement
      .querySelector(".card__like-btn")
      .addEventListener("click", () => this._handleLikeIcon());
    this._cardElement
      .querySelector(".card__bin-btn")
      .addEventListener("click", () => this._handleDeleteCard(this._id));
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  // _toggleLikeButton(evt) {
  //   const likeButton = evt.target;
  //   likeButton.classList.toggle("card__like-btn_type_selected");
  // }

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  getId() {
    return this._id;
  }
}
