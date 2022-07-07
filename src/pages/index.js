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
const avatarEditModal = document.querySelector(".modal_type_avatar-change");

// creating instances
export const editFormValidator = new FormValidator(settings, profileModal);
export const addFormValidator = new FormValidator(settings, addCardModal);
export const avatarFormValidator = new FormValidator(settings, avatarEditModal);

// calling the methods from the instance
editFormValidator.enableValidation();

addFormValidator.enableValidation();

avatarFormValidator.enableValidation();
// buttons and other elements
const openModalButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

// wrappers
const cardTemplateSelector = "#card-template";

var userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;

    section.renderItems(cardData);
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    userInfo.getUserAvatar(userData.avatar);
  }
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me",
  avatarSelector: ".profile__avatar",
});

const editModal = new PopupWithForm(".modal_type_profile", (data) => {
  //initialText Loading

  editModal.changeButtonText("saving");
  api
    .editProfile(data.name, data.aboutMe)
    .then((res) => {
      userInfo.setUserInfo({ name: data.name, job: data.aboutMe });
      editModal.changeButtonText("initial");

      editModal.close();
    })
    .catch(console.log);
});
editModal.setEventListeners();

//edit avatar
const avatarChangeModal = new PopupWithForm(
  ".modal_type_avatar-change",
  (data) => {
    api.editAvatar(data.image).then((res) => {
      userInfo.getUserAvatar(res.avatar);
      avatarChangeModal.close();
    });
  }
);

avatarChangeModal.setEventListeners();

// addCard
const addCardPopupWithForm = new PopupWithForm(
  ".modal_type_add-card",
  (data) => {
    addCardPopupWithForm.changeButtonText("saving");
    api
      .createCard({
        name: data.title,
        link: data.image,
      })
      .then((res) => {
        renderCard(res);
        addCardPopupWithForm.changeButtonText("initial");
        addCardPopupWithForm.close();
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
        api.deleteCard(id).then(() => {
          //remove it from DOM
          console.log("card is deleted");
          card.deleteCard();
        });
      });
    },
    () => {
      if (!card.isLiked()) {
        api.addLike(card.getId()).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.removeLike(card.getId()).then((res) => {
          card.setLikes(res.likes);
        });
      }
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

profileAvatar.addEventListener("click", () => {
  avatarChangeModal.open();
});
