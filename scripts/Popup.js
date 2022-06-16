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

  open = () => {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  };
  close = () => {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close-btn")
      .addEventListener("click", () => {
        this.close();
      });

    // this._popupElement.addEventListener("click", (evt) => {
    //   if(!evt.target.closest("modal__container"))
    // })
  }
}

export default Popup;
