/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import DisplaySearch from "./components/displaySearch";

export default async function Home() {
  // let a = [];
  // async function onSubmit(q: string) {
  //   const a = fetch(
  //     `https://api.pokemontcg.io/v2/cards?q=name:*&orderBy=-set.releaseDate`
  //   );
  //   return (await a).json();
  // }
  //todo search function for home page
  return (
    <main className="flex flex-col justify center min-h-screen py-10 px-20 sm:px-10 xs:px-10 text-black bg-white">
      <DisplaySearch />
    </main>
  );
}
