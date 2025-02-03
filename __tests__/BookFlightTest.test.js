require('dotenv').config();
const XLSX = require('xlsx');
const fs = require('fs');
const { Builder } = require('selenium-webdriver');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');
const BookingPage = require('../pages/BookingPage');

function readTestData(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet); 
}

const testData = readTestData('./personal.xlsx', 'Sheet1')[0];
let driver;
let homePage;
let searchPage;
let bookingPage;

beforeAll(async () => {
    console.log("Starting WebDriver initialization...");
    
    try {
        
            driver = await new Builder()
                .usingServer(`https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
                .withCapabilities({
                    'browserName': 'Chrome',
                    'browser_version': 'latest',
                    'os': 'Windows',
                    'os_version': '10'
                })
                .build();
        
        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
        bookingPage = new BookingPage(driver);

        await driver.get('https://www.euroavia.ru/book/?unik=pt7ptujjtcv6qvskaf7j573g10-xml');
    } catch (error) {
        console.error("WebDriver failed to initialize:", error);
    }
}, 30000);



afterAll(async () => {
    await driver.quit();
});

test('User can fill in personal details', async () => {
    await bookingPage.fillPersonalDetails(
        testData.Phone,
        testData.Email,
        testData.FirstName,
        testData.LastName,
        testData.BirthDate,
        testData.PassportNum,
        testData.PassportDate
    );
});

test('User can accept terms and submit booking', async () => {
    await bookingPage.acceptTerms();
});

