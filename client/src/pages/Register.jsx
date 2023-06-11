import { useEffect, useState } from 'react';
import { Alert, Input, SubmitButton } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const {
    user,
    showAlert,
    alertType,
    alertText,
    isLoading,
    displayAlert,
    setUpUser,
  } = useAppContext();

  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email, password } = values;

    // check inputs
    if (!email || !password || (!values.isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = {
      name: name,
      email: email,
      password: password,
    };

    if (values.isMember) {
      setUpUser({
        currentUser,
        endpoint: 'login',
        alertText: 'Login Successful!, Redirecting...',
      });
    } else {
      setUpUser({
        currentUser,
        endpoint: 'register',
        alertText: 'Created User! Redirecting...',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className="bg-orange-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white max-w-md w-full p-10 rounded-md">
        <form className="" onSubmit={handleSubmit} method="post">
          <h3 className="text-3xl font-bold text-center mb-4 text-orange-600">
            {values.isMember ? 'Login' : 'Register'}
          </h3>
          {showAlert && <Alert text={alertText} type={alertType} />}
          {/* name input */}
          {!values.isMember && (
            <Input
              type="text"
              name="name"
              id="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          {/* email input */}
          <Input
            type="email"
            name="email"
            id="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* email input */}
          <Input
            type="password"
            name="password"
            id="password"
            value={values.password}
            handleChange={handleChange}
          />
          <SubmitButton type="submit" text="submit" isLoading={isLoading} />
          <p className=" text-center">
            {values.isMember
              ? "Don't have an account?"
              : 'Already have an account?'}
            <button
              type="button"
              className="text-orange-400 font-semibold border-none focus:outline-none"
              onClick={toggleMember}
            >
              {values.isMember ? 'Sign up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
