"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DisplaySetCards({ cards }: any) {
  // console.log("inside display set cards", cards);
  const router = useRouter();
  function CreateCard(i: any) {
    const [modal, setModal] = useState(i);
    const [toggle, setToggle] = useState(false);
    const toggleChecked = () => setToggle((value) => !value);
    console.log("current card", i.name, i);
    return (
      <button
        key={i.id}
        className={`flex flex-col justify-center items-center hover:rounded-md hover:bg-gradient-to-r from-red-300 via-green-300 to-blue-300 p-1 ${
          toggle ? "animate-spin" : ""
        } `}
        onClick={() => router.push(`/card/${i.id}`)}
      >
        <Image
          src={`${i.images.large}`}
          alt={"pokemon image"}
          width={300}
          height={100}
          loading="lazy"
        ></Image>
      </button>
    );
  }

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
      {cards.map((i: any) => {
        return CreateCard(i);
      })}
    </div>
  );
}
