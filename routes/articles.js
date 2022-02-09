const express = require("express");
const articlesControllers = require("../controllers/articles");

const router = express.Router();

router.get("/", articlesControllers.getArticles);

module.exports = router;
