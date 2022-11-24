const mongoose = require("mongoose");
const petSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  cloudinary_id: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("pet", petSchema);
