const express = require('express');
const initializeDB = require('./db');
const routes = require('./routes');

const app = express();

app.use(express.static(__dirname + '/client/build'));

const PORT = process.env.PORT || 5000;

let server;
initializeDB().then(db => {
  server = routes(app, db).listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);     
  })
})
.catch(err => {
  console.error("Failed to connect to MongoDB!");
  console.log(err);
  process.exit(1);
});

app.close = function() {
  server.close();
}

app.open = function() {
  try {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);     
    })
  }
  catch(err) { }
};

module.exports = app;