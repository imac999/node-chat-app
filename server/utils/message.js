var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from, text, createdAt: new Date().getTime()
  }
};
var generateLoc = (from, lat, lng) => {
  var url=`https://www.google.com/maps?q=${lat},${lng}`;
  return {
    from, lat, lng, url, createdAt: moment().valueOf()
  }
};
module.exports = {generateMessage, generateLoc};
