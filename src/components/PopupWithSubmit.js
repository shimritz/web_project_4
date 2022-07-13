import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  setAction(action) {
    this._handleSubmit = action;
    this._form = this._popupElement.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__submit");
  }

  changeButtonText(textType) {
    if (textType === "saving") {
      this._submitButton.textContent = "saving...";
    }
    if (textType === "initial") {
      this._submitButton.textContent = "Delete";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}

export default PopupWithSubmit;
