import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open(text, link) {
    const imageElement = this._popupElement.querySelector(
      ".modal__popup-image"
    );
    const captionElement =
      this._popupElement.querySelector(".modal__popup-name");

    imageElement.src = link;
    imageElement.alt = `Photo of ${text}`;
    captionElement.textContent = text;

    super.open();
  }
}

export default PopupWithImage;
