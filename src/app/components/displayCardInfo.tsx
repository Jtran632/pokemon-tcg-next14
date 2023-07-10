"use client";
import Image from "next/image";
export default function DisplayCardInfo({ card }: any) {
  console.log("card", card);
  console.log(card?.tcgplayer?.prices);
  let p = card?.tcgplayer?.prices;
  let k = Object.keys(p);
  console.log(k);
  console.log(k[0]);
  function GetPrices() {
    const arr = [];
    for (let i: number = 0; i < k.length; i++) {
      console.log(p[k[i]]?.low);
      arr.push(
        <div>
          <div>{k[i].toUpperCase()}</div>
          <div className="flex gap-6 font-semibold">
            <div>Low: ${p[k[i]]?.low}</div>
            <div>Mid: ${p[k[i]]?.mid}</div>
            <div>High ${p[k[i]]?.high}</div>
            <div>Market ${p[k[i]]?.market}</div>
          </div>
          <br />
        </div>
      );
    }
    return arr;
  }
  return (
    <div className="h-full bg-white text-black p-20 border-4 border-slate-200">
      <div className="flex gap-4">
        <div className="w-1/2 flex items-start place-content-center">
          <Image
            src={`${card.images.large}`}
            alt={"pokemon image"}
            width={400}
            height={300}
            loading="lazy"
            className={"flex hover:scale-125"}
          ></Image>
        </div>
        <div className="w-1/2">
          {card?.tcgplayer?.prices ? (
            <div className="flex flex-col">
              <div className="text-left mb-4">
                <div className="text-2xl font-bold">TCG Player Prices</div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={card.tcgplayer.url}
                  className="text-xs underline"
                >
                  View Listings
                </a>
              </div>
              <GetPrices />
            </div>
          ) : (
            <div>No TCG Player Data</div>
          )}
        </div>
      </div>
    </div>
  );
}
