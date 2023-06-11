import { useState } from 'react';
import { Input, Header, Nav, Radio } from '../components';
import { useAppContext } from '../context/AppContext';

const initialState = {
  gender: '',
  age: '',
  weight: '',
  height: '',
  activity: '',
};

const Landing = () => {
  const [values, setValues] = useState(initialState);

  const {
    token,
    isCalculating,
    calorieOfUser,
    displayAlert,
    calculateCalorie,
  } = useAppContext();

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { gender, age, weight, height, activity } = values;

    if (!gender || !age || !weight || !height || !activity) {
      displayAlert();
    }

    const currentUser = {
      gender,
      age,
      weight,
      height,
      activity,
    };

    calculateCalorie({
      currentUser,
      authHeader: token,
      alertText: 'Calculate Calorie Successful!',
    });
  };

  return (
    <div className="grid grid-cols-[repeat(1,15rem_auto)] grid-rows-[repeat(1,7rem_auto)] bg-orange-200">
      <Header />
      <Nav />

      {/* {showAlert && <Alert />} */}

      {/* hero */}
      <div className="col-start-2 m-14 ">
        {/* calorie calculator */}
        <div className=" border border-amber-300 grid grid-cols-2 drop-shadow-md">
          <h3 className=" text-2xl text-center font-bold text-amber-500 bg-amber-200 p-4 col-span-2">
            Calorie Calculator
          </h3>

          {/* form */}
          <form onSubmit={handleSubmit} className=" p-6 w-full bg-white ">
            {/* gender */}
            <div className="">
              <h4 className="mb-2">Gender</h4>
              <Radio
                name="gender"
                id="male"
                value="male"
                handleChange={handleChange}
              />
              <Radio
                name="gender"
                id="female"
                value="female"
                handleChange={handleChange}
              />
            </div>

            {/* age input */}
            <Input
              type="text"
              name="age"
              id="age"
              value={values.age}
              placeholder="years"
              handleChange={handleChange}
            />

            {/* weight input */}
            <Input
              type="text"
              name="weight"
              id="weight"
              value={values.weight}
              placeholder="kg"
              handleChange={handleChange}
            />

            {/* height input */}
            <Input
              type="text"
              name="height"
              id="height"
              value={values.height}
              placeholder="cm"
              handleChange={handleChange}
            />

            {/* activity input */}
            <div className="mt-4">
              <h4 className="mb-2">Level of Activity</h4>
              <Radio
                name="activity"
                id="secondary"
                value="1.2"
                handleChange={handleChange}
              />
              <Radio
                name="activity"
                id="lightly-active"
                value="1.375"
                handleChange={handleChange}
              />
              <Radio
                name="activity"
                id="moderate-active"
                value="1.55"
                handleChange={handleChange}
              />
              <Radio
                name="activity"
                id="active"
                value="1.725"
                handleChange={handleChange}
              />
              <Radio
                name="activity"
                id="very-active"
                value="1.9"
                handleChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-sm bg-amber-500 text-white font-bold mt-4"
            >
              Calculate
            </button>
          </form>

          {/* display calorie */}
          <div className="p-6 bg-amber-100">
            {isCalculating ? (
              <p>
                Your estimated daily calorie needs to your current weight:{' '}
                {calorieOfUser}{' '}
              </p>
            ) : (
              <p>
                The number of calories a person uses each day depends on gender,
                age, weight, height and activity level.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
