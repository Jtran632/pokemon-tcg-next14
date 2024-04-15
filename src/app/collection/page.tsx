import DisplayFavs from "@/app/components/displayFavs";
import { getFavs } from "@/lib/actions";
import { absoluteUrl } from "@/lib/utils";
export default async function Collection() {
  let favs = await getFavs();
  console.log(absoluteUrl());
  return (
    <div className="flex min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black bg-white">
      <DisplayFavs favs={favs} />
    </div>
  );
}
