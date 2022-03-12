const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

const maxAge = 3 * 24 * 60 * 60; // three days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

exports.getRegisterUser = async (req, res, next) => {
  try {
    res.render("../views/users/register.ejs", {
      pageTitle: "Sign up",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.postRegisterUser = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.render("../views/users/register.ejs", {
      errorMessage: error.details[0].message,
      pageTitle: "Sign up",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    const token = createToken(savedUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).redirect("/");
  } catch (e) {
    console.log(e);
    res.status(400).send("user not created");
  }
};

exports.getLoginUser = async (req, res, next) => {
  try {
    res.render("../views/users/login.ejs", {
      pageTitle: "Log in",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.postLoginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.render("../views/users/login.ejs", {
      errorMessage: error.details[0].message,
      pageTitle: "Log in",
    });
  }
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.render("../views/users/login.ejs", {
      errorMessage: "User could not be found.",
      pageTitle: "Log in",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.render("../views/users/login.ejs", {
      errorMessage: "Invalid password.",
      pageTitle: "Log in",
    });

  try {
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).redirect("/");
  } catch (e) {
    console.log(e);
  }
};

module.exports.getLogoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
