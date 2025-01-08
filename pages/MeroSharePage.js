class MeroSharePage {
    constructor(page) {
      this.page = page;
      this.selectDP = page.getByText('Select your DP');
      this.selectDPsearch = page.locator('input[type="search"]');
      this.usernameInput = page.getByLabel('Username');
      this.passwordInput = page.getByLabel('Password');
      this.loginButton = page.getByRole('button', { name: 'Login' });
      this.myAsbaLink = page.getByRole('link', { name: ' My ASBA' });
      this.currentIssueLink = page.locator('a').filter({ hasText: 'Current Issue' });
      this.noIPOAvailable = page.getByText('No Record(s) Found');
    }
  
    async goto() {
      await this.page.goto('https://meroshare.cdsc.com.np/'); 
    }
  
    async login(username, password) {
      await this.page.waitForLoadState('domcontentloaded');
      await this.selectDP.click();
      await this.selectDPsearch.fill('13700');
      await this.selectDP.press('Enter');
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      setTimeout(() => {
        console.log('Logged in');
      }, 5000);
    }
  
    async navigateToCurrentIssue() {
      await this.myAsbaLink.click();
      await this.currentIssueLink.click();
    }
    async checkAndApplyForIPO() {
        const noIPOText = await this.noIPOAvailable.isVisible();
        if (noIPOText) {
            console.log('No IPO available');
        } else {
            const ipoAvailable = await this.page.locator('table').count();
            if (ipoAvailable > 0) {
                await this.page.locator('table tbody tr').nth(0).click();
                await this.page.locator('button').filter({ hasText: 'Apply' }).click();
            } else {
                console.log('No IPO available');
            }
        }
    }
  
    // async applyForIPO() {
    //     const ipoAvailable = await this.page.locator('table').count();
    //           if (ipoAvailable > 0) {
    //             await this.page.locator('table tbody tr').nth(0).click();
    //             await this.page.locator('button').filter({ hasText: 'Apply' }).click();
    //           } else {
    //             console.log('No IPO available');
    //           }
    // }
  }
  
  module.exports = { MeroSharePage };
  

  
 