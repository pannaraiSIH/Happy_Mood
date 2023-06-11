import { useState } from 'react';
import { Alert, Header, Input, Nav, SubmitButton } from '../components';
import { useAppContext } from '../context/AppContext';
import searchPic from '../assets/images/search.svg';
import CalorieCard from '../components/CalorieCard';

const Search = () => {
  const [search, setSearch] = useState('');

  const {
    isLoading,
    isSearching,
    foodName,
    foodCalorie,
    showAlert,
    alertType,
    alertText,
    displayAlert,
    getCalorie,
  } = useAppContext();

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!search) {
      displayAlert();
      return;
    }

    getCalorie(search);
  };

  return (
    <div className="grid grid-cols-[repeat(1,15rem_auto)] grid-rows-[repeat(1,7rem_auto)] w-screen bg-orange-200">
      <Header />
      <Nav />
      <div className="flex flex-col w-[70%] my-14 mx-auto p-8 bg-white rounded-md drop-shadow-md">
        <h3 className="text-center text-3xl text-orange-500 font-bold mb-4">
          Calories in Food
        </h3>

        {showAlert && <Alert type={alertType} text={alertText} />}

        {/* search form */}
        <form method="get" onSubmit={handleSubmit} className="flex gap-4">
          <div className="w-full">
            <Input
              type="text"
              name="query"
              id="search"
              value={search}
              handleChange={handleChange}
            />
          </div>
          <SubmitButton type="submit" isLoading={isLoading} text="Submit" />
        </form>

        {/* display calorie */}
        <div className="self-center my-auto">
          {isSearching ? (
            <CalorieCard foodName={foodName} calorie={foodCalorie} />
          ) : (
            <img src={searchPic} alt="" className="w-1/5 mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
