/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
interface ICardData {
  id: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
  };
  supertype: string;
  name: string;
  number: string;
}
interface ICards {
  cards: ICardData[];
}
export default function DisplaySetCards({ cards }: ICards) {
  const router = useRouter();
  const getFavs = trpc.getFavs.useQuery();
  const addFav = trpc.addFav.useMutation({
    onSuccess: () => {
      getFavs.refetch();
    },
  });
  const delFav = trpc.delFav.useMutation({
    onSuccess: () => {
      getFavs.refetch();
    },
  });
  const [toggleType, setToggleType] = useState("");
  const supertypes: string[] = ["Pokémon", "Trainer", "Energy"];
  // console.log(cards);
  const cardsAscending = [...cards].sort((a: ICardData, b: ICardData) =>
    a.number.localeCompare(b.number, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
  const isObjectEqual = (obj1: { imageUrl: string | null }, image: string) => {
    return obj1.imageUrl === image;
  };
  function CreateCard(i: ICardData) {
    const CardElement = () => {
      return (
        <div className="flex justify-center items-center">
          <button
            id={i.id}
            className={`text-black hover:rounded-md hover:bg-gradient-to-r from-red-300 via-green-300 to-blue-300 p-1`}
            data-supertype={i.supertype}
          >
            <div className="flex justify-between px-1 border-2 border-b-0 border-black rounded-t-md bg-black text-white">
              <div>
                {i.number}/{i.set.total}
              </div>
              <button
                onClick={async () => {
                  !getFavs?.data?.some((item: { imageUrl: string | null }) =>
                    isObjectEqual(item, i.images.small)
                  )
                    ? addFav.mutate({ id: i.id, imageUrl: i.images.small })
                    : delFav.mutate(i.images.small);
                }}
              >
                {" "}
                {getFavs?.data?.some((item: { imageUrl: string | null }) =>
                  isObjectEqual(item, i.images.small)
                )
                  ? "❤️"
                  : "🤍"}{" "}
              </button>
            </div>
            <img
              className="border-2 border-t-0 border-black rounded-b-xl bg-black"
              src={`${i.images.small}`}
              alt={"pokemon image"}
              width={260}
              height={"auto"}
              loading="lazy"
              // decoding="async"
              placeholder={"/backCard.png"}
              onClick={() => router.push(`/card/${i.id}`)}
            ></img>
          </button>
        </div>
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
    let arr = [];
    for (let i: number = 0; i < Object.values(cardsAscending).length; i++) {
      arr.push(CreateCard(cardsAscending[i]));
    }
    return arr;
  }

  return (
    <div>
      <div className="flex justify-center md:gap-10 sm:gap-4 xs:gap-4 text-black">
        {supertypes.map((i) => (
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
        ))}
      </div>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <CardsArr />
      </div>
    </div>
  );
}
