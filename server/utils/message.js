var generateMessage = (from, text) => {
  return {
    from, text, createdAt: new Date().getTime()
  }
};
var generateLoc = (from, lat, lng) => {
  return {
    from, lat, lng, createdAt: new Date().getTime()
  }
};
module.exports = {generateMessage, generateLoc};
