const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 8000;
console.log(process.env.MONGO_URI);
// API : GET type : / : return text "Hello world"
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo",err);
  });
app.get("/", (req, res) => {
  // req contains all data for the request
  // res contains all data for the response
  res.send("Hello World");
});
// app.use("/auth", authRoutes);
// app.use("/song", songRoutes);
// app.use("/playlist", playlistRoutes);mongodb+srv://tanaybhuta:<password>@cluster0.uui9fqt.mongodb.net/?retryWrites=true&w=majority

// Now we want to tell express that our server will run on localhost:8000
app.listen(port, () => {
  console.log("App is running on port " + port);
});
