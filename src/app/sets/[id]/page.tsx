import DisplaySetCards from "@/app/components/displaySetCards";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../../auth";
// export const dynamic = "force-dynamic";
export const maxDuration = 60;
export default async function SetPageWithName({ params }: any) {
  const session = await getServerAuthSession();
  const userId = session?.user?.id || "";
  const favs = await getFavs(String(userId));
  return (
    <div className="bg-white min-h-screen h-full py-10 px-20 sm:px-10 xs:px-10">
      <DisplaySetCards id={params.id} favs={favs} />
    </div>
  );
}
