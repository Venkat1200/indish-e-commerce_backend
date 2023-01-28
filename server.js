const express = require("express"); // express
require("colors"); // Colors
const cors = require("cors"); //  Cors

const articleRoutes = require("./routes/articles"); // ask reagan about Namings***************************

require("dotenv").config(); // dot env File
const connectDB = require("./dbinit"); // Connecting to Database
connectDB();

const app = express(); // assigning Express to App
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080; // Asigning port

const userRoutes = require("./routes/user");

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/user", userRoutes);

app.use("/articles", articleRoutes); // confusion Ask Reagan about This ********************************

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
