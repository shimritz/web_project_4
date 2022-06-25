class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closePopupOnRemoteClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);

    this._popupElement.addEventListener(
      "mousedown",
      this._closePopupOnRemoteClick
    );
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);

    this._popupElement.removeEventListener(
      "mousedown",
      this._closePopupOnRemoteClick
    );
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
