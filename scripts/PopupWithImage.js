import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open(link, text) {
    const imageElement = this._popupElement.querySelector(
      ".modal__popup-image"
    );
    const captionElement =
      this._popupElement.querySelector(".modal__popup-name");
    imageElement.src = link;
    captionElement.textContent = text;

    super.open();
  }
}

export default PopupWithImage;