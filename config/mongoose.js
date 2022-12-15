const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/wikidb');


const db =  mongoose.connection;

db.on("error", console.error.bind(console, "error in conncting to DB"));

db.once("open", function () {
  console.log("connected to database::MongoDb");
});

module.exports = db;