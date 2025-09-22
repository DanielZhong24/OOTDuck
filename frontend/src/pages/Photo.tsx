/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Funnel } from "lucide-react";
import axios, { type AxiosResponse } from "axios";
import ClothingCard from "../components/ClothingCard";
import FilterSidebar from "@/components/FilterSidebar";

function Photo() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [clothes, setClothes] = useState<any>([]);
  const port = import.meta.env.VITE_BACKEND_ROUTE;

  useEffect(() => {
    axios.get(`${port}api/clothes/user/5`).then((response: AxiosResponse) => {
      setClothes(response.data);
    });
  }, [port]);

  console.log(clothes);

  const handleDelete = async (id: number) => {
    try {
      axios.delete(`${port}api/clothes/delete/${id}`).then((res) => {
        console.log("clothes deleted succesfully", res.status);
      });

      setClothes((prevClothes: any) => prevClothes.filter((item: any) => item.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id: number, name: string): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.put(
        `${port}api/clothes/${id}`,
        {
          name: name,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status === 200) {
        setClothes((prevClothes: any) =>
          prevClothes.map((item: any) =>
            item.id === id ? { ...item, name: name } : item,
          ),
        );
      }
    } catch (error: any) {
      console.error("error updating clothes", error.message);
    }
  };

  const toggleOpen: () => void = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="mb-20 bg-white">
      <ul className="grid grid-cols-2 gap-7 p-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-4 md:gap-15">
        {clothes.map((item: any) => (
          <li className="w-full" key={item.id}>
            <ClothingCard
              id={item.id}
              type={item.type}
              color={item.color}
              season={item.season}
              name={item.name}
              imageUrl={port + item.img_path}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </li>
        ))}
      </ul>
      <div className="fixed right-10 bottom-30 rounded-full bg-gray-700 p-1">
        <Funnel
          onClick={toggleOpen}
          className="box-content size-6 cursor-pointer p-2.5 text-white"
        />
      </div>
      {
        <FilterSidebar
          isOpen={isOpen}
          clothes={clothes}
          onClick={toggleOpen}
          toggleOpen={toggleOpen}
        />
      }
    </div>
  );
}

/*
function tempHolder({ isOpen }: { isOpen: boolean }) {
  return (
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
  );
}
*/
export default Photo;
