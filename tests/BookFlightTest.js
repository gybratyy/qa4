const { Builder } = require('selenium-webdriver');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');
const BookingPage = require('../pages/BookingPage');

(async function bookFlightTest() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        const homePage = new HomePage(driver);
        const searchPage = new SearchPage(driver);
        const bookingPage = new BookingPage(driver);

        await driver.get('https://www.euroavia.ru/');

    
        await homePage.enterDeparture('Астана');
        await homePage.enterDestination('Алматы');
        await homePage.selectStartDate('1735585200000');
        await homePage.closeNoBackButton();
        await homePage.clickSearch();

        await searchPage.selectFlight();
        await searchPage.confirmSelection();

        await bookingPage.fillPersonalDetails(
            '87777777777',
            'random@mail.ru',
            'Namwe',
            'Surnamae',
            '103032005',
            '121205111',
            '103302032'
        );
        await bookingPage.acceptTerms();
        await bookingPage.submitBooking();

    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await driver.quit();
     }
})();
