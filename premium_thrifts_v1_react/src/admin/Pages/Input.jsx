import React from "react";

const InputBox = ({
  type = "text",
  label,
  placeholder = "Enter value...",
  value,
  onChange,
  name,
  error,
  className = "",
}) => {
  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputBox;
