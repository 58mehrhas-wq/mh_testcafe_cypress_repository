const {Selector} = require('testcafe') ;
const { fileURLToPath } = require('url');

function HomePage() {
    return '.header-logo__link.active'
}

function SaleTab() {
    return 'li[class="menu-category__item menu-category__item--has-submenu active"] div[class="menu-category__item-title"]'
}

function SaleDresses() {
    return 'a[title="Sale Dresses"]'
}

function SaleDressesTitle() {
    return 'h1[role="heading"]'
}

function DressCollection() {
    return '.collection-list__page'
}

function SageDress() {
    return '(//a[normalize-space()="One Of The Boys Dress - Sage"])[1]'
}

function XSBtn() {
    return '[span[data-product-size="XS"]'
}

function NotifyMeTitle() {
    return '#notifyMeModalTitle'
}

module.exports = {
    HomePage: HomePage,
    SaleTab: SaleTab,
    SaleDresses: SaleDresses,
    SaleDressesTitle: SaleDressesTitle,
    DressCollection: DressCollection,
    SageDress: SageDress,
    XSBtn: XSBtn,
    NotifyMeTitle: NotifyMeTitle    
}
