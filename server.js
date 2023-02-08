require("dotenv").config(); // dot env File
const express = require("express"); // express
require("colors"); // Colors
const cors = require("cors"); //  Cors

const articleRoutes = require("./routes/articlesRoutes"); // ask reagan about Namings***************************
// const imageRoutes = require("./routes/imageRoutes");

const connectDB = require("./dbinit"); // Connecting to Database
connectDB();

const app = express(); // assigning Express to App
app.use(express.json()); // (app.use = adds middleware to the group), (express.json = Parses JSON requests and puts the data in req.body)
app.use(cors());

const PORT = process.env.PORT || 3000; // Asigning port

const userRoutes = require("./routes/userRoutes");

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/users", userRoutes);

app.use("/articles", articleRoutes); // confusion Ask Reagan about This ********************************

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
