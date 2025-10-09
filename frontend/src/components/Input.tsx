import type React from "react";

type Props = {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  type,
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="input">
      <label htmlFor="" className="input__label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="input__field"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
