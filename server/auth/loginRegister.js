const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../database/database");
require("dotenv").config();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(404).json({ err: true, msg: "Must fill all the forms." });
  const questionQuery = `SELECT * FROM users WHERE username="${username}"`;
  connection.query(questionQuery, async (err, results) => {
    if (err) return res.status(500).json({ err: true, msg: err });
    console.log(results);
    if (!results.length)
      return res.status(404).json({ err: true, msg: "User not FOUND" });
    const match = await bcrypt.compare(password, results[0].password);
    if (!match)
      return res.status(404).json({ err: true, msg: "wrong password" });
    const token = jwt.sign(
      { ...results[0], password: "****" },
      process.env.SECRET,
      {
        expiresIn: "100min",
      }
    );
    return res.status(200).json({ err: false, token, results: results[0] });
  });
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  if (!first_name || !last_name || !username || !password)
    return res.status(418).json({ err: true, msg: "missing data" });
  connection.query("SELECT * FROM users ", async (err, users) => {
    if (err) return res.status(418).json("error has accurd");
    const user = users.find((user) => user.username == username);
    if (user) 
      return res
        .status(403)
        .json({ error: true, message: "Username already exists." });
    const hash = await bcrypt.hash(password, 10);
    const query_insert = `INSERT INTO users(first_name, last_name, username, password)
        VALUES("${first_name}","${last_name}","${username}","${hash}")`;
    connection.query(query_insert, (err, results) => {
      console.log(users)
      if (err) return res.status(404).send("Data not reliable");
      res.json({ err: false, msg: "user regeistered sucsessfully" , usernameValidation:users.username});
    });
  });
});


router.post('/unrefresh/:token', (req, res)=>{
    jwt.verify(req.params.token,process.env.SECRET ,(err, payload) => {
        if (err) return res.status(404).json(err);
        console.log(payload)
       return res.json(payload);
      }
    );
})

module.exports = router;
