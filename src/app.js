import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import productRoutes from "./routes/product.routes.js";
import quoteRoutes from "./routes/quote.routes.js";

const app = express();

/**
 * ✅ CORS CONFIG — MUST BE FIRST
 * Replace the origin with your EXACT Vercel frontend URL
 */
app.use(
  cors({
    origin: [
      "https://decor-vista-frontend-tql9-aar6nez71.vercel.app",
      "https://decorvista-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight
app.options("*", cors());

/**
 * Body parser
 */
app.use(express.json());

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("DecorVista Backend is live");
});

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);

export default app;
