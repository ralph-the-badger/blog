const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const homeRoutes = require("./routes/home");
const articlesRoutes = require("./routes/articles");

dotenv.config({ path: "./config/.env" });

const dbConnection = require("./config/db");
dbConnection();

const app = express();

app.set("view engine", "ejs");
app.set("ejs", "ejs");

// middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use(homeRoutes);
app.use("/articles", articlesRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is listening on ${process.env.NODE_ENV} mode on ${port}.`
  );
});
