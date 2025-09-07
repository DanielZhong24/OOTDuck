/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // required for App Router to use hooks

import { useEffect, useState } from "react";

export default function Home() {
  const [clothes, setClothes] = useState<any[]>([]);
  const [image, setImage] = useState<any | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImage: any | null = e.target.files?.[0] || null;
    if (currentImage) setImage(currentImage);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    if (image) formData.append("image", image);

    try {
      const response: Response = await fetch("/api/clothes", {
        method: "POST",
        body: formData,
      });
      const data: any = await response.json();
      console.log("Upload response:", data);
    } catch (error: any) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="mb-4 text-xl font-bold">Clothes List</h1>

      <div className="space-y-2">
        <pre>{JSON.stringify(clothes, null, 2)}</pre>
      </div>

      <br />
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
        <input
          onChange={handleFileChange}
          className="w-sm bg-white text-center text-black"
          name="image"
          type="file"
        />
        <button
          type="submit"
          className="mt-4 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
