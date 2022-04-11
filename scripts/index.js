const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//Modals
const addCardModal = document.querySelector(".modal_type_add-card")

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal__container");

//buttons 
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const openModalButton = document.querySelector(".profile__edit-button");
const closeModalButton = document.querySelector(".modal__close-btn_profile");
const addCardModalCloseButton = document.querySelector(".modal__close-btn_add-card");
const addCardButton = document.querySelector(".profile__add-button");

//forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;

//wrappers
const cardsList = document.querySelector(".photos");

//functions//

function createCardElement(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__name");
    cardImage.src = card.link;
    cardTitle.textContent = card.name;

    return cardElement;
}

function renderCard(card, wrapper) {
      const cardElement = createCardElement(card);
    wrapper.append(cardElement);
}


function handleProfileFormSubmit() {
    profileFormNameInput.value = profileName.textContent;
    profileFormAboutMeInput.value = profileAboutMe.textContent;
    modal.classList.add("modal_open");
}

function openAddForm() {

    modal.classList.add("modal_type_add-card_open");
}

function closeModal() {
     modal.classList.remove("_type_add-card_open");
}

profileForm.addEventListener('submit', function (event) {
    profileName.textContent = profileFormNameInput.value;
    profileAboutMe.textContent = profileFormAboutMeInput.value;
    closeModal();
    event.preventDefault();
})

openModalButton.addEventListener('click', handleProfileFormSubmit);
closeModalButton.addEventListener('click', closeModal);
// openModalButton.addEventListener('click', openAddFormSubmit);
addCardButton.addEventListener('click', openAddForm);

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
initialCards.forEach(card => renderCard(card, cardsList));
