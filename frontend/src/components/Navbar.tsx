import { Link,useLocation } from "react-router-dom";
import {Shirt,UserRound,Bookmark,House,Camera,Check, X} from 'lucide-react';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import axios from "axios";
import { useRef, useState } from "react";
function Navbar() {

  
  const port = import.meta.env.VITE_BACKEND_ROUTE;
  const fileInputReferance = useRef<HTMLInputElement>(null);
  let location = useLocation();

  const [loading,setLoading] = useState<"idle"|"loading"|"success"|"fail">("idle");
  const handleFileClick =() =>{
    fileInputReferance.current?.click();
  }

  const sumbitImage = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    setLoading("loading");
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
      setLoading("success");
    }).catch(e =>{
      console.log("Error:",e);
      setLoading("fail");
    }).finally(()=>{
      setTimeout(()=>{setLoading("idle")},1000);
    });
  }

  // function test(){
  //   setLoading(true);

  //   setTimeout(() => setLoading(false), 3000);

  // }

  


  return (
    <div>
      {loading !== "idle"?( 
        <div className="fixed flex items-center justify-center inset-0 bg-black/50">

        {loading === "loading" && (
          <Spinner variant="circle" color="orange" size={60}/>         
        )}

        {loading === "success" && (
          <Check  color="green" size={60} className="absolute animate-ping"/>         
        )}
        {loading === "fail" && (
          <X color="red" size={60} className="absolute animate-ping"/>         
        )}

      </div>

      )
:
      <div className="fixed bottom-0 left-0 w-full  bg-white pt-5 pb-5 rounded-2xl border-black shadow-2xl p-1">
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full aspect-square p-3.5 hover:bg-amber-600" >
            <span className="block px-1" onClick={handleFileClick}>
                <Camera strokeWidth="1"  color="black" size={32} className="mb-1 block"/>
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={sumbitImage} ref={fileInputReferance} capture/>
    
        </div>
        <div className="flex">
          <div className="group flex-1">
            <Link
              to="/"
              className="flex items-end justify-center text-center"
            >
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <House strokeWidth="1" 
                color={location.pathname === "/" ? "oklch(76.9% 0.188 70.08)" : "black"} 
                fill={location.pathname === "/" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32} 
               className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 "/>
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <Link
              to="/photo"
              className="flex items-end justify-center text-center"
            >
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <Shirt strokeWidth="1"  
                color={location.pathname === "/photo" ? "oklch(76.9% 0.188 70.08)" : "black"} 
                fill={location.pathname === "/photo" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32} 
               className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 "/>
              </span>
            </Link>
          </div>
          <div className="flex-1"></div>
          <div className="group flex-1">
            <Link
              to="/outfits"
              className="flex items-end justify-center text-center"
            >
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <Bookmark strokeWidth="1"  
                color={location.pathname === "/outfits" ? "oklch(76.9% 0.188 70.08)" : "black"} 
                fill={location.pathname === "/outfits" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32} 
               className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 "/>
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <Link
              to="/login"
              className="flex items-end justify-center text-center"
            >
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <UserRound strokeWidth="1"  
                color={location.pathname === "/login" ? "oklch(76.9% 0.188 70.08)" : "black"} 
                fill={location.pathname === "/login" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32} 
               className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 "/>
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
