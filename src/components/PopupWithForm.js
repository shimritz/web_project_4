import Popup from "./Popup.js";
import { settings } from "../utils/constants";
import FormValidator from "./FormValidator";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector); //calling the contructor of parent Popup
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(".form");
    this._validator = new FormValidator(settings, this._form);
    this._validator.enableValidation();
  }

  _getInputValues() {
    const inputs = [...this._popupElement.querySelectorAll(".form__input")];
    const inputValues = {};

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      // this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    this._validator.toggleSubmitButton();
  }

  changeButtonText(textType) {
    const button = this._form.querySelector(".form__submit");
    if (textType === "saving") {
      button.textContent = "saving...";
    }
    if (textType === "initial") {
      button.textContent = "save";
    }
  }
}

export default PopupWithForm;
