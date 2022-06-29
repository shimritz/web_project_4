class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(console.log);
  }

  // other methods for working with the API
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "eb6ecb60-6b2b-4de0-89d0-cf4bc28e2e2a",
    "Content-Type": "application/json",
  },
});
