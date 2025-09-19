import { useState, useEffect } from "react";
import axios from "axios";
import RefreshIcon from "~icons/mdi-light/refresh";
import ImageLoader from '../components/ImageLoader';

function Home() {
  const [randomFit, setRandomFit] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:6767/api/clothes/random/5");
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
      <div className="rounded-full bg-amber-500 w-8 h-8 flex items-center justify-center">
        <RefreshIcon onClick={() => location.reload()} className="text-2xl cursor-pointer" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-90 ">

          <ImageLoader
            src={"http://localhost:6767/" + randomFit.randomTop.img_path}
            alt="Top"
            className="object-contain"
          />
        </div>

        <div className={"w-90 " + (["shorts", "skirt"].includes(randomFit.randomBottom.type) ? "-mt-37" : "-mt-15")}>
          <ImageLoader
            src={"http://localhost:6767/" + randomFit.randomBottom.img_path}
            alt="Bottom"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
