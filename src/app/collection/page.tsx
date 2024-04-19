import DisplayFavs from "@/app/components/displayFavs";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../auth";
export const dynamic = "force-dynamic";
export default async function Collection() {
  const session = await getServerAuthSession();
  const userId = session?.user?.id || "";

  const favs = await getFavs(String(userId));
  if (!favs) {
    <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black bg-white">
      <DisplayFavs favs={favs} />
    </div>
  );
}
