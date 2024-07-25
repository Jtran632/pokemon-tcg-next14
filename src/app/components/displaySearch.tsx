/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addFav, delFav } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { ICardData } from "@/lib/types";
export const dynamic = "force-dynamic";
export default function DisplaySearch({ favs }: any) {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  useEffect(() => {}, [favs]);
  async function getQuery() {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:*${query}*&orderBy=-set.releaseDate`
    );
    const res = await response.json();
    console.log(res.data);
    return res.data;
  }
  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (query.trim() === "") {
      setErrorMessage("Please enter in something ");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    const arr = await getQuery();
    setIsLoading(false);
    setCards(arr);
  }

  const isObjectEqual = (card: { imageUrl: string | null }, image: string) => {
    return card.imageUrl === image;
  };

  let isFavorite = (card: ICardData) => {
    return favs?.some((image: { imageUrl: string | null }) =>
      isObjectEqual(image, card.images.small)
    );
  };

  const handleFavorite = async (card: ICardData) => {
    try {
      if (!isFavorite(card)) {
        addFav(card.id, card.images.small, String(session?.data?.user.id));
      } else {
        delFav(card.images.small, String(session?.data?.user.id));
      }
      router.refresh();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  function CardDisplay() {
    return cards.map((card) => (
      <div
        className="col-span-1 h-fit w-fit bg-black border rounded-b-xl rounded-t-md grid items-end"
        key={card.id}
      >
        <div className="flex justify-between px-1">
          <button
            className="text-white"
            onClick={() => router.push(`/card/${card.id}`)}
          >
            🔎
          </button>
          {session.data?.user.id ? (
            <button onClick={() => handleFavorite(card)}>
              {isFavorite(card) ? "❤️" : "🤍"}
            </button>
          ) : (
            <></>
          )}
        </div>
        <img
          src={card.images.small || ""}
          alt={"pokemon image"}
          width={400}
          height={"auto"}
          loading="lazy"
          placeholder={"/backCard.png"}
        ></img>
      </div>
    ));
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
          <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3 gap-2 pt-10">
            <CardDisplay />
          </div>
        )}
      </div>
    </div>
  );
}
