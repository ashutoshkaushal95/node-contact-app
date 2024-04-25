const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

connectDb();

// middlewares

// body parser middleware to parse the http data stream
app.use(express.json());
// middleware to access routes from contactRoutes.js file
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// error handler middleware
app.use(errorHandler);

// running the app
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
