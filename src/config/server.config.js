const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_STRING,
    LOG_DB_URL : process.env.DB_STRING
}