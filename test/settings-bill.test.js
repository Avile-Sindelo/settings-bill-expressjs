import assert from 'assert';
import settingsBill from '../settings-bill-factory.js';

describe('Testing the factory function of the settings-bill', function(){
    it('should test if the function can take the cost settings and record them well', function(){
        let bills = settingsBill();

        let settingsObject1 = {
            smsCost: 1,
            callCost: 3,
            warningLevel: 10,
            criticalLevel: 20
        }

        let resultObject1 = {
            callCost: 3, 
            smsCost: 1,
            warningLevel: 10,
            criticalLevel: 20
        }
        bills.setSettings(settingsObject1)
        assert.deepEqual(resultObject1, bills.getSettings());
    });

    it('should test if the function returns the correct totals', function(){
        let bills = settingsBill();

        let settingsObject1 = {
            smsCost: 1,
            callCost: 3,
            warningLevel: 10,
            criticalLevel: 20
        }

        let resultTotals = {
            callTotal: 3,
            smsTotal: 1, 
            grandTotal: 4
        }

        bills.setSettings(settingsObject1);
        bills.recordAction('sms');
        // bills.recordAction('sms');
        bills.recordAction('call');
        assert.deepEqual(resultTotals, bills.totals());
    });
})