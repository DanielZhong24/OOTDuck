import Hamburger from 'hamburger-react'
import { useState, useEffect } from 'react';
import PlusIcon from '~icons/mdi-light/plus';
import PencilIcon from '~icons/mdi-light/pencil';
import InboxIcon from '~icons/mdi-light/inbox';
import axios from 'axios';


function Photo() {
  const[isOpen, setOpen] = useState(false);
  const[clothes,setClothes] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/clothes").then((response)=>{
      setClothes(response.data);
    })
  },[]);

 



  return (
    <div>
      <h1 className="text-3xl font-bold text-white underline">This is the photo page!</h1>

      <ul>
        {clothes.map( index=> (<li>{JSON.stringify(index)}</li>) )}
      </ul>


      <div className='fixed bottom-20 right-10 bg-gray-700 rounded-full p-1'>
        <div
            className={`bg-gray-700 rounded-full gap-5 flex flex-col items-center transition-all duration-300 overflow-hidden
            ${isOpen ? 'h-50 opacity-100' : 'h-0 opacity-0'}`}
          >
            {isOpen && (
              <>
                  <PlusIcon className="text-3xl" color="white" /> 
                  <InboxIcon className="text-3xl" color="white" /> 
                  <PencilIcon className="text-3xl" color="white" />
              </>
            )}
          </div>
          <Hamburger color='white' toggled={isOpen} toggle={setOpen}/>
      </div>
         
      
    </div>
  );
}

export default Photo;
