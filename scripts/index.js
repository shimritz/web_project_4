const openModalButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");


openModalButton.addEventListener('click', function (event) {
    modal.style.display = "flex";
    overlay.style.display = "block";
});