const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validasi");

router.post("/register", async (req, res) => {
  const validation = registerValidation(req.body);
  res.send(validation);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
    console.log(savedUser);
  } catch (err) {
    res.status(400).send("data not send");
  }
});

router.post("/Login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(details.message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email is not found");
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(400).send("password invalid");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KU);
  res.header("auth-token", token).send(`${user} auth-token : ${token}`);
  console.log(token)
  // res.send({user: user.name})
});

module.exports = router;
