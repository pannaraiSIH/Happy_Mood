const CalorieCard = ({ foodName, calorie }) => {
  return (
    <div>
      {calorie ? (
        <div className="w-[18rem] h-[12rem] border border-rose-400 rounded-md ">
          <h5 className="text-xl text-rose-600 font-bold mb-8 text-center bg-rose-300 p-4">
            {foodName}
          </h5>
          <p className="text-xl p-4 text-center">Calorie: {calorie}</p>
        </div>
      ) : (
        <p className="text-lg text-gray-700">
          {' '}
          {`Your search - ${foodName} - did not match any foods.`}
        </p>
      )}
    </div>
  );
};

export default CalorieCard;
