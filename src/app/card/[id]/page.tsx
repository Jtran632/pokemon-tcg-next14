import DisplayCardInfo from "@/app/components/displayCardInfo";
async function getCard(id: string) {
  let url = `https://api.pokemontcg.io/v2/cards/${id}`;
  const a = await fetch(url);
  return a.json();
}
type PageProps = {
  params: { id: string };
};
export default async function SetPageWithCardName({ params }: PageProps) {
  let i = await getCard(params.id);
  return (
    <div>
      <DisplayCardInfo card={i.data} />
    </div>
  );
}
