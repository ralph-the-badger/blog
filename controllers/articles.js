const Article = require("../models/article");

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
    await res.render("../views/articles/articles.ejs", { articles: articles });
  } catch (e) {
    console.log(e);
  }
};

exports.getCreateArticle = async (req, res, next) => {
  try {
    await res.render("../views/articles/createArticle.ejs", {
      article: new Article(),
      pageTitle: "Create Article",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.postCreateArticle = async (req, res, next) => {
  let article = await new Article({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render("articles/createArticle", {
      article: article,
      pageTitle: "Edit Article",
    });
  }
};

exports.getArticleBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article === null) {
      res.redirect("/articles");
    }
    res.render("../views/articles/article.ejs", { article: article });
  } catch (e) {
    console.log(e);
  }
};

exports.getEditArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    res.render("../views/articles/editArticle.ejs", {
      article: article,
      pageTitle: "Edit Article",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateArticleById = async (req, res, next) => {
  let article;
  try {
    const articleId = req.params.id;
    article = await Article.findById(articleId);
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;

    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render("articles/editArticle", {
      article: article,
      pageTitle: "Edit Article",
    });
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/articles");
  } catch (e) {
    console.log(e);
  }
};
