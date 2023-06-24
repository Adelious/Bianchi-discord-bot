const express = require('express');

const server = express()

server.all("/", (req, res) => {
    res.send('Bot opérationnel !');
})

function keepAlive() {
    server.listen(3000, () => {
        console.log("Le serveur web est démarré");
    }); 
}

module.exports = keepAlive