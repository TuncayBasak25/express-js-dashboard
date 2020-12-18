const connections = require('../connections');


const message = (socket, data) => {
  console.log(data.message + ' Was send to all clients');

  Object.entries(connections).map(([name, client]) => client.send({ message: data.message}));
}

module.exports = message;
