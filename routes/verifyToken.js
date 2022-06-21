const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if(!token) return res.status(400).send("acces success")
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KU)
    res.send = verified
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}
