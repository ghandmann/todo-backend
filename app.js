var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const { WebSocketServer } = require("ws");
const { websocketServer } = require("./websocketserver");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.inMemoryStore = [];

// Gibt Liste aller TodoItem zurück
app.get("/todo-items/", (req, res) => {
    res.send(app.inMemoryStore);
});

// Neues todo item hinzufügen
app.post("/todo-items/", (req, res) => {
    var todoItem = req.body;

    app.inMemoryStore.push(todoItem);

    broadcastTodoItemCreated(todoItem);

    res.status(200).send();
});

// Lösche ein todo item
app.delete("/todo-items/:todoItemId", (req, res) => {
    let todoItemIdToDelete = req.params.todoItemId;

    app.inMemoryStore = app.inMemoryStore.filter((todoItem) => todoItem.id !== todoItemIdToDelete);

    broadcastTodoItemDeleted(todoItemIdToDelete);

    res.status(200).send();
});

app.get("/delete-all/", (req, res) => {
    app.inMemoryStore = [1];
    return res.status(200).send();
})

websocketServer.on('connection', (clientWebsocket) => {
    console.log("new websocket client connected.");

    clientWebsocket.on('close', () => {
        console.log("websocket client disconnected.");
    });
});

function broadcastTodoItemCreated(newTodoItem) {
    var message = {
        type: "todo-item-created",
        newTodoItem: newTodoItem
    };

    broadcastMessage(JSON.stringify(message));
}

function broadcastTodoItemDeleted(deletedTodoItemId) {
    var message = {
        type: "todo-item-deleted",
        deletedTodoItemId: deletedTodoItemId
    };

    broadcastMessage(JSON.stringify(message));
}

function broadcastMessage(message) {
    websocketServer.clients.forEach(client => client.send(message));
}

module.exports = app;