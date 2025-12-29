import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  sessionId: String,
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quote", quoteSchema);