// Bienvenue dans le server de AKONGO Zoo Manager

// Importation des dépendances

const http = require('http');
const app = require('./app');

const port = process.env.Port || 8080;
const server = http.createServer(app);


// Démarrage du server

server.listen(port, function() {
    console.log("Akongo Zoo Manager Server démarré sur le port " + port)
});