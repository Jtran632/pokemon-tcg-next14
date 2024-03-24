import DisplayFavs from "@/app/components/displayFavs";
export default async function Collection() {
  return (
    <div className="flex min-h-screen w-full p-20 text-black bg-white">
      <DisplayFavs />
    </div>
  );
}
