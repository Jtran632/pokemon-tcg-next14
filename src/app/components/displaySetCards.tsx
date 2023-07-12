"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DisplaySetCards({ cards }: any) {
  // console.log("inside display set cards", cards);
  const router = useRouter();
  const [toggleType, setToggleType] = useState("");
  function CreateCard(i: any) {
    console.log("current card", i.name, i);
    const CardElement = () => {
      return (
        <button
          key={i.id}
          className={`flex flex-col justify-center items-center hover:rounded-md hover:bg-gradient-to-r from-red-300 via-green-300 to-blue-300 p-1`}
          onClick={() => router.push(`/card/${i.id}`)}
          type={i.supertype}
        >
          <Image
            src={`${i.images.small}`}
            alt={"pokemon image"}
            width={300}
            height={100}
            loading="lazy"
          ></Image>
        </button>
      );
    };
    return toggleType === "" ? (
      <CardElement />
    ) : toggleType === i.supertype ? (
      <CardElement />
    ) : (
      <></>
    );
  }

  const supertypes: string[] = ["Pokémon", "Trainer", "Energy"];
  console.log(toggleType);
  return (
    <div>
      <div className="flex justify-center gap-10 text-black">
        {supertypes.map((i) => {
          return (
            <button
              key={i}
              value={i}
              className={`border border-black px-3 mb-6 rounded-md font-bold ${
                toggleType === i ? "bg-emerald-300 " : " bg-white"
              }`}
              onClick={() =>
                toggleType === i ? setToggleType("") : setToggleType(i)
              }
            >
              {i}
            </button>
          );
        })}
      </div>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {cards.map((i: any) => {
          return CreateCard(i);
        })}
      </div>
    </div>
  );
}
