import {ClientFunction} from 'testcafe';
import SaleDressesPage from './pages/saleDressesPage';

const dataSet = require('../data/data.json');
const URL ="https://www.fashionnova.com";
// const URL ="http://localhost:4200";
const getURL = ClientFunction(() =>window.location.href);

fixture('Sale Dresses feature')
    .page(URL);
 
dataSet.forEach(data => {     
test('Sale Dresses page Test', async t =>{
    await t
    .maximizeWindow()
    .setTestSpeed(1)
    
    // Check all the KPI
    // .expect(SaleDressesPage.fashionNovaLogo).eql('FASHION NOVA')
    .click(SaleDressesPage.dialogPopupClose)
    .hover(SaleDressesPage.saleTab)
    .wait(1000)
    .click(SaleDressesPage.saleDressesOption)
    .typeText(SaleDressesPage.searchField, data.boys_sage)
    .click(SaleDressesPage.searchField)
    .pressKey('enter')
    .wait(2000)
    .click(SaleDressesPage.greenSageBtn)
    // .skipJsErrors(true)
    .wait(30000)
    .click(SaleDressesPage.XSBtn)
    
    })

});

