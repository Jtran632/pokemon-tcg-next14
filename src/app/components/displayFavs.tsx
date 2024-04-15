/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { delFav } from "@/lib/actions";
import { IFavCard } from "@/lib/types";

export default function DisplayFavs({ favs }: any) {
  const router = useRouter();
  function CreateCard(i: IFavCard) {
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
        key={i.id}
      >
        <div className="flex justify-between px-1">
          <button
            className="text-white"
            onClick={() => router.push(`/card/${i.cardId}`)}
          >
            🔎
          </button>
          <button
            onMouseEnter={() => handleEnter()}
            onMouseLeave={() => handleExit()}
            onClick={async () => {
              delFav(i.imageUrl || ""), router.refresh();
            }}
          >
            {!hoverStatus ? "❤️" : "💔"}
          </button>
        </div>
        <img
          className=""
          src={i.imageUrl || ""}
          width={400}
          height={"auto"}
        ></img>
      </div>
    );
  }

  function FavCards() {
    if (!favs) {
      return null;
    }
    let arr = [];
    for (let i: number = 0; i < Object.values(favs).length; i++) {
      arr.push(CreateCard(favs[i]));
    }
    return arr;
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
