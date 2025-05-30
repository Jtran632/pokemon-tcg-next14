import DisplaySetCards from "@/app/components/displaySetCards";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../../auth";
// export const dynamic = "force-dynamic";
export const maxDuration = 60;
export default async function SetPageWithName({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerAuthSession();
  const userId = session?.user?.id || "";
  const favs = await getFavs(userId);
  const { id } = await params;
  return (
    <div className="bg-white min-h-screen h-full py-4">
      <DisplaySetCards id={id} favs={favs} />
    </div>
  );
}
