/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { JSX, useEffect } from "react";

export default function DisplayCardInfoModal({ card, setCurCard }: any) {
  useEffect(() => {
    scrollTo(0, 0);
  });
  const curUrl = new URL(window.location.href);
  console.log(curUrl);
  function GetTCGPlayerPrices() {
    console.log(card);
    let p = card?.tcgplayer?.prices;
    let k = Object.keys(p);
    const arr: JSX.Element[] = [
      <div className="flex flex-col" key="tcg-player-info">
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
        <div key={`tcg-player-price-${i}`}>
          <div>{k[i].toUpperCase()}</div>
          <div className="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-3 mb-4 font-semibold text-xs">
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
      <div className="flex flex-col" key="cardmarket-info">
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
      <div
        className="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-3 mb-6 font-semibold text-xs"
        key="cardmarket-prices"
      >
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
    <div className="bg-white text-black border-4 border-slate-200">
      <div className="flex justify-end p-1">
        {curUrl.href.includes(card.set.id) ? (
          <></>
        ) : (
          <Link href={"/sets/" + card.set.id}>
            <button className="border-2 border-slate-200 p-1 rounded-md ">
              {" "}
              Set{" "}
            </button>
          </Link>
        )}
        <button
          className="border-2 border-slate-200 p-1 rounded-md "
          onClick={() => [setCurCard(null)]}
        >
          Close
        </button>
      </div>
      <div className="flex lg:grid gap-20 justify-center p-10">
        <img
          src={`${card.images.large}`}
          alt={"pokemon image"}
          width={400}
          height={"auto"}
          loading="lazy"
          className={`flex rounded-md transition duration-500 hover:scale-110`}
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
