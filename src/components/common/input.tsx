import React from 'react';

interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({name, label, value, onChange}: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name="username"
        id="username"
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
