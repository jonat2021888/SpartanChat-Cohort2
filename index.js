const Websocket = require('ws');

const app = new Websocket.Server({
  port: 81
});


let clients = []

function broadcast(clientList, msgToBroadcast) {
  clientList.forEach(function(client) {
    client.send(msgToBroadcast);
  })
}


app.on('connection', function(wsc, req) {
  console.log('Connection secured!');
  clients.push(wsc);

  wsc.on('message', function(message) {
    console.log(message);
    broadcast(clients, message);
  });
})
