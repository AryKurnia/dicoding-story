
import * as DicodingStoryAPI from '../../../data/api';
import { LoginPresenter } from './login-presenter';
import * as LoginModel from '../../../utils/auth';

export default class LoginPage {
  #presenter;

  async render() {
    return `
        <section class="login-container">
        <article class="login-form-container">
          <h1 class="login__title">Masuk akun</h1>

          <form id="login-form" class="login-form">
            <div class="form-control">
              <label for="email-input" class="login-form__email-title">Email</label>

              <div class="login-form__title-container">
                <input id="email-input" type="email" name="email" placeholder="Contoh: nama@email.com">
              </div>
            </div>
            <div class="form-control">
              <label for="password-input" class="login-form__password-title">Password</label>

              <div class="login-form__title-container">
                <input id="password-input" type="password" name="password" placeholder="Masukkan password Anda">
              </div>
            </div>
            <div class="form-buttons login-form__form-buttons">
              <div id="submit-button-container">
                <button class="btn" type="submit">Masuk</button>
              </div>
              <p class="login-form__do-not-have-account">Belum punya akun? <a href="#/register">Daftar</a></p>
            </div>
          </form>
        </article>
      </section>
      `;
  }

  async afterRender() {
    // Do your job here

    this.#presenter = new LoginPresenter({
      model: DicodingStoryAPI,
      view: this,
      authModel: LoginModel,
    });

    this.#setupForm();
  }

  async #setupForm() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value,
      }
      
      await this.#presenter.getLogin(data);
    });
  }

  loginSuccessfully(message) {
    console.log(message);

    // Redirect
    location.hash = '/';
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Masuk
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit">Masuk</button>
    `;
  }
}