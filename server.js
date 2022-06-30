const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const checkUser = require("./middlewares/checkUser");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");

// configuration
dotenv.config({ path: "./config/.env" });

const dbConnection = require("./config/db");
dbConnection();

const app = express();

app.set("view engine", "ejs");
app.set("ejs", "ejs");

// middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cookieParser());

// routes
app.get("*", checkUser);
app.use(homeRoutes);
app.use(authRoutes);
app.use("/articles", articlesRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is listening on ${process.env.NODE_ENV} mode on ${port}.`
  );
});
