const express = require("express");
const router = express.Router();
const infoAboutUlpoadFileDB = require("../../../mongodb/sheme/information-about-upload-to-amazon-file");
let uploadDB;
router.post("/api/download-file", function (req, res) {
  infoAboutUlpoadFileDB.find({ code: req.body.code }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs[0] != undefined) {
        if (docs[0].maxData == '0') {
          let dayForDelete;
          let monthForDelete;
          if (
            new Date().getDate() + 1 >
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
            ).getDate()
          ) {
            dayForDelete =
              new Date().getDate() +
              1 -
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).getDate();
            monthForDelete = new Date().getMonth() + 2;
          } else {
            dayForDelete = new Date().getDate() + 1;
            monthForDelete = new Date().getMonth() + 1;
          }
          uploadDB = {
            download: true,
            dayForDelete: dayForDelete,
           monthForDelete: monthForDelete,
          };
        } else {
          uploadDB = {
            download: true,
          };
        }
        console.log(uploadDB)
        infoAboutUlpoadFileDB.findOneAndUpdate(
          { code: req.body.code },
          uploadDB,
          function (err, docs) {
            console.log(Buffer.from(req.body.code, "base64").toString("ascii"));
            console.log(docs)
            res.json({ path: docs.pathInAmazon,minute: docs.minute,
              hour: docs.hourForDelete,
              day: docs.dayForDelete,
              month: docs.monthForDelete,
              year: docs.yearForDelete,
              oneDownload: docs.oneDownload,
            originalName:docs.originalName,
          code:docs.code,
          downloadCounter:docs.downloadCounter });
          }
        );
      } else {
        res.json("File undefined");
      }
    }
  });
});

// downloadCounter: docs[0].downloadCounter + 1,
router.post("/api/download-file/click", function (req, res) {
  infoAboutUlpoadFileDB.find({ code: req.body.code }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs[0] != undefined) {
        infoAboutUlpoadFileDB.findOneAndUpdate(
          { code: req.body.code },
          {downloadCounter: docs[0].downloadCounter + 1},
          function (err, docs) {
            res.json(++docs.downloadCounter)
          })
      }}})
})

module.exports = router;