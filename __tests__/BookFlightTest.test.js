const { Builder } = require('selenium-webdriver');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');
const BookingPage = require('../pages/BookingPage');

let driver;
let homePage;
let searchPage;
let bookingPage;

beforeAll(async () => {
    console.log("Starting WebDriver initialization...");
    
    try {
        driver = await new Builder().forBrowser('chrome').build();
        console.log("WebDriver started successfully.");

        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
        bookingPage = new BookingPage(driver);

        console.log("Navigating to website...");
        await driver.get('https://www.euroavia.ru/');
        console.log("Website loaded successfully.");
    } catch (error) {
        console.error("WebDriver failed to initialize:", error);
    }
}, 30000);



afterAll(async () => {
    await driver.quit();
});

test('User can enter departure and destination', async () => {
    await homePage.enterDeparture('Астана');
    await homePage.enterDestination('Алматы');
});

test('User can select a start date', async () => {
    await homePage.selectStartDate();
});

test('User can close no-back button and search', async () => {
    await homePage.closeNoBackButton();
    await homePage.clickSearch();
});

test('User can select and confirm a flight', async () => {
    await searchPage.selectFlight();
    await searchPage.confirmSelection();
});

test('User can fill in personal details', async () => {
    await bookingPage.fillPersonalDetails(
        '87777777777',
        'random@mail.ru',
        'Namwe',
        'Surnamae',
        '103032005',
        '121205111',
        '103302032'
    );
});

test('User can accept terms and submit booking', async () => {
    await bookingPage.acceptTerms();
});

