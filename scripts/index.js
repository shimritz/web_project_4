const openModalButton = document.querySelector(".profile__edit-button");
const closeModalButton = document.querySelector(".modal__close-btn");
const saveModalButton = document.querySelector(".modal__form-submit");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__aboutMe");

//forms
const profileForm = document.forms.profile;
// const profileForm = document.querySelector(".profile");
const profileFormNameInput = profileForm.elements.name;
const profileFormAboutMeInput = profileForm.elements.aboutMe;


function handleProfileFormSubmit() {
    profileFormNameInput.value = profileName.textContent;
    profileFormAboutMeInput.value = profileAboutMe.textContent;
     modal.style.display = "flex";
    overlay.style.display = "block";
}

profileForm.addEventListener('submit', function (event) {
    profileName.textContent = profileFormNameInput.value;
    profileAboutMe.textContent = profileFormAboutMeInput.value;
    modal.style.display = "none";
    overlay.style.display = "none";
    event.preventDefault();
})

openModalButton.addEventListener('click', handleProfileFormSubmit);


closeModalButton.addEventListener('click', function (event) {
    modal.style.display = "none";
    overlay.style.display = "none";
});
