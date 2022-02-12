const express = require("express");
const articlesControllers = require("../controllers/articles");

const router = express.Router();

router.get("/", articlesControllers.getArticles);

router.get("/createArticle", articlesControllers.getCreateArticle);

router.get("/editArticle/:id", articlesControllers.getEditArticle);

router.post("/", articlesControllers.postCreateArticle);

router.get("/:slug", articlesControllers.getArticleBySlug);

router.put("/:id", articlesControllers.updateArticleById);

router.delete("/:id", articlesControllers.deleteArticle);

module.exports = router;
