const MongoClient = require('mongodb');

const MONGODB_URI =
  process.env.MONGOLAB_URI ||
  "mongodb://localhost:27017/overwatch-heroes";

function connect(url) {
  return MongoClient.connect(url).then(client => client.db());
}

module.exports = async () => {
  let database = await connect(MONGODB_URI);
  return database;
}