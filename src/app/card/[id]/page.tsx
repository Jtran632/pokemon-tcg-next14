import DisplayCardInfo from "@/app/components/displayCardInfo";
export const dynamic = "force-dynamic";
async function getCard(id: string) {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
  if (!res.ok) throw new Error("Failed to fetch card");
  return res.json();
}
type PageProps = {
  params: {
    id: string;
  };
};
export default async function SetPageWithCardName({ params }: PageProps) {
  const cardData = await getCard(params.id);

  return (
    <div>
      <DisplayCardInfo card={cardData.data} />
    </div>
  );
}