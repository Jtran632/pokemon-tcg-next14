import DisplaySetCards from "@/app/components/displaySetCards";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../../auth";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function SetPageWithName({ params }: any) {
  const session = await getServerAuthSession();
  const userId = session?.user?.id || "";
  const favs = await getFavs(String(userId));
  return (
    <div className="bg-white min-h-screen h-full px-10 py-10">
      <DisplaySetCards id={params.id} favs={favs} />
    </div>
  );
}
