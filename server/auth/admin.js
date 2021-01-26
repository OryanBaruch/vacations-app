const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const admin = (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    process.env.SECRET,
    (err, payload) => {
      console.log(payload.role);
      if (err) return res.status(404).json("Error has accured");
      if (payload.role!==1) return res.status(403).json('Only Admin allowed to do this action')
      req.user = payload;
      next();
    }
  );
};

module.exports = admin;
