class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError = (input) => {
    const { errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);

    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError = (input) => {
    const { errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  };

  _checkInputValidity = (input, settings) => {
    if (input.validity.valid) {
      this._hideInputError(input, this._formElement, settings);
    } else {
      this._showInputError(input, this._formElement, settings);
    }
  };

  _setEventListeners = () => {
    const { inputSelector, submitButtonSelector } = this._settings;
    const inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input, this._settings);
        this._toggleButtonState(inputList); //???????
      });
    });
  };

  _checkIfFormValid = (inputList) =>
    inputList.every((input) => input.validity.valid);

  _toggleButtonState = (inputList) => {
    const { submitButtonSelector, inputSelector, inactiveButtonClass } =
      this._settings;

    const button = this._formElement.querySelector(submitButtonSelector);
    inputList = Array.from(this._formElement.querySelectorAll(inputSelector));

    const isValid = this._checkIfFormValid(inputList);

    if (isValid) {
      button.disabled = false;
      button.classList.remove(inactiveButtonClass);
    } else {
      button.disabled = true;
      button.classList.add(inactiveButtonClass);
    }
  };

  enableValidation(settings) {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
