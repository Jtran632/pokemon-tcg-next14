import DisplayCardInfo from "@/app/components/displayCardInfo";
export const dynamic = "force-dynamic";
async function getCard(id: string) {
  let url = `https://api.pokemontcg.io/v2/cards/${id}`;
  const a = await fetch(url);
  return a.json();
}

export default async function SetPageWithCardName({ params }: { params: any }) {
  let i = await getCard(params.id);
  return (
    <div>
      <DisplayCardInfo card={i.data} />
    </div>
  );
}
