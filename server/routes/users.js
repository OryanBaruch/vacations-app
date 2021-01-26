const router = require("express").Router();
const QUERY = require("../database/queryPromise");
const admin=require('../auth/admin')

router.get("/users",admin, async (req, res) => {
  try {
    const query_users = `SELECT * FROM users`;
    const users = await QUERY(query_users);
    res.status(200).json(users);
  } catch (error) {
    return res.status(401).send(error);
  }
});

module.exports = router;
