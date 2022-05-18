const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const api = require("./api");
const models = require('./models')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:false,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

global.MODELS = models

//app.use(nuxt.render);
app.use("/api", api);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  const host = '0'
  const port = 3001

  // Sync all models that aren't already in the database
  SEQUELIZECONNECTION
    .sync()
    .then(() => {
      app.listen(port, host, () => {

        consola.ready({
          message: `Server listening on port : 3001`,
          badge: true
        });
      });
    })
    .catch(e => {
      throw new Error(e);
    });
}
start();
