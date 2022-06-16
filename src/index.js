import "./styles/index.css";

import avatarSrc from "./images/profile_photo-image(1).jpg";
import profileLogoSrc from "./images/Vectorlogo.svg";

import { Card } from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards } from "../scripts/cards.js";
import { openModal, closeModal } from "../scripts/utils.js";
import PopupWithForm from "../scripts/PopupWithForm";
import PopupWithImage from "../scripts/PopupWithImage";
import UserInfo from "../scripts/UserInfo";
import Section from "../scripts/Section";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  errorClass: "form__error_visible",
};

const profile__avatar = document.querySelector(".profile__avatar");
const header_logo = document.querySelector(".header__logo");
profile__avatar.src = avatarSrc;
header_logo.src = profileLogoSrc;

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

// wrappers
const cardsList = document.querySelector(".photos");
console.log("shuld be card list", cardsList);

const cardTemplateSelector = "#card-template";

//editprofile
const editModal = new PopupWithForm(".modal_type_profile", (data) => {
  const profiledata = new UserInfo({
    name: data.name, //name
    job: data.aboutMe, //job
  });

  // profiledata.getUserInfo();
  profiledata.setUserInfo();
});
editModal.setEventListeners();

//addCard
const addCardpopupWithForm = new PopupWithForm(
  ".modal_type_add-card",
  // (cardData, cardsContainer) => renderCard(cardData, cardsContainer)
  (data) => {
    const cardElement = generateCard({
      name: data.title,
      link: data.image,
    });

    section.addItem(cardElement.getCardElement());
  }
);
addCardpopupWithForm.setEventListeners();

// popupWithImage
const imagepopup = new PopupWithImage(".modal_type_preview");
imagepopup.setEventListeners();

const renderCard = (data, wrapper) => {
  const card = generateCard(data);
  wrapper.prepend(card.getCardElement());
};

const generateCard = (data) => {
  console.log("data here", data);
  return new Card(data, cardTemplateSelector, (x, y) => {
    console.log("zzz-3", imagepopup);
    imagepopup.open(x, y);
  });
};

//section
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      renderCard(data, cardsList);
    },
  },
  ".photos"
);

section.renderItems();

openModalButton.addEventListener("click", () => editModal.open());

profileModalCloseButton.addEventListener("click", () => {
  editModal.close();
});

addCardButton.addEventListener("click", () => {
  addCardpopupWithForm.open();
});

addCardModalCloseButton.addEventListener("click", () => {
  addCardpopupWithForm.close();
});

previewModalCloseButton.addEventListener("click", () => {
  imagepopup.close();
});
