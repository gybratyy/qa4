const { By, until } = require('selenium-webdriver');

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
        const input = await this.driver.findElement(this.departureInput);
        await input.sendKeys(city);
    }

    async enterDestination(city) {
        const input = await this.driver.findElement(this.destinationInput);
        await input.sendKeys(city);
    }

    async selectStartDate(date) {
        const dateInput = await this.driver.findElement(this.startDateInput);
        await dateInput.click();

        const dateElement = await this.driver.wait(
            until.elementLocated(this.startDateContainer),
            10000
        );
        await this.driver.wait(until.elementIsVisible(dateElement), 10000);
        await dateElement.click();
    }

    async closeNoBackButton() {
        const button = await this.driver.findElement(this.noBackButton);
        await button.click();
    }

    async clickSearch() {
        const button = await this.driver.findElement(this.searchButton);
        await button.click();
    }
}

module.exports = HomePage;
