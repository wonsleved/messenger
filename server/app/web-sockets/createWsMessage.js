module.exports = function createWsMessage(event, payload) {

  return JSON.stringify({event, payload});

}