const showInputError = () => {};

const hideInputError = () => {};

const checkInputValidity = (input, settings) => {
  if (input.validity.valid) {
    hideInputError();
  } else {
    showInputError();
  }
};

const setEventListeners = (formElement, settings) => {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(input, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_disabled", // ???????
  inputErrorClass: "popup__input_type_error", //?????
  errorClass: "popup__error_visible",
});
