const showInputError = (input, formElement, { errorClass }) => {
  const errorSpan = formElement.querySelector(`#${input.id}-error`);
  //add error message/class
  errorSpan.textContent = input.validationMessage;
  input.classList.add(errorClass);
};

const hideInputError = (input, formElement, { errorClass }) => {
  const errorSpan = formElement.querySelector(`#${input.id}-error`);
  //remove error message/class
  errorSpan.textContent = "";
  input.classList.remove(errorClass);
};

const checkInputValidity = (formElement, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formElement, settings);
  } else {
    showInputError(input, formElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formElement, input, settings);
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
  inputErrorClass: "form__input_type_error", //name of the span ???
  errorClass: "form__error_visible", //????
});
