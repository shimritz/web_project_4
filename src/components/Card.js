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

    this._cardLikesCount = null;
    this._cardImage = null;
    this._cardLikesCount = null;
    this._cardName = null;
    this._cardBinButton = null;
    this._cardLikeButton = null;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likesAmount = this._likes.length;
    this._cardLikesCount.textContent = likesAmount;

    const cardIsLikedByCurrentUser = this.isLiked();

    if (cardIsLikedByCurrentUser) {
      this._cardLikeButton.classList.add("card__like-btn_type_selected");
    } else {
      this._cardLikeButton.classList.remove("card__like-btn_type_selected");
    }
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  getCardElement = () => {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;

    this._cardLikesCount =
      this._cardElement.querySelector(".card__likes-count");
    this._cardLikeButton = this._cardElement.querySelector(".card__like-btn");

    this._cardName = this._cardElement.querySelector(".card__name");
    this._cardName.textContent = this._name;
    this.setLikes(this._likes);

    this._cardBinButton = this._cardElement.querySelector(".card__bin-btn");
    if (this._ownerId !== this._userId) {
      this._cardBinButton.style.display = "none";
    }

    this._setEventListener();

    return this._cardElement;
  };

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  getId() {
    return this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListener() {
    this._cardLikeButton.addEventListener("click", () =>
      this._handleLikeIcon()
    );
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    if (this._ownerId === this._userId) {
      this._cardBinButton.addEventListener("click", () => {
        this._handleDeleteCard(this._id);
      });
    }
  }
}
