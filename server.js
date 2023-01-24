const express = require("express");
require("colors");

require("dotenv").config();
const connectDB = require("./dbinit");
connectDB();

const app = express();
app.use(express.json());

const articleRoutes = require("./routes/articles"); // ask reagan about Namings***************************

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/articles", articleRoutes); // confusion Ask Reagan about This ********************************

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
