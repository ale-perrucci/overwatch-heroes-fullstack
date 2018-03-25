const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const limit = +req.query.limit || 10;
      const filter = req.query.filter || '';
      const lastname = req.query.lastname || '';

      const regex = new RegExp(`^${filter}`, "i");
      const query = { $or: [{"name": regex}, {"name_plain": regex}], "name": {$gt: lastname}};

      const heroes = await db.collection("heroes").find(query).sort({ "name": 1 }).limit(limit).toArray();
      const done = heroes.length < limit;
      res.send({ heroes, done });
    } catch(error) {
      res.status(400).send(error);
    }
  });

  router.get('/:name', async (req, res) => {
    try {
      const name = req.params.name || '';
      const result = await db.collection("heroes").findOne({ "name_plain": name });
      res.send(result);
    } catch(error) {
      res.status(400).send(error);
    }
  });

  return router;
}