import { useEffect, useState } from 'react';
import { Alert, Header, Input, Nav, SubmitButton } from '../components';
import { useAppContext } from '../context/AppContext';

const initialState = {
  name: '',
  email: '',
};

const Profile = () => {
  const {
    user,
    token,
    showAlert,
    alertText,
    alertType,
    displayAlert,
    updateUser,
  } = useAppContext();

  const [values, setValues] = useState(initialState);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email } = values;

    if (!name || !email) {
      displayAlert();
      return;
    }

    const currentUser = {
      name,
      email,
    };

    if (user) {
      updateUser({
        currentUser,
        authHeader: token,
        alertText: 'Update Successful!',
      });
    } else {
      displayAlert('Please Login');
      return;
    }
  };

  // put user's info into form
  useEffect(() => {
    if (user) {
      setValues({ ...values, name: user.name, email: user.email });
    }
  }, [user]);

  return (
    <div className="grid grid-cols-[repeat(1,15rem_auto)] grid-rows-[repeat(1,7rem_1fr)] w-screen bg-orange-200">
      <Header />
      <Nav />

      {/* update form */}
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-[65%] min-h-[5rem] mx-auto my-14 border flex flex-col justify-center bg-white border-orange-300 drop-shadow-md rounded-md p-8"
      >
        <h3 className="text-3xl font-bold text-center mb-4 text-orange-600">
          Profile
        </h3>

        {/* display alert */}
        {showAlert && <Alert type={alertType} text={alertText} />}

        {/* name input */}
        <Input
          type="text"
          name="name"
          id="name"
          value={values.name}
          handleChange={handleChange}
        />

        {/* email input */}
        <Input
          type="email"
          name="email"
          id="email"
          value={values.email}
          handleChange={handleChange}
        />
        <SubmitButton type="submit" text="Update" />
      </form>
    </div>
  );
};

export default Profile;
