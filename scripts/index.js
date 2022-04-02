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
