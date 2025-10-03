/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Funnel } from "lucide-react";
import axios, { type AxiosResponse } from "axios";
import ClothingCard from "../components/ClothingCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";

function Photo() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clothes, setClothes] = useState<any>([]);
  const { session } = useAuth();
  const port = import.meta.env.VITE_BACKEND_ROUTE;

  const user: User | undefined = session?.user;
  useEffect(() => {
    axios.get(`${port}api/clothes/user/${user?.id}`).then((response: AxiosResponse) => {
      setClothes(response.data);
      setIsLoading(false);
    });
  }, [port, user?.id]);

  const handleDelete = async (id: number) => {
    try {
      axios.delete(`${port}api/clothes/delete/${id}`);

      setClothes((prevClothes: any) => prevClothes.filter((item: any) => item.id !== id));
    } catch (error) {}
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

  if (clothes.length === 0 && isLoading === false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-xl font-bold lg:text-2xl xl:text-3xl">No clothes found</h1>
        <div>
          <motion.div
            animate={{
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.img src="/images/fail1.png" className="w-32" alt="Mascot" />
          </motion.div>
        </div>

        <div className="fixed right-10 bottom-28 rounded-full bg-amber-500 p-1 transition-colors duration-200 hover:bg-amber-700">
          <Funnel
            onClick={toggleOpen}
            className="box-content size-6 cursor-pointer p-2.5 text-white"
          />
        </div>
        {
          <FilterSidebar
            isOpen={isOpen}
            onClick={toggleOpen}
            toggleOpen={toggleOpen}
            setClothes={setClothes}
          />
        }
      </div>
    );
  }

  return (
    <div className="mb-20 h-screen bg-white">
      <ul className="grid grid-cols-2 gap-7 p-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-4 md:gap-15">
        {clothes.map((item: any) => (
          <li className="w-full" key={item.id}>
            <ClothingCard
              id={item.id}
              type={item.type}
              color={item.color}
              season={item.season}
              name={item.name}
              imageUrl={item.img_path}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </li>
        ))}
      </ul>
      <div className="fixed right-10 bottom-28 rounded-full bg-amber-500 p-1 transition-colors duration-200 hover:bg-amber-700">
        <Funnel
          onClick={toggleOpen}
          className="box-content size-6 cursor-pointer p-2.5 text-white"
        />
      </div>
      <FilterSidebar
        isOpen={isOpen}
        onClick={toggleOpen}
        toggleOpen={toggleOpen}
        setClothes={setClothes}
      />
    </div>
  );
}

export default Photo;
