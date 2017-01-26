var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage()', () => {

  it('Should generate correct location message object', () => {
    var from = 'Oscar';
    var latitude = '25.6731937';
    var longitude = '-100.3916299';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message).toInclude({from, url: `https://www.google.com.mx/maps/?q=${latitude},${longitude}`});
  });

});
