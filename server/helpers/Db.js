// creates dummy data
const mysql = require("mysql"),
  faker = require("faker"),
  chalk = require("chalk");
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
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, con) => {
        let q = "SELECT NOW() as date";
        if (!con) {
          console.error(
            `${chalk.magenta(
              "[SIGNUP INFO]"
            )} Database connection is ${chalk.red(
              "not established"
            )}${chalk.underline(
              " check that the variables are correctly set in the " +
                chalk.green(".env") +
                " file"
            )}`
          );
          return;
        }
        con.query(q, (err, res, fields) => {
          con.destroy();
          if (err) {
            return reject(err);
          }
          console.log(
            chalk.underline(
              `${chalk.magenta(
                "[SIGNUP INFO]"
              )} The current date is ${chalk.bold(res[0].date)}`
            )
          );
          console.log(
            `${chalk.magenta(
              "[SIGNUP INFO]"
            )} Database connection established ${chalk.green("\u2713")}`
          );
          resolve(res);
        });
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
