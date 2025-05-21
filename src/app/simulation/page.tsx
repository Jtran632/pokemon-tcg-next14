"use client";
import { useState, useEffect } from "react";
import SetDropdown from "../components/setDropdown";
import { ICardData } from "@/lib/types";
import { Tooltip } from "react-tooltip";
import DisplayCardInfoModal from "../components/displayCardInfoModal";
export default function Simulation() {
  const [curSet, setCurSet] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ICardData[]>([]);
  const [IsRevealed, setIsRevealed] = useState<boolean[]>([]);
  const [curCard, setCurCard] = useState<ICardData | null>(null);
  const [cardRarities, setCardRarities] = useState<{
    common: ICardData[];
    uncommon: ICardData[];
    rare: ICardData[];
    rarePlus: ICardData[];
  }>({
    common: [],
    uncommon: [],
    rare: [],
    rarePlus: [],
  });
  const [pack, setPack] = useState<ICardData[]>([]);
  const [packsOpened, setPacksOpened] = useState<number>(0);
  useEffect(() => {
    async function fetchCards() {
      if (curSet === "") return;
      try {
        setLoading(true);
        let url1 = `https://api.pokemontcg.io/v2/cards?q=set.id:${curSet}&pageSize=250&page=1`;
        let url2 = `https://api.pokemontcg.io/v2/cards?q=set.id:${curSet}&pageSize=250&page=2`;
        let urls = [url1, url2];

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((resp) => resp.json()));
        console.log(curSet);
        const cardsCombined = [...data[0].data, ...data[1].data];
        //have to do this for older sets there aren't rarities for some cards such as energy cards i.e base set
        const allCards = cardsCombined.filter((card) => card.rarity);
        const commons = allCards.filter(
          (i: ICardData) => i.rarity.toLowerCase() === "common"
        );
        const uncommons = allCards.filter(
          (i: ICardData) => i.rarity.toLowerCase() === "uncommon"
        );
        const rares = allCards.filter(
          (i: ICardData) => i.rarity.toLowerCase() === "rare"
        );
        const rarePlus = allCards.filter((i: ICardData) =>
          i.rarity.toLowerCase().includes("rare")
        );
        setCardRarities({
          common: commons,
          uncommon: uncommons,
          rare: rares,
          rarePlus: rarePlus,
        });
        setCards(allCards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    fetchCards();
  }, [curSet]);
  // useEffect(() => {
  //   console.log(cards);
  //   console.log(cardRarities.rarePlus);
  // }, [cards]);
  const handlePackOpen = (box: boolean) => {
    let boxOpened = 1;
    if (box) {
      boxOpened = 36;
      setPacksOpened(packsOpened + 36);
    } else {
      setPacksOpened(packsOpened + 1);
    }
    const commonPick: ICardData[] = [];
    const uncommonPick: ICardData[] = [];
    const reversePick: ICardData[] = [];
    const rarePick: ICardData[] = [];
    const rarePlusPick: ICardData[] = [];
    function getCards(length: number, cards: ICardData[], arr: ICardData[]) {
      while (arr.length < length) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        arr.push(card);
      }
    }
    if (cardRarities.common.length > 0) {
      getCards(4 * boxOpened, cardRarities.common, commonPick);
    }
    if (cardRarities.uncommon.length > 0) {
      getCards(3 * boxOpened, cardRarities.uncommon, uncommonPick);
    }
    if (
      cardRarities.common.length > 0 &&
      cardRarities.uncommon.length > 0 &&
      cardRarities.rare.length > 0
    ) {
      const randInt: number = Math.floor(Math.random() * 3);
      const pickRand: { [key: number]: string } = {
        0: "common",
        1: "uncommon",
        2: "rare",
      };
      getCards(
        1 * boxOpened,
        cardRarities[pickRand[randInt] as keyof typeof cardRarities],
        reversePick
      );
    }
    if (cardRarities.rare.length > 0) {
      getCards(1 * boxOpened, cardRarities.rare, rarePick);
    }
    if (cardRarities.rarePlus.length > 0) {
      getCards(1 * boxOpened, cardRarities.rarePlus, rarePlusPick);
    }
    //fisher yates shuffle
    function shuffleArray(array: ICardData[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    console.log([...commonPick, ...uncommonPick, ...reversePick, ...rarePick]);
    console.log(cardRarities.rarePlus)
    const randomizedPack: ICardData[] = shuffleArray([
      ...commonPick,
      ...uncommonPick,
      ...reversePick,
      ...rarePick,
      ...rarePlusPick,
    ]);
    setPack(randomizedPack);
    setIsRevealed(Array(pack.length).fill(false));
  };
  const handleRevealCard = (index: number) => {
    const newIsRevealed = [...IsRevealed];
    newIsRevealed[index] = true;
    setIsRevealed(newIsRevealed);

  };
  return (
    <div className="flex flex-col min-h-screen text-black items-center text-xs bg-white pt-2">
      {curCard !== null && (
        <DisplayCardInfoModal
          card={curCard}
          setCurCard={setCurCard}
        ></DisplayCardInfoModal>
      )}
      <div className={`${curCard === null ? "flex flex-col" : "hidden"}`}>
        <div className={`flex justify-center`}>
          <SetDropdown setCurSet={setCurSet} setPack={setPack} />
          {!loading && cards.length > 0 && curSet != "" ? (
            <div className="flex justify-center gap-1">
              <button
                className=" w-fit border border-green-500 bg-green-300 rounded-lg py-1 px-2"
                onClick={() => handlePackOpen(false)}
              >
                Open Pack
              </button>
              <button
                className=" w-fit border border-red-500 bg-red-300 rounded-lg py-1 px-2"
                onClick={() => handlePackOpen(true)}
              >
                Open Box
              </button>
              <div className="flex items-center">
                Packs Opened: {packsOpened}
              </div>
              <div className="flex items-center">
                <h1
                  data-tooltip-id="my-tooltip-1"
                  className="flex justify-center items-center text-center rounded-full border-2 border-gray-500 h-6 w-6"
                >
                  ?
                </h1>
              </div>
              <Tooltip id="my-tooltip-1" place="bottom" className="z-10">
                <div>
                  This pack opener is based on more recent booster sets from the
                  scarlet violet era so older sets should be inaccurate.
                </div>
                <div>
                  Pokémon Center Support: Each booster pack contains 10 game
                  cards: 4 commons, 3 uncommons, and 3 foils (at least one of
                  which will be rare or higher).
                </div>
                <div>
                  But mine will do 1 common-rare, rare, and rare+ for the
                  holocards.
                </div>
              </Tooltip>
            </div>
          ) : null}
        </div>
        {!loading && curSet != "" ? (
          <div className="flex flex-col justify-center pt-2">
            {pack && pack.length > 0 && (
              <div className="grid xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-4 px-10">
                {pack.map((i: ICardData, index: number) => (
                  <div
                    key={index}
                    className="relative w-[240px] h-[340px] hover:scale-105"
                    onMouseOver={() => handleRevealCard(index)}
                    onClick={() => setCurCard(i)}
                  >
                    <img
                      src={IsRevealed[index] ? i.images.large : "/backCard.png"}
                      alt={i.name}
                      className={`flex flex-col w-full h-full ${
                        IsRevealed[index] &&
                        `${
                          i.rarity.toLowerCase() === "common" &&
                          "border-4 border-green-500 bg-green-500 rounded-2xl"
                        }
                      ${
                        i.rarity.toLowerCase() === "uncommon" &&
                        "border-4 border-blue-500 bg-blue-500 object-fill rounded-2xl"
                      }
                      ${
                        i.rarity.toLowerCase() === "rare" &&
                        "border-4 border-indigo-500 bg-indigo-500 rounded-2xl"
                      }
                      ${
                        i.rarity.toLowerCase().includes("rare") &&
                        i.rarity.toLowerCase() !== "rare" &&
                        "border-4 border-yellow-500 bg-yellow-500 rounded-2xl"
                      }`
                      }
                    bg-blend-difference
                    `}
                    />
                    {i.rarity.toLowerCase().includes("rare") &&
                      i.rarity.toLowerCase() !== "rare" &&
                      IsRevealed[index] && (
                        <img
                          className="absolute top-0 mix-blend-color-dodge brightness-100 contrast-150 w-full h-full rounded-3xl"
                          src="https://i.gifer.com/IrF.gif"
                        ></img>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            {curSet != "" && <div>Loading</div>}
          </div>
        )}
      </div>
    </div>
  );
}
