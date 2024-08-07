import DisplayFavs from "@/app/components/displayFavs";
import { getFavs } from "@/lib/actions";
import { getServerAuthSession } from "../../../auth";
export const dynamic = "force-dynamic";
export default async function Collection() {
  const session = await getServerAuthSession();
  let favs: {
    id: number;
    cardId: string | null;
    imageUrl: string | null;
    userId: string | null;
  }[] = [];
  if (session) {
    const userId = session.user.id;
    favs = await getFavs(userId);
  } else {
    favs = [];
  }
  if (session?.user.id) {
    return (
      <div className="flex min-h-screen w-full sm:px-10 xs:px-10 px-44 py-10 text-black bg-white">
        <DisplayFavs favs={favs} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black text-center bg-white">
        Please log in to view collection
      </div>
    );
  }
}
