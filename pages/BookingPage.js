const { By, until } = require('selenium-webdriver');

class BookingPage {
    constructor(driver) {
        this.driver = driver;
        this.phoneInput = By.name('numtel');
        this.emailInput = By.name('mail');
        this.firstNameInput = By.name('vzi1');
        this.lastNameInput = By.name('vzf1');
        this.birthDateInput = By.name('ddvzdr1');
        this.passportNumInput = By.name('pasnumvz1');
        this.passportDateInput = By.name('pasddvz1');
        this.acceptCheckbox = By.name('acceptCheck');
        this.titleLabel = By.css("label[for='nametitle1']");
        this.submitButton = By.className('buttonpoisk');
    }

    async fillPersonalDetails(phone, email, firstName, lastName, birthDate, passportNum, passportDate) {
        const phoneInput = await this.driver.wait(until.elementLocated(this.phoneInput), 10000);
        await this.driver.wait(until.elementIsVisible(phoneInput), 10000);
        await phoneInput.sendKeys(phone);

        const emailInput = await this.driver.wait(until.elementLocated(this.emailInput), 10000);
        await this.driver.wait(until.elementIsVisible(emailInput), 10000);
        await emailInput.sendKeys(email);

        const firstNameInput = await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
        await this.driver.wait(until.elementIsVisible(firstNameInput), 10000);
        await firstNameInput.sendKeys(firstName);

        const lastNameInput = await this.driver.wait(until.elementLocated(this.lastNameInput), 10000);
        await this.driver.wait(until.elementIsVisible(lastNameInput), 10000);
        await lastNameInput.sendKeys(lastName);

        const birthDateInput = await this.driver.wait(until.elementLocated(this.birthDateInput), 10000);
        await this.driver.wait(until.elementIsVisible(birthDateInput), 10000);
        await birthDateInput.sendKeys(birthDate);

        const passportNumInput = await this.driver.wait(until.elementLocated(this.passportNumInput), 10000);
        await this.driver.wait(until.elementIsVisible(passportNumInput), 10000);
        await passportNumInput.sendKeys(passportNum);

        const passportDateInput = await this.driver.wait(until.elementLocated(this.passportDateInput), 10000);
        await this.driver.wait(until.elementIsVisible(passportDateInput), 10000);
        await passportDateInput.sendKeys(passportDate);

        const label = await this.driver.wait(until.elementLocated(this.titleLabel), 10000);
        await this.driver.wait(until.elementIsVisible(label), 10000);
        await label.click();
    }

    async acceptTerms() {
        const checkbox = await this.driver.wait(until.elementLocated(this.acceptCheckbox), 10000);
        await this.driver.wait(until.elementIsVisible(checkbox), 10000);
        await checkbox.click();
    }
    async submitBooking() {
        const button = await this.driver.wait(until.elementLocated(this.submitButton), 10000);
        await this.driver.wait(until.elementIsVisible(button), 10000);
        await button.click();
    }
}

module.exports = BookingPage;
