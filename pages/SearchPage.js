const { By, until } = require('selenium-webdriver');

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.priceButton = By.css('.fly_var');
        this.resultsContainer = By.id('all_content_price');
        this.confirmButton = By.css('.buttonpoisk');
    }

    async selectFlight() {
        const button = await this.driver.wait(
            until.elementLocated(this.priceButton),
            10000
        );
        await this.driver.wait(until.elementIsVisible(button), 7000);
        await button.click();
    }
    async confirmSelection(){
        const button = await this.driver.wait(
            until.elementLocated(this.confirmButton),
            10000
        );
        await this.driver.wait(until.elementIsVisible(button), 7000);
        await button.click();
    }
}

module.exports = SearchPage;
