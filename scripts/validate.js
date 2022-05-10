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

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, settings);
      toggleButtonState(formElement, settings);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    toggleButtonState(formElement, settings);
  });
};

const enableValidation = (settings) => {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formElements.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const checkIfFormValid = (inputList) =>
  inputList.every((input) => input.validity.valid);

const toggleButtonState = (form, settings) => {
  const button = form.querySelector(settings.submitButtonSelector);
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));

  const isValid = checkIfFormValid(inputList);

  if (isValid) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  errorClass: "form__error_visible",
});
