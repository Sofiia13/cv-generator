import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";

export const createDocx = async ({ name, city, skills, experience }) => {
  const skillsArray = skills
    ? skills.split(",").map((skill) => skill.trim())
    : [];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Resume",
                bold: true,
                size: 72,
              }),
            ],
            alignment: "center",
            spacing: { before: 300, after: 300 },
          }),

          new Paragraph({
            text: `Name: ${name}`,
            heading: "heading1",
          }),
          new Paragraph({ text: `City: ${city}` }),

          new Paragraph({ text: `Skills:`, heading: "heading2" }),
          ...skillsArray.map(
            (skill) =>
              new Paragraph({
                text: skill,
                bullet: { level: 0 },
              })
          ),

          new Paragraph({ text: `Experience: ${experience}` }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};
