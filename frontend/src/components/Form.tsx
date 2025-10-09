import type React from "react";
import { Input } from "./Input";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import "../styles/form.scss";

type FormData = {
  name: string;
  position: string;
  city: string;
  skills: string;
  experience: string;
};

export const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    city: "",
    skills: "",
    experience: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [generatedFileName, setGeneratedFileName] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/cv", formData)
      .then((res) => {
        setResponseMessage("Sent data successfully!");

        console.log("Sent data successfully!");

        setGeneratedFileName(res.data.fileName);
        setFormData({
          name: "",
          position: "",
          city: "",
          skills: "",
          experience: "",
        });
      })
      .catch((err) => {
        setResponseMessage("Error sending data");
      });
  };

  const downloadFile = async () => {
    if (!generatedFileName) return alert("First generate the CV!");

    try {
      console.log("📤 Downloading file:", generatedFileName);
      const response = await axios.get(
        `http://localhost:3001/cv/${generatedFileName}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", generatedFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <Input
          type="text"
          name="name"
          label="Name"
          value={formData.name}
          placeholder="e.g., Sofiia Stanishevska"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="position"
          label="Position"
          value={formData.position}
          placeholder="e.g., Frontend Developer"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="city"
          label="City"
          value={formData.city}
          placeholder="e.g., Lviv"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="skills"
          label="Skills"
          value={formData.skills}
          placeholder="e.g., React, TypeScript, CSS"
          textarea
          onChange={handleChange}
        />
        <Input
          type="text"
          name="experience"
          label="Experience"
          value={formData.experience}
          placeholder="Enter you experiense..."
          textarea
          onChange={handleChange}
        />

        <div className="form__buttons">
          <button type="submit" className="form__button form__generate">
            Generate CV
          </button>
          <button onClick={downloadFile} className="form__button form__download">
            Download
          </button>
        </div>
      </form>
    </>
  );
};
