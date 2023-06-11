const SubmitButton = ({ type, text, isLoading }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="self-end w-full border bg-orange-400 px-2 p-2 mt-7 rounded-sm font-semibold text-white outline-orange-400"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
