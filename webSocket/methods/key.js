const connections = require('../connections');

const key = (socket, { keycode }) => {
  Object.entries(connections).map(([name, client]) => client.send({ keycode: keycode}));
}

module.exports = key;
