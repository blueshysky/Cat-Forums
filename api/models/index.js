const fs = require('fs');
const Sequelize = require('sequelize');
const models = {};

const DB_HOST = '192.168.33.34'
const DB_DATABASE = 'cat_overflow'
const DB_USER = 'catoverflow'
const DB_PASS = 'replaceme'

const sequelizeConnection = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    engine: 'InnoDB',
    collate: 'latin1_swedish_ci',
  },
  dialectOptions: {
    // stream: proxyConnection,
    options: {
      encrypt: true,
      requestTimeout: 300000,
      enableArithAbort: false,
    },
  },
})

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    let model = require("./" + file)(sequelizeConnection, Sequelize);
    models[model.name] = model.schema;


  });



// PUT RELATIONSHIP MODELS HERE
// BelongsTo
// HasOne
// HasMany
// BelongsToMany
// for examples
models.User.hasMany(models.Post);
models.Post.belongsTo(models.User);
models.Comment.belongsTo(models.Post);
models.Comment.belongsTo(models.User);
models.User.hasMany(models.Comment);
models.Post.hasMany(models.Comment);

models.User.sync()
models.Post.sync()
models.Comment.sync()

module.exports = models;
global.SEQUELIZECONNECTION = sequelizeConnection
