const { t } = require("testcafe");

    function main_title() {
        return '.header-logo__link.active';
    }

    function saleTab() {

        return 'div[class="header-wrapper"] li:nth-child(6) a:nth-child(1) div:nth-child(2)' 
    }

    function banner_area() {
        return '.menu-brands__track'
    }

    function closeBrowser() {
        return closeWindow();
    }

module.exports = {
    main_title: main_title,
    saleTab: saleTab,
    closeBrowser: closeBrowser,
    banner_area: banner_area
};
