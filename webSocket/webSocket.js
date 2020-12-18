const ws = require('ws');
const connections = require('./connections');

const wsServer = new ws.Server( { noServer: true } );

const methods = {
  open: require('./methods/open'),
  message: require('./methods/message')
};

const webSocket = server => {
  wsServer.on('connection', socket => {
    socket.oldSend = socket.send;
    socket.send = data => socket.oldSend(JSON.stringify(data));


    socket.on('message', body => {
      const data = JSON.parse(body);
      const { method } = data;

      if (!method) socket.send({ error: 'Method is missing' });
      else if (!methods[method]) socket.send({ error: 'This method is missing.' });
      else methods[method](socket, data);

      // else if (message === 'get connections') socket.send(JSON.stringify(connections));
      // else {
      //   Object.entries(connections).map(([name, client]) => client.send(message));
      // }
    });
  });

  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
  });
}

module.exports = webSocket;
