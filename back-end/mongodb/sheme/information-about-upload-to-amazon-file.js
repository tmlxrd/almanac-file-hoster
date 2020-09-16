const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "tests",
  new Schema({
    fieldname: String,
    originalName: String,
    encoding: String,
    mimetype: String,
    from: String,
    filename: String,
    pathInAmazon: String,
    size: Number,
    upload: Number,
    code: String,
    minute:Number,
    hour: Number,
    hourForDelete: Number,
    day: Number,
    dayForDelete: Number,
    month: Number,
    monthForDelete: Number,
    year: Number,
    yearForDelete: Number,
    oneDownload: Boolean,
    maxData: Number,
    download: Boolean,
    downloadCounter: { type: Number, default: 0 },
  })
);
