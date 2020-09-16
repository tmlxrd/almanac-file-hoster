const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const infoAboutUlpoadFileDB = require("../../../mongodb/sheme/information-about-upload-to-amazon-file");
let filePath;
let minute;
let hour;
let hourForDelete
      let day
      let month
      let reqBodyData
      let dayForDelete;
      let monthForDelete;
      let oneDownload;
      let year;
      let yearForDelete;

AWS.config.update({
  secretAccessKey: 'rsIQ3fb1h73Lnh/P87FYvawysqKEX7MajZNYbJcV',
  accessKeyId: 'AKIAZ5HR36PS33SVX6OG',
  region: 'us-east-2',
  ACL: "public-read",
});

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const uploadParams = { Bucket: 'test-bucket-almanac', ACL: "public-read" };



const uploadFileToBucket = (req, res) => {
  filePath = `./delete/${req.file.filename}`;
  // console.log(req.file)
  var fileStream = fs.createReadStream(filePath);

  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  var path = require("path");
  uploadParams.Key = path.basename(filePath);

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      minute = new Date().getUTCMinutes()
      hour = hourForDelete = new Date().getHours();
       day = new Date().getDate();
       month = new Date().getMonth() + 1;
       year =yearForDelete= new Date().getFullYear()
       reqBodyData
      req.body.maxData === '0' ? reqBodyData = 0 : req.body.maxData === '1' ? reqBodyData = 1 : req.body.maxData === '7' ? reqBodyData = 7 : reqBodyData = 30
      if (reqBodyData === 0) {
        oneDownload = true;
        reqBodyData = 1
      } else {
        oneDownload = false
      }
        if (
          new Date().getDate() + reqBodyData >
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ).getDate()
        ) {
          dayForDelete =new Date().getDate() +reqBodyData -new Date(new Date().getFullYear(), new Date().getMonth() + 1,0).getDate();
          monthForDelete = new Date().getMonth() + 2;
        } else if(new Date().getDate() + reqBodyData >
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate() && new Date().getMonth() + 2 > 12){
          dayForDelete =new Date().getDate() +reqBodyData -new Date(new Date().getFullYear(), new Date().getMonth() + 1,0).getDate();
          monthForDelete = new Date().getMonth() + 2;
          yearForDelete = new Date().getFullYear() + 1
        }else {
          dayForDelete = new Date().getDate() + reqBodyData;
          monthForDelete = new Date().getMonth() + 1;
        }
      infoAboutUlpoadFileDB.create({
        fieldname: req.file.fieldname,
        originalName: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        from: "browser",
        filename: req.file.filename,
        size: req.file.size,
        code: Buffer.from(req.file.filename).toString("base64"),
        pathInAmazon: data.Location,
        minute:minute,  
        hour:hour,
          hourForDelete:hourForDelete,
          day: day,
          dayForDelete: dayForDelete,
          month: month,
          monthForDelete: monthForDelete,
          year: year,
          yearForDelete:yearForDelete,
          oneDownload: oneDownload,
          maxData: reqBodyData,
        
        download: false,
        downloadCounter: 0,
      });

      console.log(yearForDelete)
    
  
  console.log(filePath);
  fs.unlink(filePath, function (err) {
    if (err) throw err;

    console.log("file deleted");
  });
  // res.sendFile('./index.html');
  // res.send(Buffer.from(req.file.filename).toString("base64"));
  res.redirect(`/file-hosting/download-file?code=${Buffer.from(req.file.filename).toString("base64")}`);
}
});
};

router.post("/api/upload-file", function (req, res, next) {
  if (!req.file) res.send("Ошибка при загрузке файла");
  else {
    uploadFileToBucket(req, res);
    console.log(req.body);
  }
});

module.exports = router;