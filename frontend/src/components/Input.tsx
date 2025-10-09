import type React from "react";
import "../styles/input.scss";

type Props = {
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  textarea?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const Input: React.FC<Props> = ({
  type,
  name,
  label,
  value,
  placeholder,
  textarea = false,
  onChange,
}) => {
  return (
    <div className="input">
      <label htmlFor="" className="input__label">
        {label}
      </label>
      {!textarea ? (
        <input
          type={type}
          required
          name={name}
          className="input__field"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <textarea
          required
          name={name}
          className="input__textarea"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={4}
        />
      )}
    </div>
  );
};
