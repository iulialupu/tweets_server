const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (req, res, next) => {
  try {
    console.log(req);
    // get Auth header
    const authHeader = req.get("Autorization");
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }
    console.log("1. got auth header");

    //   get token
    const token = authHeader.split(" ")[1];

    //   decode token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      req.isAuth = false;
      return next();
    }
    //   if (!decodedToken) {
    //     req.isAuth = false;
    //     return next();
    //   }
    console.log("2. token decoding");

    req.user = decodedToken;
    req.isAuth = true;
    next();
  } catch (err) {
    console.log(err);
  }
};
