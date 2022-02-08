exports.getHome = async (req, res, next) => {
  try {
    await res.render("../views/home.ejs", {
      path: "/",
      pageTitle: "Home",
    });
  } catch (e) {
    console.log(e);
  }
};
