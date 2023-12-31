import DisplaySets from "../components/displaySets";
async function getSets() {
  const a = fetch("https://api.pokemontcg.io/v2/sets");
  return (await a).json();
}
export default async function Home() {
  let a = await getSets();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <DisplaySets tcgSets={a} />
    </main>
  );
}
