import type React from "react";

type Props = {
  type: string;
  label: string;
};

export const Input: React.FC<Props> = ({ type, label }) => {
  return (
    <div className="input">
      <label htmlFor="" className="input__label">
        {label}
      </label>
      <input type={type} className="input__field" />
    </div>
  );
};
