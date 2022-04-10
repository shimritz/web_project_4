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

const openModalButton = document.querySelector(".profile__edit-button");
const closeModalButton = document.querySelector(".modal__close-btn");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal__container");


const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

//forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;

//wrappers
const cardsList = document.querySelector(".photos");

// function createCardElement()
function handleProfileFormSubmit() {
    profileFormNameInput.value = profileName.textContent;
    profileFormAboutMeInput.value = profileAboutMe.textContent;
    modal.classList.add("modal_open");
}

function closeModal() {
     modal.classList.remove("modal_open");
}

profileForm.addEventListener('submit', function (event) {
    profileName.textContent = profileFormNameInput.value;
    profileAboutMe.textContent = profileFormAboutMeInput.value;
    closeModal();
    event.preventDefault();
})

openModalButton.addEventListener('click', handleProfileFormSubmit);
closeModalButton.addEventListener('click', closeModal)

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
initialCards.forEach(card => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__name");


    cardImage.src = card.link;
    cardTitle.textContent = card.name;

    cardsList.appendChild(cardElement);
})
