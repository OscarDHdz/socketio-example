var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage()', () => {

  it('Should generate correct message object', () => {
    var from = 'Oscar';
    var text = 'Im the message';
    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message).toInclude({from, text});
  });

});
