const Radio = ({ id, name, value, handleChange }) => {
  return (
    <div className="space-y-2 inline-block w-1/2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor={id} className="capitalize ">
        {id}
      </label>
    </div>
  );
};

export default Radio;
