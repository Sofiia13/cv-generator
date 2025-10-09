import { createDocx } from "../services/cvService.js";

export const generateCV = async (req, res) => {
  const { name, city, skills, experience } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name and city are required" });
  }

  try {
    const createFile = await createDocx({ name, city, skills, experience });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=${name}_CV.docx`,
    });

    res.send(createFile);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate CV" });
  }
};
