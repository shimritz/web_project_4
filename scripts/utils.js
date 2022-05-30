export const previewModal = document.querySelector(".modal_type_preview");
export const popupImage = previewModal.querySelector(".modal__popup-image");
export const popupName = previewModal.querySelector(".modal__popup-name");

export function openModal(modal, validator) {
  if (validator != null) {
    const inputList = Array.from(modal.querySelectorAll(".form__input"));
    validator.resetValidation(inputList);
  }

  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("mousedown", handleMouseDown);
}

export function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("mousedown", handleMouseDown);
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
