import { BasePage } from './Base.page';

export class LoginPage extends BasePage {
    userNameInput = this.page.locator('#user-name');

    passwordInput = this.page.locator('#password');

    loginButton = this.page.locator('#login-button');

    async performLogin(userName, password) {
        await this.userNameInput.fill('standard_user');
        await this.passwordInput.fill('secret_sauce');
        await this.loginButton.click();
    }
}
