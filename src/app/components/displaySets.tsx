import Image from "next/image";
import Link from "next/link";
export default function DisplaySets({ tcgSets }: any) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
      {tcgSets.data.map((i: any) => (
        <div
          key={i.id}
          className="flex items-center justify-between gap-2 border-2 border-gray-400 p-4 bg-white text-black"
        >
          <div className="flex-col text-center">
            <Image
              src={`${i.images.logo}`}
              alt={"set"}
              width={150}
              height={150}
            ></Image>
            <Link href={`/sets/${i.id}`} className="underline">
              {" "}
              View Cards{" "}
            </Link>
          </div>

          <div className="text-right font-bold flex flex-col items-end">
            <div>{i?.name}</div>
            <div>
              {i?.printedTotal} / {i?.total}
            </div>
            <div>{i?.releaseDate}</div>
            <div>{i?.ptcgoCode}</div>
            <Image
              src={`${i.images.symbol}`}
              alt={"set"}
              width={30}
              height={50}
            ></Image>
          </div>
        </div>
      ))}
    </div>
  );
}
