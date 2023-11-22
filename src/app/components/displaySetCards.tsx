/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from '../_trpc/client'
export default function DisplaySetCards({ cards }: any) {
  const router = useRouter();
  const getFavs = trpc.getFavs.useQuery();
  const addFav = trpc.addFav.useMutation({
    onSettled: () => {
      getFavs.refetch()
    }
  }
  );
  const delFav = trpc.delFav.useMutation({
    onSettled: () => {
      getFavs.refetch()
    }
  })
  const [toggleType, setToggleType] = useState("");
  const supertypes: string[] = ["Pokémon", "Trainer", "Energy"];
  const cardsAscending = [...cards].sort((a, b) => a.number - b.number);
  const isObjectEqual = (obj1: { imageUrl: string | null; }, image: string) => {
    return obj1.imageUrl === image;
  };
  function CreateCard(i: any) {
    const CardElement = () => {
      return (
        <div>
          <button
            id={i.id}
            className={`text-black hover:rounded-md hover:bg-gradient-to-r from-red-300 via-green-300 to-blue-300 p-1`}
            type={i.supertype}
          >
            <div className="flex justify-between items-center px-1">
              <div>
                {i.number}/{i.set.total}
              </div>
              <button onClick={async () => {
                !getFavs?.data?.some(item => isObjectEqual(item, i.images.small))
                  ? addFav.mutate(i.images.small)
                  : delFav.mutate(i.images.small)
              }}> {getFavs?.data?.some(item => isObjectEqual(item, i.images.small)) ? "❤️" : "🤍"} </button>
            </div>
            <img
              className="rounded-md"
              src={`${i.images.small}`}
              alt={"pokemon image"}
              width={300}
              height={100}
              loading="lazy"
              onClick={() => router.push(`/card/${i.id}`)}
            ></img>
          </button>
        </div >
      );
    };
    //filters cards rendered by toggle selected
    return toggleType === "" ? (
      <CardElement key={i.id} />
    ) : toggleType === i.supertype ? (
      <CardElement key={i.id} />
    ) : (
      <></>
    );
  }
  function CardsArr() {
    let arr = []
    for (let i: number = 0; i < Object.values(cardsAscending).length; i++) {
      arr.push(CreateCard(cardsAscending[i]))
    }
    return arr
  }
  return (
    <div>
      <div className="flex justify-center gap-10 text-black">
        {supertypes.map((i) => {
          return (
            <button
              key={i}
              value={i}
              className={`border border-black px-3 mb-6 rounded-md font-bold ${toggleType === i ? "bg-emerald-300 " : " bg-white"
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
        <CardsArr />
      </div>
    </div>
  );
}
