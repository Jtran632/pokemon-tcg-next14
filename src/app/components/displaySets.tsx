/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import { ItcgSet, ItcgSetData } from "@/lib/types";
export default function DisplaySets({ tcgSets }: ItcgSet) {
  const [curView, setCurView] = useState(0);
  const tcgSetsByDate = tcgSets.data.sort((a: ItcgSetData, b: ItcgSetData) =>
    b.releaseDate.localeCompare(a.releaseDate)
  );
  // console.log(tcgSetsByDate);
  function MapSets() {
    return (
      <>
        {curView === 0 ? (
          <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
            {tcgSetsByDate.map((i: ItcgSetData) => (
              <div
                key={i.id}
                className="grid grid-cols-3 sm:grid-cols-1 items-center justify-between sm:justify-center gap-2 border-2 border-gray-400 p-4 bg-white text-black "
              >
                <div className="flex flex-col justify-between items-center text-xs h-28 w-full">
                  <img
                    src={i.images.logo}
                    className="w-fit h-1/2 items-end"
                    alt={"set"}
                  ></img>
                  <div className="collapse sm:visible font-bold text-[8px]">
                    {i?.name}
                  </div>
                  <Link href={`/sets/${i.id}`} className="underline">
                    {" "}
                    View Cards{" "}
                  </Link>
                </div>

                <div className="col-span-2 text-right font-bold flex flex-col items-end text-xs lg:text-[10px] sm:text-[8px] sm:hidden">
                  <div>{i?.series}</div>
                  <div>{i?.name}</div>
                  <div>
                    P:{i?.printedTotal} / S:{i?.total - i.printedTotal} / T:
                    {i?.total}
                  </div>
                  <div>{i?.releaseDate}</div>
                  <div>{i.id.toUpperCase()}</div>
                  <div>{i?.ptcgoCode}</div>
                  <img
                    src={i.images.symbol}
                    alt={"set"}
                    width={30}
                    height={40}
                  ></img>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center text-sm lg:text-[8px] items-center w-full">
            <div className="grid grid-cols-7 md:grid-cols-4 text-black font-bold border-black border items-center p-2 w-full">
              <div>Series/Set</div>
              <div>Symbol</div>
              <div className="md:hidden">Id</div>
              <div className="md:hidden">ptcgoCode</div>
              <div className="md:hidden">Printed/Secret/Total</div>
              <div>Release Date</div>
            </div>
            {tcgSetsByDate.map((i: ItcgSetData, j: number) => (
              <div
                key={i.id}
                className="grid grid-cols-7 md:grid-cols-4 text-black  border-black border items-center p-2 w-full"
              >
                <div>
                  <div className="font-semibold">{i?.name} </div>
                  <div>{i?.series}</div>
                </div>
                <img
                  className="h-8"
                  src={`${i.images.symbol}`}
                  alt={"set"}
                  width={"auto"}
                  height={10}
                ></img>
                <div className="md:hidden">{i.id}</div>
                <div className="md:hidden">{i?.ptcgoCode || "N/A"}</div>
                <div className="md:hidden">
                  {i?.printedTotal} / {i?.total - i.printedTotal} / {i?.total}
                </div>
                <div>{i?.releaseDate}</div>
                <div className="flex-col text-center">
                  <Link href={`/sets/${i.id}`} className="underline">
                    View Cards
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end w-full pb-2 text-xs">
        <button
          className="text-black border-2 border-r-0 border-black p-1"
          onClick={() => {
            setCurView(0);
          }}
        >
          Grid
        </button>
        <button
          className="text-black border-2 border-black p-1"
          onClick={() => {
            setCurView(1);
          }}
        >
          List
        </button>
      </div>
      <MapSets />
    </div>
  );
}
