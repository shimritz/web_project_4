class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );
    this._inactiveButton = settings.inactiveButtonClass;
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
      this._showInputError(input);
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input, this._settings);
        this._toggleButtonState(this._inputList);
      });
    });
  };

  _checkIfFormValid = () =>
    this._inputList.every((input) => input.validity.valid);

  _disableButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButton);
  }

  _toggleButtonState = () => {
    const isValid = this._checkIfFormValid();

    if (isValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButton);
    } else {
      this._disableButton();
    }
  };

  disableSubmitButton = () => {
    this._disableButton();
  };

  resetValidation = () => {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
