import DisplayFavs from "@/app/components/displayFavs";
import { getFavs } from "@/lib/actions";
export default async function Collection() {
  let favs = await getFavs();
  if (!favs) {
    <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black bg-white">
      <DisplayFavs favs={favs} />
    </div>
  );
}
