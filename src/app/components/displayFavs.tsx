/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { delFav } from "@/lib/actions";
import { IFavCard } from "@/lib/types";
import { useSession } from "next-auth/react";

export default function DisplayFavs({ favs }: any) {
  const router = useRouter();
  const session = useSession();
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
        className="col-span-1 h-fit w-fit   border-gray-600 rounded-xl grid items-end"
        key={card.id}
      >
        <div className="flex justify-between px-2 rounded-t-md bg-black text-white">
          <button
            className="text-white"
            onClick={() => router.push(`/card/${card.cardId}`)}
          >
            🔎
          </button>
          <button
            onMouseEnter={() => handleEnter()}
            onMouseLeave={() => handleExit()}
            onClick={async () => {
              [
                delFav(card.imageUrl || "", String(session.data?.user.id)),
                router.refresh(),
              ];
            }}
          >
            {!hoverStatus ? "❤️" : "💔"}
          </button>
        </div>
        <div className="bg-black rounded-b-full">
          <img
            className=""
            src={card.imageUrl || ""}
            width={400}
            height={"auto"}
          ></img>
        </div>
      </div>
    );
  }

  function FavCards() {
    return favs.map((card: { id: number }) => (
      <CreateCard key={card.id} card={card} />
    ));
  }

  if (!favs) {
    return <div>Error something went wrong</div>;
  }

  if (favs.length <= 0) {
    return (
      <div className="w-screen h-fit text-black">
        <div className="flex flex-col justify-center items-center">
          {"You haven't added any favorites"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-fit">
      <div className="flex flex-col justify-center items-center">
        <div className="text-black font-bold">
          {/* Showing collection of user with email/id - [{" "}
          {session.data?.user.email} | {session.data?.user.id} ] */}
        </div>
        <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-2">
          <FavCards />
        </div>
      </div>
    </div>
  );
}
