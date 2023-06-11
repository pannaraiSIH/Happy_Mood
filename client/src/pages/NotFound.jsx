import { Link } from 'react-router-dom';
import notFound from '../assets/images/not-found.svg';

const NotFound = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-orange-300">
      <div>
        <img src={notFound} alt="" className="w-1/2 mx-auto" />
        <h3 className="text-orange-600 text-3xl text-center mt-8 font-bold">
          Page Not Found!!
        </h3>
        <p className="text-center mt-4">
          We can't seem to find the page you're looking for
        </p>
        <Link to="/">
          <button
            type="button"
            className="text-center w-full underline mt-1 text-orange-600 p-3 border-none"
          >
            {' '}
            Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
