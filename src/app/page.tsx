/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DisplaySearch from "./components/displaySearch";
import { getFavs } from "@/lib/actions";
export default async function Home() {
  const favs = await getFavs();
  return (
    <main className="flex flex-col justify center min-h-screen py-10 px-20 sm:px-10 xs:px-10 text-black bg-white">
      <DisplaySearch favs={favs} />
    </main>
  );
}
