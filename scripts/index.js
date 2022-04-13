const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//Modals
const addCardModal = document.querySelector(".modal_type_add-card");
const previewModal = document.querySelector(".modal_type_preview");
const profileModal = document.querySelector(".modal_type_profile");
const modalContainer = document.querySelector(".modal__container");

//buttons
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const openModalButton = document.querySelector(".profile__edit-button");
const closeModalButton = document.querySelector(".modal__close-btn_profile");
const addCardModalCloseButton = document.querySelector(
  ".modal__close-btn_add-card"
);
const addCardButton = document.querySelector(".profile__add-button");
const previewModalCloseButton = document.querySelector(
  ".modal__close-btn_preview"
);
const cardTitle = document.querySelector(".form__input_type_name");
const cardImage = document.querySelector(".form__input_type_image");

//forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;
const addForm = document.forms.addNewCard;
const addFormTitleInput = addForm.elements.title;
const addFormImageInput = addForm.elements.image;

//wrappers
let cardsList = document.querySelector(".photos");

//functions//

function createCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__bin-btn");
  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  cardLikeButton.addEventListener("click", activateLikeButton);
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", function () {
    const popupImage = previewModal.querySelector(".modal__popup-image");
    popupImage.src = card.link;
    previewModal.classList.add("modal_open");
  });

  return cardElement;
}

const activateLikeButton = (evt) => {
  const LikeButton = evt.target;
  LikeButton.classList.toggle("card__like-btn_type_selected");
};

const deleteCard = (card) => {
  cardsList.removeChild(card);
};

function renderCard(card, wrapper) {
  const cardElement = createCardElement(card);
  wrapper.append(cardElement);
}

function openEditForm() {
  profileFormNameInput.value = profileName.textContent;
  profileFormAboutMeInput.value = profileAboutMe.textContent;
  profileModal.classList.add("modal_open");
}

function openAddForm() {
  addCardModal.classList.add("modal_type_add-card_open");
}

function closeModal() {
  addCardModal.classList.remove("modal_type_add-card_open");
  profileModal.classList.remove("modal_open");
  previewModal.classList.remove("modal_open");
}

//event listeners//

profileForm.addEventListener("submit", function (event) {
  profileName.textContent = profileFormNameInput.value;
  profileAboutMe.textContent = profileFormAboutMeInput.value;
  closeModal();
  event.preventDefault();
});

addForm.addEventListener("submit", function (event) {
  let card = {
    name: addFormTitleInput.value,
    link: addFormImageInput.value,
  };
  let newCard = createCardElement(card);
  cardsList.prepend(newCard);
  closeModal();
  event.preventDefault();
});

openModalButton.addEventListener("click", openEditForm);
closeModalButton.addEventListener("click", closeModal);

addCardButton.addEventListener("click", openAddForm);
addCardModalCloseButton.addEventListener("click", closeModal);

previewModalCloseButton.addEventListener("click", closeModal);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
initialCards.forEach((card) => renderCard(card, cardsList));
