import express from "express";
import { generateCV, getCV } from "../controllers/cvController.js";

const router = express.Router();

router.post("/", generateCV);
router.get("/:name", getCV);

export default router;
