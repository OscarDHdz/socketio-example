const moment = require('moment');

var date = new Date();
console.log(date.getMonth());

var createdAt = 1654654;
var dateMoment = moment(createdAt);
console.log(dateMoment.format('h:mm a'));


var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
