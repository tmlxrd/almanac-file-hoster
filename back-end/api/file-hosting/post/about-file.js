const express = require("express");
const router = express.Router();
const infoAboutUlpoadFileDB = require("../../../mongodb/sheme/information-about-upload-to-amazon-file");

// router.post("/api/test", function (req, res) {
//   console.log(req.body)
//   res.json(req.body)
// });

router.post("/api/about-file/", function (req, res) {
  infoAboutUlpoadFileDB.find({ code: req.body.code }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs[0] != undefined) {
        res.json(`/file-hosting/download-file?code=${docs[0].code}`)
      }else{
        res.json('File undefined')
      }
    }
  });
});

module.exports = router;
