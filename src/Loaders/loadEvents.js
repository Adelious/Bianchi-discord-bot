const fs = require("fs");

module.exports = async (client) => {
  fs.readdirSync("./src/Events")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let event = require("../Events/" + file);
      client.on(file.split(".js").join(""), event.bind(null, client));
      console.log(`Evenement ${file} chargé avec succès!`);
    });
};
