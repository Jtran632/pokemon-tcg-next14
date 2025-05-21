"use client";
import { ICardData, ItcgSetData } from "@/lib/types";
import { getSets } from "@/lib/utils";
import { get } from "http";
import { Dispatch, use, useEffect, useState } from "react";
import { set } from "zod";
export default function SetDropdown({
  setCurSet,
  setPack
}: {
  setCurSet: Dispatch<React.SetStateAction<string>>;
  setPack: Dispatch<React.SetStateAction<ICardData[]>>;
}) {
  const [tcgSets, setTcgSets] = useState<ItcgSetData[]>([]);
  useEffect(() => {
    async function getData() {
      const a = await getSets();
      setTcgSets(a.data);
    }
    getData();
  }, []);
  useEffect(() => {
    console.log(tcgSets);
  }, [tcgSets]);
  const tcgSetsByDate = tcgSets.sort((a: ItcgSetData, b: ItcgSetData) =>
    b.releaseDate.localeCompare(a.releaseDate)
  );
  return (
    <div className="flex flex-col">
      {tcgSetsByDate.length > 0 && (
        <select
          className="bg-white border-2 border-blue-200 rounded-md focus:ring-blue-200 focus:border-blue-300 p-2 text-black"
          onChange={(e) => [setCurSet(e.target.value), setPack([])]}
        >
          <option value={""}></option>
          {tcgSetsByDate.map((setItem: any) => (
            <option key={setItem.id} value={setItem.id}>
              {setItem.series}{' - '}{setItem.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
