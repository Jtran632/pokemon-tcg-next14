import Image from "next/image";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import DisplaySets from "../components/displaySets";
// function getSets() {
//   let a = PokemonTCG.getAllSets().then((res) => {
//     // do something with the error
//     console.log(res[2].name);
//   });
//   return a;
// }
// let a = getSets();
async function getSets() {
  const a = fetch("https://api.pokemontcg.io/v2/sets");
  return (await a).json();
}
export default async function Home() {
  let a = await getSets();
  console.log(a);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <DisplaySets tcgSets={a} />
    </main>
  );
}
