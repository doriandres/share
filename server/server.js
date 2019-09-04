const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors')
const http = require('http');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const ws = require('ws');
const dbUrl = 'mongodb://share:atlasda3571@share-shard-00-00-gbdow.azure.mongodb.net:27017,share-shard-00-01-gbdow.azure.mongodb.net:27017,share-shard-00-02-gbdow.azure.mongodb.net:27017/test?ssl=true&replicaSet=share-shard-0&authSource=admin&retryWrites=true&w=majority';
const app = express();
const server = http.Server(app);
const registry = require('./route/routeRegistry');
const wss = new ws.Server({
    server
});

app.use(cors());
app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['sessionId', 'userId'],
    maxAge: 60 * 60 * 1000
}));

wss.on('connection', async socket => socket.on('message', async message => {
    wss.clients
        .forEach(client => {
            if (client !== socket && client.readyState === ws.OPEN) client.send(message)
        });
}));

registry.forEach(r => app[r.method](r.url, r.handler));

app.use((req, res, next) => {
    if (req.accepts('html') && req.method === "GET") {
        res.sendFile(path.join(__dirname + '/../client/dist/app.html'))
        return;
    }

    res.status(404);

    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        });
        return;
    }
});
mongoose.connect(dbUrl);
server.listen(process.env.PORT || 3000);