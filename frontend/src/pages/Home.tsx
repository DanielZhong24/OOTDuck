import { useState, useEffect } from "react";
import axios from "axios";
import RefreshIcon from "~icons/mdi-light/refresh";
import ImageLoader from "../components/ImageLoader";

function Home() {
  const [randomFit, setRandomFit] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const port = import.meta.env.VITE_BACKEND_ROUTE;

    async function fetchData() {
      setIsLoading(true);
    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`${port}api/clothes/random/5`);
      setRandomFit(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
 
    fetchData();
  }, []);

  if (isLoading) {
    //potential loading animation - prob want to do something flashy
    return <div>Still Loading...</div>;
  }

  return (
    <div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
        <RefreshIcon
          onClick={fetchData}
          className="cursor-pointer text-2xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-70 md:w-90 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {randomFit.randomTop && (
            <ImageLoader
              src={port + randomFit.randomTop.img_path}
              alt="Top"
              className="object-contain w-full h-full"
            />
          )}
        </div>

        <div
          className={`w-70 md:w-90 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden ${
            ["shorts", "skirt"].includes(randomFit.randomBottom.type)
              ? "-mt-10 md:-mt-12"
              : "-mt-4 md:-mt-6"
          }`}
        >
          {randomFit.randomBottom && (
            <ImageLoader
              src={port + randomFit.randomBottom.img_path}
              alt="Bottom"
              className="object-contain w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
