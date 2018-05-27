// creates dummy data
const faker = require("faker");
const mysql = require("mysql");
class Db {
  /**
   * Establish the connection
   * @constructor
   * @param {object} connection the connection to the database
   */
  constructor(params) {
    this.pool = mysql.createPool(params);
  }
  /**
   * Run a simple query againist the database
   */
  testConnection() {
    this.pool.getConnection((err, con) => {
      let q = "SELECT NOW() as date";
      con.query(q, (err, res, fields) => {
        con.destroy();
        if (err) {
          throw err;
          return;
        }
        console.log(`current date is ${res[0].date}, connection established`);
      });
    });
  }
  /**
   * @param {number} n - number of users to add to database
   */
  populateUsersTable(n = 0) {
    this.pool.getConnection((err, con) => {
      let data = [];
      let limit = n;

      while (limit--) {
        data.push([faker.internet.email(), faker.date.past()]);
      }

      var q = "INSERT INTO users (email, created_at) VALUES ?";
      con.query(q, [data], (err, res, fields) => {
        con.destroy();
        if (err) {
          throw err;
          return;
        }
        console.log(res);
      });
    });
  }
}
module.exports = Db;
