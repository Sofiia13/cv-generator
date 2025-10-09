import type React from "react";
import { Input } from "./Input";
import { useState } from "react";
import axios from "axios";

type FormData = {
  name: string;
  position: string;
  city: string;
  skills: string;
};

export const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    city: "",
    skills: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [generatedFileName, setGeneratedFileName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        console.log(responseMessage);
        setGeneratedFileName(res.data.fileName);
        setFormData({
          name: "",
          position: "",
          city: "",
          skills: "",
        });
      })
      .catch((err) => {
        setResponseMessage("Error sending data");
      });
  };

  const downloadFile = async (fileName: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/cv/${fileName}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
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
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="position"
          label="Position"
          value={formData.position}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="skills"
          label="Skills"
          value={formData.skills}
          onChange={handleChange}
        />
        <button type="submit">Generate CV</button>
      </form>

      <button onClick={() => downloadFile(generatedFileName)}>Download</button>
    </>
  );
};
