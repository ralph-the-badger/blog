const Article = require("../models/article");

// const articles = [
//   {
//     title: "First Article",
//     createdAt: new Date(),
//     description: "First Description",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat necessitatibus illo quo ratione fugit velit temporibus id. Quis voluptas corporis exercitationem nam nobis? Alias dignissimos sequi corrupti quod iste, esse earum cumque. Iure ex numquam consequatur officiis provident reprehenderit facere optio repellat commodi quos molestiae a expedita mollitia, excepturi velit sit quo, magni nemo impedit eligendi delectus hic, dolor sunt illum. Delectus dolorum laborum, voluptatem neque nam reprehenderit at eveniet ut. Necessitatibus velit eos praesentium, aspernatur, quasi id, dicta aut tempore magni ipsam porro reprehenderit incidunt error itaque est nam deserunt quia dolore. Earum blanditiis eaque omnis accusantium delectus!",
//   },
//   {
//     title: "Second Article",
//     createdAt: new Date(),
//     description: "Second Description",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat necessitatibus illo quo ratione fugit velit temporibus id. Quis voluptas corporis exercitationem nam nobis? Alias dignissimos sequi corrupti quod iste, esse earum cumque. Iure ex numquam consequatur officiis provident reprehenderit facere optio repellat commodi quos molestiae a expedita mollitia, excepturi velit sit quo, magni nemo impedit eligendi delectus hic, dolor sunt illum. Delectus dolorum laborum, voluptatem neque nam reprehenderit at eveniet ut. Necessitatibus velit eos praesentium, aspernatur, quasi id, dicta aut tempore magni ipsam porro reprehenderit incidunt error itaque est nam deserunt quia dolore. Earum blanditiis eaque omnis accusantium delectus!",
//   },
//   {
//     title: "Third Article",
//     createdAt: new Date(),
//     description: "Third Description",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat necessitatibus illo quo ratione fugit velit temporibus id. Quis voluptas corporis exercitationem nam nobis? Alias dignissimos sequi corrupti quod iste, esse earum cumque. Iure ex numquam consequatur officiis provident reprehenderit facere optio repellat commodi quos molestiae a expedita mollitia, excepturi velit sit quo, magni nemo impedit eligendi delectus hic, dolor sunt illum. Delectus dolorum laborum, voluptatem neque nam reprehenderit at eveniet ut. Necessitatibus velit eos praesentium, aspernatur, quasi id, dicta aut tempore magni ipsam porro reprehenderit incidunt error itaque est nam deserunt quia dolore. Earum blanditiis eaque omnis accusantium delectus!",
//   },
//   {
//     title: "Fourth Article",
//     createdAt: new Date(),
//     description: "Fourth Description",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat necessitatibus illo quo ratione fugit velit temporibus id. Quis voluptas corporis exercitationem nam nobis? Alias dignissimos sequi corrupti quod iste, esse earum cumque. Iure ex numquam consequatur officiis provident reprehenderit facere optio repellat commodi quos molestiae a expedita mollitia, excepturi velit sit quo, magni nemo impedit eligendi delectus hic, dolor sunt illum. Delectus dolorum laborum, voluptatem neque nam reprehenderit at eveniet ut. Necessitatibus velit eos praesentium, aspernatur, quasi id, dicta aut tempore magni ipsam porro reprehenderit incidunt error itaque est nam deserunt quia dolore. Earum blanditiis eaque omnis accusantium delectus!",
//   },
//   {
//     title: "Fifth Article",
//     createdAt: new Date(),
//     description: "Fifth Description",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat necessitatibus illo quo ratione fugit velit temporibus id. Quis voluptas corporis exercitationem nam nobis? Alias dignissimos sequi corrupti quod iste, esse earum cumque. Iure ex numquam consequatur officiis provident reprehenderit facere optio repellat commodi quos molestiae a expedita mollitia, excepturi velit sit quo, magni nemo impedit eligendi delectus hic, dolor sunt illum. Delectus dolorum laborum, voluptatem neque nam reprehenderit at eveniet ut. Necessitatibus velit eos praesentium, aspernatur, quasi id, dicta aut tempore magni ipsam porro reprehenderit incidunt error itaque est nam deserunt quia dolore. Earum blanditiis eaque omnis accusantium delectus!",
//   },
//   {
//     title: "Sixth Article",
//     createdAt: new Date(),
//     description: "Sixth Description",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat necessitatibus illo quo ratione fugit velit temporibus id. Quis voluptas corporis exercitationem nam nobis? Alias dignissimos sequi corrupti quod iste, esse earum cumque. Iure ex numquam consequatur officiis provident reprehenderit facere optio repellat commodi quos molestiae a expedita mollitia, excepturi velit sit quo, magni nemo impedit eligendi delectus hic, dolor sunt illum. Delectus dolorum laborum, voluptatem neque nam reprehenderit at eveniet ut. Necessitatibus velit eos praesentium, aspernatur, quasi id, dicta aut tempore magni ipsam porro reprehenderit incidunt error itaque est nam deserunt quia dolore. Earum blanditiis eaque omnis accusantium delectus!",
//   },
// ];

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
