const articles = [
  {
    title: "First Article",
    createdAt: new Date(),
    description: "First Description",
  },
  {
    title: "Second Article",
    createdAt: new Date(),
    description: "Second Description",
  },
];

exports.getArticles = async (req, res, next) => {
  try {
    await res.render("../views/articles/articles.ejs", { articles: articles });
  } catch (e) {
    console.log(e);
  }
};
