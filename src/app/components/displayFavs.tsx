/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useState } from "react";
export default function DisplayFavs() {
  const router = useRouter();
  const getFavs = trpc.getFavs.useQuery();
  const delFav = trpc.delFav.useMutation({
    onSuccess: () => {
      getFavs.refetch();
    },
  });

  interface IFavCard {
    id?: number;
    cardId?: string | null;
    imageUrl?: string | null;
  }

  function CreateCard(i: IFavCard) {
    function handleEnter() {
      setHoverStatus(true);
    }
    function handelExit() {
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
            onMouseLeave={() => handelExit()}
            onClick={async () => {
              delFav.mutate(i.imageUrl || "");
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
    if (!getFavs.data) {
      return null;
    }
    let arr = [];
    for (let i: number = 0; i < Object.values(getFavs.data).length; i++) {
      arr.push(CreateCard(getFavs.data[i]));
    }
    return arr;
  }

  if (getFavs.status !== "success") {
    return <>Loading...</>;
  }

  return (
    <div className="w-screen h-fit">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center">
          {getFavs.data.length > 0 ? "" : "You haven't added any favorites"}
        </div>
        <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-2">
          <FavCards />
        </div>
      </div>
    </div>
  );
}
