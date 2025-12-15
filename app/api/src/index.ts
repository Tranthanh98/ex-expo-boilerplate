import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { auth } from "./auth";
import { rateLimiter } from "./configs/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const app: express.Application = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(rateLimiter);
app.use(express.static("public"));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Auth endpoints: http://localhost:${PORT}/api/auth/*`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`OpenAPI Spec (JSON): http://localhost:${PORT}/api-docs/json`);

  // Initialize job service
  //   try {
  //     await initializeJobService();
  //     await initializeAllJobs();
  //   } catch (error) {
  //     console.error("Failed to initialize job service:", error);
  //   }
});

export default app;
