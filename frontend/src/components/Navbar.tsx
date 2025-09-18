import { Link } from "react-router-dom";
import HomeIcon from '~icons/mdi-light/home';
import CameraIcon from '~icons/mdi-light/camera';
import BookmarkIcon from '~icons/mdi-light/bookmark';
import SettingIcon from '~icons/mdi-light/settings';
// import PlusIcon from '~icons/mdi-light/plus';
import axios from "axios";
import { useRef } from "react";
function Navbar() {

  const fileInputReferance = useRef<HTMLInputElement>(null);

  const handleFileClick =() =>{
    fileInputReferance.current?.click();
  }

  const sumbitImage = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    let bodyData = new FormData();
    bodyData.append('season','summer');
    if(e.target.files){

      bodyData.append('image',e.target.files[0]);
    }else{
      console.log("error, image is not support or wrong file");
      return 
    }

    bodyData.append("userId","3");
    axios.post("http://localhost:6767/api/clothes",bodyData).then((response)=>{
      console.log(response);
    }).catch(e =>{
      console.log("Error:",e);
    });
  }

  return (
  
    <div className="fixed bottom-0 left-0 w-full  bg-white pt-5 pb-10 rounded-2xl border-black shadow-2xl p-1">
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full aspect-square p-3.5" >
          <span className="block px-1" onClick={handleFileClick}>
            <CameraIcon className="pt-1 mb-1 block  text-3xl text-black transition-colors duration-200 hover:text-gray-500"/>
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={sumbitImage} ref={fileInputReferance} capture/>
  
      </div>
      <div className="flex">
        <div className="group flex-1">
          <Link
            to="/"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <HomeIcon className="font-bold mb-1 block text-3xl text-gray transition-colors duration-200 hover:text-gray-500" />
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/photo"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <CameraIcon className="mb-1 block text-3xl text-black transition-colors duration-200 hover:text-gray-500"/>
            </span>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="group flex-1">
          <Link
            to="/outfits"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <BookmarkIcon className="mb-1 block text-3xl text-black transition-colors duration-200 hover:text-gray-500"/>
            </span>
          </Link>
        </div>
        <div className="group flex-1">
          <Link
            to="/login"
            className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
          >
            <span className="block px-1">
              <SettingIcon className="mb-1 block text-3xl text-black transition-colors duration-200 hover:text-gray-500"/>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
