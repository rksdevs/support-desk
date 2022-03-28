const mongoose = require("mongoose");
const keys = require("../config/keys");

const connectToDb = async () => {
  try {
    let db = await mongoose.connect(keys.dbConnection, {
      useNewUrlParser: true, //what is this - we need to use these parameters almost every time
      useUnifiedTopology: true,
    });
    console.log(
      `DB Connected, Host: ${db.connection.host}, Port: ${db.connection.port}, Database: ${db.connection.name}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1); //why this - shows the error message when 1 is given
  }
};

module.exports = connectToDb;
