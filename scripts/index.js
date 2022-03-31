const openModalButton = document.querySelector(".profile__edit-button");
const closeModalButton = document.querySelector(".modal__close-btn");
const modal = document.querySelector(".modal");
const modal__container = document.querySelector(".modal__container");


const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

//forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;


function handleProfileFormSubmit() {
    profileFormNameInput.value = profileName.textContent;
    profileFormAboutMeInput.value = profileAboutMe.textContent;
    modal__container.classList.add("modal__container-open");
    modal.classList.add("modal__open");
}

profileForm.addEventListener('submit', function (event) {
    profileName.textContent = profileFormNameInput.value;
    profileAboutMe.textContent = profileFormAboutMeInput.value;
        modal__container.classList.remove("modal__container-open");
    modal.classList.remove("modal__open");
    event.preventDefault();
})

openModalButton.addEventListener('click', handleProfileFormSubmit);

function closeModal() {
    modal__container.classList.remove("modal__container-open");
     modal.classList.remove("modal__open");
}
closeModalButton.addEventListener('click', closeModal)
