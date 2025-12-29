import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import productRoutes from "./routes/product.routes.js";
import quoteRoutes from "./routes/quote.routes.js";

const app = express();

/**
 * 🔥 HARD ALLOW EVERYTHING (TEMPORARY)
 * This guarantees OPTIONS + CORS work
 */
app.use(cors({
  origin: true,
  credentials: true,
}));

/**
 * 🔥 FORCE EXPRESS TO ANSWER OPTIONS
 * THIS IS THE KEY LINE
 */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DecorVista Backend is live");
});

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);

export default app;
