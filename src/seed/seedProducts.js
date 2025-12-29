import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Product.deleteMany();

await Product.insertMany([
  { name: "Sofa", price: 12000, category: "Furniture" },
  { name: "Lamp", price: 2500, category: "Lighting" }
]);

console.log("Products seeded");
process.exit();