import type React from "react";
import { Input } from "./Input";
import { useState } from "react";

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

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Name" value={formData.name} onChange="" />
        <Input
          type="text"
          label="Position"
          value={formData.position}
          onChange=""
        />
        <Input type="text" label="City" value={formData.city} onChange="" />
        <Input type="text" label="Skills" value={formData.skills} onChange="" />
      </form>
    </>
  );
};
