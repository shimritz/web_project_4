import "./index.css";

import avatarSrc from "../images/profile_photo-image(1).jpg";
import profileLogoSrc from "../images/Vectorlogo.svg";

import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../cards.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithSubmit from "../components/PopupWithSubmit";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import { api } from "../components/Api";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  errorClass: "form__error_visible",
};

const profileAvatar = document.querySelector(".profile__avatar");
const headerLogo = document.querySelector(".header__logo");
profileAvatar.src = avatarSrc;
headerLogo.src = profileLogoSrc;

// Modals
const addCardModal = document.querySelector(".modal_type_add-card");
const profileModal = document.querySelector(".modal_type_profile");

// creating instances
export const editFormValidator = new FormValidator(settings, profileModal);
export const addFormValidator = new FormValidator(settings, addCardModal);

// calling the methods from the instance
editFormValidator.enableValidation();

addFormValidator.enableValidation();

// buttons and other elements
const openModalButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

// wrappers
const cardTemplateSelector = "#card-template";

// api.getInitialCards().then((res) => {
//   section.renderItems(res);
//   // console.log("res", res);
// });

// api.getUserInfo().then((res) => {
//   userInfo.setUserInfo({ name: res.name, job: res.about });
//   console.log("user", res);
// });

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;

    section.renderItems(cardData);
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
  }
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me",
});

const editModal = new PopupWithForm(".modal_type_profile", (data) => {
  api
    .editProfile(data.name, data.aboutMe)
    .then((res) => {
      userInfo.setUserInfo({ name: data.name, job: data.aboutMe });
      console.log("res editProfile", res);
    })
    .catch(console.log);
});
editModal.setEventListeners();

// addCard
const addCardPopupWithForm = new PopupWithForm(
  ".modal_type_add-card",
  (data) => {
    console.log(data);
    api
      .createCard({
        name: data.title,
        link: data.image,
      })
      .then((res) => {
        console.log("popo", res);
        // renderCard({
        //   name: res.name,
        //   link: res.link,
        // });
        renderCard(res);
      })
      .catch((err) => console.log(err));

    addFormValidator.toggleSubmitButton();
  }
);
addCardPopupWithForm.setEventListeners();

const confirmModal = new PopupWithSubmit(".modal_type_delete-card");

confirmModal.setEventListeners();
// popupWithImage
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();

const renderCard = (data) => {
  userId = "8b04fa520deb372de9c336dd";
  const card = generateCard(data, userId);

  const cardElement = card.getCardElement();

  section.addItem(cardElement);
};

const generateCard = (data, userId) => {
  // console.log(data);
  const card = new Card(
    data,
    userId,
    cardTemplateSelector,
    () => imagePopup.open(data.name, data.link),
    (id) => {
      confirmModal.open();
      confirmModal.setAction(() => {
        api.deleteCard(id).then((res) => {
          //remove it from DOM
          console.log("card is deleted");
          card.deleteCard();
        });
      });
    }
  );
  return card;
};

// section
const section = new Section(
  {
    renderer: renderCard,
  },
  ".photos"
);

// section.renderItems();

const formInputName = document.querySelector(".form__input_type_name");
const formInputAboutMe = document.querySelector(".form__input_type_about-me");

openModalButton.addEventListener("click", () => {
  const existingUser = userInfo.getUserInfo();

  formInputName.value = existingUser.name;
  formInputAboutMe.value = existingUser.aboutMe;

  editModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopupWithForm.open();
});
