import DisplayFavs from "@/app/components/displayFavs";
export default async function Collection() {
  return (
    <div className="flex min-h-screen w-full px-20 sm:px-10 xs:px-10 py-10 text-black bg-white">
      <DisplayFavs />
    </div>
  );
}
