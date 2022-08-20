require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConnection");
const path = require("path");

const stats = require("./routes/stats");
const register = require("./routes/register");
const signin = require("./routes/signin");
const refresh = require("./routes/refresh");
const logout = require("./routes/logout");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 5000;

dbConnect();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/register", register);
app.use("/signin", signin);
app.use("/refresh", refresh);
app.use("/logout", logout);
app.use("/stats", stats);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    req.sendFile(path.join(__dirname, "client", "build", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
  });
});
