import react from 'react';
export default function bottomNav(){
  return(
    <div className='fixed bottom-0 left-0 w-full p-5 bg-black'>

      <div className="flex">
        <div className='flex-1 group'>
          <a href="" className="flex items-end justify-center text-center border-b-2 border-transparent hover:border-gray-500 ">
            <span className="block px-1">
              <i className='far fa-home text-xl pt1 mb-1 block text-white hover:text-gray-500 transition-colors duration-200'></i>
            </span>
          </a>
        </div>
        
       <div className='flex-1 group'>
          <a href="" className="flex items-end justify-center text-center border-b-2 border-transparent hover:border-gray-500 ">
            <span className="block px-1">
              <i className='far fa-camera-retro text-xl pt1 mb-1 block text-white hover:text-gray-500 transition-colors duration-200'></i>
            </span>
          </a>
        </div>  

       <div className='flex-1 group'>
          <a href="" className="flex items-end justify-center text-center border-b-2 border-transparent hover:border-gray-500 ">
            <span className="block px-1">
              <i className='far fa-grin-hearts text-xl pt1 mb-1 block text-white hover:text-gray-500 transition-colors duration-200'></i>
            </span>
          </a>
        </div>  



        <div className='flex-1 group'>
          <a href="" className="flex items-end justify-center text-center border-b-2 border-transparent hover:border-gray-500 ">
            <span className="block px-1">
              <i className='far fa-user-circle text-xl pt1 mb-1 block text-white hover:text-gray-500 transition-colors duration-200'></i>
            </span>
          </a>
        </div> 

      </div>
    </div>


  );
}

