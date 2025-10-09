import type React from "react";
import { Input } from "./Input";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import "../styles/form.scss";
import { ClipLoader } from "react-spinners";

type FormData = {
  name: string;
  position: string;
  city: string;
  skills: string;
  experience: string;
};

type Props = {
  onSubmitSuccess: (fileName: string) => void;
};

export const Form: React.FC<Props> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    city: "",
    skills: "",
    experience: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  let [loading, setLoading] = useState(false);

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
    setLoading(true);

    axios
      .post("http://localhost:3001/cv", formData)
      .then((res) => {
        setResponseMessage("Sent data successfully!");

        console.log("Sent data successfully!");

        setFormData({
          name: "",
          position: "",
          city: "",
          skills: "",
          experience: "",
        });
        setLoading(false);
        onSubmitSuccess(res.data.fileName);
      })
      .catch((err) => {
        setResponseMessage("Error sending data");
      });
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

        <button type="submit" className="form__button">
          {loading ? (
            <ClipLoader
              className="clip-loader"
              color="#dad7d7ff"
              loading={loading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Generate CV"
          )}
        </button>
      </form>
    </>
  );
};
