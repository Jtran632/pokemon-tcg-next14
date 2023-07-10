import DisplaySetCards from "@/app/components/displaySetCards";
async function getSetCards(id: string) {
  let url = `https://api.pokemontcg.io/v2/cards?q=set.id:${id}`;
  console.log(id)
  console.log(url);
  const a = await fetch(url);
  return a.json();
}
export default async function SetPageWithName({ params }: any) {
  let cards = await getSetCards(params.id);
  console.log(params)
  console.log(cards);
  //   return <DisplaySetCards cards={cards} />;
  return (
    <div className="bg-white min-h-screen h-full p-20">
      <DisplaySetCards cards={cards.data}></DisplaySetCards>
    </div>
  );
}
