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

// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       render(data, wrapper) {
//         wrapper.prepend(data);
//       };
//     },
//   },
//   wrapper
// );

// section.renderItems();

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
    // const cardElement = new Card(card, cardTemplateSelector, () => {
    //   imagepopup.open(card.name, card.link);
    // });

    section.addItem(cardElement.getCardElement());
  }

  // (data) => {
  //   const cardList = new Section({
  //     items: initialCards,
  //     renderer: (data) => {
  //       const card = new Card({ data });
  //     },
  //   });
  // const card = {
  //   name: addFormTitleInput.value,
  //   link: addFormImageInput.value,
  // };
  // return card;
  // }
);
addCardpopupWithForm.setEventListeners();

// popupWithImage
const imagepopup = new PopupWithImage(".modal_type_preview");
imagepopup.setEventListeners();

// function handleImagePreview(name, link) {
//   imagepopup.open(name, link);
// }

// addForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const card = {
//     name: addFormTitleInput.value,
//     link: addFormImageInput.value,
//   };
//   renderCard(card, cardsList);
//   closeModal(addCardModal);
//   addForm.reset();
// });
const renderCard = (data, wrapper) => {
  //   console.log("cardX", card);
  //   console.log("wrapperX", wrapper);
  // const cardElement =
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

// function openEditForm() {
//   const inputList = Array.from(
//     profileForm.querySelectorAll(settings.inputSelector)
//   );
//   profileFormNameInput.value = profileName.textContent;
//   profileFormAboutMeInput.value = profileAboutMe.textContent;

//   openModal(profileModal, editFormValidator);
// }

// listeners
// profileForm.addEventListener("submit", function (event) {
//   profileName.textContent = profileFormNameInput.value;
//   profileAboutMe.textContent = profileFormAboutMeInput.value;
//   closeModal(profileModal);
//   event.preventDefault();
// });

// addForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const card = {
//     name: addFormTitleInput.value,
//     link: addFormImageInput.value,
//   };
//   renderCard(card, cardsList);
//   closeModal(addCardModal);
//   addForm.reset();
// });

openModalButton.addEventListener("click", () => editModal.open());

profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileModal);
  // profileModal.close();
});

// addCardButton.addEventListener("click", () => {
//   openModal(addCardModal, addFormValidator);
// });

addCardButton.addEventListener("click", () => {
  addCardpopupWithForm.open();
});

addCardModalCloseButton.addEventListener("click", () => {
  addCardpopupWithForm.close();
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

// const cardTemplate = document
//   .querySelector("#card-template")
//   .content.querySelector(".card");
// initialCards.forEach((card) => renderCard(card, cardsList));
