/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
interface ItcgSetData {
  id: string;
  name: string;
  series: string;
  images: {
    symbol: string;
    logo: string;
  };
  ptcgoCode?: string;
  printedTotal: number;
  total: number;
  releaseDate: string;
}
interface ItcgSet {
  tcgSets: {
    data: ItcgSetData[];
  };
}
export default function DisplaySets({ tcgSets }: ItcgSet) {
  console.log(tcgSets.data);
  const [curView, setCurView] = useState(0);
  const tcgSetsByDate = tcgSets.data.sort((a: ItcgSetData, b: ItcgSetData) =>
    b.releaseDate.localeCompare(a.releaseDate)
  );
  function MapSets() {
    return (
      <>
        {curView === 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
            {tcgSetsByDate.map((i: ItcgSetData) => (
              <div
                key={i.id}
                className="flex items-center justify-between gap-2 border-2 border-gray-400 p-4 bg-white text-black "
              >
                <div className="flex-col text-center">
                  <img
                    src={`${i.images.logo}`}
                    alt={"set"}
                    width={150}
                    height={150}
                  ></img>
                  <Link href={`/sets/${i.id}`} className="underline">
                    {" "}
                    View Cards{" "}
                  </Link>
                </div>

                <div className="text-right font-bold flex flex-col items-end text-xs">
                  <div>{i?.series}</div>
                  <div>{i?.name}</div>
                  <div>
                    P:{i?.printedTotal} / S:{i?.total - i.printedTotal} / T:
                    {i?.total}
                  </div>
                  <div>{i?.releaseDate}</div>
                  <div>{i?.ptcgoCode}</div>
                  <img
                    src={`${i.images.symbol}`}
                    alt={"set"}
                    width={30}
                    height={50}
                  ></img>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid justify-center text-sm items-center">
            <div className="grid grid-cols-8 text-black font-bold border-black border items-center p-4">
              <div className="col-span-2">Series/Set</div>
              <div>Symbol</div>
              <div>Id</div>
              <div>ptcgoCode</div>
              <div>Printed/Secret/Total</div>
              <div>Release Date</div>
              <div></div>
            </div>
            {tcgSetsByDate.map((i: ItcgSetData, j: number) => (
              <div
                key={i.id}
                className="grid grid-cols-8 text-black  border-black border items-center p-4"
              >
                <div className=" col-span-2 w-full">
                  {i?.series} - {i?.name}{" "}
                </div>
                <img
                  className="h-8"
                  src={`${i.images.symbol}`}
                  alt={"set"}
                ></img>
                <div>{i.id}</div>
                {i?.ptcgoCode ? <div>{i.ptcgoCode}</div> : <div>N/A</div>}
                <div>
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
      <div className="flex justify-end w-full pb-2">
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
