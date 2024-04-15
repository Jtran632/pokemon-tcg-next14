/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";
import { delFav } from "@/lib/actions";
import { ICardData, IFavCard } from "@/lib/types";

export default function DisplayFavs({ favs }: any) {
  console.log(favs);
  const router = useRouter();
  function CreateCard({ card }: { card: IFavCard }) {
    function handleEnter() {
      setHoverStatus(true);
    }
    function handleExit() {
      setHoverStatus(false);
    }
    const [hoverStatus, setHoverStatus] = useState(false);
    return (
      <div
        className="col-span-1 h-fit w-fit bg-black border rounded-b-xl rounded-t-md grid items-end"
        key={card.id}
      >
        <div className="flex justify-between px-1">
          <button
            className="text-white"
            onClick={() => router.push(`/card/${card.cardId}`)}
          >
            🔎
          </button>
          <button
            onMouseEnter={() => handleEnter()}
            onMouseLeave={() => handleExit()}
            onClick={() => {
              [delFav(card.imageUrl || ""), router.push("/collection")];
            }}
          >
            {!hoverStatus ? "❤️" : "💔"}
          </button>
        </div>
        <img
          className=""
          src={card.imageUrl || ""}
          width={400}
          height={"auto"}
        ></img>
      </div>
    );
  }

  function FavCards() {
    return favs.map((card: { id: number }) => (
      <CreateCard key={card.id} card={card} />
    ));
  }

  // if (getFavs) {
  //   return <>Loading...</>;
  // }

  return (
    <div className="w-screen h-fit">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center">
          {favs.length > 0 ? "" : "You haven't added any favorites"}
        </div>
        <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-2">
          <FavCards />
        </div>
      </div>
    </div>
  );
}
