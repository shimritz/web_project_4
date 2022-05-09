const showInputError = (input, formElement, settings) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);

  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (input, formElement, settings) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (formElement, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formElement, settings);
  } else {
    showInputError(input, formElement, settings);
  }
};

const checkInputs = (inputList, button, settings) => {
  const isValidInputs = inputList.every(
    (input) => input.validity.valid === true
  );

  if (isValidInputs) {
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
  submitButton.classList.add(settings.inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, settings);
      checkInputs(inputList, submitButton, settings);
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
  errorClass: "form__error_visible",
});
