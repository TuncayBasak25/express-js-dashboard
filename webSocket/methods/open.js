const connections = require('../connections');

const open = (socket, data) => {
  console.log('New connection established');
  connections[data.id] = socket;
}

module.exports = open;
