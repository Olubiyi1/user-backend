// src/routes/admin.route.ts
import express from "express";
import { isLoggedIn } from "../../middlewares/isLoggedIn";
import { isAdmin } from "../../middlewares/isAdmin";
import { adminHandler } from "../../controllers/adminControllers/admin.controller";

const router = express.Router();

// Protected route - only for admins
router.get("/dashboard", isLoggedIn, isAdmin, adminHandler);

export default router;
