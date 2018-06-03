const env = process.env.NODE_ENV || "development",
  chalk = require("chalk"),
  requireDir = require("require-dir"),
  config = require("./server/config")[env],
  Db = require("./server/helpers/Db"),
  express = require("express"),
  controllers = requireDir("./server/controllers"),
  routes = require("./server/routes/routes.json"),
  app = express();

let params = {
  connectionLimit: 100, //important
  host: config.database["host"],
  user: config.creds["user"],
  password: config.creds["password"],
  database: config.database["db"]
};

let db = new Db(params);

db
  .testConnection()
  .then(res => {
    if (config.database["seed"]) {
      db.populateUsersTable(config.database["fakeUsers"]);
    }
  })
  .catch(err =>
    setImmediate(() => {
      throw err;
    })
  );

//----- Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(config.server["port"], () => {
  console.log(
    `${chalk.magenta(
      "[SIGNUP INFO]"
    )} Node server is running on port ${chalk.yellow(config.server["port"])}`
  );
});
