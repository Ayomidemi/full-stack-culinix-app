const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connected to database!");
  } catch (error) {
    console.error("Connection to database failed:", error.message);
  }
};

module.exports = connectDB;
