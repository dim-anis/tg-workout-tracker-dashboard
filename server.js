const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config();
const stats = require("./routes/stats");
const cors = require("cors");

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    req.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  })
}

// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/stats", stats);

app.get("/", (req, res) => {
  res.redirect("/stats/workouts");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});

mongoose.connect(process.env.ATLAS_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error!"));
db.on("connected", () => console.log("Successfully connected to MongoDB."));
