const { test, expect } = require('@playwright/test');
const {    MeroSharePage } = require('../pages/meroSharePage');
require('dotenv').config();

test('apply for IPO', async ({ page }) => {
  const meroSharePage = new MeroSharePage(page);
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  console.log('USERNAME:', username);
  console.log('PASSWORD:', password);

  if (!username || !password) {
    throw new Error('USERNAME or PASSWORD environment variables are not set');
  }

  await meroSharePage.goto();
  await meroSharePage.login(username, password);

  await meroSharePage.navigateToCurrentIssue();
  await meroSharePage.applyForIPO();
});