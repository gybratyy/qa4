const { By, until } = require('selenium-webdriver');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.departureInput = By.name('state_input');
        this.destinationInput = By.name('state_input1');
        this.startDateInput = By.name('start_date');
        this.startDateContainer = By.css("span.datepicker-cell:not(.disabled)");
        this.noBackButton = By.className('closeButton');
        this.searchButton = By.className('buttonpoisk');
    }

    async enterDeparture(city) {
        logger.info(`Entering departure city: ${city}`);
        await this.fillInput(this.departureInput, city);
    }

    async enterDestination(city) {
        logger.info(`Entering destination city: ${city}`);
        await this.fillInput(this.destinationInput, city);
    }

    async selectStartDate() {
        logger.info('Selecting start date.');
        const dateInput = await this.driver.findElement(this.startDateInput);
        await dateInput.click();
        const dateElement = await this.driver.wait(until.elementLocated(this.startDateContainer), 10000);
        await this.driver.wait(until.elementIsVisible(dateElement), 10000);
        await dateElement.click();
    }

    async closeNoBackButton() {
        logger.info('Closing no-back button.');
        await this.clickElement(this.noBackButton);
    }

    async clickSearch() {
        logger.info('Clicking search button.');
        await this.clickElement(this.searchButton);
    }

    async fillInput(locator, value) {
        const input = await this.driver.findElement(locator);
        await input.sendKeys(value);
    }

    async clickElement(locator) {
        const element = await this.driver.findElement(locator);
        await element.click();
    }
}

module.exports = HomePage;
