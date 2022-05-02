// Modals
const addCardModal = document.querySelector(".modal_type_add-card");
const previewModal = document.querySelector(".modal_type_preview");
const profileModal = document.querySelector(".modal_type_profile");

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
let cardsList = document.querySelector(".photos");

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

function openModal(modal) {
  modal.classList.add("modal_open");
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      modal.classList.remove("modal_open");
    }
  });
}

function createCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__bin-btn");
  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  cardLikeButton.addEventListener("click", toggleLikeButton);
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", function () {
    popupImage.src = card.link;
    popupName.textContent = card.name;
    openModal(previewModal);
  });

  return cardElement;
}

function toggleLikeButton(evt) {
  const LikeButton = evt.target;
  LikeButton.classList.toggle("card__like-btn_type_selected");
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
  const card = {
    name: addFormTitleInput.value,
    link: addFormImageInput.value,
  };
  renderCard(card, cardsList);
  closeModal(addCardModal);
  addForm.reset();
  event.preventDefault();
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
