/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { addFav, delFav } from "@/lib/actions";
import { ICardData } from "@/lib/types";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import DisplayCardInfoModal from "./displayCardInfoModal";
export default function DisplaySetCards({
  id,
  favs,
}: {
  id: string;
  favs: { id: number; cardId: string; imageUrl: string; userId: string }[];
}) {
  const router = useRouter();
  const session = useSession();
  const [toggleType, setToggleType] = useState("");
  const [cards, setCards] = useState<ICardData[]>([]);
  const [curCard, setCurCard] = useState<ICardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState(0);
  const scrollPosRef = useRef(0);
  const [setName, setSetName] = useState("");
  const supertypes: string[] = useMemo(() => {
    return ["Pokémon", "Trainer", "Energy"];
  }, []);

  useEffect(() => {
    async function fetchCards() {
      try {
        setIsLoading(true);
        let url1 = `https://api.pokemontcg.io/v2/cards?q=set.id:${id}&pageSize=250&page=1`;
        let url2 = `https://api.pokemontcg.io/v2/cards?q=set.id:${id}&pageSize=250&page=2`;
        let urls = [url1, url2];
        const setRes = await fetch(`https://api.pokemontcg.io/v2/sets/${id}`);
        const set = await setRes.json();
        setSetName(set.data.name);
        console.log(set);
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((resp) => resp.json()));
        const allCards = [...data[0].data, ...data[1].data];
        const sortedCards = allCards.sort((a: ICardData, b: ICardData) =>
          a.number.localeCompare(b.number, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );
        setCards(sortedCards);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    fetchCards();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      scrollPosRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (curCard === null) {
      window.scrollTo(0, position);
    }
  }, [curCard, position]);

  let isFavorite = useMemo(() => {
    return (card: ICardData) => {
      return favs?.some((image: { imageUrl: string | null }) =>
        isObjectEqual(image, card.images.small)
      );
    };
  }, [favs]);

  const isObjectEqual = (card: { imageUrl: string | null }, image: string) => {
    return card.imageUrl === image;
  };

  const handleFavorite = useCallback(
    async (card: ICardData) => {
      try {
        if (session?.data?.user) {
          if (!isFavorite(card)) {
            addFav(card.id, card.images.small, String(session?.data?.user.id));
          } else {
            delFav(card.images.small, String(session?.data?.user.id));
          }
          router.refresh();
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
    [isFavorite, router, session?.data?.user]
  );
  const DisplaySetCards = useMemo(() => {
    return (
      <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-2 px-20 lg:px-8 md:px-6 sm:px-4 xs:px-0">
        {cards
          .filter((card) => toggleType === "" || card.supertype === toggleType)
          .map((card) => (
            <motion.div
              whileInView={{
                opacity: [0, 1],
                scale: [0.5, 1],
                transition: { duration: 0.1 },
              }}
              key={card.id}
              className="flex justify-center items-center"
            >
              <div
                key={card.id}
                id={card.id}
                className={`text-black hover:rounded-md hover:bg-gradient-to-r from-red-300 via-green-300 to-blue-300 p-1`}
                data-supertype={card.supertype}
              >
                <div className="flex justify-between px-2 rounded-t-md bg-black text-white">
                  <div>
                    {card.number}/{card.set.total}
                  </div>
                  {session?.data?.user && (
                    <button onClick={() => handleFavorite(card)}>
                      {isFavorite(card) ? "❤️" : "🤍"}
                    </button>
                  )}
                </div>
                <div className="bg-black rounded-full rounded-t-none">
                  <img
                    src={card.images.large || card.images.small || ""}
                    alt={"pokemon image"}
                    width={400}
                    height={"auto"}
                    loading="lazy"
                    onClick={() => [
                      setCurCard(card),
                      setPosition(scrollPosRef.current),
                    ]}
                  ></img>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    );
  }, [cards, toggleType, isFavorite, handleFavorite, session?.data?.user]);
  const handleToggleType = useCallback(
    (type: string) => {
      setToggleType(toggleType === type ? "" : type);
    },
    [toggleType]
  );
  const DisplayOptions = useMemo(() => {
    return supertypes.map((type) => (
      <button
        key={type}
        value={type}
        className={`border border-black px-3 mb-6 rounded-md font-bold ${
          toggleType === type ? "bg-emerald-300 " : " bg-white"
        }`}
        onClick={() => handleToggleType(type)}
      >
        {type}
      </button>
    ));
  }, [supertypes, toggleType, handleToggleType]);
  function Loading() {
    return (
      <div className="flex flex-col justify-center items-center text-2xl text-black">
        <img
          src={"https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif"}
          width={100}
          alt="loading"
        ></img>
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={`${curCard ? "hidden" : ""} overflow-y-hidden`}>
            <div className="flex justify-center text-2xl text-black font-bold py-1">{setName}</div>
            <div className="flex justify-center gap-6 sm:gap-4 xs:gap-4 text-black">
              {DisplayOptions}
            </div>
            {DisplaySetCards}
          </div>
          {curCard && (
            <div className="flex justify-center scrollbar-none">
              <DisplayCardInfoModal card={curCard} setCurCard={setCurCard} />
            </div>
          )}
        </>
      )}
    </>
  );
}
