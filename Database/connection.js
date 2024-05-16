//########################################################################

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//########################################################################

const connection = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connection;
