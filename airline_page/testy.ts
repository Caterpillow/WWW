import {Builder, Capabilities, Key} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';

describe('test_blocked_links', function () {

    it('checks blocked links after submit', async function() {
        this.timeout(20000);
        await driver.get(`file://${process.cwd()}/first.html`);
        driver.executeScript(`document.querySelector('input[type=date]').value = "2040-12-01";`);

        await driver.find('input[name=fname]').sendKeys('Albert Einstain');
        await driver.find('select[id=departureslist]').sendKeys('Warszawa', Key.RETURN);
        await driver.find('select[id=arrivals]').sendKeys('London', Key.RETURN);

        expect(await driver.find('input[type=submit]').then(() => true, () => false)).to.equal(true);
        expect(await (await driver.find('input[type=submit]')).isEnabled()).to.equal(true);
        await (await driver.find('input[type=submit]')).click();
        expect(await driver.find('table_adjust').doClick().then(() => {
                return true;
            }, () => {
                return false;
            })).to.equal(false);
    });
})

describe('test_submit_button', function () {

    it('Check submit button is disabled', async function() {
        this.timeout(20000);
        await driver.get(`file://${process.cwd()}/first.html`);

        expect(await driver.find('select[id=departureslist]').getText()).to.include('Warszawa');
        await driver.find('input[name=fname]').sendKeys('Maria Curie');
        expect(await driver.find('input[type=submit]').then(() => true, () => false)).to.equal(true);
        expect(await (await driver.find('input[type=submit]')).isEnabled()).to.equal(false);
    });

});