const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const regularUser = (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SECRET,
    (err, payload) => {
      console.log("im in");
      if (err) return res.status(404).json("only users can see this page.");
      req.user = payload;
      next();
    }
  );
};

module.exports = regularUser;
