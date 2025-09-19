/* eslint-disable @typescript-eslint/no-explicit-any */
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import PlusIcon from "~icons/mdi-light/plus";
import PencilIcon from "~icons/mdi-light/pencil";
import InboxIcon from "~icons/mdi-light/inbox";
import axios, { type AxiosResponse } from "axios";
import ClothingCard from "../components/ClothingCard";

function Photo() {
  const [isOpen, setOpen] = useState(false);
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6767/api/clothes/5").then((response: AxiosResponse) => {
      setClothes(response.data);
    });
  }, []);

  return (
    <div className="mb-20">
      <h1 className="mb-8 text-3xl font-bold text-white underline">
        This is the photo page!
      </h1>
      <ul className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {clothes.map((item: any) => (
          <li key={item.id}>
            <ClothingCard
              type={item.type}
              color={item.color}
              season={item.season}
              imageUrl={`http://localhost:6767/${item.img_path}`}
            />
          </li>
        ))}
      </ul>
      <div className="fixed right-10 bottom-30 rounded-full bg-gray-700 p-1">
        <div
          className={`flex flex-col items-center gap-5 overflow-hidden rounded-full bg-gray-700 transition-all duration-300 ${isOpen ? "h-50 opacity-100" : "h-0 opacity-0"}`}
        >
          {isOpen && (
            <>
              <PlusIcon className="text-3xl" color="white" />
              <InboxIcon className="text-3xl" color="white" />
              <PencilIcon className="text-3xl" color="white" />
            </>
          )}
        </div>
        <Hamburger color="white" toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
}

export default Photo;
