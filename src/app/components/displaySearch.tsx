/* eslint-disable @next/next/no-img-element */
"use client";

import { trpc } from "../_trpc/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  async function getQuery() {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:*${query}*&orderBy=-set.releaseDate`
    );
    const res = await response.json();
    console.log(res.data)
    return res.data;
  }
  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (query.trim() === "") {
      setErrorMessage("Please enter in something ");
      return;
    }
    setIsLoading(true); // Set loading to true when the request starts
    setErrorMessage("");
    const arr = await getQuery();
    setIsLoading(false);
    setCards(arr);
    console.log(cards)
  }

  function CreateCard(i: ICardData) {
    const isObjectEqual = (
      obj1: { imageUrl: string | null },
      image: string
    ) => {
      return obj1.imageUrl === image;
    };

    return (
      <div
        className="col-span-1 h-fit w-fit bg-black border rounded-b-xl rounded-t-md grid items-end"
        key={i.id}
      >
        <div className="flex justify-between px-1">
          <button
            className="text-white"
            onClick={() => router.push(`/card/${i.id}`)}
          >
            🔎
          </button>
          <button
            onClick={async () => {
              !getFavs?.data?.some((item: { imageUrl: string | null }) =>
                isObjectEqual(item, i.images.small)
              )
                ? addFav.mutate({ id: i.id, imageUrl: i.images.small })
                : delFav.mutate(i.images.small);
            }}
          >
            {getFavs?.data?.some((item: { imageUrl: string | null }) =>
              isObjectEqual(item, i.images.small)
            )
              ? "❤️"
              : "🤍"}{" "}
          </button>
        </div>
        <img
          src={i.images.small || ""}
          alt={"pokemon image"}
          width={400}
          height={"auto"}
          loading="lazy"
          placeholder={"/backCard.png"}
        ></img>
      </div>
    );
  }

  function CardSearchDisplay() {
    if (!cards) {
      return null;
    }
    let arr = [];
    for (let i: number = 0; i < Object.values(cards).length; i++) {
      arr.push(CreateCard(cards[i]));
    }
    return arr;
  }

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex justify-between  text-black border-2 border-black"
        onSubmit={onSubmit}
      >
        <input
          className="text-black"
          type="text"
          name="name"
          disabled={isLoading}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className={`border-l-2 w-20 border-black ${
            !isLoading ? "bg-green-300" : "bg-red-300"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        {isLoading ? (
          <div className="pt-10">Searching for cards that include: {query}</div>
        ) : (
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 pt-10 px-20">
            <CardSearchDisplay />
          </div>
        )}
      </div>
    </div>
  );
}
