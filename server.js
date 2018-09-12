//requiring the modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
//establishing mongoDB connection
let db;
MongoClient.connect(
  "mongodb://localhost:27017",
  (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db("imgprocess");
  }
);
//middlewares
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(
  bodyParser.json({
    parameterLimit: 100000,
    extended: true,
    limit: "50mb"
  })
);
//API to upload images
app.post("/upload", bodyParser.json(), (req, res) => {
  db.collection("images")
    .insertOne(req.body)
    .then(image => res.json(image))
    .catch(err => {
      console.log("err", err);
      res.json(err);
    });
});
//server to listen on port 3001
app.listen(3001, () => console.log("Example app listening on port 3001!"));
