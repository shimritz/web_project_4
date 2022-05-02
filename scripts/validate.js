const showInputError = (input, formElement, { errorClass }) => {
  const errorSpan = formElement.querySelector(`#${input.id}-error`);
  //add error message/class
  errorSpan.textContent = input.validationMessage;
  errorSpan.classList.add(errorClass);
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

const hasValidInputs = (inputList) => {
  return inputList.every((input) => input.validity.valid === true);
};

const toggleButton = (inputList, button, settings) => {
  if (hasValidInputs(inputList)) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formElement, input, settings);
      toggleButton(inputList, submitButton, settings);
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
  inactiveButtonClass: "form__button_disabled",
  //   inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});
