const expect = require('expect');
const {isRealString} = require('./validation');

describe('Validation', () => {



  it ('Should reject non-string values', () => {
    var str1 = 123;
    var str2 = {};

    expect(isRealString(str1)).toBe(false);
    expect(isRealString(str2)).toBe(false);

  });

  it('Should reject string with only spaces', () => {
    var str1 = '    ';

    expect(isRealString(str1)).toBe(false);
  });

  it('Should allow string with non-space characters', () => {
    var str1 = '   sd asd ';

    expect(isRealString(str1)).toBe(true);
  })

});
