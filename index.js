const express = require("express");
const multer = require("multer");
const app = express();
var bodyParser = require("body-parser");
require("./back-end/mongodb/db",{ useNewUrlParser: true, useFindAndModify: false});
require("dotenv").config();

const port = 5000||8000

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "delete");
  },
  filename: (req, file, cb) => {
    cb(null, +Date.now() + "-" + file.originalname);
  },
});

app
  .use(express.static("front-end"))
  .use(express.json())
  .use(bodyParser.json())
  .use(multer({ storage: storageConfig }).single("filedata"))
  .use(require("./back-end/api/api"))
  .listen(port, function() {
    console.log("App is running on port " + port);
});
