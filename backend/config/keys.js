const keys = {};

if (process.env.NODE_ENV === "PROD") {
  keys.dbConnection = process.env.DB_CONNECTION_PROD;
  keys.jwtSecret = process.env.JWT_SECRET_PROD;
} else {
  keys.dbConnection = process.env.DB_CONNECTION_DEV;
  keys.jwtSecret = process.env.JWT_SECRET_DEV;
}
module.exports = keys;
