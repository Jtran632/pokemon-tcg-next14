import DisplayCardInfo from "@/app/components/displayCardInfo";

// Fetch card data
async function getCard(id: string) {
  const url = `https://api.pokemontcg.io/v2/cards/${id}`;
  const response = await fetch(url);
  return response.json();
}

export const dynamic = "force-dynamic"; // Forces dynamic rendering of this page


export default async function SetPageWithCardName({ params }: {params: Promise<{ id: string }>}) {
  // Directly use params.id without awaiting it
  const { id } = await params;

  // Fetch card data from the API
  const cardData = await getCard(id);
  
  return (
    <div>
      <DisplayCardInfo card={cardData.data} />
    </div>
  );
}
