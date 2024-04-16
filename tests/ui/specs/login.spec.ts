import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

// const userName = process.env.USERNAME!;
const userName = process.env.USERNAME_TESTUSER!;
const password = process.env.PASSWORD!;

let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
// test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

test.describe('Book Store - Login', () => {
  test(`successfull login`, async () => {
    // test.setTimeout(1 * 60 * 1000); 
    await loginPage.doCookie();
    await loginPage.doLogin(userName, password);
    // test.setTimeout(1 * 60 * 1000); //Error: Timed out 5000ms waiting for expect(received).toHaveURL(expected)
    await loginPage.checkLoggedIn();
    // await loginPage.doLogOut();
  });

  // test(`failing login - invalid username`, async () => {
  //   const invalidUsername = userData.invalidUsername;
  //   await loginPage.doLogin(invalidUsername, password);
  //   await loginPage.checkInvalidCredentials();
  // });

  // test(`failing login - invalid password`, async () => {
  //   const invalidPassword = userData.invalidPassword;
  //   await loginPage.doLogin(userName, invalidPassword);
  //   await loginPage.checkInvalidCredentials();
  // });

  // test(`successfull logout`, async () => {
  //   await loginPage.doLogOut();
  // });



});

