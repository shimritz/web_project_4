import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleSubmit,
    resetValidation,
    disableSubmitButton
  ) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(".form");
    this._resetValidation = resetValidation;
    this._disableSubmitButton = disableSubmitButton;
    this._formInputs = [...this._popupElement.querySelectorAll(".form__input")];
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._resetValidation();
  }

  open() {
    super.open();
    this._disableSubmitButton();
  }

  changeButtonText(textType) {
    if (textType === "saving") {
      this._submitButton.textContent = "saving...";
    }
    if (textType === "initial") {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

export default PopupWithForm;
