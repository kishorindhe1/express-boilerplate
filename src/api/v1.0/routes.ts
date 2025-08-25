import express from "express";
import authRoutes from "./auth/auth.routes";
// Create a new router instance
const router = express.Router();
router.use("/auth", authRoutes);

export default router;
