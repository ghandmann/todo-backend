const { WebSocketServer } = require("ws");

var websocketServer = new WebSocketServer({ noServer: true, path: "/live-updates/"});

module.exports = { websocketServer };