class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  enableValidation() {}
}

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  errorClass: "form__error_visible",
};

//will be implemented in index.js
// const editFormValidator = new FormValidator(settings, editForm);
// const addFormValidator = new FormValidator(settings, addForm);
//editFormValidator.enableValidation();
