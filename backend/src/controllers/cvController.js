import { createDocx } from "../services/cvService.js";
import fs from "fs";
import path from "path";

const filesDir = path.join(process.cwd(), "generated_files");
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

export const generateCV = async (req, res) => {
  const { name, city, skills, experience } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name and city are required" });
  }

  try {
    const createFile = await createDocx({ name, city, skills, experience });

    const safeName = name.replace(/\s+/g, "_");
    const fileName = `${safeName}_CV.docx`;

    const filePath = path.join(filesDir, fileName);

    fs.writeFileSync(filePath, createFile);

    res.json({ fileName });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate CV" });
  }
};

export const getCV = (req, res) => {
  const filePath = path.join(filesDir, req.params.name);
  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "File not found" });

  res.download(filePath);
};
