import React from "react";

export default function Input({
  placeholder,
  type,
  name,
  value,
  onChange,
  autoComplete,
  icon,
  id,
  label,
  inputStyle,
}) {
  return (
    <div className={inputStyle}>
      <div>
        <label for={id}>{label}</label>
        <input
          id={id}
          className={inputStyle}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
      </div>

      <div className="hover:cursor-pointer">{icon}</div>
    </div>
  );
}
