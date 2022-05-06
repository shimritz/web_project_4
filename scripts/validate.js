const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",

  errorClass: "form__error_visible",
};

const showInputError = (input, formElement) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);

  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (input, formElement) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (formElement, input) => {
  if (input.validity.valid) {
    hideInputError(input, formElement);
  } else {
    showInputError(input, formElement);
  }
};

const checkInputs = (inputList, button) => {
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

const toggleButton = (button) => {
  button.disabled = !button.disabled;
  button.classList.add(settings.inactiveButtonClass);
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input);
      checkInputs(inputList, submitButton);
    });
  });
};

const enableValidation = () => {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement);
  });
};

enableValidation();
