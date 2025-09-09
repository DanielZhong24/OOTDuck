import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black p-5">
      <div className="flex">
        <div className="group flex-1">
          <Link
            to="/"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <i className="far fa-home pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"></i>
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/photo"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <i className="far fa-camera-retro pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"></i>
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/outfits"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <i className="far fa-grin-hearts pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"></i>
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/login"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <i className="far fa-user-circle pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
