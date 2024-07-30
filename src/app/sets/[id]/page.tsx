import DisplaySetCards from "@/app/components/displaySetCards";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../../auth";
// export const dynamic = "force-dynamic";
export const maxDuration = 60;
export default async function SetPageWithName({ params }: any) {
  const session = await getServerAuthSession();
  const userId = session?.user?.id || "";
  const favs = await getFavs(String(userId));
  async function fetchCards() {
    try {
      let url1 = `https://api.pokemontcg.io/v2/cards?q=set.id:${params.id}&pageSize=250&page=1`;
      let url2 = `https://api.pokemontcg.io/v2/cards?q=set.id:${params.id}&pageSize=250&page=2`;
      let urls = [url1, url2];

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((resp) => resp.json()));
      const allCards = [...data[0].data, ...data[1].data];
      const sortedCards = allCards.sort((a, b) =>
        a.number.localeCompare(b.number, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
      return sortedCards;
    } catch (error) {
      return [];
    }
  }
  let sortedCards = await fetchCards();

  return (
    <div className="bg-white min-h-screen h-full px-10 py-10">
      <DisplaySetCards id={params.id} favs={favs} cardData={sortedCards} />
    </div>
  );
}
