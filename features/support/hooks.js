const fs = require('fs');
const createTestCafe = require('testcafe');
const ActionsPage = require('../../pages/actions.pages.js')
const MainPageLocator = require('../../locators/main.locators.js');
const testControllerHolder = require('./testControllerHolder');
const { AfterAll, setDefaultTimeout, Before, After, Status, BeforeAll } = require('@cucumber/cucumber');
const TIMEOUT = 60000;
let cafeRunner = null;
let n = 0;

async function get_data() {
    var headers = await ActionsPage.bearer()
    var get_billing_overview_data = await ActionsPage.get_billing_overview_data(headers)
    var subscriptions_list = await ActionsPage.get_all_subscriptions(headers)
    var payment_methods_list = await ActionsPage.get_payment_methods(headers)
    var invoice_list = await ActionsPage.get_invoice_list(headers, 100)
    // var first_invoice = await ActionsPage.get_invoice(headers, invoice_list.data.getInvoiceList.items[0].invoiceId)
    var account_monies = await ActionsPage.get_account_monies(headers, 1)
    var platform_locations = await ActionsPage.get_platform_locations(headers)
    await ActionsPage.logoff(headers)
    // return [get_billing_overview_data, invoice_list, account_monies, first_invoice, subscriptions_list, payment_methods_list, platform_locations]
}

var data = get_data().then(function (val) {
    return val
})

function createTestFile() {
    fs.writeFileSync('test.js',
        'import errorHandling from "./features/support/errorHandling.js";\n' +
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +

        'test\n' +
        '("test", testControllerHolder.capture)')
}

function runTest(iteration, browser) {
    createTestCafe('localhost', 1338 + iteration, 1339 + iteration)
        .then(function (tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();
            return runner
                .src('./test.js')
                .screenshots({
                    path: 'screenshots/',
                    fullPage: true
                })
                .video('videos/', {
                    singleFile: true
                }, {
                    r: 120,
                    aspect: '16:9'
                })
                .browsers(browser)
                .run()
                .catch(function (error) {
                    console.error(error);
                });
        })
}

setDefaultTimeout(TIMEOUT);

BeforeAll(function () {
    fs.unlinkSync('date.txt');
    // ActionsPage.execute_shell('rmdir /Q /S screenshots')
    // ActionsPage.execute_shell('mkdir screenshots')
    // ActionsPage.execute_shell('rmdir /Q /S videos')
    // ActionsPage.execute_shell('mkdir videos')
    ActionsPage.write_date()
    process.setMaxListeners(0);
});

Before(function () {
    runTest(n, this.setBrowser());
    createTestFile();
    n += 2;
    return this.waitForTestController
});

After(async function () {
    fs.unlinkSync('test.js');
    testControllerHolder.free();
});

After(async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        let screenshot = await ActionsPage.take_screenshot()
        this.attachScreenshotToReport(screenshot)
        console.log(testCase.pickle.tags[2].name)
        fs.appendFileSync("failed_scenarios.txt", testCase.pickle.tags[2].name + " or ", "UTF-8", { 'flags': 'a+' });
    }
    // await ActionsPage.click_element(MainPageLocator.settings_button())
    // await ActionsPage.hover_element_from_list(MainPageLocator.settings_options(), "Sign Out")
    // await ActionsPage.click_element_from_list(MainPageLocator.settings_options(), "Sign Out")
    // await ActionsPage.wait(2)
});

AfterAll(function () {
    let intervalId = null;

    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 500);
    }

    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();
        }
    }

    waitForTestCafe();
    ActionsPage.write_date()
});

module.exports = {
    data
}