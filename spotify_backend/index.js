const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const bodyParser = require('body-parser');
const songRoutes = require("./routes/song");
// const playlistRoutes = require("./routes/playlist");
require("dotenv").config();
// const cors = require("cors");
const app = express();
const port = 8082;
// console.log(process.env.MONGO_URI);
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
  
// setup passport-jwt
let opts = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =  process.env.Secretorkey;
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);

app.get("/", (req, res) => {
  // req contains all data for the request
  // res contains all data for the response
  res.send("Hello World");
});
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
// app.use("/playlist", playlistRoutes)//;mongodb+srv://tanaybhuta:<password>@cluster0.uui9fqt.mongodb.net/?retryWrites=true&w=majority

// Now we want to tell express that our server will run on localhost:8000
app.listen(port, () => {
  console.log("App is running on port " + port);
});
