const express = require("express");
const articlesControllers = require("../controllers/articles");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", articlesControllers.getArticles);

router.get("/createArticle", verifyToken, articlesControllers.getCreateArticle);

router.get("/editArticle/:id", verifyToken, articlesControllers.getEditArticle);

router.post("/", articlesControllers.postCreateArticle);

router.get("/:slug", verifyToken, articlesControllers.getArticleBySlug);

router.put("/:id", verifyToken, articlesControllers.updateArticleById);

router.delete("/:id", verifyToken, articlesControllers.deleteArticle);

module.exports = router;
