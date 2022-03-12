const express = require("express");
const authControllers = require("../controllers/auth");

const router = express.Router();

router.get("/register", authControllers.getRegisterUser);

router.post("/register", authControllers.postRegisterUser);

router.get("/login", authControllers.getLoginUser);

router.post("/login", authControllers.postLoginUser);

router.get("/logout", authControllers.getLogoutUser);

module.exports = router;
