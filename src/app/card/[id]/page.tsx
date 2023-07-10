import DisplayCardInfo from "@/app/components/displayCardInfo";
import Image from "next/image";
async function getCard(id: string) {
  let url = `https://api.pokemontcg.io/v2/cards/${id}`;
  console.log(id);
  console.log(url);
  const a = await fetch(url);
  return a.json();
}
export default async function SetPageWithCardName({ params }: any) {
  console.log(params);
  let i = await getCard(params.id);
  console.log(i.data);
  return (
    <div>
      <DisplayCardInfo card={i.data} />
    </div>
  );
}
