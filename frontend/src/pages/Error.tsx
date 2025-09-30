import failImg from "../assets/fail1.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 text-center text-lg sm:text-xl lg:text-2xl">
      <div>
        <img src={failImg} alt="Error" className="mx-auto h-36 w-36 sm:h-48 sm:w-48" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p>Oops! This resource was not found</p>
        <Button variant="outline" className="cursor-pointer">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default Error;
