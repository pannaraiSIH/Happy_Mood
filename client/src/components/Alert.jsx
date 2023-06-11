const Alert = ({ type, text }) => {
  return (
    <p className={`bg-${type}-300 p-2 rounded-sm text-center text-${type}-700`}>
      {text}
    </p>
  );
};

export default Alert;
