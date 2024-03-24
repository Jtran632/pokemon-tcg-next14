import DisplaySetCards from "@/app/components/displaySetCards";
//scuffed solution but it works since all sets are less than 300 cards we can always do a promise.all for two pages
//because api gives 250 max for a page biggest set is 287 cards
async function getSetCards(id: string) {
  let url1 = `https://api.pokemontcg.io/v2/cards?q=set.id:${id}&pageSize=250&page=1`;
  let url2 = `https://api.pokemontcg.io/v2/cards?q=set.id:${id}&pageSize=250&page=2`;
  let urls = [url1, url2];
  let a = Promise.all(
    urls.map(async (url) => {
      const resp = await fetch(url);
      return await resp.json();
    })
  );
  return a;
}
export default async function SetPageWithName({ params }: any) {
  let cards = await getSetCards(params.id);
  //combine promise data into one array
  let allCards = [...cards[0].data, ...cards[1].data];
  // console.log(allCards)
  return (
    <div className="bg-white min-h-screen h-full px-10 py-10">
      <DisplaySetCards cards={allCards} />
    </div>
  );
}
