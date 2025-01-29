const { By, until } = require('selenium-webdriver');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.priceButton = By.css('.fly_var');
        this.resultsContainer = By.id('all_content_price');
        this.confirmButton = By.css('.buttonpoisk');
    }

    async selectFlight() {
        logger.info('Selecting flight.');
        await this.clickElement(this.priceButton);
    }

    async confirmSelection() {
        logger.info('Confirming flight selection.');
        await this.clickElement(this.confirmButton);
    }

    async clickElement(locator) {
        const element = await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.wait(until.elementIsVisible(element), 7000);
        await element.click();
    }
}

module.exports = SearchPage;
