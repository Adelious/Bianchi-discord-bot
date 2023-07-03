const express = require("express");
const fs = require("fs");

const server = express();

server.all("/", (req, res) => {
  const imagePath = "C:/Users/kylia/Desktop/Bianch Industrie/src/web/www/layer.png";

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send("Image not found");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Le serveur web est démarré");
  });
}

module.exports = keepAlive;
