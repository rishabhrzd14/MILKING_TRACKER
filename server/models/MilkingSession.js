const mongoose = require("mongoose");

const milkingSessionSchema = new mongoose.Schema(
  {
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    duration: { type: Number, required: true },
    milk_quantity: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("MilkingSession", milkingSessionSchema);
