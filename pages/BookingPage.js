const { By, until } = require('selenium-webdriver');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

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
        this.acceptCheckbox = By.id('acceptCheck');
        this.titleLabel = By.css("label[for='nametitle1']");
        this.submitButton = By.id('checkbtn');
    }

    async fillPersonalDetails(phone, email, firstName, lastName, birthDate, passportNum, passportDate) {
        logger.info('Filling in personal details.');
        await this.fillInput(this.phoneInput, phone);
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.firstNameInput, firstName);
        await this.fillInput(this.lastNameInput, lastName);
        await this.fillInput(this.birthDateInput, birthDate);
        await this.fillInput(this.passportNumInput, passportNum);
        await this.fillInput(this.passportDateInput, passportDate);
        await this.clickElement(this.titleLabel);
    }

    async acceptTerms() {
        logger.info('Accepting terms.');                                                                            
        const checkbox = await this.driver.wait(until.elementLocated(By.id('acceptCheck')), 10000);
        await this.driver.executeScript("arguments[0].click();", checkbox);
    }

    async submitBooking() {
        logger.info('Submitting booking.');
        await this.clickElement(this.submitButton);
    }

    async fillInput(locator, value) {
        const element = await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        await element.sendKeys(value);
    }

    async clickElement(locator) {
        const element = await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        await element.click();
    }
}

module.exports = BookingPage;
