// creates dummy data
const faker = require("faker");
const mysql = require("mysql");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

let params = {
  host: config.database["host"],
  user: config.creds["user"],
  password: config.creds["password"],
  database: config.database["db"]
};

const con = mysql.createConnection(params);

con.connect();

// testing connection
// var q = "SELECT COUNT(*) AS total FROM users ";
// con.query(q, (err, res, fields) => {
//   if (err) {
//     throw err;
//     return;
//   }
//   console.log(res[0].total);
// });

var q = "SELECT COUNT(*) AS total FROM users ";
con.query(q, (err, res, fields) => {
  if (err) {
    throw err;
    return;
  }
  console.log(res[0].total);
});

con.end();
