const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  length: { type: String, required: true },
  start: { type: String, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

// Export the model for scripts (seed) while still supporting mongoose.model("Trip") in controllers.
module.exports = mongoose.models.Trip || mongoose.model("Trip", tripSchema);
