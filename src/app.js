import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import productRoutes from "./routes/product.routes.js";
import quoteRoutes from "./routes/quote.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DecorVista Backend is live");
});

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);

export default app;
