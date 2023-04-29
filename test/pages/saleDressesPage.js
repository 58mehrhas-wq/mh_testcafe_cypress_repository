import {Selector,t} from 'testcafe';

class SaleDressesPage{
    constructor(){

        this.fashionNovaLogo = Selector('.header-logo__link.active');
        this.dialogPopupClose = Selector('svg[class="bx-close-xsvg"]')
        this.saleTab = Selector('div[class="header-wrapper"] li:nth-child(6) a:nth-child(1) div:nth-child(2)');
        this.saleDressesOption = Selector('a').withText('Sale Dresses');
        this.searchField = Selector('#navSearchInput');
        this.greenSageBtn = Selector('a').withText('One Of The Boys Dress - Sage');
        this.XSBtn = Selector('span[data-product-size$="XS"]')

    }
}
export default new SaleDressesPage();