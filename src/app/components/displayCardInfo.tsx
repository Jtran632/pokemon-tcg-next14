/* eslint-disable @next/next/no-img-element */
"use client";
export default function DisplayCardInfo({ card }: any) {
  // console.log(card)
  function GetTCGPlayerPrices() {
    let p = card?.tcgplayer?.prices;
    let k = Object.keys(p);
    const arr: JSX.Element[] = [
      // eslint-disable-next-line react/jsx-key
      <div className="flex flex-col">
        <div className="text-left mb-2">
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
      </div>,
    ];
    for (let i: number = 0; i < k.length; i++) {
      arr.push(
        <div>
          <div>{k[i].toUpperCase()}</div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-3 mb-6 font-semibold text-xs">
            <div>Low: ${p[k[i]]?.low}</div>
            <div>Mid: ${p[k[i]]?.mid}</div>
            <div>High: ${p[k[i]]?.high}</div>
            <div>Market: ${p[k[i]]?.market}</div>
          </div>
        </div>
      );
    }
    return arr;
  }
  function GetCardMarketPrices() {
    let p = card?.cardmarket?.prices;
    const arr: JSX.Element[] = [
      // eslint-disable-next-line react/jsx-key
      <div className="flex flex-col">
        <div className="text-left mb-4">
          <div className="text-2xl font-bold">Cardmarket Prices</div>
          <a
            target="_blank"
            rel="noreferrer"
            href={card.cardmarket.url}
            className="text-xs underline"
          >
            View Listings
          </a>
        </div>
      </div>,
    ];
    arr.push(
      <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-3 mb-6 font-semibold text-xs">
        <div>Low: {p?.lowPrice}€</div>
        <div>Trend: {p?.trendPrice}€</div>
        <div>AvgSell: {p?.averageSellPrice}€</div>
        <div>Avg 1: {p?.avg1}€</div>
        <div>Avg 7: {p?.avg7}€</div>
        <div>Avg 30: {p?.avg30}€</div>
      </div>
    );
    return arr;
  }
  return (
    <div className="h-full bg-white text-black p-20 border-4 border-slate-200 w-full">
      <div className="xl:flex grid gap-20 justify-center">
        <img
          src={`${card.images.large}`}
          alt={"pokemon image"}
          width={400}
          height={"auto"}
          loading="lazy"
          className={`flex rounded-md transition duration-500 hover:scale-125 `}
        ></img>
        <div className="border-black">
          {card?.tcgplayer?.prices ? (
            <GetTCGPlayerPrices />
          ) : (
            <div>No TCG Player Data</div>
          )}
          {card?.cardmarket?.prices ? (
            <GetCardMarketPrices />
          ) : (
            <div>No Cardmarket Data</div>
          )}
        </div>
      </div>
    </div>
  );
}
