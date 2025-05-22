"use client";
import { useState, useEffect } from "react";
import SetDropdown from "../components/setDropdown";
import { ICardData, ICardRarities } from "@/lib/types";
import DisplayCardInfoModal from "../components/displayCardInfoModal";
import DisplaySimButtons from "../components/displaySimButtons";
import { Tooltip } from "react-tooltip";
export default function Simulation() {
  const [curSet, setCurSet] = useState("");
  const [curSetName, setCurSetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ICardData[]>([]);
  const [IsRevealed, setIsRevealed] = useState<boolean[]>([]);
  const [curCard, setCurCard] = useState<ICardData | null>(null);
  const [cardRarities, setCardRarities] = useState<ICardRarities>({
    common: [],
    uncommon: [],
    rare: [],
    rarePlus: [],
  });
  const [pack, setPack] = useState<ICardData[]>([]);
  const [packsOpened, setPacksOpened] = useState<number>(0);
  const [allPacksOpened, setAllPacksOpened] = useState<any>({});
  //will use for weights later am using median of sets from an era for weights
  //scarlet violet era - ace rare, special illustration rare, double rare, ultra rare, hyper rare
  //sword and shield era -
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
        const r = await fetch("https://api.pokemontcg.io/v2/rarities");
        const rD = await r.json();
        console.log(rD);
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

  function handlePackOpen(box: boolean) {
    let boxOpened = 1;
    if (box) {
      boxOpened = 36;
      setPacksOpened(packsOpened + 36);
    } else {
      setPacksOpened(packsOpened + 1);
    }

    //After watching a ton of pack opening videos on the s/v era the
    //the foils for the last three cards should be reverse holo of comomon, uncommon, rare in slot 1, 2 extremely rare is a rare +, and 3 should be rare+
    const commonPick: ICardData[] = [];
    const uncommonPick: ICardData[] = [];
    const reversePick: ICardData[] = [];
    const secondReversePick: ICardData[] = [];
    const rarePlusPick: ICardData[] = [];
    function getCards(
      length: number,
      cards: ICardData[],
      arr: ICardData[],
      rarity?: string
    ) {
      if (rarity === "rarePlus") {
        const a = cardRarities.rarePlus.filter(
          (i: ICardData) =>
            i.rarity.toLowerCase().includes("rare") &&
            i.rarity.toLowerCase() !== "rare"
        );
        const card = a[Math.floor(Math.random() * a.length)];
        arr.push(card);
      } else {
        while (arr.length < length) {
          const card = cards[Math.floor(Math.random() * cards.length)];
          arr.push(card);
        }
      }
    }
    if (cardRarities.common.length > 0) {
      getCards(4 * boxOpened, cardRarities.common, commonPick);
    }
    if (cardRarities.uncommon.length > 0) {
      getCards(3 * boxOpened, cardRarities.uncommon, uncommonPick);
    }
    function getReversePick(isSecond: boolean) {
      const rarityWeights = [
        { rarity: "common", weight: isSecond ? 0.45 : 0.45 },
        { rarity: "uncommon", weight: isSecond ? 0.4 : 0.4 },
        { rarity: "rare", weight: isSecond ? 0.12 : 0.15 },
        { rarity: "rarePlus", weight: isSecond ? 0.03 : 0 },
      ];
      const random = Math.random();
      let cumulativeWeight = 0;
      for (const { rarity, weight } of rarityWeights) {
        cumulativeWeight += weight;
        if (random < cumulativeWeight) {
          return rarity;
        }
      }
      //safe guard
      return "common";
    }
    if (
      ["common", "uncommon", "rare", "rarePlus"].every(
        (key) => cardRarities[key as keyof typeof cardRarities].length > 0
      )
    ) {
      const a = getReversePick(false);
      getCards(
        1 * boxOpened,
        cardRarities[a as keyof typeof cardRarities],
        reversePick,
        a
      );
      const b = getReversePick(true);
      getCards(
        1 * boxOpened,
        cardRarities[b as keyof typeof cardRarities],
        secondReversePick,
        b
      );
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
    // const packArr: ICardData[] = [
    const packArr: ICardData[] = shuffleArray([
      ...commonPick,
      ...uncommonPick,
      ...reversePick,
      ...secondReversePick,
      ...rarePlusPick,
    ]);
    setPack(packArr);
    setIsRevealed(Array(pack.length).fill(false));
    setAllPacksOpened((prev: any) => {
      let newAllPacksOpened: any = { ...prev };
      if (!newAllPacksOpened[curSetName]) {
        newAllPacksOpened[curSetName] = {
          "Packs Opened": boxOpened * 1,
        };
      } else {
        newAllPacksOpened[curSetName]["Packs Opened"] += boxOpened * 1;
      }

      packArr.forEach((item) => {
        if (newAllPacksOpened[curSetName][item.rarity]) {
          newAllPacksOpened[curSetName][item.rarity] += 1;
        } else {
          newAllPacksOpened[curSetName][item.rarity] = 1;
        }
      });
      return newAllPacksOpened;
    });
  }
  useEffect(() => {
    console.log(allPacksOpened);
  }, [allPacksOpened]);
  const handleRevealCard = (index: number) => {
    const newIsRevealed = [...IsRevealed];
    newIsRevealed[index] = true;
    setIsRevealed(newIsRevealed);
  };

  return (
    <div className="flex flex-col min-h-screen text-black items-center text-[10px] bg-white pt-2">
      {curCard !== null && (
        <DisplayCardInfoModal
          card={curCard}
          setCurCard={setCurCard}
        ></DisplayCardInfoModal>
      )}
      <div className={`${curCard === null ? "flex flex-col" : "hidden"}`}>
        <div className={`flex justify-center items-center`}>
          <SetDropdown
            setCurSet={setCurSet}
            setCurSetName={setCurSetName}
            setPack={setPack}
          />
          {!loading && cards.length > 0 && curSet != "" ? (
            <DisplaySimButtons
              handlePackOpen={handlePackOpen}
              packsOpened={packsOpened}
              allPacksOpened={allPacksOpened}
              curSetName={curSetName}
            />
          ) : null}
        </div>
        {!loading && curSet != "" ? (
          <div className="flex flex-col justify-center pt-4 px-72 xs:px-0 md:px-10">
            {pack && pack.length > 0 && (
              <div className="grid xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-4 ">
                {pack.map((i: ICardData, index: number) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseOver={() => handleRevealCard(index)}
                    onClick={() => setCurCard(i)}
                  >
                    <div className="flex">
                      <img
                        src={
                          IsRevealed[index] ? i.images.large : "/backCard.png"
                        }
                        alt={i.name}
                        className="relative w-full h-full rounded-md z-10"
                      />
                    </div>
                    {i.rarity.toLowerCase().includes("rare") &&
                      i.rarity.toLowerCase() !== "rare" &&
                      IsRevealed[index] && (
                        <div className="absolute top-0 left-0 w-full h-full">
                          <img
                            className="absolute top-0 z-10 mix-blend-color-dodge brightness-100 contrast-150 w-full h-full rounded-xl pointer-events-none"
                            src="https://i.gifer.com/IrF.gif"
                          ></img>
                          <img
                            className="absolute top-0 z-10 mix-blend-color-dodge w-full h-full rounded-xl pointer-events-none"
                            src="https://i.gifer.com/2iiH.gif"
                          ></img>
                          <img
                            className="absolute top-0 z-10 blur-[2px] mix-blend-color-dodge w-full h-full rounded-xl pointer-events-none"
                            src="https://i.gifer.com/PAA.gif"
                          ></img>
                          {/* <img
                            className="absolute top-0 z-10 blur-[0px] mix-blend-color-dodge opacity-[.3]  w-full h-full rounded-xl pointer-events-none"
                            src="https://i.gifer.com/TL80.gif"
                          ></img> */}
                        </div>
                      )}
                    {i.rarity.toLowerCase() == "rare" && IsRevealed[index] && (
                      <div className="absolute top-0 left-0 w-full h-full p-3">
                        <img
                          className="absolute top-0 z-10 blur-[2px] mix-blend-color-dodge w-full h-full rounded-xl pointer-events-none"
                          src="https://i.gifer.com/PAA.gif"
                        ></img>
                        {/* <img
                            className="absolute top-0 z-10 blur-[0px] mix-blend-color-dodge opacity-[.3]  w-full h-full rounded-xl pointer-events-none"
                            src="https://i.gifer.com/TL80.gif"
                          ></img> */}
                      </div>
                    )}
                    {/* <div className="absolute z-0 top-0 left-0 w-full h-full border-[2px] border-t-red-300 blur-[2px] rounded-md p-2"></div> */}
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
const rarityObj = {
  "ACE SPEC Rare": 0.018,
  "Amazing Rare": "",
  "Double Rare": 0.06,
  "Hyper Rare": 0.0294,
  "Illustration Rare": "",
  "LEGEND": "",
  "Radiant Rare": "",
  "Rare": "",
  "Rare ACE": "",
  "Rare BREAK": "",
  "Rare Holo": "",
  "Rare Holo EX": "",
  "Rare Holo GX": "",
  "Rare Holo LV.X": "",
  "Rare Holo Star": "",
  "Rare Holo V": "",
  "Rare Holo VMAX": "",
  "Rare Holo VSTAR": "",
  "Rare Prime": "",
  "Rare Prism Star": "",
  "Rare Rainbow": "",
  "Rare Secret": "",
  "Rare Shining": "",
  "Rare Shiny": "",
  "Rare Shiny GX": "",
  "Rare Ultra": "",
  "Shiny Rare": "",
  "Shiny Ultra Rare": "",
  "Special Illustration Rare": "",
  "Trainer Gallery Rare Holo": "",
  "Ultra Rare": "",
};
