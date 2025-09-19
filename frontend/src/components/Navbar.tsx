import { Link } from "react-router-dom";
import {Shirt,UserRound,Bookmark,House,Camera} from 'lucide-react';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import axios from "axios";
import { useRef, useState } from "react";
function Navbar() {
  const port = import.meta.env.VITE_BACKEND_ROUTE;
  const fileInputReferance = useRef<HTMLInputElement>(null);


  const [loading,setLoading] = useState(false);
  const handleFileClick =() =>{
    fileInputReferance.current?.click();
  }

  const sumbitImage = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    setLoading(true);
    let bodyData = new FormData();
    if(e.target.files){

      bodyData.append('image',e.target.files[0]);
    }else{
      console.log("error, image is not support or wrong file");
      return 
    }

    bodyData.append("userId","5");
    axios.post(`${port}api/clothes`,bodyData).then((response)=>{
      console.log(response);
      setLoading(false);
    }).catch(e =>{
      console.log("Error:",e);
    });
  }

  // function test(){
  //   setLoading(true);

  //   setTimeout(() => setLoading(false), 3000);

  // }

  


  return (
    <div>
      {loading? 
      <div className="fixed flex items-center justify-center inset-0 bg-black/50">
        <Spinner variant="circle" color="orange" size={60}/>         
      </div>
:
      <div className="fixed bottom-0 left-0 w-full  bg-white pt-5 pb-10 rounded-2xl border-black shadow-2xl p-1">
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full aspect-square p-3.5 hover:bg-amber-600" >
            <span className="block px-1" onClick={handleFileClick}>
                <Camera strokeWidth="1" color={"black"} size={32} className="mb-1 block"/>
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
                <House strokeWidth="1" color={"black"} size={32} className="mb-1 block transition-colors duration-200 hover:text-gray-500"/>
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <Link
              to="/photo"
              className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
            >
              <span className="block px-1">
                <Shirt strokeWidth="1" color={"black"} size={32} className="mb-1 block transition-colors duration-200 hover:text-gray-500"/>
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
                <Bookmark strokeWidth="1" color={"black"} size={32} className="mb-1 block transition-colors duration-200 hover:text-gray-500"/>
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <Link
              to="/login"
              className="flex items-end justify-center border-b-2 border-transparent text-center hover:border-gray-500"
            >
              <span className="block px-1">
                <UserRound strokeWidth="1" color={"black"} size={32} className="mb-1 block transition-colors duration-200 hover:text-gray-500"/>
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      }
    </div>

  );
}
export default Navbar;
