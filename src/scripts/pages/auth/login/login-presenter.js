export class LoginPresenter {
  #model;
  #view;
  #authModel;

  constructor({ model, view, authModel }) {
    this.#model = model;
    this.#view = view;
    this.#authModel = authModel;
  }

  async getLogin({ email, password }) {
    try {
      this.#view.showSubmitLoadingButton();
      const response = await this.#model.getLogin({ email, password });

      if (!response.ok) {
        console.error('getLogin: response:', response);
        return;
      }

      this.#authModel.putAccessToken(response.loginResult.token);
      this.#view.loginSuccessfully(response.message);
      this.#view.hideSubmitLoadingButton();
    } catch (error) {
      console.error('getLogin: error:', error);
      this.#view.loginFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}