import { Link } from "react-router-dom";
import HomeIcon from '~icons/mdi-light/home';
import CameraIcon from '~icons/mdi-light/camera';
import BookmarkIcon from '~icons/mdi-light/bookmark';
import SettingIcon from '~icons/mdi-light/settings';
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
              <HomeIcon className="pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500" />
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/photo"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <CameraIcon className="far fa-camera-retro pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"/>
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/outfits"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <BookmarkIcon className="far fa-grin-hearts pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"/>
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/login"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <SettingIcon className="far fa-user-circle pt1 mb-1 block text-xl text-white transition-colors duration-200 hover:text-gray-500"/>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
