const openModalButton = document.querySelector(".profile__edit-button");
const closeModalButton = document.querySelector(".modal__close-btn");
const saveModalButton = document.querySelector(".modal__form-submit");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//forms
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

// profileFormNameInput.addEventListener("input", function(event) {
//     const inputValue = event.target.value;
//     profileName.textContent = inputValue;
// })

profileForm.addEventListener('submit', function (event) {
    profileName.textContent = profileFormNameInput.value;
    profileOccupation.textContent = profileFormOccupationInput.value;
    modal.style.display = "none";
    overlay.style.display = "none";
    event.preventDefault();
})

openModalButton.addEventListener('click', function (event) {
    modal.style.display = "flex";
    overlay.style.display = "block";
});

closeModalButton.addEventListener('click', function (event) {
    modal.style.display = "none";
    overlay.style.display = "none";
});
