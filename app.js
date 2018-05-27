const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const Db = require("./helpers/Db");

let params = {
  connectionLimit: 100, //important
  host: config.database["host"],
  user: config.creds["user"],
  password: config.creds["password"],
  database: config.database["db"]
};

let db = new Db(params);

db.testConnection();

db.populateUsersTable(500);
