import express from "express";
import { generateCV, getCV } from "../controllers/cvController.js";

const router = express.Router();

router.post("/cv", generateCV);
router.get("/cv:name", getCV);

export default router;
