import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className=" row-start-1 row-span-2 bg-white min-h-screen drop-shadow-md">
      <ul className="mt-[6rem] space-y-6 text-orange-500 font-bold text-xl ">
        <li>
          <Link
            to="/"
            className="bg-orange-100 py-4 px-8 block hover:bg-orange-300 hover:text-white"
          >
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" className="px-8 block">
            Search
          </Link>
        </li>
        <li>
          <Link to="/profile" className="px-8 block">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
