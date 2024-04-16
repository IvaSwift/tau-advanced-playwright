import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../../utils/messages';

class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly messagePanel: Locator;
  readonly password: Locator;
  readonly userName: Locator;
  readonly cookieLink: Locator;
  readonly onetrustButton: Locator;
  readonly logoutButton: Locator;


  constructor(page: Page) {
    this.page = page;
    // this.loginButton = page.getByRole('button', { name: 'Login' });//Zaloguj się
    // this.loginButton = page.getByText('Zaloguj się');
    this.loginButton = page.locator('xpath=//*[@id="section_login-box"]/div/form/button');
    this.messagePanel = page.locator('#output');
    // this.password = page.getByPlaceholder('Password');
    // this.userName = page.getByPlaceholder('UserName');
      // this.userName = page.locator('//div[@class=login-form]/input[@class=input-inner]')
      this.userName = page.locator('xpath=//*[@id="section_login-box"]/div/form/div[1]/div/label/div[1]/input');

      this.password = page.locator('xpath=//*[@id="section_login-box"]/div/form/div[2]/div/label/div[1]/input');
      //*[@id="section_login-box"]/div/form/div[1]/div/label/div[1]/input
      // this.userName = page.locator('div:has(input.input-inner)');
    // this.userName = page.getByRole("email"); .login-form
    // this.onetrustButton = page.getByRole('button', {id: 'onetrust-pc-btn-handler'})
    // this.onetrustButton = page.getAttribute()
    // this.onetrustButton = page.locator('div.onetrust-banner-options > button#onetrust-pc-btn-handler');
    // this.onetrustButton = page.locator('//button[id=onetrust-pc-btn-handler]');
    this.onetrustButton = page.getByText('Zmień ustawienia').last();
    // console.log(this.onetrustButton)
  
    // this.gridRow1 = page.locator('div:nth-child(1) > .rt-tr > div:nth-child(2)').last();
    // onetrust-pc-btn-handler
    this.cookieLink = page.getByText('ZAPISZ USTAWIENIA').last();
    this.logoutButton = page.getByText('Wyloguj');
  }

  async fillEmail(email: string) {
    await this.userName.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.loginButton.click();
  }

  async checkLoggedIn() {
    // await expect(this.page).toHaveURL(/.*profile/);
    
    await expect(this.page).toHaveURL(/profile/);
   //await expect(this.page).toHaveTitle(/DEMOQA/); //<title>Media Expert | Sklep internetowy RTV, AGD, komputery</title>
    await expect(this.page).toHaveTitle('Media Expert | Sklep internetowy RTV, AGD, komputery');
  }

  async checkInvalidCredentials() {
    await expect(this.messagePanel).toHaveText(messages.login.invalid);
  }
  async doCookie() {
    await this.onetrustButton.click();
    await this.cookieLink.click();
  }

  async doLogOut() {
    await this.logoutButton.click();
  }
}



export default LoginPage;
