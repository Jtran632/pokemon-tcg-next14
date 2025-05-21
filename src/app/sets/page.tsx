import { getSets } from "@/lib/utils";
import DisplaySets from "../components/displaySets";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

export default async function Home() {
  let a = await getSets();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 pb-20 pt-10 bg-white">
      <DisplaySets tcgSets={a} />
    </main>
  );
}
