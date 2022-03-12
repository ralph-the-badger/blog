const jwt = require("jsonwebtoken");

// middleware to check if token is valid
module.exports = function verifyToken(req, res, next) {
  const token = req.cookies.jwt; // key of my token

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(e);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
