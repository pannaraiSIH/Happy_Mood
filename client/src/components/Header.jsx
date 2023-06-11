import { useEffect, useState } from 'react';
import happyMood from '../assets/images/happy-mood.svg';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMember, setIsMember] = useState(false);

  const { user, logoutUser } = useAppContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    if (isMember) {
      logoutUser();
      setIsMember(false);
    } else {
      navigate('/register');
    }
  };

  useEffect(() => {
    if (user) {
      setIsMember(true);
    }
  }, []);

  return (
    <header className="col-start-2 bg-white py-6 drop-shadow-md">
      <div className="flex w-[90%] mx-auto">
        <img src={happyMood} alt="" className="w-[10%] " />
        <p className="mr-auto ml-4 self-center text-2xl font-bold uppercase">
          <span className="text-rose-500 "> Happy</span>{' '}
          <span className="text-orange-400">Mood</span>:
        </p>

        {isMember && (
          <h2 className="font-bold text-center text-xl text-amber-500 self-center mr-4">
            Welcome back, {user.name}!
          </h2>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="border border-orange-300 px-6 h-10 self-center rounded-full bg-orange-300 font-semibold hover:bg-orange-400"
        >
          {isMember ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
};

export default Header;
