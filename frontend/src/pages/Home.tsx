import { useState, useEffect } from "react";
import axios from "axios";
import RefreshIcon from "~icons/mdi-light/refresh";
import ImageLoader from "../components/ImageLoader";

function Home() {
  const [randomFit, setRandomFit] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const port = import.meta.env.VITE_BACKEND_ROUTE;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${port}api/clothes/random/5`);
        setRandomFit(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Still Loading...</div>;
  }

  return (
    <div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
        <RefreshIcon
          onClick={() => location.reload()}
          className="cursor-pointer text-2xl"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-90">
          <ImageLoader
            src={port + randomFit.randomTop.img_path}
            alt="Top"
            className="object-contain"
          />
        </div>

        <div
          className={
            "w-90 " +
            (["shorts", "skirt"].includes(randomFit.randomBottom.type)
              ? "-mt-37"
              : "-mt-15")
          }
        >
          <ImageLoader
            src={port + randomFit.randomBottom.img_path}
            alt="Bottom"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
