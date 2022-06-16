class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  static getUserInfo() {
    return {
      name: document.querySelector(".profile__name").textContent,
      aboutMe: document.querySelector(".profile__about-me").textContent,
    };
  }

  setUserInfo() {
    document.querySelector(".profile__name").textContent = this._name;
    document.querySelector(".profile__about-me").textContent = this._job;
  }
}

export default UserInfo;
