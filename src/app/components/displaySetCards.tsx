/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addFav, delFav } from "@/lib/actions";
import { ICardData } from "@/lib/types";

export default function DisplaySetCards({
  cards,
  favs,
}: {
  cards: ICardData[];
  favs: any;
}) {
  const router = useRouter();
  const [toggleType, setToggleType] = useState("");
  const supertypes: string[] = ["Pokémon", "Trainer", "Energy"];
  const isObjectEqual = (card: { imageUrl: string | null }, image: string) => {
    return card.imageUrl === image;
  };
  function CreateCard({ card }: { card: ICardData }) {
    const CardElement = () => {
      return (
        <div className="flex justify-center items-center" key={card.id}>
          <div
            id={card.id}
            className={`text-black hover:rounded-md hover:bg-gradient-to-r from-red-300 via-green-300 to-blue-300 p-1`}
            data-supertype={card.supertype}
          >
            <div className="flex justify-between px-1 border-2 border-b-0 border-black rounded-t-md bg-black text-white">
              <div>
                {card.number}/{card.set.total}
              </div>
              <button
                onClick={async () => {
                  !favs?.some((image: { imageUrl: string | null }) =>
                    isObjectEqual(image, card.images.small)
                  )
                    ? [addFav(card.id, card.images.small), router.refresh()]
                    : [delFav(card.images.small), router.refresh()];
                }}
              >
                {favs?.some((image: { imageUrl: string | null }) =>
                  isObjectEqual(image, card.images.small)
                )
                  ? "❤️"
                  : "🤍"}
              </button>
            </div>
            <img
              className="border-2 border-t-0 border-black rounded-b-xl bg-black"
              src={`${card.images.small}`}
              alt={"pokemon image"}
              width={400}
              height={"auto"}
              loading="lazy"
              placeholder={"/backCard.png"}
              onClick={() => router.push(`/card/${card.id}`)}
            ></img>
          </div>
        </div>
      );
    };
    //filters cards rendered by toggle selected
    return toggleType === "" ? (
      <CardElement key={card.id} />
    ) : toggleType === card.supertype ? (
      <CardElement key={card.id} />
    ) : (
      <></>
    );
  }

  function CardsArr() {
    return cards.map((card) => <CreateCard key={card.id} card={card} />);
  }

  return (
    <div>
      <div className="flex justify-center gap-6 sm:gap-4 xs:gap-4 text-black">
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
      <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-2">
        <CardsArr />
      </div>
    </div>
  );
}
