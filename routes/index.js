const path = require('path');

module.exports = function(app, db) {
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV !== "production")
    app.use("/api/initdb", require("./initdb")(db));
  
  app.use("/api/heroes", require("./heroes")(db));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });

  return app;
};
