import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const generateCV = async ({ name, city, skills, experience }) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: `Name: ${name}`, heading: "Heading1" }),
          new Paragraph({ text: `City: ${city}` }),
          new Paragraph({ text: `Skills: ${skills}` }),
          new Paragraph({ text: `Experience: ${experience}` }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
  });
};
