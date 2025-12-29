import mongoose from "mongoose";

const selectionSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const sessionSchema = new mongoose.Schema(
  {
    name: String,
    email: String,

    roomType: String,
    budget: Number,

    selections: [selectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
