import React from "react";

interface CustomInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = "",
  className = "",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue ${className}`}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
