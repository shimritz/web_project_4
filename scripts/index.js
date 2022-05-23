import FormValidator from "./FormValidator.js";
import { initialCards } from "./cards.js";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  errorClass: "form__error_visible",
};

// Modals
const addCardModal = document.querySelector(".modal_type_add-card");
const previewModal = document.querySelector(".modal_type_preview");
const profileModal = document.querySelector(".modal_type_profile");

//creating instances
const editFormValidator = new FormValidator(settings, profileModal);
const addFormValidator = new FormValidator(settings, addCardModal);

//calling the methods from th instance
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// buttons and other elements
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const openModalButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = document.querySelector(
  ".modal__close-btn_profile"
);
const addCardModalCloseButton = document.querySelector(
  ".modal__close-btn_add-card"
);
const addCardButton = document.querySelector(".profile__add-button");
const previewModalCloseButton = document.querySelector(
  ".modal__close-btn_preview"
);
const popupImage = previewModal.querySelector(".modal__popup-image");
const popupName = previewModal.querySelector(".modal__popup-name");

// forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;
const addForm = document.forms.addNewCard;
const addFormTitleInput = addForm.elements.title;
const addFormImageInput = addForm.elements.image;

// wrappers
const cardsList = document.querySelector(".photos");

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("mousedown", handleMouseDown);
}

function handleKeyDown(evt) {
  const openedModal = document.querySelector(".modal_open");

  if (evt.key === "Escape" && openedModal) {
    closeModal(openedModal);
  }
}

function handleMouseDown(evt) {
  const openedModal = document.querySelector(".modal_open");
  if (evt.target.classList.contains("modal_open")) {
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("mousedown", handleMouseDown);
}

function createCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__bin-btn");
  cardImage.src = card.link;
  // cardImage.alt = "A beautiful view of " + card.name;
  cardImage.alt = `A beautiful view of ${card.name}`;
  cardTitle.textContent = card.name;

  cardLikeButton.addEventListener("click", toggleLikeButton);
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", function () {
    popupImage.src = card.link;
    popupImage.alt = `A beautiful view of ${card.name}`;
    popupName.textContent = card.name;
    openModal(previewModal);
  });

  return cardElement;
}

function toggleLikeButton(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("card__like-btn_type_selected");
}

function deleteCard(card) {
  cardsList.removeChild(card);
}

function renderCard(card, wrapper) {
  const cardElement = createCardElement(card);
  wrapper.prepend(cardElement);
}

function openEditForm() {
  profileFormNameInput.value = profileName.textContent;
  profileFormAboutMeInput.value = profileAboutMe.textContent;

  openModal(profileModal);
}

// listeners
profileForm.addEventListener("submit", function (event) {
  profileName.textContent = profileFormNameInput.value;
  profileAboutMe.textContent = profileFormAboutMeInput.value;
  closeModal(profileModal);
  event.preventDefault();
});

addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const card = {
    name: addFormTitleInput.value,
    link: addFormImageInput.value,
  };
  renderCard(card, cardsList);
  closeModal(addCardModal);
  addForm.reset();
});

openModalButton.addEventListener("click", openEditForm);

profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileModal);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
initialCards.forEach((card) => renderCard(card, cardsList));
