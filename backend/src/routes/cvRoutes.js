import express from "express";
import { generateCV } from "../controllers/cvController.js";

const router = express.Router();

router.post("/cv", generateCV);

export default router;
