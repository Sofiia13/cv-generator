import { Document, Packer, Paragraph, TextRun } from "docx";

export const createDocx = async ({ name, city, skills, experience }) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: `Name: ${name}`, heading: "heading1" }),
          new Paragraph({ text: `City: ${city}` }),
          new Paragraph({ text: `Skills: ${skills}` }),
          new Paragraph({ text: `Experience: ${experience}` }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};
