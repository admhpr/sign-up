// see .env.sample
require("dotenv").config();

const e = process.env;

const creds = {
  user: e.DB_USER,
  password: e.DB_PASSWORD
};

const config = {
  development: {
    database: {
      host: e.DEV_DB_HOST || e.DB_HOST,
      port: e.DEV_DB_PORT || e.DB_PORT,
      db: e.DEV_DB_NAME || e.DB_NAME
    },
    //server details
    server: {
      host: e.DEV_SERVER_HOST || e.SERVER_HOST,
      port: e.DEV_PORT || e.PORT
    },
    creds: creds
  },
  production: {
    database: {
      host: e.DB_HOST,
      port: e.DB_PORT,
      db: e.DB_NAME
    },
    server: {
      host: e.SERVER_HOST,
      port: e.SERVER_PORT
    },
    creds: creds
  }
};

module.exports = config;
