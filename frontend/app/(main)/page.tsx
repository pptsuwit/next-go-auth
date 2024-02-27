"use client";
import { useGlobalContext } from "@/contexts/store";
import { useEffect } from "react";

export default function page() {
  const { setTitle } = useGlobalContext();
  useEffect(() => {
    setTitle("");
  }, []);
  return (
    <section className="p-4 bg-white border rounded-md shadow-md">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Welcome
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
          corrupti quisquam vero, aut obcaecati, provident doloribus non tempora
          in itaque enim voluptatem expedita veniam tenetur fugit voluptatibus
          iste fugiat incidunt.
        </p>
      </div>
    </section>
  );
}
