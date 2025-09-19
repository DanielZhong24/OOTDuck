import { useState, useEffect } from "react";
import axios from "axios";

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
      <h1 className="text-3xl font-bold text-black underline">This is the home page!</h1>
      <div className="flex flex-col items-center justify-center space-y-0">
        <div className="w-70">
          <img
            src={"http://localhost:6767/" + randomFit.randomTop.img_path}
            alt="Top"
            className="w-70 object-contain"
          />
        </div>

        <div className="w-70">
          <img
            src={"http://localhost:6767/" + randomFit.randomBottom.img_path}
            alt="Bottom"
            className="w-70 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
