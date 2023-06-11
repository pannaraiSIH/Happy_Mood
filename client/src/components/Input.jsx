import React from 'react';

const Input = ({ type, name, id, value, placeholder, handleChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="capitalize block mt-4">
        {id}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className=" border border-orange-300 bg-orange-100 p-2 rounded-sm w-full placeholder:text-right"
      />
    </div>
  );
};

export default Input;
