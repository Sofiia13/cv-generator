import type React from "react";

type Props = {
  label: string;
};

export const Textarea: React.FC<Props> = ({ label }) => {
  return (
    <div className="textarea">
      <label htmlFor="" className="textarea__label">
        {label}
      </label>
      <textarea className="textarea__field" />
    </div>
  );
};
