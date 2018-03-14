const assert = require('assert');
const td = require('testdouble');
const sendMessage = require('../lib/sendMessage');

describe('sendMessage', () => {
    const transporterMock = {
        sendMail: td.function()
    }
    let options;

    beforeEach(() => {
        options = {
            from: '"Fake e-mail" <fake-email@nodomain.org>',
            to: 'fake-recipient@nodomain.org',
            subject: 'Fake subject',
        };
    });

    it('Should add the message to the options object', () => {
        sendMessage('This is the message', options, transporterMock);
        td.verify(transporterMock.sendMail({
            from: '"Fake e-mail" <fake-email@nodomain.org>',
            to: 'fake-recipient@nodomain.org',
            subject: 'Fake subject',
            text: 'This is the message'
        }, td.matchers.isA(Function)));
    });

    it('Should send the message via the nodemailer transporter', () => {
        sendMessage('This is the message', options, transporterMock);
        td.verify(transporterMock.sendMail(td.matchers.isA(Object), td.matchers.isA(Function)))
    });
});
