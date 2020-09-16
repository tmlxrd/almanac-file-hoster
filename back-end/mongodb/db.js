const mongoose = require("mongoose");

module.exports = mongoose
  .connect('mongodb+srv://lohlohpavlo:loxpavlo228@almanac.haqdf.mongodb.net/almanac?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

