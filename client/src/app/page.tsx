"use client"; // required for App Router to use hooks

import { useEffect, useState } from "react";

export default function Home() {
  const [clothes, setClothes] = useState<any[]>([]);


  useEffect(() => {
    async function fetchClothes() {
      try {
        const res = await fetch("/api/clothes");
        if (!res.ok) throw new Error("Failed to fetch clothes");
        const data = await res.json();
        setClothes(data);
      } catch (err) {
        console.error(err);
      } 
    }


    fetchClothes();
  }, []);



  return (
    <div className="text-center p-6">
      <h1 className="text-xl font-bold mb-4">Clothes List</h1>

      <div className="space-y-2">
        <pre>{JSON.stringify(clothes, null, 2)}</pre>

      </div>

      <br />
      <input className="bg-white text-black w-sm text-center" type="file" />
      <br />
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Upload
      </button>
    </div>
  );
}
