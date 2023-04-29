const ActionsPage = require('../../pages/actions.pages.js')
const { Given, When, Then } = require('@cucumber/cucumber');
const MainPageLocator = require('../../locators/main.locators.js');
const sql = require('mssql')
// const config = require('../../db_config');
const fs = require('fs');
const { t } = require('testcafe');
const saleDressesLocators = require('../../locators/fashionNova/saleDresses.locators.js');

Given('the user is in Scorpion login page', async function () {
    await ActionsPage.navigate("https://www.fashionnova.com/")
});

Given('I am in Fashion Nova page', async function (url) {
    if (url == "https://www.fashionnova.com/") {
        // await ActionsPage.navigate("http://localhost:4200/" + url)
        await ActionsPage.wait(3)
        await ActionsPage.hover_element(MainPageLocator.saleTab())

        }
    });


When('I wait for {string} seconds', async (seconds) => {
    await ActionsPage.wait(seconds)

});

When('I hover on Sale tab', async function () {
    await ActionsPage.hover_element(MainPageLocator.saleTab())
});

When('I select the {string}', async function () {
    await ActionsPage.click_element(saleDressesLocators.SaleDresses())
})

Then('I land on Sale Dresses', async function () {
    const element = ActionsPage.select(saleDressesLocators.SaleDressesTitle());
    await testController.expect(element.exists).ok();
});

