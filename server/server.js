const WebSocket = require('ws');
const url = require('url');
const ws = new WebSocket.Server({
  port: 8080
});
console.log("Server is online! Waiting for users...")
var clients = [];
function broadcast(clientsList, data) {
  clientsList.forEach(function(client) {
    client.send(data);
  });
}
ws.on('connection', function connection(ws, req) {
    const parameters = url.parse(req.url, true);
    console.log(parameters.query.name);
    clients.push(ws);
    ws.on('message', function incoming(message) {
        broadcast(clients, message);
    });
});