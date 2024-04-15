import DisplayFavs from "@/app/components/displayFavs";
import { getFavs } from "@/lib/actions";
import { absoluteUrl } from "@/lib/utils";
export default async function Collection() {
  let favs = [];
  favs = await getFavs();
  return (
    <div className="flex min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black bg-white">
      <div className="text-white">test : {absoluteUrl()}</div>
      <DisplayFavs favs={favs} />
    </div>
  );
}
