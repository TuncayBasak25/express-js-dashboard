const connections = require('../connections');

const key = (socket, { keycode }) => {
  Object.entries(connections).map(([name, client]) => client.send({ keycode: data.keycode}));
}

module.exports = key;
