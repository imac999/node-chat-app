var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('shoud generate the correct message object', () => {
    var testMessage = {from: 'from', text: 'text'};
    var messageResult=generateMessage(testMessage.from, testMessage.text);
    expect(messageResult).toMatchObject(testMessage);
    expect(typeof messageResult.createdAt).toBeTruthy();
  });
});
