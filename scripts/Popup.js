import UserInfo from "./UserInfo";
class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(
      "_popupElement",
      this._popupElement,
      "popupSelector",
      popupSelector
    );
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    if (this._popupElement.classList.contains("modal_type_profile")) {
      const existingUser = UserInfo.getUserInfo();

      document.querySelector(".form__input_type_name").value =
        existingUser.name;
      document.querySelector(".form__input_type_about-me").value =
        existingUser.aboutMe;
    }

    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close-btn")
      .addEventListener("click", () => {
        this.close();
      });
  }
}

export default Popup;
