import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const[randomFit,setRandomFit] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://10.45.202.185:5000/api/clothes/random/3");
        setRandomFit(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  
  if(isLoading){
    return <div>Still Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-black underline">This is the home page!</h1>
      <div className='flex items-center flex-col justify-center'>
        <img src={"http://10.45.202.185:5000/"+randomFit.randomTop.img_path} alt="" width={150} height={200}/>
        <img src={"http://10.45.202.185:5000/"+randomFit.randomBottom.img_path} alt="" width={150} height={50} />
      </div>


    </div>
  );
}

export default Home;
