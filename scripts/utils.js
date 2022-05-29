export const previewModal = document.querySelector(".modal_type_preview");
export const popupImage = previewModal.querySelector(".modal__popup-image");
export const popupName = previewModal.querySelector(".modal__popup-name");
export const addForm = document.forms.addNewCard;

export function openModal(modal, validator) {
  console.log(validator);
  if (validator != null) {
    const inputList = Array.from(addForm.querySelectorAll(".form__input"));
    validator.resetValidation(inputList);
  }

  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("mousedown", handleMouseDown);
}

function handleKeyDown(evt) {
  const openedModal = document.querySelector(".modal_open");

  if (evt.key === "Escape" && openedModal) {
    closeModal(openedModal);
  }
}

function handleMouseDown(evt) {
  const openedModal = document.querySelector(".modal_open");
  if (evt.target.classList.contains("modal_open")) {
    closeModal(openedModal);
  }
}
