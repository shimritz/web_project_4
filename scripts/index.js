import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./utils.js";

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
export const editFormValidator = new FormValidator(settings, profileModal);
export const addFormValidator = new FormValidator(settings, addCardModal);

//calling the methods from the instance
editFormValidator.enableValidation();

addFormValidator.enableValidation();
// addFormValidator.resetValidation();

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

// forms
const addForm = document.forms.addNewCard;
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;
const addFormTitleInput = addForm.elements.title;
const addFormImageInput = addForm.elements.image;

// wrappers
const cardsList = document.querySelector(".photos");

const cardTemplateSelector = "#card-template";

function renderCard(card, wrapper) {
  const cardElement = new Card(card, cardTemplateSelector);
  wrapper.prepend(cardElement.getCardElement());
}

function openEditForm() {
  const inputList = Array.from(
    profileForm.querySelectorAll(settings.inputSelector)
  );
  profileFormNameInput.value = profileName.textContent;
  profileFormAboutMeInput.value = profileAboutMe.textContent;

  openModal(profileModal, editFormValidator);
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
  openModal(addCardModal, addFormValidator);
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
