class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      name: document.querySelector(".form__input_type_name").textContent,
      aboutMe: document.querySelector(".form__input_type_about-me").textContent,
    };
  }

  setUserInfo(name, job) {
    document.querySelector(".form__input_type_name").textContent = name;
    document.querySelector(".form__input_type_about-me").textContent = job;
  }
}

export default UserInfo;
